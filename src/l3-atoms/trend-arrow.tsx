import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type TrendArrowDirection = 'up' | 'down' | 'flat'
type TrendArrowSize = 'sm' | 'default'

type TrendArrowProps = React.HTMLAttributes<HTMLSpanElement> & {
  direction: TrendArrowDirection
  size?: TrendArrowSize
}

const sizeMap: Record<TrendArrowSize, number> = { sm: 12, default: 16 }

const TrendArrow = forwardRef<HTMLSpanElement, TrendArrowProps>(
  function TrendArrow({ className, direction, size = 'default', ...props }, ref) {
    const s = sizeMap[size]
    const colorCls = direction === 'up' ? 'text-success' : direction === 'down' ? 'text-danger' : 'text-fg-muted'

    return (
      <span className={cx('inline-flex', colorCls, className)} data-component="trend-arrow" data-direction={direction} ref={ref} {...props}>
        <svg fill="none" height={s} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={s}>
          {direction === 'up' && <path d="M12 19V5M5 12l7-7 7 7" />}
          {direction === 'down' && <path d="M12 5v14M19 12l-7 7-7-7" />}
          {direction === 'flat' && <path d="M5 12h14" />}
        </svg>
      </span>
    )
  },
)

export { TrendArrow }
export type { TrendArrowDirection, TrendArrowProps, TrendArrowSize }
