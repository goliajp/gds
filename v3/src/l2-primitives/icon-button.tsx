import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { glowClass } from '../utils/glow'
import type { GlowColor, VariantProps } from '../utils/types'

const iconButtonVariants = cva(
  'inline-flex select-none items-center justify-center transition-colors ' +
    focusCls,
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'gds-sq gds-radius-button gds-icon-child',
        lg: 'gds-sq-lg gds-radius-button gds-icon-child-lg',
        sm: 'gds-sq-sm gds-radius-button gds-icon-child-sm',
      },
      variant: {
        danger: 'text-danger hover:bg-danger/10',
        default: 'text-fg-muted hover:bg-bg-tertiary hover:text-fg',
        ghost: 'text-fg-muted hover:text-fg',
      },
    },
  }
)

type IconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> &
  VariantProps<typeof iconButtonVariants> & {
    glass?: boolean
    glow?: boolean | GlowColor
    icon: ReactNode
    tooltip?: string
  }

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { className, disabled, glass, glow, icon, size, tooltip, variant, ...props },
    ref
  ) {
    return (
      <button
        aria-label={tooltip}
        className={cx(
          iconButtonVariants({ size, variant }),
          disabled === true && 'cursor-not-allowed opacity-50',
          glassClass(glass),
          glass === true && 'bg-bg/60 border border-white/10',
          disabled !== true && glowClass(glow),
          className
        )}
        data-component="icon-button"
        data-variant={variant ?? 'default'}
        disabled={disabled}
        ref={ref}
        title={tooltip}
        type="button"
        {...props}
      >
        {icon}
      </button>
    )
  }
)

export { IconButton, iconButtonVariants }
export type { IconButtonProps }
