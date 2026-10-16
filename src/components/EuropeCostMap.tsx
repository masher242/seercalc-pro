import { useState, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { EU_MAP_VIEWBOX, EU_PATHS, EU_CENTROIDS, CONTEXT_PATH } from '../data/europePaths';
import { RAMP, INK, NO_DATA } from '../data/mapColors';
import { EU_COUNTRIES, USD_PER_EUR, GBP_PER_EUR } from '../data/europe';
import { cents, US_RATE } from '../data/acCost';
import eu from '../data/euHouseholdRates.json';

/** Upper bounds (EUR/kWh) of the first four color steps; the fifth is open-ended. */
const BREAKS = [0.15, 0.22, 0.27, 0.32];
const LEGEND = ['Under €0.15', '€0.15–0.22', '€0.22–0.27', '€0.27–0.32', '€0.32 +'];

interface Row {
  iso: string;
  name: string;
  /** EUR per kWh */
  price: number;
  /** 1 = most expensive among the EU-27 */
  rank: number;
  /** our country page, if there is one */
  slug?: string;
  /** true for the UK, which comes from Ofgem rather than Eurostat */
  separate?: boolean;
  /** set when this country's newest Eurostat figure is older than the map's period */
  olderPeriod?: string;
}

type EuEntry = { name: string; price: number; periodLabel?: string };

const pageSlug = (name: string) => EU_COUNTRIES.find((c) => c.name === name)?.slug;
const inName = (slug: string) => EU_COUNTRIES.find((c) => c.slug === slug)?.inName ?? slug;

const EU_ROWS: Row[] = (() => {
  const list = Object.entries(eu.countries as Record<string, EuEntry>).map(([iso, c]) => ({
    iso,
    name: c.name,
    price: c.price,
    olderPeriod: c.periodLabel,
    rank: 0,
    slug: pageSlug(c.name),
  }));
  [...list].sort((a, b) => b.price - a.price).forEach((r, i) => { r.rank = i + 1; });
  return list;
})();

// The UK left Eurostat's series after 2020, so it uses our Ofgem figure, shown apart from the EU-27.
const ukPage = EU_COUNTRIES.find((c) => c.slug === 'united-kingdom');
const UK: Row | null = ukPage
  ? { iso: 'GB', name: 'United Kingdom', price: ukPage.rate / GBP_PER_EUR, rank: 0, slug: ukPage.slug, separate: true }
  : null;

const ROWS: Row[] = UK ? [...EU_ROWS, UK] : EU_ROWS;
const BY_ISO = Object.fromEntries(ROWS.map((r) => [r.iso, r])) as Record<string, Row>;
const EU_COUNT = EU_ROWS.length;
/** Countries still on an older half-year, e.g. "Latvia (July to December 2025)". */
const OLDER = EU_ROWS.filter((r) => r.olderPeriod).sort((a, b) => a.name.localeCompare(b.name));
const olderList = OLDER.map((r) => `${r.name} (${r.olderPeriod})`).join(', ');

/** Too small to tap on the map: buttons under it instead. */
const SMALL = ['LU', 'MT', 'CY'];
/** No abbreviation drawn on these (too small, or have a button). */
const NO_LABEL = new Set([...SMALL, 'SI', 'BE', 'NL']);

const binOf = (v: number) => {
  const i = BREAKS.findIndex((b) => v < b);
  return i === -1 ? BREAKS.length : i;
};
const eur = (n: number) => `€${n.toFixed(4)}`;
const usCents = (eurPerKwh: number) => cents(eurPerKwh * USD_PER_EUR);

export default function EuropeCostMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const active = hover ?? selected;
  const shown = active ? BY_ISO[active] : null;
  const isSel = (iso: string) => iso === selected;
  const pick = (iso: string) => setSelected((cur) => (cur === iso ? null : iso));
  const mouseOnly = (iso: string) => (e: PointerEvent) => { if (e.pointerType === 'mouse') setHover(iso); };

  const counts = [0, 0, 0, 0, 0];
  EU_ROWS.forEach((r) => { counts[binOf(r.price)] += 1; });
  const sorted = [...EU_ROWS].sort((a, b) => a.rank - b.rank);
  const cheapest = sorted[sorted.length - 1];
  const dearest = sorted[0];

  return (
    <section id="map" aria-labelledby="eu-map-heading" className="mb-10 scroll-mt-40">
      <h2 id="eu-map-heading" className="text-2xl font-bold text-gray-900 mb-1">Map: electricity prices across Europe</h2>
      <p className="text-sm text-gray-500 mb-3">
        Average household price per kWh, all taxes included, {eu.periodLabel} (Eurostat)
        {OLDER.length > 0 && <>; newest available for {olderList}</>}. EU average{' '}
        {eur(eu.euAverage)} (about {usCents(eu.euAverage)} in U.S. money; the U.S. average is {cents(US_RATE)}).
      </p>

      <div className="-mx-3 sm:mx-0 rounded-lg border border-gray-200 bg-white p-1.5 sm:p-3">
        <svg
          viewBox={EU_MAP_VIEWBOX}
          className="w-full h-auto select-none"
          role="img"
          aria-label="Map of European countries shaded by household electricity price. The same figures are in the table below."
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <pattern id="uk-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.7" />
            </pattern>
          </defs>
          <path d={CONTEXT_PATH} fill={NO_DATA} stroke="#ffffff" strokeWidth={0.8} />
          {ROWS.map((r) => (
            <g key={r.iso}>
              <path
                d={EU_PATHS[r.iso]}
                fill={RAMP[binOf(r.price)]}
                stroke="#ffffff"
                strokeWidth={0.8}
                strokeLinejoin="round"
                className="cursor-pointer transition-[fill] duration-300"
                onPointerEnter={mouseOnly(r.iso)}
                onClick={() => pick(r.iso)}
              />
              {r.separate && <path d={EU_PATHS[r.iso]} fill="url(#uk-hatch)" pointerEvents="none" />}
            </g>
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
                  fill={INK[binOf(r.price)]}
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
            const bin = binOf(r.price);
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
          {LEGEND.map((l, i) => (
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
                  {shown.separate ? 'not in the EU figures' : `#${shown.rank} of ${EU_COUNT} for price`}
                </span>
              </p>
              <p className="text-sm text-gray-700">
                {eur(shown.price)} per kWh · about {usCents(shown.price)} in U.S. money
                {shown.olderPeriod && ` · figure for ${shown.olderPeriod}, the newest available`}
                {shown.separate && ' · Ofgem price cap, see note below'}
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
            Tap or hover over a country. Cheapest: {cheapest.name} ({eur(cheapest.price)}). Most expensive: {dearest.name} (
            {eur(dearest.price)}).
          </p>
        )}
      </div>

      <details className="mt-3 rounded-lg border border-gray-200 bg-white">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-gray-800">
          All {EU_COUNT} EU countries, as a table
        </summary>
        <div className="overflow-x-auto px-2 pb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-900">
                <th className="px-2 py-2 font-semibold">#</th>
                <th className="px-2 py-2 font-semibold">Country</th>
                <th className="px-2 py-2 font-semibold">Per kWh</th>
                <th className="px-2 py-2 font-semibold">In U.S. cents</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={r.iso} className="border-t border-gray-100">
                  <td className="px-2 py-1.5 text-gray-400">{r.rank}</td>
                  <td className="px-2 py-1.5">
                    {r.slug ? (
                      <Link to={`/ac-cost/${r.slug}`} className="font-semibold text-teal-700 hover:underline">{r.name}</Link>
                    ) : (
                      r.name
                    )}
                    {r.olderPeriod && <span className="text-xs text-gray-500"> ({r.olderPeriod})</span>}
                  </td>
                  <td className="px-2 py-1.5 text-gray-700">{eur(r.price)}</td>
                  <td className="px-2 py-1.5 text-gray-700">{usCents(r.price)}</td>
                </tr>
              ))}
              {UK && (
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-2 py-1.5 text-gray-400">–</td>
                  <td className="px-2 py-1.5">
                    <Link to={`/ac-cost/${UK.slug}`} className="font-semibold text-teal-700 hover:underline">{UK.name}</Link>{' '}
                    <span className="text-xs text-gray-500">(Ofgem, not EU data)</span>
                  </td>
                  <td className="px-2 py-1.5 text-gray-700">{eur(UK.price)}</td>
                  <td className="px-2 py-1.5 text-gray-700">{usCents(UK.price)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </details>

      <p className="mt-3 text-xs text-gray-500 leading-relaxed">
        Source:{' '}
        <a href={eu.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">
          Eurostat nrg_pc_204
        </a>
        , households using 2,500–4,999 kWh a year, {eu.periodLabel}. Each country shows its newest
        half-year from Eurostat; a country that hasn't reported the latest half-year yet keeps its previous figure
        until it does{OLDER.length > 0 ? ` (now: ${olderList})` : ''}. These are averages over the whole bill, so they
        can differ from the tariff on our country pages, which use each country's latest rate (France's regulated EDF
        price, for example). The UK (striped) left this series after Brexit; it shows the Ofgem price cap unit rate
        {ukPage ? ` for ${ukPage.asOf}` : ''}, converted at £1 = €{(1 / GBP_PER_EUR).toFixed(3)}, which is measured
        differently. Not covered: countries outside the EU apart from the UK. U.S. cents use €1 = $
        {USD_PER_EUR.toFixed(3)}.
      </p>
    </section>
  );
}
