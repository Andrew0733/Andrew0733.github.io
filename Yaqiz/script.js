/* ============================================
   YAQIZ — Driver Safety App Case Study
   JavaScript · Animations & Interactions
   ============================================ */

(function () {
  'use strict';

  // Wait for everything to load (including deferred GSAP)
  window.addEventListener('load', init);

  function init() {
    initCursor();
    initMobileNav();
    initRevealObserver();
    initBarAnimations();
    initGSAPAnimations();
  }

  /* ---------- CUSTOM CURSOR ---------- */
  function initCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    // Use transform for smoother performance
    document.addEventListener('mousemove', function (e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    // Interactive elements that trigger cursor grow
    const interactiveSelectors = [
      'a',
      'button',
      '.swatch',
      '.stat-card',
      '.feature-card',
      '.comp-card',
      '.flow-step',
      '.cta-btn',
      '.gallery-frame',
      '.social-links a',
      '.contact-form input',
      '.contact-form textarea'
    ];

    const interactiveEls = document.querySelectorAll(interactiveSelectors.join(', '));

    interactiveEls.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('grow');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('grow');
      });
    });
  }

  /* ---------- MOBILE NAV ---------- */
  function initMobileNav() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isOpen);

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- INTERSECTION OBSERVER (Reveals & Bars) ---------- */
  function initRevealObserver() {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- BAR FILL ANIMATIONS ---------- */
  function initBarAnimations() {
    var barObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');

            // Set the width from data-percent attribute
            var percent = entry.target.getAttribute('data-percent');
            if (percent) {
              var fill = entry.target.querySelector('.bar-fill-anim');
              if (fill) {
                fill.style.width = percent + '%';
              }
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.bar-item').forEach(function (el) {
      barObserver.observe(el);
    });
  }

  /* ---------- GSAP ANIMATIONS ---------- */
  function initGSAPAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded — skipping animations.');
      // Still show content even without GSAP
      showAllContent();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // --- Split hero text into characters ---
    document.querySelectorAll('.split').forEach(function (el) {
      var text = el.textContent;
      el.innerHTML = '';
      var chars = text.split('');
      chars.forEach(function (c) {
        var span = document.createElement('span');
        span.className = 'char';
        span.textContent = c === ' ' ? '\u00A0' : c;
        el.appendChild(span);
      });
    });

    // --- Hero character animation ---
    gsap.to('.char', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.04,
      ease: 'expo.out',
      delay: 0.3
    });

    // --- Hero parallax ---
    gsap.to('.hero h1', {
      yPercent: -20,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // --- Stat cards ---
    gsap.from('.stat-card', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.stat-cards',
        start: 'top 80%',
        once: true
      }
    });

    // --- Feature cards ---
    gsap.from('.feature-card', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 80%',
        once: true
      }
    });

    // --- Insight cards ---
    // --- Insight cards (each one gets its own trigger) ---
document.querySelectorAll('.insight-card').forEach(function (card) {
  gsap.from(card, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      once: true
    }
  });
});

    // --- Gallery frames (each one gets its own trigger) ---
    document.querySelectorAll('.gallery-frame').forEach(function (frame) {
      gsap.from(frame, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: frame,
          start: 'top 80%',
          once: true
        }
      });
    });

    // --- Gallery captions (each one gets its own trigger) ---
    document.querySelectorAll('.gallery-caption').forEach(function (caption) {
      var isReverse = caption.closest('.gallery-item').classList.contains('reverse');
      gsap.from(caption, {
        x: isReverse ? -40 : 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: caption,
          start: 'top 80%',
          once: true
        }
      });
    });

    // --- Flow steps ---
    gsap.from('.flow-step, .flow-decision, .flow-arrow', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.flow-linear',
        start: 'top 70%',
        once: true
      }
    });

    // --- Component cards ---
    // --- Component cards (each one gets its own trigger) ---
document.querySelectorAll('.comp-card').forEach(function (card) {
  gsap.from(card, {
    y: 40,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 90%',
      once: true
    }
  });
});

    // --- Swatches ---
    gsap.from('.swatch', {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.palette-row',
        start: 'top 80%',
        once: true
      }
    });
  }

  /* ---------- FALLBACK: Show all content if GSAP fails ---------- */
  function showAllContent() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('in');
    });
    document.querySelectorAll('.char').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    document.querySelectorAll('.bar-item').forEach(function (el) {
      el.classList.add('in');
      var percent = el.getAttribute('data-percent');
      var fill = el.querySelector('.bar-fill-anim');
      if (fill && percent) {
        fill.style.width = percent + '%';
      }
    });
  }
})();