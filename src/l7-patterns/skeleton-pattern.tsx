// skeleton-pattern — pre-composed skeleton loading patterns
import { forwardRef } from 'react'

import { Skeleton } from '../l2-primitives/skeleton'
import { cx } from '../utils/cx'

type SkeletonPatternVariant = 'card' | 'list' | 'profile' | 'table'

export type SkeletonPatternProps = {
  variant: SkeletonPatternVariant
  count?: number
  glass?: boolean
  className?: string
}

function CardSkeleton() {
  return (
    <div className="gds-gap gds-ctx gds-pad gds-radius-card flex flex-col">
      <Skeleton variant="rect" height={120} />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" lines={2} />
    </div>
  )
}

function ListRow() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton variant="circle" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="80%" />
      </div>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="gds-gap gds-ctx gds-pad flex flex-col items-center">
      <Skeleton variant="circle" width={64} height={64} />
      <Skeleton variant="text" width="30%" />
      <Skeleton variant="text" lines={3} />
    </div>
  )
}

function TableSkeleton({ rows }: { rows: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <Skeleton variant="text" width="25%" />
        <Skeleton variant="text" width="25%" />
        <Skeleton variant="text" width="25%" />
        <Skeleton variant="text" width="25%" />
      </div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton variant="text" width="25%" />
          <Skeleton variant="text" width="25%" />
          <Skeleton variant="text" width="25%" />
          <Skeleton variant="text" width="25%" />
        </div>
      ))}
    </div>
  )
}

export const SkeletonPattern = forwardRef<HTMLDivElement, SkeletonPatternProps>(
  function SkeletonPattern({ variant, count = 1, glass, className }, ref) {
    const glassClass = glass ? 'backdrop-blur-md bg-white/5' : undefined

    if (variant === 'card') {
      return (
        <div
          ref={ref}
          className={cx('gds-ctx gds-radius-card', glassClass, className)}
          data-component="skeleton-pattern"
          data-variant="card"
        >
          <CardSkeleton />
        </div>
      )
    }

    if (variant === 'list') {
      return (
        <div
          ref={ref}
          className={cx(
            'gds-gap gds-ctx gds-pad flex flex-col',
            glassClass,
            className
          )}
          data-component="skeleton-pattern"
          data-variant="list"
        >
          {Array.from({ length: count }, (_, i) => (
            <ListRow key={i} />
          ))}
        </div>
      )
    }

    if (variant === 'profile') {
      return (
        <div
          ref={ref}
          className={cx(glassClass, className)}
          data-component="skeleton-pattern"
          data-variant="profile"
        >
          <ProfileSkeleton />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cx('gds-ctx gds-pad', glassClass, className)}
        data-component="skeleton-pattern"
        data-variant="table"
      >
        <TableSkeleton rows={count} />
      </div>
    )
  }
)

export type { SkeletonPatternVariant }
