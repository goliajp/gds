import type { ReactNode } from 'react'
import { forwardRef, useEffect, useRef } from 'react'

import { LoadingDots } from '../l3-atoms/loading-dots'
import { cx } from '../utils/cx'

type InfiniteScrollProps = React.HTMLAttributes<HTMLDivElement> & {
  onLoadMore: () => void
  hasMore: boolean
  loading?: boolean
  threshold?: number
  loader?: ReactNode
}

export const InfiniteScroll = forwardRef<HTMLDivElement, InfiniteScrollProps>(
  function InfiniteScroll(
    {
      children,
      className,
      hasMore,
      loader,
      loading,
      onLoadMore,
      threshold = 0.8,
      ...props
    },
    ref
  ) {
    const sentinelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const sentinel = sentinelRef.current
      if (sentinel === null) return

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (
            entry !== undefined &&
            entry.isIntersecting &&
            hasMore &&
            !loading
          ) {
            onLoadMore()
          }
        },
        { threshold }
      )

      observer.observe(sentinel)
      return () => observer.disconnect()
    }, [hasMore, loading, onLoadMore, threshold])

    return (
      <div
        className={cx('relative', className)}
        data-component="infinite-scroll"
        ref={ref}
        {...props}
      >
        {children}

        {loading === true && (
          <div className="flex items-center justify-center py-4">
            {loader ?? <LoadingDots />}
          </div>
        )}

        <div ref={sentinelRef} data-sentinel="true" className="h-px w-full" />
      </div>
    )
  }
)

export type { InfiniteScrollProps }
