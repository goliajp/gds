// timeline — vertical event timeline with variant-colored nodes
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type TimelineItem = {
  id: string
  title: string
  description?: string
  date?: string
  icon?: ReactNode
  variant?: 'danger' | 'default' | 'success' | 'warning'
}

export type TimelineProps = {
  items: TimelineItem[]
  orientation?: 'vertical'
  className?: string
}

const dotColors: Record<string, string> = {
  default: 'bg-fg-muted',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
}

// composition sub-components

export type TimelineGroupProps = {
  children: ReactNode
  className?: string
  label: string
}

export function TimelineGroup({
  children,
  className,
  label,
}: TimelineGroupProps) {
  return (
    <div className={cx('', className)}>
      <div className="text-fg-muted mb-2 pl-6 text-xs font-semibold">
        {label}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}

export type TimelineItemComponentProps = {
  children?: ReactNode
  className?: string
  description?: ReactNode
  icon?: ReactNode
  status?: 'danger' | 'default' | 'success' | 'warning'
  timestamp?: string
  title: ReactNode
}

export function TimelineItemComponent({
  children,
  className,
  description,
  icon,
  status = 'default',
  timestamp,
  title,
}: TimelineItemComponentProps) {
  return (
    <div className={cx('gds-gap relative flex pl-6', className)}>
      <div className="absolute top-1.5 left-0">
        {icon !== undefined ? (
          <span className="text-fg-muted flex h-[15px] w-[15px] items-center justify-center">
            {icon}
          </span>
        ) : (
          <span
            className={cx(
              'gds-radius-badge border-bg block h-[15px] w-[15px] border-2',
              dotColors[status]
            )}
          />
        )}
      </div>
      <div className="min-w-0 flex-1 pb-1">
        <div className="gds-gap-sm flex items-baseline justify-between">
          <span className="text-fg text-sm font-medium">{title}</span>
          {timestamp !== undefined && (
            <span className="gds-text-body text-fg-muted shrink-0">
              {timestamp}
            </span>
          )}
        </div>
        {description !== undefined && (
          <p className="gds-text-body text-fg-muted mt-0.5">{description}</p>
        )}
        {children}
      </div>
    </div>
  )
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  function Timeline({ items, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx('relative', className)}
        data-component="timeline"
      >
        {/* vertical line */}
        <div className="bg-border absolute top-2 bottom-2 left-[7px] w-px" />

        <div className="flex flex-col gap-4">
          {items.map((item) => {
            const variant = item.variant ?? 'default'
            return (
              <div key={item.id} className="gds-gap relative flex pl-6">
                {/* dot */}
                <div className="absolute top-1.5 left-0">
                  {item.icon !== undefined ? (
                    <span className="text-fg-muted flex h-[15px] w-[15px] items-center justify-center">
                      {item.icon}
                    </span>
                  ) : (
                    <span
                      className={cx(
                        'gds-radius-badge border-bg block h-[15px] w-[15px] border-2',
                        dotColors[variant]
                      )}
                    />
                  )}
                </div>

                {/* content */}
                <div className="min-w-0 flex-1 pb-1">
                  <div className="gds-gap-sm flex items-baseline justify-between">
                    <span className="text-fg text-sm font-medium">
                      {item.title}
                    </span>
                    {item.date !== undefined && (
                      <span className="gds-text-body text-fg-muted shrink-0">
                        {item.date}
                      </span>
                    )}
                  </div>
                  {item.description !== undefined && (
                    <p className="gds-text-body text-fg-muted mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
