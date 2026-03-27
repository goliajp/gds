import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import {
  Editable,
  RangeSlider,
  ResizeHandle,
  SegmentedControl,
  SplitButton,
  ToggleGroup,
} from '@gds/l3-atoms'

import type { DevCenterItem } from '../types'

function RangeSliderDemo({ showValue, disabled }: { showValue?: boolean, disabled?: boolean } = {}) {
  const [val, setVal] = useState(50)
  return <RangeSlider value={val} onChange={setVal} showValue={showValue} disabled={disabled} />
}

function SegmentedControlDemo({ size, glass }: { size?: string, glass?: boolean } = {}) {
  const [val, setVal] = useState('list')
  return (
    <SegmentedControl
      options={[
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' },
        { value: 'board', label: 'Board' },
      ]}
      value={val}
      onChange={setVal}
      size={size as any}
      glass={glass}
    />
  )
}

function EditableDemo({ placeholder, disabled }: { placeholder?: string, disabled?: boolean } = {}) {
  const [val, setVal] = useState('Click me to edit')
  return (
    <div className="flex flex-col gap-3">
      <Editable value={val} onChange={setVal} placeholder={placeholder} disabled={disabled} />
      <span className="text-[10px] text-fg-muted">Current: &quot;{val}&quot;</span>
    </div>
  )
}

function EditableEmptyDemo() {
  const [val, setVal] = useState('')
  return <Editable value={val} onChange={setVal} placeholder="Enter name..." />
}

function ToggleGroupDemo({ exclusive, size, disabled }: { exclusive?: boolean, size?: string, disabled?: boolean } = {}) {
  const [val, setVal] = useState<string[]>(['bold'])
  return (
    <div className="flex flex-col gap-3">
      <ToggleGroup
        items={[
          { value: 'bold', label: 'B' },
          { value: 'italic', label: 'I' },
          { value: 'underline', label: 'U' },
        ]}
        value={val}
        onChange={setVal}
        exclusive={exclusive}
        size={size as any}
        disabled={disabled}
      />
      <span className="text-[10px] text-fg-muted">Active: [{val.join(', ')}]</span>
    </div>
  )
}

function ResizeHandleDemo({ orientation }: { orientation: 'horizontal' | 'vertical' }) {
  const [size, setSize] = useState(200)
  const isVertical = orientation === 'vertical'
  return (
    <div className={isVertical ? 'flex flex-row items-stretch' : 'flex flex-col items-stretch'}>
      <div
        className="flex items-center justify-center bg-bg-secondary gds-radius text-[11px] text-fg-muted/60"
        style={isVertical ? { width: size } : { height: size }}
      >
        {size}px
      </div>
      <ResizeHandle
        orientation={orientation}
        onResize={(delta) => setSize((prev) => Math.max(60, prev + delta))}
      />
      <div className="flex flex-1 items-center justify-center bg-bg-secondary gds-radius text-[11px] text-fg-muted/60">
        flex
      </div>
    </div>
  )
}

const atomItemsC: DevCenterItem[] = []

