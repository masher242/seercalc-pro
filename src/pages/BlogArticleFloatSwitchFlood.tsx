import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Droplets } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import { articleJsonLd, SITE_URL } from '../data/site';
import { COST } from '../data/troubleshooting';

// Owner's story: claude/owner-anecdotes.md (item 1). Keep it to what the owner said.
const PATH = '/blog/ac-float-switch-flood';
const PUBLISHED = '2026-10-26';
const TITLE = 'AC Float Switch Failed? How Ours Flooded a Store Overnight';
const HEADLINE = 'The AC Leak That Flooded Our Store Overnight: Float Switches, Condensate Pumps and How to Test Them';

const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';
const ext = 'text-teal-700 hover:underline';
const th = 'text-left p-3 font-semibold text-gray-900 border-b border-gray-200';
const td = 'p-3 border-b border-gray-100 text-gray-700 align-top';

export default function BlogArticleFloatSwitchFlood() {
  const description = 'Our condensate pump failed and the float switch didn\'t shut the AC off. Over $1,000 of ceiling damage from a cheap part. What a float switch does, why it fails, and how to test yours.';

  const faqs = [
    {
      q: 'What does a float switch do on an air conditioner?',
      a: 'It watches for water backing up. A small float sits in the drain pan, the drain line or a secondary pan. If the drain clogs or the condensate pump fails, the water lifts the float, and the switch cuts the AC\'s control circuit so the unit stops making more water before it overflows.',
    },
    {
      q: 'How do I know if my AC float switch is bad?',
      a: 'Test it. With the AC cooling, lift the float by hand or pour water into the pan it sits in until the float rises. The unit (or at least the outdoor unit) should shut off within a minute or so. If it keeps running, the switch is stuck, failed, wired wrong or bypassed, and it needs fixing before you rely on it.',
    },
    {
      q: 'Will an AC run without a float switch?',
      a: 'Yes. That\'s the problem: a missing, disconnected or bypassed float switch doesn\'t stop the AC working, so nobody notices until the drain fails and there\'s nothing to shut the unit off. Never jumper a float switch out to get the AC running again; clear the drain instead.',
    },
    {
      q: 'Does a condensate pump have its own safety switch?',
      a: 'Many do. Pumps such as Little Giant\'s VCMA-20ULS include an overflow safety switch that can be wired to shut down the air conditioner or to an alarm. It only protects you if someone actually connected it, so check whether the switch wires on your pump go anywhere.',
    },
    {
      q: 'How often should I test the float switch?',
      a: 'Every time the unit is serviced, and every few months on units above a ceiling or anywhere a leak would do damage. It takes a couple of minutes. In hot, humid climates where the AC runs most of the year, check the drain and pump monthly.',
    },
    {
      q: 'Why did my AC turn off and there\'s water in the drain pan?',
      a: 'That\'s a float switch doing its job: the drain or pump has failed and the switch shut the system off before it overflowed. Clear the drain line or fix the pump, empty the pan, and the AC should restart.',
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
        <meta property="article:section" content="Maintenance" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd({ path: PATH, headline: HEADLINE, description, datePublished: PUBLISHED, dateModified: PUBLISHED }))}
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
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">Maintenance</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">A failed pump, a float switch that didn't do its job, and a ceiling that paid for both.</p>
            <ArticleByline updated={PUBLISHED} />
          </header>

          <div className="rounded-lg border-2 border-teal-400 bg-teal-50 p-5 mb-8">
            <p className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-2"><Droplets className="w-6 h-6 text-teal-600" /> The short version</p>
            <p className="text-gray-700 leading-relaxed">
              An air conditioner makes water, and a float switch is the part that shuts the AC off when that water can't
              get away. If it fails at the same time as the drain or condensate pump, nothing stops the unit, and the water
              ends up in your ceiling. Test the float switch whenever the unit is serviced: lift the float or fill the pan,
              and the AC should stop. It takes two minutes.
            </p>
          </div>

          <h2 className={h2}>What happened in our store</h2>
          <p className={p}>
            In one of our stores, the AC's condensate pump failed. That alone shouldn't have been a disaster, because the
            unit also has a float switch, wired separately from the pump, whose only job is to shut the AC off when water
            backs up. It failed too.
          </p>
          <p className={p}>
            So the AC kept running all night, making water with nowhere to go, and it came through the ceiling. Staff
            arrived in the morning to a store floor that was sopping wet. There were gallons of water to clear, and it took
            a long while. Repairing the drywall and repainting came to over $1,000, before counting the cleanup.
          </p>
          <p className={p}>
            The fix to the air conditioner itself was small: clean the condensate line and replace the float switch. The
            damage cost far more than the repair.
          </p>

          <h2 className={h2}>Where the water comes from, and where it's supposed to go</h2>
          <p className={p}>
            As warm, humid air passes over the cold indoor coil, moisture condenses on it, the same way a cold drink sweats.
            In a humid climate a single unit can make gallons a day. The water drips into a drain pan under the coil and
            leaves through a drain line, either by gravity to the outside or a floor drain, or, where the unit sits too low
            or too far from a drain, through a condensate pump: a small box with a reservoir that switches on and pumps the
            water away when it fills.
          </p>
          <p className={p}>Water backs up when something in that path stops working:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>The drain line clogs</strong> with algae and dirt. This is the most common cause, especially where the AC runs most of the year.</li>
            <li><strong>The condensate pump fails</strong>: the motor dies, its own float sticks, or the outlet tube blocks.</li>
            <li><strong>The coil freezes</strong> and then melts faster than the drain can carry the water away. See <Link to="/troubleshooting/ac-frozen-coil" className={a}>AC frozen up</Link>.</li>
          </ul>

          <h2 className={h2}>The safety net: what a float switch does</h2>
          <p className={p}>
            A float switch is a small float on a switch, mounted where backed-up water will reach it: in the main drain pan,
            in the drain line, or in a secondary pan under the unit. When the water rises, the float lifts and opens the
            switch, which breaks the low-voltage control circuit. The AC stops, so it stops making water. Depending on how it's
            wired, the whole system or just the outdoor unit shuts off. That's annoying, but it's the switch doing its job.
          </p>
          <p className={p}>
            Many condensate pumps also have a safety switch of their own. Little Giant's VCMA-20ULS, for example, comes with
            one that can be wired to shut the air conditioner down or to an alarm. But the pump's switch is part of the pump:
            if the pump is the thing that fails, you want a separate switch too, and that's how our unit was set up. The
            separate switch is the one that has to work.
          </p>
          <p className={p}>
            In the United States, the International Mechanical Code requires this kind of backup wherever an overflow could
            damage the building, which includes units above ceilings and in attics. The 2024 code lists four ways to do it:
            a secondary pan with its own drain to somewhere you'll see it, a separate overflow drain from the main pan, a
            secondary pan with a water-level switch that shuts the unit off, or a water-level switch in the main drain line
            or pan. Local codes vary, and older installations may have nothing at all.
          </p>

          <h2 className={h2}>Why float switches fail</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>The float sticks.</strong> The same algae and slime that clog drain lines can glue a float in place.</li>
            <li><strong>It's mounted where the water can't reach it,</strong> or the pan isn't level, so water overflows on one side before the float lifts.</li>
            <li><strong>It's not wired to anything,</strong> or it's wired so that it doesn't actually stop the unit.</li>
            <li><strong>Someone bypassed it.</strong> When a float switch keeps shutting the AC off, it's tempting to jumper it out to get the cooling back. That leaves the unit with no protection at all.</li>
            <li><strong>It's old.</strong> Contacts corrode and plastic floats crack. It's a cheap part, so replace it if it's doubtful.</li>
          </ul>
          <p className={p}>
            None of these show up while everything else is working. A float switch only gets tested when the drain or pump
            fails, unless you test it on purpose.
          </p>

          <h2 className={h2}>How to test a float switch and condensate pump</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-4">
            <li><strong>Find the switch.</strong> Look in or on the drain pan, on the drain line near the unit (often a small cylinder on a T-fitting), and in any secondary pan. Some units have more than one.</li>
            <li><strong>Turn the AC on to cool</strong> and wait until the outdoor unit is running.</li>
            <li><strong>Trip the switch.</strong> Lift the float gently by hand, or slowly pour water into the pan or fitting it sits in until the float rises.</li>
            <li><strong>Watch the unit.</strong> The outdoor unit (and often the indoor fan) should stop within a minute or so. If it keeps running, the switch isn't protecting you. Don't rely on it until a technician fixes or replaces it.</li>
            <li><strong>Reset.</strong> Lower the float or empty the water. The AC should restart after its usual delay.</li>
            <li><strong>Test the pump.</strong> Pour a cup or two of water into the pump's reservoir. It should switch on, empty the reservoir and switch off. Check that the outlet tube carries the water all the way to where it should go.</li>
          </ol>
          <p className={p}>
            Don't open electrical panels or pull wires to do this. Lifting the float and adding water are all you need. If a
            switch is missing, not wired or keeps tripping, that's a job for a technician.
          </p>

          <h2 className={h2}>The routine we'd recommend</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Clear the drain line regularly.</strong> Pour a cup of distilled white vinegar into the cleanout every month or two in the cooling season, monthly where the AC runs most of the year. Our <Link to="/troubleshooting/ac-leaking-water" className={a}>AC leaking water guide</Link> shows how to clear a clog.</li>
            <li><strong>Test the float switch and pump</strong> at every service visit, and ask the technician to show you. It takes two minutes.</li>
            <li><strong>Look in the secondary pan.</strong> Water there means the main drain is already backing up, even if nothing has leaked yet.</li>
            <li><strong>Pay most attention to units above ceilings.</strong> A unit in a closet leaks onto a floor; a unit above a ceiling leaks through it. A cheap battery water-leak alarm in the secondary pan or under the unit is extra warning if a switch ever fails.</li>
          </ul>

          <h2 className={h2}>What it costs</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full min-w-[520px] text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className={th}>What</th>
                  <th className={th}>Typical cost</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={td}>Clearing a clogged drain line</td><td className={td}>$10–$20 DIY (vinegar, wet/dry vacuum), {COST.drainClear} by a technician</td></tr>
                <tr><td className={td}>Replacing a condensate pump</td><td className={td}>{COST.condensatePump} installed</td></tr>
                <tr><td className={td}>A float switch (the part)</td><td className={td}>About $15–$75 for a basic switch</td></tr>
                <tr><td className={td}>A float switch installed, or a secondary pan retrofit</td><td className={td}>About $150–$550</td></tr>
                <tr><td className={td}>The water damage in our store (drywall repair and repainting)</td><td className={td}>Over $1,000, plus the cleanup</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            U.S. prices. Drain clearing and pump costs match our <Link to="/blog/ac-repair-cost-2026" className={a}>AC repair cost guide</Link>;
            float switch prices are PickComfort's May 2026 estimates. Our own figure is what we paid in the Caribbean.
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

          <h2 className={h2}>Related</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-8">
            <li><Link to="/troubleshooting/ac-leaking-water" className={a}>AC leaking water inside: causes and fixes</Link></li>
            <li><Link to="/troubleshooting/ac-not-turning-on" className={a}>AC won't turn on (a tripped float switch is one reason)</Link></li>
            <li><Link to="/troubleshooting/ac-frozen-coil" className={a}>AC frozen up</Link></li>
            <li><Link to="/troubleshooting" className={a}>All AC troubleshooting guides</Link></li>
          </ul>

          <h2 className={h2}>Sources</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 mb-4">
            <li>Secondary condensate protection where overflow could damage the building (2024 International Mechanical Code, Section 307.2.3): <a href="https://open-exam-prep.com/study-guides/icc-commercial-mechanical/listings-access-safety/condensate-protection" target="_blank" rel="noopener noreferrer" className={ext}>ICC commercial mechanical study guide: condensate protection</a>; <a href="https://www.warrenforensics.com/2021/05/20/the-condensate-system-an-important-item-in-routine-hvac-maintenance/" target="_blank" rel="noopener noreferrer" className={ext}>Warren Forensics: the condensate system</a>.</li>
            <li>Condensate pump safety switch that can shut down the AC or trigger an alarm: <a href="https://www.supplyhouse.com/Little-Giant-554425-VCMA-20ULS-80-GPH-Automatic-Condensate-Removal-Pump-w-Safety-Switch-14724000-p" target="_blank" rel="noopener noreferrer" className={ext}>Little Giant VCMA-20ULS product listing (SupplyHouse)</a>.</li>
            <li>Float switch part and installation prices (publisher's estimates, May 2026): <a href="https://www.pickcomfort.com/ac-float-switch-installation-cost-typical-pricing/" target="_blank" rel="noopener noreferrer" className={ext}>PickComfort: AC float switch installation cost</a>.</li>
            <li>Our store flood: our own experience and repair bill.</li>
          </ul>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
