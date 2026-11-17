/* =====================================================
   APPLE CLONE — script.js
   Rasmlar: Apple'ning rasmiy saytidagi (apple.com) mahsulot rasmlari havolalari orqali yuklanadi.
   Xohlasangiz, havolalarni o'z rasm fayllaringizga (images/...) almashtiring.
   Rasm yuklanmasa, avtomatik zaxira (SVG) ko'rsatiladi.
   ===================================================== */

const PRODUCTS = [
  {
    id: 'iphone',
    name: 'iPhone 17 Pro',
    tag: 'Yangi',
    tagline: 'Pro darajadagi kuch. Titan dizayn.',
    price: 1199,
    img: 'https://www.apple.com/v/iphone/home/cj/images/overview/select/iphone_17pro__t1j902iw6kya_large.jpg',
    sold: 48230,
    desc: 'Eng ilg\'or iPhone: titan korpus, A19 Pro chip va professional kamera tizimi.',
    specs: [
      ['Chip', 'A19 Pro, 6 yadroli CPU'],
      ['Ekran', '6.3" Super Retina XDR, ProMotion 120 Hz'],
      ['Kamera', '48 MP asosiy + 48 MP ultra keng + 12 MP telefoto'],
      ['Old kamera', '18 MP Center Stage'],
      ['Batareya', '33 soatgacha video ijro'],
      ['Xotira', '256 GB / 512 GB / 1 TB'],
      ['Xavfsizlik', 'Face ID, Emergency SOS']
    ],
    mini: ['A19 Pro chip', '48 MP kamera', '120 Hz ekran']
  },
  {
    id: 'macbook',
    name: 'MacBook Pro 14"',
    tag: 'Eng kuchli',
    tagline: 'M4 Pro chip. Professional uchun yaratilgan.',
    price: 1999,
    img: 'https://www.apple.com/v/macbook-pro/liquid-retina-xdr-display/specs/e/images/specs/14-inch/macbook_pro_14_inch__fjlrd633eki2_large.jpg',
    sold: 31470,
    desc: 'Liquid Retina XDR ekran, ajoyib ovoz va kun bo\'yi ishlaydigan batareya.',
    specs: [
      ['Chip', 'Apple M4 Pro, 12 yadroli CPU'],
      ['Ekran', '14.2" Liquid Retina XDR, 120 Hz'],
      ['Xotira (RAM)', '24 GB gacha birlashgan xotira'],
      ['Saqlash', '512 GB – 4 TB SSD'],
      ['Batareya', '24 soatgacha ishlaydi'],
      ['Portlar', '3× Thunderbolt 5, HDMI, SD karta, MagSafe 3'],
      ['Og\'irligi', '1.55 kg']
    ],
    mini: ['M4 Pro chip', '24 soat batareya', 'XDR ekran']
  },
  {
    id: 'watch',
    name: 'Apple Watch Series 11',
    tag: 'Salomatlik',
    tagline: 'Salomatligingiz bilan doim aloqada.',
    price: 429,
    img: 'https://www.apple.com/v/apple-watch-series-11/c/images/specs/in_the_box__f7ddc6slx8yi_large.jpg',
    sold: 62915,
    desc: 'Yurak urishi, kislorod, uyqu va mashq kuzatuvi — barchasi bilagingizda.',
    specs: [
      ['Chip', 'S11 SiP, 64-bit ikki yadroli'],
      ['Ekran', 'Always-On Retina LTPO3 OLED'],
      ['Sensorlar', 'ECG, qon kislorodi, harorat'],
      ['Batareya', '24 soatgacha (tez zaryadlash)'],
      ['Suvga chidamlilik', '50 metrgacha (WR50)'],
      ['Aloqa', 'GPS, LTE, Wi-Fi, Bluetooth 5.3'],
      ['Material', 'Alyuminiy / Titan']
    ],
    mini: ['ECG & kislorod', '50 m suvga chidamli', 'GPS + LTE']
  }
];

