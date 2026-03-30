import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type ContactCardProps = React.HTMLAttributes<HTMLDivElement> & {
  actions?: ReactNode
  avatar?: string
  email?: string
  name: string
  phone?: string
  role?: string
}

export const ContactCard = forwardRef<HTMLDivElement, ContactCardProps>(
  function ContactCard(
    { actions, avatar, className, email, name, phone, role, ...props },
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
          'gds-ctx gds-radius-card border-border bg-surface gds-pad border text-center',
          className
        )}
        data-component="contact-card"
        ref={ref}
        {...props}
      >
        {avatar !== undefined ? (
          <img
            src={avatar}
            alt={name}
            className="mx-auto h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="bg-accent/10 text-accent mx-auto flex h-14 w-14 items-center justify-center rounded-full text-sm font-semibold">
            {initials}
          </div>
        )}
        <div className="text-fg mt-3 font-semibold">{name}</div>
        {role !== undefined && (
          <div className="text-fg-muted mt-0.5 text-xs">{role}</div>
        )}
        {email !== undefined && (
          <div className="text-fg-muted mt-2 text-xs">{email}</div>
        )}
        {phone !== undefined && (
          <div className="text-fg-muted mt-0.5 text-xs">{phone}</div>
        )}
        {actions !== undefined && (
          <div className="mt-3 flex justify-center gap-2">{actions}</div>
        )}
      </div>
    )
  }
)

export type { ContactCardProps }
