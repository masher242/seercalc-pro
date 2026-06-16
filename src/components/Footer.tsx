import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Calculator</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  SEER Calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Efficiency Hub</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link to="/blog/hvac-seer-calculator-faq" className="text-gray-600 hover:text-blue-600 transition-colors">
                  HVAC FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.energystar.gov" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                  ENERGY STAR
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            © 2025 <span className="font-semibold text-gray-900">seercalc.pro</span> - HVAC SEER Savings Calculator
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Estimates based on industry-standard calculations. Actual savings may vary.
          </p>
        </div>
      </div>
    </footer>
  );
}
