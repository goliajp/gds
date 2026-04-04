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
  function OnboardingCard(
    { className, steps, title = 'Getting Started', ...props },
    ref
  ) {
    const done = steps.filter((s) => s.completed).length
    const pct = steps.length > 0 ? Math.round((done / steps.length) * 100) : 0

    return (
      <div
        className={cx(
          'gds-ctx border-border bg-surface gds-pad rounded-lg border',
          className
        )}
        data-component="onboarding-card"
        ref={ref}
        {...props}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="gds-heading text-fg font-semibold">{title}</h3>
          <span className="gds-text-label text-fg-muted">
            {done}/{steps.length}
          </span>
        </div>
        <div className="bg-border mb-4 h-1.5 w-full overflow-hidden rounded-full">
          <div
            className="bg-accent h-full rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <ul className="gds-gap flex flex-col">
          {steps.map((step, i) => (
            <li className="gds-gap flex items-center justify-between" key={i}>
              <div className="gds-gap-sm flex items-center">
                <span
                  className={cx(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs',
                    step.completed
                      ? 'bg-success text-white'
                      : 'border-border text-fg-muted border'
                  )}
                >
                  {step.completed ? '\u2713' : i + 1}
                </span>
                <span
                  className={cx(
                    'text-sm',
                    step.completed ? 'text-fg-muted line-through' : 'text-fg'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {step.action !== undefined && !step.completed && step.action}
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

export type { OnboardingCardProps, OnboardingStep }
