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

  // Animated Number Counters (Metric Highlights)
  initCounterAnimation();

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
   3. Hero Image Carousel (Interactive, Robust, Touch & Auto-play)
   ========================================================================== */
function initHeroCarousel() {
  window.s26Carousel = {
    next: () => {},
    prev: () => {},
    goTo: () => {},
    stop: () => {},
    play: () => {}
  };

  const container = document.getElementById('hero-carousel-container');
  if (!container) return;

  const track = document.getElementById('carousel-track') || container.querySelector('.relative.overflow-hidden');
  const slides = container.querySelectorAll('.hero-slide');
  const dots = container.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const counterEl = document.getElementById('carousel-counter');

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

    // Update slides visibility and inline styling for 100% reliable transitions
    slides.forEach((slide, i) => {
      const isActive = i === currentIndex;
      slide.classList.toggle('active', isActive);
      slide.style.opacity = isActive ? '1' : '0';
      slide.style.visibility = isActive ? 'visible' : 'hidden';
      slide.style.pointerEvents = isActive ? 'auto' : 'none';
      slide.style.zIndex = isActive ? '10' : '1';
    });

    // Update dots indicators
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.className = 'carousel-dot h-2.5 w-6 rounded-full bg-cyan-400 transition-all cursor-pointer';
      } else {
        dot.className = 'carousel-dot h-2.5 w-2.5 rounded-full bg-slate-600 hover:bg-slate-400 transition-all cursor-pointer';
      }
    });

    // Update numeric counter (e.g. 01 / 04)
    if (counterEl) {
      counterEl.textContent = `0${currentIndex + 1} / 0${slides.length}`;
    }
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

  // Expose globally so inline onclick or external calls always work
  window.s26Carousel = {
    next: () => {
      nextSlide();
      startAutoPlay();
    },
    prev: () => {
      prevSlide();
      startAutoPlay();
    },
    goTo: (idx) => {
      updateSlide(idx);
      startAutoPlay();
    },
    stop: stopAutoPlay,
    play: startAutoPlay
  };

  // Button listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      window.s26Carousel.prev();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      window.s26Carousel.next();
    });
  }

  // Dots listeners
  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      window.s26Carousel.goTo(i);
    });
  });

  // Slide track click listener: clicking on the slide advances to next
  if (track) {
    track.addEventListener('click', (e) => {
      // Ignore if user clicked on prev/next button or indicator dots
      if (e.target.closest('#carousel-prev') || e.target.closest('#carousel-next') || e.target.closest('.carousel-dot')) {
        return;
      }
      window.s26Carousel.next();
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    track.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchStartX = e.changedTouches[0].screenX;
      }
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            window.s26Carousel.next();
          } else {
            window.s26Carousel.prev();
          }
        }
      }
    }, { passive: true });
  }

  // Pause auto-play when hovering the carousel
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);

  // Keyboard navigation when container is focused
  container.setAttribute('tabindex', '0');
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      window.s26Carousel.next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      window.s26Carousel.prev();
    }
  });

  // Initialize
  updateSlide(0);
  startAutoPlay();
}

/* ==========================================================================
   3.1. Animated Number Counters (Metric Highlights)
   ========================================================================== */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter-number');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const start = parseInt(el.getAttribute('data-start'), 10) || 1;
    const duration = 1800; // ms
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeProgress);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  let animated = false;
  function triggerCounters() {
    if (animated) return;
    animated = true;
    counters.forEach(animateCounter);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.15 });

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      observer.observe(heroSection);
    } else {
      triggerCounters();
    }
  } else {
    triggerCounters();
  }
}

/* ==========================================================================
   3.2. Terminal Mockup Live Stream Simulation
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
