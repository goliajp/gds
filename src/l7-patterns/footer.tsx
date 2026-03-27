// footer — site footer with link columns and copyright
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type FooterColumn = {
  title: string
  links: { label: string; href: string }[]
}

export type FooterProps = {
  columns?: FooterColumn[]
  copyright?: string
  logo?: ReactNode
  glass?: boolean
  className?: string
}

export const Footer = forwardRef<HTMLElement, FooterProps>(
  function Footer({ columns, copyright, logo, glass, className }, ref) {
    return (
      <footer
        ref={ref}
        className={cx(
          'w-full py-10',
          glass && glassClass(true),
          className,
        )}
        data-component="footer"
      >
        {columns !== undefined && columns.length > 0 && (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-fg">{col.title}</h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-sm text-fg-muted hover:text-fg">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <div className={cx('flex items-center gap-3 border-t border-border pt-6', columns !== undefined && columns.length > 0 && 'mt-8')}>
          {logo !== undefined && <div>{logo}</div>}
          {copyright !== undefined && (
            <p className="text-xs text-fg-muted">{copyright}</p>
          )}
        </div>
      </footer>
    )
  },
)
