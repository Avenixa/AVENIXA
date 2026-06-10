/* ==============================
   LOADING SCREEN
============================== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loadingScreen');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 500);
  }, 1900);
});

// Fallback: paksa hide loading screen setelah 4 detik
setTimeout(() => {
  const loader = document.getElementById('loadingScreen');
  if (loader && !loader.classList.contains('hide')) {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 500);
  }
}, 4000);

/* ==============================
   PARTICLE BACKGROUND
============================== */
(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];
  const COUNT = 55;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticle() {
    return {
      x: randomBetween(0, W),
      y: randomBetween(0, H),
      r: randomBetween(2, 5.5),
      dx: randomBetween(-0.35, 0.35),
      dy: randomBetween(-0.35, 0.35),
      alpha: randomBetween(0.15, 0.55),
      // slightly different blue shades to match palette
      color: ['#3b82f6', '#60a5fa', '#93c5fd', '#1e40af', '#bfdbfe'][Math.floor(Math.random() * 5)]
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < COUNT; i++) particles.push(createParticle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.12 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawLines();
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    requestAnimationFrame(animate);
  }

  resize();
  initParticles();
  animate();
  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
})();

/* ==============================
   HAMBURGER MENU
============================== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ==============================
   NAVBAR SCROLL GLASS EFFECT
============================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, {
  passive: true
});

/* ==============================
   ACTIVE NAV LINK ON SCROLL
============================== */
const sections = document.querySelectorAll('section[id]');
const allLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
      if (active) active.classList.add('active');
    }
  });
}, {
  rootMargin: '-40% 0px -55% 0px'
});

sections.forEach(s => sectionObserver.observe(s));

/* ==============================
   HERO PARALLAX (mouse)
============================== */
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  document.querySelectorAll('#heroVisual .parallax-layer').forEach(layer => {
    const speed = parseFloat(layer.dataset.speed) || 0.05;
    const x = dx * speed * 70;
    const y = dy * speed * 70;
    layer.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  });

  const b1 = document.querySelector('.blob1');
  const b2 = document.querySelector('.blob2');
  if (b1) b1.style.transform = 'translate(' + (dx * 18) + 'px, ' + (dy * 18) + 'px)';
  if (b2) b2.style.transform = 'translate(' + (-dx * 22) + 'px, ' + (-dy * 22) + 'px)';
});

/* ==============================
   PORTFOLIO PLANES PARALLAX
============================== */
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  document.querySelectorAll('.plane').forEach(plane => {
    const speed = parseFloat(plane.dataset.speed) || 0.05;
    const x = dx * speed * 55;
    const y = dy * speed * 55;
    const baseRot = getComputedStyle(plane).getPropertyValue('--r') || '0deg';
    plane.style.transform = 'rotate(' + baseRot + ') translate(' + x + 'px, ' + y + 'px)';
  });
});

/* ==============================
   BLOG CAROUSEL
============================== */
(function () {
  const carousel = document.getElementById('blogCarousel');
  const viewport = document.querySelector('.blog-carousel-viewport');
  const btnPrev = document.getElementById('blogPrev');
  const btnNext = document.getElementById('blogNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (!carousel || !viewport) return;

  let currentIndex = 0;
  let autoInterval;

  function getPerPage() {
    return window.innerWidth <= 600 ? 1 : 2;
  }

  function getCards() {
    return Array.from(carousel.querySelectorAll('.blog-card'));
  }

  function getGap() {
    return window.innerWidth <= 600 ? 14 : 20;
  }

  function updateLayout(callback) {
    requestAnimationFrame(() => {
      const perPage = getPerPage();
      const gap = getGap();
      const viewportWidth = viewport.clientWidth;
      const cardWidth = (viewportWidth - gap * (perPage - 1)) / perPage;

      getCards().forEach(card => {
        card.style.flex = '0 0 ' + cardWidth + 'px';
        card.style.width = cardWidth + 'px';
      });

      carousel.style.gap = gap + 'px';

      if (callback) callback();
    });
  }

  function getTotalPages() {
    return Math.ceil(getCards().length / getPerPage());
  }

  function renderDots() {
    dotsContainer.innerHTML = '';
    const total = getTotalPages();
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot-item' + (i === currentIndex ? ' active' : '');
      dot.onclick = () => {
        clearInterval(autoInterval);
        goTo(i);
        startAuto();
      };
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    const total = getTotalPages();
    currentIndex = Math.max(0, Math.min(index, total - 1));

    const gap = getGap();
    const cards = getCards();
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth;
    const perPage = getPerPage();
    const offset = currentIndex * perPage * (cardWidth + gap);

    carousel.style.transform = 'translateX(-' + offset + 'px)';

    document.querySelectorAll('.dot-item').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    if (btnPrev) btnPrev.disabled = (currentIndex === 0);
    if (btnNext) btnNext.disabled = (currentIndex >= total - 1);
  }

  function next() {
    const total = getTotalPages();
    goTo(currentIndex + 1 >= total ? 0 : currentIndex + 1);
  }

  function prev() {
    const total = getTotalPages();
    goTo(currentIndex - 1 < 0 ? total - 1 : currentIndex - 1);
  }

  function startAuto() {
    clearInterval(autoInterval);
    autoInterval = setInterval(next, 4500);
  }

  function init() {
    currentIndex = 0;
    updateLayout(() => {
      renderDots();
      goTo(0);
    });
  }

  if (btnNext) btnNext.addEventListener('click', () => {
    clearInterval(autoInterval);
    next();
    startAuto();
  });

  if (btnPrev) btnPrev.addEventListener('click', () => {
    clearInterval(autoInterval);
    prev();
    startAuto();
  });

  // Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, {
    passive: true
  });

  viewport.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      clearInterval(autoInterval);
      if (diff > 0) next();
      else prev();
      startAuto();
    }
  }, {
    passive: true
  });

  window.addEventListener('resize', init);
  window.addEventListener('load', () => {
    init();
    startAuto();
  });

  init();
})();

