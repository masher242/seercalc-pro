import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { PiggyBank, Wrench, ArrowLeftRight, Ruler, LayoutGrid } from 'lucide-react';

/**
 * Pinned row of calculator shortcuts shown under the header on the homepage and
 * every calculator page, so all tools are one tap away while scrolling.
 */
export const CALCULATORS = [
  { to: '/', label: 'SEER Savings', short: 'Savings', long: 'SEER Savings Calculator', icon: PiggyBank },
  { to: '/calculators/repair-vs-replace', label: 'Repair or Replace', short: 'Repair', long: 'Repair vs. Replace Calculator', icon: Wrench },
  { to: '/calculators/seer-to-seer2', label: 'SEER → SEER2', short: 'SEER2', long: 'SEER to SEER2 Converter', icon: ArrowLeftRight },
  { to: '/calculators/ac-sizing', label: 'AC Size', short: 'Size', long: 'AC Sizing Calculator', icon: Ruler },
];

export function showCalculatorBar(pathname: string) {
  return pathname === '/' || pathname === '/calculators' || pathname.startsWith('/calculators/');
}

export default function CalculatorBar() {
  const { pathname } = useLocation();
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  // On narrow screens the row scrolls sideways; make sure the current calculator is visible.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [pathname]);

  return (
    <nav aria-label="Calculators" className="border-t border-gray-100 bg-gradient-to-r from-teal-50/80 via-white to-sky-50/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-3 py-2 sm:py-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider text-gray-500 mr-1 flex-shrink-0">
            Free calculators
          </span>
          {CALCULATORS.map(({ to, label, short, long, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                ref={active ? activeRef : undefined}
                title={long}
                aria-current={active ? 'page' : undefined}
                className={`group inline-flex items-center gap-1 sm:gap-2 flex-shrink-0 rounded-full pl-1 pr-2.5 sm:pl-1.5 sm:pr-4 py-1 sm:py-1.5 text-[13px] sm:text-sm font-semibold border transition-all duration-200 ${
                  active
                    ? 'bg-[#17204d] text-white border-[#17204d] shadow-sm'
                    : 'bg-white text-gray-800 border-gray-200 hover:border-teal-400 hover:text-teal-700 hover:shadow-sm'
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 rounded-full ${
                    active ? 'bg-white/15 text-white' : 'bg-teal-50 text-teal-600 group-hover:bg-teal-100'
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </span>
                <span className="sm:hidden">{short}</span>
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
          <Link
            to="/calculators"
            className={`hidden sm:inline-flex items-center gap-1.5 flex-shrink-0 text-sm font-semibold px-3 py-1.5 rounded-full transition-colors ${
              pathname === '/calculators' ? 'text-teal-700' : 'text-gray-500 hover:text-teal-700'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            All
          </Link>
        </div>
      </div>
    </nav>
  );
}
