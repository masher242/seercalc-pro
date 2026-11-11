import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import { articleJsonLd, SITE_URL } from '../data/site';
import { cents } from '../data/acCost';
import { PROVINCES, CANADA_RATES_DATE, CANADA_SOURCE, CANADA_SOURCE_URL, cad } from '../data/canada';
import {
  CA_HEAT_KWH, CA_COP, CA_OIL_PER_L, CA_OIL_KWH_PER_L, CA_OIL_AS_OF, CA_OIL_SOURCE_URL, CA_GAS_KWH_PER_M3,
  ENBRIDGE_PER_M3, ENBRIDGE_AS_OF, ENBRIDGE_SOURCE_URL,
} from '../data/heating';

const PATH = '/blog/heat-pump-canada';
const TITLE = 'Heat Pumps in Canada: Costs by Province and 2026 Rebates';
const HEADLINE = 'Heat Pumps in Canada (2026): What They Save in Every Province, and the Rebates Available';
const PUBLISHED = '2026-10-21';
const UPDATED = '2026-10-27';

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900 align-bottom';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700 align-top';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';
const ext = 'text-teal-700 hover:underline';
const box = 'rounded-lg border border-teal-200 bg-teal-50/60 p-4 mb-4 text-sm text-gray-800';

const OIL_EFF = 0.85;
const GAS_EFF = 0.95;
const HST_ON = 0.13;
/** C$ per kWh of heat delivered. */
const oilPerKwh = CA_OIL_PER_L / (CA_OIL_KWH_PER_L * OIL_EFF);
const gasOnPerKwh = (ENBRIDGE_PER_M3 * (1 + HST_ON)) / (CA_GAS_KWH_PER_M3 * GAS_EFF);

const rows = [...PROVINCES]
  .map((pr) => {
    const price = pr.city.extraRate;
    const baseboard = CA_HEAT_KWH * price;
    const hp = baseboard / CA_COP;
    return { pr, price, baseboard, hp, saveBaseboard: baseboard - hp, saveOil: CA_HEAT_KWH * oilPerKwh - hp };
  })
  .sort((x, y) => y.saveBaseboard - x.saveBaseboard);
const on = rows.find((r) => r.pr.slug === 'ontario')!;
const oilYear = CA_HEAT_KWH * oilPerKwh;
const gasOnYear = CA_HEAT_KWH * gasOnPerKwh;

