import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { RadialBarChart, WaffleChart } from '@gds/l6-charts'

import type { DevCenterItem } from '../types'

const waffleData = [
  { label: 'Chrome', value: 65 },
  { label: 'Firefox', value: 15 },
  { label: 'Safari', value: 12 },
  { label: 'Other', value: 8 },
]

const radialData = [
  { name: 'Sales', value: 80 },
  { name: 'Marketing', value: 65 },
  { name: 'Engineering', value: 90 },
  { name: 'Design', value: 50 },
]

const chartItemsExt4: DevCenterItem[] = [
  {
    id: 'waffle-chart',
    label: 'WaffleChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'waffle', 'grid', 'percentage', 'proportion'],
    defaultConfig: { size: 200, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { WaffleChart } from '@goliapkg/gds'" />
        <LivePreview>
          <WaffleChart data={waffleData} size={config.size} glass={config.glass} />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['data', '{ label, value, color? }[]', '—', 'Segments (values = percentages)'],
              ['size', 'number', '200', 'Grid size in px'],
              ['glass', 'boolean', 'false', 'Glass material container'],
              ['className', 'string', '—', 'Additional CSS classes'],
            ]}
          />
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="size" min={100} max={400} onChange={(v) => setConfig('size', v)} type="number" value={config.size} />
        <Ctrl label="glass" onChange={(v) => setConfig('glass', v)} type="check" value={config.glass} />
      </>
    ),

    code: () => {
      const lines = ["import { WaffleChart } from '@goliapkg/gds'"]
      lines.push('')
      lines.push('const data = [')
      lines.push("  { label: 'Chrome', value: 65 },")
      lines.push("  { label: 'Firefox', value: 15 },")
      lines.push(']')
      lines.push('')
      lines.push('<WaffleChart data={data} />')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['data', 'Segment array', '{ label: string; value: number; color?: string }[]', '—'],
            ['size', 'Grid size', 'number', '200'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• 10x10 grid = 100 cells representing percentages</p>
            <p>• Values should sum to ~100</p>
            <p>• Colors from palette tokens if not specified</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'radial-bar-chart',
    label: 'RadialBarChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'radial', 'bar', 'circular', 'ring'],
    defaultConfig: { height: 300, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { RadialBarChart } from '@goliapkg/gds'" />
        <LivePreview>
          <RadialBarChart data={radialData} height={config.height} glass={config.glass} />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['data', '{ name, value, fill? }[]', '—', 'Ring data items'],
              ['height', 'number', '300', 'Chart height in px'],
              ['innerRadius', 'string', "'20%'", 'Inner radius of the chart'],
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
      const lines = ["import { RadialBarChart } from '@goliapkg/gds'"]
      lines.push('')
      lines.push('const data = [')
      lines.push("  { name: 'Sales', value: 80 },")
      lines.push("  { name: 'Marketing', value: 65 },")
      lines.push(']')
      lines.push('')
      lines.push('<RadialBarChart data={data} />')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['data', 'Ring data', '{ name: string; value: number; fill?: string }[]', '—'],
            ['height', 'Chart height', 'number', '300'],
            ['innerRadius', 'Inner radius', 'string', "'20%'"],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Each data item renders as a concentric ring</p>
            <p>• Uses Recharts RadialBarChart internally</p>
            <p>• Colors from palette tokens if fill not provided</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { chartItemsExt4 }
