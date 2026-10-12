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

const PATH = '/blog/14-vs-16-seer';
const TITLE = '14 vs 16 SEER: Is the Upgrade Worth It? (Payback Math)';
const HEADLINE = '14 vs 16 SEER: Is the Upgrade Worth the Extra Cost? (2026 Payback Math)';
const PUBLISHED = '2026-10-12';
const UPDATED = '2026-10-12';
const LOW = 14;
const HIGH = 16;
const PREMIUM = 1000;
const PREMIUM_LOW = 700;
const PREMIUM_HIGH = 1200;

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const h3 = 'text-lg font-bold text-gray-900 mt-6 mb-2';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

export default function BlogArticle14vs16Seer() {
  const pct = pctLess(LOW, HIGH);
  const usSave = savings(LOW, HIGH, TONS, US_HOURS, US_RATE);
  const usPayback = PREMIUM / usSave;
  const kwhPerHour = kw(TONS, LOW) - kw(TONS, HIGH);
  const scenarios = buildScenarios(LOW, HIGH, PREMIUM);
  const paying = scenarios.filter((s) => s.payback <= LIFE).length;
  const best = [...scenarios].sort((x, y) => y.save - x.save)[0];
  const southSave = savings(15, 16, TONS, US_HOURS, US_RATE);

  const description = `A 16 SEER AC uses ${pct}% less electricity than a 14 SEER. For a 3-ton system at the U.S. average ${cents(US_RATE)}/kWh that saves about ${usd(usSave)} a year, so a ${usd(PREMIUM)} upgrade pays back in about ${Math.round(usPayback)} years. Payback by state, and why 14 SEER isn't an option everywhere.`;

  const faqs = [
    {
      q: 'How much more efficient is 16 SEER than 14 SEER?',
      a: `A 16 SEER system uses ${pct}% less electricity than a 14 SEER system for the same cooling (1 − 14 ÷ 16 = 0.125). A 3-ton system draws about ${kw(3, 14).toFixed(2)} kW at SEER 14 and ${kw(3, 16).toFixed(2)} kW at SEER 16, saving ${kwhPerHour.toFixed(2)} kWh for every hour it runs.`,
    },
    {
      q: 'How much does 16 SEER save per year compared to 14 SEER?',
      a: `For a 3-ton system running ${US_HOURS.toLocaleString()} hours a year at the U.S. average residential rate of ${cents(US_RATE)}/kWh (${RATES_AS_OF}), about ${usd(usSave)} a year. In hot, expensive places the saving is much larger: about ${usd(best.save)} a year in ${best.inName}.`,
    },
    {
      q: 'Is a 16 SEER air conditioner worth it over 14 SEER?',
      a: `Usually yes. A typical ${usd(PREMIUM)} premium pays back in about ${Math.round(usPayback)} years at average U.S. conditions and faster in hot climates, inside the life of the system. It's a weaker deal only where the cooling season is short and you expect to move within 10 years.`,
    },
    {
      q: 'Can you still buy a 14 SEER air conditioner?',
      a: `Only in northern states. Since January 1, 2023, new central air conditioners must meet 13.4 SEER2 (about 14 SEER) in the North and 14.3 SEER2 (about 15 SEER) in the Southeast and Southwest. In the South, the cheapest new system you can install is already about 15 SEER.`,
    },
    {
      q: 'What is 14 SEER and 16 SEER in SEER2?',
      a: `For a ducted split system, 14 SEER is about ${seer2(14)} SEER2 and 16 SEER is about ${seer2(16)} SEER2. New equipment is labeled in SEER2, so compare SEER2 numbers on current quotes.`,
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
              The smallest upgrade on the quote is usually the one most worth paying for. Here's the math.
            </p>
            <ArticleByline updated={UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              A 16 SEER air conditioner uses <strong>{pct}% less electricity</strong> than a 14 SEER. For a 3-ton system
              running {US_HOURS.toLocaleString()} hours a year at the U.S. average rate of {cents(US_RATE)}/kWh, that's about{' '}
              <strong>{usd(usSave)} a year</strong>. The 16 typically costs {usd(PREMIUM_LOW)}–{usd(PREMIUM_HIGH)} more, so
              a {usd(PREMIUM)} premium pays back in <strong>about {Math.round(usPayback)} years</strong>, and in about{' '}
              {Math.round(scenarios.find((x) => x.place === 'Florida')!.payback)} in Florida. Of the {scenarios.length} places we checked, it pays back within {LIFE} years in{' '}
              {paying === scenarios.length ? `all ${paying}` : paying}. One catch:
              in the South, 14 SEER is below the federal minimum for new systems, so the choice there is really 15 vs 16.
            </p>
          </div>

          <p className={p}>
            I run several stores in the Caribbean, where power costs over 30¢/kWh and the AC runs most of the year, so I've
            looked at a lot of replacement quotes. The step from the base model to the next one up is the upgrade I'd
            question least. It costs the least of any efficiency step, and because the base model is the least efficient
            system you can buy, it saves the most electricity per dollar. Here's why, in numbers.
          </p>

          <h2 className={h2}>First: can you still buy 14 SEER?</h2>
          <p className={p}>
            Only in the North. Since January 1, 2023, new central air conditioners must meet federal minimums that depend on
            where they're installed:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Region</th>
                  <th className={th}>Minimum (split AC under 45,000 Btu/h)</th>
                  <th className={th}>≈ Old SEER</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={td}>North</td><td className={td}>13.4 SEER2</td><td className={td}>14 SEER</td></tr>
                <tr><td className={td}>Southeast (incl. FL, GA, TX, the Carolinas, Puerto Rico)</td><td className={td}>14.3 SEER2</td><td className={td}>15 SEER</td></tr>
                <tr><td className={td}>Southwest (AZ, CA, NM, NV)</td><td className={td}>14.3 SEER2, plus an EER2 minimum</td><td className={td}>15 SEER</td></tr>
              </tbody>
            </table>
          </div>
          <p className={p}>
            So if you live in the South, the base model on your quote is already about 15 SEER, and moving up to 16 saves
            about 6% rather than {pct}%: roughly {usd(southSave)} a year for a 3-ton system at average U.S. rates and hours,
            more in a hot climate. The full list of states is in{' '}
            <Link to="/blog/seer-vs-seer2-explained" className={a}>SEER vs SEER2 explained</Link>.
          </p>
          <p className={p}>
            The 14 vs 16 comparison still matters in two cases: buying a new system in the North, and deciding whether to
            replace a working 14 SEER system you already own. For the second, the "premium" is the cost of a whole new
            system, not the difference between two quotes; use the{' '}
            <Link to="/calculators/repair-vs-replace" className={a}>repair vs. replace calculator</Link> for that decision.
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
                <tr><td className={`${td} font-medium`}>SEER2 equivalent (ducted split)</td><td className={td}>≈ {seer2(14)} SEER2</td><td className={td}>≈ {seer2(16)} SEER2</td></tr>
                <tr><td className={`${td} font-medium`}>Power draw, 3-ton</td><td className={td}>{kw(3, 14).toFixed(2)} kW</td><td className={td}>{kw(3, 16).toFixed(2)} kW</td></tr>
                <tr><td className={`${td} font-medium`}>Yearly cost, 3-ton, {US_HOURS.toLocaleString()} hrs, {cents(US_RATE)}</td><td className={td}>{usd(annualCost(TONS, 14, US_HOURS, US_RATE))}</td><td className={td}>{usd(annualCost(TONS, 16, US_HOURS, US_RATE))}</td></tr>
                <tr><td className={`${td} font-medium`}>Typical compressor</td><td className={td}>Single-stage</td><td className={td}>Single-stage or two-stage</td></tr>
                <tr><td className={`${td} font-medium`}>Typical installed price, 3-ton</td><td className={td}>About $3,800–$5,500</td><td className={td}>About $4,500–$7,200</td></tr>
                <tr><td className={`${td} font-medium`}>Extra cost of 16 over 14</td><td className={td} colSpan={2}>Usually {usd(PREMIUM_LOW)}–{usd(PREMIUM_HIGH)} for the same brand and size</td></tr>
                <tr><td className={`${td} font-medium`}>ENERGY STAR</td><td className={td}>No</td><td className={td}>Possible: requires 15.2 SEER2 and 12.0 EER2</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 italic mb-4">
            Prices are typical U.S. installed ranges from a published 2026 cost survey, not quotes. Your two quotes from the
            same installer are the only premium that matters.
          </p>

          <h2 className={h2}>The math</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4 font-mono text-sm text-gray-800">
            Power (kW) = tons × 12 ÷ SEER<br />
            kWh saved per year (14 → 16) = tons × hours × 0.107<br />
            Money saved = kWh saved × your rate
          </div>
          <p className={p}>
            The middle line comes from 12 × (1/14 − 1/16) = 0.107. A 3-ton system running {US_HOURS.toLocaleString()} hours
            saves about {Math.round(kwhPerHour * US_HOURS).toLocaleString()} kWh a year, worth {usd(usSave)} at{' '}
            {cents(US_RATE)}/kWh. Divide the price difference by that to get the payback period, then compare it to how
            long you'll keep the system: central AC typically lasts{' '}
            <Link to="/blog/how-long-do-air-conditioners-last" className={a}>15 to 20 years</Link>, and I use {LIFE} to
            stay conservative.
          </p>

          <h2 className={h2}>Payback by location</h2>
          <p className={p}>
            A 3-ton system, a {usd(PREMIUM)} premium for the 16, local residential electricity rates and our estimate of
            typical cooling hours for each climate:
          </p>
          <ScenarioTable rows={scenarios} />
          <p className={p}>
            Compare this with the <Link to="/blog/16-vs-18-seer" className={a}>16 vs 18 table</Link>, where most places never
            earn back the premium. Going from 14 to 16 saves more electricity (0.32 kWh per running hour against 0.25) for
            less money, so it pays back in roughly half the time almost everywhere. Even in New York, with a short cooling
            season, high rates bring it inside the life of the system.
          </p>

          <h3 className={h3}>A quick rule of thumb</h3>
          <p className={p}>
            For a 3-ton system, multiply your yearly cooling hours by your rate in dollars. If the result is{' '}
            <strong>above 300</strong>, a {usd(PREMIUM)} premium pays back within 10 years. 1,500 hours at 20¢ (= 300) just
            makes it; 900 hours at 15¢ (= 135) doesn't.
          </p>

          <h2 className={h2}>Run your own numbers</h2>
          <PaybackEstimator low={LOW} high={HIGH} premium={PREMIUM} />

          <h2 className={h2}>What else changes between 14 and 16</h2>
          <p className={p}>
            Less than between 16 and 18. Most 14 SEER systems and many 16s use a single-stage compressor that's either fully
            on or off, so comfort and noise are similar. Some 16 SEER models step up to a two-stage compressor, which runs at
            low speed most of the time: quieter, more even temperatures, and better moisture removal in humid weather. If
            humidity is a problem in your home, ask whether the 16 on your quote is single- or two-stage.
          </p>
          <p className={p}>
            The 16 is also usually built on the same simple, widely serviced parts as the 14, so you're not taking on
            pricier repairs the way you might with a variable-speed system. And if it qualifies for ENERGY STAR, it may
            qualify for a utility rebate that cuts the premium further.
          </p>
          <p className={p}>
            None of this matters as much as the installation. A system only reaches its rating if it's sized, charged and
            ducted correctly; ask for a load calculation (Manual J), and check the size with our{' '}
            <Link to="/calculators/ac-sizing" className={a}>AC sizing calculator</Link>.
          </p>

          <h2 className={h2}>Check the actual ratings on your quotes</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>
              <strong>Compare SEER2, not SEER.</strong> A quote that says "14 SEER" for new equipment may mean 14 SEER2,
              which is closer to 14.8 on the old scale. Convert with the{' '}
              <Link to="/calculators/seer-to-seer2" className={a}>SEER to SEER2 converter</Link>.
            </li>
            <li>
              <strong>The rating belongs to the matched system.</strong> Look up the exact outdoor unit and indoor coil
              combination in the{' '}
              <a href="https://www.ahridirectory.org/" target="_blank" rel="noopener noreferrer" className={a}>AHRI Directory</a>.
            </li>
            <li>
              <strong>Ask about rebates.</strong> The federal 25C tax credit ended on December 31, 2025, but many utilities
              still pay for ENERGY STAR equipment. See{' '}
              <Link to="/blog/hvac-tax-credits-rebates-2026" className={a}>HVAC tax credits and rebates in 2026</Link>.
            </li>
          </ul>

          <h2 className={h2}>Which one to buy</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">14 SEER can make sense if</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>You're in a northern state (where it's still allowed)</li>
                <li>Your cooling season is short and power is cheap</li>
                <li>You expect to sell within a few years</li>
                <li>It's a rental or a rarely used space</li>
              </ul>
            </div>
            <div className="rounded-lg border border-teal-200 bg-teal-50/40 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Choose 16 SEER if</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>Hours × rate (in dollars) is above about 300 for a 3-ton system</li>
                <li>You plan to stay 10 years or more</li>
                <li>A two-stage model is available for better humidity control</li>
                <li>A utility rebate covers part of the premium</li>
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
            <li>Federal minimums: U.S. Department of Energy regional standards effective January 1, 2023. ENERGY STAR criteria: 15.2 SEER2 and 12.0 EER2 for split systems.</li>
            <li>Cooling hours by climate are our estimate of typical full-load hours, the same figures used on the state cost pages.</li>
            <li>Installed prices and the 14-to-16 premium: HVACProjectCost, AC replacement cost by SEER (2026). They vary by region, brand and installer.</li>
            <li>SEER to SEER2: × {SPLIT_FACTOR} for ducted split systems, per our <Link to="/calculators/seer-to-seer2" className="text-teal-700 hover:underline">converter</Link>.</li>
            <li>Savings are at today's rates and assume electricity prices don't rise. Real savings vary with installation, ductwork, thermostat settings and weather.</li>
          </ul>

          <div className="rounded-lg bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Compare your current system</h3>
            <p className="text-gray-700 mb-4">
              Enter your current SEER, size, hours and electricity rate to see what a 16 would save over what you have now.
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
