// Canadian electricity prices for the AC cost pages. All values come from
// canadaRates.json (Hydro-Québec's annual city price comparison): edit that one
// file to update every Canada page.
import data from './canadaRates.json';

export interface City {
  name: string;
  /** monthly bill, C$ before tax, at 1,000 kWh */
  bill1000: number;
  /** monthly bill, C$ before tax, at 2,000 kWh */
  bill2000: number;
  /** average price at 1,000 kWh/month, C$/kWh */
  rate: number;
  /** price of each kWh between 1,000 and 2,000 a month, C$/kWh: what AC use adds */
  extraRate: number;
}

export interface Province {
  name: string;
  slug: string;
  abbr: string;
  utility: string;
  /** typical full-load cooling hours per year (our estimate) */
  hours: number;
  cities: City[];
  note: string;
  /** the largest listed city, used for the province's headline numbers */
  city: City;
  /** headline average price, C$/kWh */
  rate: number;
  /** headline rate converted to US$/kWh */
  usdRate: number;
  /** 1 = most expensive */
  rank: number;
}

export const CANADA_UPDATED: string = data.updated;
export const CANADA_RATES_DATE: string = data.ratesInEffect;
export const CANADA_SOURCE: string = data.source;
export const CANADA_SOURCE_URL: string = data.sourceUrl;
export const USD_PER_CAD: number = data.usdPerCad;
export const USD_PER_CAD_AS_OF: string = data.usdPerCadAsOf;

function city(c: { name: string; bill1000: number; bill2000: number }): City {
  return { ...c, rate: c.bill1000 / 1000, extraRate: (c.bill2000 - c.bill1000) / 1000 };
}

export const PROVINCES: Province[] = (() => {
  const list = data.provinces.map((p) => {
    const cities = p.cities.map(city);
    return { ...p, cities, city: cities[0], rate: cities[0].rate, usdRate: cities[0].rate * USD_PER_CAD, rank: 0 };
  });
  [...list].sort((a, b) => b.rate - a.rate).forEach((p, i) => { p.rank = i + 1; });
  return list;
})();

/** U.S. cities from the same comparison (same method, C$ before tax). */
export const US_CITIES = data.usCities.map((c) => ({ ...c, rate: c.bill1000 / 1000 }));

export function getProvince(slug: string | undefined) {
  return PROVINCES.find((p) => p.slug === slug);
}

/** C$ amount, e.g. "C$1,234" or "C$0.42". */
export const cad = (n: number, digits = 0) =>
  `C$${n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
