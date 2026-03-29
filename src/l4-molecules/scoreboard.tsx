// scoreboard — score display with progress bar
import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'

export type ScoreboardProps = {
  className?: string
  label: string
  max?: number
  score: number
}

export const Scoreboard = forwardRef<HTMLDivElement, ScoreboardProps>(
  function Scoreboard({ className, label, max = 100, score }, ref) {
    const pct = useMemo(() => {
      if (max <= 0) return 0
      return Math.min(100, Math.max(0, (score / max) * 100))
    }, [score, max])

    return (
      <div
        ref={ref}
        className={cx('flex flex-col gds-gap-sm', className)}
        data-component="scoreboard"
      >
        <div className="flex items-baseline justify-between">
          <span className="gds-text text-fg-muted">{label}</span>
          <span className="text-lg font-bold tabular-nums text-fg">
            {score}<span className="text-sm font-normal text-fg-muted">/{max}</span>
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-bg-tertiary">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    )
  },
)
