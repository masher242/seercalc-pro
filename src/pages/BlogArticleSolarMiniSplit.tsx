import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, Clock, Sun, Zap, PlugZap } from 'lucide-react';
import ArticleByline from '../components/ArticleByline';
import LeadMagnet from '../components/LeadMagnet';
import { VerdictBadge, KeepYearsField, PaybackResults } from '../components/PaybackVerdict';
import { GOOD_MAX, MARGINAL_MAX, VERDICT_STYLE } from '../data/payback';
import { articleJsonLd, SITE_URL } from '../data/site';
import { STATES, US_RATE, RATES_AS_OF, RATES_SOURCE_URL, usd, cents } from '../data/acCost';
import { COUNTRIES } from '../data/caribbean';

const PATH = '/blog/solar-mini-split';
const TITLE = 'Solar Mini-Splits: Do Hybrid AC/DC Units Pay Off?';
const HEADLINE = 'Solar-Powered Mini-Splits: How Hybrid AC/DC Units Work and Whether They Pay Off';
const PUBLISHED = '2026-10-17';
const UPDATED = '2026-10-17';

/** Model assumptions (stated in the article). */
const PANEL_KW = 1.1; // EG4 12K rated PV input
const SYSTEM_LOSS = 0.8; // wiring, heat, dirt, panel angle
const EXTRA_COST = 1000; // panels, mounting, wiring vs an ordinary mini-split (our estimate)
const KEEP = 10; // years: young brands, 5-year warranties
/** Share of the panels' output the AC actually uses, by how much cooling the climate needs (our estimate). */
const solarShare = (coolingHours: number) => (coolingHours >= 2200 ? 0.7 : coolingHours >= 1500 ? 0.45 : 0.3);
/** Average daily peak sun hours, our estimate from NREL solar maps. */
const SUN_HOURS: Record<string, number> = { OH: 4.2, CA: 5.5, FL: 5.3, TX: 5.3, AZ: 6.5, HI: 5.5 };
const US_SUN = 4.5;
const CARIBBEAN_SUN = 5.5;

/** kWh a year the AC takes from its panels. */
const solarKwh = (panelKw: number, sun: number, share: number) => panelKw * sun * 365 * SYSTEM_LOSS * share;

const th = 'border border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-900';
const td = 'border border-gray-200 px-3 py-2.5 text-gray-700 align-top';
const h2 = 'text-2xl font-bold text-gray-900 mt-10 mb-4';
const h3 = 'text-lg font-bold text-gray-900 mt-6 mb-2';
const p = 'text-gray-700 leading-relaxed mb-4';
const a = 'text-teal-600 hover:text-teal-700 font-medium';
const ext = 'text-teal-700 hover:underline';

const BRANDS = [
  {
    name: 'EG4 (sold by Signature Solar)',
    models: '12K and 24K hybrid AC/DC, plus multi-zone',
    specs: '12K: 22.5 SEER2, 12.6 EER2, 115 V, up to 1,100 W of panels. 24K: 21 SEER2, 208–240 V, up to 2,200 W. R-32, heat pump.',
    price: 'About $1,540 (12K)',
    warranty: '5 years',
    note: 'The best-known in the U.S. Pre-charged 16 ft line set for DIY installs.',
  },
  {
    name: 'HotSpot Energy',
    models: 'ACDC12C, ACDC18C',
    specs: 'Hybrid AC/DC heat pumps. Check the refrigerant: the 18C spec sheet still lists R-410A.',
    price: 'About $1,790 (12K)',
    warranty: 'Check with the seller',
    note: 'The longest-running brand of this type.',
  },
  {
    name: 'Gree',
    models: 'Photovoltaic direct-drive systems',
    specs: 'Large commercial systems that can also send surplus solar to the grid.',
    price: 'Commercial quote',
    warranty: 'Commercial terms',
    note: 'The world\'s largest AC maker; not a home mini-split.',
  },
  {
    name: 'Deye and others',
    models: '48 V DC off-grid units, unbranded "ACDC" units',
    specs: 'Run from a battery bank or panels directly; specs vary widely.',
    price: 'Varies',
    warranty: 'Varies',
    note: 'For off-grid cabins and boats. Many marketplace units have little support.',
  },
];

