import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import { articleJsonLd, SITE_URL } from '../data/site';
import {
  STATES, US_RATE, RATES_AS_OF, RATES_SOURCE_URL, TONNAGES, SEERS, REF_TONS, REF_SEER,
  SUMMER_MONTH_HOURS, AC_COST_UPDATED, annualCost, costPerHour, kw, usd, cents,
} from '../data/acCost';

const PATH = '/blog/how-much-does-it-cost-to-run-ac';
const TITLE = 'How Much Does It Cost to Run AC? 💡 Per Hour, Month & Year';
const HEADLINE = 'How Much Does It Cost to Run an Air Conditioner? (2026, by Size, SEER and State)';
const YEAR_HOURS = 1500;

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

const ROOM_UNITS = [
  { type: 'Small window AC (5,000–6,000 Btu)', watts: 500 },
  { type: 'Medium window AC (8,000–10,000 Btu)', watts: 800 },
  { type: 'Large window AC (12,000–15,000 Btu)', watts: 1200 },
  { type: 'Portable AC (10,000–14,000 Btu)', watts: 1200 },
  { type: 'Ductless mini-split, one zone (12,000 Btu, ~20 SEER)', watts: 600 },
];

export default function BlogArticleRunningCost() {
  const perHour = costPerHour(REF_TONS, REF_SEER, US_RATE);
  const month = perHour * SUMMER_MONTH_HOURS;
  const year = annualCost(REF_TONS, REF_SEER, YEAR_HOURS, US_RATE);
  const ranked = [...STATES].sort((x, y) => x.rank - y.rank);
  const top = ranked.slice(0, 10);
  const bottom = ranked.slice(-10).reverse();
  const most = ranked[0];
  const least = ranked[ranked.length - 1];
  const description = `A typical 3-ton central AC costs about ${usd(perHour, 2)} an hour, ${usd(month)} for a summer month and ${usd(year)} a year at the U.S. average rate of ${cents(US_RATE)}/kWh (${RATES_AS_OF}). Costs by size, SEER and state.`;

  const faqs = [
    {
      q: 'How much does it cost to run central air per hour?',
      a: `About ${usd(perHour, 2)} an hour for a 3-ton central air conditioner rated SEER ${REF_SEER} at the U.S. average residential rate of ${cents(US_RATE)}/kWh (${RATES_AS_OF}). The system draws about ${kw(REF_TONS, REF_SEER).toFixed(2)} kW. In ${most.name} (${cents(most.rate)}/kWh) the same hour costs ${usd(costPerHour(REF_TONS, REF_SEER, most.rate), 2)}; in ${least.name} (${cents(least.rate)}/kWh), ${usd(costPerHour(REF_TONS, REF_SEER, least.rate), 2)}.`,
    },
    {
      q: 'How much does it cost to run AC for a month?',
      a: `Running 8 hours a day for 30 days, a 3-ton SEER ${REF_SEER} system uses about ${Math.round(kw(REF_TONS, REF_SEER) * SUMMER_MONTH_HOURS).toLocaleString()} kWh, which costs about ${usd(month)} at the U.S. average rate. Running it 12 hours a day costs about ${usd(perHour * 360)}.`,
    },
    {
      q: 'How many kWh does an air conditioner use?',
      a: `A central AC uses roughly tons × 12 ÷ SEER kilowatt-hours per hour of running. A 3-ton SEER 14 system uses about ${kw(3, 14).toFixed(2)} kWh an hour; a 2-ton about ${kw(2, 14).toFixed(2)}; a 5-ton about ${kw(5, 14).toFixed(2)}. An older SEER 10 system uses 40% more electricity than a SEER 14 for the same cooling.`,
    },
    {
      q: 'Is it cheaper to leave the AC on all day?',
      a: 'Usually not. The Department of Energy says setting the thermostat 7–10°F higher for 8 hours a day can cut cooling costs by up to 10% a year. The system has to remove the heat that built up, but a warmer house gains heat more slowly, so the total energy used is lower.',
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
        <meta property="article:section" content="HVAC Guides" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd({ path: PATH, headline: HEADLINE, description, dateModified: AC_COST_UPDATED }))}
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
            '@type': 'Dataset',
            name: `Residential electricity rates and AC running costs by U.S. state (${RATES_AS_OF})`,
            description: 'Average residential electricity price for each state and DC from EIA, with the estimated hourly and yearly cost of running a 3-ton SEER 14 central air conditioner.',
            url: `${SITE_URL}/ac-cost`,
            creator: { '@id': `${SITE_URL}/#organization` },
            isBasedOn: RATES_SOURCE_URL,
            license: 'https://creativecommons.org/licenses/by/4.0/',
            distribution: [{ '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: `${SITE_URL}/data/residential-electricity-rates-by-state.csv` }],
          })}
        </script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Efficiency Hub
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">HVAC Guides</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              What your air conditioner actually costs to run, worked out from real electricity rates for every state.
            </p>
            <ArticleByline updated={AC_COST_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              At the U.S. average residential electricity rate of <strong>{cents(US_RATE)}/kWh</strong> ({RATES_AS_OF}),
              a typical 3-ton central air conditioner (SEER {REF_SEER}) costs about <strong>{usd(perHour, 2)} per hour</strong>,{' '}
              <strong>{usd(month)}</strong> for a summer month at 8 hours a day, and about <strong>{usd(year)} a year</strong>{' '}
              at {YEAR_HOURS.toLocaleString()} cooling hours. Where you live changes that a lot: the same hour costs{' '}
              {usd(costPerHour(REF_TONS, REF_SEER, most.rate), 2)} in {most.name} and{' '}
              {usd(costPerHour(REF_TONS, REF_SEER, least.rate), 2)} in {least.name}.
            </p>
          </div>

          <p className={p}>
            I run several stores in the Caribbean, where electricity costs almost double the U.S. average and the AC
            never really gets a day off. At those prices you learn quickly that the cost of cooling comes down to three
            numbers: how big the system is, how efficient it is, and what you pay per kilowatt-hour. Below are all three,
            worked out for every state.
          </p>

          <h2 className={h2}>The formula</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4 font-mono text-sm text-gray-800">
            Power (kW) = tons × 12 ÷ SEER<br />
            Cost = kW × hours of running × electricity rate ($/kWh)
          </div>
          <p className={p}>
            Example: a 3-ton SEER 14 system draws 3 × 12 ÷ 14 = {kw(3, 14).toFixed(2)} kW. One hour at{' '}
            {cents(US_RATE)}/kWh costs {kw(3, 14).toFixed(2)} × {US_RATE.toFixed(4)} = {usd(perHour, 2)}. Your electricity
            rate is on your bill as cents per kWh; if your bill lists several charges, divide the total by the kWh used.
          </p>

          <h2 className={h2}>Cost to run central air by size (U.S. average rate)</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>System size</th>
                  <th className={th}>Power draw (SEER 14)</th>
                  <th className={th}>Per hour</th>
                  <th className={th}>Summer month (8 hrs/day)</th>
                  <th className={th}>Per year ({YEAR_HOURS.toLocaleString()} hrs)</th>
                </tr>
              </thead>
              <tbody>
                {TONNAGES.map((t) => (
                  <tr key={t}>
                    <td className={`${td} font-medium`}>{t} ton</td>
                    <td className={td}>{kw(t, REF_SEER).toFixed(2)} kW</td>
                    <td className={td}>{usd(costPerHour(t, REF_SEER, US_RATE), 2)}</td>
                    <td className={td}>{usd(costPerHour(t, REF_SEER, US_RATE) * SUMMER_MONTH_HOURS)}</td>
                    <td className={td}>{usd(annualCost(t, REF_SEER, YEAR_HOURS, US_RATE))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className={h2}>How efficiency (SEER) changes the cost</h2>
          <p className={p}>A 3-ton system at {YEAR_HOURS.toLocaleString()} hours a year and {cents(US_RATE)}/kWh:</p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>SEER</th>
                  <th className={th}>Per hour</th>
                  <th className={th}>Per year</th>
                  <th className={th}>vs. SEER 10</th>
                </tr>
              </thead>
              <tbody>
                {SEERS.map((seer) => (
                  <tr key={seer}>
                    <td className={`${td} font-medium`}>SEER {seer}</td>
                    <td className={td}>{usd(costPerHour(REF_TONS, seer, US_RATE), 2)}</td>
                    <td className={td}>{usd(annualCost(REF_TONS, seer, YEAR_HOURS, US_RATE))}</td>
                    <td className={td}>{seer === 10 ? '—' : `${usd(annualCost(REF_TONS, 10, YEAR_HOURS, US_RATE) - annualCost(REF_TONS, seer, YEAR_HOURS, US_RATE))} less`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>
            Every SEER rating, with costs at a high electricity rate too, is in the{' '}
            <Link to="/blog/seer-rating-chart" className={a}>SEER rating chart</Link>.
          </p>

          <h2 className={h2}>Window units, portable ACs and mini-splits</h2>
          <p className={p}>
            Room units are rated in watts. Typical draw while the compressor is running, and the cost at{' '}
            {cents(US_RATE)}/kWh:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Unit</th>
                  <th className={th}>Typical draw</th>
                  <th className={th}>Per hour</th>
                  <th className={th}>Per 8-hour day</th>
                </tr>
              </thead>
              <tbody>
                {ROOM_UNITS.map((u) => (
                  <tr key={u.type}>
                    <td className={`${td} font-medium`}>{u.type}</td>
                    <td className={td}>{u.watts.toLocaleString()} W</td>
                    <td className={td}>{usd((u.watts / 1000) * US_RATE, 2)}</td>
                    <td className={td}>{usd((u.watts / 1000) * US_RATE * 8, 2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 italic mb-4">
            Check the label on your unit for its actual wattage; multiply by hours and your rate the same way.
          </p>

          <h2 className={h2}>Cost by state</h2>
          <p className={p}>
            Residential electricity in {most.name} costs {(most.rate / least.rate).toFixed(1)} times as much as in {least.name}, so
            the same air conditioner can cost very different amounts to run. Each state's full breakdown, by system size and SEER, is on its own page.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            {[{ label: 'Most expensive', list: top }, { label: 'Least expensive', list: bottom }].map((g) => (
              <div key={g.label}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{g.label} to run AC</h3>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className={th}>State</th>
                      <th className={th}>Rate</th>
                      <th className={th}>3-ton per hour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.list.map((s) => (
                      <tr key={s.slug}>
                        <td className={td}><Link to={`/ac-cost/${s.slug}`} className={a}>{s.name}</Link></td>
                        <td className={td}>{cents(s.rate)}</td>
                        <td className={td}>{usd(costPerHour(REF_TONS, REF_SEER, s.rate), 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <p className={p}>
            <Link to="/ac-cost" className={a}>See all 50 states and DC →</Link>
          </p>

          <h2 className={h2}>What makes your AC cost more (or less)</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Your electricity rate.</strong> The biggest factor, and the one most people never check. It's on your bill.</li>
            <li><strong>Climate and hours of use.</strong> A home on the Gulf Coast can run its AC 3,000 hours a year; one in New England, under 1,000.</li>
            <li><strong>System efficiency.</strong> A SEER 10 system uses 40% more electricity than a SEER 14 for the same cooling.</li>
            <li><strong>Size.</strong> An oversized system cycles on and off and dehumidifies poorly; an undersized one runs constantly. See the <Link to="/calculators/ac-sizing" className={a}>sizing calculator</Link>.</li>
            <li><strong>Maintenance.</strong> A clogged filter or dirty coil makes the system work harder. See <Link to="/blog/air-filter-electricity-bill" className={a}>the $10 air filter fix</Link>.</li>
            <li><strong>Thermostat habits.</strong> Raising the setting when you're out is the cheapest saving there is. See <Link to="/blog/thermostat-setback-strategy" className={a}>the $0 thermostat strategy</Link>.</li>
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
            <li>
              Electricity rates: <a href={RATES_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">U.S. Energy Information Administration, Electric Power Monthly, Table 5.6.A</a> (average residential price, {RATES_AS_OF}).
            </li>
            <li>Thermostat savings: U.S. Department of Energy, Energy Saver.</li>
            <li>
              Power draw is estimated from the SEER rating, which describes average seasonal efficiency, so actual draw is
              higher on the hottest afternoons and lower on mild days. Cooling hours by state are our climate-based estimate.
            </li>
          </ul>
          <p className="text-sm text-gray-500 mb-8">
            Download the data: <a href="/data/residential-electricity-rates-by-state.csv" className={a}>residential electricity rates by state (CSV)</a>. Free to reuse with a link back to this page.
          </p>

          <div className="rounded-lg bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Work out your own cost</h3>
            <p className="text-gray-700 mb-4">
              Enter your system's SEER, size, hours and electricity rate to see what you pay now and what an upgrade would save.
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
