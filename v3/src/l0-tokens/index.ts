// L0 — Design Tokens
// pure CSS variable definitions + color math, no React runtime

export type { DepInfo } from './deps'
export {
  GDS_DEPS,
  GDS_INFRA,
  GDS_INTERNAL_UTILS,
  LAYER_DEP_CONSTRAINTS,
} from './deps'

// color system
export type { DerivedPalette } from './color-derive'
export {
  deriveDarkPalette,
  deriveLightPalette,
  FIXED_COLORS,
  paletteToVars,
} from './color-derive'
export type {
  HealthDiagnostic,
  HealthLevel,
  HealthReport,
} from './color-health'
export { autoFixColor, bestTextColor, scoreColor } from './color-health'
export type { Hsl, Rgb } from './color-math'
export {
  analogous,
  complement,
  contrastRatio,
  darken,
  hexToHsl,
  hexToRgb,
  hslToHex,
  hslToRgb,
  hueShift,
  lerpColor,
  lighten,
  luminance,
  rgbToHex,
  rgbToHsl,
  saturate,
  triadic,
  withAlpha,
} from './color-math'

// sizing system
export type { SizeTier, SpaceScale } from './size-system'
export {
  componentHeight,
  contentWidth,
  densitySizeMap,
  iconSize,
  sizeToCssVars,
  spacing,
  touchTarget,
} from './size-system'

// radius system
export { radiusScale, radiusToCssVars } from './radius-system'

// shadow system
export { shadowToCssVars, shadowValue } from './shadow-system'

// glass system
export type { GlassLevel } from './glass-system'
export {
  glassParams,
  glassToCssVars,
  supportsBackdropFilter,
} from './glass-system'

// motion system
export type {
  KeyframePresetId,
  MotionLevel,
  SpringPresetId,
} from './motion-system'
export {
  duration,
  easing,
  keyframePresets,
  motionToCssVars,
  springPresets,
} from './motion-system'

// breakpoint system
export type { BreakpointKey, DeviceCategory } from './breakpoint-system'
export {
  between,
  breakpoints,
  breakpointToCssVars,
  detectOverlap,
  deviceCategory,
  maxWidth,
  minWidth,
} from './breakpoint-system'

// font system
export type {
  FontPreset,
  FontPresetKey,
  FontWeightKey,
  SymbolKey,
} from './font-system'
export {
  flexMono,
  fontFeature,
  fontPreset,
  fontStack,
  fontToCssVars,
  fontWeight,
  presetToStyle,
  symbols,
} from './font-system'

// generate defaults — single source of truth for all dynamic tokens
export {
  applyDefaultCssVars,
  DEFAULT_PRIMARY,
  generateDefaultCssVars,
} from './generate-defaults'

// gesture system
export type { GestureDirection } from './gesture-system'
export {
  drag,
  gestureConfig,
  gestureToCssVars,
  inertia,
  longPress,
  pinchZoom,
  pullToRefresh,
  swipe,
} from './gesture-system'

// theme axis types + unified resolver
export type {
  ThemeDensity,
  ThemeElevation,
  ThemeGlass,
  ThemeMotion,
  ThemeShape,
} from './scales'
export { resolveAxesToCssVars } from './scales'
