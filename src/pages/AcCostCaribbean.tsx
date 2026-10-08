import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import { articleJsonLd, SITE_URL } from '../data/site';
import { US_RATE, RATES_AS_OF, REF_TONS, REF_SEER, annualCost, costPerHour, usd, cents } from '../data/acCost';
import { COUNTRIES, CARIBBEAN_UPDATED, localRateLabel } from '../data/caribbean';

const PATH = '/ac-cost/caribbean';
const TITLE = 'Cost to Run AC in the Caribbean 🌴 Rates by Island (2026)';
const HEADLINE = 'What It Costs to Run Air Conditioning in the Caribbean';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 whitespace-nowrap';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

export default function AcCostCaribbean() {
  const ranked = [...COUNTRIES].sort((x, y) => x.rank - y.rank);
  const most = ranked[0];
  const least = ranked[ranked.length - 1];
  const description = `Air conditioning costs ${usd(costPerHour(REF_TONS, REF_SEER, least.usdRate), 2)}–${usd(costPerHour(REF_TONS, REF_SEER, most.usdRate), 2)} an hour to run across the Caribbean, from ${least.inName} to ${most.inName}. Rates, yearly costs and savings for ${COUNTRIES.length} countries.`;
  const highRate = ranked.filter((c) => c.usdRate >= 0.28);

  const faqs = [
    {
      q: 'Why is electricity so expensive in the Caribbean?',
      a: 'Most islands generate much of their power from imported fuel (diesel, heavy fuel oil or liquefied natural gas) in small, isolated grids. Fuel costs are passed straight through to customers through a monthly fuel charge, and small grids cannot spread fixed costs over as many customers as a large mainland utility. Trinidad and Tobago, which uses its own natural gas, is the main exception.',
    },
    {
      q: 'Where in the Caribbean is air conditioning most expensive to run?',
      a: `Of the countries we track, ${most.inName} has the highest residential rate at ${cents(most.usdRate)}/kWh (${most.asOf}), so a 3-ton AC costs about ${usd(costPerHour(REF_TONS, REF_SEER, most.usdRate), 2)} an hour. ${least.inName} is the cheapest at ${cents(least.usdRate)}/kWh.`,
    },
    {
      q: 'Is an inverter mini-split worth it in the Caribbean?',
      a: `In most islands, yes. With rates above 28¢/kWh and air conditioning running most of the year, replacing a SEER 10 unit with a SEER 20 inverter mini-split of the same size cuts its electricity use in half. For a 1.5-ton unit at ${cents(0.33)}/kWh and 3,000 hours a year, that is about ${usd(annualCost(1.5, 10, 3000, 0.33) - annualCost(1.5, 20, 3000, 0.33))} a year.`,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}${PATH}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${SITE_URL}${PATH}`} />
        <meta property="og:title" content={HEADLINE} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="article:author" content={`${SITE_URL}/about/mark-curant`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd({ path: PATH, headline: HEADLINE, description, dateModified: CARIBBEAN_UPDATED }))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Cost to run air conditioning in Caribbean countries',
            itemListElement: ranked.map((c) => ({ '@type': 'ListItem', position: c.rank, name: c.name, url: `${SITE_URL}/ac-cost/${c.slug}` })),
          })}
        </script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/ac-cost" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          AC running cost by U.S. state
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">Caribbean</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              Electricity rates, hourly and yearly cooling costs, and what an efficient unit saves, island by island.
            </p>
            <ArticleByline updated={CARIBBEAN_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              Running a typical 3-ton air conditioner (SEER {REF_SEER}) costs between{' '}
              <strong>{usd(costPerHour(REF_TONS, REF_SEER, least.usdRate), 2)}</strong> an hour in {least.inName} and{' '}
              <strong>{usd(costPerHour(REF_TONS, REF_SEER, most.usdRate), 2)}</strong> an hour in {most.inName}. In{' '}
              {highRate.length} of the {COUNTRIES.length} countries we track, electricity costs more than 28¢/kWh, well above
              the U.S. average of {cents(US_RATE)}, and because AC runs most of the year, a 3-ton system can cost{' '}
              <strong>over {usd(Math.floor(annualCost(REF_TONS, REF_SEER, 3000, 0.28) / 100) * 100)} a year</strong> to run.
            </p>
          </div>

          <p className={p}>
            I run retail stores in the Caribbean. Our power costs more than 30¢ a kilowatt-hour, it isn't always reliable,
            and the air conditioning doesn't get a season off. That combination changes how you think about every unit you
            buy: the purchase price matters less than what it costs to run for the next ten years, and protecting it from
            the grid matters as much as maintaining it. These pages put real numbers on that for each island.
          </p>

          <h2 className={h2}>Cost to run AC by country</h2>
          <div className="overflow-x-auto mb-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Country</th>
                  <th className={th}>Rate (local)</th>
                  <th className={th}>Rate (US)</th>
                  <th className={th}>3-ton per hour</th>
                  <th className={th}>Per year</th>
                  <th className={th}>As of</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((c) => (
                  <tr key={c.slug} className="hover:bg-gray-50">
                    <td className={td}><Link to={`/ac-cost/${c.slug}`} className={a}>{c.name}</Link></td>
                    <td className={td}>{localRateLabel(c)}</td>
                    <td className={td}>{cents(c.usdRate)}</td>
                    <td className={td}>{usd(costPerHour(REF_TONS, REF_SEER, c.usdRate), 2)}</td>
                    <td className={td}>{usd(annualCost(REF_TONS, REF_SEER, c.hours, c.usdRate))} <span className="text-xs text-gray-400">({c.hours.toLocaleString()} hrs)</span></td>
                    <td className={`${td} text-xs text-gray-500`}>{c.asOf}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className={`${td} font-semibold`}>U.S. average</td>
                  <td className={td}>—</td>
                  <td className={td}>{cents(US_RATE)}</td>
                  <td className={td}>{usd(costPerHour(REF_TONS, REF_SEER, US_RATE), 2)}</td>
                  <td className={td}>{usd(annualCost(REF_TONS, REF_SEER, 1500, US_RATE))} <span className="text-xs text-gray-400">(1,500 hrs)</span></td>
                  <td className={`${td} text-xs text-gray-500`}>{RATES_AS_OF}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Rates are all-in household prices including fuel charges, taxes and fees, from each country's source (listed on
            its page). Island rates move with fuel prices, so each one shows the date it applies to. We're working on the
            U.S. Virgin Islands and Turks &amp; Caicos and will add them once we have a current, sourced rate.
          </p>

          <h2 className={h2}>Why island electricity costs so much</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Imported fuel.</strong> Most islands rely on diesel, heavy fuel oil or liquefied natural gas shipped in by tanker, and the fuel charge on your bill passes that cost straight through, month by month.</li>
            <li><strong>Small, isolated grids.</strong> There's no neighbouring grid to buy cheap power from, and fixed costs are spread over far fewer customers.</li>
            <li><strong>The exceptions prove the rule.</strong> Trinidad and Tobago runs on its own natural gas and has some of the cheapest power in the region; the Dominican Republic's tariffs are government-set.</li>
          </ul>

          <h2 className={h2}>Cutting cooling costs in island conditions</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Buy on running cost, not price.</strong> At 30¢+/kWh, a SEER 20 inverter unit uses half the electricity of a SEER 10. The difference often pays for itself in a few years. Use the <Link to="/" className={a}>savings calculator</Link> with your rate.</li>
            <li><strong>Fight the salt.</strong> Salt air corrodes outdoor coils and cuts efficiency. Rinse the outdoor unit with fresh water regularly, and ask for coated or corrosion-resistant coils near the coast.</li>
            <li><strong>Cool the rooms you use.</strong> Ductless mini-splits let you cool bedrooms at night without cooling the whole house.</li>
            <li><strong>Keep the heat out.</strong> Shade on west-facing windows, reflective roofing and sealing gaps reduce how long the unit runs.</li>
            <li><strong>Clean the filters.</strong> In dusty, humid conditions filters clog fast. See <Link to="/blog/air-filter-electricity-bill" className={a}>the $10 air filter fix</Link>.</li>
            <li><strong>Protect the equipment.</strong> Voltage protectors and a surge protector at the panel guard against brownouts and spikes. Each country page covers this in more detail.</li>
          </ul>

          <h2 className={h2}>Frequently asked questions</h2>
          <div className="space-y-5 mb-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{f.q}</h3>
                <p className="text-gray-700 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          <h2 className={h2}>Sources and method</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 mb-4">
            {ranked.map((c) => (
              <li key={c.slug}>
                {c.name}: <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">{c.source}</a>, {c.asOf}.
              </li>
            ))}
            <li>Power draw (kW) = tons × 12 ÷ SEER; cost = kW × hours × rate. Cooling hours are our climate-based estimate: 3,000 a year for tropical islands, 1,500 for Bermuda.</li>
          </ul>

          <div className="mt-10 rounded-lg bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Work out your own cost</h3>
            <p className="text-gray-700 mb-4">
              Divide your last electricity bill by the kWh used to get your all-in rate, then plug it into the calculator
              with your unit's SEER and size.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
              <Calculator className="w-5 h-5" />
              Open the SEER savings calculator
            </Link>
          </div>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
