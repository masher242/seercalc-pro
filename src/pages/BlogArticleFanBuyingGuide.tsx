import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import FanSeries from '../components/FanSeries';
import { articleJsonLd, SITE_URL } from '../data/site';
import { US_RATE, usd, cents } from '../data/acCost';
import { FANS_UPDATED, fanType, SIZING, FAN_MONTH_HOURS } from '../data/fans';

const PATH = '/blog/ceiling-fan-buying-guide';
const TITLE = 'Ceiling Fan Buying Guide: Size, Motor, Efficiency';
const HEADLINE = 'Ceiling Fan Buying Guide: Size, Motor, Efficiency and Where It Goes';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700 align-top';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const h3 = 'text-lg font-bold text-gray-900 mt-6 mb-2';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';
const ext = 'text-teal-700 hover:underline';

const CHECKLIST = [
  'Blade span to suit the room (table below)',
  'A DC motor if you\'ll run it many hours',
  'Airflow efficiency (CFM per watt) from the EnergyGuide label; higher is better',
  'ENERGY STAR certification',
  'The right location rating: dry, damp or wet',
  'Enough height: blades at least 7 ft above the floor',
  'A remote or wall control that makes it easy to switch off',
  'A fan-rated ceiling box (check before you buy)',
];

const RATINGS = [
  { rating: 'Dry-rated', where: 'Indoor rooms: bedrooms, living rooms, kitchens', notes: 'Most fans. Not for anywhere moisture reaches the fan.' },
  { rating: 'Damp-rated', where: 'Covered porches and patios, bathrooms, sunrooms', notes: 'Handles humidity and condensation, but not direct rain or spray.' },
  { rating: 'Wet-rated', where: 'Open pergolas, uncovered decks, poolsides, coastal homes', notes: 'Sealed motor and weather-resistant blades. The choice near the ocean, where salt air corrodes ordinary fans.' },
];

