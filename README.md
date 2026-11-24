# Portfolio Projects

Small, working demo projects. Each folder has its own README with setup steps. All data in them is made up.

| Project | What it is | Run it |
|---|---|---|
| [clothing-store](clothing-store) | Arabic (RTL) clothing store demo: products with size/color pickers, cart, cash-on-delivery order form, admin page for products and orders | Open `clothing-store/index.html` |
| [shop-dashboard](shop-dashboard) | One-page orders and stock dashboard. Load an orders CSV and a stock CSV, see revenue, top products and low stock | Open `shop-dashboard/index.html` |
| [sales-report](sales-report) | Python script that turns a sales CSV into a Markdown report | `python3 sales-report/report.py sales-report/sales.csv` |
| [juice-shop](juice-shop) | Arabic (RTL) juice shop page with a 3D glass of juice (Three.js) and orbiting fruit. Pick a juice and the liquid, fruit and page theme change. Menu, sizes and a demo order list | `cd juice-shop && python3 -m http.server 8000`, then open http://localhost:8000 |

## Honest limits
- The three web projects are plain HTML, CSS and JavaScript with no backend. The store keeps its data in the browser's localStorage, so it is a demo, not a production shop.
- The juice shop needs a local web server (ES modules) and uses simple 3D shapes for fruit, not photo-real models. Its order form sends nothing anywhere.
- Product images in the store are simple drawings. Sample data is invented.
- No live deployment is linked here.

مشاريع صغيرة تجريبية بالعربي والإنجليزي. كل مجلد فيه README خاص بيه، وكل البيانات مثال مش حقيقية.
