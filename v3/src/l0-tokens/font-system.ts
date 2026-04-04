// L0 — font system
// 3 stacks × font presets for every use case
// supports CJK 4-language (en, zh, ja, ko) mixed typesetting

// === 3 font stacks, each irreplaceable ===
export const fontStack = {
  // proportional body text: headings, paragraphs, CJK mixed content
  sans: [
    'Inter',
    '"Noto Sans SC"', // chinese simplified
    '"Noto Sans JP"', // japanese
    '"Noto Sans KR"', // korean
    'system-ui',
    '-apple-system',
    'sans-serif',
  ].join(', '),

  // code and terminal: always monospaced, coding ligatures, slashed zero
  mono: [
    '"JetBrains Mono"',
    '"Noto Sans Mono"',
    'ui-monospace',
    'Consolas',
    'monospace',
  ].join(', '),

  // UI equal-width without code aesthetic: Roboto Flex with variable MONO axis
  // MONO=0 → proportional (like sans), MONO=1 → equal-width (like mono, but sans-serif style)
  // use for: table headers, dashboard numbers, badges, aligned labels
  flex: ['"Roboto Flex"', 'system-ui', 'sans-serif'].join(', '),
} as const

// Roboto Flex MONO axis: 0 = proportional, 1 = monospaced
// use via font-variation-settings: 'MONO' <value>
export const flexMono = {
  proportional: "'MONO' 0",
  half: "'MONO' 0.5",
  full: "'MONO' 1",
} as const

// === font weights ===
export const fontWeight = {
  light: 300, // placeholder, secondary caption, fine print
  regular: 400, // body text, default
  medium: 500, // labels, buttons, emphasis
  semibold: 600, // headings, table headers, strong labels
  bold: 700, // primary headings, hero text
} as const

export type FontWeightKey = keyof typeof fontWeight

// === OpenType features ===
export const fontFeature = {
  tabular: "'tnum' 1", // fixed-width digits (tables, prices)
  slashedZero: "'zero' 1", // distinguish 0 from O
  tabularSlashed: "'tnum' 1, 'zero' 1", // both — finance, code-like data
  proportional: "'pnum' 1", // proportional digits (body text)
  ligatures: "'liga' 1, 'calt' 1", // code ligatures (!=, =>, ->)
  cjkPunct: "'halt' 1", // CJK punctuation half-width
} as const

// === font presets — complete recipe for each use case ===
// preset = stack + weight + size + leading + tracking + features
export type FontPreset = {
  family: 'flex' | 'mono' | 'sans'
  weight: number
  size: string
  leading: number
  tracking: string
  features: string
  italic?: boolean
  variation?: string // font-variation-settings (for Roboto Flex MONO axis)
}

