import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, MapPin, Clock, Zap } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import StateCostEstimator from '../components/StateCostEstimator';
import { articleJsonLd, SITE_URL } from '../data/site';
import {
  US_RATE, RATES_AS_OF, TONNAGES, SEERS, REF_TONS, REF_SEER, SUMMER_MONTH_HOURS,
  annualCost, costPerHour, usd, cents,
} from '../data/acCost';
import { Country, COUNTRIES, CARIBBEAN_UPDATED, localRateLabel } from '../data/caribbean';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

/** Money in the local currency, converted from USD at the source's exchange rate. */
function local(c: Country, usdAmount: number, digits = 0) {
  if (c.currency === 'USD') return usd(usdAmount, digits);
  const v = usdAmount * (c.localRate / c.usdRate);
  return `${c.currency} ${v.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}

export default function AcCostCountry({ c }: { c: Country }) {
  const path = `/ac-cost/${c.slug}`;
  const rate = c.usdRate;
  const perHour = costPerHour(REF_TONS, REF_SEER, rate);
  const month = perHour * SUMMER_MONTH_HOURS;
  const year = annualCost(REF_TONS, REF_SEER, c.hours, rate);
  const ratio = rate / US_RATE;
  const vsUs = ratio >= 1.05
    ? `${ratio.toFixed(1)} times the U.S. average of ${cents(US_RATE)}/kWh`
    : ratio <= 0.95 ? `${Math.round((1 - ratio) * 100)}% below the U.S. average of ${cents(US_RATE)}/kWh`
      : `about the same as the U.S. average`;
  const save10to16 = annualCost(REF_TONS, 10, c.hours, rate) - annualCost(REF_TONS, 16, c.hours, rate);
  const save14to20 = annualCost(REF_TONS, 14, c.hours, rate) - annualCost(REF_TONS, 20, c.hours, rate);
  const others = [...COUNTRIES].filter((x) => x.slug !== c.slug).sort((x, y) => x.rank - y.rank);
  const calcLink = `/?rate=${rate.toFixed(4)}&hours=${c.hours}`;
  const title = `Cost to Run AC in ${c.inName} ❄️ ${cents(rate)}/kWh`;
  const headline = `How Much Does It Cost to Run Air Conditioning in ${c.inName}?`;
  const description = `At ${c.poss} residential electricity rate of ${localRateLabel(c)}/kWh (about ${cents(rate)} US, ${c.asOf}), a 3-ton AC costs about ${usd(perHour, 2)} an hour and roughly ${usd(year)} a year to run.`;
  const yearRound = c.hours >= 3000;
  // Show local-currency amounts only when they differ from US dollars (BSD and BMD are pegged 1:1)
  const showLocal = c.currency !== 'USD' && Math.abs(c.localRate - c.usdRate) > 1e-9;
  const Cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

  const faqs = [
    {
      q: `How much does it cost to run AC per hour in ${c.inName}?`,
      a: `About ${usd(perHour, 2)}${showLocal ? ` (${local(c, perHour, 2)})` : ''} for a typical 3-ton air conditioner rated SEER ${REF_SEER}, at ${c.poss} residential rate of ${localRateLabel(c)}/kWh (about ${cents(rate)} US, ${c.asOf}). A 1.5-ton unit, typical for one or two rooms, costs about ${usd(costPerHour(1.5, REF_SEER, rate), 2)} an hour.`,
    },
    {
      q: `How much does air conditioning cost per month in ${c.inName}?`,
      a: `Running 8 hours a day for 30 days, a 3-ton SEER ${REF_SEER} system uses about ${Math.round((REF_TONS * 12 / REF_SEER) * SUMMER_MONTH_HOURS).toLocaleString()} kWh, or about ${usd(month)} (${local(c, month)}) at ${c.poss} rate.`,
    },
    {
      q: `Is a high-efficiency air conditioner worth it in ${c.inName}?`,
      a: `${save10to16 > 300 ? 'Usually, yes.' : 'It depends on how much you run it.'} Replacing a SEER 10 unit with a SEER 16 saves about ${usd(save10to16)} a year at ${c.hours.toLocaleString()} cooling hours, and going from SEER 14 to SEER 20 saves about ${usd(save14to20)} a year. ${save10to16 > 300 ? 'At island electricity prices, the extra cost of an efficient inverter system often pays back within a few years.' : 'With low electricity rates, the payback on a premium system is slower, so size and installation quality matter more than the highest SEER.'}`,
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
          {JSON.stringify(articleJsonLd({ path, headline, description, dateModified: CARIBBEAN_UPDATED }))}
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
              { '@type': 'ListItem', position: 2, name: 'AC Running Cost in the Caribbean', item: `${SITE_URL}/ac-cost/caribbean` },
              { '@type': 'ListItem', position: 3, name: c.name, item: `${SITE_URL}${path}` },
            ],
          })}
        </script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/ac-cost/caribbean" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          All Caribbean countries
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">
                <MapPin className="w-3.5 h-3.5" /> {c.name}
              </span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{headline}</h1>
            <p className="text-xl text-gray-600">
              Hourly, monthly and yearly cooling costs at {c.poss} electricity rate, by system size and SEER rating
              {showLocal ? `, in U.S. dollars and ${c.currency}` : ''}.
            </p>
            <ArticleByline updated={CARIBBEAN_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              At {c.poss} residential electricity rate of <strong>{localRateLabel(c)}/kWh</strong>
              {showLocal && <> (about {cents(rate)} US)</>} as of {c.asOf}, a typical 3-ton air conditioner (SEER {REF_SEER})
              costs about <strong>{usd(perHour, 2)} per hour</strong>, <strong>{usd(month)}</strong> for a month at 8 hours
              a day, and roughly <strong>{usd(year)} a year</strong>
              {showLocal && <> ({local(c, year)})</>} with {yearRound ? 'year-round cooling' : 'a summer cooling season'} (about{' '}
              {c.hours.toLocaleString()} hours). That rate is {vsUs}, and ranks <strong>#{c.rank} of {COUNTRIES.length}</strong> among the
              Caribbean countries we track.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Per hour', value: usd(perHour, 2), note: '3-ton, SEER 14' },
              { label: 'Per month', value: usd(month), note: '8 hrs/day × 30 days' },
              { label: 'Per year', value: usd(year), note: showLocal ? local(c, year) : `${c.hours.toLocaleString()} cooling hours` },
            ].map((k) => (
              <div key={k.label} className="rounded-lg border border-gray-200 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{k.label}</p>
                <p className="text-3xl font-bold text-[#17204d] my-1">{k.value}</p>
                <p className="text-xs text-gray-500">{k.note}</p>
              </div>
            ))}
          </div>

          <StateCostEstimator key={c.slug} stateName={c.inName} stateRate={rate} stateHours={c.hours} />
          {showLocal && (
            <p className="text-xs text-gray-500 -mt-6 mb-8">
              The estimator works in U.S. cents. {Cap(c.poss)} rate of {localRateLabel(c)}/kWh is about {cents(rate)} at the
              exchange rate used by the source.
            </p>
          )}

          <h2 className={h2}>Cost to run AC in {c.inName} by system size</h2>
          <p className={p}>
            Central systems and ductless mini-splits are both sized in tons (1 ton = 12,000 Btu). A single bedroom
            mini-split is usually 0.75–1 ton; a whole house, 2–5 tons. Costs for SEER {REF_SEER} at {cents(rate)}/kWh:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>System size</th>
                  <th className={th}>Per hour</th>
                  <th className={th}>Per month (8 hrs/day)</th>
                  <th className={th}>Per year</th>
                  {showLocal && <th className={th}>Per year ({c.currency})</th>}
                </tr>
              </thead>
              <tbody>
                {TONNAGES.map((t) => (
                  <tr key={t} className={t === REF_TONS ? 'bg-amber-50/60' : ''}>
                    <td className={`${td} font-medium`}>{t} ton ({(t * 12000).toLocaleString()} Btu)</td>
                    <td className={td}>{usd(costPerHour(t, REF_SEER, rate), 2)}</td>
                    <td className={td}>{usd(costPerHour(t, REF_SEER, rate) * SUMMER_MONTH_HOURS)}</td>
                    <td className={td}>{usd(annualCost(t, REF_SEER, c.hours, rate))}</td>
                    {showLocal && <td className={td}>{local(c, annualCost(t, REF_SEER, c.hours, rate))}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className={h2}>What a more efficient AC saves in {c.inName}</h2>
          <p className={p}>
            Annual cost of a 3-ton system at {c.hours.toLocaleString()} cooling hours a year. Many older units on the islands
            are SEER 10 or lower; modern inverter mini-splits commonly reach SEER 18–25.
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
                  const cost = annualCost(REF_TONS, seer, c.hours, rate);
                  const sv = annualCost(REF_TONS, 10, c.hours, rate) - cost;
                  return (
                    <tr key={seer}>
                      <td className={`${td} font-medium`}>SEER {seer}</td>
                      <td className={td}>{usd(cost)}</td>
                      <td className={td}>{seer === 10 ? '—' : usd(sv)}</td>
                      <td className={td}>{seer === 10 ? '—' : usd(sv * 10)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h2 className={h2}>About electricity in {c.inName}</h2>
          <p className={p}>
            Power in {c.inName} is supplied by {c.utility}. {c.note}
            {c.noteUrl && <> (<a href={c.noteUrl} target="_blank" rel="noopener noreferrer" className={a}>source</a>)</>}
          </p>

          <h2 className={h2}>Protect the AC you're paying to run</h2>
          <div className="flex gap-3 rounded-lg bg-amber-50 border border-amber-200 p-5 mb-4">
            <Zap className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-3">
                On island grids, outages, brownouts and voltage surges are part of normal life, and each one is a risk to
                an air conditioner's compressor and control board. A failed compressor can cost as much as a new unit, so a
                few inexpensive precautions are worth it:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Voltage protection on every unit.</strong> A plug-in or hard-wired voltage protector cuts power when voltage goes too high or too low, then waits before restarting.</li>
                <li><strong>A whole-house surge protector</strong> at the panel, installed by an electrician.</li>
                <li><strong>A restart delay after outages.</strong> When power comes back, many units try to start at once; a delay of a few minutes protects the compressor.</li>
                <li><strong>Generator sized for the AC.</strong> Compressors draw several times their running current at start-up; ask about a soft starter if you run AC on a generator.</li>
              </ul>
            </div>
          </div>

          <h2 className={h2}>How {c.inName} compares</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {others.map((n) => (
              <Link key={n.slug} to={`/ac-cost/${n.slug}`} className="rounded-lg border border-gray-200 p-3 hover:border-teal-400 hover:shadow-sm transition-all">
                <p className="text-xs text-gray-500">#{n.rank}</p>
                <p className="font-semibold text-gray-900">{n.name}</p>
                <p className="text-sm text-teal-700">{cents(n.usdRate)}/kWh</p>
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-600 mb-4">
            For comparison, the U.S. average is {cents(US_RATE)}/kWh ({RATES_AS_OF}). See <Link to="/ac-cost" className={a}>costs in every U.S. state</Link>.
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
            Power draw (kW) = tons × 12,000 Btu/h ÷ SEER ÷ 1,000. Cost = kW × hours × rate. Rate:{' '}
            <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer" className={a}>{c.source}</a>, {c.asOf}.
            Island rates change with fuel prices, often monthly, so check your latest bill: divide the total by the kWh used
            to get your all-in rate. Cooling hours are our estimate for the climate.
          </p>

          <div className="mt-10 rounded-lg bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Run your own numbers</h3>
            <p className="text-gray-700 mb-4">
              The calculator opens with {c.poss} rate and typical hours filled in. Add your unit's SEER and size to see
              your cost and what an upgrade would save.
            </p>
            <Link to={calcLink} className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
              <Calculator className="w-5 h-5" />
              Calculate for {c.inName}
            </Link>
          </div>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
