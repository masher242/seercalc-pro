import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import FanSeries from '../components/FanSeries';
import { articleJsonLd, SITE_URL } from '../data/site';
import { STATES, US_RATE, RATES_AS_OF, RATES_SOURCE_URL, usd, cents } from '../data/acCost';
import { COUNTRIES, CARIBBEAN_UPDATED } from '../data/caribbean';
import { PROVINCES, CANADA_RATES_DATE, CANADA_SOURCE_URL, cad } from '../data/canada';
import { EU_COUNTRIES, money } from '../data/europe';
import eu from '../data/euHouseholdRates.json';
import { FANS_UPDATED, FAN_TYPES, fanType, FAN_MONTH_HOURS, AC_KW } from '../data/fans';

const PATH = '/blog/cost-to-run-a-fan';
const TITLE = 'Cost to Run a Fan: Ceiling, Box & Tower Fans by State';
const HEADLINE = 'How Much Does It Cost to Run a Fan? Ceiling, Box and Tower Fans, by State and Country';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';
const ext = 'text-teal-700 hover:underline';

const STD = fanType('ac-ceiling');
const DC = fanType('dc-ceiling');
const BOX = fanType('box');
/** cost of running a fan of `watts` for `hours` at `rate` per kWh */
const cost = (watts: number, hours: number, rate: number) => (watts / 1000) * hours * rate;

interface Row { key: string; name: string; link?: string; rate: number; note?: string }

