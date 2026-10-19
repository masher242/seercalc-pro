import { Link } from 'react-router-dom';
import { Fan } from 'lucide-react';
import { FAN_SERIES } from '../data/fans';

/** "Fans and airflow" box linking the other articles in the series. */
export default function FanSeries({ current }: { current: string }) {
  return (
    <div className="rounded-lg border border-teal-200 bg-teal-50/40 p-5 mb-8">
      <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">
        <Fan className="w-4 h-4" /> Fans and airflow: the series
      </p>
      <ol className="list-decimal pl-5 space-y-1 text-gray-700">
        {FAN_SERIES.map((s) => (
          <li key={s.path}>
            {s.path === current ? (
              <span className="font-semibold text-gray-900">{s.label} (this page)</span>
            ) : (
              <Link to={s.path} className="text-teal-600 hover:text-teal-700 font-medium">{s.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
