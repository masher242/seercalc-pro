import { TrendingDown, Leaf, DollarSign, Calendar, RefreshCw, Share2 } from 'lucide-react';
import { CalculationResults } from '../types';

interface ResultsSectionProps {
  results: CalculationResults;
  onStartOver: () => void;
}

export default function ResultsSection({ results, onStartOver }: ResultsSectionProps) {
  const maxCost = Math.max(results.oldAnnualCost, results.newAnnualCost, results.annualSavings);

  const chartData = [
    {
      name: 'Old System',
      cost: results.oldAnnualCost,
      color: '#ef4444',
      bgColor: 'bg-red-500'
    },
    {
      name: 'New System',
      cost: results.newAnnualCost,
      color: '#3b82f6',
      bgColor: 'bg-blue-500'
    },
    {
      name: 'Your Savings',
      cost: results.annualSavings,
      color: '#10b981',
      bgColor: 'bg-green-500'
    }
  ];

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="animate-fadeIn" data-results-section>
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg p-6 md:p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <TrendingDown className="w-7 h-7 text-green-600" />
          Your Savings Results
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-sm text-gray-600 mb-1">Annual Savings</div>
            <div className="text-4xl font-bold text-green-600">${results.annualSavings.toFixed(0)}</div>
            <div className="text-xs text-gray-500 mt-1">per year</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-sm text-gray-600 mb-1">Monthly Savings</div>
            <div className="text-4xl font-bold text-green-600">${results.monthlySavings.toFixed(0)}</div>
            <div className="text-xs text-gray-500 mt-1">per month</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-sm text-gray-600 mb-1">5-Year Savings</div>
            <div className="text-4xl font-bold text-blue-600">${results.fiveYearSavings.toFixed(0)}</div>
            <div className="text-xs text-gray-500 mt-1">total saved</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-sm text-gray-600 mb-1">10-Year Savings</div>
            <div className="text-4xl font-bold text-blue-600">${results.tenYearSavings.toFixed(0)}</div>
            <div className="text-xs text-gray-500 mt-1">total saved</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Annual Cost Comparison</h3>
          <div className="space-y-6">
            {chartData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  <span className="text-lg font-bold text-gray-900">${item.cost.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-12 relative overflow-hidden">
                  <div
                    className={`${item.bgColor} h-12 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-4`}
                    style={{ width: `${(item.cost / maxCost) * 100}%` }}
                  >
                    <span className="text-white font-semibold text-sm">
                      ${item.cost.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {results.paybackYears > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-md flex items-start gap-3">
              <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <div className="text-sm text-gray-600 mb-1">Payback Period</div>
                <div className="text-3xl font-bold text-gray-900">{results.paybackYears.toFixed(1)} years</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md flex items-start gap-3">
              <DollarSign className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <div className="text-sm text-gray-600 mb-1">10-Year ROI</div>
                <div className="text-3xl font-bold text-gray-900">{results.roi.toFixed(0)}%</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            Environmental Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">CO₂ Reduced Annually</div>
              <div className="text-2xl font-bold text-green-600">{results.co2Reduced.toFixed(0)} lbs</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Equivalent Trees Planted</div>
              <div className="text-2xl font-bold text-green-600">{results.treesEquivalent.toFixed(1)} trees</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleShare}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share Results
          </button>
          <button
            onClick={onStartOver}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Start Over
          </button>
        </div>
      </div>

      <div data-ad-zone="below-results" className="min-h-[100px] bg-gray-50 rounded-lg hidden"></div>

      <div data-cta-zone="professional-quote" className="hidden mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Upgrade?</h3>
        <p className="text-gray-600 mb-4">Get professional quotes from certified HVAC contractors in your area.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
          Get Free Quotes
        </button>
      </div>

      <div data-email-capture-zone className="hidden mt-6"></div>
    </div>
  );
}
