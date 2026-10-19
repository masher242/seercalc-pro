import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import FanSeries from '../components/FanSeries';
import { articleJsonLd, SITE_URL } from '../data/site';
import { STATES, US_RATE, RATES_AS_OF, RATES_SOURCE_URL, usd, cents } from '../data/acCost';
import { COUNTRIES } from '../data/caribbean';
import {
  FANS_UPDATED, FAN_TYPES, fanType, AC_KW, AC_TONS, AC_SEER, DEGREES_RAISED, PCT_PER_DEGREE, FAN_HOURS_FACTOR,
  DEFAULT_FANS, fanSavings,
} from '../data/fans';

const PATH = '/blog/ceiling-fan-vs-ac-savings';
const TITLE = 'Ceiling Fan vs. AC: How Much Does a Fan Really Save?';
const HEADLINE = 'Ceiling Fan vs. Air Conditioning: How Much Does a Fan Really Save?';
const US_HOURS = 1500;

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700 align-top';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const h3 = 'text-lg font-bold text-gray-900 mt-6 mb-2';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';
const ext = 'text-teal-700 hover:underline';

const signed = (n: number) => `${n >= 0 ? '+' : '−'}${usd(Math.abs(n))}`;

function FanSavingsEstimator() {
  const [rateC, setRateC] = useState(+(US_RATE * 100).toFixed(2));
  const [acHours, setAcHours] = useState(US_HOURS);
  const [tons, setTons] = useState(AC_TONS);
  const [degrees, setDegrees] = useState(DEGREES_RAISED);
  const [fans, setFans] = useState(DEFAULT_FANS);
  const [type, setType] = useState<'dc-ceiling' | 'ac-ceiling'>('ac-ceiling');
  const [fanHours, setFanHours] = useState(Math.round(US_HOURS * FAN_HOURS_FACTOR));

  const r = fanSavings({ acHours, rate: rateC / 100, fans, watts: fanType(type).watts, fanHours, degrees, tons });
  const input = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500';
  const label = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <div className="rounded-lg border border-teal-200 bg-teal-50/50 p-5 mb-6">
      <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-3">Your numbers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
        <div>
          <label htmlFor="fv-rate" className={label}>Rate (¢/kWh)</label>
          <input id="fv-rate" type="number" min={1} max={150} step={0.01} className={input} value={rateC}
            onChange={(e) => setRateC(Math.max(0, Number(e.target.value)))} />
        </div>
        <div>
          <label htmlFor="fv-ac-hours" className={label}>AC hours/year</label>
          <input id="fv-ac-hours" type="number" min={0} max={8760} step={100} className={input} value={acHours}
            onChange={(e) => {
              const h = Math.min(8760, Math.max(0, Number(e.target.value)));
              setAcHours(h);
              setFanHours(Math.min(8760, Math.round(h * FAN_HOURS_FACTOR)));
            }} />
        </div>
        <div>
          <label htmlFor="fv-tons" className={label}>AC size</label>
          <select id="fv-tons" className={input} value={tons} onChange={(e) => setTons(Number(e.target.value))}>
            {[1.5, 2, 2.5, 3, 3.5, 4, 5].map((t) => <option key={t} value={t}>{t} ton</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="fv-deg" className={label}>Degrees raised (°F)</label>
          <input id="fv-deg" type="number" min={0} max={10} step={1} className={input} value={degrees}
            onChange={(e) => setDegrees(Math.min(10, Math.max(0, Number(e.target.value))))} />
        </div>
        <div>
          <label htmlFor="fv-fans" className={label}>Fans running</label>
          <input id="fv-fans" type="number" min={0} max={12} step={1} className={input} value={fans}
            onChange={(e) => setFans(Math.min(12, Math.max(0, Math.round(Number(e.target.value)))))} />
        </div>
        <div>
          <label htmlFor="fv-type" className={label}>Fan motor</label>
          <select id="fv-type" className={input} value={type} onChange={(e) => setType(e.target.value as 'dc-ceiling' | 'ac-ceiling')}>
            <option value="ac-ceiling">Standard (~{fanType('ac-ceiling').watts} W)</option>
            <option value="dc-ceiling">DC (~{fanType('dc-ceiling').watts} W)</option>
          </select>
        </div>
        <div>
          <label htmlFor="fv-fan-hours" className={label}>Fan hours/year</label>
          <input id="fv-fan-hours" type="number" min={0} max={8760} step={100} className={input} value={fanHours}
            onChange={(e) => setFanHours(Math.min(8760, Math.max(0, Number(e.target.value))))} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500">AC saving from raising {degrees}°F</p>
          <p className="text-2xl font-bold text-gray-900">{usd(r.acSaved)}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500">Cost of running the fans</p>
          <p className="text-2xl font-bold text-gray-900">{usd(r.fanCost)}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500">Net saving per year</p>
          <p className={`text-2xl font-bold ${r.net >= 0 ? 'text-teal-700' : 'text-red-700'}`}>{signed(r.net)}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Your AC's yearly cooling cost here is {usd(r.acYear)} (SEER {AC_SEER}). The saving uses the rule of thumb of about{' '}
        {Math.round(PCT_PER_DEGREE * 100)}% per °F. Fan hours start at {FAN_HOURS_FACTOR}× the AC hours, because fans run
        whenever someone is in the room; change them to match how you use yours.
      </p>
    </div>
  );
}

export default function BlogArticleFanVsAc() {
  const acc = fanType('ac-ceiling');
  const dc = fanType('dc-ceiling');
  const acHour = AC_KW * US_RATE;
  const fanHourAc = (acc.watts / 1000) * US_RATE;
  const fanHourDc = (dc.watts / 1000) * US_RATE;
  const ratio = Math.round((AC_KW * 1000) / acc.watts);

  const byName = (n: string) => STATES.find((s) => s.name === n)!;
  const bahamas = COUNTRIES.find((c) => c.slug === 'bahamas');
  const rows = [
    { place: 'U.S. average', link: '/ac-cost', rate: US_RATE, hours: US_HOURS },
    ...['New York', 'Ohio', 'California', 'Texas', 'Florida', 'Arizona'].map((n) => {
      const s = byName(n);
      return { place: s.name, link: `/ac-cost/${s.slug}`, rate: s.rate, hours: s.hours };
    }),
    ...(bahamas ? [{ place: 'The Bahamas', link: `/ac-cost/${bahamas.slug}`, rate: bahamas.usdRate, hours: bahamas.hours }] : []),
  ].map((r) => ({
    ...r,
    std: fanSavings({ acHours: r.hours, rate: r.rate, fans: DEFAULT_FANS, watts: acc.watts }),
    dcr: fanSavings({ acHours: r.hours, rate: r.rate, fans: DEFAULT_FANS, watts: dc.watts }),
  }));
  const us = rows[0];
  const bah = rows.find((r) => r.place === 'The Bahamas');
  const usNoRaise = fanSavings({ acHours: US_HOURS, rate: US_RATE, fans: DEFAULT_FANS, watts: acc.watts, degrees: 0 });

  const description = `A ceiling fan costs about ${cents(fanHourAc)} an hour; central AC about ${usd(acHour, 2)}. Fans save money only if you raise the thermostat and switch them off in empty rooms. By state, with a calculator.`;

  const faqs = [
    {
      q: 'Is it cheaper to run a ceiling fan or the air conditioner?',
      a: `Much cheaper to run the fan. At the U.S. average rate of ${cents(US_RATE)}/kWh a standard ceiling fan costs about ${cents(fanHourAc)} an hour on high and a DC-motor fan about ${cents(fanHourDc)}, while a 3-ton central air conditioner costs about ${usd(acHour, 2)} an hour. The AC uses roughly ${ratio} times the power.`,
    },
    {
      q: 'Do ceiling fans actually lower your electric bill?',
      a: `Only if you use them to run the AC less. A fan doesn't cool the room; it makes people feel cooler. The U.S. Department of Energy says a ceiling fan lets you raise the thermostat about ${DEGREES_RAISED}°F with no loss of comfort, and that saving is what lowers the bill. Running fans without raising the thermostat just adds their cost: about ${usd(usNoRaise.fanCost)} a year for two standard fans at U.S. average rates in our example.`,
    },
    {
      q: 'Should I turn off the ceiling fan when I leave the room?',
      a: 'Yes. Fans cool people, not rooms. A fan spinning in an empty room uses electricity and does nothing for the temperature; it can even add a little heat from its motor.',
    },
    {
      q: 'How much can I save with a ceiling fan?',
      a: `In our example (two ceiling fans, thermostat raised ${DEGREES_RAISED}°F, U.S. average rates and hours), about ${usd(us.std.net)} a year with standard fans and ${usd(us.dcr.net)} with DC fans. In hot, expensive places it's several times more. The bigger saving comes from using fans instead of the AC on mild days and evenings: every hour the AC stays off saves about ${usd(acHour - fanHourAc, 2)} at U.S. average rates.`,
    },
    {
      q: 'Can a ceiling fan replace air conditioning?',
      a: 'In mild, dry weather, often yes. In heat and humidity, no: a fan moves air but doesn\'t cool it or remove moisture, and above about body temperature moving hot air can make you feel worse, not better. Use fans to stretch the AC, not to replace it on hot days.',
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
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 9 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              A fan costs pennies an hour. Whether it saves you anything depends on two habits.
            </p>
            <ArticleByline updated={FANS_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              At the U.S. average rate of {cents(US_RATE)}/kWh, a ceiling fan costs about <strong>{cents(fanHourAc)} an
              hour</strong> ({cents(fanHourDc)} for a DC-motor fan). A 3-ton central air conditioner costs about{' '}
              <strong>{usd(acHour, 2)} an hour</strong>, roughly {ratio} times as much. But a fan doesn't cool the room; it
              cools you. It only saves money if you <strong>raise the thermostat</strong> (the Department of Energy says
              about {DEGREES_RAISED}°F) and <strong>turn the fan off when you leave</strong>. Do both, and two fans save about{' '}
              {usd(us.std.net)}–{usd(us.dcr.net)} a year at U.S. average rates, and several times that in hot, expensive places.
            </p>
          </div>

          <p className={p}>
            We have ceiling fans at home, and they make a huge difference. My stores don't have them. That contrast is a
            good way to understand fans: they help the people sitting or sleeping under them, which suits a living room or
            bedroom, while a store with customers coming and going depends on the AC. The difference between cooling people
            and cooling a space is the key to whether a fan saves you money.
          </p>

          <FanSeries current={PATH} />

          <h2 className={h2}>How a fan cools you without cooling the room</h2>
          <p className={p}>
            A fan doesn't lower the air temperature. Its motor actually adds a little heat. What it does is move air across
            your skin, which carries heat away and speeds up the evaporation of sweat. You feel cooler at the same
            temperature, the way a breeze feels cooler than still air. That's why a fan in an empty room is pure waste: there's
            no one there to feel the breeze.
          </p>
          <p className={p}>
            The money comes from what you do with that comfort. If the room feels {DEGREES_RAISED}°F cooler with the fan on,
            you can set the thermostat {DEGREES_RAISED}°F higher, and the AC runs less. The fan's own running cost is the
            price of that saving.
          </p>

          <h2 className={h2}>What a fan costs to run compared with AC</h2>
          <p className={p}>
            Cost of one hour at the U.S. average residential rate of {cents(US_RATE)}/kWh ({RATES_AS_OF}), on high speed:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>What's running</th>
                  <th className={th}>Power (typical)</th>
                  <th className={th}>Cost per hour</th>
                  <th className={th}>Cost per month, 8 hours a day</th>
                </tr>
              </thead>
              <tbody>
                {FAN_TYPES.map((f) => (
                  <tr key={f.id}>
                    <td className={`${td} font-medium`}>{f.name}</td>
                    <td className={td}>{f.watts} W ({f.range})</td>
                    <td className={td}>{cents((f.watts / 1000) * US_RATE)}</td>
                    <td className={td}>{usd((f.watts / 1000) * US_RATE * 240, 2)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className={`${td} font-medium`}>Central air conditioner, {AC_TONS}-ton, SEER {AC_SEER}</td>
                  <td className={td}>{(AC_KW * 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })} W</td>
                  <td className={td}>{usd(acHour, 2)}</td>
                  <td className={td}>{usd(acHour * 240)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={p}>
            The cost in your state, in the Caribbean, Canada and Europe is in{' '}
            <Link to="/blog/cost-to-run-a-fan" className={a}>how much it costs to run a fan</Link>.
          </p>

          <h2 className={h2}>The two habits that decide whether a fan saves money</h2>
          <h3 className={h3}>1. Raise the thermostat</h3>
          <p className={p}>
            Without this, a fan is an extra cost on top of the AC. Two standard fans running alongside the AC, with the
            thermostat left where it was, add about {usd(usNoRaise.fanCost)} a year at U.S. average rates in our example.
            Raise the setting {DEGREES_RAISED}°F and, using the common rule of thumb of about{' '}
            {Math.round(PCT_PER_DEGREE * 100)}% less cooling energy per degree, the AC uses about{' '}
            {Math.round(DEGREES_RAISED * PCT_PER_DEGREE * 100)}% less. That's where the saving comes from. Our{' '}
            <Link to="/blog/thermostat-setback-strategy" className={a}>thermostat strategy</Link> has the schedule.
          </p>
          <h3 className={h3}>2. Turn it off when you leave</h3>
          <p className={p}>
            Fans cool people, not rooms. A fan left running in an empty bedroom all day costs money and changes nothing.
            Fans with a remote or a timer, or smart fans that can be scheduled, make this easier.
          </p>

          <h2 className={h2}>What two ceiling fans save, by location</h2>
          <p className={p}>
            Two ceiling fans, the thermostat raised {DEGREES_RAISED}°F, a 3-ton SEER 14 central AC, and our estimate of cooling
            hours for each climate. The fans run {FAN_HOURS_FACTOR} times as many hours as the AC, because they're on
            whenever someone is in the room. "Net saving" is the AC saving minus what the fans cost to run.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm min-w-[640px]">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Location</th>
                  <th className={th}>Electricity rate</th>
                  <th className={th}>AC hours per year</th>
                  <th className={th}>AC saving from raising {DEGREES_RAISED}°F</th>
                  <th className={th}>Net saving, standard fans</th>
                  <th className={th}>Net saving, DC fans</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.place}>
                    <td className={td}><Link to={r.link} className={a}>{r.place}</Link></td>
                    <td className={td}>{cents(r.rate)}</td>
                    <td className={td}>{r.hours.toLocaleString()}</td>
                    <td className={td}>{usd(r.std.acSaved)}</td>
                    <td className={`${td} ${r.std.net >= 0 ? 'text-teal-700 font-semibold' : 'text-red-700'}`}>{signed(r.std.net)}</td>
                    <td className={`${td} ${r.dcr.net >= 0 ? 'text-teal-700 font-semibold' : 'text-red-700'}`}>{signed(r.dcr.net)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>
            Two things stand out. The saving is real but modest: tens of dollars a year in most of the U.S.{bah && <>, and about{' '}
            {usd(bah.std.net)}–{usd(bah.dcr.net)} in the Bahamas</>}. And the motor matters: a standard fan uses about twice the power of a DC fan,
            so it gives back a bigger share of the saving. If you're buying new fans, a DC motor is worth it. See the{' '}
            <Link to="/blog/ceiling-fan-buying-guide" className={a}>ceiling fan buying guide</Link>.
          </p>

          <h2 className={h2}>The bigger saving: fan instead of AC</h2>
          <p className={p}>
            The table assumes the AC runs as usual, just at a higher setting. The larger saving comes from not running the AC
            at all when you don't need it: mild evenings, spring and fall, a cool night with the windows open. Every hour you
            use a fan instead of the AC saves about {usd(acHour - fanHourAc, 2)} at U.S. average rates. A few hundred hours a
            year of that is worth more than the thermostat trick.
          </p>
          <p className={p}>
            It has limits. A fan moves air but doesn't remove humidity, so in muggy weather the air stays clammy. And once the
            air is hotter than your skin, roughly the mid-90s °F, a fan blows hot air at you and stops helping. On those days,
            run the AC and use the fan to raise the setting.
          </p>

          <h2 className={h2}>Run your own numbers</h2>
          <FanSavingsEstimator />

          <h2 className={h2}>When fans don't help</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Empty rooms.</strong> No one to cool, so it's wasted power.</li>
            <li><strong>Stores and other busy spaces</strong> where people come and go, or stand far from a fan. There the AC does the work.</li>
            <li><strong>Very hot air.</strong> Above roughly body temperature, a fan can make you feel hotter.</li>
            <li><strong>Humidity.</strong> A ceiling fan doesn't dry the air. For a clammy house, see{' '}
              <Link to="/troubleshooting/ac-high-humidity" className={a}>house humid with the AC on</Link>.</li>
            <li><strong>Your AC's own fan setting.</strong> Setting the thermostat fan to "On" is not the same as a ceiling fan, and it can raise humidity. See{' '}
              <Link to="/blog/home-airflow-fans" className={a}>fans and airflow in your home</Link>.</li>
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
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 mb-8">
            <li>Raising the thermostat about 4°F with a ceiling fan, turning fans off in empty rooms: <a href="https://www.energy.gov/energysaver/fans-cooling" target="_blank" rel="noopener noreferrer" className={ext}>U.S. Department of Energy, Energy Saver: Fans for cooling</a>.</li>
            <li>Electricity rates: <a href={RATES_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={ext}>EIA Electric Power Monthly, Table 5.6.A</a> ({RATES_AS_OF}); the Bahamas from the <Link to="/ac-cost/bahamas" className={ext}>Bahamas cost page</Link>. Cooling hours are our climate estimates, as on the state pages.</li>
            <li>Fan wattages: an ENERGY STAR-listed 44" fan (17.6 W high, 2.7 W low), a manufacturer EnergyGuide label (44 W), and published watt-meter tests of standard and portable fans. Typical figures; check your fan's label.</li>
            <li>The {Math.round(PCT_PER_DEGREE * 100)}%-per-°F saving and the {FAN_HOURS_FACTOR}× fan hours are rules of thumb and our assumptions, not measurements.</li>
          </ul>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
