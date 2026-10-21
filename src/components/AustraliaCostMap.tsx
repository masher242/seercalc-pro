import { useState, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { AU_VIEWBOX, AU_STATE_PATHS, AU_STATE_LABELS, AU_CITY_POINTS } from '../data/australiaPaths';
import { RAMP, INK } from '../data/mapColors';
import { AU_STATES, AU_REF_KW, AU_REF_EFF, USD_PER_AUD, cityRate, yearCost, aud, auCents, type AuState } from '../data/australia';
import { cents } from '../data/acCost';

type Metric = 'year' | 'price';

interface CityRow {
  key: string;
  name: string;
  state: AuState;
  hours: number;
  /** A$ per kWh on this city's network */
  price: number;
  /** A$ a year, one reference split */
  year: number;
  point: [number, number];
}

const CITIES: CityRow[] = AU_STATES.flatMap((s) =>
  s.cities
    .filter((c) => AU_CITY_POINTS[c.name])
    .map((c) => {
      const price = cityRate(s, c);
      return { key: `${s.slug}:${c.name}`, name: c.name, state: s, hours: c.hours, price, year: yearCost(AU_REF_KW, AU_REF_EFF, c.hours, price), point: AU_CITY_POINTS[c.name] };
    }),
);
const BY_KEY = Object.fromEntries(CITIES.map((c) => [c.key, c]));
const BY_SLUG = Object.fromEntries(AU_STATES.map((s) => [s.slug, s]));
/** The state's main (reference) city, which sets the state's shading. */
const mainCity = (s: AuState) => BY_KEY[`${s.slug}:${s.ref.name}`];

interface MetricDef {
  label: string;
  heading: string;
  breaks: number[];
  legend: string[];
  value: (c: CityRow) => number;
  show: (n: number) => string;
}
const METRICS: Record<Metric, MetricDef> = {
  year: {
    label: 'Yearly AC cost',
    heading: 'what a year of AC costs',
    breaks: [50, 100, 200, 400],
    legend: ['Under A$50', 'A$50–100', 'A$100–200', 'A$200–400', 'A$400 +'],
    value: (c) => c.year,
    show: (n) => `${aud(n)} a year`,
  },
  price: {
    label: 'Electricity price',
    heading: 'electricity prices',
    breaks: [0.27, 0.30, 0.33, 0.36],
    legend: ['Under 27¢', '27–30¢', '30–33¢', '33–36¢', '36¢ +'],
    value: (c) => c.price,
    show: (n) => `${auCents(n * 100)} per kWh`,
  },
};

/** Too small to tap on the map: a button under it instead. */
const SMALL = ['act'];
/** Nudge state labels off the city dots (viewBox units). */
const LABEL_SHIFT: Record<string, [number, number]> = { victoria: [-34, 6], 'new-south-wales': [-12, -26] };

type Sel = { kind: 'state'; id: string } | { kind: 'city'; id: string };

export default function AustraliaCostMap() {
  const [metric, setMetric] = useState<Metric>('year');
  const [selected, setSelected] = useState<Sel | null>(null);
  const [hover, setHover] = useState<Sel | null>(null);
  const def = METRICS[metric];
  const binOf = (c: CityRow) => {
    const i = def.breaks.findIndex((b) => def.value(c) < b);
    return i === -1 ? def.breaks.length : i;
  };
  const stateBin = (s: AuState) => binOf(mainCity(s));

  const sorted = [...CITIES].sort((a, b) => def.value(b) - def.value(a));
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];

  const same = (a: Sel | null, b: Sel) => !!a && a.kind === b.kind && a.id === b.id;
  const pick = (s: Sel) => setSelected((cur) => (same(cur, s) ? null : s));
  const mouseOnly = (s: Sel) => (e: PointerEvent) => { if (e.pointerType === 'mouse') setHover(s); };
  const active = hover ?? selected;
  const selState = selected?.kind === 'state' ? selected.id : selected?.kind === 'city' ? BY_KEY[selected.id].state.slug : null;

  const card = (() => {
    if (!active) return null;
    if (active.kind === 'city') {
      const c = BY_KEY[active.id];
      return (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-bold text-gray-900">
              {c.name} <span className="text-xs font-medium text-gray-500">{c.state.name}</span>
            </p>
            <p className="text-sm text-gray-700">
              {aud(c.year)} a year (about ${Math.round(c.year * USD_PER_AUD).toLocaleString('en-US')}) · about{' '}
              {c.hours.toLocaleString('en-US')} cooling hours · {auCents(c.price * 100)} per kWh ({cents(c.price * USD_PER_AUD)} U.S.)
            </p>
          </div>
          <Link to={`/ac-cost/australia/${c.state.slug}`} className="text-sm font-semibold text-teal-700 hover:underline whitespace-nowrap">
            AC costs in {c.state.short} →
          </Link>
        </div>
      );
    }
    const s = BY_SLUG[active.id];
    const m = mainCity(s);
    const years = s.cities.map((c) => yearCost(AU_REF_KW, AU_REF_EFF, c.hours, cityRate(s, c)));
    return (
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-bold text-gray-900">{s.name}</p>
          <p className="text-sm text-gray-700">
            {s.ref.name}: {aud(m.year)} a year at {auCents(m.price * 100)} per kWh
            {s.cities.length > 1 && <> · across the state {aud(Math.min(...years))}–{aud(Math.max(...years))} a year</>}
          </p>
        </div>
        <Link to={`/ac-cost/australia/${s.slug}`} className="text-sm font-semibold text-teal-700 hover:underline whitespace-nowrap">
          AC costs in {s.short} →
        </Link>
      </div>
    );
  })();

  return (
    <section id="map" aria-labelledby="au-map-heading" className="mb-10 scroll-mt-40">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
        <div>
          <h2 id="au-map-heading" className="text-2xl font-bold text-gray-900 mb-1">Map: {def.heading} across Australia</h2>
          <p className="text-sm text-gray-500">
            {metric === 'year' ? (
              <>
                One {AU_REF_KW} kW (12,000 BTU) inverter split system (uses about {(AU_REF_KW / AU_REF_EFF).toFixed(2)} kWh
                of electricity an hour), run for the typical cooling hours of each city's climate, at its 2026–27 usage
                charge.
              </>
            ) : (
              <>Regulated flat-rate usage charge per kWh for 2026–27, GST included, on each city's electricity network.</>
            )}{' '}
            States are shaded by their main city; each dot is a city, coloured by its own figure.
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
          viewBox={AU_VIEWBOX}
          className="w-full h-auto max-h-[640px] select-none"
          role="img"
          aria-label={`Map of Australian states and cities shaded by ${def.label.toLowerCase()}. The same figures are in the table below.`}
          onMouseLeave={() => setHover(null)}
        >
          {AU_STATES.map((s) => (
            <path
              key={s.slug}
              d={AU_STATE_PATHS[s.slug]}
              fill={RAMP[stateBin(s)]}
              stroke="#ffffff"
              strokeWidth={1.2}
              strokeLinejoin="round"
              className="cursor-pointer transition-[fill] duration-300"
              onPointerEnter={mouseOnly({ kind: 'state', id: s.slug })}
              onClick={() => pick({ kind: 'state', id: s.slug })}
            />
          ))}
          {selState && (
            <path d={AU_STATE_PATHS[selState]} fill="none" stroke="#17204d" strokeWidth={2} strokeLinejoin="round" pointerEvents="none" />
          )}
          <g className="hidden sm:inline">
            {AU_STATES.filter((s) => !SMALL.includes(s.slug)).map((s) => {
              const [lx, ly] = AU_STATE_LABELS[s.slug];
              const [dx, dy] = LABEL_SHIFT[s.slug] ?? [0, 0];
              const x = lx + dx;
              const y = ly + dy;
              return (
                <text key={`l-${s.slug}`} x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight={700}
                  fill={INK[stateBin(s)]} opacity={0.75} pointerEvents="none">
                  {s.short}
                </text>
              );
            })}
          </g>
          {CITIES.map((c) => {
            const [x, y] = c.point;
            const sel = same(selected, { kind: 'city', id: c.key }) || same(hover, { kind: 'city', id: c.key });
            return (
              <g key={c.key} className="cursor-pointer" onPointerEnter={mouseOnly({ kind: 'city', id: c.key })}
                onClick={(e) => { e.stopPropagation(); pick({ kind: 'city', id: c.key }); }}>
                <circle cx={x} cy={y} r={14} fill="transparent" className="[r:20px] sm:[r:14px]" />
                <circle cx={x} cy={y} r={sel ? 8.5 : 6.5} fill={RAMP[binOf(c)]} stroke="#ffffff" strokeWidth={2}
                  className={`transition-[fill] duration-300 ${sel ? '[r:13px] sm:[r:8.5px]' : '[r:10px] sm:[r:6.5px]'} [stroke-width:3px] sm:[stroke-width:2px]`} />
                <circle cx={x} cy={y} r={sel ? 9.8 : 7.6} fill="none" stroke="#17204d" strokeOpacity={sel ? 1 : 0.85} strokeWidth={sel ? 2 : 1}
                  className={`${sel ? '[r:15px] sm:[r:9.8px]' : '[r:11.6px] sm:[r:7.6px]'} ${sel ? '[stroke-width:3px] sm:[stroke-width:2px]' : '[stroke-width:1.6px] sm:[stroke-width:1px]'}`}
                  pointerEvents="none" />
              </g>
            );
          })}
        </svg>

        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-gray-500 mr-1">Small territory:</span>
          {SMALL.map((slug) => {
            const s = BY_SLUG[slug];
            const bin = stateBin(s);
            const sel = same(selected, { kind: 'state', id: slug });
            return (
              <button
                key={`b-${slug}`}
                onClick={() => pick({ kind: 'state', id: slug })}
                onPointerEnter={mouseOnly({ kind: 'state', id: slug })}
                onPointerLeave={() => setHover(null)}
                aria-pressed={sel}
                className={`rounded px-2 py-1.5 font-semibold ${sel ? 'ring-2 ring-[#17204d]' : ''}`}
                style={{ background: RAMP[bin], color: INK[bin] }}
              >
                {s.name} (Canberra)
              </button>
            );
          })}
        </div>

        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-700" aria-label="Legend">
          {def.legend.map((l, i) => (
            <li key={l} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3 w-5 rounded-sm" style={{ background: RAMP[i] }} aria-hidden="true" />
              {l}
            </li>
          ))}
          <li className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full border-2 border-white ring-1 ring-gray-400 bg-gray-300" aria-hidden="true" />
            City
          </li>
        </ul>
      </div>

      <div className="mt-3 min-h-[92px] rounded-lg border border-teal-200 bg-teal-50 px-4 py-3" aria-live="polite">
        {card ?? (
          <p className="text-sm text-gray-600 py-3">
            Tap or hover over a state or a city dot. Highest: {top.name}, {top.state.short} ({def.show(def.value(top))}).
            Lowest: {bottom.name}, {bottom.state.short} ({def.show(def.value(bottom))}).
          </p>
        )}
      </div>

      <details className="mt-3 rounded-lg border border-gray-200 bg-white">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-gray-800">All {CITIES.length} cities, as a table</summary>
        <div className="overflow-x-auto px-2 pb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-900">
                <th className="px-2 py-2 font-semibold">#</th>
                <th className="px-2 py-2 font-semibold">City</th>
                <th className="px-2 py-2 font-semibold">Cost per year, one 3.5 kW unit</th>
                <th className="px-2 py-2 font-semibold">Hours AC runs per year</th>
                <th className="px-2 py-2 font-semibold">Usage charge per kWh</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => (
                <tr key={c.key} className="border-t border-gray-100">
                  <td className="px-2 py-1.5 text-gray-400">{i + 1}</td>
                  <td className="px-2 py-1.5">
                    {c.name}{' '}
                    <Link to={`/ac-cost/australia/${c.state.slug}`} className="text-xs font-semibold text-teal-700 hover:underline">{c.state.short}</Link>
                  </td>
                  <td className="px-2 py-1.5 text-gray-700">{aud(c.year)}</td>
                  <td className="px-2 py-1.5 text-gray-700">{c.hours.toLocaleString('en-US')}</td>
                  <td className="px-2 py-1.5 text-gray-700">{auCents(c.price * 100)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p className="mt-3 text-xs text-gray-500 leading-relaxed">
        <strong>Prices:</strong> each state's regulated 2026–27 flat-rate usage charge on the city's network, GST included
        (sources on the state pages); the daily supply charge isn't included. <strong>Cooling hours:</strong> our estimate
        for each city's climate, for one unit in the main living area. Yearly cost is for one {AU_REF_KW} kW split at a
        seasonal efficiency of {AU_REF_EFF.toFixed(1)}; homes with several units or ducted systems pay more. Outlines:
        Natural Earth.
      </p>
    </section>
  );
}
