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
  function WizardLayout(
    { steps, currentStep, children, actions, className, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx('gds-gap flex min-h-0 flex-1 flex-col', className)}
        data-component="wizard-layout"
        {...props}
      >
        <div className="gds-pad-x shrink-0">
          <ProgressSteps steps={steps} current={currentStep} />
        </div>
        <div className="gds-pad-x min-h-0 flex-1 overflow-auto">{children}</div>
        {actions !== undefined && (
          <div className="gds-gap gds-pad-x gds-pad-y border-border flex shrink-0 items-center justify-end border-t">
            {actions}
          </div>
        )}
      </div>
    )
  }
)

export type { WizardLayoutProps }
