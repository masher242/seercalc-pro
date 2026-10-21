#!/usr/bin/env python3
"""Data-refresh calendar for AirConditionAnswers.com (data/refresh-calendar.json).

    python3 scripts/check-refresh-calendar.py                 # list items due in the next 7 days or overdue
    python3 scripts/check-refresh-calendar.py --all           # whole calendar, soonest first
    python3 scripts/check-refresh-calendar.py --days 14       # look further ahead
    python3 scripts/check-refresh-calendar.py --markdown      # issue body (used by the weekly workflow)
    python3 scripts/check-refresh-calendar.py --done uk-ofgem # stamp lastChecked=today, move nextDue on by the cadence
    python3 scripts/check-refresh-calendar.py --done uk-ofgem --next 2027-02-27

Exit code is 0 either way; with --github-output it writes `count=N` to $GITHUB_OUTPUT.
"""
from __future__ import annotations

import argparse
import calendar
import datetime as dt
import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CAL = ROOT / "data" / "refresh-calendar.json"
MONTHS = {"monthly": 1, "quarterly": 3, "semiannual": 6, "yearly": 12}


def add_months(d: dt.date, n: int) -> dt.date:
    y, m = divmod(d.month - 1 + n, 12)
    year, month = d.year + y, m + 1
    return dt.date(year, month, min(d.day, calendar.monthrange(year, month)[1]))


def load() -> dict:
    return json.loads(CAL.read_text(encoding="utf-8"))


def save(data: dict) -> None:
    CAL.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def due(items: list[dict], today: dt.date, days: int) -> list[dict]:
    horizon = today + dt.timedelta(days=days)
    return sorted((i for i in items if dt.date.fromisoformat(i["nextDue"]) <= horizon), key=lambda i: i["nextDue"])


def markdown(rows: list[dict], today: dt.date) -> str:
    if not rows:
        return "Nothing is due this week."
    out = [
        f"Data sources due for a check as of {today.isoformat()} (overdue first). "
        "After refreshing an item, or confirming nothing changed, run "
        "`python3 scripts/check-refresh-calendar.py --done <id>` and commit, so it moves to its next date.",
        "",
        "| Due | Item | How | Files | Notes |",
        "|---|---|---|---|---|",
    ]
    for i in rows:
        d = dt.date.fromisoformat(i["nextDue"])
        when = f"**overdue** ({i['nextDue']})" if d < today else i["nextDue"]
        name = f"[{i['item']}]({i['sourceUrl']})" if i.get("sourceUrl") else i["item"]
        files = "<br>".join(f"`{f}`" for f in i.get("files", []))
        notes = (i.get("notes") or "").replace("|", "/")
        out.append(f"| {when} | {name} `{i['id']}` | {i['how']} | {files} | {notes} |")
    return "\n".join(out)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--days", type=int, default=7)
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--markdown", action="store_true")
    ap.add_argument("--done", metavar="ID")
    ap.add_argument("--next", metavar="YYYY-MM-DD")
    ap.add_argument("--today", metavar="YYYY-MM-DD", help="pretend today is this date (testing)")
    ap.add_argument("--github-output", action="store_true")
    args = ap.parse_args()

    today = dt.date.fromisoformat(args.today) if args.today else dt.date.today()
    data = load()
    items = data["items"]

    if args.done:
        item = next((i for i in items if i["id"] == args.done), None)
        if not item:
            raise SystemExit(f"No item with id {args.done!r}. Ids: {', '.join(i['id'] for i in items)}")
        item["lastChecked"] = today.isoformat()
        if args.next:
            nxt = dt.date.fromisoformat(args.next)
        else:
            nxt = add_months(dt.date.fromisoformat(item["nextDue"]), MONTHS[item["cadence"]])
            while nxt <= today:
                nxt = add_months(nxt, MONTHS[item["cadence"]])
        item["nextDue"] = nxt.isoformat()
        save(data)
        print(f"{item['id']}: checked {today}, next due {item['nextDue']}")
        return

    rows = sorted(items, key=lambda i: i["nextDue"]) if args.all else due(items, today, args.days)
    if args.markdown:
        print(markdown(rows, today))
    else:
        for i in rows:
            flag = "OVERDUE " if dt.date.fromisoformat(i["nextDue"]) < today else ""
            print(f"{flag}{i['nextDue']}  {i['id']:<16} {i['how']:<6} {i['item']}")
        if not rows:
            print("Nothing due.")
    if args.github_output and os.environ.get("GITHUB_OUTPUT"):
        with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as fh:
            fh.write(f"count={len(rows)}\n")


if __name__ == "__main__":
    main()
