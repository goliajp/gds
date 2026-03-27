import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { BubbleChart, CandlestickChart, WordCloud } from '@gds/l6-charts'

import type { DevCenterItem } from '../types'

const wordCloudWords = [
  { text: 'React', weight: 10 },
  { text: 'TypeScript', weight: 9 },
  { text: 'Design', weight: 7 },
  { text: 'System', weight: 6 },
  { text: 'Component', weight: 8 },
  { text: 'Token', weight: 5 },
  { text: 'Motion', weight: 4 },
  { text: 'Glass', weight: 3 },
  { text: 'Chart', weight: 7 },
  { text: 'Layout', weight: 5 },
  { text: 'Theme', weight: 6 },
  { text: 'Atomic', weight: 4 },
]

const bubbleData = [
  { x: 10, y: 30, z: 100, name: 'A' },
  { x: 25, y: 50, z: 250, name: 'B' },
  { x: 40, y: 20, z: 80, name: 'C' },
  { x: 55, y: 70, z: 300, name: 'D' },
  { x: 70, y: 45, z: 150, name: 'E' },
  { x: 85, y: 60, z: 200, name: 'F' },
]

const candlestickData = [
  { date: 'Jan', open: 100, high: 115, low: 95, close: 110 },
  { date: 'Feb', open: 110, high: 120, low: 105, close: 108 },
  { date: 'Mar', open: 108, high: 125, low: 100, close: 122 },
  { date: 'Apr', open: 122, high: 130, low: 118, close: 115 },
  { date: 'May', open: 115, high: 128, low: 110, close: 125 },
  { date: 'Jun', open: 125, high: 140, low: 120, close: 135 },
  { date: 'Jul', open: 135, high: 138, low: 125, close: 128 },
  { date: 'Aug', open: 128, high: 145, low: 122, close: 142 },
]

