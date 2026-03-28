import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { GradientBorder } from '@gds/l2-primitives'

import type { DevCenterItem } from '../types'

const primitiveItemsExt3: DevCenterItem[] = []

const gradientBorderItem: DevCenterItem = {
  id: 'gradient-border',
  label: 'GradientBorder',
  layer: 'l2',
  type: 'interactive',
  tags: ['gradient', 'border', 'container', 'decorative', 'primitive'],
  defaultConfig: {
    gradient: 'linear-gradient(135deg, var(--gds-accent), var(--gds-success))',
    width: 1,
    radius: 12,
  },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { GradientBorder } from '@goliapkg/gds'" />
      <LivePreview>
        <GradientBorder
          gradient={config.gradient}
          width={config.width}
          radius={config.radius}
        >
          <div className="p-6 text-center">
            <p className="text-fg gds-heading font-medium">Gradient Border</p>
            <p className="text-fg-muted gds-text-body mt-1">Content inside a gradient-bordered container</p>
          </div>
        </GradientBorder>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="width" value={config.width} min={1} max={6} onChange={(v) => setConfig('width', v)} />
      <Ctrl type="number" label="radius" value={config.radius} min={0} max={24} onChange={(v) => setConfig('radius', v)} />
      <Ctrl
        type="pills"
        label="gradient"
        value={config.gradient}
        options={[
          'linear-gradient(135deg, var(--gds-accent), var(--gds-success))',
          'linear-gradient(135deg, var(--gds-warning), var(--gds-danger))',
          'linear-gradient(90deg, var(--gds-accent), var(--gds-warning))',
        ]}
        onChange={(v) => setConfig('gradient', v)}
      />
    </>
  ),

  code: ({ config }) =>
    `import { GradientBorder } from '@goliapkg/gds'\n\n<GradientBorder\n  gradient="${config.gradient}"\n  width={${config.width}}\n  radius={${config.radius}}\n>\n  <div className="p-6">Content</div>\n</GradientBorder>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Content inside the border', 'ReactNode', '—'],
        ['gradient', 'CSS gradient for the border', 'string', 'linear-gradient(135deg, accent, success)'],
        ['width', 'Border width in pixels', 'number', '1'],
        ['radius', 'Border radius in pixels', 'number', '12'],
        ['className', 'Outer container CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
primitiveItemsExt3.push(gradientBorderItem)

export { primitiveItemsExt3 }
