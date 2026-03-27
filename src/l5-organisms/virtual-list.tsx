// virtual-list — windowed list rendering for large datasets
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'

import { cx } from '../utils/cx'

export type VirtualListProps<T> = {
  items: T[]
  itemHeight: number
  renderItem: (item: T, index: number) => ReactNode
  overscan?: number
  className?: string
  height?: number | string
}

function VirtualListInner<T>(
  {
    items,
    itemHeight,
    renderItem,
    overscan = 3,
    className,
    height = 400,
  }: VirtualListProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [scrollTop, setScrollTop] = useState(0)
  const innerRef = useRef<HTMLDivElement>(null)

  const totalHeight = items.length * itemHeight

  const containerHeight = typeof height === 'number' ? height : undefined

  const { visibleItems } = useMemo(() => {
    const viewportHeight = containerHeight ?? 400
    const rawStart = Math.floor(scrollTop / itemHeight)
    const rawEnd = Math.ceil((scrollTop + viewportHeight) / itemHeight)
    const start = Math.max(0, rawStart - overscan)
    const end = Math.min(items.length, rawEnd + overscan)

    const visible: Array<{ item: T; index: number }> = []
    for (let i = start; i < end; i++) {
      visible.push({ item: items[i], index: i })
    }

    return { startIndex: start, endIndex: end, visibleItems: visible }
  }, [items, itemHeight, scrollTop, containerHeight, overscan])

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  return (
    <div
      ref={ref}
      className={cx('overflow-y-auto', className)}
      style={{ height }}
      onScroll={handleScroll}
      data-component="virtual-list"
    >
      <div
        ref={innerRef}
        style={{ height: totalHeight, position: 'relative' }}
      >
        {visibleItems.map(({ item, index }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: index * itemHeight,
              left: 0,
              right: 0,
              height: itemHeight,
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  )
}

export const VirtualList = forwardRef(VirtualListInner) as <T>(
  props: VirtualListProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => ReactNode
