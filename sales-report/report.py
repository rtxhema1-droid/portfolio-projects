"""Summarise a sales CSV: totals per product and per day.

Usage: python3 report.py sales.csv [--out report.md]
CSV columns: date, product, quantity, unit_price
"""
import argparse
import csv
import sys
from collections import defaultdict


def read_rows(path):
    rows = []
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        missing = {"date", "product", "quantity", "unit_price"} - set(reader.fieldnames or [])
        if missing:
            sys.exit("Missing columns: " + ", ".join(sorted(missing)))
        for n, row in enumerate(reader, start=2):
            try:
                rows.append({
                    "date": row["date"].strip(),
                    "product": row["product"].strip(),
                    "quantity": int(row["quantity"]),
                    "unit_price": float(row["unit_price"]),
                })
            except ValueError:
                print(f"Skipping line {n}: bad number", file=sys.stderr)
    return rows


def summarise(rows):
    by_product = defaultdict(lambda: [0, 0.0])
    by_day = defaultdict(float)
    for r in rows:
        revenue = r["quantity"] * r["unit_price"]
        by_product[r["product"]][0] += r["quantity"]
        by_product[r["product"]][1] += revenue
        by_day[r["date"]] += revenue
    return by_product, by_day


def to_markdown(by_product, by_day):
    total = sum(v[1] for v in by_product.values())
    lines = ["# Sales report", "", f"Total revenue: {total:,.0f}", "",
             "## By product", "", "| Product | Units | Revenue |", "|---|---|---|"]
    for name, (units, rev) in sorted(by_product.items(), key=lambda x: -x[1][1]):
        lines.append(f"| {name} | {units} | {rev:,.0f} |")
    lines += ["", "## By day", "", "| Date | Revenue |", "|---|---|"]
    for day in sorted(by_day):
        lines.append(f"| {day} | {by_day[day]:,.0f} |")
    return "\n".join(lines) + "\n"


def main():
    p = argparse.ArgumentParser()
    p.add_argument("csv_file")
    p.add_argument("--out", help="write the report to this file instead of printing")
    args = p.parse_args()
    text = to_markdown(*summarise(read_rows(args.csv_file)))
    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(text)
    else:
        print(text)


if __name__ == "__main__":
    main()
