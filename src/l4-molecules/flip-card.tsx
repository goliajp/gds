// flip-card — 3D CSS perspective card with front/back
import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'

import { cx } from '../utils/cx'

export type FlipCardProps = {
  back: ReactNode
  className?: string
  front: ReactNode
  trigger?: 'click' | 'hover'
}

export const FlipCard = forwardRef<HTMLDivElement, FlipCardProps>(
  function FlipCard({ back, className, front, trigger = 'click' }, ref) {
    const [flipped, setFlipped] = useState(false)

    const hoverHandlers =
      trigger === 'hover'
        ? {
            onMouseEnter: () => setFlipped(true),
            onMouseLeave: () => setFlipped(false),
          }
        : {}

    const clickHandler =
      trigger === 'click' ? { onClick: () => setFlipped((prev) => !prev) } : {}

    return (
      <div
        ref={ref}
        className={cx('relative cursor-pointer', className)}
        style={{ perspective: '1000px' }}
        data-component="flip-card"
        data-state={flipped ? 'flipped' : 'front'}
        {...hoverHandlers}
        {...clickHandler}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <div className="relative" style={{ backfaceVisibility: 'hidden' }}>
            {front}
          </div>
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {back}
          </div>
        </div>
      </div>
    )
  }
)
