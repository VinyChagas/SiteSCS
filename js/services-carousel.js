(function () {
  const carousel = document.querySelector('.services-cards-carousel');
  const cards = Array.from(carousel.children);
  const prevBtn = document.querySelector('.carousel-arrow.left');
  const nextBtn = document.querySelector('.carousel-arrow.right');
  const dotsContainer = document.querySelector('.carousel-dots');
  let current = 0;
  let intervalId = null;

  function getCardsPerView() {
    return window.innerWidth >= 900 ? 1 : 1;
  }

  function getCardCount() {
    const cardsPerView = getCardsPerView();
    return cards.length - cardsPerView;
  }

  function getCardWidth() {
    const card = cards[0];
    const style = getComputedStyle(card);
    return card.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
  }

  function updateCarousel() {
    const cardWidth = getCardWidth();
    const cardCount = getCardCount();

    // Corrige índice fora do alcance
    if (current >= cardCount) current = cardCount - 1;

    carousel.style.transform = `translateX(-${current * cardWidth}px)`;

    // Atualiza os dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < cardCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === current ? ' active' : '');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir para o serviço ${i + 1}`);
      dot.addEventListener('click', () => {
        current = i;
        updateCarousel();
        resetInterval();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function nextCard() {
    const cardCount = getCardCount();
    current = (current + 1) % cardCount;
    updateCarousel();
  }

  function prevCard() {
    const cardCount = getCardCount();
    current = (current - 1 + cardCount) % cardCount;
    updateCarousel();
  }

  function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(nextCard, 6000);
  }

  nextBtn.addEventListener('click', () => {
    nextCard();
    resetInterval();
  });

  prevBtn.addEventListener('click', () => {
    prevCard();
    resetInterval();
  });

  // Swipe touch
  let startX = null;
  carousel.parentElement.addEventListener('touchstart', function (e) {
    if (e.touches.length === 1) startX = e.touches[0].clientX;
  });
  carousel.parentElement.addEventListener('touchend', function (e) {
    if (startX !== null && e.changedTouches.length === 1) {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) {
        dx < 0 ? nextCard() : prevCard();
        resetInterval();
      }
    }
    startX = null;
  });

  // Teclado
  carousel.parentElement.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { prevCard(); resetInterval(); }
    if (e.key === 'ArrowRight') { nextCard(); resetInterval(); }
  });

  // Resize
  window.addEventListener('resize', () => {
    updateCarousel();
  });

  // Inicializa corretamente
  window.addEventListener('load', () => {
    current = 0;
    updateCarousel();
    intervalId = setInterval(nextCard, 6000);
  });
})();