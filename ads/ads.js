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
      'a', 'button', '.feature-card', '.p-step',
      '.skill-card', '.ad-frame', '.cta-btn',
      '.social-links a', '.contact-form input',
      '.contact-form textarea'
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
      stagger: 0.04, ease: 'expo.out', delay: 0.3
    });

    gsap.to('.hero h1', {
      yPercent: -20,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });

    gsap.from('.feature-card', {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.features-grid', start: 'top 80%', once: true }
    });

    document.querySelectorAll('.p-step').forEach(function (step) {
      gsap.from(step, {
        y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: step, start: 'top 85%', once: true }
      });
    });

    document.querySelectorAll('.ad-frame').forEach(function (frame) {
      gsap.from(frame, {
        y: 80, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: frame, start: 'top 80%', once: true }
      });
    });

    document.querySelectorAll('.ad-info').forEach(function (info) {
      var isReverse = info.closest('.ad-item').classList.contains('reverse');
      gsap.from(info, {
        x: isReverse ? -40 : 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: info, start: 'top 80%', once: true }
      });
    });

    document.querySelectorAll('.skill-card').forEach(function (card) {
      gsap.from(card, {
        y: 40, opacity: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 90%', once: true }
      });
    });
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