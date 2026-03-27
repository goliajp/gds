// @goliapkg/gds — GOLIA Design System
// public API surface

// L0 — tokens (CSS imported separately: @import '@goliapkg/gds/tokens.css')
export type { DepInfo } from './l0-tokens/deps'
export { GDS_DEPS, GDS_INFRA, GDS_INTERNAL_UTILS, LAYER_DEP_CONSTRAINTS } from './l0-tokens/deps'
// L0 — all token systems
export * from './l0-tokens'

// L1 — systems
export type { ThemeColorOverrides, ThemeMode, ThemeState } from './l1-systems/theme'
export { DEFAULT_THEME, resolvedModeAtom, resolveThemeCssVars, themeAtom } from './l1-systems/theme'
export {
  configureTheme,
  useResetTheme,
  useResolvedMode,
  useSetThemeColors,
  useSetThemeDensity,
  useSetThemeElevation,
  useSetThemeGlass,
  useSetThemeMode,
  useSetThemeMotion,
  useSetThemePreset,
  useSetThemeShape,
  useTheme,
  useThemeEffect,
} from './l1-systems/use-theme'

// L2 — primitives
export * from './l2-primitives'

// L3 — atoms
export * from './l3-atoms'

// L4 — molecules
export * from './l4-molecules'

// L5 — organisms
export * from './l5-organisms'

// L6 — charts
export * from './l6-charts'

// L7 — patterns
export * from './l7-patterns'

// L-dep internal utils — available to all layers
export { focusCls, srOnly } from './utils/a11y'
export { cx } from './utils/cx'
export { clamp, isActivationKey, mergeRefs, uid } from './utils/dom'
export type {
  AsProps,
  DataRecord,
  MergeProps,
  PartialExcept,
  RequireKeys,
  VariantProps,
} from './utils/types'
