import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { CommandMenu, TabGroup } from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

const moleculeItemsL: DevCenterItem[] = []

const commandMenuItem: DevCenterItem = {
  id: 'command-menu',
  label: 'CommandMenu',
  layer: 'l4',
  type: 'interactive',
  tags: ['command', 'menu', 'search', 'keyboard', 'molecule'],
  defaultConfig: { searchable: true, glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CommandMenu } from '@golia/gds'" />
      <LivePreview>
        <div className="w-72">
          <CommandMenu
            items={[
              { id: 'copy', label: 'Copy', shortcut: '⌘C', group: 'Edit' },
              { id: 'paste', label: 'Paste', shortcut: '⌘V', group: 'Edit' },
              { id: 'find', label: 'Find', shortcut: '⌘F', group: 'Search' },
              { id: 'delete', label: 'Delete', danger: true, group: 'Danger' },
            ]}
            onSelect={() => {}}
            searchable={config.searchable}
            glass={config.glass}
          />
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['items', 'CommandMenuItem[]', '—', 'Menu items with id, label, icon, shortcut, group, danger'],
          ['onSelect', '(id: string) => void', '—', 'Called when an item is selected'],
          ['searchable', 'boolean', 'true', 'Show search input'],
          ['placeholder', 'string', '"Type a command..."', 'Search input placeholder'],
          ['glass', 'boolean', 'false', 'Glass surface style'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="searchable" value={config.searchable} onChange={(v) => setConfig('searchable', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { CommandMenu } from '@golia/gds'\n\n<CommandMenu\n  items={[\n    { id: 'copy', label: 'Copy', shortcut: '⌘C', group: 'Edit' },\n    { id: 'delete', label: 'Delete', danger: true },\n  ]}\n  onSelect={(id) => console.log(id)}${config.searchable === false ? '\n  searchable={false}' : ''}${config.glass ? '\n  glass' : ''}\n/>`,
}
moleculeItemsL.push(commandMenuItem)

const tabGroupItem: DevCenterItem = {
  id: 'tab-group',
  label: 'TabGroup',
  layer: 'l4',
  type: 'interactive',
  tags: ['tab', 'group', 'panel', 'content', 'molecule'],
  defaultConfig: { glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { TabGroup } from '@golia/gds'" />
      <LivePreview>
        <div className="w-80">
          <TabGroup
            tabs={[
              { id: 'general', label: 'General', content: <div className="text-sm text-fg">General settings content</div> },
              { id: 'security', label: 'Security', content: <div className="text-sm text-fg">Security settings content</div> },
              { id: 'billing', label: 'Billing', content: <div className="text-sm text-fg-muted">Billing (disabled)</div>, disabled: true },
            ]}
            glass={config.glass}
          />
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['tabs', 'TabGroupTab[]', '—', 'Tab definitions: id, label, content, disabled?'],
          ['defaultTab', 'string', 'first tab', 'Initially active tab id'],
          ['glass', 'boolean', 'false', 'Glass surface style'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { TabGroup } from '@golia/gds'\n\n<TabGroup\n  tabs={[\n    { id: 'general', label: 'General', content: <GeneralPanel /> },\n    { id: 'security', label: 'Security', content: <SecurityPanel /> },\n  ]}${config.glass ? '\n  glass' : ''}\n/>`,
}
moleculeItemsL.push(tabGroupItem)

export { moleculeItemsL }
