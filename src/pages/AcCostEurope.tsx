import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import EuropeCostMap from '../components/EuropeCostMap';
import { articleJsonLd, SITE_URL } from '../data/site';
import { US_RATE, RATES_AS_OF, cents } from '../data/acCost';
import {
  EU_COUNTRIES, EUROPE_UPDATED, EU_REF_KW, EU_REF_SEER, PORTABLE_KW_ELEC, USD_PER_EUR, GBP_PER_EUR, FX_AS_OF,
  yearCost, hourCost, money, unitPrice,
} from '../data/europe';

const PATH = '/ac-cost/europe';
const TITLE = 'Cost to Run AC in Europe: 8 Countries, City by City';
const HEADLINE = 'What It Costs to Run Air Conditioning in Europe';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 whitespace-nowrap';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

export default function AcCostEurope() {
  const ranked = [...EU_COUNTRIES].sort((x, y) => x.rank - y.rank);
  const range = (c: (typeof EU_COUNTRIES)[number]) => {
    const hrs = c.cities.map((x) => x.hours);
    return `${money(c.currency, yearCost(EU_REF_KW, EU_REF_SEER, Math.min(...hrs), c.rate))}–${money(c.currency, yearCost(EU_REF_KW, EU_REF_SEER, Math.max(...hrs), c.rate))}`;
  };
  const description = `What a 3.5 kW split air conditioner costs to run per hour and per year in Spain, Italy, Greece, Cyprus, Malta, Portugal, France and the UK, city by city, at current electricity prices, in euros and pounds.`;

  const faqs = [
    {
      q: 'Where in Europe is air conditioning most expensive to run?',
      a: `Per kWh, ${ranked[0].inName} has the highest price of the countries we track (${unitPrice(ranked[0])}/kWh). But yearly cost depends far more on climate: in Cyprus, Malta and the south of Spain, Italy and Greece the AC runs several times as many hours as in Paris or London, so cooling costs the most there over a year. The map above shows the yearly cost for every EU country.`,
    },
    {
      q: 'Is European SEER the same as U.S. SEER?',
      a: 'No. The EU rating on the energy label is measured in watts of cooling per watt of electricity, under European test conditions. U.S. SEER uses Btu per watt-hour and different test conditions. The numbers aren\'t directly comparable, so these pages use EU ratings and kW throughout.',
    },
    {
      q: 'How much does a portable air conditioner cost to run in Europe?',
      a: `A typical portable unit draws about 1 kW, so it costs roughly the price of 1 kWh per hour: about ${ranked.map((c) => `${money(c.currency, PORTABLE_KW_ELEC * c.rate, 2)} in ${c.inName}`).join(', ')}. A split unit gives more cooling for about half the electricity.`,
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
          {JSON.stringify(articleJsonLd({ path: PATH, headline: HEADLINE, description, dateModified: EUROPE_UPDATED }))}
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
            name: 'Cost to run air conditioning in European countries',
            itemListElement: ranked.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: `${SITE_URL}/ac-cost/${c.slug}` })),
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
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">Europe</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 6 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              Electricity prices, hourly and yearly cooling costs, and what an efficient unit saves, in Spain, Italy,
              Greece, Cyprus, Malta, Portugal, France and the UK, plus a map of every EU country.
            </p>
            <ArticleByline updated={EUROPE_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              A typical 3.5 kW (12,000 BTU) split air conditioner, which uses about{' '}
              {(EU_REF_KW / EU_REF_SEER).toFixed(2)} kWh of electricity an hour, costs about{' '}
              {ranked.map((c, i) => (
                <span key={c.slug}>
                  <strong>{money(c.currency, hourCost(EU_REF_KW, EU_REF_SEER, c.rate), 2)}</strong> an hour in {c.inName}
                  {i < ranked.length - 2 ? ', ' : i === ranked.length - 2 ? ' and ' : ''}
                </span>
              ))}
              . {ranked[0].name === 'United Kingdom' ? 'The UK' : ranked[0].name} has the highest price per kWh of these{' '}
              {ranked.length}, but climate decides the yearly bill: the AC runs several times longer in Nicosia, Valletta or
              Seville than in Paris, and many times longer than in London.
            </p>
          </div>

          <p className={p}>
            Where I run my stores, power costs over 30¢ a kWh and the AC never gets a season off. Southern Europe isn't far
            behind on price, and summers there are getting hotter and longer. Northern Europe has the opposite problem:
            homes weren't built for air conditioning, and a portable unit bought in a heatwave can be the most expensive
            way to cool a room. These pages put numbers on both.
          </p>

          <EuropeCostMap />

          <h2 className={h2}>Cost to run AC by country</h2>
          <div className="overflow-x-auto mb-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Country</th>
                  <th className={th}>Price per kWh</th>
                  <th className={th}>In U.S. cents</th>
                  <th className={th}>
                    Per hour
                    <span className="block text-xs font-normal text-gray-500">3.5 kW / 12,000 BTU unit</span>
                  </th>
                  <th className={th}>Per year (by city)</th>
                  <th className={th}>As of</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((c) => (
                  <tr key={c.slug} className="hover:bg-gray-50">
                    <td className={td}><Link to={`/ac-cost/${c.slug}`} className={a}>{c.name}</Link></td>
                    <td className={td}>{unitPrice(c)}</td>
                    <td className={td}>{cents(c.usdRate)}</td>
                    <td className={td}>{money(c.currency, hourCost(EU_REF_KW, EU_REF_SEER, c.rate), 2)}</td>
                    <td className={td}>{range(c)}</td>
                    <td className={`${td} text-xs text-gray-500`}>{c.asOf}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className={`${td} font-semibold`}>U.S. average</td>
                  <td className={td}>—</td>
                  <td className={td}>{cents(US_RATE)}</td>
                  <td className={td}>—</td>
                  <td className={td}>—</td>
                  <td className={`${td} text-xs text-gray-500`}>{RATES_AS_OF}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Costs are for a 3.5 kW (12,000 BTU) split unit at EU SEER {EU_REF_SEER} (energy class A++). The 3.5 kW is the
            cooling it delivers, not the electricity it uses: an A++ unit moves about {EU_REF_SEER} units of heat for every
            unit of electricity, so it uses about {(EU_REF_KW / EU_REF_SEER).toFixed(2)} kWh an hour. Per hour = that times the
            price per kWh. The yearly range runs from the coolest to the
            hottest city we list for each country. Each country uses the price that best matches what AC adds to a bill,
            and the source differs by country (see each page). U.S. cents use €1 = ${USD_PER_EUR.toFixed(3)} and{' '}
            {`£1 = $${(USD_PER_EUR / GBP_PER_EUR).toFixed(3)}`} ({FX_AS_OF}).
          </p>

          <h2 className={h2}>Climate matters more than price</h2>
          <p className={p}>
            The EU energy label assumes an air conditioner runs about 350 full-load hours a year, based on an average
            European climate. Real homes vary far more than that. Our estimates run from about 1,600 hours in Nicosia and
            1,200 in Seville down to 250 in Paris and 30 in Edinburgh. That's why the yearly cost in Seville can be several times
            the cost in Paris, even though a kWh costs about the same, and why Malta, with some of the cheapest power in
            Europe, still spends more on cooling than Germany.
          </p>

          <h2 className={h2}>Split or portable?</h2>
          <p className={p}>
            A portable unit is the quick fix in a heatwave, but it's the expensive way to cool. It draws about 1 kW, and its
            exhaust hose pushes air outside that's replaced by warm air leaking back in. A 3.5 kW split unit at SEER{' '}
            {EU_REF_SEER} draws about {(EU_REF_KW / EU_REF_SEER).toFixed(2)} kW on average while delivering more cooling. A split
            unit costs more to buy and install, but much less to run, and many are also heat pumps that heat efficiently in
            winter.
          </p>

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
                {c.name}: <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">{c.source}</a>.
              </li>
            ))}
            <li>Electricity used (kWh) = cooling capacity (kW) ÷ SEER × hours; cost = kWh × price. Cooling hours by city are our estimate.</li>
          </ul>
          <p className="text-sm text-gray-600 mb-4">
            Also see <Link to="/ac-cost/caribbean" className={a}>the Caribbean</Link>,{' '}
            <Link to="/ac-cost/canada" className={a}>Canada</Link> and <Link to="/ac-cost" className={a}>every U.S. state</Link>.
          </p>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
