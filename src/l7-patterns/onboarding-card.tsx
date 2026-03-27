import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type OnboardingStep = {
  action?: ReactNode
  completed: boolean
  label: string
}

type OnboardingCardProps = React.HTMLAttributes<HTMLDivElement> & {
  steps: OnboardingStep[]
  title?: string
}

export const OnboardingCard = forwardRef<HTMLDivElement, OnboardingCardProps>(
  function OnboardingCard({ className, steps, title = 'Getting Started', ...props }, ref) {
    const done = steps.filter((s) => s.completed).length
    const pct = steps.length > 0 ? Math.round((done / steps.length) * 100) : 0

    return (
      <div
        className={cx('gds-ctx rounded-lg border border-border bg-surface gds-pad', className)}
        data-component="onboarding-card"
        ref={ref}
        {...props}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="gds-heading font-semibold text-fg">{title}</h3>
          <span className="gds-text-label text-fg-muted">{done}/{steps.length}</span>
        </div>
        <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <ul className="flex flex-col gds-gap">
          {steps.map((step, i) => (
            <li className="flex items-center justify-between gds-gap" key={i}>
              <div className="flex items-center gds-gap-sm">
                <span className={cx(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs',
                  step.completed ? 'bg-success text-white' : 'border border-border text-fg-muted',
                )}>
                  {step.completed ? '\u2713' : i + 1}
                </span>
                <span className={cx('text-sm', step.completed ? 'text-fg-muted line-through' : 'text-fg')}>
                  {step.label}
                </span>
              </div>
              {step.action !== undefined && !step.completed && step.action}
            </li>
          ))}
        </ul>
      </div>
    )
  },
)

export type { OnboardingCardProps, OnboardingStep }
