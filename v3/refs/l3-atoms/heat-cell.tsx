import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type HeatCellProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: string
  max?: number
  showValue?: boolean
  size?: number
  value: number
}

const HeatCell = forwardRef<HTMLDivElement, HeatCellProps>(function HeatCell(
  {
    className,
    color = 'var(--color-accent)',
    max = 100,
    showValue = false,
    size = 32,
    value,
    ...props
  },
  ref
) {
  const intensity = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0

  return (
    <div
      className={cx(
        'inline-flex items-center justify-center rounded text-[10px] font-medium',
        className
      )}
      data-component="heat-cell"
      ref={ref}
      style={{
        backgroundColor: color,
        height: size,
        opacity: 0.1 + intensity * 0.9,
        width: size,
      }}
      {...props}
    >
      {showValue && (
        <span className="text-white mix-blend-difference">{value}</span>
      )}
    </div>
  )
})

export { HeatCell }
export type { HeatCellProps }
