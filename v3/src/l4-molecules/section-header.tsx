// section-header — section title with icon and action
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type SectionHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  function SectionHeader({ title, description, icon, action, className, ...props }, ref) {
    return (
      <div ref={ref} className={cx('flex items-center justify-between', className)} data-component="section-header" {...props}>
        <div className="flex items-center gds-gap-sm">
          {icon !== undefined && <span className="gds-icon-child text-fg-muted">{icon}</span>}
          <div>
            <h2 className="gds-text-heading text-fg font-semibold">{title}</h2>
            {description !== undefined && <p className="gds-text-caption text-fg-muted">{description}</p>}
          </div>
        </div>
        {action !== undefined && action}
      </div>
    )
  }
)

export { SectionHeader }
export type { SectionHeaderProps }
