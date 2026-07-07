import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, AlertCircle, Info, RotateCcw } from 'lucide-react';
import LeadMagnet from '../components/LeadMagnet';

// ─── Climate zone base BTU/sqft by state ────────────────────────────────────
const STATE_CLIMATE: Record<string, { zone: number; label: string; baseBtu: number }> = {
  AL: { zone: 3, label: 'Hot-Humid', baseBtu: 28 },
  AK: { zone: 7, label: 'Very Cold', baseBtu: 12 },
  AZ: { zone: 2, label: 'Hot-Dry', baseBtu: 32 },
  AR: { zone: 3, label: 'Mixed-Humid', baseBtu: 28 },
  CA: { zone: 3, label: 'Mixed-Dry', baseBtu: 22 },
  CO: { zone: 5, label: 'Cold', baseBtu: 18 },
  CT: { zone: 5, label: 'Cold', baseBtu: 18 },
  DE: { zone: 4, label: 'Mixed-Humid', baseBtu: 22 },
  FL: { zone: 1, label: 'Very Hot-Humid', baseBtu: 34 },
  GA: { zone: 3, label: 'Hot-Humid', baseBtu: 28 },
  HI: { zone: 1, label: 'Very Hot-Humid', baseBtu: 32 },
  ID: { zone: 5, label: 'Cold', baseBtu: 18 },
  IL: { zone: 5, label: 'Cold', baseBtu: 18 },
  IN: { zone: 5, label: 'Cold', baseBtu: 18 },
  IA: { zone: 5, label: 'Cold', baseBtu: 18 },
  KS: { zone: 4, label: 'Mixed-Humid', baseBtu: 24 },
  KY: { zone: 4, label: 'Mixed-Humid', baseBtu: 24 },
  LA: { zone: 2, label: 'Very Hot-Humid', baseBtu: 32 },
  ME: { zone: 6, label: 'Cold', baseBtu: 16 },
  MD: { zone: 4, label: 'Mixed-Humid', baseBtu: 22 },
  MA: { zone: 5, label: 'Cold', baseBtu: 18 },
  MI: { zone: 5, label: 'Cold', baseBtu: 16 },
  MN: { zone: 6, label: 'Very Cold', baseBtu: 16 },
  MS: { zone: 2, label: 'Very Hot-Humid', baseBtu: 30 },
  MO: { zone: 4, label: 'Mixed-Humid', baseBtu: 24 },
  MT: { zone: 6, label: 'Very Cold', baseBtu: 14 },
  NE: { zone: 5, label: 'Cold', baseBtu: 18 },
  NV: { zone: 2, label: 'Hot-Dry', baseBtu: 30 },
  NH: { zone: 5, label: 'Cold', baseBtu: 18 },
  NJ: { zone: 4, label: 'Mixed-Humid', baseBtu: 22 },
  NM: { zone: 3, label: 'Hot-Dry', baseBtu: 26 },
  NY: { zone: 5, label: 'Cold', baseBtu: 18 },
  NC: { zone: 3, label: 'Mixed-Humid', baseBtu: 26 },
  ND: { zone: 6, label: 'Very Cold', baseBtu: 14 },
  OH: { zone: 5, label: 'Cold', baseBtu: 18 },
  OK: { zone: 3, label: 'Mixed-Humid', baseBtu: 28 },
  OR: { zone: 4, label: 'Mixed', baseBtu: 18 },
  PA: { zone: 5, label: 'Cold', baseBtu: 18 },
  RI: { zone: 5, label: 'Cold', baseBtu: 18 },
  SC: { zone: 3, label: 'Hot-Humid', baseBtu: 28 },
  SD: { zone: 6, label: 'Very Cold', baseBtu: 16 },
  TN: { zone: 4, label: 'Mixed-Humid', baseBtu: 26 },
  TX: { zone: 2, label: 'Very Hot', baseBtu: 32 },
  UT: { zone: 5, label: 'Cold', baseBtu: 20 },
  VT: { zone: 6, label: 'Very Cold', baseBtu: 16 },
  VA: { zone: 4, label: 'Mixed-Humid', baseBtu: 24 },
  WA: { zone: 4, label: 'Mixed', baseBtu: 16 },
  WV: { zone: 5, label: 'Cold', baseBtu: 18 },
  WI: { zone: 6, label: 'Very Cold', baseBtu: 16 },
  WY: { zone: 6, label: 'Very Cold', baseBtu: 16 },
  OTHER: { zone: 2, label: 'Very Hot-Humid', baseBtu: 32 },
};

