import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ShieldAlert, PhoneCall, AlertTriangle, CheckCircle2, Calculator, Wrench } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import NotFound from './NotFound';
import { articleJsonLd, SITE_URL } from '../data/site';
import { getSymptom, SYMPTOMS, GROUPS, TROUBLESHOOTING_UPDATED, COST, Who } from '../data/troubleshooting';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700 align-top';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';

const WHO_STYLE: Record<Who, string> = {
  DIY: 'bg-teal-100 text-teal-800',
  'DIY or pro': 'bg-amber-100 text-amber-800',
  Pro: 'bg-slate-200 text-slate-800',
};

export default function TroubleshootingSymptom() {
  const { symptom: slug } = useParams();
  const s = getSymptom(slug);
  if (!s) return <NotFound />;

  const path = `/troubleshooting/${s.slug}`;
  const group = GROUPS.find((g) => g.id === s.group)!;
  const related = s.related.map((r) => SYMPTOMS.find((x) => x.slug === r)).filter(Boolean) as typeof SYMPTOMS;

  return (
    <>
      <Helmet>
        <title>{s.title}</title>
        <meta name="description" content={s.description} />
        <link rel="canonical" href={`${SITE_URL}${path}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${SITE_URL}${path}`} />
        <meta property="og:title" content={s.h1} />
        <meta property="og:description" content={s.description} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="article:author" content={`${SITE_URL}/about/mark-curant`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd({ path, headline: s.h1, description: s.description, datePublished: TROUBLESHOOTING_UPDATED, dateModified: TROUBLESHOOTING_UPDATED }))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'AC Troubleshooting', item: `${SITE_URL}/troubleshooting` },
              { '@type': 'ListItem', position: 3, name: s.name, item: `${SITE_URL}${path}` },
            ],
          })}
        </script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/troubleshooting" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          All AC problems
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">
                <Wrench className="w-3.5 h-3.5" /> Troubleshooting · {group.name}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{s.h1}</h1>
            <p className="text-xl text-gray-600">{s.summary}</p>
            <ArticleByline updated={TROUBLESHOOTING_UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-6 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Most likely causes</p>
            <ol className="list-decimal pl-5 space-y-1 text-gray-800">
              {s.quick.map((q) => <li key={q}>{q}</li>)}
            </ol>
          </div>

          <div className="flex gap-3 rounded-lg bg-red-50 border border-red-200 p-5 mb-8">
            <ShieldAlert className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-900 mb-1">Before you open anything</p>
              <p>
                Turn the system off at the thermostat, then switch off power at the breaker and at the disconnect beside
                the outdoor unit. Never touch the capacitor, even with the power off: it can hold a dangerous charge.
                Refrigerant work is for licensed technicians only. Reset a tripped breaker once; if it trips again, leave
                it off.
              </p>
              {s.safetyNote && <p className="mt-2">{s.safetyNote}</p>}
            </div>
          </div>

          <h2 className={h2}>Check these first (free, 5 minutes)</h2>
          <ul className="space-y-2 mb-4">
            {s.firstChecks.map((c) => (
              <li key={c} className="flex gap-2 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <h2 className={h2}>Causes, signs and repair costs</h2>
          <div className="sm:hidden space-y-3 mb-3">
            {s.causes.map((c) => {
              const see = c.see ? SYMPTOMS.find((x) => x.slug === c.see) : undefined;
              return (
                <div key={c.cause} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <p className="font-semibold text-gray-900">{c.cause}</p>
                    <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ${WHO_STYLE[c.who]}`}>{c.who}</span>
                  </div>
                  <p className="text-sm text-gray-700">{c.signs}</p>
                  <p className="text-sm text-gray-900 mt-2"><span className="text-gray-500">Typical cost:</span> <strong>{c.cost}</strong></p>
                  {see && (
                    <Link to={`/troubleshooting/${see.slug}`} className="inline-block text-sm font-medium text-teal-600 hover:underline mt-1">
                      See: {see.name} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
          <div className="hidden sm:block overflow-x-auto mb-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Cause</th>
                  <th className={th}>Signs</th>
                  <th className={th}>Who fixes it</th>
                  <th className={th}>Typical cost</th>
                </tr>
              </thead>
              <tbody>
                {s.causes.map((c) => {
                  const see = c.see ? SYMPTOMS.find((x) => x.slug === c.see) : undefined;
                  return (
                    <tr key={c.cause}>
                      <td className={`${td} font-medium text-gray-900`}>
                        {c.cause}
                        {see && (
                          <Link to={`/troubleshooting/${see.slug}`} className="block text-xs font-medium text-teal-600 hover:underline mt-1">
                            See: {see.name} →
                          </Link>
                        )}
                      </td>
                      <td className={td}>{c.signs}</td>
                      <td className={td}><span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ${WHO_STYLE[c.who]}`}>{c.who}</span></td>
                      <td className={`${td} whitespace-nowrap`}>{c.cost}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Typical U.S. installed prices in 2026. Most repairs also carry a service call fee of {COST.serviceCall}, often
            credited toward the repair. See <Link to="/blog/ac-repair-cost-2026" className={a}>AC repair costs in 2026</Link>{' '}
            for the full list.
          </p>

          {s.fromExperience && (
            <div className="rounded-lg border-l-4 border-[#17204d] bg-slate-50 p-5 mb-4">
              <p className="text-sm font-bold uppercase tracking-wide text-[#17204d] mb-1">From our own units</p>
              <p className="text-gray-700 leading-relaxed">{s.fromExperience}</p>
            </div>
          )}

          <h2 className={h2}>Step by step</h2>
          <ol className="space-y-4 mb-4">
            {s.steps.map((st, i) => (
              <li key={st.title} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#17204d] text-white font-bold flex items-center justify-center">{i + 1}</span>
                <div>
                  <p className="font-semibold text-gray-900">{st.title}</p>
                  <p className="text-gray-700 leading-relaxed">{st.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="grid md:grid-cols-2 gap-4 mt-10 mb-4">
            <div className="rounded-lg border border-gray-200 p-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-3">
                <PhoneCall className="w-5 h-5 text-teal-600" /> Call a technician if
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                {s.callPro.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-600" /> Red flags on a quote
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                {s.quoteFlags.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>
          <p className={p}>
            Facing an expensive repair on an older system? Run it through the{' '}
            <Link to="/calculators/repair-vs-replace" className={a}>repair vs replace calculator</Link>, or read{' '}
            <Link to="/blog/ac-repair-cost-vs-replacement" className={a}>the $5,000 rule</Link>.
          </p>

          {s.extra && (
            <>
              <h2 className={h2}>{s.extra.heading}</h2>
              {s.extra.paragraphs.map((t) => <p key={t} className={p}>{t}</p>)}
              {s.extra.link && (
                <p className={p}>See <Link to={s.extra.link.to} className={a}>{s.extra.link.label}</Link>.</p>
              )}
            </>
          )}

          <h2 className={h2}>Frequently asked questions</h2>
          <div className="space-y-5 mb-8">
            {s.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{f.q}</h3>
                <p className="text-gray-700 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          <h2 className={h2}>Related problems</h2>
          <div className="grid sm:grid-cols-3 gap-3 mb-8">
            {related.map((r) => (
              <Link key={r.slug} to={`/troubleshooting/${r.slug}`} className="rounded-lg border border-gray-200 p-4 hover:border-teal-400 hover:shadow-sm transition-all">
                <p className="font-semibold text-gray-900">{r.name}</p>
                <p className="text-sm text-gray-600 mt-1">{r.summary}</p>
              </Link>
            ))}
          </div>

          <div className="rounded-lg bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fixed it? Check what it costs to run</h3>
            <p className="text-gray-700 mb-4">
              If your system is old enough to keep breaking, compare its running cost with a new one before the next
              repair.
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
