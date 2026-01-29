const translations = {
  fr: {
    home: "Accueil",
    services: "Nos services",
    cabinet: "Notre cabinet",
    newsletter: "Newsletter",
    contact: "Contact",
    cta: "Demande de devis",
    tagline: "Expertise-comptable et conseils fiscaux",
    placeholderTitle: "Page en construction",
    placeholderText: "Contenu à venir…"
  },
  en: {
    home: "Home",
    services: "Our services",
    cabinet: "Our firm",
    newsletter: "Newsletter",
    contact: "Contact",
    cta: "Request a quote",
    tagline: "Accounting expertise and tax advice",
    placeholderTitle: "Page under construction",
    placeholderText: "Content coming soon…"
  }
};

function getLang() {
  return localStorage.getItem("lang") || "fr";
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  applyLang(lang);
}

function applyLang(lang) {
  const dict = translations[lang] || translations.fr;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  // bouton toggle
  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = (lang === "fr") ? "EN" : "FR";
}

function setActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = getLang();
  applyLang(lang);
  setActiveNav();

  const btn = document.getElementById("langToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = getLang();
      setLang(current === "fr" ? "en" : "fr");
    });
  }
});