const SLIDES = [
  { title: 'iPhone 17 Pro', sub: 'Shunchaki Pro.', img: 'https://www.apple.com/v/iphone/home/cj/images/overview/select/iphone_17pro__t1j902iw6kya_large.jpg', pid: 'iphone', light: true, bg: 'linear-gradient(180deg, #fbfbfd, #ececf0)' },
  { title: 'MacBook Pro', sub: 'Juda kuchli. Juda Pro.', img: 'https://www.apple.com/v/macbook-pro/liquid-retina-xdr-display/specs/e/images/specs/14-inch/macbook_pro_14_inch__fjlrd633eki2_large.jpg', pid: 'macbook', light: true, bg: 'linear-gradient(180deg, #fbfbfd, #e8e8ed)' },
  { title: 'Apple Watch', sub: 'Siz uchun yaratilgan.', img: 'https://www.apple.com/v/apple-watch-series-11/c/images/specs/in_the_box__f7ddc6slx8yi_large.jpg', pid: 'watch', light: true, bg: 'linear-gradient(180deg, #fbfbfd, #e6edf7)' },
  { title: 'Ekotizim', sub: 'Hammasi bir-biri bilan ishlaydi.', img: 'https://www.apple.com/v/macbook-pro/liquid-retina-xdr-display/specs/e/images/specs/14-inch/macbook_pro_14_inch__fjlrd633eki2_large.jpg', pid: 'macbook', light: true, bg: 'linear-gradient(180deg, #f5f5f7, #d9e6f7)' }
];

/* ---------- Yordamchi funksiyalar ---------- */
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const fmt = n => '$' + n.toLocaleString('en-US');
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

// Rasm topilmasa — SVG zaxira
function fallbackSVG(name) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="500" viewBox="0 0 600 500">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8d8de"/><stop offset="1" stop-color="#8e8e96"/></linearGradient></defs>
    <rect x="150" y="60" width="300" height="380" rx="46" fill="url(#g)"/>
    <text x="300" y="270" font-family="Arial" font-size="26" fill="#fff" text-anchor="middle">${name}</text>
    <text x="300" y="305" font-family="Arial" font-size="15" fill="#f0f0f0" text-anchor="middle">rasm yuklanmadi</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
function imgTag(src, name, cls = '') {
  return `<img class="${cls}" src="${src}" alt="${name}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src=fallbackSVG('${name.replace(/'/g, '')}')">`;
}
window.fallbackSVG = fallbackSVG;

/* ---------- Holat ---------- */
let cart = load('cart', []);          // [{id, qty}]
let currentUser = load('user', null);
let soldExtra = load('soldExtra', {}); // sotib olinganlar hisobi
let pendingProduct = null;             // ro'yxatdan keyin qo'shiladigan mahsulot

const soldOf = p => p.sold + (soldExtra[p.id] || 0);

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ---------- Modal / Drawer ---------- */
function openModal(el) { el.classList.add('open'); document.body.classList.add('lock'); }
function closeModal(el) { el.classList.remove('open'); document.body.classList.remove('lock'); }
function openCart() { $('#cartDrawer').classList.add('open'); $('#overlay').classList.add('show'); document.body.classList.add('lock'); renderCart(); }
function closeCart() { $('#cartDrawer').classList.remove('open'); $('#overlay').classList.remove('show'); document.body.classList.remove('lock'); }

/* ---------- Karusel ---------- */
let slideIndex = 0, slideTimer;
function buildCarousel() {
  $('#slides').innerHTML = SLIDES.map((s, i) => `
    <div class="slide ${s.light ? 'light' : ''} ${i === 0 ? 'active' : ''}" style="background:${s.bg}">
      <h1>${s.title}</h1>
      <p>${s.sub}</p>
      <div class="links">
        <a href="#products" class="link-blue" data-detail="${s.pid}">Batafsil &rsaquo;</a>
        <button class="pill" data-buy="${s.pid}">Sotib olish</button>
      </div>
      ${imgTag(s.img, s.title, 'hero-img')}
    </div>`).join('');
  $('#dots').innerHTML = SLIDES.map((_, i) => `<button class="dot ${i === 0 ? 'active' : ''}" data-dot="${i}" aria-label="Slayd ${i + 1}"></button>`).join('');
}
function goSlide(i) {
  slideIndex = (i + SLIDES.length) % SLIDES.length;
  $('#slides').style.transform = `translateX(-${slideIndex * 100}%)`;
  $$('.slide').forEach((s, k) => s.classList.toggle('active', k === slideIndex));
  $$('.dot').forEach((d, k) => d.classList.toggle('active', k === slideIndex));
}
function autoPlay() { clearInterval(slideTimer); slideTimer = setInterval(() => goSlide(slideIndex + 1), 5500); }

