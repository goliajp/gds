import { SliderField, ToggleField } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsAG: DevCenterItem[] = []

const sliderFieldItem: DevCenterItem = {
  id: 'slider-field',
  label: 'SliderField',
  layer: 'l4',
  type: 'interactive',
  tags: ['slider', 'range', 'field', 'label', 'value', 'molecule'],
  defaultConfig: { value: 50, min: 0, max: 100, unit: '%' },

  stage: ({ config, setConfig }) => (
    <div>
      <ImportLine text="import { SliderField } from '@golia/gds'" />
      <LivePreview>
        <div className="w-72 space-y-4">
          <SliderField label="Volume" value={config.value} onChange={(v) => setConfig('value', v)} min={config.min} max={config.max} unit={config.unit} />
          <SliderField label="Brightness" value={75} onChange={() => {}} unit="%" />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="value" value={config.value} min={0} max={100} onChange={(v) => setConfig('value', v)} />
      <Ctrl type="text" label="unit" value={config.unit} onChange={(v) => setConfig('unit', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { SliderField } from '@golia/gds'\n\n<SliderField label="Volume" value={${config.value}} onChange={setValue}${config.unit ? ` unit="${config.unit}"` : ''} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['label', 'Field label', 'string', '—'],
        ['value', 'Current value', 'number', '—'],
        ['onChange', 'Value change callback', '(v: number) => void', '—'],
        ['min', 'Minimum value', 'number', '0'],
        ['max', 'Maximum value', 'number', '100'],
        ['step', 'Step increment', 'number', '1'],
        ['unit', 'Unit suffix for display', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsAG.push(sliderFieldItem)

const toggleFieldItem: DevCenterItem = {
  id: 'toggle-field',
  label: 'ToggleField',
  layer: 'l4',
  type: 'interactive',
  tags: ['toggle', 'switch', 'field', 'settings', 'molecule'],
  defaultConfig: { checked: true, disabled: false },

  stage: ({ config, setConfig }) => (
    <div>
      <ImportLine text="import { ToggleField } from '@golia/gds'" />
      <LivePreview>
        <div className="w-72 space-y-3">
          <ToggleField label="Dark mode" description="Use dark color scheme" checked={config.checked} onChange={(v) => setConfig('checked', v)} disabled={config.disabled} />
          <ToggleField label="Notifications" checked={true} onChange={() => {}} />
          <ToggleField label="Auto-save" description="Save changes automatically" checked={false} onChange={() => {}} disabled />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="checked" value={config.checked} onChange={(v) => setConfig('checked', v)} />
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { ToggleField } from '@golia/gds'\n\n<ToggleField\n  label="Dark mode"\n  description="Use dark color scheme"\n  checked={${config.checked}}\n  onChange={setChecked}${config.disabled ? '\n  disabled' : ''}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['label', 'Field label', 'string', '—'],
        ['description', 'Optional description text', 'string', '—'],
        ['checked', 'Toggle state', 'boolean', '—'],
        ['onChange', 'State change callback', '(v: boolean) => void', '—'],
        ['disabled', 'Disable interaction', 'boolean', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsAG.push(toggleFieldItem)

export { moleculeItemsAG }
