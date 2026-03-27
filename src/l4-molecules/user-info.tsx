import { forwardRef } from 'react'

import { Avatar } from '../l3-atoms/avatar'
import { cx } from '../utils/cx'

type UserInfoSize = 'sm' | 'default'

type UserInfoProps = React.HTMLAttributes<HTMLDivElement> & {
  avatar?: string
  name: string
  role?: string
  size?: UserInfoSize
}

export const UserInfo = forwardRef<HTMLDivElement, UserInfoProps>(
  function UserInfo({ avatar, className, name, role, size = 'default', ...props }, ref) {
    const avatarSize = size === 'sm' ? 'sm' : 'default'
    const textCls = size === 'sm' ? 'text-xs' : 'text-sm'

    return (
      <div
        className={cx('inline-flex items-center gap-2 select-none', className)}
        data-component="user-info"
        ref={ref}
        {...props}
      >
        <Avatar name={name} size={avatarSize} src={avatar} />
        <div className="flex flex-col">
          <span className={cx('font-medium text-fg leading-tight', textCls)}>{name}</span>
          {role !== undefined && (
            <span className={cx('text-fg-muted leading-tight', size === 'sm' ? 'text-[10px]' : 'text-xs')}>{role}</span>
          )}
        </div>
      </div>
    )
  },
)

export type { UserInfoProps, UserInfoSize }
