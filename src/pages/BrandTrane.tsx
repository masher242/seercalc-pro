import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock, CheckCircle2, AlertCircle, Shield, Star } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';

const modelLineup = [
  { series: 'XV20i', tier: 'Premier', compressor: 'Variable-speed', seer2: 'Up to 23.6', warranty: '12-yr compressor (registered)', note: 'TruComfort, ComfortLink II' },
  { series: 'XL18i', tier: 'Priority', compressor: 'Two-stage', seer2: 'Up to ~18.0', warranty: '10-yr parts (registered)', note: 'WeatherGuard II coil' },
  { series: 'XR17', tier: 'Mid', compressor: 'Single-stage', seer2: 'Up to 17.1', warranty: '10-yr parts (registered)', note: 'Spine Fin coil' },
  { series: 'XR15', tier: 'Mid/Entry', compressor: 'Single-stage', seer2: '~15.0', warranty: '10-yr parts (registered)', note: 'First R-454B model (2024)' },
  { series: 'XR14', tier: 'Entry', compressor: 'Single-stage', seer2: '14.0', warranty: '10-yr parts (registered)', note: 'Base Climatuff compressor' },
];

const pricingData = [
  { tier: 'Choice (Entry)', series: 'XR series', centralAC: '$4,881–$6,546', heatPump: '$6,076–$7,037' },
  { tier: 'Priority (Mid)', series: 'XL series', centralAC: '$6,481–$8,496', heatPump: '$7,356–$9,758' },
  { tier: 'Premier (Premium)', series: 'XV series', centralAC: '$8,860–$10,414', heatPump: '$9,616–$11,644' },
];

const tonnagePricing = [
  { tons: '2 ton', equipmentOnly: '$2,900–$4,350', installed: '$3,950–$5,960' },
  { tons: '2.5 ton', equipmentOnly: '$3,200–$4,700', installed: '$4,200–$6,500' },
  { tons: '3 ton', equipmentOnly: '$3,550–$5,100', installed: '$4,580–$7,160' },
  { tons: '4 ton', equipmentOnly: '$4,000–$6,470', installed: '$5,100–$8,080' },
  { tons: '5 ton', equipmentOnly: '$4,520–$7,580', installed: '$5,650–$9,200' },
];

const competitorComparison = [
  { brand: 'Goodman', entry: '$3,500–$5,500', mid: '$5,000–$7,000', premium: '$7,000–$9,500', tier: 'Budget' },
  { brand: 'Rheem', entry: '$3,800–$5,800', mid: '$5,500–$7,500', premium: '$7,500–$10,000', tier: 'Mid' },
  { brand: 'Carrier', entry: '$3,200–$6,500', mid: '$6,500–$10,000', premium: '$10,000–$15,000', tier: 'Premium' },
  { brand: 'Trane', entry: '$4,881–$6,546', mid: '$6,481–$8,496', premium: '$8,860–$10,414', tier: 'Premium', highlight: true },
  { brand: 'Lennox', entry: '$5,000–$7,000', mid: '$7,500–$11,000', premium: '$11,000–$17,000', tier: 'Ultra-premium' },
];