const rangeSliderItem: DevCenterItem = {
  id: 'range-slider',
  label: 'RangeSlider',
  layer: 'l3',
  type: 'interactive',
  tags: ['form', 'slider', 'range', 'input'],
  defaultConfig: { value: 50, min: 0, max: 100, step: 1, showValue: false, disabled: false },

  stage: ({ config, setConfig }) => (
    <div>
      <ImportLine text="import { RangeSlider } from '@goliapkg/gds'" />

      <LivePreview>
        <div className="w-64">
          <RangeSlider
            value={config.value}
            onChange={(v: number) => setConfig('value', v)}
            min={config.min}
            max={config.max}
            step={config.step}
            showValue={config.showValue}
            disabled={config.disabled}
          />
        </div>
      </LivePreview>

      <DocSection title="Features" columns={2}>
        <DemoCard title="Default" description="Basic slider with onChange" code={`<RangeSlider value={val} onChange={setVal} />`}>
          <div className="w-48">
            <RangeSliderDemo />
          </div>
        </DemoCard>
        <DemoCard title="With Value Label" description="Show current value above thumb" code={`<RangeSlider value={val} onChange={setVal} showValue />`}>
          <div className="w-48 pt-5">
            <RangeSliderDemo showValue />
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="States" columns={2}>
        <DemoCard title="Custom Range" description="min=0, max=1000, step=50" code={`<RangeSlider value={val} onChange={setVal} min={0} max={1000} step={50} />`}>
          <div className="w-48">
            <RangeSlider value={500} min={0} max={1000} step={50} onChange={() => {}} showValue />
          </div>
        </DemoCard>
        <DemoCard title="Disabled" description="Non-interactive state" code={`<RangeSlider disabled value={50} onChange={setVal} />`}>
          <div className="w-48">
            <RangeSliderDemo disabled />
          </div>
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl label="value" type="number" value={config.value} min={config.min} max={config.max} onChange={(v: number) => setConfig('value', v)} />
      <Ctrl label="min" type="number" value={config.min} min={0} max={config.max - 1} onChange={(v: number) => setConfig('min', v)} />
      <Ctrl label="max" type="number" value={config.max} min={config.min + 1} max={1000} onChange={(v: number) => setConfig('max', v)} />
      <Ctrl label="step" type="number" value={config.step} min={1} max={100} onChange={(v: number) => setConfig('step', v)} />
      <Ctrl label="showValue" type="check" value={config.showValue} onChange={(v: boolean) => setConfig('showValue', v)} />
      <Ctrl label="disabled" type="check" value={config.disabled} onChange={(v: boolean) => setConfig('disabled', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { RangeSlider } from '@goliapkg/gds'", '']
    const props: string[] = [`value={${config.value}}`, 'onChange={setVal}']
    if (config.min !== 0) props.push(`min={${config.min}}`)
    if (config.max !== 100) props.push(`max={${config.max}}`)
    if (config.step !== 1) props.push(`step={${config.step}}`)
    if (config.showValue === true) props.push('showValue')
    if (config.disabled === true) props.push('disabled')
    lines.push(`<RangeSlider ${props.join(' ')} />`)
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Current slider value', 'number', '—'],
        ['onChange', 'Value change callback', '(value: number) => void', '—'],
        ['min', 'Minimum value', 'number', '0'],
        ['max', 'Maximum value', 'number', '100'],
        ['step', 'Step increment', 'number', '1'],
        ['showValue', 'Show value label above thumb', 'boolean', 'false'],
        ['disabled', 'Disable interaction', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Uses native input[type=range] with custom styling for reliability</p>
          <p>• Track fill color follows accent token</p>
          <p>• For precise number entry, pair with NumberInput component</p>
        </div>
      </div>
    </div>
  ),
}

atomItemsC.push(rangeSliderItem)

const segmentedControlItem: DevCenterItem = {
  id: 'segmented-control',
  label: 'SegmentedControl',
  layer: 'l3',
  type: 'interactive',
  tags: ['tabs', 'toggle', 'switch', 'group'],
  defaultConfig: { size: 'default', disabled: false, glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { SegmentedControl } from '@goliapkg/gds'" />

      <LivePreview>
        <SegmentedControlDemo size={config.size} glass={config.glass} />
      </LivePreview>

      <DocSection title="Sizes" columns={2}>
        <DemoCard title="Default Size" description="Standard height for form controls" code={`<SegmentedControl size="default" options={...} />`}>
          <SegmentedControlDemo />
        </DemoCard>
        <DemoCard title="Small Size" description="Compact for toolbar use" code={`<SegmentedControl size="sm" options={...} />`}>
          <SegmentedControlDemo size="sm" />
        </DemoCard>
      </DocSection>

      <DocSection title="States" columns={2}>
        <DemoCard title="Disabled" description="Non-interactive state" code={`<SegmentedControl disabled options={...} />`}>
          <SegmentedControl
            options={[{ value: 'a', label: 'On' }, { value: 'b', label: 'Off' }]}
            value="a"
            onChange={() => {}}
            disabled
          />
        </DemoCard>
        <DemoCard title="Glass" description="Frosted glass surface" code={`<SegmentedControl glass options={...} />`}>
          <SegmentedControlDemo glass />
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl label="size" type="pills" value={config.size} options={['default', 'sm']} onChange={v => setConfig('size', v)} />
      <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
      <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { SegmentedControl } from '@goliapkg/gds'", '']
    lines.push(`<SegmentedControl`)
    lines.push(`  options={[`)
    lines.push(`    { value: 'list', label: 'List' },`)
    lines.push(`    { value: 'grid', label: 'Grid' },`)
    lines.push(`    { value: 'board', label: 'Board' },`)
    lines.push(`  ]}`)
    lines.push(`  value={selected}`)
    lines.push(`  onChange={setSelected}`)
    if (config.size !== 'default') lines.push(`  size="${config.size}"`)
    if (config.disabled === true) lines.push(`  disabled`)
    if (config.glass === true) lines.push(`  glass`)
    lines.push(`/>`)
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['options', 'Segments to display', '{ value: string, label: string }[]', '—'],
        ['value', 'Currently selected value', 'string', '—'],
        ['onChange', 'Callback on selection change', '(value: string) => void', '—'],
        ['size', 'Control size', "'default' | 'sm'", "'default'"],
        ['disabled', 'Disable all segments', 'boolean', 'false'],
        ['glass', 'Frosted glass surface', 'boolean', 'false'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Use for mutually exclusive view modes (list/grid/board)</p>
          <p>• 2-5 options max — for more options use Tabs or Select</p>
          <p>• Active segment gets elevated bg with shadow for depth</p>
        </div>
      </div>
    </div>
  ),
}

atomItemsC.push(segmentedControlItem)

const splitButtonItem: DevCenterItem = {
  id: 'split-button',
  label: 'SplitButton',
  layer: 'l3',
  type: 'interactive',
  tags: ['button', 'dropdown', 'actions', 'menu'],
  variants: ['primary', 'secondary', 'danger'],
  defaultConfig: { size: 'default' },

  stage: ({ config, variant }) => (
    <div>
      <ImportLine text="import { SplitButton } from '@goliapkg/gds'" />

      <LivePreview>
        <SplitButton
          variant={variant as any}
          size={config.size}
          items={[
            { id: 'save-draft', label: 'Save as Draft' },
            { id: 'schedule', label: 'Schedule Publish' },
            { id: 'delete', label: 'Delete', danger: true },
          ]}
          onSelect={() => {}}
          onClick={() => {}}
        >
          Publish
        </SplitButton>
      </LivePreview>

      <DocSection title="Variants" columns={3}>
        <DemoCard title="Primary" description="Default action" code={`<SplitButton variant="primary">Save</SplitButton>`}>
          <SplitButton variant="primary" items={[{ id: 'a', label: 'Alt Action' }]} onSelect={() => {}} onClick={() => {}}>Save</SplitButton>
        </DemoCard>
        <DemoCard title="Secondary" description="Secondary action" code={`<SplitButton variant="secondary">Export</SplitButton>`}>
          <SplitButton variant="secondary" items={[{ id: 'a', label: 'Alt Action' }]} onSelect={() => {}} onClick={() => {}}>Export</SplitButton>
        </DemoCard>
        <DemoCard title="Danger" description="Destructive action" code={`<SplitButton variant="danger">Delete</SplitButton>`}>
          <SplitButton variant="danger" items={[{ id: 'a', label: 'Force Delete' }]} onSelect={() => {}} onClick={() => {}}>Delete</SplitButton>
        </DemoCard>
      </DocSection>

      <DocSection title="Sizes" columns={3}>
        <DemoCard title="Small" description="Compact" code={`<SplitButton size="sm">Action</SplitButton>`}>
          <SplitButton size="sm" items={[{ id: 'a', label: 'Alt' }]} onSelect={() => {}} onClick={() => {}}>Action</SplitButton>
        </DemoCard>
        <DemoCard title="Default" description="Standard" code={`<SplitButton>Action</SplitButton>`}>
          <SplitButton items={[{ id: 'a', label: 'Alt' }]} onSelect={() => {}} onClick={() => {}}>Action</SplitButton>
        </DemoCard>
        <DemoCard title="Large" description="Prominent" code={`<SplitButton size="lg">Action</SplitButton>`}>
          <SplitButton size="lg" items={[{ id: 'a', label: 'Alt' }]} onSelect={() => {}} onClick={() => {}}>Action</SplitButton>
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig, variant, setVariant }) => (
    <>
      <Ctrl label="variant" type="pills" value={variant} options={['primary', 'secondary', 'danger']} onChange={setVariant} />
      <Ctrl label="size" type="pills" value={config.size} options={['sm', 'default', 'lg']} onChange={v => setConfig('size', v)} />
    </>
  ),

  code: ({ config, variant }) => {
    const lines = ["import { SplitButton } from '@goliapkg/gds'", '']
    lines.push(`<SplitButton`)
    if (variant !== 'primary') lines.push(`  variant="${variant}"`)
    if (config.size !== 'default') lines.push(`  size="${config.size}"`)
    lines.push(`  items={[`)
    lines.push(`    { id: 'draft', label: 'Save as Draft' },`)
    lines.push(`    { id: 'delete', label: 'Delete', danger: true },`)
    lines.push(`  ]}`)
    lines.push(`  onSelect={(id) => handleAction(id)}`)
    lines.push(`  onClick={handlePrimary}`)
    lines.push(`>`)
    lines.push(`  Publish`)
    lines.push(`</SplitButton>`)
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Main button label', 'ReactNode', '—'],
        ['variant', 'Visual variant', "'primary' | 'secondary' | 'danger'", "'primary'"],
        ['size', 'Button size', "'sm' | 'default' | 'lg'", "'default'"],
        ['items', 'Dropdown menu items', '{ id: string, label: string, danger?: boolean }[]', '—'],
        ['onSelect', 'Called when dropdown item is clicked', '(id: string) => void', '—'],
        ['onClick', 'Called when main button is clicked', '() => void', '—'],
        ['disabled', 'Disable entire button', 'boolean', 'false'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Use when one action is primary but alternatives exist</p>
          <p>• Main click performs the default action immediately</p>
          <p>• Dropdown closes on item select, click outside, or Escape</p>
        </div>
      </div>
    </div>
  ),
}

atomItemsC.push(splitButtonItem)

const editableItem: DevCenterItem = {
  id: 'editable',
  label: 'Editable',
  layer: 'l3',
  type: 'interactive',
  tags: ['inline', 'edit', 'text', 'input'],
  defaultConfig: { placeholder: 'Click to edit', disabled: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Editable } from '@goliapkg/gds'" />

      <LivePreview>
        <EditableDemo placeholder={config.placeholder} disabled={config.disabled} />
      </LivePreview>

      <DocSection title="States" columns={2}>
        <DemoCard title="Default" description="Click text to enter edit mode" code={`<Editable value={val} onChange={setVal} />`}>
          <EditableDemo />
        </DemoCard>
        <DemoCard title="Empty / Placeholder" description="Placeholder when value is empty" code={`<Editable value="" onChange={setVal} placeholder="Enter name..." />`}>
          <EditableEmptyDemo />
        </DemoCard>
      </DocSection>

      <DocSection title="API" columns={1}>
        <DocTable rows={[
          { prop: 'value', type: 'string', default: '—', description: 'Current text value' },
          { prop: 'onChange', type: '(value: string) => void', default: '—', description: 'Called on save (Enter or blur)' },
          { prop: 'placeholder', type: 'string', default: "'Click to edit'", description: 'Text shown when value is empty' },
          { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disable editing' },
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="placeholder" value={config.placeholder} onChange={(v) => setConfig('placeholder', v)} placeholder="Click to edit" />
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
    </>
  ),
}

atomItemsC.push(editableItem)

const toggleGroupItem: DevCenterItem = {
  id: 'toggle-group',
  label: 'ToggleGroup',
  layer: 'l3',
  type: 'interactive',
  tags: ['toggle', 'button', 'group', 'multi-select', 'toolbar'],
  defaultConfig: { exclusive: false, size: 'default', disabled: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ToggleGroup } from '@goliapkg/gds'" />

      <LivePreview>
        <ToggleGroupDemo exclusive={config.exclusive} size={config.size} disabled={config.disabled} />
      </LivePreview>

      <DocSection title="Modes" columns={2}>
        <DemoCard title="Multi-select" description="Multiple items can be active" code={`<ToggleGroup items={items} value={val} onChange={setVal} />`}>
          <ToggleGroupDemo />
        </DemoCard>
        <DemoCard title="Exclusive" description="Only one item active at a time" code={`<ToggleGroup items={items} value={val} onChange={setVal} exclusive />`}>
          <ToggleGroupDemo exclusive />
        </DemoCard>
      </DocSection>

      <DocSection title="API" columns={1}>
        <DocTable rows={[
          { prop: 'items', type: '{ value: string, label: ReactNode }[]', default: '—', description: 'Toggle items' },
          { prop: 'value', type: 'string[]', default: '—', description: 'Active values' },
          { prop: 'onChange', type: '(value: string[]) => void', default: '—', description: 'Called on toggle' },
          { prop: 'exclusive', type: 'boolean', default: 'false', description: 'Only one active at a time' },
          { prop: 'size', type: "'default' | 'sm'", default: "'default'", description: 'Button size' },
          { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disable all buttons' },
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="exclusive" value={config.exclusive} onChange={(v) => setConfig('exclusive', v)} />
      <Ctrl type="pills" label="size" value={config.size} options={['default', 'sm']} onChange={(v) => setConfig('size', v)} />
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
    </>
  ),
}

atomItemsC.push(toggleGroupItem)

const resizeHandleItem: DevCenterItem = {
  id: 'resize-handle',
  label: 'ResizeHandle',
  layer: 'l3',
  type: 'interactive',
  tags: ['resize', 'drag', 'panel', 'split'],
  variants: ['vertical', 'horizontal'],
  defaultConfig: { disabled: false },

  stage: ({ config, variant }) => (
    <div>
      <ImportLine text="import { ResizeHandle } from '@goliapkg/gds'" />

      <LivePreview className="!h-48">
        <ResizeHandleDemo orientation={variant as 'horizontal' | 'vertical'} />
      </LivePreview>

      <DocSection title="Orientation" columns={2}>
        <DemoCard title="Vertical" description="Split left/right panels" code={`<ResizeHandle\n  orientation="vertical"\n  onResize={(delta) => setWidth(w + delta)}\n/>`}>
          <div className="flex h-16 items-stretch">
            <div className="flex flex-1 items-center justify-center bg-bg-secondary gds-radius text-[10px] text-fg-muted/40">L</div>
            <ResizeHandle orientation="vertical" onResize={() => {}} />
            <div className="flex flex-1 items-center justify-center bg-bg-secondary gds-radius text-[10px] text-fg-muted/40">R</div>
          </div>
        </DemoCard>
        <DemoCard title="Horizontal" description="Split top/bottom panels" code={`<ResizeHandle\n  orientation="horizontal"\n  onResize={(delta) => setHeight(h + delta)}\n/>`}>
          <div className="flex h-16 flex-col items-stretch">
            <div className="flex flex-1 items-center justify-center bg-bg-secondary gds-radius text-[10px] text-fg-muted/40">T</div>
            <ResizeHandle orientation="horizontal" onResize={() => {}} />
            <div className="flex flex-1 items-center justify-center bg-bg-secondary gds-radius text-[10px] text-fg-muted/40">B</div>
          </div>
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
    </>
  ),

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['orientation', 'Resize direction', '"horizontal" | "vertical"', '"vertical"'],
        ['onResize', 'Called with pixel delta on drag', '(delta: number) => void', '—'],
        ['onResizeEnd', 'Called when drag ends', '() => void', '—'],
        ['disabled', 'Disable interaction', 'boolean', 'false'],
        ['className', 'Root element class', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Thin 2px line with 8px drag area for easy grabbing</p>
          <p>• Pair with useState to control adjacent panel size</p>
          <p>• Active state shows accent color for visual feedback</p>
          <p>• Uses document-level mousemove for reliable tracking outside element</p>
        </div>
      </div>
    </div>
  ),
}

atomItemsC.push(resizeHandleItem)

export { atomItemsC }
