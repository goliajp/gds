// L0 — radius system
// mathematical radius scale, shaped by the shape axis
// formula: base_radius * shape_factor, with golden ratio progression

// golden ratio progression: each step ≈ 1.5× the previous
// seed: 4px → 6px → 8px → 12px (approximately 1.5× each)
const RADIUS_STEPS = [4, 6, 8, 12] as const

// shape factor — multiplies the base scale
const SHAPE_FACTOR: Record<string, number> = {
  sharp: 0.5,    // halves all radii → 2/3/4/6
  default: 1.0,  // base → 4/6/8/12
  rounded: 2.0,  // doubles → 8/12/16/24
}

export function radiusScale(shape: string): {
  sm: number
  md: number
  lg: number
  xl: number
  full: number
} {
  const factor = SHAPE_FACTOR[shape] ?? 1
  return {
    sm: Math.round(RADIUS_STEPS[0] * factor),
    md: Math.round(RADIUS_STEPS[1] * factor),
    lg: Math.round(RADIUS_STEPS[2] * factor),
    xl: Math.round(RADIUS_STEPS[3] * factor),
    full: 9999,
  }
}

export function radiusToCssVars(shape: string): Record<string, string> {
  const scale = radiusScale(shape)
  return {
    // base scale
    '--gds-radius-sm': `${scale.sm}px`,
    '--gds-radius-md': `${scale.md}px`,
    '--gds-radius-lg': `${scale.lg}px`,
    '--gds-radius-xl': `${scale.xl}px`,
    '--gds-radius-full': `${scale.full}px`,

    // semantic aliases — components use these
    '--gds-radius-button': `${scale.md}px`,
    '--gds-radius-input': `${scale.md}px`,
    '--gds-radius-badge': `${scale.full}px`,
    '--gds-radius-card': `${scale.xl}px`,
    '--gds-radius-modal': `${scale.xl}px`,
    '--gds-radius-popover': `${scale.lg}px`,
    '--gds-radius-tooltip': `${scale.md}px`,
  }
}
