/* ═══════════════════════════════════════════════════════════
   main.js — Portfolio Antony Aquino
═══════════════════════════════════════════════════════════ */


/* ───────────────────────────────────────────
   1. NAV — scroll sólido + menú móvil
_______________________________________________ */
const navMain   = document.getElementById('navMain');
const burgerBtn = document.getElementById('burgerBtn');
const mobMenu   = document.getElementById('mobMenu');

window.addEventListener('scroll', () => {
  navMain.classList.toggle('scrolled', window.scrollY > 60);
});

if (burgerBtn) {
  burgerBtn.addEventListener('click', () => mobMenu.classList.toggle('open'));
}

mobMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobMenu.classList.remove('open'));
});

const contactEmail = 'antonyaquino444@gmail.com';
const gmailComposeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=antonyaquino444%40gmail.com&su=Contacto%20desde%20portafolio';

document.querySelectorAll(`a[href^="mailto:${contactEmail}"]`).forEach(link => {
  link.href = gmailComposeUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `Redactar correo para ${contactEmail}`);
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


/* -------------------------------------------
   2.1 CONOCIMIENTOS TECNICOS INTERACTIVOS
_______________________________________________ */
const techDetails = {
  'soporte': {
    kicker: 'Soporte Técnico / IT Support',
    title: 'Soporte Técnico',
    copy: 'Experiencia en soporte técnico a nivel de usuario y mantenimiento de equipos de cómputo, con enfoque en la resolución de incidencias, optimización y funcionamiento correcto de sistemas.',
    points: [
      'Mantenimiento preventivo y correctivo de computadoras (limpieza interna de hardware, revisión de componentes y diagnóstico básico de fallas).',
      'Ensamblaje y desensamblaje de equipos de cómputo.',
      'Instalación, configuración y actualización de sistemas operativos Windows y software de uso común.',
      'Resolución de incidencias en sistemas operativos y aplicaciones.',
      'Validación del correcto funcionamiento de aplicaciones y servicios en equipos de usuario.',
      'Soporte remoto con Quick Assist, herramientas de Help Desk y asistencia técnica básica.',
      'Documentación de incidencias, reportes técnicos y comunicación efectiva con usuarios.'
    ],
    tags: ['Windows', 'Quick Assist', 'Help Desk', 'Hardware', 'Mantenimiento']
  },
  'redes': {
    kicker: 'Redes y Conectividad',
    title: 'Redes y Conectividad',
    copy: 'Conocimientos en instalación, configuración y diagnóstico básico de redes informáticas, enfocados en la conectividad y resolución de incidencias.',
    points: [
      'Configuración básica de routers, switches y repetidores de señal.',
      'Conocimientos de direccionamiento IP, subredes y conectividad de red.',
      'Diagnóstico de problemas de red mediante Ping, Tracert e Ipconfig.',
      'Configuración y verificación de servicios DNS.',
      'Instalación y organización de cableado de red estructurado.',
      'Conocimiento de redes LAN, WAN y WLAN.',
      'Identificación y resolución básica de problemas de conectividad.',
      'Aplicación de buenas prácticas para mantener la estabilidad y disponibilidad de la red.'
    ],
    tags: ['LAN', 'WAN', 'WLAN', 'DNS', 'TCP-IP', 'Routers', 'Switches']
  },
  'mysql': {
    kicker: 'Bases de Datos',
    title: 'Bases de Datos',
    copy: 'Experiencia académica en diseño, implementación y administración de bases de datos relacionales.',
    points: [
      'Diseño de bases de datos relacionales: creación de tablas, relaciones y restricciones.',
      'Consultas SQL y operaciones CRUD.',
      'Creación de procedimientos básicos.',
      'Optimización básica de consultas.',
      'Integración de bases de datos con aplicaciones de escritorio.',
      'Respaldo y restauración de bases de datos.'
    ],
    tags: ['MySQL', 'MySQL Workbench', 'XAMPP', 'Lucidchart', 'SQL']
  },
  'backend': {
    kicker: 'Desarrollo Backend',
    title: 'Desarrollo Backend',
    copy: 'Desarrollo de lógica de negocio y aplicaciones de escritorio utilizando tecnologías Microsoft.',
    points: [
      'Desarrollo de aplicaciones de escritorio con Windows Forms.',
      'Implementación de lógica de negocio.',
      'Integración con bases de datos MySQL.',
      'Gestión de operaciones CRUD.',
      'Validación de datos y manejo de eventos y formularios.',
      'Depuración y corrección de errores.',
      'Mantenimiento y mejora de aplicaciones existentes.'
    ],
    tags: ['C#', 'Java', 'C++', '.NET Framework', 'Windows Forms']
  },
  'frontend': {
    kicker: 'Desarrollo Frontend',
    title: 'Desarrollo Frontend',
    copy: 'Desarrollo de interfaces web enfocadas en experiencia de usuario y presentación visual.',
    points: [
      'Creación de páginas web responsivas.',
      'Estructuración semántica de contenido.',
      'Diseño de interfaces de usuario.',
      'Adaptación de sitios para diferentes dispositivos.',
      'Maquetación web.',
      'Organización y optimización de estilos.'
    ],
    tags: ['HTML', 'CSS3', 'JavaScript', 'Responsive']
  },
  'herramientas': {
    kicker: 'Herramientas de Desarrollo',
    title: 'Herramientas Dev',
    copy: 'Dominio de herramientas del ecosistema de desarrollo de software para control de versiones, edición de código y gestión de proyectos.',
    points: [
      'Control de versiones con Git.',
      'Gestión de repositorios en GitHub.',
      'Documentación de proyectos.',
      'Organización y seguimiento de cambios en código.'
    ],
    tags: ['Git', 'GitHub', 'Visual Studio', 'VS Code', 'XAMPP', 'MySQL Workbench']
  },
  'ofimatica': {
    kicker: 'Ofimática y Productividad',
    title: 'Ofimática',
    copy: 'Manejo de herramientas ofimáticas para la elaboración de documentos, análisis de información, presentaciones y gestión administrativa.',
    points: [
      'Creación y edición de documentos profesionales.',
      'Elaboración de informes y documentación técnica.',
      'Manejo de hojas de cálculo para organización y análisis de información.',
      'Creación de tablas, fórmulas y funciones básicas en Excel.',
      'Diseño de presentaciones profesionales.',
      'Gestión y organización de archivos digitales.',
      'Uso de herramientas colaborativas en la nube.',
      'Administración básica de correo electrónico corporativo.'
    ],
    tags: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'Google Docs', 'Google Sheets', 'Canva']
  },
  'ciberseguridad': {
    kicker: 'Ciberseguridad',
    title: 'Ciberseguridad',
    copy: 'Conocimientos básicos de seguridad informática enfocados en la protección de sistemas, redes y aplicaciones.',
    points: [
      'Identificación de amenazas comunes: phishing, malware, ransomware e ingeniería social.',
      'Comprensión de conceptos de autenticación y autorización.',
      'Conocimiento de protocolos seguros de comunicación: HTTPS y SSL/TLS.',
      'Conocimiento básico de vulnerabilidades web: SQL Injection y Cross-Site Scripting (XSS).',
      'Aplicación de buenas prácticas de seguridad en sistemas y aplicaciones.',
      'Identificación de riesgos relacionados con el acceso y manejo de información.',
      'Áreas de interés: Ethical Hacking, Pentesting, Análisis de vulnerabilidades.'
    ],
    tags: ['Ethical Hacking', 'Pentesting', 'HTTPS', 'SSL/TLS', 'XSS', 'SQL Injection']
  },
  'ia': {
    kicker: 'Inteligencia Artificial y Automatización',
    title: 'IA y Automatización',
    copy: 'Conocimientos en el uso e integración de herramientas de inteligencia artificial para automatización de procesos, asistencia al desarrollo de software y construcción de soluciones inteligentes.',
    points: [
      'Diseño y optimización de prompts para tareas técnicas y generación de contenido.',
      'Integración de modelos de IA mediante APIs.',
      'Desarrollo de proyectos con asistentes y agentes basados en inteligencia artificial.',
      'Automatización de flujos de trabajo mediante n8n.',
      'Conocimiento de arquitecturas basadas en agentes de IA.',
      'Implementación de conexiones entre aplicaciones y servicios de IA.',
      'Comprensión de conceptos de IA Generativa y Machine Learning.',
      'Creación y configuración de agentes IA con MCP (Model Context Protocol).'
    ],
    tags: ['n8n', 'ChatGPT', 'Gemini', 'Claude', 'Cursor', 'APIs IA', 'MCP']
  },
  'habilidades': {
    kicker: 'Habilidades Profesionales',
    title: 'Habilidades Prof.',
    copy: 'Competencias transversales orientadas al trabajo en equipo, la comunicación y la resolución efectiva de problemas en entornos técnicos y administrativos.',
    points: [
      'Comunicación efectiva.',
      'Resolución de problemas.',
      'Trabajo en equipo.',
      'Aprendizaje autónomo.',
      'Adaptabilidad.',
      'Atención al usuario.',
      'Organización y documentación técnica.'
    ],
    tags: ['Comunicación', 'Trabajo en equipo', 'Resolución de problemas', 'Documentación']
  }
};

