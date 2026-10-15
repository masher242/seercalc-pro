import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, MapPin, Clock, Leaf } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import StateCostEstimator from '../components/StateCostEstimator';
import NotFound from './NotFound';
import { articleJsonLd, SITE_URL } from '../data/site';
import {
  US_RATE, RATES_AS_OF, TONNAGES, SEERS, REF_TONS, REF_SEER, SUMMER_MONTH_HOURS,
  annualCost, costPerHour, cents,
} from '../data/acCost';
import {
  getProvince, PROVINCES, CANADA_UPDATED, CANADA_RATES_DATE, CANADA_SOURCE, CANADA_SOURCE_URL,
  USD_PER_CAD, USD_PER_CAD_AS_OF, cad,
} from '../data/canada';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

export default function AcCostProvince() {
  const { province: slug } = useParams();
  const pr = getProvince(slug);
  if (!pr) return <NotFound />;

  const path = `/ac-cost/canada/${pr.slug}`;
  const rate = pr.rate;
  const perHour = costPerHour(REF_TONS, REF_SEER, rate);
  const month = perHour * SUMMER_MONTH_HOURS;
  const year = annualCost(REF_TONS, REF_SEER, pr.hours, rate);
  const yearExtra = annualCost(REF_TONS, REF_SEER, pr.hours, pr.city.extraRate);
  const ratio = pr.usdRate / US_RATE;
  const vsUs = ratio >= 1.03
    ? `${Math.round((ratio - 1) * 100)}% above the U.S. average`
    : ratio <= 0.97 ? `${Math.round((1 - ratio) * 100)}% below the U.S. average`
      : 'about the same as the U.S. average';
  const save10to16 = annualCost(REF_TONS, 10, pr.hours, rate) - annualCost(REF_TONS, 16, pr.hours, rate);
  const save14to18 = annualCost(REF_TONS, 14, pr.hours, rate) - annualCost(REF_TONS, 18, pr.hours, rate);
  const others = [...PROVINCES].filter((x) => x.slug !== pr.slug).sort((x, y) => x.rank - y.rank);
  const calcLink = `/?rate=${rate.toFixed(4)}&hours=${pr.hours}`;
  const extraHigher = pr.city.extraRate > rate * 1.02;
  const extraLower = pr.city.extraRate < rate * 0.98;
  const title = `Cost to Run AC in ${pr.name} 🍁 ${cents(rate)}/kWh`;
  const headline = `How Much Does It Cost to Run Air Conditioning in ${pr.name}?`;
  const description = `At ${pr.city.name}'s residential electricity price of ${cents(rate)}/kWh (${CANADA_RATES_DATE}, before tax), a 3-ton central AC costs about ${cad(perHour, 2)} an hour and roughly ${cad(year)} a year to run in ${pr.name}.`;

  const faqs = [
    {
      q: `How much does it cost to run AC per hour in ${pr.name}?`,
      a: `About ${cad(perHour, 2)} for a typical 3-ton central air conditioner rated SEER ${REF_SEER}, at ${pr.city.name}'s average residential price of ${cents(rate)}/kWh before tax (${CANADA_RATES_DATE}). A 1.5-ton unit, typical for one or two rooms, costs about ${cad(costPerHour(1.5, REF_SEER, rate), 2)} an hour.`,
    },
    {
      q: `How much does central air cost per month in ${pr.name}?`,
      a: `Running 8 hours a day for 30 days, a 3-ton SEER ${REF_SEER} system uses about ${Math.round((REF_TONS * 12 / REF_SEER) * SUMMER_MONTH_HOURS).toLocaleString()} kWh, or about ${cad(month)} before tax at ${cents(rate)}/kWh. Over a typical cooling season of about ${pr.hours.toLocaleString()} full-load hours, it comes to roughly ${cad(year)} a year.`,
    },
    {
      q: `Is a high-efficiency air conditioner worth it in ${pr.name}?`,
      a: `For cooling alone, the savings are modest. Replacing a SEER 10 unit with a SEER 16 saves about ${cad(save10to16)} a year, and going from SEER 14 to SEER 18 saves about ${cad(save14to18)} a year. If you're replacing the system anyway, a heat pump that also heats in winter usually saves far more than a higher-SEER air conditioner.`,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}${path}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${SITE_URL}${path}`} />
        <meta property="og:title" content={headline} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="article:author" content={`${SITE_URL}/about/mark-curant`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd({ path, headline, description, dateModified: CANADA_UPDATED }))}
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
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'AC Running Cost in Canada', item: `${SITE_URL}/ac-cost/canada` },
              { '@type': 'ListItem', position: 3, name: pr.name, item: `${SITE_URL}${path}` },
            ],
          })}
        </script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/ac-cost/canada" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          All Canadian provinces
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">
                <MapPin className="w-3.5 h-3.5" /> {pr.name}
              </span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{headline}</h1>
            <p className="text-xl text-gray-600">
              Hourly, monthly and yearly cooling costs at {pr.name}'s electricity price, by system size and SEER rating, in
              Canadian dollars.
            </p>
            <ArticleByline updated={CANADA_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              At {pr.city.name}'s residential electricity price of <strong>{cents(rate)}/kWh</strong> before tax (
              {CANADA_RATES_DATE}), a typical 3-ton central air conditioner (SEER {REF_SEER}) costs about{' '}
              <strong>{cad(perHour, 2)} per hour</strong>, <strong>{cad(month)}</strong> for a month at 8 hours a day, and
              roughly <strong>{cad(year)} a year</strong> over a cooling season of about {pr.hours.toLocaleString()} hours.
              That price is {vsUs} and ranks <strong>#{pr.rank} of {PROVINCES.length}</strong> among Canadian provinces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Per hour', value: cad(perHour, 2), note: '3-ton, SEER 14' },
              { label: 'Per month', value: cad(month), note: '8 hrs/day × 30 days' },
              { label: 'Per year', value: cad(year), note: `${pr.hours.toLocaleString()} cooling hours` },
            ].map((k) => (
              <div key={k.label} className="rounded-lg border border-gray-200 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{k.label}</p>
                <p className="text-3xl font-bold text-[#17204d] my-1">{k.value}</p>
                <p className="text-xs text-gray-500">{k.note}</p>
              </div>
            ))}
          </div>

          <StateCostEstimator key={pr.slug} stateName={pr.name} stateRate={rate} stateHours={pr.hours} money={cad} />
          <p className="text-xs text-gray-500 -mt-6 mb-8">
            The estimator works in Canadian cents and dollars, before tax.
          </p>

          <h2 className={h2}>Electricity prices in {pr.name}</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>City</th>
                  <th className={th}>Bill at 1,000 kWh</th>
                  <th className={th}>Avg. price</th>
                  <th className={th}>Each kWh from 1,000 to 2,000</th>
                </tr>
              </thead>
              <tbody>
                {pr.cities.map((c) => (
                  <tr key={c.name}>
                    <td className={`${td} font-medium`}>{c.name}</td>
                    <td className={td}>{cad(c.bill1000, 2)}/month</td>
                    <td className={td}>{cents(c.rate)}/kWh</td>
                    <td className={td}>{cents(c.extraRate)}/kWh</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>
            Power in {pr.name} is supplied by {pr.utility}. {pr.note}
          </p>
          <p className={p}>
            Air conditioning is added on top of a home's normal use, so the price of those extra kilowatt-hours matters
            most. In {pr.city.name}, each kWh between 1,000 and 2,000 a month costs {cents(pr.city.extraRate)}
            {extraHigher ? ', more than the average' : extraLower ? ', less than the average, because fixed charges are already covered' : ', about the same as the average'}.
            At that price, a 3-ton AC's season would cost about {cad(yearExtra)} rather than {cad(year)}.
          </p>

          <h2 className={h2}>Cost to run AC in {pr.name} by system size</h2>
          <p className={p}>
            Central systems and ductless mini-splits are both sized in tons (1 ton = 12,000 Btu). A single-room mini-split
            is usually 0.75–1 ton; a whole house, 2–5 tons. Costs for SEER {REF_SEER} at {cents(rate)}/kWh:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>System size</th>
                  <th className={th}>Per hour</th>
                  <th className={th}>Per month (8 hrs/day)</th>
                  <th className={th}>Per year</th>
                </tr>
              </thead>
              <tbody>
                {TONNAGES.map((t) => (
                  <tr key={t} className={t === REF_TONS ? 'bg-amber-50/60' : ''}>
                    <td className={`${td} font-medium`}>{t} ton ({(t * 12000).toLocaleString()} Btu)</td>
                    <td className={td}>{cad(costPerHour(t, REF_SEER, rate), 2)}</td>
                    <td className={td}>{cad(costPerHour(t, REF_SEER, rate) * SUMMER_MONTH_HOURS)}</td>
                    <td className={td}>{cad(annualCost(t, REF_SEER, pr.hours, rate))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className={h2}>What a more efficient AC saves in {pr.name}</h2>
          <p className={p}>
            Annual cost of a 3-ton system at {pr.hours.toLocaleString()} cooling hours a year. Minimum efficiency for
            new central air conditioners is set by Natural Resources Canada; older units are often SEER 10 or lower.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>SEER rating</th>
                  <th className={th}>Annual cost</th>
                  <th className={th}>Savings vs. SEER 10</th>
                  <th className={th}>15-year savings</th>
                </tr>
              </thead>
              <tbody>
                {SEERS.map((seer) => {
                  const cost = annualCost(REF_TONS, seer, pr.hours, rate);
                  const sv = annualCost(REF_TONS, 10, pr.hours, rate) - cost;
                  return (
                    <tr key={seer}>
                      <td className={`${td} font-medium`}>SEER {seer}</td>
                      <td className={td}>{cad(cost)}</td>
                      <td className={td}>{seer === 10 ? '—' : cad(sv)}</td>
                      <td className={td}>{seer === 10 ? '—' : cad(sv * 15)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex gap-3 rounded-lg bg-emerald-50 border border-emerald-200 p-5 mb-4">
            <Leaf className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-900 mb-1">Replacing an old AC? Price a heat pump too.</p>
              <p>
                With a cooling season of about {pr.hours.toLocaleString()} hours, a premium air conditioner saves only{' '}
                {cad(save14to18)} a year over a standard one, so the extra cost takes a long time to pay back (see our{' '}
                <Link to="/blog/16-vs-18-seer" className={a}>16 vs 18 SEER analysis</Link>). A cold-climate heat pump
                cools just as well in summer and also heats in winter, when it runs many more hours, so its efficiency pays
                back far faster. Check {pr.name} and your utility for current rebates and financing before you buy.
              </p>
            </div>
          </div>

          <h2 className={h2}>How {pr.name} compares</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {others.map((n) => (
              <Link key={n.slug} to={`/ac-cost/canada/${n.slug}`} className="rounded-lg border border-gray-200 p-3 hover:border-teal-400 hover:shadow-sm transition-all">
                <p className="text-xs text-gray-500">#{n.rank}</p>
                <p className="font-semibold text-gray-900">{n.name}</p>
                <p className="text-sm text-teal-700">{cents(n.rate)}/kWh</p>
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-600 mb-4">
            In U.S. terms, {pr.name}'s price is about {cents(pr.usdRate)} US/kWh, against a U.S. average of {cents(US_RATE)} (
            {RATES_AS_OF}). See <Link to="/ac-cost" className={a}>costs in every U.S. state</Link>.
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

          <h2 className={h2}>How we calculated this</h2>
          <p className={p}>
            Power draw (kW) = tons × 12,000 Btu/h ÷ SEER ÷ 1,000. Cost = kW × hours × price. Price:{' '}
            <a href={CANADA_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={a}>{CANADA_SOURCE}</a>, the
            monthly bill for 1,000 kWh in {pr.city.name} divided by 1,000, before GST/HST and provincial taxes. U.S.
            dollar figures use US${USD_PER_CAD.toFixed(3)} per C$ ({USD_PER_CAD_AS_OF}). Cooling hours are our estimate for{' '}
            {pr.name}'s climate. Check your own bill: divide the total before tax by the kWh used to get your rate.
          </p>

          <div className="mt-10 rounded-lg bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Run your own numbers</h3>
            <p className="text-gray-700 mb-4">
              The calculator opens with {pr.name}'s price and typical hours filled in. Add your unit's SEER and size to see
              your cost and what an upgrade would save. Its dollar amounts work in any currency, so read them as Canadian dollars.
            </p>
            <Link to={calcLink} className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
              <Calculator className="w-5 h-5" />
              Calculate for {pr.name}
            </Link>
          </div>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}

