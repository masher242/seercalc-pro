import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock, CheckCircle2, AlertCircle, Star } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';

const modelLineup = [
  { model: 'Platinum 20 (4A7C6)', series: 'Platinum', tier: 'Premium', compressor: 'Variable-Speed (AccuComfort™)', seer2: 'Up to 24.0', refrigerant: 'R-454B', note: 'Flagship; ENERGY STAR Most Efficient' },
  { model: 'Platinum 18 (4A7C5)', series: 'Platinum', tier: 'Premium', compressor: 'Variable-Speed (AccuComfort™)', seer2: 'Up to 18.1', refrigerant: 'R-454B', note: 'AccuLink™ communicating' },
  { model: 'Gold 17 (4A7A6)', series: 'Gold', tier: 'Mid', compressor: 'Two-Stage', seer2: 'Up to 18.0', refrigerant: 'R-454B', note: 'ENERGY STAR certified' },
  { model: 'Silver 15 (4A7A5)', series: 'Silver', tier: 'Entry', compressor: 'Single-Stage', seer2: 'Up to 16.0', refrigerant: 'R-454B', note: 'Spine Fin™ coil; Duration™ compressor' },
  { model: 'Silver 14 (4A7A4)', series: 'Silver', tier: 'Entry', compressor: 'Single-Stage', seer2: 'Up to 15.0–16.0', refrigerant: 'R-454B', note: 'ENERGY STAR eligible' },
  { model: 'Silver 13 (4A7A3)', series: 'Silver', tier: 'Base', compressor: 'Single-Stage', seer2: '~13.4–14.0', refrigerant: 'R-454B', note: 'Minimum efficiency baseline' },
];

const traneComparison = [
  { factor: 'Parent company', amStd: 'Trane Technologies plc', trane: 'Trane Technologies plc' },
  { factor: 'Manufacturing', amStd: 'Tyler, TX + Clarksville, TN', trane: 'Tyler, TX + Clarksville, TN' },
  { factor: 'Core components', amStd: 'Spine Fin™ coil, Climatuff™ compressor', trane: 'Spine Fin™ coil, Climatuff™ compressor' },
  { factor: 'Flagship SEER2', amStd: '24.0 (Platinum 20)', trane: '23.6 (XV20i)' },
  { factor: 'Typical price vs. Trane', amStd: '5–15% less', trane: 'Baseline' },
  { factor: 'Dealer network', amStd: 'Authorized Dealers + Customer Care Dealers', trane: 'Trane Comfort Specialists (TCS)' },
  { factor: 'Warranty (registered)', amStd: '10-yr parts / ~2-yr labor (per myhomescore)', trane: '10-yr parts / no labor' },
  { factor: 'Registration window', amStd: '60 days', trane: '60 days' },
  { factor: 'Transferability', amStd: 'Yes ($59–$99)', trane: 'Yes ($99)' },
  { factor: 'Smart home platform', amStd: 'AccuLink™', trane: 'ComfortLink™ II' },
  { factor: 'Mini-splits', amStd: 'Mitsubishi (via METUS)', trane: 'Mitsubishi (via METUS)' },
];

const tonnagePricing = [
  { tons: '1.5 ton', equipmentOnly: '$1,500–$3,000', installed: '$3,500–$6,500' },
  { tons: '2 ton', equipmentOnly: '$1,600–$3,200', installed: '$3,600–$6,700' },
  { tons: '2.5 ton', equipmentOnly: '$1,900–$3,400', installed: '$3,800–$6,900' },
  { tons: '3 ton', equipmentOnly: '$2,000–$3,600', installed: '$4,000–$7,100' },
  { tons: '4 ton', equipmentOnly: '$2,400–$4,000', installed: '$5,000–$7,500' },
  { tons: '5 ton', equipmentOnly: '$3,400–$4,500', installed: '$5,500–$8,000+' },
];

