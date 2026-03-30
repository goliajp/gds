// progress-steps — linear progress indicator with labeled steps
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type ProgressStepsProps = {
  className?: string
  current: number
  steps: string[]
}

export const ProgressSteps = forwardRef<HTMLDivElement, ProgressStepsProps>(
  function ProgressSteps({ className, current, steps }, ref) {
    return (
      <div
        ref={ref}
        className={cx('flex items-center', className)}
        data-component="progress-steps"
        role="list"
      >
        {steps.map((label, i) => {
          const isCompleted = i < current
          const isCurrent = i === current

          return (
            <div
              key={`${label}-${i}`}
              className="flex flex-1 items-center"
              role="listitem"
            >
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cx(
                    'flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium',
                    isCompleted && 'bg-accent text-accent-fg',
                    isCurrent &&
                      'border-accent bg-accent/10 text-accent border-2',
                    !isCompleted &&
                      !isCurrent &&
                      'border-border bg-bg-secondary text-fg-muted border'
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={cx(
                    'gds-text-caption text-center',
                    isCurrent ? 'text-fg font-medium' : 'text-fg-muted'
                  )}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cx(
                    'mx-2 h-px flex-1',
                    isCompleted ? 'bg-accent' : 'bg-border'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }
)

export type { ProgressStepsProps }
