import { ActivityFeed } from '@gds/l5-organisms'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt17: DevCenterItem[] = []

const activityFeedItem: DevCenterItem = {
  id: 'activity-feed',
  label: 'ActivityFeed',
  layer: 'l5',
  type: 'interactive',
  tags: ['activity', 'feed', 'log', 'timeline', 'events', 'organism'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { ActivityFeed } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-96">
          <ActivityFeed items={[
            { id: '1', user: 'Alice', action: 'created', target: 'Project Alpha', timestamp: '2 min ago' },
            { id: '2', user: 'Bob', action: 'commented on', target: 'Issue #42', timestamp: '5 min ago' },
            { id: '3', user: 'Carol', action: 'deployed to production', timestamp: '1 hour ago' },
            { id: '4', user: 'Dave', action: 'merged PR', target: '#128', timestamp: '3 hours ago' },
          ]} />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { ActivityFeed } from '@goliapkg/gds'\n\n<ActivityFeed items={[\n  { id: '1', user: 'Alice', action: 'created', target: 'Project Alpha', timestamp: '2 min ago' },\n  { id: '2', user: 'Bob', action: 'commented on', target: 'Issue #42', timestamp: '5 min ago' },\n]} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['items', 'Activity entries', '{ id, user, action, target?, timestamp, avatar? }[]', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt17.push(activityFeedItem)

export { organismItemsExt17 }