const chartItemsExt2: DevCenterItem[] = [
  {
    id: 'word-cloud',
    label: 'WordCloud',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'word', 'cloud', 'tag', 'text'],
    defaultConfig: { height: 300, maxFontSize: 48, minFontSize: 12, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { WordCloud } from '@goliapkg/gds'" />
        <LivePreview>
          <WordCloud
            glass={config.glass}
            height={config.height}
            maxFontSize={config.maxFontSize}
            minFontSize={config.minFontSize}
            words={wordCloudWords}
          />
        </LivePreview>
        <DocSection columns={2} title="Examples">
          <DemoCard code={`<WordCloud words={words} />`} description="Default sizing" title="Basic">
            <WordCloud height={200} words={wordCloudWords} />
          </DemoCard>
          <DemoCard code={`<WordCloud words={words} maxFontSize={32} minFontSize={8} />`} description="Compact text range" title="Small range">
            <WordCloud height={200} maxFontSize={32} minFontSize={8} words={wordCloudWords} />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="height" max={500} min={150} onChange={v => setConfig('height', v)} type="number" value={config.height} />
        <Ctrl label="maxFontSize" max={72} min={24} onChange={v => setConfig('maxFontSize', v)} type="number" value={config.maxFontSize} />
        <Ctrl label="minFontSize" max={24} min={8} onChange={v => setConfig('minFontSize', v)} type="number" value={config.minFontSize} />
        <Ctrl label="glass" onChange={v => setConfig('glass', v)} type="check" value={config.glass} />
      </>
    ),

    code: ({ config }) => {
      const props = [`words={words}`]
      if (config.height !== 300) props.push(`height={${config.height}}`)
      if (config.maxFontSize !== 48) props.push(`maxFontSize={${config.maxFontSize}}`)
      if (config.minFontSize !== 12) props.push(`minFontSize={${config.minFontSize}}`)
      if (config.glass === true) props.push('glass')
      return `import { WordCloud } from '@goliapkg/gds'\n\n<WordCloud\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['words', 'Word entries with weight', '{ text: string; weight: number }[]', '—'],
          ['maxFontSize', 'Maximum font size in px', 'number', '48'],
          ['minFontSize', 'Minimum font size in px', 'number', '12'],
          ['height', 'Container height in px', 'number', '300'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Pure CSS — no SVG, no external lib, flexbox layout</p>
            <p>• Colors cycle through palette-0 to palette-9</p>
            <p>• Font size linearly interpolated from weight</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'bubble-chart',
    label: 'BubbleChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'bubble', 'scatter', 'size'],
    defaultConfig: { height: 300, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { BubbleChart } from '@goliapkg/gds'" />
        <LivePreview>
          <BubbleChart data={bubbleData} glass={config.glass} height={config.height} xLabel="Revenue" yLabel="Growth" />
        </LivePreview>
        <DocSection columns={2} title="Examples">
          <DemoCard code={`<BubbleChart data={data} xLabel="X" yLabel="Y" />`} description="With axis labels" title="Labeled">
            <BubbleChart data={bubbleData} height={200} xLabel="Revenue" yLabel="Growth" />
          </DemoCard>
          <DemoCard code={`<BubbleChart data={data} glass />`} description="Glass container" title="Glass">
            <BubbleChart data={bubbleData} glass height={200} />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="height" max={500} min={150} onChange={v => setConfig('height', v)} type="number" value={config.height} />
        <Ctrl label="glass" onChange={v => setConfig('glass', v)} type="check" value={config.glass} />
      </>
    ),

    code: ({ config }) => {
      const props = [`data={data}`, `xLabel="X"`, `yLabel="Y"`]
      if (config.height !== 300) props.push(`height={${config.height}}`)
      if (config.glass === true) props.push('glass')
      return `import { BubbleChart } from '@goliapkg/gds'\n\n<BubbleChart\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Bubble data (x, y, z for size)', '{ x: number; y: number; z: number; name?: string }[]', '—'],
          ['xLabel', 'X-axis label', 'string', '—'],
          ['yLabel', 'Y-axis label', 'string', '—'],
          ['height', 'Chart height in px', 'number', '300'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Uses Recharts ScatterChart with ZAxis for bubble sizing</p>
            <p>• z value maps to bubble area in [20, 400] range</p>
            <p>• Color: accent with 60% opacity</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'candlestick-chart',
    label: 'CandlestickChart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'candlestick', 'finance', 'ohlc', 'stock'],
    defaultConfig: { height: 300, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { CandlestickChart } from '@goliapkg/gds'" />
        <LivePreview>
          <CandlestickChart data={candlestickData} glass={config.glass} height={config.height} />
        </LivePreview>
        <DocSection columns={1} title="Examples">
          <DemoCard code={`<CandlestickChart data={ohlcData} />`} description="OHLC candlestick display" title="Financial data">
            <CandlestickChart data={candlestickData} height={220} />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="height" max={500} min={150} onChange={v => setConfig('height', v)} type="number" value={config.height} />
        <Ctrl label="glass" onChange={v => setConfig('glass', v)} type="check" value={config.glass} />
      </>
    ),

    code: ({ config }) => {
      const props = [`data={ohlcData}`]
      if (config.height !== 300) props.push(`height={${config.height}}`)
      if (config.glass === true) props.push('glass')
      return `import { CandlestickChart } from '@goliapkg/gds'\n\n<CandlestickChart\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'OHLC candle data', '{ date: string; open: number; high: number; low: number; close: number }[]', '—'],
          ['height', 'Chart height in px', 'number', '300'],
          ['upColor', 'Color for bullish candles', 'string', 'var(--gds-success)'],
          ['downColor', 'Color for bearish candles', 'string', 'var(--gds-danger)'],
          ['glass', 'Glass morphism container', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Green body = close &gt; open (bullish), red = close &lt; open (bearish)</p>
            <p>• Custom bar shape renders body rect + wick line</p>
            <p>• Uses Recharts ComposedChart with custom Bar shape</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { chartItemsExt2 }
