import { useState } from 'react'

import { CopyField, DateDisplay } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsT: DevCenterItem[] = []

const dateDisplayItem: DevCenterItem = {
  id: 'date-display',
  label: 'DateDisplay',
  layer: 'l4',
  type: 'interactive',
  tags: ['date', 'time', 'relative', 'display', 'molecule'],
  defaultConfig: { format: 'auto', offset: '0' },

  stage: ({ config }) => {
    const offsets: Record<string, number> = {
      '0': 0, '30m': 30 * 60000, '3h': 3 * 3600000,
      '1d': 86400000, '5d': 5 * 86400000, '30d': 30 * 86400000,
    }
    const date = new Date(Date.now() - (offsets[config.offset] ?? 0))

    return (
      <div>
        <ImportLine text="import { DateDisplay } from '@golia/gds'" />
        <LivePreview>
          <DateDisplay date={date} format={config.format as 'relative' | 'absolute' | 'auto'} />
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="format" value={config.format} options={['auto', 'relative', 'absolute']} onChange={(v) => setConfig('format', v)} />
      <Ctrl type="pills" label="offset" value={config.offset} options={['0', '30m', '3h', '1d', '5d', '30d']} onChange={(v) => setConfig('offset', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { DateDisplay } from '@golia/gds'\n\n<DateDisplay date={someDate} format="${config.format}" />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['date', 'Date to display', 'string | Date', '—'],
        ['format', 'Display format', "'relative' | 'absolute' | 'auto'", "'auto'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsT.push(dateDisplayItem)

const copyFieldItem: DevCenterItem = {
  id: 'copy-field',
  label: 'CopyField',
  layer: 'l4',
  type: 'interactive',
  tags: ['copy', 'field', 'clipboard', 'api-key', 'molecule'],
  defaultConfig: { masked: 'false' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CopyField } from '@golia/gds'" />
      <LivePreview>
        <div className="w-72">
          <CopyField
            value="sk-proj-abc123def456"
            label="API Key"
            masked={config.masked === 'true'}
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="masked" value={config.masked} options={['false', 'true']} onChange={(v) => setConfig('masked', v)} />
  ),

  code: ({ config }) =>
    `import { CopyField } from '@golia/gds'\n\n<CopyField\n  value="sk-proj-abc123def456"\n  label="API Key"\n  ${config.masked === 'true' ? 'masked\n' : ''}/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Text to display and copy', 'string', '—'],
        ['label', 'Field label', 'string', '—'],
        ['masked', 'Show dots until hover/reveal', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsT.push(copyFieldItem)

export { moleculeItemsT }
