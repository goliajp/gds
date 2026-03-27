// skeleton-group — predefined skeleton layouts for common loading patterns
import { forwardRef } from 'react'

import { Skeleton } from '../l2-primitives/skeleton'
import { cx } from '../utils/cx'

type SkeletonGroupVariant = 'avatar-text' | 'card' | 'form-field'

type SkeletonGroupProps = {
  className?: string
  count?: number
  variant?: SkeletonGroupVariant
}

const layouts: Record<SkeletonGroupVariant, () => React.ReactNode> = {
  'avatar-text': () => (
    <div className="flex items-center gap-3">
      <Skeleton variant="circle" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  ),
  card: () => (
    <div className="flex flex-col gap-3">
      <Skeleton variant="rect" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="50%" />
    </div>
  ),
  'form-field': () => (
    <div className="flex flex-col gap-2">
      <Skeleton variant="text" width="30%" />
      <Skeleton variant="rect" height={36} />
    </div>
  ),
}

export const SkeletonGroup = forwardRef<HTMLDivElement, SkeletonGroupProps>(
  function SkeletonGroup({ className, count = 1, variant = 'avatar-text' }, ref) {
    const render = layouts[variant]

    return (
      <div
        ref={ref}
        className={cx('flex flex-col gap-4', className)}
        data-component="skeleton-group"
        data-variant={variant}
      >
        {Array.from({ length: count }, (_, i) => (
          <div key={i}>{render()}</div>
        ))}
      </div>
    )
  },
)

export type { SkeletonGroupProps, SkeletonGroupVariant }
