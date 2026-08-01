/* ==========================================================
   PARA VILLAGE ARCHIVE
   main.js — Version 2.0
   All selectors match the HTML. No dead references.
========================================================== */

/* ==========================================================
   1. HEADER — Scrolled State
========================================================== */

const header = document.getElementById("header");

if (header) {
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ==========================================================
   2. ACTIVE NAV LINK on Scroll
========================================================== */

const sections  = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav__menu a");

const highlightNav = () => {
  let current = "";

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current
    );
  });
};

window.addEventListener("scroll", highlightNav, { passive: true });

/* ==========================================================
   3. MOBILE MENU TOGGLE
========================================================== */

const navToggle = document.querySelector(".nav__toggle");
const navMenu   = document.querySelector(".nav__menu");

if (navToggle && navMenu) {

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close on outside click
  document.addEventListener("click", e => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ==========================================================
   4. SCROLL REVEAL
========================================================== */

const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  // Fallback: show everything
  revealEls.forEach(el => el.classList.add("active"));
}

/* ==========================================================
   5. TYPING EFFECT in Hero Terminal
========================================================== */

const typingEl = document.querySelector(".typing");

if (typingEl) {
  const phrases = [
    "explore village",
    "read history",
    "view gallery",
    "meet the people"
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;

  const type = () => {
    const phrase = phrases[phraseIdx];

    if (!deleting) {
      typingEl.textContent = phrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      typingEl.textContent = phrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    setTimeout(type, deleting ? 60 : 110);
  };

  setTimeout(type, 800);
}

/* ==========================================================
   6. VISITOR COUNTER
========================================================== */

const counterEl = document.getElementById("visitor-count");

if (counterEl) {
  let count = parseInt(localStorage.getItem("paraVisitors") || "4217", 10);
  count++;
  localStorage.setItem("paraVisitors", String(count));
  counterEl.textContent = String(count).padStart(6, "0");
}

/* ==========================================================
   7. FOOTER YEAR
========================================================== */

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ==========================================================
   8. LAST UPDATED
========================================================== */

const updatedEl = document.getElementById("last-updated");
if (updatedEl) {
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const d = new Date();
  updatedEl.textContent = months[d.getMonth()] + " " + d.getFullYear();
}

/* ==========================================================
   9. BACK TO TOP BUTTON
========================================================== */

const topBtn = document.querySelector(".back-to-top");

if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.classList.toggle("show", window.scrollY > 500);
  }, { passive: true });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==========================================================
   10. ANIMATED STAT COUNTERS
========================================================== */

const statNumbers = document.querySelectorAll(".stat-card__number[data-target]");

const animateCount = (el, target, suffix = "") => {
  let start = 0;
  const duration = 1800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

if ("IntersectionObserver" in window) {
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCount(el, target);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(el => statObserver.observe(el));
}

/* ==========================================================
   11. IMAGE FADE-IN on Load
========================================================== */

document.querySelectorAll("img").forEach(img => {
  img.style.opacity = "0";
  img.style.transition = "opacity .5s ease";

  if (img.complete) {
    img.style.opacity = "1";
  } else {
    img.addEventListener("load",  () => { img.style.opacity = "1"; });
    img.addEventListener("error", () => { img.style.opacity = "1"; }); // show broken image too
  }
});

/* ==========================================================
   12. CONTACT FORM — Basic Submit Handler
========================================================== */

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    const name  = contactForm.querySelector("#name")?.value.trim();
    const email = contactForm.querySelector("#email")?.value.trim();

    if (!name || !email) {
      alert("Please fill in your name and email.");
      return;
    }

    const btn = contactForm.querySelector("button[type='submit']");
    const original = btn.textContent;

    btn.textContent = "Sent! ✓";
    btn.style.background = "#2e7d32";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = "";
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

/* ==========================================================
   13. CONSOLE GREETING
========================================================== */

console.log(`
██████╗  █████╗ ██████╗  █████╗
██╔══██╗██╔══██╗██╔══██╗██╔══██╗
██████╔╝███████║██████╔╝███████║
██╔═══╝ ██╔══██║██╔══██╗██╔══██║
██║     ██║  ██║██║  ██║██║  ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝

Welcome to the Para Village Archive.
Built with HTML, CSS & vanilla JavaScript.
`);
