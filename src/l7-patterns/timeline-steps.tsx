// timeline-steps — horizontal step indicator for order tracking and milestones
import { cx } from '../utils/cx'

export type TimelineStep = {
  label: string
  description?: string
  status: 'completed' | 'current' | 'upcoming'
}

export type TimelineStepsProps = {
  steps: TimelineStep[]
  className?: string
}

export function TimelineSteps({ steps, className }: TimelineStepsProps) {
  return (
    <div data-component="timeline-steps" className={cx('flex items-start', className)}>
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-1 items-start">
          <div className="flex flex-col items-center">
            <div
              data-status={step.status}
              className={cx(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                step.status === 'completed' && 'bg-success text-white',
                step.status === 'current' && 'bg-accent text-accent-fg animate-pulse',
                step.status === 'upcoming' && 'bg-bg-tertiary text-fg-muted',
              )}
            >
              {step.status === 'completed' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <div className="mt-2 text-center">
              <div className="text-xs font-medium text-fg">{step.label}</div>
              {step.description !== undefined && (
                <div className="mt-0.5 text-[10px] text-fg-muted">{step.description}</div>
              )}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cx(
                'mt-4 h-0.5 flex-1 mx-2',
                step.status === 'completed' ? 'bg-success' : 'bg-border',
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
