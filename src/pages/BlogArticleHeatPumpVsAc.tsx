import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Flame, Snowflake } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import { VerdictBadge, KeepYearsField, PaybackResults, HowWeJudge } from '../components/PaybackVerdict';
import { SYSTEM_LIFE } from '../data/payback';
import { articleJsonLd, SITE_URL } from '../data/site';
import { STATES, RATES_AS_OF, RATES_SOURCE_URL, usd, cents } from '../data/acCost';
import {
  FUELS, US_FUEL_PRICE, US_ELEC, US_FUEL_SOURCE, US_FUEL_SOURCE_URL, CLIMATES, HEAT_PUMPS, HP_PREMIUM, HP_PREMIUM_RANGE,
  HP_PREMIUM_SOURCE_URL, costPerMmbtu, heatPumpCostPerMmbtu, seasonalCop, gasBreakEvenElec, KWH_PER_MMBTU,
  US_GAS_PER_MCF, US_PROPANE_PER_GAL, US_OIL_PER_GAL, type Fuel, type ClimateId,
} from '../data/heating';

const PATH = '/blog/heat-pump-vs-central-ac';
const TITLE = 'Heat Pump vs Central AC: Running Costs and Payback (2026)';
const HEADLINE = 'Heat Pump vs. Central AC in 2026: Which Costs Less to Run, and When the Heat Pump Pays Off';
const PUBLISHED = '2026-10-21';
const UPDATED = '2026-10-21';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 align-bottom';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700 align-top';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';
const ext = 'text-teal-700 hover:underline';
const box = 'rounded-lg border border-teal-200 bg-teal-50/60 p-4 mb-4 text-sm text-gray-800';

/** Yearly heating cost, US$, for a climate preset. */
function yearCost(fuel: Fuel, price: number, mmbtu: number) {
  return costPerMmbtu(fuel, price) * mmbtu;
}
function hpYearCost(elec: number, hspf2: number, climate: ClimateId) {
  const c = CLIMATES.find((x) => x.id === climate)!;
  return heatPumpCostPerMmbtu(elec, seasonalCop(hspf2, c.copFactor)) * c.mmbtu;
}

const COLD_HP = HEAT_PUMPS[1];
const STD_HP = HEAT_PUMPS[0];
const moderate = CLIMATES[1];
const copStd = seasonalCop(STD_HP.hspf2);
const copCold = seasonalCop(COLD_HP.hspf2);
const breakStd = gasBreakEvenElec(US_GAS_PER_MCF, copStd);
const breakCold = gasBreakEvenElec(US_GAS_PER_MCF, copCold);
const statesUnder = (rate: number) => STATES.filter((s) => s.rate <= rate).length;
const cheapest = [...STATES].sort((x, y) => x.rate - y.rate)[0];

