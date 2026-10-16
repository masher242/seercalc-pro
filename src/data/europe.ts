// European electricity prices for the AC cost pages. All values come from
// europeRates.json: edit that one file to update every Europe page.
//
// European units: air conditioners are sold by cooling capacity in kW, and rated
// with the EU seasonal efficiency (SEER, in W/W) shown on the energy label. EU SEER
// is measured differently from U.S. SEER (Btu/Wh), so the two aren't converted.
import data from './europeRates.json';

export interface City {
  name: string;
  /** typical full-load cooling hours per year (our estimate) */
  hours: number;
}

export interface EuCountry {
  name: string;
  slug: string;
  currency: 'EUR' | 'GBP';
  /** price per kWh that AC use adds, local currency */
  rate: number;
  rateNote: string;
  asOf: string;
  source: string;
  sourceUrl: string;
  cities: City[];
  refCity: string;
  tariff: string[];
  article?: string;
  /** name as used mid-sentence, e.g. "the United Kingdom" */
  inName: string;
  ref: City;
  /** rate in US dollars per kWh */
  usdRate: number;
  /** 1 = most expensive */
  rank: number;
}

export const EUROPE_UPDATED: string = data.updated;
export const USD_PER_EUR: number = data.usdPerEur;
export const GBP_PER_EUR: number = data.gbpPerEur;
export const FX_AS_OF: string = data.fxAsOf;

export const toUsd = (amount: number, currency: EuCountry['currency']) =>
  currency === 'EUR' ? amount * USD_PER_EUR : (amount / GBP_PER_EUR) * USD_PER_EUR;

export const EU_COUNTRIES: EuCountry[] = (() => {
  const list = (data.countries as Omit<EuCountry, 'inName' | 'ref' | 'usdRate' | 'rank'>[]).map((c) => ({
    ...c,
    inName: c.article ? `${c.article} ${c.name}` : c.name,
    ref: c.cities.find((x) => x.name === c.refCity) ?? c.cities[0],
    usdRate: toUsd(c.rate, c.currency),
    rank: 0,
  }));
  [...list].sort((a, b) => b.usdRate - a.usdRate).forEach((c, i) => { c.rank = i + 1; });
  return list;
})();

export function getEuCountry(slug: string | undefined) {
  return EU_COUNTRIES.find((c) => c.slug === slug);
}

/** Split-system cooling capacities sold in Europe, kW. */
export const EU_SIZES = [
  { kw: 2.5, label: '2.5 kW', use: 'bedroom or small room' },
  { kw: 3.5, label: '3.5 kW', use: 'living room' },
  { kw: 5, label: '5 kW', use: 'large room or open-plan space' },
  { kw: 7, label: '7 kW', use: 'small apartment (multi-split)' },
];

/** EU energy label (cooling) thresholds for SEER, units under 12 kW. */
export const EU_SEERS = [
  { seer: 4.6, label: 'B', note: 'older unit' },
  { seer: 5.1, label: 'A', note: '' },
  { seer: 6.1, label: 'A++', note: 'typical new split' },
  { seer: 7.0, label: 'A++', note: 'mid-range' },
  { seer: 8.5, label: 'A+++', note: '' },
  { seer: 10, label: 'A+++', note: 'top models' },
];

export const EU_REF_KW = 3.5;
export const EU_REF_SEER = 6.1;
/** Typical single-duct portable AC: about 2.6 kW cooling for about 1 kW of electricity. */
export const PORTABLE_KW_ELEC = 1.0;
/** "Hot month" scenario: 8 hours a day for 30 days. */
export const HOT_MONTH_HOURS = 240;

/** Electricity drawn (kW) by a split AC delivering `kw` of cooling at seasonal efficiency `seer`. */
export const elecKw = (kw: number, seer: number) => kw / seer;
export const yearCost = (kw: number, seer: number, hours: number, rate: number) => elecKw(kw, seer) * hours * rate;
export const hourCost = (kw: number, seer: number, rate: number) => elecKw(kw, seer) * rate;

export function money(currency: EuCountry['currency'], n: number, digits = 0) {
  return n.toLocaleString('en-GB', { style: 'currency', currency, minimumFractionDigits: digits, maximumFractionDigits: digits });
}

/** Price per kWh as shown on the pages, e.g. "€0.2509" or "26.32p". */
export function unitPrice(c: Pick<EuCountry, 'currency' | 'rate'>) {
  return c.currency === 'GBP' ? `${(c.rate * 100).toFixed(2)}p` : `€${c.rate.toFixed(4)}`;
}
