# Orders and Stock Dashboard (Arabic, RTL)

A one-page dashboard for a small shop. Load an orders CSV and a stock CSV and see revenue, units sold, open orders, daily revenue, top products, and which items are below their minimum stock.

لوحة بسيطة لصاحب محل صغير: ارفع ملف الطلبات وملف المخزون وشوف الإيراد، القطع المباعة، الطلبات المفتوحة، الإيراد اليومي، أكثر المنتجات مبيعًا، والمنتجات الناقصة.

## Run it
No build step. Open `index.html` in a browser. Sample data loads by default.

## CSV format
- Orders: `date,product,quantity,unit_price,status` (cancelled orders use the status `ملغي` and are left out of revenue)
- Stock: `product,stock,min_stock`

Files are read in the browser and never uploaded anywhere. Plain HTML, CSS and JavaScript, with a small CSV parser that handles quoted fields. Sample data in `data.js` is made up.

## Limits
It shows a snapshot of the files you load. It does not store data, sync with a shop system, or have users.
