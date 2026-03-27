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
}
moleculeItemsN.push(chipGroupItem)

export { moleculeItemsN }
