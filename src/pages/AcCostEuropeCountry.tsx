import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MapPin, Clock, SlidersHorizontal, Wind } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import { articleJsonLd, SITE_URL } from '../data/site';
import { US_RATE, RATES_AS_OF, cents } from '../data/acCost';
import {
  EuCountry, EU_COUNTRIES, EUROPE_UPDATED, EU_SIZES, EU_SEERS, EU_REF_KW, EU_REF_SEER, PORTABLE_KW_ELEC,
  HOT_MONTH_HOURS, USD_PER_EUR, GBP_PER_EUR, FX_AS_OF, yearCost, hourCost, money, unitPrice,
} from '../data/europe';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

const SEER_OPTIONS = [3.6, 4.1, 4.6, 5.1, 5.6, 6.1, 6.5, 7, 7.5, 8, 8.5, 9, 10];

function Estimator({ c }: { c: EuCountry }) {
  const m = (n: number, d = 0) => money(c.currency, n, d);
  const unit = c.currency === 'GBP' ? 'pence' : 'euro cents';
  const startRate = Math.round(c.rate * 10000) / 100;
  const [kw, setKw] = useState(EU_REF_KW);
  const [now, setNow] = useState(4.6);
  const [next, setNext] = useState(EU_REF_SEER);
  const [hours, setHours] = useState(c.ref.hours);
  const [rateUnits, setRateUnits] = useState(startRate);
  const rate = Math.max(rateUnits, 0) / 100;
  const nowY = yearCost(kw, now, hours, rate);
  const nextY = yearCost(kw, next, hours, rate);
  const saving = nowY - nextY;
  const label = 'block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5';
  const select = 'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 font-semibold focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none';

  return (
    <section aria-label={`AC cost estimator for ${c.inName}`} className="rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white p-5 sm:p-6 mb-8">
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-teal-600" />
        Your numbers in {c.inName}
      </h2>
      <div className="mb-4">
        <span className={label}>Cooling capacity</span>
        <div className="flex flex-wrap gap-1.5">
          {EU_SIZES.map((s) => (
            <button key={s.kw} type="button" onClick={() => setKw(s.kw)} aria-pressed={kw === s.kw}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${kw === s.kw ? 'bg-[#17204d] text-white border-[#17204d]' : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <label>
          <span className={label}>SEER now</span>
          <select className={select} value={now} onChange={(e) => setNow(Number(e.target.value))}>
            {SEER_OPTIONS.map((s) => <option key={s} value={s}>SEER {s}</option>)}
          </select>
        </label>
        <label>
          <span className={label}>New unit SEER</span>
          <select className={select} value={next} onChange={(e) => setNext(Number(e.target.value))}>
            {SEER_OPTIONS.map((s) => <option key={s} value={s}>SEER {s}</option>)}
          </select>
        </label>
        <label>
          <span className={label}>Hours / year</span>
          <input type="number" min={0} max={8760} step={50} inputMode="numeric" className={select} value={hours}
            onChange={(e) => setHours(Math.min(8760, Math.max(0, Number(e.target.value) || 0)))} />
        </label>
        <label>
          <span className={label}>Price ({unit}/kWh)</span>
          <input type="number" min={0} max={200} step={0.01} inputMode="decimal" className={select} value={rateUnits}
            onChange={(e) => setRateUnits(Number(e.target.value) || 0)} />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" aria-live="polite">
        <div className="rounded-lg bg-white border border-gray-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Your AC now (SEER {now})</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{m(nowY)}<span className="text-sm font-medium text-gray-500">/yr</span></p>
          <p className="text-xs text-gray-500 mt-1">{m(hourCost(kw, now, rate), 2)}/hr</p>
        </div>
        <div className="rounded-lg bg-white border border-gray-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">New unit (SEER {next})</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{m(nextY)}<span className="text-sm font-medium text-gray-500">/yr</span></p>
          <p className="text-xs text-gray-500 mt-1">{m(hourCost(kw, next, rate), 2)}/hr</p>
        </div>
        <div className={`rounded-lg p-4 ${saving >= 0 ? 'bg-[#17204d] text-white' : 'bg-amber-50 border border-amber-200 text-gray-900'}`}>
          <p className={`text-xs font-semibold uppercase tracking-wide ${saving >= 0 ? 'text-teal-200' : 'text-amber-700'}`}>{saving >= 0 ? 'You would save' : 'Extra cost'}</p>
          <p className="text-2xl font-bold mt-1">{m(Math.abs(saving))}<span className="text-sm font-medium">/yr</span></p>
          <p className={`text-xs mt-1 ${saving >= 0 ? 'text-teal-100' : 'text-gray-600'}`}>{m(Math.abs(saving) * 12)} over 12 years</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        SEER here is the EU seasonal rating on the energy label. Hours start at our estimate for {c.ref.name}; change them
        for where you live.
      </p>
    </section>
  );
}

export default function AcCostEuropeCountry({ c }: { c: EuCountry }) {
  const path = `/ac-cost/${c.slug}`;
  const m = (n: number, d = 0) => money(c.currency, n, d);
  const rate = c.rate;
  const perHour = hourCost(EU_REF_KW, EU_REF_SEER, rate);
  const month = perHour * HOT_MONTH_HOURS;
  const refYear = yearCost(EU_REF_KW, EU_REF_SEER, c.ref.hours, rate);
  const cities = [...c.cities].sort((x, y) => y.hours - x.hours);
  const hot = cities[0];
  const cool = cities[cities.length - 1];
  const portableHour = PORTABLE_KW_ELEC * rate;
  const others = [...EU_COUNTRIES].filter((x) => x.slug !== c.slug).sort((x, y) => x.rank - y.rank);
  const save = (from: number, to: number) => yearCost(EU_REF_KW, from, c.ref.hours, rate) - yearCost(EU_REF_KW, to, c.ref.hours, rate);
  const ratio = c.usdRate / US_RATE;
  const vsUs = ratio >= 1.03 ? `${Math.round((ratio - 1) * 100)}% more than` : ratio <= 0.97 ? `${Math.round((1 - ratio) * 100)}% less than` : 'about the same as';
  const Cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
  const usdNote = c.currency === 'EUR' ? `€1 = $${USD_PER_EUR.toFixed(3)}` : `£1 = $${(USD_PER_EUR / GBP_PER_EUR).toFixed(3)}`;

  const title = `Cost to Run AC in ${c.inName === 'the United Kingdom' ? 'the UK' : c.inName} ❄️ ${unitPrice(c)}/kWh`;
  const headline = `How Much Does It Cost to Run Air Conditioning in ${c.inName}?`;
  const description = `At ${unitPrice(c)}/kWh (${c.asOf}), a 3.5 kW split air conditioner costs about ${m(perHour, 2)} an hour to run in ${c.inName}, and ${m(yearCost(EU_REF_KW, EU_REF_SEER, cool.hours, rate))}–${m(yearCost(EU_REF_KW, EU_REF_SEER, hot.hours, rate))} a year from ${cool.name} to ${hot.name}.`;

  const faqs = [
    {
      q: `How much does it cost to run air conditioning per hour in ${c.inName}?`,
      a: `About ${m(perHour, 2)} an hour for a typical 3.5 kW split unit (EU SEER ${EU_REF_SEER}, energy class A++), at ${unitPrice(c)}/kWh. A 2.5 kW bedroom unit costs about ${m(hourCost(2.5, EU_REF_SEER, rate), 2)} an hour, and a portable air conditioner about ${m(portableHour, 2)} an hour.`,
    },
    {
      q: `How much does air conditioning cost per month in ${c.inName}?`,
      a: `Running a 3.5 kW split unit 8 hours a day for 30 days uses about ${Math.round((EU_REF_KW / EU_REF_SEER) * HOT_MONTH_HOURS)} kWh, or about ${m(month)}. A portable unit used the same way costs about ${m(portableHour * HOT_MONTH_HOURS)}.`,
    },
    {
      q: `Is a split air conditioner cheaper to run than a portable one?`,
      a: `Yes, by a wide margin. A portable unit draws about 1 kW and cools less well, partly because its exhaust hose pulls warm outside air back into the room. A 3.5 kW split unit at SEER ${EU_REF_SEER} draws about ${(EU_REF_KW / EU_REF_SEER).toFixed(2)} kW on average while delivering more cooling, so it typically costs about half as much per hour.`,
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
          {JSON.stringify(articleJsonLd({ path, headline, description, dateModified: EUROPE_UPDATED }))}
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
              { '@type': 'ListItem', position: 2, name: 'AC Running Cost in Europe', item: `${SITE_URL}/ac-cost/europe` },
              { '@type': 'ListItem', position: 3, name: c.name, item: `${SITE_URL}${path}` },
            ],
          })}
        </script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/ac-cost/europe" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          All European countries
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
              Hourly, monthly and yearly cooling costs at {c.inName === 'the United Kingdom' ? 'UK' : `${c.name}'s`} electricity prices, by unit size, city and energy class, in{' '}
              {c.currency === 'GBP' ? 'pounds' : 'euros'}.
            </p>
            <ArticleByline updated={EUROPE_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              At <strong>{unitPrice(c)} per kWh</strong> ({c.asOf}), a typical 3.5 kW split air conditioner (energy class
              A++) costs about <strong>{m(perHour, 2)} an hour</strong> to run in {c.inName}, or {m(month)} for a month at 8
              hours a day. Over a year it comes to about <strong>{m(refYear)} in {c.ref.name}</strong>
              {hot.name === c.ref.name
                ? <>, the hottest city we list, and {m(yearCost(EU_REF_KW, EU_REF_SEER, cool.hours, rate))} in {cool.name}.</>
                : <>, from {m(yearCost(EU_REF_KW, EU_REF_SEER, cool.hours, rate))} in {cool.name} to {m(yearCost(EU_REF_KW, EU_REF_SEER, hot.hours, rate))} in {hot.name}.</>} A portable unit costs about{' '}
              {m(portableHour, 2)} an hour. In U.S. terms the price is about {cents(c.usdRate)}/kWh, {vsUs} the U.S. average.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Per hour', value: m(perHour, 2), note: '3.5 kW split, SEER 6.1' },
              { label: 'Per month', value: m(month), note: '8 hrs/day × 30 days' },
              { label: `Per year, ${c.ref.name}`, value: m(refYear), note: `${c.ref.hours.toLocaleString()} cooling hours` },
            ].map((k) => (
              <div key={k.label} className="rounded-lg border border-gray-200 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{k.label}</p>
                <p className="text-3xl font-bold text-[#17204d] my-1">{k.value}</p>
                <p className="text-xs text-gray-500">{k.note}</p>
              </div>
            ))}
          </div>

          <Estimator key={c.slug} c={c} />

          <h2 className={h2}>Yearly cost by city</h2>
          <p className={p}>
            How long the AC runs matters as much as the price of power, and that varies hugely across {c.inName}. A 3.5 kW
            split unit at SEER {EU_REF_SEER}:
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>City</th>
                  <th className={th}>Cooling hours/yr</th>
                  <th className={th}>Per year</th>
                  <th className={th}>Portable unit, same hours</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((x) => (
                  <tr key={x.name} className={x.name === c.ref.name ? 'bg-amber-50/60' : ''}>
                    <td className={`${td} font-medium`}>{x.name}</td>
                    <td className={td}>{x.hours.toLocaleString()}</td>
                    <td className={td}>{m(yearCost(EU_REF_KW, EU_REF_SEER, x.hours, rate))}</td>
                    <td className={td}>{m(portableHour * x.hours)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Cooling hours are our estimate of full-load hours for each city's climate. For comparison, the EU energy label
            assumes 350 hours for an average European climate. The portable column assumes a typical unit drawing about 1 kW.
          </p>

          <h2 className={h2}>Cost by unit size</h2>
          <p className={p}>
            In Europe, air conditioners are sold by cooling capacity in kW. Costs at SEER {EU_REF_SEER} and {unitPrice(c)}/kWh:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Unit</th>
                  <th className={th}>Typical use</th>
                  <th className={th}>Per hour</th>
                  <th className={th}>Per month (8 hrs/day)</th>
                  <th className={th}>Per year, {c.ref.name}</th>
                </tr>
              </thead>
              <tbody>
                {EU_SIZES.map((s) => (
                  <tr key={s.kw} className={s.kw === EU_REF_KW ? 'bg-amber-50/60' : ''}>
                    <td className={`${td} font-medium whitespace-nowrap`}>{s.label}</td>
                    <td className={td}>{s.use}</td>
                    <td className={td}>{m(hourCost(s.kw, EU_REF_SEER, rate), 2)}</td>
                    <td className={td}>{m(hourCost(s.kw, EU_REF_SEER, rate) * HOT_MONTH_HOURS)}</td>
                    <td className={td}>{m(yearCost(s.kw, EU_REF_SEER, c.ref.hours, rate))}</td>
                  </tr>
                ))}
                <tr>
                  <td className={`${td} font-medium whitespace-nowrap`}>Portable</td>
                  <td className={td}>one room, no installation</td>
                  <td className={td}>{m(portableHour, 2)}</td>
                  <td className={td}>{m(portableHour * HOT_MONTH_HOURS)}</td>
                  <td className={td}>{m(portableHour * c.ref.hours)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className={h2}>What a more efficient unit saves</h2>
          <p className={p}>
            The energy label shows the unit's seasonal efficiency (SEER) and class. Yearly cost of a 3.5 kW unit in{' '}
            {c.ref.name} ({c.ref.hours.toLocaleString()} hours):
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>EU SEER</th>
                  <th className={th}>Energy class</th>
                  <th className={th}>Per year</th>
                  <th className={th}>Saved vs SEER 4.6</th>
                </tr>
              </thead>
              <tbody>
                {EU_SEERS.map((s) => (
                  <tr key={s.seer}>
                    <td className={`${td} font-medium`}>{s.seer.toFixed(1)}</td>
                    <td className={td}>{s.label}{s.note ? <span className="text-gray-400"> ({s.note})</span> : null}</td>
                    <td className={td}>{m(yearCost(EU_REF_KW, s.seer, c.ref.hours, rate))}</td>
                    <td className={td}>{s.seer === 4.6 ? '—' : m(save(4.6, s.seer))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            EU SEER is measured in a different way from the U.S. SEER used elsewhere on this site, so the numbers can't be
            compared directly. Going from A++ (6.1) to A+++ (8.5) saves about {m(save(6.1, 8.5))} a year in {c.ref.name}
            {save(6.1, 8.5) * 12 < 300 ? ', so in most homes the premium for a top-class unit is hard to earn back on cooling alone' : ''}.
            Many split units are heat pumps that also heat in winter, and there the heating rating (SCOP) usually matters more.
          </p>

          <h2 className={h2}>What to know about electricity prices in {c.inName}</h2>
          <p className={p}>
            The price used here is the {c.rateNote} ({c.asOf}).
          </p>
          {c.tariff.map((t) => <p key={t} className={p}>{t}</p>)}

          <div className="flex gap-3 rounded-lg bg-slate-50 border border-slate-200 p-5 mb-4">
            <Wind className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
            <div className="text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-900 mb-1">Cutting the cost</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Close shutters or blinds on sunny windows before the heat builds.</li>
                <li>Set 25–26°C rather than 21°C. Each degree warmer saves several percent.</li>
                <li>Cool the room you're in, with the door closed, rather than the whole home.</li>
                <li>Clean the indoor unit's filters every few weeks in summer.</li>
                <li>If you're buying, a small split unit costs far less to run than a portable one.</li>
              </ul>
            </div>
          </div>

          <h2 className={h2}>How {c.inName} compares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {others.map((n) => (
              <Link key={n.slug} to={`/ac-cost/${n.slug}`} className="rounded-lg border border-gray-200 p-3 hover:border-teal-400 hover:shadow-sm transition-all">
                <p className="font-semibold text-gray-900">{n.name}</p>
                <p className="text-sm text-teal-700">{unitPrice(n)}/kWh</p>
                <p className="text-xs text-gray-500">≈ {cents(n.usdRate)} US</p>
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {Cap(c.inName)}: ≈ {cents(c.usdRate)} US/kWh. U.S. average: {cents(US_RATE)}/kWh ({RATES_AS_OF}). See{' '}
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
            Electricity used (kWh) = cooling capacity (kW) ÷ SEER × hours. Cost = kWh × price. Price:{' '}
            <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer" className={a}>{c.source}</a>. U.S. dollar figures
            use {usdNote} ({FX_AS_OF}). Cooling hours are our estimate for each city. To check your own price, divide the
            energy part of your bill by the kWh used.
          </p>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
