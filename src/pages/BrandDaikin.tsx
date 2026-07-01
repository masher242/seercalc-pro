import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock, CheckCircle2, AlertCircle, Star } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';

const modelLineup = [
  { model: 'DX9VC / DC9VS', tier: 'Ultra-Premium', compressor: 'Variable-Speed Inverter', seer2: 'Up to 24.5', refrigerant: 'R-32', note: 'Top central AC; ComfortNet compatible' },
  { model: 'DX7TC / DC7TC', tier: 'Premium', compressor: 'Two-Stage', seer2: '~19.0', refrigerant: 'R-32', note: '' },
  { model: 'DX6VS / DC6VS', tier: 'Premium', compressor: 'Variable-Speed', seer2: '~19.0', refrigerant: 'R-32', note: 'FIT platform' },
  { model: 'DX5SE / DC5SE', tier: 'Mid', compressor: 'Single-Stage (high-eff)', seer2: '15.2', refrigerant: 'R-32', note: '' },
  { model: 'DX4SE / DC4SE', tier: 'Entry', compressor: 'Single-Stage', seer2: '~15.2', refrigerant: 'R-32', note: 'Verify refrigerant — some legacy R-410A SKUs remain' },
  { model: 'DX3SE / DC3SE', tier: 'Base', compressor: 'Single-Stage', seer2: '~14.5', refrigerant: 'R-32', note: 'Base efficiency' },
];

const fitAurora = { model: 'DH9VS (FIT AURORA)', tier: 'Premium Heat Pump', compressor: 'Variable-Speed Inverter', seer2: 'Up to 21.0', hspf2: '10.0', refrigerant: 'R-32', minTemp: '-20°F heating', note: 'DOE Cold Climate HP Challenge compliant; launched AHR Expo Jan 2026' };

const warrantyTable = [
  { product: 'Premium central AC (DC9VS, DC6VS, DX9VC, DH9VS, DZ6VS, DX5SE, DX7TC)', parts: '12 years', unitReplacement: '12 years', labor: 'Asure plan (paid)', unregistered: '5 years' },
  { product: 'Mid-tier central AC (DC5SE, DC4SE, DX4SE, DX3SE)', parts: '12 years', unitReplacement: '6 years', labor: 'Asure plan (paid)', unregistered: '5 years' },
  { product: 'Entry AC (DX4SQ, DC3SQ, DC4SQ)', parts: '12 years', unitReplacement: 'Not offered', labor: 'Asure plan (paid)', unregistered: '5 years' },
  { product: 'Premium mini-splits (AURORA R-32, ATMOSPHERA, MXM R-32)', parts: '12 years', unitReplacement: 'N/A', labor: 'Asure plan (paid)', unregistered: '5 years' },
  { product: 'Standard mini-splits (POLARA, ENTRA, VISTA, EMURA)', parts: '10 years', unitReplacement: 'N/A', labor: 'Asure plan (paid)', unregistered: '5 years' },
];

const tonnagePricing = [
  { tons: '2 ton', installed: '$4,200–$7,500' },
  { tons: '2.5 ton', installed: '$4,500–$7,800' },
  { tons: '3 ton', installed: '$5,000–$8,500' },
  { tons: '3.5 ton', installed: '$5,100–$9,000' },
  { tons: '4 ton', installed: '$5,500–$9,500' },
  { tons: '5 ton', installed: '$6,500–$11,000' },
];

const brandComparison = [
  { factor: 'Max SEER2 (central AC)', daikin: '24.5 (DX9VC)', goodman: '17.2 (R-32)', amana: 'Similar to Goodman', trane: '23.6 (XV20i)' },
  { factor: 'Refrigerant', daikin: 'R-32 (all new)', goodman: 'R-32 (all new)', amana: 'R-32 (all new)', trane: 'R-454B' },
  { factor: 'Parts warranty (registered)', daikin: '12 years', goodman: '10 years', amana: '10 years', trane: '10 years' },
  { factor: 'Unit replacement warranty', daikin: '12 yr (premium) / 6 yr (mid)', goodman: '10 yr (select models)', amana: 'Varies — verify 2025 changes', trane: 'Not offered' },
  { factor: 'Labor warranty', daikin: 'Asure plan (paid)', goodman: 'None', amana: 'None', trane: 'None' },
  { factor: 'Warranty transfer', daikin: 'FL, GA, TX (mandatory); others no', goodman: 'No', amana: 'Varies', trane: 'Yes ($99)' },
  { factor: 'Installed price vs. Goodman', daikin: '+30–40%', goodman: 'Baseline', amana: '+5–10%', trane: '+30–50%' },
  { factor: 'Annual maintenance req\'d for warranty', daikin: 'Yes (unit replacement clause)', goodman: 'No', amana: 'No', trane: 'No' },
];

