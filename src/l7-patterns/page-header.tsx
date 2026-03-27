// page-header — standard page header with title, breadcrumb, and actions
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type PageHeaderBreadcrumbItem = {
  href?: string
  label: string
}

type PageHeaderProps = {
  actions?: ReactNode
  breadcrumb?: PageHeaderBreadcrumbItem[]
  className?: string
  subtitle?: string
  title: string
}

const separator = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M4.5 3l3 3-3 3" />
  </svg>
)

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  function PageHeader({ actions, breadcrumb, className, subtitle, title }, ref) {
    return (
      <div ref={ref} className={cx('flex flex-col gds-gap-sm', className)} data-component="page-header">
        {breadcrumb !== undefined && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gds-gap-sm text-[11px] text-fg-muted">
              {breadcrumb.map((item, i) => (
                <li key={i} className="flex items-center gds-gap-sm">
                  {i > 0 && <span className="text-fg-muted/50" aria-hidden="true">{separator}</span>}
                  {item.href !== undefined ? (
                    <a href={item.href} className="transition-colors hover:text-fg">{item.label}</a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="flex items-center justify-between gds-gap">
          <div className="min-w-0">
            <h1 className="gds-heading font-semibold text-fg">{title}</h1>
            {subtitle !== undefined && (
              <p className="mt-0.5 gds-text-body text-fg-muted">{subtitle}</p>
            )}
          </div>
          {actions !== undefined && (
            <div className="flex shrink-0 items-center gds-gap-sm">{actions}</div>
          )}
        </div>
      </div>
    )
  },
)

export type { PageHeaderBreadcrumbItem, PageHeaderProps }
