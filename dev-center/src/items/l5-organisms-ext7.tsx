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
}
organismItemsExt7.push(audioPlayerItem)

export { organismItemsExt7 }
