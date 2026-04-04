// L-dep internal utilities
// available to ALL layers — these are foundation-level tools

export { focusCls, srOnly } from './a11y'
export { cx } from './cx'
export { clamp, isActivationKey, mergeRefs, uid } from './dom'
// gesture exports deferred — will be added when L5 components need them
export { glassClass, glassSurface } from './glass'
export { glowClass } from './glow'
export type { GlowColor } from './glow'
export {
  useClickOutside,
  useEscapeKey,
  useFocusTrap,
  useIsDesktop,
  useIsMobile,
  useMediaQuery,
  useScrollLock,
} from './hooks'
export { motionClass, motionClassWithSpeed } from './motion'
export { renderPortal } from './portal'
export type {
  Align,
  AsProps,
  ButtonProps,
  ComponentBase,
  DataAttributes,
  DataRecord,
  DivProps,
  GDSInteractiveProps,
  GlassMotionProps,
  GlowColor as GlowColorType,
  InputProps,
  MergeProps,
  MotionPreset,
  Orientation,
  PartialExcept,
  Placement,
  RequireKeys,
  Side,
  Size,
  SvgProps,
  VariantProps,
} from './types'

// sanitize/tiptap exports deferred — will be added when editor components need them
