import { OnlineIndicator, TruncatedList } from '@gds/l3-atoms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const atomItemsS: DevCenterItem[] = []

const onlineIndicatorItem: DevCenterItem = {
  id: 'online-indicator',
  label: 'OnlineIndicator',
  layer: 'l3',
  type: 'interactive',
  tags: ['online', 'offline', 'status', 'indicator', 'atom'],
  defaultConfig: { online: 'true', label: '' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { OnlineIndicator } from '@goliapkg/gds'" />
      <LivePreview>
        <OnlineIndicator
          online={config.online === 'true'}
          label={config.label !== '' ? config.label : undefined}
        />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="online" value={config.online} options={['true', 'false']} onChange={(v) => setConfig('online', v)} />
      <Ctrl type="pills" label="label" value={config.label} options={['', 'Active', 'Away']} onChange={(v) => setConfig('label', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { OnlineIndicator } from '@goliapkg/gds'\n\n<OnlineIndicator online={${config.online}}${config.label !== '' ? ` label="${config.label}"` : ''} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['online', 'Whether the user is online', 'boolean', '—'],
        ['label', 'Custom text label (overrides default Online/Offline)', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsS.push(onlineIndicatorItem)

const truncatedListItem: DevCenterItem = {
  id: 'truncated-list',
  label: 'TruncatedList',
  layer: 'l3',
  type: 'interactive',
  tags: ['truncated', 'list', 'overflow', 'tags', 'atom'],
  defaultConfig: { max: '3', count: '6' },

  stage: ({ config }) => {
    const names = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Hank']
    const items = names.slice(0, Number(config.count ?? 0)).map((n) => (
      <span key={n} className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">{n}</span>
    ))

    return (
      <div>
        <ImportLine text="import { TruncatedList } from '@goliapkg/gds'" />
        <LivePreview>
          <TruncatedList items={items} max={Number(config.max ?? 0)} />
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="max" value={config.max} options={['1', '2', '3', '5']} onChange={(v) => setConfig('max', v)} />
      <Ctrl type="pills" label="count" value={config.count} options={['2', '4', '6', '8']} onChange={(v) => setConfig('count', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { TruncatedList } from '@goliapkg/gds'\n\n<TruncatedList items={tags} max={${config.max}} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['items', 'Array of ReactNode items to display', 'ReactNode[]', '—'],
        ['max', 'Maximum visible items before truncation', 'number', '3'],
        ['moreLabel', 'Custom label function for overflow badge', '(count: number) => string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsS.push(truncatedListItem)

export { atomItemsS }
