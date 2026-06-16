import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';

export default function BlogArticleRatings() {
  return (
    <>
      <Helmet>
        <title>SEER vs EER vs HSPF: HVAC Efficiency Ratings Explained | seercalc.pro</title>
        <meta name="description" content="Confused by SEER, EER, HSPF, and other HVAC acronyms? This complete guide explains what each rating means, how they differ, and which matters most for your system." />
        <meta name="keywords" content="SEER vs EER, HSPF rating, HVAC efficiency ratings, energy efficiency ratio, seasonal energy efficiency, heat pump efficiency, AC efficiency comparison" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://seercalc.pro/blog/seer-eer-hspf-explained" />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://seercalc.pro/blog/seer-eer-hspf-explained" />
        <meta property="og:title" content="SEER vs EER vs HSPF: Understanding HVAC Efficiency Ratings" />
        <meta property="og:description" content="The complete guide to understanding SEER, EER, HSPF, and other HVAC efficiency metrics." />
        <meta property="og:image" content="https://seercalc.pro/images/blog/ratings-comparison-og.png" />
        <meta property="article:author" content="The Efficiency Hub" />
        <meta property="article:section" content="HVAC Education" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SEER vs EER vs HSPF Explained" />
        <meta name="twitter:description" content="Finally understand all those HVAC efficiency acronyms." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "SEER vs EER vs HSPF: HVAC Efficiency Ratings Explained",
            "image": "https://seercalc.pro/images/blog/ratings-comparison.png",
            "author": {
              "@type": "Organization",
              "name": "The Efficiency Hub"
            },
            "publisher": {
              "@type": "Organization",
              "name": "seercalc.pro",
              "logo": {
                "@type": "ImageObject",
                "url": "https://seercalc.pro/logo.png"
              }
            },
            "description": "Comprehensive guide explaining the differences between SEER, EER, HSPF, and other HVAC efficiency metrics."
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
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">HVAC Education</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                10 min read
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">SEER vs EER vs HSPF: HVAC Efficiency Ratings Explained</h1>
            <p className="text-xl text-gray-600">Your complete guide to understanding every HVAC efficiency acronym and which ratings matter most</p>
          </header>

          <section className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Shopping for an HVAC system? You'll encounter an alphabet soup of efficiency ratings: SEER, SEER2, EER, EER2, HSPF, HSPF2, AFUE, COP...
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              What do they all mean? Which ones matter? And why are there so many?
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              This guide breaks down every efficiency rating you'll encounter, explains how they're measured, and helps you understand which numbers to focus on for your specific needs.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Quick Reference Guide</h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Rating</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">What It Measures</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Applies To</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Higher = Better?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>SEER / SEER2</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Seasonal cooling efficiency</td>
                    <td className="border border-gray-300 px-4 py-2">Air conditioners, heat pumps (cooling)</td>
                    <td className="border border-gray-300 px-4 py-2">✅ Yes</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2"><strong>EER / EER2</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Peak cooling efficiency</td>
                    <td className="border border-gray-300 px-4 py-2">Air conditioners, heat pumps (cooling)</td>
                    <td className="border border-gray-300 px-4 py-2">✅ Yes</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>HSPF / HSPF2</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Seasonal heating efficiency</td>
                    <td className="border border-gray-300 px-4 py-2">Heat pumps (heating mode)</td>
                    <td className="border border-gray-300 px-4 py-2">✅ Yes</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2"><strong>COP</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Instantaneous efficiency</td>
                    <td className="border border-gray-300 px-4 py-2">Heat pumps, geothermal</td>
                    <td className="border border-gray-300 px-4 py-2">✅ Yes</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>AFUE</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Annual fuel utilization</td>
                    <td className="border border-gray-300 px-4 py-2">Furnaces, boilers</td>
                    <td className="border border-gray-300 px-4 py-2">✅ Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">SEER: Seasonal Energy Efficiency Ratio</h2>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">What SEER Measures</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              SEER measures how efficiently an air conditioner or heat pump cools your home over an entire cooling season.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>The formula:</strong></p>
            <p className="text-gray-700 bg-gray-100 px-4 py-2 rounded font-mono text-sm mb-4">
              SEER = Total Cooling Output (BTU) ÷ Total Energy Input (Wh)
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Example:</strong> A system that provides 60,000 BTUs of cooling while consuming 5,000 watt-hours has a SEER rating of 12.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">How SEER Is Tested</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Manufacturers test systems under controlled conditions that simulate a typical cooling season:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Temperature range:</strong> 65°F to 104°F outdoor temps</li>
              <li><strong>Indoor conditions:</strong> Maintained at 80°F, 51% humidity</li>
              <li><strong>Variable conditions:</strong> Tests at multiple outdoor temperatures, weighted by frequency</li>
              <li><strong>Duration:</strong> Hundreds of hours of testing to simulate seasonal use</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">SEER vs SEER2 (What Changed in 2023)</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              In January 2023, the DOE introduced <strong>SEER2</strong>, an updated testing procedure that better reflects real-world conditions:
            </p>

            <p className="text-gray-700 leading-relaxed mb-4"><strong>Key changes:</strong></p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Airflow rates:</strong> More realistic CFM (cubic feet per minute) measurements</li>
              <li><strong>Static pressure:</strong> Accounts for typical ductwork resistance</li>
              <li><strong>Fan power:</strong> Includes more accurate blower energy consumption</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>The result:</strong> SEER2 ratings are typically 4-5% lower than old SEER ratings for the same unit. A SEER 16 system might be rated SEER2 15.2 under the new test.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Which should you use?</strong> Always use SEER2 when comparing new systems (2023+). If comparing to an older system, convert: <span className="font-mono bg-gray-100 px-2 py-1 rounded">SEER2 ≈ SEER × 0.95</span>
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Current SEER2 Standards</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Northern states:</strong> Minimum SEER2 13.4</li>
              <li><strong>Southern/Southwest states:</strong> Minimum SEER2 14.3</li>
              <li><strong>High-efficiency systems:</strong> SEER2 16-18</li>
              <li><strong>Premium systems:</strong> SEER2 19-24+</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">When SEER Matters Most</h3>
            <p className="text-gray-700 leading-relaxed mb-4">SEER is the most important rating when:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>You use AC for extended periods (1,000+ hours annually)</li>
              <li>You experience moderate temperature variations (not constantly extreme heat)</li>
              <li>You want to estimate annual cooling costs</li>
              <li>You're comparing central air conditioners or heat pumps</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">EER: Energy Efficiency Ratio</h2>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">What EER Measures</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              EER measures how efficiently a system cools at a <strong>single, specific outdoor temperature</strong>: 95°F.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>The formula:</strong></p>
            <p className="text-gray-700 bg-gray-100 px-4 py-2 rounded font-mono text-sm mb-4">
              EER = Cooling Output (BTU/hr) ÷ Power Input (Watts)
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Example:</strong> A unit producing 36,000 BTU/hr while consuming 3,000 watts has an EER of 12.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">How EER Differs from SEER</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Aspect</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">SEER</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">EER</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>Temperature range</strong></td>
                    <td className="border border-gray-300 px-4 py-2">65°F - 104°F (varied)</td>
                    <td className="border border-gray-300 px-4 py-2">95°F only</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2"><strong>Testing duration</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Seasonal simulation</td>
                    <td className="border border-gray-300 px-4 py-2">Single steady-state test</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>What it shows</strong></td>
                    <td className="border border-gray-300 px-4 py-2">Real-world seasonal average</td>
                    <td className="border border-gray-300 px-4 py-2">Peak performance capability</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2"><strong>Best for</strong></td>
                    <td className="border border-gray-300 px-4 py-2">General comparison</td>
                    <td className="border border-gray-300 px-4 py-2">Hot climate assessment</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">EER2: The Updated Standard</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Like SEER2, <strong>EER2</strong> uses updated testing procedures (2023+):</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>More realistic airflow and static pressure</li>
              <li>Typically 3-4% lower than old EER for same unit</li>
              <li>Conversion: <span className="font-mono bg-gray-100 px-2 py-1 rounded">EER2 ≈ EER × 0.96</span></li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Why EER Matters</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              EER becomes more important than SEER in specific situations:
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>1. Consistently Hot Climates</strong></p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Phoenix, Las Vegas, South Texas, Central Valley California—anywhere temperatures regularly exceed 95°F for extended periods. In these areas, peak efficiency matters more than seasonal average.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>2. Commercial Buildings</strong></p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Commercial HVAC often uses EER because buildings run AC year-round at consistent loads.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>3. Window/Portable Units</strong></p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Room air conditioners are typically rated by EER rather than SEER since they're used more sporadically.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">SEER to EER Relationship</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Generally, <span className="font-mono bg-gray-100 px-2 py-1 rounded">EER ≈ SEER × 0.875</span>
            </p>

            <p className="text-gray-700 leading-relaxed mb-4"><strong>Examples:</strong></p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>SEER 16 ≈ EER 14</li>
              <li>SEER 20 ≈ EER 17.5</li>
              <li>SEER 24 ≈ EER 21</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              Variable-speed systems often have better SEER relative to EER because they excel in part-load conditions. Single-stage systems have similar SEER and EER ratios.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">When to Prioritize EER</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Choose a system with high EER (relative to SEER) if:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>You live in a desert climate (Phoenix, Palm Springs, Las Vegas)</li>
              <li>Summer temperatures consistently exceed 95°F</li>
              <li>You run AC near maximum capacity frequently</li>
              <li>Peak electricity rates are significantly higher than average</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">HSPF: Heating Seasonal Performance Factor</h2>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">What HSPF Measures</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              HSPF measures how efficiently a <strong>heat pump</strong> heats your home over an entire heating season.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>The formula:</strong></p>
            <p className="text-gray-700 bg-gray-100 px-4 py-2 rounded font-mono text-sm mb-4">
              HSPF = Total Heating Output (BTU) ÷ Total Energy Input (Wh)
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Example:</strong> A heat pump that provides 40,000 BTUs of heating while consuming 3,500 watt-hours has an HSPF of 11.4.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Why Heat Pumps Need a Separate Rating</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Heat pumps both cool and heat. SEER measures cooling efficiency, but heating is a different process with different efficiency characteristics. Hence, HSPF.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">How HSPF Is Tested</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Testing simulates a heating season in Region IV (moderate climate):</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Temperature range:</strong> 5°F to 62°F outdoor temps</li>
              <li><strong>Indoor conditions:</strong> Maintained at 70°F</li>
              <li><strong>Includes defrost cycles:</strong> Accounts for efficiency loss during defrost</li>
              <li><strong>Backup heat:</strong> Accounts for electric resistance heat when heat pump can't keep up</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">HSPF2: The New Standard (2023+)</h3>
            <p className="text-gray-700 leading-relaxed mb-4"><strong>HSPF2</strong> replaced HSPF with updated testing:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Based on colder Region V (Northern climate) conditions</li>
              <li>More realistic airflow and static pressure</li>
              <li>Better accounts for real-world ductwork</li>
              <li>Typically 15% lower than old HSPF: <span className="font-mono bg-gray-100 px-2 py-1 rounded">HSPF2 ≈ HSPF × 0.85</span></li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-4"><strong>Current minimums:</strong></p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Northern regions:</strong> HSPF2 7.5</li>
              <li><strong>Southern regions:</strong> HSPF2 6.7</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">HSPF Performance Tiers</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>HSPF2 7.5-8:</strong> Minimum standard, basic efficiency</li>
              <li><strong>HSPF2 9-10:</strong> Good efficiency, suitable for moderate climates</li>
              <li><strong>HSPF2 10-11:</strong> High efficiency, works well in colder climates</li>
              <li><strong>HSPF2 11+:</strong> Premium cold-climate heat pumps</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">When HSPF Matters Most</h3>
            <p className="text-gray-700 leading-relaxed mb-4">HSPF is critical if:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>You're using a heat pump as your primary heating source</li>
              <li>You live in a cold climate (winter temps regularly below 40°F)</li>
              <li>Electricity is your only heating fuel</li>
              <li>You want to eliminate gas/oil heating</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Cold Climate Considerations</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Standard heat pumps lose efficiency as temperatures drop. At 5°F, capacity may drop 40-50%. Look for:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Cold-climate heat pumps:</strong> Rated for operation to -15°F or colder</li>
              <li><strong>Variable-speed compressors:</strong> Maintain better low-temp performance</li>
              <li><strong>Hyper-heat technology:</strong> Specialized designs for extreme cold</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              In very cold climates (Zone 6-7), even high-HSPF2 heat pumps may need backup heat sources.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">COP: Coefficient of Performance</h2>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">What COP Measures</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              COP measures instantaneous efficiency—how much heating or cooling you get per unit of energy at a specific moment.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>The formula:</strong></p>
            <p className="text-gray-700 bg-gray-100 px-4 py-2 rounded font-mono text-sm mb-6">
              COP = Useful Heating/Cooling Output ÷ Energy Input
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Unlike SEER and HSPF (which use BTUs and watt-hours), COP is a pure ratio using the same units for input and output.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Why COP Matters</h3>
            <p className="text-gray-700 leading-relaxed mb-4">COP is commonly used for:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Geothermal heat pumps:</strong> COP is the standard metric</li>
              <li><strong>Scientific comparisons:</strong> Universal measurement (works globally)</li>
              <li><strong>Engineering analysis:</strong> Precise efficiency at specific conditions</li>
              <li><strong>Mini-split systems:</strong> Many manufacturers use COP</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Converting Between COP and SEER/HSPF</h3>
            <p className="text-gray-700 leading-relaxed mb-2"><strong>SEER to COP (approximate):</strong></p>
            <p className="text-gray-700 bg-gray-100 px-4 py-2 rounded font-mono text-sm mb-2">
              Average COP ≈ SEER ÷ 3.41
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>SEER 16 ≈ COP 4.7</li>
              <li>SEER 20 ≈ COP 5.9</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>HSPF to COP (approximate):</strong></p>
            <p className="text-gray-700 bg-gray-100 px-4 py-2 rounded font-mono text-sm mb-2">
              Average COP ≈ HSPF ÷ 3.41
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>HSPF 10 ≈ COP 2.9</li>
              <li>HSPF 12 ≈ COP 3.5</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">What Makes a Good COP?</h3>
            <p className="text-gray-700 leading-relaxed mb-4"><strong>For cooling:</strong></p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>COP 3-4: Standard efficiency</li>
              <li>COP 4-5: High efficiency</li>
              <li>COP 5+: Premium efficiency</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-4"><strong>For heating:</strong></p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>COP 2-2.5: Basic heat pump</li>
              <li>COP 2.5-3.5: Good heat pump</li>
              <li>COP 3.5-4.5: High-efficiency or geothermal</li>
              <li>COP 4.5+: Premium geothermal</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Why heating COP is lower:</strong> Heat pumps work harder when the temperature difference is greater. In winter, you're trying to move heat from 20°F outside to 70°F inside (50° difference). In summer, you're moving heat from 70°F inside to 95°F outside (25° difference).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">AFUE: Annual Fuel Utilization Efficiency</h2>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">What AFUE Measures</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              AFUE measures how efficiently a <strong>furnace or boiler</strong> converts fuel (gas, oil, propane) into heat over a full heating season.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>The formula:</strong></p>
            <p className="text-gray-700 bg-gray-100 px-4 py-2 rounded font-mono text-sm mb-6">
              AFUE = (Heat Output ÷ Fuel Energy Input) × 100
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              AFUE is expressed as a percentage. An AFUE of 95% means 95% of the fuel's energy becomes heat, and 5% is lost (mostly through exhaust).
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">AFUE Performance Tiers</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>50-70% AFUE:</strong> Old furnaces (pre-1992), very inefficient</li>
              <li><strong>78-80% AFUE:</strong> Minimum legal standard (non-weatherized natural gas furnaces)</li>
              <li><strong>90-95% AFUE:</strong> Mid-efficiency, condensing furnaces</li>
              <li><strong>95-98.5% AFUE:</strong> High-efficiency, fully modulating furnaces</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Why AFUE Differs from SEER/HSPF</h3>
            <p className="text-gray-700 leading-relaxed mb-4">AFUE is simpler because:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Furnaces don't have variable efficiency like heat pumps (they burn fuel consistently)</li>
              <li>No electrical-to-thermal conversion complexity</li>
              <li>Direct fuel-to-heat measurement</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">When AFUE Matters</h3>
            <p className="text-gray-700 leading-relaxed mb-4">AFUE is relevant only if you're using:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Natural gas furnace</li>
              <li>Propane furnace</li>
              <li>Oil furnace</li>
              <li>Gas/oil boiler (for radiant heat)</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              If you have a heat pump, ignore AFUE—use HSPF instead.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Which Rating Should You Focus On?</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Central Air Conditioning</h3>
              <p className="text-gray-700 mb-1"><strong>Primary:</strong> SEER2 (or SEER if pre-2023 system)</p>
              <p className="text-gray-700"><strong>Secondary:</strong> EER2 if you live in a consistently hot climate</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Heat Pumps (Cooling Mode)</h3>
              <p className="text-gray-700 mb-1"><strong>Primary:</strong> SEER2</p>
              <p className="text-gray-700"><strong>Secondary:</strong> EER2 for hot climates</p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Heat Pumps (Heating Mode)</h3>
              <p className="text-gray-700 mb-1"><strong>Primary:</strong> HSPF2</p>
              <p className="text-gray-700"><strong>Secondary:</strong> Check COP at specific low temperatures if you have cold winters</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Gas Furnaces</h3>
              <p className="text-gray-700 mb-1"><strong>Only rating:</strong> AFUE</p>
              <p className="text-gray-700">Aim for 95%+ AFUE in cold climates, 90%+ minimum elsewhere</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Real-World Efficiency vs. Rated Efficiency</h2>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Why Actual Performance Varies</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your system's real-world efficiency will differ from rated numbers due to:
            </p>

            <p className="text-gray-700 leading-relaxed mb-4"><strong>Installation factors:</strong></p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Refrigerant charge:</strong> ±10% efficiency if incorrect</li>
              <li><strong>Airflow:</strong> Undersized ducts reduce efficiency 15-25%</li>
              <li><strong>Ductwork leaks:</strong> Can waste 20-40% of conditioned air</li>
              <li><strong>Thermostat placement:</strong> Poor location causes short-cycling</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-4"><strong>Maintenance factors:</strong></p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Dirty filters:</strong> Reduce efficiency 5-15%</li>
              <li><strong>Dirty coils:</strong> Reduce efficiency 20-30%</li>
              <li><strong>Low refrigerant:</strong> Drops efficiency significantly</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-4"><strong>Usage factors:</strong></p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Extreme temperatures:</strong> Efficiency drops when conditions exceed test ranges</li>
              <li><strong>Humidity:</strong> High humidity increases latent load</li>
              <li><strong>Frequent adjustments:</strong> Constant thermostat changes reduce efficiency</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Maximizing Real-World Efficiency</h3>
            <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Hire quality installers:</strong> Proper installation is worth paying for</li>
              <li><strong>Get Manual J load calculations:</strong> Ensure correct sizing</li>
              <li><strong>Seal ductwork:</strong> Test and seal all duct connections</li>
              <li><strong>Change filters monthly:</strong> Especially during heavy-use seasons</li>
              <li><strong>Annual professional maintenance:</strong> Keeps system at peak efficiency</li>
              <li><strong>Use programmable thermostats:</strong> Reduce unnecessary runtime</li>
              <li><strong>Maintain steady temperatures:</strong> Avoid large setbacks/setups</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">The Bottom Line</h2>

            <p className="text-gray-700 leading-relaxed mb-4"><strong>For most homeowners:</strong></p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Focus on <strong>SEER2</strong> for air conditioning</li>
              <li>Focus on <strong>HSPF2</strong> for heat pump heating</li>
              <li>Focus on <strong>AFUE</strong> for gas furnaces</li>
              <li>Consider <strong>EER2</strong> as a secondary factor in hot climates</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Don't get overwhelmed by acronyms.</strong> These ratings exist to help you make informed decisions. Higher numbers mean lower operating costs—but balance efficiency with upfront cost and payback period.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Use our calculator to see how different SEER ratings translate to real dollar savings in your specific situation.
            </p>
          </section>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Calculate Your Efficiency Savings</h2>
            <p className="text-gray-700 mb-4">Ready to see how much you could save with a more efficient system?</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Calculator className="w-5 h-5" />
              Use Our SEER Calculator
            </Link>
          </div>

          <LeadMagnet />

          <footer className="mt-12 pt-8 border-t border-gray-200">
            <Link to="/blog" className="text-blue-600 hover:text-blue-700 transition-colors">
              ← Back to Blog
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}
