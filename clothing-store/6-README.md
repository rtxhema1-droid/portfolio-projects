# Clothing Store Template (Arabic, RTL)

A small storefront for a clothing shop: product grid with sizes and colors, cart, a cash-on-delivery order form, and a simple admin page to manage products and see orders.

متجر ملابس بسيط بالعربي: عرض المنتجات بالمقاسات والألوان، سلة، طلب بالدفع عند الاستلام، وصفحة إدارة للمنتجات والطلبات.

## Run it
No build step. Open `index.html` in a browser, or run `python3 -m http.server` in this folder.

## What it does
- Product grid with size and color pickers, stock-aware "add to cart"
- Cart with quantity controls and a running total
- Order form with Egyptian mobile number validation, orders numbered from 1001
- `admin.html`: add, delete and re-price products, edit stock, list orders

## How it works
Plain HTML, CSS and JavaScript. Products and orders are stored in the browser's `localStorage`, so this is a demo, not a production shop. There is no login and no server.

## Next steps for a real client store
Server and database for orders, admin login, product image upload, shipping-company integration, optional card payment.

## Files
- `index.html`, `app.js`: storefront
- `admin.html`: admin page
- `products.js`: demo data and storage helpers
- `style.css`: styles

The product data is made up for the demo.
