import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import {
  AreaChart,
  BarChart,
  FunnelChart,
  Gauge,
  LineChart,
  PieChart,
} from '@gds/l6-charts'

import type { DevCenterItem } from '../types'

const barChartData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 55 },
  { name: 'Mar', value: 72 },
  { name: 'Apr', value: 61 },
  { name: 'May', value: 85 },
]

const lineChartData = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 35 },
  { name: 'Apr', value: 60 },
  { name: 'May', value: 50 },
]

const pieChartData = [
  { name: 'React', value: 40 },
  { name: 'Vue', value: 25 },
  { name: 'Angular', value: 20 },
  { name: 'Svelte', value: 15 },
]

const areaChartData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 38 },
  { name: 'Apr', value: 62 },
  { name: 'May', value: 55 },
  { name: 'Jun', value: 78 },
]

const funnelData = [
  { name: 'Visitors', value: 5000 },
  { name: 'Signups', value: 3200 },
  { name: 'Trials', value: 1800 },
  { name: 'Paid', value: 900 },
  { name: 'Enterprise', value: 320 },
]

function colorVar(name: string): string {
  if (name === 'accent') return 'var(--gds-accent)'
  if (name === 'success') return 'var(--gds-success, #22c55e)'
  if (name === 'danger') return 'var(--gds-danger, #ef4444)'
  return 'var(--gds-accent)'
}

