// Swenson Digital — pitch site interactivity (no dependencies)

// Elements that fade/rise into view on scroll. Only takes effect on pages
// where <html> has .js-motion (set by the inline snippet in <head> — see
// there for why). Mirrors the selector list in style.css's reveal rules;
// keep the two in sync if you add a new element type.
const REVEAL_SELECTOR = '.service-card, .service-row, .step-card, .proof-card, .price-card, .faq-item, .social-mockup, .work-card, .problem-list li';

document.addEventListener('DOMContentLoaded', () => {
  const motionOn = document.documentElement.classList.contains('js-motion');
  // Real hover capability (not a touch device pretending to). Gates the
  // cursor-following/tilt effects below — they're meaningless on touch and
  // would just leave elements stuck mid-effect after a tap.
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Scroll reveals
  if (motionOn) {
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

  // On the home page, the header starts transparent over the dark hero and
  // solidifies once the hero scrolls out of view — see body.hero-page rules
  // in style.css. Runs regardless of .js-motion (this is a color swap for
  // legibility, not a decorative animation).
  (function initHeroHeader() {
    const header = document.querySelector('.site-header');
    const hero = document.querySelector('.hero');
    if (!document.body.classList.contains('hero-page') || !header || !hero) return;
    if (!('IntersectionObserver' in window)) {
      header.classList.add('scrolled');
      return;
    }
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          header.classList.toggle('scrolled', entry.intersectionRatio < 0.7);
        });
      },
      { threshold: [0, 0.7] }
    ).observe(hero);
  })();

  // Word-by-word headline reveal — splits the hero <h1> into per-word
  // spans and staggers them in, instead of the whole line fading up as one
  // block. Only the hero h1 (there's one per page, and this is a homepage-
  // only section); other headings keep the simpler block-level reveal.
  // Falls back to plain text (no JS / motion off) with zero layout impact.
  if (motionOn) {
    const heroH1 = document.querySelector('.hero-copy > h1');
    if (heroH1) {
      const wrapWords = (node) => {
        Array.from(node.childNodes).forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            child.textContent.split(/(\s+)/).forEach((part) => {
              if (part === '') return;
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(part));
              } else {
                const span = document.createElement('span');
                span.className = 'word';
                span.textContent = part;
                frag.appendChild(span);
              }
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            wrapWords(child);
          }
        });
      };
      wrapWords(heroH1);
      heroH1.querySelectorAll('.word').forEach((word, i) => {
        word.style.animationDelay = `${0.13 + i * 0.045}s`;
      });
    }
  }

  // Cursor-reactive glow in the hero — a soft light that follows the
  // pointer, layered over the slow ambient drift already in .hero::before.
  // Desktop/mouse only; on touch it would just sit wherever the last tap
  // was, which reads as a bug rather than an effect.
  if (motionOn && canHover) {
    const hero = document.querySelector('.hero');
    const spotlight = document.querySelector('.hero-spotlight');
    if (hero && spotlight) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        spotlight.style.setProperty('--mx', `${x}%`);
        spotlight.style.setProperty('--my', `${y}%`);
      });
    }
  }

  // Magnetic tilt on the "Recent Work" card — a subtle 3D lean toward the
  // cursor. The kind of detail that's easy to skip and easy to notice.
  if (motionOn && canHover) {
    const workCard = document.querySelector('.work-card');
    if (workCard) {
      workCard.addEventListener('mousemove', (e) => {
        const rect = workCard.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        workCard.style.transform = `perspective(900px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`;
      });
      workCard.addEventListener('mouseleave', () => {
        workCard.style.transform = '';
      });
    }
  }

  // Sticky "Get a Free Site Review" bar for small screens — appears once
  // the visitor has scrolled a bit, hides again once the footer (with its
  // own contact info) is in view.
  const ctaBar = document.getElementById('mobileCtaBar');
  if (ctaBar) {
    ctaBar.hidden = false;
    let footerVisible = false;
    const footer = document.querySelector('.site-footer');
    if (footer && 'IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => { footerVisible = entry.isIntersecting; });
        updateCtaBar();
      }).observe(footer);
    }
    function updateCtaBar() {
      ctaBar.classList.toggle('show', window.scrollY > 420 && !footerVisible);
    }
    let ctaTicking = false;
    window.addEventListener('scroll', () => {
      if (ctaTicking) return;
      ctaTicking = true;
      requestAnimationFrame(() => { updateCtaBar(); ctaTicking = false; });
    });
    updateCtaBar();
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
