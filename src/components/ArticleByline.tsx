import { Link } from 'react-router-dom';
import { AUTHOR } from '../data/site';

/**
 * "By Mark Curant · Updated <date>" line shown in every article and review header.
 * Pass `updated` (YYYY-MM-DD) only on pages that don't already show a date.
 */
export default function ArticleByline({ updated }: { updated?: string }) {
  const label = updated
    ? new Date(`${updated}T12:00:00Z`).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : null;

  return (
    <p className="mt-4 text-sm text-gray-600">
      By{' '}
      <Link to={AUTHOR.path} rel="author" className="font-semibold text-gray-900 hover:text-teal-700 underline-offset-2 hover:underline">
        {AUTHOR.name}
      </Link>
      {label && updated && (
        <>
          <span className="mx-2 text-gray-400">·</span>
          Updated <time dateTime={updated}>{label}</time>
        </>
      )}
    </p>
  );
}
