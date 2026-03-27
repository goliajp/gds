import { forwardRef } from 'react'

import { Badge } from '../l2-primitives/badge'
import { cx } from '../utils/cx'
import type { AvatarProps } from './avatar'
import { Avatar } from './avatar'

type AvatarBadgeProps = AvatarProps & {
  count?: number
  maxCount?: number
}

export const AvatarBadge = forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  function AvatarBadge({ count, maxCount = 99, className, ...avatarProps }, ref) {
    const showBadge = count !== undefined && count > 0

    return (
      <span className={cx('relative inline-flex', className)} data-component="avatar-badge" ref={ref}>
        <Avatar {...avatarProps} />
        {showBadge && (
          <Badge
            className="absolute -top-1 -right-1 z-10"
            count={count}
            countMax={maxCount}
          />
        )}
      </span>
    )
  },
)

export type { AvatarBadgeProps }
