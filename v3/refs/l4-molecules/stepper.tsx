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
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7.5l3 3 5-6" />
  </svg>
)

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  function Stepper(
    { steps, current, orientation = 'horizontal', className, ...props },
    ref
  ) {
    const isHoriz = orientation === 'horizontal'

    return (
      <div
        ref={ref}
        className={cx('flex', isHoriz ? 'items-start' : 'flex-col', className)}
        data-component="stepper"
        role="list"
        {...props}
      >
        {steps.map((step, i) => {
          const completed = i < current
          const active = i === current

          return (
            <div
              key={`${step.label}-${i}`}
              className={cx(
                'flex',
                isHoriz ? 'flex-1 items-center' : 'items-start'
              )}
              role="listitem"
            >
              <div
                className={cx(
                  'flex',
                  isHoriz ? 'flex-col items-center' : 'gds-gap items-start'
                )}
              >
                <div className="flex items-center">
                  {/* step circle */}
                  <div
                    className={cx(
                      'gds-sq-sm gds-radius-badge gds-text-body flex shrink-0 items-center justify-center font-medium transition-colors',
                      completed && 'bg-accent text-accent-fg',
                      active &&
                        'border-accent text-accent ring-accent/20 border-2 bg-transparent ring-2',
                      !completed && !active && 'bg-bg-tertiary text-fg-muted'
                    )}
                  >
                    {completed ? checkSvg : i + 1}
                  </div>
                </div>
                {/* label + description */}
                <div className={cx(isHoriz ? 'mt-2 text-center' : '')}>
                  <p
                    className={cx(
                      'gds-text-body font-medium',
                      active ? 'text-fg' : 'text-fg-muted'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description !== undefined && (
                    <p className="gds-text-caption text-fg-muted mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* connecting line */}
              {i < steps.length - 1 &&
                (isHoriz ? (
                  <div
                    className={cx(
                      'mx-2 mt-3.5 h-px flex-1',
                      completed ? 'bg-accent' : 'bg-border'
                    )}
                  />
                ) : (
                  <div
                    className={cx(
                      'mt-1 mb-1 ml-3.5 w-px',
                      'min-h-6',
                      completed ? 'bg-accent' : 'bg-border'
                    )}
                  />
                ))}
            </div>
          )
        })}
      </div>
    )
  }
)