// ─── Multiplier tables ────────────────────────────────────────────────────────

const CEILING_MULT: Record<string, number> = {
  standard: 1.0,   // 8 ft
  high: 1.15,      // 9–10 ft
  vaulted: 1.30,   // 12 ft+
};

const WALL_MULT: Record<string, number> = {
  frame_uninsulated:    1.25,  // wood frame, no insulation
  frame_insulated:      1.00,  // wood frame, insulated (baseline)
  brick_veneer:         0.95,  // some thermal mass benefit
  stucco_frame:         1.05,  // stucco over frame
  cmu_uninsulated:      1.20,  // concrete block, no insulation
  cmu_insulated:        0.90,  // concrete block with insulation — thermal mass helps
  icf:                  0.75,  // insulated concrete forms — very well insulated
  log:                  0.90,  // log/timber — natural R + mass
  manufactured:         1.30,  // thin walls, minimal insulation
};

const ROOF_MULT: Record<string, number> = {
  attic_none:         1.40,  // attic with no insulation
  attic_minimal:      1.20,  // attic, minimal (old fiberglass batts R-11)
  attic_moderate:     1.00,  // attic, moderate insulation (R-19–30) — baseline
  attic_good:         0.85,  // attic, good insulation (R-30–49)
  attic_excellent:    0.70,  // attic, spray foam or R-49+
  flat_uninsulated:   1.45,  // flat roof, no insulation
  flat_insulated:     1.10,  // flat roof with insulation
  cathedral_poor:     1.30,  // cathedral ceiling, poor insulation
  cathedral_good:     0.95,  // cathedral ceiling, well insulated
  upper_floor:        0.60,  // another floor above — minimal roof load
};

const ROOF_COLOR_MULT: Record<string, number> = {
  dark:    1.12,
  medium:  1.00,
  light:   0.88,
  metal_reflective: 0.82,
  tile:    0.90,
};

const SUN_MULT: Record<string, number> = {
  shaded:  0.88,
  typical: 1.00,
  high:    1.15,
};

const WINDOW_MULT: Record<string, number> = {
  single:   1.18,
  double:   1.00,
  lowE:     0.88,
};

// ─── Step definitions ─────────────────────────────────────────────────────────

const STATES = [
  ['AL','Alabama'],['AK','Alaska'],['AZ','Arizona'],['AR','Arkansas'],
  ['CA','California'],['CO','Colorado'],['CT','Connecticut'],['DE','Delaware'],
  ['FL','Florida'],['GA','Georgia'],['HI','Hawaii'],['ID','Idaho'],
  ['IL','Illinois'],['IN','Indiana'],['IA','Iowa'],['KS','Kansas'],
  ['KY','Kentucky'],['LA','Louisiana'],['ME','Maine'],['MD','Maryland'],
  ['MA','Massachusetts'],['MI','Michigan'],['MN','Minnesota'],['MS','Mississippi'],
  ['MO','Missouri'],['MT','Montana'],['NE','Nebraska'],['NV','Nevada'],
  ['NH','New Hampshire'],['NJ','New Jersey'],['NM','New Mexico'],['NY','New York'],
  ['NC','North Carolina'],['ND','North Dakota'],['OH','Ohio'],['OK','Oklahoma'],
  ['OR','Oregon'],['PA','Pennsylvania'],['RI','Rhode Island'],['SC','South Carolina'],
  ['SD','South Dakota'],['TN','Tennessee'],['TX','Texas'],['UT','Utah'],
  ['VT','Vermont'],['VA','Virginia'],['WA','Washington'],['WV','West Virginia'],
  ['WI','Wisconsin'],['WY','Wyoming'],['OTHER','Other / Outside US'],
];

// ─── Card option type ─────────────────────────────────────────────────────────
interface CardOption { value: string; label: string; sub: string; icon: string; }

const CEILING_OPTIONS: CardOption[] = [
  { value: 'standard', label: 'Standard', sub: '8 feet', icon: '🏠' },
  { value: 'high', label: 'High', sub: '9–10 feet', icon: '🏛️' },
  { value: 'vaulted', label: 'Vaulted / Cathedral', sub: '12 feet or more', icon: '⛪' },
];

