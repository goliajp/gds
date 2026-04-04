// zoom-on-hover — wrapper that scales content on hover
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type ZoomOnHoverProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  duration?: number
  scale?: number
}

export const ZoomOnHover = forwardRef<HTMLDivElement, ZoomOnHoverProps>(
  function ZoomOnHover(
    { children, className, duration = 300, scale = 1.1, ...props },
    ref
  ) {
    return (
      <div
        className={cx('overflow-hidden', className)}
        data-component="zoom-on-hover"
        ref={ref}
        {...props}
      >
        <div
          className="transition-transform ease-out"
          style={{ transitionDuration: `${duration}ms` }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = `scale(${scale})`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          {children}
        </div>
      </div>
    )
  }
)

export type { ZoomOnHoverProps }
