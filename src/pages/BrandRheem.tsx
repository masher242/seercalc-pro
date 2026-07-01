import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock, CheckCircle2, AlertCircle, Star } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';

const modelLineup = [
  { model: 'RA20AZ / RA19AY', series: 'Endeavor Prestige', tier: 'Premium', compressor: 'Variable-Speed Inverter', seer2: 'Up to 20.0–20.5', refrigerant: 'R-454B', note: 'EcoNet enabled; ENERGY STAR; top of line' },
  { model: 'RA17AY', series: 'Endeavor Classic Plus', tier: 'Mid-High', compressor: 'Two-Stage', seer2: 'Up to 17.0', refrigerant: 'R-454B', note: 'ENERGY STAR certified' },
  { model: 'RA16AY', series: 'Endeavor Classic Plus', tier: 'Mid', compressor: 'Two-Stage Scroll', seer2: '17.0 / 12 EER2', refrigerant: 'R-454B', note: 'ENERGY STAR certified' },
  { model: 'RA15AZ', series: 'Endeavor Classic Plus', tier: 'Mid', compressor: 'Two-Stage', seer2: '~15–16', refrigerant: 'R-454B', note: '' },
  { model: 'RA14AY / RA14AZ', series: 'Endeavor Classic', tier: 'Entry', compressor: 'Single-Stage Scroll', seer2: '13.8–15.2', refrigerant: 'R-454B', note: 'Base entry model' },
];

const tonnagePricing = [
  { tons: '1.5 ton', installed: '$3,000–$6,200' },
  { tons: '2 ton', installed: '$3,200–$6,600' },
  { tons: '2.5 ton', installed: '$3,300–$6,700' },
  { tons: '3 ton', installed: '$3,400–$7,200' },
  { tons: '3.5 ton', installed: '$3,500–$7,500' },
  { tons: '4 ton', installed: '$3,600–$7,700' },
  { tons: '5 ton', installed: '$4,200–$8,500' },
];

const seriesPricing = [
  { series: 'Endeavor Classic (entry)', installed: '$3,000–$4,000', seer2: '13.4–15.2' },
  { series: 'Endeavor Classic Plus (mid)', installed: '$4,000–$6,000', seer2: '15.2–17.0' },
  { series: 'Endeavor Prestige (premium)', installed: '$6,000–$8,500', seer2: '18.0–20.5' },
];

const competitorComparison = [
  { brand: 'Goodman', maxSeer2: '17.2', installed3ton: '$3,200–$6,200', refrigerant: 'R-32', laborWarranty: 'No', tier: 'Budget' },
  { brand: 'Rheem', maxSeer2: '20.5', installed3ton: '$3,400–$7,200', refrigerant: 'R-454B', laborWarranty: 'No (Protection Plus paid)', tier: 'Mid', highlight: true },
  { brand: 'Carrier', maxSeer2: '21.0', installed3ton: '$4,500–$10,000', refrigerant: 'R-454B', laborWarranty: 'Option B (enrolled dealers)', tier: 'Premium' },
  { brand: 'Trane', maxSeer2: '23.6', installed3ton: '$4,580–$10,414', refrigerant: 'R-454B', laborWarranty: 'No', tier: 'Premium' },
  { brand: 'Daikin', maxSeer2: '24.5', installed3ton: '$5,000–$8,500', refrigerant: 'R-32', laborWarranty: 'Asure (paid)', tier: 'Premium' },
];

