// breadcrumb — navigation trail with collapsible items
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type BreadcrumbItem = {
  label: string
  href?: string
  icon?: ReactNode
}

export type BreadcrumbProps = {
  items: BreadcrumbItem[]
  separator?: ReactNode
  maxItems?: number
  className?: string
}

const defaultSeparator = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M4.5 3l3 3-3 3" />
  </svg>
)

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb({ items, separator = defaultSeparator, maxItems, className }, ref) {
    let visibleItems = items

    if (maxItems !== undefined && items.length > maxItems && maxItems >= 2) {
      const first = items[0]
      const last = items[items.length - 1]
      const ellipsis: BreadcrumbItem = { label: '...' }
      visibleItems = [first, ellipsis, last]
    }

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={cx(className)} data-component="breadcrumb">
        <ol className="flex items-center gds-gap-sm gds-text-body text-fg-muted">
          {visibleItems.map((item, i) => (
            <li key={`${item.label}-${i}`} className="flex items-center gds-gap-sm">
              {i > 0 && (
                <span className="text-fg-muted/50" aria-hidden="true">{separator}</span>
              )}
              {item.icon !== undefined && <span className="shrink-0">{item.icon}</span>}
              {item.href !== undefined ? (
                <a
                  href={item.href}
                  className="transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              ) : (
                <span className={cx(i === visibleItems.length - 1 && 'text-fg')}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    )
  },
)
