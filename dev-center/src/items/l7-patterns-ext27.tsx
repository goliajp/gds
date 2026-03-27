import { AnalyticsDashboard } from '@gds/l7-patterns'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt27: DevCenterItem[] = []

const analyticsDashboardItem: DevCenterItem = {
  id: 'analytics-dashboard',
  label: 'AnalyticsDashboard',
  layer: 'l7',
  type: 'interactive',
  tags: ['analytics', 'dashboard', 'layout', 'metrics', 'charts', 'pattern'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { AnalyticsDashboard } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-full">
          <AnalyticsDashboard
            metrics={
              <div className="flex gap-3">
                <div className="rounded-lg bg-surface p-3 text-center"><div className="text-lg font-bold text-fg">1,234</div><div className="text-xs text-fg-muted">Users</div></div>
                <div className="rounded-lg bg-surface p-3 text-center"><div className="text-lg font-bold text-success">98.5%</div><div className="text-xs text-fg-muted">Uptime</div></div>
                <div className="rounded-lg bg-surface p-3 text-center"><div className="text-lg font-bold text-fg">42ms</div><div className="text-xs text-fg-muted">Latency</div></div>
              </div>
            }
            charts={<div className="h-24 rounded-lg border border-border bg-surface/50 p-3 text-xs text-fg-muted">Chart placeholder</div>}
            data={<div className="rounded-lg border border-border bg-surface/50 p-3 text-xs text-fg-muted">Data table placeholder</div>}
          />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { AnalyticsDashboard } from '@goliapkg/gds'\n\n<AnalyticsDashboard\n  metrics={<MetricRow ... />}\n  charts={<LineChart ... />}\n  data={<DataTable ... />}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['metrics', 'Metrics row content (top)', 'ReactNode', '—'],
        ['charts', 'Charts section content (middle)', 'ReactNode', '—'],
        ['data', 'Data table content (bottom)', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt27.push(analyticsDashboardItem)

export { patternItemsExt27 }
