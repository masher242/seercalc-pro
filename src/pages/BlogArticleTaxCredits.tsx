import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock, AlertTriangle } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';
import ArticleByline from '../components/ArticleByline';
import { articleJsonLd } from '../data/site';

const PATH = '/blog/hvac-tax-credits-rebates-2026';
const UPDATED = '2026-10-08';
const TITLE = 'HVAC Tax Credits 2026 💵 Federal Credit Ended: What\'s Left';
const HEADLINE = 'HVAC Tax Credits & Rebates in 2026: The Federal Credit Is Gone. Here\'s What\'s Left.';
const DESCRIPTION =
  'There is no federal tax credit for an AC or heat pump installed in 2026. The 25C credit ended Dec 31, 2025. What still pays: state heat pump rebates, utility rebates and promotions.';

const changes = [
  { item: 'Central air conditioner (25C)', before: '30% of cost, up to $600', now: 'Ended — no federal credit' },
  { item: 'Air-source heat pump (25C)', before: '30% of cost, up to $2,000', now: 'Ended — no federal credit' },
  { item: 'Electrical panel upgrade (25C)', before: '30%, up to $600', now: 'Ended' },
  { item: 'Home energy audit (25C)', before: '30%, up to $150', now: 'Ended' },
  { item: 'Geothermal heat pump (25D)', before: '30%, no dollar cap', now: 'Ended for installs completed after Dec 31, 2025' },
  { item: 'State heat pump rebates (HEEHRA)', before: 'Rolling out by state', now: 'Still available where your state has launched' },
  { item: 'Utility rebates', before: 'Varies by utility', now: 'Still available — varies by utility' },
];

const heehra = [
  { item: 'Heat pump for heating and cooling', low: 'Up to $8,000', moderate: 'Up to $4,000' },
  { item: 'Electrical panel upgrade', low: 'Up to $4,000', moderate: 'Up to $4,000' },
  { item: 'Electrical wiring', low: 'Up to $2,500', moderate: 'Up to $2,500' },
  { item: 'Insulation, air sealing, ventilation', low: 'Up to $1,600', moderate: 'Up to $1,600' },
  { item: 'Maximum per household', low: '$14,000', moderate: '$7,000' },
];

const faqs = [
  {
    q: 'Is there a federal tax credit for a new air conditioner in 2026?',
    a: 'No. The Energy Efficient Home Improvement Credit (Section 25C), which paid 30% of the cost of a qualifying central air conditioner up to $600, does not apply to equipment placed in service after December 31, 2025. The One Big Beautiful Bill Act ended it seven years early, and no replacement credit was created.',
  },
  {
    q: 'Is there a federal tax credit for a heat pump in 2026?',
    a: 'No. The 25C heat pump credit (30%, up to $2,000) ended for heat pumps placed in service after December 31, 2025, and the 25D credit for geothermal heat pumps ended for installations completed after the same date. Low- and moderate-income households may still qualify for a state-run HEEHRA heat pump rebate of up to $8,000.',
  },
  {
    q: 'I paid a deposit in 2025 but the system was installed in 2026. Can I claim the credit?',
    a: 'Almost certainly not. What counts is when the equipment was placed in service or the installation was completed, not when you paid. A system finished in January 2026 does not qualify, even if it was paid for in 2025.',
  },
  {
    q: 'My system was installed in 2025. Can I still claim the credit?',
    a: 'Yes. If the installation was completed by December 31, 2025, claim it on your 2025 federal return using IRS Form 5695. The 25C credit cannot be carried forward to later years, but unused 25D credit for geothermal systems can be.',
  },
  {
    q: 'Does a central air conditioner qualify for HEEHRA rebates?',
    a: 'HEEHRA is an electrification program built around heat pumps, which heat and cool. A cooling-only central air conditioner is not a heat pump, so do not count on a HEEHRA rebate for one. Confirm with your state energy office before you buy.',
  },
  {
    q: 'Does ENERGY STAR certification still matter if the tax credit is gone?',
    a: 'Yes, mainly for utility rebates, which often require ENERGY STAR or a minimum SEER2 tier. The program is still running in 2026, with management moving from EPA to the Department of Energy. A split central AC needs at least 15.2 SEER2 and 12.0 EER2 to be ENERGY STAR certified.',
  },
];

const sources = [
  { label: 'IRS — FAQs on the accelerated termination of energy credits under P.L. 119-21 (Aug. 2025)', url: 'https://www.irs.gov/newsroom/treasury-irs-issue-faqs-to-address-the-accelerated-termination-of-several-energy-provisions-under-obbb' },
  { label: 'Congressional Research Service — Expiration and carryforward rules for the Residential Clean Energy Credit (IN12611)', url: 'https://www.everycrsreport.com/reports/IN12611.html' },
  { label: 'U.S. Department of Energy — 2023 central air conditioner and heat pump standards FAQ', url: 'https://www1.eere.energy.gov/buildings/appliance_standards/pdfs/2023_CAC_Standards_FAQ_10-5-2022_Final.pdf' },
  { label: 'ENERGY STAR — Rebate Finder', url: 'https://www.energystar.gov/rebate-finder' },
  { label: 'DSIRE — Database of State Incentives for Renewables & Efficiency', url: 'https://www.dsireusa.org' },
];

