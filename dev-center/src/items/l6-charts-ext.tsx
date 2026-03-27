import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import {
  HeatmapChart,
  RadarChart,
  SankeyChart,
  ScatterChart,
  Sparkline,
  TreemapChart,
} from '@gds/l6-charts'

import type { DevCenterItem } from '../types'

const heatmapData = [
  [1, 3, 5, 7, 2],
  [4, 8, 2, 6, 9],
  [3, 1, 7, 4, 5],
  [6, 5, 3, 8, 1],
]

const radarData = [
  { name: 'Speed', value: 80 },
  { name: 'Reliability', value: 90 },
  { name: 'UX', value: 70 },
  { name: 'Security', value: 85 },
  { name: 'Performance', value: 75 },
  { name: 'Scalability', value: 65 },
]

const sankeyNodes = [
  { name: 'Source A' },
  { name: 'Source B' },
  { name: 'Process' },
  { name: 'Output X' },
  { name: 'Output Y' },
]
const sankeyLinks = [
  { source: 0, target: 2, value: 30 },
  { source: 1, target: 2, value: 20 },
  { source: 2, target: 3, value: 35 },
  { source: 2, target: 4, value: 15 },
]

const scatterData = [
  { x: 10, y: 30 }, { x: 20, y: 50 }, { x: 30, y: 40 },
  { x: 40, y: 70 }, { x: 50, y: 60 }, { x: 60, y: 80 },
  { x: 70, y: 55 }, { x: 80, y: 90 }, { x: 90, y: 75 },
]

const sparklineData = [
  { v: 10 }, { v: 25 }, { v: 18 }, { v: 32 }, { v: 28 },
  { v: 42 }, { v: 35 }, { v: 50 }, { v: 45 }, { v: 60 },
]

const treemapData = [
  { name: 'Frontend', value: 400 },
  { name: 'Backend', value: 300 },
  { name: 'DevOps', value: 200 },
  { name: 'Design', value: 150 },
  { name: 'QA', value: 100 },
]

function colorVar(name: string): string {
  if (name === 'accent') return 'var(--gds-accent)'
  if (name === 'success') return 'var(--gds-success, #22c55e)'
  if (name === 'danger') return 'var(--gds-danger, #ef4444)'
  return 'var(--gds-accent)'
}

