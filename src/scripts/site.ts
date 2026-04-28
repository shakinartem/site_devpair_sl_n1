import gsap from 'gsap';

const root = document.documentElement;
const body = document.body;
const loader = document.querySelector<HTMLElement>('[data-loader]');
const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
const heroEls = Array.from(document.querySelectorAll<HTMLElement>('[data-animate="hero"] [data-animate-item]'));
const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
const cursor = document.querySelector<HTMLElement>('[data-luxury-cursor]');

let raf = 0;

const setCursor = (x: number, y: number) => {
  root.style.setProperty('--cursor-x', `${x}px`);
  root.style.setProperty('--cursor-y', `${y}px`);
};

const updateParallax = () => {
  const viewportCenter = window.innerHeight / 2;

  parallaxEls.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const offset = (rect.top + rect.height / 2 - viewportCenter) / window.innerHeight;
    element.style.transform = `translate3d(0, ${offset * -18}px, 0) scale(1.02)`;
  });
};

const observeReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealEls.forEach((element) => observer.observe(element));
};

const initCursor = () => {
  if (!cursor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return;
  }

  body.dataset.cursorActive = 'true';

  window.addEventListener(
    'pointermove',
    (event) => {
      setCursor(event.clientX, event.clientY);
    },
    { passive: true }
  );
};

const initLoader = () => {
  if (!loader) return;

  gsap.to(loader, {
    opacity: 0,
    duration: 0.75,
    delay: 0.35,
    ease: 'power2.out',
    onComplete: () => {
      loader.classList.add('is-hidden');
    }
  });
};

const initHero = () => {
  if (!heroEls.length) return;

  gsap.from(heroEls, {
    y: 24,
    opacity: 0,
    duration: 1.15,
    delay: 0.15,
    stagger: 0.08,
    ease: 'power3.out'
  });
};

const scheduleParallax = () => {
  const loop = () => {
    updateParallax();
    raf = window.requestAnimationFrame(loop);
  };

  raf = window.requestAnimationFrame(loop);
};

window.addEventListener('load', () => {
  observeReveal();
  initCursor();
  initLoader();
  initHero();
  scheduleParallax();
});

window.addEventListener('beforeunload', () => {
  if (raf) {
    window.cancelAnimationFrame(raf);
  }
});
