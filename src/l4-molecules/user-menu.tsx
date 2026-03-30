// user-menu — avatar + name trigger with dropdown menu items
import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'

import { cx } from '../utils/cx'

type UserMenuItem = {
  id: string
  label: string
  icon?: ReactNode
  danger?: boolean
}

type UserMenuProps = {
  name: string
  avatar?: string
  role?: string
  items: UserMenuItem[]
  onSelect: (id: string) => void
  className?: string
}

const UserMenu = forwardRef<HTMLDivElement, UserMenuProps>(function UserMenu(
  { name, avatar, role, items, onSelect, className },
  ref
) {
  const [open, setOpen] = useState(false)
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      ref={ref}
      className={cx('relative', className)}
      data-component="user-menu"
    >
      <button
        type="button"
        className="hover:bg-bg-tertiary flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors select-none"
        onClick={() => setOpen((p) => !p)}
        data-testid="user-menu-trigger"
      >
        {avatar !== undefined ? (
          <img
            src={avatar}
            alt={name}
            className="h-7 w-7 rounded-full object-cover"
          />
        ) : (
          <div className="bg-accent/10 text-accent flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold">
            {initials}
          </div>
        )}
        <span className="text-fg text-sm font-medium">{name}</span>
      </button>
      {open && (
        <div
          className="border-border bg-surface animate-popup absolute top-full right-0 z-50 mt-1 min-w-[160px] rounded-lg border py-1 shadow-lg"
          data-testid="user-menu-dropdown"
        >
          {role !== undefined && (
            <div className="text-fg-muted px-3 py-1.5 text-xs">{role}</div>
          )}
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cx(
                'hover:bg-bg-tertiary flex w-full items-center gap-2 px-3 py-1.5 text-sm transition-colors select-none',
                item.danger === true ? 'text-danger' : 'text-fg'
              )}
              onClick={() => {
                onSelect(item.id)
                setOpen(false)
              }}
            >
              {item.icon !== undefined && (
                <span className="shrink-0">{item.icon}</span>
              )}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
})

export { UserMenu }
export type { UserMenuItem, UserMenuProps }
