import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { EmojiPicker } from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

const moleculeItemsG: DevCenterItem[] = []

function EmojiPickerDemo({ glass, columns }: { glass: boolean, columns: number }) {
  const [selected, setSelected] = useState('')

  return (
    <div className="flex flex-col items-center gap-3">
      <EmojiPicker onSelect={setSelected} glass={glass} columns={columns} />
      {selected !== '' && (
        <p className="text-xs text-fg-muted">Selected: {selected}</p>
      )}
    </div>
  )
}

const emojiPickerItem: DevCenterItem = {
  id: 'emoji-picker',
  label: 'EmojiPicker',
  layer: 'l4',
  type: 'interactive',
  tags: ['emoji', 'picker', 'grid', 'reaction', 'input'],
  defaultConfig: { glass: false, columns: 8 },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { EmojiPicker } from '@golia/gds'" />
      <LivePreview>
        <EmojiPickerDemo glass={config.glass} columns={config.columns} />
      </LivePreview>
      <DocSection title="Variants" columns={2}>
        <DemoCard title="Default" description="Standard emoji picker" code={`<EmojiPicker onSelect={setEmoji} />`}>
          <EmojiPickerDemo glass={false} columns={8} />
        </DemoCard>
        <DemoCard title="Glass" description="Frosted glass material" code={`<EmojiPicker onSelect={setEmoji} glass />`}>
          <EmojiPickerDemo glass={true} columns={8} />
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
      <Ctrl type="number" label="columns" value={config.columns} min={4} max={12} onChange={(v) => setConfig('columns', v)} />
    </>
  ),

  code: ({ config }) => {
    const props = ['onSelect={(emoji) => setSelected(emoji)}']
    if (config.glass === true) props.push('glass')
    if (config.columns !== 8) props.push(`columns={${config.columns}}`)
    return `import { EmojiPicker } from '@golia/gds'\n\n<EmojiPicker\n  ${props.join('\n  ')}\n/>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['onSelect', 'Called with selected emoji string', '(emoji: string) => void', '—'],
        ['categories', 'Custom emoji categories', '{ name: string, emojis: string[] }[]', 'built-in preset'],
        ['columns', 'Grid columns count', 'number', '8'],
        ['glass', 'Glass material', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsG.push(emojiPickerItem)

export { moleculeItemsG }
