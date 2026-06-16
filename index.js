document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    const thumb = document.querySelector(".thumb");
    const navLinks = document.querySelectorAll(".navbar a");
    const sections = document.querySelectorAll("section");
    const navbar = document.querySelector(".navbar");

    /* =========================
       APPLE THEME SYSTEM
    ========================= */
    const savedTheme = localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute("data-theme", savedTheme);

    if (savedTheme === "dark") {
        toggle.checked = true;
        thumb.textContent = "🌙";
    } else {
        toggle.checked = false;
        thumb.textContent = "☀️";
    }

    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            thumb.textContent = "🌙";
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            thumb.textContent = "☀️";
        }
    });

    /* =========================
       NAVBAR SCROLL EFFECT
    ========================= */
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.backdropFilter = "blur(50px)";
            navbar.style.boxShadow = "0 20px 40px rgba(0,0,0,0.18)";
        } else {
            navbar.style.backdropFilter = "blur(35px)";
            navbar.style.boxShadow = "none";
        }
    });

    /* =========================
       ACTIVE NAV LINK
    ========================= */
    function updateActiveLink() {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;

            if (
                window.pageYOffset >= sectionTop &&
                window.pageYOffset < sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);

    /* =========================
       SMOOTH SCROLL
    ========================= */
    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    /* =========================
       FADE IN ANIMATION
    ========================= */
    const cards = document.querySelectorAll(
        ".about-card, .skill-card, .certificate-card, .project-card, .contact-info"
    );

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(50px)";
        card.style.transition = "all 0.8s ease";
        observer.observe(card);
    });

    /* =========================
       3D TILT GLASS EFFECT
    ========================= */
    cards.forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.02)
            `;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                scale(1)
            `;
        });
    });
});