const chartItemsExt: DevCenterItem[] = [
  {
    id: 'heatmap-chart',
    label: 'HeatmapChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'heatmap', 'matrix', 'density'],
    defaultConfig: { cellSize: 40, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { HeatmapChart } from '@golia/gds'" />
        <LivePreview>
          <HeatmapChart data={heatmapData} xLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']} yLabels={['Q1', 'Q2', 'Q3', 'Q4']} cellSize={config.cellSize} glass={config.glass} />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Labeled grid" description="With axis labels" code={`<HeatmapChart data={grid} xLabels={days} yLabels={quarters} />`}>
            <HeatmapChart data={heatmapData} xLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']} yLabels={['Q1', 'Q2', 'Q3', 'Q4']} cellSize={32} />
          </DemoCard>
          <DemoCard title="Compact" description="Smaller cells, no labels" code={`<HeatmapChart data={grid} cellSize={20} />`}>
            <HeatmapChart data={heatmapData} cellSize={20} />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="cellSize" type="number" value={config.cellSize} min={16} max={64} onChange={v => setConfig('cellSize', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const props = [`data={grid}`, `xLabels={['Mon', 'Tue', 'Wed']}`, `yLabels={['AM', 'PM']}`]
      if (config.cellSize !== 32) props.push(`cellSize={${config.cellSize}}`)
      if (config.glass === true) props.push('glass')
      return `import { HeatmapChart } from '@golia/gds'\n\n<HeatmapChart\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', '2D number array (rows x cols)', 'number[][]', '—'],
          ['xLabels', 'Column header labels', 'string[]', '—'],
          ['yLabels', 'Row header labels', 'string[]', '—'],
          ['colorScale', 'Min/max color hex', '{ min: string; max: string }', '#1e293b / #6366f1'],
          ['cellSize', 'Cell dimension in px', 'number', '32'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Pure CSS — no recharts dependency, lightweight</p>
            <p>• Color interpolation from min to max automatically</p>
            <p>• Hover each cell to see its value via title attribute</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'radar-chart',
    label: 'RadarChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'radar', 'spider', 'skills'],
    defaultConfig: { height: 280, glass: false, color: 'accent' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { RadarChart } from '@golia/gds'" />
        <LivePreview>
          <RadarChart data={radarData} dataKey="value" height={config.height} glass={config.glass} color={colorVar(config.color)} />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Skill radar" description="Multi-axis comparison" code={`<RadarChart data={skills} dataKey="value" />`}>
            <RadarChart data={radarData} dataKey="value" height={200} />
          </DemoCard>
          <DemoCard title="Colored" description="Custom accent color" code={`<RadarChart data={skills} dataKey="value" color="var(--gds-success)" />`}>
            <RadarChart data={radarData} dataKey="value" height={200} color="var(--gds-success, #22c55e)" />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="height" type="number" value={config.height} min={150} max={400} onChange={v => setConfig('height', v)} />
        <Ctrl label="color" type="pills" value={config.color} options={['accent', 'success', 'danger']} onChange={v => setConfig('color', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const props = [`data={skills}`, `dataKey="value"`]
      if (config.height !== 300) props.push(`height={${config.height}}`)
      if (config.glass === true) props.push('glass')
      if (config.color !== 'accent') props.push(`color="var(--gds-${config.color})"`)
      return `import { RadarChart } from '@golia/gds'\n\n<RadarChart\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Chart data array', 'Record<string, unknown>[]', '—'],
          ['dataKey', 'Value field name', 'string', '—'],
          ['angleKey', 'Axis label field', 'string', "'name'"],
          ['height', 'Chart height in px', 'number', '300'],
          ['color', 'Fill and stroke color', 'string', 'var(--gds-accent)'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Best for multi-dimensional comparison (5-8 axes)</p>
            <p>• Fill at 30% opacity for readability</p>
            <p>• Polar grid auto-scales to data range</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'sankey-chart',
    label: 'SankeyChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'sankey', 'flow', 'connection'],
    defaultConfig: { height: 280, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { SankeyChart } from '@golia/gds'" />
        <LivePreview>
          <SankeyChart nodes={sankeyNodes} links={sankeyLinks} height={config.height} glass={config.glass} />
        </LivePreview>
        <DocSection title="Examples" columns={1}>
          <DemoCard title="Flow diagram" description="Source to output with processing node" code={`<SankeyChart\n  nodes={[{ name: 'A' }, { name: 'B' }, { name: 'C' }]}\n  links={[{ source: 0, target: 2, value: 10 }]}\n/>`}>
            <SankeyChart nodes={sankeyNodes} links={sankeyLinks} height={200} />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="height" type="number" value={config.height} min={150} max={400} onChange={v => setConfig('height', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const props = [
        `nodes={[{ name: 'A' }, { name: 'B' }, { name: 'C' }]}`,
        `links={[{ source: 0, target: 2, value: 10 }]}`,
      ]
      if (config.height !== 300) props.push(`height={${config.height}}`)
      if (config.glass === true) props.push('glass')
      return `import { SankeyChart } from '@golia/gds'\n\n<SankeyChart\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['nodes', 'Node definitions', '{ name: string }[]', '—'],
          ['links', 'Connection definitions', '{ source: number; target: number; value: number }[]', '—'],
          ['height', 'Chart height in px', 'number', '300'],
          ['nodePadding', 'Vertical spacing between nodes', 'number', '50'],
          ['nodeWidth', 'Node rectangle width', 'number', '10'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for flow/energy/resource diagrams</p>
            <p>• Source and target reference node indices</p>
            <p>• Link width proportional to value</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'scatter-chart',
    label: 'ScatterChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'scatter', 'plot', 'correlation'],
    defaultConfig: { height: 250, glass: false, color: 'accent' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { ScatterChart } from '@golia/gds'" />
        <LivePreview>
          <ScatterChart data={scatterData} xKey="x" yKey="y" height={config.height} glass={config.glass} color={colorVar(config.color)} />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Correlation plot" description="X vs Y scatter" code={`<ScatterChart data={points} xKey="x" yKey="y" />`}>
            <ScatterChart data={scatterData} xKey="x" yKey="y" height={160} />
          </DemoCard>
          <DemoCard title="Custom color" description="Success-colored dots" code={`<ScatterChart data={points} xKey="x" yKey="y" color="var(--gds-success)" />`}>
            <ScatterChart data={scatterData} xKey="x" yKey="y" height={160} color="var(--gds-success, #22c55e)" />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="height" type="number" value={config.height} min={120} max={400} onChange={v => setConfig('height', v)} />
        <Ctrl label="color" type="pills" value={config.color} options={['accent', 'success', 'danger']} onChange={v => setConfig('color', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const props = [`data={points}`, `xKey="x"`, `yKey="y"`]
      if (config.height !== 300) props.push(`height={${config.height}}`)
      if (config.glass === true) props.push('glass')
      if (config.color !== 'accent') props.push(`color="var(--gds-${config.color})"`)
      return `import { ScatterChart } from '@golia/gds'\n\n<ScatterChart\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Point data array', 'Record<string, unknown>[]', '—'],
          ['xKey', 'X-axis field name', 'string', '—'],
          ['yKey', 'Y-axis field name', 'string', '—'],
          ['height', 'Chart height in px', 'number', '300'],
          ['color', 'Dot fill color', 'string', 'var(--gds-accent)'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for correlation analysis between two numeric variables</p>
            <p>• Both axes are numeric type</p>
            <p>• Grid lines with dashed style for readability</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'sparkline',
    label: 'Sparkline',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'sparkline', 'inline', 'mini'],
    defaultConfig: { height: 32, width: 120, glass: false, color: 'accent' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Sparkline } from '@golia/gds'" />
        <LivePreview>
          <Sparkline data={sparklineData} dataKey="v" height={config.height} width={config.width} glass={config.glass} color={colorVar(config.color)} />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Inline trend" description="Compact sparkline for tables/cards" code={`<Sparkline data={data} dataKey="v" />`}>
            <div className="flex items-center gap-4">
              <Sparkline data={sparklineData} dataKey="v" />
              <Sparkline data={sparklineData} dataKey="v" color="var(--gds-success, #22c55e)" />
              <Sparkline data={sparklineData} dataKey="v" color="var(--gds-danger, #ef4444)" />
            </div>
          </DemoCard>
          <DemoCard title="Larger" description="Wider sparkline" code={`<Sparkline data={data} dataKey="v" width={200} height={48} />`}>
            <Sparkline data={sparklineData} dataKey="v" width={200} height={48} />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="width" type="number" value={config.width} min={60} max={300} onChange={v => setConfig('width', v)} />
        <Ctrl label="height" type="number" value={config.height} min={16} max={80} onChange={v => setConfig('height', v)} />
        <Ctrl label="color" type="pills" value={config.color} options={['accent', 'success', 'danger']} onChange={v => setConfig('color', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const props = [`data={data}`, `dataKey="v"`]
      if (config.width !== 120) props.push(`width={${config.width}}`)
      if (config.height !== 32) props.push(`height={${config.height}}`)
      if (config.glass === true) props.push('glass')
      if (config.color !== 'accent') props.push(`color="var(--gds-${config.color})"`)
      return `import { Sparkline } from '@golia/gds'\n\n<Sparkline\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Chart data array', 'Record<string, unknown>[]', '—'],
          ['dataKey', 'Value field name', 'string', '—'],
          ['width', 'Chart width', "number | `${number}%`", '120'],
          ['height', 'Chart height in px', 'number', '32'],
          ['color', 'Line stroke color', 'string', 'var(--gds-accent)'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Tiny inline chart — no axes, no grid, no tooltip</p>
            <p>• Perfect for table cells, metric cards, list items</p>
            <p>• Inline-block display — flows with text</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'treemap-chart',
    label: 'TreemapChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'treemap', 'hierarchy', 'proportion'],
    defaultConfig: { height: 250, glass: false, color: 'accent' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { TreemapChart } from '@golia/gds'" />
        <LivePreview>
          <TreemapChart data={treemapData} height={config.height} glass={config.glass} color={colorVar(config.color)} />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Department allocation" description="Proportional area rectangles" code={`<TreemapChart data={departments} />`}>
            <TreemapChart data={treemapData} height={160} />
          </DemoCard>
          <DemoCard title="Custom color" description="Success-themed treemap" code={`<TreemapChart data={departments} color="var(--gds-success)" />`}>
            <TreemapChart data={treemapData} height={160} color="var(--gds-success, #22c55e)" />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="height" type="number" value={config.height} min={120} max={400} onChange={v => setConfig('height', v)} />
        <Ctrl label="color" type="pills" value={config.color} options={['accent', 'success', 'danger']} onChange={v => setConfig('color', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const props = [`data={departments}`]
      if (config.height !== 300) props.push(`height={${config.height}}`)
      if (config.glass === true) props.push('glass')
      if (config.color !== 'accent') props.push(`color="var(--gds-${config.color})"`)
      return `import { TreemapChart } from '@golia/gds'\n\n<TreemapChart\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Hierarchical node data', '{ name: string; value?: number; children?: ... }[]', '—'],
          ['dataKey', 'Value field name', 'string', "'value'"],
          ['height', 'Chart height in px', 'number', '300'],
          ['color', 'Rectangle fill color', 'string', 'var(--gds-accent)'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for showing proportional sizes in a hierarchy</p>
            <p>• Supports nested children for multi-level treemaps</p>
            <p>• Rectangle area proportional to value</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { chartItemsExt }
