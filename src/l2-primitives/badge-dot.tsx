import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

const colorMap = {
  accent: 'bg-accent',
  danger: 'bg-danger',
  success: 'bg-success',
} as const

type BadgeDotProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  color?: 'accent' | 'danger' | 'success'
  show?: boolean
}

export const BadgeDot = forwardRef<HTMLDivElement, BadgeDotProps>(
  function BadgeDot({ children, className, color = 'danger', show = true, ...props }, ref) {
    return (
      <div
        className={cx('relative inline-flex', className)}
        data-component="badge-dot"
        ref={ref}
        {...props}
      >
        {children}
        {show && (
          <span
            className={cx('absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full', colorMap[color])}
          />
        )}
      </div>
    )
  },
)

export type { BadgeDotProps }
