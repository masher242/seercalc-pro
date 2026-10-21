import type { ReactNode } from 'react';
import { REF_TONS, REF_SEER, kw, coolingKw } from '../data/acCost';

/**
 * "What this table shows" box that sits above a cost table (owner's clarity rule):
 * say what size the costs are for, what "per hour" / "per year" mean and how they're worked out.
 */
export default function TableExplainer({ children, title = 'What this table shows' }: { children: ReactNode; title?: string }) {
  return (
    <div className="rounded-lg border border-teal-200 bg-teal-50/60 p-4 mb-4 text-sm text-gray-800">
      <p className="font-bold text-gray-900 mb-2">{title}</p>
      {children}
    </div>
  );
}

/** Opening sentence for tables built on the reference system (3-ton central AC, SEER 14). */
export function RefSystemSentence({ tons = REF_TONS, seer = REF_SEER }: { tons?: number; seer?: number }) {
  return (
    <p className="mb-2">
      Every cost is for <strong>one {tons}-ton central air conditioner rated SEER {seer}</strong>, a common size for a
      1,500–1,800 sq ft home. {tons} tons is how much <em>cooling</em> it puts out:{' '}
      <strong>{(tons * 12000).toLocaleString()} BTU an hour</strong>, about {coolingKw(tons).toFixed(1)} kW of cooling. It
      is not the electricity it uses: at SEER {seer} it uses about{' '}
      <strong>{kw(tons, seer).toFixed(2)} kWh of electricity for each hour it runs</strong> at full power.
    </p>
  );
}

/** One-line note on what "a year" means: full-power hours, our estimate. */
export function HoursNote({ children }: { children?: ReactNode }) {
  return (
    <>
      the cost per hour × how many hours a year the AC runs at full power. Real systems cycle on and off, so this is
      their total running time added up. The hours are our estimate for the climate{children}. A bigger or smaller
      home, a different thermostat setting or a second unit changes the result.
    </>
  );
}
