import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type Transaction = {
  amount: number
  currency?: string
  date: string
  description: string
  id: string
}

type TransactionListProps = React.HTMLAttributes<HTMLDivElement> & {
  transactions: Transaction[]
}

function formatAmount(amount: number, currency: string): string {
  const sign = amount >= 0 ? '+' : ''
  return `${sign}${currency}${Math.abs(amount).toLocaleString()}`
}

export const TransactionList = forwardRef<HTMLDivElement, TransactionListProps>(
  function TransactionList({ className, transactions, ...props }, ref) {
    return (
      <div
        className={cx('flex flex-col divide-y divide-border', className)}
        data-component="transaction-list"
        ref={ref}
        {...props}
      >
        {transactions.map((tx) => {
          const currency = tx.currency ?? '\u00a5'
          const isPositive = tx.amount >= 0
          return (
            <div className="flex items-center justify-between px-3 py-2.5" key={tx.id}>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-fg">{tx.description}</span>
                <span className="text-xs text-fg-muted">{tx.date}</span>
              </div>
              <span
                className={cx(
                  'text-sm font-semibold tabular-nums',
                  isPositive ? 'text-success' : 'text-danger',
                )}
              >
                {formatAmount(tx.amount, currency)}
              </span>
            </div>
          )
        })}
      </div>
    )
  },
)

export type { Transaction, TransactionListProps }
