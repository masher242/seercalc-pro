import { useState, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { ASIA_VIEWBOX, ASIA_PATHS, ASIA_LABELS, ASIA_CONTEXT_PATH, ASIA_CITY_POINTS } from '../data/asiaPaths';
import { RAMP, INK, NO_DATA } from '../data/mapColors';
import {
  ASIA_COUNTRIES, ASIA_REF_KW, ASIA_REF_EFF, USD_PER, asiaCityRate, yearCost, lmoney, lprice, usd0, type AsiaCountry,
} from '../data/asia';
import { cents, US_RATE } from '../data/acCost';

type Metric = 'year' | 'price';

interface CityRow {
  key: string;
  name: string;
  country: AsiaCountry;
  hours: number;
  /** local currency per kWh */
  price: number;
  /** US$ per kWh */
  usdPrice: number;
  /** local currency a year, one reference split */
  year: number;
  /** US$ a year */
  usdYear: number;
  point?: [number, number];
}

const CITIES: CityRow[] = ASIA_COUNTRIES.flatMap((c) =>
  c.cities.map((x) => {
    const price = asiaCityRate(c, x);
    const year = yearCost(ASIA_REF_KW, ASIA_REF_EFF, x.hours, price);
    const usd = USD_PER[c.currency];
    return { key: `${c.slug}:${x.name}`, name: x.name, country: c, hours: x.hours, price, usdPrice: price * usd, year, usdYear: year * usd, point: ASIA_CITY_POINTS[x.name] };
  }),
);
const BY_KEY = Object.fromEntries(CITIES.map((c) => [c.key, c]));
const BY_SLUG = Object.fromEntries(ASIA_COUNTRIES.map((c) => [c.slug, c]));
const mainCity = (c: AsiaCountry) => BY_KEY[`${c.slug}:${c.ref.name}`];
/** Cities too close to another dot at this scale: listed in the table, not drawn. */
const NO_DOT = new Set(['Yokohama', 'Kyoto', 'Kobe', 'Johor Bahru']);
/** Too small to tap on the map: buttons under it. */
const SMALL = ['singapore', 'hong-kong'];
const SHORT: Record<string, string> = { thailand: 'TH', malaysia: 'MY', philippines: 'PH', japan: 'JP' };

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
    breaks: [125, 200, 275, 350],
    legend: ['Under $125', '$125–200', '$200–275', '$275–350', '$350 +'],
    value: (c) => c.usdYear,
    show: (n) => `${usd0(n)} a year`,
  },
  price: {
    label: 'Electricity price',
    heading: 'electricity prices',
    breaks: [0.13, 0.18, 0.22, 0.24],
    legend: ['Under 13¢', '13–18¢', '18–22¢', '22–24¢', '24¢ +'],
    value: (c) => c.usdPrice,
    show: (n) => `${cents(n)} per kWh`,
  },
};

type Sel = { kind: 'country'; id: string } | { kind: 'city'; id: string };

