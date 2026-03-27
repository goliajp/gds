import { HeatCell, TrendArrow } from '@gds/l3-atoms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const atomItemsX: DevCenterItem[] = []

const trendArrowItem: DevCenterItem = {
  id: 'trend-arrow',
  label: 'TrendArrow',
  layer: 'l3',
  type: 'interactive',
  tags: ['trend', 'arrow', 'up', 'down', 'indicator', 'atom'],
  defaultConfig: { direction: 'up', size: 'default' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { TrendArrow } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center gap-4">
          <TrendArrow direction={config.direction} size={config.size} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="direction" value={config.direction} options={['up', 'down', 'flat']} onChange={(v) => setConfig('direction', v)} />
      <Ctrl type="pills" label="size" value={config.size} options={['sm', 'default']} onChange={(v) => setConfig('size', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { TrendArrow } from '@goliapkg/gds'\n\n<TrendArrow direction="${config.direction}"${config.size !== 'default' ? ` size="${config.size}"` : ''} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['direction', 'Arrow direction', "'up' | 'down' | 'flat'", '—'],
        ['size', 'Icon size', "'sm' | 'default'", "'default'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsX.push(trendArrowItem)

const heatCellItem: DevCenterItem = {
  id: 'heat-cell',
  label: 'HeatCell',
  layer: 'l3',
  type: 'interactive',
  tags: ['heat', 'heatmap', 'cell', 'intensity', 'color', 'atom'],
  defaultConfig: { value: '75', showValue: 'true' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { HeatCell } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center gap-2">
          {[10, 30, 50, 75, 100].map((v) => (
            <HeatCell key={v} showValue={config.showValue === 'true'} value={v} />
          ))}
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="value" value={config.value} options={['10', '30', '50', '75', '100']} onChange={(v) => setConfig('value', v)} />
      <Ctrl type="pills" label="showValue" value={config.showValue} options={['false', 'true']} onChange={(v) => setConfig('showValue', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { HeatCell } from '@goliapkg/gds'\n\n<HeatCell value={${config.value}}${config.showValue === 'true' ? ' showValue' : ''} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Numeric intensity value', 'number', '—'],
        ['max', 'Maximum value for intensity scaling', 'number', '100'],
        ['color', 'Background color (CSS value)', 'string', 'var(--color-accent)'],
        ['size', 'Cell size in pixels', 'number', '32'],
        ['showValue', 'Show value text inside cell', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsX.push(heatCellItem)

export { atomItemsX }
