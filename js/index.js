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
            el.style.transition = "transform 0.3s, color 0.3s";
            el.style.transform = "scale(1.2)";
            el.style.color = "#ffd145";
            setTimeout(() => {
                el.style.transform = "scale(1)";
                el.style.color = "";
            }, 300);
        }
    }
    requestAnimationFrame(update);
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

function setupCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    function checkAndAnimate() {
        if (!animated) {
            let anyVisible = false;
            counters.forEach(counter => {
                if (isInViewport(counter)) {
                    animateCounter(counter);
                    anyVisible = true;
                }
            });
            if (anyVisible) animated = true;
        }
    }

    window.addEventListener('scroll', checkAndAnimate);
    // Executa com leve atraso pra garantir render completo
    setTimeout(checkAndAnimate, 200);
}

// Preloader + animação de contador
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.8s ease-out";

        setTimeout(() => {
            preloader.remove(); // remove o preloader do DOM
            setupCounterAnimation(); // só roda depois que tudo saiu da frente
        }, 800);
    } else {
        setupCounterAnimation(); // fallback caso não exista preloader
    }
});