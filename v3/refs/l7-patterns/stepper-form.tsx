// stepper-form — multi-step form wizard with prev/next navigation
import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'

import { Button } from '../l2-primitives/button'
import { Stepper } from '../l4-molecules/stepper'
import { cx } from '../utils/cx'

type StepperFormStep = {
  title: string
  description?: string
  content: ReactNode
}

export type StepperFormProps = React.HTMLAttributes<HTMLDivElement> & {
  steps: StepperFormStep[]
  onComplete?: () => void
  completeLabel?: string
  glass?: boolean
}

export const StepperForm = forwardRef<HTMLDivElement, StepperFormProps>(
  function StepperForm(
    {
      steps,
      onComplete,
      completeLabel = 'Complete',
      glass = false,
      className,
      ...props
    },
    ref
  ) {
    const [current, setCurrent] = useState(0)
    const isFirst = current === 0
    const isLast = current === steps.length - 1

    const stepDefs = steps.map((s) => ({
      label: s.title,
      description: s.description,
    }))

    return (
      <div
        ref={ref}
        className={cx(
          'border-border flex flex-col rounded-lg border p-6',
          glass ? 'bg-bg/80 backdrop-blur-xl' : 'bg-bg-secondary',
          className
        )}
        data-component="stepper-form"
        {...props}
      >
        {/* stepper indicator */}
        <Stepper steps={stepDefs} current={current} className="mb-6" />

        {/* step content */}
        <div className="min-h-[120px] flex-1">{steps[current]?.content}</div>

        {/* navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="secondary"
            size="sm"
            disabled={isFirst}
            onClick={() => setCurrent((c) => c - 1)}
          >
            Previous
          </Button>

          {isLast ? (
            <Button size="sm" onClick={onComplete}>
              {completeLabel}
            </Button>
          ) : (
            <Button size="sm" onClick={() => setCurrent((c) => c + 1)}>
              Next
            </Button>
          )}
        </div>
      </div>
    )
  }
)
