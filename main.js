/* ═══════════════════════════════════════════════════════════
   main.js — Portfolio Steven Herrarte
═══════════════════════════════════════════════════════════ */


/* ───────────────────────────────────────────
   1. NAV — scroll sólido + menú móvil
_______________________________________________ */
const navMain  = document.getElementById('navMain');
const burgerBtn = document.getElementById('burgerBtn');
const mobMenu  = document.getElementById('mobMenu');

window.addEventListener('scroll', () => {
  navMain.classList.toggle('scrolled', window.scrollY > 60);
});

if (burgerBtn) {
  burgerBtn.addEventListener('click', () => mobMenu.classList.toggle('open'));
}

mobMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobMenu.classList.remove('open'));
});


/* ───────────────────────────────────────────
   2. BARRAS DE SKILLS — animar al entrar en vista
_______________________________________________ */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const bar = entry.target.querySelector('.sk-bar-fill');
    if (bar) {
      const targetWidth = bar.dataset.w + '%';
      bar.style.width = '0';
      requestAnimationFrame(() => {
        setTimeout(() => { bar.style.width = targetWidth; }, 80);
      });
    }
    skillObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.sk-card').forEach(card => skillObserver.observe(card));


/* ───────────────────────────────────────────
   3. TIMELINE — fade-in escalonado
_______________________________________________ */
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (!entry.isIntersecting) return;
    setTimeout(() => entry.target.classList.add('visible'), index * 200);
    timelineObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.tl-item').forEach(item => timelineObserver.observe(item));


/* ───────────────────────────────────────────
   4. FILTRO DE PROYECTOS
_______________________________________________ */
const filterBtns = document.querySelectorAll('.filter-btn');
const projCards  = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;
    projCards.forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      if (show) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeCardIn .35s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


/* ───────────────────────────────────────────
   5. CLIC EN TARJETA → ABRIR GITHUB
_______________________________________________ */
projCards.forEach(card => {
  card.addEventListener('click', () => {
    if (card.dataset.href) window.open(card.dataset.href, '_blank');
  });
});


/* ───────────────────────────────────────────
   6. NAV ACTIVO AL HACER SCROLL
_______________________________________________ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));


/* ───────────────────────────────────────────
   7. PARTÍCULAS FLOTANTES AMBIENTALES
   Canvas ligero solo con ~18 puntos dorados
_______________________________________________ */
function initAmbientParticles() {
  const sections = ['sobre', 'skills', 'experiencia', 'estudios', 'contacto'];
  sections.forEach(id => {
    const sec = document.getElementById(id);
    if (!sec) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position:absolute;top:0;left:0;width:100%;height:100%;
      pointer-events:none;z-index:0;opacity:0.55;
    `;
    sec.style.position = 'relative';
    sec.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let W, H, particles;

    function resize() {
      W = canvas.width  = sec.offsetWidth;
      H = canvas.height = sec.offsetHeight;
    }

    function initParticles() {
      const count = Math.floor(W / 120); // ~10–12 puntos
      particles = Array.from({ length: count }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        r:  Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.14,
        o:  Math.random() * 0.5 + 0.15,
        pulse: Math.random() * Math.PI * 2
      }));
    }

    function draw(ts) {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.pulse += 0.008;
        const alpha = p.o + Math.sin(p.pulse) * 0.18;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${alpha.toFixed(3)})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });
      requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    requestAnimationFrame(draw);
    window.addEventListener('resize', () => { resize(); initParticles(); });
  });
}

// Iniciar partículas después del load
window.addEventListener('load', initAmbientParticles);


/* ───────────────────────────────────────────
   8. FADE-IN GENERAL DE SECCIONES
_______________________________________________ */
const sectionFadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('sec-visible');
      sectionFadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.s-eyebrow, .s-title, .sobre-grid, .skills-grid, .timeline, .proj-grid, .edu-grid, .certs-grid, .contact-grid').forEach(el => {
  el.classList.add('sec-fade');
  sectionFadeObserver.observe(el);
});