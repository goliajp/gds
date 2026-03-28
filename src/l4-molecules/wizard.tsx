// wizard — multi-step wizard with numbered circles and content
import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'

import { cx } from '../utils/cx'

type WizardStep = {
  title: string
  content: ReactNode
}

type WizardProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  steps: WizardStep[]
  currentStep?: number
  onStepChange?: (step: number) => void
}

export const Wizard = forwardRef<HTMLDivElement, WizardProps>(
  function Wizard({ steps, currentStep, onStepChange, className, ...props }, ref) {
    const [internal, setInternal] = useState(0)
    const active = currentStep ?? internal

    function goTo(step: number) {
      if (onStepChange !== undefined) {
        onStepChange(step)
      } else {
        setInternal(step)
      }
    }

    return (
      <div ref={ref} className={cx('flex flex-col gap-4', className)} data-component="wizard" {...props}>
        <div className="flex items-center gap-0">
          {steps.map((step, i) => {
            const done = i < active
            const isCurrent = i === active
            return (
              <div key={`${step.title}-${i}`} className="flex items-center">
                {i > 0 && (
                  <div className={cx('h-px w-8', done ? 'bg-accent' : 'bg-border')} />
                )}
                <button
                  type="button"
                  className={cx(
                    'flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors',
                    done && 'bg-accent text-accent-fg',
                    isCurrent && 'bg-accent/20 text-accent ring-2 ring-accent',
                    !done && !isCurrent && 'bg-bg-tertiary text-fg-muted',
                  )}
                  onClick={() => goTo(i)}
                >
                  {i + 1}
                </button>
              </div>
            )
          })}
        </div>
        <div className="text-xs font-medium text-fg-muted">{steps[active]?.title}</div>
        <div>{steps[active]?.content}</div>
      </div>
    )
  },
)

export type { WizardProps, WizardStep }