export default function BrandAmericanStandard() {
  return (
    <>
      <Helmet>
        <title>American Standard AC Review 2026: Trane Quality at Lower Cost? | seercalc.pro</title>
        <meta name="description" content="American Standard AC review 2026: same factory as Trane, same Spine Fin coil, same Climatuff compressor — at 5–15% lower cost. $3,500–$8,000+ installed. Known coil leak and control board issues. Full honest review." />
        <meta name="keywords" content="American Standard AC review 2026, American Standard vs Trane, American Standard Platinum 20, American Standard reliability, American Standard warranty 2026, is American Standard a good brand" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://seercalc.pro/brands/american-standard" />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://seercalc.pro/brands/american-standard" />
        <meta property="og:title" content="American Standard AC Review 2026: Trane Quality at Lower Cost?" />
        <meta property="og:description" content="Same factory as Trane, same Spine Fin coil, same Climatuff compressor — at 5–15% lower price. Full 2026 review with real pricing, known issues, and who should choose American Standard over Trane." />
        <meta property="og:image" content="https://seercalc.pro/images/brands/american-standard-review-og.png" />
        <meta property="article:author" content="The Efficiency Hub" />
        <meta property="article:section" content="Brand Reviews" />
        <meta property="article:tag" content="American Standard" />
        <meta property="article:tag" content="HVAC" />
        <meta property="article:tag" content="Air Conditioner Review" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://seercalc.pro/brands/american-standard" />
        <meta name="twitter:title" content="American Standard AC Review 2026: Is It the Same as Trane?" />
        <meta name="twitter:description" content="Same factory, same components, 5–15% lower price. Full review with pricing, known issues, and whether to choose American Standard over Trane." />
        <meta name="twitter:image" content="https://seercalc.pro/images/brands/american-standard-review-og.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "American Standard Air Conditioner Review 2026",
            "reviewBody": "American Standard HVAC is manufactured by Trane Technologies at the same Tyler, Texas and Clarksville, Tennessee factories as Trane, using identical Spine Fin all-aluminum coils and Climatuff compressors. The primary buyer advantage is 5–15% lower installed cost vs. Trane for functionally identical hardware. Known issues include aluminum coil leaks (contractor reports of high failure rates), control board failures on new installs, and warranty parts dimension errors on replacements. The Platinum 20 reaches 24.0 SEER2 — actually exceeding Trane's XV20i flagship at 23.6 SEER2. Best for buyers who want Trane-grade hardware without the Trane price premium, in markets where American Standard dealers have strong local presence.",
            "author": { "@type": "Organization", "name": "The Efficiency Hub", "url": "https://seercalc.pro" },
            "publisher": { "@type": "Organization", "name": "seercalc.pro", "logo": { "@type": "ImageObject", "url": "https://seercalc.pro/logo.png" } },
            "itemReviewed": {
              "@type": "Product",
              "name": "American Standard Air Conditioners",
              "brand": { "@type": "Brand", "name": "American Standard" },
              "manufacturer": { "@type": "Organization", "name": "Trane Technologies plc" }
            },
            "reviewRating": { "@type": "Rating", "ratingValue": "4.3", "bestRating": "5", "worstRating": "1" }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is American Standard the same as Trane?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Essentially yes. American Standard HVAC and Trane are both owned by Trane Technologies plc and manufactured at the same facilities in Tyler, Texas and Clarksville, Tennessee, using identical core components — the same Spine Fin all-aluminum coils, the same Climatuff compressors, and the same engineering. The Platinum 20 (American Standard's flagship) actually reaches 24.0 SEER2, slightly exceeding Trane's XV20i at 23.6 SEER2. The primary differences are the brand badge, separate dealer networks, and price — American Standard typically runs 5–15% less than comparable Trane models."
                }
              },
              {
                "@type": "Question",
                "name": "How much does an American Standard AC cost in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "American Standard central AC costs $3,500–$6,500 installed for Silver series (entry), $5,500–$8,000 for Gold series (mid), and $6,000–$12,000 for Platinum series (premium). By tonnage, a 3-ton system runs approximately $4,000–$7,100 installed. American Standard is typically 5–15% less expensive than comparable Trane models for the same tier, which can translate to $500–$2,000 in savings on a full system install."
                }
              },
              {
                "@type": "Question",
                "name": "What is American Standard's warranty in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "American Standard offers a 10-year parts warranty when registered within 60 days of installation, dropping to 5 years without registration. Some sources indicate approximately 2 years of labor coverage is included for registered units — verify at americanstandardair.com as this may vary by dealer and model. The warranty transfers to subsequent homeowners for a $59–$99 fee within 90 days of home sale. Refrigerant is NOT covered."
                }
              },
              {
                "@type": "Question",
                "name": "Should I buy American Standard or Trane?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If your local American Standard dealer is as strong as your local Trane Comfort Specialist, American Standard is almost always the smarter financial choice — same hardware at 5–15% lower cost. The only cases where Trane specifically makes sense over American Standard: if your area has a clearly superior Trane Comfort Specialist, if resale value in your specific market specifically benefits from the Trane name, or if you want Trane's published pricing guide (American Standard doesn't publish one). The hardware is functionally identical."
                }
              },
              {
                "@type": "Question",
                "name": "What are the most common American Standard AC problems?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The most consistently reported American Standard issues are: (1) aluminum coil leaks — one contractor cited a very high failure rate on aluminum coils, a shared issue with Trane; (2) control board failures on new installs, including temperature sensor misreads; (3) warranty replacement parts with incorrect dimensions — documented case of a condenser coil sent 4 inches too tall; (4) R-454B refrigerant cost exposure on coil leaks (refrigerant not covered under warranty). These issues are shared with Trane since the hardware is identical."
                }
              },
              {
                "@type": "Question",
                "name": "Does American Standard have a CPSC recall in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes — an active safety recall. On July 3, 2025, approximately 4,790 American Standard and Trane gas/electric packaged units were recalled due to a fuel gas valve that can open unexpectedly, creating a gas leak and fire hazard. Affected models: 4YCZ5024F1060A, 4YCZ5036F1070A, 4YCZ5036F1090A, 4YCZ5048E1090A, 4YCZ5048E1115A. This affects packaged units (combined heating and cooling in one outdoor cabinet) — NOT standard split-system central AC. If you have one of these models, stop using heating mode and call 800-889-0129 for a free inspection and repair."
                }
              },
              {
                "@type": "Question",
                "name": "What is the most efficient American Standard AC in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Platinum 20 (AccuComfort variable-speed) reaches up to 24.0 SEER2 — actually slightly higher than Trane's flagship XV20i at 23.6 SEER2, from the same factory. It carries ENERGY STAR Most Efficient certification and uses R-454B refrigerant. Equipment-only cost runs approximately $4,000–$5,400; installed total is $6,000–$12,000 depending on region and labor."
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
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />13 min read</span>
              <span className="text-gray-400">Updated July 2026</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">American Standard Air Conditioners: 2026 Review</h1>
            <p className="text-xl text-gray-600">Same factory as Trane, same Spine Fin coil, same Climatuff compressor — at 5–15% lower cost. Full review with real pricing, known issues, and when to choose American Standard over Trane</p>
          </header>

          {/* Quick Answer */}
          <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg mb-8">
            <p className="text-sm font-semibold text-teal-800 uppercase tracking-wide mb-2">Quick Answer</p>
            <p className="text-gray-800"><strong>American Standard is functionally the same as Trane</strong> — same parent company (Trane Technologies), same Tyler, TX factory, same Spine Fin coils, same Climatuff compressors. The Platinum 20 flagship actually reaches <strong>24.0 SEER2</strong>, slightly higher than Trane's XV20i at 23.6. Installed costs run <strong>$3,500–$12,000+</strong> depending on series — typically <strong>5–15% less than Trane</strong> for comparable models. Known issues (shared with Trane): aluminum coil leaks, control board failures on new installs, and an active CPSC safety recall on packaged units. <strong>Best for:</strong> buyers who want Trane-grade hardware without the Trane price premium, where local American Standard dealer quality is strong.</p>
          </div>

          {/* Scorecard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <div className="flex justify-center mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-teal-500 text-teal-500" />)}
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Reliability</p>
              <p className="text-xs text-gray-500 mt-1">Trane-equivalent (same hardware)</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">24.0</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Max SEER2</p>
              <p className="text-xs text-gray-500 mt-1">Platinum 20 — beats Trane XV20i</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">5–15%</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Less than Trane</p>
              <p className="text-xs text-gray-500 mt-1">Same hardware, lower badge premium</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">60 days</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Registration</p>
              <p className="text-xs text-gray-500 mt-1">Same as Trane</p>
            </div>
          </div>

          {/* TOC */}
          <nav className="bg-gray-50 rounded-lg p-5 mb-10 border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">In this review:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
              <a href="#company" className="text-teal-600 hover:text-teal-700">1. Company background & Trane relationship</a>
              <a href="#models" className="text-teal-600 hover:text-teal-700">2. Model lineup & SEER2 ratings</a>
              <a href="#reliability" className="text-teal-600 hover:text-teal-700">3. Reliability data</a>
              <a href="#issues" className="text-teal-600 hover:text-teal-700">4. Known issues & CPSC recall</a>
              <a href="#warranty" className="text-teal-600 hover:text-teal-700">5. Warranty terms (2026)</a>
              <a href="#pricing" className="text-teal-600 hover:text-teal-700">6. Pricing & cost comparison</a>
              <a href="#vs-trane" className="text-teal-600 hover:text-teal-700">7. American Standard vs. Trane — full comparison</a>
              <a href="#best-for" className="text-teal-600 hover:text-teal-700">8. Who should buy American Standard?</a>
              <a href="#faq" className="text-teal-600 hover:text-teal-700">9. FAQ</a>
            </div>
          </nav>

          <section className="prose prose-lg max-w-none">

            {/* Section 1 */}
            <div id="company" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Company Background & The Trane Relationship</h2>

              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm font-semibold text-teal-800 mb-1">The most important fact about American Standard HVAC</p>
                <p className="text-sm text-gray-700"><strong>American Standard HVAC is Trane with a different badge.</strong> Both brands are owned by Trane Technologies plc (NYSE: TT), manufactured at the same facilities in Tyler, Texas and Clarksville, Tennessee, using the same Spine Fin all-aluminum coils, the same Climatuff compressors, and the same engineering. Multiple HVAC professionals confirm: <em>"Trane and American Standard HVAC units are the same — manufactured in the same factories, often running down the same assembly lines, using the same core technology and components."</em> The primary buyer advantages of American Standard are: lower price (5–15% less than comparable Trane) and a separate dealer network that may have stronger local presence in some markets.</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                The history explains the branding: American Standard Companies (founded 1875) acquired The Trane Company in 1983 for ~$512 million. In 2007, American Standard Companies restructured — spinning off divisions and renaming itself "Trane." Ingersoll Rand acquired Trane in 2008, and in 2020 Ingersoll Rand's climate segment spun off as the independent <strong>Trane Technologies plc</strong>. Today, Trane Technologies owns both the Trane® and American Standard® HVAC brands — running them as separate market channels targeting different buyer segments with the same underlying products.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                One nuance worth noting: while the hardware is identical, there are minor feature differences at the margins. Trane uses a top weather guard on its highest-end models as standard; American Standard offers this as optional. The smart home platform is branded differently (AccuLink™ for American Standard vs. ComfortLink™ II for Trane) but functions similarly. These distinctions don't affect cooling performance.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Mini-splits:</strong> Like Trane, American Standard does not manufacture its own ductless equipment. American Standard mini-splits are Mitsubishi Electric units sold through the METUS joint venture, branded as "American Standard® Mitsubishi Electric."
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 2 */}
            <div id="models" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Model Lineup & SEER2 Ratings (2025–2026)</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                American Standard uses a straightforward three-tier naming structure: <strong>Silver</strong> (entry), <strong>Gold</strong> (mid-range), and <strong>Platinum</strong> (premium). All current 2025–2026 models use R-454B refrigerant, completing the transition from R-410A for the 2025 model year.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Model</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Series</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Compressor</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Max SEER2</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelLineup.map((m, i) => (
                      <tr key={m.model} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700 text-xs">{m.model}</td>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-900">{m.series}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700 text-xs">{m.compressor}</td>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-teal-700">{m.seer2}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600 text-xs">{m.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-teal-800 mb-1">Platinum 20 vs. Trane XV20i — the efficiency surprise</p>
                <p className="text-sm text-gray-700">The American Standard Platinum 20 reaches <strong>24.0 SEER2</strong>, actually exceeding Trane's flagship XV20i at 23.6 SEER2 — despite coming from the same factory. This makes the Platinum 20 a compelling option for efficiency-focused buyers who are comparing top-tier units: same hardware pedigree, slightly higher certified rating, lower price. Always verify your specific matched-system SEER2 via the AHRI Reference Number at <a href="https://www.ahridirectory.org" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">ahridirectory.org</a>.</p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 3 */}
            <div id="reliability" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Reliability Data</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                American Standard earns strong reliability ratings in Consumer Reports surveys — consistently among the top brands alongside Trane, Lennox, and Carrier. This is not surprising given the shared hardware. Consumer Reports often groups American Standard with Trane in reliability assessments, and both brands share the same owner satisfaction data from Trane Technologies.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-lg font-bold text-teal-600 mb-1">Top Tier</p>
                  <p className="text-sm font-semibold text-gray-700">Consumer Reports</p>
                  <p className="text-xs text-gray-500 mt-1">Alongside Trane (same hardware)</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600 mb-1">15–20</p>
                  <p className="text-sm font-semibold text-gray-700">Years lifespan</p>
                  <p className="text-xs text-gray-500 mt-1">With proper annual maintenance</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600 mb-1">2,000 hr</p>
                  <p className="text-sm font-semibold text-gray-700">Salt spray rating</p>
                  <p className="text-xs text-gray-500 mt-1">Spine Fin coil — 2× industry standard</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                The Spine Fin all-aluminum coil — shared with Trane — is the hardware feature most cited for long-term durability in coastal and humid climates. Rated for 2,000-hour salt spray exposure (vs. 1,000-hour industry standard), it reduces brazed joints by approximately 90% compared to copper-aluminum coils. This is a genuine differentiator vs. Carrier, Lennox, and Goodman in coastal markets.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                The contractor consensus: <em>"Same as Trane but cheaper"</em> is the universal take. American Standard is seen as the sensible choice when a buyer wants quality but pushes back on Trane's price. The installer quality caveat — which applies to all brands — matters here too: the same Spine Fin coil in a poorly sized or improperly charged system underperforms a simpler unit installed correctly.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 4 */}
            <div id="issues" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Known Issues & Active CPSC Recall</h2>

              <div className="bg-red-50 border-2 border-red-400 rounded-lg p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-red-800 mb-2">⚠️ Active CPSC Safety Recall — July 3, 2025</p>
                    <p className="text-sm text-gray-700 mb-2">Approximately <strong>4,790 American Standard and Trane gas/electric packaged units</strong> were recalled due to a fuel gas valve that can open unexpectedly — creating a gas leak and fire hazard. One gas leak incident has been confirmed.</p>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Affected models (American Standard):</p>
                    <ul className="text-sm text-gray-700 space-y-0.5 list-disc pl-4 mb-3">
                      <li>4YCZ5024F1060A (serial: 24061381FA – 24453189FA)</li>
                      <li>4YCZ5036F1070A (serial: 24013024FA – 24482966FA)</li>
                      <li>4YCZ5036F1090A (serial: 24061367FA – 24442702FA)</li>
                      <li>4YCZ5048E1090A (serial: 24061326FA – 24492348FA)</li>
                      <li>4YCZ5048E1115A (serial: 24106164FA – 24415095FA)</li>
                    </ul>
                    <p className="text-sm text-gray-700 mb-1"><strong>Scope:</strong> This recall affects <strong>gas/electric packaged units only</strong> — combined heating + cooling in one outdoor cabinet, common in Southwest climates, mobile homes, and some commercial applications. Standard split-system central AC (separate indoor and outdoor units) is NOT affected.</p>
                    <p className="text-sm text-gray-700"><strong>Action:</strong> Stop using heating mode immediately. Call American Standard at <strong>800-889-0129</strong> or visit <strong>americanstandardair.com/gas-electric-packaged-unit-recall</strong> for free inspection and repair of the ignition board.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="border border-amber-200 rounded-lg p-5 bg-amber-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Aluminum Coil Leaks — Shared Issue with Trane</p>
                      <p className="text-sm text-gray-700">The same aluminum coil that delivers Spine Fin's coastal durability advantage also has a documented leak pattern. One experienced contractor stated bluntly on Reddit r/HVAC: <em>"All of their aluminum coils WILL LEAK."</em> This appears to be associated with specific model years and installation conditions rather than universal — but it's a recurring enough complaint across Trane and American Standard to flag. Aluminum cannot be brazed for repair; a coil leak typically requires full coil replacement. With R-454B refrigerant now running $700–$2,000+ per service call, a coil leak during the warranty period can still cost the homeowner $1,000–$2,500 out-of-pocket since refrigerant is not covered.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-amber-200 rounded-lg p-5 bg-amber-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Control Board Failures & Temperature Sensor Issues on New Installs</p>
                      <p className="text-sm text-gray-700">A documented June 2025 Reddit case describes a new American Standard installation where the control board failed shortly after installation and required replacement. A separate issue involved a temperature sensor misreading causing the system to shut off prematurely in heat lockout mode. These appear to be quality-control issues on a subset of units rather than widespread systematic failures — but they're worth knowing as early-ownership risk.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Warranty Replacement Parts — Wrong Dimensions</p>
                      <p className="text-sm text-gray-700">A documented warranty replacement case involved a condenser coil sent by American Standard that was 4 inches too tall for the application — damaging the old coil during the attempted swap. This type of parts fulfillment error creates real-world downtime and frustration even when the warranty process itself "works." It's an isolated report, but representative of the friction that can occur with any brand's warranty parts process.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">R-454B Refrigerant Cost Exposure (Shared with Trane)</p>
                      <p className="text-sm text-gray-700">American Standard chose R-454B (same as Trane, Carrier, and Lennox) rather than R-32 (Goodman, Daikin, Amana). R-454B aftermarket cylinders ran $700–$2,000 per 20 lbs in early 2026 vs. approximately $449 for R-32. Any service requiring refrigerant recovery and recharge is significantly more expensive on an R-454B system than on a Goodman/Daikin R-32 system. Standard warranty does not cover refrigerant.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 5 */}
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
                    {[
                      { label: 'Parts (all covered)', registered: '10 years', unregistered: '5 years' },
                      { label: 'Compressor', registered: '10 years', unregistered: '5 years' },
                      { label: 'Condenser coil', registered: '10 years', unregistered: '5 years' },
                      { label: 'Evaporator coil', registered: '10 years', unregistered: '5 years' },
                      { label: 'Labor (per myhomescore.app)', registered: '~2 years', unregistered: 'NOT included' },
                      { label: 'Heat exchanger (Platinum furnaces)', registered: 'Lifetime', unregistered: 'Limited' },
                      { label: 'Refrigerant', registered: 'NOT included', unregistered: 'NOT included' },
                    ].map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.label}</td>
                        <td className={`border border-gray-200 px-4 py-3 font-semibold ${row.registered.includes('NOT') ? 'text-red-600' : 'text-teal-700'}`}>{row.registered}</td>
                        <td className={`border border-gray-200 px-4 py-3 ${row.unregistered.includes('NOT') || row.unregistered === 'Limited' ? 'text-red-600' : 'text-gray-700'}`}>{row.unregistered}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm font-semibold text-amber-800 mb-1">Labor warranty note — verify directly</p>
                <p className="text-sm text-gray-700">Some sources (myhomescore.app) indicate American Standard provides approximately <strong>2 years of labor coverage</strong> for registered units — which would make it more generous than Trane (no standard labor coverage). However, this may reflect specific dealer programs rather than a universal manufacturer warranty. Verify at <strong>americanstandardair.com/resources/warranty-and-registration</strong> and ask your dealer specifically about labor coverage before signing. Don't assume it.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-red-800 mb-1">⚠️ Register within 60 days</p>
                  <p className="text-sm text-gray-700">Clock starts when the unit is turned on. Without registration, warranty drops from 10 to 5 years. Register online at americanstandardair.com or call 1-800-554-8005. Do it yourself — don't trust your contractor.</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-teal-800 mb-1">Warranty transfers — with a fee</p>
                  <p className="text-sm text-gray-700">Warranty transfers to subsequent homeowners for <strong>$59 within the registration window</strong> or <strong>$99 up to 90 days after home sale</strong>. Better than Goodman (non-transferable), comparable to Trane ($99).</p>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 6 */}
            <div id="pricing" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Pricing & Cost Comparison (2026)</h2>

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
              <p className="text-xs text-gray-500 italic mb-6">Source: HomeGuide, Heating News Journal 2025–2026. Standard installation on existing ductwork.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Silver series installed</p>
                  <p className="text-xl font-bold text-teal-600">$3,500–$5,500</p>
                  <p className="text-xs text-gray-500 mt-1">Entry — single-stage</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Gold series installed</p>
                  <p className="text-xl font-bold text-teal-600">$5,500–$8,000</p>
                  <p className="text-xs text-gray-500 mt-1">Mid — two-stage</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Platinum series installed</p>
                  <p className="text-xl font-bold text-teal-600">$6,000–$12,000</p>
                  <p className="text-xs text-gray-500 mt-1">Premium — variable-speed</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Distribution:</strong> American Standard is sold exclusively through authorized dealers — no big-box retail, no Amazon, no wholesale online. The dealer network is separate from Trane's Comfort Specialist network, though both answer to Trane Technologies. Use the dealer locator at americanstandardair.com.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 7 */}
            <div id="vs-trane" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. American Standard vs. Trane — Full Comparison</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                This is the comparison that matters most for this brand, since it's the single most common buyer question.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Factor</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">American Standard</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Trane</th>
                    </tr>
                  </thead>
                  <tbody>
                    {traneComparison.map((row, i) => (
                      <tr key={row.factor} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.factor}</td>
                        <td className={`border border-gray-200 px-4 py-3 ${row.factor === 'Typical price vs. Trane' ? 'text-teal-700 font-semibold' : 'text-gray-700'}`}>{row.amStd}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.trane}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-5 mb-6">
                <p className="text-sm font-semibold text-teal-800 mb-2">The bottom line on American Standard vs. Trane</p>
                <p className="text-sm text-gray-700 mb-2">The hardware is the same. The decision comes down to three questions:</p>
                <ol className="text-sm text-gray-700 space-y-1 list-decimal pl-4">
                  <li><strong>Which brand has the better local dealer in your area?</strong> Installer quality matters more than brand — and the American Standard Customer Care Dealer program and Trane Comfort Specialist program are separate networks. Get quotes from both and compare the dealers themselves, not just the brand names.</li>
                  <li><strong>How much does the price difference add up to?</strong> On a $10,000 installed Trane system, 10% savings is $1,000. That's real money for identical hardware.</li>
                  <li><strong>Does the Trane name matter for resale in your specific market?</strong> In some markets, Trane brand recognition adds perceived value at resale. In most markets, it doesn't — the buyer's inspector won't care which badge is on the unit.</li>
                </ol>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                One genuine Trane advantage: Trane publishes a clear <strong>Choice/Priority/Premier pricing guide</strong>, making it easy to cross-check dealer quotes. American Standard does not publish equivalent pricing guidance, which gives less transparency when evaluating whether a quote is fair.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 8 */}
            <div id="best-for" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Who Should Buy American Standard?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border-2 border-teal-400 rounded-lg p-5 bg-teal-50">
                  <h3 className="text-lg font-bold text-teal-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />American Standard is the right choice if you...
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Want Trane-quality hardware at 5–15% lower cost — this is the primary value proposition and it's genuine</li>
                    <li>• Have a strong local American Standard authorized dealer whose quality equals or exceeds your Trane options</li>
                    <li>• Live in a coastal or humid climate — the Spine Fin coil's 2,000-hour salt spray rating applies to both Trane and American Standard identically</li>
                    <li>• Are in Arizona, Nevada, or a Southwest climate where the Spine Fin coil performs well in dry desert heat</li>
                    <li>• Don't care about the brand name on the unit — if the Trane badge is just a badge to you, the savings are yours to keep</li>
                    <li>• Want a transferable warranty at a lower entry price point than Trane</li>
                  </ul>
                </div>
                <div className="border-2 border-gray-300 rounded-lg p-5 bg-gray-50">
                  <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-gray-500" />Consider Trane instead if you...
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Have a clearly superior Trane Comfort Specialist in your area vs. available American Standard dealers — installer quality wins every time</li>
                    <li>• Want Trane's published pricing guide for quote transparency</li>
                    <li>• Are in a market where Trane brand recognition specifically adds to resale value</li>
                    <li>• Want the Trane Comfort Specialist's additional training requirements as a dealer quality signal</li>
                    <li>• Are getting quotes and Trane comes in at the same price or lower — it happens, and the hardware advantage is the same either way</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 9: FAQ */}
            <div id="faq" className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Frequently Asked Questions</h2>
              <div className="space-y-5">
                {[
                  { q: "Is American Standard the same as Trane?", a: "Essentially yes. Both brands are owned by Trane Technologies plc and manufactured at the same facilities in Tyler, Texas and Clarksville, Tennessee, using identical Spine Fin all-aluminum coils, Climatuff compressors, and engineering. The Platinum 20 (American Standard flagship) actually reaches 24.0 SEER2, slightly exceeding Trane's XV20i at 23.6. Primary differences: brand badge, separate dealer networks, and price — American Standard runs 5–15% less than comparable Trane." },
                  { q: "Should I buy American Standard or Trane?", a: "If your local American Standard dealer is as strong as your Trane option: buy American Standard and pocket the 5–15% savings. The hardware is the same. The main case for Trane specifically: your area has a clearly superior Trane Comfort Specialist, Trane brand recognition adds resale value in your specific market, or you want Trane's published pricing guide for quote transparency. Otherwise, same hardware at lower price = American Standard wins." },
                  { q: "How much does American Standard cost vs. Trane?", a: "American Standard typically runs 5–15% less than comparable Trane models for the same tier. On a $10,000 installed Trane system, that's $500–$1,500 in savings for identical hardware. By series: Silver ($3,500–$5,500 installed), Gold ($5,500–$8,000), Platinum ($6,000–$12,000)." },
                  { q: "Is there an active American Standard recall in 2026?", a: "Yes — a July 3, 2025 CPSC recall affecting approximately 4,790 American Standard and Trane gas/electric packaged units (models 4YCZ5024F1060A, 4YCZ5036F1070A, 4YCZ5036F1090A, 4YCZ5048E1090A, 4YCZ5048E1115A). Gas valve can open unexpectedly — fire hazard. This affects packaged units only, not standard split-system central AC. If affected: stop using heating mode, call 800-889-0129 for free repair." },
                  { q: "What is American Standard's warranty in 2026?", a: "10-year parts warranty when registered within 60 days (drops to 5 years unregistered). Some sources indicate approximately 2 years of labor coverage for registered units — verify directly at americanstandardair.com. Warranty transfers to subsequent homeowners for $59–$99. Refrigerant is NOT covered under any tier." },
                  { q: "What are the most efficient American Standard AC models?", a: "The Platinum 20 (AccuComfort variable-speed) reaches 24.0 SEER2 — actually exceeding Trane's flagship XV20i at 23.6. The Platinum 18 reaches 18.1 SEER2. Both use R-454B refrigerant and are ENERGY STAR Most Efficient certified. For maximum efficiency in the US central AC market, Lennox SL25KCV at 26.0 SEER2 leads the category, but at significantly higher installed cost." },
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">Calculate Savings on an American Standard Upgrade</h3>
            <p className="text-gray-600 mb-4 text-sm">Enter your current SEER and your new American Standard system's SEER2 to see exact annual savings and payback period at your local electricity rate.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
              <Calculator className="w-4 h-4" />
              Calculate My Savings
            </Link>
          </div>

          {/* Related */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Related</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/brands/trane" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">Trane AC Review 2026</p>
                <p className="text-xs text-gray-500 mt-1">Same hardware, different badge</p>
              </Link>
              <Link to="/brands/carrier" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">Carrier AC Review 2026</p>
              </Link>
              <Link to="/brands" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">All Brand Reviews</p>
              </Link>
            </div>
          </div>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
