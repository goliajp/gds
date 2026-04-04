import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import type { VariantProps } from '../utils/types'

const avatarVariants = cva(
  'relative inline-flex shrink-0 select-none items-center justify-center rounded-full font-medium',
  {
    defaultVariants: { size: 'default' },
    variants: {
      size: {
        default: 'h-8 w-8 text-xs',
        lg: 'h-10 w-10 text-sm',
        sm: 'h-6 w-6 text-[10px]',
        xs: 'h-5 w-5 text-[9px]',
      },
    },
  }
)

const paletteColors = [
  'bg-palette-0',
  'bg-palette-1',
  'bg-palette-2',
  'bg-palette-3',
  'bg-palette-4',
  'bg-palette-5',
  'bg-palette-6',
  'bg-palette-7',
  'bg-palette-8',
  'bg-palette-9',
]

const statusColors: Record<string, string> = {
  away: 'bg-warning',
  busy: 'bg-danger',
  offline: 'bg-fg-muted/30',
  online: 'bg-success',
}

const statusSizeMap: Record<string, string> = {
  default: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  sm: 'h-2 w-2',
  xs: 'h-1.5 w-1.5',
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function hashName(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

type AvatarStatus = 'away' | 'busy' | 'offline' | 'online'

type AvatarProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof avatarVariants> & {
    /** Enable frosted glass translucency effect */
    glass?: boolean
    /** Show pulse skeleton placeholder */
    loading?: boolean
    /** Display name — used for initials and color hashing */
    name?: string
    /** Image URL; falls back to initials when absent */
    src?: string
    /** Presence indicator dot in bottom-right corner */
    status?: AvatarStatus
  }

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { className, glass, loading, name, size = 'default', src, status, ...props },
  ref
) {
  const sizeKey = size ?? 'default'
  const colorIdx = name !== undefined ? hashName(name) % 10 : 0

  return (
    <span
      className={cx(
        avatarVariants({ size }),
        src === undefined && paletteColors[colorIdx],
        src === undefined && 'text-accent-fg',
        glassClass(glass),
        className
      )}
      data-component="avatar"
      ref={ref}
      {...props}
    >
      {loading === true ? (
        <span className="bg-fg-muted/20 absolute inset-0 animate-pulse rounded-full" />
      ) : src !== undefined ? (
        <img
          alt={name ?? ''}
          className="absolute inset-0 h-full w-full rounded-full object-cover"
          src={src}
        />
      ) : (
        <span>{name !== undefined ? getInitials(name) : '?'}</span>
      )}
      {status !== undefined && (
        <span
          className={cx(
            'ring-bg absolute right-0 bottom-0 rounded-full ring-2',
            statusSizeMap[sizeKey],
            statusColors[status]
          )}
        />
      )}
    </span>
  )
})

type AvatarGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  max?: number
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup({ children, className, max, ...props }, ref) {
    const items = Array.isArray(children) ? children : [children]
    const visible = max !== undefined ? items.slice(0, max) : items
    const overflow = max !== undefined ? items.length - max : 0

    return (
      <div
        className={cx('flex -space-x-2', className)}
        data-component="avatar-group"
        ref={ref}
        {...props}
      >
        {visible}
        {overflow > 0 && (
          <span className="gds-sq bg-bg-tertiary gds-text-body text-fg-muted ring-bg inline-flex items-center justify-center rounded-full font-medium ring-2">
            +{overflow}
          </span>
        )}
      </div>
    )
  }
)

export { avatarVariants }
export type { AvatarGroupProps, AvatarProps, AvatarStatus }
