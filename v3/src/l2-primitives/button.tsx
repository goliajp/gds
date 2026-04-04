import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { glowClass } from '../utils/glow'
import { motionClass } from '../utils/motion'
import type { GlowColor, VariantProps } from '../utils/types'

// v3: unified size classes — all components share the same height/text/padding baseline
// xs=24px  sm=28px  default=32px  lg=40px  xl=48px
const buttonVariants = cva(
  'inline-flex select-none items-center justify-center font-medium transition-colors ' +
    focusCls,
  {
    defaultVariants: {
      size: 'default',
      variant: 'primary',
    },
    variants: {
      size: {
        default: 'gds-h gds-gap-sm gds-radius-button gds-pad-x gds-text-body',
        lg: 'gds-h-lg gds-gap gds-radius-button gds-pad-x-lg gds-text-body',
        sm: 'gds-h-sm gds-gap-xs gds-radius-button gds-pad-x-sm gds-text-label',
      },
      variant: {
        danger: 'bg-danger text-accent-fg hover:bg-danger/90',
        ghost: 'bg-transparent text-fg-muted hover:bg-bg-tertiary hover:text-fg',
        // v3: link variant — text-only, no background, underline on hover
        link: 'bg-transparent text-accent hover:underline gds-pad-x-0 h-auto',
        primary: 'bg-accent text-accent-fg hover:bg-accent-hover',
        secondary: 'border border-border bg-transparent text-fg hover:bg-bg-tertiary',
        // v3: tab variant — for tab-like navigation buttons
        tab: 'bg-transparent text-fg-muted hover:text-fg border-b-2 border-transparent rounded-none data-[active=true]:text-accent data-[active=true]:border-accent',
      },
    },
  }
)

type ButtonVariant = 'danger' | 'ghost' | 'link' | 'primary' | 'secondary' | 'tab'
type ButtonSize = 'default' | 'lg' | 'sm'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    variant?: ButtonVariant
    size?: ButtonSize
    fullWidth?: boolean
    // v3: glass / glow / motion — GDSInteractiveProps contract
    glass?: boolean
    glow?: boolean | GlowColor
    motion?: string
    icon?: ReactNode
    iconRight?: ReactNode
    loading?: boolean
  }

// inline SVG spinner to avoid circular L2 dependency
function InlineSpinner() {
  return (
    <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        fill="currentColor"
      />
    </svg>
  )
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
      disabled,
      fullWidth,
      glass,
      glow,
      icon,
      iconRight,
      loading,
      motion: m,
      size,
      variant,
      ...props
    },
    ref
  ) {
    const isDisabled = disabled === true || loading === true

    return (
      <button
        className={cx(
          buttonVariants({ size, variant }),
          isDisabled && 'cursor-not-allowed opacity-50',
          fullWidth === true && 'w-full',
          // v3: glass effect
          glassClass(glass),
          glass === true && 'bg-bg/60 border border-white/10',
          // v3: glow effect — hover glow for interactive feel
          !isDisabled && glowClass(glow),
          // v3: motion animation
          motionClass(m),
          className
        )}
        data-component="button"
        data-variant={variant ?? 'primary'}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {loading === true ? (
          <InlineSpinner />
        ) : icon !== undefined ? (
          <span className="gds-icon-child-sm">{icon}</span>
        ) : null}
        {children}
        {iconRight !== undefined && (
          <span className="gds-icon-child-sm">{iconRight}</span>
        )}
      </button>
    )
  }
)

export { Button, buttonVariants }
export type { ButtonProps, ButtonSize, ButtonVariant }
