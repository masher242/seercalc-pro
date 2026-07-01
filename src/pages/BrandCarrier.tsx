import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock, CheckCircle2, AlertCircle, Star } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';

const modelLineup = [
  { series: '26VNA1', name: 'Infinity 21', tier: 'Premier', compressor: 'Variable-speed Greenspeed®', seer2: 'Up to 21.0', sound: '55 dBA', note: 'Flagship; ComfortLink II; 25–100% capacity' },
  { series: '26TPA8', name: 'Performance 18', tier: 'Mid', compressor: 'Two-stage (100%/75%)', seer2: 'Up to 18.0', sound: '67 dBA', note: 'Also available in Coastal SKU' },
  { series: '26SPA6', name: 'Performance 16', tier: 'Mid-entry', compressor: 'Single-stage', seer2: 'Up to 16.5', sound: '67 dBA', note: 'ENERGY STAR certified' },
  { series: '26SCA5', name: 'Comfort 16', tier: 'Entry', compressor: 'Single-stage', seer2: '13.8–17.0', sound: '—', note: 'Also available in Coastal SKU' },
  { series: '26SCA4', name: 'Comfort 14', tier: 'Budget entry', compressor: 'Single-stage', seer2: '14.3–16.0', sound: '—', note: 'Minimum efficiency baseline' },
];

const tonnagePricing = [
  { tons: '2 ton', equipmentOnly: '$2,800–$4,400', installed: '$3,900–$5,900' },
  { tons: '3 ton', equipmentOnly: '$3,300–$5,200', installed: '$4,500–$7,300' },
  { tons: '4 ton', equipmentOnly: '$4,000–$6,600', installed: '$5,400–$8,400' },
  { tons: '5 ton', equipmentOnly: '$4,700–$7,700', installed: '$5,900–$9,600' },
];

const competitorComparison = [
  { brand: 'Goodman', entry: '$3,500–$5,500', mid: '$5,000–$7,000', premium: '$7,000–$9,500', tier: 'Budget' },
  { brand: 'Bryant', entry: '$3,500–$5,500', mid: '$4,200–$7,500', premium: '$5,200–$10,000', tier: 'Premium-lite', note: 'Same hardware, 10–15% less' },
  { brand: 'Rheem', entry: '$3,800–$5,800', mid: '$5,500–$7,500', premium: '$7,500–$10,000', tier: 'Mid' },
  { brand: 'Carrier', entry: '$3,900–$6,500', mid: '$6,500–$10,000', premium: '$10,000–$15,000', tier: 'Premium', highlight: true },
  { brand: 'Trane', entry: '$4,881–$6,546', mid: '$6,481–$8,496', premium: '$8,860–$10,414', tier: 'Premium' },
  { brand: 'Lennox', entry: '$5,000–$7,000', mid: '$7,500–$11,000', premium: '$11,000–$17,000', tier: 'Ultra-premium' },
];

const warrantyComparison = [
  { factor: 'Parts (registered)', carrier: '10 years (Option A)', trane: '10 years', lennox: '10–12 years', goodman: '10 years' },
  { factor: 'Registration window', carrier: '90 days (best in class)', trane: '60 days', lennox: '60 days', goodman: '60 days' },
  { factor: 'Labor warranty', carrier: 'Yes — Option B (5yr parts + 3yr labor)', trane: 'No', lennox: 'Yes (3yr free)', goodman: 'No' },
  { factor: 'Unit replacement', carrier: 'No', trane: 'No', lennox: 'No', goodman: '10 years (select models)' },
  { factor: 'Warranty transfer', carrier: 'Yes (within 90 days of home sale)', trane: 'Yes ($99)', lennox: 'Partial', goodman: 'No' },
];

