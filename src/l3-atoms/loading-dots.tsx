import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type LoadingDotsProps = React.HTMLAttributes<HTMLSpanElement> & {
  count?: number
  size?: 'default' | 'sm'
}

const sizeMap = {
  default: 'h-1.5 w-1.5',
  sm: 'h-1 w-1',
}

export const LoadingDots = forwardRef<HTMLSpanElement, LoadingDotsProps>(
  function LoadingDots(
    { className, count = 3, size = 'default', ...props },
    ref
  ) {
    return (
      <span
        className={cx('gds-gap-xs inline-flex items-center', className)}
        data-component="loading-dots"
        ref={ref}
        role="status"
        {...props}
      >
        {Array.from({ length: count }, (_, i) => (
          <span
            className={cx(
              'gds-radius-badge bg-fg-muted/40 animate-pulse',
              sizeMap[size]
            )}
            key={i}
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </span>
    )
  }
)

export type { LoadingDotsProps }
