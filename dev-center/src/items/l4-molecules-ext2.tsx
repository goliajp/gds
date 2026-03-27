import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button } from '@gds/l2-primitives'
import {
  ColorPicker,
  Combobox,
  FileUpload,
  LoadingOverlay,
  Notification,
  TimePicker,
} from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

const comboboxOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'solid', label: 'SolidJS' },
  { value: 'preact', label: 'Preact' },
]

function ComboboxStateless() {
  const [val, setVal] = useState<string | null>(null)
  return <Combobox options={comboboxOptions} value={val} onChange={setVal} placeholder="Select framework..." />
}

function TimePickerDemo({ minuteStep, error, glass }: { minuteStep?: number, error?: boolean, glass?: boolean } = {}) {
  const [val, setVal] = useState<string | null>(null)
  return <TimePicker value={val} onChange={setVal} minuteStep={minuteStep} error={error} glass={glass} />
}

const moleculeItemsC: DevCenterItem[] = []

const comboboxItem: DevCenterItem = {
  id: 'combobox',
  label: 'Combobox',
  layer: 'l4',
  type: 'interactive',
  tags: ['form', 'search', 'select', 'filter', 'autocomplete'],
  defaultConfig: { error: false, disabled: false, glass: false, placeholder: 'Select framework...', searchPlaceholder: 'Search...' },

  stage: ({ config }) => {
    function ComboboxDemo() {
      const [val, setVal] = useState<string | null>(null)
      return (
        <Combobox
          options={comboboxOptions}
          value={val}
          onChange={setVal}
          placeholder={config.placeholder}
          searchPlaceholder={config.searchPlaceholder}
          error={config.error}
          disabled={config.disabled}
          glass={config.glass}
        />
      )
    }
    return (
      <div>
        <ImportLine text="import { Combobox } from '@goliapkg/gds'" />

        <LivePreview>
          <div className="w-60">
            <ComboboxDemo />
          </div>
        </LivePreview>

        <DocSection title="Features" columns={2}>
          <DemoCard title="Default" description="Click to open, type to filter" code={`<Combobox\n  options={options}\n  value={val}\n  onChange={setVal}\n  placeholder="Select..."\n/>`}>
            <div className="w-60">
              <ComboboxStateless />
            </div>
          </DemoCard>
          <DemoCard title="Pre-selected" description="Shows selected option label" code={`<Combobox options={options} value="react" onChange={setVal} />`}>
            <div className="w-60">
              <Combobox options={comboboxOptions} value="react" onChange={() => {}} />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="States" columns={2}>
          <DemoCard title="Error" description="Invalid selection indication" code={`<Combobox error options={options} value={null} onChange={setVal} />`}>
            <div className="w-60">
              <Combobox error options={comboboxOptions} value={null} onChange={() => {}} placeholder="Required field" />
            </div>
          </DemoCard>
          <DemoCard title="Disabled" description="Non-interactive state" code={`<Combobox disabled options={options} value="react" onChange={setVal} />`}>
            <div className="w-60">
              <Combobox disabled options={comboboxOptions} value="react" onChange={() => {}} />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl label="placeholder" type="text" value={config.placeholder} onChange={v => setConfig('placeholder', v)} />
      <Ctrl label="searchPlaceholder" type="text" value={config.searchPlaceholder} onChange={v => setConfig('searchPlaceholder', v)} />
      <Ctrl label="error" type="check" value={config.error} onChange={v => setConfig('error', v)} />
      <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
      <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { Combobox } from '@goliapkg/gds'", '']
    const props: string[] = ['options={options}', 'value={val}', 'onChange={setVal}']
    if (config.placeholder !== 'Select...') props.push(`placeholder="${config.placeholder}"`)
    if (config.searchPlaceholder !== 'Search...') props.push(`searchPlaceholder="${config.searchPlaceholder}"`)
    if (config.error === true) props.push('error')
    if (config.disabled === true) props.push('disabled')
    if (config.glass === true) props.push('glass')
    lines.push(`<Combobox`)
    for (const p of props) lines.push(`  ${p}`)
    lines.push(`/>`)
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['options', 'Available options', '{ value: string, label: string }[]', '—'],
        ['value', 'Selected value', 'string | null', '—'],
        ['onChange', 'Selection callback', '(value: string | null) => void', '—'],
        ['placeholder', 'Trigger placeholder text', 'string', "'Select...'"],
        ['searchPlaceholder', 'Search input placeholder', 'string', "'Search...'"],
        ['error', 'Error border style', 'boolean', 'false'],
        ['disabled', 'Non-interactive state', 'boolean', 'false'],
        ['glass', 'Glass morphism effect', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Like Select but with search — use when options list is long (&gt;8 items)</p>
          <p>• ArrowUp/ArrowDown to navigate, Enter to select, Escape to close</p>
          <p>• Search is case-insensitive substring match</p>
          <p>• For native select without search, use Select component instead</p>
        </div>
      </div>
    </div>
  ),
}

moleculeItemsC.push(comboboxItem)

const timePickerItem: DevCenterItem = {
  id: 'time-picker',
  label: 'TimePicker',
  layer: 'l4',
  type: 'interactive',
  tags: ['form', 'time', 'picker', 'clock'],
  defaultConfig: { value: '', minuteStep: 15, error: false, disabled: false, glass: false, placeholder: 'Select time' },

  stage: ({ config, setConfig }) => {
    function TimePickerLive() {
      const [val, setVal] = useState<string | null>(config.value !== '' ? config.value : null)
      return (
        <TimePicker
          value={val}
          onChange={(v) => { setVal(v); setConfig('value', v ?? '') }}
          minuteStep={config.minuteStep}
          error={config.error}
          disabled={config.disabled}
          glass={config.glass}
          placeholder={config.placeholder}
        />
      )
    }
    return (
      <div>
        <ImportLine text="import { TimePicker } from '@goliapkg/gds'" />

        <LivePreview>
          <div className="w-48">
            <TimePickerLive />
          </div>
        </LivePreview>

        <DocSection title="Minute Steps" columns={2}>
          <DemoCard title="15-min steps" description="Default: 00, 15, 30, 45" code={`<TimePicker value={val} onChange={setVal} minuteStep={15} />`}>
            <div className="w-48">
              <TimePickerDemo minuteStep={15} />
            </div>
          </DemoCard>
          <DemoCard title="5-min steps" description="More granular: 00, 05, 10, ..." code={`<TimePicker value={val} onChange={setVal} minuteStep={5} />`}>
            <div className="w-48">
              <TimePickerDemo minuteStep={5} />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="States" columns={2}>
          <DemoCard title="Error" description="Error border styling" code={`<TimePicker error value={val} onChange={setVal} />`}>
            <div className="w-48">
              <TimePickerDemo error />
            </div>
          </DemoCard>
          <DemoCard title="Glass" description="Glass morphism variant" code={`<TimePicker glass value={val} onChange={setVal} />`}>
            <div className="w-48 rounded-lg bg-gradient-to-r from-accent/20 to-success/20 p-4">
              <TimePickerDemo glass />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl label="minuteStep" type="pills" value={`${config.minuteStep}`} options={['1', '5', '15', '30']} onChange={(v: string) => setConfig('minuteStep', parseInt(v, 10))} />
      <Ctrl label="placeholder" type="text" value={config.placeholder} onChange={(v: string) => setConfig('placeholder', v)} />
      <Ctrl label="error" type="check" value={config.error} onChange={(v: boolean) => setConfig('error', v)} />
      <Ctrl label="disabled" type="check" value={config.disabled} onChange={(v: boolean) => setConfig('disabled', v)} />
      <Ctrl label="glass" type="check" value={config.glass} onChange={(v: boolean) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { TimePicker } from '@goliapkg/gds'", '']
    const props: string[] = ['value={val}', 'onChange={setVal}']
    if (config.minuteStep !== 15) props.push(`minuteStep={${config.minuteStep}}`)
    if (config.placeholder !== 'Select time') props.push(`placeholder="${config.placeholder}"`)
    if (config.error === true) props.push('error')
    if (config.disabled === true) props.push('disabled')
    if (config.glass === true) props.push('glass')
    lines.push('<TimePicker')
    for (const p of props) lines.push(`  ${p}`)
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Selected time in HH:mm format', 'string | null', '—'],
        ['onChange', 'Time change callback', '(value: string | null) => void', '—'],
        ['minuteStep', 'Minute increment', '1 | 5 | 15 | 30', '15'],
        ['placeholder', 'Placeholder text', 'string', "'Select time'"],
        ['error', 'Error border styling', 'boolean', 'false'],
        ['disabled', 'Disable interaction', 'boolean', 'false'],
        ['glass', 'Glass morphism effect', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Two scrollable columns for hour (00-23) and minutes</p>
          <p>• Click outside or Escape to close the dropdown</p>
          <p>• Pair with DatePicker for full datetime selection</p>
        </div>
      </div>
    </div>
  ),
}

moleculeItemsC.push(timePickerItem)

const fileUploadItem: DevCenterItem = {
  id: 'file-upload',
  label: 'FileUpload',
  layer: 'l4',
  type: 'interactive',
  tags: ['form', 'file', 'upload', 'drag', 'drop'],
  defaultConfig: { multiple: false, disabled: false, glass: false, accept: '', maxSize: 0 },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { FileUpload } from '@goliapkg/gds'" />

      <LivePreview>
        <div className="w-72">
          <FileUpload
            onFiles={() => {}}
            multiple={config.multiple}
            disabled={config.disabled}
            glass={config.glass}
            accept={config.accept !== '' ? config.accept : undefined}
            maxSize={config.maxSize > 0 ? config.maxSize : undefined}
          />
        </div>
      </LivePreview>

      <DocSection title="Features" columns={2}>
        <DemoCard title="Default" description="Single file upload" code={`<FileUpload onFiles={(files) => console.log(files)} />`}>
          <div className="w-64">
            <FileUpload onFiles={() => {}} />
          </div>
        </DemoCard>
        <DemoCard title="Multiple Files" description="Accept multiple files" code={`<FileUpload onFiles={handler} multiple />`}>
          <div className="w-64">
            <FileUpload onFiles={() => {}} multiple />
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Customization" columns={2}>
        <DemoCard title="Accept Filter" description="Only images" code={`<FileUpload onFiles={handler} accept="image/*" />`}>
          <div className="w-64">
            <FileUpload onFiles={() => {}} accept="image/*" />
          </div>
        </DemoCard>
        <DemoCard title="Custom Content" description="Custom drop zone content" code={`<FileUpload onFiles={handler}>\n  <span>Drop CSV here</span>\n</FileUpload>`}>
          <div className="w-64">
            <FileUpload onFiles={() => {}}>
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-medium text-fg">Drop CSV here</span>
                <span className="text-xs text-fg-muted">Max 10MB</span>
              </div>
            </FileUpload>
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="States">
        <DemoCard title="Disabled" description="Non-interactive state" code={`<FileUpload onFiles={handler} disabled />`}>
          <div className="w-64">
            <FileUpload onFiles={() => {}} disabled />
          </div>
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl label="multiple" type="check" value={config.multiple} onChange={(v: boolean) => setConfig('multiple', v)} />
      <Ctrl label="disabled" type="check" value={config.disabled} onChange={(v: boolean) => setConfig('disabled', v)} />
      <Ctrl label="glass" type="check" value={config.glass} onChange={(v: boolean) => setConfig('glass', v)} />
      <Ctrl label="accept" type="text" value={config.accept} placeholder="e.g. image/*,.pdf" onChange={(v: string) => setConfig('accept', v)} />
      <Ctrl label="maxSize (bytes)" type="number" value={config.maxSize} min={0} max={100000000} onChange={(v: number) => setConfig('maxSize', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { FileUpload } from '@goliapkg/gds'", '']
    const props: string[] = ['onFiles={(files) => handleFiles(files)}']
    if (config.multiple === true) props.push('multiple')
    if (config.disabled === true) props.push('disabled')
    if (config.glass === true) props.push('glass')
    if (config.accept !== '') props.push(`accept="${config.accept}"`)
    if (config.maxSize > 0) props.push(`maxSize={${config.maxSize}}`)
    lines.push('<FileUpload')
    for (const p of props) lines.push(`  ${p}`)
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['onFiles', 'Files selected callback', '(files: File[]) => void', '—'],
        ['accept', 'File type filter', 'string', '—'],
        ['multiple', 'Allow multiple files', 'boolean', 'false'],
        ['maxSize', 'Max file size in bytes', 'number', '—'],
        ['disabled', 'Disable interaction', 'boolean', 'false'],
        ['glass', 'Glass morphism effect', 'boolean', 'false'],
        ['children', 'Custom drop zone content', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Supports both click-to-browse and drag-and-drop</p>
          <p>• Files exceeding maxSize are silently filtered out</p>
          <p>• Use children prop to customize the drop zone appearance</p>
          <p>• Border turns accent color during drag-over</p>
        </div>
      </div>
    </div>
  ),
}

moleculeItemsC.push(fileUploadItem)

const notificationItem: DevCenterItem = {
  id: 'notification',
  label: 'Notification',
  layer: 'l4',
  type: 'interactive',
  tags: ['banner', 'alert', 'notice', 'persistent'],
  variants: ['info', 'success', 'warning', 'danger'],
  defaultConfig: { showDescription: true, showAction: false, showClose: true, glass: false },

  stage: ({ config, variant }) => (
    <div>
      <ImportLine text="import { Notification } from '@goliapkg/gds'" />

      <LivePreview className="flex-col gap-3">
        <Notification
          variant={variant as any}
          title="System maintenance scheduled"
          description={config.showDescription ? 'The server will be down for maintenance on Sunday 2:00 AM.' : undefined}
          action={config.showAction ? <Button variant="secondary" size="sm">Details</Button> : undefined}
          onClose={config.showClose ? () => {} : undefined}
          glass={config.glass}
        />
      </LivePreview>

      <DocSection title="Variants" columns={2}>
        <DemoCard title="Info" description="Informational notice" code={`<Notification variant="info" title="Update available" />`}>
          <Notification variant="info" title="A new version is available" description="Update to get the latest features." onClose={() => {}} />
        </DemoCard>
        <DemoCard title="Success" description="Positive outcome" code={`<Notification variant="success" title="Deployed" />`}>
          <Notification variant="success" title="Deployment complete" description="All services are running normally." onClose={() => {}} />
        </DemoCard>
        <DemoCard title="Warning" description="Caution notice" code={`<Notification variant="warning" title="Rate limit" />`}>
          <Notification variant="warning" title="Approaching rate limit" description="80% of your API quota has been used." onClose={() => {}} />
        </DemoCard>
        <DemoCard title="Danger" description="Error or critical" code={`<Notification variant="danger" title="Build failed" />`}>
          <Notification variant="danger" title="Build failed" description="3 errors found in production pipeline." onClose={() => {}} />
        </DemoCard>
      </DocSection>

      <DocSection title="Features" columns={2}>
        <DemoCard title="With Action" description="Optional action button slot" code={`<Notification title="..." action={<Button>Retry</Button>} />`}>
          <Notification variant="danger" title="Connection lost" description="Unable to reach the API server." action={<Button variant="secondary" size="sm">Retry</Button>} onClose={() => {}} />
        </DemoCard>
        <DemoCard title="Title Only" description="Minimal without description" code={`<Notification title="Saved successfully" variant="success" />`}>
          <Notification variant="success" title="Changes saved successfully" onClose={() => {}} />
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig, variant, setVariant }) => (
    <>
      <Ctrl label="variant" type="pills" value={variant} options={['info', 'success', 'warning', 'danger']} onChange={setVariant} />
      <Ctrl label="description" type="check" value={config.showDescription} onChange={v => setConfig('showDescription', v)} />
      <Ctrl label="action" type="check" value={config.showAction} onChange={v => setConfig('showAction', v)} />
      <Ctrl label="closable" type="check" value={config.showClose} onChange={v => setConfig('showClose', v)} />
      <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
    </>
  ),

  code: ({ config, variant }) => {
    const lines = ["import { Notification } from '@goliapkg/gds'", '']
    lines.push(`<Notification`)
    if (variant !== 'info') lines.push(`  variant="${variant}"`)
    lines.push(`  title="System maintenance scheduled"`)
    if (config.showDescription) lines.push(`  description="The server will be down for maintenance."`)
    if (config.showAction) lines.push(`  action={<Button size="sm">Details</Button>}`)
    if (config.showClose) lines.push(`  onClose={handleDismiss}`)
    if (config.glass === true) lines.push(`  glass`)
    lines.push(`/>`)
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['title', 'Notification title', 'string', '—'],
        ['description', 'Optional description text', 'string', '—'],
        ['variant', 'Color variant', "'info' | 'success' | 'warning' | 'danger'", "'info'"],
        ['action', 'Optional action button slot', 'ReactNode', '—'],
        ['onClose', 'If provided, shows dismiss button', '() => void', '—'],
        ['glass', 'Frosted glass surface', 'boolean', 'false'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Use for persistent banners — for transient messages use Toast</p>
          <p>• Full-width, left-border accent matches variant color</p>
          <p>• Action slot allows embedding buttons for user response</p>
          <p>• Close button only appears when onClose is provided</p>
        </div>
      </div>
    </div>
  ),
}

moleculeItemsC.push(notificationItem)

// loading-overlay
const loadingOverlayItem: DevCenterItem = {
  id: 'loading-overlay',
  label: 'LoadingOverlay',
  layer: 'l4',
  type: 'interactive',
  tags: ['loading', 'spinner', 'overlay', 'glass'],
  defaultConfig: { message: 'Loading...', glass: true },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { LoadingOverlay } from '@goliapkg/gds'" />

      <LivePreview>
        <div className="relative h-32 w-64 rounded-lg border border-border bg-bg-secondary p-4">
          <p className="text-sm text-fg">Content underneath</p>
          <p className="text-xs text-fg-muted">This is covered by the overlay</p>
          <LoadingOverlay visible message={config.message !== '' ? config.message : undefined} glass={config.glass} />
        </div>
      </LivePreview>

      <DocSection title="Variants" columns={2}>
        <DemoCard title="With Glass" description="Frosted glass backdrop" code={`<div className="relative">\n  <LoadingOverlay visible glass />\n</div>`}>
          <div className="relative h-24 w-full rounded-lg border border-border bg-bg-secondary p-3">
            <p className="text-xs text-fg-muted">Background content</p>
            <LoadingOverlay visible glass />
          </div>
        </DemoCard>
        <DemoCard title="With Message" description="Optional loading message" code={`<LoadingOverlay visible message="Saving..." />`}>
          <div className="relative h-24 w-full rounded-lg border border-border bg-bg-secondary p-3">
            <p className="text-xs text-fg-muted">Background content</p>
            <LoadingOverlay visible message="Saving changes..." />
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="API" columns={1}>
        <DocTable rows={[
          { prop: 'visible', type: 'boolean', default: '—', description: 'Show/hide the overlay' },
          { prop: 'message', type: 'string', default: '—', description: 'Optional text below spinner' },
          { prop: 'glass', type: 'boolean', default: 'true', description: 'Enable frosted glass backdrop' },
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="message" value={config.message} onChange={(v) => setConfig('message', v)} placeholder="Loading..." />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { LoadingOverlay } from '@goliapkg/gds'", '']
    const props: string[] = ['visible']
    if (config.message !== '') props.push(`message="${config.message}"`)
    if (config.glass === false) props.push('glass={false}')
    lines.push('<LoadingOverlay')
    for (const p of props) lines.push(`  ${p}`)
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['visible', 'Show/hide the overlay', 'boolean', '—'],
        ['message', 'Optional text below spinner', 'string', '—'],
        ['glass', 'Enable frosted glass backdrop', 'boolean', 'true'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Place inside a relative-positioned container to scope the overlay</p>
          <p>• Glass is enabled by default — pass glass=false for a solid backdrop</p>
          <p>• Use for async operations like form submission or data loading</p>
        </div>
      </div>
    </div>
  ),
}

moleculeItemsC.push(loadingOverlayItem)

// color-picker
const colorPickerItem: DevCenterItem = {
  id: 'color-picker',
  label: 'ColorPicker',
  layer: 'l4',
  type: 'interactive',
  tags: ['form', 'color', 'swatch', 'hex', 'picker'],
  defaultConfig: { showInput: true, disabled: false },

  stage: ({ config }) => {
    function ColorPickerDemo() {
      const [val, setVal] = useState('#3b82f6')
      return (
        <ColorPicker
          value={val}
          onChange={setVal}
          showInput={config.showInput}
          disabled={config.disabled}
        />
      )
    }
    return (
      <div>
        <ImportLine text="import { ColorPicker } from '@goliapkg/gds'" />

        <LivePreview>
          <ColorPickerDemo />
        </LivePreview>

        <DocSection title="Features" columns={2}>
          <DemoCard title="Default Presets" description="10 diverse color swatches" code={`<ColorPicker value={color} onChange={setColor} />`}>
            <ColorPicker value="#ef4444" onChange={() => {}} />
          </DemoCard>
          <DemoCard title="Custom Presets" description="Provide your own swatch palette" code={`<ColorPicker\n  value={color}\n  onChange={setColor}\n  presets={['#000', '#fff', '#f00']}\n/>`}>
            <ColorPicker value="#000000" onChange={() => {}} presets={['#000000', '#ffffff', '#ef4444', '#22c55e', '#3b82f6']} />
          </DemoCard>
        </DocSection>

        <DocSection title="States" columns={2}>
          <DemoCard title="No Input" description="Swatches only, no hex input" code={`<ColorPicker value={color} onChange={setColor} showInput={false} />`}>
            <ColorPicker value="#22c55e" onChange={() => {}} showInput={false} />
          </DemoCard>
          <DemoCard title="Disabled" description="Non-interactive state" code={`<ColorPicker value={color} onChange={setColor} disabled />`}>
            <ColorPicker value="#8b5cf6" onChange={() => {}} disabled />
          </DemoCard>
        </DocSection>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl label="showInput" type="check" value={config.showInput} onChange={v => setConfig('showInput', v)} />
      <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { ColorPicker } from '@goliapkg/gds'", '']
    const props: string[] = ['value={color}', 'onChange={setColor}']
    if (config.showInput === false) props.push('showInput={false}')
    if (config.disabled === true) props.push('disabled')
    lines.push('<ColorPicker')
    for (const p of props) lines.push(`  ${p}`)
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Current hex color', 'string', '—'],
        ['onChange', 'Color change callback', '(color: string) => void', '—'],
        ['presets', 'Preset color swatches', 'string[]', '10 default colors'],
        ['showInput', 'Show hex text input', 'boolean', 'true'],
        ['disabled', 'Disable interaction', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Click a swatch to select, active swatch shows accent ring</p>
          <p>• Hex input validates #rrggbb format before firing onChange</p>
          <p>• No native color picker — pure CSS/JS for visual consistency</p>
          <p>• Provide custom presets array to match your brand palette</p>
        </div>
      </div>
    </div>
  ),
}

moleculeItemsC.push(colorPickerItem)

export { moleculeItemsC }
