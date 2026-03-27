import { TimeSince } from '@gds/l3-atoms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const atomItemsU: DevCenterItem[] = []

const timeSinceItem: DevCenterItem = {
  id: 'time-since',
  label: 'TimeSince',
  layer: 'l3',
  type: 'interactive',
  tags: ['time', 'relative', 'ago', 'live', 'atom'],
  defaultConfig: { offset: '5m' },

  stage: ({ config }) => {
    const offsets: Record<string, number> = {
      '30s': 30 * 1000,
      '5m': 5 * 60 * 1000,
      '2h': 2 * 60 * 60 * 1000,
      '1d': 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
    }
    const date = Date.now() - (offsets[config.offset] ?? 0)

    return (
      <div>
        <ImportLine text="import { TimeSince } from '@golia/gds'" />
        <LivePreview>
          <TimeSince date={date} />
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="offset" value={config.offset} options={['30s', '5m', '2h', '1d', '30d']} onChange={(v) => setConfig('offset', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { TimeSince } from '@golia/gds'\n\n<TimeSince date={Date.now() - ${config.offset === '5m' ? '5 * 60000' : '...'}} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['date', 'Timestamp to show relative time from', 'Date | string | number', '—'],
        ['live', 'Auto-update every minute', 'boolean', 'true'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsU.push(timeSinceItem)

export { atomItemsU }
