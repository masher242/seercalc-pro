import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Star, Calculator, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const location = useLocation();
  const isBlogPage = location.pathname.startsWith('/blog');
  const isBrandsPage = location.pathname.startsWith('/brands');
  const isCalcPage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navItems = [
    { to: '/', label: 'Calculator', shortLabel: 'Calc', icon: Calculator, active: isCalcPage },
    { to: '/blog', label: 'Efficiency Hub', shortLabel: 'Hub', icon: BookOpen, active: isBlogPage },
    { to: '/brands', label: 'Brand Reviews', shortLabel: 'Brands', icon: Star, active: isBrandsPage },
  ];

  return (
    <header className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-shadow duration-200 ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-[80px]">

          {/* Logo */}
          <Link to="/" className="flex flex-col hover:opacity-80 transition-opacity flex-shrink-0">
            <img src="/logo_final_transparent.png" alt="SeerCalc.pro" className="h-9 lg:h-12 w-auto" />
            <p className="hidden sm:block text-[13px] font-medium text-gray-500 mt-1 tracking-wide">
              Smarter HVAC. Lower Bills.
            </p>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map(({ to, label, icon: Icon, active }) => (
              <Link
                key={to}
                to={to}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold border-2 transition-all duration-200 text-[14px] ${
                  active
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-teal-400 hover:text-teal-600 hover:shadow-sm'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon, active }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-[15px] transition-colors ${
                active
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
