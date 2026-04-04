// shared type utilities — used across all layers

// extract variant props from a cva() definition
// re-export from CVA so consumers don't need to import CVA directly
export type { VariantProps } from 'class-variance-authority'

// make selected keys required
export type RequireKeys<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>

// make all keys optional except selected
export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> &
  Pick<T, K>

// record with string keys and unknown values — base for data rows
export type DataRecord = Record<string, unknown>

// polymorphic "as" prop type
export type AsProps<E extends React.ElementType> = {
  as?: E
} & Omit<React.ComponentPropsWithoutRef<E>, 'as'>

// merge native HTML props with component props, component wins
export type MergeProps<NativeProps, ComponentProps> = Omit<
  NativeProps,
  keyof ComponentProps
> &
  ComponentProps

// === cross-layer component types ===

// standard size union — used by Button, Input, Badge, Icon, etc.
export type Size = 'default' | 'lg' | 'sm' | 'xl' | 'xs'

// standard orientation
export type Orientation = 'horizontal' | 'vertical'

// standard side/placement
export type Side = 'bottom' | 'left' | 'right' | 'top'
export type Align = 'center' | 'end' | 'start'
export type Placement = `${Side}` | `${Side}-${Align}`

// SVG component props — for Icon(L2), Chart(L6), SVG atoms
export type SvgProps = React.SVGAttributes<SVGSVGElement> & {
  className?: string
  size?: number | string
}

// base HTML element prop extensions — for wrapper components
export type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string
}
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
}
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string
}

// keyframe preset IDs from motion system — valid values for motion prop
export type MotionPreset =
  | 'fadeIn'
  | 'fadeOut'
  | 'scaleIn'
  | 'scaleOut'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'slideUp'
  | 'pop'

// glow color variants — semantic status-aware glow
export type GlowColor = 'accent' | 'success' | 'warning' | 'danger'

// v3 unified interactive props — every interactive component must support these
export type GDSInteractiveProps = {
  glass?: boolean
  glow?: boolean | GlowColor
  motion?: MotionPreset | (string & {})
}

// backward compat alias
export type GlassMotionProps = GDSInteractiveProps

// AI-native data attributes (philosophy 07)
// components should include these for machine parsing
export type DataAttributes = {
  'data-component'?: string // component name: "button", "card", "dialog"
  'data-variant'?: string // active variant: "primary", "ghost", "danger"
  'data-state'?: string // current state: "open", "closed", "loading", "error"
}

// standard component base — every GDS component extends this pattern
export type ComponentBase = DataAttributes & {
  className?: string
}