function buildDrawerHTML(key) {
  const d = techDetails[key];
  if (!d) return '';
  return `
    <div class="acc-drawer-inner">
      <div class="acc-drawer-kicker">${d.kicker}</div>
      <div class="acc-drawer-copy">${d.copy}</div>
      <ul class="acc-drawer-list">
        ${d.points.map(p => `<li>${p}</li>`).join('')}
      </ul>
      <div class="acc-drawer-tags">
        ${d.tags.map(t => `<span>${t}</span>`).join('')}
      </div>
    </div>
  `;
}

document.querySelectorAll('.acc-btn[data-tech]').forEach(btn => {
  const key    = btn.dataset.tech;
  const item   = btn.closest('.acc-item');
  const drawer = item.querySelector('.acc-drawer[data-drawer="' + key + '"]');

  if (drawer && !drawer.innerHTML.trim()) {
    drawer.innerHTML = buildDrawerHTML(key);
  }

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Cerrar todos
    document.querySelectorAll('.acc-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.acc-btn').setAttribute('aria-expanded', 'false');
      const d = openItem.querySelector('.acc-drawer');
      if (d) d.setAttribute('aria-hidden', 'true');
    });

    // Si estaba cerrado, abrir este
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      if (drawer) drawer.setAttribute('aria-hidden', 'false');
    }
  });

  if (key === 'soporte') {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    if (drawer) drawer.setAttribute('aria-hidden', 'false');
  }
});


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
   4. CARRUSEL 3D DE PROYECTOS (CORREGIDO)