const chartItems: DevCenterItem[] = [
  {
    id: 'bar-chart',
    label: 'BarChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'visualization', 'bar'],
    defaultConfig: { height: 250, glass: false, color: 'accent' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { BarChart } from '@goliapkg/gds'" />
        <LivePreview>
          <BarChart data={barChartData} dataKey="value" height={config.height} glass={config.glass} color={colorVar(config.color)} />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Basic" description="Simple bar chart with default styling" code={`<BarChart data={data} dataKey="value" />`}>
            <BarChart data={barChartData} dataKey="value" height={160} />
          </DemoCard>
          <DemoCard title="Glass" description="Frosted glass container" code={`<BarChart data={data} dataKey="value" glass />`}>
            <div className="rounded-lg bg-gradient-to-br from-accent/20 to-success/10 p-2">
              <BarChart data={barChartData} dataKey="value" height={160} glass />
            </div>
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
      const props = [`data={data}`, `dataKey="value"`]
      if (config.height !== 300) props.push(`height={${config.height}}`)
      if (config.glass === true) props.push('glass')
      if (config.color !== 'accent') props.push(`color="var(--gds-${config.color})"`)
      return `import { BarChart } from '@goliapkg/gds'\n\n<BarChart\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Chart data array', 'Record<string, unknown>[]', '—'],
          ['dataKey', 'Value field name', 'string', '—'],
          ['xKey', 'Category axis field', 'string', "'name'"],
          ['height', 'Chart height in px', 'number', '300'],
          ['color', 'Bar fill color', 'string', 'var(--gds-accent)'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for comparing discrete categories (months, products, regions)</p>
            <p>• Keep data points under 12 for readability</p>
            <p>• Uses recharts ResponsiveContainer — width auto-fills parent</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'line-chart',
    label: 'LineChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'trend', 'line'],
    defaultConfig: { height: 250, glass: false, color: 'accent' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { LineChart } from '@goliapkg/gds'" />
        <LivePreview>
          <LineChart data={lineChartData} dataKey="value" height={config.height} glass={config.glass} color={colorVar(config.color)} />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Trend line" description="Smooth monotone curve" code={`<LineChart data={data} dataKey="value" />`}>
            <LineChart data={lineChartData} dataKey="value" height={160} />
          </DemoCard>
          <DemoCard title="Custom color" description="Success-colored trend" code={`<LineChart data={data} dataKey="value" color="var(--gds-success)" />`}>
            <LineChart data={lineChartData} dataKey="value" height={160} color="var(--gds-success, #22c55e)" />
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
      const props = [`data={data}`, `dataKey="value"`]
      if (config.height !== 300) props.push(`height={${config.height}}`)
      if (config.glass === true) props.push('glass')
      if (config.color !== 'accent') props.push(`color="var(--gds-${config.color})"`)
      return `import { LineChart } from '@goliapkg/gds'\n\n<LineChart\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Chart data array', 'Record<string, unknown>[]', '—'],
          ['dataKey', 'Value field name', 'string', '—'],
          ['xKey', 'Category axis field', 'string', "'name'"],
          ['height', 'Chart height in px', 'number', '300'],
          ['color', 'Line stroke color', 'string', 'var(--gds-accent)'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Best for showing trends over time (daily, monthly, yearly)</p>
            <p>• Monotone interpolation for smooth curves</p>
            <p>• Dots hidden by default for clean appearance</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'pie-chart',
    label: 'PieChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'donut', 'pie'],
    defaultConfig: { height: 250, glass: false, innerRadius: 0 },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { PieChart } from '@goliapkg/gds'" />
        <LivePreview>
          <PieChart data={pieChartData} dataKey="value" height={config.height} glass={config.glass} innerRadius={config.innerRadius} />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Pie" description="Full pie chart" code={`<PieChart data={data} dataKey="value" />`}>
            <PieChart data={pieChartData} dataKey="value" height={160} />
          </DemoCard>
          <DemoCard title="Donut" description="With inner radius cutout" code={`<PieChart data={data} dataKey="value" innerRadius={50} />`}>
            <PieChart data={pieChartData} dataKey="value" height={160} innerRadius={50} />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="height" type="number" value={config.height} min={120} max={400} onChange={v => setConfig('height', v)} />
        <Ctrl label="innerRadius" type="number" value={config.innerRadius} min={0} max={100} onChange={v => setConfig('innerRadius', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const props = [`data={data}`, `dataKey="value"`]
      if (config.height !== 300) props.push(`height={${config.height}}`)
      if (config.innerRadius > 0) props.push(`innerRadius={${config.innerRadius}}`)
      if (config.glass === true) props.push('glass')
      return `import { PieChart } from '@goliapkg/gds'\n\n<PieChart\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Chart data array', 'Record<string, unknown>[]', '—'],
          ['dataKey', 'Value field name', 'string', '—'],
          ['nameKey', 'Label field name', 'string', "'name'"],
          ['height', 'Chart height in px', 'number', '300'],
          ['colors', 'Custom color palette', 'string[]', 'PALETTE (10 colors)'],
          ['innerRadius', 'Donut hole radius', 'number', '0'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Best for showing proportions of a whole (max 6-8 slices)</p>
            <p>• Set innerRadius &gt; 0 for donut style</p>
            <p>• Uses palette tokens for automatic color assignment</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'area-chart',
    label: 'AreaChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'area', 'gradient', 'trend'],
    defaultConfig: { height: 250, glass: false, color: 'accent' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { AreaChart } from '@goliapkg/gds'" />
        <LivePreview>
          <AreaChart data={areaChartData} dataKey="value" height={config.height} glass={config.glass} color={colorVar(config.color)} />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Gradient fill" description="Area with gradient opacity" code={`<AreaChart data={data} dataKey="value" />`}>
            <AreaChart data={areaChartData} dataKey="value" height={160} />
          </DemoCard>
          <DemoCard title="Glass variant" description="On glass surface" code={`<AreaChart data={data} dataKey="value" glass />`}>
            <div className="rounded-lg bg-gradient-to-br from-accent/20 to-success/10 p-2">
              <AreaChart data={areaChartData} dataKey="value" height={160} glass />
            </div>
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
      const props = [`data={data}`, `dataKey="value"`]
      if (config.height !== 300) props.push(`height={${config.height}}`)
      if (config.glass === true) props.push('glass')
      if (config.color !== 'accent') props.push(`color="var(--gds-${config.color})"`)
      return `import { AreaChart } from '@goliapkg/gds'\n\n<AreaChart\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Chart data array', 'Record<string, unknown>[]', '—'],
          ['dataKey', 'Value field name', 'string', '—'],
          ['xKey', 'Category axis field', 'string', "'name'"],
          ['height', 'Chart height in px', 'number', '300'],
          ['color', 'Stroke and fill color', 'string', 'var(--gds-accent)'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Similar to LineChart but with gradient fill for visual weight</p>
            <p>• Good for showing volume/magnitude over time</p>
            <p>• Built-in gradient from 30% opacity to transparent</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'funnel-chart',
    label: 'FunnelChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'funnel', 'conversion', 'pipeline'],
    defaultConfig: { height: 250, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { FunnelChart } from '@goliapkg/gds'" />
        <LivePreview>
          <FunnelChart data={funnelData} dataKey="value" height={config.height} glass={config.glass} />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Conversion funnel" description="Pipeline stage visualization" code={`<FunnelChart data={stages} dataKey="value" />`}>
            <FunnelChart data={funnelData} dataKey="value" height={180} />
          </DemoCard>
          <DemoCard title="Glass" description="On translucent surface" code={`<FunnelChart data={stages} dataKey="value" glass />`}>
            <div className="rounded-lg bg-gradient-to-br from-accent/20 to-warning/10 p-2">
              <FunnelChart data={funnelData} dataKey="value" height={180} glass />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="height" type="number" value={config.height} min={120} max={400} onChange={v => setConfig('height', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const props = [`data={stages}`, `dataKey="value"`]
      if (config.height !== 300) props.push(`height={${config.height}}`)
      if (config.glass === true) props.push('glass')
      return `import { FunnelChart } from '@goliapkg/gds'\n\n<FunnelChart\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Stage data array', 'Record<string, unknown>[]', '—'],
          ['dataKey', 'Value field name', 'string', '—'],
          ['height', 'Chart height in px', 'number', '300'],
          ['colors', 'Custom color palette', 'string[]', 'PALETTE (10 colors)'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for conversion pipelines (visitors to customers)</p>
            <p>• Data should be ordered from largest to smallest</p>
            <p>• Colors auto-assigned from palette tokens</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'gauge',
    label: 'Gauge',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'gauge', 'meter', 'progress'],
    defaultConfig: { value: 72, max: 100, height: 200, color: 'accent', label: 'CPU', glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Gauge } from '@goliapkg/gds'" />
        <LivePreview>
          <Gauge value={config.value} max={config.max} label={config.label} height={config.height} glass={config.glass} color={colorVar(config.color)} />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Multiple gauges" description="System metrics side by side" code={`<Gauge value={72} label="CPU" />\n<Gauge value={45} label="Memory" color="var(--gds-success)" />`}>
            <div className="flex items-end gap-4">
              <Gauge value={72} label="CPU" height={140} />
              <Gauge value={45} label="Memory" height={140} color="var(--gds-success, #22c55e)" />
              <Gauge value={90} label="Disk" height={140} color="var(--gds-danger, #ef4444)" />
            </div>
          </DemoCard>
          <DemoCard title="Custom range" description="Non-100 max value" code={`<Gauge value={350} max={500} label="Score" />`}>
            <Gauge value={350} max={500} label="Score" height={140} />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="value" type="number" value={config.value} min={0} max={config.max} onChange={v => setConfig('value', v)} />
        <Ctrl label="max" type="number" value={config.max} min={1} max={1000} onChange={v => setConfig('max', v)} />
        <Ctrl label="label" type="text" value={config.label} onChange={v => setConfig('label', v)} />
        <Ctrl label="height" type="number" value={config.height} min={100} max={400} onChange={v => setConfig('height', v)} />
        <Ctrl label="color" type="pills" value={config.color} options={['accent', 'success', 'danger']} onChange={v => setConfig('color', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const props = [`value={${config.value}}`]
      if (config.max !== 100) props.push(`max={${config.max}}`)
      if (config.label !== '') props.push(`label="${config.label}"`)
      if (config.height !== 200) props.push(`height={${config.height}}`)
      if (config.glass === true) props.push('glass')
      if (config.color !== 'accent') props.push(`color="var(--gds-${config.color})"`)
      return `import { Gauge } from '@goliapkg/gds'\n\n<Gauge\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['value', 'Current value', 'number', '—'],
          ['max', 'Maximum value', 'number', '100'],
          ['label', 'Bottom label text', 'string', '—'],
          ['height', 'Chart height in px', 'number', '200'],
          ['color', 'Arc fill color', 'string', 'var(--gds-accent)'],
          ['trackColor', 'Remaining arc color', 'string', 'var(--gds-border)'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for single KPI values (CPU, battery, progress)</p>
            <p>• Half-circle arc — value displayed in center</p>
            <p>• Values clamped between 0 and max</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { chartItems }
