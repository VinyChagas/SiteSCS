(function () {
  const container = document.querySelector('.services-cards-carousel');
  if (!container) return;
  const cards = Array.from(container.querySelectorAll('.service-card'));
  const prevBtn = document.querySelector('.carousel-arrow.left');
  const nextBtn = document.querySelector('.carousel-arrow.right');
  const dotsContainer = document.querySelector('.carousel-dots');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let currentIndex = 0;
  let rafPending = false;
  let intervalId = null;

  function clamp(index) {
    if (index < 0) return 0;
    if (index >= cards.length) return cards.length - 1;
    return index;
  }

  function goTo(index, userInitiated = false) {
    currentIndex = clamp(index);
    const behavior = prefersReducedMotion.matches ? 'auto' : 'smooth';
    cards[currentIndex].scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
    updateDots();
    if (userInitiated) resetInterval();
  }

  function updateCurrentByCenter() {
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let bestIndex = 0;
    let bestDist = Infinity;
    for (let i = 0; i < cards.length; i++) {
      const rect = cards[i].getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - containerCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = i;
      }
    }
    if (bestIndex !== currentIndex) {
      currentIndex = bestIndex;
      updateDots();
    }
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir para o serviço ${i + 1}`);
      dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
      dot.addEventListener('click', () => goTo(i, true));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
      d.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
    });
  }

  function next() { goTo(currentIndex + 1, true); }
  function prev() { goTo(currentIndex - 1, true); }

  function resetInterval() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Eventos
  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  // Teclado no container
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  });

  // Sincroniza índice ao rolar (com RAF para performance)
  container.addEventListener('scroll', () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      updateCurrentByCenter();
      rafPending = false;
    });
  }, { passive: true });

  // Pausa/retoma auto-play em interação do usuário
  ['pointerdown', 'wheel', 'touchstart', 'keydown'].forEach(evt => {
    container.addEventListener(evt, () => resetInterval(), { passive: true });
  });

  window.addEventListener('resize', () => {
    // Após resize, re-centra o card atual
    goTo(currentIndex);
  });

  // Init
  window.addEventListener('load', () => {
    currentIndex = 0;
    buildDots();
    resetInterval();
  });
})();