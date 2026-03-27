import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { BumpChart, OrderBookChart, WaveformDisplay } from '@gds/l6-charts'

import type { DevCenterItem } from '../types'

const bumpData = [
  { week: 'W1', alpha: 1, beta: 3, gamma: 2 },
  { week: 'W2', alpha: 2, beta: 1, gamma: 3 },
  { week: 'W3', alpha: 3, beta: 2, gamma: 1 },
  { week: 'W4', alpha: 1, beta: 3, gamma: 2 },
  { week: 'W5', alpha: 2, beta: 1, gamma: 3 },
]

const bids = [
  { price: 97, depth: 300 },
  { price: 98, depth: 200 },
  { price: 99, depth: 120 },
  { price: 100, depth: 50 },
]
const asks = [
  { price: 101, depth: 40 },
  { price: 102, depth: 100 },
  { price: 103, depth: 180 },
  { price: 104, depth: 280 },
]

const waveformData = Array.from({ length: 80 }, () => Math.random() * 0.8 + 0.1)

const chartItemsExt8: DevCenterItem[] = [
  {
    id: 'bump-chart',
    label: 'BumpChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'bump', 'ranking', 'line', 'recharts'],
    defaultConfig: { height: 300, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { BumpChart } from '@goliapkg/gds'" />
        <LivePreview>
          <BumpChart
            data={bumpData}
            series={['alpha', 'beta', 'gamma']}
            xKey="week"
            height={config.height}
            glass={config.glass}
          />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['data', 'Record<string, unknown>[]', '—', 'Time-series data with ranking values'],
              ['series', 'string[]', '—', 'Keys for each ranked entity'],
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
      const lines = ["import { BumpChart } from '@goliapkg/gds'"]
      lines.push('')
      lines.push('const data = [')
      lines.push("  { week: 'W1', alpha: 1, beta: 3, gamma: 2 },")
      lines.push("  { week: 'W2', alpha: 2, beta: 1, gamma: 3 },")
      lines.push(']')
      lines.push('')
      lines.push("<BumpChart data={data} series={['alpha', 'beta', 'gamma']} xKey=\"week\" />")
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['data', 'Ranking data', 'Record<string, unknown>[]', '—'],
            ['series', 'Entity keys', 'string[]', '—'],
            ['height', 'Chart height', 'number', '300'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Shows ranking changes over time with smooth monotone curves</p>
            <p>• Y-axis reversed so rank 1 is at the top</p>
            <p>• Dots on data points for rank visibility</p>
            <p>• Colors from palette tokens</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'order-book-chart',
    label: 'OrderBookChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'orderbook', 'depth', 'financial', 'bid', 'ask', 'recharts'],
    defaultConfig: { height: 300, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { OrderBookChart } from '@goliapkg/gds'" />
        <LivePreview>
          <OrderBookChart
            bids={bids}
            asks={asks}
            height={config.height}
            glass={config.glass}
          />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['bids', '{ price: number, depth: number }[]', '—', 'Buy orders sorted desc by price'],
              ['asks', '{ price: number, depth: number }[]', '—', 'Sell orders sorted asc by price'],
              ['height', 'number', '300', 'Chart height in px'],
              ['bidColor', 'string', 'var(--gds-success)', 'Color for bid area'],
              ['askColor', 'string', 'var(--gds-danger)', 'Color for ask area'],
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
      const lines = ["import { OrderBookChart } from '@goliapkg/gds'"]
      lines.push('')
      lines.push('const bids = [')
      lines.push('  { price: 99, depth: 120 },')
      lines.push('  { price: 100, depth: 50 },')
      lines.push(']')
      lines.push('const asks = [')
      lines.push('  { price: 101, depth: 40 },')
      lines.push('  { price: 102, depth: 100 },')
      lines.push(']')
      lines.push('')
      lines.push('<OrderBookChart bids={bids} asks={asks} />')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['bids', 'Buy orders', '{ price, depth }[]', '—'],
            ['asks', 'Sell orders', '{ price, depth }[]', '—'],
            ['height', 'Chart height', 'number', '300'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Financial order book depth visualization</p>
            <p>• Green area for bids (buy), red for asks (sell)</p>
            <p>• Step interpolation for realistic depth chart look</p>
            <p>• Meeting point indicates current market price</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'waveform-display',
    label: 'WaveformDisplay',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'waveform', 'audio', 'svg', 'visualization'],
    defaultConfig: { width: 400, height: 100, progress: 0.4, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { WaveformDisplay } from '@goliapkg/gds'" />
        <LivePreview>
          <WaveformDisplay
            data={waveformData}
            width={config.width}
            height={config.height}
            progress={config.progress}
            glass={config.glass}
          />
        </LivePreview>
        <DocSection title="API">
          <DocTable
            rows={[
              ['data', 'number[]', '—', 'Amplitude values (0-1)'],
              ['width', 'number', '400', 'SVG width in px'],
              ['height', 'number', '100', 'SVG height in px'],
              ['progress', 'number', '0', 'Played portion (0-1)'],
              ['color', 'string', 'var(--gds-accent)', 'Bar color'],
              ['playedColor', 'string', 'same as color', 'Color for played bars'],
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
        <Ctrl label="height" min={50} max={300} onChange={(v) => setConfig('height', v)} type="number" value={config.height} />
        <Ctrl label="progress" min={0} max={1} onChange={(v) => setConfig('progress', v)} type="number" value={config.progress} />
        <Ctrl label="glass" onChange={(v) => setConfig('glass', v)} type="check" value={config.glass} />
      </>
    ),

    code: () => {
      const lines = ["import { WaveformDisplay } from '@goliapkg/gds'"]
      lines.push('')
      lines.push('const data = Array.from({ length: 80 }, () => Math.random())')
      lines.push('')
      lines.push('<WaveformDisplay data={data} progress={0.4} />')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable
          rows={[
            ['data', 'Amplitudes', 'number[]', '—'],
            ['width', 'SVG width', 'number', '400'],
            ['height', 'SVG height', 'number', '100'],
            ['progress', 'Played ratio', 'number', '0'],
            ['glass', 'Glass material', 'boolean', 'false'],
          ]}
        />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Pure SVG — no chart library dependency</p>
            <p>• Vertical bars centered on midline</p>
            <p>• Progress indicator dims unplayed portion</p>
            <p>• Ideal for audio file previews</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { chartItemsExt8 }
