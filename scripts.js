// ---------------------------------------------------------------------------
// Footer year
// ---------------------------------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------------------------------------------------------------------------
// Typing effect for the role text
// ---------------------------------------------------------------------------
if (window.Typed) {
    new Typed(".role", {
        strings: ["MBA Candidate", "Logistics & Supply Chain Enthusiast", "Aspiring Port Operations Professional"],
        loop: true,
        typeSpeed: 65,
        backSpeed: 40,
        backDelay: 1400,
        smartBackspace: true
    });
}

// ---------------------------------------------------------------------------
// Dark / light mode toggle (persists for the session)
// ---------------------------------------------------------------------------
const darkmode = document.querySelector("#darkmode");

function setTheme(isLight) {
    document.body.classList.toggle("active", isLight);
    darkmode.classList.toggle("bx-moon", !isLight);
    darkmode.classList.toggle("bx-sun", isLight);
    darkmode.setAttribute("aria-pressed", String(isLight));
}

darkmode.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("active"));
});
darkmode.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setTheme(!document.body.classList.contains("active"));
    }
});

// ---------------------------------------------------------------------------
// Mobile menu
// ---------------------------------------------------------------------------
const menu = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menu.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

// Close the mobile menu after a nav link is tapped
navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navbar.classList.remove("active"));
});

// ---------------------------------------------------------------------------
// Reveal skill bars when they scroll into view
// ---------------------------------------------------------------------------
const percentBars = document.querySelectorAll(".percent-bar");

if ("IntersectionObserver" in window && percentBars.length) {
    const barObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    barObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );
    percentBars.forEach((bar) => barObserver.observe(bar));
} else {
    // Fallback: just show them
    percentBars.forEach((bar) => bar.classList.add("in-view"));
}

// ---------------------------------------------------------------------------
// Contact form
//
// This is a front-end-only form right now — submitting it just shows a
// confirmation message, it does not actually send an email anywhere.
// To make it functional, wire it up to a service like Formspree or EmailJS:
//   1. Create a free account at https://formspree.io or https://www.emailjs.com
//   2. Follow their docs to get an endpoint / public key
//   3. Replace the fetch call below (or the fake-submit logic) with their code
// ---------------------------------------------------------------------------
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = contactForm.name.value.trim();
        if (!contactForm.checkValidity()) {
            formStatus.textContent = "Please fill in every field before sending.";
            return;
        }

        // Placeholder confirmation — see comment above to make this real.
        formStatus.textContent = `Thanks, ${name.split(" ")[0]} — this form isn't connected to an inbox yet, but your message looked good to go.`;
        contactForm.reset();
    });
}

// ---------------------------------------------------------------------------
// Header shadow on scroll (subtle depth cue)
// ---------------------------------------------------------------------------
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 20);
});
