import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { NetworkGraph } from '@gds/l6-charts'

import type { DevCenterItem } from '../types'

const sampleNodes = [
  { id: 'react', label: 'React', group: 0 },
  { id: 'vue', label: 'Vue', group: 0 },
  { id: 'angular', label: 'Angular', group: 0 },
  { id: 'ts', label: 'TypeScript', group: 1 },
  { id: 'vite', label: 'Vite', group: 2 },
  { id: 'webpack', label: 'Webpack', group: 2 },
]

const sampleEdges = [
  { source: 'react', target: 'ts' },
  { source: 'vue', target: 'ts' },
  { source: 'angular', target: 'ts' },
  { source: 'react', target: 'vite' },
  { source: 'vue', target: 'vite' },
  { source: 'angular', target: 'webpack' },
  { source: 'react', target: 'webpack' },
]

const chartItemsExt3: DevCenterItem[] = [
  {
    id: 'network-graph',
    label: 'NetworkGraph',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'network', 'graph', 'node', 'edge', 'force'],
    defaultConfig: { width: 400, height: 300, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { NetworkGraph } from '@goliapkg/gds'" />
        <LivePreview>
          <NetworkGraph
            nodes={sampleNodes}
            edges={sampleEdges}
            width={config.width}
            height={config.height}
            glass={config.glass}
          />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['nodes', '{ id, label, group? }[]', '—', 'Array of graph nodes'],
              ['edges', '{ source, target }[]', '—', 'Array of edges connecting node IDs'],
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

    code: () => {
      const lines = ["import { NetworkGraph } from '@goliapkg/gds'"]
      lines.push('')
      lines.push('<NetworkGraph')
      lines.push('  nodes={[')
      lines.push("    { id: 'a', label: 'Node A', group: 0 },")
      lines.push("    { id: 'b', label: 'Node B', group: 1 },")
      lines.push('  ]}')
      lines.push('  edges={[')
      lines.push("    { source: 'a', target: 'b' },")
      lines.push('  ]}')
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['nodes', 'Graph node array', '{ id: string; label: string; group?: number }[]', '—'],
            ['edges', 'Edge connections', '{ source: string; target: string }[]', '—'],
            ['width', 'SVG width', 'number', '400'],
            ['height', 'SVG height', 'number', '300'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Pure SVG — no external dependencies</p>
            <p>• Nodes positioned in circle layout</p>
            <p>• Colors from palette tokens based on group</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { chartItemsExt3 }
