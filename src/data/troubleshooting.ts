// AC troubleshooting pages: one entry per symptom. The hub (/troubleshooting) and every
// symptom page (/troubleshooting/{slug}) render from this file. Repair costs match the
// ranges in the repair-cost articles (/blog/ac-repair-cost-2026, /blog/ac-repair-cost-vs-replacement);
// update both together.

export const TROUBLESHOOTING_UPDATED = '2026-10-14';

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
  /** optional closing section, e.g. prevention */
  extra?: { heading: string; paragraphs: string[]; link?: { to: string; label: string } };
}

export type GroupId = 'not-cooling' | 'wont-run' | 'water-ice';

export const GROUPS: { id: GroupId; name: string; blurb: string }[] = [
  { id: 'not-cooling', name: 'Not cooling', blurb: 'It runs, but the air isn\'t cold or the house won\'t cool down.' },
  { id: 'wont-run', name: 'Won\'t run', blurb: 'Nothing happens, or part of the system stays off.' },
  { id: 'water-ice', name: 'Water and ice', blurb: 'Leaks, a full drain pan, or ice on the coil or lines.' },
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
      { cause: 'Tripped breaker', signs: 'Breaker in the middle or off position', who: 'DIY', cost: '$0 to reset once; service call if it trips again' },
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
      { cause: 'Tripped breaker', signs: 'Completely silent, breaker tripped', who: 'DIY', cost: '$0 to reset once; service call if it trips again' },
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
      { cause: 'Tripped breaker', signs: 'Breaker in the middle position', who: 'DIY or pro', cost: '$0 to reset; service call if it trips again' },
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
];

export function getSymptom(slug: string | undefined) {
  return SYMPTOMS.find((s) => s.slug === slug);
}
