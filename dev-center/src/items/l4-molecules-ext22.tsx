import { EmptyPlaceholder, InfoRow } from '@gds/l4-molecules'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsW: DevCenterItem[] = []

const emptyPlaceholderItem: DevCenterItem = {
  id: 'empty-placeholder',
  label: 'EmptyPlaceholder',
  layer: 'l4',
  type: 'interactive',
  tags: ['empty', 'placeholder', 'inline', 'card', 'table', 'molecule'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { EmptyPlaceholder } from '@golia/gds'" />
      <LivePreview>
        <div className="w-72 border border-border rounded-lg">
          <EmptyPlaceholder
            message="No results found"
            icon={<span className="text-2xl">&#128269;</span>}
            action={<button className="text-xs text-accent hover:underline">Clear filters</button>}
          />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { EmptyPlaceholder } from '@golia/gds'\n\n<EmptyPlaceholder\n  message="No results found"\n  icon={<SearchIcon />}\n  action={<Button size="sm">Clear filters</Button>}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['message', 'Placeholder message text', 'string', '—'],
        ['icon', 'Icon above message', 'ReactNode', '—'],
        ['action', 'Action below message', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsW.push(emptyPlaceholderItem)

const infoRowItem: DevCenterItem = {
  id: 'info-row',
  label: 'InfoRow',
  layer: 'l4',
  type: 'interactive',
  tags: ['info', 'row', 'stat', 'dashboard', 'molecule'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { InfoRow } from '@golia/gds'" />
      <LivePreview>
        <div className="w-64 space-y-2">
          <InfoRow label="CPU" value="12%" icon={<span>&#9881;</span>} />
          <InfoRow label="Memory" value="4.2 GB" icon={<span>&#128190;</span>} />
          <InfoRow label="Uptime" value="14 days" icon={<span>&#9200;</span>} />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { InfoRow } from '@golia/gds'\n\n<InfoRow label="CPU" value="12%" icon={<CpuIcon />} />\n<InfoRow label="Memory" value="4.2 GB" icon={<MemoryIcon />} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['label', 'Label text', 'string', '—'],
        ['value', 'Value content', 'ReactNode', '—'],
        ['icon', 'Icon on the left', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsW.push(infoRowItem)

export { moleculeItemsW }
