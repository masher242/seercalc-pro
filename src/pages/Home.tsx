import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import CalculatorForm from '../components/CalculatorForm';
import ResultsSection from '../components/ResultsSection';
import LeadMagnet from '../components/LeadMagnet';
import { CalculatorInputs, CalculationResults } from '../types';
import { calculateSavings } from '../utils/calculations';
import { saveInputs, loadInputs } from '../utils/localStorage';

const DEFAULT_INPUTS: CalculatorInputs = {
  currentSEER: 10,
  newSEER: 16,
  tonnage: 2.5,
  hoursPerYear: 1200,
  electricityRate: 0.13,
  upgradeCost: 0
};

export default function Home() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedInputs = loadInputs();
    if (savedInputs) {
      setInputs(savedInputs);
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
        <title>SEER Calculator - Free HVAC Energy Savings Calculator | seercalc.pro</title>
        <meta name="description" content="Calculate HVAC energy savings instantly. Free SEER calculator shows annual savings, payback period, and ROI when upgrading your air conditioning system." />
        <link rel="canonical" href="https://seercalc.pro/" />
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
                Learn about savings, brands, tax credits & maintenance
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

        <div data-advanced-options className="hidden mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced Options</h3>
          <p className="text-gray-600">Coming soon: Climate zone adjustments, rebate finder, and more...</p>
        </div>

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
