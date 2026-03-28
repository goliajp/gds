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
    color: 'accent',
    intensity: 'default',
  },

  stage: ({ config }) => {
    const colorMap: Record<string, string> = {
      accent: 'var(--gds-accent)',
      success: 'var(--gds-success)',
      warning: 'var(--gds-warning)',
      danger: 'var(--gds-danger)',
    }
    const cssColor = colorMap[config.color] ?? 'var(--gds-accent)'
    return (
      <div>
        <ImportLine text="import { GlowEffect } from '@goliapkg/gds'" />
        <LivePreview>
          <div className="flex items-center justify-center p-12">
            <GlowEffect color={cssColor} intensity={config.intensity} radius={12}>
              <div className="rounded-xl bg-bg px-8 py-6 text-center shadow-lg">
                <p className="text-fg gds-heading font-medium">Glow Effect</p>
                <p className="text-fg-muted gds-text-body mt-1">Content with a colored aura</p>
              </div>
            </GlowEffect>
          </div>
        </LivePreview>
      </div>
    )
  },

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
        options={['accent', 'success', 'warning', 'danger']}
        onChange={(v) => setConfig('color', v)}
      />
    </>
  ),

  code: ({ config }) => {
    const colorMap: Record<string, string> = {
      accent: 'var(--gds-accent)',
      success: 'var(--gds-success)',
      warning: 'var(--gds-warning)',
      danger: 'var(--gds-danger)',
    }
    const cssColor = colorMap[config.color] ?? 'var(--gds-accent)'
    return `import { GlowEffect } from '@goliapkg/gds'\n\n<GlowEffect\n  color="${cssColor}"\n  intensity="${config.intensity}"\n>\n  <div>Content</div>\n</GlowEffect>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Content to display with glow behind it', 'ReactNode', '—'],
        ['color', 'CSS color for the glow', 'string', 'var(--gds-accent)'],
        ['intensity', 'Blur and opacity level', '"sm" | "default" | "lg"', '"default"'],
        ['radius', 'Border radius of the glow layer (px)', 'number', '16'],
        ['className', 'Container CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
primitiveItemsExt4.push(glowEffectItem)

export { primitiveItemsExt4 }
