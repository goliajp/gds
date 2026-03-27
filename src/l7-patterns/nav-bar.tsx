// nav-bar — top navigation bar with logo, links, and actions
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type NavLink = {
  label: string
  href: string
  active?: boolean
}

export type NavBarProps = {
  logo?: ReactNode
  links?: NavLink[]
  actions?: ReactNode
  sticky?: boolean
  glass?: boolean
  className?: string
}

export const NavBar = forwardRef<HTMLElement, NavBarProps>(
  function NavBar({ logo, links, actions, sticky = true, glass = true, className }, ref) {
    return (
      <nav
        ref={ref}
        className={cx(
          'flex w-full items-center justify-between px-6 py-3',
          sticky && 'sticky top-0 z-40',
          glass && glassClass(true),
          className,
        )}
        data-component="nav-bar"
      >
        {logo !== undefined && <div className="flex-shrink-0">{logo}</div>}
        {links !== undefined && links.length > 0 && (
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cx('text-sm transition-colors', link.active ? 'text-accent font-medium' : 'text-fg-muted hover:text-fg')}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
        {actions !== undefined && <div className="flex items-center gap-3">{actions}</div>}
      </nav>
    )
  },
)
