// How the SEER comparison articles judge an efficiency upgrade. One place, so every
// comparison page gives the same verdict for the same payback.
//
// Why these thresholds: a central AC typically lasts about 15 years (the owner's own stores
// confirm 15 is reasonable, even in the Caribbean). Money spent today is worth more than
// savings that trickle back over a decade, and many people move before the system is worn
// out. So a payback that only just fits inside the system's life isn't a real gain.

/** Typical life of a central AC, years. Default for "how long you'll keep it". */
export const SYSTEM_LIFE = 15;
/** Pays back within this many years: a good deal. */
export const GOOD_MAX = 7;
/** Pays back within this many years: marginal (depends on how long you stay). Beyond: not worth it for savings. */
export const MARGINAL_MAX = 12;

export type VerdictId = 'good' | 'marginal' | 'no';

export interface Verdict {
  id: VerdictId;
  label: string;
  /** one-line explanation */
  note: string;
}

export function verdict(paybackYears: number): Verdict {
  if (Number.isFinite(paybackYears) && paybackYears <= GOOD_MAX) {
    return { id: 'good', label: 'Good deal', note: `Pays back within ${GOOD_MAX} years; savings after that are profit for as long as you keep the system.` };
  }
  if (Number.isFinite(paybackYears) && paybackYears <= MARGINAL_MAX) {
    return { id: 'marginal', label: 'Marginal', note: `Pays back in ${GOOD_MAX}–${MARGINAL_MAX} years: worth it only if you keep the system well beyond that.` };
  }
  return { id: 'no', label: 'Not worth it for savings', note: `Takes over ${MARGINAL_MAX} years to pay back, too close to the end of a system's life.` };
}

export const VERDICT_STYLE: Record<VerdictId, string> = {
  good: 'bg-teal-100 text-teal-800',
  marginal: 'bg-amber-100 text-amber-800',
  no: 'bg-red-100 text-red-800',
};

/**
 * Hours × rate (in dollars) a system needs for a premium to pay back within `years`.
 * `kwhPerHour` = electricity saved per running hour by the upgrade. Rounded to 10.
 */
export function hoursRateThreshold(premium: number, kwhPerHour: number, years: number) {
  return Math.round(premium / (years * kwhPerHour) / 10) * 10;
}
