// =========================
// SHERLA PORTFOLIO JS
// Premium Interactive UI
// =========================

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // THEME TOGGLE
    // =========================
    const toggle = document.getElementById("theme-toggle");
    const body = document.body;
    const thumb = document.querySelector(".thumb");

    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light");
        if (toggle) toggle.checked = true;
        if (thumb) thumb.textContent = "🌙";
    }

    if (toggle) {
        toggle.addEventListener("change", () => {
            body.classList.toggle("light");

            if (body.classList.contains("light")) {
                localStorage.setItem("theme", "light");
                if (thumb) thumb.textContent = "🌙";
            } else {
                localStorage.setItem("theme", "dark");
                if (thumb) thumb.textContent = "☀️";
            }
        });
    }

    // =========================
    // TYPING ANIMATION
    // =========================
    const heroTitle = document.querySelector(".title h1");

    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = "";
        let index = 0;

        function type() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, 70);
            }
        }
        type();
    }

    // =========================
    // SCROLL REVEAL
    // =========================
    const revealElements = document.querySelectorAll(
        "section, .about-card, .skill-card, .certificate-card, .project-card, .contact-info"
    );

    revealElements.forEach(el => el.classList.add("hidden"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));

    // =========================
    // ACTIVE NAVBAR LINK
    // =========================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 250) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // =========================
    // 3D HOVER CARDS
    // =========================
    const cards = document.querySelectorAll(
        ".about-card, .skill-card, .certificate-card, .project-card, .contact-info"
    );

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = -(y - centerY) / 12;
            const rotateY = (x - centerX) / 12;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.03)
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

    // =========================
    // MAGNETIC BUTTONS
    // =========================
    const buttons = document.querySelectorAll(
        ".project-link, .contact-btn, .certificate-link"
    );

    buttons.forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();

            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translate(0,0)";
        });
    });

    // =========================
    // PARALLAX PROFILE IMAGE
    // =========================
    const profile = document.querySelector("img");

    window.addEventListener("scroll", () => {
        if (profile) {
            let offset = window.scrollY * 0.05;
            profile.style.transform = `translateY(${offset}px)`;
        }
    });



    // =========================
    // FLOATING PARTICLES
    // =========================
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");

        particle.style.position = "fixed";
        particle.style.width = "4px";
        particle.style.height = "4px";
        particle.style.background = "rgba(255,255,255,0.35)";
        particle.style.borderRadius = "50%";
        particle.style.left = Math.random() * window.innerWidth + "px";
        particle.style.top = Math.random() * window.innerHeight + "px";
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "-1";

        document.body.appendChild(particle);

        let speed = Math.random() * 0.4 + 0.1;

        function animateParticle() {
            let top = parseFloat(particle.style.top);
            top -= speed;

            if (top < -10) {
                top = window.innerHeight;
                particle.style.left = Math.random() * window.innerWidth + "px";
            }

            particle.style.top = top + "px";
            requestAnimationFrame(animateParticle);
        }

        animateParticle();
    }

    // =========================
    // NAVBAR GLASS ENHANCEMENT
    // =========================
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.style.backdropFilter = "blur(35px)";
            navbar.style.background = "rgba(255,255,255,0.12)";
        } else {
            navbar.style.backdropFilter = "blur(25px)";
            navbar.style.background = "rgba(255,255,255,0.08)";
        }
    });

});
