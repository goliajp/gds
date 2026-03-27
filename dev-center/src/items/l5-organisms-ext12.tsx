import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { DataList } from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

const organismItemsExt12: DevCenterItem[] = []

const dataListItem: DevCenterItem = {
  id: 'data-list',
  label: 'DataList',
  layer: 'l5',
  type: 'interactive',
  tags: ['data', 'list', 'key-value', 'definition', 'organism'],
  variants: ['vertical', 'horizontal'],
  defaultConfig: { layout: 'vertical', striped: false, glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { DataList } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-80">
          <DataList
            items={[
              { label: 'Name', value: 'Alice Johnson' },
              { label: 'Role', value: 'Senior Engineer' },
              { label: 'Team', value: 'Platform' },
              { label: 'Location', value: 'Tokyo, JP' },
            ]}
            layout={config.layout}
            striped={config.striped}
            glass={config.glass}
          />
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['items', '{ label: string, value: ReactNode }[]', '—', 'Key-value pairs to display'],
          ['layout', '"vertical" | "horizontal"', '"vertical"', 'Label position relative to value'],
          ['striped', 'boolean', 'false', 'Alternating row background'],
          ['glass', 'boolean', 'false', 'Glass surface style'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="layout" value={config.layout} options={['vertical', 'horizontal']} onChange={(v) => setConfig('layout', v)} />
      <Ctrl type="check" label="striped" value={config.striped} onChange={(v) => setConfig('striped', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { DataList } from '@goliapkg/gds'\n\n<DataList\n  items={[\n    { label: 'Name', value: 'Alice' },\n    { label: 'Role', value: 'Engineer' },\n  ]}${config.layout !== 'vertical' ? `\n  layout="${config.layout}"` : ''}${config.striped ? '\n  striped' : ''}${config.glass ? '\n  glass' : ''}\n/>`,
}
organismItemsExt12.push(dataListItem)

export { organismItemsExt12 }
