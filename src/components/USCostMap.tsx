import { useState } from 'react';
import { Link } from 'react-router-dom';
import { STATE_PATHS, STATE_CENTROIDS } from '../data/usStatePaths';
import { RAMP, INK } from '../data/mapColors';
import {
  STATES, US_RATE, REF_TONS, REF_SEER, RATES_AS_OF,
  annualCost, costPerHour, usd, cents, type StateCost,
} from '../data/acCost';

type Metric = 'rate' | 'year';


interface MetricDef {
  label: string;
  /** upper bounds of the first four bins; the fifth is open-ended */
  breaks: number[];
  value: (s: StateCost) => number;
  format: (n: number) => string;
  legend: string[];
}

const yearCost = (s: StateCost) => annualCost(REF_TONS, REF_SEER, s.hours, s.rate);

const METRICS: Record<Metric, MetricDef> = {
  rate: {
    label: 'Electricity rate',
    breaks: [0.15, 0.18, 0.22, 0.28],
    value: (s) => s.rate,
    format: (n) => `${cents(n)}/kWh`,
    legend: ['Under 15¢', '15–18¢', '18–22¢', '22–28¢', '28¢ +'],
  },
  year: {
    label: 'Yearly AC cost',
    breaks: [400, 600, 800, 1000],
    value: yearCost,
    format: (n) => usd(n),
    legend: ['Under $400', '$400–600', '$600–800', '$800–1,000', '$1,000 +'],
  },
};

/** States too small to tap on the map get a labelled square beside it. */
const SMALL = ['VT', 'NH', 'MA', 'RI', 'CT', 'NJ', 'DE', 'MD', 'DC'];
/** States big enough to carry an abbreviation label. */
const NO_LABEL = new Set([...SMALL, 'HI']);

const BY_ABBR = Object.fromEntries(STATES.map((s) => [s.abbr, s])) as Record<string, StateCost>;

function binOf(def: MetricDef, v: number) {
  const i = def.breaks.findIndex((b) => v < b);
  return i === -1 ? def.breaks.length : i;
}

