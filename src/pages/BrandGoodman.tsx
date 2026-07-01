import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock, CheckCircle2, AlertCircle, Star } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';

const modelLineup = [
  { model: 'GXV6S', tier: 'Mid-High', compressor: 'Variable-Speed Inverter', seer2: 'Up to 17.2', refrigerant: 'R-32', note: 'Side discharge; top of new R-32 lineup' },
  { model: 'GLXT7C', tier: 'Mid-High', compressor: 'Two-Stage', seer2: 'Up to 17.2', refrigerant: 'R-32', note: 'Cube style' },
  { model: 'GLXS5B', tier: 'Mid', compressor: 'Single-Stage (high-eff)', seer2: 'Up to 16.5', refrigerant: 'R-32', note: 'Cube style' },
  { model: 'GLXS4M', tier: 'Mid', compressor: 'Single-Stage', seer2: 'Up to 15.2', refrigerant: 'R-32', note: '' },
  { model: 'GLXS4B', tier: 'Entry', compressor: 'Rotary/Scroll', seer2: 'Up to 15.2', refrigerant: 'R-32', note: '1.5–5 ton' },
  { model: 'GLXS3B', tier: 'Entry', compressor: 'Rotary/Scroll', seer2: 'Up to 15.0', refrigerant: 'R-32', note: 'Base model' },
  { model: 'GSXV9', tier: 'Legacy Premium', compressor: 'Variable-Speed Inverter', seer2: 'Up to 23.5', refrigerant: 'R-410A', note: 'Phasing out — inventory only' },
];

const tonnagePricing = [
  { tons: '2 ton', equipmentOnly: '~$900–$1,400', installed: '$3,200–$5,500' },
  { tons: '2.5 ton', equipmentOnly: '~$1,000–$1,500', installed: '$3,500–$5,800' },
  { tons: '3 ton', equipmentOnly: '~$1,100–$1,700', installed: '$3,800–$6,200' },
  { tons: '4 ton', equipmentOnly: '~$1,300–$2,000', installed: '$4,200–$6,800' },
  { tons: '5 ton', equipmentOnly: '~$1,500–$2,300', installed: '$4,800–$7,500' },
];

const competitorComparison = [
  { brand: 'Goodman', entry: '$3,200–$5,500', mid: '$4,500–$6,500', premium: '$5,000–$8,500', tier: 'Budget', highlight: true },
  { brand: 'Amana', entry: '$3,300–$5,700', mid: '$4,700–$6,700', premium: '$5,200–$8,700', tier: 'Budget+', note: 'Same hardware, better warranty history' },
  { brand: 'Daikin', entry: '$4,800–$7,000', mid: '$5,500–$8,000', premium: '$7,000–$11,000', tier: 'Premium' },
  { brand: 'Rheem', entry: '$3,800–$5,800', mid: '$5,500–$7,500', premium: '$7,500–$10,000', tier: 'Mid' },
  { brand: 'Carrier', entry: '$3,900–$6,500', mid: '$6,500–$10,000', premium: '$10,000–$15,000', tier: 'Premium' },
  { brand: 'Trane', entry: '$4,881–$6,546', mid: '$6,481–$8,496', premium: '$8,860–$10,414', tier: 'Premium' },
];

const refrigerantComparison = [
  { brand: 'Goodman / Daikin / Amana', refrigerant: 'R-32', gwp: '675', cost20lb: '~$449', note: 'Single-component; easier to recycle' },
  { brand: 'Carrier / Trane / Lennox / Rheem', refrigerant: 'R-454B', gwp: '466', cost20lb: '$700–$2,800', note: 'Blend; higher supply chain cost in 2026' },
];

