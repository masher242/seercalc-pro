// "Cost to run AC around the world": every place the site prices, on one yardstick.
//
// Region pages each use their own unit and their own hour estimates (a 3-ton central system
// in North America, a 3.5 kW split elsewhere). To compare places fairly, this page prices
// the same unit everywhere and works out its hours with one rule from measured climate:
//   unit   one 12,000 BTU (1 ton, 3.5 kW of cooling) inverter unit, seasonal efficiency 5.0
//          → 0.70 kWh of electricity per hour at full power (same as the Australia/Asia pages)
//   hours  WORLD_HOURS_BASE + WORLD_HOURS_PER_CDD × cooling degree days (base 18.3 °C,
//          2016–2025 average, Open-Meteo/ERA5; climateCdd.json), rounded to 10 h
//   price  each place's price per kWh in US$ (Europe: Eurostat all-in average, as on the map)
// The hours rule is a straight-line fit to the city-by-city hour estimates on our Europe,
// Caribbean, Australia and Asia pages (69 cities, 2026-10-21: 81 h + 0.81 h per CDD).
import climate from './climateCdd.json';
import eu from './euHouseholdRates.json';
import { STATES, RATES_AS_OF } from './acCost';
import { COUNTRIES } from './caribbean';
import { PROVINCES, CANADA_RATES_DATE } from './canada';
import { EU_COUNTRIES, USD_PER_EUR, GBP_PER_EUR } from './europe';
import { AU_STATES, AU_PERIOD, AU_REF_KW, AU_REF_EFF } from './australia';
import { ASIA_COUNTRIES } from './asia';

export const WORLD_UNIT_BTU = 12000;
export const WORLD_UNIT_KW = AU_REF_KW; // 3.5 kW of cooling
export const WORLD_UNIT_EFF = AU_REF_EFF; // seasonal efficiency 5.0
/** Electricity used per hour at full power, kWh. */
export const WORLD_KWH_PER_HOUR = WORLD_UNIT_KW / WORLD_UNIT_EFF;
export const WORLD_HOURS_BASE = 80;
export const WORLD_HOURS_PER_CDD = 0.8;
export const WORLD_FIT_CITIES = 69;
export const CLIMATE_YEARS: string = climate.years;
export const CLIMATE_SOURCE: string = climate.source;
export const CLIMATE_SOURCE_URL: string = climate.sourceUrl;
export const WORLD_UPDATED = '2026-10-21';

export type Region = 'United States' | 'Caribbean' | 'Canada' | 'Europe' | 'Australia' | 'Asia';
export const REGIONS: Region[] = ['United States', 'Canada', 'Caribbean', 'Europe', 'Asia', 'Australia'];

/** all-in = average including fixed charges (and taxes, except Canada); usage = per-kWh charges, fixed monthly charge not included */
export type Basis = 'all-in' | 'usage';

export interface WorldPlace {
  id: string;
  name: string;
  region: Region;
  /** city whose climate is used */
  city: string;
  /** page on this site with the full local breakdown */
  href: string;
  /** price per kWh in US$ */
  usdRate: number;
  basis: Basis;
  priceDate: string;
  /** cooling degree days per year (base 18.3 °C) */
  cdd: number;
  /** full-power running hours per year on the world yardstick */
  hours: number;
  perHour: number;
  perYear: number;
}

const CDD = climate.locations as Record<string, { name: string; cdd: number }>;

export function worldHours(cdd: number) {
  return Math.round((WORLD_HOURS_BASE + WORLD_HOURS_PER_CDD * cdd) / 10) * 10;
}

function place(p: Omit<WorldPlace, 'cdd' | 'hours' | 'perHour' | 'perYear' | 'city'>, climateId: string): WorldPlace {
  const c = CDD[climateId];
  if (!c) throw new Error(`No climate data for ${climateId}`);
  const hours = worldHours(c.cdd);
  const perHour = WORLD_KWH_PER_HOUR * p.usdRate;
  return { ...p, city: c.name, cdd: c.cdd, hours, perHour, perYear: perHour * hours };
}

