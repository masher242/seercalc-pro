import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useCallback } from 'react';
import { ArrowLeft, Calculator, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';

const US_AVG_RATE = 17.45;
const US_AVG_HOURS = 1200;

interface Inputs {
  systemAge: string;
  repairCost: string;
  currentSeer: string;
  newSystemCost: string;
  newSeer2: string;
  electricityRate: string;
  coolingHours: string;
  tonSize: string;
}

interface Results {
  annualSavings: number;
  paybackYears: number;
  netReplaceAdvantage: number;
  remainingLifespan: number;
  repairROI: number;
  fiveThousandRule: boolean;
  recommendation: 'repair' | 'replace' | 'borderline';
  reasoning: string[];
}

function calcResults(inputs: Inputs): Results | null {
  const age = parseFloat(inputs.systemAge);
  const repair = parseFloat(inputs.repairCost);
  const curSeer = parseFloat(inputs.currentSeer);
  const newCost = parseFloat(inputs.newSystemCost);
  const newSeer = parseFloat(inputs.newSeer2);
  const rate = parseFloat(inputs.electricityRate) / 100;
  const hours = parseFloat(inputs.coolingHours);
  const tons = parseFloat(inputs.tonSize);

  if ([age, repair, curSeer, newCost, newSeer, rate, hours, tons].some(isNaN)) return null;

  // BTU to kWh conversion: 1 ton = 12,000 BTU/hr
  const btus = tons * 12000 * hours;
  const curKwh = btus / (curSeer * 1000);
  // SEER2 is roughly equivalent to SEER for cost comparison at same equipment
  const newKwh = btus / (newSeer * 1000);
  const annualSavings = (curKwh - newKwh) * rate;

  // Typical AC lifespan is 15–20 years; estimate remaining life
  const maxLifespan = 18;
  const remainingLifespan = Math.max(0, maxLifespan - age);

  // Total value of efficiency savings over remaining lifespan if repaired
  const savingsOverLife = annualSavings * remainingLifespan;

  // Net advantage of replacing: savings over new system lifespan (18yr) minus net new system cost
  const newSystemLifespanSavings = annualSavings * maxLifespan;
  const netReplaceAdvantage = newSystemLifespanSavings - (newCost - repair); // credit repair cost avoided

  // Payback: how many years until new system pays back vs repair
  const netNewCost = newCost - repair; // cost of replacing vs repairing
  const paybackYears = netNewCost > 0 ? netNewCost / annualSavings : 0;

  // $5,000 Rule: repair cost × remaining years > replacement cost → replace
  const fiveThousandRule = (repair * remainingLifespan) > newCost;

  // ROI of repair vs replace: annual savings × remaining life vs repair cost
  const repairROI = remainingLifespan > 0 ? (savingsOverLife / repair) * 100 : 0;

  // Recommendation logic
  const reasoning: string[] = [];
  let recommendation: 'repair' | 'replace' | 'borderline';

  const repairPctOfNewSystem = (repair / newCost) * 100;
  const oldSystemRatio = age / maxLifespan; // 0–1, higher = older

  if (age >= 15) {
    reasoning.push(`System is ${age} years old — at or near end of typical 15–20 year lifespan`);
  }
  if (repairPctOfNewSystem >= 50) {
    reasoning.push(`Repair cost is ${repairPctOfNewSystem.toFixed(0)}% of new system cost — diminishing return on investment`);
  }
  if (remainingLifespan <= 3) {
    reasoning.push(`Only ~${remainingLifespan} years of useful life remaining — not enough time to recover repair cost`);
  }
  if (paybackYears > 0 && paybackYears <= 7) {
    reasoning.push(`New system pays back in ~${paybackYears.toFixed(1)} years through energy savings alone`);
  }
  if (annualSavings > 200) {
    reasoning.push(`Upgrading saves $${annualSavings.toFixed(0)}/year in electricity — significant ongoing benefit`);
  }
  if (fiveThousandRule) {
    reasoning.push(`Repair cost × remaining years exceeds replacement cost — replacing is the better financial move`);
  }

  // Decision thresholds
  const replaceSignals = [
    age >= 15,
    repairPctOfNewSystem >= 50,
    remainingLifespan <= 3,
    fiveThousandRule,
    paybackYears > 0 && paybackYears <= 8,
  ].filter(Boolean).length;

  const repairSignals = [
    age < 8,
    repairPctOfNewSystem < 20,
    remainingLifespan >= 8,
    paybackYears > 12,
    annualSavings < 100,
  ].filter(Boolean).length;

  if (replaceSignals >= 3) {
    recommendation = 'replace';
    if (reasoning.length === 0) reasoning.push('Multiple factors favor replacement over repair');
  } else if (repairSignals >= 3) {
    recommendation = 'repair';
    if (reasoning.length === 0) reasoning.push('System has useful life remaining and repair cost is reasonable');
  } else {
    recommendation = 'borderline';
    if (reasoning.length === 0) reasoning.push('This decision is close — installer quality and local factors matter');
  }

  return { annualSavings, paybackYears, netReplaceAdvantage, remainingLifespan, repairROI, fiveThousandRule, recommendation, reasoning };
}

export default function CalculatorRepairVsReplace() {
  const [inputs, setInputs] = useState<Inputs>({
    systemAge: '',
    repairCost: '',
    currentSeer: '',
    newSystemCost: '',
    newSeer2: '',
    electricityRate: US_AVG_RATE.toString(),
    coolingHours: US_AVG_HOURS.toString(),
    tonSize: '3',
  });

  const [results, setResults] = useState<Results | null>(null);
  const [attempted, setAttempted] = useState(false);

  const handleChange = useCallback((field: keyof Inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setResults(null);
  }, []);

  const handleCalculate = () => {
    setAttempted(true);
    const r = calcResults(inputs);
    setResults(r);
    if (r) {
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const allFilled = Object.values(inputs).every(v => v !== '');

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-sm";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <>
      <Helmet>
        <title>Should I Repair or Replace My AC? 🔧 Free Calculator (2026)</title>
        <meta name="description" content="Enter your repair quote, system age, and SEER rating for a clear fix-or-replace recommendation with the math behind it. No email, no signup." />
        <meta name="keywords" content="AC repair vs replace calculator, should I repair or replace my AC, air conditioner repair vs replacement calculator, HVAC repair vs replace 2026" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://seercalc.pro/calculators/repair-vs-replace" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seercalc.pro/calculators/repair-vs-replace" />
        <meta property="og:title" content="AC Repair vs. Replace Calculator — Should You Fix or Replace?" />
        <meta property="og:description" content="Enter your repair quote, system age, and efficiency ratings to get a clear recommendation with the math. Free, no email required." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Should I repair or replace my air conditioner?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The general rule: if your AC is over 10 years old and the repair costs more than 50% of a new system's price, replacement usually makes more financial sense. The '$5,000 Rule' says multiply the repair cost by the system's age in years — if that number exceeds $5,000, replace. But the real answer depends on your specific repair cost, system age, current SEER rating, new system efficiency, and local electricity rate. Use our calculator to get personalized numbers."
                }
              },
              {
                "@type": "Question",
                "name": "What is the $5,000 Rule for HVAC repair vs. replace?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The $5,000 Rule is a simple HVAC decision heuristic: multiply your repair cost by your system's age in years. If the result exceeds $5,000, replacement is generally the better financial decision. For example: a $400 repair on a 15-year-old system = 400 × 15 = $6,000 > $5,000 → replace. A $400 repair on a 5-year-old system = 400 × 5 = $2,000 < $5,000 → repair. It's a starting point, not a definitive answer — efficiency gains and electricity rates also matter."
                }
              },
              {
                "@type": "Question",
                "name": "At what age should I replace my AC instead of repairing it?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most HVAC professionals recommend considering replacement when your AC is 10–15 years old and facing a significant repair. Systems over 15 years are generally past their cost-effective service life — the remaining useful years don't justify major repairs, especially when a new system offers 20–40% better efficiency. Under 8 years old with a minor repair: almost always repair. Over 15 years with a major repair: almost always replace. 8–15 years: depends on repair cost, efficiency gap, and your electricity rate."
                }
              },
              {
                "@type": "Question",
                "name": "How much should an AC repair cost before I consider replacing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A common guideline: if the repair cost exceeds 50% of the cost of a new system, replacement is typically the better investment. On a $7,000 new system, that threshold is $3,500. However, this varies by system age — a $3,500 repair on a 3-year-old system is worth it; the same repair on a 14-year-old system is not. Combine the 50% rule with the system age and efficiency analysis for the most accurate recommendation."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link to="/calculators" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          All Calculators
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Calculator className="w-4 h-4 text-teal-500" />
            <span className="text-teal-600 font-medium">Calculator</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">AC Repair vs. Replace Calculator</h1>
          <p className="text-lg text-gray-600">Enter your numbers and get a clear recommendation — with the math behind it.</p>
        </div>

        {/* Quick Answer */}
        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg mb-8 text-sm">
          <p className="font-semibold text-teal-800 mb-1">Quick Answer — the $5,000 Rule</p>
          <p className="text-gray-700">Multiply your <strong>repair cost × system age in years</strong>. If the result exceeds <strong>$5,000</strong>, replacement is generally the smarter financial move. This calculator goes further — adding efficiency savings, electricity costs, and payback period to give you a more complete picture.</p>
        </div>

        {/* Calculator card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">

          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-teal-500" />
            Enter Your Numbers
          </h2>

          <div className="space-y-6">

            {/* Section 1: Current system */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Your Current System</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>System Age (years)</label>
                  <input
                    type="number"
                    min="0" max="40"
                    placeholder="e.g. 12"
                    value={inputs.systemAge}
                    onChange={e => handleChange('systemAge', e.target.value)}
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-400 mt-1">Check the unit's nameplate — year is in the serial number</p>
                </div>
                <div>
                  <label className={labelClass}>Current SEER Rating</label>
                  <input
                    type="number"
                    min="6" max="30" step="0.1"
                    placeholder="e.g. 13"
                    value={inputs.currentSeer}
                    onChange={e => handleChange('currentSeer', e.target.value)}
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-400 mt-1">On the yellow EnergyGuide label or unit nameplate</p>
                </div>
                <div>
                  <label className={labelClass}>System Size (tons)</label>
                  <select
                    value={inputs.tonSize}
                    onChange={e => handleChange('tonSize', e.target.value)}
                    className={inputClass}
                  >
                    {['1.5','2','2.5','3','3.5','4','5'].map(t => (
                      <option key={t} value={t}>{t} ton</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">In model number — look for 18, 24, 30, 36, 42, 48, 60 ÷ 12</p>
                </div>
                <div>
                  <label className={labelClass}>Repair Quote ($)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 1200"
                    value={inputs.repairCost}
                    onChange={e => handleChange('repairCost', e.target.value)}
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-400 mt-1">Total repair cost including parts and labor</p>
                </div>
              </div>
            </div>

            {/* Section 2: New system */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">New Replacement System</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>New System Installed Cost ($)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 7500"
                    value={inputs.newSystemCost}
                    onChange={e => handleChange('newSystemCost', e.target.value)}
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-400 mt-1">Total installed price including equipment and labor</p>
                </div>
                <div>
                  <label className={labelClass}>New System SEER2 Rating</label>
                  <input
                    type="number"
                    min="13" max="30" step="0.1"
                    placeholder="e.g. 16"
                    value={inputs.newSeer2}
                    onChange={e => handleChange('newSeer2', e.target.value)}
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-400 mt-1">From your contractor's quote or the AHRI directory</p>
                </div>
              </div>
            </div>

            {/* Section 3: Electricity */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Your Electricity Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Electricity Rate (¢/kWh)</label>
                  <input
                    type="number"
                    min="5" max="60" step="0.1"
                    value={inputs.electricityRate}
                    onChange={e => handleChange('electricityRate', e.target.value)}
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-400 mt-1">Check your electric bill — US average is 17.45¢</p>
                </div>
                <div>
                  <label className={labelClass}>Annual Cooling Hours</label>
                  <select
                    value={inputs.coolingHours}
                    onChange={e => handleChange('coolingHours', e.target.value)}
                    className={inputClass}
                  >
                    <option value="600">~600 hrs — Mild climate (Pacific NW, upper Midwest)</option>
                    <option value="1000">~1,000 hrs — Moderate (Mid-Atlantic, Carolinas)</option>
                    <option value="1200">~1,200 hrs — Average US</option>
                    <option value="1500">~1,500 hrs — Hot climate (Texas, Southeast)</option>
                    <option value="2000">~2,000 hrs — Very hot (Arizona, Florida, Gulf Coast)</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          <button
            onClick={handleCalculate}
            className="mt-8 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calculate: Repair or Replace?
          </button>

          {attempted && !allFilled && (
            <p className="text-red-500 text-sm text-center mt-3">Please fill in all fields above to get your recommendation.</p>
          )}
        </div>

        {/* Results */}
        {results && (
          <div id="results" className="space-y-6 mb-12">

            {/* Main recommendation */}
            <div className={`rounded-xl p-6 border-2 ${
              results.recommendation === 'replace'
                ? 'bg-red-50 border-red-400'
                : results.recommendation === 'repair'
                ? 'bg-green-50 border-green-400'
                : 'bg-amber-50 border-amber-400'
            }`}>
              <div className="flex items-start gap-4">
                {results.recommendation === 'replace' ? (
                  <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0 mt-0.5" />
                ) : results.recommendation === 'repair' ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-8 h-8 text-amber-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1 text-gray-500">Our Recommendation</p>
                  <h2 className={`text-3xl font-bold mb-3 ${
                    results.recommendation === 'replace' ? 'text-red-700'
                    : results.recommendation === 'repair' ? 'text-green-700'
                    : 'text-amber-700'
                  }`}>
                    {results.recommendation === 'replace' ? '🔄 Replace the System'
                     : results.recommendation === 'repair' ? '🔧 Go Ahead and Repair'
                     : '⚖️ This One Is Close'}
                  </h2>
                  <ul className="space-y-1.5">
                    {results.reasoning.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 flex-shrink-0 mt-0.5">→</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Numbers breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">The Numbers</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600">${Math.round(results.annualSavings).toLocaleString()}</p>
                  <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Annual Savings</p>
                  <p className="text-xs text-gray-400 mt-0.5">from efficiency upgrade</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600">
                    {results.annualSavings > 0 ? `${results.paybackYears.toFixed(1)} yrs` : '—'}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Payback Period</p>
                  <p className="text-xs text-gray-400 mt-0.5">new vs. repaired system</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600">{Math.max(0, results.remainingLifespan)} yrs</p>
                  <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Est. Life Remaining</p>
                  <p className="text-xs text-gray-400 mt-0.5">if repaired today</p>
                </div>
                <div className={`rounded-lg p-4 text-center ${results.fiveThousandRule ? 'bg-red-50' : 'bg-green-50'}`}>
                  <p className={`text-2xl font-bold ${results.fiveThousandRule ? 'text-red-600' : 'text-green-600'}`}>
                    {results.fiveThousandRule ? 'Replace' : 'Repair'}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 uppercase mt-1">$5,000 Rule</p>
                  <p className="text-xs text-gray-400 mt-0.5">repair cost × age</p>
                </div>
              </div>
            </div>

            {/* Detailed breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Full Calculation Breakdown</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Current system age', value: `${inputs.systemAge} years` },
                  { label: 'Estimated remaining lifespan (if repaired)', value: `~${Math.max(0, results.remainingLifespan)} years` },
                  { label: 'Repair cost', value: `$${parseFloat(inputs.repairCost).toLocaleString()}` },
                  { label: 'New system installed cost', value: `$${parseFloat(inputs.newSystemCost).toLocaleString()}` },
                  { label: 'Net cost of replacing vs. repairing', value: `$${Math.round(parseFloat(inputs.newSystemCost) - parseFloat(inputs.repairCost)).toLocaleString()}` },
                  { label: 'Efficiency gain (SEER → SEER2)', value: `${inputs.currentSeer} → ${inputs.newSeer2}` },
                  { label: 'Annual electricity savings from upgrade', value: `$${Math.round(results.annualSavings).toLocaleString()}/year` },
                  { label: 'Payback period on replacement', value: results.annualSavings > 0 ? `${results.paybackYears.toFixed(1)} years` : 'N/A (same efficiency)' },
                  { label: '$5,000 Rule result', value: `$${parseFloat(inputs.repairCost).toLocaleString()} × ${inputs.systemAge} yrs = $${(parseFloat(inputs.repairCost) * parseFloat(inputs.systemAge)).toLocaleString()} → ${results.fiveThousandRule ? 'REPLACE' : 'REPAIR OK'}` },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-600">{row.label}</span>
                    <span className="font-semibold text-gray-900 text-right ml-4">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What to do next */}
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">What To Do Next</h3>
              {results.recommendation === 'replace' ? (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>→ Get at least <strong>3 quotes</strong> — prices vary $2,000–$4,000 for identical equipment</li>
                  <li>→ Ask each contractor for the <strong>AHRI Reference Number</strong> of the matched system to verify the quoted SEER2</li>
                  <li>→ Register your new system within <strong>60–90 days</strong> to activate the full manufacturer warranty</li>
                  <li>→ Compare brands in our <Link to="/brands" className="text-teal-600 underline font-medium">Brand Reviews</Link></li>
                  <li>→ <Link to="/" className="text-teal-600 underline font-medium">Calculate exact savings</Link> for the specific SEER2 system you're being quoted</li>
                </ul>
              ) : results.recommendation === 'repair' ? (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>→ Get the repair done — the math supports it</li>
                  <li>→ Ask your tech to <strong>evaluate the full system</strong> while they're there — any other components near end of life?</li>
                  <li>→ Set a calendar reminder in <strong>{Math.max(2, Math.round(results.remainingLifespan - 2))} years</strong> to start getting replacement quotes before it fails</li>
                  <li>→ Schedule <strong>annual maintenance</strong> to maximize remaining lifespan</li>
                </ul>
              ) : (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>→ This is genuinely close — both options are defensible</li>
                  <li>→ Key tiebreakers: <strong>how long you plan to stay</strong> in the home, and <strong>whether other components</strong> (furnace, coil) are also aging</li>
                  <li>→ If the repaired system fails again within 2 years, replacement was the right call — some techs will credit your repair cost toward a replacement</li>
                  <li>→ Ask your contractor: <em>"If this were your house, what would you do?"</em></li>
                </ul>
              )}
            </div>

            {/* CTA */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <p className="text-gray-700 font-semibold mb-2">Replacing? See exactly how much you'd save on electricity.</p>
              <p className="text-sm text-gray-500 mb-4">Enter your current SEER and new system's SEER2 to calculate annual savings at your electricity rate.</p>
              <Link to="/" className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
                <Calculator className="w-4 h-4" />
                Open SEER Savings Calculator
              </Link>
            </div>

          </div>
        )}

        {/* FAQ below the calculator */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Repair vs. Replace — Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What is the $5,000 Rule for HVAC?", a: "Multiply your repair cost by your system's age in years. If the result exceeds $5,000, replacement is generally the better financial move. Example: a $600 repair on a 10-year-old system = $6,000 → replace. A $600 repair on a 4-year-old system = $2,400 → repair. It's a useful starting point but doesn't account for efficiency savings — use the full calculator above for a more complete picture." },
              { q: "At what age should I stop repairing my AC?", a: "Most HVAC professionals recommend considering replacement when your system is 10–15 years old and facing a significant repair. Under 8 years: almost always repair. Over 15 years with a major repair: almost always replace. 8–15 years: depends on repair cost, efficiency gap, and your electricity rate — which is exactly what this calculator helps you work out." },
              { q: "How much efficiency gain can I expect from a new system?", a: "A typical pre-2006 system runs 10 SEER or less. A typical system from 2006–2022 runs 13–16 SEER. New systems in 2026 start at 13.4 SEER2 (equivalent to ~14 SEER) and go up to 26 SEER2. Upgrading from SEER 10 to SEER2 16 cuts cooling electricity use by 37.5%. At US average rates, that's $300–$500/year in savings depending on your climate and system size." },
              { q: "Should I repair or replace if my compressor failed?", a: "Compressor failure is usually the most expensive repair — often $1,500–$3,000 in parts and labor. On a system under 8 years old with a warranty, repair (or warranty claim). On a system 10+ years old, a compressor failure is almost always the signal to replace — you're spending major money on the most critical component of an aging system, and other components will follow." },
              { q: "What if I'm planning to sell my house?", a: "If you're selling within 1–2 years, the math often favors repair — you won't recoup a full system replacement in sale price, and buyers care more about the system being functional than brand-new. Exception: if the current system is so old or inefficient that it's a selling liability (home inspectors flag systems over 15 years), replacement may help the sale." },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <LeadMagnet />
      </main>
    </>
  );
}
