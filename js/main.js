/**
 * S26Digital - Master JavaScript Engine
 * Modern Interactive Behaviors, Smooth Scrolling, Form Validation & Tech Canvas
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Mobile Menu Toggle
  initMobileMenu();

  // Hero Tech Background Canvas
  initNetworkCanvas();

  // Hero Solution Carousel
  initHeroCarousel();

  // Terminal Live Simulation (if present)
  initTerminalSimulation();

  // Interactive Modals
  initConsultationModal();

  // Form Handling & Validation
  initContactForm();

  // Smooth Scroll & Active Nav Highlights
  initScrollSpy();

  // Interactive Solution Explorer & Tabs
  initSolutionHighlights();
});

/* ==========================================================================
   1. Mobile Menu Functionality
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    
    // Toggle menu icon
    const icon = menuBtn.querySelector('i');
    if (icon) {
      if (mobileMenu.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
      } else {
        icon.setAttribute('data-lucide', 'x');
      }
      if (window.lucide) window.lucide.createIcons();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', 'menu');
        if (window.lucide) window.lucide.createIcons();
      }
    });
  });
}

/* ==========================================================================
   2. Interactive Network / Cyber Canvas (Hero Section)
   ========================================================================== */
function initNetworkCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  const particleCount = Math.min(Math.floor(window.innerWidth / 22), 65);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Interactive mouse point
  let mouse = { x: null, y: null, maxDist: 140 };
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect with other particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const alpha = (1 - dist / 110) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Connect with mouse
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.maxDist) {
          const mAlpha = (1 - mdist / mouse.maxDist) * 0.4;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${mAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. Hero Image Carousel (Accessible, Auto-play & Touch/Click Friendly)
   ========================================================================== */
function initHeroCarousel() {
  const container = document.getElementById('hero-carousel-container');
  if (!container) return;

  const slides = container.querySelectorAll('.hero-slide');
  const dots = container.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoPlayTimer = null;
  const intervalMs = 5000;

  function updateSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
        slide.classList.add('opacity-100', 'z-10');
      } else {
        slide.classList.remove('opacity-100', 'z-10');
        slide.classList.add('opacity-0', 'pointer-events-none', 'z-0');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.remove('bg-slate-600');
        dot.classList.add('bg-cyan-400', 'scale-125');
      } else {
        dot.classList.remove('bg-cyan-400', 'scale-125');
        dot.classList.add('bg-slate-600');
      }
    });
  }

  function nextSlide() {
    updateSlide(currentIndex + 1);
  }

  function prevSlide() {
    updateSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, intervalMs);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      startAutoPlay();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      updateSlide(i);
      startAutoPlay();
    });
  });

  // Pause auto-play when hovering the carousel
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);

  // Initialize first slide and auto-play
  updateSlide(0);
  startAutoPlay();
}

/* ==========================================================================
   3.1. Terminal Mockup Live Stream Simulation
   ========================================================================== */
function initTerminalSimulation() {
  const terminalLogs = document.getElementById('terminal-logs');
  if (!terminalLogs) return;

  const logLines = [
    { text: '✓ [S26-Core] Inicializando clúster Kubernetes v1.30...', color: 'text-slate-400' },
    { text: '✓ [Cloud-Arch] Conectando bases de datos PostgreSQL & SQLite replicas...', color: 'text-cyan-400' },
    { text: '✓ [Security] Protocolo Zero-Trust y certificados SSL TLS 1.3 activos.', color: 'text-emerald-400' },
    { text: '✓ [ETL-Pipeline] Ingesta de métricas y analítica en tiempo real: OK.', color: 'text-slate-300' },
    { text: '✓ [Ecosystem] Microservicios Node.js + Python APIs sincronizados.', color: 'text-cyan-400' },
    { text: '🚀 [Status] Ecosistema S26Digital: 99.99% Uptime garantizado.', color: 'text-emerald-300' }
  ];

  let currentIndex = 0;

  function addLogLine() {
    if (currentIndex >= logLines.length) {
      currentIndex = 0;
      terminalLogs.innerHTML = '';
    }

    const line = logLines[currentIndex];
    const p = document.createElement('p');
    p.className = `font-mono text-xs ${line.color} transition-all duration-300 flex items-center space-x-2`;
    
    const timestamp = new Date().toLocaleTimeString('es-ES', { hour12: false });
    p.innerHTML = `<span class="text-slate-500">[${timestamp}]</span> <span>${line.text}</span>`;
    
    terminalLogs.appendChild(p);
    terminalLogs.scrollTop = terminalLogs.scrollHeight;
    
    currentIndex++;
    setTimeout(addLogLine, 2200);
  }

  setTimeout(addLogLine, 1000);
}

