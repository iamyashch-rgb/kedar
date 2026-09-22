export type AnimationPreset =
  | 'fade-up'
  | 'fade-in'
  | 'slide-left'
  | 'slide-right'
  | 'scale-up'
  | 'stagger-list'
  | 'parallax-bg';

export interface ScrollTriggerConfig {
  trigger?: string | HTMLElement | null;
  start?: string; // e.g. "top 85%"
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | string | HTMLElement;
  toggleActions?: string;
  markers?: boolean;
}

export interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal';
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
}
