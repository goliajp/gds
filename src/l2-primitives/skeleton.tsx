// skeleton — loading placeholder with shimmer animation
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type SkeletonVariant = 'circle' | 'rect' | 'text'

type SkeletonProps = {
  className?: string
  height?: number | string
  lines?: number
  variant?: SkeletonVariant
  width?: number | string
}

const shimmerStyle: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, transparent 100%)',
  backgroundSize: '200% 100%',
  animation: 'gds-shimmer 1.5s ease-in-out infinite',
}

const variantDefaults: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded',
  circle: 'h-10 w-10 rounded-full',
  rect: 'h-20 w-full rounded-md',
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    { className, height, lines = 1, variant = 'text', width },
    ref
  ) {
    const sizeStyle: React.CSSProperties = {}
    if (width !== undefined)
      sizeStyle.width = typeof width === 'number' ? `${width}px` : width
    if (height !== undefined)
      sizeStyle.height = typeof height === 'number' ? `${height}px` : height

    const baseClass = cx('bg-bg-tertiary', variantDefaults[variant])

    if (variant === 'text' && lines > 1) {
      return (
        <div
          ref={ref}
          className={cx('flex flex-col gap-2', className)}
          data-component="skeleton"
          data-variant={variant}
        >
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              className={cx(baseClass, i === lines - 1 && 'w-3/4')}
              style={{ ...sizeStyle, ...shimmerStyle }}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cx(baseClass, className)}
        data-component="skeleton"
        data-variant={variant}
        style={{ ...sizeStyle, ...shimmerStyle }}
      />
    )
  }
)

export type { SkeletonProps, SkeletonVariant }
