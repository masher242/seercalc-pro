import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldAlert, CheckCircle2, Thermometer, Power, Droplets, ArrowRight, Repeat, Volume2, AirVent, Snowflake } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import { articleJsonLd, SITE_URL, SITE_EMAIL } from '../data/site';
import { SYMPTOMS, GROUPS, TROUBLESHOOTING_UPDATED, COST, GroupId } from '../data/troubleshooting';

const PATH = '/troubleshooting';
const TITLE = 'AC Troubleshooting: Fix Common Air Conditioner Problems';
const HEADLINE = 'AC Troubleshooting: What\'s Wrong With Your Air Conditioner?';
const DESCRIPTION = 'Pick your symptom: warm air, won\'t turn on, short cycling, noises, smells, leaks, humidity, mini-split codes, heat pumps in winter. Free checks first, likely causes and repair costs.';

const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

const GROUP_ICON: Record<GroupId, typeof Thermometer> = {
  'not-cooling': Thermometer,
  'wont-run': Power,
  cycling: Repeat,
  'water-ice': Droplets,
  'noise-smell': Volume2,
  'mini-split': AirVent,
  'heat-pump': Snowflake,
};

export default function TroubleshootingHub() {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}${PATH}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${SITE_URL}${PATH}`} />
        <meta property="og:title" content={HEADLINE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd({ path: PATH, headline: HEADLINE, description: DESCRIPTION, dateModified: TROUBLESHOOTING_UPDATED }))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Air conditioner problems',
            itemListElement: SYMPTOMS.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: `${SITE_URL}/troubleshooting/${s.slug}` })),
          })}
        </script>
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{HEADLINE}</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Pick the symptom. Each page starts with the free checks that fix a surprising number of problems, then the
            likely causes, what each repair typically costs, and how to tell a fair quote from an inflated one.
          </p>
          <ArticleByline updated={TROUBLESHOOTING_UPDATED} />
        </header>

        <div className="space-y-8 mb-10">
          {GROUPS.map((g) => {
            const Icon = GROUP_ICON[g.id];
            const items = SYMPTOMS.filter((s) => s.group === g.id);
            if (!items.length) return null;
            return (
              <section key={g.id} aria-labelledby={`g-${g.id}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-5 h-5 text-teal-600" />
                  <h2 id={`g-${g.id}`} className="text-xl font-bold text-gray-900">{g.name}</h2>
                </div>
                <p className="text-sm text-gray-600 mb-3">{g.blurb}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/troubleshooting/${s.slug}`}
                      className="group rounded-lg border border-gray-200 bg-white p-4 hover:border-teal-400 hover:shadow-md transition-all"
                    >
                      <p className="font-semibold text-gray-900 group-hover:text-teal-700 flex items-center justify-between gap-2">
                        {s.name}
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 flex-shrink-0" />
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{s.summary}</p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start here: three checks that fix most problems</h2>
          <ul className="space-y-3 mb-6">
            {[
              { t: 'The thermostat.', d: 'Mode on Cool, fan on Auto, set a few degrees below the room, fresh batteries, no schedule overriding it. Then wait 5–10 minutes: many systems delay restarting.' },
              { t: 'The air filter.', d: 'A clogged filter causes weak airflow, poor cooling, frozen coils and higher bills. Replace it if you can\'t see light through it.' },
              { t: 'The breakers.', d: 'There are usually two: one for the indoor unit and one for the outdoor unit, plus a disconnect box beside the outdoor unit. Reset a tripped breaker once only.' },
            ].map((c) => (
              <li key={c.t} className="flex gap-2 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span><strong>{c.t}</strong> {c.d}</span>
              </li>
            ))}
          </ul>

          <div className="flex gap-3 rounded-lg bg-red-50 border border-red-200 p-5 mb-6">
            <ShieldAlert className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Stay safe.</strong> Switch off power at the breaker and the outdoor
              disconnect before opening any panel. Never touch the capacitor; it holds a charge even with the power off.
              Refrigerant work needs a licensed technician. If a breaker trips twice, or you smell burning, turn the system
              off and call.
            </p>
          </div>

          <h2 className={h2}>Why these pages exist</h2>
          <p className={p}>
            I'm not an HVAC contractor. I'm the one paying the invoices, for several stores where the air conditioning
            runs most of the year. I've learned to handle the routine fixes myself and to recognize when a quote doesn't
            match the problem. A lot of service calls come down to a cheap part or a clogged drain, and a "you need a new
            system" verdict sometimes turns out to be a capacitor. These pages are the checks I'd do before picking up the phone,
            and what I'd want to know before agreeing to a price.
            {' '}My son, who's studying for his HVAC certification, now helps with a lot of this troubleshooting.
          </p>

          <h2 className={h2}>Before you agree to a repair</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Expect a service call fee of about {COST.serviceCall}. It's often credited toward the repair if you go ahead.</li>
            <li>Ask what failed and why, and ask to see the old part.</li>
            <li>Refrigerant doesn't get used up. If it's low, ask where the leak is before paying for a recharge.</li>
            <li>For a big repair on an older system, compare it with replacement using the <Link to="/calculators/repair-vs-replace" className={a}>repair vs replace calculator</Link>.</li>
            <li>Check typical prices in <Link to="/blog/ac-repair-cost-2026" className={a}>AC repair costs in 2026</Link>.</li>
          </ul>
          <p className="text-sm text-gray-500">
            Don't see your problem? Email{' '}
            <a href={`mailto:${SITE_EMAIL}`} className={a}>{SITE_EMAIL}</a> and we'll look at adding it.
          </p>
        </div>

        <LeadMagnet />
      </main>
    </>
  );
}
