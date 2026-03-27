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
  function EmployeeCard({ avatar, className, department, email, name, phone, role, status, ...props }, ref) {
    const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

    return (
      <div
        className={cx('gds-ctx gds-radius-card border border-border bg-surface gds-pad', className)}
        data-component="employee-card"
        ref={ref}
        {...props}
      >
        <div className="flex items-center gds-gap">
          {avatar !== undefined ? (
            <img src={avatar} alt={name} className="h-12 w-12 rounded-full object-cover" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
              {initials}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-fg truncate">{name}</div>
            {role !== undefined && <div className="text-xs text-fg-muted truncate">{role}</div>}
            {department !== undefined && <div className="text-xs text-fg-muted truncate">{department}</div>}
          </div>
          {status !== undefined && (
            <span className={cx('shrink-0 rounded-full px-2 py-0.5 text-xs font-medium', statusCls[status])}>
              {status}
            </span>
          )}
        </div>
        {(email !== undefined || phone !== undefined) && (
          <div className="mt-3 space-y-0.5 text-xs text-fg-muted">
            {email !== undefined && <div>{email}</div>}
            {phone !== undefined && <div>{phone}</div>}
          </div>
        )}
      </div>
    )
  },
)

export type { EmployeeCardProps, EmployeeStatus }
