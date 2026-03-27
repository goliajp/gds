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
      <ImportLine text="import { Parallax } from '@golia/gds'" />

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
}
organismItemsExt5.push(parallaxItem)

export { organismItemsExt5 }
