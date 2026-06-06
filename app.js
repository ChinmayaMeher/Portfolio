/* =============================================
   CHINMAYA MEHER — Portfolio Advanced JS (FIXED)
   ============================================= */

// ---- Custom Cursor ----
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
let mouseX = 0,
  mouseY = 0,
  ringX = 0,
  ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top = mouseY + "px";
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + "px";
  cursorRing.style.top = ringY + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

document
  .querySelectorAll("a, button, .project-card, .info-card, .skill-pills span")
  .forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("cursor-hover")
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("cursor-hover")
    );
  });

// ---- Navbar: scroll effect + active link ----
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const navOverlay = document.getElementById("navOverlay");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);

  // Highlight active nav link
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current
    );
  });
});

// ---- Hamburger Menu ----
const hamburger = document.getElementById("hamburger");
const navLinksMenu = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinksMenu.classList.toggle("open");
  navOverlay.classList.toggle("active");
  const spans = hamburger.querySelectorAll("span");
  const isOpen = navLinksMenu.classList.contains("open");
  spans[0].style.transform = isOpen ? "rotate(45deg) translate(5px, 5px)" : "";
  spans[1].style.opacity = isOpen ? "0" : "1";
  spans[2].style.transform = isOpen
    ? "rotate(-45deg) translate(5px, -5px)"
    : "";
});

// Close on nav-link click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinksMenu.classList.remove("open");
    navOverlay.classList.remove("active");
    hamburger.querySelectorAll("span").forEach((s) => {
      s.style.transform = "";
      s.style.opacity = "1";
    });
  });
});

navOverlay.addEventListener("click", () => {
  navLinksMenu.classList.remove("open");
  navOverlay.classList.remove("active");
  hamburger.querySelectorAll("span").forEach((s) => {
    s.style.transform = "";
    s.style.opacity = "1";
  });
});

// ---- Dynamic Typing Effect ----
const dynamicText = document.querySelector(".dynamic-text");
const roles = [
  "Frontend Developer",
  "AI/ML Learner",
  "UI/UX Designer",
  "Video Editor",
];
let wordIdx = 0,
  letterIdx = 0,
  deleting = false;

function type() {
  const role = roles[wordIdx];
  dynamicText.textContent = deleting
    ? role.substring(0, letterIdx--)
    : role.substring(0, letterIdx++);

  if (!deleting && letterIdx > role.length) {
    deleting = true;
    setTimeout(type, 1500);
    return;
  }
  if (deleting && letterIdx < 0) {
    deleting = false;
    wordIdx = (wordIdx + 1) % roles.length;
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ---- Scroll Reveal (Intersection Observer) ----
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = [
          ...entry.target.parentElement.querySelectorAll(".reveal"),
        ];
        const delay = siblings.indexOf(entry.target) * 80;
        setTimeout(() => entry.target.classList.add("visible"), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ---- Counter Animation ----
const statNums = document.querySelectorAll(".stat-num");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        let current = 0;
        const step = target / 50;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else el.textContent = Math.floor(current);
        }, 30);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);
statNums.forEach((el) => counterObserver.observe(el));

// ---- Portfolio Filter ----
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;

    projectCards.forEach((card, i) => {
      const cat = card.dataset.category;
      const match = cat === filter;

      // Clear any pending timeout execution to avoid race conditions
      if (card.hideTimeout) clearTimeout(card.hideTimeout);

      card.style.transition = `opacity 0.35s ease ${
        i * 40
      }ms, transform 0.35s ease ${i * 40}ms`;

      if (match) {
        card.style.display = "";
        // Force the layout engine to handle animation cleanly and bypass observer limits
        card.classList.add("visible");
        requestAnimationFrame(() => {
          card.style.opacity = "1";
          card.style.transform = "";
        });
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";
        card.hideTimeout = setTimeout(() => {
          card.style.display = "none";
        }, 380 + i * 40);
      }
    });
  });
});

// ---- Initialize portfolio (show frontend by default) ----
projectCards.forEach((card) => {
  if (card.dataset.category !== "frontend") {
    card.style.display = "none";
    card.style.opacity = "0";
  } else {
    // Frontend items should immediately be visible if already in viewport range
    card.classList.add("visible");
  }
});

// ---- Certification Slider ----
const certSlider = document.getElementById("certSlider");
const certPrev = document.getElementById("certPrev");
const certNext = document.getElementById("certNext");
const certDotsWrap = document.getElementById("certDots");
const certSlides = document.querySelectorAll(".cert-slide");
let certIdx = 0;

// Create dots
certSlides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("cert-dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goCert(i));
  certDotsWrap.appendChild(dot);
});

function goCert(idx) {
  certIdx = (idx + certSlides.length) % certSlides.length;
  certSlider.style.transform = `translateX(-${certIdx * 100}%)`;
  document
    .querySelectorAll(".cert-dot")
    .forEach((d, i) => d.classList.toggle("active", i === certIdx));
}

certPrev.addEventListener("click", () => goCert(certIdx - 1));
certNext.addEventListener("click", () => goCert(certIdx + 1));
setInterval(() => goCert(certIdx + 1), 5000);

// ---- Keyboard slider support ----
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") goCert(certIdx - 1);
  if (e.key === "ArrowRight") goCert(certIdx + 1);
});

// ---- Touch swipe for cert slider ----
let touchStartX = 0;
certSlider.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].clientX;
  },
  { passive: true }
);
certSlider.addEventListener("touchend", (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) goCert(certIdx + (diff > 0 ? 1 : -1));
});

// ---- Smooth anchor scrolling ----
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      
      const isMobileMenuOpen = navLinksMenu.classList.contains("open");
      
      if (isMobileMenuOpen) {
        // 1. Instantly close the menu and overlay
        navLinksMenu.classList.remove("open");
        navOverlay.classList.remove("active");
        hamburger.querySelectorAll("span").forEach((s) => {
          s.style.transform = "";
          s.style.opacity = "1";
        });
        
        // 2. Delay the smooth scroll so the panel transition has time to process
        // without mobile browsers aborting the scroll animation.
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      } else {
        // If menu is not open (e.g. desktop), scroll immediately
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});
