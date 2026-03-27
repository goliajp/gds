import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type PriceProps = React.HTMLAttributes<HTMLSpanElement> & {
  currency?: string
  showSign?: boolean
  value: number
}

export const Price = forwardRef<HTMLSpanElement, PriceProps>(
  function Price({ className, currency = '\u00a5', showSign = false, value, ...props }, ref) {
    const isNeg = value < 0
    const isPos = value > 0
    const colorCls = isNeg ? 'text-danger' : isPos ? 'text-success' : 'text-fg'
    const sign = showSign && isPos ? '+' : ''
    const formatted = Math.abs(value).toLocaleString()

    return (
      <span
        className={cx('tabular-nums', colorCls, className)}
        data-component="price"
        ref={ref}
        {...props}
      >
        {isNeg ? '-' : sign}{currency}{formatted}
      </span>
    )
  },
)

export type { PriceProps }
