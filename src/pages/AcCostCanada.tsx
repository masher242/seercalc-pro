import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import { articleJsonLd, SITE_URL } from '../data/site';
import { US_RATE, RATES_AS_OF, REF_TONS, REF_SEER, annualCost, costPerHour, cents } from '../data/acCost';
import {
  PROVINCES, US_CITIES, CANADA_UPDATED, CANADA_RATES_DATE, CANADA_SOURCE, CANADA_SOURCE_URL,
  USD_PER_CAD, USD_PER_CAD_AS_OF, cad,
} from '../data/canada';

const PATH = '/ac-cost/canada';
const TITLE = 'Cost to Run AC in Canada 🍁 Rates by Province (2026)';
const HEADLINE = 'What It Costs to Run Air Conditioning in Canada';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 whitespace-nowrap';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

export default function AcCostCanada() {
  const ranked = [...PROVINCES].sort((x, y) => x.rank - y.rank);
  const most = ranked[0];
  const least = ranked[ranked.length - 1];
  const byYear = [...PROVINCES].sort(
    (x, y) => annualCost(REF_TONS, REF_SEER, y.hours, y.rate) - annualCost(REF_TONS, REF_SEER, x.hours, x.rate),
  );
  const topYear = byYear[0];
  const lowYear = byYear[byYear.length - 1];
  const perHour = (r: number) => cad(costPerHour(REF_TONS, REF_SEER, r), 2);
  const year = (r: number, h: number) => cad(annualCost(REF_TONS, REF_SEER, h, r));
  const description = `A 3-ton central AC costs ${perHour(least.rate)}–${perHour(most.rate)} an hour to run in Canada, from ${least.name} to ${most.name}. Electricity prices, yearly costs and SEER savings for all 10 provinces.`;
  const usRateCad = US_RATE / USD_PER_CAD;
  const cheaperThanUs = PROVINCES.filter((x) => x.usdRate < US_RATE).length;
  const save = (x: (typeof PROVINCES)[number]) =>
    annualCost(REF_TONS, 14, x.hours, x.rate) - annualCost(REF_TONS, 18, x.hours, x.rate);
  const on = PROVINCES.find((x) => x.slug === 'ontario')!;

  const faqs = [
    {
      q: 'How much does it cost to run central air in Canada?',
      a: `For a typical 3-ton central AC rated SEER ${REF_SEER}, about ${perHour(least.rate)} an hour in ${least.name} and ${perHour(most.rate)} an hour in ${most.name}, before tax. Over a summer, that works out to roughly ${year(lowYear.rate, lowYear.hours)} a year in ${lowYear.name} and up to ${year(topYear.rate, topYear.hours)} in ${topYear.name}, depending on how long the cooling season is.`,
    },
    {
      q: 'Which province has the most expensive electricity for air conditioning?',
      a: `${most.name} has the highest residential price in Hydro-Québec's comparison: ${cents(most.rate)}/kWh in ${most.city.name} at 1,000 kWh a month (${CANADA_RATES_DATE}, before tax). ${least.name} is the cheapest at ${cents(least.rate)}/kWh in ${least.city.name}. Because ${topYear.name} has a longer, hotter summer, AC costs the most per year there.`,
    },
    {
      q: 'Is a high-SEER air conditioner worth it in Canada?',
      a: `For cooling alone, rarely. Canadian cooling seasons are short, so going from SEER 14 to SEER 18 on a 3-ton system saves only about ${cad(save(on))} a year in Ontario. The case is much stronger for a heat pump that also heats in winter, where its heating efficiency (HSPF) drives most of the savings.`,
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
          {JSON.stringify(articleJsonLd({ path: PATH, headline: HEADLINE, description, dateModified: CANADA_UPDATED }))}
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
            name: 'Cost to run air conditioning in Canadian provinces',
            itemListElement: ranked.map((x) => ({ '@type': 'ListItem', position: x.rank, name: x.name, url: `${SITE_URL}/ac-cost/canada/${x.slug}` })),
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
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">Canada</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 6 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              Electricity prices, hourly and yearly cooling costs, and what a more efficient unit saves, province by province,
              in Canadian dollars.
            </p>
            <ArticleByline updated={CANADA_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              Running a typical 3-ton central air conditioner (SEER {REF_SEER}) costs about{' '}
              <strong>{perHour(least.rate)}</strong> an hour in {least.name} and up to <strong>{perHour(most.rate)}</strong> an
              hour in {most.name}, before tax. Canadian summers are short, so a whole season usually comes to{' '}
              <strong>{year(lowYear.rate, lowYear.hours)}–{year(topYear.rate, topYear.hours)} a year</strong>, from{' '}
              {lowYear.name} to {topYear.name}. Power is cheaper than the U.S. average in{' '}
              {cheaperThanUs === PROVINCES.length ? 'every province' : `${cheaperThanUs} of ${PROVINCES.length} provinces`}.
            </p>
          </div>

          <p className={p}>
            Canada is the opposite of the islands where I run my stores. There, power costs over 30¢ a kWh and the AC never
            gets a season off, so efficiency pays back fast. In most of Canada, electricity is cheaper and the cooling season
            lasts a few months, which changes the math. These pages put numbers on it so you can see whether an upgrade is
            worth it where you live.
          </p>

          <h2 className={h2}>Cost to run AC by province</h2>
          <div className="overflow-x-auto mb-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Province</th>
                  <th className={th}>City</th>
                  <th className={th}>Avg. price</th>
                  <th className={th}>AC's extra kWh</th>
                  <th className={th}>3-ton per hour</th>
                  <th className={th}>Per year</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((x) => (
                  <tr key={x.slug} className="hover:bg-gray-50">
                    <td className={td}><Link to={`/ac-cost/canada/${x.slug}`} className={a}>{x.name}</Link></td>
                    <td className={td}>{x.city.name}</td>
                    <td className={td}>{cents(x.rate)}</td>
                    <td className={td}>{cents(x.city.extraRate)}</td>
                    <td className={td}>{perHour(x.rate)}</td>
                    <td className={td}>{year(x.rate, x.hours)} <span className="text-xs text-gray-400">({x.hours.toLocaleString()} hrs)</span></td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className={`${td} font-semibold`}>U.S. average</td>
                  <td className={td}>—</td>
                  <td className={td}>{cents(usRateCad)}</td>
                  <td className={td}>—</td>
                  <td className={td}>{perHour(usRateCad)}</td>
                  <td className={td}>{year(usRateCad, 1500)} <span className="text-xs text-gray-400">(1,500 hrs)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Canadian cents per kWh, before GST/HST and provincial taxes, at {CANADA_RATES_DATE} rates. "Avg. price" is the
            average for a home using 1,000 kWh a month. "AC's extra kWh" is what each kWh between 1,000 and 2,000 a month
            costs, which is closer to what running the air conditioner adds to a bill. The U.S. average ({cents(US_RATE)} US,{' '}
            {RATES_AS_OF}) is converted at US${USD_PER_CAD.toFixed(3)} per C$ ({USD_PER_CAD_AS_OF}). Territories aren't in the
            comparison.
          </p>

          <h2 className={h2}>Across the border</h2>
          <p className={p}>
            The same Hydro-Québec comparison prices U.S. cities the same way, so the numbers line up directly. Canadian
            power is cheaper across the board, which is one reason a premium air conditioner takes longer to pay back in
            Canada than in the U.S.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Canadian city</th>
                  <th className={th}>Price</th>
                  <th className={th}>U.S. city</th>
                  <th className={th}>Price</th>
                </tr>
              </thead>
              <tbody>
                {US_CITIES.map((u) => {
                  const ca = PROVINCES.flatMap((x) => x.cities).find((c) => c.name === u.near);
                  return ca ? (
                    <tr key={u.name}>
                      <td className={td}>{ca.name}</td>
                      <td className={td}>{cents(ca.rate)}</td>
                      <td className={td}>{u.name}</td>
                      <td className={td}>{cents(u.rate)}</td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Canadian cents per kWh at 1,000 kWh a month, before tax. U.S. bills were converted to Canadian dollars by
            Hydro-Québec at the April 1, 2025 exchange rate.
          </p>

          <h2 className={h2}>Is a more efficient AC worth it in Canada?</h2>
          <p className={p}>
            For cooling alone, the payback is slow. Going from SEER 14 to SEER 18 on a 3-ton system saves about{' '}
            {cad(save(on))} a year in Ontario and less in provinces with cooler summers. Our{' '}
            <Link to="/blog/16-vs-18-seer" className={a}>16 vs 18 SEER payback analysis</Link> shows why: the extra cost
            of a premium unit only pays back when electricity is expensive and the AC runs a lot.
          </p>
          <p className={p}>
            Heat pumps change that. A cold-climate heat pump cools in summer and heats in winter, and in most of Canada it
            runs far more hours heating than cooling. If you're replacing an AC, compare a heat pump on its heating
            efficiency (HSPF) as well as SEER, and check your province and utility for current rebates or financing.
          </p>

          <h2 className={h2}>Cutting cooling costs</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Watch time-of-use rates.</strong> In Ontario, on-peak hours cost the most. Pre-cool the house in the morning and set the thermostat higher during the peak.</li>
            <li><strong>Size it right.</strong> An oversized unit short-cycles, dehumidifies poorly and costs more to buy. Check with the <Link to="/calculators/ac-sizing" className={a}>AC sizing calculator</Link>.</li>
            <li><strong>Cool the rooms you use.</strong> A ductless mini-split in a bedroom can be cheaper to run than cooling a whole house.</li>
            <li><strong>Keep the heat out.</strong> Close blinds on south- and west-facing windows on hot afternoons.</li>
            <li><strong>Clean or replace the filter.</strong> A clogged filter makes the system run longer. See <Link to="/blog/air-filter-electricity-bill" className={a}>the $10 air filter fix</Link>.</li>
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
              Electricity prices: <a href={CANADA_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">{CANADA_SOURCE}</a>.
              Monthly bills for 1,000 and 2,000 kWh, before taxes. Where a province has two cities in the comparison, the
              headline uses the larger one.
            </li>
            <li>Power draw (kW) = tons × 12 ÷ SEER; cost = kW × hours × price.</li>
            <li>Cooling hours are our estimate for each province's climate, from 300 a year in Newfoundland and Labrador to 800 in Ontario.</li>
          </ul>

          <div className="mt-10 rounded-lg bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Work out your own cost</h3>
            <p className="text-gray-700 mb-4">
              Divide your last electricity bill (before tax) by the kWh used to get your rate, then plug it into the
              calculator with your unit's SEER and size.
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
