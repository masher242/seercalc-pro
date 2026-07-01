import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Star, Clock } from 'lucide-react';

const liveBrands = [
  {
    slug: 'trane',
    name: 'Trane',
    tier: 'S-Tier (Premium)',
    tierColor: 'bg-yellow-100 text-yellow-800',
    seer2: 'Up to 23.6 SEER2',
    reliability: '5/5 Consumer Reports',
    priceRange: '$4,881–$10,414 installed',
    summary: 'Highest predicted reliability score in the category. Spine Fin coil excels in coastal and humid climates. Known issues with TAM coil leaks and proprietary parts.',
    bestFor: 'Long-stay homeowners, coastal climates, reliability-first buyers',
    readTime: '15 min read',
    updated: 'July 2026',
    live: true,
  },
];

const comingSoon = [
  { name: 'Carrier', tier: 'A-Tier', seer2: 'Up to 24 SEER2', note: 'Best dealer network in the US' },
  { name: 'Lennox', tier: 'S-Tier', seer2: 'Up to 28 SEER2', note: 'Highest efficiency available' },
  { name: 'American Standard', tier: 'S-Tier', seer2: 'Up to 21.5 SEER2', note: 'Same as Trane, lower price' },
  { name: 'Goodman', tier: 'B-Tier', seer2: 'Up to 17 SEER2', note: 'Best budget brand, Daikin-owned' },
  { name: 'Rheem', tier: 'B-Tier', seer2: 'Up to 18 SEER2', note: 'Best value in mid-range' },
  { name: 'Daikin', tier: 'A-Tier', seer2: 'Up to 22 SEER2', note: 'Best warranty, inverter leader' },
  { name: 'Mitsubishi', tier: 'S-Tier (mini-splits)', seer2: 'Up to 32 SEER2', note: 'Top-ranked ductless brand' },
];

