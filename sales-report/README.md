# Sales Report Script

A small command-line tool that reads a sales CSV and prints a Markdown summary: total revenue, revenue and units per product, revenue per day.

أداة سطر أوامر بسيطة بتقرأ ملف مبيعات CSV وتطلع ملخص: الإجمالي، المبيعات لكل منتج، والمبيعات لكل يوم.

## Use
    python3 report.py sales.csv
    python3 report.py sales.csv --out report.md

Needs Python 3.8+, no packages. CSV columns: `date, product, quantity, unit_price`. Rows with bad numbers are skipped with a warning on stderr. `sales.csv` is made-up sample data.

## Example output
See `example-report.md`.
