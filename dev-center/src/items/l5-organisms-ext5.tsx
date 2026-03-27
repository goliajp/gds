import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Parallax } from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

const organismItemsExt5: DevCenterItem[] = []

const parallaxItem: DevCenterItem = {
  id: 'parallax',
  label: 'Parallax',
  layer: 'l5',
  type: 'interactive',
  tags: ['parallax', 'scroll', 'motion', 'animation', 'depth'],
  defaultConfig: { speed: 0.5, direction: 'vertical', disabled: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Parallax } from '@goliapkg/gds'" />

      <LivePreview className="block">
        <div className="relative h-48 overflow-hidden rounded-lg border border-white/[0.06]">
          <Parallax speed={config.speed} direction={config.direction} disabled={config.disabled}>
            <div className="flex flex-col items-center justify-center gap-2 p-8">
              <div className="h-16 w-16 rounded-xl bg-accent/20" />
              <span className="text-sm text-fg-muted">Scroll to see parallax</span>
            </div>
          </Parallax>
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable
          rows={[
            ['children', 'ReactNode', '—', 'Content to apply parallax effect'],
            ['speed', 'number', '0.5', 'Parallax speed factor (0=fixed, 1=normal)'],
            ['direction', "'vertical' | 'horizontal'", "'vertical'", 'Scroll direction'],
            ['disabled', 'boolean', 'false', 'Disable parallax effect'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="speed" value={config.speed} onChange={(v) => setConfig('speed', v)} min={0} max={2} />
      <Ctrl type="pills" label="direction" value={config.direction} options={['vertical', 'horizontal']} onChange={(v) => setConfig('direction', v)} />
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { Parallax } from '@goliapkg/gds'", '']
    lines.push('<Parallax')
    if (config.speed !== 0.5) lines.push(`  speed={${config.speed}}`)
    if (config.direction !== 'vertical') lines.push(`  direction="${config.direction}"`)
    if (config.disabled === true) lines.push('  disabled')
    lines.push('>')
    lines.push('  <div>Parallax content</div>')
    lines.push('</Parallax>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Content to apply parallax effect', 'ReactNode', '—'],
        ['speed', 'Parallax speed factor (0=fixed, 1=normal)', 'number', '0.5'],
        ['direction', 'Scroll direction', "'vertical' | 'horizontal'", "'vertical'"],
        ['disabled', 'Disable parallax effect', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Speed 0 = element stays fixed, speed 1 = scrolls at normal rate</p>
          <p>• Uses transform: translate for GPU-accelerated scrolling</p>
          <p>• Disable on mobile or when prefers-reduced-motion is set</p>
        </div>
      </div>
    </div>
  ),
}
organismItemsExt5.push(parallaxItem)

export { organismItemsExt5 }
