import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button } from '@gds/l2-primitives'
import {
  FormBuilder,
  InfiniteScroll,
  Kanban,
  SortableList,
  Tree,
  VirtualList,
} from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

function FormBuilderDemo() {
  const [values, setValues] = useState<Record<string, unknown>>({
    name: '',
    email: '',
    role: 'engineer',
    bio: '',
    terms: false,
  })
  return (
    <FormBuilder
      fields={[
        { id: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter name' },
        { id: 'email', label: 'Email', type: 'text', required: true, placeholder: 'you@example.com' },
        { id: 'role', label: 'Role', type: 'select', options: ['engineer', 'designer', 'manager'] },
        { id: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell us about yourself' },
        { id: 'terms', label: 'Accept terms', type: 'checkbox' },
      ]}
      values={values}
      onChange={(id, value) => setValues({ ...values, [id]: value })}
    />
  )
}

const organismItemsExt: DevCenterItem[] = [
  {
    id: 'form-builder',
    label: 'FormBuilder',
    layer: 'l5',
    type: 'interactive',
    tags: ['form', 'schema', 'dynamic', 'fields'],
    defaultConfig: { fieldCount: '4' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { FormBuilder } from '@goliapkg/gds'" />

        <LivePreview className="!justify-start !p-6">
          <FormBuilderDemo />
        </LivePreview>

        <DocSection title="Field Types" columns={2}>
          <DemoCard title="Text & Number" description="Standard input fields" code={`{ id: 'name', label: 'Name', type: 'text', required: true }\n{ id: 'age', label: 'Age', type: 'number' }`}>
            <div className="text-[11px] text-fg-muted/60">text, number, textarea — all render native inputs with consistent styling</div>
          </DemoCard>
          <DemoCard title="Select & Checkbox" description="Choice-based fields" code={`{ id: 'role', label: 'Role', type: 'select', options: ['dev', 'pm'] }\n{ id: 'terms', label: 'Accept', type: 'checkbox' }`}>
            <div className="text-[11px] text-fg-muted/60">select renders a dropdown, checkbox renders inline toggle</div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="fields" type="pills" value={config.fieldCount} options={['2', '3', '4', '5']} onChange={v => setConfig('fieldCount', v)} />
      </>
    ),

    code: () => {
      const lines = ["import { FormBuilder } from '@goliapkg/gds'", '']
      lines.push('<FormBuilder')
      lines.push('  fields={[')
      lines.push("    { id: 'name', label: 'Name', type: 'text', required: true },")
      lines.push("    { id: 'role', label: 'Role', type: 'select', options: ['dev', 'pm'] },")
      lines.push('  ]}')
      lines.push('  values={values}')
      lines.push('  onChange={(id, val) => update(id, val)}')
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['fields', 'Field schema definitions', 'FormField[]', '—'],
          ['values', 'Current field values', 'Record<string, unknown>', '—'],
          ['onChange', 'Value change callback', '(id: string, value: unknown) => void', '—'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">FormField</div>
          <DocTable rows={[
            ['id', 'Unique field identifier', 'string', '—'],
            ['label', 'Display label', 'string', '—'],
            ['type', 'Input type', "'text' | 'number' | 'textarea' | 'select' | 'checkbox'", '—'],
            ['options', 'Select dropdown options', 'string[]', '—'],
            ['required', 'Show required marker', 'boolean', 'false'],
            ['placeholder', 'Input placeholder', 'string', '—'],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Schema-driven — define fields as data, not JSX</p>
            <p>• Fully controlled — parent owns values and onChange</p>
            <p>• Required fields display a red asterisk marker</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'kanban',
    label: 'Kanban',
    layer: 'l5',
    type: 'interactive',
    tags: ['board', 'columns', 'cards', 'drag'],
    defaultConfig: { columnCount: '3' },

    stage: ({ config }) => {
      const allColumns = [
        {
          id: 'todo',
          title: 'To Do',
          items: [
            { id: 'k1', title: 'Design tokens', description: 'Define color palette', tags: ['design'] },
            { id: 'k2', title: 'Button variants', tags: ['component'] },
          ],
        },
        {
          id: 'progress',
          title: 'In Progress',
          items: [
            { id: 'k3', title: 'DataTable sort', description: 'Add column sorting', tags: ['feature'] },
          ],
        },
        {
          id: 'done',
          title: 'Done',
          items: [
            { id: 'k4', title: 'Theme system', tags: ['core'] },
            { id: 'k5', title: 'Glass material', tags: ['style'] },
          ],
        },
        {
          id: 'review',
          title: 'Review',
          items: [
            { id: 'k6', title: 'Code review', tags: ['process'] },
          ],
        },
      ]
      const columns = allColumns.slice(0, Number(config.columnCount))
      return (
        <div>
          <ImportLine text="import { Kanban } from '@goliapkg/gds'" />

          <LivePreview className="!p-3 overflow-x-auto">
            <Kanban columns={columns} />
          </LivePreview>

          <DocSection title="Features" columns={2}>
            <DemoCard title="Tagged Cards" description="Cards with categorization tags" code={`items: [{ id: '1', title: 'Task', tags: ['design', 'urgent'] }]`}>
              <Kanban columns={[{
                id: 'demo', title: 'Backlog', items: [
                  { id: 'd1', title: 'Tagged item', description: 'With multiple tags', tags: ['urgent', 'design', 'v2'] },
                ],
              }]} />
            </DemoCard>
            <DemoCard title="Empty Column" description="Placeholder for columns with no items" code={`{ id: 'empty', title: 'Archive', items: [] }`}>
              <Kanban columns={[{ id: 'empty', title: 'Archive', items: [] }]} />
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="columns" type="pills" value={config.columnCount} options={['1', '2', '3', '4']} onChange={v => setConfig('columnCount', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Kanban } from '@goliapkg/gds'", '']
      lines.push('<Kanban')
      lines.push('  columns={[')
      lines.push("    { id: 'todo', title: 'To Do', items: [")
      lines.push("      { id: '1', title: 'Task', tags: ['design'] },")
      lines.push('    ] },')
      lines.push("    { id: 'done', title: 'Done', items: [] },")
      lines.push('  ]}')
      lines.push('  onMoveItem={(id, from, to) => move(id, from, to)}')
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['columns', 'Board column definitions', 'KanbanColumn[]', '—'],
          ['onMoveItem', 'Item move callback', '(itemId, fromCol, toCol) => void', '—'],
          ['renderItem', 'Custom card renderer', '(item: KanbanItem) => ReactNode', '—'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">KanbanItem</div>
          <DocTable rows={[
            ['id', 'Unique identifier', 'string', '—'],
            ['title', 'Card title', 'string', '—'],
            ['description', 'Optional body text', 'string', '—'],
            ['tags', 'Categorization labels', 'string[]', '—'],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Each column shows item count in header</p>
            <p>• Provide renderItem for fully custom card layout</p>
            <p>• Horizontal scroll when columns overflow container</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'tree',
    label: 'Tree',
    layer: 'l5',
    type: 'interactive',
    tags: ['hierarchy', 'folder', 'nested', 'expand'],
    defaultConfig: { expandAll: false },

    stage: ({ config }) => {
      const nodes = [
        {
          id: 'src',
          label: 'src',
          children: [
            {
              id: 'components',
              label: 'components',
              children: [
                { id: 'button', label: 'button.tsx' },
                { id: 'input', label: 'input.tsx' },
                { id: 'card', label: 'card.tsx' },
              ],
            },
            {
              id: 'utils',
              label: 'utils',
              children: [
                { id: 'cx', label: 'cx.ts' },
                { id: 'hooks', label: 'hooks.ts' },
              ],
            },
            { id: 'index', label: 'index.ts' },
          ],
        },
        { id: 'pkg', label: 'package.json' },
        { id: 'tsconfig', label: 'tsconfig.json' },
      ]
      const expanded = config.expandAll === true
        ? ['src', 'components', 'utils']
        : ['src', 'components']
      return (
        <div>
          <ImportLine text="import { Tree } from '@goliapkg/gds'" />

          <LivePreview className="!justify-start">
            <Tree nodes={nodes} defaultExpanded={expanded} onSelect={() => {}} />
          </LivePreview>

          <DocSection title="Features" columns={2}>
            <DemoCard title="Nested Hierarchy" description="Unlimited nesting depth with indentation" code={`nodes={[{ id: 'root', label: 'root', children: [...] }]}`}>
              <Tree nodes={[{
                id: 'a', label: 'level-0', children: [
                  { id: 'b', label: 'level-1', children: [
                    { id: 'c', label: 'level-2', children: [
                      { id: 'd', label: 'leaf' },
                    ] },
                  ] },
                ],
              }]} defaultExpanded={['a', 'b', 'c']} onSelect={() => {}} />
            </DemoCard>
            <DemoCard title="Selection" description="Highlight active node with accent" code={`<Tree nodes={nodes} selected="button" />`}>
              <Tree nodes={[
                { id: 'f1', label: 'app.tsx' },
                { id: 'f2', label: 'index.ts' },
                { id: 'f3', label: 'utils.ts' },
              ]} selected="f2" onSelect={() => {}} />
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="expandAll" type="check" value={config.expandAll} onChange={v => setConfig('expandAll', v)} />
      </>
    ),

    code: () => {
      const lines = ["import { Tree } from '@goliapkg/gds'", '']
      lines.push('<Tree')
      lines.push('  nodes={[')
      lines.push("    { id: 'src', label: 'src', children: [")
      lines.push("      { id: 'app', label: 'app.tsx' },")
      lines.push('    ] },')
      lines.push('  ]}')
      lines.push("  defaultExpanded={['src']}")
      lines.push('  onSelect={(id) => select(id)}')
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['nodes', 'Tree node hierarchy', 'TreeNode[]', '—'],
          ['onSelect', 'Node click callback', '(id: string) => void', '—'],
          ['selected', 'Highlighted node id', 'string', '—'],
          ['defaultExpanded', 'Initially expanded node ids', 'string[]', '[]'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">TreeNode</div>
          <DocTable rows={[
            ['id', 'Unique identifier', 'string', '—'],
            ['label', 'Display text', 'string', '—'],
            ['icon', 'Custom icon element', 'ReactNode', '—'],
            ['children', 'Child nodes', 'TreeNode[]', '—'],
            ['disabled', 'Non-interactive state', 'boolean', 'false'],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Chevron rotates to indicate expanded/collapsed state</p>
            <p>• Leaf nodes (no children) show blank spacer instead of chevron</p>
            <p>• Indent increases 16px per nesting level</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'virtual-list',
    label: 'VirtualList',
    layer: 'l5',
    type: 'interactive',
    tags: ['scroll', 'performance', 'windowed', 'large'],
    defaultConfig: { itemCount: 200, rowHeight: 36 },

    stage: ({ config }) => {
      const count = Number(config.itemCount)
      const height = Number(config.rowHeight)
      const items = Array.from({ length: count }, (_, i) => ({
        id: i,
        label: `Item ${i + 1}`,
        desc: `Description for row ${i + 1}`,
      }))
      return (
        <div>
          <ImportLine text="import { VirtualList } from '@goliapkg/gds'" />

          <LivePreview className="!p-0">
            <div style={{ height: 240, width: '100%' }}>
              <VirtualList
                items={items}
                itemHeight={height}
                height={240}
                renderItem={(item) => (
                  <div className="flex items-center px-3 text-sm text-fg border-b border-border/30" style={{ height }}>
                    <span className="w-12 text-fg-muted text-xs">{item.id + 1}</span>
                    <span className="flex-1">{item.label}</span>
                    <span className="text-xs text-fg-muted">{item.desc}</span>
                  </div>
                )}
              />
            </div>
          </LivePreview>

          <DocSection title="Performance" columns={2}>
            <DemoCard title="Large Dataset" description="Only visible rows are rendered" code={`// 10,000 items — same perf as 10\n<VirtualList items={huge} itemHeight={36} height={400} />`}>
              <div className="text-[11px] text-fg-muted/60">Renders {count} items but only ~{Math.ceil(240 / height) + 6} DOM nodes exist at any time</div>
            </DemoCard>
            <DemoCard title="Custom Row Height" description="Adjust itemHeight for dense or spacious layouts" code={`<VirtualList itemHeight={28} />  // compact\n<VirtualList itemHeight={48} />  // spacious`}>
              <div className="text-[11px] text-fg-muted/60">Current row height: {height}px, overscan: 3 rows above/below viewport</div>
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="itemCount" type="number" value={config.itemCount} min={10} max={10000} onChange={v => setConfig('itemCount', v)} />
        <Ctrl label="rowHeight" type="number" value={config.rowHeight} min={20} max={80} onChange={v => setConfig('rowHeight', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { VirtualList } from '@goliapkg/gds'", '']
      lines.push('<VirtualList')
      lines.push('  items={data}')
      lines.push(`  itemHeight={${config.rowHeight}}`)
      lines.push('  height={400}')
      lines.push('  renderItem={(item) => (')
      lines.push('    <div>{item.label}</div>')
      lines.push('  )}')
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['items', 'Data array to render', 'T[]', '—'],
          ['itemHeight', 'Fixed row height in px', 'number', '—'],
          ['renderItem', 'Row renderer function', '(item: T, index: number) => ReactNode', '—'],
          ['height', 'Container viewport height', 'number | string', '400'],
          ['overscan', 'Extra rows rendered above/below', 'number', '3'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• All items must have the same fixed height (no variable row heights)</p>
            <p>• Overscan renders extra rows to prevent flicker during fast scroll</p>
            <p>• Items are absolutely positioned — renderItem must fill the row height</p>
            <p>• For 10k+ items, this is the only performant option vs native list</p>
          </div>
        </div>
      </div>
    ),
  },

  {
    id: 'infinite-scroll',
    label: 'InfiniteScroll',
    layer: 'l5',
    type: 'interactive',
    tags: ['scroll', 'load', 'pagination', 'infinite'],
    defaultConfig: { hasMore: true, loading: false },

    stage: ({ config }) => {
      function InfiniteScrollDemo() {
        const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`))
        const [loading, setLoading] = useState(false)

        function handleLoadMore() {
          setLoading(true)
          setTimeout(() => {
            const start = items.length
            setItems((prev) => [
              ...prev,
              ...Array.from({ length: 10 }, (_, i) => `Item ${start + i + 1}`),
            ])
            setLoading(false)
          }, 800)
        }

        return (
          <InfiniteScroll
            onLoadMore={handleLoadMore}
            hasMore={items.length < 60}
            loading={loading}
            className="max-h-64 overflow-y-auto rounded border border-border"
          >
            {items.map((item) => (
              <div key={item} className="border-b border-border/50 px-3 py-2 text-[11px] text-fg-muted/70">
                {item}
              </div>
            ))}
          </InfiniteScroll>
        )
      }
      return (
        <div>
          <ImportLine text="import { InfiniteScroll } from '@goliapkg/gds'" />
          <LivePreview className="!justify-start !p-4">
            <InfiniteScrollDemo />
          </LivePreview>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl type="check" label="hasMore" value={config.hasMore} onChange={(v) => setConfig('hasMore', v)} />
        <Ctrl type="check" label="loading" value={config.loading} onChange={(v) => setConfig('loading', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { InfiniteScroll } from '@goliapkg/gds'", '']
      lines.push('<InfiniteScroll')
      lines.push('  onLoadMore={loadMore}')
      if (config.hasMore === false) lines.push('  hasMore={false}')
      else lines.push('  hasMore={hasMore}')
      if (config.loading === true) lines.push('  loading')
      lines.push('>')
      lines.push('  {items.map((item) => (')
      lines.push('    <div key={item.id}>{item.label}</div>')
      lines.push('  ))}')
      lines.push('</InfiniteScroll>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['onLoadMore', 'Called when sentinel enters viewport', '() => void', '—'],
          ['hasMore', 'Whether more data is available', 'boolean', '—'],
          ['loading', 'Show loading indicator at bottom', 'boolean', 'false'],
          ['threshold', 'IntersectionObserver threshold', 'number', '0.8'],
          ['loader', 'Custom loading element', 'ReactNode', '<LoadingDots />'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Uses IntersectionObserver for performant scroll detection</p>
            <p>• Set hasMore=false when all data is loaded to stop observing</p>
            <p>• Will not call onLoadMore while loading=true to prevent duplicates</p>
            <p>• Sentinel div is invisible — placed at the bottom of content</p>
          </div>
        </div>
      </div>
    ),
  },

  {
    id: 'sortable-list',
    label: 'SortableList',
    layer: 'l5',
    type: 'interactive',
    tags: ['drag', 'drop', 'reorder', 'list', 'sortable'],
    defaultConfig: { disabled: false },

    stage: ({ config }) => {
      function SortableListDemo() {
        const [items, setItems] = useState([
          { id: 'a', content: <span className="text-[11px]">Design system tokens</span> },
          { id: 'b', content: <span className="text-[11px]">Component primitives</span> },
          { id: 'c', content: <span className="text-[11px]">Atom components</span> },
          { id: 'd', content: <span className="text-[11px]">Molecule components</span> },
          { id: 'e', content: <span className="text-[11px]">Organism components</span> },
        ])
        return (
          <SortableList
            items={items}
            onReorder={setItems}
            disabled={config.disabled}
            className="rounded border border-border"
          />
        )
      }
      return (
        <div>
          <ImportLine text="import { SortableList } from '@goliapkg/gds'" />
          <LivePreview className="!justify-start !p-4">
            <SortableListDemo />
          </LivePreview>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { SortableList } from '@goliapkg/gds'", '']
      lines.push('<SortableList')
      lines.push('  items={[')
      lines.push("    { id: 'a', content: <span>First item</span> },")
      lines.push("    { id: 'b', content: <span>Second item</span> },")
      lines.push('  ]}')
      lines.push('  onReorder={setItems}')
      if (config.disabled === true) lines.push('  disabled')
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['items', 'Array of { id, content } items', '{ id: string, content: ReactNode }[]', '—'],
          ['onReorder', 'Called with reordered items after drop', '(items) => void', '—'],
          ['disabled', 'Disable drag and drop', 'boolean', 'false'],
          ['className', 'Root element class', 'string', '—'],
          ['itemClassName', 'Class applied to each item row', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Uses HTML5 Drag and Drop API — no external dependencies</p>
            <p>• Grip icon appears as drag handle on each item</p>
            <p>• Dragging item shows reduced opacity, drop target shows accent border</p>
            <p>• Items are immutably reordered — original array is not mutated</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { organismItemsExt }
