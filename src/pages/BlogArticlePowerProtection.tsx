import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import { articleJsonLd, SITE_URL } from '../data/site';

const PATH = '/blog/protect-air-conditioner-power-surges-outages';
const TITLE = 'Protect Your AC From Surges, Brownouts & Outages';
const HEADLINE = 'How to Protect Your Air Conditioner from Power Surges, Brownouts and Outages';
const PUBLISHED = '2026-10-12';
const UPDATED = '2026-10-12';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700 align-top';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const h3 = 'text-lg font-bold text-gray-900 mt-6 mb-2';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';
const ext = 'text-teal-700 hover:underline';

const THREATS = [
  {
    threat: 'Surge or spike',
    what: 'A burst of high voltage lasting a fraction of a second: lightning nearby, utility switching, or power coming back after an outage.',
    damage: 'Control boards, thermostats, inverter drives on variable-speed systems.',
    fix: 'Surge protector (whole-house, at the outdoor unit, or both).',
  },
  {
    threat: 'Brownout (low voltage)',
    what: 'Voltage sags below normal for seconds to hours, common on overloaded or storm-damaged grids.',
    damage: 'Compressor and fan motors. They draw more current to compensate, overheat and burn out.',
    fix: 'Voltage monitor that disconnects the unit when voltage goes out of range. A surge protector alone does nothing here.',
  },
  {
    threat: 'Outage and restart',
    what: 'Power drops, then comes back, sometimes several times in a few minutes.',
    damage: 'Compressors restarting before pressures equalize, and every unit starting at once on a weak grid or generator.',
    fix: 'Delay-on-make timer on each unit; staggered restart times.',
  },
  {
    threat: 'Storm and flood',
    what: 'Lightning, flying debris, standing water around the outdoor unit.',
    damage: 'Everything electrical, plus physical damage to the condenser.',
    fix: 'Shut units off at the breaker before the storm; inspect before powering back up.',
  },
];

const DEVICES = [
  { device: 'Delay-on-make timer', protects: 'Rapid restarts after an outage; staggers units', cost: '$20–$60 part, plus a service call to install', note: 'Many thermostats and newer units have a delay built in. Check before buying one.' },
  { device: 'Voltage monitor / compressor protector (with surge protection)', protects: 'Brownouts, over-voltage and surges at the outdoor unit', cost: 'About $100–$250 part, plus installation', note: 'The most targeted protection for the compressor. Mounted at the condenser or its disconnect.' },
  { device: 'Whole-house surge protector (Type 2, or Type 1 + 2)', protects: 'Surges entering the building or created inside it', cost: 'About $500–$900 installed (Type 2); $750–$1,100 layered', note: 'Required on new and upgraded U.S. home services under NEC 230.67. Doesn\'t help with brownouts.' },
  { device: 'Hard-start kit', protects: 'Hard starting on weak voltage or an aging compressor', cost: '$30–$80 part, plus installation', note: 'Adds starting torque. Treats a symptom; ask why the compressor struggles.' },
  { device: 'Soft starter', protects: 'High starting current; lets a smaller generator run the AC; reduces light flicker', cost: 'A few hundred dollars, plus installation', note: 'Cuts starting current by up to 75% (manufacturer figure). Most useful with generators.' },
  { device: 'Generator with transfer switch', protects: 'Long outages', cost: 'Varies widely by size; get quotes', note: 'Must be sized for the AC\'s starting current, not just its running draw.' },
];

