import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const location = useLocation();
  const isBlogPage = location.pathname.startsWith('/blog');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-shadow duration-200 ${
      isScrolled ? 'shadow-sm' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-[80px]">
          <Link to="/" className="flex flex-col hover:opacity-80 transition-opacity">
            <img
              src="/logo_final_transparent.png"
              alt="SeerCalc.pro"
              className="h-9 lg:h-12 w-auto"
            />
            <p className="hidden sm:block text-[13px] font-medium text-gray-500 mt-1 tracking-wide">
              Smarter HVAC. Lower Bills.
            </p>
          </Link>

          <nav>
            <Link
              to="/blog"
              className={`group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-semibold border-2 transition-all duration-200 text-[15px] ${
                isBlogPage
                  ? 'bg-teal-500 text-white border-teal-500'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-teal-500 hover:shadow-md'
              }`}
              title="Learn about HVAC savings, brands, maintenance, tax credits & find installers"
            >
              <BookOpen className="w-5 h-5" />
              <span className="hidden sm:inline">Efficiency Hub</span>
              <span className="sm:hidden">Hub</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
