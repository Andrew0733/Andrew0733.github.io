/* ═══════════════════════════════════════════
   BARS — animated width progress bars
   Uses data-width attribute, animates via
   IntersectionObserver when bar-item enters
   the viewport. Fixes the broken scaleX bug.
═══════════════════════════════════════════ */
(function () {
  'use strict';

  // Skip animation if user prefers reduced motion
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const item = entry.target;
        item.classList.add('in');

        // Find every bar-fill inside this bar-item and animate
        item.querySelectorAll('.bar-fill').forEach((fill) => {
          const targetWidth = fill.dataset.width || '0';

          if (reducedMotion) {
            // Set instantly, no transition
            fill.style.transition = 'none';
            fill.style.width = `${targetWidth}%`;
          } else {
            // Small rAF delay so transition fires after width:0 is painted
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                fill.style.width = `${targetWidth}%`;
              });
            });
          }
        });

        // Stop watching once animated
        barObserver.unobserve(item);
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.bar-item').forEach((el) => {
    barObserver.observe(el);
  });
})();