const WALL_OPTIONS: CardOption[] = [
  { value: 'frame_insulated', label: 'Wood Frame — Insulated', sub: 'Vinyl, wood, or fiber cement siding. Insulation in walls. Most common US home.', icon: '🪵' },
  { value: 'frame_uninsulated', label: 'Wood Frame — No Insulation', sub: 'Older home, no wall insulation added. Can feel drafty.', icon: '🏚️' },
  { value: 'brick_veneer', label: 'Brick Veneer', sub: 'Brick exterior over wood frame. Common South and Midwest.', icon: '🧱' },
  { value: 'stucco_frame', label: 'Stucco', sub: 'Stucco exterior over wood frame. Common Southwest, California, Florida.', icon: '🏡' },
  { value: 'cmu_uninsulated', label: 'Concrete Block (CMU) — No Insulation', sub: 'Bare concrete block walls. Very common Florida, Gulf Coast, Caribbean. Feels cool during day but releases heat at night.', icon: '🏗️' },
  { value: 'cmu_insulated', label: 'Concrete Block (CMU) — Insulated', sub: 'Concrete block with insulation added inside or out. Better performance than bare CMU.', icon: '🏢' },
  { value: 'icf', label: 'Insulated Concrete Forms (ICF)', sub: 'Foam-form concrete walls. Excellent insulation, very quiet. Modern energy-efficient construction.', icon: '🔷' },
  { value: 'log', label: 'Log or Solid Timber', sub: 'Log cabin or timber frame construction. Natural insulation and thermal mass.', icon: '🌲' },
  { value: 'manufactured', label: 'Manufactured / Mobile Home', sub: 'Factory-built home. Thinner walls and minimal insulation vs. site-built homes.', icon: '🚐' },
];

const ROOF_OPTIONS: CardOption[] = [
  { value: 'attic_excellent', label: 'Attic — Well Insulated', sub: 'Spray foam, blown cellulose, or thick fiberglass (R-38 or more). Modern standard.', icon: '✅' },
  { value: 'attic_good', label: 'Attic — Good Insulation', sub: 'Blown fiberglass or cellulose, 8–12 inches thick (R-25 to R-38).', icon: '👍' },
  { value: 'attic_moderate', label: 'Attic — Moderate Insulation', sub: 'Fiberglass batts, 4–6 inches (R-13 to R-25). Common 1990s–2000s homes.', icon: '🟡' },
  { value: 'attic_minimal', label: 'Attic — Minimal Insulation', sub: 'Old thin fiberglass batts or almost nothing (R-11 or less). Older homes.', icon: '⚠️' },
  { value: 'attic_none', label: 'Attic — No Insulation', sub: 'Open attic with no insulation at all. Hot attic directly above living space.', icon: '🔴' },
  { value: 'flat_insulated', label: 'Flat / Low-Slope Roof — Insulated', sub: 'No separate attic. Roof deck is the ceiling, with insulation layer. Common Florida, Southwest, modern homes.', icon: '🏢' },
  { value: 'flat_uninsulated', label: 'Flat / Low-Slope Roof — No Insulation', sub: 'Flat roof with no insulation. Very high heat gain in summer.', icon: '🌡️' },
  { value: 'cathedral_good', label: 'Cathedral / Vaulted Ceiling — Insulated', sub: 'Sloped ceiling directly under roof — spray foam or well-insulated rafter bays.', icon: '⛪' },
  { value: 'cathedral_poor', label: 'Cathedral / Vaulted Ceiling — Minimal', sub: 'Sloped ceiling with little to no insulation between rafters.', icon: '🏕️' },
  { value: 'upper_floor', label: 'Another Floor Above', sub: 'Apartment, condo, or lower floor of multi-story home. Roof heat is not your problem.', icon: '🏙️' },
];

const ROOF_COLOR_OPTIONS: CardOption[] = [
  { value: 'dark', label: 'Dark', sub: 'Black, dark gray, dark brown shingles', icon: '⬛' },
  { value: 'medium', label: 'Medium', sub: 'Gray, weathered wood, medium brown', icon: '🟫' },
  { value: 'light', label: 'Light / Cool Roof', sub: 'White, light gray, tan, or cool-rated shingles', icon: '⬜' },
  { value: 'metal_reflective', label: 'Reflective Metal', sub: 'Light metal roof — reflects most solar radiation', icon: '🔆' },
  { value: 'tile', label: 'Tile', sub: 'Clay or concrete tile — air gap reduces heat transfer', icon: '🏯' },
];

