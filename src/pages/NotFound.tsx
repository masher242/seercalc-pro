import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home as HomeIcon, Calculator, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | AirConditionAnswers</title>
        <meta name="description" content="This page doesn't exist. Head back to the SEER calculator, our brand reviews, or our HVAC guides." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-sm font-semibold text-blue-600 mb-2">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          We couldn't find that page
        </h1>
        <p className="text-gray-600 mb-10">
          The page may have moved or the link may be out of date. Here are a few places to go instead.
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            to="/"
            className="flex flex-col items-center gap-2 p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <HomeIcon className="w-6 h-6 text-blue-600" />
            <span className="font-medium text-gray-900">SEER Calculator</span>
          </Link>
          <Link
            to="/brands"
            className="flex flex-col items-center gap-2 p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <Calculator className="w-6 h-6 text-blue-600" />
            <span className="font-medium text-gray-900">Brand Reviews</span>
          </Link>
          <Link
            to="/blog"
            className="flex flex-col items-center gap-2 p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span className="font-medium text-gray-900">HVAC Guides</span>
          </Link>
        </div>
      </div>
    </>
  );
}
