import { useState } from 'react'

import { Ribbon, VisualCounter } from '@gds/l3-atoms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const atomItemsO: DevCenterItem[] = []

const visualCounterItem: DevCenterItem = {
  id: 'visual-counter',
  label: 'VisualCounter',
  layer: 'l3',
  type: 'interactive',
  tags: ['counter', 'quantity', 'number', 'stepper', 'atom'],
  defaultConfig: { min: '0', max: '10', step: '1' },

  stage: ({ config }) => {
    const [value, setValue] = useState(3)
    return (
      <div>
        <ImportLine text="import { VisualCounter } from '@goliapkg/gds'" />
        <LivePreview>
          <div className="flex items-center gap-8 p-8">
            <VisualCounter value={value} onChange={setValue} min={Number(config.min ?? 0)} max={Number(config.max ?? 0)} step={Number(config.step ?? 0)} />
          </div>
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="min" value={config.min} onChange={(v) => setConfig('min', v)} />
      <Ctrl type="text" label="max" value={config.max} onChange={(v) => setConfig('max', v)} />
      <Ctrl type="pills" label="step" value={config.step} options={['1', '2', '5']} onChange={(v) => setConfig('step', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { VisualCounter } from '@goliapkg/gds'\n\n<VisualCounter\n  value={count}\n  onChange={setCount}\n  min={${config.min}}\n  max={${config.max}}\n  step={${config.step}}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Current number', 'number', '—'],
        ['onChange', 'Value change callback', '(value: number) => void', '—'],
        ['min', 'Minimum value', 'number', '—'],
        ['max', 'Maximum value', 'number', '—'],
        ['step', 'Increment/decrement step', 'number', '1'],
        ['disabled', 'Disable controls', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsO.push(visualCounterItem)

const ribbonItem: DevCenterItem = {
  id: 'ribbon',
  label: 'Ribbon',
  layer: 'l3',
  type: 'interactive',
  tags: ['ribbon', 'banner', 'corner', 'label', 'new', 'sale', 'atom'],
  defaultConfig: { label: 'NEW', variant: 'accent', position: 'top-right' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Ribbon } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex gap-8 p-8">
          <Ribbon label={config.label} variant={config.variant} position={config.position}>
            <div className="flex h-32 w-48 items-center justify-center rounded-lg border border-border bg-bg-secondary text-sm text-fg-muted">
              Content
            </div>
          </Ribbon>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="label" value={config.label} onChange={(v) => setConfig('label', v)} />
      <Ctrl type="pills" label="variant" value={config.variant} options={['accent', 'success', 'warning', 'danger']} onChange={(v) => setConfig('variant', v)} />
      <Ctrl type="pills" label="position" value={config.position} options={['top-right', 'top-left']} onChange={(v) => setConfig('position', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { Ribbon } from '@goliapkg/gds'\n\n<Ribbon label="${config.label}" variant="${config.variant}" position="${config.position}">\n  <Card>...</Card>\n</Ribbon>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Wrapped content', 'ReactNode', '—'],
        ['label', 'Ribbon text', 'string', '—'],
        ['variant', 'Color variant', '"accent" | "success" | "warning" | "danger"', '"accent"'],
        ['position', 'Corner position', '"top-right" | "top-left"', '"top-right"'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsO.push(ribbonItem)

export { atomItemsO }
