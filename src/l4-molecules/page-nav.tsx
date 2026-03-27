// page-nav — previous/next page navigation
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type PageNavLink = {
  href?: string
  label: string
  onClick?: () => void
}

type PageNavProps = React.HTMLAttributes<HTMLElement> & {
  next?: PageNavLink
  prev?: PageNavLink
}

const linkCls = cx(
  'flex items-center gap-1.5 gds-radius-button gds-pad-x gds-pad-y gds-text-body text-fg-muted hover:text-fg transition-colors',
  focusCls,
)

export const PageNav = forwardRef<HTMLElement, PageNavProps>(
  function PageNav({ prev, next, className, ...props }, ref) {
    return (
      <nav
        ref={ref}
        className={cx('flex w-full items-center justify-between', className)}
        data-component="page-nav"
        {...props}
      >
        <div>
          {prev !== undefined && (
            <a href={prev.href} onClick={prev.onClick} className={linkCls}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 3L5 7l4 4" />
              </svg>
              {prev.label}
            </a>
          )}
        </div>
        <div>
          {next !== undefined && (
            <a href={next.href} onClick={next.onClick} className={linkCls}>
              {next.label}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3l4 4-4 4" />
              </svg>
            </a>
          )}
        </div>
      </nav>
    )
  },
)

export type { PageNavLink, PageNavProps }
