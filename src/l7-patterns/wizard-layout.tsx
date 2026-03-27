// wizard-layout — full-page wizard with step indicator, content, and actions
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { ProgressSteps } from '../l4-molecules/progress-steps'
import { cx } from '../utils/cx'

type WizardLayoutProps = React.HTMLAttributes<HTMLDivElement> & {
  actions?: ReactNode
  children: ReactNode
  currentStep: number
  steps: string[]
}

export const WizardLayout = forwardRef<HTMLDivElement, WizardLayoutProps>(
  function WizardLayout({ steps, currentStep, children, actions, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx('flex min-h-0 flex-1 flex-col gds-gap', className)}
        data-component="wizard-layout"
        {...props}
      >
        <div className="shrink-0 gds-pad-x">
          <ProgressSteps steps={steps} current={currentStep} />
        </div>
        <div className="min-h-0 flex-1 overflow-auto gds-pad-x">
          {children}
        </div>
        {actions !== undefined && (
          <div className="flex shrink-0 items-center justify-end gds-gap gds-pad-x gds-pad-y border-t border-border">
            {actions}
          </div>
        )}
      </div>
    )
  },
)

export type { WizardLayoutProps }
