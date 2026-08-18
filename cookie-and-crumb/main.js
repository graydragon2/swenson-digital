/* ============================================================================
   main.js — reads CONFIG (config.js) and fills in every page.
   No build step, no dependencies. Loaded after config.js on every page.
   ============================================================================ */

(function () {
  'use strict';

  function getPath(obj, path) {
    return path.split('.').reduce((val, key) => (val == null ? undefined : val[key]), obj);
  }

  function toKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  // Apply CONFIG.theme as CSS custom properties on :root, e.g.
  // theme.primaryDark -> --primary-dark
  function applyTheme() {
    const root = document.documentElement;
    Object.entries(CONFIG.theme).forEach(([key, value]) => {
      root.style.setProperty(`--${toKebabCase(key)}`, value);
    });
  }

  // Simple declarative bindings: any element with one of these attributes
  // gets filled in from CONFIG using a dotted path, e.g.:
  //   <span data-cfg="business.name"></span>
  //   <a data-cfg-href="contact.phoneHref" href="tel:"></a>
  //   <img data-cfg-src="hero.photo" data-cfg-alt="hero.photoAlt">
  function bindStaticFields(root = document) {
    root.querySelectorAll('[data-cfg]').forEach((el) => {
      const val = getPath(CONFIG, el.getAttribute('data-cfg'));
      if (val != null && val !== '') el.textContent = val;
    });

    root.querySelectorAll('[data-cfg-href]').forEach((el) => {
      const path = el.getAttribute('data-cfg-href');
      const val = getPath(CONFIG, path);
      if (!val) return;
      // tel: / mailto: prefixes are added here so CONFIG can just hold raw values
      if (path === 'contact.phoneHref') el.setAttribute('href', `tel:${val}`);
      else if (path === 'contact.email') el.setAttribute('href', `mailto:${val}`);
      else el.setAttribute('href', val);
    });

    root.querySelectorAll('[data-cfg-src]').forEach((el) => {
      const val = getPath(CONFIG, el.getAttribute('data-cfg-src'));
      if (val) el.setAttribute('src', val);
    });

    root.querySelectorAll('[data-cfg-alt]').forEach((el) => {
      const val = getPath(CONFIG, el.getAttribute('data-cfg-alt'));
      if (val) el.setAttribute('alt', val);
    });
  }

  // Hide/show social links based on whether a CONFIG.social value is set.
  // Any wrapper with [data-social-group] (e.g. the "Follow along" row on the
  // Home hero) hides itself too when none of its links have a URL, so there's
  // no orphaned label with no icons next to it.
  function bindSocialLinks() {
    document.querySelectorAll('[data-social]').forEach((el) => {
      const key = el.getAttribute('data-social');
      const url = CONFIG.social[key];
      if (!url) {
        el.hidden = true;
      } else {
        el.href = url;
        el.hidden = false;
      }
    });

    document.querySelectorAll('[data-social-group]').forEach((group) => {
      const anyVisible = Array.from(group.querySelectorAll('[data-social]')).some((el) => !el.hidden);
      group.hidden = !anyVisible;
    });
  }

  // Hide/show "leave us a review" links based on CONFIG.reviewLinks
  function bindReviewLinks() {
    document.querySelectorAll('[data-review-link]').forEach((el) => {
      const key = el.getAttribute('data-review-link');
      const url = CONFIG.reviewLinks && CONFIG.reviewLinks[key];
      if (!url) {
        el.hidden = true;
      } else {
        el.href = url;
        el.hidden = false;
      }
    });
  }

  // Renders CONFIG.services into any element with [data-render="services"]
  function renderServices() {
    document.querySelectorAll('[data-render="services"]').forEach((container) => {
      const limit = container.getAttribute('data-limit');
      const items = limit ? CONFIG.services.slice(0, Number(limit)) : CONFIG.services;
      container.innerHTML = items
        .map(
          (service) => `
        <article class="card service-item">
          ${service.icon ? `<span class="icon-badge" aria-hidden="true">${escapeHtml(service.icon)}</span>` : ''}
          <h3>${escapeHtml(service.name)}</h3>
          <p>${escapeHtml(service.description)}</p>
          ${service.price ? `<p class="service-price">${escapeHtml(service.price)}</p>` : ''}
        </article>`
        )
        .join('');
    });
  }

  // Renders CONFIG.hours into any element with [data-render="hours"]
  function renderHours() {
    document.querySelectorAll('[data-render="hours"]').forEach((container) => {
      container.innerHTML = CONFIG.hours
        .map(
          (row) => `<li><span class="hours-day">${escapeHtml(row.day)}</span><span class="hours-time">${escapeHtml(row.hours)}</span></li>`
        )
        .join('');
    });
  }

  // Renders CONFIG.testimonials into any element with [data-render="testimonials"]
  // Supports [data-limit] to show only the first N (used for the Home page preview).
  function renderTestimonials() {
    document.querySelectorAll('[data-render="testimonials"]').forEach((container) => {
      const limit = container.getAttribute('data-limit');
      const items = limit ? CONFIG.testimonials.slice(0, Number(limit)) : CONFIG.testimonials;
      container.innerHTML = items
        .map(
          (t) => `
        <blockquote class="card testimonial">
          <p>&ldquo;${escapeHtml(t.quote)}&rdquo;</p>
          <cite>${escapeHtml(t.author)}${t.source ? ` &middot; ${escapeHtml(t.source)}` : ''}</cite>
        </blockquote>`
        )
        .join('');
    });
  }

  // Renders CONFIG.gallery into any element with [data-render="gallery"].
  // Hides the whole section (via [data-gallery-section]) when the array is
  // empty, so a client that doesn't need a gallery just gets nothing here.
  function renderGallery() {
    document.querySelectorAll('[data-render="gallery"]').forEach((container) => {
      const items = CONFIG.gallery || [];
      const section = container.closest('[data-gallery-section]');
      if (items.length === 0) {
        if (section) section.hidden = true;
        return;
      }
      container.innerHTML = items
        .map((photo) => `<img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt)}" loading="lazy">`)
        .join('');
    });
  }

  // Builds a keyless Google Maps embed src from CONFIG.contact.address on
  // any <iframe data-map>. No API key needed for this basic embed format.
  function renderMap() {
    const mapFrame = document.querySelector('[data-map]');
    if (!mapFrame) return;
    const { street, city, state, zip } = CONFIG.contact.address;
    const query = encodeURIComponent(`${street}, ${city}, ${state} ${zip}`);
    mapFrame.setAttribute('src', `https://www.google.com/maps?q=${query}&output=embed`);
    mapFrame.setAttribute('title', `Map showing the location of ${CONFIG.business.name}`);
  }

  // Full address as a single line, used in a couple of places
  function renderAddressLines() {
    document.querySelectorAll('[data-render="address"]').forEach((el) => {
      const { street, city, state, zip } = CONFIG.contact.address;
      el.innerHTML = `${escapeHtml(street)}<br>${escapeHtml(city)}, ${escapeHtml(state)} ${escapeHtml(zip)}`;
    });
  }

  function bindBuiltByCredit() {
    document.querySelectorAll('[data-built-by]').forEach((el) => {
      if (!CONFIG.builtBy || !CONFIG.builtBy.label) {
        el.hidden = true;
        return;
      }
      el.href = CONFIG.builtBy.url;
      el.textContent = CONFIG.builtBy.label;
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  // Fades/rises .card and gallery images into view on scroll. Only takes
  // effect when <html> has .js-motion (see the inline snippet in <head>).
  // Must run AFTER renderServices/renderTestimonials/renderGallery, since
  // those inject the elements this observes — called last in
  // DOMContentLoaded below.
  function initScrollReveal() {
    if (!document.documentElement.classList.contains('js-motion')) return;
    const targets = document.querySelectorAll('.card, .gallery-grid img');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
  }

  // ---- Mobile nav + footer year, same pattern on every page ----------------
  function bindChrome() {
    const header = document.querySelector('.site-header');
    const navToggle = document.getElementById('navToggle');
    const primaryNav = document.getElementById('primaryNav');

    if (navToggle && header) {
      navToggle.addEventListener('click', () => {
        const isOpen = header.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
      });
      primaryNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          header.classList.remove('nav-open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    bindStaticFields();
    bindSocialLinks();
    bindReviewLinks();
    renderServices();
    renderHours();
    renderTestimonials();
    renderGallery();
    renderMap();
    renderAddressLines();
    bindBuiltByCredit();
    bindChrome();
    initScrollReveal();
  });
})();
