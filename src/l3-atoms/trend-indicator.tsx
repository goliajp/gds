import { cx } from '../utils/cx'

type TrendIndicatorProps = { className?: string; inverse?: boolean; label?: string; value: number }

export function TrendIndicator({ className, inverse = false, label, value }: TrendIndicatorProps) {
  const isPositive = value > 0
  const isNegative = value < 0
  const isZero = value === 0

  const colorClass = isZero
    ? 'text-fg-muted'
    : isPositive
      ? (inverse ? 'text-danger' : 'text-success')
      : (inverse ? 'text-success' : 'text-danger')

  const arrow = isPositive ? '\u25B2' : isNegative ? '\u25BC' : '\u2500'
  const sign = isPositive ? '+' : ''

  return (
    <span className={cx('inline-flex items-center gap-1 text-sm font-medium select-none', colorClass, className)} data-component="trend-indicator">
      <span className="text-[10px]">{arrow}</span>
      <span>{sign}{value}%</span>
      {label !== undefined && <span className="text-xs font-normal text-fg-muted">{label}</span>}
    </span>
  )
}

export type { TrendIndicatorProps }