/* ==========================================================================
   4. Consultation Booking Modal
   ========================================================================== */
function initConsultationModal() {
  const openModalBtns = document.querySelectorAll('.open-consultation-btn');
  const modal = document.getElementById('consultation-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal-btn');
  const modalForm = document.getElementById('modal-consultation-form');

  if (!modal) return;

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      
      // Auto-focus first input
      setTimeout(() => {
        const firstInput = modal.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 100);
    });
  });

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = modalForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-900 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Procesando Solicitud...
      `;

      setTimeout(() => {
        modalForm.innerHTML = `
          <div class="text-center py-8">
            <div class="w-16 h-16 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/40">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 class="text-xl font-bold text-white mb-2">¡Consultoría Agendada con Éxito!</h4>
            <p class="text-slate-300 text-sm mb-6">Nuestro equipo de arquitectos de soluciones de S26Digital se comunicará contigo en menos de 24 horas hábiles.</p>
            <button type="button" class="btn-cyan px-6 py-2.5 rounded-lg text-sm close-modal-btn w-full font-bold">Cerrar</button>
          </div>
        `;
        
        const newCloseBtn = modalForm.querySelector('.close-modal-btn');
        if (newCloseBtn) newCloseBtn.addEventListener('click', closeModal);
      }, 1200);
    });
  }
}

/* ==========================================================================
   5. Main Contact & Diagnostics Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('main-contact-form');
  const formSuccess = document.getElementById('form-success-alert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name');
    const company = document.getElementById('form-company');
    const email = document.getElementById('form-email');
    const service = document.getElementById('form-service');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Validation
    if (!name.value.trim() || !company.value.trim() || !email.value.trim() || !service.value) {
      showToast('Por favor completa todos los campos obligatorios.', 'error');
      return;
    }

    if (!validateEmail(email.value.trim())) {
      showToast('Por favor ingresa un correo corporativo válido.', 'error');
      email.focus();
      return;
    }

    // Submission animation
    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="inline-flex items-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Generando Diagnóstico Estratégico...
      </span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;

      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        form.reset();
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      showToast('¡Diagnóstico solicitado! Te contactaremos a la brevedad.', 'success');
    }, 1400);
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/* ==========================================================================
   6. Toast Notifications
   ========================================================================== */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col space-y-3';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const isSuccess = type === 'success';
  const isError = type === 'error';

  toast.className = `px-5 py-3.5 rounded-xl shadow-2xl flex items-center space-x-3 transition-all transform duration-300 translate-y-4 opacity-0 border ${
    isSuccess
      ? 'bg-slate-900 border-cyan-500 text-white'
      : isError
      ? 'bg-slate-900 border-rose-500 text-rose-200'
      : 'bg-slate-900 border-slate-700 text-slate-200'
  }`;

  const iconSvg = isSuccess
    ? `<svg class="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
    : isError
    ? `<svg class="w-5 h-5 text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`
    : `<svg class="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span class="text-sm font-medium">${message}</span>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   7. Scroll Spy & Navbar Blur Transition
   ========================================================================== */
function initScrollSpy() {
  const navbar = document.getElementById('main-navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Navbar background density on scroll
    if (navbar) {
      if (scrollPos > 30) {
        navbar.classList.add('shadow-lg', 'shadow-slate-950/50', 'border-b', 'border-slate-800');
      } else {
        navbar.classList.remove('shadow-lg', 'shadow-slate-950/50');
      }
    }

    // Active link highlighting
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('text-cyan-400');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-cyan-400');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   8. Solution Service Selector Sync
   ========================================================================== */
function initSolutionHighlights() {
  const actionBtns = document.querySelectorAll('.select-service-btn');
  const serviceSelect = document.getElementById('form-service');

  actionBtns.forEach(actionBtn => {
    actionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceValue = actionBtn.getAttribute('data-service-val');
      if (serviceSelect && serviceValue) {
        serviceSelect.value = serviceValue;
      }
      
      const contactSec = document.getElementById('contacto');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
        
        // Highlight selector briefly
        setTimeout(() => {
          if (serviceSelect) {
            serviceSelect.classList.add('ring-2', 'ring-cyan-400');
            serviceSelect.focus();
            setTimeout(() => {
              serviceSelect.classList.remove('ring-2', 'ring-cyan-400');
            }, 1500);
          }
        }, 600);
      }
    });
  });
}
