import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import FanSeries from '../components/FanSeries';
import { articleJsonLd, SITE_URL } from '../data/site';
import { FANS_UPDATED } from '../data/fans';

const PATH = '/blog/home-airflow-fans';
const TITLE = 'Home Airflow: AC Fan Setting, Vents, Whole-House Fans';
const HEADLINE = 'Fans and Airflow in Your Home: The AC Fan Setting, Closed Vents, Hot Rooms and Whole-House Fans';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700 align-top';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const h3 = 'text-lg font-bold text-gray-900 mt-6 mb-2';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';
const ext = 'text-teal-700 hover:underline';

const FAN_KINDS = [
  { kind: 'Ceiling fan', what: 'Moves air over people in one room', when: 'Whenever someone is in the room; lets you raise the thermostat', climate: 'Everywhere' },
  { kind: 'AC fan set to "On"', what: 'Runs the AC\'s indoor blower nonstop', when: 'Rarely; can raise humidity', climate: 'Avoid in humid climates' },
  { kind: 'Window fan', what: 'Pulls cool outdoor air through the house', when: 'When it\'s cooler outside than in, e.g. evenings', climate: 'Mild nights; less useful when it\'s humid' },
  { kind: 'Whole-house fan', what: 'Pulls outdoor air in through windows and out through the attic', when: 'Evenings and nights cooler than indoors, AC off', climate: 'Dry climates with cool nights' },
  { kind: 'Powered attic fan', what: 'Exhausts hot air from the attic', when: 'Generally not recommended', climate: 'Rarely pays off anywhere' },
];

