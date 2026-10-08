// Caribbean electricity rates for the AC cost pages. All values come from
// caribbeanRates.json: edit that one file to update every Caribbean page.
import data from './caribbeanRates.json';

export interface Country {
  name: string;
  slug: string;
  /** ISO currency code */
  currency: string;
  /** residential rate per kWh, local currency */
  localRate: number;
  /** residential rate per kWh, US dollars */
  usdRate: number;
  asOf: string;
  utility: string;
  source: string;
  sourceUrl: string;
  /** typical full-load cooling hours per year (our estimate) */
  hours: number;
  note: string;
  noteUrl?: string;
  /** "the" for names like the Bahamas */
  article?: string;
  /** name as used mid-sentence, e.g. "the Bahamas" */
  inName: string;
  /** possessive, e.g. "the Bahamas'" or "Jamaica's" */
  poss: string;
  /** 1 = most expensive in the list */
  rank: number;
}

/** AP style: names ending in s take an apostrophe only (Bahamas', Cayman Islands'). */
export function possessive(name: string) {
  return name.endsWith('s') ? `${name}'` : `${name}'s`;
}

export const CARIBBEAN_UPDATED: string = data.updated;

export const COUNTRIES: Country[] = (() => {
  const list = (data.countries as Omit<Country, 'rank' | 'inName' | 'poss'>[]).map((c) => {
    const inName = c.article ? `${c.article} ${c.name}` : c.name;
    return { ...c, inName, poss: possessive(inName), rank: 0 };
  });
  [...list].sort((a, b) => b.usdRate - a.usdRate).forEach((c, i) => { c.rank = i + 1; });
  return list;
})();

export function getCountry(slug: string | undefined) {
  return COUNTRIES.find((c) => c.slug === slug);
}

/** Format a local-currency rate, e.g. "JMD 45.56" or "BSD 0.330". */
export function localRateLabel(c: Pick<Country, 'currency' | 'localRate'>) {
  const digits = c.localRate >= 10 ? 2 : 3;
  return `${c.currency} ${c.localRate.toFixed(digits)}`;
}