/* ---------- Mahsulotlar ---------- */
function renderProducts(filter = '') {
  const q = filter.trim().toLowerCase();
  const list = PRODUCTS.filter(p => !q || (p.name + ' ' + p.tagline + ' ' + p.id).toLowerCase().includes(q));
  $('#productGrid').innerHTML = list.length ? list.map(p => `
    <article class="card reveal in">
      <span class="tag">${p.tag}</span>
      <h3>${p.name}</h3>
      <p class="tagline">${p.tagline}</p>
      <div class="img-wrap">${imgTag(p.img, p.name)}</div>
      <p class="price">${fmt(p.price)} dan boshlab</p>
      <span class="sold-chip">🔥 ${soldOf(p).toLocaleString('en-US')} ta sotilgan</span>
      <ul class="specs-mini">${p.mini.map(m => `<li>✓ ${m}</li>`).join('')}</ul>
      <div class="card-actions">
        <button class="btn blue" data-buy="${p.id}">Sotib olish</button>
        <button class="btn ghost" data-detail="${p.id}">Batafsil</button>
      </div>
    </article>`).join('') : '<p class="empty" style="grid-column:1/-1">Hech narsa topilmadi 😕</p>';
}

function showDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  $('#detailBox').innerHTML = `
    <button class="close" data-close="detail">&times;</button>
    <div class="detail">
      ${imgTag(p.img, p.name)}
      <div>
        <span class="tag">${p.tag}</span>
        <h2>${p.name}</h2>
        <p class="desc">${p.desc}</p>
        <table class="spec-table">${p.specs.map(s => `<tr><td>${s[0]}</td><td>${s[1]}</td></tr>`).join('')}</table>
        <p class="price" style="margin-bottom:12px"><b>${fmt(p.price)}</b> &nbsp;·&nbsp; <small>🔥 ${soldOf(p).toLocaleString('en-US')} ta sotilgan</small></p>
        <button class="btn blue full" data-buy="${p.id}">Sotib olish</button>
      </div>
    </div>`;
  openModal($('#detailModal'));
}

/* ---------- Statistika ---------- */
function renderStats() {
  const total = PRODUCTS.reduce((a, p) => a + soldOf(p), 0);
  const max = Math.max(...PRODUCTS.map(soldOf));
  const items = [
    ...PRODUCTS.map(p => ({ label: p.name + ' sotildi', val: soldOf(p), pct: soldOf(p) / max * 100 })),
    { label: 'Jami sotilgan qurilmalar', val: total, pct: 100 }
  ];
  $('#statsBox').innerHTML = items.map(s => `
    <div class="stat reveal">
      <div class="num" data-count="${s.val}">0</div>
      <div class="lbl">${s.label}</div>
      <div class="bar"><i data-w="${s.pct}"></i></div>
    </div>`).join('');
  observe();
}
function animateCount(el) {
  const target = +el.dataset.count, dur = 1800, start = performance.now();
  (function step(now) {
    const t = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor(target * (1 - Math.pow(1 - t, 3))).toLocaleString('en-US');
    if (t < 1) requestAnimationFrame(step);
  })(start);
}

