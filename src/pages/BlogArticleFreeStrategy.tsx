import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';
import ArticleByline from '../components/ArticleByline';
import { AUTHOR_REF, PUBLISHER_REF } from '../data/site';
import { getState, annualCost, usd, cents, US_RATE, RATES_AS_OF } from '../data/acCost';

// Setback table: 3-ton SEER 14 system, 2,000 full-load hours a year (always on at 72°F).
// The 10% is DOE's "up to 10%" for an 8-hour 7–10°F setback; 15% and 20% are our rough estimates.
const HI = getState('hawaii')!;
const BASE = (rate: number) => annualCost(3, 14, 2000, rate);
const SETBACK_ROWS = [
  { label: '78°F when home, 85°F when away (8 hrs/day)', share: 0.10 },
  { label: '78°F home, 85°F away, 82°F sleeping', share: 0.15 },
  { label: 'Full setback schedule (all three setpoints)', share: 0.20, highlight: true },
];

export default function BlogArticleFreeStrategy() {
  return (
    <>
      <Helmet>
        <title>The $0 Thermostat Strategy 🆓 Cut Your AC Bill for Free</title>
        <meta name="description" content="The DOE says a 7–10°F thermostat setback for 8 hours a day can save up to 10% a year on heating and cooling. The exact schedule, the ceiling fan trick, and the myths that cost you." />
        <meta name="keywords" content="how to lower electricity bill AC, best thermostat temperature to save money, thermostat setback schedule, does raising thermostat save money, AC energy saving tips summer" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://airconditionanswers.com/blog/thermostat-setback-strategy" />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://airconditionanswers.com/blog/thermostat-setback-strategy" />
        <meta property="og:title" content="The $0 Thermostat Strategy: Cut Your Cooling Bill Without Buying Anything" />
        <meta property="og:description" content="The DOE says adjusting your thermostat 7–10°F for 8 hours/day can save up to 10% a year. Here's the full free strategy." />
        <meta property="article:author" content="https://airconditionanswers.com/about/mark-curant" />
        <meta property="article:published_time" content="2026-01-29" />
        <meta property="article:section" content="HVAC Guides" />
        <meta property="article:tag" content="Thermostat" />
        <meta property="article:tag" content="Energy Savings" />
        <meta property="article:tag" content="AC Tips" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://airconditionanswers.com/blog/thermostat-setback-strategy" />
        <meta name="twitter:title" content="The $0 Thermostat Strategy: Cut Your Cooling Bill Without Buying Anything" />
        <meta name="twitter:description" content="Up to 10% off heating and cooling costs — no new equipment required. Here's the exact setpoint schedule and the myths to stop believing." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The $0 Thermostat Strategy: How to Cut Your Cooling Bill Without Buying Anything",
            "datePublished": "2026-01-29",
            "dateModified": "2026-01-29",
            "author": AUTHOR_REF,
            "publisher": PUBLISHER_REF,
            "description": "The DOE estimates adjusting your thermostat 7–10°F for 8 hours a day can save up to 10% a year on heating and cooling. Here's the full free strategy, including setpoint schedules, the ceiling fan trick, and myths to stop believing."
          })}
        </script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Efficiency Hub
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">HVAC Guides</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                6 min read
              </span>
              <span className="text-gray-400">January 29, 2026</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">The $0 Thermostat Strategy: How to Cut Your Cooling Bill Without Buying Anything</h1>
            <p className="text-xl text-gray-600">Before you spend a dollar on new equipment, there's a strategy that costs nothing — and it can cut your cooling bill by up to about 10% starting tonight</p>
            <ArticleByline />
          </header>

          <section className="prose prose-lg max-w-none">

            <p className="text-gray-700 leading-relaxed mb-4">
              Most people run their AC the same way they run a light switch — on when it's hot, off when it's not. Same temperature, all day, every day, whether they're sitting on the couch or at the office for eight hours. That habit alone is costing the average household hundreds of dollars a year.
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              The U.S. Department of Energy estimates that simply adjusting your thermostat by 7–10°F for 8 hours a day can save up to 10% a year on heating and cooling. For a typical 3-ton system that runs a lot (2,000 hours a year), 10% of the cooling bill is about {usd(BASE(US_RATE) * 0.1)} a year at the U.S. average rate and about {usd(BASE(0.30) * 0.1)} at 30¢/kWh. Less AC use means smaller savings. When you're paying a premium for every kilowatt-hour, you stop treating the thermostat as a "set it and forget it" device. You start treating it like a faucet — something you turn down when you don't need it and up when you do.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Core Principle: You're Paying to Cool an Empty House</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              The single biggest behavioral waste in home cooling is this: most people cool their home to the same temperature whether they're in it, asleep in it, or away at work. A 2,000 sq ft home costs the same to maintain at 72°F whether the family is on the couch watching TV or out for three hours running errands. The AC is working, the meter is spinning, and no one is benefiting.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              The fix is a <strong>setback schedule</strong> — raising the temperature when you're away or asleep, then letting the system pre-cool before you return or wake up. You arrive home to a comfortable house, but you weren't paying to cool an empty one all afternoon. This is exactly what smart thermostats automate (and why they pay for themselves so quickly — see{' '}
              <Link to="/blog/smart-thermostat-vs-programmable" className="text-teal-600 hover:text-teal-700 underline">Article 2</Link>
              {' '}in this series). But you can implement the same strategy manually, right now, for free.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Recommended Setpoints</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              The DOE publishes recommended setpoints for maximum efficiency without sacrificing comfort. These are the targets worth programming into your thermostat today — or simply remembering to adjust manually when your routine changes:
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-teal-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Situation</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Setpoint (°F)</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Setpoint (°C)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Summer — home and awake</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">78°F</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">25.5°C</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Summer — sleeping (with ceiling fan)</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">82°F</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">27.8°C</td>
                  </tr>
                  <tr className="bg-amber-50 hover:bg-amber-100">
                    <td className="border border-gray-200 px-4 py-3 text-gray-800 font-medium">Summer — nobody home</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-800 font-medium">85–88°F</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-800 font-medium">29–31°C</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Winter — home and awake</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">68°F</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">20°C</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Winter — sleeping or away</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">60–65°F</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">15.5–18.3°C</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-8">
              <p className="text-sm font-semibold text-amber-800 mb-1">Important note for tropical and hot climates</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                The "away" setpoint should not exceed 88°F indoors. Beyond that, humidity accumulates rapidly and can cause mold growth and furniture damage. If you live in a continuously hot or tropical climate — including island locations and southern U.S. states — raising to 85°F while away is the safer and more efficient approach. Do <em>not</em> turn the system off entirely.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">Estimated Cooling Savings by Setpoint Discipline</h3>

            <p className="text-gray-600 text-sm mb-4 italic">Baseline: 3-ton SEER 14 system running 2,000 hours a year, summer cooling only. These are estimates.</p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-teal-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Behavior</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Est. Annual Cost</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Savings vs. Always On at 72°F</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Always on at 72°F (no schedule)</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{usd(BASE(US_RATE))}/yr avg · {usd(BASE(HI.rate))}/yr Hawaii</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-500">—</td>
                  </tr>
                  {SETBACK_ROWS.map((r) => (
                    <tr key={r.label} className={r.highlight ? 'bg-teal-50 hover:bg-teal-100' : 'hover:bg-gray-50'}>
                      <td className={`border border-gray-200 px-4 py-3 ${r.highlight ? 'text-gray-800 font-medium' : 'text-gray-700'}`}>{r.label}</td>
                      <td className={`border border-gray-200 px-4 py-3 ${r.highlight ? 'text-gray-800 font-medium' : 'text-gray-700'}`}>~{usd(BASE(US_RATE) * (1 - r.share))}/yr avg · ~{usd(BASE(HI.rate) * (1 - r.share))}/yr Hawaii</td>
                      <td className={`border border-gray-200 px-4 py-3 text-teal-700 ${r.highlight ? 'font-bold' : 'font-medium'}`}>~{usd(BASE(US_RATE) * r.share)}/yr avg · ~{usd(BASE(HI.rate) * r.share)}/yr Hawaii ({Math.round(r.share * 100)}%)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-500 text-sm italic mb-8">
              Rates: U.S. average {cents(US_RATE)}/kWh and Hawaii {cents(HI.rate)}/kWh (EIA, {RATES_AS_OF}). The 10% row follows DOE's “up to 10%” figure; the 15% and 20% rows are our rough estimates for adding more setback hours. Your savings depend on your climate, your house and how long it's empty.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Every Degree Matters — Here's the Math</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              A common rule of thumb is that each 1°F you raise the cooling setpoint saves roughly 3% of cooling energy. Treat it as a rough guide, not a law: the real figure depends on your climate, humidity, insulation and how hard the AC is working. The reason it works is simple: the smaller the gap between inside and outside, the less heat leaks in and the less your compressor has to run.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Here's what that looks like in practice. If your cooling bill is $400/month and you raise the thermostat just 2°F — say, from 72°F to 74°F — the rule of thumb puts the saving at about 6%, or roughly $24/month. Over a 6-month cooling season, that's <strong>around $144 without replacing a single component</strong>. The percentage is the same at any electricity rate; the dollars are bigger where the bill is bigger.
            </p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
              <p className="text-gray-800 font-medium mb-2">Quick savings formula:</p>
              <p className="text-gray-700 font-mono text-sm bg-white rounded p-3 border border-teal-200">
                Savings % ≈ degrees raised × 3% (rule of thumb)
              </p>
              <p className="text-gray-600 text-sm mt-3">
                Example: raising the setpoint 4°F ≈ 12% less cooling energy. At $400/month, that's roughly $48/month. Your results will vary.
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Ceiling Fan Trick: Raise the Thermostat AND Stay Comfortable</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Ceiling fans don't cool air — they cool <em>people</em>, through the wind-chill effect. Moving air removes heat from your skin more efficiently than still air, making a room feel 4–5°F cooler than it actually is. That means you can raise your thermostat by up to 4°F with no perceived change in comfort.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              The math here is obvious: a ceiling fan draws roughly 15–75 watts. Your central AC compressor draws 3,000–5,000 watts. Running a fan that uses about 1–2% of the AC's power so you can raise the setpoint 4°F is one of the best energy trades in any home. By the rule of thumb above, 4 degrees × 3% ≈ 12% less cooling energy, with little or no loss in comfort.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-8">
              <p className="text-sm font-semibold text-gray-900 mb-2">Critical reminder</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Turn ceiling fans off when you leave the room. Fans cool people, not spaces. A running fan in an empty room wastes electricity with zero benefit — it's the opposite of what you're trying to accomplish.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              How much a fan really saves where you live, what fans cost to run, and how to choose one:{' '}
              <Link to="/blog/ceiling-fan-vs-ac-savings" className="text-teal-600 hover:text-teal-700 font-medium">ceiling fan vs. AC</Link>,{' '}
              <Link to="/blog/cost-to-run-a-fan" className="text-teal-600 hover:text-teal-700 font-medium">cost to run a fan</Link> and the{' '}
              <Link to="/blog/ceiling-fan-buying-guide" className="text-teal-600 hover:text-teal-700 font-medium">ceiling fan buying guide</Link>.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">For Business Owners: The Pre-Opening Strategy</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Commercial spaces face a specific challenge: customers expect a comfortable temperature the moment they walk in at 9am, but running full cooling overnight is expensive waste. The solution is a <strong>scheduled pre-cool</strong>: program your thermostat to begin cooling 60–90 minutes before opening time, pulling the space down from your overnight setback temperature (say, 84°F) to your customer-comfort target (say, 74°F). Done right, customers never notice the difference — and your system runs hard for 90 minutes instead of all night. At commercial rates of 35¢+/kWh, this single scheduling change can trim meaningful dollars from a monthly bill, month after month.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Myths That Cost You Money</h2>

            <div className="space-y-5 mb-8">
              <div className="border border-gray-200 rounded-lg p-5">
                <p className="font-semibold text-gray-900 mb-2">Myth: Turning the AC off completely saves more than raising the setpoint</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  In hot, humid climates, a fully off house can reach 95°F+ indoors. When you return, the system has to work extremely hard to pull the temperature down — often consuming more energy than a moderate setback would have used all day. In tropical and southern climates especially, setback beats off-completely, every time.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <p className="font-semibold text-gray-900 mb-2">Myth: Closing vents in unused rooms saves money</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Central AC systems are designed for balanced air pressure throughout the duct network. Closing vents creates pressure imbalance, forces the air handler to work harder, and can damage ductwork over time. It doesn't save money — it just creates wear and inefficiency.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <p className="font-semibold text-gray-900 mb-2">Myth: A lower setpoint cools the house faster</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  AC systems cool at the same rate regardless of the setpoint you choose. Setting it to 65°F doesn't get you to 72°F any faster than setting it to 74°F — it just keeps running past 72°F and wastes electricity overshooting the temperature you actually wanted.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <p className="font-semibold text-gray-900 mb-2">Myth: Running the fan on "continuous" mode is more efficient than "auto"</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  The "auto" fan setting — where the blower only runs when the compressor is active — is almost always more efficient. Continuous fan mode runs the blower motor constantly, adding unnecessary electricity consumption even when no cooling is happening.
                </p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Bottom Line</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Setpoint discipline is the free layer. It costs nothing, requires no equipment, and can be implemented tonight. But it works <em>on top of</em> your system's SEER rating — and if your system is old or inefficient, there's a ceiling to how much behavior change can help.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Before your next cooling season, check your SEER rating and run the numbers. You might find that between smarter setpoints, a thermostat upgrade, and a SEER improvement, you're looking at a 30–40% reduction in your total cooling bill. That's not a rounding error — at high electricity rates, it's hundreds or thousands of dollars a year.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Start with the free wins. Then use the calculator to see what the next layer is worth.
            </p>

          </section>

          <div className="mt-10 p-6 bg-teal-50 rounded-lg border border-teal-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Calculate Your SEER Savings</h3>
            <p className="text-gray-600 mb-4 text-sm">See your baseline cooling cost based on your current SEER rating, then stack setpoint savings on top. See where the biggest saving is likely to be.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Calculate My Savings
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Related Articles</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/blog/what-is-seer-rating" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">What Is a SEER Rating — and Why Your Wallet Cares</p>
              </Link>
              <Link to="/blog/smart-thermostat-vs-programmable" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">Smart Thermostat vs. Programmable Thermostat</p>
              </Link>
              <Link to="/blog/seer-eer-hspf-explained" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">SEER vs EER vs HSPF Explained</p>
              </Link>
            </div>
          </div>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
