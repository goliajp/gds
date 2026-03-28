import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { ChordDiagram, StreamChart, ViolinPlot } from '@gds/l6-charts'

import type { DevCenterItem } from '../types'

const streamData = [
  { name: 'Jan', frontend: 40, backend: 30, infra: 20 },
  { name: 'Feb', frontend: 35, backend: 40, infra: 25 },
  { name: 'Mar', frontend: 50, backend: 35, infra: 15 },
  { name: 'Apr', frontend: 45, backend: 45, infra: 30 },
  { name: 'May', frontend: 60, backend: 50, infra: 20 },
  { name: 'Jun', frontend: 55, backend: 40, infra: 35 },
]

const chordMatrix = [
  [0, 20, 10, 5],
  [20, 0, 15, 8],
  [10, 15, 0, 12],
  [5, 8, 12, 0],
]
const chordLabels = ['Eng', 'Design', 'Sales', 'Ops']

const violinData = [
  { label: 'Team A', values: [2, 3, 4, 4, 5, 5, 5, 6, 6, 7, 8, 9, 12] },
  { label: 'Team B', values: [1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15] },
  { label: 'Team C', values: [4, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 9] },
]

const chartItemsExt7: DevCenterItem[] = [
  {
    id: 'stream-chart',
    label: 'StreamChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'stream', 'stacked', 'area', 'recharts'],
    defaultConfig: { height: 300, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { StreamChart } from '@goliapkg/gds'" />
        <LivePreview>
          <StreamChart
            data={streamData}
            keys={['frontend', 'backend', 'infra']}
            height={config.height}
            glass={config.glass}
          />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['data', 'Record<string, unknown>[]', '—', 'Chart data array'],
              ['keys', 'string[]', '—', 'Data keys for each stream layer'],
              ['xKey', 'string', "'name'", 'Key for x-axis'],
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
      const lines = ["import { StreamChart } from '@goliapkg/gds'"]
      lines.push('')
      lines.push('const data = [')
      lines.push("  { name: 'Jan', frontend: 40, backend: 30 },")
      lines.push("  { name: 'Feb', frontend: 35, backend: 40 },")
      lines.push(']')
      lines.push('')
      lines.push("<StreamChart data={data} keys={['frontend', 'backend']} />")
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['data', 'Data array', 'Record<string, unknown>[]', '—'],
            ['keys', 'Stream layers', 'string[]', '—'],
            ['height', 'Chart height', 'number', '300'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Stacked area chart with organic monotone curves</p>
            <p>• Uses Recharts AreaChart with stackId for layering</p>
            <p>• Colors from palette tokens (palette-0 through palette-9)</p>
            <p>• Semi-transparent fills (0.6 opacity) for depth</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'chord-diagram',
    label: 'ChordDiagram',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'chord', 'relationship', 'matrix', 'svg'],
    defaultConfig: { width: 300, height: 300, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { ChordDiagram } from '@goliapkg/gds'" />
        <LivePreview>
          <ChordDiagram
            matrix={chordMatrix}
            labels={chordLabels}
            width={config.width}
            height={config.height}
            glass={config.glass}
          />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['matrix', 'number[][]', '—', 'NxN adjacency matrix'],
              ['labels', 'string[]', '—', 'Entity labels'],
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
      const lines = ["import { ChordDiagram } from '@goliapkg/gds'"]
      lines.push('')
      lines.push('const matrix = [')
      lines.push('  [0, 20, 10],')
      lines.push('  [20, 0, 15],')
      lines.push('  [10, 15, 0],')
      lines.push(']')
      lines.push('')
      lines.push("<ChordDiagram matrix={matrix} labels={['A', 'B', 'C']} />")
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['matrix', 'Adjacency matrix', 'number[][]', '—'],
            ['labels', 'Entity labels', 'string[]', '—'],
            ['width', 'SVG width', 'number', '300'],
            ['height', 'SVG height', 'number', '300'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Pure SVG — no external chart library</p>
            <p>• Circular layout with proportional arc segments</p>
            <p>• Bezier ribbons connect related entities</p>
            <p>• Colors from palette tokens</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'violin-plot',
    label: 'ViolinPlot',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'violin', 'distribution', 'density', 'statistics', 'svg'],
    defaultConfig: { width: 400, height: 300, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { ViolinPlot } from '@goliapkg/gds'" />
        <LivePreview>
          <ViolinPlot
            data={violinData}
            width={config.width}
            height={config.height}
            glass={config.glass}
          />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['data', '{ label: string, values: number[] }[]', '—', 'Groups with value arrays'],
              ['width', 'number', '400', 'SVG width in px'],
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
        <Ctrl label="width" min={200} max={600} onChange={(v) => setConfig('width', v)} type="number" value={config.width} />
        <Ctrl label="height" min={200} max={500} onChange={(v) => setConfig('height', v)} type="number" value={config.height} />
        <Ctrl label="glass" onChange={(v) => setConfig('glass', v)} type="check" value={config.glass} />
      </>
    ),

    code: () => {
      const lines = ["import { ViolinPlot } from '@goliapkg/gds'"]
      lines.push('')
      lines.push('const data = [')
      lines.push("  { label: 'Team A', values: [2, 3, 4, 5, 5, 6, 7, 8] },")
      lines.push("  { label: 'Team B', values: [1, 3, 5, 7, 9, 11, 13] },")
      lines.push(']')
      lines.push('')
      lines.push('<ViolinPlot data={data} />')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['data', 'Group data', '{ label, values }[]', '—'],
            ['width', 'SVG width', 'number', '400'],
            ['height', 'SVG height', 'number', '300'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Pure SVG — histogram-based kernel density estimation</p>
            <p>• Mirrored density curves create violin shape</p>
            <p>• Median dot shown at center of each violin</p>
            <p>• Similar to BoxPlot but shows full distribution shape</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { chartItemsExt7 }
