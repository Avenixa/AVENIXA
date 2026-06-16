/* ==============================
   LOADING SCREEN
============================== */
window.addEventListener('load', function () {
  var loader = document.getElementById('loadingScreen');
  if (!loader) return;
  setTimeout(function () {
    loader.classList.add('hide');
    setTimeout(function () {
      loader.remove();
    }, 500);
  }, 1900);
});

// Fallback: paksa hide setelah 4 detik
setTimeout(function () {
  var loader = document.getElementById('loadingScreen');
  if (loader && !loader.classList.contains('hide')) {
    loader.classList.add('hide');
    setTimeout(function () {
      loader.remove();
    }, 500);
  }
}, 4000);

/* ==============================
   PARTICLE BACKGROUND
============================== */
(function () {
  var canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, particles = [];
  var COUNT = 55;

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
      color: ['#3b82f6', '#60a5fa', '#93c5fd', '#1e40af', '#bfdbfe'][Math.floor(Math.random() * 5)]
    };
  }

  function initParticles() {
    particles = [];
    for (var i = 0; i < COUNT; i++) particles.push(createParticle());
  }

  function drawLines() {
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(59, 130, 246, ' + (0.12 * (1 - dist / 140)) + ')';
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
    particles.forEach(function (p) {
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
  window.addEventListener('resize', function () {
    resize();
    initParticles();
  });
})();

/* ==============================
   HAMBURGER MENU
============================== */
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ==============================
   NAVBAR SCROLL GLASS EFFECT
============================== */
var navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, {
    passive: true
  });
}
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