_______________________________________________ */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projCards    = document.querySelectorAll('.proj-card');
const projShowcase = document.getElementById('projShowcase');
const projPrev     = document.getElementById('projPrev');
const projNext     = document.getElementById('projNext');
const projDots     = document.getElementById('projDots');
const projCarousel = document.getElementById('projCarousel');

let projActiveIndex = 0;
let projAutoTimer   = null;
let projAutoPaused  = false;

function projCardMatchesCat(card, cat) {
  if (cat === 'all') return true;
  return (card.dataset.cat || '').split(/\s+/).includes(cat);
}

function getVisibleProjCards() {
  return [...document.querySelectorAll('.proj-card:not(.hidden)')];
}

function updateProjCarousel() {
  const visible = getVisibleProjCards();
  if (!visible.length) return;

  if (projActiveIndex >= visible.length) projActiveIndex = 0;
  if (projActiveIndex < 0) projActiveIndex = visible.length - 1;

  projCards.forEach(card => {
    const idx = visible.indexOf(card);
    if (idx === -1) {
      card.dataset.offset = '99';
      return;
    }
    card.dataset.offset = String(idx - projActiveIndex);
  });

  if (projPrev) projPrev.disabled = visible.length <= 1;
  if (projNext) projNext.disabled = visible.length <= 1;

  if (projDots) {
    projDots.innerHTML = '';
    visible.forEach((card, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'proj-dot' + (i === projActiveIndex ? ' active' : '');
      dot.setAttribute('aria-label', card.querySelector('.proj-name')?.textContent || `Proyecto ${i + 1}`);
      dot.addEventListener('click', () => {
        projActiveIndex = i;
        updateProjCarousel();
        resetProjAuto();
      });
      projDots.appendChild(dot);
    });
  }
}

