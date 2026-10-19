// Shared numbers for the fan articles (/blog/ceiling-fan-vs-ac-savings and friends).
// Change a wattage or assumption here and every fan page updates.
import { kw } from './acCost';

export const FANS_UPDATED = '2026-10-19';

export interface FanType {
  id: 'dc-ceiling' | 'ac-ceiling' | 'box' | 'pedestal' | 'tower';
  name: string;
  short: string;
  /** typical draw on high speed, watts (what our cost tables use) */
  watts: number;
  /** typical range, shown to readers */
  range: string;
}

/**
 * Typical power on high speed. Ceiling fans: ENERGY STAR listing (a 44" model at 17.6 W high / 2.7 W low)
 * and a manufacturer EnergyGuide label (44 W); AC-motor and portable fans: published watt-meter tests
 * (SolarTech, 2025). Check the EnergyGuide label or nameplate on your own fan.
 */
export const FAN_TYPES: FanType[] = [
  { id: 'dc-ceiling', name: 'Ceiling fan with a DC motor', short: 'DC ceiling fan', watts: 30, range: 'about 15–35 W on high, under 10 W on low' },
  { id: 'ac-ceiling', name: 'Ceiling fan with a standard (AC) motor', short: 'Standard ceiling fan', watts: 70, range: 'about 50–80 W on high' },
  { id: 'box', name: 'Box fan (20")', short: 'Box fan', watts: 100, range: 'about 75–150 W on high' },
  { id: 'pedestal', name: 'Pedestal (standing) fan', short: 'Pedestal fan', watts: 70, range: 'about 60–85 W' },
  { id: 'tower', name: 'Tower fan', short: 'Tower fan', watts: 70, range: 'about 50–110 W' },
];

export const fanType = (id: FanType['id']) => FAN_TYPES.find((f) => f.id === id)!;

/** Reference central AC for comparisons: 3-ton, SEER 14 (same as the cost pages). */
export const AC_TONS = 3;
export const AC_SEER = 14;
export const AC_KW = kw(AC_TONS, AC_SEER);

/** DOE Energy Saver: with a ceiling fan you can raise the thermostat about 4°F with no loss of comfort. */
export const DEGREES_RAISED = 4;
/** Rule of thumb used across the site: each 1°F higher saves roughly 3% of cooling energy. */
export const PCT_PER_DEGREE = 0.03;
/** Fans run whenever someone is in the room, longer than the AC's full-load hours. Our assumption. */
export const FAN_HOURS_FACTOR = 1.5;
/** Default number of ceiling fans running (bedroom + living room). */
export const DEFAULT_FANS = 2;
/** "Summer month" for fans: 8 hours a day for 30 days. */
export const FAN_MONTH_HOURS = 240;

/** Yearly saving from raising the thermostat, minus what the fans cost to run. */
export function fanSavings(opts: { acHours: number; rate: number; fans: number; watts: number; fanHours?: number; degrees?: number; tons?: number }) {
  const tons = opts.tons ?? AC_TONS;
  const acYear = kw(tons, AC_SEER) * opts.acHours * opts.rate;
  const pct = Math.min(0.5, (opts.degrees ?? DEGREES_RAISED) * PCT_PER_DEGREE);
  const acSaved = acYear * pct;
  const fanHours = opts.fanHours ?? Math.round(opts.acHours * FAN_HOURS_FACTOR);
  const fanCost = (opts.fans * opts.watts * fanHours * opts.rate) / 1000;
  return { acYear, acSaved, fanHours, fanCost, net: acSaved - fanCost };
}

/** DOE Energy Saver sizing and mounting guidance. */
export const SIZING = [
  { room: 'Up to about 225 sq ft (a bedroom or small living room)', fan: '36" to 44" blade span' },
  { room: 'Larger rooms', fan: '52" or larger' },
  { room: 'Rooms longer than about 18 ft', fan: 'Two fans, spaced along the room' },
];

/** The five fan articles, in reading order. */
export const FAN_SERIES = [
  { path: '/blog/ceiling-fan-vs-ac-savings', label: 'Ceiling fan vs. AC: how much a fan saves' },
  { path: '/blog/cost-to-run-a-fan', label: 'How much it costs to run a fan' },
  { path: '/blog/ceiling-fan-buying-guide', label: 'Ceiling fan buying guide' },
  { path: '/blog/ceiling-fan-direction', label: 'Ceiling fan direction and settings' },
  { path: '/blog/home-airflow-fans', label: 'Fans and airflow in your home' },
];
