import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type EmployeeStatus = 'active' | 'inactive' | 'onboarding'

type EmployeeCardProps = React.HTMLAttributes<HTMLDivElement> & {
  avatar?: string
  department?: string
  email?: string
  name: string
  phone?: string
  role?: string
  status?: EmployeeStatus
}

const statusCls: Record<EmployeeStatus, string> = {
  active: 'bg-success/15 text-success',
  inactive: 'bg-danger/15 text-danger',
  onboarding: 'bg-warning/15 text-warning',
}

export const EmployeeCard = forwardRef<HTMLDivElement, EmployeeCardProps>(
  function EmployeeCard(
    {
      avatar,
      className,
      department,
      email,
      name,
      phone,
      role,
      status,
      ...props
    },
    ref
  ) {
    const initials = name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

    return (
      <div
        className={cx(
          'gds-ctx gds-radius-card border-border bg-surface gds-pad border',
          className
        )}
        data-component="employee-card"
        ref={ref}
        {...props}
      >
        <div className="gds-gap flex items-center">
          {avatar !== undefined ? (
            <img
              src={avatar}
              alt={name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="bg-accent/10 text-accent flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold">
              {initials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="text-fg truncate font-semibold">{name}</div>
            {role !== undefined && (
              <div className="text-fg-muted truncate text-xs">{role}</div>
            )}
            {department !== undefined && (
              <div className="text-fg-muted truncate text-xs">{department}</div>
            )}
          </div>
          {status !== undefined && (
            <span
              className={cx(
                'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium',
                statusCls[status]
              )}
            >
              {status}
            </span>
          )}
        </div>
        {(email !== undefined || phone !== undefined) && (
          <div className="text-fg-muted mt-3 space-y-0.5 text-xs">
            {email !== undefined && <div>{email}</div>}
            {phone !== undefined && <div>{phone}</div>}
          </div>
        )}
      </div>
    )
  }
)

export type { EmployeeCardProps, EmployeeStatus }
