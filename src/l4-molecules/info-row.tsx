// info-row — horizontal info bar with icon, label, and value
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type InfoRowProps = {
  label: string
  value: ReactNode
  icon?: ReactNode
  className?: string
}

export const InfoRow = forwardRef<HTMLDivElement, InfoRowProps>(
  function InfoRow({ label, value, icon, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx('flex items-center gap-2 gds-text-body select-none', className)}
        data-component="info-row"
      >
        {icon !== undefined && <span className="text-fg-muted/60">{icon}</span>}
        <span className="text-fg-muted">{label}</span>
        <span className="ml-auto font-medium text-fg">{value}</span>
      </div>
    )
  },
)
