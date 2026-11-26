// Menu data (made-up names and prices for the demo).
// Each juice carries a small flat SVG icon used in the menu cards.
export const JUICES = [
  { id: "mango",  name: "عصير مانجو",   price: 45, color: "#ffb21f", bg: ["#fff1c9", "#ffd36b"], fruit: "mango",  desc: "مانجو طازجة مع لبن وقطع تلج",
    icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><ellipse cx="24" cy="28" rx="14" ry="16" fill="#f6a21b" transform="rotate(-12 24 28)"/><ellipse cx="19" cy="24" rx="8" ry="9" fill="#d9482b" opacity=".55" transform="rotate(-12 19 24)"/><path d="M30 12c4-3 9-2 11 1-4 2-9 1-11-1z" fill="#3f8a3a"/></svg>' },
  { id: "banana", name: "موز بالحليب",  price: 40, color: "#f4e3a0", bg: ["#fff9dc", "#f6e08c"], fruit: "banana", desc: "موز ناضج وحليب بارد",
    icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 12c1 12 9 25 25 25 3 0 6-1 8-2-2 2-5 4-9 4C20 39 9 28 8 15c0-1 0-2 1-3z" fill="#f7dc3a"/><path d="M9 12c2-1 4-1 6 0" stroke="#c9a52a" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M15 16c2 8 8 15 17 18" stroke="#e6c42e" stroke-width="2" fill="none" stroke-linecap="round"/></svg>' },
  { id: "apple",  name: "عصير تفاح",    price: 40, color: "#d9e88a", bg: ["#f1f8cf", "#c9e27a"], fruit: "apple",  desc: "تفاح أحمر معصور في اللحظة",
    icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="28" r="14" fill="#c8262f"/><path d="M24 15c0-3 2-5 5-6" stroke="#5a3b1f" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M26 12c4-4 9-3 10 0-3 3-8 3-10 0z" fill="#3f8a3a"/><ellipse cx="18" cy="24" rx="3" ry="4" fill="#e0565e"/></svg>' },
  { id: "strawberry", name: "فراولة",   price: 50, color: "#ff5c7a", bg: ["#ffe1e7", "#ff9fb2"], fruit: "strawberry", desc: "فراولة طازجة بدون سكر زيادة",
    icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 44C14 36 9 27 11 19c2-6 8-8 13-8s11 2 13 8c2 8-3 17-13 25z" fill="#e0213f"/><path d="M15 13c3-3 15-3 18 0-2 2-4 2-4 0-2 2-3 2-5 0-2 2-3 2-5 0-2 2-3 2-4 0z" fill="#3f8a3a"/><g fill="#ffd9de"><circle cx="18" cy="24" r="1.3"/><circle cx="26" cy="22" r="1.3"/><circle cx="31" cy="27" r="1.3"/><circle cx="21" cy="31" r="1.3"/><circle cx="28" cy="34" r="1.3"/></g></svg>' },
  { id: "orange", name: "برتقال",       price: 35, color: "#ff9a1f", bg: ["#ffe9cc", "#ffc27a"], fruit: "orange", desc: "برتقال بلدي 100%",
    icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="27" r="15" fill="#ff8a00"/><path d="M27 9c4-3 9-2 10 1-3 3-8 2-10-1z" fill="#3f8a3a"/><path d="M24 12c0-2 1-3 3-4" stroke="#5a3b1f" stroke-width="2" fill="none" stroke-linecap="round"/><g fill="#e07000"><circle cx="18" cy="24" r="1.2"/><circle cx="28" cy="22" r="1.2"/><circle cx="23" cy="31" r="1.2"/><circle cx="31" cy="30" r="1.2"/></g></svg>' },
  { id: "guava",  name: "جوافة",        price: 40, color: "#f59aa5", bg: ["#ffe3e6", "#f7b5bd"], fruit: "guava",  desc: "جوافة بلدي كثيفة",
    icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="27" r="15" fill="#b7d36a"/><circle cx="24" cy="27" r="10" fill="#f7f3d0"/><circle cx="24" cy="27" r="7" fill="#f29aa2"/><g fill="#e07685"><circle cx="21" cy="25" r="1"/><circle cx="27" cy="25" r="1"/><circle cx="24" cy="30" r="1"/><circle cx="28" cy="29" r="1"/><circle cx="20" cy="29" r="1"/></g></svg>' }
];
export const SIZES = [
  { id: "s", label: "صغير", extra: 0 },
  { id: "m", label: "وسط", extra: 10 },
  { id: "l", label: "كبير", extra: 20 }
];
