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
        className={cx('gds-gap-sm flex flex-col', className)}
        data-component="scoreboard"
      >
        <div className="flex items-baseline justify-between">
          <span className="gds-text text-fg-muted">{label}</span>
          <span className="text-fg text-lg font-bold tabular-nums">
            {score}
            <span className="text-fg-muted text-sm font-normal">/{max}</span>
          </span>
        </div>
        <div className="bg-bg-tertiary h-2 w-full overflow-hidden rounded-full">
          <div
            className="bg-accent h-full rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    )
  }
)
