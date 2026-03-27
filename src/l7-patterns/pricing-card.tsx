// pricing-card — pricing tier card with name, price, features list, and CTA
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type PricingCardProps = {
  name: string
  price: string
  period?: string
  features: string[]
  action?: ReactNode
  highlighted?: boolean
  glass?: boolean
  className?: string
}

export const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  function PricingCard(
    { name, price, period = '/month', features, action, highlighted, glass, className },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-ctx gds-radius-card border gds-pad-x-lg gds-pad-y-lg flex flex-col',
          highlighted === true && 'border-accent ring-1 ring-accent',
          highlighted !== true && (
            glass === true
              ? cx(glassClass(glass), 'border-white/10 bg-bg/60')
              : 'border-border bg-surface'
          ),
          glass === true && highlighted === true && cx(glassClass(glass), 'bg-bg/60'),
          className,
        )}
        data-component="pricing-card"
        data-highlighted={highlighted === true ? 'true' : undefined}
      >
        <p className="font-semibold text-fg">{name}</p>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-3xl font-bold text-fg">{price}</span>
          <span className="gds-text-body text-fg-muted">{period}</span>
        </div>
        {features.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 gds-text-body text-fg-muted">
                <svg className="h-4 w-4 shrink-0 text-success" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        )}
        {action !== undefined && (
          <div className="mt-auto pt-4">{action}</div>
        )}
      </div>
    )
  },
)
