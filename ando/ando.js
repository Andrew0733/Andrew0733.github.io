(function () {
  'use strict';
  window.addEventListener('load', init);

  function init() {
    initCursor();
    initMobileNav();
    initRevealObserver();
    initGSAPAnimations();
  }

  function initCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;
    document.addEventListener('mousemove', function (e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    const selectors = [
      'a', 'button', '.feature-card', '.skill-card',
      '.tee-frame', '.cta-btn', '.social-links a',
      '.contact-form input', '.contact-form textarea',
      '.color-swatch', '.type-card', '.logo-display',
      '.size-chart-frame', '.sf-item'
    ];
    document.querySelectorAll(selectors.join(', ')).forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('grow'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('grow'); });
    });
  }

  function initMobileNav() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  function initRevealObserver() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  function initGSAPAnimations() {
    if (typeof gsap === 'undefined') { showAllContent(); return; }
    gsap.registerPlugin(ScrollTrigger);

    // Split hero
    document.querySelectorAll('.split').forEach(function (el) {
      var text = el.textContent; el.innerHTML = '';
      text.split('').forEach(function (c) {
        var span = document.createElement('span');
        span.className = 'char';
        span.textContent = c === ' ' ? '\u00A0' : c;
        el.appendChild(span);
      });
    });

    gsap.to('.char', {
      y: 0, opacity: 1, duration: 1.2,
      stagger: 0.08, ease: 'expo.out', delay: 0.3
    });

    gsap.to('.hero h1', {
      yPercent: -20,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });

    // ------ SAFE ANIMATION HELPER ------
    // Uses IntersectionObserver instead of ScrollTrigger for card animations
    // Prevents elements from getting stuck invisible
    function animateOnScroll(selector, animation) {
      var elements = document.querySelectorAll(selector);
      if (!elements.length) return;

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = parseFloat(el.dataset.delay || 0);
            gsap.fromTo(el,
              animation.from,
              Object.assign({}, animation.to, { delay: delay })
            );
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      elements.forEach(function (el, i) {
        el.dataset.delay = (i * (animation.stagger || 0)).toString();
        observer.observe(el);
      });
    }

    // Feature cards (About section)
    animateOnScroll('.feature-card', {
      from: { y: 40, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      stagger: 0.15
    });

    // Color swatches
    animateOnScroll('.color-swatch', {
      from: { y: 40, opacity: 0, scale: 0.8 },
      to: { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
      stagger: 0.1
    });

    // Type cards
    animateOnScroll('.type-card', {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      stagger: 0.15
    });

    // Tee frames
    animateOnScroll('.tee-frame', {
      from: { y: 80, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    });

    // Tee info blocks
    document.querySelectorAll('.tee-info').forEach(function (info) {
      var isReverse = info.closest('.tee-item').classList.contains('reverse');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            gsap.fromTo(entry.target,
              { x: isReverse ? -40 : 40, opacity: 0 },
              { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
            );
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(info);
    });

    // Sizing features
    animateOnScroll('.sf-item', {
      from: { x: -30, opacity: 0 },
      to: { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      stagger: 0.15
    });

    // Skill cards
    animateOnScroll('.skill-card', {
      from: { y: 40, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      stagger: 0.1
    });

    // Force ScrollTrigger refresh after everything is set up
    setTimeout(function () {
      if (ScrollTrigger.refresh) ScrollTrigger.refresh();
    }, 500);
  }

  function showAllContent() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('in');
    });
    document.querySelectorAll('.char').forEach(function (el) {
      el.style.opacity = '1'; el.style.transform = 'translateY(0)';
    });
  }
})();