export default function BrandRheem() {
  return (
    <>
      <Helmet>
        <title>Rheem AC Review 2026: Reliability, Pricing, Warranty & Known Issues | seercalc.pro</title>
        <meta name="description" content="Rheem air conditioner review 2026: mid-range best value, $3,000–$8,500 installed, Endeavor Line with up to 20.5 SEER2, 90-day registration window, known evaporator coil leak issues. Full honest review." />
        <meta name="keywords" content="Rheem AC review 2026, Rheem Endeavor Line review, Rheem vs Carrier, Rheem reliability 2026, Rheem warranty 2026, is Rheem a good brand, Rheem RA20AZ review" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://seercalc.pro/brands/rheem" />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://seercalc.pro/brands/rheem" />
        <meta property="og:title" content="Rheem AC Review 2026: Best Mid-Range Value?" />
        <meta property="og:description" content="Rheem's Endeavor Line hits up to 20.5 SEER2 at mid-range prices. 90-day registration window (longest after Carrier). Known evaporator coil leak issue with high labor cost exposure. Full 2026 review." />
        <meta property="og:image" content="https://seercalc.pro/images/brands/rheem-review-og.png" />
        <meta property="article:author" content="The Efficiency Hub" />
        <meta property="article:section" content="Brand Reviews" />
        <meta property="article:tag" content="Rheem" />
        <meta property="article:tag" content="HVAC" />
        <meta property="article:tag" content="Air Conditioner Review" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://seercalc.pro/brands/rheem" />
        <meta name="twitter:title" content="Rheem AC Review 2026: Best Mid-Range Value?" />
        <meta name="twitter:description" content="Up to 20.5 SEER2 at mid-range prices. 90-day registration window. Known coil leak issues. Full honest 2026 review." />
        <meta name="twitter:image" content="https://seercalc.pro/images/brands/rheem-review-og.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "Rheem Air Conditioner Review 2026",
            "reviewBody": "Rheem is a privately held mid-range HVAC brand owned by Paloma Rheem Holdings (Japan) and manufactured in Fort Smith, Arkansas. The Endeavor Line (rebranded in 2023) reaches up to 20.5 SEER2 on the Prestige series using R-454B refrigerant. Rheem's 90-day registration window matches Carrier's industry-leading standard. Key strengths: easy serviceability (any tech can work on them), Watsco distribution network, and the Fujitsu General acquisition (2025) adding ductless expertise. Known issue: evaporator coil pinhole leaks documented within 3–5 years, with $3,000–$4,000 out-of-pocket labor exposure since refrigerant and labor are not covered. Also owns Friedrich (ductless) and Ruud (identical hardware, contractor channel). DOE civil penalty of $1.05M in 2024 for commercial unit energy standard noncompliance.",
            "author": { "@type": "Organization", "name": "The Efficiency Hub", "url": "https://seercalc.pro" },
            "publisher": { "@type": "Organization", "name": "seercalc.pro", "logo": { "@type": "ImageObject", "url": "https://seercalc.pro/logo.png" } },
            "itemReviewed": {
              "@type": "Product",
              "name": "Rheem Air Conditioners",
              "brand": { "@type": "Brand", "name": "Rheem" },
              "manufacturer": { "@type": "Organization", "name": "Rheem Manufacturing Company" }
            },
            "reviewRating": { "@type": "Rating", "ratingValue": "3.9", "bestRating": "5", "worstRating": "1" }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is Rheem a good air conditioner brand?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, particularly for mid-range buyers. Rheem sits between Goodman (budget) and Carrier/Trane (premium) in both price and positioning. Key strengths: universal serviceability (any licensed tech can work on them), excellent Watsco distribution network for parts, up to 20.5 SEER2 on the Prestige series, and a 90-day registration window matching Carrier's industry-leading standard. Main known issue: evaporator coil pinhole leaks documented within 3–5 years on some units, with significant out-of-pocket labor and refrigerant exposure since neither is covered under standard warranty. Expected lifespan: 12–20 years with proper maintenance."
                }
              },
              {
                "@type": "Question",
                "name": "How much does a Rheem AC cost in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Rheem central AC costs $3,000–$4,000 installed for entry Endeavor Classic, $4,000–$6,000 for mid-range Endeavor Classic Plus, and $6,000–$8,500 for the premium Endeavor Prestige. By tonnage, a 3-ton system runs approximately $3,400–$7,200 installed. Rheem positions at 10–20% above Goodman and 10–20% below Carrier and Trane for comparable specifications."
                }
              },
              {
                "@type": "Question",
                "name": "What is Rheem's warranty in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Rheem offers a 10-year parts warranty when registered within 90 days of installation (dropping to 5 years without registration). Select Prestige and Classic Plus models include a conditional 10-year unit replacement warranty. Labor is NOT covered under the standard warranty — the Protection Plus extended service plan (Platinum, Gold, Sterling, Bronze tiers) adds labor coverage at additional cost. The warranty is transferable to subsequent homeowners. Refrigerant is NOT covered."
                }
              },
              {
                "@type": "Question",
                "name": "What are the most common Rheem AC problems?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The most consistently reported Rheem issue is evaporator coil pinhole leaks occurring within 3–5 years. Documented cases describe recurring leaks at the same location even after coil replacement under warranty, with $3,000–$4,000 in out-of-pocket labor and refrigerant costs per event since neither is covered under standard warranty. In some cases, coils had to be air-freighted from the factory due to lack of local stock, adding downtime. A 2015 New Jersey class action was filed over formicary corrosion in copper coils — Rheem has since transitioned to aluminum coils, but pinhole leak complaints continue on newer units."
                }
              },
              {
                "@type": "Question",
                "name": "Is Rheem the same as Ruud?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Rheem and Ruud are manufactured on the same production lines at the same Fort Smith, Arkansas facility. Ruud is Rheem's contractor-facing brand (model numbers start with U instead of R) while Rheem is the consumer-facing brand. The hardware is identical. Ruud is typically sold through HVAC wholesale distributors to contractors; Rheem is sold through authorized dealers and some retail channels including Home Depot for select models."
                }
              },
              {
                "@type": "Question",
                "name": "Does Rheem own Friedrich?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Friedrich is a Rheem-owned brand sold under the Floating Air and FreshAire names for ductless mini-splits and PTACs respectively. Friedrich ductless systems use the same Rheem Floating Air platform and R-32 refrigerant. Additionally, Rheem's parent company Paloma Rheem Holdings acquired Fujitsu General in 2025, adding a major ductless HVAC brand to its portfolio under the new GENERAL Inc. name."
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Rheem Air Conditioners: 2026 Review</h1>
            <p className="text-xl text-gray-600">The mid-range value leader — easy to service, broad parts access, up to 20.5 SEER2. And a coil leak issue that can cost $3,000–$4,000 out of pocket even under warranty</p>
          </header>

          {/* Quick Answer */}
          <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg mb-8">
            <p className="text-sm font-semibold text-teal-800 uppercase tracking-wide mb-2">Quick Answer</p>
            <p className="text-gray-800"><strong>Rheem is the best mid-range value brand</strong> — priced above Goodman but below Carrier and Trane, with broad Watsco distribution making it easy for any licensed tech to service. The Endeavor Prestige reaches <strong>20.5 SEER2</strong>. The <strong>90-day registration window</strong> matches Carrier's industry-leading standard. Main known issue: evaporator coil pinhole leaks documented within 3–5 years, with <strong>$3,000–$4,000 labor and refrigerant exposure</strong> per event since neither is covered under warranty. Also: Rheem is the same hardware as <strong>Ruud</strong> (contractor channel, different label). <strong>Best for:</strong> buyers who want above-budget-tier reliability, easy serviceability, and no premium brand markup.</p>
          </div>

          {/* Scorecard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <div className="flex justify-center mb-2">
                {[1,2,3,4].map(s => <Star key={s} className="w-4 h-4 fill-teal-500 text-teal-500" />)}
                <Star className="w-4 h-4 text-gray-300" />
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Reliability</p>
              <p className="text-xs text-gray-500 mt-1">Mid-tier; strong serviceability</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">20.5</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Max SEER2</p>
              <p className="text-xs text-gray-500 mt-1">RA20AZ Prestige</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">90 days</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Registration</p>
              <p className="text-xs text-gray-500 mt-1">Tied with Carrier for longest</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
              <p className="text-lg font-bold text-red-600">⚠ Coils</p>
              <p className="text-xs font-semibold text-red-600 uppercase mt-1">Known Issue</p>
              <p className="text-xs text-gray-500 mt-1">Pinhole leaks; $3–4K exposure</p>
            </div>
          </div>

          {/* TOC */}
          <nav className="bg-gray-50 rounded-lg p-5 mb-10 border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">In this review:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
              <a href="#company" className="text-teal-600 hover:text-teal-700">1. Company background & brand family</a>
              <a href="#models" className="text-teal-600 hover:text-teal-700">2. Endeavor Line model lineup</a>
              <a href="#reliability" className="text-teal-600 hover:text-teal-700">3. Reliability data</a>
              <a href="#issues" className="text-teal-600 hover:text-teal-700">4. The coil leak problem — full story</a>
              <a href="#warranty" className="text-teal-600 hover:text-teal-700">5. Warranty terms (2026)</a>
              <a href="#pricing" className="text-teal-600 hover:text-teal-700">6. Pricing & cost comparison</a>
              <a href="#best-for" className="text-teal-600 hover:text-teal-700">7. Who should buy Rheem?</a>
              <a href="#faq" className="text-teal-600 hover:text-teal-700">8. FAQ</a>
            </div>
          </nav>

          <section className="prose prose-lg max-w-none">

            {/* Section 1 */}
            <div id="company" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Company Background & Brand Family</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Rheem Manufacturing Company is privately held — unlike Trane (NYSE: TT), Carrier (NYSE: CARR), or Lennox (NYSE: LII). The ultimate parent is <strong>Paloma Rheem Holdings Co., Ltd.</strong> (Japan), which has owned Rheem since 1988 through Paloma Co., Ltd. In March 2024, Paloma restructured into Paloma Rheem Holdings as a formal holding company. Rheem is headquartered in Atlanta, Georgia, with primary HVAC manufacturing in <strong>Fort Smith, Arkansas</strong> — its home for decades.
              </p>

              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm font-semibold text-teal-800 mb-1">Rheem's brand family — what's under the same roof</p>
                <ul className="text-sm text-gray-700 space-y-1 mt-2">
                  <li>• <strong>Rheem</strong> — consumer-facing residential HVAC and water heating</li>
                  <li>• <strong>Ruud</strong> — identical hardware to Rheem, contractor-facing channel (model numbers start with U instead of R)</li>
                  <li>• <strong>Friedrich</strong> — Rheem-owned ductless mini-splits (Floating Air) and PTACs (FreshAire)</li>
                  <li>• <strong>GENERAL Inc.</strong> (formerly Fujitsu General) — acquired by Paloma Rheem Holdings in May 2025 for ~$1.63 billion; ductless/VRF specialist now part of the family</li>
                  <li>• <strong>Groupe Atlantic</strong> — majority stake acquired May 2026; European HVAC/water heating leader</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                The Fujitsu General acquisition is the most strategically significant move in Rheem's recent history. Fujitsu General (now GENERAL Inc.) is one of the world's leading ductless and VRF HVAC brands — significantly expanding Rheem's ductless capability beyond the Friedrich Floating Air platform. This acquisition was completed in May 2025 and positions Paloma Rheem Holdings as a global HVAC powerhouse, though the Rheem brand itself in North America remains focused on central AC, heat pumps, and water heating.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>The Ruud relationship:</strong> Ruud and Rheem roll off the same Fort Smith production lines with identical components. The only meaningful differences are the badge and the distribution channel. If your contractor quotes Ruud, you're getting Rheem hardware. Some contractors prefer Ruud for its wholesale pricing and channel exclusivity.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 2 */}
            <div id="models" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. The Endeavor Line — 2025–2026 Model Lineup</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                In 2023, Rheem rebranded all residential AC lines under the <strong>Endeavor® Line</strong> umbrella. The old Classic, Classic Plus, and Prestige names became "Endeavor Line Classic," "Endeavor Line Classic Plus," and "Endeavor Line Prestige." Same hardware progression, new marketing wrapper. All current 2025–2026 models use <strong>R-454B</strong> refrigerant. Rheem's mini-splits (Floating Air) use R-32.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Model</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Series</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Tier</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Compressor</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Max SEER2</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelLineup.map((m, i) => (
                      <tr key={m.model} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-900 text-xs">{m.model}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700 text-xs">{m.series}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{m.tier}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700 text-xs">{m.compressor}</td>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-teal-700">{m.seer2}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600 text-xs">{m.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">New 2026 Products</h3>
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-teal-800 mb-2">RP17AY — Endeavor Classic Plus Universal Heat Pump (June 2026)</p>
                <p className="text-sm text-gray-700">Launched June 15, 2026: 2–5 ton, up to 17.0 SEER2 / 9.5 HSPF2, R-454B, universal compatibility (pairs with virtually any R-454B system). Includes Bluetooth® diagnostics. Available in both Rheem and Ruud configurations. This is a meaningful product for installers doing mixed-brand system work.</p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Floating Air Mini-Splits (Friedrich)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Rheem's ductless lineup is sold under both the Rheem Floating Air™ and Friedrich Floating Air® brands (Friedrich is Rheem-owned). The FSHSR Premier series reaches up to <strong>33.1 SEER2</strong> — by far the highest efficiency in the Rheem family and competitive with Mitsubishi's premium single-zone units. Mini-splits use R-32 refrigerant. The 2026 AHR Expo showcased 40 new mini-split SKUs across three product lines.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-blue-800 mb-1">EcoNet® smart home platform</p>
                <p className="text-sm text-gray-700">Rheem's connected ecosystem — EcoNet — links HVAC and water heating. In February 2026, Rheem launched a partnership with ecobee: the <strong>ecobee Smart Thermostat Lite | Works with EcoNet®</strong>, compatible with non-communicating Rheem, Ruud, and Friedrich systems. This broadens thermostat choice vs. a proprietary thermostat lock-in (unlike Lennox iComfort or Daikin One+).</p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 3 */}
            <div id="reliability" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Reliability Data</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-lg font-bold text-teal-600 mb-1">70/100</p>
                  <p className="text-sm font-semibold text-gray-700">Warranty Index Score</p>
                  <p className="text-xs text-gray-500 mt-1">"Good for mid-tier" (myhomescore.app)</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600 mb-1">12–20</p>
                  <p className="text-sm font-semibold text-gray-700">Years lifespan</p>
                  <p className="text-xs text-gray-500 mt-1">With proper maintenance</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-lg font-bold text-teal-600 mb-1">Any tech</p>
                  <p className="text-sm font-semibold text-gray-700">Serviceability</p>
                  <p className="text-xs text-gray-500 mt-1">Universal; no brand-specific requirement</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Rheem sits in the mid-tier for predicted reliability — above Goodman in general perception, below Carrier and Trane in Consumer Reports historical scores. A Long Island installer survey rates Rheem <strong>8.5/10 for reliability</strong> with an 18-year expected lifespan. Contractor sentiment from Reddit r/HVAC is broadly positive to neutral: <em>"Easy to service, solid build quality, no unusual diagnostic issues."</em>
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Rheem's biggest reliability strength</strong> is not its raw failure rate but its serviceability infrastructure. Parts flow through the Watsco distribution network — the largest HVAC distributor in the US (operating as Gemaire, East Coast Metal Distributors, Climate Masters, Comfort Products, and others). This means a Rheem part is typically available same-day or next-day from a local Watsco branch, at competitive prices, to any licensed contractor. No proprietary ecosystem, no Lennox-style OEM-only restriction.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>DOE civil penalty (2024):</strong> Rheem was ordered to pay a <strong>$1.05 million civil penalty</strong> by the Department of Energy (May 2024) for a commercial single-package central AC heat pump model (RQPL-B036JK) that failed to comply with energy conservation standards. This involved commercial packaged equipment, not residential split-system AC — but it's material background on Rheem's regulatory compliance record.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 4 */}
            <div id="issues" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. The Coil Leak Problem — The Full Story</h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                This is the most significant Rheem-specific field issue and deserves more than a bullet point. It's not a universal failure — most Rheem owners never experience it. But the pattern is documented consistently enough, and the financial exposure is high enough, that every Rheem buyer should understand it before purchasing.
              </p>

              <div className="border border-red-200 rounded-lg p-5 bg-red-50 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Evaporator Coil Pinhole Leaks — The Key Issue</p>
                    <p className="text-sm text-gray-700 mb-3">A documented 2025 Reddit case describes a Rheem evaporator coil (model RBHP25J11SH7B) with a pinhole leak at the bends. The original coil and TXV were replaced under warranty in September 2024 — but the system failed again approximately one year later in the same location. Key details from this case:</p>
                    <ul className="text-sm text-gray-700 space-y-2 list-disc pl-4">
                      <li>The coil had to be <strong>air-freighted from the factory</strong> because it was not available locally — adding downtime to an already frustrating repair</li>
                      <li>Out-of-pocket cost per event: approximately <strong>$3,000–$4,000</strong> in labor and refrigerant (R-454B), since neither is covered under the standard parts warranty</li>
                      <li>Recurring leak at the same location after replacement suggests a design or material consistency issue at the coil bends</li>
                    </ul>
                    <p className="text-sm text-gray-700 mt-3">This is not isolated. Reddit r/HVAC has a separate thread noting general contractor awareness: <em>"We always install aluminum coils instead of copper"</em> — referencing Rheem's historical copper coil issues that led to a 2015 New Jersey class action over formicary corrosion. Rheem has since moved to aluminum coils, but pinhole leak complaints continue on newer units.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="border border-amber-200 rounded-lg p-5 bg-amber-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Labor & Refrigerant Cost Gap — The Real Financial Risk</p>
                      <p className="text-sm text-gray-700">Rheem's standard warranty covers parts only. No labor, no refrigerant. With R-454B refrigerant now running $700–$2,000+ per 20-lb cylinder and a coil repair requiring full system evacuation and recharge, a single coil leak event — even during the warranty period — can easily cost the homeowner $3,000–$4,000 out of pocket. This is the same structural problem as Trane and Carrier, but Rheem's coil leak pattern makes the exposure more likely to materialize for some buyers.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">A2L Refrigerant Detection System False Lockouts</p>
                      <p className="text-sm text-gray-700">Rheem includes a PlusOne® Refrigerant Detection System™ on new R-454B equipment (a patented feature). Like all first-generation A2L detection systems industry-wide, these sensors can cross-react with household VOCs (spray foam, fresh paint, vinyl flooring, hairspray) and trigger false lockouts. This is not Rheem-specific — it affects all brands transitioning to A2L refrigerants — but it's worth knowing for the first weeks after installation in a recently renovated home.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Historical Copper Coil Formicary Corrosion (Pre-2015 Units)</p>
                      <p className="text-sm text-gray-700">A 2015 New Jersey class action (Case 1:15-cv-05243) was filed against Rheem over formicary corrosion in copper evaporator coils — a pattern also seen at Lennox and several other brands in the same era. Rheem has transitioned to aluminum coils to address this. If you're evaluating a used or builder-grade Rheem from before approximately 2015–2016, verify the coil material type before purchasing.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>What to do about coil risk:</strong> Ask your installer specifically about the coil specification in your system, whether they pressure-test before commissioning, and what their process is if a coil leak occurs in year 2 or 3. The Protection Plus™ Platinum plan (parts + labor) directly addresses the labor exposure — get a quote at installation time, not after a problem occurs. Compare its cost against the probability-weighted risk of a $3,000–$4,000 service call.
              </p>
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
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Registered (90 days)</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Unregistered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Parts', registered: '10 years', unregistered: '5 years' },
                      { label: 'Compressor', registered: '10 years', unregistered: '5 years' },
                      { label: 'Conditional unit replacement (select models)', registered: 'Up to 10 years', unregistered: 'Not available' },
                      { label: 'Heat exchanger (furnaces — Prestige)', registered: 'Lifetime', unregistered: '20 years' },
                      { label: 'Heat exchanger (furnaces — Classic)', registered: '20 years', unregistered: '20 years' },
                      { label: 'Labor', registered: 'NOT included', unregistered: 'NOT included' },
                      { label: 'Refrigerant', registered: 'NOT included', unregistered: 'NOT included' },
                    ].map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.label}</td>
                        <td className={`border border-gray-200 px-4 py-3 font-semibold ${row.registered.includes('NOT') ? 'text-red-600' : 'text-teal-700'}`}>{row.registered}</td>
                        <td className={`border border-gray-200 px-4 py-3 ${row.unregistered.includes('Not') || row.unregistered === '5 years' ? 'text-red-600' : 'text-gray-700'}`}>{row.unregistered}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-teal-800 mb-1">90-day registration window — best in class</p>
                  <p className="text-sm text-gray-700">Rheem's 90-day registration window matches Carrier's and exceeds Trane, Lennox, Goodman, and Daikin (all 60 days). This gives you more time to catch mistakes and ensure your system is properly registered. One source indicates 90 days; verify at rheem.com as some older documentation shows 60 days.</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-teal-800 mb-1">Warranty transfers to new homeowner</p>
                  <p className="text-sm text-gray-700">Rheem's warranty is transferable to subsequent owners — a meaningful advantage over Goodman (non-transferable) and on par with Carrier and Lennox. A transfer fee of $0–$100 may apply depending on the plan.</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Protection Plus™ Extended Service Contract</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Rheem's optional Protection Plus plan (through Equiguard® Inc.) covers the labor gap in four tiers:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-1 text-sm text-gray-700">
                <li><strong>Platinum:</strong> Parts + Labor</li>
                <li><strong>Gold:</strong> Labor only</li>
                <li><strong>Sterling:</strong> Parts only</li>
                <li><strong>Bronze:</strong> 2nd-year labor only</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Given the documented coil leak issue, the <strong>Platinum plan (parts + labor)</strong> is worth a serious look for Rheem buyers — particularly in humid climates where coil stress is higher. Get a quote at installation; retrofitting coverage after an issue occurs is never available.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 6 */}
            <div id="pricing" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Pricing & Cost Comparison (2026)</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Rheem sits comfortably in the mid-range — above Goodman but below Carrier and Trane. This is the correct positioning for what the brand offers: better serviceability and efficiency than budget brands, without the premium brand markup.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">By Tonnage</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">AC Size</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Installed Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tonnagePricing.map((p, i) => (
                      <tr key={p.tons} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-medium text-gray-700">{p.tons}</td>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-teal-700">{p.installed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">By Series</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Series</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Installed Range</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">SEER2 Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seriesPricing.map((p, i) => (
                      <tr key={p.series} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{p.series}</td>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-teal-700">{p.installed}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{p.seer2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Rheem vs. Competitors</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Brand</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Max SEER2</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">3-Ton Installed</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Refrigerant</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Labor Warranty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitorComparison.map((c, i) => (
                      <tr key={c.brand} className={c.highlight ? 'bg-teal-50 font-medium' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-900">{c.brand}{c.highlight ? ' ★' : ''}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{c.maxSeer2}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{c.installed3ton}</td>
                        <td className={`border border-gray-200 px-4 py-3 text-xs font-medium ${c.refrigerant === 'R-32' ? 'text-green-700' : 'text-gray-700'}`}>{c.refrigerant}</td>
                        <td className="border border-gray-200 px-4 py-3 text-xs text-gray-700">{c.laborWarranty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>The R-454B trade-off:</strong> Unlike Goodman and Daikin (R-32), Rheem chose R-454B — the same as Carrier, Trane, and Lennox. This means Rheem shares the higher refrigerant service cost of those brands. In 2026, R-32 systems cost roughly 6x less to service per pound of refrigerant than R-454B systems. If this matters to you, Goodman or Daikin are the R-32 alternatives at comparable and lower price points respectively.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 7 */}
            <div id="best-for" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Who Should Buy Rheem?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border-2 border-teal-400 rounded-lg p-5 bg-teal-50">
                  <h3 className="text-lg font-bold text-teal-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />Rheem is a strong choice if you...
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Want above-budget-tier reliability and efficiency without a premium brand markup — Rheem hits the sweet spot between Goodman and Carrier pricing</li>
                    <li>• Value serviceability — any licensed contractor can work on Rheem with parts sourced from the Watsco distribution network same-day or next-day</li>
                    <li>• Want a 90-day registration window — Rheem ties with Carrier for the longest in the category, vs. 60 days at Trane, Lennox, Goodman, and Daikin</li>
                    <li>• Want transferable warranty coverage when you sell — Rheem transfers, unlike Goodman</li>
                    <li>• Use an EcoNet-compatible smart home and want ecobee thermostat compatibility without a proprietary lock-in</li>
                    <li>• Are buying in a mild or dry climate where the 20.5 SEER2 Prestige gives meaningful efficiency at a reasonable price premium over entry models</li>
                    <li>• Want a heat pump option with good cold-weather performance — RP19AY (up to 19 SEER2 / 11 HSPF2) qualifies for 2025 25C heat pump credits on prior-year installs</li>
                  </ul>
                </div>
                <div className="border-2 border-gray-300 rounded-lg p-5 bg-gray-50">
                  <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-gray-500" />Consider alternatives if you...
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Are budget-constrained — Goodman delivers competitive performance at lower installed cost, with R-32 refrigerant service savings to boot</li>
                    <li>• Want maximum efficiency — 20.5 SEER2 max trails Lennox (26.0), Daikin (24.5), Trane (23.6), and Carrier (21.0)</li>
                    <li>• Are in a humid coastal climate with high coil stress — the documented coil leak pattern is a real risk; Trane's Spine Fin coil has a better coastal track record</li>
                    <li>• Want the lowest refrigerant service costs — Goodman/Daikin R-32 systems are significantly cheaper to service than Rheem's R-454B</li>
                    <li>• Need cold-climate ductless heat pump performance — Mitsubishi Hyper-Heat or Daikin FIT AURORA outperform Rheem mini-splits in extreme cold</li>
                    <li>• Want manufacturer-included labor coverage — Protection Plus is available but it's a paid add-on, not included standard like Lennox's Warranty Your Way Option B</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* FAQ */}
            <div id="faq" className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Frequently Asked Questions</h2>
              <div className="space-y-5">
                {[
                  { q: "Is Rheem a good air conditioner brand?", a: "Yes, particularly for mid-range buyers. Rheem sits between Goodman (budget) and Carrier/Trane (premium) in both price and reliability perception. Key strengths: universal serviceability, Watsco distribution network, up to 20.5 SEER2 on the Prestige series, 90-day registration window. Main known issue: evaporator coil pinhole leaks documented within 3–5 years on some units, with $3,000–$4,000 out-of-pocket labor and refrigerant exposure since neither is covered standard. Expected lifespan: 12–20 years with proper maintenance." },
                  { q: "Is Rheem the same as Ruud?", a: "Yes. Rheem and Ruud are manufactured on the same production lines at the same Fort Smith, Arkansas facility. Model numbers start with R for Rheem and U for Ruud, but the hardware is identical. Ruud is the contractor-facing channel brand; Rheem is the consumer brand. If your contractor quotes Ruud, you're getting Rheem." },
                  { q: "What is Rheem's warranty in 2026?", a: "10-year parts warranty when registered within 90 days of installation (dropping to 5 years without registration). Select Prestige and Classic Plus models include a conditional 10-year unit replacement warranty. Labor and refrigerant are NOT covered under the standard warranty. The Protection Plus plan (paid, through Equiguard Inc.) adds labor coverage. Warranty transfers to subsequent homeowners." },
                  { q: "What is the Rheem Endeavor Line?", a: "Rheem rebranded all residential AC lines under the Endeavor® Line name in 2023. It's a marketing umbrella — the same Classic, Classic Plus, and Prestige hardware tiers exist under new branding. Endeavor Classic (entry, single-stage), Endeavor Classic Plus (mid, two-stage), Endeavor Prestige (premium, variable-speed). All current models use R-454B refrigerant." },
                  { q: "Does Rheem own Friedrich?", a: "Yes. Friedrich is a Rheem-owned subsidiary brand for ductless mini-splits (Floating Air) and PTACs (FreshAire). The Friedrich Floating Air Premier (FSHSR) reaches up to 33.1 SEER2 — the highest efficiency in the Rheem family. Rheem's parent company also acquired Fujitsu General in 2025 (now GENERAL Inc.), adding a major global ductless brand to the portfolio." },
                  { q: "Does Rheem have the federal tax credit in 2026?", a: "No — the Section 25C Energy Efficient Home Improvement Credit expired December 31, 2025. No federal tax credit applies to any HVAC installation in 2026, regardless of brand. For 2025 installations (claimable on your 2025 tax return), qualifying Rheem heat pumps (RP19AY, RD18AY) and qualifying mini-splits (FSHSR, FPHSR series) met the 25C requirements. Rheem's QMID is K3A8." },
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">Calculate Savings with a Rheem Upgrade</h3>
            <p className="text-gray-600 mb-4 text-sm">Enter your current SEER and a Rheem Endeavor system's SEER2 to see exact annual savings and payback period at your local electricity rate.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
              <Calculator className="w-4 h-4" />
              Calculate My Savings
            </Link>
          </div>

          {/* Related */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Related</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/brands/goodman" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">Goodman AC Review 2026</p>
                <p className="text-xs text-gray-500 mt-1">Budget alternative with R-32 advantage</p>
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
