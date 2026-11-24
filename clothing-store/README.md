# Clothing Store Template (Arabic, RTL)

A small storefront demo for a clothing shop: product grid with drawn garment images that change color, size and color pickers, category filter, a stock-aware cart, a cash-on-delivery order form, and an admin page for products and orders.

متجر ملابس تجريبي بالعربي: عرض المنتجات بالمقاسات والألوان، سلة، طلب بالدفع عند الاستلام، وصفحة إدارة للمنتجات والطلبات.

## Run it
No build step. Open `index.html` in a browser, or run `python3 -m http.server` in this folder.

## What it does
- Product grid, category filter, color swatches and size chips, "sold out" and "last N" badges
- Cart with quantity controls (cannot go above stock) and a running total
- Order form with Egyptian mobile number validation, orders numbered from 1001, stock is reduced on each order
- `admin.html`: add, delete and re-price products, edit stock, see orders with details, change order status, reset demo data

## Demo limits (read this)
Products and orders are stored in the browser's `localStorage`. There is no server, no login, and nothing is sent to anyone. Product data and the garment drawings are made up. Use it as a base, not as a production shop.

## What a real client store would add
Server and database for orders, admin login, product photo upload, shipping-company integration, optional card payment.

## Files
- `index.html`, `app.js`: storefront
- `admin.html`: admin page
- `products.js`: demo data, garment drawings, storage helpers
- `style.css`: styles
