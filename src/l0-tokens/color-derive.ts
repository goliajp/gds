// L0 — derive full color palette from a single primary color
// two categories: fixed (never change) and derived f(pc)

import { bestTextColor } from './color-health'
import { darken, hexToHsl, hslToHex, hslToRgb, lighten, withAlpha } from './color-math'

// fixed colors — these NEVER change regardless of primary color
// they are semantic constants anchored to universal meaning
export const FIXED_COLORS = {
  // danger = red — universal stop/error/destructive
  danger: { dark: '#ef4444', light: '#dc2626' },
  // warning = amber — universal caution
  warning: { dark: '#f59e0b', light: '#d97706' },
  // success = green — universal positive/go
  success: { dark: '#22c55e', light: '#16a34a' },

  // status — organizational meaning, stable across themes
  statusActive: '#22c55e',
  statusInactive: '#94a3b8',
  statusPending: '#f59e0b',
  statusDraft: '#64748b',

  // priority — severity scale, stable
  priorityCritical: '#ef4444',
  priorityHigh: '#f97316',
  priorityMedium: '#f59e0b',
  priorityLow: '#22c55e',

  // action icons — create/update/delete, stable
  actionCreate: '#22c55e',
  actionUpdate: '#3b82f6',
  actionDelete: '#ef4444',

  // notification dot
  dot: '#ef4444',
} as const

// tint intensity — how much primaryColor bleeds into base surfaces
// dark mode can take more chroma; light mode must be near-invisible
const TINT_S_DARK = 0.06   // 6% saturation on dark surfaces
const TINT_S_LIGHT = 0.03  // 3% saturation on light surfaces — barely there

// derived color set — everything computed from primary color
export type DerivedPalette = {
  // accent family
  accent: string
  accentHover: string
  accentFg: string
  accentMuted: string    // rgba(accent, 0.1) — for subtle backgrounds
  accentSubtle: string   // rgba(accent, 0.05) — for hover tints

  // base surfaces — tinted by primaryColor hue, very restrained
  bg: string
  bgSecondary: string
  bgTertiary: string
  fg: string
  fgSecondary: string
  fgMuted: string
  border: string
  borderStrong: string
  surface: string
  surfaceRaised: string
  overlay: string

  // categorical palette
  palette: string[]
}

// derive full palette for dark mode
export function deriveDarkPalette(primaryHex: string): DerivedPalette {
  const hsl = hexToHsl(primaryHex)
  const h = hsl.h
  const ts = TINT_S_DARK // tint saturation

  // accent — tuned for dark bg: bright enough to see, dark enough for white text on top
  // L=0.45-0.55 ensures white text passes WCAG AA (≥4.5:1)
  const accent = hslToHex({ h, s: Math.max(0.55, Math.min(0.85, hsl.s)), l: Math.max(0.45, Math.min(0.55, hsl.l)) })
  const accentHover = lighten(accent, 0.1)
  const accentFg = bestTextColor(accent)
  const accentMuted = withAlpha(accent, 0.12)
  const accentSubtle = withAlpha(accent, 0.05)

  // base surfaces — dark with barely-perceptible hue from primaryColor
  // the tint is what makes a blue-primary app feel "cool" and a green-primary feel "fresh"
  // glass surfaces are semi-transparent over these — so the tint bleeds through the blur naturally
  const bg =           hslToHex({ h, s: ts, l: 0.06 })  // near-black, micro tint
  const bgSecondary =  hslToHex({ h, s: ts, l: 0.11 })  // card/sidebar bg
  const bgTertiary =   hslToHex({ h, s: ts, l: 0.20 })  // hover/active states
  const surface =      hslToHex({ h, s: ts, l: 0.11 })  // = bgSecondary (glass base)
  const surfaceRaised= hslToHex({ h, s: ts, l: 0.20 })  // elevated panels

  // fg — high contrast, same hue as bg but at 2-3% saturation
  // entire bg→fg scale shares one hue channel — cohesive under glass
  const fg =           hslToHex({ h, s: 0.02, l: 0.95 })  // near-white, whisper of hue
  const fgSecondary =  hslToHex({ h, s: 0.03, l: 0.82 })  // secondary text
  const fgMuted =      hslToHex({ h, s: 0.04, l: 0.62 })  // muted/placeholder

  // borders — subtle, tinted
  const border =       hslToHex({ h, s: ts, l: 0.20 })
  const borderStrong = hslToHex({ h, s: ts, l: 0.28 })

  const overlay = `rgba(${Math.round(hslToRgb({ h, s: ts, l: 0.04 }).r)}, ${Math.round(hslToRgb({ h, s: ts, l: 0.04 }).g)}, ${Math.round(hslToRgb({ h, s: ts, l: 0.04 }).b)}, 0.6)`

  return {
    accent, accentHover, accentFg, accentMuted, accentSubtle,
    bg, bgSecondary, bgTertiary, fg, fgSecondary, fgMuted,
    border, borderStrong, surface, surfaceRaised, overlay,
    palette: generatePalette(h, 'dark'),
  }
}

