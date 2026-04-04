import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type CurrencyDisplayProps = React.HTMLAttributes<HTMLDivElement> & {
  amount: number
  change?: number
  currency?: string
  period?: string
}

export const CurrencyDisplay = forwardRef<HTMLDivElement, CurrencyDisplayProps>(
  function CurrencyDisplay(
    { amount, change, className, currency = '\u00a5', period, ...props },
    ref
  ) {
    const formatted = amount.toLocaleString()

    return (
      <div
        className={cx('gds-gap flex items-baseline', className)}
        data-component="currency-display"
        ref={ref}
        {...props}
      >
        <span className="text-fg text-2xl font-bold">
          {currency}
          {formatted}
        </span>
        {change !== undefined && (
          <span
            className={cx(
              'text-sm font-medium',
              change >= 0 ? 'text-success' : 'text-danger'
            )}
          >
            {change >= 0 ? '\u2191' : '\u2193'}
            {Math.abs(change)}%
          </span>
        )}
        {period !== undefined && (
          <span className="text-fg-muted text-xs">{period}</span>
        )}
      </div>
    )
  }
)

export type { CurrencyDisplayProps }
