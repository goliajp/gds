// star-rating — read-only star rating display with half-star support
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

const sizeMap = { sm: 14, default: 18, lg: 24 }
const STAR_D = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'

type StarRatingProps = {
  value: number
  max?: number
  size?: 'sm' | 'default' | 'lg'
  color?: string
  className?: string
}

function StarIcon({ fill, s, color }: { fill: 'full' | 'half' | 'empty'; s: number; color: string }) {
  const id = `half-${Math.random().toString(36).slice(2, 8)}`
  if (fill === 'full') {
    return <svg width={s} height={s} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth={1}><path d={STAR_D} /></svg>
  }
  if (fill === 'half') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" stroke={color} strokeWidth={1}>
        <defs><clipPath id={id}><rect x="0" y="0" width="12" height="24" /></clipPath></defs>
        <path d={STAR_D} fill="none" /><path d={STAR_D} fill={color} clipPath={`url(#${id})`} />
      </svg>
    )
  }
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="text-fg-muted/30"><path d={STAR_D} /></svg>
}

const StarRating = forwardRef<HTMLDivElement, StarRatingProps>(
  function StarRating({ value, max = 5, size = 'default', color = 'currentColor', className }, ref) {
    const s = sizeMap[size]
    const c = color === 'currentColor' ? 'var(--color-warning)' : color

    return (
      <div ref={ref} className={cx('inline-flex items-center gap-0.5', className)} data-component="star-rating" role="img" aria-label={`${value} out of ${max} stars`}>
        {Array.from({ length: max }, (_, i) => {
          const diff = value - i
          const fill = diff >= 1 ? 'full' : diff >= 0.5 ? 'half' : 'empty'
          return <StarIcon key={i} fill={fill} s={s} color={c} />
        })}
      </div>
    )
  },
)

export { StarRating }
export type { StarRatingProps }
