import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { BoxPlot, FlowChart, Histogram } from '@gds/l6-charts'

import type { DevCenterItem } from '../types'

const histogramData = Array.from({ length: 200 }, () => Math.random() * 100)

const boxPlotData = [
  { label: 'Group A', values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
  { label: 'Group B', values: [5, 10, 15, 20, 25, 30, 35] },
  { label: 'Group C', values: [1, 3, 7, 9, 11, 15, 22, 28] },
]

const flowNodes = [
  { id: 'start', label: 'Start', type: 'start' as const },
  { id: 'process', label: 'Process', type: 'process' as const },
  { id: 'decide', label: 'OK?', type: 'decision' as const },
  { id: 'end', label: 'End', type: 'end' as const },
]

const flowEdges = [
  { from: 'start', to: 'process' },
  { from: 'process', to: 'decide', label: 'next' },
  { from: 'decide', to: 'end', label: 'yes' },
]

const chartItemsExt5: DevCenterItem[] = [
  {
    id: 'histogram',
    label: 'Histogram',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'histogram', 'frequency', 'distribution', 'bins'],
    defaultConfig: { bins: 10, height: 300, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Histogram } from '@goliapkg/gds'" />
        <LivePreview>
          <Histogram data={histogramData} bins={config.bins} height={config.height} glass={config.glass} />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['data', 'number[]', '—', 'Raw data values'],
              ['bins', 'number', '10', 'Number of bins'],
              ['height', 'number', '300', 'Chart height in px'],
              ['color', 'string', 'var(--gds-accent)', 'Bar fill color'],
              ['glass', 'boolean', 'false', 'Glass material container'],
              ['className', 'string', '—', 'Additional CSS classes'],
            ]}
          />
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="bins" min={3} max={30} onChange={(v) => setConfig('bins', v)} type="number" value={config.bins} />
        <Ctrl label="height" min={200} max={600} onChange={(v) => setConfig('height', v)} type="number" value={config.height} />
        <Ctrl label="glass" onChange={(v) => setConfig('glass', v)} type="check" value={config.glass} />
      </>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['data', 'Raw values', 'number[]', '—'],
            ['bins', 'Bin count', 'number', '10'],
            ['height', 'Chart height', 'number', '300'],
            ['color', 'Bar color', 'string', 'var(--gds-accent)'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Computes frequency bins from raw numeric data</p>
            <p>• Uses Recharts BarChart internally</p>
            <p>• Adjust bin count based on data distribution</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'box-plot',
    label: 'BoxPlot',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'box', 'whisker', 'quartile', 'statistics'],
    defaultConfig: { width: 400, height: 300, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { BoxPlot } from '@goliapkg/gds'" />
        <LivePreview>
          <BoxPlot data={boxPlotData} width={config.width} height={config.height} glass={config.glass} />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['data', '{ label, values }[]', '—', 'Groups of numeric values'],
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
        <Ctrl label="width" min={200} max={800} onChange={(v) => setConfig('width', v)} type="number" value={config.width} />
        <Ctrl label="height" min={200} max={600} onChange={(v) => setConfig('height', v)} type="number" value={config.height} />
        <Ctrl label="glass" onChange={(v) => setConfig('glass', v)} type="check" value={config.glass} />
      </>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['data', 'Groups', '{ label: string; values: number[] }[]', '—'],
            ['width', 'SVG width', 'number', '400'],
            ['height', 'SVG height', 'number', '300'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Pure SVG — no Recharts dependency</p>
            <p>• Shows Q1, median, Q3, and 1.5 IQR whiskers</p>
            <p>• Palette colors per group</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'flow-chart',
    label: 'FlowChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'flow', 'diagram', 'process', 'nodes', 'edges'],
    defaultConfig: { width: 600, height: 200, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { FlowChart } from '@goliapkg/gds'" />
        <LivePreview>
          <FlowChart nodes={flowNodes} edges={flowEdges} width={config.width} height={config.height} glass={config.glass} />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['nodes', 'FlowNode[]', '—', 'Nodes with id, label, type'],
              ['edges', 'FlowEdge[]', '—', 'Edges with from, to, label'],
              ['width', 'number', '600', 'SVG width in px'],
              ['height', 'number', '200', 'SVG height in px'],
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
        <Ctrl label="height" min={100} max={500} onChange={(v) => setConfig('height', v)} type="number" value={config.height} />
        <Ctrl label="glass" onChange={(v) => setConfig('glass', v)} type="check" value={config.glass} />
      </>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['nodes', 'Node list', "{ id, label, type?: 'start'|'end'|'process'|'decision' }[]", '—'],
            ['edges', 'Edge list', '{ from, to, label? }[]', '—'],
            ['width', 'SVG width', 'number', '600'],
            ['height', 'SVG height', 'number', '200'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Left-to-right layout with equal spacing</p>
            <p>• Node shapes: rounded rect (start/end), rect (process), diamond (decision)</p>
            <p>• Edges with arrowheads and optional labels</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { chartItemsExt5 }
