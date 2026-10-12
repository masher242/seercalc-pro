import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import { articleJsonLd, SITE_URL } from '../data/site';
import { US_RATE, RATES_AS_OF, RATES_SOURCE_URL, annualCost, kw, usd, cents } from '../data/acCost';
import {
  TONS, US_HOURS, LIFE, SPLIT_FACTOR, savings, seer2, pctLess, buildScenarios,
  ScenarioTable, PaybackEstimator, ComparisonSeries,
} from '../components/SeerComparison';

const PATH = '/blog/18-vs-20-seer';
const TITLE = '18 vs 20 SEER: Is the Upgrade Worth It? (Payback Math)';
const HEADLINE = '18 vs 20 SEER: Is the Top-Tier Upgrade Worth It? (2026 Payback Math)';
const PUBLISHED = '2026-10-12';
const UPDATED = '2026-10-12';
const LOW = 18;
const HIGH = 20;
const PREMIUM = 2000;
const PREMIUM_LOW = 1500;
const PREMIUM_HIGH = 3000;

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const h3 = 'text-lg font-bold text-gray-900 mt-6 mb-2';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

/** kWh saved per running hour, 3-ton, for each 2-point step. */
const STEPS = [
  [14, 16],
  [16, 18],
  [18, 20],
] as const;

