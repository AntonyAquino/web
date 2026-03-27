
const burger     = document.querySelector('.nav-burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Cierra el menú al hacer clic en cualquier enlace
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}


const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.skill-bar-fill');
      if (fill) {
        // Toma el ancho definido en el style del HTML y lo aplica
        const targetWidth = fill.style.width;
        fill.style.width = '0';
        requestAnimationFrame(() => {
          setTimeout(() => { fill.style.width = targetWidth; }, 100);
        });
      }
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => {
  skillObserver.observe(card);
});


const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Agrega un pequeño delay escalonado por posición
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 150);
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach(item => {
  timelineObserver.observe(item);
});


const TU_CORREO = 'antonyaquino444@gmail.com'; // 👈 PON TU CORREO AQUÍ

const sendBtn    = document.getElementById('sendBtn');
const formName   = document.getElementById('formName');
const formEmail  = document.getElementById('formEmail');
const formMsg    = document.getElementById('formMessage');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name    = formName  ? formName.value.trim()  : '';
    const email   = formEmail ? formEmail.value.trim() : '';
    const message = formMsg   ? formMsg.value.trim()   : '';

    // Validación básica
    if (!name || !email || !message) {
      // Resalta campos vacíos
      [formName, formEmail, formMsg].forEach(field => {
        if (field && !field.value.trim()) {
          field.style.borderColor = '#ff4444';
          field.addEventListener('input', () => {
            field.style.borderColor = 'var(--border)';
          }, { once: true });
        }
      });
      showToast('Por favor completa todos los campos.', 'error');
      return;
    }

  
    const subject = encodeURIComponent(`Contacto desde tu portafolio — ${name}`);
    const body    = encodeURIComponent(
      `Hola Steven,\n\nMi nombre es ${name}.\nMi correo de respuesta: ${email}\n\n${message}\n\n— Enviado desde tu portafolio web`
    );

    window.location.href = `mailto:${TU_CORREO}?subject=${subject}&body=${body}`;

    // Limpia el formulario
    if (formName)  formName.value  = '';
    if (formEmail) formEmail.value = '';
    if (formMsg)   formMsg.value   = '';

    showToast('¡Abriendo tu cliente de correo!', 'success');
  });
}


function showToast(text, type = 'success') {

  const existing = document.querySelector('.toast-msg');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.textContent = text;

  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '2rem',
    right:        '2rem',
    background:   type === 'success' ? 'var(--accent)' : '#ff4444',
    color:        '#080b0f',
    fontFamily:   'var(--mono)',
    fontSize:     '.8rem',
    fontWeight:   '700',
    padding:      '.75rem 1.5rem',
    borderRadius: '6px',
    zIndex:       '9999',
    boxShadow:    '0 8px 24px rgba(0,0,0,.4)',
    animation:    'toastIn .3s ease',
    letterSpacing:'.05em',
  });


  if (!document.getElementById('toastStyle')) {
    const style = document.createElement('style');
    style.id = 'toastStyle';
    style.textContent = `
      @keyframes toastIn  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
      @keyframes toastOut { from { opacity:1; } to { opacity:0; transform:translateY(8px); } }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut .3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--accent)'
          : 'var(--muted)';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));