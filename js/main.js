/**
 * BySoft - Ingeniería de Software y Procesos
 * Descripción: Inicialización general, modo oscuro/claro, menú móvil accesible, carrusel interactivo de clientes y envío de formulario a WhatsApp Business.
 */

/* ==========================================================================
   1. GESTIÓN DE TEMA (DARK / LIGHT) Y NAVEGACIÓN MÓVIL
   ========================================================================== */
function initThemeAndNavigation() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');
  const mobileMenu = document.getElementById('mobile-menu');

  function syncThemeIcon() {
    if (!themeIcon) return;
    const isDark = document.documentElement.classList.contains('dark');
    themeIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      syncThemeIcon();
    });
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', String(!isHidden));
      if (mobileMenuIcon) {
        mobileMenuIcon.textContent = isHidden ? 'menu' : 'close';
      }
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
      });
    });
  }

  syncThemeIcon();
}

/* ==========================================================================
   2. CARRUSEL / SLIDER INTERACTIVO DE CLIENTES CON LOGOS
   ========================================================================== */
function initClientCarousel() {
  const track = document.getElementById('client-carousel-track');
  if (!track) return;

  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const pauseBtn = document.getElementById('slider-pause');
  const pauseIcon = document.getElementById('pause-icon');
  const pauseText = document.getElementById('pause-text');
  const dotsContainer = document.getElementById('slider-dots');

  let currentSlideIndex = 0;
  let isAutoPlaying = true;
  let autoPlayTimer = null;

  function getVisibleCardsCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function getMaxSlideIndex() {
    return Math.max(0, slides.length - getVisibleCardsCount());
  }

  function renderSliderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const maxIdx = getMaxSlideIndex();

    for (let i = 0; i <= maxIdx; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.ariaLabel = `Ver grupo de clientes ${i + 1}`;
      dot.className = `h-2 rounded-full transition-all ${i === currentSlideIndex
        ? 'w-8 bg-sky-500'
        : 'w-2 bg-slate-300 dark:bg-bysoft-800 hover:bg-sky-400'
        }`;
      dot.addEventListener('click', () => {
        currentSlideIndex = i;
        updateSliderPosition();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateSliderPosition() {
    const maxIdx = getMaxSlideIndex();
    if (currentSlideIndex > maxIdx) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = maxIdx;

    const cardWidthPercent = 100 / getVisibleCardsCount();
    track.style.transform = `translateX(-${currentSlideIndex * cardWidthPercent}%)`;
    renderSliderDots();
  }

  function nextSlide() {
    const maxIdx = getMaxSlideIndex();
    currentSlideIndex = currentSlideIndex >= maxIdx ? 0 : currentSlideIndex + 1;
    updateSliderPosition();
  }

  function prevSlide() {
    const maxIdx = getMaxSlideIndex();
    currentSlideIndex = currentSlideIndex <= 0 ? maxIdx : currentSlideIndex - 1;
    updateSliderPosition();
  }

  function startSliderAutoPlay() {
    stopSliderAutoPlay();
    autoPlayTimer = setInterval(() => {
      if (isAutoPlaying) nextSlide();
    }, 4500);
  }

  function stopSliderAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startSliderAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startSliderAutoPlay();
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isAutoPlaying = !isAutoPlaying;
      if (pauseIcon) pauseIcon.textContent = isAutoPlaying ? 'pause' : 'play_arrow';
      if (pauseText) pauseText.textContent = isAutoPlaying ? 'Auto' : 'Pausado';
    });
  }

  window.addEventListener('resize', updateSliderPosition);
  updateSliderPosition();
  startSliderAutoPlay();
}

/* ==========================================================================
   3. FORMULARIO DE CONSULTORÍA Y DIAGNÓSTICO (WHATSAPP BUSINESS)
   ========================================================================== */
function selectServiceInForm(serviceName) {
  const select = document.getElementById('client-service');
  if (select) select.value = serviceName;
}

function buildDiagnosticText() {
  const name = document.getElementById('client-name')?.value.trim() || 'Cliente Empresarial';
  const company = document.getElementById('client-company')?.value.trim() || 'Empresa';
  const service = document.getElementById('client-service')?.value || '';
  const modality = document.getElementById('client-modality')?.value || '';
  const notes = document.getElementById('client-notes')?.value.trim() || 'Solicito información y diagnóstico inicial.';

  return `Hola equipo BySoft, envío solicitud desde su portal web:\n\n- Contacto: ${name}\n- Empresa: ${company}\n- Solución: ${service}\n- Modalidad: ${modality}\n- Resumen: ${notes}`;
}

function handleDiagnosticSubmit(e) {
  e.preventDefault();
  const message = buildDiagnosticText();
  const feedback = document.getElementById('form-feedback');

  if (feedback) {
    feedback.classList.remove('hidden');
    feedback.textContent = 'Solicitud preparada. Abriendo canal oficial de WhatsApp Business de BySoft...';
  }

  const whatsappUrl = `https://wa.me/573000000000?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

function copyDiagnosticSummary() {
  const text = buildDiagnosticText();
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  const feedback = document.getElementById('form-feedback');
  if (feedback) {
    feedback.classList.remove('hidden');
    feedback.textContent = 'Resumen copiado al portapapeles.';
  }
}

/* Exposición global para atributos onclick del HTML */
window.selectServiceInForm = selectServiceInForm;
window.handleDiagnosticSubmit = handleDiagnosticSubmit;
window.copyDiagnosticSummary = copyDiagnosticSummary;

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndNavigation();
  initClientCarousel();
});