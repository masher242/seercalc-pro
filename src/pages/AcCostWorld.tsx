import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Download, Globe2 } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import TableExplainer from '../components/TableExplainer';
import { articleJsonLd, SITE_URL } from '../data/site';
import { cents, RATES_AS_OF, RATES_SOURCE_URL } from '../data/acCost';
import { CANADA_SOURCE, CANADA_SOURCE_URL } from '../data/canada';
import eu from '../data/euHouseholdRates.json';
import {
  WORLD_PLACES, REGIONS, REGION_HUB, BASIS_LABEL, WORLD_KWH_PER_HOUR, WORLD_HOURS_BASE, WORLD_HOURS_PER_CDD,
  WORLD_FIT_CITIES, WORLD_UPDATED, CLIMATE_YEARS, CLIMATE_SOURCE, CLIMATE_SOURCE_URL, worldHours,
  type Region, type WorldPlace,
} from '../data/world';

const PATH = '/ac-cost/world';
const COUNT = WORLD_PLACES.length;
const TITLE = `Cost to Run AC Around the World: ${COUNT} Places Compared`;
const HEADLINE = 'What It Costs to Run Air Conditioning Around the World';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 align-bottom';
const td = 'border border-gray-200 px-3 py-2 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

const usd0 = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
const usd2 = (n: number) => `$${n.toFixed(2)}`;
const kwh = WORLD_KWH_PER_HOUR.toFixed(2);

type SortKey = 'year' | 'price' | 'hours';
const SORTS: { key: SortKey; label: string; value: (x: WorldPlace) => number }[] = [
  { key: 'year', label: 'Cost per year', value: (x) => x.perYear },
  { key: 'price', label: 'Electricity price', value: (x) => x.usdRate },
  { key: 'hours', label: 'Hours of AC', value: (x) => x.hours },
];

/** Places that appear with "the" mid-sentence. */
const THE = new Set(['Bahamas', 'Cayman Islands', 'Dominican Republic', 'United Kingdom', 'Netherlands', 'Philippines', 'Czechia', 'District of Columbia']);
const inName = (x: WorldPlace) => (THE.has(x.name) ? `the ${x.name}` : x.name);

const byYear = [...WORLD_PLACES].sort((x, y) => y.perYear - x.perYear);
const byPrice = [...WORLD_PLACES].sort((x, y) => y.usdRate - x.usdRate);
const yearRank = new Map(byYear.map((x, i) => [x.id, i + 1]));
const priceRank = new Map(byPrice.map((x, i) => [x.id, i + 1]));

const top = byYear[0];
const bottom = byYear[byYear.length - 1];
const priciest = byPrice[0];
const cheapestPower = byPrice[byPrice.length - 1];
/** Among the 15 priciest-power places, the one that ranks lowest for yearly cost. */
const pricyButCheapToCool = byPrice.slice(0, 15).reduce((m, x) => ((yearRank.get(x.id) ?? 0) > (yearRank.get(m.id) ?? 0) ? x : m));
/** Among the 15 costliest-to-cool places, the one with the cheapest power. */
const cheapPowerButCostly = byYear.slice(0, 15).reduce((m, x) => (x.usdRate < m.usdRate ? x : m));
const median = (xs: number[]) => {
  const s = [...xs].sort((x, y) => x - y);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};
const regionMedian = REGIONS.map((r) => {
  const rows = WORLD_PLACES.filter((x) => x.region === r);
  return { region: r, count: rows.length, year: median(rows.map((x) => x.perYear)), price: median(rows.map((x) => x.usdRate)) };
}).sort((x, y) => y.year - x.year);

