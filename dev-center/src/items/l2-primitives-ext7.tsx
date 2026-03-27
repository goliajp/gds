import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Slider } from '@gds/l2-primitives'

import type { DevCenterItem } from '../types'

function SliderDemo() {
  const [v, set] = useState(40)
  return <Slider value={v} onChange={set} />
}

const primitiveItemsExt7: DevCenterItem[] = [
  {
    id: 'slider',
    label: 'Slider',
    layer: 'l2',
    type: 'interactive',
    tags: ['range', 'input', 'form', 'slider'],
    defaultConfig: { value: 50, min: 0, max: 100, step: 1, disabled: false },

    stage: ({ config, setConfig }) => (
      <div>
        <ImportLine text="import { Slider } from '@goliapkg/gds'" />

        <LivePreview>
          <div className="w-64">
            <Slider
              value={config.value}
              onChange={v => setConfig('value', v)}
              min={config.min}
              max={config.max}
              step={config.step}
              disabled={config.disabled}
            />
          </div>
        </LivePreview>

        <DocSection title="Interactive" columns={2}>
          <DemoCard title="Default" description="Drag or click to set value" code={`<Slider value={val} onChange={setVal} />`}>
            <div className="w-full max-w-xs">
              <SliderDemo />
            </div>
          </DemoCard>
          <DemoCard title="Custom Range" description="Min/max/step configuration" code={`<Slider min={0} max={10} step={0.5} value={val} onChange={setVal} />`}>
            <div className="flex flex-col gap-3">
              <Slider value={5} min={0} max={10} step={1} />
              <Slider value={50} min={0} max={200} step={10} />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="States">
          <DemoCard title="Disabled" description="Non-interactive state" code={`<Slider value={30} disabled />`}>
            <div className="w-full max-w-xs">
              <Slider value={30} disabled />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="value" type="number" value={config.value} min={config.min} max={config.max} onChange={v => setConfig('value', v)} />
        <Ctrl label="min" type="number" value={config.min} min={0} max={config.max - 1} onChange={v => setConfig('min', v)} />
        <Ctrl label="max" type="number" value={config.max} min={config.min + 1} max={1000} onChange={v => setConfig('max', v)} />
        <Ctrl label="step" type="number" value={config.step} min={1} max={100} onChange={v => setConfig('step', v)} />
        <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Slider } from '@goliapkg/gds'", '']
      const props: string[] = ['value={val}', 'onChange={setVal}']
      if (config.min !== 0) props.push(`min={${config.min}}`)
      if (config.max !== 100) props.push(`max={${config.max}}`)
      if (config.step !== 1) props.push(`step={${config.step}}`)
      if (config.disabled === true) props.push('disabled')
      lines.push(`<Slider ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['value', 'Current slider value', 'number', '0'],
          ['onChange', 'Value change callback', '(value: number) => void', '—'],
          ['min', 'Minimum value', 'number', '0'],
          ['max', 'Maximum value', 'number', '100'],
          ['step', 'Value increment', 'number', '1'],
          ['disabled', 'Non-interactive state', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Uses native range input with custom styling</p>
            <p>• Current value displayed as monospace number to the right</p>
            <p>• Accent color for the thumb via accent-accent</p>
            <p>• Includes focus ring via focusCls for keyboard accessibility</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { primitiveItemsExt7 }