export default function BrandCarrier() {
  return (
    <>
      <Helmet>
        <title>Carrier AC Review 2026: Reliability, Pricing, Models & Warranty | seercalc.pro</title>
        <meta name="description" content="Carrier air conditioner review 2026: 4/5 Consumer Reports reliability, $3,900–$10,000+ installed, unique Consumer Choice warranty with optional labor coverage, known Infinity board failure issues. Is Carrier worth it?" />
        <meta name="keywords" content="Carrier AC review 2026, Carrier Infinity review, Carrier vs Trane, Carrier air conditioner price, Carrier warranty 2026, is Carrier a good brand, Carrier Infinity 26VNA1" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://seercalc.pro/brands/carrier" />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://seercalc.pro/brands/carrier" />
        <meta property="og:title" content="Carrier AC Review 2026: Reliability, Pricing, Models & Warranty" />
        <meta property="og:description" content="Is Carrier worth the premium in 2026? Full review with real pricing, model lineup, Consumer Choice warranty details, known Infinity board issues, and who should (and shouldn't) buy Carrier." />
        <meta property="og:image" content="https://seercalc.pro/images/brands/carrier-review-og.png" />
        <meta property="article:author" content="The Efficiency Hub" />
        <meta property="article:section" content="Brand Reviews" />
        <meta property="article:tag" content="Carrier" />
        <meta property="article:tag" content="HVAC" />
        <meta property="article:tag" content="Air Conditioner Review" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://seercalc.pro/brands/carrier" />
        <meta name="twitter:title" content="Carrier AC Review 2026: Reliability, Pricing & Warranty" />
        <meta name="twitter:description" content="Is Carrier worth the premium in 2026? Full review with pricing, Infinity model details, Consumer Choice warranty, and known issues." />
        <meta name="twitter:image" content="https://seercalc.pro/images/brands/carrier-review-og.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "Carrier Air Conditioner Review 2026",
            "reviewBody": "Carrier earns Consumer Reports 4/5 predicted reliability and 5/5 owner satisfaction. Its unique Consumer Choice warranty lets buyers choose between a 10-year parts-only warranty or a 5-year parts + 3-year labor warranty — the only major brand offering manufacturer labor coverage as a standard option. Known issues include expensive Infinity inverter board failures, aluminum condenser coil fragility, and warranty denial from missed registration. Pricing runs $3,900–$10,000+ installed for central AC. Bryant offers identical hardware at 10–15% less.",
            "author": { "@type": "Organization", "name": "The Efficiency Hub", "url": "https://seercalc.pro" },
            "publisher": { "@type": "Organization", "name": "seercalc.pro", "logo": { "@type": "ImageObject", "url": "https://seercalc.pro/logo.png" } },
            "itemReviewed": {
              "@type": "Product",
              "name": "Carrier Air Conditioners",
              "brand": { "@type": "Brand", "name": "Carrier" },
              "manufacturer": { "@type": "Organization", "name": "Carrier Global Corporation" }
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
                "name": "Is Carrier a good air conditioner brand?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Carrier earns Consumer Reports 4/5 predicted reliability and 5/5 owner satisfaction — strong scores, one notch below Trane's 5/5. Carrier invented modern air conditioning in 1902 and remains one of the most respected brands in the industry. Its unique Consumer Choice warranty (option to include 3 years of labor coverage) is a genuine advantage no other major brand matches. Main trade-offs: expensive Infinity inverter board failures ($7,000+ documented), aluminum coil fragility, and a strict 90-day registration requirement."
                }
              },
              {
                "@type": "Question",
                "name": "How much does a Carrier AC cost in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Carrier central air conditioner costs $3,900–$6,500 installed for entry-tier (Comfort series), $6,500–$10,000 for mid-tier (Performance series), and $10,000–$15,000+ for the premium Infinity series. Carrier does not publish official MSRP — all pricing comes from third-party aggregators. Bryant, which uses identical Carrier hardware, typically costs 10–15% less installed."
                }
              },
              {
                "@type": "Question",
                "name": "What is Carrier's warranty in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Carrier's Consumer Choice warranty gives you two options when registering within 90 days: Option A (10-year parts, no labor) or Option B (5-year parts + 3-year labor — requires dealer enrollment in the Consumer Choice program). Without registration, warranty drops to 5 years parts-only. The 90-day window is the longest among major brands. Labor is NOT covered under Option A — the standard for most installs."
                }
              },
              {
                "@type": "Question",
                "name": "What are the most common Carrier AC problems?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The most commonly reported Carrier issues are: (1) Infinity series inverter board failures — documented at $7,000+ to replace on older units; (2) refrigerant leaks at both condenser and evaporator coils on newer Infinity units; (3) aluminum condenser coil fragility — cannot be brazed, requires full coil replacement; (4) communication wire failures on Infinity communicating systems; (5) warranty denial from missed 90-day registration window, with one documented case costing $13,000+ out of pocket."
                }
              },
              {
                "@type": "Question",
                "name": "Is Carrier better than Trane?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It depends on your priorities. Trane scores 5/5 vs. Carrier's 4/5 on Consumer Reports predicted reliability, and Trane's Spine Fin all-aluminum coil has a better salt spray rating for coastal climates (2,000 hours vs. Carrier's 1,000). But Carrier has better parts availability in many US markets, a longer 90-day registration window vs. Trane's 60 days, and the Consumer Choice Option B labor warranty that Trane doesn't offer. Pricing is nearly identical — within 2% on comparable 3-ton systems."
                }
              },
              {
                "@type": "Question",
                "name": "Should I buy Carrier or Bryant?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bryant uses identical Carrier hardware from the same Indianapolis and Collierville, TN factories at 10–15% lower installed cost. If your area has strong Bryant dealers, Bryant is almost always the smarter financial choice — same equipment, same reliability, lower price. The only case where Carrier specifically makes more sense: if your local Carrier dealer is clearly superior to Bryant options, or if you want the Carrier brand name for resale purposes."
                }
              },
              {
                "@type": "Question",
                "name": "Does the Carrier Infinity system require special installation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The Carrier Infinity communicating system (variable-speed Greenspeed compressor, Evolution control, ComfortLink II thermostat) is significantly more complex than standard HVAC. Bad installation by an under-trained contractor can ruin an Infinity system. Always use a Carrier Factory Authorized Dealer (FAD) for Infinity installations — and ask specifically about their experience with communicating systems. The Performance and Comfort series are less installation-sensitive."
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Carrier Air Conditioners: 2026 Review</h1>
            <p className="text-xl text-gray-600">The brand that invented air conditioning — reliability data, pricing, Consumer Choice warranty, and what the Infinity system actually costs when it breaks</p>
          </header>

          {/* Quick Answer */}
          <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg mb-8">
            <p className="text-sm font-semibold text-teal-800 uppercase tracking-wide mb-2">Quick Answer</p>
            <p className="text-gray-800"><strong>Carrier is a premium-tier brand</strong> with Consumer Reports 4/5 predicted reliability and 5/5 owner satisfaction. Installed costs run <strong>$3,900–$15,000+</strong> depending on series. The standout feature is the <strong>Consumer Choice warranty</strong> — the only major brand letting you choose 3 years of labor coverage at registration. Main trade-offs: Infinity inverter board failures can cost $7,000+, aluminum coil fragility on newer units, and a strict 90-day registration window you cannot miss. <strong>Important:</strong> Bryant uses identical hardware for 10–15% less. <strong>Best for:</strong> Multi-zone installs, coastal climates, buyers who want manufacturer labor coverage.</p>
          </div>

          {/* Scorecard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <div className="flex justify-center mb-2">
                {[1,2,3,4].map(s => <Star key={s} className="w-4 h-4 fill-teal-500 text-teal-500" />)}
                <Star className="w-4 h-4 text-gray-300" />
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Reliability</p>
              <p className="text-xs text-gray-500 mt-1">Consumer Reports 4/5</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">21.0</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Max SEER2</p>
              <p className="text-xs text-gray-500 mt-1">Infinity 26VNA1</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">90 days</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Registration</p>
              <p className="text-xs text-gray-500 mt-1">Longest window in category</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-teal-600">15–18</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">Lifespan (yrs)</p>
              <p className="text-xs text-gray-500 mt-1">With maintenance</p>
            </div>
          </div>

          {/* TOC */}
          <nav className="bg-gray-50 rounded-lg p-5 mb-10 border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">In this review:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
              <a href="#company" className="text-teal-600 hover:text-teal-700">1. Company background</a>
              <a href="#models" className="text-teal-600 hover:text-teal-700">2. Model lineup & SEER2 ratings</a>
              <a href="#reliability" className="text-teal-600 hover:text-teal-700">3. Reliability data</a>
              <a href="#issues" className="text-teal-600 hover:text-teal-700">4. Known issues & complaints</a>
              <a href="#warranty" className="text-teal-600 hover:text-teal-700">5. Consumer Choice warranty explained</a>
              <a href="#pricing" className="text-teal-600 hover:text-teal-700">6. Pricing & cost comparison</a>
              <a href="#refrigerant" className="text-teal-600 hover:text-teal-700">7. R-454B transition</a>
              <a href="#best-for" className="text-teal-600 hover:text-teal-700">8. Who should buy Carrier?</a>
              <a href="#vs-trane" className="text-teal-600 hover:text-teal-700">9. Carrier vs. Trane vs. Bryant</a>
              <a href="#faq" className="text-teal-600 hover:text-teal-700">10. FAQ</a>
            </div>
          </nav>

          <section className="prose prose-lg max-w-none">

            {/* Section 1 */}
            <div id="company" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Company Background</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Willis Carrier invented modern air conditioning in 1902. Carrier Engineering Corporation was formally incorporated in 1915, eventually becoming part of United Technologies Corporation (UTC). On April 3, 2020, Carrier spun off from UTC as an independent public company — <strong>Carrier Global Corporation (NYSE: CARR)</strong>, headquartered in Palm Beach Gardens, Florida with 2025 revenues of $21.75 billion.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Carrier's recent corporate moves tell an important story. Between 2023 and 2026, the company sold its fire and security divisions, commercial refrigeration, and other non-HVAC businesses — divesting over $10 billion in assets — while simultaneously acquiring <strong>Viessmann Climate Solutions</strong> for €12 billion (Europe's leading residential heat pump maker). The result: Carrier is now a pure-play climate company entirely focused on HVAC.
              </p>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm font-semibold text-amber-800 mb-1">The Bryant relationship — know this before shopping</p>
                <p className="text-sm text-gray-700"><strong>Bryant is Carrier's value-tier brand.</strong> Same factory (Indianapolis, IN and Collierville, TN), same core components (WeatherArmor™ cabinet, DuraGuard™ protection, Puron Advance™ R-454B refrigerant), same parent company. Bryant Evolution = Carrier Infinity hardware at 10–15% lower installed cost. Also under the Carrier umbrella: Payne, Heil, Tempstar, Comfortmaker, Day & Night, and KeepRite — all using shared manufacturing. If your local Bryant dealer is as strong as your Carrier dealer, Bryant is almost always the smarter financial decision.</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Primary manufacturing: Indianapolis, Indiana (gas furnaces — 550,000 sq ft, 1,500+ employees, up to 5,000 furnaces per day) and Collierville, Tennessee (residential air conditioners and heat pump condensing units). Carrier notes that "the majority of our manufacturing takes place in Indianapolis and Collierville, Tennessee."
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 2 */}
            <div id="models" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Model Lineup & SEER2 Ratings (2025–2026)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Carrier organizes its residential central AC lineup into three tiers: <strong>Infinity</strong> (premium, variable-speed), <strong>Performance</strong> (mid-range, two-stage), and <strong>Comfort</strong> (entry, single-stage). All current 2025–2026 models use R-454B (Puron Advance™) refrigerant.
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
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Sound</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelLineup.map((m, i) => (
                      <tr key={m.series} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-900 text-xs">{m.series}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{m.name}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{m.tier}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700 text-xs">{m.compressor}</td>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-teal-700">{m.seer2}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600 text-xs">{m.sound}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-blue-800 mb-1">Important: Coastal SKUs available</p>
                <p className="text-sm text-gray-700">Carrier offers dedicated <strong>Coastal SKU variants</strong> of the Performance 18 (26TPA8***C) and Comfort 16 (26SCA5***C) with hardened WeatherArmor cabinets for salt-air environments. These are standard catalogue items — no special order required. If you're in Florida, the Gulf Coast, or the Carolinas, ask your dealer specifically about coastal variants.</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-blue-800 mb-1">SEER2 varies by matched system — always verify</p>
                <p className="text-sm text-gray-700">The Comfort 16 (26SCA5) spans <strong>13.8–17.0 SEER2 depending on tonnage and matched indoor coil</strong>. Always ask your contractor for the AHRI Reference Number for your specific outdoor + indoor combination. That number at <a href="https://www.ahridirectory.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">ahridirectory.org</a> is the binding SEER2 rating for any rebate or certification purposes.</p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Heat Pumps & Mini-Splits</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Carrier's heat pump lineup includes the <strong>Infinity 23 (27VNA3)</strong> at 23 SEER2 / 10 HSPF2 and the <strong>Infinity 21 Ultimate Cold-Climate (27VNA1)</strong> at 21.2 SEER2 / 10.5 HSPF2 with heating rated to -10°F. A new <strong>Performance Series Variable Speed Heat Pump</strong> launched at IBS February 2026 — up to 19.0 SEER2, heating to -10°F, as quiet as 57 dBA.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Unlike Trane (which sells Mitsubishi mini-splits through METUS), Carrier manufactures its own ductless equipment. The 2025 lineup is fully transitioned to R-454B, with the Infinity single-zone reaching <strong>28.5 SEER2</strong> at the top end. All Infinity mini-splits include refrigerant leak detection sensors.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 3 */}
            <div id="reliability" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Reliability Data</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-teal-600 mb-1">4/5</p>
                  <p className="text-sm font-semibold text-gray-700">Consumer Reports</p>
                  <p className="text-xs text-gray-500 mt-1">Predicted reliability (Trane scores 5/5)</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-teal-600 mb-1">5/5</p>
                  <p className="text-sm font-semibold text-gray-700">Owner Satisfaction</p>
                  <p className="text-xs text-gray-500 mt-1">Tied with Trane for top score</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-teal-600 mb-1">2×</p>
                  <p className="text-sm font-semibold text-gray-700">Best HVAC (US News)</p>
                  <p className="text-xs text-gray-500 mt-1">2024 and 2025 consecutive awards</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                The 4/5 Consumer Reports predicted reliability score reflects historical repair rates across thousands of subscriber-reported units. That one-point gap from Trane's 5/5 is real but shouldn't be overstated — Carrier is genuinely above-average reliability. The 5/5 owner satisfaction score tells the other side: people who own Carrier systems are happy with them.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                The split between predicted reliability (4/5) and owner satisfaction (5/5) makes sense in context: Carrier's Infinity communicating systems are complex and can be expensive to repair when they fail, but when they're working correctly, owners love the comfort, quietness, and efficiency they deliver. The issue is what happens when something goes wrong — which is covered in the next section.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                On parts availability, Carrier has a meaningful advantage over Trane in many US markets. Multiple contractor reports from 2025–2026 explicitly cite Carrier's better parts distribution compared to Trane's proprietary parts challenges. This matters practically: faster repairs, less downtime, more competitive labor costs.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Expected lifespan:</strong> 15–18 years with annual maintenance, per industry consensus. Carrier's own website states "15 years or longer."
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 4 */}
            <div id="issues" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Known Issues & Complaints</h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                These are the issues most consistently appearing in contractor forums, Reddit's r/HVAC and r/hvacadvice, and direct Carrier product reviews — not isolated incidents, but recurring patterns worth understanding before purchasing.
              </p>

              <div className="space-y-4 mb-6">
                <div className="border border-red-200 rounded-lg p-5 bg-red-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Infinity Inverter Board Failures — Most Expensive Issue</p>
                      <p className="text-sm text-gray-700">The Carrier Infinity variable-speed inverter board is the single most expensive documented failure point. A 2022 Reddit post documented an 11-year-old Infinity heat pump where both the main inverter board and compressor failed simultaneously — the board alone was quoted at <strong>$7,000</strong> (it was ~$1,000 when the unit was new). A separate June 2026 thread describes compressor and control board failure on a <strong>5-year-old unit</strong>, with the HVAC company recommending full replacement. These failures are not universal — but they represent the tail-risk scenario that a missed warranty registration makes catastrophically expensive.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-red-200 rounded-lg p-5 bg-red-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Warranty Denial from Missed Registration — Documented $13,000 Case</p>
                      <p className="text-sm text-gray-700">This is the most avoidable Carrier-specific risk. One documented r/hvacadvice thread describes a homeowner who missed the registration window (contractor failed to register). Carrier denied the full warranty. The repair quote: ~$9,000 for the board + $4,000 for the compressor = approximately $13,000 out of pocket, plus labor. The lesson: <strong>register yourself within 90 days</strong>. Don't trust your contractor to do it. Set a phone calendar reminder the day the unit is turned on.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-amber-200 rounded-lg p-5 bg-amber-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Aluminum Condenser Coil Fragility</p>
                      <p className="text-sm text-gray-700">A May 2026 review on Carrier's own 26VNA1 product page describes an aluminum condenser coil that began leaking within 2 months of installation. The technician's assessment: the aluminum tubing "cannot be fixed by brazing because cheap aluminum is used on this coil — must replace the entire condensing coil." Aluminum coil fragility is an industry-wide issue, not Carrier-specific — but it's worth understanding that a coil failure on a newer Infinity unit may require full coil replacement rather than a localized repair.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-amber-200 rounded-lg p-5 bg-amber-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Refrigerant Leaks (Multiple Events on Same Unit)</p>
                      <p className="text-sm text-gray-700">One Carrier 26VNA1 product page review documents a unit serviced 5 times in its first year — twice for leaks at the condensing unit, three times for evaporator leaks. This appears to be a minority of units, but the pattern of recurring leaks on the same system is worth flagging. Verify with your installer what their process is if a refrigerant leak recurs after repair.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Communication Wire & System Complexity (Infinity Series)</p>
                      <p className="text-sm text-gray-700">Infinity communicating systems add communication wire as a separate failure mode independent of the boards themselves. One documented 2024 thread describes a circuit board failure (May 2022) followed by a communication wire failure (October 2023) on the same Infinity system. The complexity of communicating systems is the cost of their capability — they deliver better performance but have more failure points than simpler equipment.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Framing note:</strong> Carrier's 4/5 Consumer Reports reliability and 5/5 owner satisfaction scores reflect the broad population of owners, most of whom don't experience these failure scenarios. The issues above are real and documented — but they represent the tail of the distribution, not the typical ownership experience. The concern isn't that Carrier systems commonly fail; it's that when Infinity systems fail, they can be very expensive to fix.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 5: Warranty */}
            <div id="warranty" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. The Consumer Choice Warranty — Carrier's Biggest Differentiator</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Carrier's Consumer Choice warranty is unique among major HVAC brands: when you register within 90 days, you choose between two options. This choice matters more than most buyers realize.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-teal-50 border-2 border-teal-400 rounded-lg p-5">
                  <p className="text-sm font-bold text-teal-800 uppercase tracking-wide mb-3">Option A — Parts Only</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ <strong>10 years</strong> parts coverage</li>
                    <li>✗ No labor coverage</li>
                    <li>✓ Available from any Carrier dealer</li>
                    <li>✓ Transferable (within 90 days of home sale)</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">Most common choice. You pay labor out-of-pocket on warranty repairs.</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-5">
                  <p className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-3">Option B — Parts + Labor</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ <strong>5 years</strong> parts coverage</li>
                    <li>✓ <strong>3 years</strong> labor coverage</li>
                    <li>⚠️ Only if your dealer is enrolled in Consumer Choice program</li>
                    <li>✓ Transferable</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">Only available through enrolled dealers — ask in writing before signing.</p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-red-800 mb-1">⚠️ Critical: 90-day registration window</p>
                <p className="text-sm text-gray-700">The clock starts when the unit is <strong>first turned on</strong>, not when you sign the contract. Miss the 90-day window and your warranty drops to 5 years parts-only with no option for labor coverage — and no exceptions. Register yourself at carrier.com; don't rely on your contractor. The $13,000 out-of-pocket documented case above was entirely caused by a missed registration.</p>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Factor</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Carrier</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Trane</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Lennox</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Goodman</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warrantyComparison.map((row, i) => (
                      <tr key={row.factor} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.factor}</td>
                        <td className="border border-gray-200 px-4 py-3 text-teal-700 font-medium">{row.carrier}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.trane}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.lennox}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.goodman}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>On Option B (labor coverage):</strong> This is genuinely valuable given the Infinity board failure scenarios documented above. If your dealer is enrolled in the Consumer Choice program and you're buying an Infinity system, Option B's 3-year labor warranty is worth seriously considering — it directly addresses the highest-risk period for electronic failures on a new communicating system installation. Ask your dealer in writing whether they're enrolled before you sign.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Special note for new construction:</strong> Consumer Choice is NOT eligible for new residential construction — only for existing residential replacements. Verify this applies to your situation.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 6: Pricing */}
            <div id="pricing" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Pricing & Cost Comparison (2026)</h2>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm font-semibold text-amber-800 mb-1">Carrier does not publish MSRP</p>
                <p className="text-sm text-gray-700">Unlike Trane (which publishes a Choice/Priority/Premier price guide), Carrier's pricing page simply says "the best way to get accurate pricing is to contact your local Carrier dealer." All pricing data below comes from third-party aggregators (PICKHVAC, HomeGuide, Modernize) reflecting 2025–2026 market conditions.</p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">By Tonnage — National Averages</h3>
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
              <p className="text-xs text-gray-500 italic mb-6">Source: PICKHVAC, June 2025. Standard installation, existing ductwork. Excludes permits, ductwork repairs, thermostat upgrades.</p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Carrier vs. Competitors (3-Ton Installed)</h3>
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
                Carrier and Trane are priced within approximately 2% of each other on comparable 3-ton systems — effectively the same price for the same tier. The Lennox premium above Carrier is significant (30%+ more for equivalent efficiency). And the Bryant opportunity is real: identical hardware to Carrier at 10–15% less installed.
              </p>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
                <p className="text-sm font-semibold text-amber-800 mb-1">2026 tariff context</p>
                <p className="text-sm text-gray-700">Carrier implemented a 6–8% price increase in January 2025. A system that cost $7,000 in 2020 may realistically cost $10,500–$11,000+ today due to cumulative increases and tariffs on steel, aluminum, and Chinese components. A June 2026 Section 232 tariff reduction (25% → 15%) provided partial relief but upstream component costs remain elevated. Get quotes with a 30-day price lock if possible.</p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 7: Refrigerant */}
            <div id="refrigerant" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. The R-454B Refrigerant Transition</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Carrier was one of the first major brands to complete the transition to R-454B (marketed as Puron Advance™). As of June 2026, <strong>100% of Carrier residential shipments use R-454B</strong> — Carrier actually completed the transition ahead of both Lennox and Trane, whose flagship models (Lennox SL28XCV, Trane XV20i) were still listed with R-410A on product pages as of May 2026.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">Environmental improvement</p>
                  <p className="text-sm text-gray-700">R-454B has a GWP of 466 vs. R-410A's 2,088 — a 75% reduction in greenhouse gas impact per pound released. Carrier's stated goal: "Puron Advance not only meets but exceeds the new requirement."</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">Service cost implication</p>
                  <p className="text-sm text-gray-700">R-454B aftermarket cylinders ran $700–$2,000 per 20 lbs in early 2026 (vs. ~$345 for R-410A in 2021). A refrigerant recharge or coil leak repair now costs significantly more — and Carrier's standard warranty does not cover refrigerant.</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                One important comparison: Goodman, Amana, and Daikin chose <strong>R-32</strong> instead of R-454B. R-32 ran approximately $449/20 lbs in May 2025 vs. R-454B at $2,799/20 lbs — a 6x cost difference during the 2025 shortage period. If long-term refrigerant service cost is a priority for you, Goodman/Daikin's R-32 choice is a meaningful financial advantage.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                R-454B is A2L classified (mildly flammable), requiring trained and certified technicians. Ask any installer you're considering whether they have completed A2L certification — this is now a baseline requirement, not an optional qualification.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 8: Best For */}
            <div id="best-for" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Who Should Buy Carrier — and Who Shouldn't</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border-2 border-teal-400 rounded-lg p-5 bg-teal-50">
                  <h3 className="text-lg font-bold text-teal-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />Carrier is a strong choice if you...
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Need multi-zone control — Infinity's Greenspeed technology manages variable compressor speed across zones better than most competitors without third-party zoning panels</li>
                    <li>• Live in a coastal or salt-air environment and want Coastal SKU availability as a standard catalogue item</li>
                    <li>• Want a 90-day registration window (vs. Trane's 60 days) — more time to catch mistakes</li>
                    <li>• Have access to a Consumer Choice-enrolled dealer and want Option B labor coverage for the first 3 years</li>
                    <li>• Value Carrier having completed the R-454B transition before competitors — your system uses current-generation refrigerant from day one</li>
                    <li>• Have strong local Carrier parts availability — in many markets this is better than Trane</li>
                  </ul>
                </div>
                <div className="border-2 border-gray-300 rounded-lg p-5 bg-gray-50">
                  <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-gray-500" />Consider alternatives if you...
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Live in a coastal climate and prioritize coil durability above all — Trane's Spine Fin all-aluminum coil is rated for 2,000-hour salt spray vs. Carrier's 1,000-hour standard, even with Coastal SKUs</li>
                    <li>• Want peak SEER2 — Lennox SL25KCV reaches 26.0 SEER2 vs. Carrier's 21.0 maximum</li>
                    <li>• Are budget-constrained — seriously consider Bryant (identical hardware, 10–15% less) before Carrier</li>
                    <li>• Want the lowest refrigerant service costs — Goodman/Daikin's R-32 is significantly cheaper to service than R-454B in 2026</li>
                    <li>• Are concerned about Infinity board failure costs — consider the Performance series (two-stage, less electronics complexity) instead of Infinity</li>
                    <li>• Are buying a new construction home — Consumer Choice labor warranty is not available for new construction</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 9: Comparisons */}
            <div id="vs-trane" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Carrier vs. Trane vs. Bryant</h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                These three brands represent the most common premium-tier comparison. Carrier and Trane are priced identically within 2% on comparable systems. The differences that actually matter are specific.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Factor</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Carrier</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Trane</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Bryant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { factor: 'CR predicted reliability', carrier: '4/5', trane: '5/5', bryant: 'Same as Carrier' },
                      { factor: 'Coastal coil advantage', carrier: 'Coastal SKU; 1,000-hr salt spray', trane: 'Spine Fin; 2,000-hr salt spray', bryant: 'WeatherArmor; Coastal SKU available' },
                      { factor: 'Max SEER2 (central AC)', carrier: '21.0 (26VNA1)', trane: '23.6 (XV20i)', bryant: '21.0 (191VAN)' },
                      { factor: 'Warranty registration', carrier: '90 days (best)', trane: '60 days', bryant: '90 days (same as Carrier)' },
                      { factor: 'Labor warranty option', carrier: 'Yes (Option B, if dealer enrolled)', trane: 'No', bryant: 'No (paid optional only)' },
                      { factor: 'Pricing transparency', carrier: 'No MSRP published', trane: 'Publishes price guide', bryant: 'No MSRP published' },
                      { factor: 'Parts availability', carrier: 'Good; better than Trane in many markets', trane: 'Proprietary issues documented', bryant: 'Same as Carrier' },
                      { factor: 'Relative pricing (3-ton)', carrier: 'Baseline', trane: 'Within 2%', bryant: '10–15% less than Carrier' },
                    ].map((row, i) => (
                      <tr key={row.factor} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.factor}</td>
                        <td className="border border-gray-200 px-4 py-3 text-teal-700">{row.carrier}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.trane}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.bryant}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-teal-800 mb-1">The Bryant case deserves its own paragraph</p>
                <p className="text-sm text-gray-700">If you're comparing Carrier to Trane and leaning Carrier, also get a Bryant quote from the same dealer or a comparable one. Bryant Evolution 191VAN = Carrier Infinity at 21 SEER2, same factory, same components, at 10–15% lower installed cost. The only real tradeoff is Bryant tops at 21 SEER2 while Carrier can reach higher (though Carrier's extra efficiency above 21 SEER2 is through a different model tier at significantly higher cost). For most buyers, Bryant is the rational choice over Carrier unless local dealer quality specifically favors Carrier.</p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Section 10: FAQ */}
            <div id="faq" className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Frequently Asked Questions</h2>
              <div className="space-y-5">
                {[
                  { q: "Is Carrier a good air conditioner brand?", a: "Yes. Consumer Reports 4/5 predicted reliability and 5/5 owner satisfaction put Carrier among the top tier of major HVAC brands — one notch below Trane's 5/5 reliability but tied for owner satisfaction. Carrier's Consumer Choice warranty (with optional labor coverage) and parts availability advantage over Trane in many markets are genuine strengths. The main risk is Infinity system complexity and board failure costs if something goes wrong." },
                  { q: "How much does a Carrier AC cost in 2026?", a: "Based on third-party aggregator data (Carrier doesn't publish MSRP): $3,900–$6,500 installed for Comfort series (entry), $6,500–$10,000 for Performance series (mid), and $10,000–$15,000+ for Infinity series (premium). These are 3-ton national averages — your local market and specific installation complexity will vary." },
                  { q: "What is Carrier's Consumer Choice warranty?", a: "When you register within 90 days, you choose: Option A (10-year parts, no labor) or Option B (5-year parts + 3-year labor, only if your dealer is enrolled in the Consumer Choice program). Without registration, warranty drops to 5 years parts-only. Labor is NOT covered under Option A. The 90-day window is the longest among major brands." },
                  { q: "Does Carrier qualify for the $2,000 federal tax credit in 2026?", a: "No. The Section 25C Energy Efficient Home Improvement Credit expired December 31, 2025 under the One Big Beautiful Bill Act. No federal tax credit applies to any HVAC installation in 2026, regardless of brand or efficiency. State and utility rebates may still apply — check your state's HEAR program." },
                  { q: "Is Carrier better than Goodman?", a: "For long-stay homeowners in hot or coastal climates, yes — Carrier's reliability scores, parts network, and Consumer Choice warranty justify the premium over Goodman. For rental properties, short-term ownership, or budget-constrained buyers, Goodman offers solid reliability at 30–50% lower installed cost. Goodman also has a meaningful service cost advantage through R-32 refrigerant (vs. Carrier's R-454B) in 2026." },
                  { q: "What is the most efficient Carrier AC in 2026?", a: "The Carrier Infinity 26VNA1 reaches 21.0 SEER2 for central AC, with an EER2 up to 12.0. For ductless mini-splits, Carrier's Infinity single-zone reaches 28.5 SEER2. If maximum central AC efficiency is the priority, Lennox SL25KCV reaches 26.0 SEER2 but at significantly higher installed cost." },
                  { q: "Who makes Carrier air conditioners?", a: "Carrier Global Corporation (NYSE: CARR), headquartered in Palm Beach Gardens, Florida. Primary US manufacturing is at Indianapolis, Indiana (furnaces) and Collierville, Tennessee (AC units). Carrier also owns Bryant, Payne, Heil, Tempstar, and Comfortmaker — all using shared manufacturing. Carrier acquired Viessmann Climate Solutions (European heat pumps) in 2024, making it a major global pure-play climate company." },
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">Calculate Carrier Savings vs. Your Current System</h3>
            <p className="text-gray-600 mb-4 text-sm">Enter your current SEER rating and a Carrier system's SEER2 to see exactly how much you'd save on electricity — at your actual local rate.</p>
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
