import { JUICES, SIZES } from "./juices.js";
import { createScene } from "./scene.js";

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const state = { active: "mango", size: {}, cart: [] };
JUICES.forEach((j) => (state.size[j.id] = "m"));

const scene = createScene($("c"));
if (!scene) { $("c").style.display = "none"; $("fallback").style.display = "flex"; }

function theme(j) {
  document.documentElement.style.setProperty("--bg1", j.bg[0]);
  document.documentElement.style.setProperty("--bg2", j.bg[1]);
  if (scene) scene.setJuice(j);
}
const price = (j) => j.price + SIZES.find((s) => s.id === state.size[j.id]).extra;

function renderMenu() {
  $("menu").innerHTML = JUICES.map((j) => `
    <div class="item ${j.id === state.active ? "active" : ""}">
      <div class="dot" style="background:${j.color}"></div>
      <b>${esc(j.name)}</b><small>${esc(j.desc)}</small>
      <div class="sizes">${SIZES.map((s) => `<button class="size ${state.size[j.id] === s.id ? "sel" : ""}" data-size="${j.id}|${s.id}">${s.label}</button>`).join("")}</div>
      <div class="row"><b>${price(j)} ج.م</b><button data-add="${j.id}">أضف</button></div>
      <button class="light" data-view="${j.id}">شوفه في الكوباية</button>
    </div>`).join("");
}

function renderCart() {
  $("count").textContent = state.cart.reduce((n, l) => n + l.qty, 0);
  $("lines").innerHTML = state.cart.length ? state.cart.map((l, i) =>
    `<div class="line"><span>${esc(l.name)} (${esc(l.size)}) × ${l.qty}</span><span>${l.qty * l.price} <button class="light" data-del="${i}" aria-label="حذف">×</button></span></div>`).join("") : "<p>لسه مفيش حاجة في الطلب.</p>";
  $("total").textContent = state.cart.reduce((n, l) => n + l.qty * l.price, 0);
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.view) { state.active = b.dataset.view; theme(JUICES.find((j) => j.id === state.active)); renderMenu(); }
  else if (b.dataset.size) { const [id, s] = b.dataset.size.split("|"); state.size[id] = s; renderMenu(); }
  else if (b.dataset.add) {
    const j = JUICES.find((x) => x.id === b.dataset.add), size = SIZES.find((s) => s.id === state.size[j.id]);
    const found = state.cart.find((l) => l.id === j.id && l.size === size.label);
    if (found) found.qty++; else state.cart.push({ id: j.id, name: j.name, size: size.label, price: price(j), qty: 1 });
    state.active = j.id; theme(j); renderMenu(); renderCart(); $("msg").innerHTML = ""; $("cart").classList.add("open");
  } else if (b.dataset.del) { state.cart.splice(Number(b.dataset.del), 1); renderCart(); }
});
$("open-cart").onclick = () => $("cart").classList.add("open");
$("close-cart").onclick = () => $("cart").classList.remove("open");
$("order").onsubmit = (e) => {
  e.preventDefault();
  if (!state.cart.length) { $("msg").innerHTML = '<div class="toast">أضف عصير الأول.</div>'; return; }
  const n = 100 + Math.floor(Math.random() * 900);
  state.cart = []; renderCart(); e.target.reset();
  $("msg").innerHTML = `<div class="toast">تم تسجيل الطلب التجريبي رقم ${n}. ده عرض فقط، ومفيش حاجة اتبعتت لأي محل.</div>`;
};

theme(JUICES[0]); renderMenu(); renderCart();
