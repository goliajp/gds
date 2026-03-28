import { NotificationList } from '@gds/l7-patterns'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt22: DevCenterItem[] = []

const sampleNotifications = [
  { id: '1', title: 'Deploy complete', message: 'v2.0 is now live on production', timestamp: '2 min ago' },
  { id: '2', title: 'New comment on PR #42', message: 'Alice left a review', timestamp: '10 min ago', read: true },
  { id: '3', title: 'Build failed', timestamp: '1 hour ago' },
]

const notificationListItem: DevCenterItem = {
  id: 'notification-list',
  label: 'NotificationList',
  layer: 'l7',
  type: 'interactive',
  tags: ['notification', 'list', 'bell', 'dropdown', 'pattern'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { NotificationList } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-80">
          <NotificationList
            notifications={sampleNotifications}
            onRead={(id) => alert(`Read: ${id}`)}
            onReadAll={() => alert('Mark all read')}
          />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { NotificationList } from '@goliapkg/gds'\n\n<NotificationList\n  notifications={[\n    { id: '1', title: 'Deploy complete', message: 'v2.0 live', timestamp: '2m ago' },\n  ]}\n  onRead={(id) => markRead(id)}\n  onReadAll={() => markAllRead()}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['notifications', 'Array of notification objects', 'NotificationEntry[]', '—'],
        ['onRead', 'Called when a notification is clicked', '(id: string) => void', '—'],
        ['onReadAll', 'Called when "Mark all read" is clicked', '() => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt22.push(notificationListItem)

export { patternItemsExt22 }
