import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const body = document.body;
const loader = document.querySelector<HTMLElement>('[data-loader]');
const cursor = document.querySelector<HTMLElement>('[data-luxury-cursor]');
const navShell = document.querySelector<HTMLElement>('[data-nav-shell]');
const navToggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const navPanel = document.querySelector<HTMLElement>('[data-nav-panel]');
const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
const heroItems = Array.from(document.querySelectorAll<HTMLElement>('[data-animate="hero"] [data-animate-item]'));
const parallaxTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
const tiltTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]'));
const toneSections = Array.from(document.querySelectorAll<HTMLElement>('[data-tone]'));
const reviewWall = document.querySelector<HTMLElement>('[data-review-wall]');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis: Lenis | null = null;

const setCursor = (x: number, y: number) => {
  root.style.setProperty('--cursor-x', `${x}px`);
  root.style.setProperty('--cursor-y', `${y}px`);
};

const setBodyTone = (tone?: string) => {
  if (!tone) return;
  body.dataset.tone = tone;
};

const syncNavState = (open: boolean) => {
  body.dataset.navOpen = open ? 'true' : 'false';
  navToggle?.setAttribute('aria-expanded', open ? 'true' : 'false');
};

const closeNav = () => syncNavState(false);

const initLoader = () => {
  if (!loader) return;

  gsap.to(loader, {
    opacity: 0,
    duration: 0.7,
    delay: 0.2,
    ease: 'power2.out',
    onComplete: () => {
      loader.classList.add('is-hidden');
    }
  });
};

const initHeroIntro = () => {
  if (!heroItems.length) return;

  const heroTl = gsap.timeline({ delay: 0.15 });

  heroTl.fromTo(
    heroItems,
    { y: 22, opacity: 0, clipPath: 'inset(0 0 18% 0)' },
    {
      y: 0,
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.9,
      stagger: 0.08,
      ease: 'power3.out'
    }
  );

  heroTl.fromTo(
    '.hero-visual',
    { y: 28, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
    '<0.1'
  );
}

const initRevealAnimations = () => {
  revealTargets.forEach((element) => {
    gsap.fromTo(
      element,
      { y: 24, opacity: 0, clipPath: 'inset(0 0 18% 0)' },
      {
        y: 0,
        opacity: 1,
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
};

const initParallax = () => {
  parallaxTargets.forEach((element) => {
    gsap.to(element, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
};

const initToneObserver = () => {
  toneSections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 45%',
      onEnter: () => setBodyTone(section.dataset.tone),
      onEnterBack: () => setBodyTone(section.dataset.tone)
    });
  });

  if (toneSections[0]) {
    setBodyTone(toneSections[0].dataset.tone);
  }
};

const initCursor = () => {
  if (!cursor || reducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return;
  }

  body.dataset.cursorActive = 'false';

  const showCursor = () => {
    body.dataset.cursorActive = 'true';
  };

  const hideCursor = () => {
    body.dataset.cursorActive = 'false';
  };

  window.addEventListener(
    'pointermove',
    (event) => {
      setCursor(event.clientX, event.clientY);
      showCursor();
    },
    { passive: true }
  );

  window.addEventListener('pointerdown', showCursor, { passive: true });
  window.addEventListener('pointerenter', showCursor, { passive: true });
  window.addEventListener('pointerleave', hideCursor, { passive: true });
  window.addEventListener('blur', hideCursor);
};

const initNav = () => {
  if (!navToggle || !navPanel) return;

  navToggle.addEventListener('click', () => {
    const open = body.dataset.navOpen === 'true';
    syncNavState(!open);
  });

  navPanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  document.addEventListener('click', (event) => {
    if (!body.dataset.navOpen || body.dataset.navOpen !== 'true') return;
    const target = event.target as Node | null;
    if (!target || !navShell || !navShell.contains(target)) {
      closeNav();
    }
  });
};

const initTilt = () => {
  if (reducedMotion || !tiltTargets.length) return;

  tiltTargets.forEach((element) => {
    const reset = () => {
      element.style.setProperty('--tilt-x', '0px');
      element.style.setProperty('--tilt-y', '0px');
    };

    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      element.style.setProperty('--tilt-x', `${x}px`);
      element.style.setProperty('--tilt-y', `${y}px`);
    });

    element.addEventListener('pointerleave', reset);
  });
};

const initReviewWall = () => {
  if (!reviewWall || reducedMotion) return;

  reviewWall.addEventListener('pointermove', (event) => {
    const rect = reviewWall.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    reviewWall.style.setProperty('--review-progress', progress.toFixed(3));
  });
};

const startSmoothScroll = () => {
  if (reducedMotion) return;

  lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    touchMultiplier: 1.6,
    lerp: 0.09
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
}

const initScrollHooks = () => {
  if (reducedMotion) return;

  ScrollTrigger.refresh();
};

const init = () => {
  if (body.dataset.codexReady === 'true') return;
  body.dataset.codexReady = 'true';

  syncNavState(false);
  initNav();
  initCursor();
  initTilt();
  initReviewWall();

  if (reducedMotion) {
    if (toneSections[0]) {
      setBodyTone(toneSections[0].dataset.tone);
    }
    loader?.classList.add('is-hidden');
    return;
  }

  initToneObserver();
  initRevealAnimations();
  initParallax();
  initHeroIntro();
  initLoader();
  initScrollHooks();
  startSmoothScroll();
};

window.addEventListener('load', init);

window.addEventListener('beforeunload', () => {
  lenis?.destroy();
});
