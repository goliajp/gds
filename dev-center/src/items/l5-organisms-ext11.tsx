import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { RichSelect, Table } from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

const organismItemsExt11: DevCenterItem[] = []

// table
const tableItem: DevCenterItem = {
  id: 'table',
  label: 'Table',
  layer: 'l5',
  type: 'interactive',
  tags: ['table', 'striped', 'compact', 'hoverable', 'organism'],
  defaultConfig: { striped: false, compact: false, hoverable: true, glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Table } from '@golia/gds'" />
      <LivePreview className="block">
        <Table striped={config.striped} compact={config.compact} hoverable={config.hoverable} glass={config.glass}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Alice</td><td>Engineer</td><td>Active</td></tr>
            <tr><td>Bob</td><td>Designer</td><td>On leave</td></tr>
            <tr><td>Charlie</td><td>PM</td><td>Active</td></tr>
            <tr><td>Diana</td><td>QA</td><td>Active</td></tr>
          </tbody>
        </Table>
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['children', 'ReactNode', '—', 'Standard table children (thead, tbody, tr, th, td)'],
          ['striped', 'boolean', 'false', 'Alternating row colors'],
          ['compact', 'boolean', 'false', 'Reduced padding'],
          ['hoverable', 'boolean', 'true', 'Highlight rows on hover'],
          ['glass', 'boolean', 'false', 'Glass material'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="striped" value={config.striped} onChange={(v) => setConfig('striped', v)} />
      <Ctrl type="check" label="compact" value={config.compact} onChange={(v) => setConfig('compact', v)} />
      <Ctrl type="check" label="hoverable" value={config.hoverable} onChange={(v) => setConfig('hoverable', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { Table } from '@golia/gds'\n\n<Table${config.striped ? ' striped' : ''}${config.compact ? ' compact' : ''}${!config.hoverable ? ' hoverable={false}' : ''}${config.glass ? ' glass' : ''}>\n  <thead>\n    <tr><th>Name</th><th>Role</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Alice</td><td>Engineer</td></tr>\n  </tbody>\n</Table>`,
}
organismItemsExt11.push(tableItem)

// rich-select
function RichSelectDemo({ glass, error, disabled }: { glass: boolean; error: boolean; disabled: boolean }) {
  const [value, setValue] = useState<string | null>(null)
  return (
    <RichSelect
      options={[
        { value: 'react', label: 'React', description: 'UI library by Meta', badge: 'popular' },
        { value: 'vue', label: 'Vue', description: 'Progressive framework' },
        { value: 'svelte', label: 'Svelte', description: 'Compile-time framework', badge: 'rising' },
        { value: 'angular', label: 'Angular', description: 'Full-featured framework by Google' },
      ]}
      value={value}
      onChange={setValue}
      placeholder="Choose a framework"
      glass={glass}
      error={error}
      disabled={disabled}
    />
  )
}

const richSelectItem: DevCenterItem = {
  id: 'rich-select',
  label: 'RichSelect',
  layer: 'l5',
  type: 'interactive',
  tags: ['select', 'dropdown', 'rich', 'icon', 'description', 'badge', 'organism'],
  defaultConfig: { glass: false, error: false, disabled: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { RichSelect } from '@golia/gds'" />
      <LivePreview>
        <div className="w-72">
          <RichSelectDemo glass={config.glass} error={config.error} disabled={config.disabled} />
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['options', 'RichSelectOption[]', '—', 'Array of options with value, label, description?, icon?, badge?'],
          ['value', 'string | null', '—', 'Currently selected value'],
          ['onChange', '(value: string | null) => void', '—', 'Called when selection changes'],
          ['placeholder', 'string', "'Select...'", 'Placeholder text'],
          ['disabled', 'boolean', 'false', 'Disable the select'],
          ['error', 'boolean', 'false', 'Error border state'],
          ['glass', 'boolean', 'false', 'Glass material'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
      <Ctrl type="check" label="error" value={config.error} onChange={(v) => setConfig('error', v)} />
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { RichSelect } from '@golia/gds'\n\n<RichSelect\n  options={[\n    { value: 'react', label: 'React', description: 'UI library', badge: 'popular' },\n    { value: 'vue', label: 'Vue', description: 'Progressive framework' },\n  ]}\n  value={value}\n  onChange={setValue}\n  placeholder="Choose a framework"\n  ${config.glass ? 'glass\n  ' : ''}${config.error ? 'error\n  ' : ''}${config.disabled ? 'disabled\n  ' : ''}/>`,
}
organismItemsExt11.push(richSelectItem)

export { organismItemsExt11 }
