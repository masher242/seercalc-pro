import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin } from 'lucide-react';
import { SITE_URL } from '../data/site';
import USCostMap from '../components/USCostMap';
import TableExplainer, { RefSystemSentence, HoursNote } from '../components/TableExplainer';
import {
  STATES, US_RATE, RATES_AS_OF, RATES_SOURCE_URL, REF_TONS, REF_SEER,
  annualCost, costPerHour, kw, usd, cents,
} from '../data/acCost';

const th = 'border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 whitespace-nowrap';
const td = 'border-b border-gray-100 px-3 py-2.5 text-gray-700';

export default function AcCostIndex() {
  const [sort, setSort] = useState<'cost' | 'name'>('cost');
  const rows = [...STATES].sort((a, b) => (sort === 'cost' ? a.rank - b.rank : a.name.localeCompare(b.name)));
  const title = 'Cost to Run AC by State: Map, Rates & Yearly Costs';
  const description = `What it costs to run central air in all 50 states and DC, from each state's average residential electricity rate (EIA, ${RATES_AS_OF}). Interactive map, per-hour and yearly costs, and how your state compares.`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/ac-cost`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/ac-cost`} />
        <meta property="og:title" content="What It Costs to Run AC in Every State" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Cost to run air conditioning by state',
            itemListElement: STATES.map((s) => ({
              '@type': 'ListItem',
              position: s.rank,
              name: s.name,
              url: `${SITE_URL}/ac-cost/${s.slug}`,
            })),
          })}
        </script>
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 mb-3">
          <MapPin className="w-4 h-4" /> AC running cost by state
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What It Costs to Run AC in Every State</h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-6">
          Each state's average residential electricity rate ({RATES_AS_OF}, U.S. Energy Information Administration),
          and what that means for a typical 3-ton central air conditioner (SEER {REF_SEER}). Pick your state for hourly,
          monthly and yearly costs by system size.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <div className="rounded-lg bg-white border border-gray-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">U.S. average rate</p>
            <p className="text-2xl font-bold text-[#17204d]">{cents(US_RATE)}/kWh</p>
          </div>
          <div className="rounded-lg bg-white border border-gray-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">One hour of a 3-ton AC (U.S. avg price)</p>
            <p className="text-2xl font-bold text-[#17204d]">{usd(costPerHour(REF_TONS, REF_SEER, US_RATE), 2)}</p>
          </div>
          <div className="rounded-lg bg-white border border-gray-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Priciest / cheapest electricity</p>
            <p className="text-lg font-bold text-[#17204d]">
              {STATES.find((s) => s.rank === 1)?.name} / {STATES.find((s) => s.rank === STATES.length)?.name}
            </p>
          </div>
        </div>

        <USCostMap />

        <Link
          to="/ac-cost/world"
          className="flex items-center justify-between gap-3 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 mb-3 hover:border-orange-400 transition-colors"
        >
          <span className="text-sm text-gray-800">
            <strong>Around the world:</strong> every state, province and country we cover, compared on one yardstick.
          </span>
          <span className="text-sm font-semibold text-orange-700 whitespace-nowrap">World →</span>
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <Link
            to="/ac-cost/caribbean"
            className="flex items-center justify-between gap-3 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 hover:border-teal-400 transition-colors"
          >
            <span className="text-sm text-gray-800">
              <strong>Caribbean:</strong> the Bahamas, Jamaica, Puerto Rico and 5 more countries.
            </span>
            <span className="text-sm font-semibold text-teal-700 whitespace-nowrap">Caribbean →</span>
          </Link>
          <Link
            to="/ac-cost/canada"
            className="flex items-center justify-between gap-3 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 hover:border-teal-400 transition-colors"
          >
            <span className="text-sm text-gray-800">
              <strong>Canada:</strong> all 10 provinces, in Canadian dollars.
            </span>
            <span className="text-sm font-semibold text-teal-700 whitespace-nowrap">Canada →</span>
          </Link>
          <Link
            to="/ac-cost/europe"
            className="flex items-center justify-between gap-3 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 hover:border-teal-400 transition-colors"
          >
            <span className="text-sm text-gray-800">
              <strong>Europe:</strong> 8 countries city by city, plus an EU price map.
            </span>
            <span className="text-sm font-semibold text-teal-700 whitespace-nowrap">Europe →</span>
          </Link>
          <Link
            to="/ac-cost/australia"
            className="flex items-center justify-between gap-3 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 hover:border-teal-400 transition-colors"
          >
            <span className="text-sm text-gray-800">
              <strong>Australia:</strong> every state and territory, in Australian dollars.
            </span>
            <span className="text-sm font-semibold text-teal-700 whitespace-nowrap">Australia →</span>
          </Link>
          <Link
            to="/ac-cost/asia"
            className="flex items-center justify-between gap-3 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 hover:border-teal-400 transition-colors"
          >
            <span className="text-sm text-gray-800">
              <strong>Asia:</strong> 13 countries, from Singapore and Japan to China, with a map.
            </span>
            <span className="text-sm font-semibold text-teal-700 whitespace-nowrap">Asia →</span>
          </Link>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Cost to run AC in every state</h2>
        <TableExplainer>
          <RefSystemSentence />
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Electricity price per kWh:</strong> the state's average residential price ({RATES_AS_OF}, U.S.
              Energy Information Administration): what homes paid in total divided by the kWh they used, so fees and
              fixed charges are spread across every kWh.
            </li>
            <li>
              <strong>Cost per hour:</strong> one hour of the AC running at full power, so{' '}
              {kw(REF_TONS, REF_SEER).toFixed(2)} kWh × the price.
            </li>
            <li>
              <strong>Cost per year:</strong> <HoursNote>, from 300 hours in Alaska to 3,000 on the Gulf Coast, in Arizona
              and Hawaii (shown in grey)</HoursNote>
            </li>
            <li><strong>Rank:</strong> 1 = the most expensive electricity of the 50 states and DC.</li>
          </ul>
        </TableExplainer>

        <div className="flex items-center gap-2 mb-3 text-sm">
          <span className="text-gray-500">Sort by:</span>
          {(['cost', 'name'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setSort(k)}
              className={`px-3 py-1 rounded-full border font-semibold ${sort === k ? 'bg-[#17204d] text-white border-[#17204d]' : 'bg-white text-gray-700 border-gray-200 hover:border-teal-400'}`}
            >
              {k === 'cost' ? 'Priciest electricity' : 'State name'}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-teal-50">
              <tr>
                <th className={th}>Rank</th>
                <th className={th}>State</th>
                <th className={th}>Electricity price per kWh</th>
                <th className={th}>Cost per hour of AC<br /><span className="font-normal text-xs text-gray-500">3-ton, SEER {REF_SEER}</span></th>
                <th className={th}>Cost per year of AC<br /><span className="font-normal text-xs text-gray-500">(hours it runs a year)</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.slug} className="hover:bg-gray-50">
                  <td className={`${td} text-gray-400`}>{s.rank}</td>
                  <td className={td}>
                    <Link to={`/ac-cost/${s.slug}`} className="font-semibold text-teal-700 hover:underline">{s.name}</Link>
                  </td>
                  <td className={td}>{cents(s.rate)}/kWh</td>
                  <td className={td}>{usd(costPerHour(REF_TONS, REF_SEER, s.rate), 2)}</td>
                  <td className={td}>
                    {usd(annualCost(REF_TONS, REF_SEER, s.hours, s.rate))}{' '}
                    <span className="text-xs text-gray-400">({s.hours.toLocaleString()} hrs)</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-500 mb-2">
          Prices: <a href={RATES_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">EIA Electric Power Monthly, Table 5.6.A</a>.{' '}
          <a href="/data/residential-electricity-rates-by-state.csv" className="text-teal-700 hover:underline">Download CSV</a>.
        </p>
        <p className="text-sm text-gray-600">
          How the numbers work, and how to lower yours: <Link to="/blog/how-much-does-it-cost-to-run-ac" className="text-teal-700 font-medium hover:underline">How much does it cost to run an air conditioner?</Link>
        </p>
      </main>
    </>
  );
}
