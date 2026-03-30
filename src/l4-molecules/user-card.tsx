// user-card — compact user display with avatar, name, role, and contact info
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type UserCardStatus = 'away' | 'busy' | 'offline' | 'online'

const statusColors: Record<UserCardStatus, string> = {
  away: 'bg-warning',
  busy: 'bg-danger',
  offline: 'bg-fg-muted/40',
  online: 'bg-success',
}

export type UserCardProps = {
  name: string
  avatar?: string
  role?: string
  department?: string
  email?: string
  status?: UserCardStatus
  glass?: boolean
  className?: string
  children?: ReactNode
}

export const UserCard = forwardRef<HTMLDivElement, UserCardProps>(
  function UserCard(
    {
      name,
      avatar,
      role,
      department,
      email,
      status,
      glass,
      className,
      children,
    },
    ref
  ) {
    const initials = (name ?? '')
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

    return (
      <div
        ref={ref}
        className={cx(
          'gds-gap gds-radius border-border bg-surface gds-pad inline-flex items-center border select-none',
          glass === true && glassClass(glass),
          className
        )}
        data-component="user-card"
      >
        {/* avatar */}
        <div className="relative">
          {avatar !== undefined ? (
            <img
              src={avatar}
              alt={name}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <div className="bg-accent/15 text-accent flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium">
              {initials}
            </div>
          )}
          {status !== undefined && (
            <span
              className={cx(
                'border-surface absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2',
                statusColors[status]
              )}
            />
          )}
        </div>

        {/* info */}
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-fg truncate text-sm font-medium">{name}</span>
          {(role !== undefined || department !== undefined) && (
            <span className="gds-text-body text-fg-muted flex items-center gap-1">
              {role !== undefined && <span>{role}</span>}
              {role !== undefined && department !== undefined && (
                <span className="text-fg-muted/40">/</span>
              )}
              {department !== undefined && <span>{department}</span>}
            </span>
          )}
          {email !== undefined && (
            <span className="gds-text-body text-fg-muted/60 flex items-center gap-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
                <path d="M2 5l6 4 6-4" />
              </svg>
              <span className="truncate">{email}</span>
            </span>
          )}
        </div>

        {children}
      </div>
    )
  }
)

export type { UserCardStatus }
