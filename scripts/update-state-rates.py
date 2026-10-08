"""Update src/data/stateRates.json from EIA Electric Power Monthly Table 5.6.A.

Download https://www.eia.gov/electricity/monthly/xls/table_5_06_a.xlsx and run:
    python3 scripts/update-state-rates.py path/to/table_5_06_a.xlsx

Reads the most recent month's RESIDENTIAL average price (cents/kWh) for every state,
DC and the U.S. total, writes the JSON the cost pages use, and a CSV people can download.
"""
import csv
import json
import pathlib
import re
import sys

import openpyxl

ABBR = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'District of Columbia': 'DC',
    'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL',
    'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA',
    'Maine': 'ME', 'Maryland': 'MD', 'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN',
    'Mississippi': 'MS', 'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
    'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
    'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR',
    'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD',
    'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT', 'Virginia': 'VA',
    'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
}
MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December'


def norm(v):
    return re.sub(r'\s+', ' ', str(v)).strip() if v is not None else ''


def main(path):
    ws = openpyxl.load_workbook(path, data_only=True).active
    rows = [[norm(c) for c in r] for r in ws.iter_rows(values_only=True)]

    # The month the table covers appears in the title/header, e.g. "July 2026"
    as_of = None
    for r in rows[:8]:
        m = re.search(rf'({MONTHS}) (\d{{4}})', ' '.join(r))
        if m:
            as_of = f'{m.group(1)} {m.group(2)}'
            break

    # Residential current-month column: first numeric column after the state name in data rows.
    # Table layout: State | Residential (cur month) | Residential (same month last year) | Commercial ...
    rates = {}
    us = None
    for r in rows:
        if not r or not r[0]:
            continue
        name = r[0].rstrip(' *')
        nums = [c for c in r[1:] if re.fullmatch(r'-?\d+(\.\d+)?', c)]
        if not nums:
            continue
        if name in ABBR:
            rates[ABBR[name]] = round(float(nums[0]), 2)
        elif name.lower().startswith('u.s. total') or name.lower() == 'u.s. total':
            us = round(float(nums[0]), 2)

    missing = sorted(set(ABBR.values()) - set(rates))
    if missing or us is None or not as_of:
        sys.exit(f'Parse problem: missing={missing} us={us} as_of={as_of}')

    root = pathlib.Path(__file__).resolve().parents[1]
    json_path = root / 'src/data/stateRates.json'
    states_sorted = dict(sorted(rates.items()))
    if json_path.exists():
        prev = json.loads(json_path.read_text())
        if prev.get('asOf') == as_of and prev.get('us') == us and prev.get('states') == states_sorted:
            print(f'No change: already have {as_of} rates.')
            return

    today = __import__('datetime').date.today().isoformat()
    # Tell search engines the cost pages changed
    sitemap = root / 'public/sitemap.xml'
    if sitemap.exists():
        sm = sitemap.read_text()
        sm = re.sub(
            r'(<loc>https://airconditionanswers\.com(?:/ac-cost[^<]*|/blog/how-much-does-it-cost-to-run-ac)</loc>\s*<lastmod>)[^<]+',
            rf'\g<1>{today}', sm)
        sitemap.write_text(sm)

    out = {
        'asOf': as_of,
        'updated': today,
        'source': 'U.S. Energy Information Administration, Electric Power Monthly, Table 5.6.A (residential, cents/kWh)',
        'us': us,
        'states': states_sorted,
    }
    json_path.write_text(json.dumps(out, indent=2) + '\n')

    name_by_abbr = {v: k for k, v in ABBR.items()}
    with open(root / 'public/data/residential-electricity-rates-by-state.csv', 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(['state', 'abbr', f'residential_cents_per_kwh_{as_of.replace(" ", "_").lower()}', 'source'])
        for abbr, rate in sorted(rates.items(), key=lambda kv: name_by_abbr[kv[0]]):
            w.writerow([name_by_abbr[abbr], abbr, rate, 'EIA Electric Power Monthly Table 5.6.A'])
        w.writerow(['U.S. average', 'US', us, 'EIA Electric Power Monthly Table 5.6.A'])
    print(f'{as_of}: {len(rates)} states/DC, U.S. average {us} cents/kWh')


if __name__ == '__main__':
    main(sys.argv[1])