export default function USCostMap() {
  const [metric, setMetric] = useState<Metric>('year');
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const def = METRICS[metric];

  const active = hover ?? selected;
  const shown = active ? BY_ABBR[active] : null;
  const isSel = (a: string) => a === selected;

  const counts = [0, 0, 0, 0, 0];
  STATES.forEach((s) => { counts[binOf(def, def.value(s))] += 1; });

  const pick = (abbr: string) => setSelected((cur) => (cur === abbr ? null : abbr));

  return (
    <section id="map" aria-labelledby="map-heading" className="mb-10 scroll-mt-40">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
        <div>
          <h2 id="map-heading" className="text-xl sm:text-2xl font-bold text-gray-900">
            Map: {metric === 'rate' ? 'electricity rates' : 'what a year of AC costs'} by state
          </h2>
          <p className="text-sm text-gray-500">
            {metric === 'rate'
              ? `Average residential rate, ${RATES_AS_OF} (EIA). U.S. average ${cents(US_RATE)}.`
              : `3-ton central AC, SEER ${REF_SEER}, typical cooling hours for each state's climate.`}
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

      <div className="relative rounded-lg border border-gray-200 bg-white p-2 sm:p-4">
        <svg
          viewBox="0 0 1060 610"
          className="w-full h-auto select-none"
          role="img"
          aria-label={`Map of U.S. states shaded by ${def.label.toLowerCase()}. The same figures are in the table below.`}
          onMouseLeave={() => setHover(null)}
        >
          {STATES.map((s) => {
            const bin = binOf(def, def.value(s));
            return (
              <path
                key={s.abbr}
                d={STATE_PATHS[s.abbr]}
                fill={RAMP[bin]}
                stroke={isSel(s.abbr) ? '#17204d' : '#ffffff'}
                strokeWidth={isSel(s.abbr) ? 2.5 : 1}
                strokeLinejoin="round"
                className="cursor-pointer transition-[fill] duration-300"
                onPointerEnter={(e) => { if (e.pointerType === "mouse") setHover(s.abbr); }}
                onClick={() => pick(s.abbr)}
              />
            );
          })}
          {/* Selected outline on top so neighbours don't cover it */}
          {selected && (
            <path d={STATE_PATHS[selected]} fill="none" stroke="#17204d" strokeWidth={2.5} pointerEvents="none" />
          )}

          <g className="hidden sm:inline">
          {STATES.filter((s) => !NO_LABEL.has(s.abbr)).map((s) => {
            const [x, y] = STATE_CENTROIDS[s.abbr];
            const bin = binOf(def, def.value(s));
            return (
              <text
                key={`l-${s.abbr}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={13}
                fontWeight={600}
                fill={INK[bin]}
                pointerEvents="none"
              >
                {s.abbr}
              </text>
            );
          })}
          </g>

          {/* Squares for the small Northeast states and DC (wide screens; phones get buttons below) */}
          <g className="hidden sm:inline">
          {SMALL.map((abbr, i) => {
            const s = BY_ABBR[abbr];
            const bin = binOf(def, def.value(s));
            const y = 112 + i * 30;
            return (
              <g
                key={`c-${abbr}`}
                className="cursor-pointer"
                onPointerEnter={(e) => { if (e.pointerType === "mouse") setHover(abbr); }}
                onClick={() => pick(abbr)}
              >
                <rect
                  x={990}
                  y={y}
                  width={50}
                  height={24}
                  rx={4}
                  fill={RAMP[bin]}
                  stroke={isSel(abbr) ? '#17204d' : '#ffffff'}
                  strokeWidth={isSel(abbr) ? 2.5 : 1}
                />
                <text x={1015} y={y + 12} textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600} fill={INK[bin]} pointerEvents="none">
                  {abbr}
                </text>
              </g>
            );
          })}
          </g>
        </svg>

        <div className="sm:hidden mt-2 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-gray-500 mr-1">Small states:</span>
          {SMALL.map((abbr) => {
            const bin = binOf(def, def.value(BY_ABBR[abbr]));
            return (
              <button
                key={`m-${abbr}`}
                onClick={() => pick(abbr)}
                aria-pressed={isSel(abbr)}
                className={`min-w-[2.5rem] rounded px-2 py-1.5 font-semibold ${isSel(abbr) ? 'ring-2 ring-[#17204d]' : ''}`}
                style={{ background: RAMP[bin], color: INK[bin] }}
              >
                {abbr}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-700" aria-label="Legend">
          {def.legend.map((l, i) => (
            <li key={l} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3 w-5 rounded-sm" style={{ background: RAMP[i] }} aria-hidden="true" />
              {l} <span className="text-gray-400">({counts[i]})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Detail card: hovered or tapped state */}
      <div className="mt-3 min-h-[92px] rounded-lg border border-teal-200 bg-teal-50 px-4 py-3" aria-live="polite">
        {shown ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-bold text-gray-900">
                {shown.name}{' '}
                <span className="text-xs font-medium text-gray-500">#{shown.rank} of {STATES.length} for electricity price</span>
              </p>
              <p className="text-sm text-gray-700">
                {cents(shown.rate)}/kWh · {usd(costPerHour(REF_TONS, REF_SEER, shown.rate), 2)} an hour ·{' '}
                {usd(yearCost(shown))} a typical year{' '}
                <span className="text-gray-400">({shown.hours.toLocaleString()} hrs)</span>
              </p>
            </div>
            <Link to={`/ac-cost/${shown.slug}`} className="text-sm font-semibold text-teal-700 hover:underline whitespace-nowrap">
              {shown.name} costs →
            </Link>
          </div>
        ) : (
          <p className="text-sm text-gray-600 py-3">Tap or hover over a state to see its rate and yearly AC cost.</p>
        )}
      </div>
    </section>
  );
}

/** Small, non-interactive version of the yearly-cost map (homepage teaser). */
export function USCostMapPreview({ className = '' }: { className?: string }) {
  const def = METRICS.year;
  return (
    <svg viewBox="0 0 975 610" className={className} aria-hidden="true" focusable="false">
      {STATES.map((s) => (
        <path
          key={s.abbr}
          d={STATE_PATHS[s.abbr]}
          fill={RAMP[binOf(def, def.value(s))]}
          stroke="#ffffff"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
