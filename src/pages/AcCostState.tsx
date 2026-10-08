import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, MapPin, Clock } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import StateCostEstimator from '../components/StateCostEstimator';
import LeadMagnet from '../components/LeadMagnet';
import NotFound from './NotFound';
import AcCostCountry from './AcCostCountry';
import { getCountry } from '../data/caribbean';
import { articleJsonLd, SITE_URL } from '../data/site';
import {
  getState, STATES, US_RATE, RATES_AS_OF, RATES_SOURCE_URL, BAND_HOURS, BAND_LABEL,
  TONNAGES, SEERS, REF_TONS, REF_SEER, SUMMER_MONTH_HOURS,
  annualCost, costPerHour, usd, cents, AC_COST_UPDATED,
} from '../data/acCost';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

export default function AcCostState() {
  const { state: slug } = useParams();
  const s = getState(slug);
  if (!s) {
    const country = getCountry(slug);
    return country ? <AcCostCountry c={country} /> : <NotFound />;
  }

  const path = `/ac-cost/${s.slug}`;
  const perHour = costPerHour(REF_TONS, REF_SEER, s.rate);
  const month = perHour * SUMMER_MONTH_HOURS;
  const year = annualCost(REF_TONS, REF_SEER, s.hours, s.rate);
  const usYear = annualCost(REF_TONS, REF_SEER, s.hours, US_RATE);
  const vsUs = (s.rate / US_RATE - 1) * 100;
  const vsUsText =
    Math.abs(vsUs) < 2 ? 'about the same as the U.S. average'
      : `${Math.abs(vsUs).toFixed(0)}% ${vsUs > 0 ? 'above' : 'below'} the U.S. average of ${cents(US_RATE)}/kWh`;
  const save10to16 = annualCost(REF_TONS, 10, s.hours, s.rate) - annualCost(REF_TONS, 16, s.hours, s.rate);
  const save14to18 = annualCost(REF_TONS, 14, s.hours, s.rate) - annualCost(REF_TONS, 18, s.hours, s.rate);
  const byRank = [...STATES].sort((x, y) => x.rank - y.rank);
  const neighbors = byRank.filter((x) => Math.abs(x.rank - s.rank) <= 2 && x.slug !== s.slug);
  const calcLink = `/?rate=${s.rate.toFixed(4)}&hours=${s.hours}`;
  const title = `Cost to Run AC in ${s.name} (${RATES_AS_OF.split(' ')[1]}) ❄️ ${cents(s.rate)}/kWh`;
  const headline = `How Much Does It Cost to Run Air Conditioning in ${s.name}?`;
  const description = `At ${s.name}'s average residential rate of ${cents(s.rate)}/kWh (EIA, ${RATES_AS_OF}), a 3-ton central AC costs about ${usd(perHour, 2)} an hour and roughly ${usd(year)} a year to run.`;

  const faqs = [
    {
      q: `How much does it cost to run AC per hour in ${s.name}?`,
      a: `About ${usd(perHour, 2)} an hour for a typical 3-ton central air conditioner rated SEER ${REF_SEER}, at ${s.name}'s average residential rate of ${cents(s.rate)}/kWh (${RATES_AS_OF}). A 2-ton system costs about ${usd(costPerHour(2, REF_SEER, s.rate), 2)} an hour and a 5-ton about ${usd(costPerHour(5, REF_SEER, s.rate), 2)}.`,
    },
    {
      q: `How much does central air cost per month in ${s.name}?`,
      a: `Running 8 hours a day for a 30-day summer month, a 3-ton SEER ${REF_SEER} system uses about ${Math.round((REF_TONS * 12 / REF_SEER) * SUMMER_MONTH_HOURS).toLocaleString()} kWh, or about ${usd(month)} at ${cents(s.rate)}/kWh.`,
    },
    {
      q: `Is a high-efficiency AC worth it in ${s.name}?`,
      a: `Replacing a SEER 10 system with a SEER 16 saves about ${usd(save10to16)} a year in ${s.name} at typical usage (${s.hours.toLocaleString()} cooling hours). Going from SEER 14 to SEER 18 saves about ${usd(save14to18)} a year, so the extra cost of a premium system pays back faster where electricity is expensive and the cooling season is long.`,
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
          {JSON.stringify(articleJsonLd({ path, headline, description, dateModified: AC_COST_UPDATED }))}
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
              { '@type': 'ListItem', position: 2, name: 'AC Running Cost by State', item: `${SITE_URL}/ac-cost` },
              { '@type': 'ListItem', position: 3, name: s.name, item: `${SITE_URL}${path}` },
            ],
          })}
        </script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/ac-cost" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          All states
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">
                <MapPin className="w-3.5 h-3.5" /> {s.name}
              </span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 4 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{headline}</h1>
            <p className="text-xl text-gray-600">
              Hourly, monthly and yearly cooling costs at {s.name}'s actual electricity rate, by system size and SEER rating.
            </p>
            <ArticleByline updated={AC_COST_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              At {s.name}'s average residential rate of <strong>{cents(s.rate)}/kWh</strong> ({RATES_AS_OF}), a typical
              3-ton central air conditioner (SEER {REF_SEER}) costs about <strong>{usd(perHour, 2)} per hour</strong>,{' '}
              <strong>{usd(month)}</strong> for a summer month at 8 hours a day, and roughly{' '}
              <strong>{usd(year)} a year</strong> in a climate with {BAND_LABEL[s.climate]} (about{' '}
              {s.hours.toLocaleString()} cooling hours). {s.name}'s rate is {vsUsText}, ranking{' '}
              <strong>#{s.rank} of 51</strong> for the most expensive residential electricity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Per hour', value: usd(perHour, 2), note: '3-ton, SEER 14' },
              { label: 'Summer month', value: usd(month), note: '8 hrs/day × 30 days' },
              { label: 'Per year', value: usd(year), note: `${s.hours.toLocaleString()} cooling hours` },
            ].map((k) => (
              <div key={k.label} className="rounded-lg border border-gray-200 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{k.label}</p>
                <p className="text-3xl font-bold text-[#17204d] my-1">{k.value}</p>
                <p className="text-xs text-gray-500">{k.note}</p>
              </div>
            ))}
          </div>

          <StateCostEstimator key={s.slug} stateName={s.name} stateRate={s.rate} stateHours={s.hours} />

          <h2 className={h2}>Cost to run AC in {s.name} by system size</h2>
          <p className={p}>
            Costs for a SEER {REF_SEER} central air conditioner at {cents(s.rate)}/kWh. Not sure of your size? Most homes
            need about 1 ton per 500–600 sq ft; our <Link to="/calculators/ac-sizing" className={a}>AC sizing calculator</Link> gives
            a closer estimate.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>System size</th>
                  <th className={th}>Per hour</th>
                  <th className={th}>Per day (8 hrs)</th>
                  <th className={th}>Summer month</th>
                  <th className={th}>Per year ({s.hours.toLocaleString()} hrs)</th>
                </tr>
              </thead>
              <tbody>
                {TONNAGES.map((t) => (
                  <tr key={t} className={t === REF_TONS ? 'bg-amber-50/60' : ''}>
                    <td className={`${td} font-medium`}>{t} ton ({(t * 12000).toLocaleString()} Btu)</td>
                    <td className={td}>{usd(costPerHour(t, REF_SEER, s.rate), 2)}</td>
                    <td className={td}>{usd(costPerHour(t, REF_SEER, s.rate) * 8, 2)}</td>
                    <td className={td}>{usd(costPerHour(t, REF_SEER, s.rate) * SUMMER_MONTH_HOURS)}</td>
                    <td className={td}>{usd(annualCost(t, REF_SEER, s.hours, s.rate))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className={h2}>How much a more efficient AC saves in {s.name}</h2>
          <p className={p}>
            Annual cost of a 3-ton system at {s.hours.toLocaleString()} cooling hours a year. Older systems are often SEER
            10 or lower; new systems must be at least 13.4–14.3 SEER2 (about SEER 14–15) depending on region.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>SEER rating</th>
                  <th className={th}>Annual cost</th>
                  <th className={th}>Savings vs. SEER 10</th>
                  <th className={th}>10-year savings</th>
                </tr>
              </thead>
              <tbody>
                {SEERS.map((seer) => {
                  const c = annualCost(REF_TONS, seer, s.hours, s.rate);
                  const sv = annualCost(REF_TONS, 10, s.hours, s.rate) - c;
                  return (
                    <tr key={seer}>
                      <td className={`${td} font-medium`}>SEER {seer}</td>
                      <td className={td}>{usd(c)}</td>
                      <td className={td}>{seer === 10 ? '—' : usd(sv)}</td>
                      <td className={td}>{seer === 10 ? '—' : usd(sv * 10)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className={p}>
            For your exact system, rate and usage, run the{' '}
            <Link to={calcLink} className={a}>SEER savings calculator with {s.name}'s rate filled in</Link>.
          </p>

          <h2 className={h2}>Why your bill may differ</h2>
          <p className={p}>
            The yearly figures assume {s.hours.toLocaleString()} hours of full-power cooling, our estimate for a climate with{' '}
            {BAND_LABEL[s.climate]}. Within {s.name}, a home in a hotter area, with poor insulation or a lower thermostat
            setting will run more. Here is the same 3-ton SEER {REF_SEER} system at other usage levels:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Usage</th>
                  <th className={th}>Cooling hours / year</th>
                  <th className={th}>Annual cost in {s.name}</th>
                  <th className={th}>At U.S. average rate</th>
                </tr>
              </thead>
              <tbody>
                {(['cool', 'moderate', 'warm', 'hot'] as const).map((b) => (
                  <tr key={b} className={b === s.climate ? 'bg-amber-50/60' : ''}>
                    <td className={`${td} font-medium`}>{b === 'cool' ? 'Light' : b === 'moderate' ? 'Average' : b === 'warm' ? 'Heavy' : 'Very heavy'}</td>
                    <td className={td}>{BAND_HOURS[b].toLocaleString()}</td>
                    <td className={td}>{usd(annualCost(REF_TONS, REF_SEER, BAND_HOURS[b], s.rate))}</td>
                    <td className={td}>{usd(annualCost(REF_TONS, REF_SEER, BAND_HOURS[b], US_RATE))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>
            At typical usage, {s.name} homeowners pay {usd(Math.abs(year - usYear))} a year{' '}
            {year >= usYear ? 'more' : 'less'} to run the same system than they would at the U.S. average rate.
          </p>

          <h2 className={h2}>Ways to cut your cooling bill</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Raise the thermostat while you're away. See the <Link to="/blog/thermostat-setback-strategy" className={a}>$0 thermostat strategy</Link>.</li>
            <li>Change the filter on schedule; a clogged one can raise cooling costs 5–15%. See <Link to="/blog/air-filter-electricity-bill" className={a}>the $10 air filter fix</Link>.</li>
            <li>If your system is 15+ years old, compare repair and replacement with the <Link to="/calculators/repair-vs-replace" className={a}>repair vs. replace calculator</Link>.</li>
            <li>Ask your utility about AC rebates. The federal tax credit ended Dec. 31, 2025; see the <Link to="/blog/hvac-tax-credits-rebates-2026" className={a}>2026 rebate guide</Link>.</li>
          </ul>

          <h2 className={h2}>Nearby on the price list</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {neighbors.map((n) => (
              <Link key={n.slug} to={`/ac-cost/${n.slug}`} className="rounded-lg border border-gray-200 p-3 hover:border-teal-400 hover:shadow-sm transition-all">
                <p className="text-xs text-gray-500">#{n.rank}</p>
                <p className="font-semibold text-gray-900">{n.name}</p>
                <p className="text-sm text-teal-700">{cents(n.rate)}/kWh</p>
              </Link>
            ))}
          </div>

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
            Power draw (kW) = tons × 12,000 Btu/h ÷ SEER ÷ 1,000. Cost = kW × hours × rate. The rate is {s.name}'s average
            residential price for {RATES_AS_OF} from the{' '}
            <a href={RATES_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={a}>U.S. Energy Information Administration (Electric Power Monthly, Table 5.6.A)</a>.
            Average prices include taxes and fees spread across all usage; your marginal rate on your bill may be higher
            or lower. Cooling hours are our estimate by climate. SEER describes average seasonal efficiency, so real
            hourly draw is higher on the hottest afternoons and lower on mild days.
          </p>
          <p className="text-sm text-gray-500">
            Download the data: <a href="/data/residential-electricity-rates-by-state.csv" className={a}>residential electricity rates by state (CSV)</a>.
          </p>

          <div className="mt-10 rounded-lg bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Run your own numbers</h3>
            <p className="text-gray-700 mb-4">
              The calculator opens with {s.name}'s rate ({cents(s.rate)}/kWh) and typical hours filled in. Add your
              system's SEER and size to see your cost and what an upgrade would save.
            </p>
            <Link to={calcLink} className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
              <Calculator className="w-5 h-5" />
              Calculate for {s.name}
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              See all states in the <Link to="/blog/how-much-does-it-cost-to-run-ac" className={a}>AC running-cost guide</Link>.
            </p>
          </div>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
