// AC running-cost data: state electricity rates (EIA) + climate usage bands, and the
// formulas every cost page uses. Rates live in stateRates.json, generated from EIA
// Electric Power Monthly Table 5.6.A by scripts/update-state-rates.py.
import rates from './stateRates.json';

export type ClimateBand = 'minimal' | 'cool' | 'moderate' | 'warm' | 'hot';

/** Typical full-load cooling hours per year for a central AC, by climate band (our estimate). */
export const BAND_HOURS: Record<ClimateBand, number> = {
  minimal: 300,
  cool: 900,
  moderate: 1500,
  warm: 2200,
  hot: 3000,
};

/** Fits "a climate with ___". */
export const BAND_LABEL: Record<ClimateBand, string> = {
  minimal: 'very little need for cooling',
  cool: 'a short cooling season',
  moderate: 'a moderate cooling season',
  warm: 'a long, warm cooling season',
  hot: 'a cooling season that lasts most of the year',
};

interface StateInfo {
  name: string;
  abbr: string;
  climate: ClimateBand;
}

const STATE_LIST: StateInfo[] = [
  { name: 'Alabama', abbr: 'AL', climate: 'warm' },
  { name: 'Alaska', abbr: 'AK', climate: 'minimal' },
  { name: 'Arizona', abbr: 'AZ', climate: 'hot' },
  { name: 'Arkansas', abbr: 'AR', climate: 'warm' },
  { name: 'California', abbr: 'CA', climate: 'moderate' },
  { name: 'Colorado', abbr: 'CO', climate: 'cool' },
  { name: 'Connecticut', abbr: 'CT', climate: 'cool' },
  { name: 'Delaware', abbr: 'DE', climate: 'moderate' },
  { name: 'District of Columbia', abbr: 'DC', climate: 'moderate' },
  { name: 'Florida', abbr: 'FL', climate: 'hot' },
  { name: 'Georgia', abbr: 'GA', climate: 'warm' },
  { name: 'Hawaii', abbr: 'HI', climate: 'hot' },
  { name: 'Idaho', abbr: 'ID', climate: 'cool' },
  { name: 'Illinois', abbr: 'IL', climate: 'moderate' },
  { name: 'Indiana', abbr: 'IN', climate: 'moderate' },
  { name: 'Iowa', abbr: 'IA', climate: 'moderate' },
  { name: 'Kansas', abbr: 'KS', climate: 'moderate' },
  { name: 'Kentucky', abbr: 'KY', climate: 'moderate' },
  { name: 'Louisiana', abbr: 'LA', climate: 'hot' },
  { name: 'Maine', abbr: 'ME', climate: 'cool' },
  { name: 'Maryland', abbr: 'MD', climate: 'moderate' },
  { name: 'Massachusetts', abbr: 'MA', climate: 'cool' },
  { name: 'Michigan', abbr: 'MI', climate: 'cool' },
  { name: 'Minnesota', abbr: 'MN', climate: 'cool' },
  { name: 'Mississippi', abbr: 'MS', climate: 'warm' },
  { name: 'Missouri', abbr: 'MO', climate: 'moderate' },
  { name: 'Montana', abbr: 'MT', climate: 'cool' },
  { name: 'Nebraska', abbr: 'NE', climate: 'moderate' },
  { name: 'Nevada', abbr: 'NV', climate: 'warm' },
  { name: 'New Hampshire', abbr: 'NH', climate: 'cool' },
  { name: 'New Jersey', abbr: 'NJ', climate: 'moderate' },
  { name: 'New Mexico', abbr: 'NM', climate: 'moderate' },
  { name: 'New York', abbr: 'NY', climate: 'cool' },
  { name: 'North Carolina', abbr: 'NC', climate: 'moderate' },
  { name: 'North Dakota', abbr: 'ND', climate: 'cool' },
  { name: 'Ohio', abbr: 'OH', climate: 'moderate' },
  { name: 'Oklahoma', abbr: 'OK', climate: 'warm' },
  { name: 'Oregon', abbr: 'OR', climate: 'cool' },
  { name: 'Pennsylvania', abbr: 'PA', climate: 'moderate' },
  { name: 'Rhode Island', abbr: 'RI', climate: 'cool' },
  { name: 'South Carolina', abbr: 'SC', climate: 'warm' },
  { name: 'South Dakota', abbr: 'SD', climate: 'cool' },
  { name: 'Tennessee', abbr: 'TN', climate: 'moderate' },
  { name: 'Texas', abbr: 'TX', climate: 'hot' },
  { name: 'Utah', abbr: 'UT', climate: 'moderate' },
  { name: 'Vermont', abbr: 'VT', climate: 'cool' },
  { name: 'Virginia', abbr: 'VA', climate: 'moderate' },
  { name: 'Washington', abbr: 'WA', climate: 'cool' },
  { name: 'West Virginia', abbr: 'WV', climate: 'moderate' },
  { name: 'Wisconsin', abbr: 'WI', climate: 'cool' },
  { name: 'Wyoming', abbr: 'WY', climate: 'cool' },
];

export const RATES_AS_OF: string = rates.asOf; // e.g. "July 2026"
/** Date these pages were last updated (YYYY-MM-DD). Bump when rates are refreshed. */
export const AC_COST_UPDATED: string = rates.updated;
export const RATES_SOURCE_URL = 'https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a';
/** U.S. average residential rate, $/kWh */
export const US_RATE: number = rates.us / 100;

export interface StateCost extends StateInfo {
  slug: string;
  /** residential rate, $/kWh */
  rate: number;
  /** typical annual cooling hours for this climate */
  hours: number;
  /** 1 = most expensive electricity */
  rank: number;
}

const ratesByAbbr = rates.states as Record<string, number>;

export const STATES: StateCost[] = (() => {
  const list = STATE_LIST.map((s) => ({
    ...s,
    slug: s.name.toLowerCase().replace(/ /g, '-'),
    rate: ratesByAbbr[s.abbr] / 100,
    hours: BAND_HOURS[s.climate],
    rank: 0,
  }));
  [...list].sort((a, b) => b.rate - a.rate).forEach((s, i) => { s.rank = i + 1; });
  return list;
})();

export function getState(slug: string | undefined) {
  return STATES.find((s) => s.slug === slug);
}

/** Electrical draw in kW of a central AC (tons × 12,000 Btu/h ÷ SEER ÷ 1,000). */
export function kw(tons: number, seer: number) {
  return (tons * 12) / seer;
}

export function annualKwh(tons: number, seer: number, hours: number) {
  return kw(tons, seer) * hours;
}

export function annualCost(tons: number, seer: number, hours: number, rate: number) {
  return annualKwh(tons, seer, hours) * rate;
}

export function costPerHour(tons: number, seer: number, rate: number) {
  return kw(tons, seer) * rate;
}

export const TONNAGES = [1.5, 2, 2.5, 3, 3.5, 4, 5];
export const SEERS = [10, 13, 14, 16, 18, 20];
/** Reference system used for headline numbers. */
export const REF_TONS = 3;
export const REF_SEER = 14;
/** "Summer month" scenario: 8 hours a day for 30 days. */
export const SUMMER_MONTH_HOURS = 240;

export const usd = (n: number, digits = 0) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: digits, maximumFractionDigits: digits });
export const cents = (rate: number) => `${(rate * 100).toFixed(2)}¢`;
