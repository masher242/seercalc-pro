import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';
import ArticleByline from '../components/ArticleByline';
import { AUTHOR_REF, PUBLISHER_REF } from '../data/site';
import { toSeer2 } from '../data/seer2';
import { getState, annualCost, annualKwh, usd, cents, US_RATE, RATES_AS_OF } from '../data/acCost';

// Every dollar figure on this page is computed from these: a 3-ton central AC
// running 1,500 full-load hours a year, at the newest EIA residential rates
// (U.S. average, and Hawaii as the high-rate example).
const TONS = 3;
const HRS = 1500;
const HI = getState('hawaii')!;
const AVG = US_RATE;
const HIGH = HI.rate;
const cost = (seer: number, rate: number) => annualCost(TONS, seer, HRS, rate);
const save = (from: number, to: number, rate: number) => cost(from, rate) - cost(to, rate);
/** Years for the energy savings to repay an upfront price premium. */
const yrs = (premium: number, from: number, to: number, rate: number) => Math.round(premium / save(from, to, rate));

const UPGRADE_PAIRS: [number, number][] = [[8, 14], [8, 16], [10, 14], [10, 16], [10, 18], [10, 20], [13, 16], [13, 18], [13, 20], [14, 16], [14, 18], [14, 20], [16, 20], [20, 25]];
const upgrades = (rate: number) =>
  UPGRADE_PAIRS.map(([from, to]) => {
    const annual = save(from, to, rate);
    return { from, to, annual, ten: annual * 10, fifteen: annual * 15 };
  });
const avgRateUpgrades = upgrades(AVG);
const highRateUpgrades = upgrades(HIGH);

const chartRows = [
  { seer: 8, tier: 'Very Low', era: 'Pre-1992 systems' },
  { seer: 9, tier: 'Very Low', era: 'Early 1990s systems' },
  { seer: 10, tier: 'Low', era: '1992-2006 minimum' },
  { seer: 11, tier: 'Low', era: 'Budget models, early 2000s' },
  { seer: 12, tier: 'Low-Moderate', era: 'Standard models, 2000s' },
  { seer: 13, tier: 'Moderate', era: '2006-2023 minimum (North)' },
  { seer: 14, tier: 'Standard', era: 'Current minimum (North)' },
  { seer: 15, tier: 'Good', era: 'Current minimum (South)' },
  { seer: 16, tier: 'Good', era: 'Popular mid-range choice' },
  { seer: 17, tier: 'High', era: 'High-efficiency single-stage' },
  { seer: 18, tier: 'High', era: 'Two-stage systems' },
  { seer: 19, tier: 'High', era: 'Premium two-stage' },
  { seer: 20, tier: 'Very High', era: 'Variable-speed entry' },
  { seer: 21, tier: 'Very High', era: 'Variable-speed standard' },
  { seer: 22, tier: 'Ultra High', era: 'Premium variable-speed' },
  { seer: 23, tier: 'Ultra High', era: 'Top-tier residential' },
  { seer: 24, tier: 'Ultra High', era: 'Elite residential' },
  { seer: 25, tier: 'Maximum', era: 'Highest efficiency available' },
].map((r) => ({ ...r, kwh: annualKwh(TONS, r.seer, HRS), avg: cost(r.seer, AVG), high: cost(r.seer, HIGH) }));

const seer2Conversions = [
  { seer: 14, seer2: toSeer2(14) },
  { seer: 15, seer2: toSeer2(15) },
  { seer: 16, seer2: toSeer2(16) },
  { seer: 18, seer2: toSeer2(18) },
  { seer: 20, seer2: toSeer2(20) },
  { seer: 22, seer2: toSeer2(22) },
  { seer: 25, seer2: toSeer2(25) },
];

