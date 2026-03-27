import { forwardRef } from 'react'

import { Avatar } from '../l3-atoms/avatar'
import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type AvatarListUser = {
  name: string
  role?: string
  src?: string
  status?: 'away' | 'busy' | 'offline' | 'online'
}

type AvatarListProps = React.HTMLAttributes<HTMLDivElement> & {
  users: AvatarListUser[]
  onSelect?: (name: string) => void
  compact?: boolean
  glass?: boolean
  className?: string
}

export const AvatarList = forwardRef<HTMLDivElement, AvatarListProps>(
  function AvatarList({ users, onSelect, compact = false, glass, className, ...props }, ref) {
    return (
      <div
        className={cx(
          'gds-radius-popover overflow-hidden border border-border',
          glassClass(glass),
          className,
        )}
        data-component="avatar-list"
        ref={ref}
        {...props}
      >
        {users.map((user) => {
          const content = (
            <>
              <Avatar name={user.name} src={user.src} status={user.status} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="truncate gds-text-body font-medium text-fg">{user.name}</div>
                {compact !== true && user.role !== undefined && (
                  <div className="truncate gds-text-caption text-fg-muted">{user.role}</div>
                )}
              </div>
            </>
          )

          const rowCls = cx(
            'flex items-center gds-gap gds-pad-x gds-pad-y',
            'border-b border-border last:border-b-0',
            onSelect !== undefined && `cursor-pointer transition-colors hover:bg-bg-tertiary/30 ${focusCls}`,
          )

          if (onSelect !== undefined) {
            return (
              <button
                key={user.name}
                type="button"
                className={cx(rowCls, 'w-full text-left')}
                onClick={() => onSelect(user.name)}
              >
                {content}
              </button>
            )
          }

          return (
            <div key={user.name} className={rowCls}>
              {content}
            </div>
          )
        })}
      </div>
    )
  },
)

export type { AvatarListProps, AvatarListUser }
