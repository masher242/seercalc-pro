import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Gauge } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import AsiaCostMap from '../components/AsiaCostMap';
import { articleJsonLd, SITE_URL } from '../data/site';
import { US_RATE, RATES_AS_OF, cents } from '../data/acCost';
import {
  ASIA_COUNTRIES, ASIA_UPDATED, ASIA_REF_KW, ASIA_REF_EFF, USD_PER, ASIA_FX_SOURCE, asiaCityRate, yearCost, hourCost,
  lmoney, lprice, usd0, type AsiaCountry,
} from '../data/asia';

const PATH = '/ac-cost/asia';
const TITLE = 'Cost to Run AC in Asia: 6 Countries Compared';
const HEADLINE = 'What It Costs to Run Air Conditioning in Asia';

const th = 'border border-gray-200 px-3 py-2.5 text-left align-bottom font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

const kwhPerHour = (ASIA_REF_KW / ASIA_REF_EFF).toFixed(2);
const inName = (c: AsiaCountry) => (c.slug === 'philippines' ? 'the Philippines' : c.name);

export default function AcCostAsia() {
  const ranked = [...ASIA_COUNTRIES].sort((x, y) => x.rank - y.rank);
  const usdYear = (c: AsiaCountry) => yearCost(ASIA_REF_KW, ASIA_REF_EFF, c.ref.hours, c.rate) * USD_PER[c.currency];
  const byYear = [...ASIA_COUNTRIES].sort((x, y) => usdYear(y) - usdYear(x));
  const priciest = ranked[0];
  const cheapest = ranked[ranked.length - 1];
  const range = (c: AsiaCountry) => {
    const ys = c.cities.map((x) => yearCost(ASIA_REF_KW, ASIA_REF_EFF, x.hours, asiaCityRate(c, x)));
    return c.cities.length === 1 ? lmoney(c.currency, ys[0]) : `${lmoney(c.currency, Math.min(...ys))}–${lmoney(c.currency, Math.max(...ys))}`;
  };
  const priceRange = (c: AsiaCountry) => {
    const r = c.zones.map((z) => z.rate);
    return r.length === 1 ? lprice(c.currency, r[0]) : `${lprice(c.currency, Math.min(...r))}–${lprice(c.currency, Math.max(...r))}`;
  };
  const tokyo = ASIA_COUNTRIES.find((c) => c.slug === 'japan');
  const manila = ASIA_COUNTRIES.find((c) => c.slug === 'philippines');
  const malaysia = ASIA_COUNTRIES.find((c) => c.slug === 'malaysia');

  const description = 'What a 1.5 hp (12,000 BTU) inverter air conditioner costs to run per hour and per year in Singapore, the Philippines, Hong Kong, Japan, Malaysia and Thailand, at current electricity prices, in local currency and U.S. dollars.';

  const faqs = [
    {
      q: 'Where in Asia is air conditioning most expensive to run?',
      a: `Per kWh, ${inName(priciest)} has the highest price of the six countries here (about ${cents(priciest.usdRate)} in U.S. money). Over a year, the hot, humid cities where the AC runs most of the year cost the most: one 1.5 hp unit costs about ${usd0(usdYear(byYear[0]))} a year in ${byYear[0].ref.name}, against about ${usd0(usdYear(byYear[byYear.length - 1]))} in ${byYear[byYear.length - 1].ref.name}.`,
    },
    {
      q: 'How much does a 1.5 hp aircon cost to run per hour?',
      a: `A typical 1.5 hp (12,000 BTU) inverter unit uses about ${kwhPerHour} kWh an hour, so it costs about ${ranked.map((c) => `${lmoney(c.currency, hourCost(ASIA_REF_KW, ASIA_REF_EFF, c.rate), true)} in ${inName(c)}`).join(', ')}.`,
    },
    {
      q: 'Is an inverter air conditioner worth it in a tropical climate?',
      a: `Usually, yes. Where the AC runs 2,000 hours or more a year, replacing an old non-inverter unit (efficiency about 3) with a typical inverter split (about ${ASIA_REF_EFF.toFixed(1)}) cuts its electricity use by about 40%. Each country page shows the saving in local currency.`,
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
          {JSON.stringify(articleJsonLd({ path: PATH, headline: HEADLINE, description, dateModified: ASIA_UPDATED }))}
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
            name: 'Cost to run air conditioning in Asian countries',
            itemListElement: ranked.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: `${SITE_URL}/ac-cost/asia/${c.slug}` })),
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
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">Asia</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 6 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              Electricity prices, hourly and yearly cooling costs, and what an inverter unit saves, in Singapore, the
              Philippines, Hong Kong, Japan, Malaysia and Thailand.
            </p>
            <ArticleByline updated={ASIA_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              A typical 1.5 hp (12,000 BTU, 3.5 kW) inverter air conditioner uses about {kwhPerHour} kWh of electricity an
              hour. At current prices that costs from about{' '}
              <strong>{lmoney(cheapest.currency, hourCost(ASIA_REF_KW, ASIA_REF_EFF, cheapest.rate), true)} an hour in {inName(cheapest)}</strong>{' '}
              ({cents(cheapest.usdRate)} a kWh in U.S. money) to{' '}
              <strong>{lmoney(priciest.currency, hourCost(ASIA_REF_KW, ASIA_REF_EFF, priciest.rate), true)} in {inName(priciest)}</strong>{' '}
              ({cents(priciest.usdRate)}). Over a year, the tropical cities pay most because the AC rarely gets a day off:
              one unit costs about <strong>{usd0(usdYear(byYear[0]))} a year in {byYear[0].ref.name}</strong>, against{' '}
              {usd0(usdYear(byYear[byYear.length - 1]))} in {byYear[byYear.length - 1].ref.name}.
            </p>
          </div>

          <p className={p}>
            My stores are in a climate a lot like Manila's or Bangkok's: hot all year, humid, and with power that isn't cheap.
            In that kind of climate the air conditioner is the biggest line on the bill, and the type of unit matters as much
            as the price of a kWh. These pages put both into numbers, in each country's own currency.
          </p>

          <AsiaCostMap />

          <h2 className={h2}>Cost to run AC by country</h2>
          <div className="rounded-lg border border-teal-200 bg-teal-50/60 p-4 mb-4 text-sm text-gray-800">
            <p className="font-bold text-gray-900 mb-2">What this table shows</p>
            <p className="mb-2">
              Every cost is for <strong>one 1.5 hp wall-mounted inverter split</strong>, the usual size for a living room or
              large bedroom. 1.5 hp is a sales size, not the electricity it uses: it puts out about{' '}
              <strong>12,000 BTU (3.5 kW) of cooling</strong> and uses only about{' '}
              <strong>{kwhPerHour} kWh of electricity for each hour it runs</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Price per kWh:</strong> what each extra kWh of air conditioning adds to a household bill, in local
                currency, including taxes. Each country page explains exactly how it's worked out (some countries charge more
                per kWh the more you use).
              </li>
              <li><strong>Cost per hour:</strong> one hour of the AC running at full power, so {kwhPerHour} kWh × the price.</li>
              <li>
                <strong>Cost per year:</strong> the cost per hour × how many hours a year the AC runs in each city's climate
                (our estimate). A home with two or three units pays two or three times as much.
              </li>
            </ul>
          </div>
          <div className="overflow-x-auto mb-3">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Country</th>
                  <th className={th}>Price per kWh</th>
                  <th className={th}>Same price in U.S. cents</th>
                  <th className={th}>Cost per hour of AC<span className="block text-xs font-normal text-gray-500">one 1.5 hp inverter unit</span></th>
                  <th className={th}>Cost per year of AC<span className="block text-xs font-normal text-gray-500">by city</span></th>
                  <th className={th}>Same per year in U.S. dollars<span className="block text-xs font-normal text-gray-500">main city</span></th>
                  <th className={th}>Price date</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((c) => (
                  <tr key={c.slug} className="hover:bg-gray-50">
                    <td className={td}><Link to={`/ac-cost/asia/${c.slug}`} className={a}>{c.name}</Link></td>
                    <td className={td}>{priceRange(c)}</td>
                    <td className={td}>{cents(c.usdRate)}</td>
                    <td className={td}>{lmoney(c.currency, hourCost(ASIA_REF_KW, ASIA_REF_EFF, c.rate), true)}</td>
                    <td className={td}>{range(c)}</td>
                    <td className={td}>{usd0(usdYear(c))} <span className="text-gray-400">({c.ref.name})</span></td>
                    <td className={`${td} text-xs text-gray-500`}>{c.asOf}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className={`${td} font-semibold`}>U.S. average</td>
                  <td className={td}>—</td>
                  <td className={td}>{cents(US_RATE)}</td>
                  <td className={td}>—</td>
                  <td className={td}>—</td>
                  <td className={td}>—</td>
                  <td className={`${td} text-xs text-gray-500`}>{RATES_AS_OF}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Sorted by price in U.S. cents. Unit efficiency: {ASIA_REF_EFF.toFixed(1)} (kW of cooling per kW of electricity
            over a season), our assumption for a typical new inverter split. Exchange rates: {ASIA_FX_SOURCE}.
          </p>

          <h2 className={h2}>Inverter or not: the biggest choice</h2>
          <div className="flex gap-3 rounded-lg bg-amber-50 border border-amber-200 p-5 mb-4">
            <Gauge className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-gray-700 leading-relaxed">
              <p>
                In a climate where the AC runs 2,000 hours or more a year, an old non-inverter or window unit uses roughly
                two-thirds more electricity than a typical new inverter split for the same cooling.
                {manila && <> In Metro Manila that's about {lmoney(manila.currency, yearCost(ASIA_REF_KW, 3, manila.ref.hours, manila.rate) - yearCost(ASIA_REF_KW, ASIA_REF_EFF, manila.ref.hours, manila.rate))} a year for one 1.5 hp unit.</>}
                {malaysia && <> In Kuala Lumpur it's about {lmoney(malaysia.currency, yearCost(ASIA_REF_KW, 3, malaysia.ref.hours, malaysia.rate) - yearCost(ASIA_REF_KW, ASIA_REF_EFF, malaysia.ref.hours, malaysia.rate))}.</>}{' '}
                Look for the energy label rating your country uses (stars or ticks) and the word "inverter".
              </p>
            </div>
          </div>
          {tokyo && (
            <p className={p}>
              Japan is the exception to the rule: its price per kWh is among the highest here, but the cooling season is
              short, so a unit in Tokyo costs far less over a year than one in Bangkok or Singapore. There, the heating
              performance of a reverse-cycle unit matters as much as its cooling.
            </p>
          )}

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
            <li>
              Electricity used (kWh) = cooling capacity (kW) ÷ seasonal efficiency × hours; cost = kWh × price. Seasonal
              efficiency {ASIA_REF_EFF.toFixed(1)} and cooling hours by city are our estimates. {ASIA_FX_SOURCE}.
            </li>
          </ul>
          <p className="text-sm text-gray-600 mb-4">
            Also see <Link to="/ac-cost/australia" className={a}>Australia</Link>,{' '}
            <Link to="/ac-cost/caribbean" className={a}>the Caribbean</Link>, <Link to="/ac-cost/europe" className={a}>Europe</Link>,{' '}
            <Link to="/ac-cost/canada" className={a}>Canada</Link> and <Link to="/ac-cost" className={a}>every U.S. state</Link>.
          </p>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
