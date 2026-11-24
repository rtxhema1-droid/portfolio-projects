const products = loadProducts();
let cart = [];
const $ = (id) => document.getElementById(id);

function render() {
  $("grid").innerHTML = products.map((p) => `
    <div class="card">
      <div class="swatch" style="background:${p.color}"></div>
      <div>${p.name}</div>
      <div class="price">${p.price} ج.م</div>
      <select id="size-${p.id}">${p.sizes.map((s) => `<option>${s}</option>`).join("")}</select>
      <select id="color-${p.id}">${p.colors.map((c) => `<option>${c}</option>`).join("")}</select>
      ${p.stock > 0 ? `<button onclick="addToCart(${p.id})">أضف للسلة</button>` : `<button disabled>غير متوفر</button>`}
    </div>`).join("");
}

function addToCart(id) {
  const p = products.find((x) => x.id === id);
  const size = $("size-" + id).value, color = $("color-" + id).value;
  const found = cart.find((l) => l.id === id && l.size === size && l.color === color);
  if (found) { if (found.qty < p.stock) found.qty++; }
  else cart.push({ id, name: p.name, price: p.price, size, color, qty: 1 });
  drawCart();
  $("cart").classList.add("open");
}

function changeQty(i, d) {
  cart[i].qty += d;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  drawCart();
}

function drawCart() {
  $("count").textContent = cart.reduce((n, l) => n + l.qty, 0);
  $("cart-lines").innerHTML = cart.length ? cart.map((l, i) => `
    <div class="line"><span>${l.name} (${l.size}، ${l.color})</span>
    <span><button class="ghost" onclick="changeQty(${i},-1)">-</button> ${l.qty}
    <button class="ghost" onclick="changeQty(${i},1)">+</button></span>
    <span>${l.qty * l.price}</span></div>`).join("") : '<p class="note">السلة فاضية</p>';
  $("total").textContent = cart.reduce((n, l) => n + l.qty * l.price, 0);
}

$("open-cart").onclick = () => $("cart").classList.add("open");
$("close-cart").onclick = () => $("cart").classList.remove("open");

$("order-form").onsubmit = (e) => {
  e.preventDefault();
  if (!cart.length) { $("msg").innerHTML = '<p class="note">أضف منتج أولا.</p>'; return; }
  const f = new FormData(e.target);
  const orders = loadOrders();
  const order = {
    number: orders.length + 1001,
    date: new Date().toLocaleString("ar-EG"),
    name: f.get("name"), phone: f.get("phone"), address: f.get("address"),
    items: cart, total: cart.reduce((n, l) => n + l.qty * l.price, 0), status: "جديد"
  };
  orders.push(order);
  localStorage.setItem("cs_orders", JSON.stringify(orders));
  cart = []; drawCart(); e.target.reset();
  $("msg").innerHTML = `<div class="toast">تم تسجيل طلبك رقم ${order.number}. هنتواصل معاك للتأكيد.</div>`;
};

render(); drawCart();
