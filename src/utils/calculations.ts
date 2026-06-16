import { CalculatorInputs, CalculationResults } from '../types';

const BTU_PER_TON = 12000;
const CO2_PER_KWH = 0.92;
const CO2_PER_TREE_YEAR = 48;

export function calculateSavings(inputs: CalculatorInputs): CalculationResults {
  const calculateAnnualCost = (seerRating: number): number => {
    const annualKWh = (inputs.tonnage * BTU_PER_TON * inputs.hoursPerYear) / (seerRating * 1000);
    return annualKWh * inputs.electricityRate;
  };

  const oldAnnualCost = calculateAnnualCost(inputs.currentSEER);
  const newAnnualCost = calculateAnnualCost(inputs.newSEER);
  const annualSavings = oldAnnualCost - newAnnualCost;
  const monthlySavings = annualSavings / 12;
  const fiveYearSavings = annualSavings * 5;
  const tenYearSavings = annualSavings * 10;

  const paybackYears = inputs.upgradeCost > 0 ? inputs.upgradeCost / annualSavings : 0;
  const roi = inputs.upgradeCost > 0 ? (tenYearSavings / inputs.upgradeCost) * 100 : 0;

  const oldKWh = (inputs.tonnage * BTU_PER_TON * inputs.hoursPerYear) / (inputs.currentSEER * 1000);
  const newKWh = (inputs.tonnage * BTU_PER_TON * inputs.hoursPerYear) / (inputs.newSEER * 1000);
  const kwhSaved = oldKWh - newKWh;
  const co2Reduced = kwhSaved * CO2_PER_KWH;
  const treesEquivalent = co2Reduced / CO2_PER_TREE_YEAR;

  return {
    oldAnnualCost,
    newAnnualCost,
    annualSavings,
    monthlySavings,
    fiveYearSavings,
    tenYearSavings,
    paybackYears,
    roi,
    co2Reduced,
    treesEquivalent
  };
}
