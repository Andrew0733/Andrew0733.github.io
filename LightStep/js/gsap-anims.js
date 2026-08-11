/* ═══════════════════════════════════════════
   GSAP ANIMATIONS
   — hero text split
   — hero parallax
   — stat cards entrance
   — per-item gallery entrance
   — flow nodes entrance
═══════════════════════════════════════════ */
(function () {
  'use strict';

  // Wait until GSAP + ScrollTrigger are ready
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Respect reduced motion
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  /* ── 1. HERO TITLE — SPLIT TEXT ─────────────── */
  document.querySelectorAll('.split').forEach((el) => {
    const text = el.textContent;
    el.innerHTML = '';
    el.setAttribute('aria-label', text); // keep accessible label

    [...text].forEach((char) => {
      const span = document.createElement('span');
      span.className   = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.setAttribute('aria-hidden', 'true');
      el.appendChild(span);
    });
  });

  gsap.to('.char', {
    y:        0,
    opacity:  1,
    duration: 1.2,
    stagger:  0.04,
    ease:     'expo.out',
    delay:    0.3,
  });

  /* ── 2. HERO PARALLAX ────────────────────────── */
  gsap.to('.hero h1', {
    yPercent: -20,
    ease:     'none',
    scrollTrigger: {
      trigger: '.hero',
      start:   'top top',
      end:     'bottom top',
      scrub:   1,
    },
  });

  /* ── 3. STAT CARDS ───────────────────────────── */
  gsap.from('.stat-card', {
    y:        60,
    opacity:  0,
    duration: 0.8,
    stagger:  0.1,
    ease:     'power3.out',
    scrollTrigger: {
      trigger: '.stat-cards',
      start:   'top 80%',
    },
  });

  /* ── 4. GALLERY — animate each item individually */
  document.querySelectorAll('.gallery-item').forEach((item) => {
    const frame   = item.querySelector('.gallery-frame');
    const caption = item.querySelector('.gallery-caption');
    const isReverse = item.classList.contains('reverse');

    if (frame) {
      gsap.from(frame, {
        y:        80,
        opacity:  0,
        duration: 1.2,
        ease:     'power3.out',
        scrollTrigger: {
          trigger: item,
          start:   'top 80%',
        },
      });
    }

    if (caption) {
      gsap.from(caption, {
        x:        isReverse ? -40 : 40,
        opacity:  0,
        duration: 1,
        ease:     'power3.out',
        scrollTrigger: {
          trigger: item,
          start:   'top 80%',
        },
      });
    }
  });

  /* ── 5. FLOW NODES ───────────────────────────── */
  gsap.from('.node', {
    x:        -40,
    opacity:  0,
    duration: 0.6,
    stagger:  0.05,
    ease:     'power2.out',
    scrollTrigger: {
      trigger: '.flow-split',
      start:   'top 70%',
    },
  });

  gsap.from('.center-node, .decision', {
    scale:    0,
    opacity:  0,
    duration: 0.6,
    stagger:  0.08,
    ease:     'back.out(1.5)',
    scrollTrigger: {
      trigger: '.flow-center',
      start:   'top 70%',
    },
  });
})();