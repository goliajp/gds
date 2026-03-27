import { useState } from 'react'

import { CheckboxGroup, TextareaCounter } from '@gds/l3-atoms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const atomItemsQ: DevCenterItem[] = []

const checkboxGroupItem: DevCenterItem = {
  id: 'checkbox-group',
  label: 'CheckboxGroup',
  layer: 'l3',
  type: 'interactive',
  tags: ['checkbox', 'group', 'select-all', 'form', 'atom'],
  defaultConfig: { selectAll: 'true', disabled: 'false' },

  stage: ({ config }) => {
    const [value, setValue] = useState<string[]>(['apple'])
    const options = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
    ]

    return (
      <div>
        <ImportLine text="import { CheckboxGroup } from '@goliapkg/gds'" />
        <LivePreview>
          <CheckboxGroup
            disabled={config.disabled === 'true'}
            onChange={setValue}
            options={options}
            selectAll={config.selectAll === 'true'}
            value={value}
          />
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="selectAll" value={config.selectAll} options={['true', 'false']} onChange={(v) => setConfig('selectAll', v)} />
      <Ctrl type="pills" label="disabled" value={config.disabled} options={['false', 'true']} onChange={(v) => setConfig('disabled', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { CheckboxGroup } from '@goliapkg/gds'\n\n<CheckboxGroup\n  options={[{ label: 'Apple', value: 'apple' }, ...]}\n  value={value}\n  onChange={setValue}\n  selectAll={${config.selectAll}}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['options', 'Checkbox options', '{ label: string, value: string }[]', '—'],
        ['value', 'Selected values', 'string[]', '—'],
        ['onChange', 'Called when selection changes', '(value: string[]) => void', '—'],
        ['selectAll', 'Show select-all checkbox', 'boolean', 'false'],
        ['disabled', 'Disable all checkboxes', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsQ.push(checkboxGroupItem)

const textareaCounterItem: DevCenterItem = {
  id: 'textarea-counter',
  label: 'TextareaCounter',
  layer: 'l3',
  type: 'interactive',
  tags: ['textarea', 'counter', 'character', 'form', 'atom'],
  defaultConfig: { maxLength: '200' },

  stage: ({ config }) => {
    const [value, setValue] = useState('Hello world')

    return (
      <div>
        <ImportLine text="import { TextareaCounter } from '@goliapkg/gds'" />
        <LivePreview>
          <div className="w-72">
            <TextareaCounter
              maxLength={config.maxLength !== '' ? Number(config.maxLength) : undefined}
              onChange={setValue}
              placeholder="Type something..."
              value={value}
            />
          </div>
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="maxLength" value={config.maxLength} options={['100', '200', '500', '']} onChange={(v) => setConfig('maxLength', v)} />
  ),

  code: ({ config }) =>
    `import { TextareaCounter } from '@goliapkg/gds'\n\n<TextareaCounter\n  value={value}\n  onChange={setValue}\n  ${config.maxLength !== '' ? `maxLength={${config.maxLength}}\n  ` : ''}placeholder="Type something..."\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Current text value', 'string', '—'],
        ['onChange', 'Called with new value', '(value: string) => void', '—'],
        ['maxLength', 'Maximum character limit', 'number', '—'],
        ['error', 'Error state', 'boolean', 'false'],
        ['placeholder', 'Placeholder text', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsQ.push(textareaCounterItem)

export { atomItemsQ }
