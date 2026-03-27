// L0 — generate complete CSS variable set from system functions
// single source of truth: all dynamic tokens computed here
// used by: L1 theme (runtime injection), SSR fallback, snapshot tests

import { deriveDarkPalette, deriveLightPalette, paletteToVars } from './color-derive'
import { fontToCssVars } from './font-system'
import { glassToCssVars } from './glass-system'
import { motionToCssVars } from './motion-system'
import { radiusToCssVars } from './radius-system'
import { shadowToCssVars } from './shadow-system'
import { sizeToCssVars } from './size-system'

// default primary color (blue-500)
const DEFAULT_PRIMARY = '#3b82f6'

// generate all dynamic CSS variables for a given mode
// uses default axis values: shape=default, density=default, elevation=raised, glass=full, motion=full
export function generateDefaultCssVars(mode: 'dark' | 'light'): Record<string, string> {
  const palette = mode === 'dark'
    ? deriveDarkPalette(DEFAULT_PRIMARY)
    : deriveLightPalette(DEFAULT_PRIMARY)

  return {
    // color (from primaryColor derivation)
    ...paletteToVars(palette, mode),
    // font stacks + weights
    ...fontToCssVars(),
    // radius (shape=default)
    ...radiusToCssVars('default'),
    // size (density=default)
    ...sizeToCssVars('default'),
    // shadow (elevation=raised, mode-aware)
    ...shadowToCssVars('raised', mode),
    // glass (level=full, mode-aware)
    ...glassToCssVars('full', mode),
    // motion (level=full)
    ...motionToCssVars('full'),
  }
}

// apply CSS variables to a DOM element (usually document.documentElement)
export function applyDefaultCssVars(
  element: HTMLElement,
  mode: 'dark' | 'light',
): void {
  const vars = generateDefaultCssVars(mode)
  for (const [key, val] of Object.entries(vars)) {
    element.style.setProperty(key, val)
  }
}

export { DEFAULT_PRIMARY }
