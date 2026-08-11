/* ═══════════════════════════════════════════
   CURSOR — custom mouse follower
═══════════════════════════════════════════ */
(function () {
  'use strict';

  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  // Hide on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    return;
  }

  // Follow mouse
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX - 10}px`;
    cursor.style.top  = `${e.clientY - 10}px`;
  });

  // Grow on interactive elements
  const interactiveSelector = [
    'a',
    'button',
    '.swatch',
    '.stat-card',
    '.node',
    '.cta-btn',
    '.mini-phone',
    '.gallery-frame',
    '.social-links a',
    '.contact-form input',
    '.contact-form textarea',
  ].join(', ');

  document.querySelectorAll(interactiveSelector).forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });
})();