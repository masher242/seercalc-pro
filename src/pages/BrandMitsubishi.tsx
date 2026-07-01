import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock, CheckCircle2, AlertCircle, Star } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';

const modelLineup = [
  { model: 'MSZ-FS', name: 'Deluxe', tier: 'Ultra-Premium', type: 'Wall-mount ductless', seer2: '32.2', hyper: 'Yes (to -13°F)', note: '3D i-see Sensor®; dual vane; triple filtration; highest SEER2 in US residential market' },
  { model: 'MSZ-FH', name: 'Enhanced', tier: 'Premium', type: 'Wall-mount ductless', seer2: '~28–30', hyper: 'Yes (100% at 5°F)', note: 'i-see Sensor®; dual filtration' },
  { model: 'MSZ-FE', name: 'FE Hyper-Heat', tier: 'Premium', type: 'Wall-mount ductless', seer2: '20.2–26.0', hyper: 'Yes (73% at -13°F)', note: 'H2i® triple filtration; cold climate focus' },
  { model: 'MSZ-GS', name: 'Premier', tier: 'Mid-Premium', type: 'Wall-mount ductless', seer2: '~24.6', hyper: 'Yes (to -13°F)', note: 'Launched March 2024; replaced MSZ-GL; Smart Dry mode' },
  { model: 'SVZ-NL', name: 'Multi-position air handler', tier: 'Whole-Home', type: 'Ducted mini-split', seer2: 'Up to 20.2', hyper: 'With SUZ outdoor unit', note: 'Works with existing ductwork; 1–5 ton; whole-home solution' },
  { model: 'MXZ Series', name: 'SMART MULTI®', tier: 'Multi-Zone', type: 'Multi-zone outdoor', seer2: 'Varies by config', hyper: 'Select models', note: 'Up to 10 tons; up to 50 zones; single-phase 5-ton H2i new in 2026' },
];

const warrantyTable = [
  { scenario: 'With Diamond Contractor + registration (90 days)', parts: '12 years', compressor: '12 years', labor: 'Paid contract (optional)' },
  { scenario: 'Without Diamond Contractor (any licensed installer)', parts: '5 years', compressor: '7 years', labor: 'Not available standard' },
  { scenario: 'Unregistered (missed 90-day window)', parts: '5 years', compressor: '7 years', labor: 'Not available' },
];

const competitorComparison = [
  { brand: 'Mitsubishi', maxSeer2: '32.2 (MSZ-FS)', minTemp: '-13°F (H2i)', price3zone: '$8,000–$15,000', diamondReq: 'Yes (for 12-yr warranty)', laborWarranty: 'Paid only', highlight: true },
  { brand: 'Daikin', maxSeer2: '21.0 (AURORA H-H)', minTemp: '-20°F (FIT AURORA)', price3zone: '$7,000–$12,000', diamondReq: 'No special req.', laborWarranty: 'Asure (paid)' },
  { brand: 'Rheem/Friedrich', maxSeer2: '33.1 (FSHSR Premier)', minTemp: '~5°F', price3zone: '$6,000–$10,000', diamondReq: 'No', laborWarranty: 'Protection Plus (paid)' },
  { brand: 'Goodman', maxSeer2: '18.0 (MSH)', minTemp: '5°F', price3zone: '$4,000–$7,000', diamondReq: 'No', laborWarranty: 'None' },
];

const tonnagePricing = [
  { config: 'Single-zone (9,000 BTU)', installed: '$2,000–$4,000' },
  { config: 'Single-zone (12,000 BTU / 1 ton)', installed: '$2,500–$5,000' },
  { config: 'Single-zone (18,000 BTU / 1.5 ton)', installed: '$3,000–$6,000' },
  { config: 'Single-zone (24,000 BTU / 2 ton)', installed: '$4,000–$7,000' },
  { config: '2-zone multi-split system', installed: '$6,000–$12,000' },
  { config: '3-zone multi-split system', installed: '$8,000–$15,000' },
  { config: '4–5 zone system', installed: '$12,000–$20,000+' },
];

