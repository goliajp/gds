// glass-button — frosted glass variant button with size and color variants
import { cva } from 'class-variance-authority'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import type { VariantProps } from '../utils/types'

const glassButtonVariants = cva(
  cx(
    'inline-flex select-none items-center justify-center font-medium gds-glass transition-colors',
    focusCls,
  ),
  {
    variants: {
      variant: {
        default:
          'border border-border/30 bg-bg/50 text-fg hover:bg-bg/70',
        accent:
          'border border-accent/30 bg-accent/20 text-accent hover:bg-accent/30',
      },
      size: {
        sm: 'h-7 gap-1 gds-radius-button px-2 text-[11px]',
        default: 'h-8 gap-1.5 gds-radius-button px-3 text-xs',
        lg: 'h-9 gap-2 gds-radius px-4 text-sm',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export type GlassButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof glassButtonVariants> & {
    children: ReactNode
  }

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  function GlassButton({ children, className, size, variant, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cx(glassButtonVariants({ size, variant }), className)}
        data-component="glass-button"
        {...props}
      >
        {children}
      </button>
    )
  },
)

export { glassButtonVariants }
