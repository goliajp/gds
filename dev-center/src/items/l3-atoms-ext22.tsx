import { LiveDot, Percentage } from '@gds/l3-atoms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const atomItemsW: DevCenterItem[] = []

const liveDotItem: DevCenterItem = {
  id: 'live-dot',
  label: 'LiveDot',
  layer: 'l3',
  type: 'interactive',
  tags: ['live', 'streaming', 'recording', 'pulse', 'indicator', 'atom'],
  defaultConfig: { label: 'LIVE' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { LiveDot } from '@golia/gds'" />
      <LivePreview>
        <LiveDot label={config.label} />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="label" value={config.label} options={['LIVE', 'REC', 'ON AIR', 'STREAMING']} onChange={(v) => setConfig('label', v)} />
  ),

  code: ({ config }) =>
    `import { LiveDot } from '@golia/gds'\n\n<LiveDot${config.label !== 'LIVE' ? ` label="${config.label}"` : ''} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['label', 'Text label next to the dot', 'string', "'LIVE'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsW.push(liveDotItem)

const percentageItem: DevCenterItem = {
  id: 'percentage',
  label: 'Percentage',
  layer: 'l3',
  type: 'interactive',
  tags: ['percentage', 'percent', 'number', 'format', 'atom'],
  defaultConfig: { value: '12.5', showSign: 'false' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Percentage } from '@golia/gds'" />
      <LivePreview>
        <div className="flex items-center gap-4">
          <Percentage showSign={config.showSign === 'true'} value={Number(config.value)} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="value" value={config.value} options={['-5.2', '0', '12.5', '99.8']} onChange={(v) => setConfig('value', v)} />
      <Ctrl type="pills" label="showSign" value={config.showSign} options={['false', 'true']} onChange={(v) => setConfig('showSign', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { Percentage } from '@golia/gds'\n\n<Percentage value={${config.value}} ${config.showSign === 'true' ? 'showSign ' : ''}/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Numeric percentage value', 'number', '—'],
        ['precision', 'Decimal places', 'number', '1'],
        ['showSign', 'Show + sign for positive values', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsW.push(percentageItem)

export { atomItemsW }
