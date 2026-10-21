export interface CalculatorInputs {
  currentSEER: number;
  newSEER: number;
  tonnage: number;
  hoursPerYear: number;
  electricityRate: number;
  upgradeCost: number;
}

export interface CalculationResults {
  oldAnnualCost: number;
  newAnnualCost: number;
  annualSavings: number;
  monthlySavings: number;
  fiveYearSavings: number;
  tenYearSavings: number;
  paybackYears: number;
  /** Net 10-year return in %: (10-year savings − upgrade cost) ÷ upgrade cost × 100 */
  roi: number;
  co2Reduced: number;
  treesEquivalent: number;
}
