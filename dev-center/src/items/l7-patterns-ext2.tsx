import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { KPIDashboard } from '@gds/l7-patterns'

import type { DevCenterItem } from '../types'

const patternItemsExt2: DevCenterItem[] = []

const sampleMetrics = [
  { title: 'Revenue', value: '$42.5k', change: 12 },
  { title: 'Users', value: '1,284', change: 8 },
  { title: 'Orders', value: '356', change: -3 },
  { title: 'Conversion', value: '3.2%', change: 0.5 },
]

// kpi-dashboard
const kpiDashboardItem: DevCenterItem = {
  id: 'kpi-dashboard',
  label: 'KPIDashboard',
  layer: 'l7',
  type: 'interactive',
  tags: ['kpi', 'dashboard', 'metrics', 'overview', 'analytics'],
  defaultConfig: { title: 'Dashboard Overview', showChart: true, showTable: true, glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { KPIDashboard } from '@goliapkg/gds'" />

      <LivePreview className="block">
        <KPIDashboard
          chart={
            config.showChart
              ? (
                  <div className="flex h-48 items-center justify-center text-sm text-fg-muted">
                    Chart placeholder — pass any ReactNode as chart prop
                  </div>
                )
              : undefined
          }
          glass={config.glass}
          metrics={sampleMetrics}
          table={
            config.showTable
              ? (
                  <div className="flex h-32 items-center justify-center text-sm text-fg-muted">
                    Table placeholder — pass any ReactNode as table prop
                  </div>
                )
              : undefined
          }
          title={config.title}
        />
      </LivePreview>

      <DocSection title="API">
        <DocTable
          rows={[
            ['title', 'string', '—', 'Dashboard heading'],
            ['metrics', '{ title, value, change? }[]', '—', 'Array of KPI metrics'],
            ['chart', 'ReactNode', '—', 'Chart element slot'],
            ['table', 'ReactNode', '—', 'Table element slot'],
            ['glass', 'boolean', 'false', 'Apply glass material to containers'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="showChart" value={config.showChart} onChange={(v) => setConfig('showChart', v)} />
      <Ctrl type="check" label="showTable" value={config.showTable} onChange={(v) => setConfig('showTable', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),
}
patternItemsExt2.push(kpiDashboardItem)

export { patternItemsExt2 }
