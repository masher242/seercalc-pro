import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import { articleJsonLd, SITE_URL } from '../data/site';
import { STATES, US_RATE, RATES_AS_OF, RATES_SOURCE_URL, annualCost, usd, cents } from '../data/acCost';
import { COUNTRIES } from '../data/caribbean';
import { SEER2_FACTOR } from '../data/seer2';

const PATH = '/blog/16-vs-18-seer';
const TITLE = '16 vs 18 SEER: Is the Upgrade Worth It? (Payback Math)';
const HEADLINE = '16 vs 18 SEER: Is the Upgrade Worth the Extra Cost? (2026 Payback Math)';
const PUBLISHED = '2026-10-12';
const UPDATED = '2026-10-12';

/** Assumptions used throughout (stated in the article). */
const TONS = 3;
const US_HOURS = 1500;
const PREMIUM = 1500; // typical extra installed cost of 18 SEER over 16 SEER, 3-ton
const PREMIUM_LOW = 1000;
const PREMIUM_HIGH = 2500;
const LIFE = 15;
/** SEER → SEER2 for ducted split systems (same factor as our converter). */
const SPLIT_FACTOR = SEER2_FACTOR;

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const h3 = 'text-lg font-bold text-gray-900 mt-6 mb-2';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

/** Yearly savings of SEER 18 over SEER 16. */
const savings = (tons: number, hours: number, rate: number) =>
  annualCost(tons, 16, hours, rate) - annualCost(tons, 18, hours, rate);

const years = (n: number) => (n > 40 ? 'over 40 years' : `${n.toFixed(1)} years`);

