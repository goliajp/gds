import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { CalendarHeatmap } from '@gds/l6-charts'

import type { DevCenterItem } from '../types'

// generate sample heatmap data
function generateHeatmapData(): { date: string; value: number }[] {
  const result: { date: string; value: number }[] = []
  const end = new Date()
  const start = new Date(end.getFullYear() - 1, end.getMonth(), end.getDate() + 1)
  const cur = new Date(start)
  while (cur <= end) {
    const dateStr = cur.toISOString().slice(0, 10)
    // weekdays more active, some random variation
    const dayOfWeek = cur.getDay()
    const isWeekday = dayOfWeek > 0 && dayOfWeek < 6
    const base = isWeekday ? 3 : 1
    const value = Math.random() < 0.3 ? 0 : Math.floor(Math.random() * base * 4)
    result.push({ date: dateStr, value })
    cur.setDate(cur.getDate() + 1)
  }
  return result
}

const sampleData = generateHeatmapData()

const chartItemsExt9: DevCenterItem[] = [
  {
    id: 'calendar-heatmap',
    label: 'CalendarHeatmap',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'heatmap', 'calendar', 'contribution', 'github', 'svg'],
    defaultConfig: { cellSize: 12, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { CalendarHeatmap } from '@golia/gds'" />
        <LivePreview className="block overflow-x-auto">
          <CalendarHeatmap
            data={sampleData}
            cellSize={config.cellSize}
            glass={config.glass}
          />
        </LivePreview>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="cellSize" min={8} max={20} onChange={(v) => setConfig('cellSize', v)} type="number" value={config.cellSize} />
        <Ctrl label="glass" onChange={(v) => setConfig('glass', v)} type="check" value={config.glass} />
      </>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['data', 'Daily values', '{ date: string, value: number }[]', '—'],
            ['startDate', 'Start date (YYYY-MM-DD)', 'string', '1 year ago'],
            ['endDate', 'End date (YYYY-MM-DD)', 'string', 'today'],
            ['colorScale', 'Colors from low to high', 'string[]', '5 levels'],
            ['cellSize', 'Cell size in px', 'number', '12'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Pure SVG — no chart library dependency</p>
            <p>• 7 rows (Mon-Sun) x ~52 columns (weeks)</p>
            <p>• Color intensity based on value quantiles</p>
            <p>• Hover tooltip shows date and value</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { chartItemsExt9 }
