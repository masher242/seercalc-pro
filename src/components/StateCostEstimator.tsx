import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { TONNAGES, SUMMER_MONTH_HOURS, annualCost, costPerHour, usd } from '../data/acCost';

const SEER_OPTIONS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

interface Props {
  stateName: string;
  /** state average residential rate, $/kWh */
  stateRate: number;
  /** typical annual cooling hours for the state */
  stateHours: number;
}

/**
 * "Your numbers" box on each state page. Starts from the state's EIA rate and typical
 * hours (from stateRates.json via acCost.ts), and recalculates as the visitor changes inputs.
 */
export default function StateCostEstimator({ stateName, stateRate, stateHours }: Props) {
  const [tons, setTons] = useState(3);
  const [currentSeer, setCurrentSeer] = useState(10);
  const [newSeer, setNewSeer] = useState(16);
  const [hours, setHours] = useState(stateHours);
  const [rateCents, setRateCents] = useState(Math.round(stateRate * 10000) / 100);

  const rate = Math.max(rateCents, 0) / 100;
  const nowYear = annualCost(tons, currentSeer, hours, rate);
  const newYear = annualCost(tons, newSeer, hours, rate);
  const saving = nowYear - newYear;
  const edited = rateCents !== Math.round(stateRate * 10000) / 100 || hours !== stateHours;
  const calcLink = `/?rate=${rate.toFixed(4)}&hours=${hours}`;

  const label = 'block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5';
  const select = 'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 font-semibold focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none';

  return (
    <section aria-label={`AC cost estimator for ${stateName}`} className="rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white p-5 sm:p-6 mb-8">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <SlidersHorizontal className="w-5 h-5 text-teal-600" />
          Your numbers in {stateName}
        </h2>
        {edited && (
          <button
            type="button"
            onClick={() => { setRateCents(Math.round(stateRate * 10000) / 100); setHours(stateHours); }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset to {stateName} average
          </button>
        )}
      </div>

      <div className="mb-4">
        <span className={label}>System size</span>
        <div className="flex flex-wrap gap-1.5">
          {TONNAGES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTons(t)}
              aria-pressed={tons === t}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                tons === t ? 'bg-[#17204d] text-white border-[#17204d]' : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400'
              }`}
            >
              {t} ton
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <label>
          <span className={label}>Your SEER now</span>
          <select className={select} value={currentSeer} onChange={(e) => setCurrentSeer(Number(e.target.value))}>
            {SEER_OPTIONS.map((s) => <option key={s} value={s}>SEER {s}</option>)}
          </select>
        </label>
        <label>
          <span className={label}>New system SEER</span>
          <select className={select} value={newSeer} onChange={(e) => setNewSeer(Number(e.target.value))}>
            {SEER_OPTIONS.map((s) => <option key={s} value={s}>SEER {s}</option>)}
          </select>
        </label>
        <label>
          <span className={label}>Hours / year</span>
          <input
            type="number" min={0} max={8760} step={100} inputMode="numeric"
            className={select} value={hours}
            onChange={(e) => setHours(Math.min(8760, Math.max(0, Number(e.target.value) || 0)))}
          />
        </label>
        <label>
          <span className={label}>Rate (¢/kWh)</span>
          <input
            type="number" min={0} max={200} step={0.01} inputMode="decimal"
            className={select} value={rateCents}
            onChange={(e) => setRateCents(Number(e.target.value) || 0)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" aria-live="polite">
        <div className="rounded-lg bg-white border border-gray-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Your AC now (SEER {currentSeer})</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{usd(nowYear)}<span className="text-sm font-medium text-gray-500">/yr</span></p>
          <p className="text-xs text-gray-500 mt-1">
            {usd(costPerHour(tons, currentSeer, rate), 2)}/hr · {usd(costPerHour(tons, currentSeer, rate) * SUMMER_MONTH_HOURS)} summer month
          </p>
        </div>
        <div className="rounded-lg bg-white border border-gray-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">New system (SEER {newSeer})</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{usd(newYear)}<span className="text-sm font-medium text-gray-500">/yr</span></p>
          <p className="text-xs text-gray-500 mt-1">
            {usd(costPerHour(tons, newSeer, rate), 2)}/hr · {usd(costPerHour(tons, newSeer, rate) * SUMMER_MONTH_HOURS)} summer month
          </p>
        </div>
        <div className={`rounded-lg p-4 ${saving >= 0 ? 'bg-[#17204d] text-white' : 'bg-amber-50 border border-amber-200 text-gray-900'}`}>
          <p className={`text-xs font-semibold uppercase tracking-wide ${saving >= 0 ? 'text-teal-200' : 'text-amber-700'}`}>
            {saving >= 0 ? 'You would save' : 'Extra cost'}
          </p>
          <p className="text-2xl font-bold mt-1">{usd(Math.abs(saving))}<span className={`text-sm font-medium ${saving >= 0 ? 'text-teal-100' : 'text-gray-500'}`}>/yr</span></p>
          <p className={`text-xs mt-1 ${saving >= 0 ? 'text-teal-100' : 'text-gray-600'}`}>{usd(Math.abs(saving) * 10)} over 10 years</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Starts from {stateName.endsWith('s') ? `${stateName}'` : `${stateName}'s`} average residential rate and typical cooling hours. Want payback on a quote?{' '}
        <Link to={calcLink} className="font-semibold text-teal-700 hover:underline">Open the full calculator with these numbers →</Link>
      </p>
    </section>
  );
}
