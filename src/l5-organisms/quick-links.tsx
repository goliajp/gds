import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type QuickLink = {
  href?: string
  icon?: ReactNode
  label: string
  onClick?: () => void
}

type QuickLinksProps = React.HTMLAttributes<HTMLDivElement> & {
  columns?: number
  links: QuickLink[]
}

export const QuickLinks = forwardRef<HTMLDivElement, QuickLinksProps>(
  function QuickLinks({ className, columns = 4, links, ...props }, ref) {
    return (
      <div
        className={cx('grid gap-3', className)}
        data-component="quick-links"
        ref={ref}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        {...props}
      >
        {links.map((link) => {
          const Tag = link.href !== undefined ? 'a' : 'button'
          return (
            <Tag
              key={link.label}
              className={cx(
                'border-border bg-surface text-fg hover:bg-bg-secondary flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors',
                focusCls
              )}
              {...(link.href !== undefined ? { href: link.href } : {})}
              onClick={link.onClick}
            >
              {link.icon !== undefined && (
                <div className="text-fg-muted">{link.icon}</div>
              )}
              <span className="text-xs font-medium select-none">
                {link.label}
              </span>
            </Tag>
          )
        })}
      </div>
    )
  }
)

export type { QuickLink, QuickLinksProps }
