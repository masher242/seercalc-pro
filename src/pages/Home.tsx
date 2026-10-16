import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import CalculatorForm from '../components/CalculatorForm';
import { USCostMapPreview } from '../components/USCostMap';
import { REGIONS } from '../components/RegionBar';
import ResultsSection from '../components/ResultsSection';
import LeadMagnet from '../components/LeadMagnet';
import { CalculatorInputs, CalculationResults } from '../types';
import { calculateSavings } from '../utils/calculations';
import { saveInputs, loadInputs } from '../utils/localStorage';
import { US_RATE } from '../data/acCost';

const DEFAULT_INPUTS: CalculatorInputs = {
  currentSEER: 10,
  newSEER: 16,
  tonnage: 2.5,
  hoursPerYear: 1200,
  // U.S. average residential rate from the EIA data file (src/data/stateRates.json)
  electricityRate: Math.round(US_RATE * 10000) / 10000,
  upgradeCost: 0
};

export default function Home() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedInputs = loadInputs();
    // Links from the cost pages can pre-fill the calculator, e.g. /?rate=0.1745&hours=1500
    const params = new URLSearchParams(window.location.search);
    const rate = Number(params.get('rate'));
    const hours = Number(params.get('hours'));
    const fromLink: Partial<CalculatorInputs> = {};
    if (rate > 0 && rate < 2) fromLink.electricityRate = rate;
    if (hours > 0 && hours <= 8760) fromLink.hoursPerYear = Math.round(hours);
    if (savedInputs || Object.keys(fromLink).length) {
      const merged = { ...DEFAULT_INPUTS, ...(savedInputs ?? {}), ...fromLink };
      setInputs(merged);
      if (Object.keys(fromLink).length) saveInputs(merged);
    }
  }, []);

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);
    saveInputs(newInputs);
  };

  const handleCalculate = () => {
    const calculatedResults = calculateSavings(inputs);
    setResults(calculatedResults);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleStartOver = () => {
    setInputs(DEFAULT_INPUTS);
    setResults(null);
    saveInputs(DEFAULT_INPUTS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>SEER Calculator ❄️ See Your AC Savings Before You Buy (Free)</title>
        <meta name="description" content="Enter your SEER rating and get personalized savings for your home size, climate, and electric rate. Most save $300–$800/year. Free, instant." />
        <link rel="canonical" href="https://airconditionanswers.com/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://airconditionanswers.com/" />
        <meta property="og:title" content="SEER Calculator ❄️ See Your Exact AC Savings Before You Buy" />
        <meta property="og:description" content="Enter your current SEER rating and get personalized savings — tailored to your home size, climate zone, and electric rate. Free, instant, no email required." />
        <meta property="og:image" content="https://airconditionanswers.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="AirConditionAnswers" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://airconditionanswers.com/" />
        <meta name="twitter:title" content="SEER Calculator ❄️ See Your Exact AC Savings Before You Buy" />
        <meta name="twitter:description" content="Enter your current SEER rating and get personalized savings — tailored to your home size, climate zone, and electric rate. Free, instant, no email required." />
        <meta name="twitter:image" content="https://airconditionanswers.com/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "@id": "https://airconditionanswers.com/#calculator",
            "name": "SEER Savings Calculator",
            "url": "https://airconditionanswers.com/",
            "description": "Free calculator that estimates annual cooling cost and savings from upgrading an air conditioner, based on SEER rating, unit size, hours of use and electricity rate.",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "isAccessibleForFree": true,
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "publisher": { "@id": "https://airconditionanswers.com/#organization" },
            "creator": { "@id": "https://airconditionanswers.com/about/mark-curant#person" }
          })}
        </script>
      </Helmet>
      <div className="bg-gradient-to-b from-[#F0F9FF] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-16 pb-12 sm:pb-12 lg:pb-12 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-gray-900 mb-5 leading-[1.1] max-w-[900px] mx-auto">
            Calculate Your <span className="text-green-600">HVAC Savings</span> in 30 Seconds... For FREE
          </h1>
          <p className="text-lg sm:text-xl lg:text-[22px] text-gray-600 mb-8 max-w-[700px] mx-auto leading-relaxed">
            See how much you'll save by upgrading to a high-efficiency air conditioner
          </p>

          <Link
            to="/blog"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] group"
          >
            <span className="text-2xl">📚</span>
            <div className="flex flex-col items-start">
              <span className="text-[16px] font-semibold text-teal-600 group-hover:text-teal-700">
                Visit Efficiency Hub
              </span>
              <span className="hidden sm:block text-[13px] text-gray-600 font-normal">
                Learn about savings, costs, brands & maintenance
              </span>
            </div>
          </Link>

          <div className="mt-10 bg-gray-50 rounded-xl px-6 py-5 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold text-lg">✓</span>
                <span className="text-[15px] text-gray-700 font-medium">100% Free Tool</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold text-lg">✓</span>
                <span className="text-[15px] text-gray-700 font-medium">No Email Required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold text-lg">✓</span>
                <span className="text-[15px] text-gray-700 font-medium">Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-ad-zone="top-banner" className="max-w-6xl mx-auto px-4 mt-4 min-h-[90px] bg-gray-100 rounded-lg hidden"></div>

      <main className="max-w-6xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CalculatorForm
              inputs={inputs}
              onInputChange={handleInputChange}
              onCalculate={handleCalculate}
            />
          </div>

          <div data-ad-zone="sidebar" className="hidden lg:block min-h-[600px] bg-gray-100 rounded-lg"></div>
        </div>

        {results && (
          <div ref={resultsRef} className="mt-8">
            <ResultsSection results={results} onStartOver={handleStartOver} />
          </div>
        )}

        <section aria-labelledby="cost-map-teaser" className="mt-12 rounded-lg border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-teal-50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-orange-700 mb-2">AC cost map</p>
              <h2 id="cost-map-teaser" className="text-2xl font-bold text-gray-900 mb-3">What does AC cost where you live?</h2>
              <p className="text-gray-700 mb-4">
                See every state's electricity rate and what a year of air conditioning costs there, on one map.
                Also covers the Caribbean, Canada and Europe.
              </p>
              <div className="flex flex-wrap gap-2">
                {REGIONS.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to === '/ac-cost' ? '/ac-cost#map' : to}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                      to === '/ac-cost'
                        ? 'bg-teal-500 text-white hover:bg-teal-600'
                        : 'bg-white text-gray-800 border border-gray-200 hover:border-teal-400 hover:text-teal-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {to === '/ac-cost' ? 'Open the U.S. map' : label}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/ac-cost#map" aria-label="Open the U.S. AC cost map" className="block rounded-lg bg-white/70 p-3 hover:shadow-md transition-shadow">
              <USCostMapPreview className="w-full h-auto" />
            </Link>
          </div>
        </section>

        <div className="mt-12 bg-teal-50 rounded-lg p-6 border border-teal-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Want to Learn More?</h2>
          <p className="text-gray-700 mb-4">Check out our Efficiency Hub for detailed guides on SEER ratings, HVAC savings, and choosing the right system for your home.</p>
          <Link
            to="/blog/hvac-seer-calculator-faq"
            className="inline-block bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
          >
            Read Common HVAC Questions →
          </Link>
        </div>

        <LeadMagnet />
      </main>
    </>
  );
}
