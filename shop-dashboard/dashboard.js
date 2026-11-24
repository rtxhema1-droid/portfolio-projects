const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const CANCELLED = "ملغي";

// Small CSV parser (handles quoted fields). Returns an array of objects.
function parseCSV(text, required) {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((x) => x.trim() !== "")) rows.push(row);
      row = [];
    } else cell += c;
  }
  row.push(cell); if (row.some((x) => x.trim() !== "")) rows.push(row);
  const head = (rows.shift() || []).map((h) => h.trim().replace(/^\uFEFF/, ""));
  const missing = required.filter((r) => !head.includes(r));
  if (missing.length) throw new Error("أعمدة ناقصة: " + missing.join(", "));
  return rows.map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] || "").trim()])));
}

let orders = parseCSV(SAMPLE_ORDERS, ["date", "product", "quantity", "unit_price", "status"]);
let stock = parseCSV(SAMPLE_STOCK, ["product", "stock", "min_stock"]);

function render() {
  const live = orders.filter((o) => o.status !== CANCELLED);
  const revenue = live.reduce((n, o) => n + Number(o.quantity) * Number(o.unit_price), 0);
  const units = live.reduce((n, o) => n + Number(o.quantity), 0);
  const open = orders.filter((o) => o.status === "جديد" || o.status === "تم الشحن").length;
  const low = stock.filter((s) => Number(s.stock) < Number(s.min_stock)).length;
  const card = (l, n) => `<div class="card"><div class="l">${l}</div><div class="n">${n}</div></div>`;
  $("cards").innerHTML = card("الإيراد (بدون الملغي)", fmt(revenue) + " ج.م") + card("القطع المباعة", fmt(units)) +
    card("طلبات مفتوحة", open) + card("منتجات ناقصة", low);

  const byDay = {};
  live.forEach((o) => { byDay[o.date] = (byDay[o.date] || 0) + Number(o.quantity) * Number(o.unit_price); });
  const days = Object.keys(byDay).sort(), max = Math.max(1, ...Object.values(byDay));
  $("daily").innerHTML = days.map((d) =>
    `<div class="bar"><span class="d">${esc(d)}</span><i style="width:${(byDay[d] / max) * 60}%"></i><b>${fmt(byDay[d])}</b></div>`).join("") || '<p class="note">لا توجد بيانات</p>';

  const byProd = {};
  live.forEach((o) => {
    const p = byProd[o.product] || (byProd[o.product] = { units: 0, rev: 0 });
    p.units += Number(o.quantity); p.rev += Number(o.quantity) * Number(o.unit_price);
  });
  $("top").innerHTML = "<tr><th>المنتج</th><th>القطع</th><th>الإيراد</th></tr>" +
    Object.entries(byProd).sort((a, b) => b[1].rev - a[1].rev)
      .map(([n, v]) => `<tr><td>${esc(n)}</td><td>${v.units}</td><td>${fmt(v.rev)}</td></tr>`).join("");

  $("stock").innerHTML = "<tr><th>المنتج</th><th>المتوفر</th><th>الحد الأدنى</th><th>الحالة</th></tr>" +
    stock.map((s) => { const isLow = Number(s.stock) < Number(s.min_stock);
      return `<tr><td>${esc(s.product)}</td><td class="${isLow ? "low" : ""}">${esc(s.stock)}</td><td>${esc(s.min_stock)}</td><td class="${isLow ? "low" : ""}">${isLow ? "ناقص، اطلب كمية" : "تمام"}</td></tr>`; }).join("");
}

function loader(inputId, required, apply, label) {
  $(inputId).addEventListener("change", async (e) => {
    $("error").textContent = "";
    try {
      apply(parseCSV(await e.target.files[0].text(), required));
      $("source").textContent = "تم تحميل " + label + " من ملفك. الباقي لسه بيانات تجريبية لو ما رفعتوش.";
      render();
    } catch (err) { $("error").textContent = "تعذر قراءة الملف: " + err.message; }
  });
}
loader("f-orders", ["date", "product", "quantity", "unit_price", "status"], (r) => (orders = r), "الطلبات");
loader("f-stock", ["product", "stock", "min_stock"], (r) => (stock = r), "المخزون");
$("reset").onclick = () => location.reload();
render();
