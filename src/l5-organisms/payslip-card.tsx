import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type PayslipDeduction = { label: string; amount: number }

type PayslipCardProps = React.HTMLAttributes<HTMLDivElement> & {
  currency?: string
  deductions: PayslipDeduction[]
  gross: number
  net: number
  period: string
}

export const PayslipCard = forwardRef<HTMLDivElement, PayslipCardProps>(
  function PayslipCard(
    {
      className,
      currency = '\u00a5',
      deductions,
      gross,
      net,
      period,
      ...props
    },
    ref
  ) {
    const fmt = (n: number) => `${currency}${n.toLocaleString()}`

    return (
      <div
        className={cx(
          'gds-ctx gds-radius-card border-border bg-surface gds-pad border',
          className
        )}
        data-component="payslip-card"
        ref={ref}
        {...props}
      >
        <div className="text-fg mb-3 font-semibold">{period}</div>
        <div className="flex justify-between text-sm">
          <span className="text-fg-muted">Gross</span>
          <span className="text-fg">{fmt(gross)}</span>
        </div>
        {deductions.map((d) => (
          <div key={d.label} className="flex justify-between text-sm">
            <span className="text-fg-muted">{d.label}</span>
            <span className="text-danger">-{fmt(d.amount)}</span>
          </div>
        ))}
        <div className="border-border my-2 border-t" />
        <div className="flex justify-between font-bold">
          <span className="text-fg">Net Pay</span>
          <span className="text-fg">{fmt(net)}</span>
        </div>
      </div>
    )
  }
)

export type { PayslipCardProps, PayslipDeduction }
