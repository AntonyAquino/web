/* ================================================================
   main.js — Portfolio de Steven Herrarte
   ================================================================
   Este archivo controla:
   1. Menú hamburguesa en móvil
   2. Animación de las barras de habilidades al hacer scroll
   3. Animación de la línea de tiempo al hacer scroll
   4. Botón "Enviar mensaje" del formulario de contacto
   5. Cierre del menú móvil al hacer clic en un enlace

   ⚠️ SOLO necesitas editar la sección de FORMULARIO DE CONTACTO
   (marcada con 👇) para poner tu correo real.
================================================================ */

/* ================================================================
   1. MENÚ HAMBURGUESA (móvil)
   No necesitas editar esto.
================================================================ */
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

/* ================================================================
   2. ANIMACIÓN DE BARRAS DE HABILIDADES
   Las barras empiezan en 0 y se animan cuando entran en pantalla.
   No necesitas editar esto.
================================================================ */
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

/* ================================================================
   3. ANIMACIÓN DE LA LÍNEA DE TIEMPO (Experiencia)
   Los items aparecen desde abajo al hacer scroll.
   No necesitas editar esto.
================================================================ */
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

/* ================================================================
   4. FORMULARIO DE CONTACTO
   Al hacer clic en "Enviar mensaje" se abre el cliente de correo
   (Gmail, Outlook, etc.) con los datos del formulario pre-llenados.

   👉 CAMBIA AQUÍ TU CORREO ELECTRÓNICO:
================================================================ */
const TU_CORREO = 'antonyaquino444@gmail.com'; // 👈 PON TU CORREO AQUÍ

emailjs.init('TU_PUBLIC_KEY'); // 👈 la encuentras en EmailJS > Account

document.getElementById('sendBtn').addEventListener('click', () => {
  const nombre  = document.getElementById('formName').value.trim();
  const email   = document.getElementById('formEmail').value.trim();
  const mensaje = document.getElementById('formMessage').value.trim();

  if (!nombre || !email || !mensaje) {
    showToast('Completa todos los campos.', 'error');
    return;
  }

  emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', {
    from_name:    nombre,
    from_email:   email,
    message:      mensaje,
  })
  .then(() => showToast('¡Mensaje enviado!', 'success'))
  .catch(() => showToast('Error al enviar. Intenta de nuevo.', 'error'));
});
    

    // Crea el mailto con los datos del formulario
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

/* ================================================================
   5. FUNCIÓN AUXILIAR — Toast de notificación
   Muestra un mensaje pequeño en pantalla.
   No necesitas editar esto.
================================================================ */
function showToast(text, type = 'success') {
  // Elimina toasts anteriores si existen
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

  // Inyecta la animación si no existe
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

  // Lo elimina después de 3 segundos
  setTimeout(() => {
    toast.style.animation = 'toastOut .3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ================================================================
   6. SCROLL SUAVE PARA NAVEGACIÓN ACTIVA
   Resalta el link del nav según la sección visible.
   No necesitas editar esto.
================================================================ */
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