function SolarEstimator() {
  const [panelW, setPanelW] = useState(PANEL_KW * 1000);
  const [sun, setSun] = useState(US_SUN);
  const [share, setShare] = useState(45);
  const [rateC, setRateC] = useState(+(US_RATE * 100).toFixed(2));
  const [extra, setExtra] = useState(EXTRA_COST);
  const [keep, setKeep] = useState(KEEP);

  const kwh = solarKwh(panelW / 1000, sun, share / 100);
  const yearly = kwh * (rateC / 100);
  const input = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500';
  const label = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <div className="rounded-lg border border-teal-200 bg-teal-50/50 p-5 mb-6">
      <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-3">Your numbers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        <div>
          <label htmlFor="sm-panels" className={label}>Panel watts</label>
          <input id="sm-panels" type="number" min={0} max={5000} step={100} className={input} value={panelW}
            onChange={(e) => setPanelW(Math.max(0, Number(e.target.value)))} />
        </div>
        <div>
          <label htmlFor="sm-sun" className={label}>Sun hours/day</label>
          <input id="sm-sun" type="number" min={1} max={9} step={0.1} className={input} value={sun}
            onChange={(e) => setSun(Math.min(9, Math.max(0, Number(e.target.value))))} />
        </div>
        <div>
          <label htmlFor="sm-share" className={label}>Solar used (%)</label>
          <input id="sm-share" type="number" min={0} max={100} step={5} className={input} value={share}
            onChange={(e) => setShare(Math.min(100, Math.max(0, Number(e.target.value))))} />
        </div>
        <div>
          <label htmlFor="sm-rate" className={label}>Rate (¢/kWh)</label>
          <input id="sm-rate" type="number" min={1} max={150} step={0.01} className={input} value={rateC}
            onChange={(e) => setRateC(Math.max(0, Number(e.target.value)))} />
        </div>
        <div>
          <label htmlFor="sm-extra" className={label}>Extra cost ($)</label>
          <input id="sm-extra" type="number" min={0} step={100} className={input} value={extra}
            onChange={(e) => setExtra(Math.max(0, Number(e.target.value)))} />
        </div>
        <KeepYearsField id="sm-keep" value={keep} onChange={setKeep} className={input} labelClass={label} />
      </div>
      <p className="text-sm text-gray-700 mb-3">
        The AC takes about <strong>{Math.round(kwh).toLocaleString()} kWh a year</strong> from the panels instead of the grid.
      </p>
      <PaybackResults yearly={yearly} premium={extra} keep={keep} money={(n) => usd(n)} />
      <p className="text-xs text-gray-500 mt-3">
        Electricity savings only, at today's rate. "Extra cost" is what you pay on top of an ordinary mini-split of the same
        size: panels, mounting, wiring, and any difference in the unit's price. "Solar used" is the share of the
        panels' output that goes into cooling rather than being wasted; see the table below for typical values.
      </p>
    </div>
  );
}

