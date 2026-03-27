// L-dep — glass helper
// converts a glass prop to CSS class names
// zero friction: <Card glass> → className="gds-glass border"
// handles intensity levels and integrates with depth system

type GlassIntensity = boolean | 'lg' | 'sm'

// convert glass prop to className
// true → standard glass, 'sm' → subtle, 'lg' → heavy
export function glassClass(glass?: GlassIntensity): string {
  if (glass === undefined || glass === false) return ''
  if (glass === 'sm') return 'gds-glass-sm'
  if (glass === 'lg') return 'gds-glass-lg'
  return 'gds-glass'
}

// full glass surface class set — bg + blur + border adjustment
// use this instead of manually combining glass + bg + border
export function glassSurface(glass?: GlassIntensity): string {
  if (glass === undefined || glass === false) return ''
  const base = glassClass(glass)
  // glass surfaces get a translucent border instead of solid
  return `${base} border-white/10`
}
