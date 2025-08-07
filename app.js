// Toggle Navbar on Hamburger Click
const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu");
const barsIcon = document.querySelector(".hamburger-icon");
const crossIcon = document.querySelector(".cross-icon");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("show-menu");
  barsIcon.classList.toggle("hide-icon");
  crossIcon.classList.toggle("show-icon");
});

// Smooth Scroll for Anchor Links
const links = document.querySelectorAll(".links");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
    menu.classList.remove("show-menu");
    barsIcon.classList.remove("hide-icon");
    crossIcon.classList.remove("show-icon");
  });
});

// Dynamic Typing Text (using simple custom logic)
const dynamicText = document.querySelector(".dynamic-text");
const roles = [
  "frontend Developer",
  "AI/ML Learner",
  "UI/UX Designer",
  "Video Editor",
];
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[wordIndex];
  if (isDeleting) {
    dynamicText.textContent = currentRole.substring(0, letterIndex--);
    if (letterIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % roles.length;
    }
  } else {
    dynamicText.textContent = currentRole.substring(0, letterIndex++);
    if (letterIndex > currentRole.length) {
      isDeleting = true;
    }
  }
  setTimeout(typeEffect, isDeleting ? 100 : 150);
}
typeEffect();

// Optional: Scroll Reveal Animations using Intersection Observer
const sections = document.querySelectorAll(
  ".portfolio, .about-text, .education, .contact"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);
// Apply scroll reveal with linear scaling from narrow to wider at bottom

window.addEventListener("scroll", () => {
  const revealElements = document.querySelectorAll(
    "section, .skills-box, .contact, .about-text, .portfolio, .education"
  );

  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const visibleRatio =
        1 - Math.min(Math.max(rect.top / windowHeight, 0), 1);
      const scaleX = 0.8 + visibleRatio * 0.2; // from narrow to full width
      el.style.transform = `scaleX(${scaleX})`;
      el.style.opacity = visibleRatio;
    } else {
      el.style.transform = "scaleX(0.05)";
      el.style.opacity = 0;
    }
  });
});

// Initial setup for smooth animation
const revealElements = document.querySelectorAll(
  "section, .skills-box, .contact, .about-text, .portfolio, .education"
);
revealElements.forEach((el) => {
  el.style.transform = "scaleX(0.1)";
  el.style.opacity = 0;
  el.style.transition = "transform 0.1s linear, opacity 0.1s linear";
  el.style.transformOrigin = "bottom center"; // transforms grow from bottom
});
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  const offset = -currentSlide * 100;
  document.querySelector(".slides").style.transform = `translateX(${offset}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentSlide].classList.add("active");
}

document.querySelector(".prev").addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

document.querySelector(".next").addEventListener("click", () => {
  showSlide(currentSlide + 1);
});

dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const index = parseInt(e.target.getAttribute("data-slide"));
    showSlide(index);
  });
});

// Auto slide
setInterval(() => {
  showSlide(currentSlide + 1);
}, 5000);

// Initialize
showSlide(0);