export default function BrandGoodman() {
  return (
    <>
      <Helmet>
        <title>Goodman AC Review 2026: Reliability, Pricing, Warranty & Known Issues | seercalc.pro</title>
        <meta name="description" content="Goodman air conditioner review 2026: Daikin-owned budget leader, $3,200–$8,500 installed, lifetime compressor warranty, R-32 refrigerant advantage. Known issues: capacitor failures, coil leaks, no labor coverage." />
        <meta name="keywords" content="Goodman AC review 2026, is Goodman a good brand, Goodman air conditioner reliability, Goodman warranty 2026, Goodman vs Carrier, Goodman GSXV9 review, best budget AC 2026" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://seercalc.pro/brands/goodman" />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://seercalc.pro/brands/goodman" />
        <meta property="og:title" content="Goodman AC Review 2026: Is the Budget King Still Worth It?" />
        <meta property="og:description" content="Daikin-owned Goodman is the US budget AC leader. Lifetime compressor warranty, R-32 refrigerant advantage, lowest installed costs. Full 2026 review with real pricing and known issues." />
        <meta property="og:image" content="https://seercalc.pro/images/brands/goodman-review-og.png" />
        <meta property="article:author" content="The Efficiency Hub" />
        <meta property="article:section" content="Brand Reviews" />
        <meta property="article:tag" content="Goodman" />
        <meta property="article:tag" content="HVAC" />
        <meta property="article:tag" content="Budget AC" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://seercalc.pro/brands/goodman" />
        <meta name="twitter:title" content="Goodman AC Review 2026: Is the Budget King Still Worth It?" />
        <meta name="twitter:description" content="Lifetime compressor warranty, R-32 refrigerant advantage, lowest installed costs. Full 2026 review with real pricing, known issues, and who Goodman is actually best for." />
        <meta name="twitter:image" content="https://seercalc.pro/images/brands/goodman-review-og.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "Goodman Air Conditioner Review 2026",
            "reviewBody": "Goodman is the US budget AC market leader, owned by Daikin (world's largest HVAC manufacturer). Manufactured at the same 4.2M sq ft Waller, Texas facility as Daikin and Amana. The lifetime compressor warranty on registered units is exceptional for a budget brand. Goodman's choice of R-32 refrigerant gives it a meaningful service cost advantage over Carrier, Trane, and Lennox (R-454B). Known issues: capacitor failures, evaporator coil leaks within 3-4 years on some units, and no labor coverage under warranty. Best for rental properties, budget-constrained buyers, and anyone who wants open wholesale parts access.",
            "author": { "@type": "Organization", "name": "The Efficiency Hub", "url": "https://seercalc.pro" },
            "publisher": { "@type": "Organization", "name": "seercalc.pro", "logo": { "@type": "ImageObject", "url": "https://seercalc.pro/logo.png" } },
            "itemReviewed": {
              "@type": "Product",
              "name": "Goodman Air Conditioners",
              "brand": { "@type": "Brand", "name": "Goodman" },
              "manufacturer": { "@type": "Organization", "name": "Daikin Comfort Technologies North America" }
            },
            "reviewRating": { "@type": "Rating", "ratingValue": "3.8", "bestRating": "5", "worstRating": "1" }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is Goodman a good air conditioner brand?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, with realistic expectations. Goodman is the US budget AC market leader, owned by Daikin (the world's largest HVAC manufacturer) and manufactured at the same Waller, Texas facility as Daikin and Amana. Under Daikin ownership since 2012, quality has improved significantly. Expected lifespan is 15–20 years with proper maintenance. Main trade-offs vs. premium brands: capacitor failures are the most common repair issue, some coil leak complaints within 3–4 years, and the standard warranty covers parts only — no labor. Best for budget-conscious buyers, rental properties, and anyone prioritizing low upfront cost and easy parts access over peak reliability scores."
                }
              },
              {
                "@type": "Question",
                "name": "How much does a Goodman AC cost in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Goodman central air conditioner costs approximately $3,200–$5,500 installed for entry models, $4,500–$6,500 for mid-range, and $5,000–$8,500 for the premium GSXV9 variable-speed (now being phased out). Equipment-only costs run roughly $900–$2,300 depending on tonnage. Goodman is the lowest installed-cost brand among major US HVAC manufacturers — typically 30–40% less than Carrier or Trane for comparable specifications."
                }
              },
              {
                "@type": "Question",
                "name": "What is Goodman's warranty in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Goodman offers a lifetime compressor warranty and 10-year unit replacement warranty on many registered models — exceptional for a budget brand. Registration must be completed within 60 days of installation. Without registration, coverage drops to 5 years. Labor is NOT covered under the standard warranty. The warranty does NOT transfer to subsequent homeowners — it's tied to the original buyer."
                }
              },
              {
                "@type": "Question",
                "name": "What are the most common Goodman AC problems?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The most commonly reported Goodman issues are: (1) capacitor failures — the single most common repair, covered by parts warranty but homeowner pays labor ($200–$400); (2) evaporator coil refrigerant leaks within 3–4 years on some units; (3) refrigerant loss without apparent leak (possible micro-cracks); (4) compressor noise on some units. The key frustration is that the parts warranty covers the component but not the labor to replace it — so even a $15 capacitor can result in a $300+ service call."
                }
              },
              {
                "@type": "Question",
                "name": "Who makes Goodman air conditioners?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Goodman is manufactured by Daikin Comfort Technologies North America (formerly Goodman Global Group), a wholly-owned subsidiary of Daikin Industries, Ltd. — the world's largest HVAC manufacturer by revenue. All Goodman, Amana, and Daikin-branded residential equipment is made at the same facility: the Daikin Texas Technology Park in Waller, Texas — a 4.2 million square foot factory, one of the largest HVAC manufacturing facilities in the world."
                }
              },
              {
                "@type": "Question",
                "name": "Is Goodman better than Carrier or Trane?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For most budget buyers: no on reliability scores, but yes on value. Consumer Reports ranks Carrier (4/5) and Trane (5/5) above Goodman for predicted reliability. But Goodman costs 30–40% less installed, has better parts availability (open wholesale — any contractor can buy), and chose R-32 refrigerant which costs roughly 6x less to service in 2026 than R-454B (used by Carrier and Trane). For a rental property or a homeowner on a tight budget who will maintain the system properly, Goodman is often the rational choice."
                }
              },
              {
                "@type": "Question",
                "name": "Does Goodman's warranty transfer to new homeowners?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Goodman's warranty is tied to the original purchaser and does NOT transfer to subsequent homeowners. This is a meaningful weakness vs. brands like Carrier (transferable) and Lennox (Basic Limited Warranty transfers). If you're planning to sell your home within the warranty period, the Goodman warranty provides no added value to your buyer."
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
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />14 min read</span>
              <span className="text-gray-400">Updated July 2026</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Goodman Air Conditioners: 2026 Review</h1>
            <p className="text-xl text-gray-600">The US budget AC market leader — owned by the world's largest HVAC manufacturer. Real pricing, lifetime compressor warranty details, R-32 refrigerant advantage, and honest known issues</p>
          </header>

          {/* Quick Answer */}
          <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg mb-8">
            <p className="text-sm font-semibold text-teal-800 uppercase tracking-wide mb-2">Quick Answer</p>
            <p className="text-gray-800"><strong>Goodman is the best budget AC brand in the US</strong>, owned by Daikin (world's largest HVAC maker) and built at the same 4.2M sq ft Waller, Texas factory as Daikin and Amana. Installed costs run <strong>$3,200–$8,500</strong>. The lifetime compressor warranty on registered units is exceptional for this price tier. Goodman's R-32 refrigerant costs roughly 6x less to service than R-454B brands in 2026 — a real ongoing advantage. Main trade-offs: parts coverage only (no labor), no warranty transfer to new homeowners, and capacitor failures are the most common repair. <strong>Best for:</strong> rental properties, budget buyers, short-to-medium term ownership, buyers who prioritize easy parts access.</p>
          </div>

          {/* Scorecard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <div className="flex justify-center mb-2">
                {[1,2,3].map(s => <Star key={s} className="w-4 h-4 fill-teal-500 text-teal-500" />)}
                {[4,5].map(s => <Star key={s} className="w-4 h-4 text-gray-300" />)}
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Reliability</p>
              <p className="text-xs text-gray-500 mt-1">Mid-tier; improving under Daikin</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">17.2</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Max SEER2</p>
              <p className="text-xs text-gray-500 mt-1">New R-32 lineup (2025)</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">Lifetime</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Compressor Warranty</p>
              <p className="text-xs text-gray-500 mt-1">On eligible registered models</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">15–20</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Lifespan (yrs)</p>
              <p className="text-xs text-gray-500 mt-1">With proper maintenance</p>
            </div>
          </div>

          {/* TOC */}
          <nav className="bg-gray-50 rounded-lg p-5 mb-10 border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">In this review:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
              <a href="#company" className="text-teal-600 hover:text-teal-700">1. Company background & Daikin ownership</a>
              <a href="#models" className="text-teal-600 hover:text-teal-700">2. Model lineup & R-32 transition</a>
              <a href="#refrigerant" className="text-teal-600 hover:text-teal-700">3. The R-32 advantage — why it matters</a>
              <a href="#reliability" className="text-teal-600 hover:text-teal-700">4. Reliability data</a>
              <a href="#issues" className="text-teal-600 hover:text-teal-700">5. Known issues & complaints</a>
              <a href="#warranty" className="text-teal-600 hover:text-teal-700">6. Warranty terms (2026)</a>
              <a href="#pricing" className="text-teal-600 hover:text-teal-700">7. Pricing & cost comparison</a>
              <a href="#best-for" className="text-teal-600 hover:text-teal-700">8. Who should buy Goodman?</a>
              <a href="#vs-premium" className="text-teal-600 hover:text-teal-700">9. Goodman vs. premium brands</a>
              <a href="#faq" className="text-teal-600 hover:text-teal-700">10. FAQ</a>
            </div>
          </nav>

          <section className="prose prose-lg max-w-none">

            {/* Section 1 */}
            <div id="company" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Company Background & Daikin Ownership</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Goodman Manufacturing was founded in 1975 by Harold V. Goodman in Houston, Texas. In 2012, <strong>Daikin Industries, Ltd.</strong> — the world's largest HVAC manufacturer by revenue (~$31 billion) — acquired Goodman Global Group for $3.7 billion. Today Goodman operates as a wholly-owned subsidiary of <strong>Daikin Comfort Technologies North America (DCT NA)</strong>, headquartered at the Daikin Texas Technology Park in Waller, Texas.
              </p>

              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm font-semibold text-teal-800 mb-1">The single most important fact about Goodman</p>
                <p className="text-sm text-gray-700"><strong>Goodman, Amana, and Daikin residential HVAC are all manufactured at the same facility</strong> — the Daikin Texas Technology Park in Waller, TX. This is a 4.2 million square foot factory, one of the largest HVAC manufacturing buildings in the United States. Same assembly lines, same engineering team, same parent company. The Goodman badge gets you budget pricing; the Daikin badge gets you premium pricing. The hardware is fundamentally the same.</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                DCT NA operates three residential brands in North America with a clear tier structure:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-1 text-gray-700 text-sm">
                <li><strong>Goodman</strong> — value/budget tier; lowest price, open wholesale distribution</li>
                <li><strong>Amana</strong> — mid tier; historically stronger warranty positioning (changed April 2025 — see our <Link to="/brands" className="text-teal-600 hover:text-teal-700 font-medium">Amana review</Link>)</li>
                <li><strong>Daikin (North America)</strong> — premium tier; higher price, tighter dealer network, best warranty</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                North American revenue for Daikin's NA operations more than doubled since the 2012 Goodman acquisition — making it Daikin's largest single entity globally. The Waller facility employs approximately 22,000+ across US group companies, with Goodman representing the largest volume brand.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 2 */}
            <div id="models" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Model Lineup & the 2025 R-32 Transition</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Goodman underwent a significant product lineup overhaul in 2024–2025, transitioning all new residential equipment from R-410A to <strong>R-32</strong> refrigerant. This is distinct from the choice made by Carrier, Trane, Lennox, and Rheem — who chose R-454B instead. The refrigerant choice has meaningful implications for service costs (covered in Section 3).
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Model</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Tier</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Compressor</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Max SEER2</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Refrigerant</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelLineup.map((m, i) => (
                      <tr key={m.model} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-900">{m.model}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{m.tier}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700 text-xs">{m.compressor}</td>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-teal-700">{m.seer2}</td>
                        <td className={`border border-gray-200 px-4 py-3 font-medium text-xs ${m.refrigerant === 'R-32' ? 'text-green-700' : 'text-amber-700'}`}>{m.refrigerant}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600 text-xs">{m.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm font-semibold text-amber-800 mb-1">GSXV9 update: legacy R-410A flagship being phased out</p>
                <p className="text-sm text-gray-700">The GSXV9 (up to 23.5 SEER2, R-410A) was Goodman's premium flagship and is still available through distributors as existing inventory is cleared. However, it uses R-410A — which cannot be manufactured new after January 1, 2025. As inventory depletes, this model disappears. The new R-32 lineup tops at 17.2 SEER2 during this transition period. If peak efficiency is your priority, verify GSXV9 availability before spec-ing it, and understand the refrigerant situation.</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>SEER2 verification note:</strong> As always, the SEER2 rating on any Goodman system depends on the specific outdoor unit + indoor coil combination. Verify using the AHRI Reference Number at <a href="https://www.ahridirectory.org" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">ahridirectory.org</a> for the exact matched-system rating.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 3: R-32 */}
            <div id="refrigerant" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. The R-32 Advantage — Goodman's Most Underrated Differentiator</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                This is the story most buyers don't know yet, and it's genuinely significant. When the EPA's AIM Act required all new HVAC equipment manufactured after January 1, 2025 to use low-GWP refrigerants, the industry split into two camps:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Camp</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Refrigerant</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">GWP</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Cost / 20 lbs (May 2025)</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {refrigerantComparison.map((r, i) => (
                      <tr key={r.brand} className={i === 0 ? 'bg-green-50' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700 text-xs">{r.brand}</td>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-900">{r.refrigerant}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{r.gwp}</td>
                        <td className={`border border-gray-200 px-4 py-3 font-semibold ${i === 0 ? 'text-green-700' : 'text-red-700'}`}>{r.cost20lb}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600 text-xs">{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                That pricing isn't a rounding error. In May 2025, Goodman's own published marketing infographic showed R-32 at <strong>$449 per 20-lb cylinder</strong> vs. R-454B at <strong>$2,799 per 20-lb cylinder</strong> — sourced from eRefrigerants.com. That's a roughly 6x cost difference for the refrigerant itself. Given that any refrigerant recharge, coil leak, or service involving refrigerant recovery and recharge is a significant portion of repair cost, this matters over the 15–20 year life of the system.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Both refrigerants are A2L classified (mildly flammable), so both require trained technicians for installation and service. R-32 is a single-component refrigerant — easier to recycle and reclaim than R-454B, which is a blend of R-32 and R-1234yf. Daikin VP of Product Innovation explicitly cited global R-32 manufacturing expertise and lower long-term cost as the reason for the R-32 choice over R-454B.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                For homeowners in high-rate electricity markets who are already sensitive to operating costs, the refrigerant service cost advantage of a Goodman/Daikin R-32 system over a Carrier/Trane R-454B system could easily add up to $500–$1,500 over the ownership period if any refrigerant-related service is needed.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 4 */}
            <div id="reliability" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Reliability Data</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Consumer Reports does not consistently publish standalone Goodman reliability scores the way it does for Trane, Carrier, and Lennox — Goodman's volume and distribution model makes survey sampling more complex. What we do have is consistent contractor and field data.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600 mb-1">15–20</p>
                  <p className="text-sm font-semibold text-gray-700">Years lifespan</p>
                  <p className="text-xs text-gray-500 mt-1">With proper maintenance (Modernize, contractor consensus)</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600 mb-1">~8%</p>
                  <p className="text-sm font-semibold text-gray-700">US Market Share</p>
                  <p className="text-xs text-gray-500 mt-1">Largest value-tier brand in the US</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600 mb-1">Open</p>
                  <p className="text-sm font-semibold text-gray-700">Wholesale Access</p>
                  <p className="text-xs text-gray-500 mt-1">Any licensed contractor can buy and service</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                The contractor consensus on Goodman is nuanced and worth understanding clearly. <strong>Budget-focused and general contractors broadly respect Goodman</strong> — citing non-proprietary parts, wide distribution (900+ distribution points nationally), and straightforward serviceability. "Goodman is a great work-horse unit" is a phrase that appears repeatedly in contractor discussions. The criticism tends to come from premium-focused contractors who compete against Goodman's open-channel pricing.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                From Reddit's r/hvacadvice: <em>"They're ok if you take good care of them. Get on a PM schedule and if the install goes good they usually last the normal 15–20 years."</em> This is the practical contractor reality: Goodman systems are installation-quality-dependent (like all brands), perform adequately when properly maintained, and don't carry the prestige of Trane or Carrier but also don't cost nearly as much.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Parts availability</strong> is Goodman's clearest service advantage over every premium brand. Parts are available through open wholesale channels — Johnstone Supply, Winsupply, Ferguson, Grainger, and online. No proprietary ecosystem, no OEM-only requirement, no $7,000 circuit board replacements. Any licensed HVAC contractor in the country can service a Goodman system with parts sourced locally, typically same-day or next-day.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 5 */}
            <div id="issues" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Known Issues & Complaints</h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                Consumer review sites show low average ratings for Goodman (PissedConsumer: 1.7/5 from 193 reviews). This is nearly universal for HVAC brands on complaint-focused platforms — unhappy customers post; satisfied customers don't. Field contractor reality is more balanced. These are the legitimate patterns worth knowing.
              </p>

              <div className="space-y-4 mb-6">
                <div className="border border-amber-200 rounded-lg p-5 bg-amber-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Capacitor Failures — Most Common Repair</p>
                      <p className="text-sm text-gray-700">Capacitor failure is the single most consistently reported Goodman repair across contractor forums and consumer review sites. The good news: capacitors are covered under the parts warranty, and the part itself costs around $15–$25. The bad news: the labor to replace it runs $200–$400 for a 45-minute service call — and labor is NOT covered. Consumer complaint pattern: <em>"$15 capacitor replaced for $348 in labor."</em> This is a genuine frustration, not a product defect — but it's the most common real-world warranty friction point.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-amber-200 rounded-lg p-5 bg-amber-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Evaporator Coil Leaks — Within 3–4 Years on Some Units</p>
                      <p className="text-sm text-gray-700">Multiple consumer reports document evaporator coil refrigerant leaks occurring within the first 3–4 years. One PissedConsumer review: <em>"In 3.5 years I have had 3 coils leaking."</em> This is not a universal problem — most Goodman owners don't experience it — but it's a recurring enough pattern to flag. With R-32 now being the standard refrigerant, verify with your installer what the coil warranty process looks like for your specific model and who pays for refrigerant if a leak occurs.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Refrigerant Loss Without Apparent Leak</p>
                      <p className="text-sm text-gray-700">Some reports describe refrigerant loss in years 1–4 without a clearly identifiable leak location. Possible causes: micro-cracks in coil material, improper initial charge by the installer, or Schrader valve issues. This makes diagnosis difficult and can result in multiple service calls. Ask your installer about their charging procedure and whether they pressure-test the system before commissioning.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Compressor Noise on Some Units</p>
                      <p className="text-sm text-gray-700">Several Reddit reports describe a Goodman compressor that runs noticeably louder than the buyer's previous unit. This isn't a malfunction — Goodman's budget positioning means less acoustic engineering than premium brands — but it's worth knowing if noise level matters to you. Premium brands like Carrier Infinity (55 dBA) or Lennox Signature (56 dBA) are meaningfully quieter.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">CPSC Recalls (2024) — Packaged Units Only</p>
                      <p className="text-sm text-gray-700">In June 2024, approximately 12,100 Goodman (and Amana, Daikin) branded packaged air conditioning and heat pump units were recalled due to incorrect electrical ratings on the serial plate — a fire hazard from incorrect wiring. A separate June 2024 recall covered ~56,028 Goodman SD heat pumps for a software issue causing unexpected heating during cooling mode. Both of these were packaged units or specific heat pump models — not standard split-system central AC. If you have a Goodman product from 2022–2024, verify at <strong>goodmanmfg.com/product-recalls</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>The honest framing:</strong> Goodman's issues are real but not catastrophic. Capacitor failures are annoying and create labor cost exposure. Coil leaks affect a minority of units. The parts warranty works — the frustration is the labor gap. None of these issues approach the severity of Carrier Infinity board failures ($7,000+) or Trane's proprietary parts scarcity. Goodman's problems are cheaper to fix. That's not a coincidence — simple designs with open-access parts are easier and cheaper to service when something does go wrong.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 6 */}
            <div id="warranty" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Warranty Terms (2026)</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Goodman's warranty is genuinely one of its strongest selling points — especially the lifetime compressor coverage, which is exceptional for a budget brand.
              </p>

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
                    {[
                      { label: 'Parts (all)', registered: '10 years', unregistered: '5 years' },
                      { label: 'Compressor (select models)', registered: 'Lifetime — unit replacement', unregistered: 'Limited' },
                      { label: 'Unit replacement (select models)', registered: '10 years', unregistered: 'Not available' },
                      { label: 'Heat exchanger (furnaces, select)', registered: '20 years', unregistered: 'Limited' },
                      { label: 'Labor', registered: 'NOT included', unregistered: 'NOT included' },
                      { label: 'Refrigerant', registered: 'NOT included', unregistered: 'NOT included' },
                    ].map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.label}</td>
                        <td className={`border border-gray-200 px-4 py-3 font-semibold ${row.registered.includes('NOT') ? 'text-red-600' : 'text-teal-700'}`}>{row.registered}</td>
                        <td className={`border border-gray-200 px-4 py-3 ${row.unregistered.includes('Not') || row.unregistered === 'Limited' ? 'text-red-600' : 'text-gray-700'}`}>{row.unregistered}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">The Lifetime Compressor Warranty — What It Actually Means</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                On many Goodman models (including entry-level units), if the original homeowner experiences a compressor failure, Goodman will <strong>replace the entire outdoor unit</strong> — not just the compressor. This is unique in the budget HVAC segment. Most competitors at this price point only offer 10-year compressor coverage.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-red-800 mb-1">⚠️ Register within 60 days</p>
                  <p className="text-sm text-gray-700">The 60-day clock starts when the unit is first turned on. Miss it and coverage drops to 5-year limited. Register online at <strong>goodmanmfg.com/product-registration</strong>. Don't trust your contractor to do it — register yourself.</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-amber-800 mb-1">⚠️ No warranty transfer</p>
                  <p className="text-sm text-gray-700">Goodman's warranty does NOT transfer to subsequent homeowners. It's tied to the original buyer. If you plan to sell within the warranty period, this coverage provides no value to your buyer — a meaningful resale weakness vs. Carrier or Lennox.</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Online purchase warranty trap:</strong> If you buy a Goodman unit online from a seller who is NOT the installing contractor, the warranty is voided. The open distribution model is a buying advantage for contractors, not a direct-to-consumer shortcut. The installing contractor must be the source of record for warranty claims.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 7 */}
            <div id="pricing" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Pricing & Cost Comparison (2026)</h2>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm font-semibold text-amber-800 mb-1">Important context: Goodman prices have risen 30–40% since 2020</p>
                <p className="text-sm text-gray-700">Cumulative price increases since 2020 — including a 7% equipment increase and 11% parts increase effective March 2, 2026 — mean the price gap between Goodman and mid-tier brands like Rheem or Carrier has narrowed significantly. Mid-tier Carrier or Lennox may now be only 10–20% more than a comparable Goodman, down from 30–40% historically. Still cheaper, but the value equation is tighter than it used to be.</p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">By Tonnage</h3>
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

              <h3 className="text-xl font-bold text-gray-900 mb-3">Goodman vs. Competitors (3-Ton Installed)</h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Brand</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Entry</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Mid</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Premium</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Tier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitorComparison.map((c, i) => (
                      <tr key={c.brand} className={c.highlight ? 'bg-teal-50 font-medium' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-900">{c.brand}{c.highlight ? ' ★' : ''}{c.note ? <span className="text-xs font-normal text-gray-500 ml-1">({c.note})</span> : ''}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{c.entry}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{c.mid}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{c.premium}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600">{c.tier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Where to buy:</strong> Goodman is available through 900+ distribution points nationwide — company-operated and independent wholesale distributors. Unlike Lennox or Trane, Goodman is also sold online (Walmart, Amazon, Direct Comfort, HVAC Supply USA) as equipment-only. Important caveat: buying online from a seller who is not your installing contractor voids the warranty. Use the online pricing as a reference point when evaluating contractor quotes, not as a buying channel.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 8 */}
            <div id="best-for" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Who Should Buy Goodman — and Who Shouldn't</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border-2 border-teal-400 rounded-lg p-5 bg-teal-50">
                  <h3 className="text-lg font-bold text-teal-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />Goodman is the right choice if you...
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Are budget-constrained — Goodman delivers real, functional cooling at the lowest installed cost of any major brand</li>
                    <li>• Own a rental or investment property — low upfront cost, easy parts access for any contractor, adequate lifespan for cash-on-cash return purposes</li>
                    <li>• Plan to sell in 5–7 years — the premium reliability advantage of Trane or Carrier doesn't fully materialize in a short ownership horizon</li>
                    <li>• Live in a mild climate with shorter cooling seasons — a SEER2 15–17 system is entirely adequate when you're only running AC 3–4 months a year</li>
                    <li>• Value parts availability and serviceability — literally any licensed HVAC contractor can buy parts and service Goodman equipment</li>
                    <li>• Want to leverage the R-32 refrigerant cost advantage over the life of the system</li>
                    <li>• Appreciate the lifetime compressor warranty — it's genuinely exceptional at this price point</li>
                  </ul>
                </div>
                <div className="border-2 border-gray-300 rounded-lg p-5 bg-gray-50">
                  <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-gray-500" />Consider other brands if you...
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Want peak efficiency — new R-32 lineup tops at 17.2 SEER2; Lennox reaches 26 SEER2, Daikin reaches 24.5 SEER2, Trane reaches 23.6 SEER2</li>
                    <li>• Live in a coastal or high-humidity climate where coil quality is critical — premium brands' coil specs are more robust</li>
                    <li>• Want the warranty to transfer if you sell your home — Goodman's warranty is non-transferable; Carrier and Lennox both offer transferable coverage</li>
                    <li>• Need cold-climate heat pump performance — Goodman mini-splits are rated to 5°F minimum; Mitsubishi Hyper-Heat operates to -13°F</li>
                    <li>• Prioritize quiet operation — budget compressor design means Goodman is noisier than Carrier Infinity or Lennox Signature</li>
                    <li>• Want a communicating/smart home ecosystem — ComfortBridge™ is basic compared to Lennox iComfort or Carrier Infinity controls</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 9 */}
            <div id="vs-premium" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Goodman vs. Premium Brands — The Honest Comparison</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                The most common question: is Goodman <em>good enough</em>, or should I spend more for Carrier/Trane? The answer is genuinely situational, and anyone who gives you a one-size-fits-all answer is oversimplifying.
              </p>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-5 mb-6">
                <p className="text-sm font-semibold text-teal-800 mb-2">The 80/20 rule applies here more than anywhere</p>
                <p className="text-sm text-gray-700">Roughly 80% of a system's lifespan depends on installation quality — proper sizing (Manual J calculation), correct refrigerant charge, clean line set installation, verified airflow. A Goodman installed properly by an experienced contractor will dramatically outperform a Trane installed carelessly. Before spending $3,000 more on a brand upgrade, spend that energy verifying your installer's quality. Ask for references. Ask if they do Manual J calculations. Ask how they verify refrigerant charge. Those answers matter more than the badge on the unit.</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>The cases where premium genuinely wins:</strong> Coastal climates (Trane's Spine Fin coil is materially better). Very hot climates with high electricity rates where peak SEER2 efficiency makes a real dollar difference (Lennox, Daikin). Long-stay homeowners (15+ years) where the reliability premium has time to compound. Cold-climate heat pumps (Mitsubishi Hyper-Heat has no real budget equivalent).
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>The cases where Goodman wins on the math:</strong> Rental properties. Short-to-medium ownership (under 10 years). Mild climates. Tight budgets. Buyers who will commit to annual maintenance. Anyone who wants open parts access and simple serviceability.
              </p>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-teal-800 mb-1">Use the calculator to run the actual numbers</p>
                <p className="text-sm text-gray-700">The efficiency difference between a Goodman 15 SEER2 and a Carrier 18 SEER2 is roughly $150–$200 per year at average US electricity rates. At a $2,000 price premium for the Carrier, the payback period is 10–13 years. At high electricity rates (25¢+/kWh), that drops to 6–8 years. At average rates in a mild climate, Goodman wins on the math almost every time for owners who plan to sell before year 10.</p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 10: FAQ */}
            <div id="faq" className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Frequently Asked Questions</h2>
              <div className="space-y-5">
                {[
                  { q: "Is Goodman a good air conditioner brand?", a: "Yes, for the right buyer. Goodman is the US budget AC market leader, owned by Daikin (world's largest HVAC maker), built at the same Waller, Texas factory as Daikin and Amana. Expected lifespan is 15–20 years with proper maintenance. It's not at Trane or Carrier's reliability level, but it costs 30–40% less. The lifetime compressor warranty on registered models is genuinely strong for the price tier." },
                  { q: "How much does a Goodman AC cost in 2026?", a: "Approximately $3,200–$5,500 installed for entry models, $4,500–$6,500 for mid-range, and $5,000–$8,500 for the premium GSXV9. Equipment-only runs roughly $900–$2,300 depending on tonnage. Goodman is consistently the lowest installed-cost option among major US HVAC brands — 30–40% less than Carrier or Trane for comparable specifications, though that gap has narrowed since 2020 due to cumulative price increases." },
                  { q: "Who makes Goodman air conditioners?", a: "Daikin Comfort Technologies North America (DCT NA), a wholly-owned subsidiary of Daikin Industries, Ltd. — the world's largest HVAC manufacturer. All Goodman, Amana, and Daikin-branded residential equipment is manufactured at the Daikin Texas Technology Park in Waller, Texas — a 4.2 million square foot facility." },
                  { q: "Does Goodman's lifetime warranty actually cover the full compressor cost?", a: "Yes — on eligible registered models, Goodman will replace the entire outdoor unit if the compressor fails due to a manufacturer defect. This is actually unit replacement coverage, not just compressor repair. Conditions: must be registered within 60 days of installation, must be the original homeowner (no transfer), and must have been maintained annually. Labor and refrigerant for the swap are not covered by Goodman — you pay those out of pocket." },
                  { q: "Is Goodman better than Carrier for a rental property?", a: "For most rental scenarios, yes. Goodman's lower upfront cost improves cash-on-cash return. Any contractor can service it (no brand-specific dealer requirement). Parts are cheap and widely available. The warranty non-transferability doesn't matter if you're keeping the property. The lack of labor warranty is the main financial risk — budget for a potential $300–$500 capacitor call within the first few years." },
                  { q: "What is Goodman's R-32 refrigerant advantage?", a: "Goodman and its parent Daikin chose R-32 for their new 2025+ equipment, while Carrier, Trane, Lennox, and Rheem chose R-454B. In May 2025, R-32 cost approximately $449 per 20-lb cylinder vs. R-454B at $2,799 — a roughly 6x difference. Any service involving refrigerant recovery, recharge, or coil repair costs significantly less on an R-32 system. Over a 15-year ownership, this advantage could represent $500–$1,500 in cumulative service savings if any refrigerant work is needed." },
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">See If a Goodman Upgrade Pencils Out For You</h3>
            <p className="text-gray-600 mb-4 text-sm">Enter your current SEER and a Goodman system's SEER2 to calculate annual savings at your local electricity rate — and how long before it pays back.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
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
              <Link to="/brands/trane" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">Trane AC Review 2026</p>
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
