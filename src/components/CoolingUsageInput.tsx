import { useState, useEffect } from 'react';

interface CoolingUsageInputProps {
  annualHours: number;
  onAnnualHoursChange: (hours: number) => void;
}

type TimePeriod = 'day' | 'week' | 'month' | 'year';

export default function CoolingUsageInput({ annualHours, onAnnualHoursChange }: CoolingUsageInputProps) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('day');
  const [inputValue, setInputValue] = useState(4);

  const conversions = {
    day: 365,
    week: 52.14,
    month: 12,
    year: 1
  };

  const presets = {
    day: [2, 4, 6, 8, 12],
    week: [14, 28, 42, 56, 84],
    month: [60, 120, 180, 240, 360],
    year: [730, 1460, 2190, 2920, 4380]
  };

  const limits = {
    day: { min: 0, max: 24, step: 0.5 },
    week: { min: 0, max: 168, step: 1 },
    month: { min: 0, max: 744, step: 1 },
    year: { min: 0, max: 8760, step: 1 }
  };

  const labels = {
    day: 'hours per day',
    week: 'hours per week',
    month: 'hours per month',
    year: 'hours per year'
  };

  useEffect(() => {
    const calculated = Math.round(inputValue * conversions[timePeriod]);
    onAnnualHoursChange(calculated);
  }, [inputValue, timePeriod, onAnnualHoursChange, conversions]);

  const handleTimePeriodChange = (newPeriod: TimePeriod) => {
    const currentAnnual = inputValue * conversions[timePeriod];
    const newValue = currentAnnual / conversions[newPeriod];

    setTimePeriod(newPeriod);
    setInputValue(Math.round(newValue * 10) / 10);
  };

  const handlePresetClick = (value: number) => {
    setInputValue(value);
  };

  return (
    <div className="space-y-4 bg-[#F9FAFB] rounded-xl p-5">
      <label className="block text-base font-semibold text-teal-600 tracking-tight flex items-center gap-2">
        <span>⏰</span>
        <span>4. How many hours do you use your AC?</span>
      </label>

      <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-lg">
        {(['day', 'week', 'month', 'year'] as TimePeriod[]).map((period) => (
          <button
            key={period}
            type="button"
            onClick={() => handleTimePeriodChange(period)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
              timePeriod === period
                ? 'bg-teal-500 text-white shadow-sm'
                : 'bg-[#F3F4F6] text-gray-600 hover:bg-gray-200'
            }`}
          >
            Per {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
            min={limits[timePeriod].min}
            max={limits[timePeriod].max}
            step={limits[timePeriod].step}
            className="w-24 px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-teal-500 transition-colors text-gray-900 font-semibold text-base text-center"
          />
          <span className="text-gray-700 font-medium">{labels[timePeriod]}</span>
        </div>

        <input
          type="range"
          value={inputValue}
          onChange={(e) => setInputValue(parseFloat(e.target.value))}
          min={limits[timePeriod].min}
          max={limits[timePeriod].max}
          step={limits[timePeriod].step}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
        />
      </div>

      <div className="space-y-2">
        <p className="text-xs text-gray-600 font-medium">Quick select:</p>
        <div className="flex flex-wrap gap-2">
          {presets[timePeriod].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handlePresetClick(preset)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                inputValue === preset
                  ? 'bg-teal-500 text-white border-teal-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400 hover:bg-teal-50'
              }`}
            >
              {preset} hrs
            </button>
          ))}
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Annual cooling hours:</span>
          <span className="text-2xl font-bold text-green-700">
            {annualHours.toLocaleString()} hrs/year
          </span>
        </div>
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <p className="font-medium">Not sure? Use these climate guides:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="bg-blue-50 p-2 rounded">
            <span className="font-semibold text-blue-900">Cool climates:</span>
            <br />2-3 hrs/day (730-1,100/yr)
          </div>
          <div className="bg-yellow-50 p-2 rounded">
            <span className="font-semibold text-yellow-900">Moderate climates:</span>
            <br />4-5 hrs/day (1,460-1,825/yr)
          </div>
          <div className="bg-red-50 p-2 rounded">
            <span className="font-semibold text-red-900">Hot climates:</span>
            <br />8-10 hrs/day (2,920-3,650/yr)
          </div>
        </div>
      </div>
    </div>
  );
}
