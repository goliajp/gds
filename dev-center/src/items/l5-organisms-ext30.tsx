import { RecentActivity } from '@gds/l5-organisms'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt30: DevCenterItem[] = []

const sampleItems = [
  { user: 'Alice', action: 'pushed to main', timestamp: '2m ago' },
  { user: 'Bob', action: 'merged PR #42', timestamp: '10m ago' },
  { user: 'Carol', action: 'commented on issue #7', timestamp: '1h ago' },
]

const recentActivityItem: DevCenterItem = {
  id: 'recent-activity',
  label: 'RecentActivity',
  layer: 'l5',
  type: 'interactive',
  tags: ['activity', 'feed', 'recent', 'timeline', 'organism'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { RecentActivity } from '@golia/gds'" />
      <LivePreview>
        <div className="w-80">
          <RecentActivity items={sampleItems} />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { RecentActivity } from '@golia/gds'\n\n<RecentActivity\n  title="Recent Activity"\n  items={[\n    { user: 'Alice', action: 'pushed to main', timestamp: '2m ago' },\n    { user: 'Bob', action: 'merged PR #42', timestamp: '10m ago' },\n  ]}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['items', 'Activity entries', '{ user, action, timestamp }[]', '—'],
        ['title', 'Section title', 'string', "'Recent Activity'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt30.push(recentActivityItem)

export { organismItemsExt30 }
