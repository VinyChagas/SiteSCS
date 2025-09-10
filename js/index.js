  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    if (preloader) {
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.8s ease-out";

      setTimeout(() => {
        preloader.remove(); // remove completamente do DOM
      }, 800);
    }

    // Header dinâmico ao rolar
    const header = document.querySelector('.u-header');
    const onScrollHeader = () => {
      if (!header) return;
      if (window.scrollY > 10) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive: true });

    // Força carregamento e reprodução do vídeo principal (intro.mp4)
    const heroVideo = document.querySelector('section.u-section-1 > video');
    if (heroVideo) {
      const ensurePlay = () => {
        try {
          heroVideo.setAttribute('muted', '');
          heroVideo.muted = true;
          heroVideo.setAttribute('playsinline', '');
          heroVideo.setAttribute('webkit-playsinline', '');
          heroVideo.preload = 'auto';
          heroVideo.load();
          const p = heroVideo.play();
          if (p && typeof p.then === 'function') {
            p.catch(() => { /* tenta novamente em eventos abaixo */ });
          }
        } catch (_) { /* ignorar */ }
      };

      heroVideo.addEventListener('canplay', ensurePlay, { once: true });
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) ensurePlay();
      });

      // Desbloqueio por gesto do usuário, se necessário
      const unlock = () => {
        ensurePlay();
        document.removeEventListener('click', unlock);
        document.removeEventListener('touchstart', unlock);
      };
      document.addEventListener('click', unlock, { passive: true });
      document.addEventListener('touchstart', unlock, { passive: true });

      // Primeira tentativa imediata
      ensurePlay();
    }
  });
function animateCounter(el, duration = 2000) {
    const target = +el.getAttribute('data-target');
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    let start = 0;
    const startTime = performance.now();

    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);

        el.textContent = prefix + current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = prefix + target + suffix;
            // Efeito visual ao terminar (exemplo: destaque com escala e cor)
            el.style.transition = "transform 0.3s, color 0.3s";
            el.style.transform = "scale(1.2)";
            el.style.color = "#ffd145"; // verde destaque

            setTimeout(() => {
                el.style.transform = "scale(1)";
                el.style.color = ""; // volta à cor original
            }, 300);
        }
    }
    requestAnimationFrame(update);
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight && rect.bottom > 0
    );
}

// Scroll reveal CSS classes serão adicionadas aqui
(function () {
    const revealClass = 'reveal';
    const revealedClass = 'revealed';
    const nodes = document.querySelectorAll('.service-card, .cta-card, .media-card, .u-layout-cell-2, .u-layout-cell-1, .u-image-1, .u-section-3 .u-repeater-1 > div, .footer-contact, .download-cta');
    nodes.forEach(el => el.classList.add(revealClass));

    const reveal = (el) => el.classList.add(revealedClass);

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    reveal(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        nodes.forEach(el => io.observe(el));
    } else {
        const onScroll = () => {
            nodes.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.9) reveal(el);
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        onScroll();
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');

    // Preferência: IntersectionObserver (desempenho e precisão)
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    if (!el.dataset.animated) {
                        el.dataset.animated = 'true';
                        animateCounter(el, 2000);
                    }
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.35 });

        counters.forEach(el => observer.observe(el));
        return;
    }

    // Fallback: scroll + verificação por elemento
    function checkAndAnimate() {
        counters.forEach(counter => {
            if (!counter.dataset.animated && isInViewport(counter)) {
                counter.dataset.animated = 'true';
                animateCounter(counter, 2000);
            }
        });
    }

    window.addEventListener('scroll', checkAndAnimate, { passive: true });
    window.addEventListener('resize', checkAndAnimate);
    checkAndAnimate();
});