export default function BlogArticleHeatPumpCanada() {
  const description = `What a cold-climate heat pump saves in each province against electric baseboards, oil and gas, at 2025–26 prices, plus the federal and provincial heat pump rebates open in 2026.`;
  const faqs = [
    {
      q: 'Do heat pumps work in Canadian winters?',
      a: 'Cold-climate air-source heat pumps are designed to keep heating at −15°C and below, with reduced output, and most installations include backup heat (electric strips or the existing furnace) for the coldest days. They work across southern Canada; in the coldest regions they cover most of the winter and the backup covers the rest.',
    },
    {
      q: 'Is a heat pump cheaper than electric baseboard heat in Canada?',
      a: `Yes, everywhere. A heat pump delivers about ${CA_COP} times as much heat per kWh over a winter (our estimate for a cold-climate model including backup heat). For a house needing ${CA_HEAT_KWH.toLocaleString()} kWh of heat a year, that saves ${cad(rows[rows.length - 1].saveBaseboard)}–${cad(rows[0].saveBaseboard)} a year depending on the province.`,
    },
    {
      q: 'Is a heat pump cheaper than natural gas in Ontario?',
      a: `Not on running costs at current prices. With Enbridge gas at about ${(ENBRIDGE_PER_M3 * 100).toFixed(1)}¢ per cubic metre before HST and no federal carbon charge, a 95% furnace heats for about ${cents(gasOnPerKwh)} per kWh of heat; a heat pump at Toronto's price of ${cents(on.price)} per extra kWh costs about ${cents(on.price / CA_COP)}. A dual-fuel system, which keeps the furnace for the coldest days, is the usual middle ground.`,
    },
    {
      q: 'What heat pump rebates are available in Canada in 2026?',
      a: 'A new federal heat pump rebate (up to $10,000 for households below the median income, $2,000 for others) was announced on October 8, 2026, with the application portal expected in early 2027. The federal Oil to Heat Pump Affordability program stopped taking applications on July 31, 2026. Provinces run their own programs, for example Ontario\'s Home Renovation Savings (up to $7,500 for a cold-climate air-source heat pump), Quebec\'s LogisVert and B.C.\'s Energy Savings Program.',
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
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd({ path: PATH, headline: HEADLINE, description, dateModified: UPDATED, datePublished: PUBLISHED }))}
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
          Back to blog
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">Canada</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              In most of Canada a heat pump runs far more hours heating than cooling, which changes the math on replacing
              an air conditioner. Here's what it saves, province by province, and who pays for part of it.
            </p>
            <ArticleByline updated={UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              If you heat with <strong>electric baseboards or oil</strong>, a cold-climate heat pump cuts heating costs
              sharply in every province: about <strong>{cad(rows[rows.length - 1].saveBaseboard)}–{cad(rows[0].saveBaseboard)} a
              year</strong> against baseboards for a typical house, and more against oil. If you heat with{' '}
              <strong>natural gas</strong>, a heat pump costs more per unit of heat at current Ontario prices, so a dual-fuel
              setup is the usual choice. A federal rebate of up to $10,000 was announced in October 2026, with
              applications expected in early 2027.
            </p>
          </div>

          <p className={p}>
            Our <Link to="/ac-cost/canada" className={a}>Canadian AC cost pages</Link> show that a premium air conditioner
            rarely pays back in Canada: summers are short and power is cheap. Heating turns that around. A heat pump in
            Ontario might cool for 800 hours a year and heat for several thousand, so its efficiency counts for much more in
            winter than in summer.
          </p>

          <h2 className={h2}>Heat pump vs. electric baseboards and oil, by province</h2>
          <div className={box}>
            <p className="font-bold text-gray-900 mb-2">What this table shows</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>The same house in every province:</strong> one that needs {CA_HEAT_KWH.toLocaleString()} kWh of heat
                a year (about {Math.round(CA_HEAT_KWH * 0.0036)} GJ), our estimate for a typical detached home. Colder
                places need more and milder ones less; the savings scale with it.
              </li>
              <li>
                <strong>Electricity price:</strong> the price of each extra kWh between 1,000 and 2,000 a month in the
                province's main city (Hydro-Québec comparison, {CANADA_RATES_DATE}, before tax). Winter heating is added on
                top of normal use, so that's the price it pays.
              </li>
              <li>
                <strong>Heat pump:</strong> a cold-climate model delivering {CA_COP} kWh of heat per kWh of electricity
                over the winter, including some backup heat on the coldest days (our estimate).
              </li>
              <li>
                <strong>Oil:</strong> {cad(CA_OIL_PER_L, 2)} a litre (Canadian average, {CA_OIL_AS_OF}) in an 85% furnace,
                about {cad(oilYear)} a year for the same house, before tax.
              </li>
            </ul>
          </div>
          <div className="overflow-x-auto mb-3">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Province</th>
                  <th className={th}>Electricity price<span className="block text-xs font-normal text-gray-500">each extra kWh, C$</span></th>
                  <th className={th}>Baseboard heat per year</th>
                  <th className={th}>Heat pump per year</th>
                  <th className={th}>Saved vs. baseboards</th>
                  <th className={th}>Saved vs. oil</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.pr.slug}>
                    <td className={td}><Link to={`/ac-cost/canada/${r.pr.slug}`} className={a}>{r.pr.name}</Link><span className="block text-xs text-gray-500">{r.pr.city.name}</span></td>
                    <td className={td}>{cents(r.price)}</td>
                    <td className={td}>{cad(r.baseboard)}</td>
                    <td className={td}>{cad(r.hp)}</td>
                    <td className={`${td} font-semibold text-gray-900`}>{cad(r.saveBaseboard)}</td>
                    <td className={`${td} font-semibold text-gray-900`}>{cad(r.saveOil)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Canadian dollars before GST/HST. Electricity: <a href={CANADA_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={ext}>{CANADA_SOURCE}</a>.
            Oil: <a href={CA_OIL_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={ext}>GlobalPetrolPrices</a>; local prices vary widely, especially in Atlantic Canada.
          </p>
          <p className={p}>
            The savings are largest where electricity is expensive, because a heat pump cuts the number of kWh, not the price
            of each one. Against oil, the gap is big everywhere: oil heat costs about {cents(oilPerKwh)} per kWh of heat
            delivered, several times what a heat pump costs. With a typical heat pump install costing several thousand
            dollars more than an air conditioner, savings of $1,000+ a year pay that back in a few years, sooner after a
            rebate.
          </p>

          <h2 className={h2}>What about natural gas?</h2>
          <p className={p}>
            Gas got cheaper for households when the federal consumer carbon charge was removed in 2025. In the Toronto
            area, Enbridge's price per extra cubic metre is about {(ENBRIDGE_PER_M3 * 100).toFixed(1)}¢ before HST from{' '}
            {ENBRIDGE_AS_OF} (delivery, transportation and supply; the monthly customer charge doesn't change with use). In a 95%
            furnace that's about <strong>{cents(gasOnPerKwh)} per kWh of heat</strong>, or {cad(gasOnYear)} a year for the
            same house. A heat pump at Toronto's price of {cents(on.price)} per extra kWh costs about{' '}
            <strong>{cents(on.price / CA_COP)} per kWh of heat</strong>, or {cad(on.hp)} a year.
          </p>
          <p className={p}>
            So for an Ontario gas home, a heat pump alone doesn't lower the heating bill at today's prices. What many people
            do instead is install a heat pump in place of the air conditioner and keep the gas furnace: the heat pump covers
            the shoulder seasons and mild winter days, the furnace takes over in deep cold, and the household gets efficient
            cooling and a backup heat source. Rebates often favour this "hybrid" setup, and it protects you if gas prices
            rise again.
          </p>

          <h2 className={h2}>Heat pump rebates in Canada (October 2026)</h2>
          <div className="overflow-x-auto mb-3">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Program</th>
                  <th className={th}>What it pays</th>
                  <th className={th}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={td}><strong>New federal heat pump rebate</strong></td>
                  <td className={td}>Up to $10,000 for households below the median income; $2,000 for other eligible households. Can be combined with provincial programs.</td>
                  <td className={td}>Announced October 8, 2026; application portal expected early 2027.</td>
                </tr>
                <tr>
                  <td className={td}><strong>Oil to Heat Pump Affordability</strong> (federal)</td>
                  <td className={td}>Up to $10,000 upfront for oil-heated homes at or below median income.</td>
                  <td className={td}>Closed to new applications July 31, 2026. Approved applicants have until January 31, 2027 to finish and submit receipts.</td>
                </tr>
                <tr>
                  <td className={td}><strong>Canada Greener Homes Grant</strong></td>
                  <td className={td}>—</td>
                  <td className={td}>Closed to new applicants since February 2024.</td>
                </tr>
                <tr>
                  <td className={td}><strong>Ontario: Home Renovation Savings</strong></td>
                  <td className={td}>Up to $7,500 for a cold-climate air-source heat pump, up to $12,000 for ground-source. Must be on NRCan's qualified list.</td>
                  <td className={td}>Running in 2026; check Save on Energy for current terms.</td>
                </tr>
                <tr>
                  <td className={td}><strong>Quebec: LogisVert</strong> (Hydro-Québec)</td>
                  <td className={td}>$100 per 1,000 BTU/h of heating output at −8°C, $120 for cold-climate units, up to $6,700.</td>
                  <td className={td}>Available (June 2026 summary).</td>
                </tr>
                <tr>
                  <td className={td}><strong>B.C.: Energy Savings Program</strong> (CleanBC)</td>
                  <td className={td}>Income-based. Switching from gas to a central ducted heat pump: $13,000 / $7,000 / $3,500 by income level. Smaller amounts for mini-splits and dual fuel; electric-to-heat-pump rebates cut back.</td>
                  <td className={td}>New amounts from July 6, 2026.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Programs change often; confirm amounts and pre-approval rules before you sign a contract. Sources: Natural
            Resources Canada (OHPA, Greener Homes), CTV News and Daily Hive (federal rebate announcement), Save on Energy
            (Ontario), Hydro-Québec LogisVert summary via Centris (June 2026), CleanBC Energy Savings Program update (June 2026).
          </p>

          <h2 className={h2}>Getting a heat pump that works in your winter</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Buy a cold-climate model.</strong> Check its heating capacity at −15°C on the spec sheet, not just at 8°C. Rebates often require a model on NRCan's qualified list.</li>
            <li><strong>Size it for heating.</strong> A unit sized for summer cooling can be too small in January. Ask for a heat-loss calculation.</li>
            <li><strong>Plan the backup.</strong> Electric strips, the existing furnace, or baseboards you keep. Know at what outdoor temperature the backup takes over.</li>
            <li><strong>Mind the outdoor unit.</strong> Mount it above the snow line and away from roof drip. Steam and short defrost cycles are normal; see <Link to="/troubleshooting/heat-pump-defrost-mode" className={a}>heat pump defrost mode explained</Link>.</li>
          </ul>
          <p className={p}>
            For U.S. prices and a payback calculator for gas, propane, oil and electric homes, see{' '}
            <Link to="/blog/heat-pump-vs-central-ac" className={a}>heat pump vs. central AC</Link>.
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

          <h2 className={h2}>Sources and method</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 mb-4">
            <li>Electricity: <a href={CANADA_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={ext}>{CANADA_SOURCE}</a>, price of each kWh from 1,000 to 2,000 a month, before tax.</li>
            <li>Gas: <a href={ENBRIDGE_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={ext}>Enbridge Gas Rate 1 notice from {ENBRIDGE_AS_OF}</a> (EGD rate zone, prices approved by the Ontario Energy Board), plus 13% HST; about {CA_GAS_KWH_PER_M3} kWh of heat per cubic metre.</li>
            <li>Oil: <a href={CA_OIL_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={ext}>GlobalPetrolPrices</a>, {CA_OIL_AS_OF}; about {CA_OIL_KWH_PER_L} kWh per litre.</li>
            <li>Heat needed ({CA_HEAT_KWH.toLocaleString()} kWh a year) and the heat pump's seasonal efficiency ({CA_COP}) are our estimates.</li>
          </ul>
        </article>

        <LeadMagnet />
      </main>
    </>
  );
}
