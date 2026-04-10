/* ============================================
   AgroGuardAI Main JS v2
   ============================================ */

'use strict';

/* --- Header scroll effect --- */
(function () {
  const header = document.querySelector('.header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* --- Mobile menu toggle --- */
(function () {
  const toggle = document.querySelector('.header__mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    // swap icon
    toggle.innerHTML = isOpen
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  });

  // close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

/* --- Active nav link --- */
(function () {
  const links = document.querySelectorAll('.header__nav-link');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* --- Intersection Observer: animate-on-scroll --- */
(function () {
  const els = document.querySelectorAll('.animate-on-scroll');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings in same parent
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.animate-on-scroll:not(.visible)'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* Hero Canvas Animation removed in favor of realistic background image */

/* --- Tabs system --- */
(function () {
  document.querySelectorAll('[data-tabs]').forEach(tabContainer => {
    const tabs = tabContainer.querySelectorAll('.tab');
    const panels = tabContainer.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = tabContainer.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
})();

/* --- Pricing toggle --- */
(function () {
  const toggle = document.querySelector('.pricing-toggle__switch');
  if (!toggle) return;

  const monthlyLabel = document.querySelector('[data-period="monthly"]');
  const annualLabel  = document.querySelector('[data-period="annual"]');
  const prices       = document.querySelectorAll('[data-monthly]');

  let isAnnual = false;

  toggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    toggle.classList.toggle('active', isAnnual);

    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
    if (annualLabel)  annualLabel.classList.toggle('active',  isAnnual);

    prices.forEach(el => {
      el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
    });

    document.querySelectorAll('[data-period-label]').forEach(el => {
      el.textContent = isAnnual ? '/yr' : '/mo';
    });
  });
})();

/* --- Code copy buttons --- */
(function () {
  document.querySelectorAll('.code-block__copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block').querySelector('pre');
      if (!pre) return;
      navigator.clipboard.writeText(pre.innerText).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = 'var(--forest-green-light)';
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.color = '';
        }, 2000);
      });
    });
  });
})();

/* --- Smooth scroll for anchor links --- */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

/* --- Contact form --- */
(function () {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const orig = btn ? btn.textContent : '';
    if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

    // simulate async submission (replace with real endpoint)
    await new Promise(r => setTimeout(r, 1200));

    // show success
    form.innerHTML = `
      <div style="text-align:center;padding:var(--space-3xl) var(--space-xl);">
        <div style="width:64px;height:64px;background:rgba(34,139,34,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-lg);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--forest-green)" stroke-width="2.5"><polyline points="20,6 9,17 4,12"/></svg>
        </div>
        <h3 style="color:var(--text-primary);margin-bottom:var(--space-sm);">Message Sent</h3>
        <p style="color:var(--text-muted);">Thanks for reaching out — we'll get back to you within 24 hours.</p>
      </div>`;
  });
})();

/* --- Stat counter animation --- */
(function () {
  const statEls = document.querySelectorAll('.stat-block__number[data-count]');
  if (!statEls.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function animateCount(el) {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const val = target * easeOut(progress);
      const display = Number.isInteger(target) ? Math.floor(val) : val.toFixed(1);
      el.textContent = prefix + display + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => observer.observe(el));
})();
