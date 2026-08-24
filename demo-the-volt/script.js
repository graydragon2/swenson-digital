// THE VOLT — concept demo interactivity (no dependencies)

const REVEAL_SELECTOR = '.stat-item, .show-row, .venue-copy > *, .book-form-wrap > *';

document.addEventListener('DOMContentLoaded', () => {
  const motionOn = document.documentElement.classList.contains('js-motion');
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ---------- Preloader ----------
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    const hide = () => preloader.classList.add('is-hidden');
    if (document.readyState === 'complete') {
      setTimeout(hide, 400);
    } else {
      window.addEventListener('load', () => setTimeout(hide, 400));
    }
    setTimeout(hide, 2200); // safety net
  }

  // ---------- Scroll progress bar ----------
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    const updateProgress = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      progressBar.style.width = max > 0 ? `${(scrolled / max) * 100}%` : '0%';
    };
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { updateProgress(); ticking = false; });
    });
    updateProgress();
  }

  // ---------- Custom cursor (fine-pointer devices only) ----------
  if (motionOn && canHover) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (dot && ring) {
      document.body.classList.add('cursor-none'); // hides the native cursor immediately
      let mx = window.innerWidth / 2, my = window.innerHeight / 2;
      let rx = mx, ry = my;
      let hasMoved = false;
      window.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        if (!hasMoved) {
          hasMoved = true;
          document.body.classList.add('has-custom-cursor'); // reveals the dot/ring on first real movement
        }
      });
      document.querySelectorAll('a, button, .show-row').forEach((el) => {
        el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
        el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
      });
      const tick = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }

  // ---------- Hero canvas — drifting glow blobs ----------
  if (motionOn) {
    const canvas = document.querySelector('.hero-canvas');
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d');
      let w, h, dpr;
      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.clientWidth; h = canvas.clientHeight;
        canvas.width = w * dpr; canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      window.addEventListener('resize', resize);

      const blobs = [
        { color: '228,255,61', rx: 0.28, ry: 0.22, sx: 0.00021, sy: 0.00017, phase: 0, r: 0.42 },
        { color: '255,46,196', rx: 0.65, ry: 0.6, sx: 0.00016, sy: 0.00023, phase: 2, r: 0.38 },
        { color: '139,92,246', rx: 0.5, ry: 0.35, sx: 0.00019, sy: 0.00014, phase: 4, r: 0.32 },
      ];

      let raf;
      const draw = (t) => {
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        blobs.forEach((b) => {
          const cx = (b.rx + Math.sin(t * b.sx + b.phase) * 0.18) * w;
          const cy = (b.ry + Math.cos(t * b.sy + b.phase) * 0.18) * h;
          const radius = b.r * Math.max(w, h);
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
          grad.addColorStop(0, `rgba(${b.color}, 0.55)`);
          grad.addColorStop(1, `rgba(${b.color}, 0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, w, h);
        });
        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);

      // Pause the animation loop when off-screen to save battery/CPU.
      if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              raf = requestAnimationFrame(draw);
            } else {
              cancelAnimationFrame(raf);
            }
          });
        }).observe(canvas);
      }
    }
  }

  // ---------- Header solidify + mobile nav ----------
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  if (header && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => entries.forEach((entry) => header.classList.toggle('scrolled', entry.intersectionRatio < 0.7)),
      { threshold: [0, 0.7] }
    ).observe(hero);
  }

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

  // ---------- Hero headline: per-line rise-in ----------
  if (motionOn) {
    document.querySelectorAll('.hero h1 .line').forEach((line, i) => {
      const span = document.createElement('span');
      span.textContent = line.textContent;
      span.style.animationDelay = `${0.15 + i * 0.12}s`;
      line.textContent = '';
      line.appendChild(span);
    });
  }

  // ---------- Scroll reveals ----------
  if (motionOn) {
    const targets = document.querySelectorAll(REVEAL_SELECTOR);
    if (targets.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const siblings = Array.from(entry.target.parentElement.children);
              const index = siblings.indexOf(entry.target);
              entry.target.style.transitionDelay = `${Math.min(index, 5) * 60}ms`;
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      targets.forEach((el) => observer.observe(el));
    } else {
      targets.forEach((el) => el.classList.add('is-visible'));
    }
  }

  // ---------- Animated stat counters ----------
  const statEls = document.querySelectorAll('.stat-num[data-count-to]');
  if (statEls.length) {
    const animateCount = (el) => {
      const target = parseFloat(el.dataset.countTo);
      const suffix = el.dataset.suffix || '';
      if (!motionOn) {
        el.textContent = target.toLocaleString() + suffix;
        return;
      }
      const duration = 1500;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = value.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      statEls.forEach((el) => obs.observe(el));
    } else {
      statEls.forEach(animateCount);
    }
  }

  // ---------- Magnetic button ----------
  if (motionOn && canHover) {
    document.querySelectorAll('.btn-magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const px = e.clientX - rect.left - rect.width / 2;
        const py = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${(px * 0.3).toFixed(1)}px, ${(py * 0.4).toFixed(1)}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
