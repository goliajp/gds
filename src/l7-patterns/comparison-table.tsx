// comparison-table — feature comparison grid for pricing and plan comparison
import { cx } from '../utils/cx'

export type ComparisonPlan = {
  name: string
  values: (boolean | string)[]
}

export type ComparisonTableProps = {
  features: string[]
  plans: ComparisonPlan[]
  highlightColumn?: number
  glass?: boolean
  className?: string
}

export function ComparisonTable({
  features,
  plans,
  highlightColumn,
  glass,
  className,
}: ComparisonTableProps) {
  return (
    <div
      data-component="comparison-table"
      className={cx(
        'overflow-hidden gds-radius-card border border-border',
        glass === true && 'bg-white/5 backdrop-blur-md',
        className,
      )}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-tertiary/30">
            <th className="px-4 py-3 text-left text-xs font-medium text-fg-muted">Feature</th>
            {plans.map((plan, i) => (
              <th
                key={plan.name}
                className={cx(
                  'px-4 py-3 text-center text-xs font-semibold text-fg',
                  i === highlightColumn && 'bg-accent/5',
                )}
              >
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, fi) => (
            <tr key={feature} className={cx(fi < features.length - 1 && 'border-b border-border/50')}>
              <td className="px-4 py-2.5 text-xs text-fg">{feature}</td>
              {plans.map((plan, pi) => {
                const val = plan.values[fi]
                return (
                  <td
                    key={plan.name}
                    className={cx(
                      'px-4 py-2.5 text-center',
                      pi === highlightColumn && 'bg-accent/5',
                    )}
                  >
                    {typeof val === 'boolean' ? (
                      val === true ? (
                        <svg className="mx-auto text-success" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" data-icon="check">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg className="mx-auto text-fg-muted/40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-icon="dash">
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      )
                    ) : (
                      <span className="text-xs text-fg">{val}</span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
