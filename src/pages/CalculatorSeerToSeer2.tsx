import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useCallback } from 'react';
import { ArrowLeft, Calculator, ArrowRight, RefreshCw } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';

// Conversion constants per DOE methodology
// SEER2 = SEER × M where M = 0.9485 for split-system ACs and heat pumps
// For mini-splits / ductless: M = 1.0 (no duct pressure change)
const SPLIT_FACTOR = 0.9485;
const MINI_SPLIT_FACTOR = 1.0;

const REGIONAL_MINIMUMS = [
  { region: 'North (all other states, e.g. CO, IL, MI, MN, MO, NY, OH, PA, UT, WA, WV)', minSeer2: 13.4, minSeer: 14.1 },
  { region: 'Southeast & Southwest (AL, AR, AZ, CA, DC, DE, FL, GA, HI, KY, LA, MD, MS, NC, NM, NV, OK, SC, TN, TX, VA, Puerto Rico); Southwest states also need 11.7 EER2', minSeer2: 14.3, minSeer: 15.1 },
];

const COMMON_RATINGS = [
  { label: 'Pre-2006 (typical)', seer: 10, note: 'Many older systems' },
  { label: '2006–2022 (entry)', seer: 13, note: 'Old federal minimum' },
  { label: '2006–2022 (mid)', seer: 16, note: 'Mid-range 2010s' },
  { label: '2006–2022 (good)', seer: 18, note: 'Better 2010s units' },
  { label: '2023+ entry', seer: 14.3, note: 'New minimum (South)' },
  { label: '2023+ mid', seer: 17, note: 'Mid-range today' },
  { label: '2023+ premium', seer: 21, note: 'High efficiency today' },
];

interface Result {
  seer2: number;
  seer: number;
  direction: 'toSeer2' | 'toSeer';
  systemType: string;
  factor: number;
  northCompliant: boolean;
  southCompliant: boolean;
}

