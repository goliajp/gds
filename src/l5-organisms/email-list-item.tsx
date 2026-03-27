// email-list-item — inbox list entry with sender, subject, preview, timestamp
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type EmailListItemProps = {
  sender: string
  senderAvatar?: string
  subject: string
  preview?: string
  timestamp: string
  unread?: boolean
  starred?: boolean
  selected?: boolean
  onClick?: () => void
  className?: string
}

export const EmailListItem = forwardRef<HTMLDivElement, EmailListItemProps>(
  function EmailListItem({ sender, senderAvatar, subject, preview, timestamp, unread, starred, selected, onClick, className }, ref) {
    const isUnread = unread === true
    const avatarText = senderAvatar ?? sender.charAt(0).toUpperCase()

    return (
      <div
        ref={ref}
        role={onClick !== undefined ? 'button' : undefined}
        tabIndex={onClick !== undefined ? 0 : undefined}
        onClick={onClick}
        onKeyDown={onClick !== undefined ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        } : undefined}
        className={cx(
          'flex items-start gap-3 gds-pad-x gds-pad-y-sm gds-text-body select-none',
          onClick !== undefined && 'cursor-pointer hover:bg-bg-tertiary',
          selected === true && 'bg-accent/5',
          className,
        )}
        data-component="email-list-item"
        data-state={isUnread ? 'unread' : 'read'}
      >
        {/* avatar */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-tertiary text-xs font-semibold text-fg-muted">
          {avatarText}
        </div>

        {/* body */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {isUnread && <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />}
            <span className={cx('truncate', isUnread ? 'font-semibold text-fg' : 'text-fg')}>{sender}</span>
            {starred === true && <span className="shrink-0 text-warning">★</span>}
          </div>
          <div className={cx('truncate', isUnread ? 'font-medium text-fg' : 'text-fg-muted')}>{subject}</div>
          {preview !== undefined && (
            <div className="truncate text-fg-muted/60">{preview}</div>
          )}
        </div>

        {/* timestamp */}
        <span className="shrink-0 text-xs text-fg-muted">{timestamp}</span>
      </div>
    )
  },
)
