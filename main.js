/* ============================================
   AgroGuardAI Main JavaScript v3
   Production-Grade Architecture
   ============================================ */

'use strict';

/**
 * Header Scroll Effect
 * Adds visual feedback when user scrolls down the page
 */
(function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initialize on page load
})();

/**
 * Mobile Menu Toggle
 * Manages mobile navigation drawer
 */
(function initMobileMenu() {
  const toggle = document.querySelector('.header__mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  const toggleMenu = () => {
    const isOpen = menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Update toggle icon
    toggle.innerHTML = isOpen
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  };

  toggle.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });
  });
})();

/**
 * Active Navigation Link
 * Highlights the current page in the navigation
 */
(function initActiveNavLink() {
  const links = document.querySelectorAll('.header__nav-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/**
 * Intersection Observer: Scroll Animations
 * Animates elements as they come into view
 */
(function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger animation for sibling elements
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.animate-on-scroll:not(.visible)'));
        const index = siblings.indexOf(entry.target);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();

/**
 * Tab System
 * Manages tabbed content sections
 */
(function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const tabs = container.querySelectorAll('.tab');
    const panels = container.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPanel = tab.dataset.tab;

        // Deactivate all tabs and panels
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        // Activate selected tab and panel
        tab.classList.add('active');
        const panel = container.querySelector(`[data-panel="${targetPanel}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
})();

/**
 * Pricing Toggle
 * Switches between monthly and annual pricing
 */
(function initPricingToggle() {
  const toggle = document.querySelector('.pricing-toggle__switch');
  if (!toggle) return;

  const monthlyLabel = document.querySelector('[data-period="monthly"]');
  const annualLabel = document.querySelector('[data-period="annual"]');
  const prices = document.querySelectorAll('[data-monthly]');

  let isAnnual = false;

  toggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    toggle.classList.toggle('active', isAnnual);

    // Update toggle switch position
    const switchSpan = toggle.querySelector('span');
    if (switchSpan) {
      switchSpan.style.left = isAnnual ? '30px' : '2px';
    }

    // Update toggle background
    toggle.style.background = isAnnual ? 'var(--color-primary-500)' : 'var(--color-neutral-300)';

    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
    if (annualLabel) annualLabel.classList.toggle('active', isAnnual);

    if (monthlyLabel) monthlyLabel.style.fontWeight = isAnnual ? '500' : '600';
    if (monthlyLabel) monthlyLabel.style.color = isAnnual ? 'var(--color-text-secondary)' : 'var(--color-text-primary)';
    if (annualLabel) annualLabel.style.fontWeight = isAnnual ? '600' : '500';
    if (annualLabel) annualLabel.style.color = isAnnual ? 'var(--color-text-primary)' : 'var(--color-text-secondary)';

    prices.forEach(el => {
      el.textContent = isAnnual ? '$' + el.dataset.annual : '$' + el.dataset.monthly;
    });

    document.querySelectorAll('[data-period-label]').forEach(el => {
      el.textContent = isAnnual ? '/yr' : '/mo';
    });
  });
})();

/**
 * Code Copy Button
 * Allows users to copy code snippets to clipboard
 */
(function initCodeCopy() {
  document.querySelectorAll('.code-block__copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      const pre = btn.closest('.code-block').querySelector('pre');
      if (!pre) return;

      try {
        await navigator.clipboard.writeText(pre.innerText);

        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = 'var(--color-primary-300)';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });
})();

/**
 * Smooth Scroll for Anchor Links
 * Provides smooth scrolling to page sections
 */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

/**
 * Contact Form Submission
 * Handles form submission with Formspree integration
 */
(function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const originalText = btn ? btn.textContent : '';

    if (btn) {
      btn.textContent = 'Sending...';
      btn.disabled = true;
    }

    try {
      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Use environment variable or proxy to backend to prevent exposing the Formspree endpoint
      const endpoint = (window.ENV && window.ENV.FORMSPREE_ENDPOINT) ? window.ENV.FORMSPREE_ENDPOINT : '/api/contact';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Show success message
        form.innerHTML = `
          <div style="text-align:center;padding:var(--space-12) var(--space-4);">
            <div style="width:64px;height:64px;background:var(--color-primary-50);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-4);">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-600)" stroke-width="2.5"><polyline points="20,6 9,17 4,12"/></svg>
            </div>
            <h3 style="color:var(--color-text-primary);margin-bottom:var(--space-2);font-size:var(--font-size-xl);">Message Sent</h3>
            <p style="color:var(--color-text-muted);font-size:var(--font-size-sm);">Thanks for reaching out — we'll get back to you within 24 hours.</p>
          </div>`;
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      if (btn) {
        btn.textContent = originalText;
        btn.disabled = false;
      }
      alert('Failed to send message. Please try again or contact us directly.');
    }
  });
})();

/**
 * Stat Counter Animation
 * Animates numeric counters when they come into view
 */
(function initStatCounters() {
  const statElements = document.querySelectorAll('.stat-block__number[data-count]');
  if (!statElements.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = target * easeOut(progress);
      const display = Number.isInteger(target) ? Math.floor(value) : value.toFixed(1);

      el.textContent = prefix + display + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statElements.forEach(el => observer.observe(el));
})();

/**
 * Photo Upload Handler
 * Handles image uploads for crop diagnosis
 */
(function initPhotoUpload() {
  const uploadInput = document.querySelector('#photo-upload');
  const uploadPreview = document.querySelector('#upload-preview');
  const uploadBtn = document.querySelector('#upload-btn');

  if (!uploadInput || !uploadPreview) return;

  uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Read and display preview
    const reader = new FileReader();
    reader.onload = (event) => {
      uploadPreview.innerHTML = `
        <img src="${event.target.result}" alt="Preview" style="max-width:100%;border-radius:var(--radius-lg);margin-bottom:var(--space-4);">
        <p style="color:var(--color-text-secondary);font-size:var(--font-size-sm);">Ready to analyze</p>
      `;
      if (uploadBtn) uploadBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  });

  // Handle upload button click
  if (uploadBtn) {
    uploadBtn.addEventListener('click', async () => {
      const file = uploadInput.files[0];
      if (!file) return;

      uploadBtn.textContent = 'Analyzing...';
      uploadBtn.disabled = true;

      try {
        // Simulate analysis (replace with real API call)
        await new Promise(resolve => setTimeout(resolve, 2000));

        uploadPreview.innerHTML = `
          <div style="text-align:center;padding:var(--space-8);">
            <div style="width:64px;height:64px;background:var(--color-primary-50);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-4);">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-600)" stroke-width="2.5"><polyline points="20,6 9,17 4,12"/></svg>
            </div>
            <h4 style="color:var(--color-text-primary);margin-bottom:var(--space-2);">Analysis Complete</h4>
            <p style="color:var(--color-text-secondary);font-size:var(--font-size-sm);">Disease detected: Early Blight<br>Confidence: 94%<br><br><strong>Recommendation:</strong> Apply fungicide treatment within 48 hours</p>
          </div>
        `;
      } catch (error) {
        console.error('Upload error:', error);
        uploadBtn.textContent = 'Try Again';
        uploadBtn.disabled = false;
        alert('Analysis failed. Please try again.');
      }
    });
  }
})();

/**
 * Utility: Debounce Function
 * Prevents excessive function calls during rapid events
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const context = this;
    const later = () => {
      clearTimeout(timeout);
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Window Resize Handler
 * Handles responsive behavior on window resize
 */
(function initResizeHandler() {
  const handleResize = debounce(() => {
    // Add any resize-specific logic here
  }, 250);

  window.addEventListener('resize', handleResize, { passive: true });
})();

// Export for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { debounce };
}
