/* ========================================
   ANDREW HANY PORTFOLIO — MAIN SCRIPT
   ======================================== */

(function () {
  'use strict';
  
  window.addEventListener('load', init);

  function init() {
    initCursor();
    initMobileNav();
    initRevealObserver();
    initSmoothScroll();
    initActiveNavLink();
    initScrollTopButton();
    initPageLoader();
    initProjectCardsLoader();
    initGSAPAnimations();
    console.log('✅ Portfolio scripts loaded successfully');
  }

  /* ==========================================
     1. CUSTOM CURSOR
     ========================================== */
  function initCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;
    
    document.addEventListener('mousemove', function (e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    const selectors = [
      'a', 'button', '.service-card', '.p-step',
      '.project-card', '.tool-card', '.trait',
      '.cta-btn', '.contact-form input', '.contact-form textarea',
      '.qr-item', '.about-image', '.testimonial'
    ];
    
    document.querySelectorAll(selectors.join(', ')).forEach(function (el) {
      el.addEventListener('mouseenter', function () { 
        cursor.classList.add('grow'); 
      });
      el.addEventListener('mouseleave', function () { 
        cursor.classList.remove('grow'); 
      });
    });
  }

  /* ==========================================
     2. MOBILE NAVIGATION
     ========================================== */
  function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;

    // Toggle menu
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('active');
      navMenu.classList.toggle('open'); // للتوافق مع CSS القديم
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        if (navMenu.classList.contains('active')) {
          closeMenu();
        }
      }
    });

    // Close menu with ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });

    function closeMenu() {
      navMenu.classList.remove('active');
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
  }

  /* ==========================================
     3. REVEAL ON SCROLL
     ========================================== */
  function initRevealObserver() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          entry.target.classList.add('visible');
        }
      });
    }, { 
      threshold: 0.1, 
      rootMargin: '0px 0px -50px 0px' 
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ==========================================
     4. SMOOTH SCROLL
     ========================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#' || href.length <= 1) return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = 80;
          const targetPosition = target.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ==========================================
     5. ACTIVE NAV LINK ON SCROLL
     ========================================== */
  function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul a');
    
    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', function () {
      let current = '';
      sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && current && href.includes('#' + current)) {
          link.classList.add('active');
        }
      });
    });
  }

  /* ==========================================
     6. SCROLL TO TOP BUTTON
     ========================================== */
  function initScrollTopButton() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================
     7. PAGE LOADER (on page load)
     ========================================== */
  function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;

    setTimeout(function () {
      loader.classList.add('hidden');
      setTimeout(function () { 
        loader.remove(); 
      }, 600);
    }, 800);
  }

  /* ==========================================
     8. PROJECT CARDS LOADER (on click)
     ========================================== */
  function initProjectCardsLoader() {
    const projectCards = document.querySelectorAll('.project-card');
    if (!projectCards.length) return;

    projectCards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        const href = card.getAttribute('href');
        
        // بس لو الرابط داخلي وموجود
        if (href && !href.startsWith('http') && href !== '#' && href.length > 1) {
          e.preventDefault();
          
          const loader = document.createElement('div');
          loader.className = 'page-loader';
          loader.innerHTML = `
            <div class="loader-content">
              <div class="loader-text">
                <span>L</span><span>O</span><span>A</span><span>D</span><span>I</span><span>N</span><span>G</span>
              </div>
              <div class="loader-bar">
                <div class="loader-progress"></div>
              </div>
            </div>
          `;
          document.body.appendChild(loader);
          
          setTimeout(function () {
            window.location.href = href;
          }, 600);
        }
      });
    });
  }

  /* ==========================================
     9. GSAP ANIMATIONS
     ========================================== */
  function initGSAPAnimations() {
    if (typeof gsap === 'undefined') { 
      showAllContent(); 
      return; 
    }
    
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Split hero title into characters
    document.querySelectorAll('.split').forEach(function (el) {
      const text = el.textContent; 
      el.innerHTML = '';
      text.split('').forEach(function (c) {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = c === ' ' ? '\u00A0' : c;
        el.appendChild(span);
      });
    });

    // Animate characters
    gsap.to('.char', {
      y: 0, 
      opacity: 1, 
      duration: 1.2,
      stagger: 0.05, 
      ease: 'expo.out', 
      delay: 0.3
    });

    // Hero title parallax (desktop only)
    if (window.innerWidth > 768 && typeof ScrollTrigger !== 'undefined') {
      gsap.to('.hero-title', {
        yPercent: -30,
        scrollTrigger: {
          trigger: '.hero', 
          start: 'top top',
          end: 'bottom top', 
          scrub: 1
        }
      });
    }

    // Safe scroll animation helper
    function animateOnScroll(selector, animation) {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;
      
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseFloat(el.dataset.delay || 0);
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

    animateOnScroll('.service-card', {
      from: { y: 40, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      stagger: 0.1
    });

    animateOnScroll('.p-step', {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      stagger: 0.12
    });

    animateOnScroll('.project-card', {
      from: { y: 60, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      stagger: 0.15
    });

    animateOnScroll('.tool-card', {
      from: { y: 30, opacity: 0, scale: 0.9 },
      to: { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
      stagger: 0.08
    });

    animateOnScroll('.trait', {
      from: { x: -20, opacity: 0 },
      to: { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      stagger: 0.08
    });

    // Refresh ScrollTrigger after everything loads
    setTimeout(function () {
      if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.refresh) {
        ScrollTrigger.refresh();
      }
    }, 500);
  }

  /* ==========================================
     10. FALLBACK: Show all content if GSAP fails
     ========================================== */
  function showAllContent() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('in');
      el.classList.add('visible');
    });
    document.querySelectorAll('.char').forEach(function (el) {
      el.style.opacity = '1'; 
      el.style.transform = 'translateY(0)';
    });
  }

})();