export default function BrandTrane() {
  return (
    <>
      <Helmet>
        <title>Trane AC Review 2026: Reliability, Pricing, Models & Warranty | seercalc.pro</title>
        <meta name="description" content="Trane air conditioner review 2026: 5/5 Consumer Reports reliability, $4,881–$10,414 installed costs, 10-year warranty, known issues with TAM coils and proprietary parts. Is Trane worth the premium?" />
        <meta name="keywords" content="Trane AC review 2026, Trane air conditioner reliability, Trane XV20i, Trane warranty, Trane vs Carrier, Trane price 2026, is Trane a good brand" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://seercalc.pro/brands/trane" />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://seercalc.pro/brands/trane" />
        <meta property="og:title" content="Trane AC Review 2026: Reliability, Pricing, Models & Warranty" />
        <meta property="og:description" content="Is Trane worth the premium? Consumer Reports 5/5 reliability, $4,881–$10,414 installed costs, known TAM coil issues, and who should (and shouldn't) buy Trane in 2026." />
        <meta property="og:image" content="https://seercalc.pro/images/brands/trane-review-og.png" />
        <meta property="article:author" content="The Efficiency Hub" />
        <meta property="article:section" content="Brand Reviews" />
        <meta property="article:tag" content="Trane" />
        <meta property="article:tag" content="HVAC" />
        <meta property="article:tag" content="Air Conditioner Review" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://seercalc.pro/brands/trane" />
        <meta name="twitter:title" content="Trane AC Review 2026: Reliability, Pricing & Warranty" />
        <meta name="twitter:description" content="Is Trane worth the premium in 2026? Full review with real pricing, model lineup, known issues, and warranty terms." />
        <meta name="twitter:image" content="https://seercalc.pro/images/brands/trane-review-og.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "Trane Air Conditioner Review 2026",
            "reviewBody": "Trane earns Consumer Reports' highest predicted reliability score (5/5) and has won America's Most Trusted HVAC Brand for 12 consecutive years. The Spine Fin all-aluminum coil is a genuine differentiator in coastal climates. Known issues include TAM evaporator coil leaks (~1-in-15 rate), proprietary parts scarcity, and communicating system complexity on XV-series units. Pricing runs $4,881–$10,414 installed for central AC.",
            "author": { "@type": "Organization", "name": "The Efficiency Hub", "url": "https://seercalc.pro" },
            "publisher": { "@type": "Organization", "name": "seercalc.pro", "logo": { "@type": "ImageObject", "url": "https://seercalc.pro/logo.png" } },
            "itemReviewed": {
              "@type": "Product",
              "name": "Trane Air Conditioners",
              "brand": { "@type": "Brand", "name": "Trane" },
              "manufacturer": { "@type": "Organization", "name": "Trane Technologies plc" }
            },
            "reviewRating": { "@type": "Rating", "ratingValue": "4.5", "bestRating": "5", "worstRating": "1" }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is Trane a good air conditioner brand?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Trane earns Consumer Reports' highest predicted reliability score (5/5) among major US HVAC brands, and has won America's Most Trusted HVAC Brand for 12 consecutive years. The Spine Fin all-aluminum coil is a genuine differentiator for coastal and humid climates. Known trade-offs: premium pricing ($4,881–$10,414 installed for central AC), proprietary parts that can be hard to source, and a TAM evaporator coil that has a known leak pattern in some units."
                }
              },
              {
                "@type": "Question",
                "name": "How much does a Trane AC cost in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Trane central air conditioner costs $4,881–$6,546 installed for entry-tier (Choice/XR series), $6,481–$8,496 for mid-tier (Priority/XL series), and $8,860–$10,414 for premium (Premier/XV series). These are Trane's own published 2026 pricing ranges including standard installation. Ductwork, permits, and thermostat upgrades are additional."
                }
              },
              {
                "@type": "Question",
                "name": "What is Trane's warranty in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trane offers a 10-year parts warranty when registered within 60 days of installation — dropping to 5 years if unregistered. Select XL and XV series models include a 12-year compressor warranty when registered. Labor is NOT covered under the standard warranty. The warranty is transferable for $99 within 90 days of a home sale."
                }
              },
              {
                "@type": "Question",
                "name": "What are the most common Trane AC problems?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The most commonly reported Trane issues are: (1) TAM/Hyperion evaporator coil refrigerant leaks — one technician cited roughly 1-in-15 units affected; (2) control board failures on newer residential units; (3) EXV/stepper motor issues on XV-series variable-speed systems; (4) thermistor failures in communicating air handlers; (5) proprietary parts that are difficult and expensive to source locally."
                }
              },
              {
                "@type": "Question",
                "name": "Is Trane better than Carrier?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For coastal and humid climates, Trane's Spine Fin all-aluminum coil (rated for 2,000-hour salt spray exposure) is a significant advantage over Carrier. Consumer Reports rates Trane 5/5 vs. Carrier 4/5 for predicted reliability. Pricing is within 2% on comparable 3-ton systems. Carrier has better parts availability in many US markets. The best choice depends on your climate, local dealer quality, and installer preference."
                }
              },
              {
                "@type": "Question",
                "name": "Who owns Trane?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trane is owned by Trane Technologies plc (NYSE: TT), a publicly traded company headquartered in Davidson, North Carolina. Trane Technologies also owns the American Standard HVAC brand. The company was formerly part of Ingersoll Rand until 2020, when it spun off as an independent pure-play climate company. Trane is not related to the current Ingersoll Rand Inc."
                }
              },
              {
                "@type": "Question",
                "name": "Does Trane still qualify for the $2,000 federal tax credit in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. The federal Section 25C Energy Efficient Home Improvement Credit expired on December 31, 2025, under the One Big Beautiful Bill Act. No federal tax credit is available for Trane (or any brand) installed in 2026. The credit is still claimable for qualifying equipment installed in 2025 on your 2025 tax return. State and utility rebates may still apply — check your state's HEAR/HEEHRA program status."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/brands" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Brand Reviews
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">Brand Review</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                15 min read
              </span>
              <span className="text-gray-400">Updated July 2026</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Trane Air Conditioners: 2026 Review</h1>
            <p className="text-xl text-gray-600">Reliability, pricing, model lineup, warranty terms, known issues — everything you need before signing a contract</p>
          </header>

          {/* Quick Answer Box */}
          <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg mb-8">
            <p className="text-sm font-semibold text-teal-800 uppercase tracking-wide mb-2">Quick Answer</p>
            <p className="text-gray-800"><strong>Trane is a premium-tier brand</strong> with Consumer Reports' highest predicted reliability score (5/5) among major US HVAC brands. Installed costs run <strong>$4,881–$10,414</strong> for central AC depending on tier. The Spine Fin all-aluminum coil is a real differentiator for coastal climates. Main trade-offs: proprietary parts are hard to source, the TAM evaporator coil has a known leak issue in some units, and labor is never covered under warranty. <strong>Best for:</strong> long-stay homeowners in hot or coastal climates who prioritize reliability over upfront cost.</p>
          </div>

          {/* Scorecard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <div className="flex justify-center mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-teal-500 text-teal-500" />)}
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Reliability</p>
              <p className="text-xs text-gray-500 mt-1">Consumer Reports 5/5</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">23.6</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Max SEER2</p>
              <p className="text-xs text-gray-500 mt-1">XV20i flagship</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">10yr</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Parts Warranty</p>
              <p className="text-xs text-gray-500 mt-1">When registered</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">18–22</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Lifespan (yrs)</p>
              <p className="text-xs text-gray-500 mt-1">With maintenance</p>
            </div>
          </div>

          {/* Table of Contents */}
          <nav className="bg-gray-50 rounded-lg p-5 mb-10 border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">In this review:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
              <a href="#company" className="text-teal-600 hover:text-teal-700">1. Company background</a>
              <a href="#models" className="text-teal-600 hover:text-teal-700">2. Model lineup & SEER2 ratings</a>
              <a href="#reliability" className="text-teal-600 hover:text-teal-700">3. Reliability data</a>
              <a href="#issues" className="text-teal-600 hover:text-teal-700">4. Known issues & complaints</a>
              <a href="#warranty" className="text-teal-600 hover:text-teal-700">5. Warranty terms (2026)</a>
              <a href="#pricing" className="text-teal-600 hover:text-teal-700">6. Pricing & cost comparison</a>
              <a href="#refrigerant" className="text-teal-600 hover:text-teal-700">7. R-454B refrigerant transition</a>
              <a href="#best-for" className="text-teal-600 hover:text-teal-700">8. Who should buy Trane?</a>
              <a href="#vs-carrier" className="text-teal-600 hover:text-teal-700">9. Trane vs. Carrier</a>
              <a href="#faq" className="text-teal-600 hover:text-teal-700">10. FAQ</a>
            </div>
          </nav>

          <section className="prose prose-lg max-w-none">

            {/* Section 1: Company Background */}
            <div id="company" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Company Background</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Trane was founded in 1885 by James Trane, a Norwegian immigrant, as a plumbing and pipe-fitting shop in La Crosse, Wisconsin. Today it operates under <strong>Trane Technologies plc (NYSE: TT)</strong>, a publicly traded company headquartered in Davidson, North Carolina, with 2025 revenues of $21.32 billion.
              </p>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm font-semibold text-amber-800 mb-1">Common misconception</p>
                <p className="text-sm text-gray-700">Trane is <strong>not owned by Ingersoll Rand</strong>. The two companies separated in March 2020 when Ingersoll Rand's climate division spun off as the independent Trane Technologies. Many contractor forums and older articles still confuse the two.</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Two important structural facts that affect your purchase:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>American Standard is the same hardware.</strong> Both Trane and American Standard HVAC brands are operated under Trane Technologies and manufactured at the same US facilities with identical components. American Standard typically prices 10–20% lower — worth knowing if the brand name isn't important to you.</li>
                <li><strong>Trane mini-splits are Mitsubishi.</strong> Trane does not manufacture its own ductless equipment. Mini-splits sold under the Trane name are Mitsubishi Electric units distributed through a 50/50 joint venture (METUS) formed in 2018. The hardware is identical to what you'd buy branded as Mitsubishi Electric.</li>
              </ul>

              <p className="text-gray-700 leading-relaxed mb-4">
                Primary US manufacturing happens in <strong>Tyler, Texas</strong> (1.3 million sq ft facility, 1,200+ employees) and <strong>La Crosse, Wisconsin</strong>. Trane has explicitly cited a "region for region" manufacturing strategy to mitigate 2025–2026 tariff impacts on steel and aluminum.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 2: Model Lineup */}
            <div id="models" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Model Lineup & SEER2 Ratings (2025–2026)</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Trane's naming convention is straightforward once you know it: <strong>XV</strong> = variable-speed (Premier tier); <strong>XL</strong> = two-stage (Priority tier); <strong>XR</strong> = single-stage (Choice/entry tier). Higher letter = higher tier.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Model</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Tier</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Compressor</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">SEER2</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelLineup.map((m, i) => (
                      <tr key={m.series} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-900">{m.series}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{m.tier}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{m.compressor}</td>
                        <td className="border border-gray-200 px-4 py-3 font-medium text-teal-700">{m.seer2}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600 text-xs">{m.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-blue-800 mb-1">Important: SEER2 varies by matched system</p>
                <p className="text-sm text-gray-700">The SEER2 ratings above reflect peak-configuration performance. Your actual system's certified SEER2 depends on the specific outdoor unit + indoor coil combination installed. Always verify using the <strong>AHRI Reference Number</strong> for your matched system at <a href="https://www.ahridirectory.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">ahridirectory.org</a> — this is the binding number for tax credit and utility rebate eligibility.</p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Mini-Split Range (via Mitsubishi/METUS)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Trane's mini-split lineup through METUS reaches up to <strong>32.2 SEER2</strong> on high-end Mitsubishi units — significantly higher than any Trane central AC. If maximum efficiency is your priority, the Mitsubishi equipment sold under the Trane name is among the best available in the US market. The METUS lineup transitioned to R-454B refrigerant in April 2025.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 3: Reliability */}
            <div id="reliability" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Reliability Data</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-teal-600 mb-1">5/5</p>
                  <p className="text-sm font-semibold text-gray-700">Consumer Reports</p>
                  <p className="text-xs text-gray-500 mt-1">Predicted reliability — highest score among major US brands</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-teal-600 mb-1">12×</p>
                  <p className="text-sm font-semibold text-gray-700">Most Trusted Brand</p>
                  <p className="text-xs text-gray-500 mt-1">Lifestory Research, consecutive years through Jan 2026</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-teal-600 mb-1">18–22</p>
                  <p className="text-sm font-semibold text-gray-700">Years (typical lifespan)</p>
                  <p className="text-xs text-gray-500 mt-1">With proper annual maintenance</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Trane's Consumer Reports 5/5 predicted reliability score is meaningful because it reflects actual owner-reported repair rates across a large subscriber base — not just sales volume or marketing spend. Carrier scores 4/5 by the same measure. For the category of equipment you'll own for 15–20 years, that difference is worth taking seriously.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Trane's <strong>Climatuff compressor</strong> (used across most residential lines) and <strong>Spine Fin all-aluminum coil</strong> are the two hardware features most cited by contractors and industry experts as reasons for Trane's durability reputation. The Spine Fin coil eliminates most brazed joints (a common failure point in copper-aluminum coils) and is rated for 2,000-hour salt spray exposure — twice the industry standard.
              </p>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
                <p className="text-sm font-semibold text-amber-800 mb-1">Contractor sentiment vs. owner experience</p>
                <p className="text-sm text-gray-700">HVAC technician forums often show Trane frustration — primarily around proprietary parts, complex communicating systems, and TAM coil issues. This diverges from Consumer Reports' owner satisfaction data. The explanation: technicians encounter the failures; satisfied owners rarely post online. Both data points are real — read the issues section carefully, then weigh against the reliability scores.</p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 4: Known Issues */}
            <div id="issues" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Known Issues & Complaints</h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                No brand at this scale is without field problems. These are the issues most consistently reported by HVAC technicians and homeowners across Reddit's r/HVAC, HVAC-Talk forums, and consumer review sites — not isolated incidents, but recurring patterns worth knowing before you buy.
              </p>

              <div className="space-y-4 mb-6">
                <div className="border border-red-200 rounded-lg p-5 bg-red-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">TAM/Hyperion Evaporator Coil Leaks — Most Significant Issue</p>
                      <p className="text-sm text-gray-700">The TAM air handler series (Hyperion cabinet) has a documented refrigerant leak pattern. One HVAC technician with significant field experience cited approximately 1-in-15 TAM 4/7/8/9 coils leaking. The critical warranty gap: Trane does not cover refrigerant or labor under the standard parts warranty. With R-454B refrigerant now running $700–$2,000+ per service call, a coil leak on a newer system can cost the homeowner $1,000–$2,500 out-of-pocket even during the warranty period.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-amber-200 rounded-lg p-5 bg-amber-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Proprietary Parts — Widespread Contractor Frustration</p>
                      <p className="text-sm text-gray-700">Trane uses non-standard hardware and proprietary connector designs on higher-end equipment. Circuit boards and motors often aren't stocked at local distributors, requiring orders that delay repairs by days. One technician summarized it as: "No manufacturer sticks it up your ass harder than Trane for replacement parts." This is a recurring theme across multiple independent forum discussions — not an outlier complaint.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-amber-200 rounded-lg p-5 bg-amber-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">XV-Series Communicating System Complexity</p>
                      <p className="text-sm text-gray-700">The XV-series variable-speed systems (ComfortLink II) are sophisticated — and require equally sophisticated installation and service. EXV/stepper motor failures, thermistor issues, and communicating system troubleshooting are commonly cited in XV-series discussions. These systems reward skilled installers and punish poor installation. If your area doesn't have experienced Trane Comfort Specialist dealers, the XV-series is a risk.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Control Board Failures on Newer Residential Units</p>
                      <p className="text-sm text-gray-700">Multiple contractors have noted a pattern of circuit board replacements on recent residential Trane units — possibly related to the transition to more electronics-intensive variable-speed and communicating controls. Not yet a well-documented widespread issue, but worth monitoring in the first 2–3 years post-installation.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">A2L Nuisance Lockouts (Industry-Wide)</p>
                      <p className="text-sm text-gray-700">New R-454B systems use A2L (mildly flammable) refrigerant and include leak sensors. First-generation sensors cross-react with household VOCs — spray foam, fresh paint, vinyl flooring — triggering false refrigerant leak alarms and system lockouts. This is an industry-wide issue affecting all brands transitioning to A2L refrigerants, not Trane-specific.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>How to protect yourself:</strong> For any Trane installation, ask your dealer specifically about the TAM coil warranty process before signing — what happens if the coil leaks in year 3? Who pays for refrigerant? Who pays for labor? Get the answers in writing. Consider an extended warranty plan that covers labor and refrigerant; this changes the risk profile significantly.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 5: Warranty */}
            <div id="warranty" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Warranty Terms (2026)</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Coverage</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Registered (within 60 days)</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Unregistered</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Parts (all tiers)</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-teal-700">10 years</td>
                      <td className="border border-gray-200 px-4 py-3 text-red-600 font-medium">5 years</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Compressor (XV/XL select)</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-teal-700">12 years</td>
                      <td className="border border-gray-200 px-4 py-3 text-red-600 font-medium">5 years</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Labor</td>
                      <td className="border border-gray-200 px-4 py-3 text-red-600 font-medium">NOT included</td>
                      <td className="border border-gray-200 px-4 py-3 text-red-600 font-medium">NOT included</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Refrigerant</td>
                      <td className="border border-gray-200 px-4 py-3 text-red-600 font-medium">NOT included</td>
                      <td className="border border-gray-200 px-4 py-3 text-red-600 font-medium">NOT included</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Unit replacement</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-500">Not offered</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-500">Not offered</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">⚠️ Critical: Register within 60 days</p>
                  <p className="text-sm text-gray-700">The registration clock starts when the unit is <strong>first energized (turned on)</strong> — not the contract date. Miss the 60-day window and your 10-year warranty drops to 5 years with no exceptions. Set a calendar reminder for Day 55.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-800 mb-2">Warranty transfer: $99</p>
                  <p className="text-sm text-gray-700">For units registered after August 1, 2011. Must transfer within 90 days of home sale. Contact 1-855-956-5685. This is useful for resale value — a registered Trane system is a genuine selling point.</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">What Voids the Warranty</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-sm text-gray-700">
                <li>Failure to register within 60 days (drops to 5-year base — not a void, but a significant reduction)</li>
                <li>Installation by a non-certified dealer (Trane requires certified Trane Comfort Specialist installation for registered warranty)</li>
                <li>Damage from causes other than manufacturer defect</li>
                <li>Non-residential or new construction use</li>
              </ul>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-teal-800 mb-1">Our recommendation on extended warranty</p>
                <p className="text-sm text-gray-700">Given the TAM coil leak issue and R-454B refrigerant costs, strongly consider a labor + refrigerant extended warranty plan from your dealer. The standard parts-only warranty leaves you exposed to the most expensive part of any repair call. Get a quote from your dealer at install time — this is much cheaper than buying it later.</p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 6: Pricing */}
            <div id="pricing" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Pricing & Cost Comparison (2026)</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Trane publishes its own pricing guide — one of the few major HVAC brands that does, making it easier to cross-check quotes. These are Trane's own stated ranges for equipment plus standard installation labor. They do not include ductwork replacement, permits ($150–$400), or thermostat upgrades ($120–$350).
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Tier</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Series</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Central AC (installed)</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Heat Pump (installed)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingData.map((p, i) => (
                      <tr key={p.tier} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{p.tier}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{p.series}</td>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-teal-700">{p.centralAC}</td>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-teal-700">{p.heatPump}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 italic mb-6">Source: Trane's published 2026 HVAC Replacement Cost Guide. Includes standard labor. Excludes ductwork, permits, thermostat.</p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">By Tonnage (Equipment + Installation)</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">AC Size</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Equipment Only</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Installed Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tonnagePricing.map((p, i) => (
                      <tr key={p.tons} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-medium text-gray-700">{p.tons}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{p.equipmentOnly}</td>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-teal-700">{p.installed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Trane vs. Competitors (3-Ton Installed)</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Brand</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Entry Installed</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Mid Installed</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Premium Installed</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Tier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitorComparison.map((c, i) => (
                      <tr key={c.brand} className={c.highlight ? 'bg-teal-50 font-medium' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-900">{c.brand} {c.highlight && '★'}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{c.entry}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{c.mid}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{c.premium}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600">{c.tier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
                <p className="text-sm font-semibold text-amber-800 mb-1">2026 price context: tariffs have increased all HVAC prices significantly</p>
                <p className="text-sm text-gray-700">A system that cost $7,000 installed in 2020 could realistically cost $10,000–$14,000 today due to layered tariffs on steel, aluminum, and imported components. Trane implemented a ~5% price increase in April 2026. A Section 232 tariff reduction in June 2026 provided some partial relief. Get quotes in writing with a 30-day price guarantee if possible.</p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 7: Refrigerant */}
            <div id="refrigerant" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. The R-454B Refrigerant Transition — What You Need to Know</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                This is a 2025–2026 development that significantly affects service costs and deserves its own section. The EPA's AIM Act requires all new residential HVAC equipment manufactured after January 1, 2025 to use refrigerants with a Global Warming Potential (GWP) below 700. Trane chose <strong>R-454B</strong> (also marketed as Opteon XL41).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">Why R-454B is better for the planet</p>
                  <p className="text-sm text-gray-700">GWP of 466 vs. R-410A's 2,088 — a 78% reduction in greenhouse gas impact per pound released. This is the right move environmentally.</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">Why R-454B affects your wallet</p>
                  <p className="text-sm text-gray-700">R-454B aftermarket cylinders ran $700–$2,000 per 20-lb cylinder in early 2026 (up from ~$345 for R-410A in 2021). A refrigerant recharge or leak repair now costs significantly more.</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                R-454B is classified as <strong>A2L (mildly flammable)</strong>, which means installation and service requires technicians with specific A2L training and certification. Not every HVAC company has completed this training. Before hiring, ask your installer specifically about their A2L certification — this matters for warranty compliance and safety.
              </p>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
                <p className="text-sm font-semibold text-amber-800 mb-1">Competitor refrigerant note</p>
                <p className="text-sm text-gray-700">Goodman, Amana, and Daikin chose <strong>R-32</strong> instead of R-454B for their transition. R-32 has lower aftermarket costs in 2026 and a more mature supply chain. If long-term service cost is your priority, this is worth factoring into a Trane vs. Goodman comparison.</p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 8: Best For */}
            <div id="best-for" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Who Should Buy Trane — and Who Shouldn't</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border-2 border-teal-400 rounded-lg p-5 bg-teal-50">
                  <h3 className="text-lg font-bold text-teal-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Trane is a strong choice if you...
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Live near the coast or in a humid climate (FL, Gulf Coast, Carolinas, TX coast) — the Spine Fin coil's 2,000-hour salt spray rating is a genuine differentiator</li>
                    <li>• Plan to stay in your home 15+ years — the 18–22 year lifespan recovers the price premium over time</li>
                    <li>• Prioritize reliability above all else — Consumer Reports 5/5 is the top score in the category</li>
                    <li>• Have access to a highly-rated local Trane Comfort Specialist with verified credentials</li>
                    <li>• Want pricing transparency — Trane publishes its own cost guide; Carrier publishes nothing</li>
                    <li>• Are buying American Standard anyway — same hardware, 10–20% lower cost</li>
                  </ul>
                </div>
                <div className="border-2 border-gray-300 rounded-lg p-5 bg-gray-50">
                  <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-gray-500" />
                    Consider other brands if you...
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Are in a mild climate with short cooling seasons — the premium rarely pays back</li>
                    <li>• Plan to sell in 5–7 years — the long-lifespan advantage doesn't materialize</li>
                    <li>• Don't have a strong local Trane dealer — XV-series systems especially require skilled installation</li>
                    <li>• Want a unit replacement warranty — Trane doesn't offer one (Amana/Goodman historically did)</li>
                    <li>• Are budget-constrained — Goodman or Rheem deliver solid reliability at 30–40% lower cost</li>
                    <li>• Are concerned about long-term parts costs — Goodman/Daikin R-32 systems may be cheaper to service</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 9: Trane vs Carrier */}
            <div id="vs-carrier" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Trane vs. Carrier: The Real Comparison</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                These are the two most frequently compared premium AC brands, and pricing is nearly identical on comparable 3-ton systems (within 2%). The differences that actually matter are less about hardware quality and more about four specific factors:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Factor</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Trane</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Carrier</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Predicted reliability (CR)</td>
                      <td className="border border-gray-200 px-4 py-3 text-teal-700 font-semibold">5/5</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">4/5</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Coastal/salt air performance</td>
                      <td className="border border-gray-200 px-4 py-3 text-teal-700 font-semibold">Spine Fin, 2,000-hr salt spray</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">WeatherArmor, 1,000-hr standard</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Parts availability</td>
                      <td className="border border-gray-200 px-4 py-3 text-red-600">Known proprietary issues</td>
                      <td className="border border-gray-200 px-4 py-3 text-teal-700 font-semibold">Better local distribution</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Warranty registration window</td>
                      <td className="border border-gray-200 px-4 py-3 text-red-600">60 days</td>
                      <td className="border border-gray-200 px-4 py-3 text-teal-700 font-semibold">90 days</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Pricing transparency</td>
                      <td className="border border-gray-200 px-4 py-3 text-teal-700 font-semibold">Publishes 2026 price guide</td>
                      <td className="border border-gray-200 px-4 py-3 text-red-600">No MSRP published</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Max SEER2 (central AC)</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">23.6 SEER2 (XV20i)</td>
                      <td className="border border-gray-200 px-4 py-3 text-teal-700 font-semibold">24 SEER2 (Infinity 26)</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Refrigerant chosen</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">R-454B (higher current cost)</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">R-454B (same)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                The practical conclusion: in coastal or humid climates, Trane's Spine Fin advantage is real and worth paying for. In dry inland climates, Carrier's better parts availability and 90-day registration window tip the balance. In both cases, the local dealer and installer quality will matter more than the brand choice — use Trane's Comfort Specialist locator and Carrier's Factory Authorized Dealer program to find vetted installers, then choose whichever brand has the stronger local dealer presence.
              </p>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-teal-800 mb-1">The American Standard option</p>
                <p className="text-sm text-gray-700">If you'd buy a Trane but want to save 10–20%: American Standard is manufactured at the same Trane Technologies facilities with identical hardware. The only difference is the badge. American Standard dealers often have less pricing competition than Trane dealers in some markets. Worth getting a quote from both.</p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 10: FAQ */}
            <div id="faq" className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Frequently Asked Questions</h2>

              <div className="space-y-5">
                {[
                  {
                    q: "Is Trane a good air conditioner brand?",
                    a: "Yes — with caveats. Consumer Reports gives Trane 5/5 for predicted reliability, the top score among major US HVAC brands. The Spine Fin coil is a genuine differentiator in coastal climates. The main trade-offs are premium pricing, proprietary parts that are harder and more expensive to source, and a known TAM evaporator coil leak pattern that isn't covered by the standard warranty."
                  },
                  {
                    q: "How much does a Trane AC cost in 2026?",
                    a: "Trane's published 2026 pricing runs $4,881–$6,546 for entry-tier (Choice/XR series), $6,481–$8,496 for mid-tier (Priority/XL series), and $8,860–$10,414 for the premium XV series — all including standard installation labor. Permits, ductwork, and thermostat upgrades are additional."
                  },
                  {
                    q: "What is Trane's warranty in 2026?",
                    a: "10-year parts warranty when registered within 60 days of installation (drops to 5 years if unregistered). Select XL and XV models include a 12-year compressor warranty when registered. Labor and refrigerant are NOT covered. The warranty is transferable for $99 within 90 days of a home sale."
                  },
                  {
                    q: "Does Trane still qualify for the federal tax credit in 2026?",
                    a: "No. The Section 25C Energy Efficient Home Improvement Credit expired December 31, 2025. No federal tax credit applies to any HVAC installation in 2026 regardless of brand. State and utility rebates may still apply depending on your location — check your state's HEAR program status."
                  },
                  {
                    q: "What is the most common Trane AC problem?",
                    a: "The TAM/Hyperion evaporator coil (air handler) refrigerant leak is the most consistently cited Trane-specific field issue. One experienced technician cited roughly 1-in-15 units affected. The gap: Trane doesn't cover refrigerant or labor under the standard warranty, so a coil leak during the warranty period can still cost the homeowner $1,000–$2,500+ out-of-pocket."
                  },
                  {
                    q: "Is Trane better than Goodman?",
                    a: "For a long-stay homeowner in a hot or coastal climate, yes — Trane's reliability scores and Spine Fin coil justify the 30–40% price premium over a 15–20 year horizon. For a rental property, short-term ownership, mild climate, or tight budget, Goodman (owned by Daikin) delivers solid reliability at significantly lower cost. The right answer depends on your specific situation."
                  },
                  {
                    q: "Who makes Trane air conditioners?",
                    a: "Trane air conditioners are manufactured by Trane Technologies plc (NYSE: TT). Primary US manufacturing is at the Tyler, Texas facility (1.3 million sq ft). American Standard HVAC products are made at the same facilities. Trane mini-splits are Mitsubishi Electric equipment sold through a joint venture called METUS."
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-2">{item.q}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* CTA */}
          <div className="mt-10 p-6 bg-teal-50 rounded-lg border border-teal-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Calculate Trane Savings vs. Your Current System</h3>
            <p className="text-gray-600 mb-4 text-sm">Enter your current SEER rating and a Trane system's SEER2 to see exactly how much you'd save on electricity bills — at your local electricity rate.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Calculate My Savings
            </Link>
          </div>

          {/* Related */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Related</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/brands/carrier" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">Carrier AC Review 2026</p>
              </Link>
              <Link to="/brands" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">All Brand Reviews</p>
              </Link>
              <Link to="/blog/best-air-conditioner-brands-2026" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">Best AC Brands 2026: Full Rankings</p>
              </Link>
            </div>
          </div>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