export default function BlogArticleFanBuyingGuide() {
  const std = fanType('ac-ceiling');
  const dc = fanType('dc-ceiling');
  const yearHours = FAN_MONTH_HOURS * 6;
  const yearlyGap = ((std.watts - dc.watts) / 1000) * yearHours * US_RATE;
  const description = 'How to choose a ceiling fan: blade size by room, DC vs standard motors, the EnergyGuide label (CFM per watt), ENERGY STAR, damp and wet ratings, and mounting height.';

  const faqs = [
    {
      q: 'What size ceiling fan do I need?',
      a: 'The U.S. Department of Energy suggests a 36- or 44-inch fan for rooms up to about 225 square feet, and 52 inches or larger for bigger rooms. Rooms longer than about 18 feet usually need two fans.',
    },
    {
      q: 'Are DC ceiling fans worth it?',
      a: `Usually, if the fan runs many hours. A DC motor typically uses about half the power of a standard motor on high, and far less on low, and it tends to be quieter with more speeds. At U.S. average rates the difference is about ${usd(yearlyGap)} a year per fan for 8 hours a day over six warm months; more where power is expensive or fans run most of the year.`,
    },
    {
      q: 'How do I compare ceiling fan efficiency?',
      a: 'Look at the yellow EnergyGuide label on the box. It shows airflow in cubic feet per minute (CFM), power in watts, and airflow efficiency in CFM per watt. Higher CFM per watt means more air for the same electricity. ENERGY STAR certified fans are, on average, up to 40% more efficient than conventional models, according to the Department of Energy.',
    },
    {
      q: 'How high should a ceiling fan be?',
      a: 'The Department of Energy recommends blades 7 to 9 feet above the floor and 10 to 12 inches below the ceiling (never closer than 8 inches), with at least 18 inches between the blade tips and the walls. Ceiling fans suit rooms with ceilings at least 8 feet high.',
    },
    {
      q: 'What ceiling fan should I buy for a porch or a home near the ocean?',
      a: 'A damp-rated fan for a covered porch, and a wet-rated fan anywhere rain, spray or salt air reaches it. Near the coast, look for sealed motors, rust-resistant hardware and blades made for outdoor use.',
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
              The features that change how cool you feel and what you pay, and the ones that are just style.
            </p>
            <ArticleByline updated={FANS_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              Match the blade span to the room (36–44 inches up to about 225 sq ft, 52 inches or more above that), mount the
              blades 7–9 feet above the floor, and compare <strong>airflow per watt (CFM/W)</strong> on the yellow EnergyGuide
              label rather than the advertised airflow alone. A <strong>DC motor</strong> uses about half the power of a
              standard one and is quieter. For porches and anywhere near the sea, buy a <strong>damp- or wet-rated</strong>{' '}
              fan.
            </p>
          </div>

          <p className={p}>
            We have ceiling fans at home and they make a huge difference, so this is the guide I'd want before replacing one.
            It's about what to look for, not a list of products: the site doesn't take payment for recommendations, and the
            right fan depends on your room.
          </p>

          <FanSeries current={PATH} />

          <h2 className={h2}>The checklist</h2>
          <ul className="space-y-2 mb-6">
            {CHECKLIST.map((c) => (
              <li key={c} className="flex gap-2 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <h2 className={h2}>1. Size: blade span by room</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Room</th>
                  <th className={th}>Fan</th>
                </tr>
              </thead>
              <tbody>
                {SIZING.map((s) => (
                  <tr key={s.room}>
                    <td className={td}>{s.room}</td>
                    <td className={`${td} font-medium`}>{s.fan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>
            Guidance from the Department of Energy. Smaller and medium fans cool an area about 4 to 6 feet around them;
            larger fans reach about 10 feet. Larger blades also move air more gently at the same airflow, which is nicer
            over a bed or a desk with papers on it. In a long or open-plan room, two fans over the places people sit beat one
            big fan in the middle.
          </p>

          <h2 className={h2}>2. Motor: DC or standard</h2>
          <p className={p}>
            Most fans use a standard AC motor. DC (brushless) motors cost more but use much less power: about {dc.range} for a
            typical DC fan, against {std.range} for a standard one. They usually also offer more speeds, run quieter and
            reverse direction from the remote.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}></th>
                  <th className={th}>Standard (AC) motor</th>
                  <th className={th}>DC motor</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={`${td} font-medium`}>Power on high</td><td className={td}>{std.range}</td><td className={td}>{dc.range}</td></tr>
                <tr><td className={`${td} font-medium`}>Cost per hour at {cents(US_RATE)}/kWh</td><td className={td}>{cents((std.watts / 1000) * US_RATE)}</td><td className={td}>{cents((dc.watts / 1000) * US_RATE)}</td></tr>
                <tr><td className={`${td} font-medium`}>Speeds</td><td className={td}>Usually 3</td><td className={td}>Often 5–6</td></tr>
                <tr><td className={`${td} font-medium`}>Noise</td><td className={td}>Can hum, especially on cheaper models</td><td className={td}>Usually quieter</td></tr>
                <tr><td className={`${td} font-medium`}>Control</td><td className={td}>Pull chain, wall control or remote</td><td className={td}>Remote or wall control, often app</td></tr>
                <tr><td className={`${td} font-medium`}>Repairs</td><td className={td}>Simple; generic parts</td><td className={td}>Uses a control board; parts usually from the maker</td></tr>
              </tbody>
            </table>
          </div>
          <p className={p}>
            Is the higher price worth it? Running one fan 8 hours a day for six warm months, a DC motor saves about{' '}
            {usd(yearlyGap)} a year at U.S. average rates. That's small in a mild climate. It's more where fans run most of the
            year and power is expensive, as in the Caribbean, and the quieter running and extra speeds matter in a bedroom
            anyway. If the price gap is small, take the DC model. Running costs for your area are in{' '}
            <Link to="/blog/cost-to-run-a-fan" className={a}>how much it costs to run a fan</Link>.
          </p>

          <h2 className={h2}>3. Efficiency: read the EnergyGuide label</h2>
          <p className={p}>
            New ceiling fans sold in the U.S. come with a yellow EnergyGuide label on the box. It shows three numbers worth
            comparing:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Airflow (CFM):</strong> how much air the fan moves on high. More airflow means a stronger breeze.</li>
            <li><strong>Energy use (watts):</strong> power on high, without the lights.</li>
            <li><strong>Airflow efficiency (CFM per watt):</strong> airflow divided by power. This is the number to compare: higher means more breeze for the same electricity.</li>
          </ul>
          <p className={p}>
            The label also shows an estimated yearly cost, based on 12¢ per kWh and 6.4 hours a day. If you pay more, or run
            the fan longer, your cost will be higher. Two examples show how wide the range is: one fan's label shows 44 W and
            106 CFM per watt, while an ENERGY STAR-listed 44" fan draws 17.6 W on high with an efficiency rating of about 263
            CFM per watt.
          </p>
          <p className={p}>
            <strong>ENERGY STAR</strong> certified fans are, on average, up to 40% more efficient than conventional models,
            according to the Department of Energy. You can search certified models in the{' '}
            <a href="https://www.energystar.gov/productfinder/product/certified-ceiling-fans/results" target="_blank" rel="noopener noreferrer" className={ext}>ENERGY STAR product finder</a>.
          </p>

          <h2 className={h2}>4. Location rating: dry, damp or wet</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Rating</th>
                  <th className={th}>Where</th>
                  <th className={th}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {RATINGS.map((r) => (
                  <tr key={r.rating}>
                    <td className={`${td} font-medium`}>{r.rating}</td>
                    <td className={td}>{r.where}</td>
                    <td className={td}>{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>
            In coastal and island homes, salt air is hard on anything metal outdoors. A wet-rated fan with sealed housing and
            rust-resistant hardware lasts much longer on a porch than an indoor fan, and even indoors near the sea a fan with
            better-protected hardware is worth considering.
          </p>

          <h2 className={h2}>5. Height and placement</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Blades <strong>7 to 9 feet above the floor</strong>; ceiling fans suit rooms with ceilings at least 8 feet high.</li>
            <li>Blades <strong>10 to 12 inches below the ceiling</strong>, and never closer than 8 inches, or airflow suffers.</li>
            <li>At least <strong>18 inches</strong> from the blade tips to any wall.</li>
            <li>On a high or sloped ceiling, a longer downrod brings the fan down to the right height; use the angled-ceiling kit the maker specifies.</li>
            <li>For a low ceiling, a flush-mount ("hugger") fan keeps blades at a safe height, though it moves less air.</li>
          </ul>
          <p className={p}>All of this is Department of Energy guidance; your fan's manual has the exact limits for that model.</p>

          <h2 className={h2}>6. Controls, lights and installation</h2>
          <h3 className={h3}>Controls</h3>
          <p className={p}>
            The cheapest feature with the biggest effect on your bill is one that makes the fan easy to turn off. A wall
            control or remote beats a pull chain; a timer or app schedule is better still for bedrooms. Fans cool people, not
            rooms, so a fan nobody switches off wastes money.
          </p>
          <h3 className={h3}>Lights</h3>
          <p className={p}>
            Most fan lights are now LED. An integrated LED kit lasts a long time but can't be swapped for a brighter or warmer
            bulb; replaceable LED bulbs give you that choice.
          </p>
          <h3 className={h3}>Installation</h3>
          <p className={p}>
            A ceiling fan must hang from an electrical box rated to support a fan, not an ordinary light-fixture box. If you're
            replacing a light, check the box first, and use an electrician if you're not sure or new wiring is needed.
          </p>

          <h2 className={h2}>Once it's up</h2>
          <p className={p}>
            Set it to spin counterclockwise in summer (looking up) and raise your thermostat a few degrees. That's where the
            saving comes from. See <Link to="/blog/ceiling-fan-direction" className={a}>ceiling fan direction and settings</Link>{' '}
            and <Link to="/blog/ceiling-fan-vs-ac-savings" className={a}>how much a ceiling fan saves</Link>.
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
            <li>Sizing, height, clearances, ENERGY STAR efficiency: <a href="https://www.energy.gov/energysaver/fans-cooling" target="_blank" rel="noopener noreferrer" className={ext}>U.S. Department of Energy, Energy Saver: Fans for cooling</a>.</li>
            <li>EnergyGuide label example (44 W, 106 CFM/W, 12¢/kWh, 6.4 hours a day): <a href="https://hubbellcdn.com/EnergyGuide/PROG_FTC%20label%20P2574_energyguide.pdf" target="_blank" rel="noopener noreferrer" className={ext}>manufacturer EnergyGuide label</a>. ENERGY STAR-listed 44" fan (17.6 W high, 2.7 W low, 262.7 CFM/W): <a href="https://www.energystar.gov/productfinder/product/certified-ceiling-fans/details/4512547/export/pdf" target="_blank" rel="noopener noreferrer" className={ext}>ENERGY STAR product finder</a>.</li>
            <li>Standard and DC motor power: typical ranges from published watt-meter tests; check the label on any fan you're considering.</li>
          </ul>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