function csv(rows: WorldPlace[]) {
  const head = ['Rank by yearly cost', 'Place', 'Region', 'Climate city', 'Price per kWh (US$)', 'Price basis', 'Price date', 'Cooling degree days (base 18.3 C)', 'Hours of AC per year', 'Cost per hour (US$)', 'Cost per year (US$)', 'Page'];
  const esc = (v: string | number) => (typeof v === 'string' && /[",]/.test(v) ? `"${v.replace(/"/g, '""')}"` : String(v));
  const lines = rows.map((x) => [
    yearRank.get(x.id) ?? '', x.name, x.region, x.city, x.usdRate.toFixed(4), BASIS_LABEL[x.basis], x.priceDate, x.cdd, x.hours,
    x.perHour.toFixed(3), Math.round(x.perYear), `${SITE_URL}${x.href}`,
  ].map(esc).join(','));
  return [head.join(','), ...lines].join('\n');
}

export default function AcCostWorld() {
  const [region, setRegion] = useState<Region | 'all'>('all');
  const [sort, setSort] = useState<SortKey>('year');
  const rows = useMemo(() => {
    const s = SORTS.find((x) => x.key === sort)!;
    return WORLD_PLACES.filter((x) => region === 'all' || x.region === region).sort((x, y) => s.value(y) - s.value(x));
  }, [region, sort]);
  const maxYear = top.perYear;

  const download = () => {
    const blob = new Blob([csv(byYear)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ac-running-cost-world.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const description = `One 12,000 BTU air conditioner costs from ${usd0(bottom.perYear)} a year to run in ${inName(bottom)} to ${usd0(top.perYear)} in ${inName(top)}. ${COUNT} places in the U.S., Canada, the Caribbean, Europe, Asia and Australia, on one yardstick.`;

  const faqs = [
    {
      q: 'Where in the world is air conditioning most expensive to run?',
      a: `Of the ${COUNT} places we compare, ${inName(top)} pays the most to run the same air conditioner: about ${usd0(top.perYear)} a year for one 12,000 BTU unit, because power costs ${cents(top.usdRate)} a kWh and the climate calls for about ${top.hours.toLocaleString()} hours of cooling. ${byYear.slice(1, 4).map((x) => `${x.name} (${usd0(x.perYear)})`).join(', ')} follow.`,
    },
    {
      q: 'Is the most expensive electricity the same as the most expensive AC?',
      a: `No. ${priciest.name} has the dearest power of the places we compare (${cents(priciest.usdRate)} a kWh), but it ranks #${yearRank.get(priciest.id)} for what a year of AC costs. ${pricyButCheapToCool.name}'s power is among the 15 most expensive (${cents(pricyButCheapToCool.usdRate)}), yet a year of cooling costs only ${usd0(pricyButCheapToCool.perYear)} because summers are short. Climate matters as much as price.`,
    },
    {
      q: 'How did you compare places fairly?',
      a: `Every place gets the same air conditioner (12,000 BTU, using ${kwh} kWh of electricity an hour) and the same rule for how long it runs: ${WORLD_HOURS_BASE} hours plus ${WORLD_HOURS_PER_CDD} hours for every cooling degree day, measured from ten years of weather data (${CLIMATE_YEARS}). Only the electricity price and the climate change from place to place.`,
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
          {JSON.stringify(articleJsonLd({ path: PATH, headline: HEADLINE, description, dateModified: WORLD_UPDATED }))}
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
            name: 'Cost to run air conditioning around the world',
            description: `Yearly and hourly cost of running one 12,000 BTU air conditioner in ${COUNT} places, from local electricity prices and ten years of cooling degree days.`,
            url: `${SITE_URL}${PATH}`,
            creator: { '@id': `${SITE_URL}/about/mark-curant#person` },
            dateModified: WORLD_UPDATED,
            temporalCoverage: '2016/2026',
            spatialCoverage: 'United States, Canada, Caribbean, Europe, Asia, Australia',
            variableMeasured: ['Electricity price per kWh (US$)', 'Cooling degree days', 'Hours of air conditioning per year', 'Cost per year (US$)'],
            isAccessibleForFree: true,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Most expensive places to run air conditioning',
            itemListElement: byYear.slice(0, 20).map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, url: `${SITE_URL}${x.href.split('#')[0]}` })),
          })}
        </script>
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <Link to="/ac-cost" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          AC running cost by U.S. state
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-5 sm:p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">
                <Globe2 className="w-3.5 h-3.5" /> World
              </span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              The same air conditioner, priced in {COUNT} places on one yardstick: local electricity prices, ten years of
              measured climate, and one rule for how long it runs.
            </p>
            <ArticleByline updated={WORLD_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              One modern 12,000 BTU air conditioner costs about <strong>{usd0(top.perYear)} a year to run in {inName(top)}</strong>,
              the most of the {COUNT} places we compare, and about <strong>{usd0(bottom.perYear)} in {inName(bottom)}</strong>, the
              least. {priciest.name} has the most expensive electricity ({cents(priciest.usdRate)} a kWh) and{' '}
              {cheapestPower.name} the cheapest ({cents(cheapestPower.usdRate)}), but what a year of cooling costs depends just
              as much on the climate: {cheapPowerButCostly.name}, with power at {cents(cheapPowerButCostly.usdRate)}, still ranks
              #{yearRank.get(cheapPowerButCostly.id)} for yearly cost.
            </p>
          </div>

          <p className={p}>
            I run retail stores in the Caribbean, where power costs over 30¢ a kWh and the air conditioning never gets a season off. I
            built the region pages on this site one at a time, and each one used its own assumptions, so you couldn't line
            them up. This page fixes that: the same unit, the same rule for hours, measured weather for every place. Only
            the price of electricity and the climate change.
          </p>

          <h2 className={h2}>What drives the cost</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Most expensive to cool</p>
              <p className="text-gray-800">
                <strong>{top.name}</strong>: {usd0(top.perYear)} a year. Expensive power ({cents(top.usdRate)}/kWh) and about{' '}
                {top.hours.toLocaleString()} hours of AC a year.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Priciest power, cheap to cool</p>
              <p className="text-gray-800">
                <strong>{pricyButCheapToCool.name}</strong>: power is #{priceRank.get(pricyButCheapToCool.id)} most expensive
                ({cents(pricyButCheapToCool.usdRate)}), but a year of AC costs only {usd0(pricyButCheapToCool.perYear)} (
                {pricyButCheapToCool.hours.toLocaleString()} hours).
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Cheap power, still costly</p>
              <p className="text-gray-800">
                <strong>{cheapPowerButCostly.name}</strong>: one of the cheapest kWh in the top 15 ({cents(cheapPowerButCostly.usdRate)}),
                but {cheapPowerButCostly.hours.toLocaleString()} hours of cooling make it #{yearRank.get(cheapPowerButCostly.id)} for
                yearly cost.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">By region (middle place)</p>
              <ul className="text-gray-800 text-sm space-y-0.5">
                {regionMedian.map((r) => (
                  <li key={r.region}>
                    <Link to={REGION_HUB[r.region]} className={a}>{r.region}</Link>: {usd0(r.year)} a year, {cents(r.price)}/kWh
                    <span className="text-gray-400"> ({r.count} places)</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className={h2}>The 15 most expensive places to run AC</h2>
          <p className={p}>Cost of a year of air conditioning with one 12,000 BTU unit, in U.S. dollars.</p>
          <ol className="space-y-1.5 mb-6">
            {byYear.slice(0, 15).map((x, i) => (
              <li key={x.id} className="grid grid-cols-[1.5rem_minmax(0,8.5rem)_1fr_3rem] sm:grid-cols-[2rem_12rem_1fr_3.5rem] items-center gap-2 text-sm">
                <span className="text-gray-400 text-right">{i + 1}</span>
                <Link to={x.href} className="font-medium text-gray-900 hover:text-teal-700 truncate">{x.name}</Link>
                <span className="h-4 bg-gray-100 rounded-r" aria-hidden="true">
                  <span className="block h-4 rounded-r bg-orange-400/80" style={{ width: `${Math.max(2, (x.perYear / maxYear) * 100)}%` }} />
                </span>
                <span className="text-gray-700 text-right tabular-nums">{usd0(x.perYear)}</span>
              </li>
            ))}
          </ol>

          <h2 className={h2} id="table">All {COUNT} places compared</h2>
          <TableExplainer>
            <p className="mb-2">
              Every cost is for <strong>one modern 12,000 BTU inverter air conditioner</strong> (1 ton, 3.5 kW of cooling),
              the usual size for a living room. 12,000 BTU is how much <em>cooling</em> it puts out. It uses about{' '}
              <strong>{kwh} kWh of electricity for each hour it runs</strong> at full power. The same unit is used
              everywhere, so only the price and the climate change.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Electricity price per kWh:</strong> what a household pays for 1 kWh, converted to U.S. cents. "All-in
                average" prices include the fixed monthly charge spread over every kWh; "per-kWh charges" leave the fixed
                charge out, which is closer to what extra AC use adds to a bill. Each place uses its newest available price,
                so dates differ.
              </li>
              <li>
                <strong>Climate (cooling degree days):</strong> how hot it is over a year, measured from ten years of
                weather ({CLIMATE_YEARS}) for the city named under each place. Each day adds the number of degrees (°C) its
                average temperature is above 18.3 °C (65 °F).
              </li>
              <li>
                <strong>Hours of AC per year:</strong> {WORLD_HOURS_BASE} hours plus {WORLD_HOURS_PER_CDD} hours for every
                cooling degree day. It's the AC's running time at full power, added up over the year.
              </li>
              <li><strong>Cost per hour:</strong> {kwh} kWh × the price. <strong>Cost per year:</strong> cost per hour × hours.</li>
            </ul>
          </TableExplainer>

          <div className="flex flex-wrap items-center gap-2 mb-2 text-sm" role="group" aria-label="Show region">
            <span className="text-gray-500">Show:</span>
            {(['all', ...REGIONS] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                aria-pressed={region === r}
                className={`px-3 py-1 rounded-full border font-semibold ${region === r ? 'bg-[#17204d] text-white border-[#17204d]' : 'bg-white text-gray-700 border-gray-200 hover:border-teal-400'}`}
              >
                {r === 'all' ? `All ${COUNT}` : r}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-3 text-sm" role="group" aria-label="Sort by">
            <span className="text-gray-500">Highest first:</span>
            {SORTS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSort(s.key)}
                aria-pressed={sort === s.key}
                className={`px-3 py-1 rounded-full border font-semibold ${sort === s.key ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-700 border-gray-200 hover:border-teal-400'}`}
              >
                {s.label}
              </button>
            ))}
            <button type="button" onClick={download} className="ml-auto inline-flex items-center gap-1 text-teal-700 font-semibold hover:underline">
              <Download className="w-4 h-4" /> Download CSV
            </button>
          </div>

          <div className="overflow-x-auto mb-3">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>#</th>
                  <th className={th}>Place<span className="block text-xs font-normal text-gray-500">climate measured in</span></th>
                  <th className={th}>Electricity price per kWh<span className="block text-xs font-normal text-gray-500">U.S. cents · price basis</span></th>
                  <th className={th}>Climate<span className="block text-xs font-normal text-gray-500">cooling degree days a year</span></th>
                  <th className={th}>Hours of AC per year</th>
                  <th className={th}>Cost per hour of AC<span className="block text-xs font-normal text-gray-500">one 12,000 BTU unit</span></th>
                  <th className={th}>Cost per year of AC<span className="block text-xs font-normal text-gray-500">one 12,000 BTU unit</span></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((x, i) => (
                  <tr key={x.id} className="hover:bg-gray-50">
                    <td className={`${td} text-gray-400`}>{i + 1}</td>
                    <td className={td}>
                      <Link to={x.href} className={a}>{x.name}</Link>
                      <span className="block text-xs text-gray-500">{x.city} · {x.region}</span>
                    </td>
                    <td className={td}>
                      {cents(x.usdRate)}
                      <span className="block text-xs text-gray-500">{BASIS_LABEL[x.basis]} · {x.priceDate}</span>
                    </td>
                    <td className={td}>{x.cdd.toLocaleString()}</td>
                    <td className={td}>{x.hours.toLocaleString()}</td>
                    <td className={td}>{usd2(x.perHour)}</td>
                    <td className={`${td} font-semibold text-gray-900`}>{usd0(x.perYear)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Each place links to its own page, with costs in local currency, by unit size and efficiency, and the details of
            its electricity price. EU countries without their own page link to the Europe price map.
          </p>

          <h2 className={h2}>Why these numbers differ from the country pages</h2>
          <p className={p}>
            Each region page answers a local question, so it uses the local default: a 3-ton central system in the U.S. and
            Canada, a 3.5 kW split in Europe, Asia and Australia, and our own estimate of the hours for each city. Those are
            the right numbers for planning a bill where you live, but they can't be lined up against each other. This page
            gives up some local detail to make the comparison fair:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Same unit everywhere.</strong> One 12,000 BTU unit using {kwh} kWh an hour. A U.S. home with a 3-ton central system uses about 3.7 times as much electricity an hour as this unit.</li>
            <li>
              <strong>Same rule for hours.</strong> Hours come from measured climate, not from a separate estimate for each
              region. The rule ({WORLD_HOURS_BASE} + {WORLD_HOURS_PER_CDD} × cooling degree days) is a straight line fitted to
              the city-by-city hour estimates on our Europe, Caribbean, Asia and Australia pages ({WORLD_FIT_CITIES} cities).
              It gives, for example, {worldHours(1000).toLocaleString()} hours for a place with 1,000 cooling degree days and{' '}
              {worldHours(3000).toLocaleString()} for 3,000.
            </li>
            <li>
              <strong>One city per place.</strong> A state or country is represented by one city's climate (named under
              each row). Hotter and cooler parts of the same place will differ.
            </li>
            <li>
              <strong>Europe uses Eurostat's all-in averages</strong> for every EU country (and an Ofgem-based figure for the
              UK), the same prices as our Europe map. A few European country pages use the tariff price of each extra kWh
              instead, so their prices can differ.
            </li>
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
              Climate: <a href={CLIMATE_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">{CLIMATE_SOURCE}</a>,
              daily mean temperature {CLIMATE_YEARS}; cooling degree days at base 18.3 °C (65 °F), averaged per year.
            </li>
            <li>
              U.S.: <a href={RATES_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">EIA Electric Power Monthly, Table 5.6.A</a>, average residential price by state, {RATES_AS_OF}.
            </li>
            <li>
              Canada: <a href={CANADA_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">{CANADA_SOURCE}</a>, average price at 1,000 kWh a month before tax, largest city in each province.
            </li>
            <li>
              Europe: Eurostat household electricity prices (nrg_pc_204), 2,500–4,999 kWh a year, all taxes, {eu.periodLabel}{' '}
              (newest half-year for each country); UK from Ofgem's price cap.
            </li>
            <li>
              Caribbean, Australia and Asia: each country's utility, regulator or tariff source, listed on its page
              (<Link to="/ac-cost/caribbean" className="text-teal-700 hover:underline">Caribbean</Link>,{' '}
              <Link to="/ac-cost/australia" className="text-teal-700 hover:underline">Australia</Link>,{' '}
              <Link to="/ac-cost/asia" className="text-teal-700 hover:underline">Asia</Link>).
            </li>
            <li>Prices in other currencies are converted to U.S. dollars at the exchange rates stated on each region page.</li>
          </ul>
          <p className="text-sm text-gray-600 mb-2">
            You're welcome to use these figures; please link to this page as the source.
          </p>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
