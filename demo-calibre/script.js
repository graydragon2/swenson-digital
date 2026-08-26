// CALIBRE — page interactivity (no dependencies). The WebGL hero scene
// lives in scene.js as its own module; this file handles everything else:
// nav, scroll reveals, the exploded-movement diagram, counters, the
// magnetic CTA, and the mobile menu.

const REVEAL_SELECTOR = ".manifesto-support > *, .movement-copy > *, .collection-item, .craft-row, .diff-item, .stat-item, .about-layout > *";

document.addEventListener("DOMContentLoaded", () => {
  const motionOn = document.documentElement.classList.contains("js-motion");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // ---------- Scroll progress bar ----------
  const progressBar = document.querySelector(".scroll-progress");
  if (progressBar) {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      progressBar.style.width = max > 0 ? `${(h.scrollTop / max) * 100}%` : "0%";
    };
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    });
    update();
  }

  // ---------- Header solidify + mobile nav ----------
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");
  if (header && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => entries.forEach((e) => header.classList.toggle("scrolled", e.intersectionRatio < 0.7)),
      { threshold: [0, 0.7] }
    ).observe(hero);
  }

  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");
  if (navToggle && header) {
    navToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Manifesto pull-quote reveal ----------
  const blockquote = document.querySelector(".manifesto blockquote");
  if (motionOn && blockquote && "IntersectionObserver" in window) {
    new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          blockquote.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 }).observe(blockquote);
  } else if (blockquote) {
    blockquote.classList.add("is-visible");
  }

  // ---------- Exploded movement diagram ----------
  const diagram = document.querySelector(".movement-diagram");
  if (diagram) {
    if (motionOn && "IntersectionObserver" in window) {
      new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            diagram.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 }).observe(diagram);
    } else {
      diagram.classList.add("is-visible");
    }
  }

  // ---------- Generic scroll reveals ----------
  if (motionOn) {
    const targets = document.querySelectorAll(REVEAL_SELECTOR);
    if (targets.length && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = Array.from(entry.target.parentElement.children);
            const index = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${Math.min(index, 5) * 70}ms`;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
      targets.forEach((el) => observer.observe(el));
    } else {
      targets.forEach((el) => el.classList.add("is-visible"));
    }
  }

  // ---------- Animated stat counters ----------
  const statEls = document.querySelectorAll(".stat-num[data-count-to]");
  if (statEls.length) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.countTo);
      const suffix = el.dataset.suffix || "";
      if (!motionOn) {
        el.textContent = target.toLocaleString() + suffix;
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { animate(entry.target); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.5 });
      statEls.forEach((el) => obs.observe(el));
    } else {
      statEls.forEach(animate);
    }
  }

  // ---------- Magnetic CTA ----------
  if (motionOn && canHover) {
    document.querySelectorAll(".btn-magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const px = e.clientX - rect.left - rect.width / 2;
        const py = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${(px * 0.3).toFixed(1)}px, ${(py * 0.4).toFixed(1)}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
