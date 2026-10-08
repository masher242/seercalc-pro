import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail } from 'lucide-react';
import { AUTHOR, SITE_EMAIL, SITE_URL, ORGANIZATION_ID } from '../data/site';

const PAGE_TITLE = 'Mark Curant — Founder, AirConditionAnswers.com';
const PAGE_DESCRIPTION =
  'Mark Curant runs retail stores in the Caribbean, where power costs over 30¢/kWh and isn\'t always reliable. He built AirConditionAnswers to help buyers make cooling decisions with real numbers.';

export default function AboutMarkCurant() {
  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={AUTHOR.url} />

        <meta property="og:type" content="profile" />
        <meta property="og:url" content={AUTHOR.url} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="profile:first_name" content="Mark" />
        <meta property="profile:last_name" content="Curant" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            url: AUTHOR.url,
            mainEntity: {
              '@type': 'Person',
              '@id': AUTHOR.id,
              name: AUTHOR.name,
              jobTitle: 'Founder & Editor',
              description:
                'Founder of AirConditionAnswers.com. Runs retail stores in the Caribbean where electricity exceeds 30¢/kWh and power is unreliable, and built the site\'s SEER calculators for his own cooling decisions.',
              url: AUTHOR.url,
              email: `mailto:${SITE_EMAIL}`,
              worksFor: { '@id': ORGANIZATION_ID },
              knowsAbout: [
                'SEER and SEER2 ratings',
                'Air conditioner operating costs',
                'HVAC replacement decisions',
                'Commercial cooling costs',
                'Protecting air conditioners from power surges and outages',
                'Backup power for cooling',
                'DIY air conditioner maintenance',
                'Evaluating HVAC repair quotes',
              ],
            },
          })}
        </script>
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <article className="bg-white rounded-lg shadow-lg p-8">
          <header className="mb-8">
            <p className="text-sm font-medium text-teal-700 mb-2">Founder &amp; Editor</p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Mark Curant</h1>
            <p className="text-xl text-gray-600">
              Founder and editor of AirConditionAnswers.com, writing from the buyer's side of the invoice.
            </p>
          </header>

          <section className="text-gray-700 leading-relaxed space-y-5">
            <p>
              He isn't an HVAC contractor. He's the person on the other side of the invoice: a business owner who runs
              several brick-and-mortar retail stores in the Caribbean, where residential power costs more than 31¢ per
              kilowatt-hour, commercial rates run higher, and turning the AC off isn't an option. Customers don't come
              back to a hot store.
            </p>
            <p>
              Expensive power is only half of it. On an island grid, outages, brownouts and voltage surges are part of
              normal operations, and each one is a risk to compressors and control boards. Keeping stores cool means
              planning for that: surge and voltage protection on the equipment, backup power, and systems that restart
              safely when the grid comes back. Losing a unit in the middle of summer means lost sales, spoiled stock and
              an emergency replacement at whatever price is on offer.
            </p>
            <p>
              None of that came with a manual. Mark taught himself how the systems work so he could make his own
              decisions instead of taking every quote at face value. He learned to tell a fair repair price from an
              inflated one, to ask the questions that expose an unnecessary replacement, and to do the routine
              maintenance himself (filters, coil cleaning, drain lines, basic troubleshooting) that keeps small problems
              from turning into expensive service calls. He knows when he's being overcharged, and he wants readers to
              know too.
            </p>
            <p>
              Years of paying those bills and protecting that equipment taught him that the biggest cooling costs
              usually aren't the repair calls. They're the decisions made without numbers: buying the cheapest system,
              keeping an inefficient one too long, or paying for efficiency that never pays back. He built the{' '}
              <Link to="/" className="text-teal-600 hover:text-teal-700 font-medium">SEER savings calculator</Link> to
              run those numbers for his own stores, then turned it into this site so homeowners and small-business
              owners could do the same before spending $5,000–$15,000 on a system.
            </p>
          </section>

          <section className="mt-10" id="editorial-policy">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Mark approaches the content</h2>
            <ul className="space-y-3 text-gray-700 leading-relaxed list-disc pl-6">
              <li>
                <strong>Numbers first.</strong> Every cost or savings figure on the site comes from a stated formula and
                stated assumptions (unit size, hours of use, electricity rate) so you can check it or plug in your own.
              </li>
              <li>
                <strong>Primary sources.</strong> Electricity rates come from the U.S. Energy Information Administration;
                efficiency standards from the Department of Energy and ENERGY STAR; equipment ratings from the AHRI
                Directory.
              </li>
              <li>
                <strong>No contractor bias.</strong> The site doesn't sell or install equipment. Brand reviews and buying
                guides are written from the buyer's side of the decision.
              </li>
              <li>
                <strong>Updated when the rules change.</strong> Tax credits, efficiency minimums and refrigerant rules
                change; articles show the date they were last updated.
              </li>
            </ul>
            <p className="mt-5 text-gray-700 leading-relaxed">
              AirConditionAnswers.com is checked for accuracy against primary sources (EIA, DOE, ENERGY STAR, AHRI). We
              don't accept payment for brand rankings. When we find an error, we correct it and update the article's
              date.
            </p>
          </section>

          <section className="mt-10 rounded-lg bg-teal-50 border border-teal-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Contact</h2>
            <p className="text-gray-700">
              Questions, corrections or story tips:{' '}
              <a href={`mailto:${SITE_EMAIL}`} className="inline-flex items-center gap-1 text-teal-700 font-medium hover:underline">
                <Mail className="w-4 h-4" />
                {SITE_EMAIL}
              </a>
            </p>
          </section>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/blog" className="text-teal-600 hover:text-teal-700 font-medium">Read the guides →</Link>
            <Link to="/calculators" className="text-teal-600 hover:text-teal-700 font-medium">Try the calculators →</Link>
          </div>
        </article>
      </main>
    </>
  );
}
