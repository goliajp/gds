import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { useState } from 'react'

import {
  Anchor,
  AspectRatio,
  Badge,
  Button,
  Dot,
  IconButton,
  Input,
  Kbd,
  Label,
  NumberInput,
  Progress,
  ScrollArea,
  Separator,
  Spinner,
  Textarea,
} from '@gds/l2-primitives'

import type { DevCenterItem } from '../types'

function NumberInputStateless() {
  const [val, setVal] = useState<number | null>(42)
  return <NumberInput value={val} onChange={setVal} />
}

const primitiveItems: DevCenterItem[] = [
  {
    id: 'button',
    label: 'Button',
    layer: 'l2',
    type: 'interactive',
    tags: ['action', 'click', 'submit'],
    variants: ['primary', 'secondary', 'danger', 'ghost'],
    defaultConfig: { label: 'Button', size: 'default', disabled: false, loading: false, fullWidth: false },

    stage: ({ config, variant }) => (
      <div>
        <ImportLine text="import { Button } from '@goliapkg/gds'" />

        <LivePreview>
          <Button
            variant={variant as any}
            size={config.size}
            disabled={config.disabled}
            loading={config.loading}
            fullWidth={config.fullWidth}
          >
            {config.label}
          </Button>
        </LivePreview>

        <DocSection title="Variants" columns={2}>
          <DemoCard title="Type" description="4 semantic variants" code={`<Button variant="primary">Primary</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="danger">Danger</Button>\n<Button variant="ghost">Ghost</Button>`}>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </DemoCard>
          <DemoCard title="Size" description="3 density-aware sizes" code={`<Button size="sm">Small</Button>\n<Button>Default</Button>\n<Button size="lg">Large</Button>`}>
            <div className="flex items-center gap-2">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="States" columns={2}>
          <DemoCard title="Loading" description="Spinner replaces content" code={`<Button loading>Saving...</Button>`}>
            <div className="flex items-center gap-2">
              <Button loading>Saving...</Button>
              <Button variant="secondary" loading>Loading</Button>
            </div>
          </DemoCard>
          <DemoCard title="Disabled" description="Non-interactive, reduced opacity" code={`<Button disabled>Disabled</Button>`}>
            <div className="flex items-center gap-2">
              <Button disabled>Disabled</Button>
              <Button variant="secondary" disabled>Disabled</Button>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Patterns" columns={2}>
          <DemoCard title="Dialog Footer" description="Common action pair pattern" full code={`<div className="flex justify-end gap-2">\n  <Button variant="secondary">Cancel</Button>\n  <Button>Confirm</Button>\n</div>`}>
            <div className="flex justify-end gap-2">
              <Button variant="secondary">Cancel</Button>
              <Button>Confirm</Button>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig, variant, setVariant }) => (
      <>
        <Ctrl label="variant" type="pills" value={variant} options={['primary', 'secondary', 'danger', 'ghost']} onChange={setVariant} />
        <Ctrl label="size" type="pills" value={config.size} options={['sm', 'default', 'lg']} onChange={v => setConfig('size', v)} />
        <Ctrl label="label" type="text" value={config.label} onChange={v => setConfig('label', v)} />
        <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
        <Ctrl label="loading" type="check" value={config.loading} onChange={v => setConfig('loading', v)} />
        <Ctrl label="fullWidth" type="check" value={config.fullWidth} onChange={v => setConfig('fullWidth', v)} />
      </>
    ),

    code: ({ config, variant }) => {
      const lines = ["import { Button } from '@goliapkg/gds'"]
      lines.push('')
      const props: string[] = []
      if (variant !== 'primary') props.push(`variant="${variant}"`)
      if (config.size !== 'default') props.push(`size="${config.size}"`)
      if (config.disabled === true) props.push('disabled')
      if (config.loading === true) props.push('loading')
      if (config.fullWidth === true) props.push('fullWidth')
      if (props.length === 0) {
        lines.push(`<Button>${config.label}</Button>`)
      } else {
        lines.push(`<Button`)
        for (const p of props) lines.push(`  ${p}`)
        lines.push(`>`)
        lines.push(`  ${config.label}`)
        lines.push(`</Button>`)
      }
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['variant', 'Visual style', "'primary' | 'secondary' | 'danger' | 'ghost'", "'primary'"],
          ['size', 'Density-aware height', "'sm' | 'default' | 'lg'", "'default'"],
          ['disabled', 'Non-interactive state', 'boolean', 'false'],
          ['loading', 'Show spinner, disable clicks', 'boolean', 'false'],
          ['fullWidth', 'Stretch to container width', 'boolean', 'false'],
          ['icon', 'Left icon element', 'ReactNode', '—'],
          ['iconRight', 'Right icon element', 'ReactNode', '—'],
          ['glass', 'Glass morphism effect', 'boolean', 'false'],
          ['motion', 'Animation preset name', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use primary for main actions, secondary for alternatives, ghost for tertiary</p>
            <p>• Danger variant only for destructive actions (delete, remove)</p>
            <p>• Loading state auto-disables the button — no need to pass both</p>
            <p>• Height responds to density axis (compact/default/comfortable)</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'input',
    label: 'Input',
    layer: 'l2',
    type: 'interactive',
    tags: ['form', 'text', 'field'],
    defaultConfig: { placeholder: 'Enter text...', inputSize: 'default', error: false, disabled: false, glass: false },

    stage: ({ config, setConfig, variant }) => (
      <div>
        <ImportLine text="import { Input } from '@goliapkg/gds'" />

        <LivePreview>
          <Input
            placeholder={config.placeholder}
            inputSize={config.inputSize}
            error={config.error}
            disabled={config.disabled}
            glass={config.glass}
          />
        </LivePreview>

        <DocSection title="States" columns={2}>
          <DemoCard title="Default" description="Standard text input" code={`<Input placeholder="Email address" />`}>
            <Input placeholder="Email address" />
          </DemoCard>
          <DemoCard title="Error" description="Invalid input indication" code={`<Input placeholder="Invalid email" error />`}>
            <Input placeholder="Invalid email" error />
          </DemoCard>
          <DemoCard title="Disabled" description="Non-interactive state" code={`<Input placeholder="Disabled" disabled />`}>
            <Input placeholder="Disabled" disabled />
          </DemoCard>
          <DemoCard title="With Icons" description="Left and right icon slots" code={`<Input placeholder="Search..." icon={<SearchIcon />} />\n<Input placeholder="Amount" rightIcon={<span>$</span>} />`}>
            <div className="flex flex-col gap-2">
              <Input placeholder="Search..." icon={<span className="text-[10px]">Q</span>} />
              <Input placeholder="Amount" rightIcon={<span className="text-[10px]">$</span>} />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Sizes">
          <DemoCard title="Size Comparison" description="Default and small density" code={`<Input placeholder="Default" />\n<Input placeholder="Small" inputSize="sm" />`}>
            <div className="flex flex-col gap-2 max-w-xs">
              <Input placeholder="Default" />
              <Input placeholder="Small" inputSize="sm" />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="inputSize" type="pills" value={config.inputSize} options={['default', 'sm']} onChange={v => setConfig('inputSize', v)} />
        <Ctrl label="placeholder" type="text" value={config.placeholder} onChange={v => setConfig('placeholder', v)} />
        <Ctrl label="error" type="check" value={config.error} onChange={v => setConfig('error', v)} />
        <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Input } from '@goliapkg/gds'"]
      lines.push('')
      const props: string[] = []
      props.push(`placeholder="${config.placeholder}"`)
      if (config.inputSize !== 'default') props.push(`inputSize="${config.inputSize}"`)
      if (config.error === true) props.push('error')
      if (config.disabled === true) props.push('disabled')
      if (config.glass === true) props.push('glass')
      if (props.length <= 2) {
        lines.push(`<Input ${props.join(' ')} />`)
      } else {
        lines.push(`<Input`)
        for (const p of props) lines.push(`  ${p}`)
        lines.push(`/>`)
      }
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['placeholder', 'Placeholder text', 'string', '—'],
          ['inputSize', 'Density-aware height', "'default' | 'sm'", "'default'"],
          ['error', 'Error border style', 'boolean', 'false'],
          ['disabled', 'Non-interactive state', 'boolean', 'false'],
          ['icon', 'Left icon element', 'ReactNode', '—'],
          ['rightIcon', 'Right icon element', 'ReactNode', '—'],
          ['glass', 'Glass morphism effect', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use inputSize (not size) to avoid conflict with native HTML size attribute</p>
            <p>• Error state shows danger border — pair with a visible error message below</p>
            <p>• Icon slots accept any ReactNode — use lucide-react icons for consistency</p>
            <p>• Supports forwardRef — attach refs for focus management and form libraries</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'badge',
    label: 'Badge',
    layer: 'l2',
    type: 'interactive',
    tags: ['status', 'label', 'tag'],
    variants: ['default', 'info', 'success', 'warning', 'danger'],
    defaultConfig: { label: 'Badge', dot: false, count: 0, glass: false },

    stage: ({ config, variant }) => (
      <div>
        <ImportLine text="import { Badge } from '@goliapkg/gds'" />

        <LivePreview>
          {config.count > 0 ? (
            <Badge variant={variant as any} count={config.count} glass={config.glass} />
          ) : (
            <Badge variant={variant as any} dot={config.dot} glass={config.glass}>
              {config.label}
            </Badge>
          )}
        </LivePreview>

        <DocSection title="Variants" columns={2}>
          <DemoCard title="Semantic" description="5 semantic color variants" code={`<Badge variant="default">Default</Badge>\n<Badge variant="info">Info</Badge>\n<Badge variant="success">Success</Badge>\n<Badge variant="warning">Warning</Badge>\n<Badge variant="danger">Danger</Badge>`}>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
          </DemoCard>
          <DemoCard title="With Dot" description="Status dot indicator" code={`<Badge variant="success" dot>Active</Badge>\n<Badge variant="danger" dot>Error</Badge>`}>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success" dot>Active</Badge>
              <Badge variant="warning" dot>Pending</Badge>
              <Badge variant="danger" dot>Error</Badge>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Count Mode">
          <DemoCard title="Count Badge" description="Numeric count with max cap" code={`<Badge count={5} />\n<Badge count={120} countMax={99} />`}>
            <div className="flex items-center gap-3">
              <Badge count={3} />
              <Badge count={42} />
              <Badge count={120} countMax={99} />
              <Badge count={5} variant="danger" />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig, variant, setVariant }) => (
      <>
        <Ctrl label="variant" type="pills" value={variant} options={['default', 'info', 'success', 'warning', 'danger']} onChange={setVariant} />
        <Ctrl label="label" type="text" value={config.label} onChange={v => setConfig('label', v)} />
        <Ctrl label="dot" type="check" value={config.dot} onChange={v => setConfig('dot', v)} />
        <Ctrl label="count" type="number" value={config.count} min={0} max={999} onChange={v => setConfig('count', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config, variant }) => {
      const lines = ["import { Badge } from '@goliapkg/gds'", '']
      if (config.count > 0) {
        const props: string[] = []
        if (variant !== 'default') props.push(`variant="${variant}"`)
        props.push(`count={${config.count}}`)
        if (config.glass === true) props.push('glass')
        lines.push(`<Badge ${props.join(' ')} />`)
      } else {
        const props: string[] = []
        if (variant !== 'default') props.push(`variant="${variant}"`)
        if (config.dot === true) props.push('dot')
        if (config.glass === true) props.push('glass')
        const pStr = props.length > 0 ? ' ' + props.join(' ') : ''
        lines.push(`<Badge${pStr}>${config.label}</Badge>`)
      }
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['variant', 'Color variant', "'default' | 'info' | 'success' | 'warning' | 'danger' | 'palette-N'", "'default'"],
          ['dot', 'Show status dot before text', 'boolean', 'false'],
          ['count', 'Numeric count mode', 'number', '—'],
          ['countMax', 'Max value before showing N+', 'number', '99'],
          ['glass', 'Glass morphism effect', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use count mode for notification badges — returns null when count is 0</p>
            <p>• Dot variant adds a small colored circle for status indication</p>
            <p>• 10 palette variants (palette-0 to palette-9) for categorical coloring</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'progress',
    label: 'Progress',
    layer: 'l2',
    type: 'interactive',
    tags: ['loading', 'bar', 'percentage'],
    stage: () => (
      <div className="flex flex-col gap-4 max-w-md">
        <Progress value={30} showLabel />
        <Progress value={65} variant="success" showLabel />
        <Progress value={90} variant="warning" size="lg" showLabel />
      </div>
    ),
    code: () => `import { Progress } from '@goliapkg/gds'

<Progress value={65} variant="success" showLabel />`,
  },
  {
    id: 'spinner',
    label: 'Spinner',
    layer: 'l2',
    type: 'interactive',
    tags: ['loading', 'indicator'],
    stage: () => (
      <div className="flex items-center gap-6">
        <Spinner size="sm" />
        <Spinner />
        <Spinner size="lg" />
      </div>
    ),
    code: () => `import { Spinner } from '@goliapkg/gds'

<Spinner size="lg" />`,
  },
  {
    id: 'icon-button',
    label: 'IconButton',
    layer: 'l2',
    type: 'interactive',
    tags: ['action', 'icon', 'toolbar'],
    stage: () => (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <IconButton icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/></svg>} tooltip="Close" />
          <IconButton icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round"/></svg>} tooltip="Settings" />
          <IconButton icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round"/></svg>} variant="danger" tooltip="Delete" />
          <IconButton icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14" strokeLinecap="round"/></svg>} variant="ghost" tooltip="Minimize" />
        </div>
        <div className="flex items-center gap-3">
          <IconButton size="sm" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 5v14m-7-7h14" strokeLinecap="round"/></svg>} tooltip="Add (sm)" />
          <IconButton icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 5v14m-7-7h14" strokeLinecap="round"/></svg>} tooltip="Add (default)" />
          <IconButton size="lg" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 5v14m-7-7h14" strokeLinecap="round"/></svg>} tooltip="Add (lg)" />
        </div>
      </div>
    ),
    code: () => `import { IconButton } from '@goliapkg/gds'

<IconButton icon={<X />} tooltip="Close" />
<IconButton icon={<Trash2 />} variant="danger" />`,
  },
  {
    id: 'textarea',
    label: 'Textarea',
    layer: 'l2',
    type: 'interactive',
    tags: ['form', 'text', 'multiline'],
    stage: () => (
      <div className="flex flex-col gap-3 max-w-sm">
        <Textarea placeholder="Default textarea" rows={3} />
        <Textarea placeholder="Error state" error rows={3} />
        <Textarea placeholder="Auto-grow — type to expand" autoGrow />
        <Textarea placeholder="No resize" resize="none" rows={2} />
        <Textarea placeholder="Disabled" disabled rows={2} />
      </div>
    ),
    code: () => `import { Textarea } from '@goliapkg/gds'

<Textarea placeholder="Message..." rows={3} />
<Textarea error placeholder="Invalid" />
<Textarea autoGrow placeholder="Auto-expanding" />`,
  },
  {
    id: 'anchor',
    label: 'Anchor',
    layer: 'l2',
    type: 'interactive',
    tags: ['link', 'navigation', 'url'],
    stage: () => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <Anchor href="#">Default link</Anchor>
          <Anchor href="#" variant="muted">Muted link</Anchor>
        </div>
        <div>
          <Anchor href="https://golia.jp" external externalIcon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3" strokeLinecap="round" strokeLinejoin="round"/></svg>}>
            External link
          </Anchor>
        </div>
      </div>
    ),
    code: () => `import { Anchor } from '@goliapkg/gds'

<Anchor href="/docs">Documentation</Anchor>
<Anchor href="https://..." external>External</Anchor>`,
  },
  {
    id: 'dot',
    label: 'Dot',
    layer: 'l2',
    type: 'interactive',
    tags: ['status', 'indicator', 'badge'],
    stage: () => (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Dot color="accent" label="Accent" />
          <Dot color="success" label="Success" />
          <Dot color="warning" label="Warning" />
          <Dot color="danger" label="Danger" />
          <Dot color="muted" label="Muted" />
        </div>
        <div className="flex items-center gap-4">
          <Dot size="sm" color="success" label="Small" />
          <Dot color="success" label="Default" />
          <Dot size="lg" color="success" label="Large" />
        </div>
        <div className="flex items-center gap-4">
          <Dot color="success" pulse label="Live" />
          <Dot color="danger" pulse label="Recording" />
        </div>
      </div>
    ),
    code: () => `import { Dot } from '@goliapkg/gds'

<Dot color="success" label="Online" />
<Dot color="danger" pulse label="Recording" />`,
  },
  {
    id: 'kbd',
    label: 'Kbd',
    layer: 'l2',
    type: 'interactive',
    tags: ['keyboard', 'shortcut', 'key'],
    stage: () => (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Kbd>⌘</Kbd> <Kbd>K</Kbd>
          <span className="text-xs text-fg-muted ml-2">Command palette</span>
        </div>
        <div className="flex items-center gap-2">
          <Kbd>Ctrl</Kbd> <span className="text-xs text-fg-muted">+</span> <Kbd>Shift</Kbd> <span className="text-xs text-fg-muted">+</span> <Kbd>P</Kbd>
          <span className="text-xs text-fg-muted ml-2">Open preferences</span>
        </div>
        <div className="flex items-center gap-2">
          <Kbd>↵</Kbd> <Kbd>⇧</Kbd> <Kbd>⌥</Kbd> <Kbd>⌃</Kbd> <Kbd>⎋</Kbd> <Kbd>⌫</Kbd>
        </div>
      </div>
    ),
    code: () => `import { Kbd } from '@goliapkg/gds'

<Kbd>⌘</Kbd> <Kbd>K</Kbd>`,
  },
  {
    id: 'label',
    label: 'Label',
    layer: 'l2',
    type: 'interactive',
    tags: ['form', 'field', 'label'],
    stage: () => (
      <div className="flex flex-col gap-4 max-w-sm">
        <div>
          <Label>Email address</Label>
          <Input placeholder="you@example.com" className="mt-1" />
        </div>
        <div>
          <Label required>Full name</Label>
          <Input placeholder="Enter your name" className="mt-1" />
        </div>
      </div>
    ),
    code: () => `import { Label } from '@goliapkg/gds'

<Label required>Full name</Label>
<Input placeholder="Enter your name" />`,
  },
  {
    id: 'separator',
    label: 'Separator',
    layer: 'l2',
    type: 'interactive',
    tags: ['divider', 'line', 'section'],
    stage: () => (
      <div className="flex flex-col gap-6 max-w-md">
        <div>
          <div className="text-xs text-fg-muted mb-2">Solid (default)</div>
          <Separator />
        </div>
        <div>
          <div className="text-xs text-fg-muted mb-2">Dashed</div>
          <Separator variant="dashed" />
        </div>
        <div>
          <div className="text-xs text-fg-muted mb-2">With label</div>
          <Separator label="or" />
        </div>
        <div className="flex items-center gap-3 h-8">
          <span className="text-xs text-fg">Left</span>
          <Separator orientation="vertical" />
          <span className="text-xs text-fg">Right</span>
        </div>
      </div>
    ),
    code: () => `import { Separator } from '@goliapkg/gds'

<Separator />
<Separator variant="dashed" />
<Separator label="or" />
<Separator orientation="vertical" />`,
  },
  {
    id: 'aspect-ratio',
    label: 'AspectRatio',
    layer: 'l2',
    type: 'interactive',
    tags: ['layout', 'ratio', 'container'],
    stage: () => (
      <div className="grid grid-cols-3 gap-4 max-w-lg">
        <div>
          <div className="text-[10px] text-fg-muted mb-1">16:9</div>
          <AspectRatio ratio={16 / 9}>
            <div className="flex h-full items-center justify-center rounded-lg bg-accent/10 text-xs text-accent">16:9</div>
          </AspectRatio>
        </div>
        <div>
          <div className="text-[10px] text-fg-muted mb-1">1:1</div>
          <AspectRatio ratio={1}>
            <div className="flex h-full items-center justify-center rounded-lg bg-success/10 text-xs text-success">1:1</div>
          </AspectRatio>
        </div>
        <div>
          <div className="text-[10px] text-fg-muted mb-1">4:3</div>
          <AspectRatio ratio={4 / 3}>
            <div className="flex h-full items-center justify-center rounded-lg bg-warning/10 text-xs text-warning">4:3</div>
          </AspectRatio>
        </div>
      </div>
    ),
    code: () => `import { AspectRatio } from '@goliapkg/gds'

<AspectRatio ratio={16 / 9}>
  <img src="..." className="h-full w-full object-cover" />
</AspectRatio>`,
  },
  {
    id: 'scroll-area',
    label: 'ScrollArea',
    layer: 'l2',
    type: 'interactive',
    tags: ['scroll', 'overflow', 'container'],
    stage: () => (
      <div className="max-w-sm">
        <ScrollArea maxHeight={160}>
          <div className="flex flex-col gap-1 pr-2">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="rounded-md bg-bg-tertiary px-3 py-2 text-xs text-fg-muted">
                Item {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    ),
    code: () => `import { ScrollArea } from '@goliapkg/gds'

<ScrollArea maxHeight={200}>
  {items.map(item => <div key={item.id}>{item.name}</div>)}
</ScrollArea>`,
  },
  {
    id: 'number-input',
    label: 'NumberInput',
    layer: 'l2',
    type: 'interactive',
    tags: ['form', 'number', 'stepper', 'increment'],
    defaultConfig: { value: 42, min: 0, max: 100, step: 1, inputSize: 'default', error: false, disabled: false, glass: false, placeholder: 'Enter number' },

    stage: ({ config, setConfig }) => {
      function NumberInputDemo() {
        const [val, setVal] = useState<number | null>(config.value)
        return (
          <NumberInput
            value={val}
            onChange={setVal}
            min={config.min}
            max={config.max}
            step={config.step}
            inputSize={config.inputSize}
            error={config.error}
            disabled={config.disabled}
            glass={config.glass}
            placeholder={config.placeholder}
          />
        )
      }
      return (
        <div>
          <ImportLine text="import { NumberInput } from '@goliapkg/gds'" />

          <LivePreview>
            <div className="w-48">
              <NumberInputDemo />
            </div>
          </LivePreview>

          <DocSection title="States" columns={2}>
            <DemoCard title="Default" description="Standard number input with stepper buttons" code={`<NumberInput value={val} onChange={setVal} />`}>
              <div className="w-48">
                <NumberInputStateless />
              </div>
            </DemoCard>
            <DemoCard title="Error & Disabled" description="Validation and inactive states" code={`<NumberInput error value={0} onChange={() => {}} />\n<NumberInput disabled value={10} onChange={() => {}} />`}>
              <div className="flex flex-col gap-3 w-48">
                <NumberInput error value={0} onChange={() => {}} />
                <NumberInput disabled value={10} onChange={() => {}} />
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Sizes & Range" columns={2}>
            <DemoCard title="Size Comparison" description="Default and small density" code={`<NumberInput value={42} onChange={setVal} />\n<NumberInput inputSize="sm" value={42} onChange={setVal} />`}>
              <div className="flex flex-col gap-3 w-48">
                <NumberInput value={42} onChange={() => {}} />
                <NumberInput inputSize="sm" value={42} onChange={() => {}} />
              </div>
            </DemoCard>
            <DemoCard title="Custom Range" description="min/max/step constraints" code={`<NumberInput value={5} min={0} max={10} step={0.5} onChange={setVal} />`}>
              <div className="w-48">
                <NumberInput value={5} min={0} max={10} step={1} onChange={() => {}} placeholder="0-10" />
              </div>
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="inputSize" type="pills" value={config.inputSize} options={['default', 'sm']} onChange={v => setConfig('inputSize', v)} />
        <Ctrl label="value" type="number" value={config.value} min={0} max={100} onChange={v => setConfig('value', v)} />
        <Ctrl label="min" type="number" value={config.min} min={-1000} max={0} onChange={v => setConfig('min', v)} />
        <Ctrl label="max" type="number" value={config.max} min={0} max={1000} onChange={v => setConfig('max', v)} />
        <Ctrl label="step" type="number" value={config.step} min={1} max={10} onChange={v => setConfig('step', v)} />
        <Ctrl label="error" type="check" value={config.error} onChange={v => setConfig('error', v)} />
        <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { NumberInput } from '@goliapkg/gds'", '']
      const props: string[] = ['value={val}', 'onChange={setVal}']
      if (config.min !== 0) props.push(`min={${config.min}}`)
      if (config.max !== 100) props.push(`max={${config.max}}`)
      if (config.step !== 1) props.push(`step={${config.step}}`)
      if (config.inputSize !== 'default') props.push(`inputSize="${config.inputSize}"`)
      if (config.error === true) props.push('error')
      if (config.disabled === true) props.push('disabled')
      if (config.glass === true) props.push('glass')
      lines.push(`<NumberInput`)
      for (const p of props) lines.push(`  ${p}`)
      lines.push(`/>`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['value', 'Current numeric value', 'number | null', '—'],
          ['onChange', 'Value change callback', '(value: number | null) => void', '—'],
          ['min', 'Minimum allowed value', 'number', '—'],
          ['max', 'Maximum allowed value', 'number', '—'],
          ['step', 'Increment/decrement step', 'number', '1'],
          ['inputSize', 'Density-aware height', "'default' | 'sm'", "'default'"],
          ['error', 'Error border style', 'boolean', 'false'],
          ['disabled', 'Non-interactive state', 'boolean', 'false'],
          ['glass', 'Glass morphism effect', 'boolean', 'false'],
          ['placeholder', 'Placeholder text', 'string', '—'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Supports ArrowUp/ArrowDown keyboard shortcuts for increment/decrement</p>
            <p>• Value is clamped to min/max range on every change</p>
            <p>• Empty input yields null — distinguish from 0</p>
            <p>• Stepper buttons (- / +) flanking the input for mouse users</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { primitiveItems }