export const fontPreset: Record<string, FontPreset> = {
  // headings — sans, proportional
  h1: {
    family: 'sans',
    weight: 700,
    size: '1.5rem',
    leading: 1.2,
    tracking: '-0.025em',
    features: '',
  },
  h2: {
    family: 'sans',
    weight: 600,
    size: '1.25rem',
    leading: 1.25,
    tracking: '-0.02em',
    features: '',
  },
  h3: {
    family: 'sans',
    weight: 600,
    size: '1.125rem',
    leading: 1.3,
    tracking: '-0.015em',
    features: '',
  },
  h4: {
    family: 'sans',
    weight: 600,
    size: '1rem',
    leading: 1.35,
    tracking: '-0.01em',
    features: '',
  },
  h5: {
    family: 'sans',
    weight: 600,
    size: '0.875rem',
    leading: 1.4,
    tracking: '0',
    features: '',
  },
  h6: {
    family: 'sans',
    weight: 600,
    size: '0.75rem',
    leading: 1.4,
    tracking: '0.01em',
    features: '',
  },

  // body text — sans, proportional, relaxed reading
  body: {
    family: 'sans',
    weight: 400,
    size: '0.875rem',
    leading: 1.6,
    tracking: '0',
    features: '',
  },
  bodySmall: {
    family: 'sans',
    weight: 400,
    size: '0.8125rem',
    leading: 1.5,
    tracking: '0',
    features: '',
  },

  // ui elements — flex with MONO=1 for equal-width alignment
  label: {
    family: 'flex',
    weight: 500,
    size: '0.75rem',
    leading: 1.4,
    tracking: '0.01em',
    features: '',
    variation: flexMono.full,
  },
  caption: {
    family: 'sans',
    weight: 400,
    size: '0.6875rem',
    leading: 1.4,
    tracking: '0.01em',
    features: '',
  },
  badge: {
    family: 'flex',
    weight: 600,
    size: '0.625rem',
    leading: 1,
    tracking: '0.03em',
    features: '',
    variation: flexMono.full,
  },
  button: {
    family: 'sans',
    weight: 500,
    size: '0.8125rem',
    leading: 1,
    tracking: '0.01em',
    features: '',
  },

  // code / terminal — mono, always equal-width, code aesthetic
  code: {
    family: 'mono',
    weight: 400,
    size: '0.8125rem',
    leading: 1.6,
    tracking: '0',
    features: fontFeature.ligatures,
  },
  codeSmall: {
    family: 'mono',
    weight: 400,
    size: '0.6875rem',
    leading: 1.5,
    tracking: '0',
    features: fontFeature.ligatures,
  },

  // finance / tabular data — flex with MONO for column alignment
  finance: {
    family: 'flex',
    weight: 400,
    size: '0.875rem',
    leading: 1.4,
    tracking: '0',
    features: '',
    variation: flexMono.full,
  },
  price: {
    family: 'flex',
    weight: 600,
    size: '1rem',
    leading: 1,
    tracking: '-0.01em',
    features: '',
    variation: flexMono.full,
  },
  tableNum: {
    family: 'flex',
    weight: 400,
    size: '0.75rem',
    leading: 1.4,
    tracking: '0',
    features: '',
    variation: flexMono.full,
  },
  tableHead: {
    family: 'flex',
    weight: 500,
    size: '0.6875rem',
    leading: 1.4,
    tracking: '0.02em',
    features: '',
    variation: flexMono.full,
  },

  // japanese fullwidth context
  jpFull: {
    family: 'sans',
    weight: 400,
    size: '0.875rem',
    leading: 1.8,
    tracking: '0.05em',
    features: fontFeature.cjkPunct,
  },
} as const

export type FontPresetKey = keyof typeof fontPreset

// semantic symbol constants — used inline in text
// ensures consistency across all components (everyone uses the same ✓)
export const symbols = {
  // status indicators
  check: '\u2713', // ✓
  cross: '\u2715', // ✕
  dot: '\u25CF', // ●
  ring: '\u25CB', // ○
  triangle: '\u25B2', // ▲
  triangleDown: '\u25BC', // ▼
  diamond: '\u25C6', // ◆
  square: '\u25A0', // ■

  // arrows
  arrowUp: '\u2191', // ↑
  arrowDown: '\u2193', // ↓
  arrowLeft: '\u2190', // ←
  arrowRight: '\u2192', // →
  arrowUpDown: '\u2195', // ↕

  // keyboard
  command: '\u2318', // ⌘
  shift: '\u21E7', // ⇧
  option: '\u2325', // ⌥
  control: '\u2303', // ⌃
  enter: '\u23CE', // ⏎
  tab: '\u21E5', // ⇥
  escape: '\u238B', // ⎋
  backspace: '\u232B', // ⌫
  delete: '\u2326', // ⌦
  space: '\u2423', // ␣

  // punctuation / typography
  ellipsis: '\u2026', // …
  bullet: '\u2022', // •
  dash: '\u2014', // —
  ndash: '\u2013', // –
  middot: '\u00B7', // ·
  times: '\u00D7', // ×
  minus: '\u2212', // −  (true minus, not hyphen)
  plus: '+',
} as const

export type SymbolKey = keyof typeof symbols

// CSS variable output for font tokens
export function fontToCssVars(): Record<string, string> {
  return {
    '--gds-font-sans': fontStack.sans,
    '--gds-font-mono': fontStack.mono,
    '--gds-font-flex': fontStack.flex,
    '--gds-font-light': `${fontWeight.light}`,
    '--gds-font-regular': `${fontWeight.regular}`,
    '--gds-font-medium': `${fontWeight.medium}`,
    '--gds-font-semibold': `${fontWeight.semibold}`,
    '--gds-font-bold': `${fontWeight.bold}`,
  }
}

// helper: convert a preset to inline CSS style object
export function presetToStyle(key: FontPresetKey): React.CSSProperties {
  const p = fontPreset[key]
  return {
    fontFamily: `var(--gds-font-${p.family})`,
    fontWeight: p.weight,
    fontSize: p.size,
    lineHeight: p.leading,
    letterSpacing: p.tracking,
    ...(p.features ? { fontFeatureSettings: p.features } : {}),
    ...(p.variation ? { fontVariationSettings: p.variation } : {}),
    ...(p.italic ? { fontStyle: 'italic' } : {}),
  }
}
