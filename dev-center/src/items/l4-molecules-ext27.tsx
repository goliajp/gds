import { useState } from 'react'

import { InputWithButton, ToolbarGroup } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsAB: DevCenterItem[] = []

const toolbarGroupItem: DevCenterItem = {
  id: 'toolbar-group',
  label: 'ToolbarGroup',
  layer: 'l4',
  type: 'interactive',
  tags: ['toolbar', 'button', 'group', 'actions', 'molecule'],
  defaultConfig: { count: '3' },

  stage: ({ config }) => {
    const labels = ['Bold', 'Italic', 'Underline', 'Strike']
    const count = Number(config.count)
    return (
      <div>
        <ImportLine text="import { ToolbarGroup } from '@goliapkg/gds'" />
        <LivePreview>
          <ToolbarGroup>
            {labels.slice(0, count).map((l) => (
              <button className="px-3 py-1.5 text-xs text-fg hover:bg-accent/10" key={l}>{l}</button>
            ))}
          </ToolbarGroup>
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="count" value={config.count} options={['2', '3', '4']} onChange={(v) => setConfig('count', v)} />
  ),

  code: () =>
    `import { ToolbarGroup } from '@goliapkg/gds'\n\n<ToolbarGroup>\n  <button>Bold</button>\n  <button>Italic</button>\n  <button>Underline</button>\n</ToolbarGroup>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Toolbar button elements', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsAB.push(toolbarGroupItem)

const inputWithButtonItem: DevCenterItem = {
  id: 'input-with-button',
  label: 'InputWithButton',
  layer: 'l4',
  type: 'interactive',
  tags: ['input', 'button', 'search', 'submit', 'molecule'],
  defaultConfig: { buttonLabel: 'Go' },

  stage: ({ config }) => {
    const [val, setVal] = useState('')
    return (
      <div>
        <ImportLine text="import { InputWithButton } from '@goliapkg/gds'" />
        <LivePreview>
          <div className="w-64">
            <InputWithButton
              buttonLabel={config.buttonLabel}
              onChange={setVal}
              onSubmit={() => {}}
              placeholder="Type something..."
              value={val}
            />
          </div>
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="buttonLabel" value={config.buttonLabel} options={['Go', 'Copy', 'Search']} onChange={(v) => setConfig('buttonLabel', v)} />
  ),

  code: ({ config }) =>
    `import { InputWithButton } from '@goliapkg/gds'\n\n<InputWithButton\n  value={value}\n  onChange={setValue}\n  buttonLabel="${config.buttonLabel}"\n  onSubmit={handleSubmit}\n  placeholder="Type something..."\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Input value', 'string', '—'],
        ['onChange', 'Value change handler', '(value: string) => void', '—'],
        ['buttonLabel', 'Button text', 'string', '—'],
        ['onSubmit', 'Submit handler (button click or Enter)', '() => void', '—'],
        ['placeholder', 'Input placeholder', 'string', '—'],
        ['disabled', 'Disable input and button', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsAB.push(inputWithButtonItem)

export { moleculeItemsAB }
