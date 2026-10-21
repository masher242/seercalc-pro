import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Sun } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import AustraliaCostMap from '../components/AustraliaCostMap';
import { articleJsonLd, SITE_URL } from '../data/site';
import { US_RATE, RATES_AS_OF, cents } from '../data/acCost';
import {
  AU_STATES, AU_UPDATED, AU_PERIOD, AU_REF_KW, AU_REF_EFF, PORTABLE_KW_ELEC, USD_PER_AUD, AU_FX_AS_OF,
  cityRate, yearCost, hourCost, aud, auCents,
} from '../data/australia';

const PATH = '/ac-cost/australia';
const TITLE = 'Cost to Run AC in Australia: Every State, City by City';
const HEADLINE = 'What It Costs to Run Air Conditioning in Australia';

const th = 'border border-gray-200 px-3 py-2.5 text-left align-bottom font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

const kwhPerHour = (AU_REF_KW / AU_REF_EFF).toFixed(2);

export default function AcCostAustralia() {
  const ranked = [...AU_STATES].sort((x, y) => x.rank - y.rank);
  const priciest = ranked[0];
  const cheapest = ranked[ranked.length - 1];
  const cityYear = (s: (typeof AU_STATES)[number], c: (typeof AU_STATES)[number]['cities'][number]) =>
    yearCost(AU_REF_KW, AU_REF_EFF, c.hours, cityRate(s, c));
  const range = (s: (typeof AU_STATES)[number]) => {
    const years = s.cities.map((c) => cityYear(s, c));
    return s.cities.length === 1 ? aud(years[0]) : `${aud(Math.min(...years))}–${aud(Math.max(...years))}`;
  };
  const priceRange = (s: (typeof AU_STATES)[number]) => {
    const u = s.zones.map((z) => z.usage);
    return u.length === 1 ? auCents(u[0]) : `${auCents(Math.min(...u))}–${auCents(Math.max(...u))}`;
  };
  const allCities = AU_STATES.flatMap((s) => s.cities.map((c) => ({ s, c, year: cityYear(s, c) })));
  const top = [...allCities].sort((x, y) => y.year - x.year).slice(0, 8);
  const darwin = allCities.find((x) => x.c.name === 'Darwin');
  const hobart = allCities.find((x) => x.c.name === 'Hobart');
  const adelaide = allCities.find((x) => x.c.name === 'Adelaide');
  const brisbane = allCities.find((x) => x.c.name === 'Brisbane');

  const description = `What a 3.5 kW split air conditioner costs to run per hour and per year in every Australian state and territory, city by city, at the 2026–27 regulated electricity prices, in Australian dollars.`;

  const faqs = [
    {
      q: 'Where in Australia is air conditioning most expensive to run?',
      a: `Per kWh, ${priciest.name} has the highest usage charge (${auCents(priciest.refZone.usage)} under the ${priciest.offer}). But yearly cost depends far more on climate: in Darwin, the Pilbara and north Queensland the AC runs for much of the year, so cooling costs the most there. One 3.5 kW split costs about ${darwin ? aud(darwin.year) : ''} a year in Darwin, against ${hobart ? aud(hobart.year) : ''} in Hobart.`,
    },
    {
      q: 'How much does it cost to run a split system per hour in Australia?',
      a: `A typical 3.5 kW inverter split uses about ${kwhPerHour} kWh an hour, so it costs about ${ranked.map((s) => `${aud(hourCost(AU_REF_KW, AU_REF_EFF, s.rate), 2)} in ${s.ref.name}`).join(', ')} at each state's 2026–27 default or regulated usage charge.`,
    },
    {
      q: 'How much does a portable air conditioner cost to run in Australia?',
      a: `A typical portable unit draws about 1 kW, so it costs roughly the price of 1 kWh per hour: from about ${aud(PORTABLE_KW_ELEC * cheapest.rate, 2)} in ${cheapest.ref.name} to ${aud(PORTABLE_KW_ELEC * priciest.rate, 2)} in ${priciest.ref.name}. A split system gives more cooling for about half the electricity.`,
    },
    {
      q: 'Is the Default Market Offer what I pay?',
      a: 'Not necessarily. The Default Market Offer (and the Victorian Default Offer) is a regulated reference price and the most a retailer can charge on its standing offer. Many households on market offers pay less per kWh. Use the estimator on each state page with the usage rate from your own bill.',
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
          {JSON.stringify(articleJsonLd({ path: PATH, headline: HEADLINE, description, dateModified: AU_UPDATED }))}
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
            name: 'Cost to run air conditioning in Australian states and territories',
            itemListElement: ranked.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: `${SITE_URL}/ac-cost/australia/${s.slug}` })),
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
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">Australia</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 6 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              Electricity prices for 2026–27, hourly and yearly cooling costs, and what an efficient split system saves, in
              every state and territory, in Australian dollars.
            </p>
            <ArticleByline updated={AU_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              A typical 3.5 kW (12,000 BTU) inverter split system, which uses about {kwhPerHour} kWh of electricity an hour,
              costs from about <strong>{aud(hourCost(AU_REF_KW, AU_REF_EFF, cheapest.rate), 2)} an hour in {cheapest.ref.name}</strong>{' '}
              to <strong>{aud(hourCost(AU_REF_KW, AU_REF_EFF, priciest.rate), 2)} in {priciest.ref.name}</strong>, at the
              2026–27 regulated usage charges. {priciest.name} has the dearest power, but climate decides the yearly bill:
              {darwin && hobart ? <> one unit costs about <strong>{aud(darwin.year)} a year in Darwin</strong> and {aud(hobart.year)} in Hobart.</> : null}
            </p>
          </div>

          <p className={p}>
            I run stores where power costs over 30¢ a kWh and the air conditioning never gets a season off, so Australia's
            numbers look familiar. Prices per kWh differ between states, but far less than the climate does: a split system in Darwin or Karratha works harder in a year than one in Melbourne does in a decade.
            These pages put a dollar figure on both sides of that.
          </p>

          <AustraliaCostMap />

          <h2 className={h2}>Cost to run AC by state and territory</h2>
          <div className="rounded-lg border border-teal-200 bg-teal-50/60 p-4 mb-4 text-sm text-gray-800">
            <p className="font-bold text-gray-900 mb-2">What this table shows</p>
            <p className="mb-2">
              Every cost is for <strong>one 3.5 kW wall-mounted inverter split system</strong>, the usual size for a large
              bedroom or small living room. 3.5 kW is how much <em>cooling</em> it puts out, about{' '}
              <strong>12,000 BTU, or 1 ton</strong>. It is not the electricity it uses: a typical new unit uses only about{' '}
              <strong>{kwhPerHour} kWh of electricity for each hour it runs</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Usage charge:</strong> the regulated flat-rate price of 1 kWh for {AU_PERIOD}, GST included (a range
                where the state has several networks). The daily supply charge isn't included, because it's paid whether
                the AC runs or not.
              </li>
              <li>
                <strong>Cost per hour:</strong> one hour of the AC running at full power in the main city, so {kwhPerHour} kWh
                × that city's usage charge.
              </li>
              <li>
                <strong>Cost per year:</strong> the cost per hour × how many hours a year the AC runs, which depends on the
                climate, so we show the range from the coolest to the hottest city we list (for example, Albany to Karratha
                in WA). A home with two or three units, or a ducted system, pays several times as much.
              </li>
            </ul>
          </div>
          <div className="overflow-x-auto mb-3">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>State or territory</th>
                  <th className={th}>Usage charge per kWh</th>
                  <th className={th}>Same price in U.S. cents<span className="block text-xs font-normal text-gray-500">main city</span></th>
                  <th className={th}>Cost per hour of AC<span className="block text-xs font-normal text-gray-500">one 3.5 kW unit, main city</span></th>
                  <th className={th}>Cost per year of AC<span className="block text-xs font-normal text-gray-500">coolest to hottest city</span></th>
                  <th className={th}>Price set by</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((s) => (
                  <tr key={s.slug} className="hover:bg-gray-50">
                    <td className={td}><Link to={`/ac-cost/australia/${s.slug}`} className={a}>{s.name}</Link></td>
                    <td className={td}>{priceRange(s)}</td>
                    <td className={td}>{cents(s.usdRate)}</td>
                    <td className={td}>{aud(hourCost(AU_REF_KW, AU_REF_EFF, s.rate), 2)} <span className="text-gray-400">({s.ref.name})</span></td>
                    <td className={td}>{range(s)}</td>
                    <td className={`${td} text-xs text-gray-500`}>{s.offer}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className={`${td} font-semibold`}>U.S. average</td>
                  <td className={td}>—</td>
                  <td className={td}>{cents(US_RATE)}</td>
                  <td className={td}>—</td>
                  <td className={td}>—</td>
                  <td className={`${td} text-xs text-gray-500`}>EIA, {RATES_AS_OF}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Sorted by the usage charge in each main city. The unit is assumed to have a seasonal efficiency of{' '}
            {AU_REF_EFF.toFixed(1)}: it delivers about {AU_REF_EFF} kW of cooling for every kW of electricity over a season,
            which is why 3.5 kW of cooling takes only about {kwhPerHour} kWh. U.S. cents use A$1 = ${USD_PER_AUD.toFixed(3)} ({AU_FX_AS_OF}).
          </p>

          <h2 className={h2}>Where AC costs the most over a year</h2>
          <p className={p}>
            The cities with the biggest yearly cooling bill aren't the ones with the dearest power. They're the hottest ones.
            Yearly cost of one 3.5 kW split at each city's usage charge and our estimate of its cooling hours:
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>City</th>
                  <th className={th}>State</th>
                  <th className={th}>Hours the AC runs per year</th>
                  <th className={th}>Usage charge per kWh</th>
                  <th className={th}>Cost per year, 3.5 kW split</th>
                </tr>
              </thead>
              <tbody>
                {top.map(({ s, c, year }) => (
                  <tr key={c.name}>
                    <td className={`${td} font-medium`}>{c.name}</td>
                    <td className={td}><Link to={`/ac-cost/australia/${s.slug}`} className={a}>{s.short}</Link></td>
                    <td className={td}>{c.hours.toLocaleString()}</td>
                    <td className={td}>{auCents(cityRate(s, c) * 100)}</td>
                    <td className={td}>{aud(year)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {adelaide && brisbane && (
            <p className={p}>
              The same effect shows between the capitals. Adelaide pays about {Math.round((adelaide.s.rate / brisbane.s.rate - 1) * 100)}%
              more per kWh than Brisbane, yet Brisbane's longer, humid summer means a split there costs about{' '}
              {aud(brisbane.year)} a year against {aud(adelaide.year)} in Adelaide.
            </p>
          )}

          <h2 className={h2}>How prices are set</h2>
          <p className={p}>
            In NSW, south-east Queensland and South Australia, the Australian Energy Regulator sets the Default Market Offer:
            a cap on standing-offer prices for each electricity network, reset every July 1. Victoria has its own Victorian
            Default Offer, set by the Essential Services Commission. WA, Tasmania, the ACT, the Northern Territory and
            regional Queensland have regulated or government-set tariffs. Many households are on market offers below these
            prices, so they're a ceiling and a benchmark rather than what everyone pays.
          </p>
          <div className="flex gap-3 rounded-lg bg-amber-50 border border-amber-200 p-5 mb-4">
            <Sun className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-900 mb-1">Rooftop solar changes the sums</p>
              <p>
                If your panels are generating, the AC runs partly on your own power, and each of those kWh costs only the
                feed-in tariff you'd otherwise earn, which is far below the usage charge. That's why cooling the house in the
                middle of the day and letting it coast into the evening peak is the standard advice for solar homes.
              </p>
            </div>
          </div>

          <h2 className={h2}>Split, ducted or portable?</h2>
          <p className={p}>
            Most Australian homes cool with reverse-cycle split systems, which also heat efficiently in winter. Ducted
            systems cool the whole house from one unit but use several times the electricity of a single split, so zoning
            matters. A portable unit is the most expensive way to cool a room: it draws about 1 kW and its exhaust hose pulls
            warm air back in, while a 3.5 kW split draws about {kwhPerHour} kW for more cooling.
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
            {ranked.map((s) => (
              <li key={s.slug}>
                {s.name}: <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">{s.source}</a>.
              </li>
            ))}
            <li>
              Electricity used (kWh) = cooling capacity (kW) ÷ seasonal efficiency × hours; cost = kWh × usage charge.
              Seasonal efficiency {AU_REF_EFF.toFixed(1)} and cooling hours by city are our estimates.
            </li>
          </ul>
          <p className="text-sm text-gray-600 mb-4">
            Also see <Link to="/ac-cost/caribbean" className={a}>the Caribbean</Link>,{' '}
            <Link to="/ac-cost/canada" className={a}>Canada</Link>, <Link to="/ac-cost/europe" className={a}>Europe</Link> and{' '}
            <Link to="/ac-cost" className={a}>every U.S. state</Link>.
          </p>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
