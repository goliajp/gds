import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type ProjectDashboardProps = {
  activity?: ReactNode
  className?: string
  progress?: ReactNode
  tasks?: ReactNode
  team?: ReactNode
}

const ProjectDashboard = forwardRef<HTMLDivElement, ProjectDashboardProps>(
  function ProjectDashboard(
    { activity, className, progress, tasks, team },
    ref
  ) {
    return (
      <div
        className={cx('gds-gap grid grid-cols-2', className)}
        data-component="project-dashboard"
        ref={ref}
      >
        {progress !== undefined && (
          <section data-slot="progress">{progress}</section>
        )}
        {team !== undefined && <section data-slot="team">{team}</section>}
        {activity !== undefined && (
          <section data-slot="activity">{activity}</section>
        )}
        {tasks !== undefined && <section data-slot="tasks">{tasks}</section>}
      </div>
    )
  }
)

export { ProjectDashboard }
export type { ProjectDashboardProps }