export default function BrandDaikin() {
  return (
    <>
      <Helmet>
        <title>Daikin AC Review 2026: Best Warranty, R-32 Advantage & FIT AURORA Heat Pump | seercalc.pro</title>
        <meta name="description" content="Daikin AC review 2026: world's largest HVAC maker, 12-year parts and unit replacement warranty, R-32 refrigerant advantage, new FIT AURORA cold-climate heat pump. $4,200–$11,000+ installed. Full honest review." />
        <meta name="keywords" content="Daikin AC review 2026, Daikin FIT AURORA review, Daikin vs Goodman, Daikin warranty 2026, Daikin DX9VC review, Daikin reliability, best Daikin air conditioner 2026" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://seercalc.pro/brands/daikin" />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://seercalc.pro/brands/daikin" />
        <meta property="og:title" content="Daikin AC Review 2026: Best Warranty, R-32 Advantage & FIT AURORA" />
        <meta property="og:description" content="World's largest HVAC maker. 12-year parts + unit replacement warranty. R-32 refrigerant costs ~6x less to service than R-454B brands. New FIT AURORA cold-climate heat pump to -20°F. Full honest 2026 review." />
        <meta property="og:image" content="https://seercalc.pro/images/brands/daikin-review-og.png" />
        <meta property="article:author" content="The Efficiency Hub" />
        <meta property="article:section" content="Brand Reviews" />
        <meta property="article:tag" content="Daikin" />
        <meta property="article:tag" content="HVAC" />
        <meta property="article:tag" content="Air Conditioner Review" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://seercalc.pro/brands/daikin" />
        <meta name="twitter:title" content="Daikin AC Review 2026: Best Warranty & R-32 Advantage" />
        <meta name="twitter:description" content="World's largest HVAC maker. 12-year parts + unit replacement warranty. R-32 refrigerant ~6x cheaper to service. FIT AURORA to -20°F. Full 2026 review." />
        <meta name="twitter:image" content="https://seercalc.pro/images/brands/daikin-review-og.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "Daikin Air Conditioner Review 2026",
            "reviewBody": "Daikin is the world's largest HVAC manufacturer by revenue (~$31B) and the parent company of Goodman and Amana. All three brands are manufactured at the same 4.2 million sq ft Waller, Texas facility. Daikin is the premium tier — priced 30–40% above Goodman for the same factory origin. Key advantages: 12-year parts + 12-year unit replacement warranty (best standard warranty in the category), R-32 refrigerant (~$449/20 lbs vs. R-454B at $700–$2,800), DX9VC up to 24.5 SEER2, new FIT AURORA cold-climate heat pump to -20°F. Key trade-offs: annual maintenance required to preserve unit replacement warranty, Daikin One+ thermostat has documented temperature inaccuracy issues, dealer network thinner than Goodman in some regions. $8.5M CPSC civil fine in June 2026 for delayed PTAC safety disclosure.",
            "author": { "@type": "Organization", "name": "The Efficiency Hub", "url": "https://seercalc.pro" },
            "publisher": { "@type": "Organization", "name": "seercalc.pro", "logo": { "@type": "ImageObject", "url": "https://seercalc.pro/logo.png" } },
            "itemReviewed": {
              "@type": "Product",
              "name": "Daikin Air Conditioners",
              "brand": { "@type": "Brand", "name": "Daikin" },
              "manufacturer": { "@type": "Organization", "name": "Daikin Comfort Technologies North America" }
            },
            "reviewRating": { "@type": "Rating", "ratingValue": "4.2", "bestRating": "5", "worstRating": "1" }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is Daikin a good air conditioner brand?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Daikin is the world's largest HVAC manufacturer by revenue (~$31B globally) and manufactures all of its North American residential equipment at the same Waller, Texas facility as Goodman and Amana. The 12-year parts plus 12-year unit replacement warranty is the best standard warranty in the major HVAC category. R-32 refrigerant costs roughly 6x less to service than R-454B brands (Carrier, Trane, Lennox) in 2026. The DX9VC flagship reaches 24.5 SEER2. Trade-offs: annual maintenance is required to preserve the unit replacement warranty, the Daikin One+ thermostat has documented temperature inaccuracy issues, and the dealer network is thinner than Goodman's open wholesale model in some areas."
                }
              },
              {
                "@type": "Question",
                "name": "Is Daikin the same as Goodman?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "They share the same parent company (Daikin Industries) and the same manufacturing facility (Daikin Texas Technology Park, Waller, TX), but they are not identical products. Daikin is the premium tier — higher-end models, stronger warranty (12-year vs. 10-year), tighter dealer network, and 30–40% higher installed cost. Goodman is the budget/value tier with open wholesale distribution. Think of it this way: same factory, different tier positioning, different price points."
                }
              },
              {
                "@type": "Question",
                "name": "What is Daikin's warranty in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Daikin offers 12-year parts and 12-year unit replacement warranty on premium models when registered within 60 days. Mid-tier models get 12-year parts and 6-year unit replacement. Entry models get 12-year parts only (no unit replacement). Labor is NOT included in any standard warranty — Asure extended service plans add labor coverage at additional cost. Critical fine print: the 12-year unit replacement warranty requires documented annual maintenance. California, Florida, Georgia (new Jan 2026), and Quebec receive full coverage without registration."
                }
              },
              {
                "@type": "Question",
                "name": "What is the Daikin FIT AURORA heat pump?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Daikin FIT AURORA (DH9VS) is a new cold-climate residential heat pump launched at the AHR Expo in January 2026. It uses R-32 refrigerant, reaches up to 21.0 SEER2 and 10.0 HSPF2, and is rated for heating operation down to -20°F — meeting the DOE Cold Climate Heat Pump Challenge requirements. Available in 2–5 ton configurations, it's a direct competitor to Mitsubishi's Hyper-Heat systems for cold-climate whole-home heat pump applications."
                }
              },
              {
                "@type": "Question",
                "name": "Does Daikin have any recalls in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The most significant 2026 regulatory action is a $8.5 million CPSC civil fine against Daikin Comfort Technologies for failing to promptly report a safety hazard in PTAC (commercial through-wall) equipment with DigiAir modules between 2017 and 2023 — despite receiving warranty claims and fire reports. This involved commercial PTAC equipment, not residential split-system central AC. Separately, two 2024 CPSC recalls affected Daikin/Goodman/Amana branded products: a June 2024 packaged unit electrical recall (12,100 units) and a June 2024 FIT/Goodman SD heat pump software recall (56,000 units). Verify at daikincomfort.com/product-recalls."
                }
              },
              {
                "@type": "Question",
                "name": "Does Daikin need annual maintenance to keep the warranty?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes — for the 12-year unit replacement warranty specifically. Daikin requires documented annual maintenance to activate a unit replacement claim. The 12-year parts warranty does not have this requirement, but the unit replacement provision does. Keep all annual maintenance receipts for the life of the system if you want to preserve this coverage. This is a meaningful fine-print condition that most buyers don't know until they need to make a claim."
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Daikin Air Conditioners: 2026 Review</h1>
            <p className="text-xl text-gray-600">The world's largest HVAC manufacturer — same Waller, TX factory as Goodman and Amana, but with the best standard warranty in the category, R-32 refrigerant advantage, and the new FIT AURORA cold-climate heat pump</p>
          </header>

          {/* Quick Answer */}
          <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg mb-8">
            <p className="text-sm font-semibold text-teal-800 uppercase tracking-wide mb-2">Quick Answer</p>
            <p className="text-gray-800"><strong>Daikin is the premium tier above Goodman and Amana</strong> — same Waller, Texas factory, stronger warranty, higher price. The <strong>12-year parts + 12-year unit replacement warranty</strong> is the best standard coverage of any major HVAC brand. R-32 refrigerant costs ~6x less to service than R-454B brands in 2026. The DX9VC flagship reaches <strong>24.5 SEER2</strong>. The new <strong>FIT AURORA</strong> cold-climate heat pump operates to -20°F. Installed costs run <strong>$4,200–$11,000+</strong> — 30–40% above Goodman for the same factory origin. <strong>Key trap:</strong> annual maintenance documentation required to activate the unit replacement warranty. <strong>Best for:</strong> long-stay homeowners, California/Florida/Georgia buyers (no registration needed), cold-climate heat pump buyers.</p>
          </div>

          {/* Scorecard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <div className="flex justify-center mb-2">
                {[1,2,3,4].map(s => <Star key={s} className="w-4 h-4 fill-teal-500 text-teal-500" />)}
                <Star className="w-4 h-4 text-gray-300" />
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Reliability</p>
              <p className="text-xs text-gray-500 mt-1">Premium tier; improving</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">24.5</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Max SEER2</p>
              <p className="text-xs text-gray-500 mt-1">DX9VC flagship</p>
            </div>
            <div className="bg-teal-50 rounded-lg p-4 text-center border border-teal-200">
              <p className="text-2xl font-bold text-teal-600">12 yr</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Parts + Unit Replacement</p>
              <p className="text-xs text-gray-500 mt-1">Best standard warranty in category</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">-20°F</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">FIT AURORA</p>
              <p className="text-xs text-gray-500 mt-1">Cold-climate heat pump (2026)</p>
            </div>
          </div>

          {/* TOC */}
          <nav className="bg-gray-50 rounded-lg p-5 mb-10 border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">In this review:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
              <a href="#company" className="text-teal-600 hover:text-teal-700">1. Company background & Goodman relationship</a>
              <a href="#models" className="text-teal-600 hover:text-teal-700">2. Model lineup & FIT AURORA</a>
              <a href="#refrigerant" className="text-teal-600 hover:text-teal-700">3. R-32 refrigerant advantage</a>
              <a href="#reliability" className="text-teal-600 hover:text-teal-700">4. Reliability & known issues</a>
              <a href="#warranty" className="text-teal-600 hover:text-teal-700">5. Warranty — best in class with a catch</a>
              <a href="#pricing" className="text-teal-600 hover:text-teal-700">6. Pricing & cost comparison</a>
              <a href="#vs-siblings" className="text-teal-600 hover:text-teal-700">7. Daikin vs. Goodman vs. Amana</a>
              <a href="#best-for" className="text-teal-600 hover:text-teal-700">8. Who should buy Daikin?</a>
              <a href="#faq" className="text-teal-600 hover:text-teal-700">9. FAQ</a>
            </div>
          </nav>

          <section className="prose prose-lg max-w-none">

            {/* Section 1 */}
            <div id="company" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Company Background & The Goodman Relationship</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Daikin Industries, Ltd. is the world's largest HVAC manufacturer by revenue — approximately $31 billion globally as of FY2024, with operations in 90+ countries. In 2012, Daikin acquired Goodman Global Group for $3.7 billion, instantly becoming the dominant force in North American residential HVAC. Today, Daikin's North American operations generate more revenue than any other single Daikin entity worldwide.
              </p>

              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm font-semibold text-teal-800 mb-1">Daikin, Goodman, and Amana — same factory, different tiers</p>
                <p className="text-sm text-gray-700">All three brands are manufactured at the <strong>Daikin Texas Technology Park in Waller, Texas</strong> — a 4.2 million square foot facility, one of the largest HVAC manufacturing plants in the United States. The brand structure is a deliberate tiering strategy: Goodman (budget/value), Amana (mid), Daikin (premium). If you're paying the Daikin premium, you're paying for stronger warranty terms, a tighter dealer network, and higher-end model specifications — not a fundamentally different factory or build quality at the base level.</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                The US subsidiary — <strong>Daikin Comfort Technologies North America (DCT NA)</strong> — was formally renamed from Goodman Global Group in April 2022, signaling Daikin's intent to build the Daikin brand alongside Goodman in North America. The company operates approximately 350+ distribution locations and employs 22,000+ across US group companies.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Notable 2024 milestone: Daikin signed a 15-year naming rights deal for the Houston Astros stadium, now called <strong>Daikin Park</strong> (effective January 1, 2025, estimated at ~$12–13M/year). A significant brand-building investment that signals how seriously Daikin is pursuing North American consumer recognition for the Daikin name specifically.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 2 */}
            <div id="models" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Model Lineup & the FIT AURORA (2025–2026)</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                All current Daikin residential equipment uses <strong>R-32</strong> refrigerant — a strategic choice that differentiates Daikin (and its siblings Goodman and Amana) from Carrier, Trane, Lennox, and Rheem, which all chose R-454B. The refrigerant implications are covered in Section 3.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Model</th>
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
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{m.tier}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700 text-xs">{m.compressor}</td>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-teal-700">{m.seer2}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600 text-xs">{m.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm font-semibold text-amber-800 mb-1">DX4SE refrigerant — verify before ordering</p>
                <p className="text-sm text-gray-700">The DX4SE entry model had some legacy R-410A SKUs still listed on Daikin's website as of 2025. With the EPA AIM Act prohibiting new R-410A manufacture after January 1, 2025, any R-410A unit remaining is legacy inventory. Verify the specific SKU's refrigerant on the nameplate or AHRI listing before signing a contract.</p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">FIT AURORA (DH9VS) — The 2026 Cold-Climate Story</h3>
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-5 mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-teal-600">{fitAurora.seer2}</p>
                    <p className="text-xs text-gray-500">Max SEER2</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-teal-600">{fitAurora.hspf2}</p>
                    <p className="text-xs text-gray-500">HSPF2</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-teal-600">{fitAurora.minTemp}</p>
                    <p className="text-xs text-gray-500">Min heating temp</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-teal-600">R-32</p>
                    <p className="text-xs text-gray-500">Refrigerant</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">Launched at the AHR Expo in January 2026, the Daikin FIT AURORA is Daikin's direct answer to Mitsubishi's Hyper-Heat for whole-home cold-climate heat pump applications. Available in 2–5 ton configurations, it meets the DOE Cold Climate Heat Pump Challenge specification (-20°F heating capability) and uses R-32 refrigerant. It's a side-discharge compact design (the "FIT" platform), making it easier to install in tight spaces. This is the most significant new Daikin product launch for residential buyers in 2026.</p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Mini-Splits</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Daikin's residential mini-split lineup runs from the budget POLARA/ENTRA/VISTA at ~16 SEER (10-year warranty) through the premium AURORA Hyper-Heat series at up to 21 SEER2 (12-year warranty). The AURORA Wall Mount and AURORA MXT multi-zone are the strongest performers in the lineup. Daikin's website markets "up to 27.4 SEER2" for mini-splits — verify the specific model's AHRI-certified rating rather than relying on marketing peak figures.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 3 */}
            <div id="refrigerant" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. The R-32 Refrigerant Advantage</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Daikin's global expertise in R-32 — they've been manufacturing R-32 equipment globally for over a decade — led them to choose R-32 for all North American residential transitions rather than R-454B. The practical difference for US buyers in 2026 is significant.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">R-32 (Daikin / Goodman / Amana)</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Cost: ~<strong>$449 per 20-lb cylinder</strong> (May 2025)</li>
                    <li>• GWP: 675 (meets EPA &lt;700 requirement)</li>
                    <li>• Single-component — easier to recycle and reclaim</li>
                    <li>• Stable supply chain — no documented 2025 shortage</li>
                    <li>• Daikin's global manufacturing scale = cost stability</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">R-454B (Carrier / Trane / Lennox / Rheem)</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Cost: <strong>$700–$2,800 per 20-lb cylinder</strong> (2025–2026)</li>
                    <li>• GWP: 466 (lower than R-32 on this metric)</li>
                    <li>• Blend of R-32 + R-1234yf — harder to recycle</li>
                    <li>• Industry-wide supply shortage documented in 2025</li>
                    <li>• Honeywell added 42% surcharge in 2026</li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                The ~6x cost difference on refrigerant has a direct impact on any service call involving refrigerant recovery and recharge. On a system that develops a coil leak in year 4 — a scenario documented for multiple brands — the Daikin/R-32 system costs hundreds of dollars less to remediate than an R-454B equivalent, even before labor. Over a 15–20 year ownership period, this advantage can compound meaningfully if any refrigerant work is required.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Daikin's Chief Sales Officer stated at the AHR Expo 2026: <em>"In the last year, R-32 has fulfilled its promise as a single component refrigerant that's easy to recycle, cost effective, and available."</em> The supply chain stability point is real — while Carrier, Trane, and Lennox dealers reported R-454B availability challenges in 2025, Daikin/Goodman/Amana dealers reported no comparable R-32 shortage.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 4 */}
            <div id="reliability" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Reliability & Known Issues</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Consumer Reports does not consistently publish a standalone Daikin residential reliability score the way it does for Trane (5/5) or Carrier (4/5). Daikin is generally well-regarded among trained Daikin Comfort Pro installers, particularly for the FIT platform and AURORA series. BBB rating for Daikin Comfort Manufacturing: 3.68/5.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Expected lifespan: <strong>12–18 years</strong> with proper annual maintenance per industry consensus. The field contractor sentiment on Daikin is favorable among those trained on the platform — R-32 service economics drew positive comments from technicians as of mid-2026, contrasting with frustration over R-454B availability at other brands.
              </p>

              <div className="space-y-4 mb-6">
                <div className="border border-amber-200 rounded-lg p-5 bg-amber-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Daikin One+ Thermostat Temperature Inaccuracy — Most Documented Issue</p>
                      <p className="text-sm text-gray-700">The Daikin One+ thermostat, required for full variable-speed functionality on FIT systems, has a well-documented temperature inaccuracy problem. Multiple Reddit threads describe calibration inconsistencies: <em>"Sometimes 2 degrees off, occasionally up to 8 degrees off."</em> Dealer thermostat replacements have not resolved the issue for some users — <em>"replaced by the dealer… still has this weird inconsistent offset."</em> The problem is persistent enough that it appears in multiple independent complaint threads spanning 2022–2026. Like Lennox's iComfort dependency, this thermostat lock-in means you cannot easily swap to a more accurate third-party thermostat without losing variable-speed control.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-amber-200 rounded-lg p-5 bg-amber-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">FIT E7 Communication Error / Control Board Thermal Failure</p>
                      <p className="text-sm text-gray-700">Some Daikin FIT systems have experienced E7 communication errors — the system going offline and requiring restart. Root cause in documented cases: control board thermal failure. Replacing shielded communication wire did not resolve the issue in at least one documented case; control board replacement was required. This is not a widespread systematic failure but is worth monitoring in the first 2–3 years post-installation.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-red-200 rounded-lg p-5 bg-red-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">$8.5 Million CPSC Civil Fine (June 2026) — PTAC Commercial Equipment</p>
                      <p className="text-sm text-gray-700 mb-2">Daikin Comfort Technologies settled with the CPSC for <strong>$8.5 million</strong> in June 2026 for failure to promptly report a safety hazard in PTAC (packaged terminal air conditioner) equipment with DigiAir modules. Daikin received warranty claims and fire reports from 2017 to 2023 — over 12 fire incidents — without filing a timely CPSC report. The settlement imposes an internal compliance monitor, enhanced controls, and annual CPSC reporting.</p>
                      <p className="text-sm text-gray-700"><strong>Important scope clarification:</strong> This involved commercial/hotel PTAC units (through-wall window-style units), NOT residential split-system central AC. It's material for brand risk assessment but doesn't directly indicate a defect in residential products.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-amber-200 rounded-lg p-5 bg-amber-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">2024 CPSC Recalls — Packaged Units & FIT Heat Pumps</p>
                      <p className="text-sm text-gray-700">Two June 2024 recalls affected Daikin-branded products: (1) ~12,100 Daikin/Amana/Goodman packaged air conditioning units recalled for incorrect electrical rating labels creating a fire hazard from incorrect wiring; (2) ~56,000 Daikin FIT / Amana / Goodman SD heat pumps recalled for a software issue causing the unit to provide heating when set to cooling after a power interruption. Both recalls had remedies (free repair for #1; software update for #2). Verify your specific unit at <strong>daikincomfort.com/product-recalls</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 5 */}
            <div id="warranty" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Warranty — Best in Class, With an Important Catch</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Daikin's standard warranty is the strongest of any major HVAC brand — 12-year parts plus 12-year unit replacement on premium models, when registered within 60 days. No other brand in this category offers unit replacement coverage extending to 12 years as a standard warranty term.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Product</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Parts (registered)</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Unit Replacement</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Labor</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Unregistered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warrantyTable.map((w, i) => (
                      <tr key={w.product} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700 text-xs">{w.product}</td>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-teal-700">{w.parts}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{w.unitReplacement}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600 text-xs">{w.labor}</td>
                        <td className="border border-gray-200 px-4 py-3 text-red-600">{w.unregistered}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5 mb-6">
                <p className="text-sm font-bold text-red-800 mb-2">⚠️ Critical fine print: Annual maintenance required for unit replacement</p>
                <p className="text-sm text-gray-700">Daikin's 12-year unit replacement warranty requires <strong>documented annual maintenance</strong> to activate a unit replacement claim. This is stated in Daikin's warranty footnotes but is not prominently marketed. Keep every annual maintenance receipt for the life of the system. If you skip a year and the compressor fails in year 10, Daikin can deny the unit replacement claim — leaving you with parts-only coverage. This is the most important warranty fine print of any major HVAC brand.</p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Registration & State Exemptions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-red-800 mb-1">⚠️ Register within 60 days</p>
                  <p className="text-sm text-gray-700">Clock starts at first energization (turn-on). Without registration: parts coverage drops to 5 years; unit replacement not available. Register at <strong>goodmanmfg.com/product-registration</strong> (same portal for Daikin residential).</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-teal-800 mb-1">No registration needed in 4 states</p>
                  <p className="text-sm text-gray-700"><strong>California</strong> (since 2004), <strong>Florida</strong> (since July 2024), <strong>Georgia</strong> (since January 2026 — newly added), and <strong>Quebec</strong> receive full coverage automatically — no registration required.</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Warranty Transfer</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Daikin's standard warranty does NOT automatically transfer to subsequent homeowners — except in <strong>Florida</strong> (units installed July 2023+), <strong>Georgia</strong> (Jan 2026+), and <strong>Texas</strong> (Sept 2021+), where transfer is mandatory by state law. For all other states, the warranty stays with the original buyer. This is a meaningful weakness vs. Carrier (transferable with notice) and Lennox (basic warranty transfers).
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Asure Labor Coverage:</strong> Labor is not included in any standard Daikin warranty. The Asure extended service plan — available in 6-year or 12-year labor + parts extensions, only through Authorized Asure Dealers — is the only path to labor coverage. Factor this into your total cost comparison.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 6 */}
            <div id="pricing" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Pricing & Cost Comparison (2026)</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Daikin is positioned as a <strong>premium brand</strong> — approximately 30–40% above Goodman and 10–15% above Carrier and Trane for comparable systems. This premium reflects stronger warranty terms and the Daikin brand tier, not a fundamentally different manufacturing origin.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Tonnage</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Installed Range</th>
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
              <p className="text-xs text-gray-500 italic mb-6">Source: PickHVAC, HVACGist 2025–2026. Standard installation on existing ductwork.</p>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Where units are sold:</strong> Daikin uses a dealer-only distribution model with approximately 350+ distribution locations. No big-box retail, no Amazon, no online purchase (warranty voided on internet-purchased units not installed by a licensed dealer). This is more restrictive than Goodman's open wholesale model but less restrictive than Lennox's Premier Dealer-only channel.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 7 */}
            <div id="vs-siblings" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Daikin vs. Goodman vs. Amana</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                This is the comparison that determines whether the Daikin premium is worth it, since all three share the same factory.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Factor</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Daikin</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Goodman</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Amana</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Trane (comparison)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brandComparison.map((row, i) => (
                      <tr key={row.factor} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.factor}</td>
                        <td className="border border-gray-200 px-4 py-3 text-teal-700 font-medium text-xs">{row.daikin}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700 text-xs">{row.goodman}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700 text-xs">{row.amana}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600 text-xs">{row.trane}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-teal-800 mb-1">When is the Daikin premium worth it over Goodman?</p>
                <p className="text-sm text-gray-700">The 12-year unit replacement warranty (vs. Goodman's 10-year on select models) is the clearest justification — particularly if you plan to stay in the home 10–15 years and will document annual maintenance. The 24.5 SEER2 DX9VC also exceeds Goodman's 17.2 SEER2 ceiling significantly at the premium tier. If you want maximum efficiency from the Daikin family without paying Lennox or Trane prices, Daikin's DX9VC is a compelling option. If budget matters and you'll maintain the system, Goodman delivers 80% of the value at 60–70% of the cost.</p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 8 */}
            <div id="best-for" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Who Should Buy Daikin?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border-2 border-teal-400 rounded-lg p-5 bg-teal-50">
                  <h3 className="text-lg font-bold text-teal-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />Daikin is the right choice if you...
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Are a long-stay homeowner (12+ years) who will document annual maintenance — the 12-year unit replacement warranty is genuinely exceptional</li>
                    <li>• Are in California, Florida, Georgia, or Quebec — you get full warranty coverage without registration paperwork</li>
                    <li>• Want cold-climate heat pump capability — the new FIT AURORA to -20°F competes directly with Mitsubishi Hyper-Heat at a potentially lower installed cost</li>
                    <li>• Want the R-32 service cost advantage without the Goodman budget positioning — Daikin gives you the same refrigerant economics at a premium tier</li>
                    <li>• Are in a hot/humid climate and want high efficiency — the DX9VC at 24.5 SEER2 is competitive with Trane's best at a similar price point</li>
                    <li>• Have access to a strong local Daikin Comfort Pro dealer with Asure plan availability</li>
                  </ul>
                </div>
                <div className="border-2 border-gray-300 rounded-lg p-5 bg-gray-50">
                  <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-gray-500" />Consider alternatives if you...
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Can't commit to annual documented maintenance — the unit replacement warranty's biggest advantage disappears without service records</li>
                    <li>• Are budget-constrained — Goodman delivers very similar hardware at 30–40% lower cost; the Daikin badge premium is hard to justify on a tight budget</li>
                    <li>• Are buying a rental property — Goodman's open wholesale distribution is a better fit for investment property service flexibility</li>
                    <li>• Are concerned about the Daikin One+ thermostat accuracy issues — documented and persistent for some users</li>
                    <li>• Need coastal salt-spray optimized coil — Trane's Spine Fin 2,000-hour rating is a documented advantage for oceanfront properties</li>
                    <li>• Want warranty transferability in a non-mandatory state — Daikin doesn't transfer standard warranty outside FL/GA/TX</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* FAQ */}
            <div id="faq" className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Frequently Asked Questions</h2>
              <div className="space-y-5">
                {[
                  { q: "Is Daikin the same as Goodman?", a: "They share the same parent company (Daikin Industries) and the same Waller, Texas factory, but they are different product tiers. Daikin is the premium brand — stronger warranty (12-year vs. 10-year), higher-end model specs (DX9VC at 24.5 SEER2 vs. Goodman's 17.2 SEER2 R-32 ceiling), tighter dealer network, and 30–40% higher installed cost. Same factory origin, meaningfully different product positioning." },
                  { q: "What is Daikin's warranty in 2026?", a: "12-year parts + 12-year unit replacement on premium models when registered within 60 days. Mid-tier models: 12-year parts + 6-year unit replacement. Entry models: 12-year parts only. Labor is NOT included — Asure extended service plans add labor coverage (paid, through Authorized Asure Dealers only). Critical fine print: the 12-year unit replacement warranty requires documented annual maintenance to activate." },
                  { q: "Does the Daikin warranty require annual maintenance?", a: "Yes — for the unit replacement provision specifically. The 12-year unit replacement warranty requires documented annual maintenance records. Skip a maintenance year and Daikin can deny a unit replacement claim. The parts warranty doesn't have this requirement, but the unit replacement — the most valuable part of the Daikin warranty advantage — does. Keep every maintenance receipt for the life of the system." },
                  { q: "What is the Daikin FIT AURORA?", a: "The FIT AURORA (DH9VS) is Daikin's new cold-climate residential heat pump launched at AHR Expo in January 2026. It reaches up to 21.0 SEER2 / 10.0 HSPF2, uses R-32 refrigerant, and is rated for heating operation down to -20°F — meeting the DOE Cold Climate Heat Pump Challenge specification. Available in 2–5 ton configurations, it competes directly with Mitsubishi Hyper-Heat for whole-home cold-climate applications." },
                  { q: "Is Daikin better than Trane?", a: "It depends on what matters to you. Daikin's warranty is stronger (12-year unit replacement vs. Trane's none). Daikin's R-32 refrigerant is cheaper to service. Trane's Spine Fin coil has a documented coastal durability advantage (2,000-hour salt spray vs. Daikin's standard spec). Trane scores 5/5 on Consumer Reports predicted reliability — Daikin doesn't have a published equivalent score. Pricing is comparable at equivalent tiers. The Daikin One+ thermostat accuracy issue is a real trade-off vs. Trane's communicating platform." },
                  { q: "Which Daikin states don't require warranty registration?", a: "California (since 2004), Florida (since July 2024), Georgia (newly added January 1, 2026), and Quebec receive full warranty coverage automatically — no registration required. If you're in one of these states, the 60-day registration deadline is irrelevant to your coverage." },
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">Calculate Savings with a Daikin System</h3>
            <p className="text-gray-600 mb-4 text-sm">Enter your current SEER and a Daikin system's SEER2 to see annual savings at your local electricity rate — and whether the Daikin premium pays back.</p>
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
                <p className="text-xs text-gray-500 mt-1">Same factory, budget price</p>
              </Link>
              <Link to="/brands/trane" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">Trane AC Review 2026</p>
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
