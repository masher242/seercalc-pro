import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calculator, ArrowRight, Clock } from 'lucide-react';

const liveCalculators = [
  {
    slug: '/',
    title: 'SEER Savings Calculator',
    description: 'Enter your current SEER rating and a new system\'s SEER2 to see exact annual electricity savings at your local rate — with payback period.',
    inputs: 'Current SEER, new SEER2, electricity rate, cooling hours',
    bestFor: 'Anyone comparing new AC systems or curious how much their old system is costing them',
    time: '2 min',
    isHome: true,
  },
  {
    slug: '/calculators/repair-vs-replace',
    title: 'AC Repair vs. Replace Calculator',
    description: 'Should you pay for the repair or buy a new system? Enter your repair quote, system age, and efficiency ratings to get a clear recommendation with the math behind it.',
    inputs: 'System age, repair cost, current SEER, new system cost, new SEER2, electricity rate',
    bestFor: 'Homeowners facing a repair bill who want to know if replacement makes more financial sense',
    time: '3 min',
    isHome: false,
  },
  {
    slug: '/calculators/seer-to-seer2',
    title: 'SEER to SEER2 Converter',
    description: 'Convert any SEER rating to SEER2 (or back) to compare old and new systems accurately. Includes a quick-reference table for common ratings and a 2026 regional compliance check.',
    inputs: 'Your SEER or SEER2 rating, system type (split or mini-split)',
    bestFor: 'Anyone comparing a pre-2023 system to new quotes, or checking if a quoted system is actually an upgrade',
    time: '1 min',
    isHome: false,
  },
  {
    slug: '/calculators/ac-sizing',
    title: 'AC Sizing Calculator',
    description: 'What size AC do you actually need? Answer questions about your home\'s construction, insulation, and sun exposure to get a recommended tonnage range — and sanity-check your contractor\'s quote.',
    inputs: 'Square footage, state, ceiling height, wall type, attic insulation, roof color, sun exposure, windows',
    bestFor: 'Homeowners buying a new AC who want to verify their contractor\'s sizing recommendation',
    time: '4 min',
    isHome: false,
  },
];

const comingSoon = [
  { title: 'Tax Credit & Rebate Estimator', description: 'See which state and utility rebates you qualify for based on your location, income, and system type.' },
];

export default function CalculatorsIndex() {
  return (
    <>
      <Helmet>
        <title>Free HVAC Calculators 🧮 Savings, Sizing & Repair vs Replace (2026)</title>
        <meta name="description" content="Four free calculators to arm you before talking to a contractor: SEER savings, AC sizing, repair vs replace, and SEER-to-SEER2 converter. Real numbers, no signup, no email gate." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://seercalc.pro/calculators" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seercalc.pro/calculators" />
        <meta property="og:title" content="Free HVAC Calculators — Savings, Repair vs. Replace & More" />
        <meta property="og:description" content="Free HVAC calculators to help you make smarter decisions before spending $6,000–$15,000 on a new AC system." />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">

        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Calculator className="w-4 h-4 text-teal-500" />
            <span className="text-teal-600 font-medium">Calculators</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Free HVAC Calculators</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Real numbers before a $6,000–$15,000 decision. No email required, no ads, no upsells.
          </p>
        </div>

        {/* Quick Answer */}
        <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg mb-10">
          <p className="text-sm font-semibold text-teal-800 uppercase tracking-wide mb-2">Most Popular</p>
          <p className="text-gray-800">The <strong>SEER Savings Calculator</strong> shows exactly how much your old AC is costing you vs. a new system — at your specific electricity rate. The <strong>Repair vs. Replace Calculator</strong> tells you whether to pay that repair bill or put the money toward a new system.</p>
        </div>

        {/* Live calculators */}
        <div className="mb-10 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Available Now</h2>
          {liveCalculators.map(calc => (
            <div key={calc.slug} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-teal-300 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{calc.title}</h3>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />{calc.time} to complete
                  </span>
                </div>
                <Calculator className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">{calc.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-xs text-gray-500 mb-0.5">Inputs needed</p>
                  <p className="text-gray-700 text-xs">{calc.inputs}</p>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-xs text-gray-500 mb-0.5">Best for</p>
                  <p className="text-gray-700 text-xs">{calc.bestFor}</p>
                </div>
              </div>

              <Link
                to={calc.slug}
                className="inline-flex items-center gap-2 bg-teal-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors"
              >
                <Calculator className="w-4 h-4" />
                Open Calculator
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Coming soon */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-gray-500 text-sm mb-5">More tools in development.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {comingSoon.map(calc => (
              <div key={calc.title} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-700 text-sm mb-1">{calc.title}</p>
                <p className="text-xs text-gray-500">{calc.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why these calculators */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Why These Calculators Exist</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            The HVAC industry doesn't make it easy to compare systems objectively. SEER and SEER2 ratings aren't directly comparable. Repair vs. replace decisions involve multiple variables that contractors rarely walk you through. Rebate eligibility varies by state, utility, and income. These tools exist to give you the same analysis a good HVAC engineer would do — in under 5 minutes, for free.
          </p>
        </div>

      </main>
    </>
  );
}
