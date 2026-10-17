import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import { VerdictBadge, HowWeJudge, KeepYearsField, PaybackResults } from '../components/PaybackVerdict';
import { SYSTEM_LIFE, GOOD_MAX, MARGINAL_MAX, hoursRateThreshold, verdict } from '../data/payback';
import LeadMagnet from '../components/LeadMagnet';
import { articleJsonLd, SITE_URL } from '../data/site';
import { STATES, US_RATE, RATES_AS_OF, RATES_SOURCE_URL, annualCost, usd, cents } from '../data/acCost';
import { COUNTRIES } from '../data/caribbean';
import { SEER2_FACTOR } from '../data/seer2';

const PATH = '/blog/14-vs-16-seer';
const TITLE = '14 vs 16 SEER: Is the Upgrade Worth It? (Payback Math)';
const HEADLINE = '14 vs 16 SEER: Is the Upgrade Worth the Extra Cost? (2026 Payback Math)';
const PUBLISHED = '2026-10-14';
const UPDATED = '2026-10-17';

/** Assumptions used throughout (stated in the article). */
const TONS = 3;
const US_HOURS = 1500;
const PREMIUM = 800; // typical extra installed cost of a 16 SEER over a 14 SEER, 3-ton
const PREMIUM_LOW = 300;
const PREMIUM_HIGH = 1500;
const LIFE = SYSTEM_LIFE;
/** kWh saved per running hour, 3-ton: North 14 → 16, South 15 → 16. */
const KWH_NORTH = TONS * 12 * (1 / 14 - 1 / 16);
const KWH_SOUTH = TONS * 12 * (1 / 15 - 1 / 16);
const GOOD_NORTH = hoursRateThreshold(PREMIUM, KWH_NORTH, GOOD_MAX);
const MARGINAL_NORTH = hoursRateThreshold(PREMIUM, KWH_NORTH, MARGINAL_MAX);
const GOOD_SOUTH = hoursRateThreshold(PREMIUM, KWH_SOUTH, GOOD_MAX);
const MARGINAL_SOUTH = hoursRateThreshold(PREMIUM, KWH_SOUTH, MARGINAL_MAX);
/** SEER → SEER2 for ducted split systems (same factor as our converter). */
const SPLIT_FACTOR = SEER2_FACTOR;
/** Cheapest SEER that can be installed new in the Southeast/Southwest (14.3 SEER2). */
const SOUTH_BASE = 15;
/** States where the 14.3 SEER2 minimum applies (DOE Southeast + Southwest regions). */
const SOUTH = new Set(['AL', 'AR', 'AZ', 'CA', 'DC', 'DE', 'FL', 'GA', 'HI', 'KY', 'LA', 'MD', 'MS', 'NC', 'NM', 'NV', 'OK', 'SC', 'TN', 'TX', 'VA']);

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const h3 = 'text-lg font-bold text-gray-900 mt-6 mb-2';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

/** Yearly savings of SEER 16 over the base SEER. */
const savings = (base: number, tons: number, hours: number, rate: number) =>
  annualCost(tons, base, hours, rate) - annualCost(tons, 16, hours, rate);

const years = (n: number) => (n > 40 ? 'over 40 years' : `${n.toFixed(1)} years`);

