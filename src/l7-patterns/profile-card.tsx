// profile-card — user profile card with avatar, name, role, stats, actions
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { Avatar } from '../l3-atoms/avatar'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type ProfileStat = {
  label: string
  value: string
}

export type ProfileCardProps = {
  actions?: ReactNode
  avatar?: string
  className?: string
  glass?: boolean
  name: string
  role?: string
  stats?: ProfileStat[]
}

export const ProfileCard = forwardRef<HTMLDivElement, ProfileCardProps>(
  function ProfileCard({ actions, avatar, className, glass, name, role, stats }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-ctx flex flex-col items-center gds-pad gds-radius-card border',
          glass === true
            ? cx(glassClass(glass), 'border-white/10 bg-bg/60')
            : 'border-border bg-surface',
          className,
        )}
        data-component="profile-card"
      >
        <Avatar name={name} src={avatar} size="lg" />
        <p className="mt-3 text-sm font-semibold text-fg">{name}</p>
        {role !== undefined && (
          <p className="mt-0.5 text-xs text-fg-muted">{role}</p>
        )}
        {stats !== undefined && stats.length > 0 && (
          <div className="mt-3 flex w-full justify-center gds-gap">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-sm font-bold text-fg">{stat.value}</span>
                <span className="text-[10px] text-fg-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
        {actions !== undefined && (
          <div className="mt-3 flex w-full justify-center gds-gap">{actions}</div>
        )}
      </div>
    )
  },
)
