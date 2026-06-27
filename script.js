// ============================
// Portfolio Interactivity
// ============================

const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-links a');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');
const scrollProgress = document.querySelector('.scroll-progress');
const backToTopButton = document.querySelector('.back-to-top');
const yearLabel = document.getElementById('year');
const observerElements = document.querySelectorAll('.fade-in');
const typingText = document.querySelector('.typing-text');
const heroButtons = document.querySelectorAll('.ripple');

// Update footer year
if (yearLabel) {
  yearLabel.textContent = new Date().getFullYear();
}

// Scroll progress bar
const updateScrollProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;

  header.classList.toggle('scrolled', scrollTop > 30);
  backToTopButton.classList.toggle('show', scrollTop > 500);
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('load', updateScrollProgress);

// Intersection Observer for fade-in animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

observerElements.forEach((element) => observer.observe(element));

// Active navbar state on scroll
const sections = [...document.querySelectorAll('main section[id]')];

const setActiveNavLink = () => {
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLinks.forEach((link) => {
        const linkHref = link.getAttribute('href');
        link.classList.toggle('active', linkHref === `#${section.id}`);
      });
    }
  });
};

window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);

// Mobile menu toggle
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Typing animation
const words = ['Software Engineering Student', 'Web Developer', 'Laravel Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeLoop = () => {
  if (!typingText) return;

  const currentWord = words[wordIndex];

  typingText.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex += 1;
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
  } else if (!isDeleting) {
    isDeleting = true;
    setTimeout(typeLoop, 1200);
    return;
  } else {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeLoop, isDeleting ? 60 : 120);
};

typeLoop();

// Ripple effect on buttons
heroButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Back to top button action
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
