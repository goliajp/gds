// L0 — theme axis types + unified resolve
// axis types are the public API, system functions do the math
// no hardcoded values here — all delegated to *-system.ts modules

import { glassToCssVars } from './glass-system'
import { motionToCssVars } from './motion-system'
import { radiusToCssVars } from './radius-system'
import { shadowToCssVars } from './shadow-system'
import { sizeToCssVars } from './size-system'

// constrained axis types — the only valid selections
export type ThemeShape = 'default' | 'rounded' | 'sharp'
export type ThemeDensity = 'comfortable' | 'compact' | 'default'
export type ThemeElevation = 'flat' | 'raised' | 'subtle'
export type ThemeGlass = 'full' | 'off' | 'subtle'
export type ThemeMotion = 'full' | 'off' | 'reduced'

// re-export spring presets from motion system (backward compat)
export type { KeyframePresetId, SpringPresetId } from './motion-system'
export { easing, springPresets } from './motion-system'

// resolve a complete set of axis selections → flat CSS vars
// this is the single function L1 theme calls
export function resolveAxesToCssVars(
  shape: ThemeShape,
  density: ThemeDensity,
  elevation: ThemeElevation,
  glass: ThemeGlass,
  motion: ThemeMotion,
  mode: 'dark' | 'light',
): Record<string, string> {
  return {
    ...radiusToCssVars(shape),
    ...sizeToCssVars(density),
    ...shadowToCssVars(elevation, mode),
    ...glassToCssVars(glass, mode),
    ...motionToCssVars(motion),
  }
}
