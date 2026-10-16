#!/usr/bin/env python3
"""Refresh src/data/euHouseholdRates.json (the Europe price map) from Eurostat.

Source: dataset nrg_pc_204, households, band DC (2,500-4,999 kWh a year), all taxes
and levies included, EUR per kWh. With no --period, picks the newest half-year that
has a value for all 27 EU countries, so no country is left blank on the map.

    python3 scripts/update-eu-rates.py              # newest complete half-year
    python3 scripts/update-eu-rates.py --period 2025-S2
    python3 scripts/update-eu-rates.py --from-file response.json   # saved API response

Adapted from a script prepared with Manus (Oct 2026). Eurostat's API needs no key.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import urllib.parse
import urllib.request
from pathlib import Path

DATASET = "nrg_pc_204"
PARAMS = {
    "freq": "S",
    "siec": "E7000",
    "nrg_cons": "KWH2500-4999",  # band DC
    "unit": "KWH",
    "tax": "I_TAX",              # all taxes and levies included
    "currency": "EUR",
}
API = f"https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/{DATASET}"
EU27 = {
    "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "EL", "HU", "IE",
    "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
}
EU_AGGREGATE = "EU27_2020"
TO_ISO2 = {"EL": "GR"}  # Eurostat writes Greece as EL
OUT = Path(__file__).resolve().parent.parent / "src" / "data" / "euHouseholdRates.json"
MONTHS = {1: "January to June", 2: "July to December"}


def decode(dataset: dict) -> list[dict]:
    """Turn JSON-stat's flattened value indexes into labelled rows."""
    dims, sizes = dataset["id"], dataset["size"]
    codes, labels = [], []
    for dim in dims:
        cat = dataset["dimension"][dim]["category"]
        codes.append([c for c, _ in sorted(cat["index"].items(), key=lambda kv: kv[1])])
        labels.append(cat.get("label", {}))
    rows = []
    for flat, value in dataset.get("value", {}).items():
        rest, pos = int(flat), []
        for size in reversed(sizes):
            pos.append(rest % size)
            rest //= size
        pos.reverse()
        row = {"value": value}
        for dim, cs, ls, p in zip(dims, codes, labels, pos):
            row[dim] = cs[p]
            row[f"{dim}_label"] = ls.get(cs[p], cs[p])
        rows.append(row)
    return rows


def period_key(period: str) -> tuple[int, int]:
    year, half = period.split("-S")
    return int(year), int(half)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--period", help="half-year, e.g. 2025-S2 (default: newest complete for the EU-27)")
    ap.add_argument("--from-file", type=Path, help="read a saved API response instead of downloading")
    args = ap.parse_args()

    if args.from_file:
        dataset = json.loads(args.from_file.read_text(encoding="utf-8"))
    else:
        params = dict(PARAMS, **({"time": args.period} if args.period else {}))
        url = f"{API}?{urllib.parse.urlencode(params)}"
        req = urllib.request.Request(url, headers={"User-Agent": "airconditionanswers-rate-refresh/1.0"})
        with urllib.request.urlopen(req, timeout=60) as resp:
            dataset = json.load(resp)
    rows = decode(dataset)

    if args.period:
        period = args.period
    else:
        seen: dict[str, set[str]] = {}
        for r in rows:
            if r["geo"] in EU27:
                seen.setdefault(r["time"], set()).add(r["geo"])
        complete = [p for p, geos in seen.items() if geos == EU27]
        if not complete:
            raise SystemExit("No half-year has all 27 EU countries; nothing changed.")
        period = max(complete, key=period_key)

    picked = [r for r in rows if r["time"] == period]
    eu = {r["geo"]: r for r in picked if r["geo"] in EU27}
    missing = sorted(EU27 - eu.keys())
    if missing:
        raise SystemExit(f"{period} is missing {', '.join(missing)}; nothing changed.")
    avg = next((r["value"] for r in picked if r["geo"] == EU_AGGREGATE), None)

    old = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    countries = {
        TO_ISO2.get(g, g): {"name": r["geo_label"], "price": round(float(r["value"]), 4)}
        for g, r in sorted(eu.items(), key=lambda kv: kv[1]["geo_label"])
    }
    if old.get("period") == period and old.get("countries") == countries:
        print(f"Already up to date ({period}).")
        return

    year, half = period_key(period)
    new = dict(old)
    new.update({
        "period": period,
        "periodLabel": f"{MONTHS[half]} {year}",
        "updated": dt.date.today().isoformat(),
        "countries": countries,
    })
    if avg is not None:
        new["euAverage"] = round(float(avg), 4)
    else:
        print("Note: no EU-27 average in the response; euAverage left as it was.")
    OUT.write_text(json.dumps(new, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {OUT.name}: {period}, {len(countries)} countries.")


if __name__ == "__main__":
    main()
