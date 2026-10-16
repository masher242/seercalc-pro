import { useState, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { EU_MAP_VIEWBOX, EU_PATHS, EU_CENTROIDS, CONTEXT_PATH } from '../data/europePaths';
import { RAMP, INK, NO_DATA } from '../data/mapColors';
import { EU_COUNTRIES, USD_PER_EUR, GBP_PER_EUR, EU_REF_KW, EU_REF_SEER, yearCost } from '../data/europe';
import { cents, US_RATE } from '../data/acCost';
import eu from '../data/euHouseholdRates.json';
import cooling from '../data/euCoolingDegreeDays.json';

type Metric = 'year' | 'price';

interface Row {
  iso: string;
  name: string;
  /** EUR per kWh */
  price: number;
  /** estimated full-load cooling hours a year (rounded to 10) */
  hours: number;
  /** EUR a year for the reference split unit */
  year: number;
  /** our country page, if there is one */
  slug?: string;
  /** true for the UK, which comes from Ofgem rather than Eurostat */
  ofgem?: boolean;
  /** set when this country's newest Eurostat figure is older than the map's period */
  olderPeriod?: string;
}

type EuEntry = { name: string; price: number; periodLabel?: string };
type CddEntry = { cdd: number; from: number; to: number };

const CDD = cooling.countries as Record<string, CddEntry>;
const page = (name: string) => EU_COUNTRIES.find((c) => c.name === name);
const inName = (slug: string) => EU_COUNTRIES.find((c) => c.slug === slug)?.inName ?? slug;

// --- Cooling hours from climate -------------------------------------------------
// Eurostat's cooling degree days only count very hot days, so we fit a straight line
// (hours = a + b × CDD) through the countries we've estimated city by city, using each
// country page's reference city. More country pages = a better fit, automatically.
const ISO_BY_NAME: Record<string, string> = {
  ...Object.fromEntries(Object.entries(eu.countries as Record<string, EuEntry>).map(([iso, c]) => [c.name, iso])),
  'United Kingdom': 'GB',
};
const fitPoints = EU_COUNTRIES.map((c) => ({ x: CDD[ISO_BY_NAME[c.name]]?.cdd, y: c.ref.hours })).filter(
  (p): p is { x: number; y: number } => typeof p.x === 'number',
);
const [FIT_A, FIT_B] = (() => {
  const n = fitPoints.length;
  const mx = fitPoints.reduce((s, p) => s + p.x, 0) / n;
  const my = fitPoints.reduce((s, p) => s + p.y, 0) / n;
  const b = fitPoints.reduce((s, p) => s + (p.x - mx) * (p.y - my), 0) / fitPoints.reduce((s, p) => s + (p.x - mx) ** 2, 0);
  return [my - b * mx, b];
})();
const hoursFor = (iso: string) => Math.round(Math.max(0, FIT_A + FIT_B * (CDD[iso]?.cdd ?? 0)) / 10) * 10;

const makeRow = (iso: string, name: string, price: number, extra: Partial<Row> = {}): Row => {
  const hours = hoursFor(iso);
  return { iso, name, price, hours, year: yearCost(EU_REF_KW, EU_REF_SEER, hours, price), slug: page(name)?.slug, ...extra };
};

const EU_ROWS: Row[] = Object.entries(eu.countries as Record<string, EuEntry>).map(([iso, c]) =>
  makeRow(iso, c.name, c.price, { olderPeriod: c.periodLabel }),
);

// The UK left Eurostat's series after 2020. To match Eurostat's whole-bill average, we
// spread Ofgem's daily standing charge over Ofgem's typical yearly use and add it to the unit rate.
const ukPage = EU_COUNTRIES.find((c) => c.slug === 'united-kingdom');
const ukGbp = ukPage
  ? ukPage.rate + ((ukPage.standingChargePerDay ?? 0) * 365) / (ukPage.typicalKwh ?? 2500)
  : 0;
const UK: Row | null = ukPage ? makeRow('GB', 'United Kingdom', ukGbp / GBP_PER_EUR, { ofgem: true }) : null;

const ROWS: Row[] = UK ? [...EU_ROWS, UK] : EU_ROWS;
const BY_ISO = Object.fromEntries(ROWS.map((r) => [r.iso, r])) as Record<string, Row>;
const COUNT = ROWS.length;
/** Countries still on an older half-year, e.g. "Latvia (July to December 2025)". */
const OLDER = EU_ROWS.filter((r) => r.olderPeriod).sort((a, b) => a.name.localeCompare(b.name));
const olderList = OLDER.map((r) => `${r.name} (${r.olderPeriod})`).join(', ');
/** "Spain, France, … and the UK" — the countries with their own page (they anchor the hours fit). */
const PAGE_LIST = (() => {
  const names = EU_COUNTRIES.map((c) => (c.name === 'United Kingdom' ? 'UK' : c.name));
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names.join('');
})();
const cddYears = (() => {
  const spans = new Set(Object.values(CDD).map((c) => `${c.from}–${c.to}`));
  return [...spans].join(', ');
})();

const eur = (n: number) => `€${n.toFixed(4)}`;
const eur0 = (n: number) => `€${Math.round(n).toLocaleString('en-US')}`;
const usCents = (eurPerKwh: number) => cents(eurPerKwh * USD_PER_EUR);
const usd0 = (e: number) => `$${Math.round(e * USD_PER_EUR).toLocaleString('en-US')}`;

interface MetricDef {
  label: string;
  heading: string;
  breaks: number[];
  legend: string[];
  value: (r: Row) => number;
  show: (n: number) => string;
}
const METRICS: Record<Metric, MetricDef> = {
  year: {
    label: 'Yearly AC cost',
    heading: 'what a year of AC costs',
    breaks: [25, 40, 80, 120],
    legend: ['Under €25', '€25–40', '€40–80', '€80–120', '€120 +'],
    value: (r) => r.year,
    show: (n) => `${eur0(n)} a year`,
  },
  price: {
    label: 'Electricity price',
    heading: 'electricity prices',
    breaks: [0.15, 0.22, 0.27, 0.32],
    legend: ['Under €0.15', '€0.15–0.22', '€0.22–0.27', '€0.27–0.32', '€0.32 +'],
    value: (r) => r.price,
    show: (n) => `${eur(n)} per kWh`,
  },
};

/** Too small to tap on the map: buttons under it instead. */
const SMALL = ['LU', 'MT', 'CY'];
/** No abbreviation drawn on these (too small, or have a button). */
const NO_LABEL = new Set([...SMALL, 'SI', 'BE', 'NL']);

const HALF = { '1': 'January to June', '2': 'July to December' } as Record<string, string>;
/** "2025-S2" → "July to December 2025" */
const halfLabel = (period: string) => {
  const [year, half] = period.split('-S');
  return `${HALF[half]} ${year}`;
};
const avgPeriod = (eu as { euAveragePeriod?: string }).euAveragePeriod;
/** Shown after the EU average when it covers an older half-year than the map. */
const avgNote = avgPeriod && avgPeriod !== eu.period ? `, ${halfLabel(avgPeriod)}; not yet published for ${eu.periodLabel}` : '';

export default function EuropeCostMap() {
  const [metric, setMetric] = useState<Metric>('year');
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const def = METRICS[metric];
  const binOf = (r: Row) => {
    const i = def.breaks.findIndex((b) => def.value(r) < b);
    return i === -1 ? def.breaks.length : i;
  };

  const sorted = [...ROWS].sort((a, b) => def.value(b) - def.value(a));
  const rankOf = (iso: string) => sorted.findIndex((r) => r.iso === iso) + 1;
  const counts = [0, 0, 0, 0, 0];
  ROWS.forEach((r) => { counts[binOf(r)] += 1; });
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];

  const active = hover ?? selected;
  const shown = active ? BY_ISO[active] : null;
  const isSel = (iso: string) => iso === selected;
  const pick = (iso: string) => setSelected((cur) => (cur === iso ? null : iso));
  const mouseOnly = (iso: string) => (e: PointerEvent) => { if (e.pointerType === 'mouse') setHover(iso); };

  return (
    <section id="map" aria-labelledby="eu-map-heading" className="mb-10 scroll-mt-40">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
        <div>
          <h2 id="eu-map-heading" className="text-2xl font-bold text-gray-900 mb-1">Map: {def.heading} across Europe</h2>
          <p className="text-sm text-gray-500">
            {metric === 'year' ? (
              <>
                One {EU_REF_KW} kW (12,000 BTU) split air conditioner (energy class A++, uses about{' '}
                {(EU_REF_KW / EU_REF_SEER).toFixed(2)} kWh of electricity an hour), run for the typical cooling hours of each
                country's climate, at its household electricity price.
              </>
            ) : (
              <>
                Average household price per kWh, all taxes included, {eu.periodLabel} (Eurostat)
                {OLDER.length > 0 && <>; newest available for {olderList}</>}. EU average {eur(eu.euAverage)} (about{' '}
                {usCents(eu.euAverage)} in U.S. money{avgNote}). U.S. average: {cents(US_RATE)}.
              </>
            )}
          </p>
        </div>
        <div role="group" aria-label="Map shows" className="inline-flex rounded-full border border-gray-200 bg-white p-1 text-sm">
          {(Object.keys(METRICS) as Metric[]).map((k) => (
            <button
              key={k}
              onClick={() => setMetric(k)}
              aria-pressed={metric === k}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${metric === k ? 'bg-[#17204d] text-white' : 'text-gray-700 hover:text-teal-700'}`}
            >
              {METRICS[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="-mx-3 sm:mx-0 rounded-lg border border-gray-200 bg-white p-1.5 sm:p-3">
        <svg
          viewBox={EU_MAP_VIEWBOX}
          className="w-full h-auto select-none"
          role="img"
          aria-label={`Map of European countries shaded by ${def.label.toLowerCase()}. The same figures are in the table below.`}
          onMouseLeave={() => setHover(null)}
        >
          <path d={CONTEXT_PATH} fill={NO_DATA} stroke="#ffffff" strokeWidth={0.8} />
          {ROWS.map((r) => (
            <path
              key={r.iso}
              d={EU_PATHS[r.iso]}
              fill={RAMP[binOf(r)]}
              stroke="#ffffff"
              strokeWidth={0.8}
              strokeLinejoin="round"
              className="cursor-pointer transition-[fill] duration-300"
              onPointerEnter={mouseOnly(r.iso)}
              onClick={() => pick(r.iso)}
            />
          ))}
          {selected && (
            <path d={EU_PATHS[selected]} fill="none" stroke="#17204d" strokeWidth={2} strokeLinejoin="round" pointerEvents="none" />
          )}
          <g className="hidden sm:inline">
            {ROWS.filter((r) => !NO_LABEL.has(r.iso)).map((r) => {
              const [x, y] = EU_CENTROIDS[r.iso];
              return (
                <text
                  key={`l-${r.iso}`}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={12}
                  fontWeight={600}
                  fill={INK[binOf(r)]}
                  pointerEvents="none"
                >
                  {r.iso}
                </text>
              );
            })}
          </g>
        </svg>

        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-gray-500 mr-1">Small countries:</span>
          {SMALL.map((iso) => {
            const r = BY_ISO[iso];
            const bin = binOf(r);
            return (
              <button
                key={`b-${iso}`}
                onClick={() => pick(iso)}
                onPointerEnter={mouseOnly(iso)}
                onPointerLeave={() => setHover(null)}
                aria-pressed={isSel(iso)}
                className={`rounded px-2 py-1.5 font-semibold ${isSel(iso) ? 'ring-2 ring-[#17204d]' : ''}`}
                style={{ background: RAMP[bin], color: INK[bin] }}
              >
                {r.name}
              </button>
            );
          })}
        </div>

        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-700" aria-label="Legend">
          {def.legend.map((l, i) => (
            <li key={l} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3 w-5 rounded-sm" style={{ background: RAMP[i] }} aria-hidden="true" />
              {l} <span className="text-gray-400">({counts[i]})</span>
            </li>
          ))}
          <li className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-5 rounded-sm" style={{ background: NO_DATA }} aria-hidden="true" />
            Not covered
          </li>
        </ul>
      </div>

      <div className="mt-3 min-h-[92px] rounded-lg border border-teal-200 bg-teal-50 px-4 py-3" aria-live="polite">
        {shown ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-bold text-gray-900">
                {shown.name}{' '}
                <span className="text-xs font-medium text-gray-500">
                  #{rankOf(shown.iso)} of {COUNT} for {metric === 'year' ? 'yearly AC cost' : 'price'}
                </span>
              </p>
              <p className="text-sm text-gray-700">
                {eur0(shown.year)} a year (about {usd0(shown.year)}) · about {shown.hours.toLocaleString('en-US')} cooling
                hours · {eur(shown.price)} per kWh ({usCents(shown.price)} U.S.)
                {shown.olderPeriod && ` · price for ${shown.olderPeriod}, the newest available`}
                {shown.ofgem && ' · UK price from Ofgem, see note below'}
              </p>
            </div>
            {shown.slug ? (
              <Link to={`/ac-cost/${shown.slug}`} className="text-sm font-semibold text-teal-700 hover:underline whitespace-nowrap">
                AC costs in {inName(shown.slug)} →
              </Link>
            ) : (
              <span className="text-xs text-gray-500">Full AC cost page coming later</span>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-600 py-3">
            Tap or hover over a country. Highest: {top.name} ({def.show(def.value(top))}). Lowest: {bottom.name} (
            {def.show(def.value(bottom))}).
          </p>
        )}
      </div>

      <details className="mt-3 rounded-lg border border-gray-200 bg-white">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-gray-800">
          All {COUNT} countries, as a table
        </summary>
        <div className="overflow-x-auto px-2 pb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-900">
                <th className="px-2 py-2 font-semibold">#</th>
                <th className="px-2 py-2 font-semibold">Country</th>
                <th className="px-2 py-2 font-semibold">AC per year</th>
                <th className="px-2 py-2 font-semibold whitespace-nowrap">Cooling hours</th>
                <th className="px-2 py-2 font-semibold">Per kWh</th>
                <th className="px-2 py-2 font-semibold">In U.S. cents</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r, i) => (
                <tr key={r.iso} className="border-t border-gray-100">
                  <td className="px-2 py-1.5 text-gray-400">{i + 1}</td>
                  <td className="px-2 py-1.5">
                    {r.slug ? (
                      <Link to={`/ac-cost/${r.slug}`} className="font-semibold text-teal-700 hover:underline">{r.name}</Link>
                    ) : (
                      r.name
                    )}
                    {r.olderPeriod && <span className="text-xs text-gray-500"> (price: {r.olderPeriod})</span>}
                    {r.ofgem && <span className="text-xs text-gray-500"> (price: Ofgem)</span>}
                  </td>
                  <td className="px-2 py-1.5 text-gray-700">{eur0(r.year)}</td>
                  <td className="px-2 py-1.5 text-gray-700">{r.hours.toLocaleString('en-US')}</td>
                  <td className="px-2 py-1.5 text-gray-700">{eur(r.price)}</td>
                  <td className="px-2 py-1.5 text-gray-700">{usCents(r.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p className="mt-3 text-xs text-gray-500 leading-relaxed">
        <strong>Prices:</strong>{' '}
        <a href={eu.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">
          Eurostat nrg_pc_204
        </a>
        , households using 2,500–4,999 kWh a year, {eu.periodLabel}, averaged over the whole bill. Each country shows its
        newest half-year; one that hasn't reported it yet keeps its previous figure
        {OLDER.length > 0 ? ` (now: ${olderList})` : ''}. Our country pages use each country's latest tariff instead
        (France's regulated EDF price, for example), so their figures can differ. The UK left Eurostat's series after
        Brexit: its price is our estimate built the same way, the Ofgem price cap unit rate
        {ukPage ? ` (${ukPage.asOf})` : ''} plus the daily standing charge spread over Ofgem's typical{' '}
        {(ukPage?.typicalKwh ?? 2500).toLocaleString('en-US')} kWh a year, converted at £1 = €{(1 / GBP_PER_EUR).toFixed(3)}.
        <br />
        <strong>Cooling hours:</strong> our estimate from{' '}
        <a href={cooling.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">
          Eurostat cooling degree days
        </a>{' '}
        ({cddYears} average), scaled to match the city-by-city estimates on our {PAGE_LIST} pages
        (about {Math.round(FIT_A)} hours plus {FIT_B.toFixed(1)} per cooling degree day). They're country averages: the
        south of Spain or Italy runs AC far longer than the north, so see the country pages for cities. Yearly cost is
        for one {EU_REF_KW} kW unit at EU SEER {EU_REF_SEER}; homes with several units pay more. U.S. money uses €1 = $
        {USD_PER_EUR.toFixed(3)}. Not covered: countries outside the EU apart from the UK.
      </p>
    </section>
  );
}
