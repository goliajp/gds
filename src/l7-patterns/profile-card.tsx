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
  function ProfileCard(
    { actions, avatar, className, glass, name, role, stats },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-ctx gds-pad gds-radius-card flex flex-col items-center border',
          glass === true
            ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
            : 'border-border bg-surface',
          className
        )}
        data-component="profile-card"
      >
        <Avatar name={name} src={avatar} size="lg" />
        <p className="text-fg mt-3 text-sm font-semibold">{name}</p>
        {role !== undefined && (
          <p className="text-fg-muted mt-0.5 text-xs">{role}</p>
        )}
        {stats !== undefined && stats.length > 0 && (
          <div className="gds-gap mt-3 flex w-full justify-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-fg text-sm font-bold">{stat.value}</span>
                <span className="text-fg-muted text-[10px]">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
        {actions !== undefined && (
          <div className="gds-gap mt-3 flex w-full justify-center">
            {actions}
          </div>
        )}
      </div>
    )
  }
)
