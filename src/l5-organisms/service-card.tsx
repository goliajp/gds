// service-card — service/server status card with health, metrics, and tags
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type ServiceCardStatus = 'error' | 'healthy' | 'offline' | 'warning'

export type ServiceCardProps = {
  name: string
  description?: string
  status: ServiceCardStatus
  metrics?: { label: string; value: string }[]
  tags?: string[]
  url?: string
  className?: string
}

const statusDot: Record<ServiceCardStatus, string> = {
  healthy: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-danger',
  offline: 'bg-fg-muted/40',
}

const statusLabel: Record<ServiceCardStatus, string> = {
  healthy: 'Healthy',
  warning: 'Warning',
  error: 'Error',
  offline: 'Offline',
}

export const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  function ServiceCard({ name, description, status, metrics, tags, url, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx('gds-ctx gds-radius-card border border-border bg-surface gds-pad', className)}
        data-component="service-card"
        data-state={status}
      >
        {/* header */}
        <div className="flex items-center gap-2">
          <span className={cx('h-2.5 w-2.5 rounded-full', statusDot[status])} />
          <span className="font-semibold text-fg">{name}</span>
          <span className="ml-auto text-xs text-fg-muted">{statusLabel[status]}</span>
        </div>

        {description !== undefined && (
          <p className="mt-1.5 gds-text-body text-fg-muted">{description}</p>
        )}

        {/* metrics */}
        {metrics !== undefined && metrics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {metrics.map((m) => (
              <div key={m.label} className="flex gap-1">
                <span className="text-fg-muted">{m.label}</span>
                <span className="font-medium text-fg">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* tags + url */}
        {(tags !== undefined || url !== undefined) && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {tags?.map((tag) => (
              <span key={tag} className="rounded-full bg-bg-tertiary px-2 py-0.5 text-[10px] text-fg-muted">
                {tag}
              </span>
            ))}
            {url !== undefined && (
              <a href={url} target="_blank" rel="noreferrer" className="ml-auto text-xs text-accent hover:underline">
                {url}
              </a>
            )}
          </div>
        )}
      </div>
    )
  },
)
