// L0 — shadow system
// elevation-aware shadows with dark mode adaptation
// formula: each tier doubles blur radius, increases spread

type ShadowTier = {
  blur: number
  spread: number
  yOffset: number
  opacity: number
}

// base shadow parameters — each tier escalates geometrically
const SHADOW_TIERS: Record<string, ShadowTier[]> = {
  xs: [{ blur: 1, spread: 0, yOffset: 1, opacity: 0.03 }],
  sm: [{ blur: 2, spread: 0, yOffset: 1, opacity: 0.05 }],
  md: [
    { blur: 6, spread: -1, yOffset: 4, opacity: 0.1 },
    { blur: 4, spread: -2, yOffset: 2, opacity: 0.1 },
  ],
  lg: [
    { blur: 15, spread: -3, yOffset: 10, opacity: 0.1 },
    { blur: 6, spread: -4, yOffset: 4, opacity: 0.1 },
  ],
  xl: [
    { blur: 25, spread: -5, yOffset: 20, opacity: 0.1 },
    { blur: 10, spread: -6, yOffset: 8, opacity: 0.1 },
  ],
}

// elevation factor — scales opacity
const ELEVATION_FACTOR: Record<string, number> = {
  flat: 0, // no shadows at all
  subtle: 0.6, // reduced shadows
  raised: 1.0, // full shadows
}

// dark mode multiplier — darker mode needs stronger shadows
// v2: bumped dark from 3.0→4.0 to match mailrs's production-proven dark shadows
// mailrs uses ~5-6× but combined with subtle elevation (0.6×) the effective is ~2.4-3.6×
const MODE_FACTOR: Record<string, number> = {
  dark: 4.0,
  light: 1.0,
}

function tierToString(
  tier: ShadowTier,
  elevFactor: number,
  modeFactor: number
): string {
  if (elevFactor === 0) return 'none'
  const opacity = Math.min(1, tier.opacity * elevFactor * modeFactor)
  return `0 ${tier.yOffset}px ${tier.blur}px ${tier.spread}px rgb(0 0 0 / ${opacity.toFixed(2)})`
}

export function shadowValue(
  level: string,
  elevation: string,
  mode: string
): string {
  const tiers = SHADOW_TIERS[level]
  if (tiers === undefined) return 'none'
  const ef = ELEVATION_FACTOR[elevation] ?? 1
  if (ef === 0) return 'none'
  const mf = MODE_FACTOR[mode] ?? 1
  return tiers.map((t) => tierToString(t, ef, mf)).join(', ')
}

export function shadowToCssVars(
  elevation: string,
  mode: string
): Record<string, string> {
  return {
    '--gds-shadow-xs': shadowValue('xs', elevation, mode),
    '--gds-shadow-sm': shadowValue('sm', elevation, mode),
    '--gds-shadow-md': shadowValue('md', elevation, mode),
    '--gds-shadow-lg': shadowValue('lg', elevation, mode),
    '--gds-shadow-xl': shadowValue('xl', elevation, mode),
  }
}
