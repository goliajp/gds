// progress-timeline — horizontal milestone tracker with progress line
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type Milestone = {
  label: string
  date: string
  completed: boolean
}

export type ProgressTimelineProps = {
  milestones: Milestone[]
  className?: string
}

export const ProgressTimeline = forwardRef<HTMLDivElement, ProgressTimelineProps>(
  function ProgressTimeline({ milestones, className }, ref) {
    const lastCompletedIdx = milestones.reduce(
      (acc, m, i) => (m.completed ? i : acc),
      -1,
    )

    return (
      <div
        ref={ref}
        className={cx('select-none', className)}
        data-component="progress-timeline"
      >
        <div className="relative flex items-start justify-between">
          {/* background line */}
          <div className="absolute top-3 right-4 left-4 h-0.5 bg-border" />

          {/* progress line */}
          {lastCompletedIdx >= 0 && milestones.length > 1 && (
            <div
              className="absolute top-3 left-4 h-0.5 bg-accent"
              style={{
                width: `${(lastCompletedIdx / (milestones.length - 1)) * 100}%`,
              }}
            />
          )}

          {milestones.map((milestone, i) => (
            <div
              key={i}
              className="relative z-10 flex flex-col items-center gap-1"
            >
              {/* circle */}
              <div
                className={cx(
                  'h-6 w-6 rounded-full border-2 transition-colors',
                  milestone.completed
                    ? 'border-accent bg-accent'
                    : 'border-border bg-bg',
                )}
                data-completed={milestone.completed}
              />
              {/* label */}
              <span className="text-xs font-medium text-fg">
                {milestone.label}
              </span>
              {/* date */}
              <span className="gds-text-body text-fg-muted">{milestone.date}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
)
