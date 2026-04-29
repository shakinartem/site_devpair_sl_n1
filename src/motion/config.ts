export const motionConfig = {
  easing: {
    luxe: 'power3.out',
    crisp: 'power2.out',
    soft: 'sine.out'
  },
  duration: {
    intro: 0.9,
    reveal: 0.8,
    stagger: 0.08,
    hover: 0.22
  },
  scroll: {
    smooth: 0.06,
    lerp: 0.1
  }
} as const;

export type MotionConfig = typeof motionConfig;
