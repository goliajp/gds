// glow system — converts glow prop to CSS class names

type GlowColor = 'accent' | 'success' | 'warning' | 'danger'

function glowClass(glow?: boolean | GlowColor): string {
  if (glow === undefined || glow === false) return ''
  if (glow === true) return 'gds-glow'
  return `gds-glow gds-glow-${glow}`
}

export { glowClass }
export type { GlowColor }
