import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type LiveDotProps = React.HTMLAttributes<HTMLSpanElement> & {
  label?: string
}

export const LiveDot = forwardRef<HTMLSpanElement, LiveDotProps>(
  function LiveDot({ className, label = 'LIVE', ...props }, ref) {
    return (
      <span
        className={cx('inline-flex items-center gap-1.5', className)}
        data-component="live-dot"
        ref={ref}
        {...props}
      >
        <span className="relative flex h-2 w-2">
          <span className="bg-danger absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
          <span className="bg-danger relative inline-flex h-2 w-2 rounded-full" />
        </span>
        <span className="text-danger text-xs font-bold tracking-wide uppercase">
          {label}
        </span>
      </span>
    )
  }
)

export type { LiveDotProps }
