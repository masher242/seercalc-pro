import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, RotateCcw, RotateCw } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import FanSeries from '../components/FanSeries';
import { articleJsonLd, SITE_URL } from '../data/site';
import { FANS_UPDATED, DEGREES_RAISED } from '../data/fans';

const PATH = '/blog/ceiling-fan-direction';
const TITLE = 'Ceiling Fan Direction for Summer and Winter (and Speed)';
const HEADLINE = 'Which Way Should a Ceiling Fan Spin in Summer and Winter? Direction, Speed and Settings';

const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';
const ext = 'text-teal-700 hover:underline';

export default function BlogArticleFanDirection() {
  const description = 'Summer: counterclockwise (looking up) on a higher speed. Winter: clockwise on low. How to check yours, where the switch is, and the settings that save money.';

  const faqs = [
    {
      q: 'Which way should a ceiling fan turn in summer?',
      a: 'Counterclockwise, when you look up at it. The blades push air down, so you feel a breeze. Use a medium or high speed.',
    },
    {
      q: 'Which way should a ceiling fan turn in winter?',
      a: 'Clockwise, on low speed. The fan pulls air up and pushes the warm air that collects near the ceiling gently down the walls, without creating a chilly breeze.',
    },
    {
      q: 'How can I tell which way my ceiling fan is spinning?',
      a: 'Stand under it on a medium or high speed. If you feel a steady breeze, it\'s pushing air down (summer setting). If you feel little or nothing, it\'s pulling air up (winter setting). You can also watch the blades and see which way they pass overhead.',
    },
    {
      q: 'Where is the reverse switch on a ceiling fan?',
      a: 'On most standard fans it\'s a small slide switch on the motor housing, just above the blades. Turn the fan off and wait for it to stop before flipping it. Many DC-motor fans have no switch; the direction is a button on the remote or a setting in the app.',
    },
    {
      q: 'Should I leave my ceiling fan on all the time?',
      a: `No. Fans cool people, not rooms, so turn them off when you leave. When you're in the room, use the fan so you can set the thermostat about ${DEGREES_RAISED}°F higher; that's where the saving comes from.`,
    },
    {
      q: 'Does a ceiling fan help with the AC on?',
      a: `Yes, if you raise the thermostat. With a fan on, the U.S. Department of Energy says you can set the thermostat about ${DEGREES_RAISED}°F higher with no loss of comfort. Running fans without raising the setting only adds their cost.`,
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
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 4 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">The short answer, how to check yours, and the settings that actually save money.</p>
            <ArticleByline updated={FANS_UPDATED} />
          </header>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="rounded-lg border-2 border-teal-400 bg-teal-50 p-5">
              <p className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-1"><RotateCcw className="w-6 h-6 text-teal-600" /> Summer: counterclockwise</p>
              <p className="text-gray-700">Looking up at the fan. Medium or high speed. Pushes air down so you feel a breeze.</p>
            </div>
            <div className="rounded-lg border-2 border-orange-300 bg-orange-50 p-5">
              <p className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-1"><RotateCw className="w-6 h-6 text-orange-600" /> Winter: clockwise</p>
              <p className="text-gray-700">Low speed. Pulls air up and moves warm air from the ceiling down the walls, without a draft.</p>
            </div>
          </div>

          <FanSeries current={PATH} />

          <h2 className={h2}>How to check which way your fan is spinning</h2>
          <p className={p}>
            Stand directly under the fan on medium or high. A steady breeze on your face means it's pushing air down: the
            summer setting. Little or no breeze means it's pulling air up: the winter setting. If you're not sure, turn it
            off, flip the direction, and compare.
          </p>

          <h2 className={h2}>Where the switch is</h2>
          <p className={p}>
            On most standard fans, a small slide switch sits on the motor housing just above the blades. Turn the fan off and
            let it stop completely before you flip it. DC-motor fans often have no switch: use the reverse button on the remote
            or the setting in the app.
          </p>

          <h2 className={h2}>Speed and settings that save money</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Raise the thermostat.</strong> With the fan on, the Department of Energy says you can set it about {DEGREES_RAISED}°F higher without feeling warmer. This is the whole point of the fan.</li>
            <li><strong>Off when you leave.</strong> Fans cool people, not rooms; a fan in an empty room only costs money.</li>
            <li><strong>Use the lowest speed that feels comfortable.</strong> Power drops sharply on lower speeds.</li>
            <li><strong>Sleeping:</strong> a fan on low over the bed lets you set the thermostat higher overnight; a timer or schedule turns it off when you're up.</li>
            <li><strong>Mild days:</strong> use the fan instead of the AC. Every hour the AC stays off saves far more than the fan costs. See <Link to="/blog/ceiling-fan-vs-ac-savings" className={a}>ceiling fan vs. AC</Link>.</li>
          </ul>

          <h2 className={h2}>Does the winter setting really help?</h2>
          <p className={p}>
            Warm air rises, so in a heated room the ceiling can be noticeably warmer than where you sit, more so with high
            ceilings. Running the fan clockwise on low mixes that warm air back down without blowing a cold breeze on you. The
            effect is modest in a room with ordinary ceilings and biggest in rooms with high or vaulted ones.
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
            <li>Direction for summer and winter, raising the thermostat about {DEGREES_RAISED}°F, turning fans off in empty rooms: <a href="https://www.energy.gov/energysaver/fans-cooling" target="_blank" rel="noopener noreferrer" className={ext}>U.S. Department of Energy, Energy Saver: Fans for cooling</a>.</li>
          </ul>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
