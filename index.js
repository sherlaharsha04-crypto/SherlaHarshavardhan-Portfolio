
// =========================
// ✨ SCROLL REVEAL ANIMATION
// =========================

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(
    ".skill-card, .certificate-card, .project-card, .contact-info, .about-card"
).forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});


// =========================
// 🎯 SMOOTH NAV SCROLL
// =========================

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const root = document.documentElement;

  // system theme
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // saved theme
  const savedTheme = localStorage.getItem("theme");

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    toggle.checked = theme === "dark";
  }

  // INIT THEME
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(systemDark ? "dark" : "light");
  }

  // toggle change
  toggle.addEventListener("change", () => {
    setTheme(toggle.checked ? "dark" : "light");
  });

  // auto update if system theme changes
  window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
});