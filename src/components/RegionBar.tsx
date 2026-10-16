import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Map as MapIcon, Palmtree, Leaf, Landmark } from 'lucide-react';
import { STATES } from '../data/acCost';
import { COUNTRIES } from '../data/caribbean';
import { EU_COUNTRIES } from '../data/europe';

/**
 * Pinned row under the header on every /ac-cost page, so readers can jump between
 * the U.S. map and the other regions from anywhere in that section.
 * To add a region: add an entry here with a `match` for its hub and detail pages.
 */
const STATE_SLUGS = new Set(STATES.map((s) => s.slug));
const CARIBBEAN_SLUGS = new Set(COUNTRIES.map((c) => c.slug));
const EUROPE_SLUGS = new Set(EU_COUNTRIES.map((c) => c.slug));

const slugOf = (pathname: string) => pathname.replace(/^\/ac-cost\/?/, '').split('/')[0];

export const REGIONS = [
  {
    to: '/ac-cost',
    label: 'U.S. states map',
    short: 'U.S.',
    icon: MapIcon,
    match: (p: string) => p === '/ac-cost' || STATE_SLUGS.has(slugOf(p)),
  },
  {
    to: '/ac-cost/caribbean',
    label: 'Caribbean',
    short: 'Caribbean',
    icon: Palmtree,
    match: (p: string) => slugOf(p) === 'caribbean' || CARIBBEAN_SLUGS.has(slugOf(p)),
  },
  {
    to: '/ac-cost/canada',
    label: 'Canada',
    short: 'Canada',
    icon: Leaf,
    match: (p: string) => slugOf(p) === 'canada',
  },
  {
    to: '/ac-cost/europe',
    label: 'Europe',
    short: 'Europe',
    icon: Landmark,
    match: (p: string) => slugOf(p) === 'europe' || EUROPE_SLUGS.has(slugOf(p)),
  },
];

export function showRegionBar(pathname: string) {
  return pathname === '/ac-cost' || pathname.startsWith('/ac-cost/');
}

export default function RegionBar() {
  const { pathname } = useLocation();
  const p = pathname.replace(/\/$/, '') || '/';
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [pathname]);

  return (
    <nav aria-label="AC costs by region" className="border-t border-gray-100 bg-gradient-to-r from-orange-50/80 via-white to-teal-50/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-3 py-2 sm:py-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-gray-500 mr-1 flex-shrink-0">
            AC costs in
          </span>
          {REGIONS.map(({ to, label, short, icon: Icon, match }) => {
            const active = match(p);
            return (
              <Link
                key={to}
                to={to}
                ref={active ? activeRef : undefined}
                aria-current={active ? 'page' : undefined}
                className={`group inline-flex items-center gap-1 sm:gap-2 flex-shrink-0 rounded-full pl-1 pr-2.5 sm:pl-1.5 sm:pr-4 py-1 sm:py-1.5 text-[13px] sm:text-sm font-semibold border transition-all duration-200 ${
                  active
                    ? 'bg-[#17204d] text-white border-[#17204d] shadow-sm'
                    : 'bg-white text-gray-800 border-gray-200 hover:border-teal-400 hover:text-teal-700 hover:shadow-sm'
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 rounded-full ${
                    active ? 'bg-white/15 text-white' : 'bg-orange-50 text-orange-600 group-hover:bg-orange-100'
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </span>
                <span className="sm:hidden">{short}</span>
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