export default function BrandMitsubishi() {
  return (
    <>
      <Helmet>
        <title>Mitsubishi Electric AC Review 2026: Best Mini-Split Brand? | seercalc.pro</title>
        <meta name="description" content="Mitsubishi Electric HVAC review 2026: highest SEER2 in US market (32.2), H2i Hyper-Heat to -13°F, 12-year warranty with Diamond Contractor. Comfort app disaster (2025), no central AC offered. Full honest review." />
        <meta name="keywords" content="Mitsubishi Electric mini split review 2026, Mitsubishi METUS review, Mitsubishi MSZ-FS review, Mitsubishi vs Daikin mini split, Mitsubishi Diamond Contractor warranty, H2i Hyper-Heat review 2026" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://seercalc.pro/brands/mitsubishi" />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://seercalc.pro/brands/mitsubishi" />
        <meta property="og:title" content="Mitsubishi Electric Mini-Split Review 2026: Worth the Premium?" />
        <meta property="og:description" content="Highest SEER2 in the US (32.2), H2i Hyper-Heat to -13°F, 12-year Diamond Contractor warranty. But: 2025 Comfort app disaster, no central AC, expensive parts. Full honest review." />
        <meta property="og:image" content="https://seercalc.pro/images/brands/mitsubishi-review-og.png" />
        <meta property="article:author" content="The Efficiency Hub" />
        <meta property="article:section" content="Brand Reviews" />
        <meta property="article:tag" content="Mitsubishi Electric" />
        <meta property="article:tag" content="HVAC" />
        <meta property="article:tag" content="Mini-Split Review" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://seercalc.pro/brands/mitsubishi" />
        <meta name="twitter:title" content="Mitsubishi Electric Mini-Split Review 2026" />
        <meta name="twitter:description" content="Highest SEER2 in US market (32.2). H2i Hyper-Heat to -13°F. 2025 Comfort app disaster. Diamond Contractor warranty dependency. No central AC. Full honest review." />
        <meta name="twitter:image" content="https://seercalc.pro/images/brands/mitsubishi-review-og.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "Mitsubishi Electric HVAC Review 2026",
            "reviewBody": "Mitsubishi Electric (via METUS, a 50/50 JV with Trane Technologies) is the dominant premium mini-split brand in the US, holding approximately 23% of the North American residential ductless market. The MSZ-FS reaches 32.2 SEER2 — the highest verified residential SEER2 in the US market. H2i Hyper-Heat operates at -13°F. The 12-year parts/compressor warranty with Diamond Contractor installation is industry-leading for ductless. Critical note: Mitsubishi does NOT offer conventional central split-system AC — ductless and ducted mini-split only. The 2025 Comfort app rollout (replacing kumo cloud) was a documented disaster affecting thousands of users. Parts are expensive and restricted to authorized channels. Diamond Contractor requirement for 12-year warranty creates geographic warranty access inequality.",
            "author": { "@type": "Organization", "name": "The Efficiency Hub", "url": "https://seercalc.pro" },
            "publisher": { "@type": "Organization", "name": "seercalc.pro", "logo": { "@type": "ImageObject", "url": "https://seercalc.pro/logo.png" } },
            "itemReviewed": {
              "@type": "Product",
              "name": "Mitsubishi Electric Mini-Split Systems",
              "brand": { "@type": "Brand", "name": "Mitsubishi Electric" },
              "manufacturer": { "@type": "Organization", "name": "Mitsubishi Electric Trane HVAC US LLC (METUS)" }
            },
            "reviewRating": { "@type": "Rating", "ratingValue": "4.4", "bestRating": "5", "worstRating": "1" }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is Mitsubishi Electric a good mini-split brand?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes — Mitsubishi Electric is widely regarded as the gold standard for residential mini-splits in the US. The MSZ-FS reaches 32.2 SEER2, the highest verified residential rating in the US market. H2i Hyper-Heat operates at -13°F with 100% capacity at 5°F. Consumer Reports consistently ranks Mitsubishi among the most reliable ductless brands. The 12-year warranty with Diamond Contractor installation is industry-leading. Trade-offs: premium price (30–50% above Daikin), parts are expensive and restricted, Diamond Contractor requirement creates warranty access inequality in rural markets, and the 2025 Comfort app rollout was a well-documented failure affecting thousands of users."
                }
              },
              {
                "@type": "Question",
                "name": "Does Mitsubishi Electric sell central AC?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Mitsubishi Electric does NOT sell conventional central split-system air conditioners (the type with a separate outdoor condenser and indoor air handler connected by refrigerant lines to ductwork). Mitsubishi sells only ductless mini-splits (wall-mount, cassette, floor-mount, concealed duct) and ducted mini-split air handlers (SVZ-NL) that replace conventional forced-air systems using existing ductwork. If you want conventional central AC, Mitsubishi is the wrong brand — consider Trane, Carrier, Lennox, Goodman, Daikin, or Rheem."
                }
              },
              {
                "@type": "Question",
                "name": "What is a Mitsubishi Diamond Contractor and why does it matter?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Diamond Contractor is a Mitsubishi-certified installer who has completed factory training and met ongoing installation volume requirements. Without a Diamond Contractor, your Mitsubishi warranty drops from 12 years (parts and compressor) to just 5 years (parts) and 7 years (compressor) — a loss of 5–7 years of coverage. In major metro areas, Diamond Contractors are widely available. In rural markets, they can be scarce, creating geographic inequality in warranty access. Always verify Diamond Contractor status before signing a contract — the difference is worth thousands of dollars in coverage."
                }
              },
              {
                "@type": "Question",
                "name": "What happened with the Mitsubishi Comfort app in 2025?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In March 2025, Mitsubishi replaced the kumo cloud app with the new Comfort app. The rollout was widely described as a disaster. Documented failures included: units showing as 'Off' while running, temperature readings showing 86°F in a 65°F room, Google Home and HomeKit integrations broken for months, Home Assistant local API disrupted, scheduled events not triggering, and units requiring full breaker resets to reconnect. A class action law firm publicly solicited affected customers in April 2025. Some stability was achieved by late 2025, but the episode remains a significant mark against Mitsubishi's software reliability. If smart home integration is important to you, research the current Comfort app status before purchasing."
                }
              },
              {
                "@type": "Question",
                "name": "How much does a Mitsubishi mini-split cost in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mitsubishi is the most expensive residential mini-split brand in the US. Single-zone systems run approximately $2,000–$5,000 installed for smaller units (9,000–12,000 BTU) and $4,000–$7,000 for 2-ton single-zone. Multi-zone systems run $6,000–$12,000 for 2-zone, $8,000–$15,000 for 3-zone, and $12,000–$20,000+ for 4–5 zone configurations. Mitsubishi commands a 30–50% premium over comparable Daikin systems."
                }
              },
              {
                "@type": "Question",
                "name": "Is Mitsubishi better than Daikin for mini-splits?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For cold-climate performance: Mitsubishi leads — H2i Hyper-Heat at -13°F is the long-established standard. For maximum SEER2: Mitsubishi leads at 32.2 vs. Daikin's ~21.0 for residential. For warranty without dealer restriction: Daikin is easier — no Diamond Contractor requirement for 12-year coverage. For price: Daikin wins by 30–50%. For smart home reliability: both have had documented thermostat issues (Mitsubishi Comfort app disaster 2025; Daikin One+ temperature inaccuracy). For rural markets with thin Diamond Contractor coverage: Daikin is more accessible. The right answer depends heavily on your climate, budget, and local dealer situation."
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
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />15 min read</span>
              <span className="text-gray-400">Updated July 2026</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Mitsubishi Electric Mini-Splits: 2026 Review</h1>
            <p className="text-xl text-gray-600">The gold standard for residential ductless — 32.2 SEER2, H2i Hyper-Heat to -13°F, 12-year Diamond warranty. And a 2025 app disaster, expensive parts, and a warranty that depends on finding the right installer</p>
          </header>

          {/* Critical note */}
          <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-5 mb-8">
            <p className="text-sm font-bold text-amber-800 uppercase tracking-wide mb-2">⚠️ Read this first</p>
            <p className="text-gray-800 text-sm"><strong>Mitsubishi Electric does NOT sell conventional central AC.</strong> No split-system condensers, no coil + air handler combinations, no ductwork-based central cooling systems. Mitsubishi sells <strong>ductless mini-splits only</strong> (plus ducted mini-split air handlers that work with existing ducts). If you're looking to replace a traditional central AC system and keep your existing ductwork, look at Trane, Carrier, Lennox, Goodman, Daikin, or Rheem instead — or consider the Mitsubishi SVZ-NL ducted air handler as a ductwork-compatible option.</p>
          </div>

          {/* Quick Answer */}
          <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg mb-8">
            <p className="text-sm font-semibold text-teal-800 uppercase tracking-wide mb-2">Quick Answer</p>
            <p className="text-gray-800"><strong>Mitsubishi Electric is the premium gold standard for residential mini-splits</strong> in the US — ~23% market share, highest SEER2 in the country (MSZ-FS at 32.2), and H2i Hyper-Heat operating at <strong>-13°F</strong>. The 12-year warranty with Diamond Contractor installation is industry-leading for ductless. Installed costs run <strong>$2,000–$20,000+</strong> depending on configuration. Major trade-offs: 30–50% more expensive than Daikin, parts are expensive and restricted, the <strong>2025 Comfort app rollout was a widely documented disaster</strong>, and the Diamond Contractor requirement can leave rural buyers with only 5/7-year coverage. <strong>Best for:</strong> cold climates, additions, efficiency-first buyers, and anywhere ductless is the right architecture.</p>
          </div>

          {/* Scorecard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <div className="flex justify-center mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-teal-500 text-teal-500" />)}
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Reliability</p>
              <p className="text-xs text-gray-500 mt-1">Top-rated in CR ductless surveys</p>
            </div>
            <div className="bg-teal-50 rounded-lg p-4 text-center border border-teal-200">
              <p className="text-2xl font-bold text-teal-600">32.2</p>
              <p className="text-xs font-semibold text-teal-700 uppercase mt-1">Max SEER2</p>
              <p className="text-xs text-gray-500 mt-1">Highest in US residential market</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">-13°F</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">H2i Heating</p>
              <p className="text-xs text-gray-500 mt-1">100% capacity at 5°F</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
              <p className="text-lg font-bold text-red-600">Diamond</p>
              <p className="text-xs font-semibold text-red-600 uppercase mt-1">Contractor Required</p>
              <p className="text-xs text-gray-500 mt-1">For 12-yr warranty (vs. 5/7 without)</p>
            </div>
          </div>

          {/* TOC */}
          <nav className="bg-gray-50 rounded-lg p-5 mb-10 border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">In this review:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
              <a href="#company" className="text-teal-600 hover:text-teal-700">1. Company background & METUS structure</a>
              <a href="#models" className="text-teal-600 hover:text-teal-700">2. Product lineup — ductless & ducted</a>
              <a href="#reliability" className="text-teal-600 hover:text-teal-700">3. Reliability data</a>
              <a href="#comfort-app" className="text-teal-600 hover:text-teal-700">4. The 2025 Comfort app disaster</a>
              <a href="#warranty" className="text-teal-600 hover:text-teal-700">5. Diamond Contractor warranty explained</a>
              <a href="#pricing" className="text-teal-600 hover:text-teal-700">6. Pricing & cost comparison</a>
              <a href="#best-for" className="text-teal-600 hover:text-teal-700">7. Who should buy Mitsubishi?</a>
              <a href="#vs-daikin" className="text-teal-600 hover:text-teal-700">8. Mitsubishi vs. Daikin mini-splits</a>
              <a href="#faq" className="text-teal-600 hover:text-teal-700">9. FAQ</a>
            </div>
          </nav>

          <section className="prose prose-lg max-w-none">

            {/* Section 1 */}
            <div id="company" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Company Background & METUS Structure</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Mitsubishi Electric Corporation (Tokyo Stock Exchange: 6503) is a publicly traded Japanese multinational with 149,914 employees and approximately $36 billion in annual revenue as of FY2025. Established in 1921, its HVAC division manufactures globally with engineering headquarters in Kobe, Japan.
              </p>

              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm font-semibold text-teal-800 mb-1">METUS — the US entity</p>
                <p className="text-sm text-gray-700">Mitsubishi Electric equipment in the US is sold through <strong>Mitsubishi Electric Trane HVAC US LLC (METUS)</strong> — a 50/50 joint venture between Mitsubishi Electric US, Inc. and Trane Technologies plc, formed in May 2018. METUS is headquartered in Suwanee, Georgia. This joint venture means Trane authorized dealers also carry Mitsubishi products — under three co-branded badges: "Mitsubishi Electric," "Trane®/Mitsubishi Electric," and "American Standard®/Mitsubishi Electric." The hardware is identical regardless of badge.</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Manufacturing:</strong> Unlike Daikin, Goodman, and Rheem — which have significant US manufacturing facilities — Mitsubishi Electric does NOT have a major US residential HVAC manufacturing plant. Most residential units are manufactured in Japan and imported. This makes Mitsubishi more exposed to tariff and supply chain volatility than domestically manufactured brands.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Market position:</strong> Mitsubishi Electric dominates the North American residential mini-split market with approximately <strong>23% market share</strong> and ~25% annual growth. In the ductless segment specifically, it's the premium benchmark — the brand that contractors cite when they say "gold standard" for mini-splits. This dominance comes with a significant price premium over all other brands.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Effective July 1, 2026, Mitsubishi Electric restructured all North American operations under a new umbrella entity — Mitsubishi Electric US, Inc. — consolidating previously separate group companies. METUS (the HVAC JV) remains a separate entity under this restructuring.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 2 */}
            <div id="models" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Product Lineup — Ductless & Ducted (2025–2026)</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                All current Mitsubishi Electric residential systems use <strong>R-32</strong> refrigerant — the same choice as Daikin, Goodman, and Amana. Mitsubishi transitioned to R-32 well ahead of the US EPA AIM Act deadline, leveraging their global R-32 expertise. No Mitsubishi residential products use R-454B.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Model</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Max SEER2</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">H2i®</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelLineup.map((m, i) => (
                      <tr key={m.model} className={i === 0 ? 'bg-teal-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-900">{m.model}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{m.name}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600 text-xs">{m.type}</td>
                        <td className={`border border-gray-200 px-4 py-3 font-bold ${i === 0 ? 'text-teal-700' : 'text-teal-600'}`}>{m.seer2}</td>
                        <td className="border border-gray-200 px-4 py-3 text-xs text-gray-700">{m.hyper}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600 text-xs">{m.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-teal-800 mb-1">MSZ-FS — the efficiency record holder</p>
                <p className="text-sm text-gray-700">The MSZ-FS06NA (6,000 BTU single-zone) achieves <strong>32.2 SEER2</strong> — the highest certified residential SEER2 of any product from any brand in the US market as of 2026. This is verified against the AHRI directory, not marketing peak figures. The MSZ-FS includes Mitsubishi's 3D i-see Sensor® for occupancy-based temperature management, dual-vane airflow, dual barrier coating for durability, and triple filtration. It requires Diamond Contractor installation for the 12-year warranty.</p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">H2i Hyper-Heat — The Cold Climate Advantage</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Mitsubishi's H2i® (Hyper Heat Inverter) technology is the feature that defines the brand in cold-climate markets. Key specifications:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-1 text-sm text-gray-700">
                <li><strong>100% rated heating capacity at 5°F</strong> — most heat pumps de-rate significantly at this temperature</li>
                <li><strong>Minimum heating operating temperature: -13°F (-25°C)</strong> — the benchmark against which all other cold-climate mini-splits are measured</li>
                <li>This capability makes Mitsubishi the dominant choice for New England, upper Midwest, mountain west, and Canadian border states where winter temperatures regularly drop below 0°F</li>
                <li>Daikin's new FIT AURORA (2026) extends to -20°F for whole-home ducted heat pump applications — but for ductless, Mitsubishi H2i remains the established leader</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">SVZ-NL — The Whole-Home Ducted Solution</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The SVZ-NL multi-position air handler deserves special attention because it bridges ductless technology with traditional forced-air systems. It pairs with Mitsubishi outdoor units and works with existing ductwork in upflow, downflow, or horizontal configurations from 1 to 5 tons. For homeowners who want Mitsubishi's efficiency and cold-climate performance but have existing ducts they want to keep, the SVZ-NL is the answer — not a separate central AC system. Efficiency reaches up to 20.2 SEER2.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 3 */}
            <div id="reliability" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Reliability Data</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-lg font-bold text-teal-600 mb-1">Top-Rated</p>
                  <p className="text-sm font-semibold text-gray-700">Consumer Reports</p>
                  <p className="text-xs text-gray-500 mt-1">Ductless category — alongside Daikin</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600 mb-1">~23%</p>
                  <p className="text-sm font-semibold text-gray-700">US Mini-Split Share</p>
                  <p className="text-xs text-gray-500 mt-1">Dominant market position</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600 mb-1">15–20+</p>
                  <p className="text-sm font-semibold text-gray-700">Years lifespan</p>
                  <p className="text-xs text-gray-500 mt-1">Inverter compressor reduces wear</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Mitsubishi Electric is consistently one of the highest-rated mini-split brands in Consumer Reports surveys for predicted reliability and owner satisfaction — alongside Daikin. Among HVAC contractors, the phrase "Mitsubishi is the gold standard for ductless" appears consistently across HVAC-Talk.com, Reddit r/HVAC, and contractor forum discussions. This contractor endorsement is meaningful because it reflects real-world field experience, not just marketing.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                The primary contractor concern about Mitsubishi is not reliability but <strong>parts cost and availability</strong>. Mitsubishi inverter boards run $400–$1,200+; compressors run $800–$2,500+. Parts are available only through Mitsubishi-authorized channels — not general wholesale like Goodman, not even as broadly as Carrier. In rural markets with limited Mitsubishi presence, sourcing a specific part can take days and cost significantly more than equivalent components for other brands.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                The MXZ multi-zone systems also carry a serviceability note: multi-zone Mitsubishi systems are more diagnostically complex than single-zone, and not all HVAC technicians have the training to diagnose them correctly. If you're installing a multi-zone system, verify your Diamond Contractor's specific multi-zone experience — not just Diamond certification.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 4 */}
            <div id="comfort-app" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. The 2025 Comfort App Disaster — What Happened</h2>

              <div className="border border-red-200 rounded-lg p-5 bg-red-50 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">March 25, 2025 — Mitsubishi replaced kumo cloud with the Comfort app. It did not go well.</p>
                    <p className="text-sm text-gray-700 mb-3">The kumo cloud to Comfort app migration affected thousands of existing Mitsubishi owners simultaneously. The documented failures, drawn from Reddit r/Kumo_Cloud (hundreds of comments), Medium, GitHub, and r/homeassistant:</p>
                    <ul className="text-sm text-gray-700 space-y-1.5 list-disc pl-4">
                      <li>Units showing as <strong>"Off"</strong> in the app while physically running</li>
                      <li>Temperature readings showing <strong>86°F when the room was 65°F</strong></li>
                      <li>"Works with Google" and HomeKit integrations <strong>broken for months</strong></li>
                      <li>Home Assistant integration (hass-kumo) broken; local API disrupted — affecting thousands of home automation setups</li>
                      <li>Scheduled events not triggering correctly</li>
                      <li>Units requiring <strong>full breaker resets</strong> to reconnect after software failures</li>
                      <li>Features removed vs. kumo cloud, including whole-home temperature setting</li>
                    </ul>
                    <p className="text-sm text-gray-700 mt-3">In April 2025, a class action law firm publicly solicited affected customers citing "warranty violations and deceptive marketing" related to the software update. Some stability was achieved by late 2025, but the episode remains a significant documented failure in Mitsubishi's product history.</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>What this means for buyers in 2026:</strong> Verify the current Comfort app status before purchasing, particularly if smart home integration (Google Home, Apple HomeKit, Home Assistant, Amazon Alexa) is important to you. The hardware itself was unaffected — cooling and heating continued to work normally through physical controls and the wired remote. The problem was entirely in the cloud/app layer.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                If local control and home automation integration are priorities, ask your Diamond Contractor specifically about the current state of Comfort app third-party integrations before signing. For buyers who don't use smart home platforms or app-based control, this issue is essentially irrelevant to day-to-day comfort.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 5 */}
            <div id="warranty" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. The Diamond Contractor Warranty — Industry-Leading With a Geographic Catch</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Mitsubishi's warranty structure is the best in the ductless category when the Diamond Contractor condition is met — and significantly weaker when it isn't.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Installation Scenario</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Parts</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Compressor</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Labor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warrantyTable.map((row, i) => (
                      <tr key={row.scenario} className={i === 0 ? 'bg-teal-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900 text-xs">{row.scenario}</td>
                        <td className={`border border-gray-200 px-4 py-3 font-semibold ${i === 0 ? 'text-teal-700' : 'text-red-600'}`}>{row.parts}</td>
                        <td className={`border border-gray-200 px-4 py-3 font-semibold ${i === 0 ? 'text-teal-700' : 'text-red-600'}`}>{row.compressor}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700 text-xs">{row.labor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5 mb-6">
                <p className="text-sm font-bold text-red-800 mb-2">⚠️ The Diamond Contractor warranty gap — up to 7 years of lost coverage</p>
                <p className="text-sm text-gray-700 mb-2">Without a Diamond Contractor, your warranty drops from <strong>12 years</strong> to just <strong>5 years parts / 7 years compressor</strong>. That's a loss of 7 years of parts coverage and 5 years of compressor coverage. In dollar terms, this can represent $3,000–$5,000+ in potential repair exposure beyond year 7. As one Diamond Elite contractor put it: <em>"Without Diamond, that gap can mean $3,000–$5,000."</em></p>
                <p className="text-sm text-gray-700"><strong>In major metro areas</strong> (Boston, New York, Chicago, Seattle, Denver, LA), Diamond Contractors are widely available. <strong>In rural markets</strong>, coverage can be thin or nonexistent — leaving buyers stuck with 5/7-year coverage regardless of how much they paid. Always verify Diamond Contractor status at <strong>mitsubishicomfort.com</strong> before committing.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-teal-800 mb-1">90-day registration window</p>
                  <p className="text-sm text-gray-700">Must register within 90 days of installation at mitsubishicomfort.com to activate extended warranty. Unit must be in a single-family residential home. Must be original owner.</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-amber-800 mb-1">Labor warranty is paid, not free</p>
                  <p className="text-sm text-gray-700">Unlike Lennox (free 3-year labor at registration), Mitsubishi's labor warranty is an optional paid contract through Diamond Contractors. Even Diamond Elite contractors charge for labor coverage — it starts around 5 years from most. Factor this into total cost.</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                The June 1, 2026 warranty statement (current as of this review) is available at <strong>mitsubishicomfort.com/warranties</strong>. Always download and read the current version — Mitsubishi has updated warranty terms multiple times, and 47 different warranty statement versions exist on their website for different installation dates.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 6 */}
            <div id="pricing" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Pricing & Cost Comparison (2026)</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Mitsubishi is the most expensive residential mini-split brand in the US — commanding a 30–50% premium over Daikin and 50–100%+ over MrCool or DIY brands. This premium reflects genuine engineering quality, cold-climate performance, and brand reputation. Whether it reflects value depends on your specific use case.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Configuration</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Installed Range (2026)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tonnagePricing.map((p, i) => (
                      <tr key={p.config} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{p.config}</td>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-teal-700">{p.installed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 italic mb-6">Source: PickHVAC, NearbyHunt, industry averages 2025–2026. Wide ranges reflect system complexity, zone count, and regional labor rates.</p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Mitsubishi vs. Competing Mini-Split Brands</h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Brand</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Max SEER2</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Min Heating Temp</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">3-Zone Installed</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Diamond/Special Req.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitorComparison.map((c, i) => (
                      <tr key={c.brand} className={c.highlight ? 'bg-teal-50 font-medium' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-900">{c.brand}{c.highlight ? ' ★' : ''}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{c.maxSeer2}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{c.minTemp}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{c.price3zone}</td>
                        <td className="border border-gray-200 px-4 py-3 text-xs text-gray-700">{c.diamondReq}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Distribution:</strong> Mitsubishi is the most dealer-restricted brand in the mini-split space — exclusively through authorized METUS distributors and Diamond Contractors. No Home Depot, no Amazon, no wholesale. Internet purchases void the warranty. This restriction is by design: it protects installation quality and supports the Diamond Contractor network.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 7 */}
            <div id="best-for" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Who Should Buy Mitsubishi Electric?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border-2 border-teal-400 rounded-lg p-5 bg-teal-50">
                  <h3 className="text-lg font-bold text-teal-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />Mitsubishi is the right choice if you...
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>Are in a cold climate</strong> (Climate Zones 5–7; New England, upper Midwest, Mountain West) — H2i Hyper-Heat at -13°F is the established cold-climate standard</li>
                    <li>• <strong>Want maximum SEER2</strong> — 32.2 SEER2 on the MSZ-FS is the highest verified residential rating in the US market</li>
                    <li>• <strong>Have strong local Diamond Contractor access</strong> — this is the prerequisite for realizing the full 12-year warranty value</li>
                    <li>• <strong>Are doing a single-zone application</strong> — bedroom, addition, sunroom, garage, ADU, bonus room — Mitsubishi single-zone with Diamond Contractor gives you the best warranty coverage in the ductless category</li>
                    <li>• <strong>Prioritize quiet operation</strong> — some Mitsubishi indoor units operate as low as 19 dB(A), among the quietest residential HVAC available</li>
                    <li>• <strong>Are in a home without ductwork</strong> and want the most reliable, efficient solution available regardless of cost</li>
                  </ul>
                </div>
                <div className="border-2 border-gray-300 rounded-lg p-5 bg-gray-50">
                  <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-gray-500" />Consider alternatives if you...
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>Need central AC</strong> — Mitsubishi doesn't sell it. Go to Trane, Carrier, Goodman, Daikin, or Rheem for split-system central AC</li>
                    <li>• <strong>Are in a rural market</strong> with no local Diamond Contractor — you'll get only 5/7-year coverage at Mitsubishi's premium price point</li>
                    <li>• <strong>Are budget-constrained</strong> — Daikin delivers comparable cold-climate performance at 30–50% lower installed cost; Friedrich/Rheem Floating Air Premier reaches 33.1 SEER2 at lower cost</li>
                    <li>• <strong>Rely heavily on smart home integration</strong> — research the current Comfort app status carefully given the 2025 rollout problems</li>
                    <li>• <strong>Want manufacturer-included free labor coverage</strong> — Mitsubishi's labor warranty is paid only, even with Diamond Contractors</li>
                    <li>• <strong>Want whole-home cold-climate heat pump to -20°F</strong> — Daikin FIT AURORA reaches -20°F for ducted whole-home applications, exceeding Mitsubishi's -13°F H2i rating</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 8 */}
            <div id="vs-daikin" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Mitsubishi vs. Daikin Mini-Splits</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                This is the most common premium mini-split comparison. Both are R-32, both are Japanese-engineered, both are top-rated in Consumer Reports ductless surveys. The differences are real and situational.
              </p>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-5 mb-6">
                <p className="text-sm font-semibold text-teal-800 mb-3">When Mitsubishi wins:</p>
                <ul className="text-sm text-gray-700 space-y-1 list-disc pl-4 mb-4">
                  <li>Cold climates below -4°F — Mitsubishi H2i to -13°F vs. Daikin AURORA standard to -4°F (FIT AURORA to -20°F, but that's ducted whole-home)</li>
                  <li>Maximum single-zone SEER2 — 32.2 (MSZ-FS) vs. Daikin AURORA at ~21 SEER2</li>
                  <li>Brand cachet and contractor familiarity in premium markets</li>
                  <li>MXZ multi-zone system depth and zone count options</li>
                </ul>
                <p className="text-sm font-semibold text-teal-800 mb-3">When Daikin wins:</p>
                <ul className="text-sm text-gray-700 space-y-1 list-disc pl-4">
                  <li>Price — 30–50% less than Mitsubishi for comparable systems</li>
                  <li>Warranty without dealer restriction — 12-year parts without needing a "Diamond" equivalent</li>
                  <li>Rural market access — Daikin Comfort Pro network is more accessible than Diamond Contractors in thin markets</li>
                  <li>Whole-home cold-climate heat pump — FIT AURORA to -20°F for ducted applications has no Mitsubishi equivalent in central heating</li>
                  <li>Thermostat ecosystem — Daikin One+ issues exist but the platform is less dramatically troubled than Mitsubishi's 2025 app migration</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                The practical conclusion for most buyers: if you're in a cold climate and have a strong local Diamond Contractor, Mitsubishi justifies its premium through H2i performance, the 12-year warranty, and proven long-term reliability. If you're in a moderate climate, on a tighter budget, or in a market with thin Diamond Contractor coverage, Daikin AURORA delivers 80%+ of the performance at 60–70% of the cost.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* FAQ */}
            <div id="faq" className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Frequently Asked Questions</h2>
              <div className="space-y-5">
                {[
                  { q: "Does Mitsubishi Electric make central air conditioners?", a: "No. Mitsubishi Electric does not sell conventional central split-system air conditioners. They sell ductless mini-splits (wall-mount, cassette, floor-mount, concealed duct) and the SVZ-NL ducted mini-split air handler (which works with existing ductwork). If you need to replace a traditional central AC system and keep your ductwork, look at Trane, Carrier, Lennox, Goodman, Daikin, or Rheem — or the Mitsubishi SVZ-NL if you want Mitsubishi technology with existing ducts." },
                  { q: "What is a Mitsubishi Diamond Contractor?", a: "A Diamond Contractor is a Mitsubishi-certified HVAC installer who has completed factory training and meets ongoing installation volume requirements. Without a Diamond Contractor, your warranty drops from 12 years (parts and compressor) to 5 years (parts) and 7 years (compressor) — a loss of up to 7 years of coverage worth potentially thousands of dollars. Diamond Elite is the highest tier, offering additional training and sometimes labor warranty options. Always verify Diamond status at mitsubishicomfort.com before signing." },
                  { q: "What happened to kumo cloud?", a: "Mitsubishi replaced the kumo cloud app with the Comfort app in March 2025. The rollout was widely described as disastrous — units showing incorrect status, temperature misreadings, smart home integrations broken for months, and Home Assistant local API disrupted. A class action law firm solicited affected customers in April 2025. Some stability was achieved by late 2025. If smart home control matters to you, research the current Comfort app status before purchasing." },
                  { q: "Is Mitsubishi better than Daikin for mini-splits?", a: "For cold climates: Mitsubishi H2i at -13°F leads (though Daikin FIT AURORA hits -20°F for whole-home ducted). For SEER2: Mitsubishi MSZ-FS at 32.2 leads. For price: Daikin wins by 30–50%. For warranty without dealer restriction: Daikin wins. For rural market access: Daikin wins. For single-zone efficiency in cold climates with a strong local dealer: Mitsubishi is worth the premium. In all other scenarios, Daikin delivers more value per dollar." },
                  { q: "How much does Mitsubishi installation cost?", a: "Single-zone systems run approximately $2,000–$5,000 installed for 9,000–12,000 BTU units and $4,000–$7,000 for 2-ton single-zone. Multi-zone systems run $6,000–$12,000 for 2-zone, $8,000–$15,000 for 3-zone, and $12,000–$20,000+ for 4–5 zone configurations. Mitsubishi commands a 30–50% premium over comparable Daikin systems." },
                  { q: "What refrigerant does Mitsubishi use?", a: "R-32 — the same choice as Daikin, Goodman, and Amana. Mitsubishi transitioned to R-32 well ahead of the EPA AIM Act deadline. R-32 costs roughly 6x less to service per pound than R-454B (used by Carrier, Trane, Lennox, and Rheem) in 2026 — a meaningful ongoing service cost advantage." },
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">See How Much a Mitsubishi Mini-Split Saves vs. Window Units or Central AC</h3>
            <p className="text-gray-600 mb-4 text-sm">Enter your current system's SEER and a Mitsubishi system's SEER2 to calculate annual electricity savings at your local rate.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
              <Calculator className="w-4 h-4" />
              Calculate My Savings
            </Link>
          </div>

          {/* Related */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Related</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/brands/daikin" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">Daikin AC Review 2026</p>
                <p className="text-xs text-gray-500 mt-1">Best Mitsubishi alternative, 30–50% less</p>
              </Link>
              <Link to="/brands/trane" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">Trane AC Review 2026</p>
                <p className="text-xs text-gray-500 mt-1">If you need central AC instead</p>
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