export default function BrandsIndex() {
  return (
    <>
      <Helmet>
        <title>HVAC Brand Reviews 2026: Reliability, Pricing & Warranty Compared | seercalc.pro</title>
        <meta name="description" content="In-depth reviews of the top HVAC brands in 2026. Compare Trane, Carrier, Lennox, Goodman, Rheem, Daikin and more by reliability, warranty, pricing, and known issues." />
        <meta name="keywords" content="HVAC brand reviews 2026, best AC brand, Trane review, Carrier review, Lennox review, Goodman review, air conditioner brand comparison" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://seercalc.pro/brands" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seercalc.pro/brands" />
        <meta property="og:title" content="HVAC Brand Reviews 2026: Reliability, Pricing & Warranty Compared" />
        <meta property="og:description" content="In-depth reviews of the top HVAC brands. Compare Trane, Carrier, Lennox, Goodman and more by reliability, warranty, pricing, and known issues." />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Star className="w-4 h-4 text-teal-500" />
            <span className="text-teal-600 font-medium">Brand Reviews</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">HVAC Brand Reviews 2026</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            In-depth, sourced reviews of the top AC brands — reliability data, real pricing, warranty terms, and known issues. No manufacturer sponsorship. No affiliate commissions on equipment.
          </p>
        </div>

        {/* Quick Answer */}
        <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg mb-10">
          <p className="text-sm font-semibold text-teal-800 uppercase tracking-wide mb-2">Quick Answer</p>
          <p className="text-gray-800">The most reliable central AC brands in 2026 are <strong>Trane and American Standard</strong> (5/5 Consumer Reports), followed by <strong>Carrier and Lennox</strong>. For best budget value: <strong>Goodman</strong> (Daikin-owned). For mini-splits: <strong>Mitsubishi Electric</strong>. But brand matters less than installer quality — roughly 80% of a system's lifespan depends on installation, not the badge on the unit.</p>
        </div>

        {/* Tier overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {[
            { tier: 'S-Tier (Premium)', brands: 'Trane, Lennox, American Standard', color: 'border-yellow-400 bg-yellow-50', text: 'text-yellow-800' },
            { tier: 'A-Tier (High Performance)', brands: 'Carrier, Daikin, Bryant', color: 'border-green-400 bg-green-50', text: 'text-green-800' },
            { tier: 'B-Tier (Best Value)', brands: 'Rheem, Ruud, Goodman, Amana', color: 'border-blue-400 bg-blue-50', text: 'text-blue-800' },
          ].map(t => (
            <div key={t.tier} className={`border-2 rounded-lg p-4 ${t.color}`}>
              <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${t.text}`}>{t.tier}</p>
              <p className="text-sm text-gray-700">{t.brands}</p>
            </div>
          ))}
        </div>

        {/* Live reviews */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Published Reviews</h2>
          <div className="space-y-6">
            {liveBrands.map(brand => (
              <div key={brand.slug} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-teal-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">{brand.name}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${brand.tierColor}`}>{brand.tier}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{brand.readTime}</span>
                      <span>Updated {brand.updated}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">{brand.summary}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm">
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-xs text-gray-500 mb-0.5">Reliability</p>
                    <p className="font-semibold text-gray-900">{brand.reliability}</p>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-xs text-gray-500 mb-0.5">Max efficiency</p>
                    <p className="font-semibold text-gray-900">{brand.seer2}</p>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-xs text-gray-500 mb-0.5">Installed cost</p>
                    <p className="font-semibold text-gray-900">{brand.priceRange}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500"><span className="font-medium">Best for:</span> {brand.bestFor}</p>
                  <Link
                    to={`/brands/${brand.slug}`}
                    className="inline-flex items-center gap-1 bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors flex-shrink-0"
                  >
                    Read review →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming soon */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-gray-500 text-sm mb-6">Full in-depth reviews in progress, using the same sourced research methodology as the Trane review above.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {comingSoon.map(brand => (
              <div key={brand.name} className="bg-gray-50 rounded-lg border border-gray-200 p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-gray-700">{brand.name}</p>
                    <span className="text-xs text-gray-400 border border-gray-300 px-1.5 py-0.5 rounded">{brand.tier}</span>
                  </div>
                  <p className="text-xs text-gray-500">{brand.seer2} · {brand.note}</p>
                </div>
                <span className="text-xs text-gray-400 font-medium flex-shrink-0">Coming soon</span>
              </div>
            ))}
          </div>
        </div>

        {/* How we research */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">How We Research These Reviews</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Each brand review is built from sourced primary research: manufacturer warranty documentation, AHRI certified efficiency data, Consumer Reports reliability scores, HVAC contractor forum discussions (HVAC-Talk, r/HVAC), and published pricing data from HomeGuide, PICKHVAC, and Modernize. We do not accept manufacturer sponsorship or earn commissions on equipment sales.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            We distinguish between <strong>technician sentiment</strong> (often negative due to proprietary parts and service complexity) and <strong>owner satisfaction</strong> (often positive). Both are real. We report both.
          </p>
        </div>

        {/* Related */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Related articles</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/blog/best-air-conditioner-brands-2026" className="block p-4 bg-white rounded-lg hover:bg-teal-50 transition-colors border border-gray-200 hover:border-teal-200">
              <p className="text-sm font-semibold text-gray-900">Best AC Brands 2026: Full Tier Rankings</p>
              <p className="text-xs text-gray-500 mt-1">S-tier through D-tier, all major brands compared</p>
            </Link>
            <Link to="/blog/ac-unit-cost-2026" className="block p-4 bg-white rounded-lg hover:bg-teal-50 transition-colors border border-gray-200 hover:border-teal-200">
              <p className="text-sm font-semibold text-gray-900">AC Unit Cost Guide 2026</p>
              <p className="text-xs text-gray-500 mt-1">What a new AC really costs by size, brand, and region</p>
            </Link>
          </div>
        </div>

      </main>
    </>
  );
}
