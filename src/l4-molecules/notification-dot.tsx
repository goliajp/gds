// notification-dot — element wrapper with notification count badge
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type NotificationDotVariant = 'accent' | 'danger'

type NotificationDotProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  count?: number
  max?: number
  variant?: NotificationDotVariant
}

const variantMap: Record<NotificationDotVariant, string> = {
  danger: 'bg-danger text-white',
  accent: 'bg-accent text-accent-fg',
}

export const NotificationDot = forwardRef<HTMLDivElement, NotificationDotProps>(
  function NotificationDot({ children, count = 0, max = 99, variant = 'danger', className, ...props }, ref) {
    const visible = count > 0
    const display = count > max ? `${max}+` : String(count)

    return (
      <div
        ref={ref}
        className={cx('relative inline-flex', className)}
        data-component="notification-dot"
        {...props}
      >
        {children}
        {visible && (
          <span className={cx(
            'absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none',
            variantMap[variant],
          )}>
            {display}
          </span>
        )}
      </div>
    )
  },
)

export type { NotificationDotProps, NotificationDotVariant }