function PaybackEstimator() {
  const [tons, setTons] = useState(3);
  const [rateC, setRateC] = useState(+(US_RATE * 100).toFixed(2));
  const [hours, setHours] = useState(US_HOURS);
  const [premium, setPremium] = useState(PREMIUM);

  const yearly = savings(tons, hours, rateC / 100);
  const payback = yearly > 0 ? premium / yearly : Infinity;
  const net = yearly * LIFE - premium;
  const input = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500';
  const label = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <div className="rounded-lg border border-teal-200 bg-teal-50/50 p-5 mb-6">
      <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-3">Your numbers</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div>
          <label htmlFor="pb-tons" className={label}>System size</label>
          <select id="pb-tons" className={input} value={tons} onChange={(e) => setTons(Number(e.target.value))}>
            {[1.5, 2, 2.5, 3, 3.5, 4, 5].map((t) => <option key={t} value={t}>{t} ton</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="pb-rate" className={label}>Rate (¢/kWh)</label>
          <input id="pb-rate" type="number" min={1} max={150} step={0.01} className={input} value={rateC}
            onChange={(e) => setRateC(Math.max(0, Number(e.target.value)))} />
        </div>
        <div>
          <label htmlFor="pb-hours" className={label}>Cooling hours/yr</label>
          <input id="pb-hours" type="number" min={0} max={8760} step={100} className={input} value={hours}
            onChange={(e) => setHours(Math.min(8760, Math.max(0, Number(e.target.value))))} />
        </div>
        <div>
          <label htmlFor="pb-prem" className={label}>Extra cost of 18 ($)</label>
          <input id="pb-prem" type="number" min={0} step={100} className={input} value={premium}
            onChange={(e) => setPremium(Math.max(0, Number(e.target.value)))} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500">Saved per year</p>
          <p className="text-2xl font-bold text-gray-900">{usd(yearly)}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500">Payback</p>
          <p className="text-2xl font-bold text-gray-900">{Number.isFinite(payback) ? years(payback) : '—'}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500">Net over {LIFE} years</p>
          <p className={`text-2xl font-bold ${net >= 0 ? 'text-teal-700' : 'text-red-700'}`}>
            {net >= 0 ? '+' : '−'}{usd(Math.abs(net))}
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Electricity savings only, at today's rate. Your rate is on your bill; the extra cost is the difference between two
        quotes for the same size system from the same installer.
      </p>
    </div>
  );
}

export default function BlogArticle16vs18Seer() {
  const usSave = savings(TONS, US_HOURS, US_RATE);
  const usPayback = PREMIUM / usSave;
  const kwhSaved = (TONS * US_HOURS) / 12;

  const byName = (n: string) => STATES.find((s) => s.name === n)!;
  const bahamas = COUNTRIES.find((c) => c.slug === 'bahamas');

  const scenarios = [
    { place: 'U.S. average', link: '/ac-cost', rate: US_RATE, hours: US_HOURS },
    ...['Ohio', 'New York', 'California', 'Florida', 'Texas', 'Arizona', 'Hawaii'].map((n) => {
      const s = byName(n);
      return { place: s.name, link: `/ac-cost/${s.slug}`, rate: s.rate, hours: s.hours };
    }),
    ...(bahamas ? [{ place: 'The Bahamas', link: `/ac-cost/${bahamas.slug}`, rate: bahamas.usdRate, hours: bahamas.hours }] : []),
  ].map((s) => {
    const save = savings(TONS, s.hours, s.rate);
    return { ...s, save, payback: PREMIUM / save, net: save * LIFE - PREMIUM };
  });

  const best = [...scenarios].sort((x, y) => y.save - x.save)[0];
  const description = `An 18 SEER AC uses 11% less electricity than a 16 SEER. For a 3-ton system at the U.S. average ${cents(US_RATE)}/kWh that saves about ${usd(usSave)} a year, so a ${usd(PREMIUM)} upgrade takes ${Math.round(usPayback)} years to pay back. Where it pays, and where it doesn't.`;

  const faqs = [
    {
      q: 'How much more efficient is 18 SEER than 16 SEER?',
      a: `An 18 SEER system uses 11% less electricity than a 16 SEER system for the same cooling (1 − 16 ÷ 18 = 0.111). A 3-ton system draws about 2.25 kW at SEER 16 and 2.00 kW at SEER 18, so it saves 0.25 kWh for every hour it runs.`,
    },
    {
      q: 'How much does 18 SEER save per year compared to 16 SEER?',
      a: `For a 3-ton system running ${US_HOURS.toLocaleString()} hours a year at the U.S. average residential rate of ${cents(US_RATE)}/kWh (${RATES_AS_OF}), about ${usd(usSave)} a year. In a hot, expensive place the savings are several times higher: ${usd(best.save)} a year in ${best.place === 'The Bahamas' ? 'the Bahamas' : best.place} at ${cents(best.rate)}/kWh and ${best.hours.toLocaleString()} hours.`,
    },
    {
      q: 'Is an 18 SEER air conditioner worth it?',
      a: `On electricity savings alone, usually not at average U.S. rates: a ${usd(PREMIUM)} premium takes about ${Math.round(usPayback)} years to pay back, longer than most systems last. It is worth it where you run the AC a lot and pay a high rate (roughly when cooling hours × rate in dollars is above 600 for a 3-ton system), or when you want the quieter operation and better humidity control of a variable-speed system.`,
    },
    {
      q: 'What is 16 SEER and 18 SEER in SEER2?',
      a: `For a ducted split system, 16 SEER is about ${(16 * SPLIT_FACTOR).toFixed(1)} SEER2 and 18 SEER is about ${(18 * SPLIT_FACTOR).toFixed(1)} SEER2. New equipment is labeled in SEER2, so compare SEER2 numbers on current quotes.`,
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
        <meta property="article:section" content="HVAC Education" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd({ path: PATH, headline: HEADLINE, description, datePublished: PUBLISHED, dateModified: UPDATED }))}
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
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">HVAC Education</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 9 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              The contractor's second quote is $1,000 to $2,500 higher. Here's how to tell whether you'll ever get it back.
            </p>
            <ArticleByline updated={UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              An 18 SEER air conditioner uses <strong>11% less electricity</strong> than a 16 SEER. For a 3-ton system
              running {US_HOURS.toLocaleString()} hours a year at the U.S. average rate of {cents(US_RATE)}/kWh, that's
              about <strong>{usd(usSave)} a year</strong>. If the 18 SEER costs {usd(PREMIUM)} more, it takes{' '}
              <strong>about {Math.round(usPayback)} years</strong> to pay back, longer than most systems last. In hot states
              like Florida and Texas it roughly breaks even over a system's life. It pays clearly only where the AC runs most
              of the year <em>and</em> power is expensive (Hawaii, the Caribbean), or if you're buying it for comfort rather
              than savings.
            </p>
          </div>

          <p className={p}>
            I run several stores in the Caribbean, where power costs more than 30¢/kWh and the AC runs most of the year.
            Every replacement quote comes with the same upsell: the higher-efficiency model, which "pays for itself." Sometimes
            it does. Often it doesn't. The difference is two numbers you already have: what you pay per kWh and how many hours
            your system runs. Here's the math, worked through for the 16 vs 18 decision.
          </p>

          <h2 className={h2}>The difference in one table</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}></th>
                  <th className={th}>16 SEER</th>
                  <th className={th}>18 SEER</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={`${td} font-medium`}>SEER2 equivalent (ducted split)</td><td className={td}>≈ {(16 * SPLIT_FACTOR).toFixed(1)} SEER2</td><td className={td}>≈ {(18 * SPLIT_FACTOR).toFixed(1)} SEER2</td></tr>
                <tr><td className={`${td} font-medium`}>Power draw, 3-ton</td><td className={td}>2.25 kW</td><td className={td}>2.00 kW</td></tr>
                <tr><td className={`${td} font-medium`}>Yearly cost, 3-ton, {US_HOURS.toLocaleString()} hrs, {cents(US_RATE)}</td><td className={td}>{usd(annualCost(TONS, 16, US_HOURS, US_RATE))}</td><td className={td}>{usd(annualCost(TONS, 18, US_HOURS, US_RATE))}</td></tr>
                <tr><td className={`${td} font-medium`}>Typical compressor</td><td className={td}>Single-stage or two-stage</td><td className={td}>Two-stage or variable-speed</td></tr>
                <tr><td className={`${td} font-medium`}>Typical installed price, 3-ton</td><td className={td}>About $4,500–$7,500</td><td className={td}>About $6,000–$10,000</td></tr>
                <tr><td className={`${td} font-medium`}>Extra cost of 18 over 16</td><td className={td} colSpan={2}>Usually {usd(PREMIUM_LOW)}–{usd(PREMIUM_HIGH)} for the same brand and size</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 italic mb-4">
            Prices are typical U.S. installed ranges from published 2026 cost surveys, not quotes. Your two quotes from the
            same installer are the only premium that matters.
          </p>

          <h2 className={h2}>The math</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4 font-mono text-sm text-gray-800">
            Power (kW) = tons × 12 ÷ SEER<br />
            kWh saved per year (16 → 18) = tons × hours ÷ 12<br />
            Money saved = kWh saved × your rate
          </div>
          <p className={p}>
            The middle line is a shortcut that only works for 16 vs 18: 12 × (1/16 − 1/18) happens to equal exactly 1/12.
            A 3-ton system running {US_HOURS.toLocaleString()} hours saves 3 × {US_HOURS.toLocaleString()} ÷ 12 ={' '}
            {kwhSaved.toLocaleString()} kWh a year. At {cents(US_RATE)}/kWh that's {usd(usSave)}.
          </p>
          <p className={p}>
            Then divide the price difference by the yearly saving to get the payback period, and compare it to how long
            you'll keep the system. Central AC typically lasts{' '}
            <Link to="/blog/how-long-do-air-conditioners-last" className={a}>15 to 20 years</Link>; I use {LIFE} below to
            stay conservative, and because many people move before then.
          </p>

          <h2 className={h2}>Where 18 SEER pays back, and where it doesn't</h2>
          <p className={p}>
            A 3-ton system, an 18 SEER premium of {usd(PREMIUM)}, local residential electricity rates and our estimate of
            typical cooling hours for each climate:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Location</th>
                  <th className={th}>Rate</th>
                  <th className={th}>Cooling hrs/yr</th>
                  <th className={th}>Saved per year</th>
                  <th className={th}>Payback</th>
                  <th className={th}>Net over {LIFE} yrs</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((s) => (
                  <tr key={s.place}>
                    <td className={td}><Link to={s.link} className={a}>{s.place}</Link></td>
                    <td className={td}>{cents(s.rate)}</td>
                    <td className={td}>{s.hours.toLocaleString()}</td>
                    <td className={td}>{usd(s.save)}</td>
                    <td className={`${td} ${s.payback <= LIFE ? 'text-teal-700 font-semibold' : ''}`}>{years(s.payback)}</td>
                    <td className={`${td} ${s.net >= 0 ? 'text-teal-700 font-semibold' : 'text-red-700'}`}>{s.net >= 0 ? '+' : '−'}{usd(Math.abs(s.net))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>
            Three groups stand out. Where the cooling season is moderate or short (Ohio, New York, the U.S. average), 18 SEER
            never earns back its premium on electricity. In hot states with ordinary rates (Florida, Texas, Arizona), long
            hours make up for cheap power, and in California high rates make up for a moderate season. There the upgrade
            roughly breaks even over 15 years: a small gain if the
            system lasts, a loss if you move. Only where the AC runs most of the year <em>and</em> power is expensive does it
            pay back in well under ten years and keep saving after that.
            {bahamas && (
              <> In the Bahamas it's better than the table shows: BPL charges more for every kWh above 800 a month, so the
              kWh an efficient AC saves come off the most expensive part of the bill (see the{' '}
              <Link to={`/ac-cost/${bahamas.slug}`} className={a}>Bahamas cost page</Link>).</>
            )}
          </p>

          <h3 className={h3}>A quick rule of thumb</h3>
          <p className={p}>
            For a 3-ton system, multiply your yearly cooling hours by your rate in dollars. If the result is{' '}
            <strong>above 600</strong>, a {usd(PREMIUM)} premium pays back within 10 years. 3,000 hours at 20¢ (= 600) just
            makes it; 1,500 hours at 18¢ (= 270) doesn't come close. For a different premium, scale the 600: a $1,000
            premium needs 400, a $2,500 premium needs 1,000.
          </p>

          <h2 className={h2}>Run your own numbers</h2>
          <PaybackEstimator />

          <h2 className={h2}>What the efficiency number doesn't tell you</h2>
          <p className={p}>
            The SEER difference is rarely the real reason to buy an 18. Getting from 16 to 18 usually means a different
            compressor, and that changes how the system behaves.
          </p>
          <h3 className={h3}>Comfort and humidity</h3>
          <p className={p}>
            Most 16 SEER systems are single-stage: the compressor is either fully on or off. Most 18 SEER systems are
            two-stage or variable-speed, so they run longer at lower output. Longer, gentler runs keep temperatures more even
            and pull more moisture out of the air. In a humid climate, a house at 76°F and 50% humidity feels cooler than one
            at 74°F and 60%, so some owners save by setting the thermostat higher. That saving doesn't show up in the SEER
            math above.
          </p>
          <h3 className={h3}>Noise</h3>
          <p className={p}>
            Running at low speed most of the time, a variable-speed outdoor unit is noticeably quieter. If the condenser sits
            under a bedroom window or near a patio, that matters more than {usd(usSave)} a year.
          </p>
          <h3 className={h3}>Repairs and parts</h3>
          <p className={p}>
            The variable-speed hardware that makes 18 SEER possible (an inverter drive and more control electronics) costs
            more to repair out of warranty, and parts can be brand-specific. Before choosing the 18, ask the installer what
            the parts and labor warranties cover, for how long, and whether registration is required. A long parts warranty
            takes most of the risk out of the more complex system.
          </p>
          <h3 className={h3}>Power quality</h3>
          <p className={p}>
            This is the one I learned the hard way. Where outages, brownouts and surges are common (island grids, rural lines,
            hurricane country), the control boards in any modern AC are exposed, and a variable-speed system has more
            electronics to lose. If you're buying the 18 in that kind of place, budget for surge and voltage protection on
            the outdoor unit too. See{' '}
            <Link to="/blog/protect-air-conditioner-power-surges-outages" className={a}>how to protect your AC from surges, brownouts and outages</Link>.
          </p>
          <h3 className={h3}>The installation matters more than the label</h3>
          <p className={p}>
            A rating is only reached when the system is sized correctly, charged correctly and connected to ducts that move
            enough air. A well-installed 16 will beat a badly installed 18. Ask for a load calculation (Manual J) rather than
            a size matched to the old unit, and check the size yourself with our{' '}
            <Link to="/calculators/ac-sizing" className={a}>AC sizing calculator</Link>.
          </p>

          <h2 className={h2}>Check the actual ratings on your quotes</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>
              <strong>Compare SEER2, not SEER.</strong> Equipment made since 2023 is rated in SEER2, which runs about 5% lower
              for ducted systems. A quote listing "16 SEER" for new equipment may be using the old scale. Convert with our{' '}
              <Link to="/calculators/seer-to-seer2" className={a}>SEER to SEER2 converter</Link>, and read{' '}
              <Link to="/blog/seer-vs-seer2-explained" className={a}>SEER vs SEER2 explained</Link>.
            </li>
            <li>
              <strong>The rating belongs to the matched system.</strong> An outdoor unit's rating depends on the indoor coil
              or air handler and sometimes the thermostat it's paired with. Look up the exact combination on your quote in the{' '}
              <a href="https://www.ahridirectory.org/" target="_blank" rel="noopener noreferrer" className={a}>AHRI Directory</a>.
              If the match isn't listed, the rating isn't guaranteed.
            </li>
            <li>
              <strong>In hot climates, look at EER2 too.</strong> SEER2 is a seasonal average. EER2 measures efficiency at
              95°F outdoors, which is closer to a hot afternoon. Two systems with the same SEER2 can differ on EER2, and in
              Arizona or the Caribbean the higher EER2 is the one that saves money.
            </li>
            <li>
              <strong>Rebates are by SEER2 and EER2 tier.</strong> The federal 25C tax credit for central AC ended on December 31,
              2025, but many utilities still pay rebates for higher-efficiency equipment. A rebate comes straight off the
              premium and can change the answer. See{' '}
              <Link to="/blog/hvac-tax-credits-rebates-2026" className={a}>HVAC tax credits and rebates in 2026</Link>.
            </li>
          </ul>

          <h2 className={h2}>Which one to buy</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Choose 16 SEER if</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>Your cooling season is short or moderate</li>
                <li>Your rate is near or below the U.S. average</li>
                <li>You expect to move within 10 years</li>
                <li>The premium is over $2,000 and no rebate applies</li>
                <li>You'd rather have a simpler system that's cheaper to fix</li>
              </ul>
            </div>
            <div className="rounded-lg border border-teal-200 bg-teal-50/40 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Choose 18 SEER if</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>Hours × rate (in dollars) is above 600 for a 3-ton system</li>
                <li>You live somewhere humid and want better moisture control</li>
                <li>The outdoor unit is close to where you sleep or sit</li>
                <li>A utility rebate covers much of the premium</li>
                <li>You plan to stay 15 years or more</li>
              </ul>
            </div>
          </div>
          <p className={p}>
            Comparing other steps? See <Link to="/blog/14-vs-16-seer" className={a}>14 vs 16 SEER</Link> for the step up from
            the minimum, the <Link to="/blog/seer-rating-chart" className={a}>SEER rating chart</Link> for every
            rating from 8 to 25, and <Link to="/blog/choosing-the-right-seer-rating" className={a}>choosing the right SEER rating</Link>{' '}
            for the bigger picture.
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

          <h2 className={h2}>Sources and method</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 mb-8">
            <li>
              U.S. electricity rates: <a href={RATES_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">U.S. Energy Information Administration, Electric Power Monthly, Table 5.6.A</a> (average residential price, {RATES_AS_OF}). Caribbean rates as listed on each <Link to="/ac-cost/caribbean" className="text-teal-700 hover:underline">country page</Link>.
            </li>
            <li>Cooling hours by climate are our estimate of typical full-load hours, the same figures used on the state cost pages.</li>
            <li>
              Installed price ranges and the 16-to-18 premium: published 2026 cost surveys (PickHVAC, HVACProjectCost). They vary
              widely by region, brand and installer.
            </li>
            <li>SEER to SEER2: × {SPLIT_FACTOR} for ducted split systems, per our <Link to="/calculators/seer-to-seer2" className="text-teal-700 hover:underline">converter</Link>.</li>
            <li>
              SEER describes average seasonal efficiency. Real savings vary with installation, ductwork, thermostat settings
              and weather; savings are at today's rates and don't assume electricity prices rise.
            </li>
          </ul>

          <div className="rounded-lg bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Compare your current system</h3>
            <p className="text-gray-700 mb-4">
              Replacing an older unit? Enter its SEER, size, hours and your electricity rate to see what a 16 or an 18 would save
              over what you have now.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
              <Calculator className="w-5 h-5" />
              Open the SEER savings calculator
            </Link>
          </div>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
