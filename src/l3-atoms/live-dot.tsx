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
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
        </span>
        <span className="text-xs font-bold uppercase tracking-wide text-danger">{label}</span>
      </span>
    )
  },
)

export type { LiveDotProps }