function Estimator() {
  const [state, setState] = useState('us');
  const [climate, setClimate] = useState<ClimateId>('moderate');
  const [fuel, setFuel] = useState<Fuel>('oil');
  const [price, setPrice] = useState<number>(US_FUEL_PRICE.oil);
  const [hp, setHp] = useState<string>(COLD_HP.id);
  const [premium, setPremium] = useState(HP_PREMIUM);
  const [keep, setKeep] = useState(SYSTEM_LIFE);

  const elec = state === 'us' ? US_ELEC : STATES.find((s) => s.slug === state)!.rate;
  const fuelPrice = fuel === 'electric' ? elec : price;
  const c = CLIMATES.find((x) => x.id === climate)!;
  const hspf2 = HEAT_PUMPS.find((x) => x.id === hp)!.hspf2;
  const now = yearCost(fuel, fuelPrice, c.mmbtu);
  const withHp = hpYearCost(elec, hspf2, climate);
  const label = 'block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5';
  const input = 'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 font-semibold focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none';
  const f = FUELS.find((x) => x.id === fuel)!;

  return (
    <section aria-label="Heat pump savings estimator" className="rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white p-5 sm:p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-1">Estimate your own payback</h3>
      <p className="text-sm text-gray-600 mb-4">
        For someone replacing a central AC anyway: is the heat pump's extra cost repaid by cheaper heating? Cooling costs
        are the same for both at the same SEER, so only heating counts.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <label>
          <span className={label}>Your state (sets the electricity price)</span>
          <select className={input} value={state} onChange={(e) => setState(e.target.value)}>
            <option value="us">U.S. average ({cents(US_ELEC)}/kWh)</option>
            {STATES.map((s) => <option key={s.slug} value={s.slug}>{s.name} ({cents(s.rate)}/kWh)</option>)}
          </select>
        </label>
        <label>
          <span className={label}>Your winters</span>
          <select className={input} value={climate} onChange={(e) => setClimate(e.target.value as ClimateId)}>
            {CLIMATES.map((x) => <option key={x.id} value={x.id}>{x.label}: {x.examples}</option>)}
          </select>
        </label>
        <label>
          <span className={label}>How you heat now</span>
          <select className={input} value={fuel} onChange={(e) => { const v = e.target.value as Fuel; setFuel(v); if (v !== 'electric') setPrice(US_FUEL_PRICE[v]); }}>
            {FUELS.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
          </select>
        </label>
        {fuel !== 'electric' ? (
          <label>
            <span className={label}>Your fuel price ({f.unit})</span>
            <input type="number" min={0} step={0.01} inputMode="decimal" className={input} value={price}
              onChange={(e) => setPrice(Math.max(0, Number(e.target.value) || 0))} />
          </label>
        ) : (
          <div className="text-sm text-gray-600 self-end pb-2">Electric heat uses the same electricity price as the heat pump.</div>
        )}
        <label>
          <span className={label}>Heat pump</span>
          <select className={input} value={hp} onChange={(e) => setHp(e.target.value)}>
            {HEAT_PUMPS.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label>
            <span className={label}>Extra cost of the heat pump ($)</span>
            <input type="number" min={0} step={100} inputMode="numeric" className={input} value={premium}
              onChange={(e) => setPremium(Math.max(0, Number(e.target.value) || 0))} />
          </label>
          <KeepYearsField id="hp-keep" value={keep} onChange={setKeep} className={input} labelClass={label} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3 text-center">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500">Heating per year now</p>
          <p className="text-2xl font-bold text-gray-900">{usd(now)}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500">Heating per year with the heat pump</p>
          <p className="text-2xl font-bold text-gray-900">{usd(withHp)}</p>
        </div>
      </div>
      <PaybackResults yearly={now - withHp} premium={premium} keep={keep} money={(n) => usd(n)} />
      {now < withHp && (
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
          At these prices the heat pump costs {usd(withHp - now)} a year more to heat with than your current system. It
          can still make sense for comfort, as a backup, or if you'd otherwise need both a new AC and a new furnace.
        </p>
      )}
      <p className="text-xs text-gray-500 mt-3">
        Heat needed: {c.mmbtu} million Btu a year ({Math.round(c.mmbtu * KWH_PER_MMBTU).toLocaleString()} kWh), our estimate for a
        typical 2,000 sq ft home. Your furnace at {f.effLabel} efficiency; heat pump seasonal efficiency{' '}
        {seasonalCop(hspf2, c.copFactor).toFixed(2)} (heat delivered per unit of electricity) in this climate.
      </p>
    </section>
  );
}

export default function BlogArticleHeatPumpVsAc() {
  const [hpView, setHpView] = useState<string>(COLD_HP.id);
  const hspf2 = HEAT_PUMPS.find((x) => x.id === hpView)!.hspf2;
  const description = `A heat pump costs ${HP_PREMIUM_RANGE} more than a central AC. Where it pays back (oil, propane, electric heat) and where it doesn't (most gas homes), with 2026 prices and a payback calculator.`;

  const faqs = [
    {
      q: 'Is a heat pump cheaper to run than central air conditioning?',
      a: 'For cooling, they cost the same: a heat pump in summer is an air conditioner, and at the same SEER2 rating it uses the same electricity. The difference is in winter, when the heat pump also heats your home. Whether that saves money depends on what it replaces.',
    },
    {
      q: 'Does a heat pump save money over a gas furnace?',
      a: `Usually not at U.S. average prices. With gas at $${US_GAS_PER_MCF.toFixed(2)} per thousand cubic feet (EIA's winter 2026–27 forecast), a heat pump only matches a 95% gas furnace when electricity costs about ${cents(breakStd)}–${cents(breakCold)} a kWh or less, depending on the model. The U.S. average is ${cents(US_ELEC)}. Where power is cheap or gas is expensive, the numbers change; use the calculator with your own prices.`,
    },
    {
      q: 'Is a heat pump worth it if I heat with oil or electric baseboards?',
      a: `Usually, yes. In a moderate climate, a cold-climate heat pump cuts heating costs by about ${usd(yearCost('oil', US_OIL_PER_GAL, moderate.mmbtu) - hpYearCost(US_ELEC, COLD_HP.hspf2, 'moderate'))} a year against oil and ${usd(yearCost('electric', US_ELEC, moderate.mmbtu) - hpYearCost(US_ELEC, COLD_HP.hspf2, 'moderate'))} against electric resistance heat at U.S. average prices, so a $${HP_PREMIUM.toLocaleString()} premium pays back in a few years.`,
    },
    {
      q: 'Is there still a federal tax credit for heat pumps?',
      a: 'No. The federal 25C credit for heat pumps ended for equipment installed after December 31, 2025. Some states and utilities still offer rebates, and the income-based HEEHRA rebates run by states can help with electric-to-electric upgrades, but DOE guidance from May 2026 rules out HEEHRA rebates for replacing gas or other fossil-fuel equipment.',
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
          {JSON.stringify(articleJsonLd({ path: PATH, headline: HEADLINE, description, dateModified: UPDATED, datePublished: PUBLISHED }))}
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
          Back to blog
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">HVAC Guides</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              Replacing your central air? A heat pump does the same cooling and also heats. Here's when the extra cost pays
              back, with this winter's fuel prices.
            </p>
            <ArticleByline updated={UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              A heat pump costs about <strong>{HP_PREMIUM_RANGE} more</strong> than a central AC of the same size and cools
              for exactly the same running cost. The extra cost is repaid only by cheaper heating. If you heat with{' '}
              <strong>oil or electric resistance</strong>, it usually pays back in 2–8 years. With <strong>propane</strong>{' '}
              it's marginal and needs a cold-climate model. With <strong>natural gas</strong> at U.S. average prices, a heat
              pump costs <em>more</em> to heat with than a 95% gas furnace unless your electricity is below about{' '}
              {cents(breakCold)} a kWh.
            </p>
          </div>

          <p className={p}>
            My stores are in the Caribbean, where nobody needs heating, so the AC-or-heat-pump question never comes up. In most of the U.S. and
            Canada it's the biggest decision you make when the air conditioner dies, and contractors often pitch the heat
            pump as the obvious upgrade. Sometimes it is. Sometimes it costs you money every winter. The difference comes
            down to two prices on your bills, and this article shows where the line falls.
          </p>

          <h2 className={h2}>What a heat pump is, and what it isn't</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="flex gap-3 rounded-lg border border-gray-200 p-4">
              <Snowflake className="w-6 h-6 text-teal-600 flex-shrink-0" />
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>In summer it's an air conditioner.</strong> Same outdoor unit, same refrigerant cycle, rated with the
                same SEER2. A 16 SEER2 heat pump and a 16 SEER2 AC cost the same to cool your house.
              </p>
            </div>
            <div className="flex gap-3 rounded-lg border border-gray-200 p-4">
              <Flame className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>In winter it runs in reverse.</strong> It moves heat from the outdoor air into the house, delivering
                2–3 units of heat for every unit of electricity over a season. Its heating efficiency is rated in HSPF2.
              </p>
            </div>
          </div>
          <p className={p}>
            That's why the comparison isn't really "heat pump vs. AC". It's "heat pump vs. whatever heats your house now".
            Against electric baseboards or an electric furnace, which turn one kWh into one kWh of heat, a heat pump is two
            to three times as efficient. Against gas, it depends on the price of a kWh compared with the price of gas.
          </p>

          <h2 className={h2}>Heating costs: heat pump vs. your current system</h2>
          <div className={box}>
            <p className="font-bold text-gray-900 mb-2">What this table shows</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>The house:</strong> a typical 2,000 sq ft home. How much heat it needs depends on the winters: we
                use {CLIMATES.map((c) => `${c.mmbtu}`).join(', ')} million Btu a year from mild to very cold (our estimate).
              </li>
              <li>
                <strong>Prices:</strong> U.S. averages: natural gas ${US_GAS_PER_MCF.toFixed(2)} per thousand cubic feet,
                propane ${US_PROPANE_PER_GAL.toFixed(2)} and heating oil ${US_OIL_PER_GAL.toFixed(2)} a gallon (EIA's
                forecast for winter 2026–27), electricity {cents(US_ELEC)}/kWh ({RATES_AS_OF}).
              </li>
              <li>
                <strong>Each cell:</strong> what switching to a heat pump saves (or costs) a year in heating, and the
                verdict on a ${HP_PREMIUM.toLocaleString()} heat pump premium. Furnaces at 95% efficiency (gas, propane),
                oil at 85%.
              </li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-2 mb-3 text-sm" role="group" aria-label="Heat pump type">
            {HEAT_PUMPS.map((h) => (
              <button key={h.id} type="button" onClick={() => setHpView(h.id)} aria-pressed={hpView === h.id}
                className={`px-3 py-1 rounded-full border font-semibold ${hpView === h.id ? 'bg-[#17204d] text-white border-[#17204d]' : 'bg-white text-gray-700 border-gray-200 hover:border-teal-400'}`}>
                {h.label}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto mb-3">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>You heat with</th>
                  {CLIMATES.map((c) => (
                    <th key={c.id} className={th}>{c.label}<span className="block text-xs font-normal text-gray-500">{c.examples}</span></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FUELS.map((f) => (
                  <tr key={f.id}>
                    <td className={`${td} font-medium`}>{f.label}</td>
                    {CLIMATES.map((c) => {
                      const save = yearCost(f.id, US_FUEL_PRICE[f.id], c.mmbtu) - hpYearCost(US_ELEC, hspf2, c.id);
                      const payback = save > 0 ? HP_PREMIUM / save : Infinity;
                      return (
                        <td key={c.id} className={td}>
                          <span className={save >= 0 ? 'text-gray-900 font-semibold' : 'text-red-700 font-semibold'}>
                            {save >= 0 ? `Saves ${usd(save)}` : `Costs ${usd(-save)} more`}
                          </span>
                          <span className="block text-xs text-gray-500 mb-1">
                            a year{save > 0 ? `, pays back in ${payback > 40 ? '40+' : payback.toFixed(1)} years` : ''}
                          </span>
                          <VerdictBadge payback={payback} />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Heat pump seasonal efficiency: HSPF2 ÷ 3.412, raised 15% for mild winters and lowered 10–20% for cold and very
            cold winters, when it relies more on backup heat (our estimate). Cold-climate models hold their output better in
            deep cold, so the real gap in very cold climates can be bigger than shown.
          </p>

          <HowWeJudge />

          <h2 className={h2}>The gas question: when does a heat pump beat a gas furnace?</h2>
          <p className={p}>
            Only one number matters: your electricity price compared with your gas price. At this winter's average gas
            price of ${US_GAS_PER_MCF.toFixed(2)} per thousand cubic feet, a heat pump heats for the same cost as a 95%
            gas furnace when electricity costs about <strong>{cents(breakStd)}/kWh</strong> (standard heat pump) or{' '}
            <strong>{cents(breakCold)}/kWh</strong> (cold-climate model).{' '}
            {statesUnder(breakCold) === 0
              ? <>No state's average residential price is that low; the cheapest, {cheapest.name}, is {cents(cheapest.rate)}. So at average gas prices a heat pump heats for more than gas almost everywhere. Where gas is expensive, the line moves up, as the table shows.</>
              : <>Only {statesUnder(breakCold)} of 51 states have an average residential price that low.</>}
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Your gas price ($ per thousand cubic feet)</th>
                  <th className={th}>Heat pump wins below this electricity price<span className="block text-xs font-normal text-gray-500">standard, HSPF2 {STD_HP.hspf2}</span></th>
                  <th className={th}>Heat pump wins below this electricity price<span className="block text-xs font-normal text-gray-500">cold-climate, HSPF2 {COLD_HP.hspf2}</span></th>
                </tr>
              </thead>
              <tbody>
                {[10, 13.44, 16, 20, 25].map((g) => (
                  <tr key={g} className={g === US_GAS_PER_MCF ? 'bg-amber-50/60' : ''}>
                    <td className={`${td} font-medium`}>${g.toFixed(2)}{g === US_GAS_PER_MCF ? ' (U.S. average)' : ''}</td>
                    <td className={td}>{cents(gasBreakEvenElec(g, copStd))}/kWh</td>
                    <td className={td}>{cents(gasBreakEvenElec(g, copCold))}/kWh</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>
            Your gas bill shows the price per therm or per hundred cubic feet: $1 per therm is about $10.36 per thousand
            cubic feet. Use the price of each extra unit (supply and delivery per therm), not the fixed monthly charge,
            which you'd keep paying as long as the gas is connected.
          </p>
          <p className={p}>
            That doesn't make a heat pump wrong for every gas home. A <strong>dual-fuel</strong> system keeps the furnace
            and lets the heat pump do the mild days, when it's most efficient, switching to gas in deep cold. It costs about
            the same as an AC plus furnace, gives you a backup heat source, and it's the safer choice if gas prices rise.
            Just don't expect it to lower your bills much at today's prices.
          </p>

          <Estimator />

          <h2 className={h2}>Rebates and credits in 2026</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Federal tax credit: gone.</strong> The 25C credit ended for equipment installed after December 31, 2025.</li>
            <li>
              <strong>HEEHRA (state-run, income-based):</strong> still available in some states for lower- and
              moderate-income households, but DOE guidance from May 2026 bars rebates for replacing gas or other
              fossil-fuel equipment. Electric-to-electric upgrades, like baseboards or an old electric furnace to a heat
              pump, still qualify.
            </li>
            <li><strong>Utilities and states:</strong> many still pay rebates for heat pumps, often more for cold-climate models. Check before you sign, because some require a pre-approval.</li>
          </ul>
          <p className={p}>
            Details: <Link to="/blog/hvac-tax-credits-rebates-2026" className={a}>HVAC tax credits and rebates in 2026</Link>.
            In Canada, federal and provincial heat pump programs are much larger; see{' '}
            <Link to="/blog/heat-pump-canada" className={a}>heat pumps in Canada: costs by province and 2026 rebates</Link>.
          </p>

          <h2 className={h2}>Beyond the running cost</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Size it for heating.</strong> A heat pump sized only for cooling can come up short in winter. In cold climates, ask for a Manual J load calculation and a model with good capacity at 5°F.</li>
            <li><strong>Backup heat.</strong> Most heat pumps have electric heat strips or a furnace for the coldest days. Strips cost two to three times as much to run as the heat pump, so they should only come on when needed.</li>
            <li><strong>Air feels different.</strong> Heat pump air is warm, not hot like a gas furnace's. Some people notice; most get used to it.</li>
            <li><strong>Winter maintenance.</strong> Keep snow off the outdoor unit and expect short defrost cycles with steam. See <Link to="/troubleshooting/heat-pump-defrost-mode" className={a}>defrost mode explained</Link>.</li>
            <li><strong>Lifespan.</strong> A heat pump runs all year, so it may wear out a little sooner than an AC that only runs in summer. Our payback verdicts don't account for that.</li>
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
            <li>Fuel prices: <a href={US_FUEL_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={ext}>{US_FUEL_SOURCE}</a>.</li>
            <li>Electricity: <a href={RATES_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={ext}>EIA Electric Power Monthly, Table 5.6.A</a>, {RATES_AS_OF}.</li>
            <li>
              Heat pump premium: <a href={HP_PREMIUM_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={ext}>PickHVAC</a> (central
              AC $4,500–$9,000 installed vs. heat pump $6,500–$13,500); we use ${HP_PREMIUM.toLocaleString()}.
            </li>
            <li>Heat content: 1.036 million Btu per thousand cubic feet of gas, 91,500 Btu per gallon of propane, 138,500 per gallon of heating oil, 3,412 Btu per kWh.</li>
            <li>Heat needed per climate and the climate adjustment to heat pump efficiency are our estimates; your bills will tell you more. To find your own heat use, add up a winter's fuel bills.</li>
          </ul>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