/** One region's table: price, then a standard fan per hour and a month of each fan type. */
function CostTable({ rows, fmt, rateLabel, unit }: { rows: Row[]; fmt: (n: number, digits?: number) => string; rateLabel: (r: number) => string; unit: string }) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse text-sm min-w-[620px]">
        <thead>
          <tr className="bg-teal-50">
            <th className={th}>Where</th>
            <th className={th}>Electricity price ({unit})</th>
            <th className={th}>Standard ceiling fan, per hour</th>
            <th className={th}>Standard ceiling fan, per month</th>
            <th className={th}>DC ceiling fan, per month</th>
            <th className={th}>Box fan, per month</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <td className={`${td} font-medium`}>
                {r.link ? <Link to={r.link} className={a}>{r.name}</Link> : r.name}
                {r.note && <span className="block text-xs font-normal text-gray-500">{r.note}</span>}
              </td>
              <td className={td}>{rateLabel(r.rate)}</td>
              <td className={td}>{fmt(cost(STD.watts, 1, r.rate), 3)}</td>
              <td className={td}>{fmt(cost(STD.watts, FAN_MONTH_HOURS, r.rate), 2)}</td>
              <td className={td}>{fmt(cost(DC.watts, FAN_MONTH_HOURS, r.rate), 2)}</td>
              <td className={td}>{fmt(cost(BOX.watts, FAN_MONTH_HOURS, r.rate), 2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FanCostCalculator() {
  const [watts, setWatts] = useState(STD.watts);
  const [hours, setHours] = useState(8);
  const [rateC, setRateC] = useState(+(US_RATE * 100).toFixed(2));
  const rate = rateC / 100;
  const input = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500';
  const label = 'block text-sm font-medium text-gray-700 mb-1';
  return (
    <div className="rounded-lg border border-teal-200 bg-teal-50/50 p-5 mb-6">
      <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-3">Your fan</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {FAN_TYPES.map((f) => (
          <button key={f.id} type="button" onClick={() => setWatts(f.watts)} aria-pressed={watts === f.watts}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${watts === f.watts ? 'bg-[#17204d] text-white border-[#17204d]' : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400'}`}>
            {f.short}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label htmlFor="fc-watts" className={label}>Watts</label>
          <input id="fc-watts" type="number" min={1} max={1000} step={1} className={input} value={watts}
            onChange={(e) => setWatts(Math.max(0, Number(e.target.value)))} />
        </div>
        <div>
          <label htmlFor="fc-hours" className={label}>Hours a day</label>
          <input id="fc-hours" type="number" min={0} max={24} step={1} className={input} value={hours}
            onChange={(e) => setHours(Math.min(24, Math.max(0, Number(e.target.value))))} />
        </div>
        <div>
          <label htmlFor="fc-rate" className={label}>Rate (¢/kWh)</label>
          <input id="fc-rate" type="number" min={1} max={150} step={0.01} className={input} value={rateC}
            onChange={(e) => setRateC(Math.max(0, Number(e.target.value)))} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { l: 'Per hour', v: usd(cost(watts, 1, rate), 3) },
          { l: 'Per month', v: usd(cost(watts, hours * 30, rate), 2) },
          { l: 'Per year', v: usd(cost(watts, hours * 365, rate), 2) },
        ].map((x) => (
          <div key={x.l} className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500">{x.l}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{x.v}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Watts are on your fan's EnergyGuide label or nameplate. "Per year" assumes the same hours every day; most fans run
        only in the warm months.
      </p>
    </div>
  );
}

export default function BlogArticleFanCost() {
  const usRows: Row[] = [...STATES].sort((x, y) => x.name.localeCompare(y.name)).map((s) => ({ key: s.abbr, name: s.name, link: `/ac-cost/${s.slug}`, rate: s.rate }));
  const sorted = [...STATES].sort((x, y) => y.rate - x.rate);
  const most = sorted[0];
  const least = sorted[sorted.length - 1];
  const cbRows: Row[] = [...COUNTRIES].sort((x, y) => x.name.localeCompare(y.name)).map((c) => ({ key: c.slug, name: c.name, link: `/ac-cost/${c.slug}`, rate: c.usdRate, note: c.asOf }));
  const caRows: Row[] = [...PROVINCES].sort((x, y) => x.name.localeCompare(y.name)).map((pv) => ({ key: pv.slug, name: pv.name, link: `/ac-cost/canada/${pv.slug}`, rate: pv.city.extraRate, note: pv.city.name }));
  const euCountries = eu.countries as Record<string, { name: string; price: number; periodLabel?: string }>;
  const pageFor = (name: string) => EU_COUNTRIES.find((c) => c.name === name);
  const euRows: Row[] = Object.entries(euCountries)
    .map(([code, c]) => ({ key: code, name: c.name, link: pageFor(c.name) ? `/ac-cost/${pageFor(c.name)!.slug}` : undefined, rate: c.price, note: c.periodLabel }))
    .sort((x, y) => x.name.localeCompare(y.name));
  const uk = EU_COUNTRIES.find((c) => c.slug === 'united-kingdom');

  const stdHour = cost(STD.watts, 1, US_RATE);
  const stdMonth = cost(STD.watts, FAN_MONTH_HOURS, US_RATE);
  const dcMonth = cost(DC.watts, FAN_MONTH_HOURS, US_RATE);
  const acHour = AC_KW * US_RATE;

  const description = `A ceiling fan costs about ${cents(stdHour)} an hour, ${usd(stdMonth, 2)} a month at 8 hours a day (U.S. average). Fan running costs for every state, the Caribbean, Canada and Europe.`;

  const faqs = [
    {
      q: 'How much does it cost to run a ceiling fan per hour?',
      a: `About ${cents(stdHour)} an hour for a standard ceiling fan on high (${STD.watts} W) at the U.S. average residential rate of ${cents(US_RATE)}/kWh (${RATES_AS_OF}), and about ${cents(cost(DC.watts, 1, US_RATE))} for a DC-motor fan (${DC.watts} W). On low speed it's a fraction of that.`,
    },
    {
      q: 'How much does it cost to run a fan all night?',
      a: `Eight hours of a standard ceiling fan on high costs about ${usd(cost(STD.watts, 8, US_RATE), 2)} at the U.S. average rate; a box fan about ${usd(cost(BOX.watts, 8, US_RATE), 2)}; a DC ceiling fan about ${usd(cost(DC.watts, 8, US_RATE), 2)}.`,
    },
    {
      q: 'Is it expensive to leave a fan on 24/7?',
      a: `Not very, but it adds up and does nothing in an empty room. A standard ceiling fan running around the clock costs about ${usd(cost(STD.watts, 24 * 30, US_RATE), 2)} a month at U.S. average rates, and about ${usd(cost(STD.watts, 24 * 30, most.rate), 2)} in ${most.name}. Fans cool people, not rooms, so switch them off when you leave.`,
    },
    {
      q: 'Is a fan cheaper to run than air conditioning?',
      a: `By a wide margin. A 3-ton central air conditioner costs about ${usd(acHour, 2)} an hour at U.S. average rates, roughly ${Math.round(acHour / stdHour)} times a standard ceiling fan. But a fan doesn't cool the air, so it only saves money if you run the AC less.`,
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
        <meta property="article:section" content="Fans and Airflow" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd({ path: PATH, headline: HEADLINE, description, datePublished: FANS_UPDATED, dateModified: FANS_UPDATED }))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
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
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">Fans and Airflow</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 6 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">Pennies an hour almost everywhere. Here are the exact numbers for where you live.</p>
            <ArticleByline updated={FANS_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              At the U.S. average residential rate of {cents(US_RATE)}/kWh, a standard ceiling fan on high costs about{' '}
              <strong>{cents(stdHour)} an hour</strong> and <strong>{usd(stdMonth, 2)} a month</strong> running 8 hours a day.
              A DC-motor ceiling fan costs about {usd(dcMonth, 2)} a month, and a box fan about{' '}
              {usd(cost(BOX.watts, FAN_MONTH_HOURS, US_RATE), 2)}. For comparison, one hour of a 3-ton central air
              conditioner costs about {usd(acHour, 2)}. Prices for every state, the Caribbean, Canada and Europe are below.
            </p>
          </div>

          <FanSeries current={PATH} />

          <h2 className={h2}>The formula</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4 font-mono text-sm text-gray-800">
            Cost = watts ÷ 1,000 × hours × your price per kWh
          </div>
          <p className={p}>
            A {STD.watts} W ceiling fan for 8 hours uses {(STD.watts * 8 / 1000).toFixed(2)} kWh. At {cents(US_RATE)}/kWh
            that's {usd(cost(STD.watts, 8, US_RATE), 2)}. Your fan's watts are on its yellow EnergyGuide label or nameplate.
          </p>

          <h2 className={h2}>How much power fans use</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Fan</th>
                  <th className={th}>Typical power, high speed</th>
                  <th className={th}>Watts used in our tables</th>
                </tr>
              </thead>
              <tbody>
                {FAN_TYPES.map((f) => (
                  <tr key={f.id}>
                    <td className={`${td} font-medium`}>{f.name}</td>
                    <td className={td}>{f.range}</td>
                    <td className={td}>{f.watts} W</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>
            Low speed uses far less: an ENERGY STAR-listed 44" ceiling fan draws 17.6 W on high and just 2.7 W on low. Lights
            built into a fan are extra.
          </p>

          <h2 className={h2}>Work out your own cost</h2>
          <FanCostCalculator />

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 mb-4">
            <p className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">What these tables show</p>
            <p className="text-gray-700 leading-relaxed">
              The cost of running one fan on high speed. "Per hour" is one hour of a standard ({STD.watts} W) ceiling fan.
              "Per month" is 8 hours a day for 30 days ({FAN_MONTH_HOURS} hours) of a standard ceiling fan ({STD.watts} W), a
              DC-motor ceiling fan ({DC.watts} W) and a 20" box fan ({BOX.watts} W). Prices are in each place's own currency.
            </p>
          </div>

          <h2 className={h2}>Cost to run a fan in every U.S. state</h2>
          <p className={p}>
            Residential electricity in {most.name} ({cents(most.rate)}/kWh) costs {(most.rate / least.rate).toFixed(1)} times
            as much as in {least.name} ({cents(least.rate)}), so the same fan costs{' '}
            {usd(cost(STD.watts, FAN_MONTH_HOURS, most.rate), 2)} a month in one and{' '}
            {usd(cost(STD.watts, FAN_MONTH_HOURS, least.rate), 2)} in the other. U.S. average: {usd(stdMonth, 2)}. Each state
            links to its AC running costs.
          </p>
          <CostTable rows={usRows} fmt={(n, d) => usd(n, d)} rateLabel={(r) => cents(r)} unit="per kWh" />

          <h2 className={h2}>The Caribbean</h2>
          <p className={p}>
            In U.S. dollars, at each country's newest available residential rate (dates under each name). Fans matter more
            here: cooling is needed most of the year and power often costs two or three times the U.S. average.
          </p>
          <CostTable rows={cbRows} fmt={(n, d) => usd(n, d)} rateLabel={(r) => cents(r)} unit="US$ per kWh" />

          <h2 className={h2}>Canada</h2>
          <p className={p}>
            In Canadian dollars before tax, at the price of each extra kWh between 1,000 and 2,000 a month in the province's
            largest listed city (named under each province), which is what running a fan adds to the bill.
          </p>
          <CostTable rows={caRows} fmt={(n, d) => cad(n, d)} rateLabel={(r) => `C$${r.toFixed(3)}`} unit="C$ per kWh" />

          <h2 className={h2}>Europe</h2>
          <p className={p}>
            In euros: Eurostat's household price for 2,500–4,999 kWh a year, all taxes included ({eu.periodLabel}, or the
            newest period noted under a country's name).{uk && <> The United Kingdom, which Eurostat no longer covers, is
            below in pounds at the Ofgem price-cap unit rate.</>}
          </p>
          <CostTable rows={euRows} fmt={(n, d) => money('EUR', n, d)} rateLabel={(r) => `€${r.toFixed(3)}`} unit="€ per kWh" />
          {uk && (
            <CostTable
              rows={[{ key: 'uk', name: 'United Kingdom', link: `/ac-cost/${uk.slug}`, rate: uk.rate, note: uk.asOf }]}
              fmt={(n, d) => money('GBP', n, d)} rateLabel={(r) => `£${r.toFixed(3)}`} unit="£ per kWh" />
          )}

          <h2 className={h2}>Cheaper ways to run a fan</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Turn it off when you leave the room.</strong> Fans cool people, not rooms.</li>
            <li><strong>Use a lower speed</strong> when it's enough; power drops sharply at low speed.</li>
            <li><strong>Choose a DC motor</strong> when you buy: about half the power of a standard ceiling fan. See the{' '}
              <Link to="/blog/ceiling-fan-buying-guide" className={a}>ceiling fan buying guide</Link>.</li>
            <li><strong>Use the fan to run the AC less.</strong> That's where the real saving is. See{' '}
              <Link to="/blog/ceiling-fan-vs-ac-savings" className={a}>ceiling fan vs. AC</Link>.</li>
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

          <h2 className={h2}>Sources</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 mb-4">
            <li>U.S. rates: <a href={RATES_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={ext}>EIA Electric Power Monthly, Table 5.6.A</a> ({RATES_AS_OF}).</li>
            <li>Caribbean: utility tariffs and published household prices, as listed on each <Link to="/ac-cost/caribbean" className={ext}>country page</Link> (updated {CARIBBEAN_UPDATED}).</li>
            <li>Canada: <a href={CANADA_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={ext}>Hydro-Québec, Comparison of Electricity Prices in Major North American Cities</a> (rates in effect {CANADA_RATES_DATE}).</li>
            <li>Europe: <a href={eu.sourceUrl} target="_blank" rel="noopener noreferrer" className={ext}>{eu.source}</a>; United Kingdom: Ofgem price cap, as on the <Link to="/ac-cost/united-kingdom" className={ext}>UK page</Link>.</li>
            <li>Fan wattages: ENERGY STAR listing, a manufacturer EnergyGuide label and published watt-meter tests; typical figures, check your fan's label.</li>
          </ul>
          <p className="text-sm text-gray-500 mb-4">
            Free to reuse these figures with a link back to this page.
          </p>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
