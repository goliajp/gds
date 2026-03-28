import { useState } from 'react'

import { NotificationToast } from '@gds/l5-organisms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt31: DevCenterItem[] = []

const notificationToastItem: DevCenterItem = {
  id: 'notification-toast',
  label: 'NotificationToast',
  layer: 'l5',
  type: 'interactive',
  tags: ['toast', 'notification', 'alert', 'snackbar', 'organism'],
  defaultConfig: { position: 'top-right' },

  stage: ({ config }) => {
    const [toasts, setToasts] = useState([
      { id: '1', title: 'File saved', message: 'Changes saved successfully', variant: 'success' as const },
      { id: '2', title: 'Warning', message: 'Disk space running low', variant: 'warning' as const },
    ])

    return (
      <div>
        <ImportLine text="import { NotificationToast } from '@goliapkg/gds'" />
        <LivePreview>
          <div className="flex flex-col gap-3">
            <button
              className="rounded bg-accent px-3 py-1.5 text-xs text-white"
              onClick={() => setToasts((prev) => [
                ...prev,
                { id: String(Date.now()), title: 'New toast', message: 'Added at ' + new Date().toLocaleTimeString(), variant: 'info' as const },
              ])}
            >
              Add toast
            </button>
            <p className="text-xs text-fg-muted">Active toasts: {toasts.length}</p>
          </div>
          <NotificationToast
            toasts={toasts}
            onClose={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
            position={config.position}
          />
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="position" value={config.position} options={['top-right', 'bottom-right']} onChange={(v) => setConfig('position', v)} />
  ),

  code: () =>
    `import { NotificationToast } from '@goliapkg/gds'\n\n<NotificationToast\n  toasts={toasts}\n  onClose={(id) => removeToast(id)}\n  position="top-right"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['toasts', 'Array of toast entries', '{ id, title, message?, variant? }[]', '—'],
        ['onClose', 'Callback when a toast is dismissed', '(id: string) => void', '—'],
        ['position', 'Stack position on screen', "'top-right' | 'bottom-right'", "'top-right'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt31.push(notificationToastItem)

export { organismItemsExt31 }