/* ---------- Savatcha ---------- */
function cartCount() { return cart.reduce((a, c) => a + c.qty, 0); }
function updateBadge() {
  const b = $('#cartCount'), n = cartCount();
  b.textContent = n;
  b.classList.toggle('show', n > 0);
  b.classList.remove('bump'); void b.offsetWidth; if (n) b.classList.add('bump');
}
function addToCart(id) {
  const it = cart.find(c => c.id === id);
  it ? it.qty++ : cart.push({ id, qty: 1 });
  save('cart', cart);
  updateBadge();
  toast('✓ ' + PRODUCTS.find(p => p.id === id).name + ' savatchaga qo\'shildi');
}
function renderCart() {
  const box = $('#cartItems');
  if (!cart.length) {
    box.innerHTML = '<div class="empty"><span>🛍️</span>Savatchangiz bo\'sh</div>';
    $('#cartTotal').textContent = '$0';
    return;
  }
  let total = 0;
  box.innerHTML = cart.map(c => {
    const p = PRODUCTS.find(x => x.id === c.id);
    total += p.price * c.qty;
    return `<div class="cart-item">
      ${imgTag(p.img, p.name)}
      <div class="ci-info">
        <b>${p.name}</b><span>${fmt(p.price)}</span>
        <div class="qty">
          <button data-qty="-1" data-id="${p.id}">−</button><span>${c.qty}</span><button data-qty="1" data-id="${p.id}">+</button>
        </div>
      </div>
      <button class="remove" data-remove="${p.id}">O'chirish</button>
    </div>`;
  }).join('');
  $('#cartTotal').textContent = fmt(total);
}
function changeQty(id, d) {
  const it = cart.find(c => c.id === id);
  if (!it) return;
  it.qty += d;
  if (it.qty <= 0) cart = cart.filter(c => c.id !== id);
  save('cart', cart); updateBadge(); renderCart();
}
function checkout() {
  if (!cart.length) return toast('Savatcha bo\'sh!');
  if (!currentUser) { closeCart(); openAuth('register'); return toast('Avval ro\'yxatdan o\'ting'); }
  cart.forEach(c => { soldExtra[c.id] = (soldExtra[c.id] || 0) + c.qty; });
  save('soldExtra', soldExtra);
  const n = cartCount();
  cart = []; save('cart', cart); updateBadge(); renderCart(); closeCart();
  renderProducts($('#searchInput').value); renderStats();
  toast(`🎉 Rahmat, ${currentUser.name}! ${n} ta mahsulot buyurtma qilindi.`);
}

/* ---------- Sotib olish (asosiy mantiq) ---------- */
function buy(id) {
  if (!currentUser) {
    // Ro'yxatdan o'tmagan — ro'yxatdan o'tish oynasiga o'tkazamiz
    pendingProduct = id;
    closeModal($('#detailModal'));
    openAuth('register');
    toast('Sotib olish uchun ro\'yxatdan o\'ting');
    return;
  }
  addToCart(id);
  closeModal($('#detailModal'));
}

/* ---------- Auth ---------- */
function openAuth(tab = 'register') {
  switchTab(tab);
  $('#regError').textContent = ''; $('#logError').textContent = '';
  openModal($('#authModal'));
}
function switchTab(tab) {
  $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  $('#registerForm').classList.toggle('active', tab === 'register');
  $('#loginForm').classList.toggle('active', tab === 'login');
}
function setUser(u) {
  currentUser = u; save('user', u);
  $('#userName').textContent = u ? u.name.split(' ')[0] : '';
  $('#userBtn').title = u ? 'Chiqish uchun bosing' : 'Hisob';
}
function afterAuth() {
  closeModal($('#authModal'));
  if (pendingProduct) { addToCart(pendingProduct); pendingProduct = null; }
}

$('#registerForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#regName').value.trim(), email = $('#regEmail').value.trim().toLowerCase(),
        phone = $('#regPhone').value.trim(), pass = $('#regPass').value;
  const err = $('#regError');
  $$('#registerForm input').forEach(i => i.classList.remove('bad'));
  if (name.length < 2) { $('#regName').classList.add('bad'); return err.textContent = 'Ismingizni kiriting.'; }
  if (!/^\S+@\S+\.\S+$/.test(email)) { $('#regEmail').classList.add('bad'); return err.textContent = 'Email noto\'g\'ri.'; }
  if (phone.replace(/\D/g, '').length < 9) { $('#regPhone').classList.add('bad'); return err.textContent = 'Telefon raqami noto\'g\'ri.'; }
  if (pass.length < 6) { $('#regPass').classList.add('bad'); return err.textContent = 'Parol kamida 6 ta belgi bo\'lsin.'; }
  const users = load('users', []);
  if (users.some(u => u.email === email)) return err.textContent = 'Bu email allaqachon ro\'yxatdan o\'tgan. Kiring.';
  const user = { name, email, phone, pass };
  users.push(user); save('users', users);
  setUser(user);
  e.target.reset();
  toast('👋 Xush kelibsiz, ' + name + '!');
  afterAuth();
});

