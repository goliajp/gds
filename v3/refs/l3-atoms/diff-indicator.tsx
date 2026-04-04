import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type DiffIndicatorProps = React.HTMLAttributes<HTMLSpanElement> & {
  inverted?: boolean
  unit?: string
  value: number
}

export const DiffIndicator = forwardRef<HTMLSpanElement, DiffIndicatorProps>(
  function DiffIndicator(
    { className, inverted = false, unit, value, ...props },
    ref
  ) {
    const isPositive = value > 0
    const isNegative = value < 0
    // inverted: lower is good (e.g. error rate), so positive = bad, negative = good
    const isGood = inverted ? isNegative : isPositive
    const isBad = inverted ? isPositive : isNegative

    const colorCls = isGood
      ? 'text-success'
      : isBad
        ? 'text-danger'
        : 'text-fg-muted'
    const arrow = isPositive ? '\u2191' : isNegative ? '\u2193' : ''
    const sign = isPositive ? '+' : ''
    const display = `${arrow}${sign}${value}${unit !== undefined ? unit : ''}`

    return (
      <span
        className={cx(
          'inline-flex items-center gap-0.5 text-sm font-medium tabular-nums',
          colorCls,
          className
        )}
        data-component="diff-indicator"
        data-direction={isPositive ? 'up' : isNegative ? 'down' : 'neutral'}
        ref={ref}
        {...props}
      >
        {display}
      </span>
    )
  }
)

export type { DiffIndicatorProps }
