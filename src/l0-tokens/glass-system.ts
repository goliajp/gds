// L0 — glass material system
// blur intensity, saturation, background opacity
// adapts to glass axis + dark/light mode + capability detection

export type GlassLevel = 'off' | 'subtle' | 'full'

// glass parameters — mathematically related
// blur: geometric progression (0 → 4/12/24 → 8/20/40)
// saturation: 100% base + boost (0 → +50/+60/+80 → +50/+80/+100)
// bg-opacity: inverse of blur (more blur → less solid bg needed)
type GlassParams = {
  blurSm: number
  blurMd: number
  blurLg: number
  saturateSm: number
  saturateMd: number
  saturateLg: number
  bgOpacity: number
}

const GLASS_LEVELS: Record<GlassLevel, GlassParams> = {
  off: {
    blurSm: 0, blurMd: 0, blurLg: 0,
    saturateSm: 100, saturateMd: 100, saturateLg: 100,
    bgOpacity: 0.95, // almost solid — glass is disabled
  },
  subtle: {
    blurSm: 4, blurMd: 12, blurLg: 24,
    saturateSm: 130, saturateMd: 150, saturateLg: 160,
    bgOpacity: 0.25,
  },
  full: {
    blurSm: 8, blurMd: 20, blurLg: 40,
    saturateSm: 150, saturateMd: 180, saturateLg: 200,
    bgOpacity: 0.15,
  },
}

// dark mode reduces bg opacity further (more translucent)
// light mode increases it (needs more solid for readability)
const MODE_BG_ADJUST: Record<string, number> = {
  dark: -0.05,
  light: +0.1,
}

export function glassParams(level: GlassLevel, mode: string): GlassParams {
  const base = GLASS_LEVELS[level]
  const adjust = MODE_BG_ADJUST[mode] ?? 0
  return {
    ...base,
    bgOpacity: Math.min(0.95, Math.max(0.05, base.bgOpacity + adjust)),
  }
}

export function glassToCssVars(level: GlassLevel, mode: string): Record<string, string> {
  const p = glassParams(level, mode)
  return {
    '--gds-glass-blur-sm': `${p.blurSm}px`,
    '--gds-glass-blur-md': `${p.blurMd}px`,
    '--gds-glass-blur-lg': `${p.blurLg}px`,
    '--gds-glass-saturate-sm': `${p.saturateSm}%`,
    '--gds-glass-saturate-md': `${p.saturateMd}%`,
    '--gds-glass-saturate-lg': `${p.saturateLg}%`,
    '--gds-glass-bg-opacity': `${p.bgOpacity}`,
  }
}

// capability detection — check if backdrop-filter is supported
export function supportsBackdropFilter(): boolean {
  if (typeof CSS === 'undefined') return false
  return CSS.supports('backdrop-filter', 'blur(1px)')
    || CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
}
