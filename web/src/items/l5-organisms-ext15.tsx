import { StackedList } from '@gds/l5-organisms'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt15: DevCenterItem[] = [
  {
    id: 'stacked-list',
    label: 'StackedList',
    layer: 'l5',
    type: 'interactive',
    tags: ['list', 'select', 'vertical', 'stacked'],
    defaultConfig: { dividers: true, glass: false, showHeader: true },

    stage: ({ config }) => {
      const items = [
        { id: '1', title: 'Design tokens', description: 'Color, spacing, typography', trailing: <span className="text-[10px] text-fg-muted">v1.2</span> },
        { id: '2', title: 'Component library', description: 'Primitives and molecules' },
        { id: '3', title: 'Pattern catalog', description: 'Full-page compositions', trailing: <span className="text-[10px] text-success">new</span> },
        { id: '4', title: 'Chart system', description: 'Data visualization components' },
      ]
      return (
        <div>
          <ImportLine text="import { StackedList } from '@goliapkg/gds'" />

          <LivePreview className="!justify-start !p-6">
            <StackedList
              items={items}
              selectedId="2"
              dividers={config.dividers}
              glass={config.glass}
              header={config.showHeader ? <span className="text-xs font-medium text-fg-muted">Modules</span> : undefined}
              footer={<span className="text-[10px] text-fg-muted">4 items</span>}
            />
          </LivePreview>

          <DocSection title="Variants" columns={2}>
            <DemoCard title="With Selection" description="Highlight active item" code={`<StackedList items={items} selectedId="2" onSelect={setId} />`}>
              <StackedList
                items={[
                  { id: 'a', title: 'Selected item' },
                  { id: 'b', title: 'Normal item' },
                ]}
                selectedId="a"
              />
            </DemoCard>
            <DemoCard title="No Dividers" description="Clean borderless rows" code={`<StackedList items={items} dividers={false} />`}>
              <StackedList
                items={[
                  { id: 'x', title: 'Item one' },
                  { id: 'y', title: 'Item two' },
                ]}
                dividers={false}
              />
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="dividers" type="check" value={config.dividers} onChange={v => setConfig('dividers', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
        <Ctrl label="showHeader" type="check" value={config.showHeader} onChange={v => setConfig('showHeader', v)} />
      </>
    ),

    code: () => [
      "import { StackedList } from '@goliapkg/gds'",
      '',
      '<StackedList',
      '  items={[',
      "    { id: '1', title: 'Design tokens', description: 'Color, spacing' },",
      "    { id: '2', title: 'Components', description: 'UI building blocks' },",
      '  ]}',
      '  selectedId={selectedId}',
      '  onSelect={(id) => setSelectedId(id)}',
      '  header={<span>Modules</span>}',
      '/>',
    ].join('\n'),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['items', 'List item data', 'StackedListItem[]', '—'],
          ['header', 'Header slot above items', 'ReactNode', '—'],
          ['footer', 'Footer slot below items', 'ReactNode', '—'],
          ['onSelect', 'Item click callback', '(id: string) => void', '—'],
          ['selectedId', 'Highlighted item id', 'string', '—'],
          ['dividers', 'Show borders between items', 'boolean', 'true'],
          ['glass', 'Apply glass material', 'boolean', 'false'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">StackedListItem</div>
          <DocTable rows={[
            ['id', 'Unique identifier', 'string', '—'],
            ['title', 'Primary text', 'string', '—'],
            ['description', 'Secondary text', 'string', '—'],
            ['icon', 'Leading icon', 'ReactNode', '—'],
            ['trailing', 'Trailing element', 'ReactNode', '—'],
          ]} />
        </div>
      </div>
    ),
  },
]

export { organismItemsExt15 }
