// watermark — overlay repeated text watermark on content
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type WatermarkProps = {
  children: ReactNode
  text: string
  opacity?: number
  className?: string
}

export const Watermark = forwardRef<HTMLDivElement, WatermarkProps>(
  function Watermark({ children, text, opacity = 0.1, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx('relative overflow-hidden', className)}
        data-component="watermark"
      >
        {children}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
          style={{ opacity }}
        >
          <div
            className="absolute inset-[-50%] flex flex-wrap items-center justify-center gap-16"
            style={{ transform: 'rotate(-30deg)' }}
          >
            {Array.from({ length: 64 }, (_, i) => (
              <span key={i} className="text-lg font-bold whitespace-nowrap text-fg">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  },
)
