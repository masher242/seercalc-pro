import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MapPin, Clock, SlidersHorizontal, Wind, Tag } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import NotFound from './NotFound';
import { articleJsonLd, SITE_URL } from '../data/site';
import { US_RATE, RATES_AS_OF, cents } from '../data/acCost';
import {
  AuState, AU_STATES, AU_UPDATED, AU_PERIOD, AU_SIZES, AU_EFFS, AU_REF_KW, AU_REF_EFF, DUCTED_KW, DUCTED_EFF,
  PORTABLE_KW_ELEC, HOT_MONTH_HOURS, USD_PER_AUD, AU_FX_AS_OF, getAuState, zoneOf, cityRate,
  yearCost, hourCost, aud, auCents,
} from '../data/australia';

const th = 'border border-gray-200 px-3 py-2.5 text-left align-bottom font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

const EFF_OPTIONS = [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];
const kwhPerHour = (AU_REF_KW / AU_REF_EFF).toFixed(2);

function Estimator({ s }: { s: AuState }) {
  const [kw, setKw] = useState(AU_REF_KW);
  const [now, setNow] = useState(3);
  const [next, setNext] = useState(AU_REF_EFF);
  const [hours, setHours] = useState(s.ref.hours);
  const [price, setPrice] = useState(Math.round(s.refZone.usage * 100) / 100);
  const rate = Math.max(price, 0) / 100;
  const nowY = yearCost(kw, now, hours, rate);
  const nextY = yearCost(kw, next, hours, rate);
  const saving = nowY - nextY;
  const label = 'block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5';
  const select = 'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 font-semibold focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none';

  return (
    <section aria-label={`AC cost estimator for ${s.name}`} className="rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white p-5 sm:p-6 mb-8">
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-teal-600" />
        Your numbers in {s.name}
      </h2>
      <div className="mb-4">
        <span className={label}>Cooling capacity</span>
        <div className="flex flex-wrap gap-1.5">
          {AU_SIZES.map((z) => (
            <button key={z.kw} type="button" onClick={() => setKw(z.kw)} aria-pressed={kw === z.kw}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${kw === z.kw ? 'bg-[#17204d] text-white border-[#17204d]' : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400'}`}>
              {z.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <label>
          <span className={label}>Efficiency now</span>
          <select className={select} value={now} onChange={(e) => setNow(Number(e.target.value))}>
            {EFF_OPTIONS.map((x) => <option key={x} value={x}>{x.toFixed(1)}</option>)}
          </select>
        </label>
        <label>
          <span className={label}>New unit efficiency</span>
          <select className={select} value={next} onChange={(e) => setNext(Number(e.target.value))}>
            {EFF_OPTIONS.map((x) => <option key={x} value={x}>{x.toFixed(1)}</option>)}
          </select>
        </label>
        <label>
          <span className={label}>Hours / year</span>
          <input type="number" min={0} max={8760} step={50} inputMode="numeric" className={select} value={hours}
            onChange={(e) => setHours(Math.min(8760, Math.max(0, Number(e.target.value) || 0)))} />
        </label>
        <label>
          <span className={label}>Price (¢/kWh)</span>
          <input type="number" min={0} max={200} step={0.01} inputMode="decimal" className={select} value={price}
            onChange={(e) => setPrice(Number(e.target.value) || 0)} />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" aria-live="polite">
        <div className="rounded-lg bg-white border border-gray-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Your AC now (efficiency {now.toFixed(1)})</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{aud(nowY)}<span className="text-sm font-medium text-gray-500">/yr</span></p>
          <p className="text-xs text-gray-500 mt-1">{aud(hourCost(kw, now, rate), 2)}/hr</p>
        </div>
        <div className="rounded-lg bg-white border border-gray-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">New unit (efficiency {next.toFixed(1)})</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{aud(nextY)}<span className="text-sm font-medium text-gray-500">/yr</span></p>
          <p className="text-xs text-gray-500 mt-1">{aud(hourCost(kw, next, rate), 2)}/hr</p>
        </div>
        <div className={`rounded-lg p-4 ${saving >= 0 ? 'bg-[#17204d] text-white' : 'bg-amber-50 border border-amber-200 text-gray-900'}`}>
          <p className={`text-xs font-semibold uppercase tracking-wide ${saving >= 0 ? 'text-teal-200' : 'text-amber-700'}`}>{saving >= 0 ? 'You would save' : 'Extra cost'}</p>
          <p className="text-2xl font-bold mt-1">{aud(Math.abs(saving))}<span className="text-sm font-medium">/yr</span></p>
          <p className={`text-xs mt-1 ${saving >= 0 ? 'text-teal-100' : 'text-gray-600'}`}>{aud(Math.abs(saving) * 12)} over 12 years</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Efficiency = kW of cooling per kW of electricity over a season (our assumption for a typical new split is{' '}
        {AU_REF_EFF.toFixed(1)}). Hours start at our estimate for {s.ref.name} and the price at the{' '}
        {s.refZone.network.replace(/ \(.*\)$/, '')} usage charge; change them for your home and your bill.
      </p>
    </section>
  );
}

export default function AcCostAustraliaState() {
  const { state: slug } = useParams();
  const s = getAuState(slug);
  if (!s) return <NotFound />;

  const path = `/ac-cost/australia/${s.slug}`;
  const rate = s.rate;
  const perHour = hourCost(AU_REF_KW, AU_REF_EFF, rate);
  const month = perHour * HOT_MONTH_HOURS;
  const refYear = yearCost(AU_REF_KW, AU_REF_EFF, s.ref.hours, rate);
  const cities = [...s.cities].sort((x, y) => y.hours - x.hours);
  const cityYear = (c: (typeof cities)[number]) => yearCost(AU_REF_KW, AU_REF_EFF, c.hours, cityRate(s, c));
  const hot = cities[0];
  const cool = cities[cities.length - 1];
  const portableHour = PORTABLE_KW_ELEC * rate;
  const others = AU_STATES.filter((x) => x.slug !== s.slug).sort((x, y) => x.rank - y.rank);
  const save = (from: number, to: number) => yearCost(AU_REF_KW, from, s.ref.hours, rate) - yearCost(AU_REF_KW, to, s.ref.hours, rate);
  const ratio = s.usdRate / US_RATE;
  const vsUs = ratio >= 1.03 ? `${Math.round((ratio - 1) * 100)}% more than` : ratio <= 0.97 ? `${Math.round((1 - ratio) * 100)}% less than` : 'about the same as';
  const multiZone = s.zones.length > 1;
  const usages = s.zones.map((z) => z.usage);
  const priceText = multiZone
    ? `${auCents(Math.min(...usages))}–${auCents(Math.max(...usages))} per kWh`
    : `${auCents(s.refZone.usage)} per kWh`;

  const title = `Cost to Run AC in ${s.name} ❄️ ${auCents(s.refZone.usage)}/kWh`.replace('Australian Capital Territory', 'the ACT');
  const headline = `How Much Does It Cost to Run Air Conditioning in ${s.name}?`;
  const description = `At ${priceText} (2026–27 regulated price, GST incl.), a 3.5 kW split air conditioner costs about ${aud(perHour, 2)} an hour to run in ${s.ref.name}${cities.length > 1 ? `, and ${aud(cityYear(cool))}–${aud(cityYear(hot))} a year from ${cool.name} to ${hot.name}` : `, about ${aud(refYear)} a year`}.`;

  const faqs = [
    {
      q: `How much does it cost to run air conditioning per hour in ${s.name}?`,
      a: `About ${aud(perHour, 2)} an hour in ${s.ref.name} for a typical 3.5 kW (12,000 BTU) inverter split system, which uses about ${kwhPerHour} kWh of electricity an hour, at the ${auCents(s.refZone.usage)}/kWh usage charge. A 7.1 kW unit for a large living area costs about ${aud(hourCost(7.1, AU_REF_EFF, rate), 2)} an hour, a ${DUCTED_KW} kW ducted system about ${aud(hourCost(DUCTED_KW, DUCTED_EFF, rate), 2)}, and a portable air conditioner about ${aud(portableHour, 2)}.`,
    },
    {
      q: `How much does air conditioning add to a quarterly bill in ${s.name}?`,
      a: `Running a 3.5 kW split 8 hours a day uses about ${Math.round((AU_REF_KW / AU_REF_EFF) * 8 * 91)} kWh over a 91-day quarter, or about ${aud(perHour * 8 * 91)} at ${auCents(s.refZone.usage)}/kWh. Over a whole year in ${s.ref.name}, at our estimate of ${s.ref.hours.toLocaleString()} cooling hours, it comes to about ${aud(refYear)}. The daily supply charge is on the bill whether the AC runs or not.`,
    },
    {
      q: `Is a reverse-cycle split cheaper to run than a portable air conditioner?`,
      a: `Yes, by a wide margin. A portable unit draws about 1 kW and cools less well, partly because its exhaust hose pulls warm outside air back into the room. A 3.5 kW split at a seasonal efficiency of ${AU_REF_EFF.toFixed(1)} draws about ${kwhPerHour} kW on average while putting out more cooling than a typical portable (about 2.6 kW), so for the same amount of cooling it uses about half the electricity.`,
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
          {JSON.stringify(articleJsonLd({ path, headline, description, dateModified: AU_UPDATED }))}
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
              { '@type': 'ListItem', position: 2, name: 'AC Running Cost in Australia', item: `${SITE_URL}/ac-cost/australia` },
              { '@type': 'ListItem', position: 3, name: s.name, item: `${SITE_URL}${path}` },
            ],
          })}
        </script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/ac-cost/australia" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          All Australian states and territories
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">
                <MapPin className="w-3.5 h-3.5" /> {s.name}
              </span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{headline}</h1>
            <p className="text-xl text-gray-600">
              Hourly, monthly and yearly cooling costs at {s.short}'s 2026–27 electricity prices, by city, unit size and
              efficiency, in Australian dollars.
            </p>
            <ArticleByline updated={AU_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              At the {s.offer} usage charge of <strong>{auCents(s.refZone.usage)} per kWh</strong>
              {multiZone ? <> ({s.refZone.network.replace(/ \(.*\)$/, '')} network, which covers {s.ref.name})</> : null}, a typical 3.5 kW
              (12,000 BTU) inverter split system, which uses about {kwhPerHour} kWh of electricity an hour, costs about{' '}
              <strong>{aud(perHour, 2)} an hour</strong> to run, or {aud(month)} for a month at 8 hours a day. Over a year it
              comes to about <strong>{aud(refYear)} in {s.ref.name}</strong>
              {cities.length === 1
                ? '.'
                : hot.name === s.ref.name
                  ? <>, the hottest city we list, and {aud(cityYear(cool))} in {cool.name}.</>
                  : <>, and from {aud(cityYear(cool))} in {cool.name} to {aud(cityYear(hot))} in {hot.name}.</>}{' '}
              In U.S. terms the price is about {cents(s.usdRate)}/kWh, {vsUs} the U.S. average.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Per hour', value: aud(perHour, 2), note: `3.5 kW (12,000 BTU) split, uses ${kwhPerHour} kWh` },
              { label: 'Per month', value: aud(month), note: '8 hrs/day × 30 days' },
              { label: `Per year, ${s.ref.name}`, value: aud(refYear), note: `${s.ref.hours.toLocaleString()} cooling hours (our estimate)` },
            ].map((k) => (
              <div key={k.label} className="rounded-lg border border-gray-200 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{k.label}</p>
                <p className="text-3xl font-bold text-[#17204d] my-1">{k.value}</p>
                <p className="text-xs text-gray-500">{k.note}</p>
              </div>
            ))}
          </div>

          <Estimator key={s.slug} s={s} />

          {cities.length > 1 && (
            <>
              <h2 className={h2}>Yearly cost by city</h2>
              <p className={p}>
                How long the AC runs matters as much as the price of power, and that varies hugely across {s.name}. This
                table is for <strong>one 3.5 kW (12,000 BTU, about 1 ton) inverter split system</strong>, which uses about{' '}
                {kwhPerHour} kWh of electricity for each hour it runs. <strong>Hours per year</strong> is our estimate of how
                long it runs at full power in each city's climate. <strong>Cost per year</strong> is those hours × {kwhPerHour}{' '}
                kWh × {multiZone ? 'the usage charge on that city\'s network' : `${auCents(s.refZone.usage)}`}.
              </p>
              <div className="overflow-x-auto mb-3">
                <table className="w-full min-w-[600px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className={th}>City</th>
                      {multiZone && <th className={th}>Network</th>}
                      {multiZone && <th className={th}>Usage charge per kWh</th>}
                      <th className={th}>Hours the AC runs per year</th>
                      <th className={th}>Cost per year, 3.5 kW split</th>
                      <th className={th}>Cost per year, portable unit (same hours)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cities.map((c) => {
                      const z = zoneOf(s, c);
                      return (
                        <tr key={c.name} className={c.name === s.ref.name ? 'bg-amber-50/60' : ''}>
                          <td className={`${td} font-medium`}>{c.name}</td>
                          {multiZone && <td className={td}>{z.network.replace(/ \(.*\)$/, '')}</td>}
                          {multiZone && <td className={td}>{auCents(z.usage)}</td>}
                          <td className={td}>{c.hours.toLocaleString()}</td>
                          <td className={td}>{aud(cityYear(c))}</td>
                          <td className={td}>{aud(PORTABLE_KW_ELEC * cityRate(s, c) * c.hours)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Cooling hours are our estimate of full-load hours for each city's climate, for one unit in the main living
                area. A home cooling several rooms, or with a ducted system, uses more. The portable column assumes a typical
                unit drawing about 1 kW.
              </p>
            </>
          )}

          <h2 className={h2}>{multiZone ? 'Prices by network' : 'The price used here'}</h2>
          <div className="rounded-lg border border-teal-200 bg-teal-50/60 p-4 mb-4 text-sm text-gray-800">
            <p className="font-bold text-gray-900 mb-2">What this table shows</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Usage charge:</strong> what each kWh costs on the flat (single-rate) tariff under the {s.offer},{' '}
                {AU_PERIOD}, GST included. This is what running the air conditioner adds to the bill.
              </li>
              <li>
                <strong>Daily supply charge:</strong> a fixed amount for every day of the bill, whether the AC runs or not, so
                it isn't part of the running costs on this page.
              </li>
              <li>
                <strong>Cost per hour:</strong> one 3.5 kW (12,000 BTU) split running for an hour at full power ({kwhPerHour} kWh × the
                usage charge).
              </li>
            </ul>
          </div>
          <div className="overflow-x-auto mb-3">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Network</th>
                  <th className={th}>Area covered</th>
                  <th className={th}>Usage charge per kWh</th>
                  <th className={th}>Daily supply charge</th>
                  <th className={th}>Cost per hour of AC<span className="block text-xs font-normal text-gray-500">one 3.5 kW split</span></th>
                </tr>
              </thead>
              <tbody>
                {s.zones.map((z) => (
                  <tr key={z.id}>
                    <td className={`${td} font-medium`}>{z.network}</td>
                    <td className={td}>{z.area}</td>
                    <td className={td}>{auCents(z.usage)}</td>
                    <td className={td}>{aud(z.supply / 100, 2)} a day</td>
                    <td className={td}>{aud(hourCost(AU_REF_KW, AU_REF_EFF, z.usage / 100), 2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Source: <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">{s.source}</a>.
          </p>

          <h2 className={h2}>Cost by unit size</h2>
          <p className={p}>
            Split systems in Australia are sold by how much cooling they put out, in kW (the BTU size is in brackets). A bigger
            unit cools a bigger space but uses more electricity. All at a seasonal efficiency of {AU_REF_EFF.toFixed(1)} (our
            assumption for a typical new inverter split) and {auCents(s.refZone.usage)}/kWh:
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Unit size (cooling output)</th>
                  <th className={th}>Typical use</th>
                  <th className={th}>Cost per hour of running</th>
                  <th className={th}>Cost per month (8 hours a day)</th>
                  <th className={th}>Cost per year in {s.ref.name} ({s.ref.hours.toLocaleString()} hours)</th>
                </tr>
              </thead>
              <tbody>
                {AU_SIZES.map((z) => (
                  <tr key={z.kw} className={z.kw === AU_REF_KW ? 'bg-amber-50/60' : ''}>
                    <td className={`${td} font-medium whitespace-nowrap`}>{z.label}</td>
                    <td className={td}>{z.use}</td>
                    <td className={td}>{aud(hourCost(z.kw, AU_REF_EFF, rate), 2)}</td>
                    <td className={td}>{aud(hourCost(z.kw, AU_REF_EFF, rate) * HOT_MONTH_HOURS)}</td>
                    <td className={td}>{aud(yearCost(z.kw, AU_REF_EFF, s.ref.hours, rate))}</td>
                  </tr>
                ))}
                <tr>
                  <td className={`${td} font-medium whitespace-nowrap`}>{DUCTED_KW} kW ducted</td>
                  <td className={td}>whole home</td>
                  <td className={td}>{aud(hourCost(DUCTED_KW, DUCTED_EFF, rate), 2)}</td>
                  <td className={td}>{aud(hourCost(DUCTED_KW, DUCTED_EFF, rate) * HOT_MONTH_HOURS)}</td>
                  <td className={td}>{aud(yearCost(DUCTED_KW, DUCTED_EFF, s.ref.hours, rate))}</td>
                </tr>
                <tr>
                  <td className={`${td} font-medium whitespace-nowrap`}>Portable</td>
                  <td className={td}>one room, no installation</td>
                  <td className={td}>{aud(portableHour, 2)}</td>
                  <td className={td}>{aud(portableHour * HOT_MONTH_HOURS)}</td>
                  <td className={td}>{aud(portableHour * s.ref.hours)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            The ducted row assumes the whole system runs at full power for the same hours, at an efficiency of{' '}
            {DUCTED_EFF.toFixed(1)} (ducts lose some cooling). Zoning, or closing off unused rooms, cuts that cost a lot.
          </p>

          <h2 className={h2}>What a more efficient unit saves</h2>
          <p className={p}>
            Seasonal efficiency is how much cooling a unit delivers for each kW of electricity over a whole season. The higher
            it is, the less electricity it needs for the same cooling. Yearly cost of one 3.5 kW (12,000 BTU) unit in{' '}
            {s.ref.name} ({s.ref.hours.toLocaleString()} hours a year):
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Seasonal efficiency</th>
                  <th className={th}>What it's like</th>
                  <th className={th}>Electricity per hour</th>
                  <th className={th}>Cost per year</th>
                  <th className={th}>Saved per year vs an old 3.0 unit</th>
                </tr>
              </thead>
              <tbody>
                {AU_EFFS.map((e) => (
                  <tr key={e.eff} className={e.eff === AU_REF_EFF ? 'bg-amber-50/60' : ''}>
                    <td className={`${td} font-medium`}>{e.eff.toFixed(1)}</td>
                    <td className={td}>{e.note}</td>
                    <td className={td}>{(AU_REF_KW / e.eff).toFixed(2)} kWh</td>
                    <td className={td}>{aud(yearCost(AU_REF_KW, e.eff, s.ref.hours, rate))}</td>
                    <td className={td}>{e.eff === 3 ? '—' : aud(save(3, e.eff))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-3 rounded-lg bg-slate-50 border border-slate-200 p-5 mb-4">
            <Tag className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
            <div className="text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-900 mb-1">Use the zoned energy rating label</p>
              <p>
                Australian air conditioners carry a zoned energy rating label with separate star ratings, and an estimated
                yearly energy use, for the hot, average and cold climate zones shown on its map. To compare models, look at
                the cooling and heating figures for your zone: yearly kWh × {auCents(s.refZone.usage)} is a quick estimate of
                that model's running cost{s.slug === 'tasmania' || s.slug === 'act' || s.slug === 'victoria' ? ', and here the heating figure usually matters more' : ''}.
              </p>
            </div>
          </div>

          <h2 className={h2}>What to know about electricity prices in {s.name}</h2>
          {s.tariff.map((t) => <p key={t} className={p}>{t}</p>)}

          <div className="flex gap-3 rounded-lg bg-slate-50 border border-slate-200 p-5 mb-4">
            <Wind className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
            <div className="text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-900 mb-1">Cutting the cost</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Set the thermostat to 25–26°C rather than 21°C, and run a ceiling fan with it.</li>
                <li>Close blinds and curtains on sunny windows before the heat builds, especially west-facing ones.</li>
                <li>With rooftop solar, cool the house in the middle of the day and let it coast into the evening peak.</li>
                <li>Cool the rooms you're using, with doors closed, rather than the whole house.</li>
                <li>Clean the indoor unit's filters every few weeks in summer.</li>
                <li>Compare your plan with the default offer: a cheaper market offer saves on every kWh.</li>
              </ul>
            </div>
          </div>

          <h2 className={h2}>How {s.name} compares</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {others.map((n) => (
              <Link key={n.slug} to={`/ac-cost/australia/${n.slug}`} className="rounded-lg border border-gray-200 p-3 hover:border-teal-400 hover:shadow-sm transition-all">
                <p className="font-semibold text-gray-900">{n.short}</p>
                <p className="text-sm text-teal-700">{auCents(n.refZone.usage)}/kWh</p>
                <p className="text-xs text-gray-500">{n.ref.name} · ≈ {cents(n.usdRate)} US</p>
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {s.name} ({s.ref.name}): ≈ {cents(s.usdRate)} US/kWh. U.S. average: {cents(US_RATE)}/kWh ({RATES_AS_OF}). See{' '}
            <Link to="/ac-cost" className={a}>costs in every U.S. state</Link>.
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
            Electricity used (kWh) = cooling capacity (kW) ÷ seasonal efficiency × hours. Cost = kWh × usage charge. Prices:{' '}
            <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className={a}>{s.source}</a>. U.S. cents use A$1 = $
            {USD_PER_AUD.toFixed(3)} ({AU_FX_AS_OF}). Cooling hours are our estimate for each city. To check your own price, look
            for the usage (or "peak"/"anytime") rate per kWh on your bill.
          </p>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
