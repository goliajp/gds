import { OverflowMenu } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const atomItemsAA: DevCenterItem[] = []

const overflowMenuItem: DevCenterItem = {
  id: 'overflow-menu',
  label: 'OverflowMenu',
  layer: 'l4',
  type: 'interactive',
  tags: ['overflow', 'menu', 'more', 'actions', 'ellipsis', 'atom'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { OverflowMenu } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center gap-8">
          <OverflowMenu
            items={[
              { id: 'edit', label: 'Edit' },
              { id: 'duplicate', label: 'Duplicate' },
              { id: 'delete', label: 'Delete' },
            ]}
            onSelect={() => {}}
          />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { OverflowMenu } from '@goliapkg/gds'\n\n<OverflowMenu\n  items={[\n    { id: 'edit', label: 'Edit' },\n    { id: 'delete', label: 'Delete' },\n  ]}\n  onSelect={(id) => console.log(id)}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['items', 'Menu items array', '{ id: string, label: string }[]', '—'],
        ['onSelect', 'Item selected callback', '(id: string) => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsAA.push(overflowMenuItem)

export { atomItemsAA }
