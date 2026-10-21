// Heating-cost model for the heat pump articles (U.S. and Canada). Every figure that comes
// from a source names it; figures marked "our estimate" are assumptions shown on the page.
import { US_RATE } from './acCost';

/** kWh in one million Btu. */
export const KWH_PER_MMBTU = 293.07;

// ---- U.S. fuel prices: EIA Winter Fuels Outlook, Oct 6, 2026 (winter 2026–27 forecast, U.S. average) ----
export const US_FUEL_SOURCE = 'EIA Winter Fuels Outlook (October 6, 2026), U.S. average residential prices forecast for winter 2026–27';
export const US_FUEL_SOURCE_URL = 'https://www.eia.gov/outlooks/steo/report/perspectives/2026/10-winterfuels/article.php';
export const US_GAS_PER_MCF = 13.44;
export const US_PROPANE_PER_GAL = 2.52;
export const US_OIL_PER_GAL = 5.26;
/** Electricity uses the site's EIA state-rate file (newest month), so it matches the AC cost pages. */
export const US_ELEC = US_RATE;

/** Heat content (EIA conversion factors, rounded): natural gas per Mcf, propane and heating oil per gallon, MMBtu. */
export const GAS_MMBTU_PER_MCF = 1.036;
export const PROPANE_MMBTU_PER_GAL = 0.0915;
export const OIL_MMBTU_PER_GAL = 0.1385;

export type Fuel = 'gas' | 'propane' | 'oil' | 'electric';

export const FUELS: { id: Fuel; label: string; unit: string; efficiency: number; effLabel: string }[] = [
  { id: 'gas', label: 'Natural gas furnace', unit: '$/thousand cubic feet', efficiency: 0.95, effLabel: '95% (new high-efficiency furnace)' },
  { id: 'propane', label: 'Propane furnace', unit: '$/gallon', efficiency: 0.95, effLabel: '95%' },
  { id: 'oil', label: 'Heating oil furnace or boiler', unit: '$/gallon', efficiency: 0.85, effLabel: '85%' },
  { id: 'electric', label: 'Electric furnace or baseboard', unit: '¢/kWh', efficiency: 1, effLabel: '100%' },
];

export const US_FUEL_PRICE: Record<Fuel, number> = {
  gas: US_GAS_PER_MCF,
  propane: US_PROPANE_PER_GAL,
  oil: US_OIL_PER_GAL,
  electric: US_ELEC,
};

/** Cost of one MMBtu of heat delivered into the house, US$. `price` in the fuel's unit ($/kWh for electric). */
export function costPerMmbtu(fuel: Fuel, price: number, efficiency = FUELS.find((f) => f.id === fuel)!.efficiency) {
  switch (fuel) {
    case 'gas': return price / GAS_MMBTU_PER_MCF / efficiency;
    case 'propane': return price / PROPANE_MMBTU_PER_GAL / efficiency;
    case 'oil': return price / OIL_MMBTU_PER_GAL / efficiency;
    case 'electric': return (KWH_PER_MMBTU * price) / efficiency;
  }
}

export function heatPumpCostPerMmbtu(elecPrice: number, cop: number) {
  return (KWH_PER_MMBTU * elecPrice) / cop;
}

// ---- Climate presets: heat delivered per year for a typical 2,000 sq ft U.S. home (our estimate) ----
export type ClimateId = 'mild' | 'moderate' | 'cold' | 'veryCold';
export const CLIMATES: { id: ClimateId; label: string; examples: string; mmbtu: number; copFactor: number }[] = [
  { id: 'mild', label: 'Mild winters', examples: 'Gulf Coast, Southern California, Arizona', mmbtu: 15, copFactor: 1.15 },
  { id: 'moderate', label: 'Moderate winters', examples: 'Mid-Atlantic, Tennessee, Pacific Northwest', mmbtu: 30, copFactor: 1 },
  { id: 'cold', label: 'Cold winters', examples: 'Midwest, New York, southern New England', mmbtu: 45, copFactor: 0.9 },
  { id: 'veryCold', label: 'Very cold winters', examples: 'Minnesota, Wisconsin, northern New England', mmbtu: 60, copFactor: 0.8 },
];

// ---- Heat pumps: HSPF2 is rated for a moderately cold climate (DOE region IV) ----
export const HEAT_PUMPS = [
  { id: 'standard', label: 'Standard heat pump (HSPF2 7.5, the federal minimum)', hspf2: 7.5 },
  { id: 'cold', label: 'Cold-climate heat pump (HSPF2 9.0)', hspf2: 9 },
] as const;

/** Seasonal COP: HSPF2 ÷ 3.412, adjusted for colder or milder climates (our estimate). */
export function seasonalCop(hspf2: number, copFactor = 1) {
  return (hspf2 / 3.412) * copFactor;
}

// ---- Extra cost of a heat pump over a central AC of the same size ----
/** PickHVAC (Sept 2025): central AC $4,500–$9,000 installed vs air-source heat pump $6,500–$13,500. */
export const HP_PREMIUM = 3000;
export const HP_PREMIUM_RANGE = '$2,000–$4,500';
export const HP_PREMIUM_SOURCE_URL = 'https://www.pickhvac.com/heat-pump-air-conditioner-cost-installation-energy-bills/';

/** Electricity price (US$/kWh) at which a heat pump costs the same to run as a gas furnace. */
export function gasBreakEvenElec(gasPerMcf: number, cop: number, furnaceEff = 0.95) {
  return (gasPerMcf * cop) / (GAS_MMBTU_PER_MCF * furnaceEff * KWH_PER_MMBTU);
}

// ---- Canada ----
/** Heat content per unit, kWh (our rounding of standard values). */
export const CA_GAS_KWH_PER_M3 = 10.5; // ~38 MJ/m³
export const CA_OIL_KWH_PER_L = 10.7; // ~38.6 MJ/L
/** Heating oil, Canada average, GlobalPetrolPrices, Feb 9, 2026. */
export const CA_OIL_PER_L = 1.74;
export const CA_OIL_AS_OF = 'February 9, 2026';
export const CA_OIL_SOURCE_URL = 'https://www.globalpetrolprices.com/Canada/heating_oil_prices/';
/**
 * Enbridge Gas (Toronto-area EGD rate zone) from July 1, 2026, OEB QRAM notice: delivery over 170 m³ 12.3904¢
 * + transportation 5.4267¢ + gas supply 9.0498¢ = 26.87¢/m³ before HST; no federal carbon charge.
 * The monthly customer charge ($27.69) doesn't change with use, so it's left out.
 */
export const ENBRIDGE_PER_M3 = 0.2687;
export const ENBRIDGE_SOURCE_URL = 'https://oeb.ca/sites/default/files/qram-enbridge-20260701-en.pdf';
/** Same house everywhere: heat delivered per year, kWh (our estimate for a typical detached house). */
export const CA_HEAT_KWH = 15000;
/** Seasonal COP for a cold-climate heat pump in most of Canada, including backup heat on the coldest days (our estimate). */
export const CA_COP = 2.5;
