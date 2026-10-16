#!/usr/bin/env python3
"""Refresh src/data/euHouseholdRates.json (the Europe price map) from Eurostat.

Source: dataset nrg_pc_204, households, band DC (2,500-4,999 kWh a year), all taxes
and levies included, EUR per kWh.

Each country gets its newest published half-year. When a country hasn't reported the
newest half-year yet (Latvia was missing from 2026-S1 in October 2026), it keeps its
previous figure and that country's own period is stored, so the map can flag it.
A country more than one year behind the newest half-year stops the update.

    python3 scripts/update-eu-rates.py                             # newest per country
    python3 scripts/update-eu-rates.py --period 2025-S2            # one half-year for all
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


def label(period: str) -> str:
    year, half = period_key(period)
    return f"{MONTHS[half]} {year}"


def period_key(period: str) -> tuple[int, int]:
    year, half = period.split("-S")
    return int(year), int(half)


def halves(period: str) -> int:
    """Half-years since year 0, so periods can be subtracted."""
    year, half = period_key(period)
    return year * 2 + half


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--period", help="use one half-year for every country, e.g. 2025-S2 (default: newest per country)")
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

    eu_rows = [r for r in rows if r["geo"] in EU27]
    if args.period:
        eu_rows = [r for r in eu_rows if r["time"] == args.period]
    newest: dict[str, dict] = {}
    for r in eu_rows:
        cur = newest.get(r["geo"])
        if cur is None or period_key(r["time"]) > period_key(cur["time"]):
            newest[r["geo"]] = r
    missing = sorted(EU27 - newest.keys())
    if missing:
        raise SystemExit(f"No figure at all for {', '.join(missing)}; nothing changed.")
    period = max((r["time"] for r in newest.values()), key=period_key)
    stale = [g for g, r in newest.items() if halves(period) - halves(r["time"]) > 2]
    if stale:
        raise SystemExit(f"{', '.join(sorted(stale))} more than a year behind {period}; nothing changed.")
    eu = newest
    behind = sorted(g for g, r in newest.items() if r["time"] != period)

    aggregate = sorted((r for r in rows if r["geo"] == EU_AGGREGATE), key=lambda r: period_key(r["time"]))
    avg_row = next((r for r in aggregate if r["time"] == period), aggregate[-1] if aggregate else None)

    old = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    countries = {
        TO_ISO2.get(g, g): {
            "name": r["geo_label"],
            "price": round(float(r["value"]), 4),
            **({"period": r["time"], "periodLabel": label(r["time"])} if r["time"] != period else {}),
        }
        for g, r in sorted(eu.items(), key=lambda kv: kv[1]["geo_label"])
    }
    if old.get("period") == period and old.get("countries") == countries:
        print(f"Already up to date ({period}).")
        return

    new = dict(old)
    new.update({
        "period": period,
        "periodLabel": label(period),
        "updated": dt.date.today().isoformat(),
        "countries": countries,
    })
    if avg_row is not None:
        new["euAverage"] = round(float(avg_row["value"]), 4)
        new["euAveragePeriod"] = avg_row["time"]
    else:
        print("Note: no EU-27 average in the response; euAverage left as it was.")
    OUT.write_text(json.dumps(new, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    names = ", ".join(f"{eu[g]['geo_label']} ({eu[g]['time']})" for g in behind)
    print(f"EU household prices {period}" + (f", older figure for {names}" if behind else ", all 27 countries"))


if __name__ == "__main__":
    main()
