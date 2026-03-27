import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { ChipGroup } from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

const moleculeItemsN: DevCenterItem[] = []

function ChipGroupDemo({ exclusive }: { exclusive?: boolean }) {
  const [value, setValue] = useState<string[]>(['react'])
  return (
    <ChipGroup
      options={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'angular', label: 'Angular' },
      ]}
      value={value}
      onChange={setValue}
      exclusive={exclusive}
    />
  )
}

const chipGroupItem: DevCenterItem = {
  id: 'chip-group',
  label: 'ChipGroup',
  layer: 'l4',
  type: 'interactive',
  tags: ['chip', 'group', 'select', 'multi', 'toggle', 'filter', 'molecule'],
  defaultConfig: { exclusive: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ChipGroup } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-80">
          <ChipGroupDemo exclusive={config.exclusive} />
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['options', '{ value: string, label: string }[]', '—', 'Available chip options'],
          ['value', 'string[]', '—', 'Currently selected values'],
          ['onChange', '(value: string[]) => void', '—', 'Selection change handler'],
          ['exclusive', 'boolean', 'false', 'Single select mode (radio behavior)'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="exclusive" value={config.exclusive} onChange={(v) => setConfig('exclusive', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { ChipGroup } from '@goliapkg/gds'\n\nconst [value, setValue] = useState<string[]>([])\n\n<ChipGroup\n  options={[\n    { value: 'react', label: 'React' },\n    { value: 'vue', label: 'Vue' },\n  ]}\n  value={value}\n  onChange={setValue}${config.exclusive ? '\n  exclusive' : ''}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['options', 'Available chip options', '{ value: string, label: string }[]', '—'],
        ['value', 'Currently selected values', 'string[]', '—'],
        ['onChange', 'Selection change handler', '(value: string[]) => void', '—'],
        ['exclusive', 'Single select mode (radio behavior)', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Default mode allows multiple selections (checkbox behavior)</p>
          <p>• Exclusive mode restricts to a single selection (radio behavior)</p>
          <p>• Use for filter bars, tag selection, and option toggles</p>
        </div>
      </div>
    </div>
  ),
}
moleculeItemsN.push(chipGroupItem)

export { moleculeItemsN }
