import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type CertBadgeStatus = 'expired' | 'expiring' | 'valid'

type CertBadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  domain: string
  expiresAt: string
  status: CertBadgeStatus
}

const statusCls: Record<CertBadgeStatus, string> = {
  valid: 'bg-success/15 text-success border-success/20',
  expiring: 'bg-warning/15 text-warning border-warning/20',
  expired: 'bg-danger/15 text-danger border-danger/20',
}

const statusIcon: Record<CertBadgeStatus, string> = {
  valid: '🔒',
  expiring: '⚠️',
  expired: '❌',
}

export const CertBadge = forwardRef<HTMLDivElement, CertBadgeProps>(
  function CertBadge({ className, domain, expiresAt, status, ...props }, ref) {
    return (
      <div
        className={cx('inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5', statusCls[status], className)}
        data-component="cert-badge"
        ref={ref}
        {...props}
      >
        <span className="text-xs">{statusIcon[status]}</span>
        <span className="gds-text-label font-medium">{domain}</span>
        <span className="gds-text-label opacity-70">{expiresAt}</span>
      </div>
    )
  },
)

export type { CertBadgeProps, CertBadgeStatus }