export default function AsiaCostMap() {
  const [metric, setMetric] = useState<Metric>('year');
  const [selected, setSelected] = useState<Sel | null>(null);
  const [hover, setHover] = useState<Sel | null>(null);
  const def = METRICS[metric];
  const binOf = (c: CityRow) => {
    const i = def.breaks.findIndex((b) => def.value(c) < b);
    return i === -1 ? def.breaks.length : i;
  };
  const countryBin = (c: AsiaCountry) => binOf(mainCity(c));

  const sorted = [...CITIES].sort((a, b) => def.value(b) - def.value(a));
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];

  const same = (a: Sel | null, b: Sel) => !!a && a.kind === b.kind && a.id === b.id;
  const pick = (s: Sel) => setSelected((cur) => (same(cur, s) ? null : s));
  const mouseOnly = (s: Sel) => (e: PointerEvent) => { if (e.pointerType === 'mouse') setHover(s); };
  const active = hover ?? selected;
  const selCountry = selected?.kind === 'country' ? selected.id : selected?.kind === 'city' ? BY_KEY[selected.id].country.slug : null;

  const card = (() => {
    if (!active) return null;
    if (active.kind === 'city') {
      const c = BY_KEY[active.id];
      const cur = c.country.currency;
      return (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-bold text-gray-900">
              {c.name} <span className="text-xs font-medium text-gray-500">{c.country.name}</span>
            </p>
            <p className="text-sm text-gray-700">
              {lmoney(cur, c.year)} a year (about {usd0(c.usdYear)}) · about {c.hours.toLocaleString('en-US')} cooling hours ·{' '}
              {lprice(cur, c.price)} per kWh ({cents(c.usdPrice)} U.S.)
            </p>
          </div>
          <Link to={`/ac-cost/asia/${c.country.slug}`} className="text-sm font-semibold text-teal-700 hover:underline whitespace-nowrap">
            AC costs in {c.country.name} →
          </Link>
        </div>
      );
    }
    const c = BY_SLUG[active.id];
    const m = mainCity(c);
    return (
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-bold text-gray-900">{c.name}</p>
          <p className="text-sm text-gray-700">
            {c.ref.name}: {lmoney(c.currency, m.year)} a year (about {usd0(m.usdYear)}) at {lprice(c.currency, m.price)} per kWh (
            {cents(m.usdPrice)} U.S.)
          </p>
        </div>
        <Link to={`/ac-cost/asia/${c.slug}`} className="text-sm font-semibold text-teal-700 hover:underline whitespace-nowrap">
          AC costs in {c.name} →
        </Link>
      </div>
    );
  })();

  return (
    <section id="map" aria-labelledby="asia-map-heading" className="mb-10 scroll-mt-40">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
        <div>
          <h2 id="asia-map-heading" className="text-2xl font-bold text-gray-900 mb-1">Map: {def.heading} in Asia</h2>
          <p className="text-sm text-gray-500">
            {metric === 'year' ? (
              <>
                One 1.5 hp (12,000 BTU, 3.5 kW) inverter split, using about {(ASIA_REF_KW / ASIA_REF_EFF).toFixed(2)} kWh of
                electricity an hour, run for the typical cooling hours of each city's climate. In U.S. dollars so countries
                can be compared.
              </>
            ) : (
              <>Price of each kWh an air conditioner adds to a household bill, in U.S. cents. U.S. average: {cents(US_RATE)}.</>
            )}{' '}
            Countries are shaded by their main city; each dot is a city.
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

      <div className="-mx-3 sm:mx-0 rounded-lg border border-gray-200 bg-sky-50/40 p-1.5 sm:p-3">
        <svg
          viewBox={ASIA_VIEWBOX}
          className="w-full h-auto max-h-[720px] select-none"
          role="img"
          aria-label={`Map of Southeast and East Asia shaded by ${def.label.toLowerCase()}. The same figures are in the table below.`}
          onMouseLeave={() => setHover(null)}
        >
          <path d={ASIA_CONTEXT_PATH} fill={NO_DATA} stroke="#ffffff" strokeWidth={0.8} />
          {ASIA_COUNTRIES.map((c) => (
            <path
              key={c.slug}
              d={ASIA_PATHS[c.slug]}
              fill={RAMP[countryBin(c)]}
              stroke="#ffffff"
              strokeWidth={1}
              strokeLinejoin="round"
              className="cursor-pointer transition-[fill] duration-300"
              onPointerEnter={mouseOnly({ kind: 'country', id: c.slug })}
              onClick={() => pick({ kind: 'country', id: c.slug })}
            />
          ))}
          {selCountry && (
            <path d={ASIA_PATHS[selCountry]} fill="none" stroke="#17204d" strokeWidth={2} strokeLinejoin="round" pointerEvents="none" />
          )}
          <g className="hidden sm:inline">
            {ASIA_COUNTRIES.filter((c) => SHORT[c.slug]).map((c) => {
              const [x, y] = ASIA_LABELS[c.slug];
              const shift: Record<string, [number, number]> = { thailand: [12, -18], malaysia: [18, -2], philippines: [18, -8], japan: [-30, -10] };
              const [dx, dy] = shift[c.slug] ?? [0, 0];
              return (
                <text key={`l-${c.slug}`} x={x + dx} y={y + dy} textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={700}
                  fill="#17204d" opacity={0.7} pointerEvents="none">
                  {SHORT[c.slug]}
                </text>
              );
            })}
          </g>
          {CITIES.filter((c) => c.point && !NO_DOT.has(c.name)).map((c) => {
            const [x, y] = c.point as [number, number];
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
          <span className="text-gray-500 mr-1">Small on the map:</span>
          {SMALL.map((slug) => {
            const c = BY_SLUG[slug];
            const bin = countryBin(c);
            const sel = same(selected, { kind: 'country', id: slug });
            return (
              <button
                key={`b-${slug}`}
                onClick={() => pick({ kind: 'country', id: slug })}
                onPointerEnter={mouseOnly({ kind: 'country', id: slug })}
                onPointerLeave={() => setHover(null)}
                aria-pressed={sel}
                className={`rounded px-2 py-1.5 font-semibold ${sel ? 'ring-2 ring-[#17204d]' : ''}`}
                style={{ background: RAMP[bin], color: INK[bin] }}
              >
                {c.name}
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
            <span className="inline-block h-3 w-5 rounded-sm" style={{ background: NO_DATA }} aria-hidden="true" />
            Not covered
          </li>
        </ul>
      </div>

      <div className="mt-3 min-h-[92px] rounded-lg border border-teal-200 bg-teal-50 px-4 py-3" aria-live="polite">
        {card ?? (
          <p className="text-sm text-gray-600 py-3">
            Tap or hover over a country or a city dot. Highest: {top.name}, {top.country.name} ({def.show(def.value(top))}).
            Lowest: {bottom.name}, {bottom.country.name} ({def.show(def.value(bottom))}).
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
                <th className="px-2 py-2 font-semibold">Cost per year, one 1.5 hp unit</th>
                <th className="px-2 py-2 font-semibold">In U.S. dollars</th>
                <th className="px-2 py-2 font-semibold">Hours AC runs per year</th>
                <th className="px-2 py-2 font-semibold">Price per kWh</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => (
                <tr key={c.key} className="border-t border-gray-100">
                  <td className="px-2 py-1.5 text-gray-400">{i + 1}</td>
                  <td className="px-2 py-1.5">
                    {c.name}{' '}
                    <Link to={`/ac-cost/asia/${c.country.slug}`} className="text-xs font-semibold text-teal-700 hover:underline">{c.country.name}</Link>
                  </td>
                  <td className="px-2 py-1.5 text-gray-700">{lmoney(c.country.currency, c.year)}</td>
                  <td className="px-2 py-1.5 text-gray-700">{usd0(c.usdYear)}</td>
                  <td className="px-2 py-1.5 text-gray-700">{c.hours.toLocaleString('en-US')}</td>
                  <td className="px-2 py-1.5 text-gray-700">{lprice(c.country.currency, c.price)} ({cents(c.usdPrice)})</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p className="mt-3 text-xs text-gray-500 leading-relaxed">
        <strong>Prices:</strong> the price of each kWh air conditioning adds to a household bill, from each country's
        regulated tariff (sources and method on the country pages). Malaysia is Peninsular Malaysia (TNB); Hong Kong is CLP
        Power's area; Japan is the Tokyo and Kansai utilities. <strong>Cooling hours:</strong> our estimate for each city's
        climate, for one unit. U.S. dollars at ECB reference rates. Yokohama, Kyoto, Kobe and Johor Bahru are in the table
        but not drawn, because they sit on top of Tokyo, Osaka and Singapore at this scale. Outlines: Natural Earth.
      </p>
    </section>
  );
}
