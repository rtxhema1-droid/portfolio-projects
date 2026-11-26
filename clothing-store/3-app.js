const products = loadProducts();
let cart = [];
let filter = "all";
const picked = {}; // product id -> { size, color }
const $ = (id) => document.getElementById(id);

function choice(p) {
  if (!picked[p.id]) picked[p.id] = { size: p.sizes[0], color: p.colors[0] };
  return picked[p.id];
}

function renderFilters() {
  const types = [...new Set(products.map((p) => p.type))];
  const items = [["all", "الكل"], ...types.map((t) => [t, TYPE_LABELS[t] || t])];
  $("filters").innerHTML = items.map(([k, label]) =>
    `<button class="chip ${k === filter ? "active" : ""}" data-filter="${esc(k)}">${esc(label)}</button>`).join("");
}

function renderGrid() {
  const list = products.filter((p) => filter === "all" || p.type === filter);
  $("grid").innerHTML = list.map((p) => {
    const c = choice(p);
    return `<div class="card">
      <div class="art">${garmentSVG(p.type, colorHex(c.color))}${p.stock <= 0 ? '<span class="badge out">نفدت الكمية</span>' : p.stock <= 5 ? '<span class="badge low">آخر ' + p.stock + '</span>' : ""}</div>
      <div class="name">${esc(p.name)}</div>
      <div class="price">${p.price} ج.م</div>
      <div class="swatches">${p.colors.map((col) => `<button class="sw ${col === c.color ? "sel" : ""}" style="background:${colorHex(col)}" title="${esc(col)}" aria-label="${esc(col)}" data-color="${p.id}|${esc(col)}"></button>`).join("")}</div>
      <div class="sizes">${p.sizes.map((s) => `<button class="size ${s === c.size ? "sel" : ""}" data-size="${p.id}|${esc(s)}">${esc(s)}</button>`).join("")}</div>
      <button class="add" data-add="${p.id}" ${p.stock <= 0 ? "disabled" : ""}><svg class="ic"><use href="#i-cart"/></svg>${p.stock <= 0 ? "غير متوفر" : "أضف للسلة"}</button>
    </div>`;
  }).join("");
}

function addToCart(id) {
  const p = products.find((x) => x.id === id);
  const { size, color } = choice(p);
  const found = cart.find((l) => l.id === id && l.size === size && l.color === color);
  const inCart = cart.filter((l) => l.id === id).reduce((n, l) => n + l.qty, 0);
  if (inCart >= p.stock) { showMsg("الكمية المتاحة من " + p.name + " هي " + p.stock + " فقط.", true); openCart(); return; }
  if (found) found.qty++;
  else cart.push({ id, name: p.name, price: p.price, size, color, qty: 1 });
  $("msg").innerHTML = "";
  drawCart();
  openCart();
}

function changeQty(i, d) {
  const l = cart[i], p = products.find((x) => x.id === l.id);
  const inCart = cart.filter((x) => x.id === l.id).reduce((n, x) => n + x.qty, 0);
  if (d > 0 && inCart >= p.stock) return;
  l.qty += d;
  if (l.qty <= 0) cart.splice(i, 1);
  drawCart();
}

function cartTotal() { return cart.reduce((n, l) => n + l.qty * l.price, 0); }

function drawCart() {
  $("count").textContent = cart.reduce((n, l) => n + l.qty, 0);
  $("cart-lines").innerHTML = cart.length ? cart.map((l, i) => `
    <div class="line-item"><span>${esc(l.name)}<br><span class="muted">${esc(l.size)} - ${esc(l.color)}</span></span>
    <span class="qty"><button class="ghost small" data-qty="${i}|-1" aria-label="تقليل">-</button>${l.qty}
    <button class="ghost small" data-qty="${i}|1" aria-label="زيادة">+</button></span>
    <b>${l.qty * l.price}</b></div>`).join("") : '<p class="muted">السلة فاضية</p>';
  $("total").textContent = cartTotal();
}

function showMsg(text, isError) { $("msg").innerHTML = `<div class="toast ${isError ? "err" : ""}">${esc(text)}</div>`; }
function openCart() { $("cart").classList.add("open"); }

document.addEventListener("click", (e) => {
  const t = e.target.closest("button");
  if (!t) return;
  if (t.dataset.filter) { filter = t.dataset.filter; renderFilters(); renderGrid(); }
  else if (t.dataset.add) addToCart(Number(t.dataset.add));
  else if (t.dataset.size || t.dataset.color) {
    const [id, val] = (t.dataset.size || t.dataset.color).split("|");
    picked[id] = { ...choice(products.find((p) => p.id === Number(id))), [t.dataset.size ? "size" : "color"]: val };
    renderGrid();
  } else if (t.dataset.qty) { const [i, d] = t.dataset.qty.split("|"); changeQty(Number(i), Number(d)); }
});
$("open-cart").onclick = openCart;
$("close-cart").onclick = () => $("cart").classList.remove("open");

$("order-form").onsubmit = (e) => {
  e.preventDefault();
  if (!cart.length) { showMsg("أضف منتج للسلة الأول.", true); return; }
  const f = new FormData(e.target);
  const orders = loadOrders();
  const order = {
    number: orders.length + 1001,
    date: new Date().toLocaleString("ar-EG"),
    name: f.get("name").trim(), phone: f.get("phone").trim(), address: f.get("address").trim(),
    items: cart, total: cartTotal(), status: "جديد"
  };
  orders.push(order);
  saveOrders(orders);
  cart.forEach((l) => { products.find((p) => p.id === l.id).stock -= l.qty; });
  saveProducts(products);
  cart = []; picked_reset();
  drawCart(); renderGrid(); e.target.reset();
  showMsg("تم تسجيل الطلب رقم " + order.number + " في النسخة التجريبية. هتلاقيه في صفحة الإدارة على نفس المتصفح، ومبعتناش أي حاجة لأي حد.");
};
function picked_reset() { Object.keys(picked).forEach((k) => delete picked[k]); }

renderFilters(); renderGrid(); drawCart();