$('#loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = $('#logEmail').value.trim().toLowerCase(), pass = $('#logPass').value;
  const u = load('users', []).find(x => x.email === email && x.pass === pass);
  if (!u) return $('#logError').textContent = 'Email yoki parol noto\'g\'ri.';
  setUser(u);
  e.target.reset();
  toast('✓ Xush kelibsiz, ' + u.name + '!');
  afterAuth();
});

$$('.tab').forEach(t => t.addEventListener('click', () => switchTab(t.dataset.tab)));

$('#userBtn').addEventListener('click', () => {
  if (currentUser) {
    if (confirm(currentUser.name + ', hisobdan chiqmoqchimisiz?')) { setUser(null); toast('Hisobdan chiqdingiz'); }
  } else openAuth('login');
});

/* ---------- Global click delegatsiyasi ---------- */
document.addEventListener('click', e => {
  const buyBtn = e.target.closest('[data-buy]');
  if (buyBtn) return buy(buyBtn.dataset.buy);

  const det = e.target.closest('[data-detail]');
  if (det) { e.preventDefault(); return showDetail(det.dataset.detail); }

  const dot = e.target.closest('[data-dot]');
  if (dot) { goSlide(+dot.dataset.dot); return autoPlay(); }

  const q = e.target.closest('[data-qty]');
  if (q) return changeQty(q.dataset.id, +q.dataset.qty);

  const rm = e.target.closest('[data-remove]');
  if (rm) { cart = cart.filter(c => c.id !== rm.dataset.remove); save('cart', cart); updateBadge(); return renderCart(); }

  if (e.target.closest('[data-close="detail"]')) return closeModal($('#detailModal'));

  // fonga bosganda modalni yopish
  if (e.target.classList.contains('modal')) closeModal(e.target);
});

$('#cartBtn').addEventListener('click', openCart);
$('#closeCart').addEventListener('click', closeCart);
$('#overlay').addEventListener('click', closeCart);
$('#closeAuth').addEventListener('click', () => closeModal($('#authModal')));
$('#checkoutBtn').addEventListener('click', checkout);
$('#prevSlide').addEventListener('click', () => { goSlide(slideIndex - 1); autoPlay(); });
$('#nextSlide').addEventListener('click', () => { goSlide(slideIndex + 1); autoPlay(); });

$('#searchBtn').addEventListener('click', () => {
  $('#searchPanel').classList.toggle('open');
  if ($('#searchPanel').classList.contains('open')) setTimeout(() => $('#searchInput').focus(), 300);
});
$('#searchInput').addEventListener('input', e => {
  renderProducts(e.target.value);
  $('#products').scrollIntoView({ behavior: 'smooth' });
});

$('#burger').addEventListener('click', () => $('#navLinks').classList.toggle('open'));
$$('#navLinks a').forEach(a => a.addEventListener('click', () => $('#navLinks').classList.remove('open')));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal($('#authModal')); closeModal($('#detailModal')); closeCart();
  }
  if (e.key === 'ArrowLeft') { goSlide(slideIndex - 1); autoPlay(); }
  if (e.key === 'ArrowRight') { goSlide(slideIndex + 1); autoPlay(); }
});

// Touch swipe (karusel)
(function () {
  const c = $('#home'); let sx = 0;
  c.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
  c.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) { goSlide(slideIndex + (dx < 0 ? 1 : -1)); autoPlay(); }
  });
  c.addEventListener('mouseenter', () => clearInterval(slideTimer));
  c.addEventListener('mouseleave', autoPlay);
})();

/* ---------- Scroll animatsiyalar ---------- */
let io;
function observe() {
  if (!io) {
    io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        const num = $('[data-count]', en.target);
        if (num) animateCount(num);
        const bar = $('[data-w]', en.target);
        if (bar) bar.style.width = bar.dataset.w + '%';
        io.unobserve(en.target);
      });
    }, { threshold: .2 });
  }
  $$('.reveal:not(.in)').forEach(el => io.observe(el));
}

/* ---------- Boshlash ---------- */
buildCarousel();
renderProducts();
renderStats();
updateBadge();
setUser(currentUser);
observe();
autoPlay();
