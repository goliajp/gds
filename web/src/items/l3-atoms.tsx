import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button } from '@gds/l2-primitives'
import {
  Avatar,
  Checkbox,
  Chip,
  Rating,
  Switch,
  Tooltip,
} from '@gds/l3-atoms'

import type { DevCenterItem } from '../types'

function CheckboxDemo() {
  const [v, set] = useState(false)
  return (
    <div className="flex flex-col gap-3">
      <Checkbox checked={v} onChange={set} label="Accept terms" />
      <Checkbox checked label="Already checked" />
      <Checkbox disabled label="Disabled" />
    </div>
  )
}

function SwitchDemo() {
  const [v, set] = useState(false)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Switch checked={v} onChange={set} />
        <span className="text-xs text-fg">{v ? 'On' : 'Off'}</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch checked size="sm" />
        <span className="text-xs text-fg-muted">Small</span>
      </div>
    </div>
  )
}

function RatingDemo() {
  const [v, set] = useState(3)
  return (
    <div className="flex flex-col gap-3">
      <Rating value={v} onChange={set} />
      <span className="text-xs text-fg-muted">Rating: {v}/5</span>
    </div>
  )
}

const atomItems: DevCenterItem[] = [
  {
    id: 'avatar',
    label: 'Avatar',
    layer: 'l3',
    type: 'interactive',
    tags: ['user', 'profile', 'image'],
    defaultConfig: { size: 'default', status: 'none', name: 'Alice', src: '' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Avatar } from '@goliapkg/gds'" />

        <LivePreview>
          <Avatar
            size={config.size}
            status={config.status !== 'none' ? config.status : undefined}
            name={config.name}
            src={config.src !== '' ? config.src : undefined}
          />
        </LivePreview>

        <DocSection title="Sizes" columns={2}>
          <DemoCard title="All Sizes" description="xs, sm, default, lg" code={`<Avatar name="A" size="xs" />\n<Avatar name="B" size="sm" />\n<Avatar name="C" />\n<Avatar name="D" size="lg" />`}>
            <div className="flex items-center gap-3">
              <Avatar name="Alice" size="xs" />
              <Avatar name="Bob" size="sm" />
              <Avatar name="Charlie" />
              <Avatar name="Diana" size="lg" />
            </div>
          </DemoCard>
          <DemoCard title="With Photo" description="Image avatar with fallback" code={`<Avatar src="/photo.jpg" name="User" size="lg" />`}>
            <div className="flex items-center gap-3">
              <Avatar src="https://i.pravatar.cc/80?u=gds" size="lg" name="Photo" />
              <Avatar src="https://i.pravatar.cc/80?u=gds2" name="Alt" />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Status" columns={2}>
          <DemoCard title="Status Indicators" description="4 status states" code={`<Avatar name="A" status="online" />\n<Avatar name="B" status="away" />\n<Avatar name="C" status="busy" />\n<Avatar name="D" status="offline" />`}>
            <div className="flex items-center gap-3">
              <Avatar name="Alice" status="online" />
              <Avatar name="Bob" status="away" />
              <Avatar name="Charlie" status="busy" />
              <Avatar name="Diana" status="offline" />
            </div>
          </DemoCard>
          <DemoCard title="Color Hashing" description="Automatic palette color from name" code={`<Avatar name="Eve" />\n<Avatar name="Frank" />\n<Avatar name="Grace" />`}>
            <div className="flex items-center gap-3">
              <Avatar name="Eve" />
              <Avatar name="Frank" />
              <Avatar name="Grace" />
              <Avatar name="Hana" />
              <Avatar name="Ivan" />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="size" type="pills" value={config.size} options={['xs', 'sm', 'default', 'lg']} onChange={v => setConfig('size', v)} />
        <Ctrl label="status" type="pills" value={config.status} options={['none', 'online', 'away', 'busy', 'offline']} onChange={v => setConfig('status', v)} />
        <Ctrl label="name" type="text" value={config.name} onChange={v => setConfig('name', v)} />
        <Ctrl label="src" type="text" value={config.src} placeholder="image url" onChange={v => setConfig('src', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Avatar } from '@goliapkg/gds'", '']
      const props: string[] = []
      if (config.name !== '') props.push(`name="${config.name}"`)
      if (config.size !== 'default') props.push(`size="${config.size}"`)
      if (config.status !== 'none') props.push(`status="${config.status}"`)
      if (config.src !== '') props.push(`src="${config.src}"`)
      lines.push(`<Avatar ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['name', 'User name for initials + color hash', 'string', '—'],
          ['src', 'Image URL (overrides initials)', 'string', '—'],
          ['size', 'Avatar size', "'xs' | 'sm' | 'default' | 'lg'", "'default'"],
          ['status', 'Online status indicator', "'online' | 'away' | 'busy' | 'offline'", '—'],
          ['glass', 'Glass morphism effect', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Name is hashed to one of 10 palette colors for consistent coloring</p>
            <p>• Initials extracted: "Alice Bob" → "AB", "Charlie" → "CH"</p>
            <p>• Use AvatarGroup for stacked overlapping avatars with overflow count</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'checkbox',
    label: 'Checkbox',
    layer: 'l3',
    type: 'interactive',
    tags: ['form', 'toggle', 'check'],
    defaultConfig: { checked: false, disabled: false, label: 'Accept terms' },

    stage: ({ config, setConfig }) => (
      <div>
        <ImportLine text="import { Checkbox } from '@goliapkg/gds'" />

        <LivePreview>
          <Checkbox
            checked={config.checked}
            onChange={v => setConfig('checked', v)}
            disabled={config.disabled}
            label={config.label}
          />
        </LivePreview>

        <DocSection title="States" columns={2}>
          <DemoCard title="Interactive" description="Toggle with onChange handler" code={`<Checkbox checked={val} onChange={setVal} label="Accept terms" />`}>
            <CheckboxDemo />
          </DemoCard>
          <DemoCard title="Disabled" description="Non-interactive state" code={`<Checkbox disabled label="Disabled unchecked" />\n<Checkbox checked disabled label="Disabled checked" />`}>
            <div className="flex flex-col gap-3">
              <Checkbox disabled label="Disabled unchecked" />
              <Checkbox checked disabled label="Disabled checked" />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="checked" type="check" value={config.checked} onChange={v => setConfig('checked', v)} />
        <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
        <Ctrl label="label" type="text" value={config.label} onChange={v => setConfig('label', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Checkbox } from '@goliapkg/gds'", '']
      const props: string[] = ['checked={val}', 'onChange={setVal}']
      if (config.disabled === true) props.push('disabled')
      if (config.label !== '') props.push(`label="${config.label}"`)
      lines.push(`<Checkbox ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['checked', 'Checked state', 'boolean', 'false'],
          ['onChange', 'Toggle callback', '(checked: boolean) => void', '—'],
          ['label', 'Label text', 'string', '—'],
          ['disabled', 'Non-interactive state', 'boolean', 'false'],
          ['checkIcon', 'Custom check icon', 'ReactNode', 'built-in SVG'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Uses button role with aria-checked for accessibility</p>
            <p>• Supports forwardRef for form library integration</p>
            <p>• Custom check icon via checkIcon prop</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'switch',
    label: 'Switch',
    layer: 'l3',
    type: 'interactive',
    tags: ['toggle', 'boolean'],
    defaultConfig: { checked: false, size: 'default', disabled: false, label: '' },

    stage: ({ config, setConfig }) => (
      <div>
        <ImportLine text="import { Switch } from '@goliapkg/gds'" />

        <LivePreview>
          <Switch
            checked={config.checked}
            onChange={v => setConfig('checked', v)}
            size={config.size}
            disabled={config.disabled}
            label={config.label !== '' ? config.label : undefined}
          />
        </LivePreview>

        <DocSection title="Variants" columns={2}>
          <DemoCard title="Interactive" description="Toggle with state feedback" code={`const [on, setOn] = useState(false)\n<Switch checked={on} onChange={setOn} />`}>
            <SwitchDemo />
          </DemoCard>
          <DemoCard title="With Label" description="Inline label text" code={`<Switch checked={on} onChange={setOn} label="Notifications" />`}>
            <div className="flex flex-col gap-3">
              <Switch checked label="Enabled" />
              <Switch label="Disabled feature" />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Sizes & States" columns={2}>
          <DemoCard title="Sizes" description="Default and small" code={`<Switch size="default" />\n<Switch size="sm" />`}>
            <div className="flex items-center gap-4">
              <Switch checked />
              <Switch checked size="sm" />
            </div>
          </DemoCard>
          <DemoCard title="Disabled" description="Non-interactive state" code={`<Switch disabled />\n<Switch checked disabled />`}>
            <div className="flex items-center gap-4">
              <Switch disabled />
              <Switch checked disabled />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="checked" type="check" value={config.checked} onChange={v => setConfig('checked', v)} />
        <Ctrl label="size" type="pills" value={config.size} options={['default', 'sm']} onChange={v => setConfig('size', v)} />
        <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
        <Ctrl label="label" type="text" value={config.label} onChange={v => setConfig('label', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Switch } from '@goliapkg/gds'", '']
      const props: string[] = ['checked={on}', 'onChange={setOn}']
      if (config.size !== 'default') props.push(`size="${config.size}"`)
      if (config.disabled === true) props.push('disabled')
      if (config.label !== '') props.push(`label="${config.label}"`)
      lines.push(`<Switch ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['checked', 'On/off state', 'boolean', 'false'],
          ['onChange', 'Toggle callback', '(checked: boolean) => void', '—'],
          ['size', 'Track size', "'default' | 'sm'", "'default'"],
          ['disabled', 'Non-interactive state', 'boolean', 'false'],
          ['label', 'Inline label text', 'string', '—'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Uses button with role="switch" and aria-checked</p>
            <p>• Wrapped in label element for click-to-toggle on label text</p>
            <p>• Spring-animated thumb with translate transition</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'chip',
    label: 'Chip',
    layer: 'l3',
    type: 'interactive',
    tags: ['tag', 'filter', 'label'],
    variants: ['default', 'accent', 'success', 'warning', 'danger'],
    defaultConfig: { label: 'React', glass: false, removable: false },

    stage: ({ config, variant }) => (
      <div>
        <ImportLine text="import { Chip } from '@goliapkg/gds'" />

        <LivePreview>
          <Chip
            label={config.label}
            variant={variant as any}
            glass={config.glass}
            onRemove={config.removable ? () => {} : undefined}
          />
        </LivePreview>

        <DocSection title="Variants" columns={2}>
          <DemoCard title="Semantic" description="5 color variants" code={`<Chip label="Default" />\n<Chip label="Accent" variant="accent" />\n<Chip label="Success" variant="success" />`}>
            <div className="flex flex-wrap items-center gap-2">
              <Chip label="Default" />
              <Chip label="Accent" variant="accent" />
              <Chip label="Success" variant="success" />
              <Chip label="Warning" variant="warning" />
              <Chip label="Danger" variant="danger" />
            </div>
          </DemoCard>
          <DemoCard title="Removable" description="With dismiss button" code={`<Chip label="Tag" onRemove={() => remove()} />`}>
            <div className="flex flex-wrap items-center gap-2">
              <Chip label="React" variant="accent" onRemove={() => {}} />
              <Chip label="TypeScript" variant="success" onRemove={() => {}} />
              <Chip label="Rust" variant="warning" onRemove={() => {}} />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Styles">
          <DemoCard title="Glass" description="Glass morphism effect" code={`<Chip label="Glass" glass />`}>
            <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent/20 to-success/20 p-4">
              <Chip label="Glass" variant="accent" glass />
              <Chip label="Frosted" variant="success" glass />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig, variant, setVariant }) => (
      <>
        <Ctrl label="variant" type="pills" value={variant} options={['default', 'accent', 'success', 'warning', 'danger']} onChange={setVariant} />
        <Ctrl label="label" type="text" value={config.label} onChange={v => setConfig('label', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
        <Ctrl label="removable" type="check" value={config.removable} onChange={v => setConfig('removable', v)} />
      </>
    ),

    code: ({ config, variant }) => {
      const lines = ["import { Chip } from '@goliapkg/gds'", '']
      const props: string[] = [`label="${config.label}"`]
      if (variant !== 'default') props.push(`variant="${variant}"`)
      if (config.glass === true) props.push('glass')
      if (config.removable === true) props.push('onRemove={() => remove()}')
      lines.push(`<Chip ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['label', 'Display text', 'string', '—'],
          ['variant', 'Color variant', "'default' | 'accent' | 'success' | 'warning' | 'danger'", "'default'"],
          ['icon', 'Left icon element', 'ReactNode', '—'],
          ['onRemove', 'Remove callback (shows X button)', '() => void', '—'],
          ['removeIcon', 'Custom remove icon', 'ReactNode', 'built-in X SVG'],
          ['glass', 'Glass morphism effect', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use chips for tags, filters, or multi-select tokens</p>
            <p>• Add onRemove for dismissible chips — auto-shows X button</p>
            <p>• Uses CVA variants — extend via chipVariants export</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'rating',
    label: 'Rating',
    layer: 'l3',
    type: 'interactive',
    tags: ['stars', 'score', 'feedback'],
    defaultConfig: { value: 3, max: 5, size: 'default', readonly: false },

    stage: ({ config, setConfig }) => (
      <div>
        <ImportLine text="import { Rating } from '@goliapkg/gds'" />

        <LivePreview>
          <Rating
            value={config.value}
            onChange={v => setConfig('value', v)}
            max={config.max}
            size={config.size}
            readonly={config.readonly}
          />
        </LivePreview>

        <DocSection title="Interactive" columns={2}>
          <DemoCard title="Editable" description="Click to change rating" code={`<Rating value={val} onChange={setVal} />`}>
            <RatingDemo />
          </DemoCard>
          <DemoCard title="Readonly" description="Display-only mode" code={`<Rating value={4} readonly />`}>
            <div className="flex flex-col gap-3">
              <Rating value={5} readonly />
              <Rating value={3} readonly />
              <Rating value={1} readonly />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Sizes & Custom Max" columns={2}>
          <DemoCard title="Sizes" description="sm, default, lg" code={`<Rating value={3} size="sm" readonly />\n<Rating value={3} readonly />\n<Rating value={3} size="lg" readonly />`}>
            <div className="flex flex-col gap-3">
              <Rating value={3} size="sm" readonly />
              <Rating value={3} readonly />
              <Rating value={3} size="lg" readonly />
            </div>
          </DemoCard>
          <DemoCard title="Custom Max" description="Up to N stars" code={`<Rating value={7} max={10} readonly />`}>
            <Rating value={7} max={10} readonly />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="value" type="number" value={config.value} min={0} max={config.max} onChange={v => setConfig('value', v)} />
        <Ctrl label="max" type="number" value={config.max} min={1} max={10} onChange={v => setConfig('max', v)} />
        <Ctrl label="size" type="pills" value={config.size} options={['sm', 'default', 'lg']} onChange={v => setConfig('size', v)} />
        <Ctrl label="readonly" type="check" value={config.readonly} onChange={v => setConfig('readonly', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Rating } from '@goliapkg/gds'", '']
      const props: string[] = ['value={val}']
      if (config.readonly !== true) props.push('onChange={setVal}')
      if (config.max !== 5) props.push(`max={${config.max}}`)
      if (config.size !== 'default') props.push(`size="${config.size}"`)
      if (config.readonly === true) props.push('readonly')
      lines.push(`<Rating ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['value', 'Current rating value', 'number', '—'],
          ['onChange', 'Rating change callback', '(value: number) => void', '—'],
          ['max', 'Maximum stars', 'number', '5'],
          ['size', 'Star size', "'sm' | 'default' | 'lg'", "'default'"],
          ['readonly', 'Display-only mode', 'boolean', 'false'],
          ['renderStar', 'Custom star renderer', '(filled: boolean, index: number) => ReactNode', 'built-in star SVG'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Hover preview shows tentative rating before click</p>
            <p>• Use readonly for display contexts (reviews, scores)</p>
            <p>• Custom icons via renderStar prop (hearts, thumbs, etc.)</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'tooltip',
    label: 'Tooltip',
    layer: 'l3',
    type: 'interactive',
    tags: ['hover', 'hint', 'info'],
    defaultConfig: { content: 'Helpful hint', placement: 'top', delay: 300, glass: false, interactive: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Tooltip } from '@goliapkg/gds'" />

        <LivePreview>
          <Tooltip
            content={config.content}
            placement={config.placement as any}
            delay={config.delay}
            glass={config.glass}
            interactive={config.interactive}
          >
            <Button variant="secondary" size="sm">Hover me</Button>
          </Tooltip>
        </LivePreview>

        <DocSection title="Placement" columns={2}>
          <DemoCard title="4 Positions" description="top, bottom, left, right" code={`<Tooltip content="Top" placement="top">...</Tooltip>\n<Tooltip content="Bottom" placement="bottom">...</Tooltip>`}>
            <div className="flex items-center gap-6 py-6">
              <Tooltip content="Top tooltip" placement="top"><Button variant="secondary" size="sm">Top</Button></Tooltip>
              <Tooltip content="Bottom tooltip" placement="bottom"><Button variant="secondary" size="sm">Bottom</Button></Tooltip>
              <Tooltip content="Left tooltip" placement="left"><Button variant="secondary" size="sm">Left</Button></Tooltip>
              <Tooltip content="Right tooltip" placement="right"><Button variant="secondary" size="sm">Right</Button></Tooltip>
            </div>
          </DemoCard>
          <DemoCard title="Glass" description="Glass morphism tooltip" code={`<Tooltip content="Glass" glass>...</Tooltip>`}>
            <div className="flex items-center gap-4 py-6 rounded-lg bg-gradient-to-r from-accent/20 to-success/20 px-4">
              <Tooltip content="Glass tooltip" placement="top" glass><Button variant="secondary" size="sm">Glass</Button></Tooltip>
              <Tooltip content="Normal tooltip" placement="top"><Button variant="secondary" size="sm">Normal</Button></Tooltip>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Behavior">
          <DemoCard title="Interactive" description="Hoverable tooltip content" code={`<Tooltip content={<a href="#">Link</a>} interactive>...</Tooltip>`}>
            <div className="py-6">
              <Tooltip content={<span className="text-accent underline">Clickable link inside</span>} interactive placement="bottom">
                <Button variant="secondary" size="sm">Interactive tooltip</Button>
              </Tooltip>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="placement" type="pills" value={config.placement} options={['top', 'bottom', 'left', 'right']} onChange={v => setConfig('placement', v)} />
        <Ctrl label="content" type="text" value={config.content} onChange={v => setConfig('content', v)} />
        <Ctrl label="delay" type="number" value={config.delay} min={0} max={1000} onChange={v => setConfig('delay', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
        <Ctrl label="interactive" type="check" value={config.interactive} onChange={v => setConfig('interactive', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Tooltip } from '@goliapkg/gds'", '']
      const props: string[] = [`content="${config.content}"`]
      if (config.placement !== 'top') props.push(`placement="${config.placement}"`)
      if (config.delay !== 300) props.push(`delay={${config.delay}}`)
      if (config.glass === true) props.push('glass')
      if (config.interactive === true) props.push('interactive')
      lines.push(`<Tooltip ${props.join(' ')}>`)
      lines.push('  <Button>Hover me</Button>')
      lines.push('</Tooltip>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['content', 'Tooltip content', 'ReactNode', '—'],
          ['placement', 'Position relative to trigger', "'top' | 'bottom' | 'left' | 'right'", "'top'"],
          ['delay', 'Show delay in ms', 'number', '300'],
          ['interactive', 'Allow hovering tooltip content', 'boolean', 'false'],
          ['maxWidth', 'Max width in px', 'number', '—'],
          ['glass', 'Glass morphism effect', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for supplementary info — not for critical content</p>
            <p>• Enable interactive when tooltip contains links or buttons</p>
            <p>• Set maxWidth for long text to enable wrapping</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { atomItems }
