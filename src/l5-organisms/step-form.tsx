// step-form — multi-step form wizard with stepper header and navigation buttons
import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type FormStep = {
  label: string
  description?: string
  content: ReactNode
}

export type StepFormProps = {
  steps: FormStep[]
  onComplete: () => void
  className?: string
}

export const StepForm = forwardRef<HTMLDivElement, StepFormProps>(
  function StepForm({ steps, onComplete, className }, ref) {
    const [current, setCurrent] = useState(0)
    const isFirst = current === 0
    const isLast = current === steps.length - 1

    const handleNext = () => {
      if (isLast) {
        onComplete()
        return
      }
      setCurrent((prev) => prev + 1)
    }

    const handleBack = () => {
      setCurrent((prev) => prev - 1)
    }

    return (
      <div
        ref={ref}
        className={cx('flex flex-col gap-6 select-none', className)}
        data-component="step-form"
      >
        {/* step indicators */}
        <div className="flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={`${step.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && <div className={cx('h-px w-8', i <= current ? 'bg-accent' : 'bg-border')} />}
              <div className="flex items-center gap-2">
                <div
                  className={cx(
                    'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium',
                    i < current && 'bg-accent text-accent-fg',
                    i === current && 'border-2 border-accent text-accent',
                    i > current && 'border border-border text-fg-muted',
                  )}
                >
                  {i < current ? (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7l3 3 5-6" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={cx('text-xs', i === current ? 'font-medium text-fg' : 'text-fg-muted')}>
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* content */}
        <div className="min-h-[120px]">{steps[current].content}</div>

        {/* navigation */}
        <div className="flex items-center justify-end gap-2">
          {!isFirst && (
            <button
              type="button"
              className={cx(
                'h-8 gds-radius-button px-3 text-xs font-medium text-fg-muted transition-colors hover:bg-bg-tertiary hover:text-fg',
                focusCls,
              )}
              onClick={handleBack}
            >
              Back
            </button>
          )}
          <button
            type="button"
            className={cx(
              'h-8 gds-radius-button bg-accent px-3 text-xs font-medium text-accent-fg transition-colors hover:bg-accent/90',
              focusCls,
            )}
            onClick={handleNext}
          >
            {isLast ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    )
  },
)