/* ==============================
   SCROLL FADE IN
============================== */
const fadeEls = document.querySelectorAll('.layanan-card, .porto-card, .kontak-box');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

/* ==============================
   CONTACT FORM → WHATSAPP
============================== */
(function () {
  const btnKirim = document.getElementById('btnKirim');
  if (!btnKirim) return;

  // ⚠️ GANTI dengan nomor WhatsApp kamu (format internasional tanpa + atau 0 di depan)
  // Contoh: nomor 08123456789 → 628123456789
  const WA_NUMBER = '628211841836';

  btnKirim.addEventListener('click', () => {
    const nama = (document.getElementById('inputNama') ? document.getElementById('inputNama').value : '').trim();
    const email = (document.getElementById('inputEmail') ? document.getElementById('inputEmail').value : '').trim();
    const telp = (document.getElementById('inputTelp') ? document.getElementById('inputTelp').value : '').trim();
    const pesan = (document.getElementById('inputPesan') ? document.getElementById('inputPesan').value : '').trim();

    // Validasi field wajib
    if (!nama) {
      alert('Nama wajib diisi!');
      document.getElementById('inputNama').focus();
      return;
    }
    if (!email) {
      alert('Email wajib diisi!');
      document.getElementById('inputEmail').focus();
      return;
    }
    if (!pesan) {
      alert('Pesan wajib diisi!');
      document.getElementById('inputPesan').focus();
      return;
    }

    // Susun pesan WA otomatis
    const msg =
      `Halo Avenixa Labs! 👋\n\n` +
      `Saya ingin menghubungi kalian.\n\n` +
      `*Nama:* ${nama}\n` +
      `*Email:* ${email}\n` +
      (telp ? `*No. Telp:* ${telp}\n` : '') +
      `\n*Pesan:*\n${pesan}\n\n` +
      `Terima kasih! 🙏`;

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

    // Feedback visual
    btnKirim.textContent = 'Membuka WhatsApp... ✓';
    btnKirim.style.background = '#22c55e';
    btnKirim.style.color = '#fff';

    setTimeout(() => {
      window.open(waUrl, '_blank');
      btnKirim.textContent = 'Kirim';
      btnKirim.style.background = '';
      btnKirim.style.color = '';
    }, 600);
  });
})();

/* ==============================
   HERO TYPEWRITER
============================== */
const typewriter = document.getElementById("typewriter");

if (typewriter) {
  const text = "AVENIXA LABS TECH.";
  let i = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!isDeleting) {
      typewriter.textContent = text.substring(0, i + 1);
      i++;
      if (i === text.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2500);
        return;
      }
      setTimeout(typeEffect, 100);
    } else {
      typewriter.textContent = text.substring(0, i - 1);
      i--;
      if (i === 0) {
        isDeleting = false;
        setTimeout(typeEffect, 500);
        return;
      }
      setTimeout(typeEffect, 40);
    }
  }

  typeEffect();
}

// ===== PORTO SHOW MORE / LESS =====
const portoCards = document.querySelectorAll('.porto-card');
const btnPortoMore = document.getElementById('btnPortoMore');
const PORTO_DEFAULT = 6;

function initPorto() {
  if (!btnPortoMore) return;
  if (portoCards.length <= PORTO_DEFAULT) {
    btnPortoMore.parentElement.style.display = 'none';
    return;
  }
  portoCards.forEach((card, i) => {
    if (i >= PORTO_DEFAULT) card.style.display = 'none';
  });
}

if (btnPortoMore) {
  btnPortoMore.addEventListener('click', () => {
    const isExpanded = btnPortoMore.dataset.expanded === 'true';
    if (!isExpanded) {
      portoCards.forEach(card => card.style.display = '');
      btnPortoMore.textContent = 'Tampilkan Lebih Sedikit ↑';
      btnPortoMore.dataset.expanded = 'true';
    } else {
      portoCards.forEach((card, i) => {
        if (i >= PORTO_DEFAULT) card.style.display = 'none';
      });
      btnPortoMore.textContent = 'Tampilkan Lebih Banyak ↓';
      btnPortoMore.dataset.expanded = 'false';
      document.getElementById('portofolio').scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
}

initPorto();

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}