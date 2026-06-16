import { CalculatorInputs } from '../types';

const STORAGE_KEY = 'seer-calculator-inputs';

export function saveInputs(inputs: CalculatorInputs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
  } catch (error) {
    console.error('Failed to save inputs to localStorage:', error);
  }
}

export function loadInputs(): CalculatorInputs | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load inputs from localStorage:', error);
    return null;
  }
}
