import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type PercentageProps = React.HTMLAttributes<HTMLSpanElement> & {
  precision?: number
  showSign?: boolean
  value: number
}

export const Percentage = forwardRef<HTMLSpanElement, PercentageProps>(
  function Percentage(
    { className, precision = 1, showSign = false, value, ...props },
    ref
  ) {
    const isPositive = value > 0
    const isNegative = value < 0
    const colorCls = isPositive
      ? 'text-success'
      : isNegative
        ? 'text-danger'
        : 'text-fg-muted'
    const sign = showSign && isPositive ? '+' : ''
    const display = `${sign}${value.toFixed(precision)}%`

    return (
      <span
        className={cx(
          'inline-flex text-sm font-medium tabular-nums',
          colorCls,
          className
        )}
        data-component="percentage"
        ref={ref}
        {...props}
      >
        {display}
      </span>
    )
  }
)

export type { PercentageProps }
