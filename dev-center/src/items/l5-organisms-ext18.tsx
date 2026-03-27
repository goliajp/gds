import { useState } from 'react'

import { PropertyEditor } from '@gds/l5-organisms'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt18: DevCenterItem[] = []

const propertyEditorItem: DevCenterItem = {
  id: 'property-editor',
  label: 'PropertyEditor',
  layer: 'l5',
  type: 'interactive',
  tags: ['property', 'editor', 'key-value', 'inline-edit', 'organism'],
  defaultConfig: {},

  stage: () => {
    const [properties, setProperties] = useState([
      { key: 'Name', value: 'Alice Johnson', editable: true },
      { key: 'Email', value: 'alice@example.com', editable: true },
      { key: 'Role', value: 'Admin' },
      { key: 'Status', value: 'Active' },
    ])

    const handleChange = (key: string, value: string) => {
      setProperties(properties.map((p) => p.key === key ? { ...p, value } : p))
    }

    return (
      <div>
        <ImportLine text="import { PropertyEditor } from '@goliapkg/gds'" />
        <LivePreview>
          <div className="w-80">
            <PropertyEditor properties={properties} onChange={handleChange} />
          </div>
        </LivePreview>
      </div>
    )
  },

  code: () =>
    `import { PropertyEditor } from '@goliapkg/gds'\n\n<PropertyEditor\n  properties={[\n    { key: 'Name', value: 'Alice', editable: true },\n    { key: 'Role', value: 'Admin' },\n  ]}\n  onChange={(key, value) => update(key, value)}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['properties', 'Property items', '{ key: string, value: string, editable?: boolean }[]', '—'],
        ['onChange', 'Called when editable value saved', '(key: string, value: string) => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt18.push(propertyEditorItem)

export { organismItemsExt18 }
