import type { ReactNode } from 'react'
import { forwardRef, useCallback, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

const sizeMap = {
  default: 'gds-sq-xs',
  lg: 'gds-sq-sm',
  sm: 'gds-icon',
}

// default star SVG
function DefaultStar({ filled }: { filled: boolean }) {
  return (
    <svg
      className={cx(
        sizeMap.default,
        filled ? 'fill-warning text-warning' : 'text-fg-muted/20'
      )}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type RatingProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  max?: number
  onChange?: (value: number) => void
  readonly?: boolean
  renderStar?: (filled: boolean, index: number) => ReactNode
  size?: 'default' | 'lg' | 'sm'
  value: number
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(function Rating(
  {
    className,
    max = 5,
    onChange,
    readonly = false,
    renderStar,
    size = 'default',
    value,
    ...props
  },
  ref
) {
  const [hovered, setHovered] = useState<number | null>(null)

  const handleLeave = useCallback(() => setHovered(null), [])

  return (
    <div
      className={cx('gds-gap-xs inline-flex', className)}
      data-component="rating"
      onMouseLeave={readonly ? undefined : handleLeave}
      ref={ref}
      role="group"
      {...props}
    >
      {Array.from({ length: max }, (_, i) => {
        const starIndex = i + 1
        const filled =
          hovered !== null ? starIndex <= hovered : starIndex <= value

        if (readonly) {
          return (
            <span className={sizeMap[size]} key={i}>
              {renderStar !== undefined ? (
                renderStar(filled, i)
              ) : (
                <DefaultStar filled={filled} />
              )}
            </span>
          )
        }

        return (
          <button
            className={cx('transition-transform hover:scale-110', focusCls)}
            key={i}
            onClick={() => onChange?.(starIndex)}
            onMouseEnter={() => setHovered(starIndex)}
            type="button"
          >
            <span className={sizeMap[size]}>
              {renderStar !== undefined ? (
                renderStar(filled, i)
              ) : (
                <DefaultStar filled={filled} />
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
})

export type { RatingProps }
