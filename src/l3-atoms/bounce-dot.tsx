// bounce-dot — bouncing dot loader animation
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type BounceDotProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: string
  count?: number
  size?: 'default' | 'lg' | 'sm'
}

const sizeClasses = {
  default: 'h-2 w-2',
  lg: 'h-3 w-3',
  sm: 'h-1.5 w-1.5',
} as const

export const BounceDot = forwardRef<HTMLDivElement, BounceDotProps>(
  function BounceDot(
    { className, color, count = 3, size = 'default', ...props },
    ref
  ) {
    const dots = Array.from({ length: count }, (_, i) => i)

    return (
      <div
        className={cx('inline-flex items-center gap-1', className)}
        data-component="bounce-dot"
        ref={ref}
        role="status"
        {...props}
      >
        {dots.map((i) => (
          <span
            className={cx(
              'bg-fg-muted animate-[bounce-dot_1.4s_ease-in-out_infinite] rounded-full',
              sizeClasses[size]
            )}
            key={i}
            style={{
              animationDelay: `${i * 160}ms`,
              ...(color !== undefined ? { backgroundColor: color } : {}),
            }}
          />
        ))}
      </div>
    )
  }
)

export type { BounceDotProps }
