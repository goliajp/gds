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
  function EmailListItem(
    {
      sender,
      senderAvatar,
      subject,
      preview,
      timestamp,
      unread,
      starred,
      selected,
      onClick,
      className,
    },
    ref
  ) {
    const isUnread = unread === true
    const avatarText = senderAvatar ?? sender.charAt(0).toUpperCase()

    return (
      <div
        ref={ref}
        role={onClick !== undefined ? 'button' : undefined}
        tabIndex={onClick !== undefined ? 0 : undefined}
        onClick={onClick}
        onKeyDown={
          onClick !== undefined
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onClick()
                }
              }
            : undefined
        }
        className={cx(
          'gds-pad-x gds-pad-y-sm gds-text-body flex items-start gap-3 select-none',
          onClick !== undefined && 'hover:bg-bg-tertiary cursor-pointer',
          selected === true && 'bg-accent/5',
          className
        )}
        data-component="email-list-item"
        data-state={isUnread ? 'unread' : 'read'}
      >
        {/* avatar */}
        <div className="bg-bg-tertiary text-fg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
          {avatarText}
        </div>

        {/* body */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {isUnread && (
              <span className="bg-accent h-2 w-2 shrink-0 rounded-full" />
            )}
            <span
              className={cx(
                'truncate',
                isUnread ? 'text-fg font-semibold' : 'text-fg'
              )}
            >
              {sender}
            </span>
            {starred === true && (
              <span className="text-warning shrink-0">★</span>
            )}
          </div>
          <div
            className={cx(
              'truncate',
              isUnread ? 'text-fg font-medium' : 'text-fg-muted'
            )}
          >
            {subject}
          </div>
          {preview !== undefined && (
            <div className="text-fg-muted/60 truncate">{preview}</div>
          )}
        </div>

        {/* timestamp */}
        <span className="text-fg-muted shrink-0 text-xs">{timestamp}</span>
      </div>
    )
  }
)
