// ribbon — corner ribbon/banner for containers
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

const variantMap = {
  accent: 'bg-accent text-accent-fg',
  danger: 'bg-danger text-white',
  success: 'bg-success text-white',
  warning: 'bg-warning text-white',
} as const

type RibbonProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  label: string
  variant?: 'accent' | 'danger' | 'success' | 'warning'
  position?: 'top-left' | 'top-right'
}

export const Ribbon = forwardRef<HTMLDivElement, RibbonProps>(
  function Ribbon({ children, label, variant = 'accent', position = 'top-right', className, ...props }, ref) {
    const isRight = position === 'top-right'
    return (
      <div ref={ref} className={cx('relative overflow-hidden', className)} data-component="ribbon" {...props}>
        <div
          className={cx(
            'pointer-events-none absolute top-3 z-10 px-6 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm',
            variantMap[variant],
            isRight ? '-right-6 rotate-45' : '-left-6 -rotate-45',
          )}
        >
          {label}
        </div>
        {children}
      </div>
    )
  },
)

export type { RibbonProps }
