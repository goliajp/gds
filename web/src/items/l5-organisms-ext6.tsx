import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { AnimatePresence, VideoPlayer } from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

const organismItemsExt6: DevCenterItem[] = []

const videoPlayerItem: DevCenterItem = {
  id: 'video-player',
  label: 'VideoPlayer',
  layer: 'l5',
  type: 'interactive',
  tags: ['video', 'player', 'media', 'controls', 'playback'],
  defaultConfig: { autoPlay: false, muted: false, loop: false, controls: true, glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { VideoPlayer } from '@goliapkg/gds'" />

      <LivePreview className="block">
        <div className="mx-auto w-[400px]">
          <VideoPlayer
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            poster="https://peach.blender.org/wp-content/uploads/bbb-splash.png"
            autoPlay={config.autoPlay}
            muted={config.muted}
            loop={config.loop}
            controls={config.controls}
            glass={config.glass}
          />
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable
          rows={[
            ['src', 'string', '—', 'Video source URL'],
            ['poster', 'string', '—', 'Poster image URL'],
            ['autoPlay', 'boolean', 'false', 'Auto-play on mount'],
            ['muted', 'boolean', 'false', 'Start muted'],
            ['loop', 'boolean', 'false', 'Loop playback'],
            ['controls', 'boolean', 'true', 'Show custom controls overlay'],
            ['glass', 'boolean', 'false', 'Frosted glass material'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="autoPlay" value={config.autoPlay} onChange={(v) => setConfig('autoPlay', v)} />
      <Ctrl type="check" label="muted" value={config.muted} onChange={(v) => setConfig('muted', v)} />
      <Ctrl type="check" label="loop" value={config.loop} onChange={(v) => setConfig('loop', v)} />
      <Ctrl type="check" label="controls" value={config.controls} onChange={(v) => setConfig('controls', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { VideoPlayer } from '@goliapkg/gds'", '']
    lines.push('<VideoPlayer')
    lines.push('  src="/video.mp4"')
    lines.push('  poster="/poster.jpg"')
    if (config.autoPlay === true) lines.push('  autoPlay')
    if (config.muted === true) lines.push('  muted')
    if (config.loop === true) lines.push('  loop')
    if (config.controls === false) lines.push('  controls={false}')
    if (config.glass === true) lines.push('  glass')
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['src', 'Video source URL', 'string', '—'],
        ['poster', 'Poster image URL', 'string', '—'],
        ['autoPlay', 'Auto-play on mount', 'boolean', 'false'],
        ['muted', 'Start muted', 'boolean', 'false'],
        ['loop', 'Loop playback', 'boolean', 'false'],
        ['controls', 'Show custom controls overlay', 'boolean', 'true'],
        ['glass', 'Frosted glass material', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Custom controls overlay with play/pause, progress bar, and volume</p>
          <p>• Poster image shown before playback starts</p>
          <p>• Supports standard HTML5 video formats (mp4, webm, ogg)</p>
        </div>
      </div>
    </div>
  ),
}
organismItemsExt6.push(videoPlayerItem)

const animatePresenceItem: DevCenterItem = {
  id: 'animate-presence',
  label: 'AnimatePresence',
  layer: 'l5',
  type: 'interactive',
  tags: ['animate', 'presence', 'mount', 'unmount', 'transition', 'motion'],
  defaultConfig: { animation: 'fade', duration: 200, visible: true },

  stage: ({ config }) => {
    const [visible, setVisible] = useState(config.visible)

    return (
      <div>
        <ImportLine text="import { AnimatePresence } from '@goliapkg/gds'" />

        <LivePreview className="block">
          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              className="rounded-md bg-accent/20 px-3 py-1.5 text-xs text-accent transition-colors hover:bg-accent/30"
              onClick={() => setVisible((v: boolean) => !v)}
            >
              {visible ? 'Hide' : 'Show'}
            </button>
            <AnimatePresence animation={config.animation} duration={config.duration}>
              {visible && (
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-accent/20 text-sm text-fg-muted">
                  Content
                </div>
              )}
            </AnimatePresence>
          </div>
        </LivePreview>

        <DocSection title="API">
          <DocTable
            rows={[
              ['children', 'ReactNode', '—', 'Content to animate'],
              ['animation', "'fade' | 'scale' | 'slide-up' | 'slide-down'", "'fade'", 'Animation type'],
              ['duration', 'number', '200', 'Animation duration in ms'],
              ['className', 'string', '—', 'Additional CSS classes'],
            ]}
          />
        </DocSection>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="animation" value={config.animation} options={['fade', 'scale', 'slide-up', 'slide-down']} onChange={(v) => setConfig('animation', v)} />
      <Ctrl type="number" label="duration" value={config.duration} onChange={(v) => setConfig('duration', v)} min={50} max={1000} />
      <Ctrl type="check" label="visible" value={config.visible} onChange={(v) => setConfig('visible', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { AnimatePresence } from '@goliapkg/gds'", '']
    lines.push('<AnimatePresence')
    if (config.animation !== 'fade') lines.push(`  animation="${config.animation}"`)
    if (config.duration !== 200) lines.push(`  duration={${config.duration}}`)
    lines.push('>')
    lines.push('  {visible && <div>Content</div>}')
    lines.push('</AnimatePresence>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Content to animate', 'ReactNode', '—'],
        ['animation', 'Animation type', "'fade' | 'scale' | 'slide-up' | 'slide-down'", "'fade'"],
        ['duration', 'Animation duration in ms', 'number', '200'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Animates children on mount and unmount</p>
          <p>• Conditionally render children inside to trigger exit animation</p>
          <p>• Respects prefers-reduced-motion — skips animation when set</p>
        </div>
      </div>
    </div>
  ),
}
organismItemsExt6.push(animatePresenceItem)

export { organismItemsExt6 }
