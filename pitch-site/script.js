// Swenson Digital — pitch site interactivity (no dependencies)

// Elements that fade/rise into view on scroll. Only takes effect on pages
// where <html> has .js-motion (set by the inline snippet in <head> — see
// there for why). Mirrors the selector list in style.css's reveal rules;
// keep the two in sync if you add a new element type.
const REVEAL_SELECTOR = '.service-card, .step-card, .proof-card, .price-card, .faq-item, .social-mockup, .problem-list li';

document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveals
  if (document.documentElement.classList.contains('js-motion')) {
    const targets = document.querySelectorAll(REVEAL_SELECTOR);
    if (targets.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Small stagger for items revealing together (e.g. a row of
              // service cards), based on position among its own siblings.
              const siblings = Array.from(entry.target.parentElement.children);
              const index = siblings.indexOf(entry.target);
              entry.target.style.transitionDelay = `${Math.min(index, 4) * 70}ms`;
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      targets.forEach((el) => observer.observe(el));
    } else {
      // No IntersectionObserver support — just show everything.
      targets.forEach((el) => el.classList.add('is-visible'));
    }
  }

  // Mobile nav toggle
  const header = document.querySelector('.site-header');
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  if (navToggle && header) {
    navToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the mobile menu after tapping a nav link
    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