function goProj(dir) {
  const visible = getVisibleProjCards();
  if (!visible.length) return;
  projActiveIndex = (projActiveIndex + dir + visible.length) % visible.length;
  updateProjCarousel();
  resetProjAuto();
}

function resetProjAuto() {
  clearInterval(projAutoTimer);
  if (projAutoPaused) return;
  projAutoTimer = setInterval(() => {
    if (!projAutoPaused) goProj(1);
  }, 5500);
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;
    projCards.forEach(card => {
      card.classList.toggle('hidden', !projCardMatchesCat(card, cat));
    });

    projActiveIndex = 0;
    updateProjCarousel();
    resetProjAuto();
  });
});

projCards.forEach(card => {
  card.addEventListener('click', () => {
    if (card.dataset.offset !== '0') {
      const visible = getVisibleProjCards();
      const idx = visible.indexOf(card);
      if (idx !== -1) {
        projActiveIndex = idx;
        updateProjCarousel();
        resetProjAuto();
      }
      return;
    }
    if (card.dataset.href) window.open(card.dataset.href, '_blank');
  });
});

if (projPrev) projPrev.addEventListener('click', () => goProj(-1));
if (projNext) projNext.addEventListener('click', () => goProj(1));

if (projShowcase) {
  projShowcase.addEventListener('mouseenter', () => { projAutoPaused = true; clearInterval(projAutoTimer); });
  projShowcase.addEventListener('mouseleave', () => { projAutoPaused = false; resetProjAuto(); });

  document.addEventListener('keydown', e => {
    if (!projShowcase.matches(':hover')) return;
    if (e.key === 'ArrowLeft')  goProj(-1);
    if (e.key === 'ArrowRight') goProj(1);
  });

  let touchStartX = 0;
  projCarousel?.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  projCarousel?.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) goProj(diff > 0 ? -1 : 1);
  }, { passive: true });

  /* FIX: doble rAF para asegurar que el DOM esté listo antes del primer render */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      updateProjCarousel();
      resetProjAuto();
    });
  });
}


