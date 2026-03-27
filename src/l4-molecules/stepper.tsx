// stepper — multi-step progress indicator with connecting lines
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type StepDef = {
  label: string
  description?: string
}

export type StepperProps = React.HTMLAttributes<HTMLDivElement> & {
  steps: StepDef[]
  current: number
  orientation?: 'horizontal' | 'vertical'
}

const checkSvg = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7.5l3 3 5-6" />
  </svg>
)

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  function Stepper({ steps, current, orientation = 'horizontal', className, ...props }, ref) {
    const isHoriz = orientation === 'horizontal'

    return (
      <div
        ref={ref}
        className={cx(
          'flex',
          isHoriz ? 'items-start' : 'flex-col',
          className,
        )}
        data-component="stepper"
        role="list"
        {...props}
      >
        {steps.map((step, i) => {
          const completed = i < current
          const active = i === current

          return (
            <div
              key={i}
              className={cx(
                'flex',
                isHoriz ? 'flex-1 items-center' : 'items-start',
              )}
              role="listitem"
            >
              <div className={cx('flex', isHoriz ? 'flex-col items-center' : 'items-start gds-gap')}>
                <div className="flex items-center">
                  {/* step circle */}
                  <div
                    className={cx(
                      'flex gds-sq-sm shrink-0 items-center justify-center gds-radius-badge gds-text-body font-medium transition-colors',
                      completed && 'bg-accent text-accent-fg',
                      active && 'border-2 border-accent bg-transparent text-accent ring-2 ring-accent/20',
                      !completed && !active && 'bg-bg-tertiary text-fg-muted',
                    )}
                  >
                    {completed ? checkSvg : i + 1}
                  </div>
                </div>
                {/* label + description */}
                <div className={cx(isHoriz ? 'mt-2 text-center' : '')}>
                  <p className={cx('gds-text-body font-medium', active ? 'text-fg' : 'text-fg-muted')}>{step.label}</p>
                  {step.description !== undefined && (
                    <p className="mt-0.5 gds-text-caption text-fg-muted">{step.description}</p>
                  )}
                </div>
              </div>

              {/* connecting line */}
              {i < steps.length - 1 && (
                isHoriz ? (
                  <div className={cx(
                    'mx-2 mt-3.5 h-px flex-1',
                    completed ? 'bg-accent' : 'bg-border',
                  )} />
                ) : (
                  <div className={cx(
                    'ml-3.5 mt-1 mb-1 w-px',
                    'min-h-6',
                    completed ? 'bg-accent' : 'bg-border',
                  )} />
                )
              )}
            </div>
          )
        })}
      </div>
    )
  },
)
