/* ═══════════════════════════════════════════
   REVEAL — scroll-triggered fade-in
   Excludes footer elements (always visible)
═══════════════════════════════════════════ */
(function () {
  'use strict';

  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Make everything visible immediately
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('in');
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          // Unobserve after animating — no need to watch again
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  // Observe all .reveal elements EXCEPT those inside <footer>
  document.querySelectorAll('.reveal').forEach((el) => {
    if (!el.closest('footer')) {
      io.observe(el);
    } else {
      // Footer items are always visible — add .in immediately
      el.classList.add('in');
    }
  });
})();