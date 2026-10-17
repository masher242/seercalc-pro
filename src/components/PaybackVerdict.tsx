// Shared UI for judging an efficiency upgrade: the verdict badge, the "how we judge"
// explanation box and the "years you'll keep it" field. Logic lives in data/payback.ts.
import { verdict, VERDICT_STYLE, GOOD_MAX, MARGINAL_MAX, SYSTEM_LIFE } from '../data/payback';

export function VerdictBadge({ payback }: { payback: number }) {
  const v = verdict(payback);
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ${VERDICT_STYLE[v.id]}`}>
      {v.label}
    </span>
  );
}

export function HowWeJudge() {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 mb-4">
      <p className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">How we judge an upgrade</p>
      <p className="text-gray-700 leading-relaxed mb-3">
        Central air typically lasts about {SYSTEM_LIFE} years; in my own stores, {SYSTEM_LIFE} years isn't unreasonable.
        But "it pays back before the system dies" is too low a bar. Money spent today is worth more than savings that
        trickle back over a decade, and many people sell before the system is worn out. So we use three verdicts:
      </p>
      <ul className="space-y-1.5 text-gray-700">
        <li><span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold mr-2 ${VERDICT_STYLE.good}`}>Good deal</span>pays back within {GOOD_MAX} years</li>
        <li><span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold mr-2 ${VERDICT_STYLE.marginal}`}>Marginal</span>{GOOD_MAX}–{MARGINAL_MAX} years: only if you'll keep the system well past that</li>
        <li><span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold mr-2 ${VERDICT_STYLE.no}`}>Not worth it for savings</span>over {MARGINAL_MAX} years</li>
      </ul>
      <p className="text-xs text-gray-500 mt-3">
        Our rule of thumb, on electricity savings alone. Comfort, noise, rebates and warranties can still tip the decision.
      </p>
    </div>
  );
}

/** The estimator's "how long you'll keep it" input. */
export function KeepYearsField({ id, value, onChange, className, labelClass }: {
  id: string;
  value: number;
  onChange: (n: number) => void;
  className: string;
  labelClass: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>Years you'll keep it</label>
      <input id={id} type="number" min={1} max={30} step={1} className={className} value={value}
        onChange={(e) => onChange(Math.min(30, Math.max(1, Math.round(Number(e.target.value)) || 1)))} />
    </div>
  );
}

/** Result tiles: saved per year, payback with verdict, net over the years kept. */
export function PaybackResults({ yearly, premium, keep, money }: {
  yearly: number;
  premium: number;
  keep: number;
  money: (n: number) => string;
}) {
  const payback = yearly > 0 ? premium / yearly : Infinity;
  const net = yearly * keep - premium;
  const v = verdict(payback);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500">Saved per year</p>
          <p className="text-2xl font-bold text-gray-900">{money(yearly)}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500">Payback</p>
          <p className="text-2xl font-bold text-gray-900">
            {Number.isFinite(payback) ? (payback > 40 ? 'over 40 years' : `${payback.toFixed(1)} years`) : '—'}
          </p>
          <p className="mt-1"><VerdictBadge payback={payback} /></p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500">Net over {keep} {keep === 1 ? 'year' : 'years'}</p>
          <p className={`text-2xl font-bold ${net >= 0 ? 'text-teal-700' : 'text-red-700'}`}>
            {net >= 0 ? '+' : '−'}{money(Math.abs(net))}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-3">{v.note}</p>
    </>
  );
}
