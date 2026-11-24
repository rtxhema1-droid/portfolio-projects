// Demo catalogue. The admin page saves changes to localStorage under "cs_products".
const DEFAULT_PRODUCTS = [
  { id: 1, name: "تيشيرت قطن أبيض", price: 250, sizes: ["S","M","L","XL"], colors: ["أبيض","أسود"], color: "#e8e8e8", stock: 20 },
  { id: 2, name: "هودي رمادي", price: 650, sizes: ["M","L","XL"], colors: ["رمادي","كحلي"], color: "#8a8f98", stock: 12 },
  { id: 3, name: "بنطلون جينز", price: 720, sizes: ["30","32","34","36"], colors: ["أزرق"], color: "#35508a", stock: 15 },
  { id: 4, name: "قميص كاجوال", price: 480, sizes: ["S","M","L"], colors: ["أبيض","سماوي"], color: "#a9c7e8", stock: 9 },
  { id: 5, name: "جاكيت خفيف", price: 950, sizes: ["M","L","XL"], colors: ["أسود","زيتي"], color: "#3b4a3a", stock: 6 },
  { id: 6, name: "شورت رياضي", price: 220, sizes: ["S","M","L"], colors: ["أسود"], color: "#222", stock: 25 }
];
function loadProducts() {
  try { return JSON.parse(localStorage.getItem("cs_products")) || DEFAULT_PRODUCTS; }
  catch (e) { return DEFAULT_PRODUCTS; }
}
function saveProducts(list) { localStorage.setItem("cs_products", JSON.stringify(list)); }
function loadOrders() {
  try { return JSON.parse(localStorage.getItem("cs_orders")) || []; } catch (e) { return []; }
}
