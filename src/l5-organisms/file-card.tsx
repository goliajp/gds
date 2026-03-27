// file-card — file/document card with thumbnail, name, size, type badge, and actions
import type { ReactNode } from 'react'

import { forwardRef } from 'react'

import { Badge } from '../l2-primitives/badge'
import { cx } from '../utils/cx'

type FileCardProps = {
  name: string
  size?: string
  type?: string
  thumbnail?: string
  actions?: ReactNode
  onClick?: () => void
  className?: string
}

const FileCard = forwardRef<HTMLDivElement, FileCardProps>(
  function FileCard({ name, size, type, thumbnail, actions, onClick, className }, ref) {
    const isClickable = onClick !== undefined

    return (
      <div
        ref={ref}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={isClickable ? onClick : undefined}
        onKeyDown={isClickable ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() }
        } : undefined}
        className={cx(
          'gds-ctx gds-radius-card border border-border bg-surface overflow-hidden select-none',
          isClickable && 'cursor-pointer hover:border-accent/40 transition-colors',
          className,
        )}
        data-component="file-card"
      >
        {thumbnail !== undefined && (
          <div className="flex h-28 items-center justify-center bg-bg-tertiary">
            <img src={thumbnail} alt={name} className="h-full w-full object-cover" />
          </div>
        )}
        <div className="gds-pad">
          <div className="truncate font-medium text-fg gds-text-body">{name}</div>
          <div className="mt-1 flex items-center gap-2">
            {size !== undefined && <span className="text-fg-muted gds-text-caption">{size}</span>}
            {type !== undefined && <Badge>{type}</Badge>}
          </div>
          {actions !== undefined && <div className="mt-2 flex gap-1">{actions}</div>}
        </div>
      </div>
    )
  },
)

export { FileCard }
export type { FileCardProps }
