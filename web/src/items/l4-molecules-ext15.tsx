import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { ActionMenu, FieldWrapper, FilterBar } from '@gds/l4-molecules'
import { Input } from '@gds/l2-primitives'

import type { DevCenterItem } from '../types'

const moleculeItemsP: DevCenterItem[] = []

function FilterBarDemo() {
  const [filters, setFilters] = useState([
    { id: 'status', label: 'Active', active: true },
    { id: 'role', label: 'Admin', active: false },
    { id: 'dept', label: 'Engineering', active: false },
    { id: 'loc', label: 'Tokyo', active: true },
  ])

  return (
    <FilterBar
      filters={filters}
      onChange={(id, active) =>
        setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, active } : f)))
      }
      onClear={() => setFilters((prev) => prev.map((f) => ({ ...f, active: false })))}
    />
  )
}

const filterBarItem: DevCenterItem = {
  id: 'filter-bar',
  label: 'FilterBar',
  layer: 'l4',
  type: 'interactive',
  tags: ['filter', 'chips', 'bar', 'search', 'molecule'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { FilterBar } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-full max-w-lg p-8">
          <FilterBarDemo />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { FilterBar } from '@goliapkg/gds'\n\n<FilterBar\n  filters={[\n    { id: 'status', label: 'Active', active: true },\n    { id: 'role', label: 'Admin', active: false },\n  ]}\n  onChange={(id, active) => update(id, active)}\n  onClear={() => clearAll()}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['filters', 'Array of filter items', '{ id, label, active }[]', '—'],
        ['onChange', 'Toggle handler', '(id, active) => void', '—'],
        ['onClear', 'Clear all handler', '() => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsP.push(filterBarItem)

const actionMenuItems = [
  { id: 'edit', label: 'Edit' },
  { id: 'duplicate', label: 'Duplicate' },
  { id: 'delete', label: 'Delete', danger: true },
]

const actionMenuItem: DevCenterItem = {
  id: 'action-menu',
  label: 'ActionMenu',
  layer: 'l4',
  type: 'interactive',
  tags: ['action', 'menu', 'kebab', 'dots', 'dropdown', 'molecule'],
  defaultConfig: {
    disabled: false,
  },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ActionMenu } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center gap-8 p-8">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-bg-secondary px-4 py-2">
            <span className="text-sm text-fg">Row item</span>
            <ActionMenu disabled={config.disabled} items={actionMenuItems} onSelect={() => {}} />
          </div>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
  ),

  code: () =>
    `import { ActionMenu } from '@goliapkg/gds'\n\n<ActionMenu\n  items={[\n    { id: 'edit', label: 'Edit' },\n    { id: 'delete', label: 'Delete', danger: true },\n  ]}\n  onSelect={(id) => handleAction(id)}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['items', 'Menu items', '{ id, label, icon?, danger? }[]', '—'],
        ['onSelect', 'Selection handler', '(id: string) => void', '—'],
        ['disabled', 'Disable trigger', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsP.push(actionMenuItem)

const formFieldItem: DevCenterItem = {
  id: 'field-wrapper',
  label: 'FieldWrapper',
  layer: 'l4',
  type: 'interactive',
  tags: ['form', 'field', 'label', 'error', 'input', 'wrapper', 'molecule'],
  defaultConfig: {
    label: 'Email',
    required: true,
    error: '',
    helperText: 'We will never share your email.',
  },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { FieldWrapper } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-full max-w-sm p-8">
          <FieldWrapper
            error={config.error !== '' ? config.error : undefined}
            helperText={config.helperText}
            label={config.label}
            required={config.required}
          >
            <Input placeholder="you@example.com" />
          </FieldWrapper>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="label" value={config.label} onChange={(v) => setConfig('label', v)} />
      <Ctrl type="check" label="required" value={config.required} onChange={(v) => setConfig('required', v)} />
      <Ctrl type="text" label="error" value={config.error} onChange={(v) => setConfig('error', v)} />
      <Ctrl type="text" label="helperText" value={config.helperText} onChange={(v) => setConfig('helperText', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { FieldWrapper } from '@goliapkg/gds'\nimport { Input } from '@goliapkg/gds'\n\n<FieldWrapper\n  label="${config.label}"${config.required ? '\n  required' : ''}${config.error ? `\n  error="${config.error}"` : ''}${config.helperText ? `\n  helperText="${config.helperText}"` : ''}\n>\n  <Input placeholder="you@example.com" />\n</FieldWrapper>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['label', 'Field label text', 'string', '—'],
        ['children', 'Input element', 'ReactNode', '—'],
        ['error', 'Error message', 'string', '—'],
        ['helperText', 'Helper text below input', 'string', '—'],
        ['required', 'Show required indicator', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsP.push(formFieldItem)

export { moleculeItemsP }
