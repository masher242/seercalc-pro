import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';

export default function BlogArticleRepairCost() {
  return (
    <>
      <Helmet>
        <title>AC Repair vs Replace: Cost Guide & Decision Calculator 2026 | seercalc.pro</title>
        <meta name="description" content="AC repair costs $150-$2,500. Learn when to repair vs replace using the $5,000 rule, complete repair cost breakdown, and ROI calculations for replacement." />
        <meta name="keywords" content="AC repair cost, air conditioner replacement, $5,000 rule, HVAC repair vs replace, compressor replacement cost, AC repair decision" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://seercalc.pro/blog/ac-repair-cost-vs-replacement" />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://seercalc.pro/blog/ac-repair-cost-vs-replacement" />
        <meta property="og:title" content="AC Repair Cost vs Replacement: The $5,000 Rule Explained (2026 Guide)" />
        <meta property="og:description" content="Complete guide to AC repair costs and when to replace. Includes the $5,000 rule calculator and repair cost breakdown by component." />
        <meta property="article:published_time" content="2026-01-03T10:00:00Z" />
        <meta property="article:modified_time" content="2026-01-03T10:00:00Z" />
        <meta property="article:author" content="The Efficiency Hub" />
        <meta property="article:section" content="Maintenance" />
        <meta property="article:tag" content="AC Repair" />
        <meta property="article:tag" content="HVAC Cost" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://seercalc.pro/blog/ac-repair-cost-vs-replacement" />
        <meta name="twitter:title" content="AC Repair vs Replace: The $5,000 Rule" />
        <meta name="twitter:description" content="Complete repair cost guide and decision framework for 2026." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "AC Repair Cost vs Replacement: The $5,000 Rule Explained (2026 Guide)",
            "author": {
              "@type": "Organization",
              "name": "The Efficiency Hub"
            },
            "publisher": {
              "@type": "Organization",
              "name": "seercalc.pro"
            },
            "datePublished": "2026-01-03",
            "dateModified": "2026-01-03",
            "description": "Comprehensive guide to AC repair costs and the repair vs replace decision, including the $5,000 rule formula and detailed cost breakdowns."
          })}
        </script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Maintenance</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                14 min read
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AC Repair Cost vs Replacement: The $5,000 Rule Explained (2026 Guide)</h1>
            <p className="text-xl text-gray-600">Complete repair cost breakdown, the $5,000 rule formula, and step-by-step decision framework to know exactly when to repair and when to replace</p>
          </header>

          <section className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Your air conditioner just stopped working. The technician arrives, diagnoses the problem, and delivers the dreaded news: "It'll cost $1,800 to fix."
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Should you pay for the repair? Or is it time to replace the entire system?
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              This is one of the most stressful homeowner decisions. Repair seems cheaper now, but what if it breaks again in six months? Replacement costs more upfront, but modern systems are more efficient and reliable.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>The wrong choice wastes thousands of dollars. The right choice saves money and ensures reliable cooling for years to come.</strong>
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">This Guide Covers:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Complete AC repair cost breakdown (by problem type)</li>
                <li>The $5,000 rule formula (repair vs replace calculator)</li>
                <li>When repair makes sense vs when replacement is smarter</li>
                <li>Real-world cost comparisons and ROI analysis</li>
                <li>How to avoid getting ripped off by contractors</li>
                <li>Step-by-step decision framework</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Table of Contents</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <ul className="space-y-2 text-gray-700">
                <li><a href="#repair-costs" className="text-blue-600 hover:text-blue-700">Average AC Repair Costs (By Problem Type)</a></li>
                <li><a href="#5000-rule" className="text-blue-600 hover:text-blue-700">The $5,000 Rule: Repair vs Replace Formula</a></li>
                <li><a href="#component-costs" className="text-blue-600 hover:text-blue-700">AC Repair Costs by Component</a></li>
                <li><a href="#when-repair" className="text-blue-600 hover:text-blue-700">When Repair Makes Sense</a></li>
                <li><a href="#when-replace" className="text-blue-600 hover:text-blue-700">When Replacement Makes Sense</a></li>
                <li><a href="#age-matrix" className="text-blue-600 hover:text-blue-700">Age-Based Decision Matrix</a></li>
                <li><a href="#total-cost" className="text-blue-600 hover:text-blue-700">Total Cost of Ownership: Repair vs Replace</a></li>
                <li><a href="#scenarios" className="text-blue-600 hover:text-blue-700">Real-World Scenarios</a></li>
                <li><a href="#faq" className="text-blue-600 hover:text-blue-700">Frequently Asked Questions</a></li>
              </ul>
            </div>

            <h2 id="repair-costs" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Average AC Repair Costs (By Problem Type)</h2>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">National Average Repair Costs</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Typical repair range:</strong> $150-$600</li>
                <li><strong>Common repairs:</strong> $200-$400</li>
                <li><strong>Major repairs:</strong> $800-$2,500</li>
                <li><strong>Average homeowner pays:</strong> $350-$450 per repair</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Common AC Problems and Repair Costs</h3>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Problem</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Diagnosis</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Repair Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">AC won't turn on</td>
                    <td className="border border-gray-300 px-4 py-2">$75-$150</td>
                    <td className="border border-gray-300 px-4 py-2">$150-$800</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">AC won't cool</td>
                    <td className="border border-gray-300 px-4 py-2">$75-$150</td>
                    <td className="border border-gray-300 px-4 py-2">$200-$2,500</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">AC blowing warm air</td>
                    <td className="border border-gray-300 px-4 py-2">$75-$150</td>
                    <td className="border border-gray-300 px-4 py-2">$200-$2,000</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">AC freezing up</td>
                    <td className="border border-gray-300 px-4 py-2">$75-$150</td>
                    <td className="border border-gray-300 px-4 py-2">$150-$1,500</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">AC making noise</td>
                    <td className="border border-gray-300 px-4 py-2">$75-$150</td>
                    <td className="border border-gray-300 px-4 py-2">$150-$1,200</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">AC leaking water</td>
                    <td className="border border-gray-300 px-4 py-2">$75-$150</td>
                    <td className="border border-gray-300 px-4 py-2">$75-$800</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="5000-rule" className="text-2xl font-bold text-gray-900 mt-12 mb-4">The $5,000 Rule: Repair vs Replace Formula</h2>

            <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold text-amber-900 mb-4">The Simple Formula</h3>
              <p className="text-xl font-bold text-gray-900 mb-4">(Repair Cost) × (Age of AC) = Decision Number</p>
              <ul className="list-disc pl-6 text-gray-800 space-y-2">
                <li><strong>If result &gt; $5,000:</strong> Replace the AC</li>
                <li><strong>If result &lt; $5,000:</strong> Repair the AC</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Why This Formula Works</h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              The formula balances repair cost, age, and value. The logic:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Young AC (5 years) × expensive repair ($1,000) = $5,000</strong> → Worth repairing (lots of life left)</li>
              <li><strong>Old AC (15 years) × moderate repair ($400) = $6,000</strong> → Consider replacing (near end of life)</li>
              <li><strong>Very old AC (18 years) × cheap repair ($200) = $3,600</strong> → Repair (under $5,000, but start planning replacement)</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Real Examples</h3>

            <div className="space-y-4 mb-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="font-bold text-gray-900 mb-2">Example 1: Capacitor Failure</p>
                <p className="text-gray-700 mb-1">Repair cost: $300 | AC age: 12 years</p>
                <p className="text-gray-700 mb-1">Calculation: $300 × 12 = $3,600</p>
                <p className="text-green-700 font-bold">Result: Under $5,000 → REPAIR</p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="font-bold text-gray-900 mb-2">Example 2: Compressor Failure</p>
                <p className="text-gray-700 mb-1">Repair cost: $2,200 | AC age: 14 years</p>
                <p className="text-gray-700 mb-1">Calculation: $2,200 × 14 = $30,800</p>
                <p className="text-red-700 font-bold">Result: Way over $5,000 → REPLACE</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="font-bold text-gray-900 mb-2">Example 3: Fan Motor</p>
                <p className="text-gray-700 mb-1">Repair cost: $650 | AC age: 7 years</p>
                <p className="text-gray-700 mb-1">Calculation: $650 × 7 = $4,550</p>
                <p className="text-green-700 font-bold">Result: Under $5,000 → REPAIR</p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="font-bold text-gray-900 mb-2">Example 4: Refrigerant Leak (R-22)</p>
                <p className="text-gray-700 mb-1">Repair cost: $800 | AC age: 11 years</p>
                <p className="text-gray-700 mb-1">Calculation: $800 × 11 = $8,800</p>
                <p className="text-red-700 font-bold">Result: Over $5,000 → REPLACE (especially for R-22 systems)</p>
              </div>
            </div>

            <h2 id="component-costs" className="text-2xl font-bold text-gray-900 mt-12 mb-4">AC Repair Costs by Component</h2>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Minor Repairs ($150-$500)</h3>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">Capacitor Replacement: $150-$400</p>
                <p className="text-gray-700 mb-1"><strong>Labor:</strong> 1-2 hours | <strong>Lifespan:</strong> 5-10 years</p>
                <p className="text-gray-700"><strong>When to repair:</strong> Always worth it (cheap, common failure)</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">Contactor Replacement: $150-$300</p>
                <p className="text-gray-700 mb-1"><strong>Labor:</strong> 1-2 hours | <strong>Lifespan:</strong> 8-12 years</p>
                <p className="text-gray-700"><strong>When to repair:</strong> Always worth it</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">Thermostat Replacement: $100-$400</p>
                <p className="text-gray-700 mb-1"><strong>Labor:</strong> 1-2 hours (DIY possible) | <strong>Lifespan:</strong> 10-20 years</p>
                <p className="text-gray-700"><strong>When to repair:</strong> Always, or DIY upgrade to smart thermostat</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Moderate Repairs ($400-$1,200)</h3>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">Condenser Fan Motor: $400-$800</p>
                <p className="text-gray-700 mb-1"><strong>Labor:</strong> 2-3 hours | <strong>Lifespan:</strong> 10-15 years</p>
                <p className="text-gray-700"><strong>When to repair:</strong> Worth it if AC under 15 years</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">Blower Motor (Indoor): $500-$1,200</p>
                <p className="text-gray-700 mb-1"><strong>Labor:</strong> 2-4 hours | <strong>Lifespan:</strong> 12-18 years</p>
                <p className="text-gray-700"><strong>When to repair:</strong> Worth it if AC under 12 years old</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">Refrigerant Leak Detection + Repair: $400-$2,300</p>
                <p className="text-gray-700 mb-1"><strong>Labor:</strong> 3-6 hours total</p>
                <p className="text-gray-700"><strong>When to repair:</strong> If first leak, AC under 10 years, not R-22</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Major Repairs ($800-$2,500)</h3>

            <div className="space-y-4 mb-6">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-300">
                <p className="font-bold text-gray-900 mb-2">Evaporator Coil Replacement: $800-$1,600</p>
                <p className="text-gray-700 mb-1"><strong>Labor:</strong> 3-6 hours | <strong>Lifespan:</strong> 12-20 years</p>
                <p className="text-amber-700 font-bold"><strong>When to repair:</strong> Only if AC under 10 years</p>
                <p className="text-amber-700 font-bold"><strong>When to replace:</strong> AC 10+ years old</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-300">
                <p className="font-bold text-gray-900 mb-2">Compressor Replacement: $1,500-$2,800</p>
                <p className="text-gray-700 mb-1"><strong>Labor:</strong> 4-8 hours | <strong>Lifespan:</strong> 12-20 years</p>
                <p className="text-red-700 font-bold"><strong>When to repair:</strong> Only if AC under 8 years AND under warranty</p>
                <p className="text-red-700 font-bold"><strong>When to replace:</strong> AC 8+ years old, out of warranty</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">Important: Refrigerant Recharge</h3>
              <p className="text-gray-800 mb-4">
                <strong>R-410A (Modern Systems):</strong> $150-$750 total
              </p>
              <p className="text-gray-800 mb-4">
                <strong>R-22 (Freon - Older Systems):</strong> $450-$2,400 total (phased out, expensive)
              </p>
              <p className="text-red-700 font-bold">
                ⚠️ AC systems are sealed. If you need refrigerant, you have a leak. Just adding refrigerant without fixing the leak wastes money—it'll leak out again.
              </p>
            </div>

            <h2 id="when-repair" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Repair Makes Sense</h2>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Repair is the RIGHT choice when:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>AC is Under 8 Years Old</strong> - Plenty of life left, should be under warranty</li>
                <li><strong>Repair is Cheap (Under $500)</strong> - These are normal wear items that fail regularly</li>
                <li><strong>Parts Under Warranty</strong> - You only pay labor, essentially getting new component</li>
                <li><strong>First Occurrence of Problem</strong> - One fan motor failure at year 9 = normal wear</li>
                <li><strong>Premium Brand AC in Good Condition</strong> - Carrier, Trane, Lennox built to last 20+ years</li>
                <li><strong>Repair Passes $5,000 Rule</strong> - Formula says repair, no other red flags</li>
              </ul>
            </div>

            <h2 id="when-replace" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Replacement Makes Sense</h2>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Replace INSTEAD of repair when:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>AC is 15+ Years Old</strong> - Near or past average lifespan, modern systems often 20-40% more efficient in real-world energy use</li>
                <li><strong>Repair Fails $5,000 Rule</strong> - (Repair Cost) × (Age) &gt; $5,000</li>
                <li><strong>Multiple Repairs in 2 Years</strong> - Pattern of failures, systems fail in cascades</li>
                <li><strong>R-22 Refrigerant + Leak</strong> - Phased out in 2020, recharge costs $450-$2,400</li>
                <li><strong>Compressor Failure (Age 10+ Years)</strong> - Heart of the system, $1,500-$2,800 repair</li>
                <li><strong>Energy Bills Climbing</strong> - 10%+ increase year-over-year, efficiency degraded</li>
                <li><strong>Available Rebates Make Replacement Affordable</strong> - Federal credit 30% (up to $2,000 for qualifying heat pumps), utility rebates $300-$1,500</li>
              </ul>
            </div>

            <h2 id="age-matrix" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Age-Based Decision Matrix</h2>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Repair Cost</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Age 0-7</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Age 8-12</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Age 13-15</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Age 16+</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Under $300</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Repair</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Repair</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Repair</td>
                    <td className="border border-gray-300 px-4 py-2 bg-yellow-50">Repair*</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">$300-$600</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Repair</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Repair</td>
                    <td className="border border-gray-300 px-4 py-2 bg-yellow-50">Consider</td>
                    <td className="border border-gray-300 px-4 py-2 bg-red-50">Replace</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">$600-$1,000</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Repair</td>
                    <td className="border border-gray-300 px-4 py-2 bg-yellow-50">Consider</td>
                    <td className="border border-gray-300 px-4 py-2 bg-red-50">Replace</td>
                    <td className="border border-gray-300 px-4 py-2 bg-red-50">Replace</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">$1,000-$1,500</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Repair</td>
                    <td className="border border-gray-300 px-4 py-2 bg-yellow-50">Consider</td>
                    <td className="border border-gray-300 px-4 py-2 bg-red-50">Replace</td>
                    <td className="border border-gray-300 px-4 py-2 bg-red-50">Replace</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">$1,500-$2,000</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Repair</td>
                    <td className="border border-gray-300 px-4 py-2 bg-red-50">Replace</td>
                    <td className="border border-gray-300 px-4 py-2 bg-red-50">Replace</td>
                    <td className="border border-gray-300 px-4 py-2 bg-red-50">Replace</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">$2,000+</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Repair**</td>
                    <td className="border border-gray-300 px-4 py-2 bg-red-50">Replace</td>
                    <td className="border border-gray-300 px-4 py-2 bg-red-50">Replace</td>
                    <td className="border border-gray-300 px-4 py-2 bg-red-50">Replace</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              *If 16+ years old, even cheap repairs might not be worth it if multiple issues<br/>
              **Only if under warranty (pay labor only)
            </p>

            <h2 id="total-cost" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Total Cost of Ownership: Repair vs Replace</h2>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Scenario: 13-Year-Old AC, $1,400 Repair (Evaporator Coil)</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-300">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Option A: Repair Now</h4>
                <div className="space-y-2 text-gray-700 mb-4">
                  <p><strong>Year 1:</strong> $2,080 (repair + electricity)</p>
                  <p><strong>Years 2-3:</strong> $2,410 (electricity + more repairs)</p>
                  <p><strong>Year 4:</strong> $7,200 (emergency replacement)</p>
                </div>
                <p className="text-xl font-bold text-red-700">4-year total: $11,690</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-300">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Option B: Replace Now</h4>
                <div className="space-y-2 text-gray-700 mb-4">
                  <p><strong>Year 0:</strong> $3,600 (net after rebates)</p>
                  <p><strong>Years 1-4:</strong> $1,800 (lower electricity)</p>
                  <p><strong>Repairs:</strong> $0 (under warranty)</p>
                </div>
                <p className="text-xl font-bold text-green-700">4-year total: $5,400</p>
              </div>
            </div>

            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 mb-6">
              <p className="text-xl font-bold text-green-900 mb-2">Savings by replacing now: $6,290</p>
              <p className="text-gray-800">Plus: New system has 11-16 more years of life</p>
            </div>

            <p className="text-sm text-gray-600 italic mb-8">
              <strong>Note on rebates and tax credits:</strong> Examples shown use current federal 25C tax credit (30% up to $2,000 for qualifying heat pumps and high-efficiency systems) and typical utility rebates ($300-$1,500). Always verify the latest IRS guidelines and local incentive programs for your installation year, as amounts and eligibility can change.
            </p>

            <h2 id="scenarios" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Real-World Repair vs Replace Scenarios</h2>

            <div className="space-y-6 mb-8">
              <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">The Serial Repairer</h3>
                <p className="text-gray-700 mb-2"><strong>System:</strong> 14-year-old Goodman, SEER 10, R-22</p>
                <p className="text-gray-700 mb-2"><strong>History:</strong> Age 12: $280 | Age 13: $420 | Age 13.5: $680 | Age 14: $1,800</p>
                <p className="text-gray-700 mb-2"><strong>Total spent:</strong> $3,180 over 2 years</p>
                <p className="text-gray-700 mb-3"><strong>Current issue:</strong> Another leak, needs $2,200 repair</p>
                <p className="text-red-700 font-bold">Total repair spending: $5,380 (already spent MORE than replacement cost)</p>
                <p className="text-gray-800 mt-2"><strong>Lesson:</strong> Track total repair spending. When approaching replacement cost, stop repairing.</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">The Smart Investor</h3>
                <p className="text-gray-700 mb-2"><strong>System:</strong> 16-year-old Trane, SEER 12</p>
                <p className="text-gray-700 mb-2"><strong>Issue:</strong> Compressor failure, $2,400 repair quote</p>
                <p className="text-gray-700 mb-2"><strong>$5,000 rule:</strong> $2,400 × 16 = $38,400 → REPLACE</p>
                <p className="text-gray-700 mb-3"><strong>Replacement cost:</strong> $4,000 net (after $2,800 in credits/rebates)</p>
                <p className="text-green-700 font-bold">15-year savings: $2,150 profit (extra $1,600 for replacement pays back in 6.4 years, saves $250/year on electricity)</p>
                <p className="text-gray-800 mt-2"><strong>Result:</strong> Saved money long-term, has reliable cooling for 15-20 years, lower electric bills.</p>
              </div>
            </div>

            <h2 id="faq" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>

            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How much does AC repair cost on average?</h3>
                <p className="text-gray-700">$150-$600 for typical repairs. Average homeowner pays $350-$450. Common repair costs: Capacitor ($150-$400), Contactor ($150-$300), Fan motor ($400-$800), Refrigerant leak + recharge ($400-$2,300), Compressor ($1,500-$2,800), Coil replacement ($800-$1,600). Diagnostic fee: $75-$200 (usually applied to repair if you proceed).</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">At what point is it cheaper to replace an AC than repair it?</h3>
                <p className="text-gray-700">Use the $5,000 rule: (Repair Cost) × (AC Age) = Decision Number. If result &gt; $5,000: Replace is likely smarter. If result &lt; $5,000: Repair is likely smarter. Additional factors that favor replacement: AC is 15+ years old, R-22 refrigerant, multiple repairs in past 2 years, compressor failure on AC 10+ years old, energy bills climbing significantly.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Is it worth repairing a 15-year-old air conditioner?</h3>
                <p className="text-gray-700">Usually not, unless the repair is very cheap (under $300). At 15 years, AC is at average lifespan, any significant repair ($500+) doesn't make sense, other components will fail soon, and modern systems are often 20-40% more efficient in real-world energy use (even higher when replacing very old degraded units). Example: $600 repair × 15 years = $9,000 (way over $5,000) → Replace. Exception: $200 repair to buy you 6 months until you can replace in off-season.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">What is the most expensive part to replace on an AC unit?</h3>
                <p className="text-gray-700">The compressor - costs $1,500-$2,800 to replace. It's expensive because it's the heart of the system (most complex component), requires 4-8 hours labor, refrigerant evacuation and recharge, and must be precisely matched to system. Other expensive repairs: Evaporator coil ($800-$1,600), Condenser coil ($900-$2,000), Air handler ($800-$2,500). Decision: If compressor fails and AC is 10+ years old, replace the entire system instead of just the compressor.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Should I repair or replace my AC if the compressor fails?</h3>
                <p className="text-gray-700">It depends on the age: <strong>Under 7 years old + warranty:</strong> REPAIR (warranty covers $1,500-$2,000 part, you only pay $600-$1,000 labor). <strong>8-10 years old:</strong> Borderline (use $5,000 rule). <strong>11+ years old:</strong> REPLACE ($2,000+ repair on aging system doesn't make sense, other components failing soon, modern systems offer better efficiency and reliability).</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How do I know if my AC repair quote is fair?</h3>
                <p className="text-gray-700">Get 3-5 quotes and compare. Fair pricing indicators: Quotes within 20-30% of each other, itemized costs (parts + labor separated), willing to explain charges. Red flags: Quote 50%+ higher or lower than others, won't itemize, pressure to decide immediately, "cash only, no receipt". Example fair quote: Condenser fan motor replacement - Part: $250, Labor (2.5 hours @ $110/hr): $275, Total: $525.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Conclusion: Making the Right Decision</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Repair vs replace comes down to economics, age, and smart planning.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Use the $5,000 rule as your guide:</strong>
            </p>

            <div className="bg-blue-100 border-l-4 border-blue-600 p-6 mb-6">
              <p className="text-lg font-bold text-gray-900 mb-2">(Repair Cost) × (AC Age) &gt; $5,000 → Replace</p>
              <p className="text-lg font-bold text-gray-900">(Repair Cost) × (AC Age) &lt; $5,000 → Repair</p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>But also factor in:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>R-22 refrigerant? → Replace (expensive repairs ahead)</li>
              <li>Multiple repairs in 2 years? → Replace (cascade of failures)</li>
              <li>Age 15+ years? → Replace (near end of life)</li>
              <li>Energy bills climbing? → Replace (inefficiency wasting money)</li>
              <li>Repair under warranty? → Repair (cheap, getting new component)</li>
            </ul>

            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Financial Reality</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Continuing to repair old AC:</strong> Waste $2,000-$6,000 over 2-4 years</li>
                <li><strong>Proactive replacement:</strong> Save $3,000-$8,000 vs emergency replacement</li>
                <li><strong>Energy savings:</strong> $200-$500/year with modern efficient system</li>
              </ul>
            </div>
          </section>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Calculate Your Repair vs Replace ROI</h2>
            <p className="text-gray-700 mb-4">
              See exactly whether repair or replacement makes financial sense:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Compare total cost of ownership</li>
              <li>Calculate energy savings</li>
              <li>Factor in rebates and tax credits</li>
              <li>Determine payback period</li>
              <li>Make data-driven decision</li>
            </ul>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Calculator className="w-5 h-5" />
              Calculate Now
            </Link>
          </div>

          <LeadMagnet />

          <footer className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 mb-4"><em>Last updated: January 3, 2026</em></p>
            <p className="text-gray-700 font-semibold mb-2">Related articles:</p>
            <ul className="space-y-2 mb-6">
              <li><Link to="/blog/when-to-replace-air-conditioner" className="text-blue-600 hover:text-blue-700">When to Replace Your Air Conditioner: 11 Warning Signs</Link></li>
              <li><Link to="/blog/how-long-do-air-conditioners-last" className="text-blue-600 hover:text-blue-700">How Long Do Air Conditioners Last?</Link></li>
              <li><Link to="/blog/ac-unit-cost-2026" className="text-blue-600 hover:text-blue-700">Central AC Cost Guide 2026</Link></li>
              <li><Link to="/blog/hvac-tax-credits-rebates-2026" className="text-blue-600 hover:text-blue-700">2026 HVAC Tax Credits & Rebates</Link></li>
            </ul>
            <Link to="/blog" className="text-blue-600 hover:text-blue-700 transition-colors">
              ← Back to Blog
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}