export default function BlogArticlePowerProtection() {
  const description =
    'Surges, brownouts and outages damage AC compressors and control boards in different ways, and a surge protector only stops one of them. What each device does, what it costs, and a hurricane checklist from an island business owner.';

  const faqs = [
    {
      q: 'Does a surge protector protect an air conditioner from brownouts?',
      a: 'No. A surge protector clamps short spikes of high voltage. A brownout is the opposite problem: voltage stays too low for seconds or hours, and the compressor motor overheats trying to run on it. For brownouts you need a voltage monitor that disconnects the unit when voltage drops out of range. Many compressor protectors combine both functions.',
    },
    {
      q: 'Should I turn off my AC during a power outage?',
      a: 'It\'s a good idea, especially if the power is flickering or the grid is unstable. Switch the system off at the thermostat (and at the breaker for long outages or storms), wait until power has been stable for several minutes, then turn units back on one at a time.',
    },
    {
      q: 'How long should I wait to turn the AC back on after a power outage?',
      a: 'At least 5 minutes after power returns, and longer if it has flickered on and off. The wait lets refrigerant pressures equalize so the compressor isn\'t starting against a heavy load, and gives the grid time to settle. A delay-on-make timer enforces the wait automatically.',
    },
    {
      q: 'Can a portable generator run central air conditioning?',
      a: 'Only if it\'s big enough for the compressor\'s starting current, which is several times its running draw. A soft starter can cut that starting current enough to let a smaller generator do the job. Any generator connected to a building\'s wiring needs a transfer switch or interlock installed by an electrician, and must run outdoors at least 20 feet from doors, windows and vents.',
    },
    {
      q: 'Should I turn off my AC breakers before a hurricane?',
      a: 'Yes. Turning units off at the thermostat and the breaker before the storm protects them from surges and lightning while the grid is unstable. Leave them off until the storm has passed, power is stable, and you\'ve checked the outdoor units for debris and water.',
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
        <meta property="article:section" content="HVAC Guides" />
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
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">HVAC Guides</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              Four different electrical problems, four different fixes, and a hurricane checklist.
            </p>
            <ArticleByline updated={UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              Bad power damages an air conditioner in four ways: <strong>surges</strong> (short spikes that kill control
              boards), <strong>brownouts</strong> (low voltage that overheats the compressor), <strong>rapid restarts</strong>{' '}
              after an outage, and <strong>storms</strong>. A surge protector only handles the first. For a compressor,
              the most useful single device is a <strong>voltage monitor with surge protection</strong> at the outdoor unit
              (about $100–$250 plus installation), backed by a <strong>delay-on-make timer</strong> so units don't restart
              the moment power returns. Before a hurricane, switch units off at the breaker.
            </p>
          </div>

          <p className={p}>
            I run several retail stores in the Caribbean. On an island grid, outages, flickers and brownouts aren't
            emergencies; they're part of a normal week, and a dead AC in a store means lost customers that afternoon. Here's
            what we actually do:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>
              <strong>Delayed starts on the condensers.</strong> When power comes back, our units don't all start at the same
              moment. Each waits its turn, so the compressors aren't fighting each other, or a weak grid, for starting current.
            </li>
            <li>
              <strong>Everything off before a hurricane.</strong> Before a storm, every unit is switched off and its breaker
              is turned off, so a surge or lightning strike on the line has nothing running to damage.
            </li>
            <li>
              <strong>Voltage protection on refrigeration.</strong> We've lost refrigerators and their compressors to
              brownouts, so that equipment now runs through appliance protectors that watch the voltage: when it drops, they
              cut power, and they wait a few minutes before reconnecting.
            </li>
          </ul>
          <p className={p}>
            The most important point below is one that's easy to miss: surges and brownouts are different problems, and
            the device that stops one doesn't stop the other.
          </p>

          <h2 className={h2}>The four ways bad power damages an AC</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Problem</th>
                  <th className={th}>What happens</th>
                  <th className={th}>What it damages</th>
                  <th className={th}>What protects against it</th>
                </tr>
              </thead>
              <tbody>
                {THREATS.map((t) => (
                  <tr key={t.threat}>
                    <td className={`${td} font-medium`}>{t.threat}</td>
                    <td className={td}>{t.what}</td>
                    <td className={td}>{t.damage}</td>
                    <td className={td}>{t.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className={h2}>Surge protector vs. voltage protector: not the same thing</h2>
          <p className={p}>
            A <strong>surge protector</strong> clamps voltage spikes that last a few millionths of a second. It's what you
            want against lightning nearby or the jolt when the utility switches lines. It's mostly the electronics (control
            boards, thermostats, the inverter in a variable-speed system) that die from surges.
          </p>
          <p className={p}>
            A <strong>brownout</strong> is the opposite: voltage that stays too low. A motor that's asked to do the same
            work on less voltage draws more current, and more current means heat. One HVAC company cites winding temperatures
            rising 10–15% for every 10% drop in voltage. Run a compressor like that for an afternoon, or start and stop it
            repeatedly on a sagging line, and the windings burn out. That's the expensive part: a compressor replacement
            typically runs <Link to="/blog/ac-repair-cost-2026" className={a}>$1,500–$3,000</Link>, often enough to make
            replacing the whole system the better deal.
          </p>
          <p className={p}>
            A surge protector does nothing about low voltage. What does is a <strong>voltage monitor</strong> (sold as
            compressor protectors, voltage protectors or brownout protectors): it watches the supply and disconnects the unit
            when voltage goes too low or too high, then waits until power has been normal for a few minutes before
            reconnecting. Many models include surge protection too, so one device at the outdoor unit covers both problems
            and adds a restart delay.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-5 mb-6 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed">
              <strong>What to look for on the box:</strong> <em>under-voltage</em> or <em>brownout</em> protection and a{' '}
              <em>restart delay</em>, not just a joule rating. That's what the protectors on our refrigeration do, and it's
              what a compressor needs. A plain surge strip won't cut power when voltage sags. The same goes for
              refrigerators, freezers, ice machines and anything else with a compressor.
            </p>
          </div>

          <h2 className={h2}>Delay timers: the cheapest protection there is</h2>
          <p className={p}>
            When an AC stops, the refrigerant is at high pressure on one side of the compressor and low on the other. It
            takes a few minutes to even out. If power drops and returns in seconds, the compressor tries to restart against
            that pressure difference, can stall, and draws locked-rotor current until its overload trips. Do that a few
            times during a flickering outage and it adds up.
          </p>
          <p className={p}>
            A <strong>delay-on-make timer</strong> holds the unit off for a set time (typically 3–5 minutes) after power
            returns. Set different delays on different units and they come back one after another instead of all at once,
            which is easier on the grid, on your building's wiring and, if you're on one, on your generator. Many
            thermostats and newer outdoor units already have a short delay built in, so check before adding one; for older
            equipment it's a small part and a quick job for a technician.
          </p>

          <h2 className={h2}>Hard-start kits and soft starters</h2>
          <p className={p}>
            These are often confused. A <strong>hard-start kit</strong> (an extra capacitor and relay) gives the compressor
            a stronger kick to get going. It helps an aging compressor or one on weak voltage start, but it treats a
            symptom: if a technician recommends one, ask why the compressor is struggling.
          </p>
          <p className={p}>
            A <strong>soft starter</strong> does the reverse: it ramps the compressor up gently, cutting the surge of
            current it pulls at start-up. Emerson says its SecureStart module reduces starting current by up to 75%. That
            means less light flicker, less strain on a weak supply, and, most usefully, the ability to run an AC from a
            smaller generator than it would otherwise need.
          </p>

          <h2 className={h2}>What each device costs</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Device</th>
                  <th className={th}>Protects against</th>
                  <th className={th}>Typical cost</th>
                  <th className={th}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {DEVICES.map((d) => (
                  <tr key={d.device}>
                    <td className={`${td} font-medium`}>{d.device}</td>
                    <td className={td}>{d.protects}</td>
                    <td className={td}>{d.cost}</td>
                    <td className={td}>{d.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 italic mb-4">
            Approximate U.S. prices. Installation labor varies by location; in the Caribbean, expect parts to cost more and
            to take longer to arrive, so stock spares.
          </p>
          <p className={p}>
            Set those against what they protect: a control board or contactor is a few hundred dollars to replace, a
            compressor $1,500–$3,000, and a whole system $5,000–$15,000. If your grid has regular brownouts, a $200 voltage
            protector on each outdoor unit is one of the best-value purchases you can make for your cooling.
          </p>

          <h2 className={h2}>What to protect first</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Frequent brownouts or flickering power:</strong> a voltage monitor with surge protection and restart delay at each outdoor unit.</li>
            <li><strong>Several units on one building:</strong> staggered delay timers so they don't restart together.</li>
            <li><strong>Lightning-prone area, or a new or upgraded electrical service:</strong> a whole-house surge protector at the panel.</li>
            <li><strong>Variable-speed (inverter) system:</strong> surge protection matters more, because there's more electronics to lose. See <Link to="/blog/16-vs-18-seer" className={a}>16 vs 18 SEER</Link> for the trade-offs of these systems.</li>
            <li><strong>Long outages and a generator:</strong> a soft starter, so the generator can actually start the AC.</li>
          </ol>

          <h2 className={h2}>Running AC on a generator</h2>
          <p className={p}>
            The common mistake is sizing a generator for the AC's running draw. A compressor's starting current, listed as
            LRA (locked-rotor amps) on the outdoor unit's nameplate, is several times higher than its running current, and
            the generator has to supply it for that first second or the unit won't start. Ask the installer to size the
            generator from the LRA of everything that will start on it, or add a soft starter to bring that number down.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>
              <strong>Use a transfer switch or interlock</strong> installed by a licensed electrician. Plugging a generator
              into the building's wiring without one can send power back onto the utility line, which can kill a line
              worker, and can wreck the generator when grid power returns.
            </li>
            <li>
              <strong>Run it outdoors, at least 20 feet from doors, windows and vents</strong>, and keep a battery-powered
              carbon monoxide alarm inside, as the{' '}
              <a href="https://www.cdc.gov/natural-disasters/psa-toolkit/prevent-carbon-monoxide-poisoning.html" target="_blank" rel="noopener noreferrer" className={ext}>CDC advises</a>.
              Never in a garage, even with the door open.
            </li>
            <li>
              <strong>Start loads one at a time</strong>, the largest first, and let each settle before starting the next.
            </li>
          </ul>

          <h2 className={h2}>Hurricane checklist for your AC</h2>
          <h3 className={h3}>Before the storm</h3>
          <ul className="list-disc pl-6 space-y-1.5 text-gray-700 mb-4">
            <li>Turn every unit off at the thermostat, then turn off its breaker or outdoor disconnect. This is what we do at every store.</li>
            <li>Clear loose items around the outdoor units: furniture, planters, branches, anything that can become a projectile.</li>
            <li>Check the condenser's tie-down straps or anchors. In hurricane zones, building codes often require them.</li>
            <li>Take photos of each unit and its nameplate for insurance.</li>
            <li>Don't wrap a running unit in a tarp; if you cover it, only once it's off, and remove the cover before restarting.</li>
          </ul>
          <h3 className={h3}>After the storm</h3>
          <ul className="list-disc pl-6 space-y-1.5 text-gray-700 mb-4">
            <li>Wait until the grid has been stable for a while. Power often comes back and drops again several times.</li>
            <li>Walk around each outdoor unit: debris inside, bent fins, a shifted pad, damaged wiring or refrigerant lines.</li>
            <li><strong>If the unit sat in floodwater, don't turn it on.</strong> Have a technician inspect the electrical components first.</li>
            <li>Turn breakers back on, then start units one at a time from the thermostat. Listen for grinding, buzzing or a unit that won't start.</li>
            <li>Check that the condensate drain is clear; storm debris and algae can block it and flood the indoor unit.</li>
          </ul>

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
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 mb-8">
            <li>
              Generator safety: <a href="https://www.cdc.gov/natural-disasters/psa-toolkit/prevent-carbon-monoxide-poisoning.html" target="_blank" rel="noopener noreferrer" className={ext}>CDC, Prevent Carbon Monoxide Poisoning</a>.
            </li>
            <li>
              Soft-starter current reduction: <a href="https://climate.emerson.com/en-ca/products/heating-and-air-conditioning/residential-electronics/compressor-electronics-for-residential-applications/securestart" target="_blank" rel="noopener noreferrer" className={ext}>Emerson (Copeland) SecureStart</a> (manufacturer figure).
            </li>
            <li>
              Whole-house surge protector costs and NEC 230.67: <a href="https://ajlongelectric.com/guides/whole-house-surge-protection-cost-guide" target="_blank" rel="noopener noreferrer" className={ext}>AJ Long Electric cost guide (2026)</a>.
            </li>
            <li>
              Low voltage and motor heating: <a href="https://charlesandhudson.com/how-to-protect-your-air-conditioner-from-voltage-drops-and-power-surges/" target="_blank" rel="noopener noreferrer" className={ext}>Charles &amp; Hudson</a>.
            </li>
            <li>Repair costs: our <Link to="/blog/ac-repair-cost-2026" className={ext}>AC repair cost guide</Link>. Device part prices are typical U.S. retail ranges.</li>
            <li>Electrical work on HVAC equipment and generators should be done by a licensed electrician or HVAC technician.</li>
          </ul>

          <div className="rounded-lg bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Protecting an old system, or replacing it?</h3>
            <p className="text-gray-700 mb-4">
              If your AC has already taken a few hits, compare the cost of a repair against a new, more efficient system.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/calculators/repair-vs-replace" className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                <Calculator className="w-5 h-5" />
                Repair vs. replace calculator
              </Link>
              <Link to="/ac-cost/caribbean" className="inline-flex items-center gap-2 border border-teal-600 text-teal-700 px-5 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
                AC running costs in the Caribbean
              </Link>
            </div>
          </div>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
