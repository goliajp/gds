import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button } from '@gds/l2-primitives'
import {
  LoadingDots,
  Meter,
  Popover,
  RadioGroup,
  StatusBadge,
  TagInput,
} from '@gds/l3-atoms'

import type { DevCenterItem } from '../types'

function RadioGroupDemo() {
  const [val, setVal] = useState('option-1')
  return (
    <RadioGroup
      value={val}
      onChange={setVal}
      options={[
        { value: 'option-1', label: 'Option A' },
        { value: 'option-2', label: 'Option B' },
        { value: 'option-3', label: 'Option C' },
      ]}
    />
  )
}

const atomItemsB: DevCenterItem[] = [
  {
    id: 'status-badge',
    label: 'StatusBadge',
    layer: 'l3',
    type: 'interactive',
    tags: ['status', 'indicator', 'state'],
    variants: ['active', 'pending', 'draft', 'inactive', 'warning', 'error'],
    defaultConfig: { label: '', size: 'default', glass: false },

    stage: ({ config, variant }) => (
      <div>
        <ImportLine text="import { StatusBadge } from '@goliapkg/gds'" />

        <LivePreview>
          <StatusBadge
            status={variant as any}
            label={config.label !== '' ? config.label : undefined}
            size={config.size}
            glass={config.glass}
          />
        </LivePreview>

        <DocSection title="Statuses" columns={2}>
          <DemoCard title="All Statuses" description="6 semantic status types" code={`<StatusBadge status="active" />\n<StatusBadge status="pending" />\n<StatusBadge status="error" />`}>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status="active" />
              <StatusBadge status="pending" />
              <StatusBadge status="draft" />
              <StatusBadge status="inactive" />
              <StatusBadge status="warning" />
              <StatusBadge status="error" />
            </div>
          </DemoCard>
          <DemoCard title="Custom Label" description="Override default status text" code={`<StatusBadge status="active" label="Online" />`}>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status="active" label="Online" />
              <StatusBadge status="pending" label="In Review" />
              <StatusBadge status="error" label="Failed" />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Sizes & Glass" columns={2}>
          <DemoCard title="Sizes" description="Default and small" code={`<StatusBadge status="active" />\n<StatusBadge status="active" size="sm" />`}>
            <div className="flex items-center gap-3">
              <StatusBadge status="active" />
              <StatusBadge status="active" size="sm" />
              <StatusBadge status="error" />
              <StatusBadge status="error" size="sm" />
            </div>
          </DemoCard>
          <DemoCard title="Glass" description="Glass morphism effect" code={`<StatusBadge status="active" glass />`}>
            <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent/20 to-success/20 p-4">
              <StatusBadge status="active" glass />
              <StatusBadge status="pending" glass />
              <StatusBadge status="error" glass />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig, variant, setVariant }) => (
      <>
        <Ctrl label="status" type="pills" value={variant} options={['active', 'pending', 'draft', 'inactive', 'warning', 'error']} onChange={setVariant} />
        <Ctrl label="size" type="pills" value={config.size} options={['default', 'sm']} onChange={v => setConfig('size', v)} />
        <Ctrl label="label" type="text" value={config.label} placeholder="auto from status" onChange={v => setConfig('label', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config, variant }) => {
      const lines = ["import { StatusBadge } from '@goliapkg/gds'", '']
      const props: string[] = [`status="${variant}"`]
      if (config.label !== '') props.push(`label="${config.label}"`)
      if (config.size !== 'default') props.push(`size="${config.size}"`)
      if (config.glass === true) props.push('glass')
      lines.push(`<StatusBadge ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['status', 'Status type', "'active' | 'pending' | 'draft' | 'inactive' | 'warning' | 'error'", '—'],
          ['label', 'Override display text', 'string', 'auto from status'],
          ['size', 'Badge size', "'default' | 'sm'", "'default'"],
          ['icon', 'Left icon element', 'ReactNode', '—'],
          ['glass', 'Glass morphism effect', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Status text auto-capitalizes from status prop when no label given</p>
            <p>• Use in tables, cards, and lists to show entity state</p>
            <p>• Pair with icon prop for richer status indicators</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'radio-group',
    label: 'RadioGroup',
    layer: 'l3',
    type: 'interactive',
    tags: ['form', 'select', 'radio'],
    defaultConfig: { value: 'option-1', direction: 'vertical', disabled: false },

    stage: ({ config, setConfig }) => (
      <div>
        <ImportLine text="import { RadioGroup } from '@goliapkg/gds'" />

        <LivePreview>
          <RadioGroup
            value={config.value}
            onChange={v => setConfig('value', v)}
            direction={config.direction as any}
            disabled={config.disabled}
            options={[
              { value: 'option-1', label: 'Option A' },
              { value: 'option-2', label: 'Option B' },
              { value: 'option-3', label: 'Option C' },
            ]}
          />
        </LivePreview>

        <DocSection title="Direction" columns={2}>
          <DemoCard title="Vertical" description="Default stacked layout" code={`<RadioGroup\n  value={val}\n  onChange={setVal}\n  options={[...]}\n/>`}>
            <RadioGroupDemo />
          </DemoCard>
          <DemoCard title="Horizontal" description="Inline row layout" code={`<RadioGroup direction="horizontal" ... />`}>
            <RadioGroup
              value="sm"
              direction="horizontal"
              options={[
                { value: 'sm', label: 'Small' },
                { value: 'md', label: 'Medium' },
                { value: 'lg', label: 'Large' },
              ]}
            />
          </DemoCard>
        </DocSection>

        <DocSection title="States">
          <DemoCard title="Disabled" description="Non-interactive state" code={`<RadioGroup disabled options={[...]} />`}>
            <div className="flex gap-8">
              <RadioGroup
                value="a"
                disabled
                options={[
                  { value: 'a', label: 'Selected' },
                  { value: 'b', label: 'Unselected' },
                ]}
              />
              <RadioGroup
                value="x"
                options={[
                  { value: 'x', label: 'Enabled' },
                  { value: 'y', label: 'Disabled', disabled: true },
                ]}
              />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="direction" type="pills" value={config.direction} options={['vertical', 'horizontal']} onChange={v => setConfig('direction', v)} />
        <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { RadioGroup } from '@goliapkg/gds'", '']
      const props: string[] = ['value={val}', 'onChange={setVal}']
      if (config.direction !== 'vertical') props.push(`direction="${config.direction}"`)
      if (config.disabled === true) props.push('disabled')
      lines.push('<RadioGroup')
      for (const p of props) lines.push(`  ${p}`)
      lines.push("  options={[")
      lines.push("    { value: 'a', label: 'Option A' },")
      lines.push("    { value: 'b', label: 'Option B' },")
      lines.push("  ]}")
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['value', 'Selected option value', 'string', '—'],
          ['onChange', 'Selection callback', '(value: string) => void', '—'],
          ['options', 'Radio options array', '{ value: string, label: string, disabled?: boolean }[]', '—'],
          ['direction', 'Layout direction', "'vertical' | 'horizontal'", "'vertical'"],
          ['disabled', 'Disable all options', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for mutually exclusive choices (2-5 options)</p>
            <p>• For more options, consider Select or Dropdown</p>
            <p>• Individual options can be disabled via option.disabled</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'meter',
    label: 'Meter',
    layer: 'l3',
    type: 'interactive',
    tags: ['gauge', 'usage', 'percentage'],
    defaultConfig: { value: 42, min: 0, max: 100, size: 'default', variant: 'auto', label: 'CPU Usage', showValue: true },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Meter } from '@goliapkg/gds'" />

        <LivePreview>
          <div className="max-w-sm w-full">
            <Meter
              value={config.value}
              min={config.min}
              max={config.max}
              size={config.size}
              variant={config.variant as any}
              label={config.label !== '' ? config.label : undefined}
              showValue={config.showValue}
            />
          </div>
        </LivePreview>

        <DocSection title="Auto Color" columns={2}>
          <DemoCard title="Auto Variant" description="Color changes with value" code={`<Meter label="Low" value={20} />\n<Meter label="Mid" value={55} />\n<Meter label="High" value={85} />`}>
            <div className="flex flex-col gap-3 max-w-sm">
              <Meter label="Low" value={20} />
              <Meter label="Medium" value={55} />
              <Meter label="High" value={85} />
            </div>
          </DemoCard>
          <DemoCard title="Fixed Variant" description="Manual color override" code={`<Meter value={50} variant="success" />\n<Meter value={50} variant="danger" />`}>
            <div className="flex flex-col gap-3 max-w-sm">
              <Meter label="Success" value={50} variant="success" />
              <Meter label="Warning" value={50} variant="warning" />
              <Meter label="Danger" value={50} variant="danger" />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Sizes" columns={2}>
          <DemoCard title="Size Comparison" description="sm, default, lg" code={`<Meter value={60} size="sm" />\n<Meter value={60} />\n<Meter value={60} size="lg" />`}>
            <div className="flex flex-col gap-4 max-w-sm">
              <Meter label="Small" value={60} size="sm" />
              <Meter label="Default" value={60} />
              <Meter label="Large" value={60} size="lg" />
            </div>
          </DemoCard>
          <DemoCard title="No Label" description="Bar only" code={`<Meter value={75} showValue={false} />`}>
            <div className="flex flex-col gap-3 max-w-sm">
              <Meter value={30} showValue={false} />
              <Meter value={60} showValue={false} />
              <Meter value={90} showValue={false} />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="value" type="number" value={config.value} min={0} max={100} onChange={v => setConfig('value', v)} />
        <Ctrl label="size" type="pills" value={config.size} options={['sm', 'default', 'lg']} onChange={v => setConfig('size', v)} />
        <Ctrl label="variant" type="pills" value={config.variant} options={['auto', 'default', 'success', 'warning', 'danger']} onChange={v => setConfig('variant', v)} />
        <Ctrl label="label" type="text" value={config.label} onChange={v => setConfig('label', v)} />
        <Ctrl label="showValue" type="check" value={config.showValue} onChange={v => setConfig('showValue', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Meter } from '@goliapkg/gds'", '']
      const props: string[] = [`value={${config.value}}`]
      if (config.label !== '') props.push(`label="${config.label}"`)
      if (config.variant !== 'auto') props.push(`variant="${config.variant}"`)
      if (config.size !== 'default') props.push(`size="${config.size}"`)
      if (config.showValue !== true) props.push('showValue={false}')
      lines.push(`<Meter ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['value', 'Current value', 'number', '—'],
          ['min', 'Minimum value', 'number', '0'],
          ['max', 'Maximum value', 'number', '100'],
          ['variant', 'Color mode', "'auto' | 'default' | 'success' | 'warning' | 'danger'", "'auto'"],
          ['size', 'Bar height', "'sm' | 'default' | 'lg'", "'default'"],
          ['label', 'Label text above bar', 'string', '—'],
          ['showValue', 'Show percentage text', 'boolean', 'true'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Auto variant changes color: green &lt;40%, accent &lt;60%, warning &lt;80%, danger 80%+</p>
            <p>• Use for resource usage, quotas, progress indicators</p>
            <p>• Supports custom min/max range (not just 0-100)</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'loading-dots',
    label: 'LoadingDots',
    layer: 'l3',
    type: 'interactive',
    tags: ['loading', 'animation', 'dots'],
    defaultConfig: { count: 3, size: 'default' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { LoadingDots } from '@goliapkg/gds'" />

        <LivePreview>
          <LoadingDots count={config.count} size={config.size} />
        </LivePreview>

        <DocSection title="Variants" columns={2}>
          <DemoCard title="Sizes" description="Default and small" code={`<LoadingDots />\n<LoadingDots size="sm" />`}>
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <LoadingDots />
                <span className="text-[10px] text-fg-muted">Default</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <LoadingDots size="sm" />
                <span className="text-[10px] text-fg-muted">Small</span>
              </div>
            </div>
          </DemoCard>
          <DemoCard title="Custom Count" description="Variable dot count" code={`<LoadingDots count={2} />\n<LoadingDots count={5} />`}>
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <LoadingDots count={2} />
                <span className="text-[10px] text-fg-muted">2 dots</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <LoadingDots count={5} />
                <span className="text-[10px] text-fg-muted">5 dots</span>
              </div>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Usage">
          <DemoCard title="Inline Loading" description="Embed in text or buttons" code={`<span>Loading<LoadingDots /></span>`}>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1 text-sm text-fg-muted">Thinking<LoadingDots /></span>
              <Button variant="secondary" size="sm" disabled>Saving<LoadingDots size="sm" /></Button>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="size" type="pills" value={config.size} options={['default', 'sm']} onChange={v => setConfig('size', v)} />
        <Ctrl label="count" type="number" value={config.count} min={1} max={8} onChange={v => setConfig('count', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { LoadingDots } from '@goliapkg/gds'", '']
      const props: string[] = []
      if (config.size !== 'default') props.push(`size="${config.size}"`)
      if (config.count !== 3) props.push(`count={${config.count}}`)
      lines.push(`<LoadingDots${props.length > 0 ? ' ' + props.join(' ') : ''} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['count', 'Number of dots', 'number', '3'],
          ['size', 'Dot size', "'default' | 'sm'", "'default'"],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for inline loading indicators (chat, typing status)</p>
            <p>• For full-area loading, prefer Spinner component</p>
            <p>• Dots animate with staggered pulse — each dot delayed by 150ms</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'popover',
    label: 'Popover',
    layer: 'l3',
    type: 'interactive',
    tags: ['popup', 'floating', 'dropdown'],
    defaultConfig: { placement: 'bottom', align: 'start' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Popover } from '@goliapkg/gds'" />

        <LivePreview>
          <Popover
            trigger={<Button variant="secondary" size="sm">Click me</Button>}
            content={<div className="text-xs text-fg-muted whitespace-nowrap">Popover content</div>}
            placement={config.placement as any}
            align={config.align as any}
          />
        </LivePreview>

        <DocSection title="Placement" columns={2}>
          <DemoCard title="Positions" description="4 placement directions" code={`<Popover placement="bottom" trigger={...} content={...} />\n<Popover placement="top" ... />`}>
            <div className="flex items-center gap-4 py-8">
              <Popover trigger={<Button variant="secondary" size="sm">Bottom</Button>} content={<div className="text-xs text-fg-muted">Bottom popover</div>} placement="bottom" />
              <Popover trigger={<Button variant="secondary" size="sm">Top</Button>} content={<div className="text-xs text-fg-muted">Top popover</div>} placement="top" />
              <Popover trigger={<Button variant="secondary" size="sm">Right</Button>} content={<div className="text-xs text-fg-muted">Right popover</div>} placement="right" />
              <Popover trigger={<Button variant="secondary" size="sm">Left</Button>} content={<div className="text-xs text-fg-muted">Left popover</div>} placement="left" />
            </div>
          </DemoCard>
          <DemoCard title="Alignment" description="start, center, end" code={`<Popover align="start" ... />\n<Popover align="center" ... />\n<Popover align="end" ... />`}>
            <div className="flex items-center gap-4 py-8">
              <Popover trigger={<Button variant="secondary" size="sm">Start</Button>} content={<div className="text-xs text-fg-muted">Aligned start</div>} placement="bottom" align="start" />
              <Popover trigger={<Button variant="secondary" size="sm">Center</Button>} content={<div className="text-xs text-fg-muted">Aligned center</div>} placement="bottom" align="center" />
              <Popover trigger={<Button variant="secondary" size="sm">End</Button>} content={<div className="text-xs text-fg-muted">Aligned end</div>} placement="bottom" align="end" />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Rich Content">
          <DemoCard title="Complex Content" description="Any ReactNode as content" code={`<Popover\n  trigger={<Button>Settings</Button>}\n  content={<form>...</form>}\n/>`}>
            <div className="py-8">
              <Popover
                trigger={<Button variant="secondary" size="sm">Settings</Button>}
                content={
                  <div className="flex flex-col gap-2 min-w-[160px]">
                    <div className="text-xs font-medium text-fg">Preferences</div>
                    <div className="text-[10px] text-fg-muted">Notifications: On</div>
                    <div className="text-[10px] text-fg-muted">Theme: Dark</div>
                  </div>
                }
                placement="bottom"
              />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="placement" type="pills" value={config.placement} options={['top', 'bottom', 'left', 'right']} onChange={v => setConfig('placement', v)} />
        <Ctrl label="align" type="pills" value={config.align} options={['start', 'center', 'end']} onChange={v => setConfig('align', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Popover } from '@goliapkg/gds'", '']
      lines.push('<Popover')
      lines.push('  trigger={<Button>Open</Button>}')
      lines.push('  content={<div>Content here</div>}')
      if (config.placement !== 'bottom') lines.push(`  placement="${config.placement}"`)
      if (config.align !== 'start') lines.push(`  align="${config.align}"`)
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['trigger', 'Trigger element', 'ReactNode', '—'],
          ['content', 'Popover content', 'ReactNode', '—'],
          ['placement', 'Position relative to trigger', "'top' | 'bottom' | 'left' | 'right'", "'bottom'"],
          ['align', 'Alignment within placement axis', "'start' | 'center' | 'end'", "'start'"],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Click to toggle, click outside or Escape to dismiss</p>
            <p>• Use for contextual actions, mini forms, or settings panels</p>
            <p>• For hover-triggered info, use Tooltip instead</p>
          </div>
        </div>
      </div>
    ),
  },
]

function TagInputStateless() {
  const [tags, setTags] = useState<string[]>(['react', 'typescript'])
  return <TagInput value={tags} onChange={setTags} placeholder="Add tag..." />
}

const tagInputItem: DevCenterItem = {
  id: 'tag-input',
  label: 'TagInput',
  layer: 'l3',
  type: 'interactive',
  tags: ['form', 'tags', 'chips', 'multi'],
  defaultConfig: { maxTags: 0, error: false, disabled: false, glass: false, placeholder: 'Add tag...' },

  stage: ({ config }) => {
    function TagInputDemo() {
      const [tags, setTags] = useState<string[]>(['react', 'typescript'])
      return (
        <TagInput
          value={tags}
          onChange={setTags}
          placeholder={config.placeholder}
          maxTags={config.maxTags > 0 ? config.maxTags : undefined}
          error={config.error}
          disabled={config.disabled}
          glass={config.glass}
        />
      )
    }
    return (
      <div>
        <ImportLine text="import { TagInput } from '@goliapkg/gds'" />

        <LivePreview>
          <div className="w-72">
            <TagInputDemo />
          </div>
        </LivePreview>

        <DocSection title="Features" columns={2}>
          <DemoCard title="Default" description="Type and press Enter to add tags" code={`<TagInput value={tags} onChange={setTags} placeholder="Add tag..." />`}>
            <div className="w-72">
              <TagInputStateless />
            </div>
          </DemoCard>
          <DemoCard title="Max Tags" description="Limit number of tags" code={`<TagInput value={tags} onChange={setTags} maxTags={3} />`}>
            <div className="w-72">
              <TagInput value={['one', 'two', 'three']} onChange={() => {}} maxTags={3} placeholder="Max 3" />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="States" columns={2}>
          <DemoCard title="Error" description="Invalid input indication" code={`<TagInput error value={tags} onChange={setTags} />`}>
            <div className="w-72">
              <TagInput error value={['invalid']} onChange={() => {}} />
            </div>
          </DemoCard>
          <DemoCard title="Disabled" description="Non-interactive state" code={`<TagInput disabled value={tags} onChange={setTags} />`}>
            <div className="w-72">
              <TagInput disabled value={['locked', 'tags']} onChange={() => {}} />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl label="maxTags" type="number" value={config.maxTags} min={0} max={10} onChange={v => setConfig('maxTags', v)} />
      <Ctrl label="placeholder" type="text" value={config.placeholder} onChange={v => setConfig('placeholder', v)} />
      <Ctrl label="error" type="check" value={config.error} onChange={v => setConfig('error', v)} />
      <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
      <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { TagInput } from '@goliapkg/gds'", '']
    const props: string[] = ['value={tags}', 'onChange={setTags}']
    if (config.placeholder !== '') props.push(`placeholder="${config.placeholder}"`)
    if (config.maxTags > 0) props.push(`maxTags={${config.maxTags}}`)
    if (config.error === true) props.push('error')
    if (config.disabled === true) props.push('disabled')
    if (config.glass === true) props.push('glass')
    lines.push(`<TagInput`)
    for (const p of props) lines.push(`  ${p}`)
    lines.push(`/>`)
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Current tags array', 'string[]', '—'],
        ['onChange', 'Tags change callback', '(tags: string[]) => void', '—'],
        ['placeholder', 'Input placeholder (shown when empty)', 'string', '—'],
        ['maxTags', 'Maximum number of tags', 'number', '—'],
        ['error', 'Error border style', 'boolean', 'false'],
        ['disabled', 'Non-interactive state', 'boolean', 'false'],
        ['glass', 'Glass morphism effect', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Press Enter to add a tag, Backspace on empty input removes last tag</p>
          <p>• Duplicate tags are silently rejected</p>
          <p>• When maxTags is reached, the input is hidden</p>
          <p>• Click anywhere in the container to focus the input</p>
        </div>
      </div>
    </div>
  ),
}

atomItemsB.push(tagInputItem)

export { atomItemsB }

