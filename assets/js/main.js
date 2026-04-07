// ===== NAV SCROLL =====
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ===== ACTIVE NAV LINK =====
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
});

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => io.observe(r));

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lbImg = lightbox.querySelector('img');
  const lbCaption = lightbox.querySelector('.lb-caption');
  const items = [...document.querySelectorAll('.masonry-item, .featured-item')];
  let current = 0;

  function openLb(idx) {
    current = idx;
    const item = items[idx];
    const img = item.querySelector('img');
    const caption = item.querySelector('.caption p')?.textContent?.trim();
    const total = items.length;
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = caption
      ? `${caption} · ${idx + 1} / ${total}`
      : `Photo ${idx + 1} of ${total}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  items.forEach((item, i) => item.addEventListener('click', () => openLb(i)));
  lightbox.querySelector('.lb-close').addEventListener('click', closeLb);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
  lightbox.querySelector('.lb-prev').addEventListener('click', e => { e.stopPropagation(); openLb((current - 1 + items.length) % items.length); });
  lightbox.querySelector('.lb-next').addEventListener('click', e => { e.stopPropagation(); openLb((current + 1) % items.length); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') openLb((current - 1 + items.length) % items.length);
    if (e.key === 'ArrowRight') openLb((current + 1) % items.length);
  });
}

// ===== GALLERY FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    document.querySelectorAll('.masonry-item').forEach(item => {
      const show = cat === 'all' || item.dataset.cat === cat;
      item.style.display = show ? 'block' : 'none';
    });
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    document.querySelector('.form-success').style.display = 'block';
  });
}
