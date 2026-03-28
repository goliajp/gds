import { ProjectDashboard } from '@gds/l7-patterns'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt28: DevCenterItem[] = []

const projectDashboardItem: DevCenterItem = {
  id: 'project-dashboard',
  label: 'ProjectDashboard',
  layer: 'l7',
  type: 'interactive',
  tags: ['project', 'dashboard', 'layout', 'overview', 'pattern'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { ProjectDashboard } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-full">
          <ProjectDashboard
            progress={
              <div className="rounded-lg border border-border bg-surface p-3">
                <div className="text-xs text-fg-muted">Progress</div>
                <div className="mt-1 h-2 rounded-full bg-surface"><div className="h-2 w-3/4 rounded-full bg-success" /></div>
                <div className="mt-1 text-xs text-fg-muted">75% complete</div>
              </div>
            }
            team={
              <div className="rounded-lg border border-border bg-surface p-3">
                <div className="text-xs text-fg-muted">Team</div>
                <div className="mt-1 text-sm text-fg">4 members</div>
              </div>
            }
            activity={
              <div className="rounded-lg border border-border bg-surface p-3">
                <div className="text-xs text-fg-muted">Recent Activity</div>
                <div className="mt-1 text-sm text-fg">3 updates today</div>
              </div>
            }
            tasks={
              <div className="rounded-lg border border-border bg-surface p-3">
                <div className="text-xs text-fg-muted">Tasks</div>
                <div className="mt-1 text-sm text-fg">12 open, 8 done</div>
              </div>
            }
          />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { ProjectDashboard } from '@goliapkg/gds'\n\n<ProjectDashboard\n  progress={<ProgressBar value={75} />}\n  team={<AvatarList users={team} />}\n  activity={<ActivityFeed items={events} />}\n  tasks={<TaskBoard sections={sections} />}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['progress', 'Progress section (top-left)', 'ReactNode', '—'],
        ['team', 'Team section (top-right)', 'ReactNode', '—'],
        ['activity', 'Activity section (bottom-left)', 'ReactNode', '—'],
        ['tasks', 'Tasks section (bottom-right)', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt28.push(projectDashboardItem)

export { patternItemsExt28 }
