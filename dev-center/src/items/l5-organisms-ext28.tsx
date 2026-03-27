import { AuditLog, HeatmapTable } from '@gds/l5-organisms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt28: DevCenterItem[] = []

const sampleEntries = [
  { id: '1', timestamp: '09:00', user: 'Alice', action: 'created', target: 'Invoice #42', variant: 'success' as const },
  { id: '2', timestamp: '09:15', user: 'Bob', action: 'updated', target: 'Employee record' },
  { id: '3', timestamp: '09:30', user: 'Carol', action: 'deleted', target: 'Draft document', variant: 'danger' as const },
  { id: '4', timestamp: '10:00', user: 'Dave', action: 'approved', target: 'Expense report', variant: 'success' as const },
  { id: '5', timestamp: '10:30', user: 'Eve', action: 'rejected', target: 'Leave request', variant: 'warning' as const },
]

const auditLogItem: DevCenterItem = {
  id: 'audit-log',
  label: 'AuditLog',
  layer: 'l5',
  type: 'interactive',
  tags: ['audit', 'log', 'timeline', 'history', 'activity', 'organism'],
  defaultConfig: { count: '5' },

  stage: ({ config }) => {
    const count = Number(config.count)
    return (
      <div>
        <ImportLine text="import { AuditLog } from '@golia/gds'" />
        <LivePreview>
          <div className="w-96 rounded-lg border border-border">
            <AuditLog entries={sampleEntries.slice(0, count)} />
          </div>
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="count" value={config.count} options={['2', '3', '5']} onChange={(v) => setConfig('count', v)} />
  ),

  code: () =>
    `import { AuditLog } from '@golia/gds'\n\n<AuditLog entries={[\n  { id: '1', timestamp: '09:00', user: 'Alice', action: 'created', target: 'Invoice' },\n  { id: '2', timestamp: '09:15', user: 'Bob', action: 'updated', variant: 'warning' },\n]} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['entries', 'Array of audit log entries', '{ id, timestamp, user, action, target?, variant? }[]', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt28.push(auditLogItem)

const heatmapHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const heatmapRows = [
  { label: 'Week 1', values: [8, 7, 9, 6, 8] },
  { label: 'Week 2', values: [4, 8, 10, 7, 5] },
  { label: 'Week 3', values: [9, 6, 8, 10, 7] },
  { label: 'Week 4', values: [7, 5, 3, 8, 9] },
]

const heatmapTableItem: DevCenterItem = {
  id: 'heatmap-table',
  label: 'HeatmapTable',
  layer: 'l5',
  type: 'interactive',
  tags: ['heatmap', 'table', 'worktime', 'matrix', 'heat', 'organism'],
  defaultConfig: { rows: '4' },

  stage: ({ config }) => {
    const count = Number(config.rows)
    return (
      <div>
        <ImportLine text="import { HeatmapTable } from '@golia/gds'" />
        <LivePreview>
          <div className="w-80">
            <HeatmapTable headers={heatmapHeaders} rows={heatmapRows.slice(0, count)} />
          </div>
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="rows" value={config.rows} options={['2', '3', '4']} onChange={(v) => setConfig('rows', v)} />
  ),

  code: () =>
    `import { HeatmapTable } from '@golia/gds'\n\n<HeatmapTable\n  headers={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}\n  rows={[\n    { label: 'Week 1', values: [8, 7, 9, 6, 8] },\n    { label: 'Week 2', values: [4, 8, 10, 7, 5] },\n  ]}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['headers', 'Column header labels', 'string[]', '—'],
        ['rows', 'Row data with label and numeric values', '{ label: string; values: number[] }[]', '—'],
        ['maxValue', 'Custom max for heat intensity calculation', 'number', 'auto-detected'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt28.push(heatmapTableItem)

export { organismItemsExt28 }
