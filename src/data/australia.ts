// Australian electricity prices for the AC cost pages. All values come from
// australiaRates.json (each state's regulated 2026–27 reference price): edit that
// one file to update every Australia page.
//
// Australian units: air conditioners are sold by cooling output in kW. The price
// used is the flat-tariff usage charge (cents per kWh, GST included): what each
// extra kWh of air conditioning adds to a bill. The daily supply charge is paid
// whether the AC runs or not, so it's shown but not added to running costs.
import data from './australiaRates.json';

export interface AuZone {
  id: string;
  network: string;
  area: string;
  /** usage charge, Australian cents per kWh, GST included */
  usage: number;
  /** daily supply charge, Australian cents per day, GST included */
  supply: number;
}

export interface AuCity {
  name: string;
  /** typical full-load cooling hours per year for one split unit (our estimate) */
  hours: number;
  zone: string;
}

export interface AuState {
  name: string;
  short: string;
  slug: string;
  offer: string;
  regulator: string;
  source: string;
  sourceUrl: string;
  zones: AuZone[];
  cities: AuCity[];
  refCity: string;
  tariff: string[];
  ref: AuCity;
  refZone: AuZone;
  /** headline price, A$ per kWh (the reference city's network) */
  rate: number;
  usdRate: number;
  /** 1 = most expensive */
  rank: number;
}

export const AU_UPDATED: string = data.updated;
export const AU_PERIOD: string = data.period;
export const USD_PER_AUD: number = data.usdPerAud;
export const AU_FX_AS_OF: string = data.fxAsOf;

export const AU_STATES: AuState[] = (() => {
  const list = (data.states as Omit<AuState, 'ref' | 'refZone' | 'rate' | 'usdRate' | 'rank'>[]).map((s) => {
    const ref = s.cities.find((c) => c.name === s.refCity) ?? s.cities[0];
    const refZone = s.zones.find((z) => z.id === ref.zone) ?? s.zones[0];
    const rate = refZone.usage / 100;
    return { ...s, ref, refZone, rate, usdRate: rate * USD_PER_AUD, rank: 0 };
  });
  [...list].sort((a, b) => b.rate - a.rate).forEach((s, i) => { s.rank = i + 1; });
  return list;
})();

export function getAuState(slug: string | undefined) {
  return AU_STATES.find((s) => s.slug === slug);
}

export const zoneOf = (s: AuState, c: AuCity) => s.zones.find((z) => z.id === c.zone) ?? s.refZone;
/** A$ per kWh for a city */
export const cityRate = (s: AuState, c: AuCity) => zoneOf(s, c).usage / 100;

/** Split-system sizes sold in Australia, kW of cooling output (not electricity used). */
export const AU_SIZES = [
  { kw: 2.5, label: '2.5 kW (9,000 BTU)', use: 'bedroom or study' },
  { kw: 3.5, label: '3.5 kW (12,000 BTU)', use: 'large bedroom or small living room' },
  { kw: 5, label: '5 kW (18,000 BTU)', use: 'living room' },
  { kw: 7.1, label: '7.1 kW (24,000 BTU)', use: 'large or open-plan living area' },
];

/**
 * Seasonal efficiency = kW of cooling delivered per kW of electricity over a season.
 * 5.0 is our assumption for a typical new inverter split; the zoned energy rating label
 * gives each model's own yearly kWh for the hot, average and cold zones.
 */
export const AU_EFFS = [
  { eff: 3, note: 'old fixed-speed unit (pre-2010s)' },
  { eff: 4, note: 'older or basic inverter unit' },
  { eff: 5, note: 'typical new inverter split' },
  { eff: 6, note: 'efficient model' },
  { eff: 7, note: 'top models' },
];

export const AU_REF_KW = 3.5;
export const AU_REF_EFF = 5;
/** Ducted whole-home system: our example size and assumed efficiency (duct losses lower it). */
export const DUCTED_KW = 14;
export const DUCTED_EFF = 3.5;
/** Typical portable AC: about 1 kW of electricity. */
export const PORTABLE_KW_ELEC = 1.0;
/** "Hot month" scenario: 8 hours a day for 30 days. */
export const HOT_MONTH_HOURS = 240;

export const elecKw = (kw: number, eff: number) => kw / eff;
export const yearCost = (kw: number, eff: number, hours: number, rate: number) => elecKw(kw, eff) * hours * rate;
export const hourCost = (kw: number, eff: number, rate: number) => elecKw(kw, eff) * rate;

/** A$ amount, e.g. "A$1,234" or "A$0.42". */
export const aud = (n: number, digits = 0) =>
  `A$${n.toLocaleString('en-AU', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;

/** Usage price as shown on the pages, e.g. "33.14¢". */
export const auCents = (centsPerKwh: number) => `${centsPerKwh.toFixed(2)}¢`;