function PaybackEstimator() {
  const [base, setBase] = useState(14);
  const [tons, setTons] = useState(3);
  const [rateC, setRateC] = useState(+(US_RATE * 100).toFixed(2));
  const [hours, setHours] = useState(US_HOURS);
  const [premium, setPremium] = useState(PREMIUM);
  const [keep, setKeep] = useState(LIFE);

  const yearly = savings(base, tons, hours, rateC / 100);
  const input = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500';
  const label = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <div className="rounded-lg border border-teal-200 bg-teal-50/50 p-5 mb-6">
      <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-3">Your numbers</p>
      <div className="mb-4">
        <span className={label}>Where you live</span>
        <div className="flex flex-wrap gap-2">
          {[
            { v: 14, t: 'North (cheapest unit ≈ 14 SEER)' },
            { v: SOUTH_BASE, t: 'Southeast / Southwest (≈ 15 SEER)' },
          ].map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => setBase(o.v)}
              aria-pressed={base === o.v}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                base === o.v ? 'bg-[#17204d] text-white border-[#17204d]' : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400'
              }`}
            >
              {o.t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
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
          <label htmlFor="pb-prem" className={label}>Extra cost of 16 ($)</label>
          <input id="pb-prem" type="number" min={0} step={100} className={input} value={premium}
            onChange={(e) => setPremium(Math.max(0, Number(e.target.value)))} />
        </div>
        <KeepYearsField id="pb-keep" value={keep} onChange={setKeep} className={input} labelClass={label} />
      </div>
      <PaybackResults yearly={yearly} premium={premium} keep={keep} money={(n) => usd(n)} />
      <p className="text-xs text-gray-500 mt-3">
        Electricity savings only, at today's rate. Your rate is on your bill; the extra cost is the difference between two
        quotes for the same size system from the same installer.
      </p>
    </div>
  );
}

export default function BlogArticle14vs16Seer() {
  const usSave = savings(14, TONS, US_HOURS, US_RATE);
  const usPayback = PREMIUM / usSave;
  const kwhSaved = TONS * US_HOURS * 3 / 28;

  const byName = (n: string) => STATES.find((s) => s.name === n)!;
  const bahamas = COUNTRIES.find((c) => c.slug === 'bahamas');

  const scenarios = [
    { place: 'U.S. average', link: '/ac-cost', rate: US_RATE, hours: US_HOURS, base: 14 },
    ...['Ohio', 'Illinois', 'New York', 'Michigan', 'California', 'Florida', 'Texas', 'Arizona', 'Hawaii'].map((n) => {
      const s = byName(n);
      return { place: s.name, link: `/ac-cost/${s.slug}`, rate: s.rate, hours: s.hours, base: SOUTH.has(s.abbr) ? SOUTH_BASE : 14 };
    }),
    ...(bahamas ? [{ place: 'The Bahamas', link: `/ac-cost/${bahamas.slug}`, rate: bahamas.usdRate, hours: bahamas.hours, base: 14 }] : []),
  ].map((s) => {
    const save = savings(s.base, TONS, s.hours, s.rate);
    return { ...s, save, payback: PREMIUM / save, net: save * LIFE - PREMIUM };
  });

  const hot = scenarios.filter((s) => ['Florida', 'Texas', 'Arizona'].includes(s.place)).map((s) => s.payback);
  const hotRange = `${Math.floor(Math.min(...hot))}–${Math.ceil(Math.max(...hot))}`;
  const hi = scenarios.find((s) => s.place === 'Hawaii')!;
  const usVerdict = verdict(usPayback);
  const description = `A 16 SEER AC uses 12.5% less electricity than a 14 SEER. For a 3-ton system at the U.S. average ${cents(US_RATE)}/kWh that saves about ${usd(usSave)} a year, so an ${usd(PREMIUM)} upgrade pays back in about ${Math.round(usPayback)} years. Where it pays, and what changes in the South.`;

  const faqs = [
    {
      q: 'How much more efficient is 16 SEER than 14 SEER?',
      a: 'A 16 SEER system uses 12.5% less electricity than a 14 SEER system for the same cooling (1 − 14 ÷ 16 = 0.125). A 3-ton system draws about 2.57 kW at SEER 14 and 2.25 kW at SEER 16, so it saves about 0.32 kWh for every hour it runs.',
    },
    {
      q: 'How much does 16 SEER save per year compared to 14 SEER?',
      a: `For a 3-ton system running ${US_HOURS.toLocaleString()} hours a year at the U.S. average residential rate of ${cents(US_RATE)}/kWh (${RATES_AS_OF}), about ${usd(usSave)} a year. In a hot, expensive place it is far more: about ${usd(scenarios.find((s) => s.place === 'The Bahamas')?.save ?? hi.save)} a year in the Bahamas.`,
    },
    {
      q: 'Is a 16 SEER air conditioner worth it over a 14 SEER?',
      a: `It depends on where you live. At average U.S. rates and hours, a ${usd(PREMIUM)} premium pays back in about ${Math.round(usPayback)} years, which we count as "${usVerdict.label.toLowerCase()}". ${usVerdict.note} In the Southeast and Southwest the cheapest new unit is already about 15 SEER, so the step to 16 saves less and takes ${hotRange} years in Florida, Texas and Arizona. It's a good deal where power is expensive: about ${Math.round(hi.payback)} years in Hawaii.`,
    },
    {
      q: 'Can you still buy a 14 SEER air conditioner?',
      a: 'Only in northern states. Since January 2023, new central air conditioners must reach 13.4 SEER2 (about 14 SEER) in the North and 14.3 SEER2 (about 15 SEER) in the Southeast and Southwest. A "14 SEER" unit today is the minimum-efficiency model, and it cannot be installed new in southern states.',
    },
    {
      q: 'What is 14 SEER and 16 SEER in SEER2?',
      a: `For a ducted split system, 14 SEER converts to about ${(14 * SPLIT_FACTOR).toFixed(1)} SEER2, and the minimum-efficiency units sold today as "14 SEER" are rated 13.4 SEER2. 16 SEER is about ${(16 * SPLIT_FACTOR).toFixed(1)} SEER2. That puts a 16 SEER right at the ENERGY STAR threshold of 15.2 SEER2, which many utility rebates require.`,
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
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              The minimum-efficiency unit or the step up? For most buyers this is the upgrade that actually pays.
            </p>
            <ArticleByline updated={UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              A 16 SEER air conditioner uses <strong>12.5% less electricity</strong> than a 14 SEER. For a 3-ton system
              running {US_HOURS.toLocaleString()} hours a year at the U.S. average rate of {cents(US_RATE)}/kWh, that's
              about <strong>{usd(usSave)} a year</strong>. If the 16 costs {usd(PREMIUM)} more, it pays back in{' '}
              <strong>about {Math.round(usPayback)} years</strong>: {usVerdict.id === 'good' ? 'a good deal' : usVerdict.id === 'marginal' ? 'marginal, worth it if you\'ll keep the system well past that' : 'not worth it for savings alone'}.
              That's better than the <Link to="/blog/16-vs-18-seer" className={a}>16 vs 18 upgrade</Link>, which rarely pays
              back at all. In the Southeast and Southwest, the cheapest unit you can legally install is already about 15
              SEER, so the step to 16 is smaller and takes {hotRange} years in Florida, Texas and Arizona. It's a clear good
              deal only where power is expensive, like Hawaii and the Caribbean.
            </p>
          </div>

          <p className={p}>
            I've bought a lot of air conditioners for my stores, and the cheapest unit on the quote is always tempting. It's
            also the one that costs the most to run for the next fifteen years. Whether the step up is worth it comes down
            to two numbers you already have: what you pay per kWh and how many hours your system runs. Here's the math for
            the 14 vs 16 decision.
          </p>

          <h2 className={h2}>First: "14 SEER" now means the minimum</h2>
          <p className={p}>
            Since January 2023, new central air conditioners are rated in SEER2 and must meet regional minimums: 13.4 SEER2
            (about 14 SEER) in northern states and 14.3 SEER2 (about 15 SEER) in the Southeast and Southwest. So in 2026 a
            "14 SEER" quote is the base model, and it can only be installed new in the North. In southern states the
            cheapest option is about 15 SEER, and that's the real comparison there. Our{' '}
            <Link to="/calculators/seer-to-seer2" className={a}>SEER to SEER2 converter</Link> lists which states are in
            which region.
          </p>
          <p className={p}>
            The other useful fact: 16 SEER is about {(16 * SPLIT_FACTOR).toFixed(1)} SEER2, right at the ENERGY STAR
            minimum of 15.2 SEER2 for split systems. That line matters because many utility rebates start there.
          </p>

          <h2 className={h2}>The difference in one table</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}></th>
                  <th className={th}>14 SEER</th>
                  <th className={th}>16 SEER</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={`${td} font-medium`}>SEER2 equivalent (ducted split)</td><td className={td}>≈ 13.4 SEER2 (the northern minimum)</td><td className={td}>≈ {(16 * SPLIT_FACTOR).toFixed(1)} SEER2 (ENERGY STAR level)</td></tr>
                <tr><td className={`${td} font-medium`}>Power draw, 3-ton</td><td className={td}>2.57 kW</td><td className={td}>2.25 kW</td></tr>
                <tr><td className={`${td} font-medium`}>Yearly cost, 3-ton, {US_HOURS.toLocaleString()} hrs, {cents(US_RATE)}</td><td className={td}>{usd(annualCost(TONS, 14, US_HOURS, US_RATE))}</td><td className={td}>{usd(annualCost(TONS, 16, US_HOURS, US_RATE))}</td></tr>
                <tr><td className={`${td} font-medium`}>Typical compressor</td><td className={td}>Single-stage</td><td className={td}>Single-stage or two-stage</td></tr>
                <tr><td className={`${td} font-medium`}>Extra cost of 16 over 14</td><td className={td} colSpan={2}>Usually {usd(PREMIUM_LOW)}–{usd(PREMIUM_HIGH)} for the same brand and size; the top of the range is for two-stage models</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 italic mb-4">
            The premium range is from published 2025–2026 cost guides, not quotes. Your two quotes from the same installer
            are the only premium that matters.
          </p>

          <h2 className={h2}>The math</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4 font-mono text-sm text-gray-800">
            Power (kW) = tons × 12 ÷ SEER<br />
            kWh saved per year (14 → 16) = tons × hours × 3 ÷ 28<br />
            Money saved = kWh saved × your rate
          </div>
          <p className={p}>
            The middle line is the shortcut for this step: 12 × (1/14 − 1/16) works out to 3/28, about 0.107 kWh per ton
            per hour. A 3-ton system running {US_HOURS.toLocaleString()} hours saves about{' '}
            {Math.round(kwhSaved).toLocaleString()} kWh a year. At {cents(US_RATE)}/kWh that's {usd(usSave)}.
          </p>
          <p className={p}>
            For the southern comparison (15 vs 16) the saving per ton-hour is less than half that: 12 × (1/15 − 1/16) =
            0.05 kWh. Then divide the price difference by the yearly saving to get the payback period, and compare it to
            how long you'll keep the system. Central AC typically lasts{' '}
            <Link to="/blog/how-long-do-air-conditioners-last" className={a}>15 to 20 years</Link>; I use {LIFE} below to
            stay conservative.
          </p>

          <h2 className={h2}>Where 16 SEER pays back</h2>
          <HowWeJudge />
          <p className={p}>
            A 3-ton system, a 16 SEER premium of {usd(PREMIUM)}, local residential electricity rates and our estimate of
            typical cooling hours for each climate. Northern states compare against a 14 SEER; southern states against the
            15 SEER that's the cheapest option there.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Location</th>
                  <th className={th}>Compared with</th>
                  <th className={th}>Rate</th>
                  <th className={th}>Cooling hrs/yr</th>
                  <th className={th}>Saved per year</th>
                  <th className={th}>Payback</th>
                  <th className={th}>Verdict</th>
                  <th className={th}>Net over {LIFE} yrs, if it lasts</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((s) => (
                  <tr key={s.place}>
                    <td className={td}><Link to={s.link} className={a}>{s.place}</Link></td>
                    <td className={td}>{s.base} SEER</td>
                    <td className={td}>{cents(s.rate)}</td>
                    <td className={td}>{s.hours.toLocaleString()}</td>
                    <td className={td}>{usd(s.save)}</td>
                    <td className={td}>{years(s.payback)}</td>
                    <td className={td}><VerdictBadge payback={s.payback} /></td>
                    <td className={`${td} ${s.net >= 0 ? 'text-teal-700 font-semibold' : 'text-red-700'}`}>{s.net >= 0 ? '+' : '−'}{usd(Math.abs(s.net))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>
            In most of the U.S. this upgrade is marginal. In the North a 16 pays back in about 8–10 years where the summer
            is moderate, and about 12 where it's short, like Michigan: worth it if you'll keep the system for its full life,
            not if you might move. In the South hot states run the AC twice as long, but because the comparison is 15 vs
            16, the 16 still takes {hotRange} years in Florida, Texas and Arizona. Where power is expensive and the AC runs
            most of the year (Hawaii, the Caribbean), it's a good deal, paying back in a few years.
            {bahamas && (
              <> In the Bahamas it's better than the table shows: BPL charges more for every kWh above 800 a month, so the
              kWh an efficient AC saves come off the most expensive part of the bill (see the{' '}
              <Link to={`/ac-cost/${bahamas.slug}`} className={a}>Bahamas cost page</Link>).</>
            )}
          </p>

          <h3 className={h3}>A quick rule of thumb</h3>
          <p className={p}>
            For a 3-ton system, multiply your yearly cooling hours by your rate in dollars. In the North (14 vs 16), if
            the result is <strong>above {GOOD_NORTH.toLocaleString()}</strong>, an {usd(PREMIUM)} premium pays back within{' '}
            {GOOD_MAX} years: a good deal. Between {MARGINAL_NORTH.toLocaleString()} and {GOOD_NORTH.toLocaleString()} it's
            marginal. The U.S. average, 1,500 hours at 18.3¢ (= 275), lands in the marginal band. In the South (15 vs 16)
            the good-deal bar is about <strong>{GOOD_SOUTH.toLocaleString()}</strong> and the marginal band starts at{' '}
            {MARGINAL_SOUTH.toLocaleString()}: 3,000 hours at 15¢ (= 450) is marginal. For a $500 premium, the good-deal bar
            drops to {hoursRateThreshold(500, KWH_NORTH, GOOD_MAX).toLocaleString()} in the North and{' '}
            {hoursRateThreshold(500, KWH_SOUTH, GOOD_MAX).toLocaleString()} in the South.
          </p>

          <h2 className={h2}>Run your own numbers</h2>
          <PaybackEstimator />

          <h2 className={h2}>What else changes between a 14 and a 16</h2>
          <h3 className={h3}>Comfort: often nothing</h3>
          <p className={p}>
            Many 16 SEER systems use the same single-stage compressor design as a 14, just with larger coils and a more
            efficient fan. They run the same way, on or off, so don't expect better humidity control or quieter running
            unless the 16 is a two-stage model. Ask which one you're being quoted; a two-stage 16 costs more, but it runs
            longer at low output, which evens out temperatures and pulls more moisture from the air. If comfort is what
            you're after, see <Link to="/blog/16-vs-18-seer" className={a}>16 vs 18 SEER</Link>, where variable-speed
            systems come in.
          </p>
          <h3 className={h3}>Repairs</h3>
          <p className={p}>
            A single-stage 16 is no harder to fix than a 14. That's the quiet advantage of this step: you get most of the
            efficiency gain without the inverter electronics and brand-specific parts of an 18 SEER system. On grids with
            frequent outages and brownouts, that matters. Simpler controls have less to lose. See{' '}
            <Link to="/blog/protect-air-conditioner-power-surges-outages" className={a}>how to protect your AC from surges, brownouts and outages</Link>.
          </p>
          <h3 className={h3}>Rebates</h3>
          <p className={p}>
            The federal 25C tax credit for central AC ended on December 31, 2025, but many utilities still pay rebates for
            ENERGY STAR equipment. A 16 SEER at 15.2 SEER2 or above usually qualifies; a 14 never does. A rebate of a few
            hundred dollars can take a big share out of the premium. See <Link to="/blog/hvac-tax-credits-rebates-2026" className={a}>HVAC tax credits and rebates in 2026</Link>.
          </p>
          <h3 className={h3}>Replacing a working 14? Don't, for efficiency alone</h3>
          <p className={p}>
            If your current system is a 14 SEER and runs fine, replacing it with a 16 to save {usd(usSave)} a year makes no
            sense against the cost of a whole new system. This comparison is for when you're buying anyway. If your system
            is SEER 10 or older, the picture is very different; run it through the{' '}
            <Link to="/calculators/repair-vs-replace" className={a}>repair vs replace calculator</Link>.
          </p>

          <h2 className={h2}>Check the actual ratings on your quotes</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>
              <strong>Compare SEER2, not SEER.</strong> Equipment made since 2023 is rated in SEER2. A unit sold as "16 SEER"
              might be 15.0 or 15.2 SEER2, and only the second reaches ENERGY STAR. Convert with our{' '}
              <Link to="/calculators/seer-to-seer2" className={a}>SEER to SEER2 converter</Link>.
            </li>
            <li>
              <strong>The rating belongs to the matched system.</strong> The outdoor unit's rating depends on the indoor
              coil or air handler it's paired with. Look up the exact combination on your quote in the{' '}
              <a href="https://www.ahridirectory.org/" target="_blank" rel="noopener noreferrer" className={a}>AHRI Directory</a>.
            </li>
            <li>
              <strong>Southwest buyers need EER2 too.</strong> Arizona, California, Nevada and New Mexico also have a minimum
              EER2 (efficiency at 95°F), and on hot afternoons that number tells you more than SEER2 does.
            </li>
            <li>
              <strong>Get the size right first.</strong> An oversized 16 wastes more than a correctly sized 14 saves. Ask
              for a load calculation and check it with the <Link to="/calculators/ac-sizing" className={a}>AC sizing calculator</Link>.
            </li>
          </ul>

          <h2 className={h2}>Which one to buy</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Choose 14 SEER (or the base 15) if</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>Your cooling season is short (under about 900 hours)</li>
                <li>You expect to move within about 10 years</li>
                <li>The 16 costs more than $1,200 extra and no rebate applies</li>
                <li>It's a rental or a house you're about to sell</li>
              </ul>
            </div>
            <div className="rounded-lg border border-teal-200 bg-teal-50/40 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Choose 16 SEER if</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>Hours × rate (in dollars) is above {GOOD_NORTH.toLocaleString()} in the North, {GOOD_SOUTH.toLocaleString()} in the South</li>
                <li>A utility rebate requires ENERGY STAR</li>
                <li>The premium is under $1,000 for a single-stage 16</li>
                <li>You plan to stay 10 years or more</li>
                <li>Power is expensive where you live</li>
              </ul>
            </div>
          </div>
          <p className={p}>
            Thinking about going higher? See <Link to="/blog/16-vs-18-seer" className={a}>16 vs 18 SEER</Link> for the next
            step, <Link to="/blog/18-vs-20-seer" className={a}>18 vs 20 SEER</Link> for the top tier, the <Link to="/blog/seer-rating-chart" className={a}>SEER rating chart</Link> for every rating from 8 to
            25, and <Link to="/blog/choosing-the-right-seer-rating" className={a}>choosing the right SEER rating</Link>{' '}
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
              14-to-16 premium: PickHVAC cost guides (June 2025 and May 2026), which put it at $300–$800 for a single-stage
              16 and up to $1,500 for some models. It varies widely by region, brand and installer.
            </li>
            <li>
              Regional minimums (13.4 SEER2 North, 14.3 SEER2 Southeast and Southwest) and the ENERGY STAR level (15.2
              SEER2): U.S. Department of Energy and ENERGY STAR. SEER to SEER2: × {SPLIT_FACTOR} for ducted split systems, per
              our <Link to="/calculators/seer-to-seer2" className="text-teal-700 hover:underline">converter</Link>.
            </li>
            <li>
              SEER describes average seasonal efficiency. Real savings vary with installation, ductwork, thermostat settings
              and weather; savings are at today's rates and don't assume electricity prices rise.
            </li>
          </ul>

          <div className="rounded-lg bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Compare your current system</h3>
            <p className="text-gray-700 mb-4">
              Replacing an older unit? Enter its SEER, size, hours and your electricity rate to see what a 14 or a 16 would
              save over what you have now.
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