// Europe pages that have their own country page (slug by ISO code); the rest link to the hub map.
const EU_PAGE_BY_ISO: Record<string, string> = {
  ES: 'spain', FR: 'france', PT: 'portugal', GB: 'united-kingdom', IT: 'italy', GR: 'greece', CY: 'cyprus', MT: 'malta',
};

function europe(): WorldPlace[] {
  const entries = Object.entries(eu.countries as Record<string, { name: string; price: number; periodLabel?: string }>);
  const rows = entries.map(([iso, c]) => ({ iso, name: c.name, eur: c.price, date: c.periodLabel ?? eu.periodLabel }));
  // UK: not in Eurostat since 2020; priced like the Europe map (Ofgem unit rate + standing charge spread over typical use).
  const uk = EU_COUNTRIES.find((c) => c.slug === 'united-kingdom');
  if (uk) {
    const gbp = uk.rate + ((uk.standingChargePerDay ?? 0) * 365) / (uk.typicalKwh ?? 2500);
    rows.push({ iso: 'GB', name: 'United Kingdom', eur: gbp / GBP_PER_EUR, date: uk.asOf });
  }
  return rows.map((r) => {
    const slug = EU_PAGE_BY_ISO[r.iso];
    const page = slug ? EU_COUNTRIES.find((c) => c.slug === slug) : undefined;
    const climateId = page ? `eu:${page.slug}:${page.refCity}` : `eucap:${r.iso}`;
    return place({
      id: `eu-${r.iso.toLowerCase()}`,
      name: r.name,
      region: 'Europe',
      href: page ? `/ac-cost/${page.slug}` : '/ac-cost/europe#map',
      usdRate: r.eur * USD_PER_EUR,
      basis: 'all-in',
      priceDate: r.date,
    }, climateId);
  });
}

export const WORLD_PLACES: WorldPlace[] = [
  ...STATES.map((s) => place({
    id: `us-${s.abbr.toLowerCase()}`, name: s.name, region: 'United States', href: `/ac-cost/${s.slug}`,
    usdRate: s.rate, basis: 'all-in', priceDate: RATES_AS_OF,
  }, `us:${s.abbr}`)),
  ...COUNTRIES.map((c) => place({
    id: `cb-${c.slug}`, name: c.name, region: 'Caribbean', href: `/ac-cost/${c.slug}`,
    usdRate: c.usdRate, basis: c.basis.startsWith('All-in') ? 'all-in' : 'usage', priceDate: c.asOf,
  }, `cb:${c.slug}`)),
  ...PROVINCES.map((p) => place({
    id: `ca-${p.slug}`, name: p.name, region: 'Canada', href: `/ac-cost/canada/${p.slug}`,
    usdRate: p.usdRate, basis: 'all-in', priceDate: CANADA_RATES_DATE,
  }, `ca:${p.abbr}:${p.city.name}`)),
  ...europe(),
  ...AU_STATES.map((s) => place({
    id: `au-${s.slug}`, name: s.name, region: 'Australia', href: `/ac-cost/australia/${s.slug}`,
    usdRate: s.usdRate, basis: 'usage', priceDate: AU_PERIOD,
  }, `au:${s.slug}`)),
  ...ASIA_COUNTRIES.map((c) => place({
    id: `as-${c.slug}`, name: c.name, region: 'Asia', href: `/ac-cost/asia/${c.slug}`,
    usdRate: c.usdRate, basis: 'usage', priceDate: c.asOf,
  }, `as:${c.slug}`)),
];

export const BASIS_LABEL: Record<Basis, string> = {
  'all-in': 'All-in average',
  usage: 'Per-kWh charges',
};

export const REGION_HUB: Record<Region, string> = {
  'United States': '/ac-cost',
  Caribbean: '/ac-cost/caribbean',
  Canada: '/ac-cost/canada',
  Europe: '/ac-cost/europe',
  Australia: '/ac-cost/australia',
  Asia: '/ac-cost/asia',
};
