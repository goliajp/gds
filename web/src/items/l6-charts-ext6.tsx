import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { ComboChart, SunburstChart, TimelineChart } from '@gds/l6-charts'

import type { DevCenterItem } from '../types'

const comboData = [
  { name: 'Jan', revenue: 400, growth: 24 },
  { name: 'Feb', revenue: 300, growth: 13 },
  { name: 'Mar', revenue: 500, growth: 38 },
  { name: 'Apr', revenue: 280, growth: 20 },
  { name: 'May', revenue: 590, growth: 48 },
  { name: 'Jun', revenue: 320, growth: 28 },
]

const sunburstData = {
  name: 'Company',
  children: [
    {
      name: 'Engineering',
      children: [
        { name: 'Frontend', value: 30 },
        { name: 'Backend', value: 25 },
        { name: 'Infra', value: 15 },
      ],
    },
    {
      name: 'Design',
      children: [
        { name: 'Product', value: 12 },
        { name: 'Brand', value: 8 },
      ],
    },
    { name: 'Sales', value: 20 },
  ],
}

const timelineEvents = [
  { date: '2025-01-15', label: 'Alpha' },
  { date: '2025-03-20', label: 'Beta' },
  { date: '2025-06-01', label: 'GA' },
  { date: '2025-09-10', label: 'v2.0' },
  { date: '2025-12-01', label: 'v3.0' },
]

const chartItemsExt6: DevCenterItem[] = [
  {
    id: 'combo-chart',
    label: 'ComboChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'combo', 'bar', 'line', 'composed', 'recharts'],
    defaultConfig: { height: 300, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { ComboChart } from '@goliapkg/gds'" />
        <LivePreview>
          <ComboChart
            barKey="revenue"
            data={comboData}
            height={config.height}
            lineKey="growth"
            glass={config.glass}
          />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['data', 'Record<string, unknown>[]', '—', 'Chart data array'],
              ['barKey', 'string', '—', 'Key for bar series'],
              ['lineKey', 'string', '—', 'Key for line series'],
              ['xKey', 'string', "'name'", 'Key for x-axis'],
              ['barColor', 'string', 'var(--gds-accent)', 'Bar fill color'],
              ['lineColor', 'string', 'var(--gds-success)', 'Line stroke color'],
              ['height', 'number', '300', 'Chart height in px'],
              ['glass', 'boolean', 'false', 'Glass material container'],
              ['className', 'string', '—', 'Additional CSS classes'],
            ]}
          />
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="height" min={200} max={600} onChange={(v) => setConfig('height', v)} type="number" value={config.height} />
        <Ctrl label="glass" onChange={(v) => setConfig('glass', v)} type="check" value={config.glass} />
      </>
    ),

    code: () => {
      const lines = ["import { ComboChart } from '@goliapkg/gds'"]
      lines.push('')
      lines.push('const data = [')
      lines.push("  { name: 'Jan', revenue: 400, growth: 24 },")
      lines.push("  { name: 'Feb', revenue: 300, growth: 13 },")
      lines.push(']')
      lines.push('')
      lines.push('<ComboChart data={data} barKey="revenue" lineKey="growth" />')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['data', 'Data array', 'Record<string, unknown>[]', '—'],
            ['barKey', 'Bar series key', 'string', '—'],
            ['lineKey', 'Line series key', 'string', '—'],
            ['height', 'Chart height', 'number', '300'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Combines bar and line on same axes via Recharts ComposedChart</p>
            <p>• Useful for comparing volume (bars) with trend (line)</p>
            <p>• Includes legend and tooltip by default</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'sunburst-chart',
    label: 'SunburstChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'sunburst', 'hierarchy', 'tree', 'ring', 'svg'],
    defaultConfig: { width: 300, height: 300, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { SunburstChart } from '@goliapkg/gds'" />
        <LivePreview>
          <SunburstChart
            data={sunburstData}
            width={config.width}
            height={config.height}
            glass={config.glass}
          />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['data', 'SunburstNode', '—', 'Root node with children'],
              ['width', 'number', '300', 'SVG width in px'],
              ['height', 'number', '300', 'SVG height in px'],
              ['glass', 'boolean', 'false', 'Glass material container'],
              ['className', 'string', '—', 'Additional CSS classes'],
            ]}
          />
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="width" min={200} max={500} onChange={(v) => setConfig('width', v)} type="number" value={config.width} />
        <Ctrl label="height" min={200} max={500} onChange={(v) => setConfig('height', v)} type="number" value={config.height} />
        <Ctrl label="glass" onChange={(v) => setConfig('glass', v)} type="check" value={config.glass} />
      </>
    ),

    code: () => {
      const lines = ["import { SunburstChart } from '@goliapkg/gds'"]
      lines.push('')
      lines.push('const data = {')
      lines.push("  name: 'Root',")
      lines.push('  children: [')
      lines.push("    { name: 'A', value: 30 },")
      lines.push("    { name: 'B', value: 20 },")
      lines.push('  ],')
      lines.push('}')
      lines.push('')
      lines.push('<SunburstChart data={data} />')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['data', 'Root node', '{ name, value?, children? }', '—'],
            ['width', 'SVG width', 'number', '300'],
            ['height', 'SVG height', 'number', '300'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Pure SVG — no Recharts dependency</p>
            <p>• Recursive layout: concentric rings for each depth level</p>
            <p>• Palette colors based on depth and index</p>
            <p>• Center label shows root node name</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'timeline-chart',
    label: 'TimelineChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'timeline', 'events', 'time', 'horizontal', 'svg'],
    defaultConfig: { width: 600, height: 120, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { TimelineChart } from '@goliapkg/gds'" />
        <LivePreview>
          <TimelineChart
            events={timelineEvents}
            width={config.width}
            height={config.height}
            glass={config.glass}
          />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['events', '{ date, label, color? }[]', '—', 'Timeline events'],
              ['width', 'number', '600', 'SVG width in px'],
              ['height', 'number', '120', 'SVG height in px'],
              ['glass', 'boolean', 'false', 'Glass material container'],
              ['className', 'string', '—', 'Additional CSS classes'],
            ]}
          />
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="width" min={300} max={1000} onChange={(v) => setConfig('width', v)} type="number" value={config.width} />
        <Ctrl label="height" min={80} max={200} onChange={(v) => setConfig('height', v)} type="number" value={config.height} />
        <Ctrl label="glass" onChange={(v) => setConfig('glass', v)} type="check" value={config.glass} />
      </>
    ),

    code: () => {
      const lines = ["import { TimelineChart } from '@goliapkg/gds'"]
      lines.push('')
      lines.push('const events = [')
      lines.push("  { date: '2025-01-15', label: 'Alpha' },")
      lines.push("  { date: '2025-06-01', label: 'GA' },")
      lines.push(']')
      lines.push('')
      lines.push('<TimelineChart events={events} />')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['events', 'Event list', '{ date: string | Date, label: string, color?: string }[]', '—'],
            ['width', 'SVG width', 'number', '600'],
            ['height', 'SVG height', 'number', '120'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Pure SVG horizontal timeline</p>
            <p>• Events positioned by date on a time axis</p>
            <p>• Labels alternate above and below the line</p>
            <p>• Supports custom colors per event</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { chartItemsExt6 }
