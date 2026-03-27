import { DataExportCard } from '@gds/l7-patterns'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt31: DevCenterItem[] = []

const dataExportCardItem: DevCenterItem = {
  id: 'data-export-card',
  label: 'DataExportCard',
  layer: 'l7',
  type: 'interactive',
  tags: ['export', 'download', 'csv', 'json', 'data', 'pattern'],
  defaultConfig: { title: 'Export Data' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { DataExportCard } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-80">
          <DataExportCard
            formats={['CSV', 'JSON', 'Excel', 'PDF']}
            onExport={() => {}}
            title={config.title}
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="text" label="title" value={config.title} onChange={(v) => setConfig('title', v)} />
  ),

  code: ({ config }) =>
    `import { DataExportCard } from '@goliapkg/gds'\n\n<DataExportCard\n  formats={['CSV', 'JSON', 'Excel']}\n  onExport={(format, dateRange) => download(format, dateRange)}${config.title !== 'Export Data' ? `\n  title="${config.title}"` : ''}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['formats', 'Available export formats', 'string[]', '—'],
        ['onExport', 'Export callback', '(format, dateRange?) => void', '—'],
        ['title', 'Card title', 'string', "'Export Data'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt31.push(dataExportCardItem)

export { patternItemsExt31 }
