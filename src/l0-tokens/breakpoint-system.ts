// L0 — breakpoint system
// responsive breakpoints with semantic names and overlap detection

// breakpoint scale — mobile-first, min-width values
// each step is roughly 1.5-2× the mobile base (320px)
export const breakpoints = {
  sm: 640,     // large phone / small tablet
  md: 768,     // tablet portrait
  lg: 1024,    // tablet landscape / small laptop
  xl: 1280,    // laptop
  '2xl': 1536, // desktop
} as const

export type BreakpointKey = keyof typeof breakpoints

// device category detection (from width)
export type DeviceCategory = 'mobile' | 'tablet' | 'desktop'

export function deviceCategory(width: number): DeviceCategory {
  if (width < breakpoints.md) return 'mobile'
  if (width < breakpoints.lg) return 'tablet'
  return 'desktop'
}

// media query helpers — generate valid CSS media query strings
export function minWidth(bp: BreakpointKey): string {
  return `(min-width: ${breakpoints[bp]}px)`
}

export function maxWidth(bp: BreakpointKey): string {
  return `(max-width: ${breakpoints[bp] - 1}px)`
}

export function between(min: BreakpointKey, max: BreakpointKey): string {
  return `(min-width: ${breakpoints[min]}px) and (max-width: ${breakpoints[max] - 1}px)`
}

// overlap detection — validate that custom breakpoints don't conflict
export function detectOverlap(
  custom: Record<string, number>,
): { a: string, b: string, overlap: number }[] {
  const sorted = Object.entries(custom).sort(([, a], [, b]) => a - b)
  const overlaps: { a: string, b: string, overlap: number }[] = []
  for (let i = 0; i < sorted.length - 1; i++) {
    const [nameA, valA] = sorted[i]
    const [nameB, valB] = sorted[i + 1]
    if (valA === valB) {
      overlaps.push({ a: nameA, b: nameB, overlap: valA })
    }
  }
  return overlaps
}

export function breakpointToCssVars(): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const [key, val] of Object.entries(breakpoints)) {
    vars[`--gds-breakpoint-${key}`] = `${val}px`
  }
  return vars
}
