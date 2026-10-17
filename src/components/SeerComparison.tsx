// Shared pieces for the "X vs Y SEER" comparison articles: the payback math, the
// by-location table and the interactive estimator. Rates come from the same JSON
// files as the cost pages, so every comparison updates with the monthly refresh.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { STATES, US_RATE, annualCost, usd, cents } from '../data/acCost';
import { COUNTRIES } from '../data/caribbean';
import { SEER2_FACTOR } from '../data/seer2';
import { SYSTEM_LIFE } from '../data/payback';
import { VerdictBadge, KeepYearsField, PaybackResults } from './PaybackVerdict';

/** SEER → SEER2 for ducted split systems (the site-wide factor). */
export const SPLIT_FACTOR = SEER2_FACTOR;
/** Ownership horizon used for "net over N years". */
export const LIFE = SYSTEM_LIFE;
/** Reference system and U.S.-average hours. */
export const TONS = 3;
export const US_HOURS = 1500;

/** Yearly savings of the higher SEER over the lower one. */
export const savings = (low: number, high: number, tons: number, hours: number, rate: number) =>
  annualCost(tons, low, hours, rate) - annualCost(tons, high, hours, rate);

export const years = (n: number) => (!Number.isFinite(n) || n > 40 ? 'over 40 years' : `${n.toFixed(1)} years`);
export const seer2 = (seer: number) => (seer * SPLIT_FACTOR).toFixed(1);
/** Percent less electricity at the higher SEER. */
export const pctLess = (low: number, high: number) => Math.round((1 - low / high) * 1000) / 10;

export interface Scenario {
  place: string;
  /** name as used mid-sentence */
  inName: string;
  link: string;
  rate: number;
  hours: number;
  save: number;
  payback: number;
  net: number;
}

/** U.S. average, a spread of states, and the Bahamas, for a 3-ton system. */
export function buildScenarios(low: number, high: number, premium: number): Scenario[] {
  const byName = (n: string) => STATES.find((s) => s.name === n)!;
  const bahamas = COUNTRIES.find((c) => c.slug === 'bahamas');
  return [
    { place: 'U.S. average', inName: 'the U.S. on average', link: '/ac-cost', rate: US_RATE, hours: US_HOURS },
    ...['Ohio', 'New York', 'California', 'Florida', 'Texas', 'Arizona', 'Hawaii'].map((n) => {
      const s = byName(n);
      return { place: s.name, inName: s.name, link: `/ac-cost/${s.slug}`, rate: s.rate, hours: s.hours };
    }),
    ...(bahamas ? [{ place: 'The Bahamas', inName: 'the Bahamas', link: `/ac-cost/${bahamas.slug}`, rate: bahamas.usdRate, hours: bahamas.hours }] : []),
  ].map((s) => {
    const save = savings(low, high, TONS, s.hours, s.rate);
    return { ...s, save, payback: premium / save, net: save * LIFE - premium };
  });
}

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

export function ScenarioTable({ rows }: { rows: Scenario[] }) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-teal-50">
            <th className={th}>Location</th>
            <th className={th}>Rate</th>
            <th className={th}>Cooling hrs/yr</th>
            <th className={th}>Saved per year</th>
            <th className={th}>Payback</th>
            <th className={th}>Verdict</th>
            <th className={th}>Net over {LIFE} yrs, if it lasts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.place}>
              <td className={td}><Link to={s.link} className={a}>{s.place}</Link></td>
              <td className={td}>{cents(s.rate)}</td>
              <td className={td}>{s.hours.toLocaleString()}</td>
              <td className={td}>{usd(s.save)}</td>
              <td className={td}>{years(s.payback)}</td>
              <td className={td}><VerdictBadge payback={s.payback} /></td>
              <td className={`${td} ${s.net >= 0 ? 'text-teal-700 font-semibold' : 'text-red-700'}`}>{s.net >= 0 ? '+' : '−'}{usd(Math.abs(s.net))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PaybackEstimator({ low, high, premium: defaultPremium }: { low: number; high: number; premium: number }) {
  const [tons, setTons] = useState(TONS);
  const [rateC, setRateC] = useState(+(US_RATE * 100).toFixed(2));
  const [hours, setHours] = useState(US_HOURS);
  const [premium, setPremium] = useState(defaultPremium);
  const [keep, setKeep] = useState(LIFE);

  const yearly = savings(low, high, tons, hours, rateC / 100);
  const input = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500';
  const label = 'block text-sm font-medium text-gray-700 mb-1';
  const id = `pb-${low}-${high}`;

  return (
    <div className="rounded-lg border border-teal-200 bg-teal-50/50 p-5 mb-6">
      <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-3">Your numbers: {low} vs {high} SEER</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
        <div>
          <label htmlFor={`${id}-tons`} className={label}>System size</label>
          <select id={`${id}-tons`} className={input} value={tons} onChange={(e) => setTons(Number(e.target.value))}>
            {[1.5, 2, 2.5, 3, 3.5, 4, 5].map((t) => <option key={t} value={t}>{t} ton</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-rate`} className={label}>Rate (¢/kWh)</label>
          <input id={`${id}-rate`} type="number" min={1} max={150} step={0.01} className={input} value={rateC}
            onChange={(e) => setRateC(Math.max(0, Number(e.target.value)))} />
        </div>
        <div>
          <label htmlFor={`${id}-hours`} className={label}>Cooling hours/yr</label>
          <input id={`${id}-hours`} type="number" min={0} max={8760} step={100} className={input} value={hours}
            onChange={(e) => setHours(Math.min(8760, Math.max(0, Number(e.target.value))))} />
        </div>
        <div>
          <label htmlFor={`${id}-prem`} className={label}>Extra cost of {high} ($)</label>
          <input id={`${id}-prem`} type="number" min={0} step={100} className={input} value={premium}
            onChange={(e) => setPremium(Math.max(0, Number(e.target.value)))} />
        </div>
        <KeepYearsField id={`${id}-keep`} value={keep} onChange={setKeep} className={input} labelClass={label} />
      </div>
      <PaybackResults yearly={yearly} premium={premium} keep={keep} money={(n) => usd(n)} />
      <p className="text-xs text-gray-500 mt-3">
        Electricity savings only, at today's rate. Your rate is on your bill; the extra cost is the difference between two
        quotes for the same size system from the same installer.
      </p>
    </div>
  );
}

/** Links to the other comparisons in the series. */
export function ComparisonSeries({ current }: { current: string }) {
  const all = [
    { path: '/blog/14-vs-16-seer', label: '14 vs 16 SEER' },
    { path: '/blog/16-vs-18-seer', label: '16 vs 18 SEER' },
    { path: '/blog/18-vs-20-seer', label: '18 vs 20 SEER' },
  ].filter((x) => x.path !== current);
  return (
    <p className="text-gray-700 leading-relaxed mb-4">
      Other comparisons in this series:{' '}
      {all.map((x, i) => (
        <span key={x.path}>
          {i > 0 && ' · '}
          <Link to={x.path} className={a}>{x.label}</Link>
        </span>
      ))}
      . Every rating from 8 to 25 is in the <Link to="/blog/seer-rating-chart" className={a}>SEER rating chart</Link>.
    </p>
  );
}
