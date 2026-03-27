import { Price, StatusDot } from '@gds/l3-atoms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const atomItemsT: DevCenterItem[] = []

const statusDotItem: DevCenterItem = {
  id: 'status-dot',
  label: 'StatusDot',
  layer: 'l3',
  type: 'interactive',
  tags: ['status', 'dot', 'connection', 'indicator', 'atom'],
  defaultConfig: { status: 'connected', label: '' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { StatusDot } from '@golia/gds'" />
      <LivePreview>
        <StatusDot
          status={config.status as 'connected' | 'connecting' | 'disconnected'}
          label={config.label !== '' ? config.label : undefined}
        />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="status" value={config.status} options={['connected', 'connecting', 'disconnected']} onChange={(v) => setConfig('status', v)} />
      <Ctrl type="pills" label="label" value={config.label} options={['', 'Server', 'Database']} onChange={(v) => setConfig('label', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { StatusDot } from '@golia/gds'\n\n<StatusDot status="${config.status}"${config.label !== '' ? ` label="${config.label}"` : ''} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['status', 'Connection status', "'connected' | 'connecting' | 'disconnected'", '—'],
        ['label', 'Optional text label next to dot', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsT.push(statusDotItem)

const priceItem: DevCenterItem = {
  id: 'price',
  label: 'Price',
  layer: 'l3',
  type: 'interactive',
  tags: ['price', 'currency', 'money', 'format', 'atom'],
  defaultConfig: { value: '1234', currency: '\u00a5', showSign: 'false' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Price } from '@golia/gds'" />
      <LivePreview>
        <Price
          value={Number(config.value)}
          currency={config.currency}
          showSign={config.showSign === 'true'}
        />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="value" value={config.value} options={['1234', '-500', '0', '99999']} onChange={(v) => setConfig('value', v)} />
      <Ctrl type="pills" label="currency" value={config.currency} options={['\u00a5', '$', '\u20ac']} onChange={(v) => setConfig('currency', v)} />
      <Ctrl type="pills" label="showSign" value={config.showSign} options={['false', 'true']} onChange={(v) => setConfig('showSign', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { Price } from '@golia/gds'\n\n<Price value={${config.value}} currency="${config.currency}"${config.showSign === 'true' ? ' showSign' : ''} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Numeric price value', 'number', '—'],
        ['currency', 'Currency symbol', 'string', '\u00a5'],
        ['showSign', 'Show + sign for positive values', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsT.push(priceItem)

export { atomItemsT }
