import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { AvatarList, ResponsiveTable } from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

const organismItemsExt13: DevCenterItem[] = []

const sampleUsers = [
  { name: 'Alice Johnson', role: 'Senior Engineer', status: 'online' as const },
  { name: 'Bob Smith', role: 'Designer', status: 'away' as const },
  { name: 'Charlie Brown', role: 'PM', status: 'busy' as const },
  { name: 'Diana Prince', role: 'DevOps', status: 'offline' as const },
]

const avatarListItem: DevCenterItem = {
  id: 'avatar-list',
  label: 'AvatarList',
  layer: 'l5',
  type: 'interactive',
  tags: ['avatar', 'list', 'user', 'member', 'sidebar', 'organism'],
  defaultConfig: { compact: false, glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { AvatarList } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-64">
          <AvatarList
            users={sampleUsers}
            compact={config.compact}
            glass={config.glass}
            onSelect={(name) => alert(`Selected: ${name}`)}
          />
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['users', '{ name, role?, src?, status? }[]', '—', 'User list data'],
          ['onSelect', '(name: string) => void', '—', 'Click handler per user row'],
          ['compact', 'boolean', 'false', 'Hide role, show only name'],
          ['glass', 'boolean', 'false', 'Glass surface style'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="compact" value={config.compact} onChange={(v) => setConfig('compact', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { AvatarList } from '@goliapkg/gds'\n\n<AvatarList\n  users={[\n    { name: 'Alice', role: 'Engineer', status: 'online' },\n    { name: 'Bob', role: 'Designer', status: 'away' },\n  ]}\n  onSelect={(name) => console.log(name)}${config.compact ? '\n  compact' : ''}${config.glass ? '\n  glass' : ''}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['users', 'User list data', '{ name, role?, src?, status? }[]', '—'],
        ['onSelect', 'Click handler per user row', '(name: string) => void', '—'],
        ['compact', 'Hide role, show only name', 'boolean', 'false'],
        ['glass', 'Glass surface style', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Each user row shows avatar (initials or image), name, and optional role</p>
          <p>• Status indicator (online/away/busy/offline) shown as colored dot</p>
          <p>• Compact mode hides role text for dense sidebars</p>
        </div>
      </div>
    </div>
  ),
}
organismItemsExt13.push(avatarListItem)

const tableCols = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
]

const tableData = [
  { name: 'Alice', role: 'Engineer', status: 'Active' },
  { name: 'Bob', role: 'Designer', status: 'Away' },
  { name: 'Charlie', role: 'PM', status: 'Busy' },
]

const responsiveTableItem: DevCenterItem = {
  id: 'responsive-table',
  label: 'ResponsiveTable',
  layer: 'l5',
  type: 'interactive',
  tags: ['table', 'responsive', 'mobile', 'card', 'organism'],
  defaultConfig: { glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ResponsiveTable } from '@goliapkg/gds'" />
      <LivePreview>
        <ResponsiveTable
          columns={tableCols}
          data={tableData}
          glass={config.glass}
        />
      </LivePreview>

      <DocSection title="Behavior">
        <p className="gds-text-body text-fg-muted">
          Desktop (lg+): renders as a standard Table. Mobile (&lt; lg): transforms into card list with label-value pairs.
        </p>
      </DocSection>

      <DocSection title="API">
        <DocTable rows={[
          ['columns', '{ key: string, header: string }[]', '—', 'Column definitions'],
          ['data', 'Record<string, unknown>[]', '—', 'Row data array'],
          ['glass', 'boolean', 'false', 'Glass surface style'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { ResponsiveTable } from '@goliapkg/gds'\n\n<ResponsiveTable\n  columns={[\n    { key: 'name', header: 'Name' },\n    { key: 'role', header: 'Role' },\n  ]}\n  data={[\n    { name: 'Alice', role: 'Engineer' },\n    { name: 'Bob', role: 'Designer' },\n  ]}${config.glass ? '\n  glass' : ''}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['columns', 'Column definitions', '{ key: string, header: string }[]', '—'],
        ['data', 'Row data array', 'Record<string, unknown>[]', '—'],
        ['glass', 'Glass surface style', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Desktop (lg+): renders as a standard table with headers</p>
          <p>• Mobile (&lt; lg): transforms into card list with label-value pairs</p>
          <p>• Column key maps to data object properties automatically</p>
        </div>
      </div>
    </div>
  ),
}
organismItemsExt13.push(responsiveTableItem)

export { organismItemsExt13 }
