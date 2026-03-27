// quick-action — floating action button / quick action shortcut
import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import type { VariantProps } from '../utils/types'

const quickActionVariants = cva(
  'inline-flex shrink-0 select-none items-center justify-center rounded-full transition-transform active:scale-95 hover:scale-105',
  {
    defaultVariants: { size: 'default', variant: 'primary' },
    variants: {
      variant: {
        primary: 'bg-accent text-accent-fg gds-shadow-lg',
        secondary: 'border border-border bg-surface text-fg gds-shadow-md',
      },
      size: {
        default: 'h-11 w-11',
        lg: 'h-14 w-14',
        sm: 'h-9 w-9',
      },
    },
  },
)

type QuickActionProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> &
  VariantProps<typeof quickActionVariants> & {
    icon: ReactNode
    label?: string
  }

export const QuickAction = forwardRef<HTMLButtonElement, QuickActionProps>(
  function QuickAction({ className, disabled, icon, label, onClick, size, variant, ...props }, ref) {
    return (
      <div className="inline-flex flex-col items-center gap-1">
        <button
          className={cx(
            quickActionVariants({ size, variant }),
            focusCls,
            disabled === true && 'pointer-events-none opacity-40',
            className,
          )}
          data-component="quick-action"
          data-variant={variant ?? 'primary'}
          disabled={disabled}
          onClick={onClick}
          ref={ref}
          type="button"
          {...props}
        >
          <span className="gds-icon-child">{icon}</span>
        </button>
        {label !== undefined && (
          <span className="select-none text-[10px] text-fg-muted">{label}</span>
        )}
      </div>
    )
  },
)

export { quickActionVariants }
export type { QuickActionProps }