const th = 'border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-4 py-3 text-gray-700';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

export default function BlogArticleTaxCredits() {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="keywords" content="HVAC tax credit 2026, air conditioner tax credit, heat pump tax credit 2026, 25C credit ended, HEEHRA rebate, HVAC rebates 2026" />
        <link rel="canonical" href={`https://airconditionanswers.com${PATH}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://airconditionanswers.com${PATH}`} />
        <meta property="og:title" content="HVAC Tax Credits in 2026: The Federal Credit Ended. What's Left?" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content="https://airconditionanswers.com/og-image.png" />
        <meta property="article:author" content="https://airconditionanswers.com/about/mark-curant" />
        <meta property="article:section" content="Buying Guide" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HVAC Tax Credits in 2026: The Federal Credit Ended. What's Left?" />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd({ path: PATH, headline: HEADLINE, description: DESCRIPTION, dateModified: UPDATED }))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
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
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Buying Guide</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                8 min read
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              If a contractor is still promising you "30% back from the government," read this before you sign.
            </p>
            <ArticleByline updated={UPDATED} />
          </header>

          <section>
            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
              <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
              <p className="text-gray-800 leading-relaxed">
                <strong>There is no federal tax credit for an air conditioner or heat pump installed in 2026.</strong> The
                Energy Efficient Home Improvement Credit (Section 25C) paid 30% of the cost, up to $600 for a central AC
                and $2,000 for a heat pump. It ended for equipment placed in service after December 31, 2025, under the
                One Big Beautiful Bill Act (P.L. 119-21). What still pays in 2026: state-run HEEHRA rebates for heat
                pumps (income-qualified, up to $8,000), utility rebates, and manufacturer promotions.
              </p>
            </div>

            <p className={p}>
              For three years, the federal credit was the first line of every HVAC sales pitch. It was real money: a
              qualifying heat pump earned up to $2,000 back at tax time, and many contractors built the credit into
              their quotes. Then Congress ended it. The credit was originally scheduled to run through 2032; the
              budget law signed on July 4, 2025 cut it off at the end of 2025, and no replacement was created.
            </p>
            <p className={p}>
              That leaves a lot of out-of-date information on contractor websites, in sales scripts and in older
              articles (including an earlier version of this one). Here is what actually changed, what is still
              available, and how to tell when a quote is leaning on an incentive that no longer exists.
            </p>

            <h2 className={h2}>What changed: 2025 vs. 2026</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-teal-50">
                    <th className={th}>Incentive</th>
                    <th className={th}>Through Dec 31, 2025</th>
                    <th className={th}>Installed in 2026</th>
                  </tr>
                </thead>
                <tbody>
                  {changes.map((r) => (
                    <tr key={r.item}>
                      <td className={`${td} font-medium`}>{r.item}</td>
                      <td className={td}>{r.before}</td>
                      <td className={td}>{r.now}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={p}>
              Under 25C, all items except heat pumps shared a $1,200 annual cap, and heat pumps had their own $2,000
              cap, for a maximum of $3,200 a year. None of that applies to equipment installed in 2026.
            </p>

            <h2 className={h2}>The date that matters is installation, not payment</h2>
            <p className={p}>
              The 25C credit is gone for property <em>placed in service</em> after December 31, 2025. For the 25D
              credit (which covered geothermal heat pumps), the law says an expenditure is made when the original
              installation is completed. Either way, the test is when the system was installed and running, not
              when you signed or paid.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li><strong>Installed and running by Dec 31, 2025:</strong> claim it on your 2025 return with IRS Form 5695.</li>
              <li><strong>Paid in 2025, installed in 2026:</strong> does not qualify.</li>
              <li><strong>Leftover credit:</strong> 25C can't be carried forward. Unused 25D credit for a geothermal system installed by the deadline can be carried forward to later years.</li>
            </ul>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 my-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-2">Red flag: a quote that still counts a federal tax credit</p>
                  <p className="text-gray-700 leading-relaxed mb-0">
                    If a 2026 quote shows "after 30% federal tax credit" pricing, the real price is higher than the
                    number you're looking at. Ask the contractor to show the price with no federal credit, and to put
                    any rebate they're promising in writing with the program name. A contractor who is still selling
                    an expired credit is either out of date or counting on you not checking. Either is worth knowing
                    before you sign.
                  </p>
                </div>
              </div>
            </div>

            <h2 className={h2}>What's still available in 2026</h2>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">1. State heat pump rebates (HEEHRA)</h3>
            <p className={p}>
              The Home Electrification and Appliance Rebates program (HEEHRA) was funded by the 2022 Inflation
              Reduction Act and is run by state energy offices. It survived the end of the federal tax credits. It
              is a point-of-sale discount through an approved contractor, not a tax credit, and it is limited to
              households at or below 150% of area median income (AMI).
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-teal-50">
                    <th className={th}>Upgrade</th>
                    <th className={th}>Income ≤ 80% AMI</th>
                    <th className={th}>Income 80–150% AMI</th>
                  </tr>
                </thead>
                <tbody>
                  {heehra.map((r) => (
                    <tr key={r.item}>
                      <td className={`${td} font-medium`}>{r.item}</td>
                      <td className={td}>{r.low}</td>
                      <td className={td}>{r.moderate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 italic mb-4">
              Federal maximums. States can set lower amounts. Rebates are also capped at a share of project cost,
              typically 100% for lower-income and 50% for moderate-income households.
            </p>
            <p className={p}>
              <strong>Who has it:</strong> availability depends entirely on your state. More than 20 states had
              launched programs by mid-2026. California's single-family funding ran out in February 2026 and moved to
              a waitlist, and large states including Texas and Florida had not launched as of early 2026. Check your
              state energy office before you get quotes, because funds usually have to be reserved before
              installation.
            </p>
            <p className={p}>
              <strong>Central AC owners, note:</strong> HEEHRA is built around heat pumps. A cooling-only air
              conditioner is not a heat pump, so don't count on a HEEHRA rebate for one.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">2. HOMES whole-home rebates</h3>
            <p className={p}>
              The second IRA program, HOMES, pays based on the energy savings of a whole-home retrofit rather than a
              single piece of equipment. It is also state-run, and each state sets its own rules, so it's worth asking
              about if you're combining a new system with insulation and air sealing.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">3. Utility rebates</h3>
            <p className={p}>
              For most people buying a central AC in 2026, the electric utility is now the main source of incentive
              money. Programs vary widely: some pay per ton or by SEER2 tier, some only pay for heat pumps, and many
              require the unit to be ENERGY STAR certified or above a minimum SEER2. Look on your utility's website
              under "rebates" or "energy efficiency," or search by ZIP code in the{' '}
              <a href="https://www.energystar.gov/rebate-finder" target="_blank" rel="noopener noreferrer" className={a}>ENERGY STAR Rebate Finder</a>.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">4. Manufacturer and seasonal promotions</h3>
            <p className={p}>
              Manufacturers run rebates and financing offers, usually in spring and fall when installers are less
              busy. These are real but temporary, and they come off a price you should still compare across at least
              three quotes.
            </p>

            <h2 className={h2}>Does ENERGY STAR still matter?</h2>
            <p className={p}>
              Yes, though for a different reason than before. The federal credits used to require ENERGY STAR-level
              efficiency. Now it mostly matters for utility rebates. The program itself is still running in 2026: it
              was nearly eliminated in 2025, and in March 2026 primary management began moving from EPA to the
              Department of Energy.
            </p>
            <p className={p}>
              To be ENERGY STAR certified, a split central air conditioner needs at least <strong>15.2 SEER2 and 12.0
              EER2</strong>. That's well above the federal minimum of 13.4 SEER2 in northern states and 14.3 SEER2 in
              the Southeast and Southwest. See our{' '}
              <Link to="/blog/seer-vs-seer2-explained" className={a}>SEER vs. SEER2 guide</Link> for how the two
              rating systems compare.
            </p>

            <h2 className={h2}>What this means for your buying decision</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Judge efficiency on the electricity it saves.</strong> Without a federal credit, a high-SEER2
                system has to pay for itself through lower bills (and any utility rebate). At high electricity rates
                that's often easy; at low rates it may not be. Run your own numbers with the{' '}
                <Link to="/" className={a}>SEER savings calculator</Link>.
              </li>
              <li>
                <strong>The heat pump question changed.</strong> In 2025 a heat pump carried up to $1,400 more in
                federal credit than a central AC. That advantage is gone unless you qualify for a state HEEHRA
                rebate, in which case a heat pump can become the much cheaper option.
              </li>
              <li>
                <strong>Get the rebate in writing first.</strong> Utility and state rebates often require
                pre-approval, specific equipment or an approved contractor. Confirm before installation, not after.
              </li>
            </ul>

            <h2 className={h2}>Frequently asked questions</h2>
            <div className="space-y-6 mb-8">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>

            <h2 className={h2}>Sources</h2>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 mb-8">
              {sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">{s.label}</a>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 italic">
              This is general information, not tax advice. Incentive programs change; confirm current rules with the
              IRS, your state energy office and your utility before you buy.
            </p>

            <div className="mt-10 rounded-lg bg-gray-50 border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">See what efficiency is worth to you</h3>
              <p className="text-gray-700 mb-4">
                With the federal credit gone, the savings on your electric bill do the heavy lifting. Plug in your
                SEER rating, system size and electricity rate to see your annual savings and payback.
              </p>
              <Link to="/" className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                <Calculator className="w-5 h-5" />
                Calculate my savings
              </Link>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Related guides</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <Link to="/blog/ac-unit-cost-2026" className={a}>→ How much a new AC costs in 2026</Link>
                <Link to="/blog/seer-vs-seer2-explained" className={a}>→ SEER vs. SEER2 explained</Link>
                <Link to="/blog/ac-repair-cost-vs-replacement" className={a}>→ Repair or replace? The $5,000 rule</Link>
                <Link to="/blog/choosing-the-right-seer-rating" className={a}>→ Choosing the right SEER rating</Link>
              </div>
            </div>
          </section>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
