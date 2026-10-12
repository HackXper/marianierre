(function () {
  const STORAGE_KEY = "marianierre-lang";

  function applyLanguage(lang) {
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const entry = translations[key];
      if (entry && entry[lang]) {
        el.innerHTML = entry[lang];
      }
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function initLanguage() {
    let saved = "it";
    try { saved = localStorage.getItem(STORAGE_KEY) || "it"; } catch (e) {}
    applyLanguage(saved);

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => applyLanguage(btn.getAttribute("data-lang")));
    });
  }

  function initMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    const note = document.getElementById("form-note");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const lang = document.documentElement.getAttribute("lang") || "it";
      if (note) note.textContent = translations.form_sent[lang];
      form.reset();
    });
  }

  function initYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");
    if (slides.length < 2) return;

    let current = 0;
    let timer = null;

    function goTo(index) {
      slides[current].classList.remove("is-active");
      dots[current] && dots[current].classList.remove("is-active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      dots[current] && dots[current].classList.add("is-active");
    }

    function start() {
      timer = setInterval(() => goTo(current + 1), 6000);
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        goTo(parseInt(dot.getAttribute("data-slide"), 10));
        clearInterval(timer);
        start();
      });
    });

    start();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLanguage();
    initMobileNav();
    initContactForm();
    initYear();
    initHeroSlider();
  });
})();
