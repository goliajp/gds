import { useState } from 'react'

import { SkeletonGroup, SwitchGroup } from '@gds/l3-atoms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const atomItemsP: DevCenterItem[] = []

const skeletonGroupItem: DevCenterItem = {
  id: 'skeleton-group',
  label: 'SkeletonGroup',
  layer: 'l3',
  type: 'interactive',
  tags: ['skeleton', 'loading', 'placeholder', 'group', 'atom'],
  defaultConfig: { variant: 'avatar-text', count: '2' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { SkeletonGroup } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-64 p-4">
          <SkeletonGroup variant={config.variant} count={Number(config.count)} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="variant" value={config.variant} options={['avatar-text', 'card', 'form-field']} onChange={(v) => setConfig('variant', v)} />
      <Ctrl type="pills" label="count" value={config.count} options={['1', '2', '3']} onChange={(v) => setConfig('count', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { SkeletonGroup } from '@goliapkg/gds'\n\n<SkeletonGroup variant="${config.variant}" count={${config.count}} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['variant', 'Layout pattern', '"avatar-text" | "card" | "form-field"', '"avatar-text"'],
        ['count', 'Number of repeated groups', 'number', '1'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsP.push(skeletonGroupItem)

const switchGroupItem: DevCenterItem = {
  id: 'switch-group',
  label: 'SwitchGroup',
  layer: 'l3',
  type: 'interactive',
  tags: ['switch', 'toggle', 'group', 'settings', 'atom'],
  defaultConfig: { disabled: 'false' },

  stage: ({ config }) => {
    const [items, setItems] = useState([
      { id: 'dark', label: 'Dark mode', description: 'Use dark theme', checked: true },
      { id: 'notify', label: 'Notifications', checked: false },
      { id: 'sound', label: 'Sound effects', description: 'Play sounds on actions', checked: true },
    ])

    return (
      <div>
        <ImportLine text="import { SwitchGroup } from '@goliapkg/gds'" />
        <LivePreview>
          <div className="w-80">
            <SwitchGroup
              items={items}
              onChange={(id, checked) => setItems(items.map((it) => it.id === id ? { ...it, checked } : it))}
              disabled={config.disabled === 'true'}
            />
          </div>
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="disabled" value={config.disabled} options={['false', 'true']} onChange={(v) => setConfig('disabled', v)} />
  ),

  code: () =>
    `import { SwitchGroup } from '@goliapkg/gds'\n\n<SwitchGroup\n  items={[\n    { id: 'dark', label: 'Dark mode', checked: true },\n    { id: 'notify', label: 'Notifications', checked: false },\n  ]}\n  onChange={(id, checked) => update(id, checked)}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['items', 'Switch items array', '{ id, label, description?, checked }[]', '—'],
        ['onChange', 'Called when a switch toggles', '(id: string, checked: boolean) => void', '—'],
        ['disabled', 'Disable all switches', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsP.push(switchGroupItem)

export { atomItemsP }
