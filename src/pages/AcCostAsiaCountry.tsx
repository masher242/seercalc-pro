import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MapPin, Clock, SlidersHorizontal, Wind, Ruler } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import NotFound from './NotFound';
import { articleJsonLd, SITE_URL } from '../data/site';
import { US_RATE, RATES_AS_OF, cents } from '../data/acCost';
import {
  AsiaCountry, ASIA_COUNTRIES, ASIA_UPDATED, ASIA_SIZES, ASIA_EFFS, ASIA_REF_KW, ASIA_REF_EFF, PORTABLE_KW_ELEC,
  HOT_MONTH_HOURS, USD_PER, ASIA_FX_AS_OF, getAsiaCountry, asiaZoneOf, asiaCityRate, yearCost, hourCost, lmoney, lprice, usd0,
} from '../data/asia';

const th = 'border border-gray-200 px-3 py-2.5 text-left align-bottom font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

const EFF_OPTIONS = [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];
const kwhPerHour = (ASIA_REF_KW / ASIA_REF_EFF).toFixed(2);
/** Name used mid-sentence. */
const inName = (c: AsiaCountry) => (c.slug === 'philippines' ? 'the Philippines' : c.name);

function Estimator({ c }: { c: AsiaCountry }) {
  const m = (n: number, small = false) => lmoney(c.currency, n, small);
  const step = c.rate >= 100 ? 1 : c.rate >= 1 ? 0.01 : 0.001;
  const [kw, setKw] = useState(ASIA_REF_KW);
  const [now, setNow] = useState(3);
  const [next, setNext] = useState(ASIA_REF_EFF);
  const [hours, setHours] = useState(c.ref.hours);
  const [price, setPrice] = useState(c.refZone.rate);
  const rate = Math.max(price, 0);
  const nowY = yearCost(kw, now, hours, rate);
  const nextY = yearCost(kw, next, hours, rate);
  const saving = nowY - nextY;
  const label = 'block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5';
  const select = 'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 font-semibold focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none';

  return (
    <section aria-label={`AC cost estimator for ${c.name}`} className="rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white p-5 sm:p-6 mb-8">
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-teal-600" />
        Your numbers in {inName(c)}
      </h2>
      <div className="mb-4">
        <span className={label}>Cooling capacity</span>
        <div className="flex flex-wrap gap-1.5">
          {ASIA_SIZES.map((z) => (
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
          <span className={label}>Price per kWh ({c.currency})</span>
          <input type="number" min={0} step={step} inputMode="decimal" className={select} value={price}
            onChange={(e) => setPrice(Number(e.target.value) || 0)} />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" aria-live="polite">
        <div className="rounded-lg bg-white border border-gray-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Your AC now (efficiency {now.toFixed(1)})</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{m(nowY)}<span className="text-sm font-medium text-gray-500">/yr</span></p>
          <p className="text-xs text-gray-500 mt-1">{m(hourCost(kw, now, rate), true)}/hr</p>
        </div>
        <div className="rounded-lg bg-white border border-gray-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">New unit (efficiency {next.toFixed(1)})</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{m(nextY)}<span className="text-sm font-medium text-gray-500">/yr</span></p>
          <p className="text-xs text-gray-500 mt-1">{m(hourCost(kw, next, rate), true)}/hr</p>
        </div>
        <div className={`rounded-lg p-4 ${saving >= 0 ? 'bg-[#17204d] text-white' : 'bg-amber-50 border border-amber-200 text-gray-900'}`}>
          <p className={`text-xs font-semibold uppercase tracking-wide ${saving >= 0 ? 'text-teal-200' : 'text-amber-700'}`}>{saving >= 0 ? 'You would save' : 'Extra cost'}</p>
          <p className="text-2xl font-bold mt-1">{m(Math.abs(saving))}<span className="text-sm font-medium">/yr</span></p>
          <p className={`text-xs mt-1 ${saving >= 0 ? 'text-teal-100' : 'text-gray-600'}`}>{m(Math.abs(saving) * 12)} over 12 years</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Efficiency = kW of cooling per kW of electricity over a season (our assumption for a typical new inverter split is{' '}
        {ASIA_REF_EFF.toFixed(1)}; an old non-inverter or window unit is closer to 3). Hours start at our estimate for{' '}
        {c.ref.name} and the price at {lprice(c.currency, c.refZone.rate)}; change them for your home and your bill.
      </p>
    </section>
  );
}

export default function AcCostAsiaCountry() {
  const { country: slug } = useParams();
  const c = getAsiaCountry(slug);
  if (!c) return <NotFound />;

  const m = (n: number, small = false) => lmoney(c.currency, n, small);
  const path = `/ac-cost/asia/${c.slug}`;
  const rate = c.rate;
  const perHour = hourCost(ASIA_REF_KW, ASIA_REF_EFF, rate);
  const month = perHour * HOT_MONTH_HOURS;
  const refYear = yearCost(ASIA_REF_KW, ASIA_REF_EFF, c.ref.hours, rate);
  const usd = USD_PER[c.currency];
  const cities = [...c.cities].sort((x, y) => y.hours - x.hours);
  const cityYear = (x: (typeof cities)[number]) => yearCost(ASIA_REF_KW, ASIA_REF_EFF, x.hours, asiaCityRate(c, x));
  const hot = cities[0];
  const cool = cities[cities.length - 1];
  const portableHour = PORTABLE_KW_ELEC * rate;
  const others = ASIA_COUNTRIES.filter((x) => x.slug !== c.slug).sort((x, y) => x.rank - y.rank);
  const save = (from: number, to: number) => yearCost(ASIA_REF_KW, from, c.ref.hours, rate) - yearCost(ASIA_REF_KW, to, c.ref.hours, rate);
  const ratio = c.usdRate / US_RATE;
  const vsUs = ratio >= 1.03 ? `${Math.round((ratio - 1) * 100)}% more than` : ratio <= 0.97 ? `${Math.round((1 - ratio) * 100)}% less than` : 'about the same as';
  const multiZone = c.zones.length > 1;
  const Name = inName(c).charAt(0).toUpperCase() + inName(c).slice(1);

  const title = `Cost to Run AC in ${inName(c)} ❄️ ${lprice(c.currency, c.rate)}/kWh`;
  const headline = `How Much Does It Cost to Run Air Conditioning in ${inName(c)}?`;
  const description = `At ${lprice(c.currency, c.rate)} per kWh (${c.asOf}), a 1.5 hp (12,000 BTU, 3.5 kW) inverter air conditioner costs about ${m(perHour, true)} an hour to run in ${c.ref.name}, about ${m(refYear)} a year.`;

  const faqs = [
    {
      q: `How much does it cost to run an air conditioner per hour in ${inName(c)}?`,
      a: `About ${m(perHour, true)} an hour in ${c.ref.name} for a typical 1.5 hp (12,000 BTU, 3.5 kW) inverter split, which uses about ${kwhPerHour} kWh of electricity an hour, at ${lprice(c.currency, c.refZone.rate)} per kWh. A 1 hp (9,000 BTU) bedroom unit costs about ${m(hourCost(2.5, ASIA_REF_EFF, rate), true)} an hour, an old non-inverter 1.5 hp unit about ${m(hourCost(ASIA_REF_KW, 3, rate), true)}, and a portable unit about ${m(portableHour, true)}.`,
    },
    {
      q: `How much does air conditioning add to a monthly bill in ${inName(c)}?`,
      a: `Running a 1.5 hp inverter split 8 hours a day for 30 days uses about ${Math.round((ASIA_REF_KW / ASIA_REF_EFF) * HOT_MONTH_HOURS)} kWh, or about ${m(month)}. Over a year in ${c.ref.name}, at our estimate of ${c.ref.hours.toLocaleString()} cooling hours, one unit costs about ${m(refYear)} (about ${usd0(refYear * usd)}).`,
    },
    {
      q: 'Is an inverter air conditioner worth it?',
      a: `Where the AC runs as many hours as it does in ${c.ref.name}, usually yes. Replacing an old non-inverter 1.5 hp unit (efficiency about 3) with a typical inverter split (about ${ASIA_REF_EFF.toFixed(1)}) saves about ${m(save(3, ASIA_REF_EFF))} a year at ${c.ref.hours.toLocaleString()} hours.`,
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
          {JSON.stringify(articleJsonLd({ path, headline, description, dateModified: ASIA_UPDATED }))}
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
              { '@type': 'ListItem', position: 2, name: 'AC Running Cost in Asia', item: `${SITE_URL}/ac-cost/asia` },
              { '@type': 'ListItem', position: 3, name: c.name, item: `${SITE_URL}${path}` },
            ],
          })}
        </script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/ac-cost/asia" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          All Asian countries
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
              Hourly, monthly and yearly cooling costs at {inName(c)}'s current electricity prices, by unit size and
              efficiency{cities.length > 1 ? ' and city' : ''}, in local currency and U.S. dollars.
            </p>
            <ArticleByline updated={ASIA_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              At <strong>{lprice(c.currency, c.refZone.rate)} per kWh</strong> ({c.asOf}
              {multiZone ? `, ${c.refZone.name}` : ''}), a typical 1.5 hp (12,000 BTU, 3.5 kW) inverter air conditioner,
              which uses about {kwhPerHour} kWh of electricity an hour, costs about <strong>{m(perHour, true)} an hour</strong> to
              run, or {m(month)} for a month at 8 hours a day. Over a year it comes to about{' '}
              <strong>{m(refYear)} in {c.ref.name}</strong> (about {usd0(refYear * usd)})
              {cities.length === 1
                ? '.'
                : hot.name === c.ref.name
                  ? <>, the hottest city we list, and {m(cityYear(cool))} in {cool.name}.</>
                  : <>, and from {m(cityYear(cool))} in {cool.name} to {m(cityYear(hot))} in {hot.name}.</>}{' '}
              In U.S. terms the price is about {cents(c.usdRate)}/kWh, {vsUs} the U.S. average.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Per hour', value: m(perHour, true), note: `1.5 hp (3.5 kW) inverter, uses ${kwhPerHour} kWh` },
              { label: 'Per month', value: m(month), note: '8 hrs/day × 30 days' },
              { label: `Per year, ${c.ref.name}`, value: m(refYear), note: `${c.ref.hours.toLocaleString()} cooling hours (our estimate)` },
            ].map((k) => (
              <div key={k.label} className="rounded-lg border border-gray-200 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{k.label}</p>
                <p className="text-3xl font-bold text-[#17204d] my-1">{k.value}</p>
                <p className="text-xs text-gray-500">{k.note}</p>
              </div>
            ))}
          </div>

          <Estimator key={c.slug} c={c} />

          {cities.length > 1 && (
            <>
              <h2 className={h2}>Yearly cost by city</h2>
              <p className={p}>
                This table is for <strong>one 1.5 hp (12,000 BTU, 3.5 kW) inverter split</strong>, which uses about{' '}
                {kwhPerHour} kWh of electricity for each hour it runs. <strong>Hours per year</strong> is our estimate of how
                long it runs at full power in each city's climate. <strong>Cost per year</strong> is those hours ×{' '}
                {kwhPerHour} kWh × {multiZone ? "the price on that city's utility" : lprice(c.currency, c.refZone.rate)}.
              </p>
              <div className="overflow-x-auto mb-3">
                <table className="w-full min-w-[600px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className={th}>City</th>
                      {multiZone && <th className={th}>Utility</th>}
                      {multiZone && <th className={th}>Price per kWh</th>}
                      <th className={th}>Hours the AC runs per year</th>
                      <th className={th}>Cost per year, 1.5 hp inverter split</th>
                      <th className={th}>Same in U.S. dollars</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cities.map((x) => {
                      const z = asiaZoneOf(c, x);
                      return (
                        <tr key={x.name} className={x.name === c.ref.name ? 'bg-amber-50/60' : ''}>
                          <td className={`${td} font-medium`}>{x.name}</td>
                          {multiZone && <td className={td}>{z.name}</td>}
                          {multiZone && <td className={td}>{lprice(c.currency, z.rate)}</td>}
                          <td className={td}>{x.hours.toLocaleString()}</td>
                          <td className={td}>{m(cityYear(x))}</td>
                          <td className={td}>{usd0(cityYear(x) * usd)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Cooling hours are our estimate of full-load hours for each city's climate, for one unit. A home cooling
                several rooms uses more.
              </p>
            </>
          )}

          <h2 className={h2}>The price used here</h2>
          <div className="rounded-lg border border-teal-200 bg-teal-50/60 p-4 mb-4 text-sm text-gray-800">
            <p className="font-bold text-gray-900 mb-2">What this table shows</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Price per kWh:</strong> {c.rateNote}.
              </li>
              <li>
                <strong>Cost per hour:</strong> one 1.5 hp (12,000 BTU, 3.5 kW) inverter split running for an hour at full
                power ({kwhPerHour} kWh × the price).
              </li>
            </ul>
          </div>
          <div className="overflow-x-auto mb-3">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Utility</th>
                  <th className={th}>Area covered</th>
                  <th className={th}>Price per kWh</th>
                  <th className={th}>Same in U.S. cents</th>
                  <th className={th}>Cost per hour of AC<span className="block text-xs font-normal text-gray-500">one 1.5 hp inverter split</span></th>
                </tr>
              </thead>
              <tbody>
                {c.zones.map((z) => (
                  <tr key={z.id}>
                    <td className={`${td} font-medium`}>{z.name}</td>
                    <td className={td}>{z.area}</td>
                    <td className={td}>{lprice(c.currency, z.rate)}</td>
                    <td className={td}>{cents(z.rate * usd)}</td>
                    <td className={td}>{m(hourCost(ASIA_REF_KW, ASIA_REF_EFF, z.rate), true)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Source: <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">{c.source}</a>.
          </p>

          <h2 className={h2}>Cost by unit size</h2>
          <div className="flex gap-3 rounded-lg bg-slate-50 border border-slate-200 p-4 mb-4 text-sm text-gray-700">
            <Ruler className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <p>{c.units} The size is how much cooling the unit puts out, not the electricity it uses.</p>
          </div>
          <p className={p}>
            All at a seasonal efficiency of {ASIA_REF_EFF.toFixed(1)} (our assumption for a typical new inverter split) and{' '}
            {lprice(c.currency, c.refZone.rate)} per kWh:
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Unit size (cooling output)</th>
                  <th className={th}>Typical use</th>
                  <th className={th}>Cost per hour of running</th>
                  <th className={th}>Cost per month (8 hours a day)</th>
                  <th className={th}>Cost per year in {c.ref.name} ({c.ref.hours.toLocaleString()} hours)</th>
                </tr>
              </thead>
              <tbody>
                {ASIA_SIZES.map((z) => (
                  <tr key={z.kw} className={z.kw === ASIA_REF_KW ? 'bg-amber-50/60' : ''}>
                    <td className={`${td} font-medium whitespace-nowrap`}>{z.label}</td>
                    <td className={td}>{z.use}</td>
                    <td className={td}>{m(hourCost(z.kw, ASIA_REF_EFF, rate), true)}</td>
                    <td className={td}>{m(hourCost(z.kw, ASIA_REF_EFF, rate) * HOT_MONTH_HOURS)}</td>
                    <td className={td}>{m(yearCost(z.kw, ASIA_REF_EFF, c.ref.hours, rate))}</td>
                  </tr>
                ))}
                <tr>
                  <td className={`${td} font-medium whitespace-nowrap`}>Portable</td>
                  <td className={td}>one room, no installation</td>
                  <td className={td}>{m(portableHour, true)}</td>
                  <td className={td}>{m(portableHour * HOT_MONTH_HOURS)}</td>
                  <td className={td}>{m(portableHour * c.ref.hours)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className={h2}>What a more efficient unit saves</h2>
          <p className={p}>
            Seasonal efficiency is how much cooling a unit delivers for each kW of electricity over a whole season. The higher
            it is, the less electricity it needs for the same cooling. Yearly cost of one 1.5 hp (3.5 kW) unit in {c.ref.name}{' '}
            ({c.ref.hours.toLocaleString()} hours a year):
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
                {ASIA_EFFS.map((e) => (
                  <tr key={e.eff} className={e.eff === ASIA_REF_EFF ? 'bg-amber-50/60' : ''}>
                    <td className={`${td} font-medium`}>{e.eff.toFixed(1)}</td>
                    <td className={td}>{e.eff === 3 ? 'old non-inverter or window unit' : e.note}</td>
                    <td className={td}>{(ASIA_REF_KW / e.eff).toFixed(2)} kWh</td>
                    <td className={td}>{m(yearCost(ASIA_REF_KW, e.eff, c.ref.hours, rate))}</td>
                    <td className={td}>{e.eff === 3 ? '—' : m(save(3, e.eff))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className={h2}>What to know about electricity prices in {inName(c)}</h2>
          {c.tariff.map((t) => <p key={t} className={p}>{t}</p>)}

          <div className="flex gap-3 rounded-lg bg-slate-50 border border-slate-200 p-5 mb-4">
            <Wind className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
            <div className="text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-900 mb-1">Cutting the cost</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Set 25–26°C rather than 20–22°C, and run a ceiling or stand fan with it.</li>
                <li>Close curtains on sunny windows, and keep doors closed so you only cool the room you're in.</li>
                <li>Clean the indoor unit's filters every two to four weeks; humid, dusty air clogs them fast.</li>
                <li>Have the unit serviced (coil and drain cleaning) about once a year.</li>
                <li>When you replace a unit, choose an inverter model with a high energy label rating.</li>
              </ul>
            </div>
          </div>

          <h2 className={h2}>How {inName(c)} compares</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {others.map((n) => (
              <Link key={n.slug} to={`/ac-cost/asia/${n.slug}`} className="rounded-lg border border-gray-200 p-3 hover:border-teal-400 hover:shadow-sm transition-all">
                <p className="font-semibold text-gray-900">{n.name}</p>
                <p className="text-sm text-teal-700">{lprice(n.currency, n.rate)}/kWh</p>
                <p className="text-xs text-gray-500">≈ {cents(n.usdRate)} US</p>
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {Name}: ≈ {cents(c.usdRate)} US/kWh. U.S. average: {cents(US_RATE)}/kWh ({RATES_AS_OF}). See{' '}
            <Link to="/ac-cost" className={a}>costs in every U.S. state</Link> or{' '}
            <Link to="/ac-cost/australia" className={a}>Australia</Link>.
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
            Electricity used (kWh) = cooling capacity (kW) ÷ seasonal efficiency × hours. Cost = kWh × price. Price:{' '}
            <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer" className={a}>{c.source}</a>. U.S. figures use 1{' '}
            {c.currency} = ${usd < 0.01 ? usd.toPrecision(4) : usd.toFixed(4)} ({ASIA_FX_AS_OF}, European
            Central Bank). Cooling hours are our estimate for each city. To check your own price, divide the energy part of
            your bill by the kWh used.
          </p>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
