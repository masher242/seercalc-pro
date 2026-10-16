/**
 * One SEER → SEER2 conversion for the whole site (ducted split central AC and heat pumps).
 *
 * The 2023 test (higher external static pressure) lowers the same unit's rating by about 5%.
 * ENERGY STAR treats 16 SEER as 15.2 SEER2, which is ×0.95. Use this everywhere so no two
 * pages give different answers. Ductless mini-splits change much less; check the AHRI listing.
 */
export const SEER2_FACTOR = 0.95;

export const toSeer2 = (seer: number) => +(seer * SEER2_FACTOR).toFixed(1);
export const toSeer = (seer2: number) => +(seer2 / SEER2_FACTOR).toFixed(1);
