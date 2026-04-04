// L0 — gesture system
// touch/pointer gesture recognition primitives
// defines thresholds, velocities, and directions for gesture detection
// actual React hooks consume these constants (in L-dep utils/hooks)

// gesture direction
export type GestureDirection = 'down' | 'left' | 'right' | 'up'

// swipe detection thresholds
export const swipe = {
  // minimum distance (px) to recognize as swipe, not tap
  minDistance: 30,
  // minimum velocity (px/ms) to count as intentional swipe
  minVelocity: 0.3,
  // maximum deviation in cross-axis (px) — prevents diagonal from triggering
  maxCrossDeviation: 75,
  // animation: how long the dismiss/snap animation takes
  dismissDuration: 200,
  // spring config for snap-back when swipe cancelled
  snapBack: { tension: 300, friction: 25 },
} as const

// pull-to-refresh thresholds
export const pullToRefresh = {
  // how far user must pull before refresh triggers
  triggerDistance: 80,
  // maximum pull distance (resistance beyond this)
  maxDistance: 120,
  // resistance factor after triggerDistance (0-1, lower = more resistance)
  resistanceFactor: 0.4,
  // indicator size
  indicatorSize: 32,
} as const

// pinch zoom thresholds
export const pinchZoom = {
  // minimum scale change to start zooming
  minScaleDelta: 0.05,
  // zoom limits
  minScale: 0.5,
  maxScale: 4.0,
  // snap-to scales (double-tap cycles through these)
  snapScales: [1, 2, 3] as readonly number[],
} as const

// long press
export const longPress = {
  // how long to hold before triggering (ms)
  duration: 500,
  // max movement during press before cancel (px)
  maxMovement: 10,
} as const

// drag
export const drag = {
  // minimum distance before drag starts (prevents accidental drag on tap)
  startThreshold: 5,
  // snap-to-edge distance (px) — item snaps to edge when within this range
  snapDistance: 20,
} as const

// velocity damping — for inertial scroll / flick gestures
export const inertia = {
  // friction multiplier per frame (0.95 = slow stop, 0.99 = long coast)
  friction: 0.95,
  // minimum velocity before stopping (px/ms)
  minVelocity: 0.1,
  // maximum velocity clamp (px/ms)
  maxVelocity: 5,
} as const

// export all thresholds as a single object for L-dep hooks
export const gestureConfig = {
  swipe,
  pullToRefresh,
  pinchZoom,
  longPress,
  drag,
  inertia,
} as const

// CSS vars for gesture-related animations
export function gestureToCssVars(): Record<string, string> {
  return {
    '--gds-gesture-dismiss-duration': `${swipe.dismissDuration}ms`,
    '--gds-gesture-snap-tension': `${swipe.snapBack.tension}`,
    '--gds-gesture-snap-friction': `${swipe.snapBack.friction}`,
    '--gds-gesture-pull-trigger': `${pullToRefresh.triggerDistance}px`,
    '--gds-gesture-pull-max': `${pullToRefresh.maxDistance}px`,
    '--gds-gesture-longpress-duration': `${longPress.duration}ms`,
  }
}