export default function BlogArticleHomeAirflow() {
  const description = 'Why the AC\'s "fan On" setting can raise humidity, why closing vents backfires, fixing hot rooms, and when window and whole-house fans work. Attic fans rarely pay off.';

  const faqs = [
    {
      q: 'Should I set my thermostat fan to On or Auto?',
      a: 'Auto, for most homes. On "On", the indoor blower runs nonstop, and after each cooling cycle it blows across the wet coil and puts moisture back into the house. In one test by building scientist Allison Bailes in his own home, switching from Auto to On raised indoor humidity from about 58% to about 70%. It also uses more electricity.',
    },
    {
      q: 'Does closing vents in unused rooms save energy?',
      a: 'No. A Lawrence Berkeley National Laboratory study found that closing registers increased energy use in typical houses with ducts outside the living space, because higher duct pressure makes the ducts leak more. Closing many vents can also freeze the AC coil. Leave them open.',
    },
    {
      q: 'Do whole-house fans work?',
      a: 'In the right climate, very well. They work best where summer nights fall below about 67°F with a big day-to-night temperature swing, typically dry regions. They should only run when it\'s cooler outside than inside, with the AC off and windows open. In hot, humid climates they bring in muggy air and are a poor fit.',
    },
    {
      q: 'Are attic fans worth it?',
      a: 'Usually not. Research from the Florida Solar Energy Center found powered attic ventilators generally cost more to run than they save in cooling, and they can pull cooled air from the house up into the attic through ceiling gaps. Sealing and insulating the attic floor does more.',
    },
    {
      q: 'Why is one room always hotter than the rest of the house?',
      a: 'Common causes are too little supply air reaching it (a long or leaky duct run, a crushed flex duct, a partly closed damper), no easy way for air to get back out when the door is closed, extra sun on windows, or being over a garage or under a hot attic. A ceiling fan helps the people in the room; fixing the airflow fixes the room.',
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
              Moving air is cheap. Moving it the wrong way costs money. The airflow habits worth changing.
            </p>
            <ArticleByline updated={FANS_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-800">
              <li>Set the thermostat fan to <strong>Auto</strong>, not On. "On" can put moisture back into the house.</li>
              <li><strong>Don't close vents</strong> in unused rooms. It increases energy use and can freeze the coil.</li>
              <li><strong>Ceiling fans</strong> cool people; use them to raise the thermostat, and switch them off when you leave.</li>
              <li><strong>Window and whole-house fans</strong> work when it's cooler outside than in, best in dry climates with cool nights; not in hot, humid ones.</li>
              <li><strong>Powered attic fans</strong> usually cost more to run than they save.</li>
            </ul>
          </div>

          <FanSeries current={PATH} />

          <h2 className={h2}>Five kinds of fan, five different jobs</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm min-w-[620px]">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Fan</th>
                  <th className={th}>What it does</th>
                  <th className={th}>When to use it</th>
                  <th className={th}>Climate</th>
                </tr>
              </thead>
              <tbody>
                {FAN_KINDS.map((f) => (
                  <tr key={f.kind}>
                    <td className={`${td} font-medium`}>{f.kind}</td>
                    <td className={td}>{f.what}</td>
                    <td className={td}>{f.when}</td>
                    <td className={td}>{f.climate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className={h2}>Your AC's fan: Auto, not On</h2>
          <p className={p}>
            The "Fan" switch on your thermostat controls the indoor blower in the air handler or furnace, a much bigger motor
            than a ceiling fan. On <strong>Auto</strong> it runs only while the AC is cooling. On <strong>On</strong> it runs
            all the time.
          </p>
          <p className={p}>
            That matters for humidity. While the AC runs, water condenses on the cold indoor coil and drains away. When the
            compressor stops, the coil is still wet. With the fan on Auto, it stops too and the water drains. With the fan on
            On, air keeps blowing across the wet coil and carries that moisture straight back into the house. In one test by
            building scientist Allison Bailes in his own home, switching from Auto to On raised indoor humidity from about 58%
            to about 70%, the level where mold starts to thrive.
          </p>
          <p className={p}>
            "On" also costs more, because the blower runs 24 hours a day. There are reasons to use it (some homes use it to
            even out temperatures or run a filter), but in a humid climate, Auto is the safe default. If your house feels
            clammy, see <Link to="/troubleshooting/ac-high-humidity" className={a}>house humid with the AC on</Link>.
          </p>

          <h2 className={h2}>Don't close vents to save energy</h2>
          <p className={p}>
            It seems logical: close the vents in rooms you don't use and cool less house. But a central system is designed to
            push a set amount of air. Close vents and the pressure in the ducts rises, so more air leaks out of the ducts,
            often into an attic or crawlspace. A{' '}
            <a href="https://eta.lbl.gov/publications/register-closing-effects-forced-air" target="_blank" rel="noopener noreferrer" className={ext}>Lawrence Berkeley National Laboratory study</a>{' '}
            found that closing registers increased energy use in typical houses with ducts outside the living space, and
            recommended against it. Closing more than about 60% of registers can even freeze the cooling coil.
          </p>
          <p className={p}>
            If you must close one, close the vent farthest from the indoor unit; that does the least harm. Better still,
            leave them open and use a thermostat schedule. If the coil does freeze, see{' '}
            <Link to="/troubleshooting/ac-frozen-coil" className={a}>AC frozen up</Link>.
          </p>

          <h2 className={h2}>Fixing a room that's always hot</h2>
          <h3 className={h3}>Check the supply</h3>
          <p className={p}>
            Hold your hand to the vent with the AC running. Weak airflow compared with other rooms points to a long or leaky
            duct run, a crushed or disconnected flex duct in the attic, or a balancing damper partly closed. A technician can
            check and seal ducts; sealing leaky ducts typically costs $500–$2,000.
          </p>
          <h3 className={h3}>Give the air a way out</h3>
          <p className={p}>
            Many homes have one central return. When a bedroom door is closed, the air pushed in has no easy way back, so less
            cool air goes in. If the room cools better with the door open, the fix is a return path: a larger gap under the
            door, a transfer grille, or a jumper duct to the hallway.
          </p>
          <h3 className={h3}>Cut the heat coming in</h3>
          <p className={p}>
            Sun on west-facing windows, a room over a garage, or one under a hot attic gains more heat than the rest of the
            house. Blinds or shades, window film, and attic insulation help more than anything you do to the AC. A ceiling fan
            then makes the people in the room comfortable at a higher setting.
          </p>

          <h2 className={h2}>Window fans and whole-house fans</h2>
          <p className={p}>
            These fans don't cool you with a breeze; they replace hot indoor air with cooler outdoor air. That only works when
            it's actually cooler outside, so they're for evenings, nights and mild seasons, with the AC off and windows open.
          </p>
          <h3 className={h3}>Window fans</h3>
          <p className={p}>
            The Department of Energy suggests putting a fan in a window to blow hot air out, ideally upstairs and on the side
            away from the wind, and opening windows on the cooler, shaded side, ideally downstairs, so fresh air is drawn
            through the house.
          </p>
          <h3 className={h3}>Whole-house fans</h3>
          <p className={p}>
            A whole-house fan is mounted in the ceiling and pulls air through open windows and out through the attic,
            changing the air in the whole house quickly. Guidance from the Department of Energy's Building America program
            says they suit climates where summer nights fall below about 67°F with a day-to-night swing of 25°F or more,
            typically dry regions. Before installing one:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Only run it when it's cooler outside</strong> than inside, and never with the AC running.</li>
            <li><strong>Open windows first.</strong> Running it against closed windows can pull exhaust from gas appliances back into the house; homes with a standing pilot light or gas appliances that draw room air need special care.</li>
            <li><strong>The attic needs enough vents</strong> (about 1 square foot of free vent area per 750 CFM) or hot attic air gets pushed back into the house.</li>
            <li><strong>Get an insulated, sealed cover</strong> so it doesn't leak air in winter.</li>
          </ul>
          <h3 className={h3}>In humid climates</h3>
          <p className={p}>
            Where nights stay warm and muggy, as in Florida, along the Gulf Coast and across the Caribbean, outdoor air rarely
            gets cool and dry enough to help. A whole-house fan would bring in moisture the AC then has to remove. There,
            ceiling fans with the AC are the better combination.
          </p>

          <h2 className={h2}>Powered attic fans: usually skip them</h2>
          <p className={p}>
            An attic fan on the roof or gable exhausts hot attic air. It sounds sensible, but research from the Florida Solar
            Energy Center found these fans generally cost more to run than they save in cooling. They can also pull cooled air
            out of the house through gaps in the ceiling. Sealing air leaks in the attic floor and adding insulation does more
            for less.
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

          <h2 className={h2}>Sources</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 mb-4">
            <li>Fan On vs Auto humidity test: <a href="https://www.energyvanguard.com/blog/this-thermostat-setting-can-cost-you-money-and-make-you-sick/" target="_blank" rel="noopener noreferrer" className={ext}>Allison Bailes, Energy Vanguard</a>.</li>
            <li>Closing registers: <a href="https://eta.lbl.gov/publications/register-closing-effects-forced-air" target="_blank" rel="noopener noreferrer" className={ext}>Walker, Register Closing Effects on Forced Air Heating System Performance, Lawrence Berkeley National Laboratory, 2003</a>.</li>
            <li>Whole-house fans: <a href="https://basc.pnnl.gov/resource-guides/whole-house-fans" target="_blank" rel="noopener noreferrer" className={ext}>DOE Building America Solution Center</a>.</li>
            <li>Window fans and ceiling fans: <a href="https://www.energy.gov/energysaver/fans-cooling" target="_blank" rel="noopener noreferrer" className={ext}>U.S. Department of Energy, Energy Saver</a>.</li>
            <li>Attic fans: <a href="https://www.greenbuildingadvisor.com/article/fans-in-the-attic-do-they-help-or-do-they-hurt" target="_blank" rel="noopener noreferrer" className={ext}>Green Building Advisor</a>, citing Florida Solar Energy Center research.</li>
            <li>Duct sealing cost: our <Link to="/blog/ac-repair-cost-2026" className={ext}>AC repair cost guide</Link>.</li>
          </ul>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
