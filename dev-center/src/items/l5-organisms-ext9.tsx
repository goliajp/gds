import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { NotificationCenter } from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

const organismItemsExt9: DevCenterItem[] = []

const defaultNotifications = [
  { id: '1', title: 'Build succeeded', message: 'Deploy v1.2.3 complete', variant: 'success' as const },
  { id: '2', title: 'Disk usage warning', message: '85% capacity reached', variant: 'warning' as const },
  { id: '3', title: 'New comment', message: 'Alice replied to your PR', variant: 'info' as const },
  { id: '4', title: 'Pipeline failed', message: 'Test suite error in CI', variant: 'danger' as const },
]

function NotificationCenterDemo({ glass }: { glass: boolean }) {
  const [items, setItems] = useState(defaultNotifications)
  return (
    <NotificationCenter
      notifications={items}
      glass={glass}
      onDismiss={(id) => setItems((prev) => prev.filter((n) => n.id !== id))}
      onClear={() => setItems([])}
    />
  )
}

const notificationCenterItem: DevCenterItem = {
  id: 'notification-center',
  label: 'NotificationCenter',
  layer: 'l5',
  type: 'interactive',
  tags: ['notification', 'center', 'list', 'dismiss', 'clear', 'organism'],
  defaultConfig: { glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { NotificationCenter } from '@golia/gds'" />
      <LivePreview className="!items-start !justify-start">
        <div className="w-full max-w-md">
          <NotificationCenterDemo glass={config.glass} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: () =>
    `import { NotificationCenter } from '@golia/gds'\n\n<NotificationCenter\n  notifications={[\n    { id: '1', title: 'Build succeeded', variant: 'success' },\n    { id: '2', title: 'Disk warning', variant: 'warning' },\n  ]}\n  onDismiss={(id) => dismiss(id)}\n  onClear={() => clearAll()}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['notifications', 'Notification items array', '{ id, title, message?, variant?, timestamp? }[]', '—'],
        ['onDismiss', 'Callback when dismissing one', '(id: string) => void', '—'],
        ['onClear', 'Callback to clear all', '() => void', '—'],
        ['emptyMessage', 'Text when empty', 'string', "'No notifications'"],
        ['glass', 'Glass material', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt9.push(notificationCenterItem)

export { organismItemsExt9 }
