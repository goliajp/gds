import { InboxLayout } from '@gds/l7-patterns'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt20: DevCenterItem[] = []

const inboxLayoutItem: DevCenterItem = {
  id: 'inbox-layout',
  label: 'InboxLayout',
  layer: 'l7',
  type: 'interactive',
  tags: ['inbox', 'email', 'split', 'layout', 'messaging', 'pattern'],
  defaultConfig: { listWidth: '320' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { InboxLayout } from '@golia/gds'" />
      <LivePreview className="!p-0 !min-h-64">
        <div className="h-64 w-full">
          <InboxLayout
            listWidth={Number(config.listWidth)}
            list={
              <div className="space-y-0">
                {['Inbox item 1', 'Inbox item 2', 'Inbox item 3'].map((text) => (
                  <div key={text} className="border-b border-border px-3 py-2.5 text-sm text-fg hover:bg-bg-tertiary cursor-pointer">
                    {text}
                  </div>
                ))}
              </div>
            }
            detail={
              <div className="flex h-full items-center justify-center text-fg-muted">
                Select a message to read
              </div>
            }
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="number" label="listWidth" value={Number(config.listWidth)} min={200} max={500} onChange={(v) => setConfig('listWidth', String(v))} />
  ),

  code: ({ config }) =>
    `import { InboxLayout } from '@golia/gds'\n\n<InboxLayout\n  listWidth={${config.listWidth}}\n  list={<EmailList />}\n  detail={<EmailDetail />}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['list', 'Left pane content (message list)', 'ReactNode', '—'],
        ['detail', 'Right pane content (message detail)', 'ReactNode', '—'],
        ['listWidth', 'Width of list pane in pixels', 'number', '360'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt20.push(inboxLayoutItem)

export { patternItemsExt20 }
