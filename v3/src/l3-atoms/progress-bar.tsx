import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glowClass } from '../utils/glow'
import type { GlowColor } from '../utils/types'

type ProgressBarProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string
  value: number
  max?: number
  showPercent?: boolean
  color?: 'accent' | 'success' | 'warning' | 'danger'
  glow?: boolean | GlowColor
  size?: 'sm' | 'default'
}

// layout: [label] [========--------] [45%]
const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  function ProgressBar({ label, value, max = 100, showPercent = true, color = 'accent', glow, size = 'default', className, ...props }, ref) {
    const pct = Math.round((value / max) * 100)
    const barColor = {
      accent: 'bg-accent',
      success: 'bg-success',
      warning: 'bg-warning',
      danger: 'bg-danger',
    }[color]

    return (
      <div ref={ref} className={cx('flex items-center', size === 'sm' ? 'gap-1.5' : 'gap-2', className)} data-component="progress-bar" {...props}>
        <span className={cx('text-fg-muted shrink-0', size === 'sm' ? 'gds-text-caption' : 'gds-text-label')}>{label}</span>
        <div className="bg-bg-tertiary relative h-1.5 flex-1 overflow-hidden rounded-full">
          <div
            className={cx(barColor, glowClass(glow), 'h-full rounded-full transition-all')}
            style={{ width: `${pct}%` }}
          />
        </div>
        {showPercent && (
          <span className={cx('text-fg tabular-nums', size === 'sm' ? 'gds-text-caption' : 'gds-text-label')}>{pct}%</span>
        )}
      </div>
    )
  }
)

export { ProgressBar }
export type { ProgressBarProps }
