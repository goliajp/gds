import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { AnimatedList, Confetti, SignaturePad } from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

const organismItemsExt4: DevCenterItem[] = []

// signature-pad
function SignaturePadDemo({ width, height, strokeWidth, disabled }: {
  width?: number
  height?: number
  strokeWidth?: number
  disabled?: boolean
}) {
  const [lastSign, setLastSign] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-3 items-center">
      <SignaturePad
        width={width}
        height={height}
        strokeWidth={strokeWidth}
        disabled={disabled}
        onSign={setLastSign}
      />
      {lastSign !== null && (
        <span className="text-[10px] text-fg-muted">Signature captured ({lastSign.length} chars)</span>
      )}
    </div>
  )
}

const signaturePadItem: DevCenterItem = {
  id: 'signature-pad',
  label: 'SignaturePad',
  layer: 'l5',
  type: 'interactive',
  tags: ['signature', 'canvas', 'draw', 'sign', 'capture', 'handwriting'],
  defaultConfig: { width: 400, height: 200, strokeWidth: 2, disabled: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { SignaturePad } from '@goliapkg/gds'" />

      <LivePreview>
        <SignaturePadDemo
          width={config.width}
          height={config.height}
          strokeWidth={config.strokeWidth}
          disabled={config.disabled}
        />
      </LivePreview>

      <DocSection title="API">
        <DocTable
          rows={[
            ['onSign', '(dataUrl: string) => void', '—', 'Callback with base64 PNG on sign end'],
            ['width', 'number', '400', 'Canvas width in pixels'],
            ['height', 'number', '200', 'Canvas height in pixels'],
            ['strokeColor', 'string', "'var(--gds-fg)'", 'Drawing stroke color'],
            ['strokeWidth', 'number', '2', 'Drawing stroke width'],
            ['disabled', 'boolean', 'false', 'Disabled state'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="width" value={config.width} onChange={(v) => setConfig('width', v)} min={200} max={800} />
      <Ctrl type="number" label="height" value={config.height} onChange={(v) => setConfig('height', v)} min={100} max={400} />
      <Ctrl type="number" label="strokeWidth" value={config.strokeWidth} onChange={(v) => setConfig('strokeWidth', v)} min={1} max={8} />
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { SignaturePad } from '@goliapkg/gds'", '']
    lines.push('<SignaturePad')
    lines.push('  onSign={(dataUrl) => save(dataUrl)}')
    if (config.width !== 400) lines.push(`  width={${config.width}}`)
    if (config.height !== 200) lines.push(`  height={${config.height}}`)
    if (config.strokeWidth !== 2) lines.push(`  strokeWidth={${config.strokeWidth}}`)
    if (config.disabled === true) lines.push('  disabled')
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['onSign', 'Callback with base64 PNG on sign end', '(dataUrl: string) => void', '—'],
        ['width', 'Canvas width in pixels', 'number', '400'],
        ['height', 'Canvas height in pixels', 'number', '200'],
        ['strokeColor', 'Drawing stroke color', 'string', "'var(--gds-fg)'"],
        ['strokeWidth', 'Drawing stroke width', 'number', '2'],
        ['disabled', 'Disabled state', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Canvas-based drawing — captures signature as base64 PNG</p>
          <p>• Clear button resets the canvas</p>
          <p>• onSign fires when the user finishes drawing (pointer up)</p>
        </div>
      </div>
    </div>
  ),
}
organismItemsExt4.push(signaturePadItem)

// animated-list
function AnimatedListDemo({ animation, stagger }: { animation: string, stagger: number }) {
  const [key, setKey] = useState(0)

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        className="rounded-md bg-accent/10 px-3 py-1 text-xs text-accent hover:bg-accent/20"
        onClick={() => setKey((k) => k + 1)}
        type="button"
      >
        Replay
      </button>
      <AnimatedList key={key} animation={animation as any} stagger={stagger}>
        {['Design tokens', 'Primitives', 'Atoms', 'Molecules', 'Organisms'].map((item) => (
          <div
            key={item}
            className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-sm text-fg-muted"
          >
            {item}
          </div>
        ))}
      </AnimatedList>
    </div>
  )
}

const animatedListItem: DevCenterItem = {
  id: 'animated-list',
  label: 'AnimatedList',
  layer: 'l5',
  type: 'interactive',
  tags: ['list', 'animation', 'stagger', 'fade', 'slide', 'enter', 'motion'],
  defaultConfig: { animation: 'slide-up', stagger: 50 },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { AnimatedList } from '@goliapkg/gds'" />

      <LivePreview>
        <AnimatedListDemo animation={config.animation} stagger={config.stagger} />
      </LivePreview>

      <DocSection title="API">
        <DocTable
          rows={[
            ['children', 'ReactNode', '—', 'List items'],
            ['animation', "'fade' | 'slide-up' | 'slide-left' | 'scale'", "'slide-up'", 'Animation type'],
            ['stagger', 'number', '50', 'Delay between items (ms)'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="animation" value={config.animation} options={['fade', 'slide-up', 'slide-left', 'scale']} onChange={(v) => setConfig('animation', v)} />
      <Ctrl type="number" label="stagger" value={config.stagger} onChange={(v) => setConfig('stagger', v)} min={0} max={200} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { AnimatedList } from '@goliapkg/gds'", '']
    lines.push('<AnimatedList')
    if (config.animation !== 'slide-up') lines.push(`  animation="${config.animation}"`)
    if (config.stagger !== 50) lines.push(`  stagger={${config.stagger}}`)
    lines.push('>')
    lines.push('  <div>Item 1</div>')
    lines.push('  <div>Item 2</div>')
    lines.push('  <div>Item 3</div>')
    lines.push('</AnimatedList>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'List items', 'ReactNode', '—'],
        ['animation', 'Animation type', "'fade' | 'slide-up' | 'slide-left' | 'scale'", "'slide-up'"],
        ['stagger', 'Delay between items (ms)', 'number', '50'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Each child animates in sequence with configurable stagger delay</p>
          <p>• Use for lists, menus, or any sequential content entrance</p>
          <p>• Respects prefers-reduced-motion — disables animation when set</p>
        </div>
      </div>
    </div>
  ),
}
organismItemsExt4.push(animatedListItem)

// confetti
function ConfettiDemo({ duration, particleCount }: { duration: number, particleCount: number }) {
  const [active, setActive] = useState(false)

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        className="rounded-md bg-accent/10 px-4 py-2 text-sm text-accent hover:bg-accent/20 transition-colors"
        onClick={() => {
          setActive(false)
          requestAnimationFrame(() => setActive(true))
        }}
        type="button"
      >
        Launch Confetti
      </button>
      <Confetti active={active} duration={duration} particleCount={particleCount} />
      <span className="text-[10px] text-fg-muted/50">{active ? 'Active' : 'Inactive'}</span>
    </div>
  )
}

const confettiItem: DevCenterItem = {
  id: 'confetti',
  label: 'Confetti',
  layer: 'l5',
  type: 'interactive',
  tags: ['confetti', 'celebration', 'animation', 'particles', 'canvas', 'fun'],
  defaultConfig: { duration: 3000, particleCount: 100 },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Confetti } from '@goliapkg/gds'" />

      <LivePreview>
        <ConfettiDemo duration={config.duration} particleCount={config.particleCount} />
      </LivePreview>

      <DocSection title="API">
        <DocTable
          rows={[
            ['active', 'boolean', '—', 'Trigger confetti animation'],
            ['duration', 'number', '3000', 'Animation duration in ms'],
            ['particleCount', 'number', '100', 'Number of particles to spawn'],
            ['colors', 'string[]', 'palette defaults', 'Particle colors array'],
            ['className', 'string', '—', 'Additional CSS classes on canvas'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="duration" value={config.duration} onChange={(v) => setConfig('duration', v)} min={500} max={10000} />
      <Ctrl type="number" label="particleCount" value={config.particleCount} onChange={(v) => setConfig('particleCount', v)} min={10} max={500} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { Confetti } from '@goliapkg/gds'", '']
    lines.push('<Confetti')
    lines.push('  active={active}')
    if (config.duration !== 3000) lines.push(`  duration={${config.duration}}`)
    if (config.particleCount !== 100) lines.push(`  particleCount={${config.particleCount}}`)
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['active', 'Trigger confetti animation', 'boolean', '—'],
        ['duration', 'Animation duration in ms', 'number', '3000'],
        ['particleCount', 'Number of particles to spawn', 'number', '100'],
        ['colors', 'Particle colors array', 'string[]', 'palette defaults'],
        ['className', 'Additional CSS classes on canvas', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Toggle active to true to trigger the animation</p>
          <p>• Canvas-based rendering with gravity and fade-out physics</p>
          <p>• Re-trigger by toggling active false then true</p>
        </div>
      </div>
    </div>
  ),
}
organismItemsExt4.push(confettiItem)

export { organismItemsExt4 }
