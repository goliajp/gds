// description — title + muted body text pair for inline descriptions
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type DescriptionProps = {
  children: ReactNode
  title?: string
  className?: string
}

export const Description = forwardRef<HTMLDivElement, DescriptionProps>(
  function Description({ children, title, className }, ref) {
    return (
      <div ref={ref} className={cx('space-y-0.5', className)} data-component="description">
        {title !== undefined && (
          <div className="gds-text-body font-medium text-fg">{title}</div>
        )}
        <div className="gds-text-body text-fg-muted">{children}</div>
      </div>
    )
  },
)
