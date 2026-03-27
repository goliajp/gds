// L0 — motion system
// duration scale, easing presets, spring configs
// adapts to motion axis (off/reduced/full)

export type MotionLevel = 'full' | 'off' | 'reduced'

// duration scale — geometric progression from a base
// base=100ms, each tier ≈ 2× (100 → 200 → 300 → 500)
const DURATION_BASE = 100

const DURATION_MULTIPLIERS = {
  fast: 1,      // 100ms — hover, micro-feedback
  normal: 2,    // 200ms — panel expand, tab switch
  slow: 3,      // 300ms — modal, page transition
  slower: 5,    // 500ms — complex orchestration
} as const

// motion level factor — scales all durations
const LEVEL_FACTOR: Record<MotionLevel, number> = {
  off: 0,       // instant — 0ms everything
  reduced: 0.5, // halved — still perceptible but quick
  full: 1.0,    // standard
}

export function duration(tier: keyof typeof DURATION_MULTIPLIERS, level: MotionLevel): number {
  return Math.round(DURATION_BASE * DURATION_MULTIPLIERS[tier] * LEVEL_FACTOR[level])
}

// easing presets — CSS cubic-bezier
export const easing = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',   // material standard
  in: 'cubic-bezier(0.4, 0, 1, 1)',           // accelerate
  out: 'cubic-bezier(0, 0, 0.2, 1)',          // decelerate
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',      // symmetric
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // overshoot bounce
  bounce: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)', // elastic
} as const

// spring physics presets — tension / friction pairs
// formula: force = (target - current) × tension - velocity × friction
export const springPresets = {
  default: { tension: 170, friction: 26 },  // balanced, general purpose
  gentle: { tension: 120, friction: 14 },   // slow, floaty
  bouncy: { tension: 300, friction: 10 },   // snappy with overshoot
  stiff: { tension: 400, friction: 28 },    // fast, no overshoot
  slow: { tension: 100, friction: 20 },     // deliberate, heavy
} as const

export type SpringPresetId = keyof typeof springPresets

// keyframe presets — named animation patterns
export const keyframePresets = {
  fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
  fadeOut: { from: { opacity: 1 }, to: { opacity: 0 } },
  scaleIn: { from: { opacity: 0, transform: 'scale(0.95)' }, to: { opacity: 1, transform: 'scale(1)' } },
  scaleOut: { from: { opacity: 1, transform: 'scale(1)' }, to: { opacity: 0, transform: 'scale(0.95)' } },
  slideUp: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
  slideDown: { from: { opacity: 0, transform: 'translateY(-8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
  slideLeft: { from: { opacity: 0, transform: 'translateX(8px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
  slideRight: { from: { opacity: 0, transform: 'translateX(-8px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
} as const

export type KeyframePresetId = keyof typeof keyframePresets

export function motionToCssVars(level: MotionLevel): Record<string, string> {
  return {
    '--gds-duration-fast': `${duration('fast', level)}ms`,
    '--gds-duration-normal': `${duration('normal', level)}ms`,
    '--gds-duration-slow': `${duration('slow', level)}ms`,
    '--gds-duration-slower': `${duration('slower', level)}ms`,
    '--gds-ease-default': easing.default,
    '--gds-ease-in': easing.in,
    '--gds-ease-out': easing.out,
    '--gds-ease-spring': easing.spring,
  }
}
