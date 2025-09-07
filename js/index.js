  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    if (preloader) {
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.8s ease-out";

      setTimeout(() => {
        preloader.remove(); // remove completamente do DOM
      }, 800);
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