export default function CalculatorSeerToSeer2() {
  const [inputValue, setInputValue] = useState('');
  const [direction, setDirection] = useState<'toSeer2' | 'toSeer'>('toSeer2');
  const [systemType, setSystemType] = useState<'split' | 'minisplit'>('split');
  const [result, setResult] = useState<Result | null>(null);

  const factor = systemType === 'split' ? SPLIT_FACTOR : MINI_SPLIT_FACTOR;

  const calculate = useCallback(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) return;

    let seer: number;
    let seer2: number;

    if (direction === 'toSeer2') {
      seer = val;
      seer2 = +(val * factor).toFixed(1);
    } else {
      seer2 = val;
      seer = +(val / factor).toFixed(1);
    }

    setResult({
      seer2,
      seer,
      direction,
      systemType,
      factor,
      northCompliant: seer2 >= 13.4,
      southCompliant: seer2 >= 14.3,
    });
  }, [inputValue, direction, factor]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') calculate();
  };

  const swap = () => {
    setDirection(d => d === 'toSeer2' ? 'toSeer' : 'toSeer2');
    if (result) {
      setInputValue(direction === 'toSeer2' ? result.seer2.toString() : result.seer.toString());
    }
    setResult(null);
  };

  const loadExample = (seer: number) => {
    setDirection('toSeer2');
    setInputValue(seer.toString());
    setResult(null);
  };

  const inputClass = "w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-center";

  return (
    <>
      <Helmet>
        <title>SEER to SEER2 Converter ⚡ Free, With Compliance Check</title>
        <meta name="description" content="Convert any SEER rating to SEER2 (or back) in one click to compare your old system to new models. Includes a 2026 regional compliance check." />
        <meta name="keywords" content="SEER to SEER2 converter, SEER2 to SEER conversion, SEER2 calculator, what is my SEER2 equivalent, SEER vs SEER2 conversion calculator 2026" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://airconditionanswers.com/calculators/seer-to-seer2" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://airconditionanswers.com/calculators/seer-to-seer2" />
        <meta property="og:title" content="SEER to SEER2 Converter — Free Instant Conversion" />
        <meta property="og:description" content="Convert any SEER rating to SEER2 instantly. Compare old and new AC systems on equal footing. Includes 2026 regional compliance check." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I convert SEER to SEER2?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To convert SEER to SEER2 for a standard split-system air conditioner or heat pump, multiply the SEER rating by 0.9485. For example, SEER 16 × 0.9485 = SEER2 15.2. For ductless mini-splits, the conversion factor is 1.0 (SEER and SEER2 are equivalent). SEER2 was introduced in January 2023 and uses more realistic duct pressure conditions, which is why SEER2 ratings are slightly lower than equivalent SEER ratings for ducted systems."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between SEER and SEER2?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SEER (Seasonal Energy Efficiency Ratio) and SEER2 measure the same thing — how efficiently an air conditioner converts electricity into cooling over a season — but they use different test conditions. SEER uses a low external static pressure of 0.1 inches of water column (IWC). SEER2 uses a more realistic 0.5 IWC that better represents actual ductwork resistance in homes. This makes SEER2 ratings approximately 4.5–5% lower than SEER ratings for the same physical equipment. SEER2 became the required standard for all new equipment on January 1, 2023."
                }
              },
              {
                "@type": "Question",
                "name": "Is SEER 16 the same as SEER2 15?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SEER 16 converts to approximately SEER2 15.2 (16 × 0.9485 = 15.18). So yes, SEER 16 and SEER2 15 refer to essentially the same physical equipment efficiency — just measured under different test standards. When comparing a pre-2023 system rated at SEER 16 to a new system rated at SEER2 15.2, they are equivalent in real-world efficiency."
                }
              },
              {
                "@type": "Question",
                "name": "What is the minimum SEER2 in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The federal minimum SEER2 for new split-system air conditioners as of January 2023 is 13.4 SEER2 in northern states and 14.3 SEER2 in southern and southwestern states. These replaced the old SEER 13 (North) and SEER 14 (South) minimums. All new equipment manufactured after January 1, 2025 must also use a low-GWP refrigerant (R-32 or R-454B instead of R-410A)."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to convert SEER to SEER2 when comparing systems?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, if you're comparing a pre-2023 system (rated in SEER) to a new 2023+ system (rated in SEER2), you need to convert to compare apples to apples. A contractor quoting you a SEER2 15.2 system as an upgrade from your SEER 16 system is offering you effectively identical efficiency — not an upgrade. Use this converter to ensure your comparison is accurate before making a purchase decision."
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
          <h1 className="text-4xl font-bold text-gray-900 mb-3">SEER to SEER2 Converter</h1>
          <p className="text-lg text-gray-600">Convert any SEER rating to SEER2 — or SEER2 back to SEER — to compare old and new systems accurately.</p>
        </div>

        {/* Quick Answer */}
        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg mb-8 text-sm">
          <p className="font-semibold text-teal-800 mb-1">The Quick Formula</p>
          <p className="text-gray-700"><strong>SEER2 = SEER × 0.9485</strong> for split-system central AC and heat pumps. So SEER 16 ≈ SEER2 15.2. For ductless mini-splits, SEER and SEER2 are the same number. SEER2 was introduced January 2023 — all new systems are now rated in SEER2.</p>
        </div>

        {/* Main converter */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">

          {/* System type toggle */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">System Type</p>
            <div className="flex gap-2">
              {[
                { value: 'split', label: 'Central AC / Heat Pump', sub: 'Split-system with ducts' },
                { value: 'minisplit', label: 'Mini-Split / Ductless', sub: 'No duct pressure change' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { setSystemType(opt.value as 'split' | 'minisplit'); setResult(null); }}
                  className={`flex-1 p-3 rounded-lg border-2 text-left transition-all ${
                    systemType === opt.value
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className={`text-sm font-semibold ${systemType === opt.value ? 'text-teal-700' : 'text-gray-700'}`}>{opt.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Direction + input */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 text-center">
                <p className={`text-sm font-bold mb-1 ${direction === 'toSeer2' ? 'text-teal-700' : 'text-gray-400'}`}>
                  {direction === 'toSeer2' ? '▶ Enter SEER' : 'Result: SEER'}
                </p>
                <div className={`rounded-lg px-4 py-3 text-center border-2 ${direction === 'toSeer2' ? 'border-teal-400 bg-white' : 'border-gray-100 bg-gray-50'}`}>
                  {direction === 'toSeer2' ? (
                    <input
                      type="number"
                      min="6" max="30" step="0.1"
                      placeholder="e.g. 16"
                      value={inputValue}
                      onChange={e => { setInputValue(e.target.value); setResult(null); }}
                      onKeyDown={handleKeyDown}
                      className="w-full text-2xl font-bold text-center text-gray-900 focus:outline-none bg-transparent"
                      autoFocus
                    />
                  ) : (
                    <p className="text-2xl font-bold text-gray-400">{result ? result.seer : '—'}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">SEER</p>
                </div>
              </div>

              <button
                onClick={swap}
                className="flex-shrink-0 p-3 rounded-full border-2 border-gray-200 hover:border-teal-400 hover:bg-teal-50 transition-all group"
                title="Swap direction"
              >
                <RefreshCw className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors" />
              </button>

              <div className="flex-1 text-center">
                <p className={`text-sm font-bold mb-1 ${direction === 'toSeer' ? 'text-teal-700' : 'text-gray-400'}`}>
                  {direction === 'toSeer' ? '▶ Enter SEER2' : 'Result: SEER2'}
                </p>
                <div className={`rounded-lg px-4 py-3 text-center border-2 ${direction === 'toSeer' ? 'border-teal-400 bg-white' : 'border-gray-100 bg-gray-50'}`}>
                  {direction === 'toSeer' ? (
                    <input
                      type="number"
                      min="6" max="30" step="0.1"
                      placeholder="e.g. 15.2"
                      value={inputValue}
                      onChange={e => { setInputValue(e.target.value); setResult(null); }}
                      onKeyDown={handleKeyDown}
                      className="w-full text-2xl font-bold text-center text-gray-900 focus:outline-none bg-transparent"
                    />
                  ) : (
                    <p className={`text-2xl font-bold ${result ? 'text-teal-700' : 'text-gray-400'}`}>{result ? result.seer2 : '—'}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">SEER2</p>
                </div>
              </div>
            </div>

            <button
              onClick={calculate}
              disabled={!inputValue}
              className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Convert
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="border-t border-gray-100 pt-5">
              <div className="bg-teal-50 rounded-lg p-5 mb-4">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-700">{result.seer}</p>
                    <p className="text-xs font-semibold text-gray-500 uppercase mt-1">SEER</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-teal-500 flex-shrink-0" />
                  <div className="text-center">
                    <p className="text-3xl font-bold text-teal-700">{result.seer2}</p>
                    <p className="text-xs font-semibold text-teal-600 uppercase mt-1">SEER2</p>
                  </div>
                </div>
                <p className="text-sm text-center text-gray-600">
                  {systemType === 'split'
                    ? `${result.seer} SEER × 0.9485 = ${result.seer2} SEER2`
                    : `For ductless mini-splits, SEER and SEER2 are equivalent (factor = 1.0)`
                  }
                </p>
              </div>

              {/* Compliance check */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`rounded-lg p-3 text-center border ${result.northCompliant ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${result.northCompliant ? 'text-green-700' : 'text-red-700'}`}>
                    {result.northCompliant ? '✓ Meets' : '✗ Below'} North minimum
                  </p>
                  <p className="text-xs text-gray-600">13.4 SEER2 required</p>
                </div>
                <div className={`rounded-lg p-3 text-center border ${result.southCompliant ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${result.southCompliant ? 'text-green-700' : 'text-red-700'}`}>
                    {result.southCompliant ? '✓ Meets' : '✗ Below'} South minimum
                  </p>
                  <p className="text-xs text-gray-600">14.3 SEER2 required</p>
                </div>
              </div>

              {/* What this means */}
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
                <p className="font-semibold mb-1">What this means in practice:</p>
                {result.seer >= 13 && result.seer <= 16 ? (
                  <p>A SEER {result.seer} system from before 2023 is equivalent to a SEER2 {result.seer2} system today — the same hardware, just re-rated under stricter test conditions. If a contractor quotes you a SEER2 {result.seer2} replacement for your SEER {result.seer} system, you're getting equivalent efficiency, not an upgrade.</p>
                ) : result.seer > 16 ? (
                  <p>A SEER {result.seer} system is high-efficiency. Its SEER2 equivalent of {result.seer2} places it well above the federal minimums — comparable to today's mid-to-premium tier equipment.</p>
                ) : (
                  <p>A SEER {result.seer} system is below modern minimum standards. Replacing it with any current compliant system (SEER2 13.4+) will deliver meaningful efficiency improvement and electricity savings.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick reference examples */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">Common SEER Ratings → SEER2 Equivalents</h2>
          <p className="text-xs text-gray-500 mb-4">Click any row to load it into the converter above.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Description</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-700">SEER</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-700">SEER2 Equivalent</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-700">South Compliant?</th>
                </tr>
              </thead>
              <tbody>
                {COMMON_RATINGS.map((row, i) => {
                  const seer2 = +(row.seer * SPLIT_FACTOR).toFixed(1);
                  return (
                    <tr
                      key={row.seer}
                      className={`border-t border-gray-100 cursor-pointer hover:bg-teal-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50'}`}
                      onClick={() => loadExample(row.seer)}
                    >
                      <td className="px-3 py-2.5">
                        <span className="font-medium text-gray-900">{row.label}</span>
                        <span className="text-gray-400 text-xs ml-2">{row.note}</span>
                      </td>
                      <td className="px-3 py-2.5 text-center font-bold text-gray-700">{row.seer}</td>
                      <td className="px-3 py-2.5 text-center font-bold text-teal-700">{seer2}</td>
                      <td className={`px-3 py-2.5 text-center text-xs font-semibold ${seer2 >= 14.3 ? 'text-green-700' : 'text-red-600'}`}>
                        {seer2 >= 14.3 ? '✓ Yes' : '✗ No'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Regional minimums */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-4">2026 Regional SEER2 Minimums</h2>
          <div className="space-y-3">
            {REGIONAL_MINIMUMS.map(r => (
              <div key={r.region} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Min SEER2 {r.minSeer2} <span className="text-gray-400 font-normal text-xs">(≈ SEER {r.minSeer})</span></p>
                    <p className="text-xs text-gray-500">{r.region}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">These are federal minimums for split-system central AC manufactured after January 1, 2023. Contractors cannot legally install new equipment below these thresholds.</p>
        </div>

        {/* Why SEER2 matters callout */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-2">Why This Matters When Shopping</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            If your current system is rated at SEER 16 and a contractor quotes you a new system at SEER2 15.2, you might think you're getting a <em>less efficient</em> system. You're not — SEER2 15.2 and SEER 16 are the same physical efficiency, just measured differently.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Conversely, if you're comparing a quoted SEER2 17 system to your old SEER 16 system, you're getting a genuine 8% efficiency improvement — worth approximately $80–$120/year at average US electricity rates on a 3-ton system.
          </p>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">SEER vs. SEER2 — Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How do I convert SEER to SEER2?", a: "Multiply SEER by 0.9485 for split-system central AC or heat pumps. SEER2 = SEER × 0.9485. For example: SEER 16 × 0.9485 = SEER2 15.2. For ductless mini-splits, SEER and SEER2 are the same — the factor is 1.0 because mini-splits don't have ductwork." },
              { q: "What is the difference between SEER and SEER2?", a: "Both measure seasonal cooling efficiency, but SEER2 uses more realistic test conditions. SEER tests use 0.1 inches of water column (IWC) external static pressure — essentially no ductwork resistance. SEER2 uses 0.5 IWC, which better simulates actual home ductwork. This makes SEER2 ratings about 4.5–5% lower for the same physical equipment. SEER2 became required for all new equipment on January 1, 2023." },
              { q: "Is SEER 16 the same as SEER2 15?", a: "Nearly identical. SEER 16 converts to SEER2 15.2. If you see SEER2 15 on a new system and your old system was SEER 16, you're getting essentially the same efficiency — not an upgrade, not a downgrade. Make sure the contractor is comparing apples to apples." },
              { q: "Why did SEER change to SEER2?", a: "The Department of Energy updated the testing standard because the old SEER tests were too optimistic. Real-world ductwork creates significantly more resistance than the old 0.1 IWC test pressure assumed. SEER2's 0.5 IWC pressure better reflects how systems actually perform in homes — giving buyers a more accurate picture of real-world efficiency." },
              { q: "What is the minimum SEER2 I can buy in 2026?", a: "13.4 SEER2 in northern states, 14.3 SEER2 in southern and southwestern states. Those regional minimums apply to central air conditioners; split-system heat pumps must reach 14.3 SEER2 (and 7.5 HSPF2) in every region. Contractors cannot legally install new equipment below these minimums, even if older non-compliant equipment is still sitting in a warehouse." },
              { q: "Do I need to convert SEER to SEER2 for tax credit purposes?", a: "The federal 25C Energy Efficient Home Improvement Credit expired December 31, 2025 — no federal tax credit applies to 2026 installations regardless of SEER2 rating. For state and utility rebate programs, check requirements at dsireusa.org — these typically specify SEER2 minimums for eligible equipment." },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 text-center">
            <p className="font-semibold text-gray-900 mb-2">Now calculate what that efficiency difference saves you</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-teal-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors">
              <Calculator className="w-4 h-4" />
              SEER Savings Calculator
            </Link>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <p className="font-semibold text-gray-900 mb-2">Facing a repair bill? Is replacement worth it?</p>
            <Link to="/calculators/repair-vs-replace" className="inline-flex items-center gap-2 bg-gray-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
              <Calculator className="w-4 h-4" />
              Repair vs. Replace Calculator
            </Link>
          </div>
        </div>

        <LeadMagnet />
      </main>
    </>
  );
}
