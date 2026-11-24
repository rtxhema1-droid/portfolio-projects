// Demo data and helpers shared by the storefront and the admin page.
// Everything is saved in localStorage, so it only exists in this browser.

const COLOR_MAP = {
  "أبيض": "#f1efe9", "أسود": "#232326", "رمادي": "#8a8f98", "كحلي": "#1f2f57",
  "أزرق": "#35508a", "سماوي": "#9cc3e6", "زيتي": "#55603f", "بيج": "#cdb999", "أحمر": "#a8322d"
};
const FALLBACK_COLOR = "#9a9a9a";

const DEFAULT_PRODUCTS = [
  { id: 1, name: "تيشيرت قطن", type: "tshirt", price: 250, sizes: ["S","M","L","XL"], colors: ["أبيض","أسود","بيج"], stock: 20 },
  { id: 2, name: "هودي بقلنسوة", type: "hoodie", price: 650, sizes: ["M","L","XL"], colors: ["رمادي","كحلي"], stock: 12 },
  { id: 3, name: "بنطلون جينز", type: "jeans", price: 720, sizes: ["30","32","34","36"], colors: ["أزرق","أسود"], stock: 15 },
  { id: 4, name: "قميص كاجوال", type: "shirt", price: 480, sizes: ["S","M","L"], colors: ["سماوي","أبيض"], stock: 9 },
  { id: 5, name: "جاكيت خفيف", type: "jacket", price: 950, sizes: ["M","L","XL"], colors: ["زيتي","أسود"], stock: 6 },
  { id: 6, name: "شورت رياضي", type: "shorts", price: 220, sizes: ["S","M","L"], colors: ["أسود","رمادي"], stock: 0 }
];

const TYPE_LABELS = { tshirt: "تيشيرتات", hoodie: "هوديز", jeans: "بناطيل", shirt: "قمصان", jacket: "جواكت", shorts: "شورتات" };

// Simple flat garment drawings, filled with the chosen colour.
const SHAPES = {
  tshirt: '<path d="M62 28 L86 20 Q100 38 114 20 L138 28 L172 62 L150 84 L138 72 L138 172 L62 172 L62 72 L50 84 L28 62 Z"/>',
  shirt: '<path d="M62 28 L86 20 L100 44 L114 20 L138 28 L172 62 L150 84 L138 72 L138 172 L62 172 L62 72 L50 84 L28 62 Z"/><path class="line" d="M100 44 V172 M92 70h1M92 100h1M92 130h1"/>',
  hoodie: '<path d="M60 40 L84 28 Q100 50 116 28 L140 40 L180 120 L156 132 L140 96 L140 176 L60 176 L60 96 L44 132 L20 120 Z"/><path class="line" d="M84 28 Q100 70 116 28 M78 140 H122 V162 H78 Z M96 60 V86 M104 60 V86"/>',
  jacket: '<path d="M60 30 L86 20 L100 34 L114 20 L140 30 L180 118 L156 130 L140 94 L140 176 L60 176 L60 94 L44 130 L20 118 Z"/><path class="line" d="M100 34 V176 M72 130 H88 M112 130 H128"/>',
  jeans: '<path d="M64 24 H136 L146 178 H108 L100 84 L92 178 H54 Z"/><path class="line" d="M64 44 H136 M100 44 V84"/>',
  shorts: '<path d="M62 44 H138 L148 132 H108 L100 86 L92 132 H52 Z"/><path class="line" d="M62 60 H138"/>'
};

function garmentSVG(type, hex) {
  const dark = /^#(?:[0-3])/.test(hex);
  const stroke = dark ? "#ffffff55" : "#00000033";
  return `<svg viewBox="0 0 200 200" role="img" aria-hidden="true">
    <g fill="${hex}" stroke="${stroke}" stroke-width="2" stroke-linejoin="round">${SHAPES[type] || SHAPES.tshirt}</g>
    <style>.line{fill:none;stroke:${stroke};stroke-width:2;stroke-linecap:round}</style></svg>`;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function colorHex(name) { return COLOR_MAP[name] || FALLBACK_COLOR; }

function readJSON(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } }
function loadProducts() { return readJSON("cs_products") || DEFAULT_PRODUCTS.map((p) => ({ ...p })); }
function saveProducts(list) { localStorage.setItem("cs_products", JSON.stringify(list)); }
function loadOrders() { return readJSON("cs_orders") || []; }
function saveOrders(list) { localStorage.setItem("cs_orders", JSON.stringify(list)); }
function resetDemo() { localStorage.removeItem("cs_products"); localStorage.removeItem("cs_orders"); }