const SUN_OPTIONS: CardOption[] = [
  { value: 'shaded', label: 'Well Shaded', sub: 'Mature trees, north-facing, or minimal direct sun on roof and walls', icon: '🌳' },
  { value: 'typical', label: 'Typical Mix', sub: 'Some shade, some sun — average for a suburban home', icon: '⛅' },
  { value: 'high', label: 'High Sun Exposure', sub: 'South or west facing, little shade, lots of glass, exposed roof', icon: '☀️' },
];

const WINDOW_OPTIONS: CardOption[] = [
  { value: 'single', label: 'Single-Pane', sub: 'Old aluminum frames, single glass. Very common in pre-1980 homes.', icon: '🪟' },
  { value: 'double', label: 'Double-Pane Standard', sub: 'Double-pane glass, standard coating. Common 1990s–2010s homes.', icon: '🔲' },
  { value: 'lowE', label: 'Double-Pane Low-E or Triple-Pane', sub: 'Energy-efficient glass with low-emissivity coating. Modern standard.', icon: '✨' },
];

// ─── Sizing calculation ───────────────────────────────────────────────────────

function calcSizing(inputs: {
  sqft: number;
  state: string;
  ceiling: string;
  walls: string;
  roof: string;
  roofColor: string;
  sun: string;
  windows: string;
  occupants: number;
}) {
  const climate = STATE_CLIMATE[inputs.state] || STATE_CLIMATE['OTHER'];

  // Base BTU load
  let btu = inputs.sqft * climate.baseBtu;

  // Apply multipliers
  btu *= CEILING_MULT[inputs.ceiling] || 1.0;
  btu *= WALL_MULT[inputs.walls] || 1.0;
  btu *= ROOF_MULT[inputs.roof] || 1.0;

  // Roof color only applies if there's a roof above (not upper_floor)
  if (inputs.roof !== 'upper_floor') {
    btu *= ROOF_COLOR_MULT[inputs.roofColor] || 1.0;
  }

  btu *= SUN_MULT[inputs.sun] || 1.0;
  btu *= WINDOW_MULT[inputs.windows] || 1.0;

  // Occupant load: 400 BTU/hr per person above 2
  const extraOccupants = Math.max(0, inputs.occupants - 2);
  btu += extraOccupants * 400;

  // Convert to tons
  const tons = btu / 12000;

  // Recommended range: ±0.25 ton, rounded to nearest 0.5
  const roundedTons = Math.round(tons * 2) / 2;
  const lowTons = Math.max(1, roundedTons - 0.5);
  const highTons = roundedTons + 0.5;

  // Oversizing flag — warn if high end is more than 1 ton above the center
  const oversizeRisk = tons < 2.5;

  return {
    rawBtu: Math.round(btu),
    tons: +tons.toFixed(2),
    roundedTons,
    lowTons,
    highTons,
    climate,
    oversizeRisk,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Selections {
  sqft: string;
  state: string;
  occupants: string;
  ceiling: string;
  walls: string;
  roof: string;
  roofColor: string;
  sun: string;
  windows: string;
}

const STEPS = ['Basics', 'Walls', 'Roof & Attic', 'Sun & Windows'];

function OptionCard({ opt, selected, onSelect }: { opt: CardOption; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
        selected
          ? 'border-teal-500 bg-teal-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5">{opt.icon}</span>
        <div>
          <p className={`text-sm font-bold ${selected ? 'text-teal-800' : 'text-gray-900'}`}>{opt.label}</p>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{opt.sub}</p>
        </div>
        {selected && <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 ml-auto mt-0.5" />}
      </div>
    </button>
  );
}

export default function CalculatorACSizing() {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<Selections>({
    sqft: '', state: '', occupants: '2',
    ceiling: '', walls: '', roof: '', roofColor: '', sun: '', windows: '',
  });
  const [result, setResult] = useState<ReturnType<typeof calcSizing> | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const set = (field: keyof Selections, value: string) => {
    setSel(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  const stepValid = () => {
    switch (step) {
      case 0: return sel.sqft !== '' && parseFloat(sel.sqft) > 0 && sel.state !== '' && sel.ceiling !== '';
      case 1: return sel.walls !== '';
      case 2: return sel.roof !== '' && (sel.roof === 'upper_floor' || sel.roofColor !== '');
      case 3: return sel.sun !== '' && sel.windows !== '';
      default: return true;
    }
  };

  const next = () => {
    if (!stepValid()) {
      setErrors(['Please complete all selections before continuing.']);
      return;
    }
    setErrors([]);
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      // Calculate
      const r = calcSizing({
        sqft: parseFloat(sel.sqft),
        state: sel.state,
        ceiling: sel.ceiling,
        walls: sel.walls,
        roof: sel.roof,
        roofColor: sel.roofColor || 'medium',
        sun: sel.sun,
        windows: sel.windows,
        occupants: parseInt(sel.occupants) || 2,
      });
      setResult(r);
      setTimeout(() => {
        document.getElementById('result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const reset = () => {
    setStep(0);
    setSel({ sqft: '', state: '', occupants: '2', ceiling: '', walls: '', roof: '', roofColor: '', sun: '', windows: '' });
    setResult(null);
    setErrors([]);
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-sm";

  const tonLabel = (t: number) => {
    if (t <= 1.5) return `${t} ton (18,000 BTU)`;
    if (t === 2) return `2 ton (24,000 BTU)`;
    if (t === 2.5) return `2.5 ton (30,000 BTU)`;
    if (t === 3) return `3 ton (36,000 BTU)`;
    if (t === 3.5) return `3.5 ton (42,000 BTU)`;
    if (t === 4) return `4 ton (48,000 BTU)`;
    if (t === 5) return `5 ton (60,000 BTU)`;
    return `${t} ton`;
  };

  return (
    <>
      <Helmet>
        <title>AC Sizing Calculator 2026 — What Size Air Conditioner Do I Need? | seercalc.pro</title>
        <meta name="description" content="Free AC sizing calculator. Enter your square footage, climate, wall type, attic insulation, and sun exposure to get a recommended tonnage range — and a contractor sanity-check." />
        <meta name="keywords" content="AC sizing calculator, what size air conditioner do I need, HVAC sizing calculator, how many tons do I need, AC tonnage calculator 2026, Manual J simplified" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://seercalc.pro/calculators/ac-sizing" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seercalc.pro/calculators/ac-sizing" />
        <meta property="og:title" content="AC Sizing Calculator — What Size Air Conditioner Do I Need?" />
        <meta property="og:description" content="Get a recommended AC tonnage range based on your home's size, climate, wall construction, attic insulation, and sun exposure. Free, no email required." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What size air conditioner do I need?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AC size depends on your square footage, climate zone, insulation quality, ceiling height, sun exposure, and window type — not just square footage alone. A rough rule of thumb is 20 BTU per square foot (or about 400–600 sq ft per ton), but this varies significantly by climate. A 2,000 sq ft home in Florida might need a 4-ton system while the same house in Minnesota might only need 2.5 tons. Use our AC sizing calculator to get a more accurate estimate based on your specific home."
                }
              },
              {
                "@type": "Question",
                "name": "How many tons of AC do I need per square foot?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The general rule is 400–600 square feet per ton of AC capacity, but the right answer depends heavily on your climate zone. In hot climates (Florida, Texas, Arizona), plan for 350–450 sq ft per ton. In moderate climates (Southeast, Mid-Atlantic), plan for 450–550 sq ft per ton. In cooler climates (Midwest, Northeast), plan for 500–650 sq ft per ton. These are starting points — insulation quality, ceiling height, and sun exposure all modify the final number significantly."
                }
              },
              {
                "@type": "Question",
                "name": "Is it better to oversize or undersize an AC?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Neither — but oversizing is actually the more common and more damaging mistake. An oversized AC cools the air temperature quickly but doesn't run long enough to remove humidity, leaving the house feeling cool but clammy. It also short-cycles (turns on and off rapidly), which is harder on the compressor and reduces system lifespan. Contractors sometimes oversize to avoid callbacks from a homeowner who feels too warm. A properly sized system runs longer, removes more humidity, and maintains more even comfort."
                }
              },
              {
                "@type": "Question",
                "name": "What is a Manual J calculation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Manual J is the industry-standard method for calculating residential heating and cooling loads, published by ACCA (Air Conditioning Contractors of America). A proper Manual J accounts for square footage, climate zone, insulation values, window area and orientation, internal heat gains, infiltration, and more. It takes trained engineers 30+ minutes with specialized software. Our calculator uses simplified Manual J principles to give homeowners a reasonable estimate for sanity-checking contractor quotes — it's not a substitute for a full professional calculation."
                }
              },
              {
                "@type": "Question",
                "name": "How does wall construction affect AC sizing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Wall construction significantly affects heat gain through the building envelope. Uninsulated wood frame walls have R-values of R-4 to R-6, while insulated frame walls reach R-13 to R-21. Concrete block (CMU) walls without insulation have effective R-values of R-1.5 to R-2 per 8-inch block — much lower than insulated frame construction — but have high thermal mass that moderates daily temperature swings. Insulated Concrete Forms (ICF) achieve R-20 to R-50 and are among the best-performing wall assemblies for cooling load reduction."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link to="/calculators" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          All Calculators
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Calculator className="w-4 h-4 text-teal-500" />
            <span className="text-teal-600 font-medium">Calculator</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">AC Sizing Calculator</h1>
          <p className="text-lg text-gray-600">What size air conditioner do you actually need? Answer 4 sets of questions — get a recommended tonnage range to sanity-check your contractor's quote.</p>
        </div>

        {/* Quick Answer */}
        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg mb-8 text-sm">
          <p className="font-semibold text-teal-800 mb-1">⚠️ Bigger is NOT better</p>
          <p className="text-gray-700">An oversized AC cools the temperature quickly but <strong>doesn't run long enough to remove humidity</strong> — leaving your home cool but clammy. Contractors sometimes oversize to avoid callbacks. This calculator helps you know what's right for your home before you sign anything.</p>
        </div>

        {!result ? (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-8">

            {/* Step progress bar */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-1">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex items-center flex-1">
                    <div className={`flex items-center gap-2 ${i <= step ? 'text-teal-700' : 'text-gray-400'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        i < step ? 'bg-teal-500 text-white' : i === step ? 'bg-teal-100 text-teal-700 border-2 border-teal-500' : 'bg-gray-200 text-gray-400'
                      }`}>
                        {i < step ? '✓' : i + 1}
                      </div>
                      <span className="text-xs font-semibold hidden sm:block">{label}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 ${i < step ? 'bg-teal-400' : 'bg-gray-200'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">

              {/* Step 0: Basics */}
              {step === 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-5">Step 1: Basic Information</h2>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Cooled Square Footage</label>
                        <input
                          type="number" min="200" max="10000"
                          placeholder="e.g. 1800"
                          value={sel.sqft}
                          onChange={e => set('sqft', e.target.value)}
                          className={inputClass}
                        />
                        <p className="text-xs text-gray-400 mt-1">Total square footage of the space you're cooling</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">State / Location</label>
                        <select value={sel.state} onChange={e => set('state', e.target.value)} className={inputClass}>
                          <option value="">Select state...</option>
                          {STATES.map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Occupants</label>
                        <select value={sel.occupants} onChange={e => set('occupants', e.target.value)} className={inputClass}>
                          {[1,2,3,4,5,6,7,8].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-400 mt-1">Each person adds heat load to the space</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Ceiling Height</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {CEILING_OPTIONS.map(opt => (
                          <OptionCard key={opt.value} opt={opt} selected={sel.ceiling === opt.value} onSelect={() => set('ceiling', opt.value)} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Walls */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Step 2: Exterior Walls</h2>
                  <p className="text-sm text-gray-500 mb-5">What are the exterior walls of your home made of? Look at the outside — pick the closest match.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {WALL_OPTIONS.map(opt => (
                      <OptionCard key={opt.value} opt={opt} selected={sel.walls === opt.value} onSelect={() => set('walls', opt.value)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Roof & Attic */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Step 3: Roof & Attic</h2>
                  <p className="text-sm text-gray-500 mb-5">The roof and attic account for 30–50% of cooling load. Pick the option that best describes what's above your living space.</p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">What's above your living space?</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ROOF_OPTIONS.map(opt => (
                        <OptionCard key={opt.value} opt={opt} selected={sel.roof === opt.value} onSelect={() => set('roof', opt.value)} />
                      ))}
                    </div>
                  </div>

                  {sel.roof && sel.roof !== 'upper_floor' && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-3">Roof color / material</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {ROOF_COLOR_OPTIONS.map(opt => (
                          <OptionCard key={opt.value} opt={opt} selected={sel.roofColor === opt.value} onSelect={() => set('roofColor', opt.value)} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Sun & Windows */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Step 4: Sun Exposure & Windows</h2>
                  <p className="text-sm text-gray-500 mb-5">Solar gain through windows and roof is a major cooling driver — especially in south and west-facing homes.</p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Overall sun exposure</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {SUN_OPTIONS.map(opt => (
                        <OptionCard key={opt.value} opt={opt} selected={sel.sun === opt.value} onSelect={() => set('sun', opt.value)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Window type</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {WINDOW_OPTIONS.map(opt => (
                        <OptionCard key={opt.value} opt={opt} selected={sel.windows === opt.value} onSelect={() => set('windows', opt.value)} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Errors */}
              {errors.length > 0 && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-700">{errors[0]}</p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => { setStep(s => s - 1); setErrors([]); }}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  onClick={next}
                  className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm"
                >
                  {step < STEPS.length - 1 ? (
                    <>Next: {STEPS[step + 1]} <ArrowRight className="w-4 h-4" /></>
                  ) : (
                    <><Calculator className="w-4 h-4" /> Calculate My AC Size</>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ── Results ── */
          <div id="result" className="space-y-6 mb-12">

            {/* Main result */}
            <div className="bg-teal-50 border-2 border-teal-400 rounded-xl p-6">
              <p className="text-sm font-bold text-teal-700 uppercase tracking-wide mb-2">Recommended AC Size</p>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-5xl font-bold text-teal-700">{result.roundedTons}</span>
                <span className="text-2xl font-semibold text-teal-600">tons</span>
                <span className="text-gray-500 text-sm">({(result.roundedTons * 12000).toLocaleString()} BTU)</span>
              </div>
              <p className="text-gray-700 text-sm mb-1">
                Reasonable range: <strong>{result.lowTons}–{result.highTons} tons</strong> depending on installation quality and local conditions
              </p>
              <p className="text-gray-600 text-xs">
                Climate zone: <strong>{result.climate.label}</strong> · Raw calculated load: {result.rawBtu.toLocaleString()} BTU/hr
              </p>
            </div>

            {/* Oversizing warning */}
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-800 mb-1">⚠️ The Oversizing Warning — Read This Before You Sign</p>
                  <p className="text-sm text-gray-700">
                    If your contractor quotes a system <strong>1 ton or more above</strong> our recommended range, ask them to show you their Manual J calculation. An oversized AC short-cycles — it cools the air temperature quickly but never runs long enough to remove humidity. Result: your house feels 72°F but clammy, mold risk increases, and the compressor wears out faster from repeated start/stop cycles. <strong>Bigger is not better.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Ton size guide */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What Each Ton Size Typically Covers</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">Size</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">BTU/hr</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">Typical sq ft (moderate climate)</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">Typical sq ft (hot climate)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { tons: 1.5, btu: 18000, moderate: '700–900', hot: '500–700' },
                      { tons: 2,   btu: 24000, moderate: '900–1,200', hot: '700–950' },
                      { tons: 2.5, btu: 30000, moderate: '1,200–1,500', hot: '950–1,200' },
                      { tons: 3,   btu: 36000, moderate: '1,500–1,800', hot: '1,200–1,500' },
                      { tons: 3.5, btu: 42000, moderate: '1,800–2,100', hot: '1,500–1,800' },
                      { tons: 4,   btu: 48000, moderate: '2,100–2,400', hot: '1,800–2,100' },
                      { tons: 5,   btu: 60000, moderate: '2,400–3,000', hot: '2,100–2,600' },
                    ].map((row, i) => (
                      <tr key={row.tons} className={`border-t border-gray-100 ${row.tons === result.roundedTons ? 'bg-teal-50 font-semibold' : i % 2 === 0 ? '' : 'bg-gray-50'}`}>
                        <td className="px-3 py-2.5 font-bold text-gray-900">
                          {row.tons} ton {row.tons === result.roundedTons && <span className="text-teal-600 text-xs ml-1">← Your estimate</span>}
                        </td>
                        <td className="px-3 py-2.5 text-gray-700">{row.btu.toLocaleString()}</td>
                        <td className="px-3 py-2.5 text-gray-700">{row.moderate}</td>
                        <td className="px-3 py-2.5 text-gray-700">{row.hot}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inputs summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Your Inputs Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                {[
                  { label: 'Square footage', value: `${parseInt(sel.sqft).toLocaleString()} sq ft` },
                  { label: 'State', value: STATES.find(([c]) => c === sel.state)?.[1] || sel.state },
                  { label: 'Climate zone', value: result.climate.label },
                  { label: 'Ceiling height', value: CEILING_OPTIONS.find(o => o.value === sel.ceiling)?.label || '' },
                  { label: 'Wall construction', value: WALL_OPTIONS.find(o => o.value === sel.walls)?.label || '' },
                  { label: 'Roof / attic', value: ROOF_OPTIONS.find(o => o.value === sel.roof)?.label || '' },
                  { label: 'Roof color', value: sel.roof === 'upper_floor' ? 'N/A' : ROOF_COLOR_OPTIONS.find(o => o.value === sel.roofColor)?.label || '' },
                  { label: 'Sun exposure', value: SUN_OPTIONS.find(o => o.value === sel.sun)?.label || '' },
                  { label: 'Windows', value: WINDOW_OPTIONS.find(o => o.value === sel.windows)?.label || '' },
                  { label: 'Occupants', value: `${sel.occupants} people` },
                ].map(row => (
                  <div key={row.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-0.5">{row.label}</p>
                    <p className="text-xs font-semibold text-gray-800">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Important caveats */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-2">About this estimate</p>
                  <ul className="text-xs text-gray-600 space-y-1.5">
                    <li>• This is a <strong>simplified Manual J estimate</strong> — useful for sanity-checking contractor quotes, not a substitute for a proper engineering calculation</li>
                    <li>• Accuracy is typically <strong>±0.5 ton</strong> for well-described homes; may be less accurate for unusual construction</li>
                    <li>• <strong>Ductwork condition</strong> significantly affects actual performance — leaky or undersized ducts may require a larger unit</li>
                    <li>• <strong>Internal heat gains</strong> (appliances, lighting, open kitchen) are not included — add 0.5 ton for homes with heavy cooking or many electronics</li>
                    <li>• A reputable contractor should always provide a <strong>Manual J calculation</strong> on request — if they won't, that's a red flag</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Recalculate
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-teal-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
              >
                <Calculator className="w-4 h-4" />
                Calculate Efficiency Savings
              </Link>
            </div>

          </div>
        )}

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AC Sizing — Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What size AC do I need for a 1,500 sq ft house?", a: "In a moderate climate with standard insulation, a 1,500 sq ft home typically needs 2.5 tons (30,000 BTU). In a hot climate like Florida or Texas, the same house may need 3 tons. With excellent insulation, a vented attic, and shading, 2 tons might be sufficient. The 'square footage only' rule misses too many variables — ceiling height, insulation, sun exposure, and construction type all matter significantly." },
              { q: "What size AC do I need for a 2,000 sq ft house?", a: "Most 2,000 sq ft homes need 3–4 tons depending on climate and insulation. In the Southeast or South: plan for 3.5–4 tons. In the Midwest or Northeast: 2.5–3.5 tons. In very hot climates like Arizona or South Florida: 4–5 tons. Use the calculator above with your specific home details for a more accurate estimate." },
              { q: "Why does concrete block construction need more AC?", a: "Concrete block (CMU) walls without insulation have a low R-value (about R-1.5 per 8-inch block) compared to insulated wood frame walls (R-13 to R-21). While CMU has high thermal mass that moderates daily temperature swings, the low R-value means significant heat eventually conducts through — especially after the sun has been heating the walls all day. In hot humid climates (Florida, Gulf Coast, Caribbean), uninsulated CMU homes often need more AC capacity than an equivalent wood frame home." },
              { q: "How much does attic insulation affect AC sizing?", a: "Significantly. The attic accounts for 30–50% of a home's total cooling load in hot climates. A home with no attic insulation and a dark roof in a hot climate may need a system 30–40% larger than the same home with proper attic insulation (R-38+). Upgrading attic insulation before installing a new AC system can allow a smaller, less expensive unit to do the same job — often a better investment than oversizing." },
              { q: "Should I ask my contractor for a Manual J calculation?", a: "Yes, always. Any reputable contractor sizing a new system should provide a Manual J calculation — the industry-standard method that accounts for all factors affecting cooling load. It typically takes 30–60 minutes to produce and gives you a defensible number. If a contractor just 'eyeballs' your square footage or says 'whatever you had before,' that's a red flag. The calculation should be done before any equipment is selected, not after." },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <LeadMagnet />
      </main>
    </>
  );
}
