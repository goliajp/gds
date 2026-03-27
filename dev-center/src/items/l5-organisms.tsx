import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button } from '@gds/l2-primitives'
import {
  Calendar,
  CommandPalette,
  DataTable,
  DatePicker,
  FileBrowser,
  Timeline,
} from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div className="flex flex-col gap-2">
      <Calendar value={date} onChange={setDate} />
      <span className="text-xs text-fg-muted">
        Selected: {date !== undefined ? date.toLocaleDateString() : 'none'}
      </span>
    </div>
  )
}

function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  return (
    <div className="flex flex-col gap-3 max-w-xs">
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Pick a date"
      />
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Glass variant"
        glass
      />
    </div>
  )
}

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false)
  const items = [
    { id: 'new', label: 'New File', shortcut: 'Ctrl+N', group: 'File' },
    { id: 'open', label: 'Open File', shortcut: 'Ctrl+O', group: 'File' },
    { id: 'save', label: 'Save', shortcut: 'Ctrl+S', group: 'File' },
    { id: 'theme', label: 'Toggle Theme', group: 'View' },
  ]
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        onSelect={() => setOpen(false)}
      />
    </div>
  )
}

const organismItems: DevCenterItem[] = [
  {
    id: 'data-table',
    label: 'DataTable',
    layer: 'l5',
    type: 'interactive',
    tags: ['table', 'grid', 'list', 'sort'],
    defaultConfig: { glass: false, loading: false, columnCount: '3' },

    stage: ({ config }) => {
      const allColumns = [
        { key: 'name', header: 'Name', sortable: true },
        { key: 'role', header: 'Role', sortable: true },
        { key: 'status', header: 'Status' },
        { key: 'email', header: 'Email' },
        { key: 'joined', header: 'Joined' },
      ]
      const columns = allColumns.slice(0, Number(config.columnCount))
      const data = [
        { name: 'Alice', role: 'Engineer', status: 'Active', email: 'alice@co.io', joined: '2025-01' },
        { name: 'Bob', role: 'Designer', status: 'Away', email: 'bob@co.io', joined: '2025-03' },
        { name: 'Charlie', role: 'PM', status: 'Active', email: 'charlie@co.io', joined: '2025-06' },
        { name: 'Diana', role: 'Engineer', status: 'Active', email: 'diana@co.io', joined: '2025-08' },
      ]
      return (
        <div>
          <ImportLine text="import { DataTable } from '@golia/gds'" />

          <LivePreview className="!p-4">
            <DataTable columns={columns} data={data} glass={config.glass} loading={config.loading} />
          </LivePreview>

          <DocSection title="States" columns={2}>
            <DemoCard title="Loading" description="Skeleton rows while data fetches" code={`<DataTable columns={cols} data={[]} loading />`}>
              <DataTable columns={allColumns.slice(0, 3)} data={[]} loading />
            </DemoCard>
            <DemoCard title="Empty" description="Fallback when no rows" code={`<DataTable columns={cols} data={[]} emptyText="Nothing here" />`}>
              <DataTable columns={allColumns.slice(0, 3)} data={[]} emptyText="Nothing here" />
            </DemoCard>
          </DocSection>

          <DocSection title="Variants" columns={2}>
            <DemoCard title="Glass" description="Frosted translucent surface" code={`<DataTable columns={cols} data={rows} glass />`}>
              <DataTable columns={allColumns.slice(0, 3)} data={data.slice(0, 2)} glass />
            </DemoCard>
            <DemoCard title="Sortable Columns" description="Click header to toggle sort" code={`<DataTable columns={[{ key: 'name', header: 'Name', sortable: true }]} data={rows} />`}>
              <DataTable columns={allColumns.slice(0, 3)} data={data.slice(0, 2)} sortKey="name" sortDir="asc" />
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="columns" type="pills" value={config.columnCount} options={['2', '3', '4', '5']} onChange={v => setConfig('columnCount', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
        <Ctrl label="loading" type="check" value={config.loading} onChange={v => setConfig('loading', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { DataTable } from '@golia/gds'", '']
      const props: string[] = ['columns={columns}', 'data={data}']
      if (config.glass === true) props.push('glass')
      if (config.loading === true) props.push('loading')
      lines.push('<DataTable')
      for (const p of props) lines.push(`  ${p}`)
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['columns', 'Column definitions', 'Column<T>[]', '—'],
          ['data', 'Row data array', 'T[]', '—'],
          ['sortKey', 'Active sort column key', 'string', '—'],
          ['sortDir', 'Sort direction', "'asc' | 'desc'", '—'],
          ['onSort', 'Sort toggle callback', '(key: string) => void', '—'],
          ['onRowClick', 'Row click handler', '(row: T) => void', '—'],
          ['loading', 'Show skeleton rows', 'boolean', 'false'],
          ['emptyText', 'Text when data is empty', 'string', "'No data'"],
          ['glass', 'Glass morphism surface', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Set sortable: true on Column to enable click-to-sort headers</p>
            <p>• Provide a render function on Column for custom cell content</p>
            <p>• Alternating row stripes are applied automatically</p>
            <p>• Loading state shows 5 skeleton rows matching column count</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'command-palette',
    label: 'CommandPalette',
    layer: 'l5',
    type: 'interactive',
    tags: ['search', 'command', 'launcher'],
    defaultConfig: { placeholder: 'Search commands...' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { CommandPalette } from '@golia/gds'" />

        <LivePreview>
          <CommandPaletteDemo />
        </LivePreview>

        <DocSection title="Features" columns={2}>
          <DemoCard title="Grouped Items" description="Commands organized by category" code={`<CommandPalette\n  items={[\n    { id: 'new', label: 'New File', group: 'File' },\n    { id: 'theme', label: 'Toggle Theme', group: 'View' },\n  ]}\n/>`}>
            <div className="text-[11px] text-fg-muted/60">Groups display as section headers with items underneath</div>
          </DemoCard>
          <DemoCard title="Keyboard Shortcuts" description="Display shortcut hints per command" code={`{ id: 'save', label: 'Save', shortcut: 'Ctrl+S' }`}>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-fg">Save</span>
              <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-fg-muted/40">Ctrl+S</kbd>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="placeholder" type="text" value={config.placeholder} onChange={v => setConfig('placeholder', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { CommandPalette } from '@golia/gds'", '']
      lines.push('<CommandPalette')
      lines.push('  open={open}')
      lines.push('  onClose={() => setOpen(false)}')
      lines.push('  items={commands}')
      lines.push('  onSelect={(id) => run(id)}')
      if (config.placeholder !== 'Search commands...') {
        lines.push(`  placeholder="${config.placeholder}"`)
      }
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['open', 'Visible state', 'boolean', 'false'],
          ['onClose', 'Close callback', '() => void', '—'],
          ['items', 'Command list', 'CommandItem[]', '—'],
          ['onSelect', 'Selection callback', '(id: string) => void', '—'],
          ['placeholder', 'Search input placeholder', 'string', "'Search components...'"],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Renders via portal — works anywhere in the component tree</p>
            <p>• Arrow keys navigate, Enter selects, Escape closes</p>
            <p>• Group items by setting the group field on CommandItem</p>
            <p>• Fuzzy search filters as user types</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'timeline',
    label: 'Timeline',
    layer: 'l5',
    type: 'interactive',
    tags: ['events', 'history', 'log'],
    defaultConfig: { itemCount: '4' },

    stage: ({ config }) => {
      const allItems = [
        { id: '1', title: 'Project created', date: '2026-01-15', variant: 'success' as const },
        { id: '2', title: 'Design review', description: 'Reviewed component library specs', date: '2026-02-01', variant: 'default' as const },
        { id: '3', title: 'Beta release', date: '2026-03-10', variant: 'warning' as const },
        { id: '4', title: 'Bug discovered', description: 'Critical rendering issue', date: '2026-03-15', variant: 'danger' as const },
        { id: '5', title: 'Stable release', date: '2026-03-25', variant: 'success' as const },
      ]
      const items = allItems.slice(0, Number(config.itemCount))
      return (
        <div>
          <ImportLine text="import { Timeline } from '@golia/gds'" />

          <LivePreview className="!justify-start">
            <Timeline items={items} />
          </LivePreview>

          <DocSection title="Variants" columns={2}>
            <DemoCard title="Status Colors" description="4 semantic variants for dot color" code={`{ variant: 'success' | 'default' | 'warning' | 'danger' }`}>
              <Timeline items={[
                { id: 's', title: 'Success', variant: 'success' },
                { id: 'd', title: 'Default', variant: 'default' },
                { id: 'w', title: 'Warning', variant: 'warning' },
                { id: 'e', title: 'Danger', variant: 'danger' },
              ]} />
            </DemoCard>
            <DemoCard title="With Descriptions" description="Optional detail text per event" code={`{ title: 'Review', description: 'Detailed note' }`}>
              <Timeline items={[
                { id: '1', title: 'Deployed', description: 'v2.1.0 to production', date: '2026-03-20', variant: 'success' },
                { id: '2', title: 'Rollback', description: 'Reverted due to regression', date: '2026-03-21', variant: 'danger' },
              ]} />
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="items" type="pills" value={config.itemCount} options={['2', '3', '4', '5']} onChange={v => setConfig('itemCount', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Timeline } from '@golia/gds'", '']
      lines.push('<Timeline')
      lines.push('  items={[')
      lines.push("    { id: '1', title: 'Created', variant: 'success', date: '2026-01-15' },")
      lines.push("    { id: '2', title: 'Updated', variant: 'default', date: '2026-02-01' },")
      lines.push('  ]}')
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['items', 'Timeline event list', 'TimelineItem[]', '—'],
          ['orientation', 'Layout direction', "'vertical'", "'vertical'"],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">TimelineItem</div>
          <DocTable rows={[
            ['id', 'Unique identifier', 'string', '—'],
            ['title', 'Event title', 'string', '—'],
            ['description', 'Optional detail text', 'string', '—'],
            ['date', 'Display date string', 'string', '—'],
            ['icon', 'Custom icon replaces dot', 'ReactNode', '—'],
            ['variant', 'Dot color semantic', "'success' | 'default' | 'warning' | 'danger'", "'default'"],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use variant to convey event status at a glance</p>
            <p>• Custom icons replace the colored dot entirely</p>
            <p>• Items render top-to-bottom in array order</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'calendar',
    label: 'Calendar',
    layer: 'l5',
    type: 'interactive',
    tags: ['date', 'month', 'picker', 'grid'],
    defaultConfig: { dummy: '' },

    stage: () => (
      <div>
        <ImportLine text="import { Calendar } from '@golia/gds'" />

        <LivePreview>
          <CalendarDemo />
        </LivePreview>

        <DocSection title="Features" columns={2}>
          <DemoCard title="Month Navigation" description="Arrow buttons to switch months" code={`<Calendar value={date} onChange={setDate} />`}>
            <CalendarDemo />
          </DemoCard>
          <DemoCard title="Min/Max Constraints" description="Disable dates outside range" code={`<Calendar min={new Date(2026, 0, 10)} max={new Date(2026, 0, 20)} />`}>
            <div className="text-[11px] text-fg-muted/60">Pass min/max Date objects to constrain selectable range</div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: () => (
      <>
        <div className="py-1.5 text-[10px] text-fg-muted/40">Interactive controls in live preview</div>
      </>
    ),

    code: () => {
      const lines = ["import { Calendar } from '@golia/gds'", '']
      lines.push('const [date, setDate] = useState<Date>()')
      lines.push('')
      lines.push('<Calendar')
      lines.push('  value={date}')
      lines.push('  onChange={setDate}')
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['value', 'Selected date', 'Date', '—'],
          ['onChange', 'Date selection callback', '(date: Date) => void', '—'],
          ['min', 'Earliest selectable date', 'Date', '—'],
          ['max', 'Latest selectable date', 'Date', '—'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Today is highlighted with an accent ring</p>
            <p>• Disabled dates outside min/max are visually muted</p>
            <p>• 6-row grid ensures consistent calendar height</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'date-picker',
    label: 'DatePicker',
    layer: 'l5',
    type: 'interactive',
    tags: ['date', 'input', 'calendar', 'form'],
    defaultConfig: { glass: false, placeholder: 'Select date' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { DatePicker } from '@golia/gds'" />

        <LivePreview>
          <DatePickerDemo />
        </LivePreview>

        <DocSection title="Variants" columns={2}>
          <DemoCard title="Default" description="Standard bordered input trigger" code={`<DatePicker value={date} onChange={setDate} />`}>
            <DatePickerDemo />
          </DemoCard>
          <DemoCard title="Glass" description="Frosted translucent trigger" code={`<DatePicker value={date} onChange={setDate} glass />`}>
            <DatePickerDemo />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
        <Ctrl label="placeholder" type="text" value={config.placeholder} onChange={v => setConfig('placeholder', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { DatePicker } from '@golia/gds'", '']
      const props: string[] = ['value={date}', 'onChange={setDate}']
      if (config.glass === true) props.push('glass')
      if (config.placeholder !== 'Select date') props.push(`placeholder="${config.placeholder}"`)
      lines.push('<DatePicker')
      for (const p of props) lines.push(`  ${p}`)
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['value', 'Selected date', 'Date', '—'],
          ['onChange', 'Date selection callback', '(date: Date) => void', '—'],
          ['placeholder', 'Input placeholder text', 'string', "'Select date'"],
          ['min', 'Earliest selectable date', 'Date', '—'],
          ['max', 'Latest selectable date', 'Date', '—'],
          ['glass', 'Glass morphism trigger', 'boolean', 'false'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Click trigger opens Calendar dropdown below</p>
            <p>• Escape key or click outside closes the dropdown</p>
            <p>• Display format is YYYY-MM-DD</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'file-browser',
    label: 'FileBrowser',
    layer: 'l5',
    type: 'interactive',
    tags: ['file', 'folder', 'explorer', 'table'],
    defaultConfig: { showFolders: true, fileCount: '3' },

    stage: ({ config }) => {
      const folders = config.showFolders === true ? [
        { id: '1', name: 'src', type: 'folder' as const },
        { id: '2', name: 'components', type: 'folder' as const },
      ] : []
      const allFiles = [
        { id: '3', name: 'index.ts', type: 'file' as const, size: 1240, modified: '2026-03-15' },
        { id: '4', name: 'app.tsx', type: 'file' as const, size: 3800, modified: '2026-03-20' },
        { id: '5', name: 'README.md', type: 'file' as const, size: 520, modified: '2026-02-10' },
        { id: '6', name: 'styles.css', type: 'file' as const, size: 2100, modified: '2026-03-22' },
        { id: '7', name: 'utils.ts', type: 'file' as const, size: 890, modified: '2026-03-18' },
      ]
      const files = [...folders, ...allFiles.slice(0, Number(config.fileCount))]
      return (
        <div>
          <ImportLine text="import { FileBrowser } from '@golia/gds'" />

          <LivePreview className="!p-4">
            <FileBrowser files={files} onNavigate={() => {}} onSelect={() => {}} />
          </LivePreview>

          <DocSection title="States" columns={2}>
            <DemoCard title="Empty Folder" description="Placeholder when no files" code={`<FileBrowser files={[]} />`}>
              <FileBrowser files={[]} onNavigate={() => {}} onSelect={() => {}} />
            </DemoCard>
            <DemoCard title="Mixed Content" description="Folders sort above files" code={`files={[{ type: 'folder', ... }, { type: 'file', ... }]}`}>
              <FileBrowser
                files={[
                  { id: '1', name: 'src', type: 'folder' },
                  { id: '2', name: 'index.ts', type: 'file', size: 1240, modified: '2026-03-15' },
                ]}
                onNavigate={() => {}}
                onSelect={() => {}}
              />
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="files" type="pills" value={config.fileCount} options={['1', '2', '3', '4', '5']} onChange={v => setConfig('fileCount', v)} />
        <Ctrl label="folders" type="check" value={config.showFolders} onChange={v => setConfig('showFolders', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { FileBrowser } from '@golia/gds'", '']
      lines.push('<FileBrowser')
      lines.push('  files={files}')
      lines.push('  onNavigate={(id) => navigate(id)}')
      lines.push('  onSelect={(id) => select(id)}')
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['files', 'File/folder node list', 'FileNode[]', '—'],
          ['onNavigate', 'Folder click callback', '(id: string) => void', '—'],
          ['onSelect', 'File click callback', '(id: string) => void', '—'],
          ['selected', 'Highlighted file id', 'string', '—'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">FileNode</div>
          <DocTable rows={[
            ['id', 'Unique identifier', 'string', '—'],
            ['name', 'Display name', 'string', '—'],
            ['type', 'Node kind', "'file' | 'folder'", '—'],
            ['size', 'File size in bytes', 'number', '—'],
            ['modified', 'Last modified date', 'string', '—'],
            ['icon', 'Custom icon replaces default', 'ReactNode', '—'],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Clicking a folder triggers onNavigate, clicking a file triggers onSelect</p>
            <p>• File sizes auto-format to B/KB/MB</p>
            <p>• Keyboard accessible — Enter to activate rows</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { organismItems }
