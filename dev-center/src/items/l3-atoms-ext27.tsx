import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { ColorSwatch, RadioGroup, RelativeTime } from '@gds/l3-atoms'

import type { DevCenterItem } from '../types'

function RadioDemo() {
  const [v, set] = useState('react')
  return (
    <RadioGroup
      value={v}
      onChange={set}
      options={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'svelte', label: 'Svelte' },
      ]}
    />
  )
}

const atomItemsAB: DevCenterItem[] = [
  {
    id: 'color-swatch',
    label: 'ColorSwatch',
    layer: 'l3',
    type: 'interactive',
    tags: ['color', 'palette', 'swatch', 'copy'],
    defaultConfig: { color: '#6366f1', size: 'default', copyable: false, label: '' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { ColorSwatch } from '@goliapkg/gds'" />

        <LivePreview>
          <ColorSwatch
            color={config.color}
            size={config.size}
            copyable={config.copyable}
            label={config.label !== '' ? config.label : undefined}
          />
        </LivePreview>

        <DocSection title="Sizes" columns={2}>
          <DemoCard title="All Sizes" description="sm, default, lg" code={`<ColorSwatch color="#6366f1" size="sm" />\n<ColorSwatch color="#6366f1" />\n<ColorSwatch color="#6366f1" size="lg" />`}>
            <div className="flex items-end gap-4">
              <ColorSwatch color="#6366f1" size="sm" />
              <ColorSwatch color="#6366f1" />
              <ColorSwatch color="#6366f1" size="lg" />
            </div>
          </DemoCard>
          <DemoCard title="Copyable" description="Click to copy hex value" code={`<ColorSwatch color="#10b981" copyable />`}>
            <div className="flex items-center gap-4">
              <ColorSwatch color="#10b981" copyable />
              <ColorSwatch color="#f59e0b" copyable />
              <ColorSwatch color="#ef4444" copyable />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Palette">
          <DemoCard title="With Labels" description="Named color tokens" code={`<ColorSwatch color="#6366f1" label="Accent" />`}>
            <div className="flex items-center gap-4">
              <ColorSwatch color="#6366f1" label="Accent" />
              <ColorSwatch color="#10b981" label="Success" />
              <ColorSwatch color="#f59e0b" label="Warning" />
              <ColorSwatch color="#ef4444" label="Danger" />
              <ColorSwatch color="#8b5cf6" label="Purple" />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="color" type="text" value={config.color} onChange={v => setConfig('color', v)} />
        <Ctrl label="size" type="pills" value={config.size} options={['sm', 'default', 'lg']} onChange={v => setConfig('size', v)} />
        <Ctrl label="copyable" type="check" value={config.copyable} onChange={v => setConfig('copyable', v)} />
        <Ctrl label="label" type="text" value={config.label} placeholder="optional label" onChange={v => setConfig('label', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { ColorSwatch } from '@goliapkg/gds'", '']
      const props: string[] = [`color="${config.color}"`]
      if (config.size !== 'default') props.push(`size="${config.size}"`)
      if (config.copyable === true) props.push('copyable')
      if (config.label !== '') props.push(`label="${config.label}"`)
      lines.push(`<ColorSwatch ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['color', 'CSS color value', 'string', '—'],
          ['size', 'Swatch dimensions', "'sm' | 'default' | 'lg'", "'default'"],
          ['copyable', 'Click to copy color value', 'boolean', 'false'],
          ['label', 'Label text below color', 'string', '—'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for displaying color palettes and token references</p>
            <p>• Copyable mode shows "Copied!" feedback for 2 seconds</p>
            <p>• Accepts any valid CSS color (hex, rgb, hsl, named)</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'relative-time',
    label: 'RelativeTime',
    layer: 'l3',
    type: 'interactive',
    tags: ['time', 'date', 'ago', 'relative'],
    defaultConfig: { minutesAgo: 5, prefix: '' },

    stage: ({ config }) => {
      const date = new Date(Date.now() - Number(config.minutesAgo ?? 0) * 60 * 1000)
      return (
        <div>
          <ImportLine text="import { RelativeTime } from '@goliapkg/gds'" />

          <LivePreview>
            <RelativeTime
              date={date}
              prefix={config.prefix !== '' ? config.prefix : undefined}
            />
          </LivePreview>

          <DocSection title="Time Ranges" columns={2}>
            <DemoCard title="Recent" description="Seconds and minutes" code={`<RelativeTime date={new Date()} />`}>
              <div className="flex flex-col gap-2">
                <RelativeTime date={new Date()} />
                <RelativeTime date={new Date(Date.now() - 5 * 60 * 1000)} />
                <RelativeTime date={new Date(Date.now() - 45 * 60 * 1000)} />
              </div>
            </DemoCard>
            <DemoCard title="Older" description="Hours and days" code={`<RelativeTime date={yesterday} />`}>
              <div className="flex flex-col gap-2">
                <RelativeTime date={new Date(Date.now() - 3 * 3600 * 1000)} />
                <RelativeTime date={new Date(Date.now() - 86400 * 1000)} />
                <RelativeTime date={new Date(Date.now() - 7 * 86400 * 1000)} />
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="With Prefix">
            <DemoCard title="Prefix Text" description="Prepend context" code={`<RelativeTime date={date} prefix="Updated" />`}>
              <div className="flex flex-col gap-2">
                <RelativeTime date={new Date(Date.now() - 10 * 60 * 1000)} prefix="Updated" />
                <RelativeTime date={new Date(Date.now() - 2 * 3600 * 1000)} prefix="Created" />
                <RelativeTime date={new Date(Date.now() - 3 * 86400 * 1000)} prefix="Last seen" />
              </div>
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="minutesAgo" type="number" value={config.minutesAgo} min={0} max={10080} onChange={v => setConfig('minutesAgo', v)} />
        <Ctrl label="prefix" type="text" value={config.prefix} placeholder="e.g. Updated" onChange={v => setConfig('prefix', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { RelativeTime } from '@goliapkg/gds'", '']
      const props: string[] = ['date={date}']
      if (config.prefix !== '') props.push(`prefix="${config.prefix}"`)
      lines.push(`<RelativeTime ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['date', 'Target date', 'Date | number | string', '—'],
          ['prefix', 'Text prepended to relative time', 'string', '—'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Auto-updates every 30 seconds via interval</p>
            <p>• Shows full date/time on hover (title attribute)</p>
            <p>• Accepts Date objects, timestamps, or ISO strings</p>
            <p>• Output: "just now", "5m ago", "3h ago", "yesterday", "7d ago", "2mo ago"</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'radio',
    label: 'Radio',
    layer: 'l3',
    type: 'interactive',
    tags: ['form', 'radio', 'select', 'group'],
    defaultConfig: { direction: 'vertical', disabled: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { RadioGroup } from '@goliapkg/gds'" />

        <LivePreview>
          <RadioDemo />
        </LivePreview>

        <DocSection title="Direction" columns={2}>
          <DemoCard title="Vertical" description="Default stacked layout" code={`<RadioGroup\n  value={val}\n  onChange={setVal}\n  options={options}\n/>`}>
            <RadioGroup
              value="a"
              options={[
                { value: 'a', label: 'Option A' },
                { value: 'b', label: 'Option B' },
                { value: 'c', label: 'Option C' },
              ]}
            />
          </DemoCard>
          <DemoCard title="Horizontal" description="Inline row layout" code={`<RadioGroup direction="horizontal" ... />`}>
            <RadioGroup
              value="a"
              direction="horizontal"
              options={[
                { value: 'a', label: 'Small' },
                { value: 'b', label: 'Medium' },
                { value: 'c', label: 'Large' },
              ]}
            />
          </DemoCard>
        </DocSection>

        <DocSection title="States" columns={2}>
          <DemoCard title="Disabled Group" description="Entire group non-interactive" code={`<RadioGroup disabled options={...} />`}>
            <RadioGroup
              value="b"
              disabled
              options={[
                { value: 'a', label: 'Alpha' },
                { value: 'b', label: 'Beta' },
                { value: 'c', label: 'Gamma' },
              ]}
            />
          </DemoCard>
          <DemoCard title="Disabled Option" description="Individual option disabled" code={`{ value: 'b', label: 'Beta', disabled: true }`}>
            <RadioGroup
              value="a"
              options={[
                { value: 'a', label: 'Available' },
                { value: 'b', label: 'Unavailable', disabled: true },
                { value: 'c', label: 'Also available' },
              ]}
            />
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
      lines.push('const options = [')
      lines.push("  { value: 'react', label: 'React' },")
      lines.push("  { value: 'vue', label: 'Vue' },")
      lines.push("  { value: 'svelte', label: 'Svelte' },")
      lines.push(']')
      lines.push('')
      const props: string[] = ['value={val}', 'onChange={setVal}', 'options={options}']
      if (config.direction !== 'vertical') props.push(`direction="${config.direction}"`)
      if (config.disabled === true) props.push('disabled')
      lines.push(`<RadioGroup ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['value', 'Selected option value', 'string', '—'],
          ['onChange', 'Selection callback', '(value: string) => void', '—'],
          ['options', 'Radio options list', 'RadioOption[]', '—'],
          ['direction', 'Layout direction', "'vertical' | 'horizontal'", "'vertical'"],
          ['disabled', 'Disable entire group', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">RadioOption</div>
          <DocTable rows={[
            ['value', 'Unique value string', 'string', '—'],
            ['label', 'Display label', 'string', '—'],
            ['disabled', 'Disable this option', 'boolean', 'false'],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Uses button role with aria-checked for accessibility</p>
            <p>• Depth-aware gap and icon sizing via gds-gap, gds-icon</p>
            <p>• Individual options can be disabled independently</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { atomItemsAB }
