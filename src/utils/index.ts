// L-dep internal utilities
// available to ALL layers — these are foundation-level tools

export { focusCls, srOnly } from './a11y'
export { cx } from './cx'
export { clamp, isActivationKey, mergeRefs, uid } from './dom'
export type { DragHandler, DragState, SwipeHandler } from './gesture'
export { applyInertia, useDrag, useLongPress, useSwipe } from './gesture'
export { glassClass, glassSurface } from './glass'
export {
  useClickOutside, useEscapeKey, useFocusTrap,
  useIsDesktop, useIsMobile, useMediaQuery, useScrollLock,
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
  GlassMotionProps,
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

// v2: anti-corruption wrappers for optional peer deps
// these re-export external libs so component code never imports them directly
// consumers only need these installed if they use RichTextEditor / EmailThread
export type { SanitizeConfig } from './sanitize'
export { sanitizeEmailHtml } from './sanitize'
