import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { GlowEffect } from '@gds/l2-primitives'

import type { DevCenterItem } from '../types'

const primitiveItemsExt4: DevCenterItem[] = []

const glowEffectItem: DevCenterItem = {
  id: 'glow-effect',
  label: 'GlowEffect',
  layer: 'l2',
  type: 'interactive',
  tags: ['glow', 'aura', 'light', 'decorative', 'container', 'primitive'],
  defaultConfig: {
    color: 'var(--gds-accent)',
    intensity: 'default',
  },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { GlowEffect } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center justify-center p-12">
          <GlowEffect color={config.color} intensity={config.intensity}>
            <div className="rounded-xl bg-bg px-8 py-6 text-center">
              <p className="text-fg gds-heading font-medium">Glow Effect</p>
              <p className="text-fg-muted gds-text-body mt-1">Content with a colored aura</p>
            </div>
          </GlowEffect>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl
        type="pills"
        label="intensity"
        value={config.intensity}
        options={['sm', 'default', 'lg']}
        onChange={(v) => setConfig('intensity', v)}
      />
      <Ctrl
        type="pills"
        label="color"
        value={config.color}
        options={[
          'var(--gds-accent)',
          'var(--gds-success)',
          'var(--gds-warning)',
          'var(--gds-danger)',
        ]}
        onChange={(v) => setConfig('color', v)}
      />
    </>
  ),

  code: ({ config }) =>
    `import { GlowEffect } from '@goliapkg/gds'\n\n<GlowEffect\n  color="${config.color}"\n  intensity="${config.intensity}"\n>\n  <div>Content</div>\n</GlowEffect>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Content to display with glow behind it', 'ReactNode', '—'],
        ['color', 'CSS color for the glow', 'string', 'var(--gds-accent)'],
        ['intensity', 'Blur and opacity level', '"sm" | "default" | "lg"', '"default"'],
        ['className', 'Container CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
primitiveItemsExt4.push(glowEffectItem)

export { primitiveItemsExt4 }