export default function BlogArticle18vs20Seer() {
  const pct = pctLess(LOW, HIGH);
  const usSave = savings(LOW, HIGH, TONS, US_HOURS, US_RATE);
  const usPayback = PREMIUM / usSave;
  const kwhPerHour = kw(TONS, LOW) - kw(TONS, HIGH);
  const scenarios = buildScenarios(LOW, HIGH, PREMIUM);
  const paying = scenarios.filter((s) => s.payback <= LIFE);
  const best = [...scenarios].sort((x, y) => y.save - x.save)[0];

  const description = `A 20 SEER AC uses ${pct}% less electricity than an 18 SEER. For a 3-ton system at the U.S. average ${cents(US_RATE)}/kWh that's about ${usd(usSave)} a year, so a ${usd(PREMIUM)} upgrade takes ${Math.round(usPayback)} years to pay back. Where top-tier efficiency pays, and where it never will.`;

  const faqs = [
    {
      q: 'How much more efficient is 20 SEER than 18 SEER?',
      a: `A 20 SEER system uses ${pct}% less electricity than an 18 SEER system for the same cooling (1 − 18 ÷ 20 = 0.10). A 3-ton system draws about ${kw(3, 18).toFixed(2)} kW at SEER 18 and ${kw(3, 20).toFixed(2)} kW at SEER 20, saving ${kwhPerHour.toFixed(2)} kWh for every hour it runs.`,
    },
    {
      q: 'How much does 20 SEER save per year compared to 18 SEER?',
      a: `For a 3-ton system running ${US_HOURS.toLocaleString()} hours a year at the U.S. average residential rate of ${cents(US_RATE)}/kWh (${RATES_AS_OF}), about ${usd(usSave)} a year. The most it saves among the places we checked is about ${usd(best.save)} a year, in ${best.inName}.`,
    },
    {
      q: 'Is a 20 SEER air conditioner worth it?',
      a: `Rarely, on electricity savings alone. At average U.S. conditions a ${usd(PREMIUM)} premium over an 18 SEER takes about ${Math.round(usPayback)} years to pay back. It can pay where the AC runs most of the year and power is very expensive (Hawaii, parts of the Caribbean), or when a rebate covers most of the difference.`,
    },
    {
      q: 'What is 18 SEER and 20 SEER in SEER2?',
      a: `For a ducted split system, 18 SEER is about ${seer2(18)} SEER2 and 20 SEER is about ${seer2(20)} SEER2. New equipment is labeled in SEER2, so compare SEER2 numbers on current quotes.`,
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
              Each step up the SEER ladder costs more and saves less. At the top, the math gets hard to make work.
            </p>
            <ArticleByline updated={UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              A 20 SEER air conditioner uses <strong>{pct}% less electricity</strong> than an 18 SEER. For a 3-ton system
              running {US_HOURS.toLocaleString()} hours a year at the U.S. average rate of {cents(US_RATE)}/kWh, that's only
              about <strong>{usd(usSave)} a year</strong>. The 20 typically costs {usd(PREMIUM_LOW)}–{usd(PREMIUM_HIGH)} more,
              so a {usd(PREMIUM)} premium takes <strong>about {Math.round(usPayback)} years</strong> to pay back, more than
              twice the life of the system. Of the {scenarios.length} places we checked, it pays back within {LIFE} years
              only in {paying.length === 0 ? 'none' : paying.map((s) => s.inName).join(' and ')}. Buy a 20 for a
              rebate, a better warranty or very expensive power, not for average savings.
            </p>
          </div>

          <p className={p}>
            In the Caribbean, where I run several stores, power costs about 31¢/kWh and the AC runs most of the year. If
            top-tier efficiency pays anywhere, it should pay here. Even so, the step from 18 to 20 is a close call, and in
            most of the U.S. it isn't close at all. The reason is simple arithmetic.
          </p>

          <h2 className={h2}>Why each step saves less</h2>
          <p className={p}>
            SEER is a ratio of cooling to electricity, so the electricity you use is proportional to 1 ÷ SEER. Each extra
            point of SEER cuts a smaller slice off a smaller number. For a 3-ton system, every hour it runs:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Upgrade</th>
                  <th className={th}>kWh saved per running hour</th>
                  <th className={th}>Per year ({US_HOURS.toLocaleString()} hrs, {cents(US_RATE)})</th>
                  <th className={th}>Typical extra cost</th>
                </tr>
              </thead>
              <tbody>
                {STEPS.map(([lo, hi]) => (
                  <tr key={lo}>
                    <td className={`${td} font-medium`}>
                      {hi === HIGH ? `${lo} → ${hi} SEER` : <Link to={`/blog/${lo}-vs-${hi}-seer`} className={a}>{lo} → {hi} SEER</Link>}
                    </td>
                    <td className={td}>{(kw(TONS, lo) - kw(TONS, hi)).toFixed(2)} kWh</td>
                    <td className={td}>{usd(savings(lo, hi, TONS, US_HOURS, US_RATE))}</td>
                    <td className={td}>{lo === 14 ? '$700–$1,200' : lo === 16 ? '$1,000–$2,500' : `${usd(PREMIUM_LOW)}–${usd(PREMIUM_HIGH)}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>
            Going from 18 to 20 saves less than two-thirds of what 14 to 16 does, and usually costs about twice as much.
            That's the whole story of high-efficiency air conditioning: the first upgrades are cheap and productive; the
            last ones are expensive and marginal.
          </p>

          <h2 className={h2}>The difference in one table</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}></th>
                  <th className={th}>18 SEER</th>
                  <th className={th}>20 SEER</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={`${td} font-medium`}>SEER2 equivalent (ducted split)</td><td className={td}>≈ {seer2(18)} SEER2</td><td className={td}>≈ {seer2(20)} SEER2</td></tr>
                <tr><td className={`${td} font-medium`}>Power draw, 3-ton</td><td className={td}>{kw(3, 18).toFixed(2)} kW</td><td className={td}>{kw(3, 20).toFixed(2)} kW</td></tr>
                <tr><td className={`${td} font-medium`}>Yearly cost, 3-ton, {US_HOURS.toLocaleString()} hrs, {cents(US_RATE)}</td><td className={td}>{usd(annualCost(TONS, 18, US_HOURS, US_RATE))}</td><td className={td}>{usd(annualCost(TONS, 20, US_HOURS, US_RATE))}</td></tr>
                <tr><td className={`${td} font-medium`}>Typical compressor</td><td className={td}>Two-stage or variable-speed</td><td className={td}>Variable-speed (inverter)</td></tr>
                <tr><td className={`${td} font-medium`}>Typical installed price, 3-ton</td><td className={td}>About $6,000–$10,000</td><td className={td}>About $8,500–$14,000</td></tr>
                <tr><td className={`${td} font-medium`}>Extra cost of 20 over 18</td><td className={td} colSpan={2}>Usually {usd(PREMIUM_LOW)}–{usd(PREMIUM_HIGH)} for the same brand and size</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 italic mb-4">
            Prices are typical U.S. installed ranges from a published 2026 cost survey; the 18-to-20 premium is our estimate
            from those ranges. Your two quotes from the same installer are the only premium that matters.
          </p>

          <h2 className={h2}>Payback by location</h2>
          <p className={p}>
            A 3-ton system, a {usd(PREMIUM)} premium for the 20, local residential electricity rates and our estimate of
            typical cooling hours for each climate. Each hour of running saves {kwhPerHour.toFixed(2)} kWh (the shortcut:
            kWh saved per year = tons × hours ÷ 15).
          </p>
          <ScenarioTable rows={scenarios} />
          <p className={p}>
            Even hot states with ordinary rates, like Florida and Texas, take two decades to recover the premium. It takes
            very expensive power and a long cooling season together, as in Hawaii, for a 20 to pay for itself on
            electricity. In the Bahamas it pays back in about{' '}
            {Math.round(scenarios.find((s) => s.place === 'The Bahamas')?.payback ?? 0)} years at the average rate, inside the
            life of the system but not by much. The tiered bill helps: BPL charges more for every kWh above 800 a month, and
            that's where AC savings land.
          </p>

          <h3 className={h3}>A quick rule of thumb</h3>
          <p className={p}>
            For a 3-ton system, multiply your yearly cooling hours by your rate in dollars. If the result is{' '}
            <strong>above 1,000</strong>, a {usd(PREMIUM)} premium pays back within 10 years. 3,000 hours at 48¢ (Hawaii,
            = 1,440) clears it easily; 3,000 hours at 15¢ (Florida, = 450) is nowhere close.
          </p>

          <h2 className={h2}>Run your own numbers</h2>
          <PaybackEstimator low={LOW} high={HIGH} premium={PREMIUM} />

          <h2 className={h2}>Reasons to buy a 20 anyway</h2>
          <p className={p}>
            By 18 SEER you usually already have a two-stage or variable-speed compressor, so the comfort, humidity control
            and quiet running that make high-efficiency systems pleasant are mostly in place. The 20 adds a little more of
            the same. The good reasons to pay for it are mostly financial details on the quote:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>
              <strong>A rebate that targets the top tier.</strong> Some utilities pay their largest rebates for the highest
              SEER2 and EER2 levels. A $1,000 rebate halves the premium and the payback.
            </li>
            <li>
              <strong>A better warranty.</strong> Manufacturers often put their longest compressor and parts warranties on
              their top line. On a variable-speed system with expensive electronics, that's worth real money.
            </li>
            <li>
              <strong>The price gap is small.</strong> If the 18 and 20 are in the same product family and the quotes are
              only a few hundred dollars apart, the 20 is an easy choice.
            </li>
            <li>
              <strong>You'll stay for 20 years and expect power prices to rise.</strong> The table assumes today's rates. If
              your rate climbs, so do the savings.
            </li>
          </ul>
          <p className={p}>
            Two cautions. A variable-speed system has more electronics to protect, so where power is unreliable, budget for{' '}
            <Link to="/blog/protect-air-conditioner-power-surges-outages" className={a}>surge and voltage protection</Link>.
            And if what you really want is efficiency in a few rooms, a{' '}
            <Link to="/blog/mini-split-cost-2026" className={a}>ductless mini-split</Link> often reaches 20+ SEER for less
            than a top-tier central system, with no duct losses.
          </p>

          <h2 className={h2}>Check the actual ratings on your quotes</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>
              <strong>"Up to" ratings.</strong> Top-tier lines are often advertised as "up to 20+ SEER2", a figure reached
              only with a specific indoor unit and sometimes a specific size. Look up the exact matched combination on your
              quote in the{' '}
              <a href="https://www.ahridirectory.org/" target="_blank" rel="noopener noreferrer" className={a}>AHRI Directory</a>.
            </li>
            <li>
              <strong>Compare SEER2, not SEER</strong>, using the{' '}
              <Link to="/calculators/seer-to-seer2" className={a}>SEER to SEER2 converter</Link>.
            </li>
            <li>
              <strong>In hot climates, compare EER2.</strong> It measures efficiency at 95°F outdoors. Some very high SEER2
              systems have only average EER2, and on hot afternoons it's EER2 that sets your bill.
            </li>
          </ul>

          <h2 className={h2}>Which one to buy</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-lg border border-teal-200 bg-teal-50/40 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Choose 18 SEER if</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>Hours × rate (in dollars) is below about 1,000 for a 3-ton system</li>
                <li>The 20 costs more than $1,500 extra after rebates</li>
                <li>You want variable-speed comfort without paying for the last few points</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Choose 20 SEER if</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>You pay 40¢/kWh or more and cool most of the year</li>
                <li>A rebate or promotion closes most of the gap</li>
                <li>It comes with a meaningfully longer warranty</li>
                <li>You plan to stay 20 years</li>
              </ul>
            </div>
          </div>
          <ComparisonSeries current={PATH} />

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
            <li>Installed price ranges: HVACProjectCost, AC replacement cost by SEER (2026). The 18-to-20 premium is our estimate from its tier ranges and premiums over 14 SEER.</li>
            <li>SEER to SEER2: × {SPLIT_FACTOR} for ducted split systems, per our <Link to="/calculators/seer-to-seer2" className="text-teal-700 hover:underline">converter</Link>.</li>
            <li>Savings are at today's rates and assume electricity prices don't rise. Real savings vary with installation, ductwork, thermostat settings and weather.</li>
          </ul>

          <div className="rounded-lg bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Compare your current system</h3>
            <p className="text-gray-700 mb-4">
              Enter your current SEER, size, hours and electricity rate to see what an 18 or a 20 would save over what you
              have now.
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