export default function BlogArticleSolarMiniSplit() {
  const byAbbr = (ab: string) => STATES.find((s) => s.abbr === ab)!;
  const bahamas = COUNTRIES.find((c) => c.slug === 'bahamas');
  const rows = [
    { place: 'U.S. average', link: '/ac-cost', rate: US_RATE, hours: 1500, sun: US_SUN },
    ...['OH', 'CA', 'FL', 'TX', 'AZ', 'HI'].map((ab) => {
      const s = byAbbr(ab);
      return { place: s.name, link: `/ac-cost/${s.slug}`, rate: s.rate, hours: s.hours, sun: SUN_HOURS[ab] };
    }),
    ...(bahamas ? [{ place: 'The Bahamas', link: `/ac-cost/${bahamas.slug}`, rate: bahamas.usdRate, hours: bahamas.hours, sun: CARIBBEAN_SUN }] : []),
  ].map((r) => {
    const share = solarShare(r.hours);
    const kwh = solarKwh(PANEL_KW, r.sun, share);
    const save = kwh * r.rate;
    return { ...r, share, kwh, save, payback: EXTRA_COST / save };
  });
  const us = rows[0];
  const bah = rows.find((r) => r.place === 'The Bahamas');
  const fl = rows.find((r) => r.place === 'Florida')!;

  const description = `Hybrid solar mini-splits run on panels first and the grid second, with no battery. What EG4, HotSpot and others offer, the catches (wasted midday solar, 5-year warranties, permits), and a payback calculator: about ${Math.round(us.payback)} years at U.S. average rates${bah ? `, ${Math.round(bah.payback)} in the Bahamas` : ''}.`;

  const faqs = [
    {
      q: 'Can a mini-split run on solar panels without a battery?',
      a: 'A hybrid AC/DC mini-split can. Panels connect straight to the outdoor unit, which uses solar first and takes the rest from the grid. Without a battery or the grid it can only run while the sun is out, and its output drops when the sun does.',
    },
    {
      q: 'How many solar panels does a 12,000 BTU mini-split need?',
      a: 'The EG4 12K accepts up to 1,100 W of panels, which is three panels of about 350–365 W wired in series (its solar input runs from 90 to 380 V DC). The 24K accepts up to 2,200 W. Check the voltage limit before adding panels: exceeding it can damage the unit.',
    },
    {
      q: 'Do solar mini-splits work at night?',
      a: 'Hybrid units do, by switching to grid power. Off-grid 48-volt units need a battery bank to run at night. Either way, the solar part only saves money during daylight.',
    },
    {
      q: 'Are solar mini-splits worth it?',
      a: `They pay back fastest where power is expensive, the sun is strong and the space needs cooling during the day: about ${bah ? `${Math.round(bah.payback)} years in the Bahamas and ` : ''}${Math.round(fl.payback)} in Florida in our estimate, against about ${Math.round(us.payback)} at U.S. average conditions. The risks are young brands, 5-year warranties and thin reliability data, so they suit shops, offices, garages and workshops better than a main home system.`,
    },
    {
      q: 'Is a solar mini-split better than putting solar on the roof?',
      a: 'Not always. Rooftop solar connected to the grid can use or sell every kWh, while a hybrid mini-split wastes solar it can\'t use at that moment. Where your utility credits the solar you send to the grid, a major-brand mini-split plus ordinary rooftop solar is often the better deal, with a much longer warranty. A hybrid unit makes most sense where you can\'t sell solar back, or only want to cool one space.',
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
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 11 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{HEADLINE}</h1>
            <p className="text-xl text-gray-600">
              Panels wired straight into the air conditioner, no battery, no net-metering contract. Here's what you get and
              what it's worth.
            </p>
            <ArticleByline updated={UPDATED} />
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Quick answer</p>
            <p className="text-gray-800 leading-relaxed">
              A hybrid solar mini-split takes power from a few solar panels first and the grid second. There's no battery, and
              it can't sell surplus solar, so anything the AC doesn't need at that moment is wasted. With about $1,000 of
              panels and mounting, our estimate is a payback of about <strong>{Math.round(us.payback)} years at U.S. average
              rates</strong>, {Math.round(fl.payback)} in Florida
              {bah && <> and <strong>{Math.round(bah.payback)} in the Bahamas</strong></>}. They're best for spaces cooled
              during the day (shops, offices, garages) where power is expensive. The catches: young brands, 5-year
              warranties and little long-term reliability data.
            </p>
          </div>

          <p className={p}>
            My stores need cooling most in the middle of the day, when the sun is strongest and power costs over 30¢/kWh.
            That's exactly the case these units are built for, so I looked into them properly: who makes them, how they're
            wired, what goes wrong, and what the numbers look like. Here's what I found.
          </p>

          <h2 className={h2}>How a hybrid solar mini-split works</h2>
          <p className={p}>
            Every inverter mini-split already runs its compressor and fans on DC power, converted from the grid's AC. A
            hybrid unit adds a solar input to the outdoor unit so panels can feed that DC directly.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            {[
              { Icon: Sun, t: 'Solar first', d: 'Panels connect to the outdoor unit with standard solar connectors. Whatever they produce goes to the compressor first.' },
              { Icon: PlugZap, t: 'Grid fills the gap', d: 'When the panels can\'t cover the load (mornings, evenings, cloud, night), the unit tops up from the grid automatically.' },
              { Icon: Zap, t: 'No battery, no export', d: 'Nothing is stored and nothing goes back to the grid. Solar the AC doesn\'t need at that moment is simply not used.' },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="rounded-lg border border-gray-200 p-4">
                <Icon className="w-5 h-5 text-teal-600 mb-2" />
                <p className="font-semibold text-gray-900">{t}</p>
                <p className="text-sm text-gray-700 mt-1">{d}</p>
              </div>
            ))}
          </div>
          <p className={p}>
            Because nothing is exported, you don't need a net-metering agreement with your utility. That's the main
            attraction where utilities don't credit solar, and the main weakness where they do.
          </p>

          <h2 className={h2}>Who makes them</h2>
          <div className="sm:hidden space-y-3 mb-4">
            {BRANDS.map((b) => (
              <div key={b.name} className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">{b.name}</p>
                <p className="text-sm text-gray-600">{b.models}</p>
                <p className="text-sm text-gray-700 mt-2">{b.specs}</p>
                <p className="text-sm mt-2"><span className="text-gray-500">Price:</span> {b.price} · <span className="text-gray-500">Warranty:</span> {b.warranty}</p>
                <p className="text-sm text-gray-600 mt-1">{b.note}</p>
              </div>
            ))}
          </div>
          <div className="hidden sm:block overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Brand</th>
                  <th className={th}>Specs</th>
                  <th className={th}>Price</th>
                  <th className={th}>Warranty</th>
                </tr>
              </thead>
              <tbody>
                {BRANDS.map((b) => (
                  <tr key={b.name}>
                    <td className={`${td} font-medium text-gray-900`}>{b.name}<span className="block text-xs font-normal text-gray-500 mt-1">{b.models}</span></td>
                    <td className={td}>{b.specs}<span className="block text-xs text-gray-500 mt-1">{b.note}</span></td>
                    <td className={`${td} whitespace-nowrap`}>{b.price}</td>
                    <td className={td}>{b.warranty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 italic mb-4">
            Prices are the seller's listed price for the unit only, October 2026. Panels, mounting and installation are extra.
          </p>
          <p className={p}>
            On grid power alone these units perform like any good mini-split: EG4 rates its 12K at 22.5 SEER2. Be wary of
            claims like "SEER 75 equivalent". They count only the grid power you pay for, so they're marketing figures,
            not ratings.
          </p>

          <h2 className={h2}>What the payback looks like</h2>
          <p className={p}>
            The saving is the grid electricity the panels replace. For a 12,000 BTU unit with 1,100 W of panels:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4 font-mono text-sm text-gray-800">
            Solar kWh used = panel kW × peak sun hours × 365 × 0.8 × share used<br />
            Saving per year = solar kWh used × your electricity rate<br />
            Payback = extra cost ÷ saving per year
          </div>
          <p className={p}>
            The 0.8 covers losses from heat, dust, wiring and panel angle. "Share used" is the part of the panels' output that
            actually goes into cooling: high in a hot climate where the space is cooled all day, low where the AC is off half
            the time. We use 70% in hot climates, 45% in moderate ones and 30% where summers are short; these are our
            estimates, not measurements. The extra cost is ${EXTRA_COST.toLocaleString()} for panels, mounting and wiring
            fitted yourself; with an electrician it can be twice that.
          </p>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 mb-4">
            <p className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">How we judge it</p>
            <p className="text-gray-700 leading-relaxed mb-3">
              The same verdicts as our SEER comparisons, but over 10 years rather than 15: these brands are young, their
              warranties run 5 years, and nobody yet has long-term reliability data.
            </p>
            <ul className="space-y-1.5 text-gray-700">
              <li><span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold mr-2 ${VERDICT_STYLE.good}`}>Good deal</span>pays back within {GOOD_MAX} years</li>
              <li><span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold mr-2 ${VERDICT_STYLE.marginal}`}>Marginal</span>{GOOD_MAX}–{MARGINAL_MAX} years</li>
              <li><span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold mr-2 ${VERDICT_STYLE.no}`}>Not worth it for savings</span>over {MARGINAL_MAX} years</li>
            </ul>
          </div>

          <p className={p}>
            A 12,000 BTU hybrid unit, 1,100 W of panels and ${EXTRA_COST.toLocaleString()} of extra cost:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm min-w-[640px]">
              <thead>
                <tr className="bg-teal-50">
                  <th className={th}>Location</th>
                  <th className={th}>Electricity rate</th>
                  <th className={th}>Peak sun hours/day</th>
                  <th className={th}>Share of solar used</th>
                  <th className={th}>Solar kWh used per year</th>
                  <th className={th}>Saved per year</th>
                  <th className={th}>Payback</th>
                  <th className={th}>Verdict</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.place}>
                    <td className={td}><Link to={r.link} className={a}>{r.place}</Link></td>
                    <td className={td}>{cents(r.rate)}</td>
                    <td className={td}>{r.sun}</td>
                    <td className={td}>{Math.round(r.share * 100)}%</td>
                    <td className={td}>{Math.round(r.kwh).toLocaleString()}</td>
                    <td className={td}>{usd(r.save)}</td>
                    <td className={td}>{r.payback.toFixed(1)} years</td>
                    <td className={td}><VerdictBadge payback={r.payback} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>
            On paper the payback is short almost everywhere it's sunny, because the extra cost is small: three panels and
            some mounting, not a whole solar system. Expensive power does the rest: the panels pay for themselves in under two
            years in Hawaii and under three in the Bahamas. Where summers are short and power is average, like Ohio, it
            takes about twice as long as in the hot states, which only rates as marginal.
          </p>
          <p className={p}>
            Two things the table can't show. First, the share of solar used is a guess you should make for your own space:
            a store cooled from 8 to 6 uses far more than a bedroom cooled only at night. Second, a short payback means
            little if the unit fails in year six and parts are hard to get. The verdicts assume the unit lasts.
          </p>

          <h2 className={h2}>Run your own numbers</h2>
          <SolarEstimator />

          <h2 className={h2}>Setting one up</h2>
          <h3 className={h3}>The air conditioner</h3>
          <p className={p}>
            The indoor and outdoor units install like any mini-split. EG4 ships its units with a pre-charged 16 ft line set,
            so no refrigerant handling is needed for a standard install, and owners report fitting one in an afternoon with
            two people. Longer line runs (up to 49 ft for the 12K) need a technician to adjust the charge.
          </p>
          <h3 className={h3}>The panels</h3>
          <p className={p}>
            The panels can go on a roof, a shed, a carport or a ground rack, as long as they face the sun for most of the day.
            They're wired in series to reach the unit's input voltage (90–380 V DC on the EG4 12K) and plugged into the
            outdoor unit with standard solar connectors. Stay under the maximum voltage, including on cold mornings when
            panel voltage rises.
          </p>
          <h3 className={h3}>Permits and the electrical code</h3>
          <p className={p}>
            Kit sellers rarely mention this. Up to 380 V DC is a serious voltage, and panels on a building in the U.S.
            normally fall under the electrical code's solar rules (NEC Article 690), which include rapid-shutdown
            requirements for rooftop arrays. Many areas need a permit and an inspection. Ground-mounted panels can be
            simpler, but check with your local building department, and use an electrician for the DC wiring if you're not
            sure.
          </p>

          <h2 className={h2}>How reliable are they?</h2>
          <p className={p}>
            Honestly, nobody knows yet. Most of the evidence is owner reviews, forums and sites that earn a commission on
            sales. There's no long-term independent data. What owners report:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>
              <strong>It works as described.</strong> One year-long review of an EG4 24K in a garage measured about 1,100 W
              from solar and 280 W from the grid while running, with grid draw dropping to about 20 W once the space reached
              its setting.
            </li>
            <li>
              <strong>Control boards are the weak point.</strong> The same reviewer destroyed a control board with a voltage
              surge during testing, and owners on the manufacturer's forum report units that run but stop cooling, fixed by a
              replacement.
            </li>
            <li>
              <strong>Ice in hard freezes</strong> when used for heating in very cold climates. Not an issue in the Caribbean.
            </li>
            <li>
              <strong>Short warranties.</strong> Five years, against the 10–12 years major brands like Mitsubishi and Daikin
              offer on registered, professionally installed units. Local technicians may not know these brands, and parts come
              through the seller.
            </li>
          </ul>

          <h2 className={h2}>In the Caribbean and other hurricane zones</h2>
          <p className={p}>
            The numbers are best here, and so are the risks. Before buying, plan for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Wind.</strong> Panels and mounts need a wind rating that matches your local building code, and the outdoor unit needs proper anchoring.</li>
            <li><strong>Salt air.</strong> Near the coast, ask for a corrosion-protected outdoor coil and stainless or coated hardware; salt shortens the life of any outdoor unit.</li>
            <li>
              <strong>Power quality.</strong> Control boards are the reported weak spot, and island grids surge and sag. A
              voltage protector on the outdoor unit is cheap insurance. See{' '}
              <Link to="/blog/protect-air-conditioner-power-surges-outages" className={a}>how to protect your AC from surges and brownouts</Link>.
            </li>
            <li><strong>Refrigerant.</strong> New R-410A equipment hasn't been allowed in the U.S. since January 2025; check that any unit you're quoted uses R-32 or another current refrigerant, especially older stock shipped to the islands.</li>
          </ul>

          <h2 className={h2}>Hybrid mini-split or rooftop solar?</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-lg border border-teal-200 bg-teal-50/40 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">A hybrid mini-split makes sense if</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>The space is cooled mostly during daylight: a shop, office, garage or workshop</li>
                <li>Power is expensive and sun is strong</li>
                <li>Your utility doesn't credit solar you send to the grid</li>
                <li>You want to cool one space, not run a whole-house solar project</li>
                <li>You're comfortable with a 5-year warranty</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Rooftop solar plus a major-brand unit makes sense if</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>Your utility offers net metering or buys back solar</li>
                <li>You'd rather not waste midday solar the AC can't use</li>
                <li>It's your main home system and you want a 10–12 year warranty</li>
                <li>You want local technicians who know the brand</li>
              </ul>
            </div>
          </div>
          <p className={p}>
            Comparing ordinary mini-splits? See <Link to="/blog/mini-split-cost-2026" className={a}>mini-split costs in 2026</Link>{' '}
            and what AC costs to run <Link to="/ac-cost" className={a}>in your state</Link> or{' '}
            <Link to="/ac-cost/caribbean" className={a}>in the Caribbean</Link>.
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
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 mb-8">
            <li>
              EG4 specifications: <a href="https://eg4electronics.com/wp-content/uploads/2025/10/EG4-12K-24K-Hybrid-Mini-Split-ACDC-R32-Spec-Sheet.pdf" target="_blank" rel="noopener noreferrer" className={ext}>EG4 12K/24K hybrid R-32 spec sheet</a>; price and warranty: <a href="https://signaturesolar.com/eg4-12k-btu-hybrid-solar-mini-split" target="_blank" rel="noopener noreferrer" className={ext}>Signature Solar</a> (October 2026).
            </li>
            <li>
              Year-long owner review: <a href="https://www.thesolarlab.com/review/eg4-24k-mini-split-3" target="_blank" rel="noopener noreferrer" className={ext}>The Solar Lab, EG4 24K</a>. Owner reports: <a href="https://forum.eg4electronics.com/community/high-efficiency-appliances/hybrid-mini-split-12k-not-heating-cooling" target="_blank" rel="noopener noreferrer" className={ext}>EG4 forum</a>.
            </li>
            <li>
              HotSpot Energy: <a href="https://cdn.shopify.com/s/files/1/0247/4829/4218/files/3.pdf" target="_blank" rel="noopener noreferrer" className={ext}>ACDC18C spec sheet</a>; 12K price from retail listings. Gree: <a href="https://www.pv-magazine-india.com/2024/06/20/gree-presents-photovoltaic-dc-air-conditioner" target="_blank" rel="noopener noreferrer" className={ext}>pv magazine, June 2024</a>. Deye: <a href="https://deye.com/product/dc48v-solar-air-conditioner/" target="_blank" rel="noopener noreferrer" className={ext}>DC48V solar air conditioner</a>.
            </li>
            <li>
              Electricity rates: <a href={RATES_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={ext}>EIA Electric Power Monthly, Table 5.6.A</a> ({RATES_AS_OF}); the Bahamas from the <Link to="/ac-cost/bahamas" className={ext}>Bahamas cost page</Link>.
            </li>
            <li>
              Peak sun hours: our estimates from NREL solar maps (state ranges summarized by <a href="https://www.solarreviews.com/blog/peak-sun-hours-explained" target="_blank" rel="noopener noreferrer" className={ext}>SolarReviews</a>). Share of solar used, the 0.8 loss factor and the ${EXTRA_COST.toLocaleString()} extra cost are our estimates.
            </li>
            <li>
              R-410A rules: <a href="https://www.achrnews.com/articles/165640-epa-offers-temporary-relief-on-r-410a-installations" target="_blank" rel="noopener noreferrer" className={ext}>ACHR News on EPA relief for R-410A installations</a>. Rapid shutdown: <a href="https://iaeimagazine.org/2015/januaryfebruary-2015/rapid-shutdown-of-pv-systems/" target="_blank" rel="noopener noreferrer" className={ext}>IAEI Magazine</a>.
            </li>
          </ul>

          <div className="rounded-lg bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">What does your cooling cost now?</h3>
            <p className="text-gray-700 mb-4">
              Enter your current system, hours and rate to see what you're paying and what a more efficient unit would save.
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
