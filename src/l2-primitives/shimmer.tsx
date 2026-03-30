// shimmer — skeleton shimmer placeholder effect
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type ShimmerProps = React.HTMLAttributes<HTMLDivElement> & {
  height?: string
  rounded?: boolean
  width?: string
}

export const Shimmer = forwardRef<HTMLDivElement, ShimmerProps>(
  function Shimmer(
    { className, height = '20px', rounded = false, width = '100%', ...props },
    ref
  ) {
    return (
      <div
        className={cx(
          'bg-fg-muted/10 relative overflow-hidden',
          rounded ? 'rounded-full' : 'rounded-md',
          className
        )}
        data-component="shimmer"
        ref={ref}
        style={{ width, height }}
        {...props}
      >
        <div className="via-fg-muted/5 absolute inset-0 animate-[shimmer_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent to-transparent" />
      </div>
    )
  }
)

export type { ShimmerProps }
