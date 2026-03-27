// L0 — sizing system
// component heights, icon sizes, touch targets, spacing
// all derived from a base unit, scaled by density axis

// base unit = 4px, all sizes are multiples
const BASE = 4

// spacing scale — matches tokens.css --gds-space-* vars
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 32,
  8: 40,
  9: 48,
  10: 64,
} as const

export type SpaceScale = keyof typeof spacing

// component height scale — used by Button, Input, Select, etc.
// formula: base * multiplier
export const componentHeight = {
  xs: BASE * 6,    // 24px — icon buttons, compact tags
  sm: BASE * 7,    // 28px — compact inputs, small buttons
  default: BASE * 8, // 32px — standard inputs, buttons
  lg: BASE * 10,   // 40px — comfortable inputs, large buttons
  xl: BASE * 12,   // 48px — hero actions, mobile-friendly
} as const

// icon size scale — matched to component heights
export const iconSize = {
  xs: 12,
  sm: 14,
  default: 16,
  lg: 20,
  xl: 24,
} as const

// touch target minimums (mobile = 44px per Apple HIG)
export const touchTarget = {
  desktop: 32,
  mobile: 44,
} as const

// content width constraints
export const contentWidth = {
  input: { min: 120, max: 480 },
  dialog: { sm: 320, md: 384, lg: 480, xl: 600 },
  sheet: { sm: 280, md: 320, lg: 400 },
  dropdown: { min: 160, max: 320 },
} as const

// density → size mapping
// density axis adjusts which height/spacing tier components use
export type SizeTier = 'xs' | 'sm' | 'default' | 'lg' | 'xl'

export const densitySizeMap: Record<string, {
  component: SizeTier
  icon: SizeTier
  gap: number
  pad: number
  text: number
}> = {
  compact: {
    component: 'sm',
    icon: 'sm',
    gap: BASE * 1.5, // 6px
    pad: BASE * 2,   // 8px
    text: 11,
  },
  default: {
    component: 'default',
    icon: 'default',
    gap: BASE * 3,   // 12px
    pad: BASE * 4,   // 16px
    text: 13,
  },
  comfortable: {
    component: 'lg',
    icon: 'lg',
    gap: BASE * 4,   // 16px
    pad: BASE * 6,   // 24px
    text: 14,
  },
}

// density-relative height scale
// all tiers shift together when density changes
const densityHeightScale: Record<string, Record<string, number>> = {
  compact:     { xs: 20, sm: 24, default: 28, lg: 32, xl: 36 },
  default:     { xs: 24, sm: 28, default: 32, lg: 36, xl: 40 },
  comfortable: { xs: 28, sm: 32, default: 36, lg: 40, xl: 48 },
}

// density-relative icon scale
const densityIconScale: Record<string, Record<string, number>> = {
  compact:     { xs: 10, sm: 12, default: 14, lg: 16 },
  default:     { xs: 12, sm: 14, default: 16, lg: 20 },
  comfortable: { xs: 14, sm: 16, default: 20, lg: 24 },
}

// density-relative text scale
const densityTextScale: Record<string, Record<string, number>> = {
  compact:     { caption: 9,  label: 10, body: 11 },
  default:     { caption: 10, label: 11, body: 13 },
  comfortable: { caption: 11, label: 12, body: 14 },
}

// density-relative gap scale
const densityGapScale: Record<string, Record<string, number>> = {
  compact:     { xs: 2, sm: 4, default: 6,  lg: 8 },
  default:     { xs: 4, sm: 6, default: 8,  lg: 12 },
  comfortable: { xs: 6, sm: 8, default: 12, lg: 16 },
}

// density-relative padding scale
const densityPadScale: Record<string, Record<string, { x: number, y: number }>> = {
  compact:     { sm: { x: 4,  y: 2 }, default: { x: 8,  y: 4 }, lg: { x: 12, y: 6 } },
  default:     { sm: { x: 8,  y: 4 }, default: { x: 12, y: 6 }, lg: { x: 16, y: 8 } },
  comfortable: { sm: { x: 10, y: 6 }, default: { x: 16, y: 8 }, lg: { x: 20, y: 12 } },
}

// generate CSS vars for a density tier
export function sizeToCssVars(density: string): Record<string, string> {
  const d = density in densityHeightScale ? density : 'default'
  const tier = densitySizeMap[d] ?? densitySizeMap.default
  const h = densityHeightScale[d]
  const ic = densityIconScale[d]
  const tx = densityTextScale[d]
  const gp = densityGapScale[d]
  const pd = densityPadScale[d]

  return {
    // backward-compat aliases
    '--gds-component-height': `${componentHeight[tier.component]}px`,
    '--gds-icon-size': `${iconSize[tier.icon]}px`,
    '--gds-density-gap': `${tier.gap}px`,
    '--gds-density-pad': `${tier.pad}px`,
    '--gds-density-text': `${tier.text}px`,

    // density-relative height scale
    '--gds-h-xs': `${h.xs}px`,
    '--gds-h-sm': `${h.sm}px`,
    '--gds-h': `${h.default}px`,
    '--gds-h-lg': `${h.lg}px`,
    '--gds-h-xl': `${h.xl}px`,

    // density-relative icon scale
    '--gds-icon-xs': `${ic.xs}px`,
    '--gds-icon-sm': `${ic.sm}px`,
    '--gds-icon': `${ic.default}px`,
    '--gds-icon-lg': `${ic.lg}px`,

    // density-relative text scale
    '--gds-text-caption': `${tx.caption}px`,
    '--gds-text-label': `${tx.label}px`,
    '--gds-text-body': `${tx.body}px`,

    // density-relative gap scale
    '--gds-gap-xs': `${gp.xs}px`,
    '--gds-gap-sm': `${gp.sm}px`,
    '--gds-gap': `${gp.default}px`,
    '--gds-gap-lg': `${gp.lg}px`,

    // density-relative padding scale
    '--gds-pad-x-sm': `${pd.sm.x}px`,
    '--gds-pad-x': `${pd.default.x}px`,
    '--gds-pad-x-lg': `${pd.lg.x}px`,
    '--gds-pad-y-sm': `${pd.sm.y}px`,
    '--gds-pad-y': `${pd.default.y}px`,
    '--gds-pad-y-lg': `${pd.lg.y}px`,
  }
}
