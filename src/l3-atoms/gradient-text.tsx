// gradient-text — text with gradient color fill
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type GradientTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: string
  from?: string
  to?: string
}

export const GradientText = forwardRef<HTMLSpanElement, GradientTextProps>(
  function GradientText({ children, className, from = '#6366f1', to = '#ec4899', ...props }, ref) {
    return (
      <span
        className={cx('inline-block bg-clip-text text-transparent', className)}
        data-component="gradient-text"
        ref={ref}
        style={{
          backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
        }}
        {...props}
      >
        {children}
      </span>
    )
  },
)

export type { GradientTextProps }
