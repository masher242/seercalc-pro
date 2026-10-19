// AC troubleshooting pages: one entry per symptom. The hub (/troubleshooting) and every
// symptom page (/troubleshooting/{slug}) render from this file. Repair costs match the
// ranges in the repair-cost articles (/blog/ac-repair-cost-2026, /blog/ac-repair-cost-vs-replacement);
// update both together. Figures not in those articles name their source in a comment.

/** Hub date; also the default for symptom pages without their own `updated`. */
export const TROUBLESHOOTING_UPDATED = '2026-10-17';
/** Date the first six symptom pages were published (default `published`/`updated`). */
export const TROUBLESHOOTING_FIRST = '2026-10-14';

export type Who = 'DIY' | 'DIY or pro' | 'Pro';

export interface Cause {
  cause: string;
  signs: string;
  who: Who;
  cost: string;
  /** another troubleshooting page that covers this cause in depth */
  see?: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface Symptom {
  slug: string;
  /** shown on the hub card and in menus */
  name: string;
  /** <title>, 60 characters or fewer */
  title: string;
  h1: string;
  description: string;
  group: GroupId;
  /** one-line summary for the hub card */
  summary: string;
  /** most likely causes, most common first */
  quick: string[];
  /** free checks to do before anything else */
  firstChecks: string[];
  causes: Cause[];
  steps: Step[];
  /** extra warning specific to this symptom, shown with the standard safety box */
  safetyNote?: string;
  /** a short first-person note from Mark's own experience, shown after the causes table */
  fromExperience?: string;
  callPro: string[];
  quoteFlags: string[];
  faqs: { q: string; a: string }[];
  related: string[];
  /** YYYY-MM-DD; defaults to TROUBLESHOOTING_FIRST */
  published?: string;
  /** YYYY-MM-DD; defaults to TROUBLESHOOTING_FIRST */
  updated?: string;
  /** optional closing section, e.g. prevention */
  extra?: { heading: string; paragraphs: string[]; link?: { to: string; label: string } };
}

export type GroupId = 'not-cooling' | 'wont-run' | 'cycling' | 'water-ice' | 'noise-smell' | 'mini-split';

export const GROUPS: { id: GroupId; name: string; blurb: string }[] = [
  { id: 'not-cooling', name: 'Not cooling', blurb: 'It runs, but the air isn\'t cold or the house won\'t cool down.' },
  { id: 'wont-run', name: 'Won\'t run', blurb: 'Nothing happens, or part of the system stays off.' },
  { id: 'cycling', name: 'Runs too much or too little', blurb: 'Short cycling, running nonstop, or a house that stays clammy.' },
  { id: 'water-ice', name: 'Water and ice', blurb: 'Leaks, a full drain pan, or ice on the coil or lines.' },
  { id: 'noise-smell', name: 'Noises and smells', blurb: 'Buzzing, banging, hissing, or a musty or burning smell.' },
  { id: 'mini-split', name: 'Ductless mini-splits', blurb: 'Error codes, blinking lights and resets on wall-mounted units.' },
];

/** Repair cost ranges used across these pages (U.S., installed, 2026). */
export const COST = {
  serviceCall: '$75–$200',
  capacitor: '$150–$400',
  contactor: '$150–$300',
  thermostat: '$100–$400',
  condenserFan: '$400–$800',
  blower: '$500–$1,200',
  refrigerant: '$400–$2,400',
  evapCoil: '$800–$1,600',
  compressor: '$1,500–$3,000',
  drainClear: '$75–$200',
  drainPan: '$200–$600',
  condensatePump: '$150–$400',
  condenserClean: '$100–$300',
  filter: '$5–$20',
  electrical: '$150–$600',
  coilDuctCleaning: '$100–$600',
  burningRepair: '$150–$800',
  breakerTrip: '$150–$1,000',
  ductSealing: '$500–$2,000',
  /** Homewyse national estimate, May 2026 ($2,774–$3,285 per unit installed) */
  dehumidifier: '$2,800–$3,300',
};

export const SYMPTOMS: Symptom[] = [
  {
    slug: 'ac-blowing-warm-air',
    fromExperience: 'My son, who\'s studying for his HVAC certification, cleans our units: clearing debris from around the outdoor unit and rinsing the coil with the power off. It costs nothing, and a dirty coil is one of the most common reasons an AC struggles on hot afternoons.',
    name: 'AC blowing warm air',
    title: 'AC Blowing Warm Air? Causes, Fixes and Repair Costs',
    h1: 'AC Blowing Warm Air? Causes, What to Check and What Repairs Cost',
    description: 'Why your air conditioner is running but blowing warm air: the free checks to do first, the likely causes from thermostat to refrigerant, and typical repair costs.',
    group: 'not-cooling',
    summary: 'The fan runs but the air coming out of the vents is warm or barely cool.',
    quick: [
      'Thermostat set to Heat, or the fan set to On instead of Auto',
      'A clogged air filter',
      'The outdoor unit isn\'t running (tripped breaker, failed capacitor or contactor)',
      'A dirty outdoor coil that can\'t get rid of heat',
      'A frozen indoor coil',
      'Low refrigerant from a leak',
    ],
    firstChecks: [
      'Thermostat: mode on Cool, fan on Auto, temperature set at least 3°F below the room.',
      'Air filter: if it\'s gray and you can\'t see light through it, replace it.',
      'Outdoor unit: with the system calling for cooling, is the fan on top spinning and can you hear the compressor running?',
      'Breakers: check both the indoor unit\'s breaker and the outdoor unit\'s breaker, plus the disconnect box beside the outdoor unit.',
    ],
    causes: [
      { cause: 'Thermostat on Heat or fan on On', signs: 'Air is warm between cooling cycles, or the fan never stops', who: 'DIY', cost: '$0' },
      { cause: 'Clogged air filter', signs: 'Weak airflow from vents, filter visibly gray or matted', who: 'DIY', cost: COST.filter },
      { cause: 'Outdoor unit not running', signs: 'Indoor fan blows, outdoor unit silent or humming with the fan still', who: 'DIY or pro', cost: `$0 (breaker) to ${COST.capacitor} (capacitor)`, see: 'ac-outdoor-unit-not-running' },
      { cause: 'Dirty outdoor (condenser) coil', signs: 'Unit runs but struggles on hot afternoons; fins matted with dirt, grass or lint', who: 'DIY or pro', cost: `$0 DIY rinse, ${COST.condenserClean} pro cleaning` },
      { cause: 'Frozen indoor coil', signs: 'Ice on the large copper line, weak airflow, water as it thaws', who: 'DIY or pro', cost: '$0 to thaw; depends on the cause', see: 'ac-frozen-coil' },
      { cause: 'Low refrigerant (a leak)', signs: 'Cooling has gotten worse over weeks, long run times, ice, hissing, oily spots on lines', who: 'Pro', cost: `${COST.refrigerant} to find, fix and recharge` },
      { cause: 'Failing compressor', signs: 'Outdoor fan runs but no cooling, loud clanking or humming, breaker trips', who: 'Pro', cost: COST.compressor },
    ],
    steps: [
      { title: 'Reset the thermostat', text: 'Set it to Cool, fan on Auto, and 3–5°F below the current room temperature. If the screen is blank, replace the batteries. Wait 5–10 minutes: many systems have a built-in delay before the outdoor unit starts.' },
      { title: 'Replace the filter', text: 'A clogged filter starves the indoor coil of air, which cuts cooling and can freeze the coil. Note the size printed on the frame and the airflow arrow, which points toward the unit.' },
      { title: 'Check the outdoor unit while it should be running', text: 'Stand by it with the thermostat calling for cooling. You should hear the compressor and see the fan spinning, with warm air blowing out of the top. If it\'s silent or humming with the fan still, go to the outdoor unit page.' },
      { title: 'Feel the copper lines', text: 'After 15 minutes of running, the larger insulated copper line at the outdoor unit should feel cold and may sweat. If it\'s warm, the system isn\'t moving heat. If it has ice on it, the coil is freezing.' },
      { title: 'Rinse the outdoor coil', text: 'Turn off power at the disconnect beside the unit. Clear leaves and grass, then hose the fins gently from the outside. Don\'t use a pressure washer, and don\'t bend the fins. Keep plants and fences at least 2 feet away.' },
    ],
    callPro: [
      'The outdoor unit hums but the fan doesn\'t spin, or it doesn\'t start at all with the breaker on',
      'Ice comes back after you\'ve thawed the coil and replaced the filter',
      'You hear hissing, or see oily residue on the copper lines or fittings',
      'The breaker trips again after one reset',
    ],
    quoteFlags: [
      'A refrigerant "top-up" without a leak search. Refrigerant doesn\'t get used up; if it\'s low, it\'s leaking.',
      'A new system recommended before anyone has checked the capacitor, contactor and airflow',
      'A capacitor priced well above the typical $150–$400 installed',
    ],
    faqs: [
      { q: 'Why is my AC running but blowing warm air?', a: 'Most often the thermostat is set wrong, the filter is clogged, or the outdoor unit isn\'t running, which leaves the indoor fan blowing uncooled air. Check those three first. If they\'re fine, the cause is usually a dirty outdoor coil, a frozen indoor coil or low refrigerant.' },
      { q: 'Can low refrigerant make an AC blow warm air?', a: 'Yes. With too little refrigerant the system can\'t absorb enough heat, so the air comes out barely cool, and the indoor coil often freezes. Air conditioners don\'t use up refrigerant, so low refrigerant means a leak. Finding and fixing it typically costs $400–$2,400 depending on the leak and the refrigerant.' },
      { q: 'How long should I wait before calling for service?', a: 'If the thermostat, filter and breakers check out, give it one more 15-minute run. If the air is still warm or the outdoor unit isn\'t running, turn the system off and call. Running it with a failed outdoor fan or low refrigerant can damage the compressor, which is the most expensive part.' },
    ],
    related: ['ac-outdoor-unit-not-running', 'ac-frozen-coil', 'ac-not-turning-on'],
  },
  {
    slug: 'ac-not-turning-on',
    name: 'AC won\'t turn on',
    title: 'AC Won\'t Turn On? Causes, Checks and Repair Costs',
    h1: 'AC Won\'t Turn On? What to Check Before You Call',
    description: 'Air conditioner completely dead? The free checks that fix most no-start problems (thermostat, breakers, switches, a full drain pan) and what repairs cost when it\'s more.',
    group: 'wont-run',
    summary: 'Nothing happens when you lower the thermostat: no fan, no outdoor unit.',
    quick: [
      'Thermostat: dead batteries, wrong mode or a schedule overriding it',
      'A tripped breaker or blown fuse',
      'The service switch by the indoor unit is off, or the panel door isn\'t closed',
      'A full drain pan has tripped the float (safety) switch',
      'A blown low-voltage fuse or failed transformer',
    ],
    firstChecks: [
      'Thermostat screen: blank means batteries or power. Set it to Cool, 3–5°F below room temperature, and switch off any schedule or "hold" setting.',
      'Wait 5–10 minutes. Many systems have a restart delay after a setting change or power interruption.',
      'Breakers: there are usually two, one for the indoor unit (furnace or air handler) and one for the outdoor unit.',
      'Service switch: a light-style switch on or near the indoor unit. It\'s easy to flip off by mistake.',
    ],
    causes: [
      { cause: 'Thermostat batteries, settings or schedule', signs: 'Blank screen, "Heat" or "Off" mode, a schedule holding a higher temperature', who: 'DIY', cost: '$0–$10' },
      { cause: 'Failed thermostat', signs: 'Screen on and set correctly, but nothing starts; works with a test jumper (pro)', who: 'DIY or pro', cost: COST.thermostat },
      { cause: 'Tripped breaker', signs: 'Breaker in the middle or off position', who: 'DIY', cost: '$0 to reset once; service call if it trips again', see: 'ac-tripping-breaker' },
      { cause: 'Blown fuse in the outdoor disconnect', signs: 'Breaker fine but the outdoor unit has no power; the disconnect box holds cartridge fuses', who: 'Pro', cost: `${COST.serviceCall} service call plus parts` },
      { cause: 'Service switch off or panel door open', signs: 'Switch by the indoor unit off; the blower door has a safety switch that cuts power when it isn\'t seated', who: 'DIY', cost: '$0' },
      { cause: 'Full drain pan (float switch)', signs: 'Water in the drain pan or a secondary pan; the system shuts off to prevent a leak', who: 'DIY or pro', cost: `$10–$20 DIY, ${COST.drainClear} pro`, see: 'ac-leaking-water' },
      { cause: 'Blown low-voltage fuse or failed transformer', signs: 'Thermostat dead even with fresh batteries; often after a surge or a wiring short', who: 'Pro', cost: `${COST.serviceCall} service call plus parts` },
      { cause: 'Failed capacitor or contactor', signs: 'Indoor fan runs but the outdoor unit doesn\'t', who: 'Pro', cost: `${COST.capacitor} capacitor, ${COST.contactor} contactor`, see: 'ac-outdoor-unit-not-running' },
    ],
    steps: [
      { title: 'Check the thermostat', text: 'Replace the batteries if it has them, even if the screen is on. Set Cool, fan Auto, and a temperature well below the room. Turn off any schedule or vacation hold. Smart thermostats can lose their connection to the system; check the app for an error.' },
      { title: 'Wait for the restart delay', text: 'Give it 5–10 minutes. Many thermostats and outdoor units wait before starting to protect the compressor, and it\'s easy to mistake that for a fault.' },
      { title: 'Reset breakers once', text: 'Find the breakers for the indoor and outdoor units. A tripped breaker sits in the middle; push it fully off, then on. Reset only once. If it trips again, leave it off and call a technician.' },
      { title: 'Check the switches', text: 'Make sure the service switch near the indoor unit is on, and that the blower compartment door is fully seated. Outside, check that the disconnect box beside the outdoor unit is switched on or its pull-out block is fully inserted.' },
      { title: 'Look in the drain pan', text: 'If there\'s standing water in the pan under the indoor unit, or in the secondary pan beneath it, the float switch has probably shut the system off. Clearing the drain line usually brings it back. See the leaking water page for how.' },
    ],
    callPro: [
      'A breaker trips again after one reset',
      'You smell burning, or see scorch marks in the disconnect box or panel',
      'The thermostat has power and the right settings, but the system doesn\'t respond',
      'You hear clicking or humming, but nothing starts',
    ],
    quoteFlags: [
      'A new thermostat recommended without checking the fuse and transformer',
      'A diagnostic fee above $200 outside a major city',
      'Pressure to replace the system for a no-start problem before the basics are tested',
    ],
    faqs: [
      { q: 'Why won\'t my AC turn on even though the thermostat is on?', a: 'The most common reasons are a tripped breaker, the service switch near the indoor unit being off, the blower door not being closed, or a full drain pan tripping the float switch. If all of those check out, the low-voltage fuse or transformer may have failed, which needs a technician.' },
      { q: 'Is there a reset button on an air conditioner?', a: 'Most central systems don\'t have a single reset button. The equivalent is turning the system off at the thermostat, switching off both breakers for a minute, then turning them back on and waiting 5–10 minutes. Some units have a reset on the control board or a high-pressure switch, but those should be left to a technician, because a tripped safety switch means something caused it.' },
      { q: 'Can a clogged drain stop the AC from turning on?', a: 'Yes. Many systems have a float switch in the drain pan or drain line that shuts the AC off when water backs up, to stop it flooding the house. Clearing the drain line usually lets it restart.' },
    ],
    related: ['ac-leaking-water', 'ac-outdoor-unit-not-running', 'ac-not-working-after-power-outage'],
  },
  {
    slug: 'ac-frozen-coil',
    name: 'AC frozen up',
    title: 'AC Frozen Up? Ice on the Coil or Lines: Causes and Fixes',
    h1: 'AC Frozen Up? Why There\'s Ice on the Coil or Lines and How to Fix It',
    description: 'Ice on your air conditioner\'s copper lines or indoor coil? How to thaw it safely, the causes from a dirty filter to low refrigerant, and what each repair costs.',
    group: 'water-ice',
    summary: 'Ice on the copper lines or indoor coil, weak airflow, water as it melts.',
    quick: [
      'A clogged filter or blocked return vents restricting airflow',
      'Closed or blocked supply vents',
      'Low refrigerant from a leak',
      'A dirty indoor (evaporator) coil',
      'A weak or failing blower motor',
      'Running the AC on cool nights (below about 60°F outside; check your manual for your unit\'s limit)',
    ],
    firstChecks: [
      'Turn cooling off now. Running a frozen coil can send liquid refrigerant back to the compressor and damage it.',
      'Air filter: replace it if it\'s dirty.',
      'Vents: open supply registers and clear furniture or curtains away from return grilles.',
      'Indoor fan: is air coming out of the vents at all when the fan runs?',
    ],
    causes: [
      { cause: 'Clogged filter or blocked returns', signs: 'Weak airflow everywhere, filter gray', who: 'DIY', cost: COST.filter },
      { cause: 'Closed supply vents', signs: 'Several rooms with vents shut; often done to "save energy"', who: 'DIY', cost: '$0' },
      { cause: 'Low refrigerant (a leak)', signs: 'Freezing keeps coming back with a clean filter; cooling has gotten worse over time', who: 'Pro', cost: `${COST.refrigerant} to find, fix and recharge` },
      { cause: 'Dirty indoor coil', signs: 'Old system, filters often skipped; dust matted on the coil', who: 'Pro', cost: `${COST.serviceCall} service call plus cleaning` },
      { cause: 'Weak or failing blower motor', signs: 'Fan sounds slow or laboring; airflow weak with a clean filter', who: 'Pro', cost: COST.blower },
      { cause: 'Running in cool weather', signs: 'Freezes on mild nights, fine on hot days', who: 'DIY', cost: '$0' },
    ],
    steps: [
      { title: 'Switch cooling off and the fan on', text: 'Set the thermostat to Off and the fan to On. Blowing room air across the coil thaws it much faster than leaving everything off. Expect a few hours, longer for heavy ice. Don\'t chip or scrape the ice; the coil fins and tubes are easily damaged.' },
      { title: 'Protect against the melt water', text: 'A lot of water comes off a thawing coil at once. Put towels around the indoor unit and check that the drain pan isn\'t overflowing.' },
      { title: 'Fix the airflow', text: 'Fit a new filter, open all supply vents and clear the return grilles. These are the most common causes, and the only ones you can fix yourself.' },
      { title: 'Restart and watch', text: 'When the coil and lines are completely clear and dry, switch back to Cool. Check the large copper line at the outdoor unit after an hour: cold and sweating is normal, frost or ice is not.' },
    ],
    safetyNote: 'Don\'t use a hair dryer or heat gun on the coil, and never try to add refrigerant yourself. Newer systems use mildly flammable refrigerants (R-454B, R-32), and handling refrigerant requires EPA certification.',
    callPro: [
      'Ice comes back within a day or two after thawing with a clean filter and open vents',
      'Airflow from the vents is weak even with a new filter',
      'You hear hissing or see oily spots on the lines (signs of a leak)',
    ],
    quoteFlags: [
      'A refrigerant recharge with no leak search or repair: it will freeze again',
      'A new coil quoted before anyone has checked airflow and the refrigerant charge',
    ],
    faqs: [
      { q: 'Why is my AC freezing up?', a: 'An evaporator coil freezes when it gets too cold, which happens when too little warm air passes over it (a dirty filter, blocked vents, a failing blower) or when there\'s too little refrigerant. Airflow problems are the most common and the easiest to fix.' },
      { q: 'How long does it take for a frozen AC to thaw?', a: 'Usually a few hours with the fan on and cooling off, and up to a day for heavy ice. Don\'t restart cooling until the coil and copper lines are completely clear.' },
      { q: 'Can I run my AC while it\'s frozen?', a: 'No. A frozen coil cools almost nothing, and running it can push liquid refrigerant back to the compressor, which can damage it. Turn cooling off and run the fan until the ice is gone.' },
    ],
    related: ['ac-blowing-warm-air', 'ac-leaking-water', 'ac-not-turning-on'],
  },
  {
    slug: 'ac-leaking-water',
    fromExperience: 'My son has replaced condensate pumps on our units. It\'s a manageable job for someone handy, as long as the power is off and the new pump matches the old one\'s capacity and connections. If water keeps appearing after the drain line is clear, check the pump.',
    name: 'AC leaking water',
    title: 'AC Leaking Water Inside? Causes, Fixes and Costs',
    h1: 'AC Leaking Water Inside? Causes and How to Fix It',
    description: 'Water around your indoor AC unit usually means a clogged condensate drain. How to clear it yourself, the other causes (pan, pump, frozen coil) and what repairs cost.',
    group: 'water-ice',
    summary: 'Water around the indoor unit, a dripping ceiling or a full drain pan.',
    quick: [
      'A clogged condensate drain line (algae and dirt), the most common cause by far',
      'A frozen coil melting faster than the drain can carry it away',
      'A failed condensate pump',
      'A cracked or rusted drain pan',
      'A drain line that has come loose',
    ],
    firstChecks: [
      'Turn the system off at the thermostat to stop more water being produced.',
      'Look for ice on the indoor coil or copper lines. If there is any, the coil is freezing.',
      'Check the drain pan under the indoor unit for standing water.',
      'If you have a condensate pump (a small box with a tube, near the unit), check whether it\'s full.',
    ],
    causes: [
      { cause: 'Clogged drain line', signs: 'Standing water in the pan, overflow, system shut off by a float switch', who: 'DIY or pro', cost: `$10–$20 DIY, ${COST.drainClear} pro` },
      { cause: 'Frozen coil melting', signs: 'Ice on the coil or lines, weak airflow', who: 'DIY or pro', cost: 'Depends on the cause', see: 'ac-frozen-coil' },
      { cause: 'Failed condensate pump', signs: 'Pump reservoir full, pump doesn\'t switch on, water around it', who: 'DIY or pro', cost: COST.condensatePump },
      { cause: 'Cracked or rusted drain pan', signs: 'Drain clear but water still drips from under the unit', who: 'Pro', cost: COST.drainPan },
      { cause: 'Loose or disconnected drain line', signs: 'Water at a joint in the PVC line', who: 'DIY', cost: '$0–$20' },
    ],
    steps: [
      { title: 'Turn the system off and dry up', text: 'Switch off cooling at the thermostat and turn off power to the indoor unit. Soak up water around the unit, and use a wet/dry vacuum to empty the drain pan.' },
      { title: 'Find the drain line', text: 'It\'s usually a 3/4-inch PVC pipe leaving the indoor unit, often with a T-shaped fitting and a cap (the cleanout) near the unit. Follow it to where it ends outside or at a floor drain.' },
      { title: 'Clear the clog from outside', text: 'Hold a wet/dry vacuum hose over the outside end of the line, seal it with your hand or a rag, and run it for a minute or two. You\'ll often pull out a plug of slime.' },
      { title: 'Flush from the cleanout', text: 'Remove the cap and pour in a cup of distilled white vinegar, then some water to check it flows freely. Check your unit\'s manual first: a few manufacturers recommend against certain cleaners.' },
      { title: 'Check the pump and switch', text: 'If you have a condensate pump, pour a little water into its reservoir: it should switch on and pump it away. Restore power, set the thermostat to Cool, and check the pan stays dry after an hour.' },
    ],
    callPro: [
      'Water keeps coming back after clearing the drain',
      'Water is dripping through a ceiling (an attic unit\'s pan may be overflowing or rusted through)',
      'The condensate pump doesn\'t switch on',
      'The coil is freezing',
    ],
    quoteFlags: [
      'A new coil or system for a leak that a drain clearing would fix',
      'Drain clearing priced well above $200 without other work',
    ],
    faqs: [
      { q: 'Why is my AC leaking water inside the house?', a: 'Air conditioners pull moisture out of the air and drain it away through a condensate line. If that line clogs with algae and dirt, the water backs up and overflows the drain pan. That\'s the cause most of the time. A frozen coil, a failed condensate pump or a cracked pan are the other usual suspects.' },
      { q: 'How do I unclog my AC drain line?', a: 'Turn off the system, then use a wet/dry vacuum on the outside end of the drain line for a minute or two to pull out the clog. Then pour a cup of distilled white vinegar into the cleanout near the indoor unit, followed by water to check it flows.' },
      { q: 'How often should I clean the AC drain line?', a: 'Pour vinegar into the cleanout every month or two during the cooling season. In hot, humid places where the AC runs most of the year, algae grows fast and monthly is worth it.' },
    ],
    related: ['ac-frozen-coil', 'ac-not-turning-on', 'ac-blowing-warm-air'],
  },
  {
    slug: 'ac-outdoor-unit-not-running',
    fromExperience: 'My son, who\'s studying for his HVAC certification, has identified failed capacitors on our units. It\'s one of the cheapest repairs on this list and a common reason an outdoor unit hums without starting, so ask the technician to test it before anything more expensive. A capacitor holds a dangerous charge, so the replacement itself is a job for someone trained.',
    name: 'Outdoor unit not running',
    title: 'AC Outdoor Unit Not Running? Causes and Repair Costs',
    h1: 'AC Outdoor Unit Not Running? Why the Fan or Compressor Won\'t Start',
    description: 'Indoor fan running but the outdoor AC unit is silent, humming or the fan won\'t spin? The causes (capacitor, contactor, breaker, fan motor) and what each repair costs.',
    group: 'wont-run',
    summary: 'The indoor fan blows but the outside unit is silent, humming or its fan is still.',
    quick: [
      'A tripped breaker or blown fuse in the outdoor disconnect',
      'A failed capacitor (often humming with the fan still)',
      'A failed or stuck contactor (silent, or clicks without starting)',
      'A failed condenser fan motor (compressor runs, fan doesn\'t)',
      'The compressor\'s overload protector has tripped from heat',
    ],
    firstChecks: [
      'Thermostat: set to Cool and below room temperature, so it\'s actually calling for cooling.',
      'Breaker for the outdoor unit, and the disconnect box beside it.',
      'Listen: is it silent, humming, or clicking? It narrows the cause down.',
      'Look: is the fan on top spinning? Is the compressor (the round tank inside) running?',
    ],
    causes: [
      { cause: 'Tripped breaker', signs: 'Completely silent, breaker tripped', who: 'DIY', cost: '$0 to reset once; service call if it trips again', see: 'ac-tripping-breaker' },
      { cause: 'Blown fuse in the disconnect box', signs: 'Completely silent, breaker fine; fuses in the disconnect box beside the unit', who: 'Pro', cost: `${COST.serviceCall} service call plus parts` },
      { cause: 'Failed capacitor', signs: 'Humming, fan not spinning or starting slowly; a bulging or leaking capacitor', who: 'Pro', cost: COST.capacitor },
      { cause: 'Failed or stuck contactor', signs: 'Silent while the thermostat calls, or a click with no start; burnt or pitted contacts, sometimes ants', who: 'Pro', cost: COST.contactor },
      { cause: 'Failed condenser fan motor', signs: 'Compressor runs but the fan doesn\'t spin; unit gets very hot and shuts off', who: 'Pro', cost: COST.condenserFan },
      { cause: 'Compressor overload tripped', signs: 'Unit shuts off on hot days and restarts later; often a dirty coil or bad fan behind it', who: 'DIY or pro', cost: `${COST.condenserClean} coil cleaning, or the underlying repair` },
      { cause: 'Failed compressor', signs: 'Fan runs, compressor won\'t start, breaker trips; usually on older systems', who: 'Pro', cost: COST.compressor },
    ],
    steps: [
      { title: 'Confirm it\'s being asked to run', text: 'Set the thermostat to Cool, well below room temperature, and wait 5–10 minutes for any restart delay. If the indoor fan runs, the thermostat is calling.' },
      { title: 'Check the breaker and disconnect', text: 'Reset a tripped breaker once. Check the disconnect box beside the unit is on. If it has fuses, a technician can test them.' },
      { title: 'Listen and look', text: 'Silent usually points to power or the contactor. Humming with a still fan usually points to the capacitor. Fan off but compressor running points to the fan motor. Tell the technician what you heard; it speeds up the diagnosis.' },
      { title: 'Turn it off if it hums', text: 'If the unit hums without starting, switch it off at the thermostat and the disconnect. A motor trying to start against a failed capacitor overheats quickly.' },
      { title: 'Clean around it', text: 'With power off, clear leaves, grass and debris, and rinse the fins from the outside. A clogged coil makes the compressor overheat and trip its overload.' },
    ],
    safetyNote: 'Don\'t push the fan blades with a stick to get them started. It\'s a common tip online, but the fan can start suddenly. And don\'t touch the capacitor: it stores a dangerous charge even with the power off.',
    callPro: [
      'The unit hums but doesn\'t start',
      'The fan doesn\'t spin while the compressor runs',
      'The breaker trips again after one reset',
      'You see burn marks on wires or the contactor',
    ],
    quoteFlags: [
      'A capacitor priced well above $400 installed. The part itself is inexpensive.',
      'A compressor or full system recommended without testing the capacitor and contactor first',
      'For a compressor on a system over about 10 years old, compare the quote with replacement using the repair vs replace calculator before agreeing',
    ],
    faqs: [
      { q: 'Why is my AC outdoor unit not running but the indoor fan is?', a: 'The most common causes are a tripped breaker, a failed capacitor or a failed contactor. A capacitor failure usually makes the unit hum without the fan spinning; a contactor problem usually leaves it silent. Both are common, relatively cheap repairs ($150–$400).' },
      { q: 'Why is my AC outdoor unit humming but not running?', a: 'Usually the capacitor that gives the fan motor and compressor their starting boost has failed. Turn the system off: a motor straining to start will overheat. A capacitor replacement typically costs $150–$400 installed.' },
      { q: 'Should I keep running the AC if the outdoor fan doesn\'t spin?', a: 'No. Without the fan, the compressor can\'t get rid of heat and will overheat, trip its overload and, over time, fail. Turn it off and have the fan motor or capacitor checked.' },
    ],
    related: ['ac-blowing-warm-air', 'ac-not-turning-on', 'ac-not-working-after-power-outage'],
  },
  {
    slug: 'ac-not-working-after-power-outage',
    name: 'AC not working after a power outage',
    title: 'AC Not Working After a Power Outage? What to Check',
    h1: 'AC Not Working After a Power Outage? What to Check and How to Prevent It',
    description: 'Power\'s back but the air conditioner isn\'t? The restart delay, thermostat and breaker checks, signs of surge damage, mini-split resets, and how to protect the system next time.',
    group: 'wont-run',
    summary: 'Power is back on, but the AC won\'t start or doesn\'t cool.',
    quick: [
      'A built-in restart delay: it hasn\'t started yet',
      'The thermostat lost its settings or schedule',
      'A breaker tripped when power came back',
      'A blown low-voltage fuse or transformer from a surge',
      'A failed capacitor or control board from a surge or brownout',
    ],
    firstChecks: [
      'Wait 10 minutes. Many systems hold off restarting to protect the compressor.',
      'Thermostat: check the mode, temperature and clock, and replace the batteries.',
      'Breakers: check both the indoor and outdoor unit breakers.',
      'Smell: any burning smell at the indoor unit, outdoor unit or panel means leave it off and call.',
    ],
    causes: [
      { cause: 'Restart delay', signs: 'Indoor fan may run; outdoor unit starts after a few minutes', who: 'DIY', cost: '$0' },
      { cause: 'Thermostat reset or lost settings', signs: 'Blank or flashing screen, wrong mode or clock', who: 'DIY', cost: '$0–$10' },
      { cause: 'Tripped breaker', signs: 'Breaker in the middle position', who: 'DIY or pro', cost: '$0 to reset; service call if it trips again', see: 'ac-tripping-breaker' },
      { cause: 'Blown low-voltage fuse or transformer', signs: 'Thermostat has no power even with new batteries', who: 'Pro', cost: `${COST.serviceCall} service call plus parts` },
      { cause: 'Failed capacitor', signs: 'Outdoor unit hums but doesn\'t start', who: 'Pro', cost: COST.capacitor, see: 'ac-outdoor-unit-not-running' },
      { cause: 'Damaged control board', signs: 'Blinking error lights on the board, no response to the thermostat; common after lightning or surges', who: 'Pro', cost: `${COST.serviceCall} service call plus the board` },
    ],
    steps: [
      { title: 'Give it 10 minutes', text: 'Leave the thermostat calling for cooling and wait. Restart delays of 3–5 minutes are common, and some units wait longer after a power cut.' },
      { title: 'Reset the thermostat', text: 'Check the mode, set temperature and clock, and replace the batteries. Smart thermostats may need to reconnect to Wi-Fi before a schedule works again.' },
      { title: 'Power-cycle the system', text: 'Turn the thermostat off, switch off both breakers for a minute, then turn them back on and set the thermostat to Cool. This clears many control-board lockouts.' },
      { title: 'Reset a mini-split', text: 'For a ductless system, turn it off at the breaker for a minute, then restart it with the remote. If the indoor unit shows a blinking light or error code, note the code and pattern; it tells the technician what failed.' },
      { title: 'Stop if anything is wrong', text: 'If a breaker trips again, you smell burning, or the outdoor unit hums without starting, switch everything off and call. Repeated restarts on a damaged part can turn a small repair into a compressor replacement.' },
    ],
    callPro: [
      'A breaker trips again after one reset',
      'There\'s a burning smell, or scorch marks on wiring',
      'The thermostat has no power with fresh batteries',
      'The outdoor unit hums but won\'t start',
    ],
    quoteFlags: [
      'A new system recommended for surge damage before the capacitor, fuse and board are tested',
      'Ask whether your homeowner\'s insurance covers surge or lightning damage before paying for a large repair',
    ],
    faqs: [
      { q: 'Why won\'t my AC turn back on after a power outage?', a: 'Often it just hasn\'t restarted yet: many systems wait several minutes after power returns. If it still won\'t run after 10 minutes, check the thermostat settings and batteries, then the breakers. A surge when power comes back can also blow the low-voltage fuse or damage a capacitor or control board.' },
      { q: 'How do I reset my AC after a power outage?', a: 'Turn the thermostat off, switch off the breakers for the indoor and outdoor units for about a minute, turn them back on, then set the thermostat to Cool and wait 5–10 minutes.' },
      { q: 'Should I turn off my AC during a power outage?', a: 'Yes. Turning the system off at the thermostat (and the breakers, if a storm is coming) means it won\'t try to start during the surges and brownouts that often come when power is restored. Wait a few minutes after power is stable before turning it back on.' },
    ],
    related: ['ac-not-turning-on', 'ac-outdoor-unit-not-running', 'ac-blowing-warm-air'],
    extra: {
      heading: 'How to protect your AC next time',
      paragraphs: [
        'Where I run my stores, outages and brownouts are part of normal life, and I\'ve lost refrigeration compressors to brownouts. Those units now run on protectors that cut power when the voltage drops and wait before reconnecting. For the air conditioners, we stagger the restarts so the units don\'t all start at once when power comes back, and before a hurricane every unit and its breaker gets switched off.',
        'Most of that is free: turn the AC off when the power goes out, and wait a few minutes after it\'s stable before turning it back on. Beyond that, a voltage monitor at the outdoor unit and a whole-house surge protector are the main options.',
      ],
      link: { to: '/blog/protect-air-conditioner-power-surges-outages', label: 'How to protect your AC from power surges, brownouts and outages' },
    },
  },
  {
    slug: 'ac-making-noise',
    published: '2026-10-17',
    updated: '2026-10-17',
    name: 'AC making noise',
    title: 'AC Making Noise? What Buzzing, Banging and Hissing Mean',
    h1: 'AC Making a Strange Noise? What Each Sound Means and What to Do',
    description: "Buzzing, clicking, hissing, banging, squealing or rattling from your air conditioner? What each sound usually means, which ones to turn the AC off for, and what repairs cost.",
    group: 'noise-smell',
    summary: 'Buzzing, clicking, hissing, banging, squealing or rattling from the indoor or outdoor unit.',
    quick: [
      "Buzzing or humming at the outdoor unit: a failing capacitor or contactor, or a motor that can't start",
      'Rattling: a loose panel or screw, or debris in the fan',
      'Squealing or grinding: worn fan or blower motor bearings, or a slipping belt on older blowers',
      'Hissing: a refrigerant leak (a short hiss right after shut-off is normal)',
      'Gurgling or bubbling: a partly clogged or dried-out condensate drain',
      'Banging or clanking: a loose or broken part, or a failing compressor',
      'Screaming or loud whistling from the outdoor unit: dangerously high pressure. Turn it off now.',
    ],
    firstChecks: [
      'Find where it comes from: the outdoor unit, the indoor unit (air handler or furnace), the ducts or one vent.',
      'Notice when: only at start-up or shut-down, the whole time it runs, or only on hot afternoons.',
      "With power off at the disconnect, look through the outdoor unit's top grille for sticks, leaves or anything touching the fan.",
      "Check that the filter door and the indoor unit's panels are seated and their screws are tight.",
    ],
    causes: [
      { cause: 'Normal operating sounds', signs: 'A click at the thermostat or outdoor unit when it starts and stops, a short whoosh or hiss as pressures even out after shut-off, a steady hum while running, ducts ticking as they cool', who: 'DIY', cost: '$0' },
      { cause: 'Failing capacitor', signs: "Outdoor unit hums or buzzes but the fan doesn't spin, or starts slowly", who: 'Pro', cost: COST.capacitor, see: 'ac-outdoor-unit-not-running' },
      { cause: 'Failing contactor or loose wiring', signs: 'Buzzing or chattering at the outdoor unit, rapid clicking, sometimes insects nesting in the contactor', who: 'Pro', cost: COST.electrical },
      { cause: 'Loose panel, screw or debris', signs: 'Rattling or vibration that stops when you press on a panel; sticks or leaves in the fan', who: 'DIY', cost: '$0' },
      { cause: 'Worn outdoor fan motor', signs: 'Squealing, screeching or grinding from the top of the outdoor unit; fan slow to get up to speed', who: 'Pro', cost: COST.condenserFan },
      { cause: 'Worn blower motor or belt (indoor)', signs: 'Squealing or grinding from the indoor unit whenever the fan runs; belt-drive blowers on older systems squeal when the belt slips', who: 'Pro', cost: `${COST.serviceCall} for a belt, ${COST.blower} for a motor` },
      { cause: 'Refrigerant leak', signs: 'Continuous hissing near the copper lines or coil, cooling getting worse, ice on the lines', who: 'Pro', cost: `${COST.refrigerant} to find, fix and recharge` },
      { cause: 'Partly clogged or dried-out drain', signs: 'Gurgling or bubbling near the indoor unit while it runs', who: 'DIY or pro', cost: `$10–$20 DIY, ${COST.drainClear} pro`, see: 'ac-leaking-water' },
      { cause: 'Ducts flexing or a restricted return', signs: 'Popping or booming in the ducts when the blower starts or stops; whistling at a grille', who: 'DIY or pro', cost: '$0 (new filter, open vents) to duct work' },
      { cause: 'Failing compressor or a broken internal part', signs: 'Loud banging, clanking or knocking from the outdoor unit, often at start-up', who: 'Pro', cost: COST.compressor },
      { cause: 'Dangerously high pressure', signs: 'Screaming or a high-pitched whistle from the outdoor unit', who: 'Pro', cost: 'Depends on the cause; turn it off first' },
    ],
    steps: [
      { title: 'Pin down where and when', text: 'Stand by each part of the system while it runs. Note whether the sound comes at start-up, the whole time, or at shut-off. That alone narrows most noises to one or two causes.' },
      { title: 'Turn it off for the serious ones', text: "Screaming, grinding, banging, or buzzing while the outdoor fan sits still: switch the system off at the thermostat and the disconnect. Those sounds mean a part is failing, and running it can damage the compressor." },
      { title: 'Clear the outdoor unit', text: "With power off at the disconnect, clear leaves, grass and sticks from around and on top of the unit. Don't reach into the fan or take the top grille off. Keep plants at least 2 feet away." },
      { title: 'Tighten what you can reach', text: "Press on the outdoor unit's side panels and the indoor unit's doors while it runs. If the rattle stops, a panel is loose; tighten its screws with the power off. Make sure the filter is seated and its door closed." },
      { title: 'Record it for the technician', text: 'Take a short video with sound, and note when it happens. A technician who hears the sound before arriving can bring the likely part and diagnose it faster.' },
    ],
    safetyNote: "Never reach into the outdoor fan or remove its grille with the power on. Turn off the disconnect first and wait for the blades to stop completely.",
    callPro: [
      'Screaming, grinding, banging or clanking',
      "Buzzing or humming while the outdoor fan doesn't spin",
      'Continuous hissing near the refrigerant lines',
      'Any noise that comes with a tripped breaker or a burning smell',
    ],
    quoteFlags: [
      "A new compressor or system quoted for a buzz before anyone has tested the capacitor and contactor",
      'A refrigerant recharge for a hiss with no leak search',
      'A fan motor replaced without testing the capacitor that starts it',
    ],
    faqs: [
      { q: 'Why is my AC making a buzzing noise?', a: "Most often it's an electrical part at the outdoor unit: a failing capacitor or contactor, or loose wiring. If the fan isn't spinning while it buzzes, turn the system off, because the motor is trying and failing to start and will overheat. Electrical repairs like these typically cost $150–$600." },
      { q: 'Is it normal for an AC to click?', a: "A single click when the system starts and stops is normal: it's the thermostat and a relay switching. Rapid or continuous clicking, or a click with nothing starting, points to a failing contactor, relay or control board." },
      { q: 'Why is my AC making a hissing sound?', a: 'A short hiss or whoosh right after the system shuts off is usually normal, as the refrigerant pressures even out. A continuous hiss near the lines or coil can be a refrigerant leak, especially if cooling is getting worse or ice forms on the lines. Have it checked.' },
      { q: 'What does it mean when an AC is screaming?', a: 'A scream or high-pitched whistle from the outdoor unit can mean dangerously high pressure inside the compressor or a serious refrigerant leak. Turn the system off at the thermostat and the disconnect right away and call a technician.' },
    ],
    related: ['ac-outdoor-unit-not-running', 'ac-smells', 'ac-short-cycling'],
  },
  {
    slug: 'ac-smells',
    published: '2026-10-17',
    updated: '2026-10-17',
    name: 'AC smells bad',
    title: 'AC Smells Bad? Musty, Burning and Other Odors Explained',
    h1: 'Bad Smell From Your AC? What Musty, Burning and Other Odors Mean',
    description: "What a musty, burning, rotten-egg, sewage or chemical smell from your air conditioner usually means, which smells are an emergency, and how to get rid of the rest.",
    group: 'noise-smell',
    summary: 'A musty, burning, rotten-egg, sour or chemical smell when the AC runs.',
    quick: [
      'Musty or mildew: mold or bacteria on the indoor coil, in the drain pan, on the filter or in the ducts',
      'Burning or electrical: an overheating motor or wiring. Turn the system off.',
      'Rotten eggs: a natural gas leak (from a gas furnace or another appliance) or a dead animal in the ducts',
      'Dirty socks: bacteria growing on the indoor coil, common on heat pumps',
      'Sewage: a dried-out drain trap letting sewer gas in',
      'Dusty burning on the first heating day of the season: dust burning off, usually gone within an hour',
    ],
    firstChecks: [
      'Burning, electrical or rotten-egg smell: follow the safety box above before doing anything else.',
      'Air filter: a damp, dirty filter can smell musty. Replace it.',
      'Drain pan and drain line: standing water under the indoor unit grows mold and bacteria.',
      'Every vent, or one room? A smell at every vent points to the indoor unit; one vent points to that duct.',
    ],
    causes: [
      { cause: 'Mold or mildew on the coil, pan or ducts', signs: 'Musty smell, strongest when the system starts; visible dark growth on the coil or in the pan', who: 'DIY or pro', cost: `$0 (filter, drain) to ${COST.coilDuctCleaning} cleaning` },
      { cause: 'Clogged drain or standing water', signs: 'Musty or sour smell, water in the drain pan', who: 'DIY or pro', cost: `$10–$20 DIY, ${COST.drainClear} pro`, see: 'ac-leaking-water' },
      { cause: 'Dirty filter', signs: 'Musty or dusty smell, filter gray or damp', who: 'DIY', cost: COST.filter },
      { cause: 'Overheating motor or wiring', signs: 'Burning plastic or electrical smell, sometimes with buzzing or a tripped breaker', who: 'Pro', cost: COST.burningRepair },
      { cause: 'Dust burning off heating parts', signs: 'Dusty burning smell the first time the heat runs each season, fading within an hour', who: 'DIY', cost: '$0' },
      { cause: 'Natural gas leak (not from the AC)', signs: 'Rotten-egg smell near a gas furnace, water heater or other gas appliance', who: 'Pro', cost: 'Call your gas utility first' },
      { cause: 'Dead animal in the ducts or unit', signs: 'Rotten smell getting stronger, often worst at one vent', who: 'Pro', cost: `${COST.serviceCall} service call plus removal and cleaning` },
      { cause: '"Dirty sock" bacteria on the coil', signs: 'Smell of dirty socks or sweat, often when a heat pump switches modes', who: 'Pro', cost: COST.coilDuctCleaning },
      { cause: 'Sewer gas from a dry drain trap', signs: 'Sewage smell near the indoor unit or a floor drain the condensate runs to', who: 'DIY or pro', cost: "$0 (refill the trap) to a plumber's visit" },
      { cause: 'Refrigerant leak', signs: "A faint sweet or chemical smell with cooling getting worse; many refrigerants have little smell, so this is a weak sign", who: 'Pro', cost: `${COST.refrigerant} to find, fix and recharge` },
    ],
    steps: [
      { title: 'Rule out the dangerous smells', text: "Burning or electrical: turn the system off at the thermostat and the breaker, and call. Rotten eggs: don't touch switches; leave and call the gas utility from outside. Then come back to the rest of these steps." },
      { title: 'Replace the filter', text: 'A damp, dirty filter is the cheapest cause to rule out. If the smell fades within a day, that was it.' },
      { title: 'Check the drain pan and line', text: 'With power off, look in the pan under the indoor unit. Standing water means the drain is clogged: clear it with a wet/dry vacuum on the outside end, then pour a cup of distilled white vinegar into the cleanout. See the leaking water page for details.' },
      { title: 'Look at the coil if you can', text: 'Many indoor units have a removable access panel in front of the coil. With power off, look for dark growth on the coil or in the pan. Visible mold on the coil is a job for a professional cleaning.' },
      { title: 'Refill dry drain traps', text: "For a sewage smell, pour a quart of water into any floor drain near the indoor unit, and into the condensate line's trap if it has one. Traps that dry out let sewer gas back into the house." },
    ],
    safetyNote: "If you smell rotten eggs (natural gas), don't switch anything on or off. Get everyone out, then call your gas utility or 911 from outside. If a carbon monoxide alarm sounds, get outside and call for help. Your air conditioner doesn't burn gas, but a gas furnace often shares the same ducts and blower.",
    callPro: [
      'Any burning or electrical smell',
      'A rotten smell that keeps getting stronger, especially at one vent',
      'A musty smell that returns after a new filter and a clear drain',
      'Visible mold on the coil, in the pan or inside the ducts',
    ],
    quoteFlags: [
      'Whole-house duct cleaning sold as the cure for a musty smell before anyone checks the coil, drain pan and drain line',
      'A UV light or air purifier sold as the only fix for mold, without fixing the moisture that feeds it',
      'Refrigerant added for a smell, with no leak search',
    ],
    faqs: [
      { q: 'Why does my AC smell musty?', a: "Usually because mold or bacteria are growing where moisture collects: on the indoor coil, in the drain pan, on a damp filter or in the ducts. Replace the filter, clear the drain and check the pan. If the smell comes back, have the coil cleaned. Keeping indoor humidity below 60% (EPA's guideline) slows the growth." },
      { q: 'Is a burning smell from my AC dangerous?', a: 'It can be. An electrical or burning-plastic smell can mean an overheating motor or wiring, so turn the system off at the thermostat and breaker and call a technician. The one usually harmless exception is a dusty smell the first time the heat runs each season.' },
      { q: 'Why does my AC smell like rotten eggs?', a: "Natural gas has a rotten-egg odor added to it, so treat that smell as a possible gas leak: leave the house and call your gas utility from outside. Your AC doesn't use gas, but a gas furnace often shares its ducts. If the gas company finds no leak, a dead animal in the ductwork is the next most likely cause." },
      { q: 'Should I get my air ducts cleaned for a bad smell?', a: "Usually not first. The EPA says duct cleaning isn't something most homes need routinely, and suggests considering it when there's visible mold growth inside the ducts, signs of rodents or insects, or so much dust and debris that it blows out of the vents. Most AC smells come from the coil, drain pan or filter." },
    ],
    related: ['ac-leaking-water', 'ac-high-humidity', 'ac-making-noise'],
  },
  {
    slug: 'ac-short-cycling',
    published: '2026-10-17',
    updated: '2026-10-17',
    name: 'AC short cycling',
    title: 'AC Short Cycling? Why It Turns On and Off Too Often',
    h1: 'AC Short Cycling? Why Your Air Conditioner Keeps Turning On and Off',
    description: "AC runs a few minutes, shuts off, then starts again? The causes, from an oversized unit to a dirty coil or a badly placed thermostat, what to check first and what fixes cost.",
    group: 'cycling',
    summary: 'It runs for a few minutes, shuts off, then starts again soon after.',
    quick: [
      'An oversized system that cools the air near the thermostat too fast',
      'A clogged filter or a frozen coil',
      'The thermostat sits near a supply vent, a sunny window or a heat source',
      'A dirty outdoor coil making the system overheat and trip a safety switch',
      'Low refrigerant tripping the low-pressure switch',
      'A backed-up drain tripping the float switch',
      'An electrical fault: capacitor, contactor or control board',
    ],
    firstChecks: [
      "Time it on a warm afternoon: how long it runs, how long it stays off. Repeated runs of under about 10 minutes, while the house still isn't at the set temperature, are the classic sign (a rule of thumb, not a precise limit).",
      "Air filter: replace it if it's dirty.",
      'Thermostat: is it in sunlight, above a lamp or TV, near the kitchen, or in the path of a supply vent?',
      'Look for ice on the copper lines, and check the outdoor coil is clean and clear.',
    ],
    causes: [
      { cause: 'Oversized system', signs: 'Cools fast then shuts off, house feels clammy, has done it since the system was installed', who: 'Pro', cost: '$0 now; size correctly when you replace it' },
      { cause: 'Clogged filter', signs: 'Weak airflow, filter gray or matted', who: 'DIY', cost: COST.filter },
      { cause: 'Frozen coil', signs: 'Ice on the lines, weak airflow, shuts off and on', who: 'DIY or pro', cost: 'Depends on the cause', see: 'ac-frozen-coil' },
      { cause: 'Thermostat location or a failing thermostat', signs: 'Shuts off while other rooms are still warm; thermostat in sun, near a vent or a heat source', who: 'DIY or pro', cost: `$0 (move the heat source) to ${COST.thermostat}` },
      { cause: 'Dirty outdoor coil (overheating)', signs: 'Shuts off on hot afternoons and restarts later; fins matted with dirt or grass', who: 'DIY or pro', cost: `$0 DIY rinse, ${COST.condenserClean} pro cleaning` },
      { cause: 'Low refrigerant (low-pressure switch)', signs: 'Cooling getting worse over weeks, ice, short runs', who: 'Pro', cost: `${COST.refrigerant} to find, fix and recharge` },
      { cause: 'Float switch on a backed-up drain', signs: 'Shuts off with water in the pan, restarts as it drains', who: 'DIY or pro', cost: `$10–$20 DIY, ${COST.drainClear} pro`, see: 'ac-leaking-water' },
      { cause: 'Electrical fault', signs: 'Starts and stops at random, clicking or buzzing at the outdoor unit', who: 'Pro', cost: `${COST.capacitor} capacitor, ${COST.contactor} contactor, more for a control board` },
    ],
    steps: [
      { title: 'Time the cycles', text: 'On a warm afternoon, note when it starts and stops for an hour. Write down the indoor temperature too. Short runs while the house is still warm point to a fault; short runs once it\'s at the set temperature point to oversizing or the thermostat.' },
      { title: 'Fix the airflow', text: 'Fit a new filter, open all supply vents and clear the return grilles. Restricted airflow is a common cause and the cheapest to fix.' },
      { title: 'Check the thermostat', text: "Replace its batteries and look at where it sits. A thermostat in sunlight or in the stream of a supply vent shuts the system off early. Some thermostats have a cycle-rate (cycles per hour) setting; check it against the thermostat's manual for air conditioning." },
      { title: 'Clean the outdoor coil', text: "With power off at the disconnect, clear debris and rinse the fins gently from the outside with a garden hose. A coil that can't shed heat trips the system's high-pressure or overload protection." },
      { title: 'Look for ice and water', text: 'Ice on the copper lines means a frozen coil. Water in the drain pan means the float switch may be cutting the power. Each has its own page linked in the table above.' },
    ],
    callPro: [
      'Short cycling continues with a new filter, a clean coil and the thermostat ruled out',
      'Ice on the lines or the coil',
      'The outdoor unit shuts off on hot afternoons and restarts later',
      'Clicking or buzzing each time it starts or stops',
    ],
    quoteFlags: [
      'A new system quoted for short cycling before the filter, refrigerant charge, safety switches and thermostat are checked',
      'A bigger unit recommended to fix comfort problems: an oversized system short cycles more, not less',
      'A refrigerant top-up with no leak search',
    ],
    faqs: [
      { q: 'What causes an AC to short cycle?', a: 'The most common causes are a clogged filter or frozen coil, a thermostat in a bad spot, a dirty outdoor coil tripping a safety switch, low refrigerant, and a system that is too big for the house. Start with the filter, the thermostat location and the outdoor coil, which you can check yourself.' },
      { q: 'How long should an AC run each cycle?', a: "It depends on the weather. As a rough guide, a correctly sized single-stage system on a warm day runs at least 10 minutes at a time, longer as it gets hotter, and on the hottest days it may run almost nonstop. Variable-speed systems are designed to run for long periods at low speed." },
      { q: 'Is short cycling bad for my AC?', a: 'Yes. Starting is the hardest moment for a compressor, so frequent starts wear it faster. Short runs also waste energy and remove little humidity, because the coil shuts off before it has drained much moisture.' },
      { q: 'Can an oversized AC cause short cycling?', a: "Yes. An oversized system cools the air near the thermostat quickly and shuts off before the rest of the house, and before it has removed much humidity. There's no cheap fix; the answer is a correctly sized system (a Manual J load calculation) at replacement. Check yours with the AC sizing calculator." },
    ],
    related: ['ac-running-constantly', 'ac-high-humidity', 'ac-frozen-coil'],
    extra: {
      heading: 'If your system is oversized',
      paragraphs: [
        "Oversizing is common, because replacing a unit with one the same size as the old one (or bigger, to be safe) skips the load calculation. If your system has short cycled since the day it was installed and everything else checks out, it's probably too big for the house.",
        'You can soften the effect: keep the fan on Auto, use a thermostat with a dehumidify setting, and keep the filter and coil clean. At replacement, ask for a Manual J load calculation, and consider a two-stage or variable-speed system, which runs at low output most of the time.',
      ],
      link: { to: '/calculators/ac-sizing', label: 'the AC sizing calculator' },
    },
  },
  {
    slug: 'ac-running-constantly',
    published: '2026-10-17',
    updated: '2026-10-17',
    name: 'AC running nonstop',
    title: "AC Running Constantly? When It's Normal and When It's Not",
    h1: "AC Running Nonstop? When It's Normal and How to Find the Problem",
    description: "Air conditioner never shuts off? When nonstop running is normal on hot days, the checks that find the problem when it isn't, a simple thermometer test, and what fixes cost.",
    group: 'cycling',
    summary: "It runs and runs without shutting off, or never reaches the set temperature.",
    quick: [
      'Very hot weather: on the hottest days a correctly sized system can run almost nonstop',
      'The thermostat set very low, or the fan set to On',
      'A clogged filter or a dirty outdoor coil',
      'Low refrigerant from a leak',
      'Leaky ducts in a hot attic or crawlspace',
      'A system that is too small or worn out',
      'A stuck contactor: the outdoor unit keeps running even with the thermostat off',
    ],
    firstChecks: [
      'Fan or whole system? If only the indoor fan runs, set the thermostat fan to Auto instead of On.',
      'Set the thermostat to Off. If the outdoor unit keeps running, switch it off at the disconnect and call: the contactor is stuck.',
      "Check the weather. Systems are sized for typical hot days where you live; on hotter days it's normal for them to run for long stretches and for the house to sit a few degrees above the setting.",
      'Filter and outdoor coil: replace a dirty filter, and look for matted fins outside.',
    ],
    causes: [
      { cause: 'Extreme heat', signs: 'Runs nonstop only on the hottest afternoons and catches up in the evening', who: 'DIY', cost: '$0' },
      { cause: 'Thermostat set very low, or fan on On', signs: 'Set more than about 20°F below the outdoor temperature, or the fan never stops between cycles', who: 'DIY', cost: '$0' },
      { cause: 'Clogged filter', signs: 'Weak airflow, filter gray or matted', who: 'DIY', cost: COST.filter },
      { cause: 'Dirty outdoor coil', signs: 'Fins matted with dirt, grass or lint; struggles most on hot afternoons', who: 'DIY or pro', cost: `$0 DIY rinse, ${COST.condenserClean} pro cleaning` },
      { cause: 'Low refrigerant (a leak)', signs: 'Air not very cold, cooling worse over weeks, ice on the lines', who: 'Pro', cost: `${COST.refrigerant} to find, fix and recharge` },
      { cause: 'Leaky or uninsulated ducts', signs: 'Rooms far from the unit stay warm; ducts in a hot attic; dust streaks at duct joints', who: 'Pro', cost: `${COST.ductSealing} duct sealing` },
      { cause: 'Stuck contactor', signs: 'Outdoor unit keeps running with the thermostat off', who: 'Pro', cost: COST.contactor },
      { cause: 'Undersized or worn-out system', signs: "Never keeps up on ordinary summer days; system old or added rooms since it was sized", who: 'Pro', cost: 'Replacement; compare with the repair vs replace calculator' },
      { cause: 'Heat coming in', signs: 'Sun on big windows, a hot attic with little insulation, oven or dryer running in the afternoon', who: 'DIY', cost: '$0 (blinds) and up' },
    ],
    steps: [
      { title: 'Check the settings', text: "Cool, fan on Auto, and a sensible temperature. Each degree lower adds run time, and setting it very low doesn't cool the house faster." },
      { title: 'Do the Off test', text: 'Set the thermostat to Off and go outside. If the outdoor unit is still running after a minute, turn it off at the disconnect. A stuck contactor runs the compressor nonstop and needs a technician.' },
      { title: 'Replace the filter and rinse the coil', text: 'A new filter and a clean outdoor coil restore airflow and heat transfer, the two things a system needs to keep up.' },
      { title: 'Measure the temperature split', text: "After 15 minutes of running, put a thermometer at a return grille and at the supply vent nearest the indoor unit. A difference of roughly 15–20°F is typical (a rule of thumb; humid weather lowers it). Much less points to low refrigerant, a dirty coil or a failing compressor; much more points to low airflow." },
      { title: 'Cut the heat coming in', text: 'Close blinds on sunny windows, avoid the oven and dryer in the afternoon, and check that the attic has insulation. Less heat in means shorter run times.' },
    ],
    callPro: [
      'The outdoor unit runs with the thermostat off',
      'The temperature split is well under about 15°F',
      'Ice on the lines or the coil',
      "It runs nonstop on mild days and still doesn't reach the setting",
    ],
    quoteFlags: [
      'A bigger system recommended before anyone checks the refrigerant charge, airflow and ducts',
      'A refrigerant top-up with no leak search',
      "Duct cleaning sold as the fix for long run times: cleaning doesn't seal leaks",
    ],
    faqs: [
      { q: 'Is it normal for my AC to run all day in hot weather?', a: "Yes, on the hottest days. Air conditioners are sized for typical hot weather where you live, so above that they run for long stretches and the house may sit a few degrees above the setting until evening. It's a problem if it also runs nonstop on ordinary days." },
      { q: 'How do I know if my AC running constantly is a problem?', a: "Signs of a real fault: it runs nonstop on mild days, never gets within a few degrees of the setting, the air from the vents isn't much colder than the room (a split well under about 15°F), there's ice on the lines, or the outdoor unit keeps running with the thermostat off." },
      { q: 'Does running nonstop damage an AC?', a: "Long runs aren't harmful in themselves; starting and stopping is harder on a compressor than running. But nonstop running costs more, and if it's caused by low refrigerant, a dirty coil or a stuck contactor, that underlying fault can damage the compressor." },
      { q: 'Why does my outdoor unit keep running when the thermostat is off?', a: "Usually the contactor, the switch that turns the outdoor unit on and off, has stuck closed. Turn the unit off at the disconnect beside it and call a technician. A contactor typically costs $150–$300 to replace." },
    ],
    related: ['ac-blowing-warm-air', 'ac-short-cycling', 'ac-frozen-coil'],
  },
  {
    slug: 'ac-tripping-breaker',
    published: '2026-10-17',
    updated: '2026-10-17',
    name: 'AC tripping the breaker',
    title: 'AC Keeps Tripping the Breaker? Causes and What to Do',
    h1: 'AC Keeps Tripping the Breaker? Why It Happens and What to Do',
    description: "AC keeps tripping its breaker? What the timing tells you, the causes from a dirty coil to a failing capacitor or compressor, and why you shouldn't keep resetting it.",
    group: 'wont-run',
    summary: 'The breaker for the AC trips when it starts, after it runs a while, or on hot afternoons.',
    quick: [
      'A dirty outdoor coil or blocked airflow making the compressor draw more current',
      'A failing capacitor, so the motors struggle to start',
      'A compressor that is hard to start or failing',
      'A failed outdoor fan motor',
      'A short in the wiring or a motor (trips instantly)',
      'A worn breaker or a loose connection at the panel',
    ],
    firstChecks: [
      'Which breaker: the outdoor unit, or the indoor unit (air handler or furnace)?',
      'When it trips: the instant you reset it, when the compressor starts, or after running for a while on hot afternoons.',
      'Look at the panel and the disconnect beside the outdoor unit: scorch marks, a burning smell or a hot breaker mean stop and call.',
      'Outdoor coil and filter: matted fins outside or a clogged filter inside make the motors work harder.',
    ],
    causes: [
      { cause: 'Dirty outdoor coil or blocked airflow', signs: 'Trips after running a while, mostly on hot afternoons; fins matted or plants crowding the unit', who: 'DIY or pro', cost: `$0 DIY rinse, ${COST.condenserClean} pro cleaning` },
      { cause: 'Failing capacitor', signs: 'Trips as the outdoor unit tries to start; humming before it trips', who: 'Pro', cost: COST.capacitor },
      { cause: 'Hard-starting or failing compressor', signs: 'Trips the moment the compressor starts; lights dim; system over about 10 years old', who: 'Pro', cost: `$30–$80 hard-start kit part plus labor; ${COST.compressor} for a compressor` },
      { cause: 'Failed outdoor fan motor', signs: "Fan doesn't spin, unit gets very hot, then the breaker trips", who: 'Pro', cost: COST.condenserFan },
      { cause: 'Short in wiring or a motor', signs: 'Trips instantly every time you reset it', who: 'Pro', cost: `${COST.breakerTrip} to find and repair` },
      { cause: 'Worn breaker or loose connection', signs: "Breaker warm, buzzing or tripping with no other symptom; the system runs fine on a tester's meter", who: 'Pro', cost: "An electrician's visit plus the breaker" },
      { cause: 'Indoor blower strain', signs: "The indoor unit's breaker trips; clogged filter or a failing blower motor", who: 'DIY or pro', cost: `${COST.filter} filter, ${COST.blower} blower motor` },
    ],
    steps: [
      { title: 'Reset once, properly', text: 'Turn the thermostat off. Push the tripped breaker firmly to Off, then back to On. Wait 5–10 minutes before setting the thermostat to Cool, so the compressor doesn\'t start against high pressure.' },
      { title: 'Watch when it trips', text: 'Instantly on reset points to a short: leave it off. At start-up points to the capacitor or compressor. After a while on hot afternoons points to a dirty coil, a failing fan motor or airflow. Tell the technician which it was.' },
      { title: 'Clean the coil and replace the filter', text: 'With power off at the disconnect, rinse the outdoor coil from the outside and clear plants back 2 feet. Fit a new indoor filter. These are the only causes you can fix yourself.' },
      { title: 'If it trips again, leave it off', text: "A breaker trips to protect the wiring from overheating. Resetting it over and over can damage the compressor and, in the worst case, start a fire. One reset, then call." },
      { title: 'Check the breaker size, not by guessing', text: "The outdoor unit's nameplate lists the maximum fuse or breaker size (often \"MAX FUSE/BKR\"). The breaker should not be larger than that. Never fit a bigger breaker to stop the trips; that only removes the protection." },
    ],
    safetyNote: "Never replace the breaker with a larger one to stop it tripping. Breakers are sized to the wiring and the unit; a bigger one lets the wires overheat. Panel work is for a licensed electrician.",
    callPro: [
      'It trips again after one reset',
      'It trips the instant you reset it',
      'A burning smell, scorch marks, or a breaker that feels hot or buzzes',
      'The lights dim and it trips as the compressor starts',
    ],
    quoteFlags: [
      'A new system quoted before the capacitor, fan motor and compressor have been tested',
      'A larger breaker offered as the fix',
      'For a failed compressor on a system over about 10 years old, compare the quote with replacement before agreeing',
    ],
    faqs: [
      { q: 'Why does my AC keep tripping the breaker?', a: 'Most often because the outdoor unit is drawing more current than it should: a dirty coil or blocked airflow on hot days, a failing capacitor that makes the motors struggle to start, or a compressor that is wearing out. A breaker that trips instantly on reset usually means a short circuit.' },
      { q: 'Is it safe to keep resetting the AC breaker?', a: "No. Reset it once. If it trips again, leave it off and call a technician. The breaker is doing its job by cutting power to something that's overheating or shorted, and repeated resets can damage the compressor or start a fire." },
      { q: 'Can a dirty filter cause the AC breaker to trip?', a: "It can strain the indoor blower motor, which can trip the indoor unit's breaker. A dirty outdoor coil is the more common cause of the outdoor unit's breaker tripping, especially on hot afternoons." },
      { q: 'What size breaker does my AC need?', a: 'The outdoor unit\'s nameplate lists the minimum circuit ampacity and the maximum fuse or breaker size. The breaker must not exceed that maximum. If you think the breaker is the wrong size, have an electrician check it against the nameplate and the wiring.' },
    ],
    related: ['ac-outdoor-unit-not-running', 'ac-not-turning-on', 'ac-not-working-after-power-outage'],
  },
  {
    slug: 'ac-high-humidity',
    published: '2026-10-17',
    updated: '2026-10-17',
    name: 'House humid with the AC on',
    title: 'AC Not Removing Humidity? Why the House Feels Clammy',
    h1: 'House Humid With the AC On? Why It Feels Clammy and How to Fix It',
    description: "The temperature is fine but the house feels damp and sticky? Why an air conditioner stops removing humidity, the free fixes to try first, and when a dehumidifier makes sense.",
    group: 'cycling',
    summary: 'The temperature is fine, but the air feels damp, sticky or cold and clammy.',
    quick: [
      'The thermostat fan set to On, which blows the moisture on the coil back into the house',
      'An oversized system that shuts off before it removes much moisture',
      'A clogged filter or a dirty indoor coil',
      'The blower set to a high speed that suits dry climates',
      'Leaky return ducts pulling in humid air from an attic, crawlspace or outdoors',
      'Low refrigerant',
      'Moisture from inside: showers, cooking, laundry, a damp crawlspace or basement',
    ],
    firstChecks: [
      'Measure it: a digital hygrometer costs about $10–$20. The EPA recommends keeping indoor humidity below 60%, ideally 30–50%.',
      'Thermostat fan on Auto, not On.',
      "Air filter: replace it if it's dirty.",
      'Run bathroom and kitchen exhaust fans, and look for damp in a crawlspace or basement.',
    ],
    causes: [
      { cause: 'Fan set to On', signs: 'Humidity rises soon after the compressor stops; fan never stops', who: 'DIY', cost: '$0' },
      { cause: 'Oversized system', signs: 'Short runs, cool but clammy, has done it since installation', who: 'Pro', cost: '$0 now; size correctly when you replace it', see: 'ac-short-cycling' },
      { cause: 'Clogged filter or dirty indoor coil', signs: 'Weak airflow, filter gray, musty smell', who: 'DIY or pro', cost: `${COST.filter} filter, ${COST.coilDuctCleaning} coil cleaning` },
      { cause: 'Blower speed set too high', signs: 'Strong airflow, cool air, but humidity stays high; common when installers use one setting everywhere', who: 'Pro', cost: `${COST.serviceCall} service call to adjust` },
      { cause: 'Leaky return ducts', signs: 'Ducts in an attic or crawlspace; humidity high even with long run times', who: 'Pro', cost: `${COST.ductSealing} duct sealing` },
      { cause: 'Low refrigerant (a leak)', signs: 'Cooling weaker than it used to be, ice on the lines', who: 'Pro', cost: `${COST.refrigerant} to find, fix and recharge` },
      { cause: 'Moisture sources indoors', signs: 'Worst after showers or cooking; damp crawlspace or basement; condensation on windows', who: 'DIY or pro', cost: '$0 (exhaust fans) and up' },
      { cause: 'A climate that needs more dehumidification', signs: 'Mild, humid days when the AC barely needs to run', who: 'Pro', cost: `${COST.dehumidifier} installed whole-house dehumidifier` },
    ],
    steps: [
      { title: 'Measure for a day', text: 'Put a hygrometer in a couple of rooms and check it morning, afternoon and night. You want a number to compare after each fix, not a feeling.' },
      { title: 'Set the fan to Auto and wait', text: 'With the fan on Auto, water that collects on the coil drains away instead of being blown back into the house. Give it two days before judging.' },
      { title: 'Replace the filter', text: 'A clogged filter reduces airflow and lets the coil get dirty, and a dirty coil removes less moisture.' },
      { title: 'Use the dehumidify settings you have', text: 'Many thermostats have a dehumidify or "overcool" setting, and many ductless mini-splits have a Dry mode. Check your manuals; these settings run the system in a way that removes more moisture.' },
      { title: 'Cut the moisture coming in', text: 'Run the bathroom fan during and after showers and the range hood while cooking. Vent the dryer outside. A damp crawlspace or basement often needs a vapor barrier or its own dehumidifier.' },
      { title: 'Ask the technician the right questions', text: 'If humidity stays above 60%, ask about the refrigerant charge, the blower speed, return duct leaks, and whether the system is oversized. A whole-house dehumidifier comes after those, not before.' },
    ],
    callPro: [
      'Humidity stays above 60% with the fan on Auto and a clean filter',
      'Condensation on vents or windows, or mold growing indoors',
      'The system short cycles',
      'Ice on the lines or the coil',
    ],
    quoteFlags: [
      'A bigger air conditioner to fix humidity: oversizing makes it worse',
      'A whole-house dehumidifier sold before anyone checks the fan setting, blower speed, refrigerant charge and duct leaks',
      "Duct cleaning sold as a humidity fix: it doesn't change how much moisture the system removes",
    ],
    faqs: [
      { q: 'Why is my house humid when the AC is running?', a: 'The most common reasons are the fan set to On (which re-evaporates water from the coil), a system that is too big and shuts off before removing much moisture, a dirty filter or coil, and humid air leaking in through return ducts. Indoor moisture from showers, cooking or a damp crawlspace adds to it.' },
      { q: 'What humidity should my house be with the AC on?', a: 'The EPA recommends keeping indoor relative humidity below 60%, ideally between 30% and 50%. Above 60% for long periods, mold and dust mites thrive and the house feels clammy even at a cool temperature.' },
      { q: 'Does running the AC fan on On increase humidity?', a: 'It can, by a lot. When the compressor stops, the fan keeps blowing across the wet coil and puts that moisture back into the house. In one test by building scientist Allison Bailes in his own home, switching the fan from Auto to On raised indoor humidity from about 58% to about 70%.' },
      { q: 'Do I need a dehumidifier if I have air conditioning?', a: "Often not. Air conditioners remove moisture as they cool, and fixing the fan setting, airflow and duct leaks usually brings humidity down. A dehumidifier makes sense in very humid climates, in homes with an oversized system you're not ready to replace, or for a damp basement. Whole-house units typically cost about $2,800–$3,300 installed." },
    ],
    related: ['ac-short-cycling', 'ac-smells', 'ac-running-constantly'],
  },
  {
    slug: 'mini-split-error-codes',
    published: '2026-10-17',
    updated: '2026-10-17',
    name: 'Mini-split error code or blinking light',
    title: 'Mini-Split Error Code or Blinking Light? What to Do',
    h1: 'Mini-Split Error Code or Blinking Light? What It Means and What to Do',
    description: "Ductless mini-split showing an error code or flashing a light? How to read it, how to reset the unit safely, what the main kinds of codes mean, and when it needs a technician.",
    group: 'mini-split',
    summary: 'The indoor unit shows a code or flashes a light, and the system stops or won\'t cool.',
    quick: [
      'A power glitch or surge that left the control board locked out (a reset often clears it)',
      'Dirty filters or a blocked outdoor unit, so the system shuts down to protect itself',
      'A communication error between the indoor and outdoor units (wiring, a surge or a board)',
      'A failed temperature sensor (thermistor)',
      'A drain or condensate pump problem on units with a float switch',
      'Low refrigerant',
      "A fault in the outdoor unit's inverter board or compressor",
    ],
    firstChecks: [
      'Write the code down exactly, or count the blinks: how many, which light (often Operation or Timer), and whether the pattern repeats. A short phone video helps.',
      "Find your exact model numbers on the labels of the indoor and outdoor units. Codes differ between brands and even between a brand's own product lines.",
      "Look it up in the owner's or installation manual for that model (most are on the manufacturer's website). Some units also have a code list on a label inside the front panel or the outdoor unit's service cover.",
      'Check the filters behind the front panel, and make sure nothing blocks the outdoor unit.',
    ],
    causes: [
      { cause: 'Power glitch or lockout', signs: 'Code appeared after an outage, storm or flicker', who: 'DIY', cost: '$0 (reset)' },
      { cause: 'Dirty filters or blocked outdoor unit', signs: 'Protection codes for high temperature or pressure, or freeze protection; dusty mesh filters', who: 'DIY or pro', cost: `$0 to clean filters, ${COST.condenserClean} pro cleaning` },
      { cause: 'Communication error', signs: 'Indoor and outdoor units can\'t talk to each other. Common examples: U4 on many Daikin units, E6 on many Mitsubishi units', who: 'Pro', cost: `${COST.serviceCall} service call plus wiring or a board` },
      { cause: 'Failed temperature sensor', signs: 'Sensor or thermistor code; unit stops or runs oddly', who: 'Pro', cost: `${COST.serviceCall} service call plus the sensor` },
      { cause: 'Drain or condensate pump problem', signs: 'Water dripping from the indoor unit; float or drain code', who: 'DIY or pro', cost: `${COST.drainClear} drain clearing, ${COST.condensatePump} pump`, see: 'ac-leaking-water' },
      { cause: 'Low refrigerant (a leak)', signs: 'Weak cooling, ice on the lines, low-pressure or refrigerant code', who: 'Pro', cost: `${COST.refrigerant} to find, fix and recharge` },
      { cause: 'Inverter board or compressor fault', signs: 'Outdoor unit code that returns after every reset', who: 'Pro', cost: `${COST.serviceCall} plus the board (often several hundred dollars); ${COST.compressor} for a compressor` },
    ],
    steps: [
      { title: 'Record the code', text: 'Note the code or blink pattern, the time, the mode (cool, heat, dry) and what the unit was doing. Take a photo or short video.' },
      { title: 'Look it up for your exact model', text: "Use the model numbers from the unit's labels to find the manual. Generic online lists often conflict, because the same code can mean different things on different product lines." },
      { title: 'Reset once', text: 'Turn the unit off with the remote, switch off its breaker or outdoor disconnect, wait about 5 minutes, then restore power and restart with the remote. If the code comes straight back, stop resetting it.' },
      { title: 'Clean the filters and clear the outdoor unit', text: "Lift the front panel, slide out the mesh filters and rinse them in lukewarm water. Let them dry fully before refitting. Outside, clear leaves, snow or plants away from the unit." },
      { title: 'Rule out the normal blinks', text: "In heating mode, many mini-splits blink a light while the outdoor unit defrosts, and stop after several minutes. Some also blink while they warm up. Check the remote's batteries and mode too." },
      { title: 'Call with the details', text: 'Give the technician the brand, both model numbers, the exact code, when it started and what you have tried. They can often tell which part to bring.' },
    ],
    safetyNote: "Don't open the outdoor unit's covers. Mini-split outdoor units contain inverter boards with capacitors that stay charged at high voltage for several minutes after the power is off.",
    callPro: [
      'The code comes back after one reset',
      'A communication, sensor, inverter or compressor code',
      'Water dripping from the indoor unit',
      'Ice on the copper lines',
    ],
    quoteFlags: [
      'A new system quoted for a communication error before the connecting wiring and terminals are checked',
      'A board replaced without explaining what the code and the test readings showed',
      'A refrigerant recharge with no leak search',
    ],
    faqs: [
      { q: 'What does a blinking light on my mini-split mean?', a: "Usually that the unit has detected a fault and stopped. The number of blinks, and which light blinks, is a code you can look up in the manual for your exact model. In heating mode, a blinking light can also just mean the unit is defrosting, which is normal and stops after several minutes." },
      { q: 'How do I reset a mini-split error code?', a: "Turn the unit off with the remote, switch off its breaker or outdoor disconnect for about 5 minutes, then turn the power back on and restart it with the remote. If the code returns, don't keep resetting: the fault is still there." },
      { q: 'What is a communication error on a mini-split?', a: "It means the indoor and outdoor units can't exchange signals. Causes include loose or corroded connecting wires, a surge that damaged a board, or a failed board. On many Daikin units it shows as U4, and on many Mitsubishi units as E6, but check your manual: codes vary by model." },
      { q: 'Can I trust mini-split error code lists online?', a: "Use them as a starting point only. Codes differ between brands and between product lines from the same brand, and generic lists often disagree. The manual for your exact model number, or the manufacturer's support line, is the reliable source." },
    ],
    related: ['ac-not-working-after-power-outage', 'ac-leaking-water', 'ac-frozen-coil'],
  },
];

export function getSymptom(slug: string | undefined) {
  return SYMPTOMS.find((s) => s.slug === slug);
}
