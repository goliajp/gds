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

export function TimelineGroup({ children, className, label }: TimelineGroupProps) {
  return (
    <div className={cx('', className)}>
      <div className="mb-2 pl-6 text-xs font-semibold text-fg-muted">{label}</div>
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
    <div className={cx('relative flex gds-gap pl-6', className)}>
      <div className="absolute left-0 top-1.5">
        {icon !== undefined ? (
          <span className="flex h-[15px] w-[15px] items-center justify-center text-fg-muted">{icon}</span>
        ) : (
          <span className={cx('block h-[15px] w-[15px] gds-radius-badge border-2 border-bg', dotColors[status])} />
        )}
      </div>
      <div className="min-w-0 flex-1 pb-1">
        <div className="flex items-baseline justify-between gds-gap-sm">
          <span className="text-sm font-medium text-fg">{title}</span>
          {timestamp !== undefined && <span className="shrink-0 gds-text-body text-fg-muted">{timestamp}</span>}
        </div>
        {description !== undefined && <p className="mt-0.5 gds-text-body text-fg-muted">{description}</p>}
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
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

        <div className="flex flex-col gap-4">
          {items.map((item) => {
            const variant = item.variant ?? 'default'
            return (
              <div key={item.id} className="relative flex gds-gap pl-6">
                {/* dot */}
                <div className="absolute left-0 top-1.5">
                  {item.icon !== undefined ? (
                    <span className="flex h-[15px] w-[15px] items-center justify-center text-fg-muted">
                      {item.icon}
                    </span>
                  ) : (
                    <span className={cx(
                      'block h-[15px] w-[15px] gds-radius-badge border-2 border-bg',
                      dotColors[variant],
                    )} />
                  )}
                </div>

                {/* content */}
                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex items-baseline justify-between gds-gap-sm">
                    <span className="text-sm font-medium text-fg">{item.title}</span>
                    {item.date !== undefined && (
                      <span className="shrink-0 gds-text-body text-fg-muted">{item.date}</span>
                    )}
                  </div>
                  {item.description !== undefined && (
                    <p className="mt-0.5 gds-text-body text-fg-muted">{item.description}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
)