/* ───────────────────────────────────────────
   5. NAV ACTIVO AL HACER SCROLL
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
   6. PARTÍCULAS FLOTANTES AMBIENTALES
_______________________________________________ */
function initAmbientParticles() {
  const ids = ['sobre', 'skills', 'experiencia', 'estudios', 'contacto'];
  ids.forEach(id => {
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
      const count = Math.floor(W / 120);
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

    function draw() {
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

window.addEventListener('load', initAmbientParticles);


/* ───────────────────────────────────────────
   7. FADE-IN GENERAL DE SECCIONES
_______________________________________________ */
const sectionFadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('sec-visible');
      sectionFadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.s-eyebrow, .s-title, .sobre-grid, .skills-grid, .skills-panel, .timeline, .know-block, .proj-showcase, .edu-grid, .certs-grid, .contact-grid'
).forEach(el => {
  el.classList.add('sec-fade');
  sectionFadeObserver.observe(el);
});


/* ───────────────────────────────────────────
   8. TILT 3D — tarjetas interactivas
_______________________________________________ */
function initTilt3D(selector, opts = {}) {
  const maxTilt = opts.maxTilt ?? 12;
  const scale   = opts.scale   ?? 1.02;
  const glare   = opts.glare   ?? false;

  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('tilt-3d');

    if (glare && !el.querySelector('.tilt-glare')) {
      const glareEl = document.createElement('div');
      glareEl.className = 'tilt-glare';
      glareEl.setAttribute('aria-hidden', 'true');
      el.appendChild(glareEl);
    }

    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      const rotX = -y * maxTilt;
      const rotY =  x * maxTilt;

      el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale}, ${scale}, ${scale}) translateZ(8px)`;

      if (glare) {
        const glareEl = el.querySelector('.tilt-glare');
        if (glareEl) {
          glareEl.style.opacity = '1';
          glareEl.style.background = `radial-gradient(circle at ${((x + 0.5) * 100).toFixed(1)}% ${((y + 0.5) * 100).toFixed(1)}%, rgba(201,169,110,0.18) 0%, transparent 65%)`;
        }
      }
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      const glareEl = el.querySelector('.tilt-glare');
      if (glareEl) glareEl.style.opacity = '0';
    });
  });
}

initTilt3D('.sk-card',       { maxTilt: 10, scale: 1.03, glare: true });
initTilt3D('.stat-box',      { maxTilt: 14, scale: 1.04 });
initTilt3D('.edu-card',      { maxTilt: 8,  scale: 1.02 });
initTilt3D('.cert-card',     { maxTilt: 10, scale: 1.02 });
initTilt3D('.contact-card',  { maxTilt: 8,  scale: 1.01 });
initTilt3D('.info-card',     { maxTilt: 6,  scale: 1.01 });
initTilt3D('.lang-card',     { maxTilt: 6,  scale: 1.01 });
initTilt3D('.form-wrap',     { maxTilt: 5,  scale: 1.005 });
initTilt3D('.tl-body',       { maxTilt: 5,  scale: 1.01 });


/* ───────────────────────────────────────────
   9. HERO — parallax 3D con el cursor
_______________________________________________ */
const heroSection = document.getElementById('hero-new');
const hero3dScene = document.getElementById('hero3dScene');
const heroTitle   = document.getElementById('heroTitle');

if (heroSection && window.matchMedia('(pointer: fine)').matches) {
  heroSection.addEventListener('mousemove', e => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;

    if (hero3dScene) {
      hero3dScene.style.transform = `
        rotateX(${y * -6}deg) rotateY(${x * 8}deg) translateZ(0)
      `;
    }

    if (heroTitle) {
      const layer = heroTitle.querySelector('.h1-layer');
      if (layer) {
        layer.style.transform = `
          translateX(${x * 18}px) translateY(${y * 10}px) translateZ(30px)
          rotateX(${y * -3}deg) rotateY(${x * 4}deg)
        `;
      }
    }
  });

  heroSection.addEventListener('mouseleave', () => {
    if (hero3dScene) hero3dScene.style.transform = '';
    if (heroTitle) {
      const layer = heroTitle.querySelector('.h1-layer');
      if (layer) layer.style.transform = '';
    }
  });
}


/* ───────────────────────────────────────────
   10. BRILLO DORADO EN TÍTULOS DE SECCIÓN
_______________________________________________ */
document.querySelectorAll('.s-title em').forEach(em => {
  em.style.background = 'linear-gradient(90deg, var(--gold-light), #fff5e0, var(--gold-light), var(--gold))';
  em.style.backgroundSize = '300% auto';
  em.style.webkitBackgroundClip = 'text';
  em.style.webkitTextFillColor = 'transparent';
  em.style.backgroundClip = 'text';
  em.style.animation = 'shimmerGold 6s linear infinite';
});
