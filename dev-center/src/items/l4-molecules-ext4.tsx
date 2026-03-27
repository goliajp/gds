import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Dock, MultiSelect, Panel } from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

const moleculeItemsE: DevCenterItem[] = []

// panel
const panelItem: DevCenterItem = {
  id: 'panel',
  label: 'Panel',
  layer: 'l4',
  type: 'interactive',
  tags: ['panel', 'collapsible', 'section', 'expand', 'collapse'],
  defaultConfig: { collapsible: true, defaultOpen: true, glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Panel } from '@goliapkg/gds'" />

      <LivePreview>
        <div className="w-[400px] flex flex-col gap-3">
          <Panel
            title="Project Settings"
            collapsible={config.collapsible}
            defaultOpen={config.defaultOpen}
            glass={config.glass}
          >
            <div className="flex flex-col gap-2 text-sm text-fg-muted">
              <p>Project name: GOLIA Design System</p>
              <p>Version: 1.0.0</p>
              <p>License: MIT</p>
            </div>
          </Panel>
          <Panel
            title="Build Config"
            collapsible={config.collapsible}
            defaultOpen={false}
            glass={config.glass}
          >
            <div className="flex flex-col gap-2 text-sm text-fg-muted">
              <p>Target: ES2022</p>
              <p>Module: ESNext</p>
            </div>
          </Panel>
        </div>
      </LivePreview>

      <DocSection title="Variants" columns={2}>
        <DemoCard title="Collapsible" description="Click header to toggle" code={`<Panel title="Settings" collapsible>...</Panel>`}>
          <div className="w-full">
            <Panel title="Click me">
              <span className="text-sm text-fg-muted">Expandable content</span>
            </Panel>
          </div>
        </DemoCard>
        <DemoCard title="Non-collapsible" description="Always open, no toggle" code={`<Panel title="Info" collapsible={false}>...</Panel>`}>
          <div className="w-full">
            <Panel title="Static section" collapsible={false}>
              <span className="text-sm text-fg-muted">Always visible content</span>
            </Panel>
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="With Header Action" columns={1}>
        <DemoCard
          title="Header action slot"
          description="Extra element in the header bar"
          full
          code={`<Panel title="Filters" headerAction={<button>Reset</button>}>...</Panel>`}
        >
          <div className="w-full">
            <Panel
              title="Filters"
              headerAction={
                <button className="rounded px-2 py-0.5 text-xs text-accent hover:bg-accent/10" type="button">
                  Reset
                </button>
              }
            >
              <span className="text-sm text-fg-muted">Filter controls here</span>
            </Panel>
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="API">
        <DocTable
          rows={[
            ['title', 'string', '—', 'Header text'],
            ['children', 'ReactNode', '—', 'Panel body content'],
            ['defaultOpen', 'boolean', 'true', 'Initial open state'],
            ['collapsible', 'boolean', 'true', 'Allow collapse toggle'],
            ['headerAction', 'ReactNode', '—', 'Extra element in header'],
            ['glass', 'boolean', 'false', 'Frosted glass surface'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="collapsible" value={config.collapsible} onChange={(v) => setConfig('collapsible', v)} />
      <Ctrl type="check" label="defaultOpen" value={config.defaultOpen} onChange={(v) => setConfig('defaultOpen', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),
}
moleculeItemsE.push(panelItem)

// dock
function DockIcon({ d }: { d: string }) {
  return (
    <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeWidth={2} viewBox="0 0 24 24" width="20">
      <path d={d} />
    </svg>
  )
}

const dockItems = [
  { id: 'home', icon: <DockIcon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />, label: 'Home' },
  { id: 'search', icon: <DockIcon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />, label: 'Search' },
  { id: 'mail', icon: <DockIcon d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />, label: 'Mail' },
  { id: 'settings', icon: <DockIcon d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />, label: 'Settings' },
]

const dockItem: DevCenterItem = {
  id: 'dock',
  label: 'Dock',
  layer: 'l4',
  type: 'interactive',
  tags: ['dock', 'mac', 'taskbar', 'launcher', 'magnify', 'icons'],
  defaultConfig: { glass: true },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Dock } from '@goliapkg/gds'" />

      <LivePreview>
        <Dock
          items={dockItems}
          glass={config.glass}
          onSelect={() => {}}
        />
      </LivePreview>

      <DocSection title="API">
        <DocTable
          rows={[
            ['items', '{ id, icon, label }[]', '—', 'Dock items array'],
            ['onSelect', '(id: string) => void', '—', 'Called when item clicked'],
            ['glass', 'boolean', 'true', 'Frosted glass surface'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),
}
moleculeItemsE.push(dockItem)

// multi-select
const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
]

function MultiSelectDemo({ disabled, error, glass, maxDisplay }: {
  disabled: boolean
  error: boolean
  glass: boolean
  maxDisplay: number
}) {
  const [selected, setSelected] = useState<string[]>(['apple', 'cherry'])

  return (
    <div className="w-[320px]">
      <MultiSelect
        options={fruitOptions}
        value={selected}
        onChange={setSelected}
        placeholder="Pick fruits..."
        disabled={disabled}
        error={error}
        glass={glass}
        maxDisplay={maxDisplay}
      />
      <div className="mt-2 text-[10px] text-fg-muted/50">
        Selected: {selected.length === 0 ? 'none' : selected.join(', ')}
      </div>
    </div>
  )
}

const multiSelectItem: DevCenterItem = {
  id: 'multi-select',
  label: 'MultiSelect',
  layer: 'l4',
  type: 'interactive',
  tags: ['multi-select', 'checkbox', 'dropdown', 'multiple', 'tags', 'chips', 'filter'],
  defaultConfig: { disabled: false, error: false, glass: false, maxDisplay: 3 },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { MultiSelect } from '@goliapkg/gds'" />

      <LivePreview>
        <MultiSelectDemo
          disabled={config.disabled}
          error={config.error}
          glass={config.glass}
          maxDisplay={config.maxDisplay}
        />
      </LivePreview>

      <DocSection title="States" columns={2}>
        <DemoCard title="Error" description="Validation error state" code={`<MultiSelect error options={...} value={[]} onChange={...} />`}>
          <div className="w-full">
            <MultiSelect options={fruitOptions.slice(0, 3)} value={[]} onChange={() => {}} error />
          </div>
        </DemoCard>
        <DemoCard title="Disabled" description="Non-interactive state" code={`<MultiSelect disabled options={...} value={['apple']} onChange={...} />`}>
          <div className="w-full">
            <MultiSelect options={fruitOptions.slice(0, 3)} value={['apple']} onChange={() => {}} disabled />
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="API">
        <DocTable
          rows={[
            ['options', '{ value: string, label: string }[]', '—', 'Available options'],
            ['value', 'string[]', '—', 'Selected values'],
            ['onChange', '(value: string[]) => void', '—', 'Selection change handler'],
            ['placeholder', 'string', "'Select...'", 'Placeholder text'],
            ['maxDisplay', 'number', '3', 'Max chips before "+N more"'],
            ['disabled', 'boolean', 'false', 'Disabled state'],
            ['error', 'boolean', 'false', 'Error state'],
            ['glass', 'boolean', 'false', 'Frosted glass surface'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="maxDisplay" value={config.maxDisplay} onChange={(v) => setConfig('maxDisplay', v)} min={1} max={10} />
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
      <Ctrl type="check" label="error" value={config.error} onChange={(v) => setConfig('error', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { MultiSelect } from '@goliapkg/gds'", '']
    const props: string[] = ['options={options}', 'value={selected}', 'onChange={setSelected}']
    if (config.maxDisplay !== 3) props.push(`maxDisplay={${config.maxDisplay}}`)
    if (config.disabled === true) props.push('disabled')
    if (config.error === true) props.push('error')
    if (config.glass === true) props.push('glass')
    lines.push('<MultiSelect')
    for (const p of props) lines.push(`  ${p}`)
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['options', 'Available options', '{ value: string, label: string }[]', '—'],
        ['value', 'Currently selected values', 'string[]', '—'],
        ['onChange', 'Selection change handler', '(value: string[]) => void', '—'],
        ['placeholder', 'Placeholder text', 'string', "'Select...'"],
        ['maxDisplay', 'Max chips before "+N more"', 'number', '3'],
        ['disabled', 'Disabled state', 'boolean', 'false'],
        ['error', 'Error state', 'boolean', 'false'],
        ['glass', 'Frosted glass surface', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Use for selecting multiple items from a list with chip display</p>
          <p>• maxDisplay controls how many chips show before collapsing to "+N more"</p>
          <p>• Click a chip to deselect, or use the dropdown to toggle selections</p>
        </div>
      </div>
    </div>
  ),
}
moleculeItemsE.push(multiSelectItem)

export { moleculeItemsE }
