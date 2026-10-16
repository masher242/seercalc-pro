#!/usr/bin/env python3
"""Refresh src/data/euCoolingDegreeDays.json (climate input for the Europe AC-cost map).

Source: Eurostat dataset nrg_chdd_a, cooling degree days (CDD) by country, yearly.
Stores each country's average over its latest 10 published years (one hot or cool
summer shouldn't swing the map), plus the newest single year for reference.

    python3 scripts/update-eu-cooling.py
    python3 scripts/update-eu-cooling.py --from-file response.json
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import urllib.parse
import urllib.request
from pathlib import Path

API = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_chdd_a"
PARAMS = {"freq": "A", "unit": "NR", "indic_nrg": "CDD"}
EU27 = {
    "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "EL", "HU", "IE",
    "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
}
EXTRA = {"UK"}  # kept if Eurostat still has it
TO_ISO2 = {"EL": "GR", "UK": "GB"}
YEARS = 10
OUT = Path(__file__).resolve().parent.parent / "src" / "data" / "euCoolingDegreeDays.json"


def decode(dataset: dict) -> list[dict]:
    """Turn JSON-stat's flattened value indexes into labelled rows."""
    dims, sizes = dataset["id"], dataset["size"]
    codes = []
    for dim in dims:
        idx = dataset["dimension"][dim]["category"]["index"]
        codes.append([c for c, _ in sorted(idx.items(), key=lambda kv: kv[1])])
    rows = []
    for flat, value in dataset.get("value", {}).items():
        rest, pos = int(flat), []
        for size in reversed(sizes):
            pos.append(rest % size)
            rest //= size
        pos.reverse()
        row = {"value": value}
        for dim, cs, p in zip(dims, codes, pos):
            row[dim] = cs[p]
        rows.append(row)
    return rows


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--from-file", type=Path)
    args = ap.parse_args()
    if args.from_file:
        dataset = json.loads(args.from_file.read_text(encoding="utf-8"))
    else:
        url = f"{API}?{urllib.parse.urlencode(PARAMS)}"
        req = urllib.request.Request(url, headers={"User-Agent": "airconditionanswers-rate-refresh/1.0"})
        with urllib.request.urlopen(req, timeout=60) as resp:
            dataset = json.load(resp)

    by_geo: dict[str, dict[int, float]] = {}
    for r in decode(dataset):
        if r["geo"] in EU27 | EXTRA and r["value"] is not None:
            by_geo.setdefault(r["geo"], {})[int(r["time"])] = float(r["value"])
    missing = sorted(EU27 - by_geo.keys())
    if missing:
        raise SystemExit(f"No cooling degree days for {', '.join(missing)}; nothing changed.")

    countries = {}
    for geo, years in sorted(by_geo.items()):
        recent = sorted(years)[-YEARS:]
        countries[TO_ISO2.get(geo, geo)] = {
            "cdd": round(sum(years[y] for y in recent) / len(recent), 1),
            "from": recent[0],
            "to": recent[-1],
            "latest": round(years[recent[-1]], 1),
        }
    out = {
        "_readme": "Cooling degree days (Eurostat nrg_chdd_a) per country: cdd = average of the latest 10 published years (from-to); latest = the newest single year. Used to estimate typical AC hours on the Europe map. Refresh with scripts/update-eu-cooling.py.",
        "source": "Eurostat, Cooling and heating degree days by country - annual data (nrg_chdd_a)",
        "sourceUrl": "https://ec.europa.eu/eurostat/databrowser/view/nrg_chdd_a/default/table?lang=en",
        "updated": dt.date.today().isoformat(),
        "countries": countries,
    }
    OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    spans = {f"{c['from']}-{c['to']}" for c in countries.values()}
    print(f"Cooling degree days for {len(countries)} countries ({', '.join(sorted(spans))})")


if __name__ == "__main__":
    main()
