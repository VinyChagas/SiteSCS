(function () {
  "use strict";

  var cfg = window.SCS_CONFIG || {};

  function waUrl(text) {
    var n = (cfg.whatsapp && cfg.whatsapp.number) || "5541997512925";
    var t = text || (cfg.whatsapp && cfg.whatsapp.defaultText) || "";
    var url = "https://wa.me/" + n;
    if (t) url += "?text=" + encodeURIComponent(t);
    return url;
  }

  function applyWhatsAppLinks() {
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      var custom = el.getAttribute("data-wa-text");
      el.setAttribute("href", waUrl(custom || undefined));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }

  function applyLoginLinks() {
    var login = cfg.login || {};
    document.querySelectorAll("[data-login]").forEach(function (el) {
      if (login.url) {
        el.setAttribute("href", login.url);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
      if (login.label && el.dataset.loginLabel !== "false") {
        el.textContent = login.label;
      }
    });
  }

  function applyFeatureFlags() {
    document.querySelectorAll("[data-show-team]").forEach(function (el) {
      el.hidden = !cfg.showTeamSection;
    });
    document.querySelectorAll("[data-show-testimonials]").forEach(function (el) {
      el.hidden = !cfg.showTestimonials;
    });
    document.querySelectorAll("[data-show-english]").forEach(function (el) {
      el.hidden = !cfg.showEnglish;
    });
  }

  function renderMetrics() {
    var host = document.querySelector("[data-metrics]");
    if (!host) return;
    var list = (cfg.metrics || []).filter(function (m) {
      return m.approved;
    });
    var section = host.closest("[data-proof-section]");
    if (!list.length) {
      host.hidden = true;
      if (section && !cfg.showTestimonials) section.hidden = true;
      return;
    }
    host.hidden = false;
    if (section) section.hidden = false;
    host.innerHTML = list
      .map(function (m) {
        return (
          '<div class="metric">' +
          '<p class="metric-value">' +
          escapeHtml(m.value) +
          "</p>" +
          '<p class="metric-label">' +
          escapeHtml(m.label) +
          "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initMood() {
    var stored;
    try {
      stored = localStorage.getItem("scs-mood");
    } catch (e) {}
    if (stored === "dark" || stored === "light") {
      document.documentElement.dataset.mood = stored;
    }
    syncMoodButtons();

    document.querySelectorAll("[data-mood-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next =
          document.documentElement.dataset.mood === "dark" ? "light" : "dark";
        document.documentElement.dataset.mood = next;
        try {
          localStorage.setItem("scs-mood", next);
        } catch (e) {}
        syncMoodButtons();
      });
    });
  }

  function syncMoodButtons() {
    var dark = document.documentElement.dataset.mood === "dark";
    document.querySelectorAll("[data-mood-toggle]").forEach(function (btn) {
      btn.textContent = dark ? "☀" : "◐";
      btn.setAttribute(
        "aria-label",
        dark ? "Ativar modo claro" : "Ativar modo escuro"
      );
    });
  }

  function initMobileNav() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector("[data-nav-toggle]");
    if (!header || !toggle) return;

    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    header.querySelectorAll(".nav-link, .nav-actions a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach(function (el) {
      io.observe(el);
    });
  }

  function applyHours() {
    var hours = cfg.hours || {};
    document.querySelectorAll("[data-hours]").forEach(function (el) {
      if (hours.short) el.textContent = hours.short;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyFeatureFlags();
    applyWhatsAppLinks();
    applyLoginLinks();
    applyHours();
    renderMetrics();
    initMood();
    initMobileNav();
    initReveal();
  });
})();