// derive full palette for light mode
export function deriveLightPalette(primaryHex: string): DerivedPalette {
  const hsl = hexToHsl(primaryHex)
  const h = hsl.h
  const ts = TINT_S_LIGHT // less tint — white shows chroma more obviously

  // accent — saturated enough to pop on white
  const accent = hslToHex({ h, s: Math.max(0.6, Math.min(0.9, hsl.s)), l: Math.max(0.42, Math.min(0.55, hsl.l)) })
  const accentHover = darken(accent, 0.06)
  const accentFg = bestTextColor(accent)
  const accentMuted = withAlpha(accent, 0.1)
  const accentSubtle = withAlpha(accent, 0.04)

  // base surfaces — white or near-white, micro tint on secondaries only
  // bg stays pure white — tint on white at any amount looks "off"
  // glass over white is beautiful because backdrop-filter picks up content behind
  const bg =           '#ffffff'
  const bgSecondary =  hslToHex({ h, s: ts, l: 0.97 })  // barely warm/cool
  const bgTertiary =   hslToHex({ h, s: ts, l: 0.95 })
  const surface =      '#ffffff'
  const surfaceRaised= '#ffffff'

  // fg — dark text, whisper of hue for cohesion
  const fg =           hslToHex({ h, s: 0.02, l: 0.12 })
  const fgSecondary =  hslToHex({ h, s: 0.03, l: 0.30 })
  const fgMuted =      hslToHex({ h, s: 0.03, l: 0.42 })

  // borders
  const border =       hslToHex({ h, s: ts, l: 0.90 })
  const borderStrong = hslToHex({ h, s: ts, l: 0.83 })

  const overlay = 'rgba(0, 0, 0, 0.5)'

  return {
    accent, accentHover, accentFg, accentMuted, accentSubtle,
    bg, bgSecondary, bgTertiary, fg, fgSecondary, fgMuted,
    border, borderStrong, surface, surfaceRaised, overlay,
    palette: generatePalette(h, 'light'),
  }
}

// generate 10-color categorical palette from a base hue
// [0]=primary, [1..9]=evenly spaced hues with adjusted lightness
function generatePalette(baseHue: number, mode: 'dark' | 'light'): string[] {
  // dark: bright enough to read on dark bg; light: saturated but not muddy
  const lightness = mode === 'dark' ? 0.65 : 0.55
  const saturation = mode === 'dark' ? 0.7 : 0.75

  // golden angle distribution — visually distinct hue spacing
  const hueOffsets = [0, 137.5, 275, 52.5, 190, 327.5, 95, 232.5, 10, 170]

  return hueOffsets.map((offset) =>
    hslToHex({
      h: (baseHue + offset) % 360,
      s: saturation,
      l: lightness,
    })
  )
}

// convert derived palette to CSS variable overrides — complete color system
export function paletteToVars(
  palette: DerivedPalette,
  mode: 'dark' | 'light',
): Record<string, string> {
  const fc = FIXED_COLORS
  const isDark = mode === 'dark'

  const vars: Record<string, string> = {
    // base surfaces — tinted by primaryColor
    '--gds-bg': palette.bg,
    '--gds-bg-secondary': palette.bgSecondary,
    '--gds-bg-tertiary': palette.bgTertiary,
    '--gds-surface': palette.surface,
    '--gds-surface-raised': palette.surfaceRaised,

    // foreground
    '--gds-fg': palette.fg,
    '--gds-fg-secondary': palette.fgSecondary,
    '--gds-fg-muted': palette.fgMuted,

    // borders
    '--gds-border': palette.border,
    '--gds-border-strong': palette.borderStrong,

    // accent family — derived from primaryColor
    '--gds-accent': palette.accent,
    '--gds-accent-hover': palette.accentHover,
    '--gds-accent-fg': palette.accentFg,

    // overlay
    '--gds-overlay': palette.overlay,

    // fixed semantic colors — NEVER change per primaryColor
    '--gds-danger': isDark ? fc.danger.dark : fc.danger.light,
    '--gds-warning': isDark ? fc.warning.dark : fc.warning.light,
    '--gds-success': isDark ? fc.success.dark : fc.success.light,

    // fixed status
    '--gds-status-active': fc.statusActive,
    '--gds-status-inactive': fc.statusInactive,
    '--gds-status-pending': fc.statusPending,
    '--gds-status-draft': fc.statusDraft,

    // fixed priority
    '--gds-priority-critical': fc.priorityCritical,
    '--gds-priority-high': fc.priorityHigh,
    '--gds-priority-medium': fc.priorityMedium,
    '--gds-priority-low': fc.priorityLow,

    // fixed action
    '--gds-action-create': fc.actionCreate,
    '--gds-action-update': fc.actionUpdate,
    '--gds-action-delete': fc.actionDelete,

    // fixed dot
    '--gds-dot': fc.dot,
  }

  // categorical palette (10 colors)
  palette.palette.forEach((color, i) => {
    vars[`--gds-palette-${i}`] = color
  })

  return vars
}
