import { KvTable, MetricRow, StatusBarComponent } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsV: DevCenterItem[] = []

const kvTableItem: DevCenterItem = {
  id: 'kv-table',
  label: 'KvTable',
  layer: 'l4',
  type: 'interactive',
  tags: ['key-value', 'table', 'details', 'entity', 'molecule'],
  defaultConfig: { columns: '1', striped: 'false' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { KvTable } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-80">
          <KvTable
            items={[
              { key: 'Name', value: 'Tanaka Taro' },
              { key: 'Email', value: 'taro@golia.jp', copyable: true },
              { key: 'Department', value: 'Engineering' },
              { key: 'Location', value: 'Tokyo' },
            ]}
            columns={Number(config.columns) as 1 | 2}
            striped={config.striped === 'true'}
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="columns" value={config.columns} options={['1', '2']} onChange={(v) => setConfig('columns', v)} />
      <Ctrl type="pills" label="striped" value={config.striped} options={['false', 'true']} onChange={(v) => setConfig('striped', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { KvTable } from '@goliapkg/gds'\n\n<KvTable\n  items={[\n    { key: 'Name', value: 'Tanaka Taro' },\n    { key: 'Email', value: 'taro@golia.jp', copyable: true },\n  ]}\n  columns={${config.columns}}\n  ${config.striped === 'true' ? 'striped\n' : ''}/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['items', 'Array of key-value pairs', '{ key: string, value: ReactNode, copyable?: boolean }[]', '—'],
        ['columns', 'Layout columns', '1 | 2', '1'],
        ['striped', 'Alternating row backgrounds', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsV.push(kvTableItem)

const statusBarComponentItem: DevCenterItem = {
  id: 'status-bar-component',
  label: 'StatusBarComponent',
  layer: 'l4',
  type: 'interactive',
  tags: ['status', 'bar', 'footer', 'environment', 'molecule'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { StatusBarComponent } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-full">
          <StatusBarComponent items={['production', 'v2.4.1', 'admin@golia.jp', 'API: healthy']} />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { StatusBarComponent } from '@goliapkg/gds'\n\n<StatusBarComponent\n  items={['production', 'v2.4.1', 'admin@golia.jp', 'API: healthy']}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['items', 'Array of status items to display', 'ReactNode[]', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsV.push(statusBarComponentItem)

const metricRowItem: DevCenterItem = {
  id: 'metric-row',
  label: 'MetricRow',
  layer: 'l4',
  type: 'interactive',
  tags: ['metric', 'row', 'stats', 'monitoring', 'devops', 'molecule'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { MetricRow } from '@goliapkg/gds'" />
      <LivePreview>
        <MetricRow
          metrics={[
            { label: 'CPU', value: '3%', variant: 'success' },
            { label: 'MEM', value: '45%' },
            { label: 'DISK', value: '78%', variant: 'warning' },
            { label: 'NET', value: '12', unit: 'Mbps' },
          ]}
        />
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { MetricRow } from '@goliapkg/gds'\n\n<MetricRow\n  metrics={[\n    { label: 'CPU', value: '3%', variant: 'success' },\n    { label: 'MEM', value: '45%' },\n    { label: 'DISK', value: '78%', variant: 'warning' },\n    { label: 'NET', value: '12', unit: 'Mbps' },\n  ]}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['metrics', 'Array of metric objects', 'MetricRowMetric[]', '—'],
        ['metrics[].label', 'Metric label', 'string', '—'],
        ['metrics[].value', 'Metric value', 'string | number', '—'],
        ['metrics[].unit', 'Optional unit suffix', 'string', '—'],
        ['metrics[].variant', 'Color variant', "'default' | 'success' | 'warning' | 'danger'", "'default'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsV.push(metricRowItem)

export { moleculeItemsV }