function UpgradeSavingsTable({ rows }: { rows: typeof avgRateUpgrades }) {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-teal-50">
            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Upgrade From → To</th>
            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Annual Savings</th>
            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">10-Year Savings</th>
            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">15-Year Savings</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.from}-${row.to}`} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">SEER {row.from} → SEER {row.to}</td>
              <td className="border border-gray-200 px-4 py-3 text-gray-700">{usd(row.annual)}/year</td>
              <td className="border border-gray-200 px-4 py-3 text-gray-700">{usd(row.ten)}</td>
              <td className="border border-gray-200 px-4 py-3 text-gray-700">{usd(row.fifteen)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BlogArticleSeerChart() {
  return (
    <>
      <Helmet>
        <title>SEER Rating Chart 2026 📊 Annual Cost for SEER 8 to 25+</title>
        <meta name="description" content="Every SEER rating from 8 to 25+, with real dollar costs at your electricity rate. See where diminishing returns kick in for your climate." />
        <meta name="keywords" content="SEER rating chart, SEER chart 2026, SEER efficiency levels, SEER rating comparison, air conditioner SEER chart, SEER cost comparison" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://airconditionanswers.com/blog/seer-rating-chart" />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://airconditionanswers.com/blog/seer-rating-chart" />
        <meta property="og:title" content="The Complete SEER Rating Chart: Every Rating from 8 to 25+ Explained (2026)" />
        <meta property="og:description" content="See annual costs, efficiency tiers, and savings comparisons for every SEER rating from 8 to 25+." />
        <meta property="og:image" content="https://airconditionanswers.com/images/blog/seer-rating-chart-og.png" />
        <meta property="article:author" content="https://airconditionanswers.com/about/mark-curant" />
        <meta property="article:section" content="HVAC Education" />
        <meta property="article:tag" content="SEER" />
        <meta property="article:tag" content="HVAC" />
        <meta property="article:tag" content="Energy Efficiency" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://airconditionanswers.com/blog/seer-rating-chart" />
        <meta name="twitter:title" content="The Complete SEER Rating Chart: Every Rating from 8 to 25+ Explained" />
        <meta name="twitter:description" content="Annual costs, efficiency tiers, and savings comparisons for every SEER rating from 8 to 25+." />
        <meta name="twitter:image" content="https://airconditionanswers.com/images/blog/seer-rating-chart-og.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The Complete SEER Rating Chart: Every Rating from 8 to 25+ Explained (2026)",
            "dateModified": "2026-06-17",
            "author": AUTHOR_REF,
            "publisher": PUBLISHER_REF,
            "description": "Complete SEER rating chart from 8 to 25+. See annual costs, efficiency tiers, savings comparisons, and which SEER rating is right for your climate and budget."
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
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">HVAC Education</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                10 min read
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">The Complete SEER Rating Chart: Every Rating from 8 to 25+ Explained (2026)</h1>
            <p className="text-xl text-gray-600">Every SEER rating, what it costs you per year, and exactly how much upgrading could save</p>
            <ArticleByline updated="2026-06-17" />
          </header>

          <section className="prose prose-lg max-w-none">

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
              <p className="text-gray-800">
                <strong>In 30 seconds:</strong> A SEER rating tells you how efficiently your air conditioner uses electricity. The higher the number, the less you pay to cool your home. This chart covers every rating from old 8 SEER systems to modern 25+ SEER units — with real cost comparisons at both average and high electricity rates. If you're wondering where your system falls and how much you could save by upgrading, start here.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              Every air conditioner has a SEER rating, but most homeowners have no idea what theirs is — or what the number actually means in dollars. If you've read our guide on <Link to="/blog/what-is-seer-rating" className="text-teal-600 hover:text-teal-700 font-medium">what a SEER rating is</Link>, you know it works like miles-per-gallon for your car: higher number = less electricity = lower bills.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              But how much less? What's the actual difference between a SEER 10 and a SEER 16? Or a SEER 16 and a SEER 20? Is upgrading from 14 to 18 worth the extra $2,000?
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              This chart answers all of those questions with real numbers. We've calculated annual costs at both the national average electricity rate ({cents(AVG)}/kWh) and a high rate ({cents(HIGH)}/kWh, Hawaii's average, similar to many islands and high-cost areas), using EIA figures for {RATES_AS_OF} so you can see exactly where your system falls — and exactly what upgrading could save you.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-4">The Complete SEER Rating Chart</h2>

            <p className="text-sm text-gray-500 italic mb-4">
              All costs are estimates for a 3-ton system running 1,500 full-load hours a year. Your costs will vary based on system size, usage hours, and local electricity rates. Use our calculator for personalized numbers.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-teal-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">SEER Rating</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Efficiency Level</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Annual kWh</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Annual Cost at U.S. average ({cents(AVG)}/kWh)</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Annual Cost at Hawaii rate ({cents(HIGH)}/kWh)</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Typical Era/Application</th>
                  </tr>
                </thead>
                <tbody>
                  {chartRows.map((row) => (
                    <tr key={row.seer} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">{row.seer} SEER</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.tier}</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">{Math.round(row.kwh).toLocaleString()}</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">{usd(row.avg)}</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">{usd(row.high)}</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.era}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>How to read this chart:</strong> Find your current SEER rating in the left column. Look at your annual cost. Then look at the cost for the SEER rating you're considering. The difference is your estimated annual savings.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Example:</strong> Upgrading from SEER 10 ({usd(cost(10, AVG))}/year) to SEER 16 ({usd(cost(16, AVG))}/year) saves approximately <strong>{usd(save(10, 16, AVG))} per year</strong> at average rates. At Hawaii rates? That same upgrade saves <strong>{usd(save(10, 16, HIGH))} per year</strong>.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">SEER Efficiency Tiers Explained</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Not all SEER ratings are created equal. Here's what each tier actually means for your comfort, your wallet, and the technology inside the unit.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Very Low Efficiency: SEER 8-9</h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>If your system is here, it's costing you serious money.</strong>
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              These are systems from before 1992 — over 30 years old. They were built when electricity was cheap and efficiency standards didn't exist. A SEER 8 system uses <strong>nearly twice the electricity</strong> of a modern SEER 14 system to produce the same cooling.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              At high electricity rates, a SEER 8 system costs about <strong>{usd(cost(8, HIGH))}/year</strong> to run. Upgrading to even a basic SEER 14 saves about <strong>{usd(save(8, 14, HIGH))} per year</strong>. If you still have a SEER 8 or 9 system, replacement isn't just recommended — it's one of the best financial decisions you can make.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>Technology:</strong> Single-speed compressor, basic controls, no efficiency features.</p>
            <p className="text-gray-700 leading-relaxed mb-6"><strong>What to do:</strong> Replace immediately. Even a minimum-efficiency new system cuts your costs nearly in half. Use our calculator to see your exact savings.</p>

            <hr className="my-8 border-gray-200" />

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Low Efficiency: SEER 10-12</h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>The "it still works but it's bleeding money" range.</strong>
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              SEER 10 was the federal minimum from 1992 to 2006. If your system was installed during that era, this is likely where you are. These systems are functional but expensive to operate — especially in hot climates or high-rate areas.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              At average rates, a SEER 10 costs {usd(cost(10, AVG))}/year. A SEER 12 costs {usd(cost(12, AVG))}/year. The difference between the two is {usd(save(10, 12, AVG))} annually — noticeable but not dramatic. The real savings come from jumping to a modern system: upgrading from SEER 10 to SEER 16 saves <strong>{usd(save(10, 16, AVG))}/year</strong> at average rates and <strong>{usd(save(10, 16, HIGH))}/year</strong> at high rates.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>Technology:</strong> Single-speed compressor, PSC (permanent split capacitor) blower motors. Basic on/off operation — the system runs at 100% capacity whenever it's on, even when the house only needs 30% cooling.</p>
            <p className="text-gray-700 leading-relaxed mb-6"><strong>What to do:</strong> If your system is 15+ years old and still running at SEER 10-12, start planning for replacement. The efficiency gap between your system and modern equipment is enormous. Check current <Link to="/blog/hvac-tax-credits-rebates-2026" className="text-teal-600 hover:text-teal-700 font-medium">rebates</Link>: the federal tax credit ended December 31, 2025, but your utility may still offer a rebate, and heat pumps may qualify for a state rebate.</p>

            <hr className="my-8 border-gray-200" />

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Moderate Efficiency: SEER 13</h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Yesterday's minimum standard.</strong>
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              SEER 13 was the federal minimum from 2006 to 2023. Millions of systems installed during that 17-year window are SEER 13. They're a meaningful improvement over SEER 10 (23% more efficient), but they're now below the current legal minimum for new installations.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              At average rates, a SEER 13 costs {usd(cost(13, AVG))}/year — {usd(save(10, 13, AVG))} less than a SEER 10. At high rates, {usd(cost(13, HIGH))}/year — still a significant bill.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>Technology:</strong> Mostly single-speed compressors with some two-stage options at the upper end. Improved coil designs and better refrigerants (R-410A) compared to older systems.</p>
            <p className="text-gray-700 leading-relaxed mb-6"><strong>What to do:</strong> If your SEER 13 system is under 10 years old and running well, it's not urgent to replace. Focus on maintenance and thermostat strategy to maximize what you have. If it's approaching 15 years or needing expensive repairs, upgrading to SEER 16-18 is a smart move.</p>

            <hr className="my-8 border-gray-200" />

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Standard Efficiency: SEER 14-15</h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Today's baseline — adequate but not impressive.</strong>
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              As of 2023, the federal minimum is SEER 14 in northern states and SEER 15 in southern and southwestern states (under the new SEER2 testing standard, these translate to SEER2 13.4 and SEER2 14.3 respectively).
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              These systems meet the legal minimum. They cost less upfront than higher-efficiency models. And for mild climates where the AC runs only a few months, they can make financial sense. At average rates, a SEER 14 costs {usd(cost(14, AVG))}/year. At high rates, {usd(cost(14, HIGH))}/year.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>Technology:</strong> Typically single-stage compressors with ECM (electronically commutated motor) blower motors, which are more efficient than older PSC motors. Some SEER 15 units offer two-stage operation.</p>
            <p className="text-gray-700 leading-relaxed mb-2"><strong>Typical installed cost:</strong> $3,500-$6,000 (3-ton system)</p>
            <p className="text-gray-700 leading-relaxed mb-6"><strong>Best for:</strong> Budget-conscious buyers, mild climates, homes where the AC runs fewer than 1,000 hours per year, or shorter-term ownership (planning to sell within 5 years).</p>

            <hr className="my-8 border-gray-200" />

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Good Efficiency: SEER 16</h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>The sweet spot for most homeowners.</strong>
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              SEER 16 is where the cost-to-savings ratio gets interesting. It's 14% more efficient than a SEER 14, which translates to {usd(save(14, 16, AVG))}/year at average rates and {usd(save(14, 16, HIGH))}/year at high rates. Over a 15–20 year lifespan, that's roughly {usd(save(14, 16, AVG) * 15)}–{usd(save(14, 16, HIGH) * 20)} in total, before any change in rates.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              The upfront cost premium over a SEER 14 is typically $800-$1,500. At high electricity rates, a SEER 16 pays back that premium in about <strong>{yrs(800, 14, 16, HIGH)}–{yrs(1500, 14, 16, HIGH)} years</strong>. At the U.S. average rate it takes about {yrs(800, 14, 16, AVG)}–{yrs(1500, 14, 16, AVG)} years, so the case rests on heavy use, a high rate or a rebate.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>Technology:</strong> Often available with two-stage compressors and variable-speed blower motors. Better humidity control than single-stage units. Quieter operation.</p>
            <p className="text-gray-700 leading-relaxed mb-2"><strong>Typical installed cost:</strong> $4,500-$7,000 (3-ton system)</p>
            <p className="text-gray-700 leading-relaxed mb-2"><strong>ENERGY STAR certified:</strong> Often, but check the model. SEER 16 is about 15.2 SEER2, right at ENERGY STAR's 15.2 SEER2 threshold for a split central AC, and the unit also needs at least 12.0 EER2.</p>
            <p className="text-gray-700 leading-relaxed mb-6"><strong>Best for:</strong> Most homeowners in moderate to hot climates. Best balance of upfront cost and long-term savings. If you're only going to look at one tier, this is it.</p>

            <hr className="my-8 border-gray-200" />

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">High Efficiency: SEER 17-19</h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Meaningful savings, especially in hot climates and high-rate areas.</strong>
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              This is where two-stage compressors become standard. Instead of running at 100% capacity every time the system kicks on, two-stage units can run at 60-70% capacity when full cooling isn't needed. This means longer, gentler cooling cycles — better humidity control, more consistent temperatures, and quieter operation.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              At average rates, a SEER 18 saves {usd(save(14, 18, AVG))}/year compared to SEER 14. At high rates, that's {usd(save(14, 18, HIGH))}/year — or <strong>{usd(save(14, 18, HIGH) * 15)} over 15 years</strong>.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>Technology:</strong> Two-stage compressors, variable-speed blower motors, advanced coil designs. Some SEER 19 models use inverter-driven compressors (continuously variable rather than two fixed speeds).</p>
            <p className="text-gray-700 leading-relaxed mb-2"><strong>Typical installed cost:</strong> $5,500-$9,000 (3-ton system)</p>
            <p className="text-gray-700 leading-relaxed mb-6"><strong>Best for:</strong> Hot climates (Texas, Florida, Arizona, Southern California), high electricity rates, homeowners who value comfort and quiet operation, and anyone planning to stay in their home 10+ years.</p>

            <hr className="my-8 border-gray-200" />

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Very High Efficiency: SEER 20-21</h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Premium territory — where variable-speed technology shines.</strong>
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              At SEER 20+, you're entering variable-speed or inverter-driven compressor territory. These systems adjust their output continuously — running at 25% capacity on a mild day and ramping up to 100% only on the hottest afternoons. The result is remarkably consistent temperatures, excellent humidity control, and whisper-quiet operation.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              At average rates, a SEER 20 saves {usd(save(14, 20, AVG))}/year compared to SEER 14. At high rates, <strong>{usd(save(14, 20, HIGH))}/year — or {usd(save(14, 20, HIGH) * 15)} over 15 years</strong>.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>Technology:</strong> Variable-speed inverter compressors, communicating controls (system components talk to each other for optimal performance), advanced refrigerant management.</p>
            <p className="text-gray-700 leading-relaxed mb-2"><strong>Typical installed cost:</strong> $7,000-$11,000 (3-ton system)</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>The diminishing returns question:</strong> Moving from SEER 14 to SEER 20 saves {usd(save(14, 20, AVG))}/year at average rates. Moving from SEER 20 to SEER 25 saves only an additional {usd(save(20, 25, AVG))}/year. The biggest efficiency gains happen in the jump from old systems to modern ones — each additional SEER point above 20 delivers less incremental savings.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6"><strong>Best for:</strong> Homeowners in very hot climates who run AC heavily, those with high electricity rates where every percentage point matters, comfort-focused buyers who want the best indoor environment, and environmentally conscious buyers looking to minimize energy use.</p>

            <hr className="my-8 border-gray-200" />

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Ultra High / Maximum Efficiency: SEER 22-25+</h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>The pinnacle — but diminishing returns are real.</strong>
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              These are the most efficient residential air conditioners available. They use the most advanced inverter compressor technology, the most sophisticated controls, and the highest-quality components. They're also the most expensive to buy, install, and repair.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              At average rates, a SEER 25 saves {usd(save(14, 25, AVG))}/year compared to SEER 14. But compared to SEER 20, the additional savings are only {usd(save(20, 25, AVG))}/year. That means the extra $2,000-$5,000 in upfront cost takes <strong>{yrs(2000, 20, 25, AVG)}–{yrs(5000, 20, 25, AVG)} years</strong> to pay back at average rates — longer than the system will last.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              At high rates, the math improves: SEER 25 saves {usd(save(14, 25, HIGH))}/year compared to SEER 14, and {usd(save(20, 25, HIGH))}/year compared to SEER 20. The payback on the upgrade from SEER 20 to SEER 25 drops to <strong>{yrs(2000, 20, 25, HIGH)}–{yrs(5000, 20, 25, HIGH)} years</strong> — borderline at best.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2"><strong>Technology:</strong> Advanced inverter compressors with variable refrigerant flow, communicating controls, premium components throughout. Often paired with communicating thermostats for optimal system coordination.</p>
            <p className="text-gray-700 leading-relaxed mb-2"><strong>Typical installed cost:</strong> $9,000-$15,000+ (3-ton system)</p>
            <p className="text-gray-700 leading-relaxed mb-6"><strong>Best for:</strong> Buyers who want the absolute best efficiency regardless of payback period, extremely hot climates with very high electricity rates, environmentally motivated buyers, and those planning 20+ years of ownership in the same home.</p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Savings Comparison: What Upgrading Actually Saves</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Here's the chart that really matters — how much you save by upgrading FROM your current system TO a new one.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">Annual Savings When Upgrading (Average U.S. Rate: {cents(AVG)}/kWh)</h3>

            <UpgradeSavingsTable rows={avgRateUpgrades} />

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">Annual Savings When Upgrading (High Rate: Hawaii, {cents(HIGH)}/kWh)</h3>

            <UpgradeSavingsTable rows={highRateUpgrades} />

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>The pattern is clear:</strong> the biggest savings come from replacing old, inefficient systems. Upgrading from SEER 10 to SEER 16 saves dramatically more per year than upgrading from SEER 16 to SEER 22. If you're on an old system, almost any modern unit is a massive improvement.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Takeaways: Where the Diminishing Returns Hit</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              There's a pattern in the chart that's worth highlighting because it should directly influence your buying decision.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4"><strong>The biggest bang for your buck</strong> happens in these jumps:</p>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>SEER 8-10 → SEER 14-16:</strong> Massive savings (30-40% reduction in cooling costs). Almost always worth it.</li>
              <li><strong>SEER 13-14 → SEER 16-18:</strong> Solid savings (15-25% reduction). Worth it in hot climates and high-rate areas. Payback on a $800–$1,500 premium ranges from about {yrs(800, 14, 16, HIGH)} years at high rates to {yrs(1500, 14, 16, AVG)} years at the average rate.</li>
              <li><strong>SEER 16-18 → SEER 20:</strong> Moderate savings (10-15% reduction). Worth it mainly if you run AC heavily or have high rates. On a premium of about $2,500, payback is roughly {yrs(2500, 16, 20, HIGH)} years at high rates and {yrs(2500, 16, 20, AVG)} at the average rate.</li>
              <li><strong>SEER 20 → SEER 25:</strong> Small incremental savings (5-8% additional reduction). Rarely justified on cost alone. Payback often exceeds system lifespan at average rates.</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>The rule of thumb:</strong> Every SEER point matters more when you're starting from a low rating. Going from SEER 10 to SEER 11 saves roughly {usd(save(10, 11, AVG))}/year at average rates. Going from SEER 22 to SEER 23 saves only about {usd(save(22, 23, AVG))}/year.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">SEER vs. SEER2: A Quick Note</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              In 2023, the Department of Energy introduced <strong>SEER2</strong> — an updated testing standard that better reflects real-world performance. SEER2 ratings are approximately 5% lower than equivalent SEER ratings for the same equipment. A system rated SEER 16 under the old standard would be rated about SEER2 15.2 under the new one. For the full breakdown of what changed and why, see our guide: <Link to="/blog/seer-vs-seer2-explained" className="text-teal-600 hover:text-teal-700 font-medium">SEER vs SEER2 Explained</Link>. Weighing an upgrade? See <Link to="/blog/14-vs-16-seer" className="text-teal-600 hover:text-teal-700 font-medium">14 vs 16 SEER</Link> and <Link to="/blog/16-vs-18-seer" className="text-teal-600 hover:text-teal-700 font-medium">16 vs 18 SEER</Link>.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              If you're comparing new equipment quoted in SEER2 to older systems rated in SEER, here's a quick conversion:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-teal-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Old SEER Rating</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Approximate SEER2 Equivalent</th>
                  </tr>
                </thead>
                <tbody>
                  {seer2Conversions.map((row) => (
                    <tr key={row.seer} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.seer} SEER</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">{row.seer2} SEER2</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-5 mb-6">
              <p className="text-sm font-semibold text-teal-800 mb-1">Related Guide</p>
              <Link to="/blog/seer-eer-hspf-explained" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
                SEER vs EER vs HSPF: HVAC Efficiency Ratings Explained →
              </Link>
            </div>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Which SEER Rating Should YOU Choose?</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              There's no single "best" SEER rating. The right choice depends on your climate, your electricity rate, how long you plan to stay in your home, and your budget.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>If your electricity rate is under 15¢/kWh</strong> and you live in a mild climate (Pacific Northwest, northern tier states), SEER 14-16 offers the best value. Higher ratings take too long to pay back.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>If your rate is 15-25¢/kWh</strong> and you live in a moderate to hot climate (most of the U.S.), SEER 16 is usually the sensible pick. Its premium over SEER 14 takes roughly {yrs(800, 14, 16, 0.25)}–{yrs(1500, 14, 16, 0.15)} years to repay at these rates on 1,500 hours a year; more hours shorten that. SEER 18 pays off mainly with heavy use.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>If your rate is over 25¢/kWh</strong> or you live in an extremely hot climate (Hawaii, parts of California, tropical regions, southern Arizona and Texas), SEER 18-20 can be worth the premium. Every SEER point saves significantly more money when your rate is high and your system runs heavily.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>If you're on a tight budget,</strong> don't overextend for a high SEER rating. A properly installed SEER 14-16 system with clean filters, good thermostat discipline, and annual maintenance will outperform a neglected SEER 20 system every time.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Calculated These Numbers</h2>

            <p className="text-gray-700 leading-relaxed mb-4">All costs in this chart use the industry-standard formula:</p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-6 rounded-r-lg">
              <p className="text-gray-800 font-medium mb-2">Annual kWh = (Tons × 12,000 BTU × Annual Hours) ÷ (SEER × 1,000)</p>
              <p className="text-gray-800 font-medium">Annual Cost = kWh × Electricity Rate</p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              Our baseline assumptions: 3-ton system, 1,500 cooling hours/year. We used {cents(AVG)}/kWh (the U.S. national average per the EIA, {RATES_AS_OF}) and {cents(HIGH)}/kWh (Hawaii's average rate) for comparison. These figures update when EIA publishes new rates. Your actual costs will vary based on your system size, how many hours you run it, and your local rate. For personalized numbers based on YOUR situation, use our free calculator.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

            <div className="space-y-6 mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">What SEER rating is my current AC?</h3>
                <p className="text-gray-700 leading-relaxed">Check the yellow EnergyGuide label on your outdoor condenser unit, or look up the model number on the manufacturer's website. Our guide on <Link to="/blog/how-to-read-hvac-label" className="text-teal-600 hover:text-teal-700 font-medium">how to read your HVAC label</Link> walks you through it step by step.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">What's the minimum SEER rating required for new installations?</h3>
                <p className="text-gray-700 leading-relaxed">As of 2023, the minimum is SEER2 13.4 (approximately SEER 14) in northern states and SEER2 14.3 (approximately SEER 15) in southern and southwestern states.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Is SEER 16 worth the upgrade from SEER 14?</h3>
                <p className="text-gray-700 leading-relaxed">At average U.S. rates, SEER 16 saves about {usd(save(14, 16, AVG))}/year over SEER 14 (3-ton, 1,500 hours). The upfront premium is typically $800-$1,500, so payback is about {yrs(800, 14, 16, AVG)}–{yrs(1500, 14, 16, AVG)} years. At Hawaii's rate it drops to about {yrs(800, 14, 16, HIGH)}–{yrs(1500, 14, 16, HIGH)} years — much more compelling.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">What's the most efficient SEER rating available?</h3>
                <p className="text-gray-700 leading-relaxed">Some residential systems now exceed SEER 25 (SEER2 23.8+). Mini-split ductless systems can reach SEER 30-38 in some configurations. However, the highest-rated systems are significantly more expensive and the incremental savings over SEER 20 are modest.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Does a higher SEER rating cool my house faster?</h3>
                <p className="text-gray-700 leading-relaxed">No. SEER measures efficiency, not cooling speed. A SEER 25 system doesn't cool faster than a SEER 14 — it uses less electricity to achieve the same cooling. However, variable-speed systems (typically SEER 18+) do provide more consistent, comfortable cooling.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">How does SEER relate to SEER2?</h3>
                <p className="text-gray-700 leading-relaxed">SEER2 is the updated testing standard introduced in 2023. SEER2 ratings are approximately 5% lower than equivalent SEER ratings. A SEER 16 system is approximately SEER2 15.2.</p>
              </div>
            </div>

          </section>

          <div className="mt-10 p-6 bg-teal-50 rounded-lg border border-teal-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to See Your Numbers?</h3>
            <p className="text-gray-600 mb-4 text-sm">Enter your current SEER, electricity rate, and usage to calculate exactly how much you could save by upgrading.</p>
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
              <Link to="/blog/seer-eer-hspf-explained" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">SEER vs EER vs HSPF Explained</p>
              </Link>
              <Link to="/blog/choosing-the-right-seer-rating" className="block p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-200">
                <p className="text-sm font-semibold text-gray-900">Choosing the Right SEER Rating for Your Home</p>
              </Link>
            </div>
          </div>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
