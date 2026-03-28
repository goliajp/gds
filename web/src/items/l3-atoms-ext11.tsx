import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { MagneticButton, RippleEffect } from '@gds/l3-atoms'
import { Button } from '@gds/l2-primitives'

import type { DevCenterItem } from '../types'

const atomItemsL: DevCenterItem[] = []

// ripple-effect
const rippleEffectItem: DevCenterItem = {
  id: 'ripple-effect',
  label: 'RippleEffect',
  layer: 'l3',
  type: 'interactive',
  tags: ['ripple', 'click', 'material', 'animation', 'interaction', 'atom'],
  defaultConfig: { color: 'currentColor', disabled: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { RippleEffect } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center justify-center gap-6 p-8">
          <RippleEffect
            color={config.color}
            disabled={config.disabled}
            className="rounded-lg"
          >
            <Button variant="outline">Click for ripple</Button>
          </RippleEffect>
          <RippleEffect
            color={config.color}
            disabled={config.disabled}
            className="rounded-lg"
          >
            <div className="bg-surface rounded-lg px-6 py-4 text-fg">
              Any content
            </div>
          </RippleEffect>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
      <Ctrl
        type="pills"
        label="color"
        value={config.color}
        options={['currentColor', 'var(--gds-accent)', 'var(--gds-success)', 'var(--gds-warning)']}
        onChange={(v) => setConfig('color', v)}
      />
    </>
  ),

  code: ({ config }) =>
    `import { RippleEffect } from '@goliapkg/gds'\n\n<RippleEffect\n  color="${config.color}"\n  disabled={${config.disabled}}\n>\n  <Button>Click me</Button>\n</RippleEffect>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Content that receives ripple effect', 'ReactNode', '—'],
        ['color', 'Ripple circle color', 'string', 'currentColor'],
        ['disabled', 'Prevent ripple on click', 'boolean', 'false'],
        ['className', 'Container CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsL.push(rippleEffectItem)

// magnetic-button
const magneticButtonItem: DevCenterItem = {
  id: 'magnetic-button',
  label: 'MagneticButton',
  layer: 'l3',
  type: 'interactive',
  tags: ['magnetic', 'hover', 'cursor', 'animation', 'interaction', 'atom'],
  defaultConfig: { strength: 0.3, radius: 100 },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { MagneticButton } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center justify-center gap-8 p-12">
          <MagneticButton strength={config.strength} radius={config.radius}>
            <Button variant="primary">Hover me</Button>
          </MagneticButton>
          <MagneticButton strength={config.strength} radius={config.radius}>
            <div className="bg-accent/10 text-accent rounded-full px-6 py-3 font-medium">
              Magnetic
            </div>
          </MagneticButton>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="strength" value={config.strength} min={0.1} max={1} step={0.1} onChange={(v) => setConfig('strength', v)} />
      <Ctrl type="number" label="radius" value={config.radius} min={20} max={300} step={10} onChange={(v) => setConfig('radius', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { MagneticButton } from '@goliapkg/gds'\n\n<MagneticButton\n  strength={${config.strength}}\n  radius={${config.radius}}\n>\n  <Button>Hover me</Button>\n</MagneticButton>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Content that moves toward cursor', 'ReactNode', '—'],
        ['strength', 'Movement multiplier (0-1)', 'number', '0.3'],
        ['radius', 'Activation radius in pixels', 'number', '100'],
        ['className', 'Container CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsL.push(magneticButtonItem)

export { atomItemsL }
