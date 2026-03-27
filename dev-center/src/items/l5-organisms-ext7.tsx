import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { AudioPlayer } from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

const organismItemsExt7: DevCenterItem[] = []

const audioPlayerItem: DevCenterItem = {
  id: 'audio-player',
  label: 'AudioPlayer',
  layer: 'l5',
  type: 'interactive',
  tags: ['audio', 'player', 'media', 'music', 'sound', 'playback'],
  defaultConfig: { title: 'Sample Audio', glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { AudioPlayer } from '@goliapkg/gds'" />

      <LivePreview className="block">
        <div className="mx-auto w-[400px]">
          <AudioPlayer
            src="https://www.w3schools.com/html/horse.ogg"
            title={config.title}
            glass={config.glass}
          />
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable
          rows={[
            ['src', 'string', '—', 'Audio source URL'],
            ['title', 'string', '—', 'Optional title displayed in the player'],
            ['glass', 'boolean', 'false', 'Frosted glass material'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="title" value={config.title} onChange={(v) => setConfig('title', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { AudioPlayer } from '@goliapkg/gds'", '']
    lines.push('<AudioPlayer')
    lines.push('  src="/audio.mp3"')
    if (config.title !== '') lines.push(`  title="${config.title}"`)
    if (config.glass === true) lines.push('  glass')
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['src', 'Audio source URL', 'string', '—'],
        ['title', 'Optional title displayed in the player', 'string', '—'],
        ['glass', 'Frosted glass material', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Custom audio player with play/pause, progress bar, and time display</p>
          <p>• Title is shown above the controls when provided</p>
          <p>• Supports standard HTML5 audio formats (mp3, ogg, wav)</p>
        </div>
      </div>
    </div>
  ),
}
organismItemsExt7.push(audioPlayerItem)

export { organismItemsExt7 }
