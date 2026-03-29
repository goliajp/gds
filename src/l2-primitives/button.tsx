import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { motionClass } from '../utils/motion'
import type { VariantProps } from '../utils/types'

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
        primary: 'bg-accent text-accent-fg hover:bg-accent-hover',
        secondary: 'border border-border bg-transparent text-fg hover:bg-bg-tertiary',
      },
    },
  },
)

type ButtonSize = 'default' | 'lg' | 'sm'
type ButtonVariant = 'danger' | 'ghost' | 'primary' | 'secondary'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /** Visual style: primary, secondary, ghost, danger */
    variant?: 'danger' | 'ghost' | 'primary' | 'secondary'
    /** Height and text scale preset */
    size?: 'default' | 'lg' | 'sm'
    fullWidth?: boolean
    /** Enable frosted glass translucency effect */
    glass?: boolean
    /** Icon element rendered before children */
    icon?: ReactNode
    iconRight?: ReactNode
    /** Show spinner and disable interaction */
    loading?: boolean
    /** Animation preset name (e.g. 'fade', 'scale') */
    motion?: string
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
      disabled,
      fullWidth,
      glass,
      icon,
      iconRight,
      loading,
      motion: m,
      size,
      variant,
      ...props
    },
    ref,
  ) {
    return (
      <button
        className={cx(
          buttonVariants({ size, variant }),
          (disabled === true || loading === true) && 'cursor-not-allowed opacity-50',
          fullWidth === true && 'w-full',
          glassClass(glass),
          glass === true && 'border border-white/10 bg-bg/60',
          motionClass(m),
          className,
        )}
        data-component="button"
        data-variant={variant ?? 'primary'}
        disabled={disabled === true || loading === true}
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
  },
)

export { buttonVariants }
export type { ButtonProps, ButtonSize, ButtonVariant }
