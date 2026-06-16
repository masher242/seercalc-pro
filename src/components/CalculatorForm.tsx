import { Calculator } from 'lucide-react';
import { CalculatorInputs } from '../types';
import CoolingUsageInput from './CoolingUsageInput';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onInputChange: (field: keyof CalculatorInputs, value: number) => void;
  onCalculate: () => void;
}

export default function CalculatorForm({ inputs, onInputChange, onCalculate }: CalculatorFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
      <h2 className="text-[28px] font-bold text-[#059669] mb-8 flex items-center gap-2">
        <span>⚙️</span>
        Enter Your Details
      </h2>

      <div className="space-y-8">
        <div className="bg-[#F9FAFB] rounded-xl p-5">
          <label className="block text-base font-semibold text-teal-600 mb-2 tracking-tight flex items-center gap-2">
            <span>📉</span>
            <span>1. What's your current AC's SEER rating? <span className="text-gray-900 text-sm">({inputs.currentSEER})</span></span>
          </label>
          <input
            type="range"
            min="8"
            max="20"
            value={inputs.currentSEER}
            onChange={(e) => onInputChange('currentSEER', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
          <p className="text-sm font-medium text-gray-600 mt-2">
            <span className="italic">Typical old system: 8-10</span>
          </p>
        </div>

        <div className="bg-[#F9FAFB] rounded-xl p-5">
          <label className="block text-base font-semibold text-teal-600 mb-2 tracking-tight flex items-center gap-2">
            <span>📈</span>
            <span>2. What SEER rating are you considering? <span className="text-gray-900 text-sm">({inputs.newSEER})</span></span>
          </label>
          <input
            type="range"
            min="13"
            max="25"
            value={inputs.newSEER}
            onChange={(e) => onInputChange('newSEER', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
          <p className="text-sm font-medium text-gray-600 mt-2">
            <span className="italic">High efficiency: 16+</span>
          </p>
        </div>

        <div className="bg-[#F9FAFB] rounded-xl p-5">
          <label className="block text-base font-semibold text-teal-600 mb-2 tracking-tight flex items-center gap-2">
            <span>🏠</span>
            <span>3. What size is your AC unit?</span>
          </label>
          <select
            value={inputs.tonnage}
            onChange={(e) => onInputChange('tonnage', Number(e.target.value))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-teal-500 transition-colors text-gray-900 font-medium text-base"
          >
            <option value="0.5">0.5 ton (6,000 BTU) — ~300 sq ft</option>
            <option value="0.75">0.75 ton (9,000 BTU) — ~450 sq ft</option>
            <option value="1">1 ton (12,000 BTU) — ~600 sq ft</option>
            <option value="1.5">1.5 ton (18,000 BTU) — ~900 sq ft</option>
            <option value="2">2 ton (24,000 BTU) — ~1,200 sq ft</option>
            <option value="2.5">2.5 ton (30,000 BTU) — ~1,500 sq ft</option>
            <option value="3">3 ton (36,000 BTU) — ~1,800 sq ft</option>
            <option value="3.5">3.5 ton (42,000 BTU) — ~2,100 sq ft</option>
            <option value="4">4 ton (48,000 BTU) — ~2,400 sq ft</option>
            <option value="4.5">4.5 ton (54,000 BTU) — ~2,700 sq ft</option>
            <option value="5">5 ton (60,000 BTU) — ~3,000 sq ft</option>
          </select>
          <p className="text-sm font-medium text-gray-600 mt-2">
            <span className="italic">Choose by tonnage, BTU, or square footage. Coverage varies by insulation and climate.</span>
          </p>
        </div>

        <CoolingUsageInput
          annualHours={inputs.hoursPerYear}
          onAnnualHoursChange={(hours) => onInputChange('hoursPerYear', hours)}
        />

        <div className="bg-[#F9FAFB] rounded-xl p-5">
          <label className="block text-base font-semibold text-teal-600 mb-2 tracking-tight flex items-center gap-2">
            <span>⚡</span>
            <span>5. What's your electricity rate? ($/kWh)</span>
          </label>
          <input
            type="number"
            min="0.05"
            max="0.50"
            step="0.01"
            value={inputs.electricityRate}
            onChange={(e) => onInputChange('electricityRate', Number(e.target.value))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-teal-500 transition-colors text-gray-900 font-semibold text-base text-center"
          />
          <p className="text-sm font-medium text-gray-600 mt-2">
            <span className="italic">Check your bill</span>
          </p>
        </div>

        <div className="bg-[#F9FAFB] rounded-xl p-5">
          <label className="block text-base font-semibold text-teal-600 mb-2 tracking-tight flex items-center gap-2">
            <span>💰</span>
            <span>6. What's your upgrade cost? (Optional)</span>
          </label>
          <input
            type="number"
            min="0"
            max="15000"
            step="100"
            value={inputs.upgradeCost || ''}
            onChange={(e) => onInputChange('upgradeCost', Number(e.target.value) || 0)}
            placeholder="$0"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-teal-500 transition-colors text-gray-900 font-semibold text-base text-center"
          />
          <p className="text-sm font-medium text-gray-600 mt-2">
            <span className="italic">Optional: Include to see payback period</span>
          </p>
        </div>

        <button
          onClick={onCalculate}
          data-event="calculate"
          data-seer-old={inputs.currentSEER}
          data-seer-new={inputs.newSEER}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl mt-8"
        >
          <Calculator className="w-5 h-5" />
          Calculate My Savings
        </button>
      </div>

      <div data-ad-zone="below-calculator" className="mt-6 min-h-[100px] bg-gray-50 rounded-lg hidden"></div>
    </div>
  );
}
