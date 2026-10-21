// Electricity prices for the Asia AC cost pages. All values come from asiaRates.json:
// edit that one file to update every Asia page.
//
// Each country keeps its own currency. rate = the price, in local currency, of each
// kWh an air conditioner adds to a household bill (each country's rateNote explains
// how it was worked out). U.S. dollar figures use ECB reference rates.
import data from './asiaRates.json';

export type AsiaCurrency = 'SGD' | 'PHP' | 'HKD' | 'JPY' | 'MYR' | 'THB';

export interface AsiaZone {
  id: string;
  name: string;
  area: string;
  /** local currency per kWh */
  rate: number;
}

export interface AsiaCity {
  name: string;
  /** typical full-load cooling hours per year for one split unit (our estimate) */
  hours: number;
  zone: string;
}

export interface AsiaCountry {
  name: string;
  slug: string;
  currency: AsiaCurrency;
  zones: AsiaZone[];
  rateNote: string;
  asOf: string;
  source: string;
  sourceUrl: string;
  cities: AsiaCity[];
  refCity: string;
  units: string;
  tariff: string[];
  ref: AsiaCity;
  refZone: AsiaZone;
  /** headline price, local currency per kWh (the reference city's zone) */
  rate: number;
  /** headline price in US$ per kWh */
  usdRate: number;
  /** 1 = most expensive (in US$) */
  rank: number;
}

export const ASIA_UPDATED: string = data.updated;
export const ASIA_FX_AS_OF: string = data.fxAsOf;
export const ASIA_FX_SOURCE: string = data.fxSource;
export const USD_PER: Record<AsiaCurrency, number> = data.usdPer as Record<AsiaCurrency, number>;

export const ASIA_COUNTRIES: AsiaCountry[] = (() => {
  const list = (data.countries as Omit<AsiaCountry, 'ref' | 'refZone' | 'rate' | 'usdRate' | 'rank'>[]).map((c) => {
    const ref = c.cities.find((x) => x.name === c.refCity) ?? c.cities[0];
    const refZone = c.zones.find((z) => z.id === ref.zone) ?? c.zones[0];
    return { ...c, ref, refZone, rate: refZone.rate, usdRate: refZone.rate * USD_PER[c.currency], rank: 0 };
  });
  [...list].sort((a, b) => b.usdRate - a.usdRate).forEach((c, i) => { c.rank = i + 1; });
  return list;
})();

export function getAsiaCountry(slug: string | undefined) {
  return ASIA_COUNTRIES.find((c) => c.slug === slug);
}

export const asiaZoneOf = (c: AsiaCountry, city: AsiaCity) => c.zones.find((z) => z.id === city.zone) ?? c.refZone;
export const asiaCityRate = (c: AsiaCountry, city: AsiaCity) => asiaZoneOf(c, city).rate;

/** Same reference unit and efficiency assumptions as the Australia pages. */
export { AU_REF_KW as ASIA_REF_KW, AU_REF_EFF as ASIA_REF_EFF, AU_EFFS as ASIA_EFFS, PORTABLE_KW_ELEC, HOT_MONTH_HOURS, yearCost, hourCost } from './australia';

/** Sizes as sold in the region: horsepower (Singapore, Malaysia, Philippines, Hong Kong), BTU (Thailand) or kW (Japan). */
export const ASIA_SIZES = [
  { kw: 2.5, label: '1 hp · 2.5 kW (9,000 BTU)', use: 'bedroom' },
  { kw: 3.5, label: '1.5 hp · 3.5 kW (12,000 BTU)', use: 'large bedroom or living room' },
  { kw: 5, label: '2 hp · 5 kW (18,000 BTU)', use: 'large living room' },
  { kw: 7, label: '2.5 hp · 7 kW (24,000 BTU)', use: 'open-plan living area' },
];

const SYMBOL: Record<AsiaCurrency, string> = { SGD: 'S$', PHP: '₱', HKD: 'HK$', JPY: '¥', MYR: 'RM', THB: '฿' };
/** Digits for amounts like a yearly cost (yen has no decimals). */
const BIG_DIGITS: Record<AsiaCurrency, number> = { SGD: 0, PHP: 0, HKD: 0, JPY: 0, MYR: 0, THB: 0 };
/** Digits for small amounts like a cost per hour. */
const SMALL_DIGITS: Record<AsiaCurrency, number> = { SGD: 2, PHP: 2, HKD: 2, JPY: 0, MYR: 2, THB: 2 };

/** Money in local currency. `small` = per-hour style amounts with decimals (except yen). */
export function lmoney(cur: AsiaCurrency, n: number, small = false) {
  const d = small ? SMALL_DIGITS[cur] : BIG_DIGITS[cur];
  return `${SYMBOL[cur]}${n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })}`;
}

/** Price per kWh as shown on the pages, e.g. "S$0.3116", "₱15.06", "¥38.87". */
export function lprice(cur: AsiaCurrency, rate: number) {
  const d = cur === 'PHP' || cur === 'JPY' || cur === 'THB' ? 2 : cur === 'HKD' ? 3 : 4;
  return `${SYMBOL[cur]}${rate.toFixed(d)}`;
}

export const usd0 = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
