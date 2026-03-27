import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button } from '@gds/l2-primitives'
import {
  Dropdown,
  HoverCard,
  Pagination,
  Select,
  Sheet,
  Stepper,
  Toast,
} from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

function PaginationDemo({ totalPages, siblings }: { totalPages?: number, siblings?: number } = {}) {
  const [page, setPage] = useState(1)
  const total = totalPages ?? 10
  return (
    <div className="flex flex-col items-center gap-2">
      <Pagination page={page} totalPages={total} onPageChange={setPage} siblings={siblings} />
      <span className="text-xs text-fg-muted">Page {page} of {total}</span>
    </div>
  )
}

function SelectDemo() {
  const [value, setValue] = useState('')
  return (
    <div className="flex flex-col gap-3 max-w-xs">
      <Select value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="" disabled>Select a framework...</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </Select>
      <Select inputSize="sm" error>
        <option value="">Error state</option>
      </Select>
    </div>
  )
}

function SheetDemo({ side, glass, title, width }: { side?: string, glass?: boolean, title?: string, width?: number } = {}) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Sheet</Button>
      <Sheet open={open} onClose={() => setOpen(false)} title={title ?? 'Details'} description="Side panel overlay" side={side as any} glass={glass} width={width}>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-fg-muted">Sheet content goes here.</p>
          <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Sheet>
    </div>
  )
}

function ToastDemo({ variant, title, description }: { variant?: string, title?: string, description?: string } = {}) {
  const [visible, setVisible] = useState(true)
  if (variant !== undefined) {
    return (
      <div className="max-w-sm">
        <Toast title={title ?? 'Notification'} description={description} variant={variant as any} onClose={() => {}} />
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-3 max-w-sm">
      {!visible && (
        <Button size="sm" onClick={() => setVisible(true)}>Show Toasts</Button>
      )}
      {visible && (
        <>
          <Toast title="Info" description="This is an informational toast." variant="default" onClose={() => setVisible(false)} />
          <Toast title="Success" description="Operation completed." variant="success" />
          <Toast title="Warning" description="Please review carefully." variant="warning" />
          <Toast title="Error" description="Something went wrong." variant="danger" />
        </>
      )}
    </div>
  )
}

const moleculeItemsB: DevCenterItem[] = [
  {
    id: 'dropdown',
    label: 'Dropdown',
    layer: 'l4',
    type: 'interactive',
    tags: ['menu', 'popover', 'actions'],
    defaultConfig: { align: 'start', glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Dropdown } from '@goliapkg/gds'" />

        <LivePreview>
          <Dropdown
            trigger={<Button variant="secondary" size="sm">Actions</Button>}
            items={[
              { id: 'edit', label: 'Edit' },
              { id: 'duplicate', label: 'Duplicate' },
              { id: 'sep', label: '', separator: true },
              { id: 'archive', label: 'Archive', danger: true },
            ]}
            onSelect={() => {}}
            align={config.align}
            glass={config.glass}
          />
        </LivePreview>

        <DocSection title="Alignment" columns={2}>
          <DemoCard title="Start Aligned" description="Menu opens to the left" code={`<Dropdown align="start" trigger={...} items={...} onSelect={handler} />`}>
            <Dropdown
              trigger={<Button variant="secondary" size="sm">Start</Button>}
              items={[{ id: 'a', label: 'Option A' }, { id: 'b', label: 'Option B' }]}
              onSelect={() => {}}
              align="start"
            />
          </DemoCard>
          <DemoCard title="End Aligned" description="Menu opens to the right" code={`<Dropdown align="end" trigger={...} items={...} onSelect={handler} />`}>
            <Dropdown
              trigger={<Button variant="secondary" size="sm">End</Button>}
              items={[{ id: 'a', label: 'Option A' }, { id: 'b', label: 'Option B' }]}
              onSelect={() => {}}
              align="end"
            />
          </DemoCard>
        </DocSection>

        <DocSection title="Features" columns={2}>
          <DemoCard title="With Shortcuts" description="Keyboard hint in items" code={`<Dropdown items={[\n  { id: 'copy', label: 'Copy', shortcut: '\u2318C' },\n]} />`}>
            <Dropdown
              trigger={<Button variant="secondary" size="sm">Edit</Button>}
              items={[
                { id: 'copy', label: 'Copy', shortcut: '\u2318C' },
                { id: 'paste', label: 'Paste', shortcut: '\u2318V' },
              ]}
              onSelect={() => {}}
            />
          </DemoCard>
          <DemoCard title="Glass Mode" description="Frosted glass surface" code={`<Dropdown glass trigger={...} items={...} />`}>
            <Dropdown
              trigger={<Button variant="secondary" size="sm">Glass</Button>}
              items={[{ id: 'a', label: 'Option A' }, { id: 'b', label: 'Option B' }]}
              onSelect={() => {}}
              glass
            />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="align" type="pills" value={config.align} options={['start', 'end']} onChange={v => setConfig('align', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Dropdown } from '@goliapkg/gds'", '']
      lines.push(`<Dropdown`)
      lines.push(`  trigger={<Button>Actions</Button>}`)
      if (config.align !== 'start') lines.push(`  align="${config.align}"`)
      if (config.glass === true) lines.push(`  glass`)
      lines.push(`  items={[`)
      lines.push(`    { id: 'edit', label: 'Edit' },`)
      lines.push(`    { id: 'delete', label: 'Delete', danger: true },`)
      lines.push(`  ]}`)
      lines.push(`  onSelect={(id) => handleAction(id)}`)
      lines.push(`/>`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['trigger', 'Button/element that opens menu', 'ReactNode', '—'],
          ['items', 'Menu item definitions', 'DropdownItem[]', '—'],
          ['onSelect', 'Item click callback', '(id: string) => void', '—'],
          ['align', 'Menu alignment', "'start' | 'end'", "'start'"],
          ['glass', 'Glass morphism surface', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">DropdownItem</div>
          <DocTable rows={[
            ['id', 'Unique item id', 'string', '—'],
            ['label', 'Display text', 'string', '—'],
            ['icon', 'Left icon element', 'ReactNode', '—'],
            ['shortcut', 'Keyboard shortcut hint', 'string', '—'],
            ['danger', 'Destructive styling', 'boolean', 'false'],
            ['disabled', 'Non-interactive', 'boolean', 'false'],
            ['separator', 'Render as divider', 'boolean', 'false'],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Click trigger to toggle — closes on click outside or Escape</p>
            <p>• Use separator items to group related actions</p>
            <p>• Glass mode adds frosted translucency to the menu surface</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'hover-card',
    label: 'HoverCard',
    layer: 'l4',
    type: 'interactive',
    tags: ['tooltip', 'preview', 'hover'],
    defaultConfig: { placement: 'bottom', delay: 300 },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { HoverCard } from '@goliapkg/gds'" />

        <LivePreview>
          <HoverCard
            trigger={<span className="cursor-pointer text-sm text-accent underline">Hover me</span>}
            placement={config.placement}
            delay={config.delay}
          >
            <div className="w-48">
              <p className="text-sm font-medium text-fg">Preview Card</p>
              <p className="mt-1 text-xs text-fg-muted">Rich content shown on hover with configurable delay.</p>
            </div>
          </HoverCard>
        </LivePreview>

        <DocSection title="Placement" columns={2}>
          <DemoCard title="Bottom & Top" description="Vertical placement options" code={`<HoverCard placement="bottom" trigger={...}>...</HoverCard>\n<HoverCard placement="top" trigger={...}>...</HoverCard>`}>
            <div className="flex gap-6 py-8">
              <HoverCard trigger={<span className="cursor-pointer text-xs text-accent underline">Bottom</span>} placement="bottom">
                <div className="w-36"><p className="text-xs text-fg-muted">Placement: bottom</p></div>
              </HoverCard>
              <HoverCard trigger={<span className="cursor-pointer text-xs text-accent underline">Top</span>} placement="top">
                <div className="w-36"><p className="text-xs text-fg-muted">Placement: top</p></div>
              </HoverCard>
            </div>
          </DemoCard>
          <DemoCard title="Left & Right" description="Horizontal placement options" code={`<HoverCard placement="left" trigger={...}>...</HoverCard>\n<HoverCard placement="right" trigger={...}>...</HoverCard>`}>
            <div className="flex gap-6 py-4 px-16">
              <HoverCard trigger={<span className="cursor-pointer text-xs text-accent underline">Left</span>} placement="left">
                <div className="w-36"><p className="text-xs text-fg-muted">Placement: left</p></div>
              </HoverCard>
              <HoverCard trigger={<span className="cursor-pointer text-xs text-accent underline">Right</span>} placement="right">
                <div className="w-36"><p className="text-xs text-fg-muted">Placement: right</p></div>
              </HoverCard>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Rich Content">
          <DemoCard title="User Preview" description="Profile card on hover" code={`<HoverCard trigger={<span>@user</span>}>\n  <div>\n    <Avatar ... />\n    <p>User Name</p>\n    <p>Bio text</p>\n  </div>\n</HoverCard>`}>
            <HoverCard trigger={<span className="cursor-pointer text-xs text-accent underline">@johndoe</span>} placement="bottom">
              <div className="w-52">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-xs text-accent">JD</div>
                  <div>
                    <p className="text-xs font-medium text-fg">John Doe</p>
                    <p className="text-[10px] text-fg-muted">Software Engineer</p>
                  </div>
                </div>
                <p className="mt-2 text-[10px] text-fg-muted">Building great developer tools. Open source enthusiast.</p>
              </div>
            </HoverCard>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="placement" type="pills" value={config.placement} options={['top', 'bottom', 'left', 'right']} onChange={v => setConfig('placement', v)} />
        <Ctrl label="delay" type="number" value={config.delay} min={0} max={1000} onChange={v => setConfig('delay', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { HoverCard } from '@goliapkg/gds'", '']
      const props: string[] = ['trigger={<span>Hover me</span>}']
      if (config.placement !== 'bottom') props.push(`placement="${config.placement}"`)
      if (config.delay !== 300) props.push(`delay={${config.delay}}`)
      lines.push(`<HoverCard ${props.join(' ')}>`)
      lines.push(`  <p>Rich preview content</p>`)
      lines.push(`</HoverCard>`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['trigger', 'Hover target element', 'ReactNode', '—'],
          ['placement', 'Card position relative to trigger', "'top' | 'bottom' | 'left' | 'right'", "'bottom'"],
          ['delay', 'Hover delay in ms before showing', 'number', '300'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for rich previews — for simple text, use Tooltip instead</p>
            <p>• Card stays open when mouse moves from trigger to card</p>
            <p>• 150ms leave delay prevents accidental dismissal</p>
            <p>• Card content is fully interactive (links, buttons, etc.)</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'pagination',
    label: 'Pagination',
    layer: 'l4',
    type: 'interactive',
    tags: ['page', 'navigation', 'table'],
    defaultConfig: { totalPages: 10, siblings: 1 },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Pagination } from '@goliapkg/gds'" />

        <LivePreview>
          <PaginationDemo totalPages={config.totalPages} siblings={config.siblings} />
        </LivePreview>

        <DocSection title="Examples" columns={2}>
          <DemoCard title="Few Pages" description="All pages visible" code={`<Pagination page={page} totalPages={5} onPageChange={setPage} />`}>
            <PaginationDemo totalPages={5} />
          </DemoCard>
          <DemoCard title="Many Pages" description="Ellipsis for collapsed ranges" code={`<Pagination page={page} totalPages={20} onPageChange={setPage} />`}>
            <PaginationDemo totalPages={20} />
          </DemoCard>
        </DocSection>

        <DocSection title="Siblings">
          <DemoCard title="Custom Siblings" description="Control visible range around current" code={`<Pagination page={page} totalPages={20} onPageChange={setPage} siblings={2} />`}>
            <PaginationDemo totalPages={20} siblings={2} />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="totalPages" type="number" value={config.totalPages} min={1} max={50} onChange={v => setConfig('totalPages', v)} />
        <Ctrl label="siblings" type="number" value={config.siblings} min={0} max={3} onChange={v => setConfig('siblings', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Pagination } from '@goliapkg/gds'", '']
      const props = [`page={page}`, `totalPages={${config.totalPages}}`, `onPageChange={setPage}`]
      if (config.siblings !== 1) props.push(`siblings={${config.siblings}}`)
      lines.push(`<Pagination ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['page', 'Current active page', 'number', '—'],
          ['totalPages', 'Total number of pages', 'number', '—'],
          ['onPageChange', 'Page change callback', '(page: number) => void', '—'],
          ['siblings', 'Pages visible around current', 'number', '1'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Controlled component — manage page state externally</p>
            <p>• Ellipsis appears automatically when pages are collapsed</p>
            <p>• Previous/Next buttons auto-disable at boundaries</p>
            <p>• Active page shows accent background</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'select',
    label: 'Select',
    layer: 'l4',
    type: 'interactive',
    tags: ['form', 'input', 'dropdown'],
    defaultConfig: { inputSize: 'default', error: false, disabled: false, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Select } from '@goliapkg/gds'" />

        <LivePreview>
          <div className="w-60">
            <Select inputSize={config.inputSize} error={config.error} disabled={config.disabled} glass={config.glass}>
              <option value="" disabled>Select a framework...</option>
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="svelte">Svelte</option>
            </Select>
          </div>
        </LivePreview>

        <DocSection title="States" columns={2}>
          <DemoCard title="Default" description="Standard native select" code={`<Select>\n  <option value="react">React</option>\n</Select>`}>
            <SelectDemo />
          </DemoCard>
          <DemoCard title="Error & Disabled" description="Validation and inactive states" code={`<Select error><option>Error</option></Select>\n<Select disabled><option>Disabled</option></Select>`}>
            <div className="flex flex-col gap-3 max-w-xs">
              <Select error><option value="">Error state</option></Select>
              <Select disabled><option value="">Disabled</option></Select>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Sizes">
          <DemoCard title="Size Comparison" description="Default and small density" code={`<Select inputSize="default">...</Select>\n<Select inputSize="sm">...</Select>`}>
            <div className="flex flex-col gap-2 max-w-xs">
              <Select><option>Default size</option></Select>
              <Select inputSize="sm"><option>Small size</option></Select>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="inputSize" type="pills" value={config.inputSize} options={['default', 'sm']} onChange={v => setConfig('inputSize', v)} />
        <Ctrl label="error" type="check" value={config.error} onChange={v => setConfig('error', v)} />
        <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Select } from '@goliapkg/gds'", '']
      const props: string[] = []
      if (config.inputSize !== 'default') props.push(`inputSize="${config.inputSize}"`)
      if (config.error === true) props.push('error')
      if (config.disabled === true) props.push('disabled')
      if (config.glass === true) props.push('glass')
      const pStr = props.length > 0 ? ' ' + props.join(' ') : ''
      lines.push(`<Select${pStr}>`)
      lines.push(`  <option value="react">React</option>`)
      lines.push(`</Select>`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['inputSize', 'Density-aware height', "'default' | 'sm'", "'default'"],
          ['error', 'Error border style', 'boolean', 'false'],
          ['disabled', 'Non-interactive state', 'boolean', 'false'],
          ['glass', 'Glass morphism effect', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Uses native select element with custom chevron overlay</p>
            <p>• inputSize (not size) to avoid conflict with native HTML size attribute</p>
            <p>• Supports forwardRef for form library integration</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'sheet',
    label: 'Sheet',
    layer: 'l4',
    type: 'interactive',
    tags: ['panel', 'drawer', 'side', 'overlay'],
    defaultConfig: { side: 'right', glass: false, title: 'Details', width: 320 },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Sheet } from '@goliapkg/gds'" />

        <LivePreview>
          <SheetDemo side={config.side} glass={config.glass} title={config.title} width={config.width} />
        </LivePreview>

        <DocSection title="Sides" columns={2}>
          <DemoCard title="Right (Default)" description="Slides in from the right" code={`<Sheet side="right" open={open} onClose={close} title="Right">\n  <p>Content</p>\n</Sheet>`}>
            <SheetDemo side="right" title="Right Panel" />
          </DemoCard>
          <DemoCard title="Left" description="Slides in from the left" code={`<Sheet side="left" open={open} onClose={close} title="Left">\n  <p>Content</p>\n</Sheet>`}>
            <SheetDemo side="left" title="Left Panel" />
          </DemoCard>
        </DocSection>

        <DocSection title="Features">
          <DemoCard title="Glass Mode" description="Frosted glass surface" code={`<Sheet glass open={open} onClose={close} title="Glass">\n  <p>Content</p>\n</Sheet>`}>
            <SheetDemo glass title="Glass Panel" />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="side" type="pills" value={config.side} options={['left', 'right']} onChange={v => setConfig('side', v)} />
        <Ctrl label="title" type="text" value={config.title} onChange={v => setConfig('title', v)} />
        <Ctrl label="width" type="number" value={config.width} min={200} max={600} onChange={v => setConfig('width', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Sheet } from '@goliapkg/gds'", '']
      const props: string[] = ['open={open}', 'onClose={close}']
      if (config.side !== 'right') props.push(`side="${config.side}"`)
      if (config.title !== '') props.push(`title="${config.title}"`)
      if (config.width !== 320) props.push(`width={${config.width}}`)
      if (config.glass === true) props.push('glass')
      lines.push(`<Sheet`)
      for (const p of props) lines.push(`  ${p}`)
      lines.push(`>`)
      lines.push(`  <p>Panel content</p>`)
      lines.push(`</Sheet>`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['open', 'Visibility state', 'boolean', 'false'],
          ['onClose', 'Close callback', '() => void', '—'],
          ['side', 'Slide direction', "'left' | 'right'", "'right'"],
          ['title', 'Header title', 'string', '—'],
          ['description', 'Header subtitle', 'string', '—'],
          ['width', 'Panel width (px or string)', 'number | string', '320'],
          ['glass', 'Glass morphism surface', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Built-in scroll lock, Escape key, and backdrop click to close</p>
            <p>• Sheet is a gds-ctx container — nested components auto-scale</p>
            <p>• Use for detail panels, settings, and supplementary content</p>
            <p>• Content area scrolls independently when overflow occurs</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'stepper',
    label: 'Stepper',
    layer: 'l4',
    type: 'interactive',
    tags: ['progress', 'wizard', 'steps'],
    defaultConfig: { current: 1, orientation: 'horizontal', showDescriptions: true },

    stage: ({ config }) => {
      const steps = config.showDescriptions
        ? [
            { label: 'Account', description: 'Create account' },
            { label: 'Profile', description: 'Fill details' },
            { label: 'Review', description: 'Confirm info' },
          ]
        : [
            { label: 'Account' },
            { label: 'Profile' },
            { label: 'Review' },
          ]
      return (
        <div>
          <ImportLine text="import { Stepper } from '@goliapkg/gds'" />

          <LivePreview>
            <Stepper steps={steps} current={config.current} orientation={config.orientation} />
          </LivePreview>

          <DocSection title="Orientation" columns={2}>
            <DemoCard title="Horizontal" description="Default left-to-right flow" code={`<Stepper orientation="horizontal" steps={steps} current={1} />`}>
              <Stepper
                steps={[{ label: 'Upload' }, { label: 'Process' }, { label: 'Done' }]}
                current={1}
                orientation="horizontal"
              />
            </DemoCard>
            <DemoCard title="Vertical" description="Top-to-bottom flow" code={`<Stepper orientation="vertical" steps={steps} current={1} />`}>
              <Stepper
                steps={[{ label: 'Upload' }, { label: 'Process' }, { label: 'Done' }]}
                current={1}
                orientation="vertical"
              />
            </DemoCard>
          </DocSection>

          <DocSection title="States">
            <DemoCard title="Progress States" description="Completed, active, and upcoming" code={`<Stepper steps={steps} current={2} />`}>
              <Stepper
                steps={[
                  { label: 'Account', description: 'Done' },
                  { label: 'Profile', description: 'Done' },
                  { label: 'Review', description: 'Current step' },
                  { label: 'Complete', description: 'Upcoming' },
                ]}
                current={2}
              />
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="current" type="number" value={config.current} min={0} max={3} onChange={v => setConfig('current', v)} />
        <Ctrl label="orientation" type="pills" value={config.orientation} options={['horizontal', 'vertical']} onChange={v => setConfig('orientation', v)} />
        <Ctrl label="showDescriptions" type="check" value={config.showDescriptions} onChange={v => setConfig('showDescriptions', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Stepper } from '@goliapkg/gds'", '']
      const props: string[] = []
      if (config.orientation !== 'horizontal') props.push(`orientation="${config.orientation}"`)
      props.push(`current={${config.current}}`)
      lines.push(`<Stepper`)
      lines.push(`  steps={[`)
      if (config.showDescriptions) {
        lines.push(`    { label: 'Account', description: 'Create account' },`)
        lines.push(`    { label: 'Profile', description: 'Fill details' },`)
        lines.push(`    { label: 'Review', description: 'Confirm info' },`)
      } else {
        lines.push(`    { label: 'Account' },`)
        lines.push(`    { label: 'Profile' },`)
        lines.push(`    { label: 'Review' },`)
      }
      lines.push(`  ]}`)
      for (const p of props) lines.push(`  ${p}`)
      lines.push(`/>`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['steps', 'Step definitions', 'StepDef[]', '—'],
          ['current', 'Index of current step (0-based)', 'number', '—'],
          ['orientation', 'Layout direction', "'horizontal' | 'vertical'", "'horizontal'"],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">StepDef</div>
          <DocTable rows={[
            ['label', 'Step name', 'string', '—'],
            ['description', 'Optional subtitle', 'string', '—'],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Steps before current show checkmark (completed state)</p>
            <p>• Current step shows accent ring indicator</p>
            <p>• Connecting lines change color based on completion</p>
            <p>• Use horizontal for wizard headers, vertical for sidebar progress</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'toast',
    label: 'Toast',
    layer: 'l4',
    type: 'interactive',
    tags: ['notification', 'snackbar', 'message'],
    variants: ['default', 'success', 'warning', 'danger'],
    defaultConfig: { title: 'Notification', description: 'Something happened.', closable: true },

    stage: ({ config, variant }) => (
      <div>
        <ImportLine text="import { Toast } from '@goliapkg/gds'" />

        <LivePreview>
          <div className="max-w-sm">
            <Toast
              title={config.title}
              description={config.description}
              variant={variant as any}
              onClose={config.closable ? () => {} : undefined}
            />
          </div>
        </LivePreview>

        <DocSection title="Variants" columns={2}>
          <DemoCard title="All Variants" description="4 semantic toast styles" code={`<Toast variant="default" title="Info" description="..." />\n<Toast variant="success" title="Success" description="..." />\n<Toast variant="warning" title="Warning" description="..." />\n<Toast variant="danger" title="Error" description="..." />`}>
            <ToastDemo />
          </DemoCard>
          <DemoCard title="With Action" description="Custom action button slot" code={`<Toast\n  title="Undo"\n  description="Item deleted."\n  action={<Button size="sm">Undo</Button>}\n/>`}>
            <div className="max-w-sm">
              <Toast title="Deleted" description="Item has been removed." variant="default" action={<Button size="sm" variant="secondary">Undo</Button>} />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Patterns">
          <DemoCard title="Title Only" description="Minimal toast without description" code={`<Toast title="Saved" variant="success" />`}>
            <div className="flex flex-col gap-2 max-w-sm">
              <Toast title="Saved successfully" variant="success" />
              <Toast title="Connection lost" variant="danger" />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig, variant, setVariant }) => (
      <>
        <Ctrl label="variant" type="pills" value={variant} options={['default', 'success', 'warning', 'danger']} onChange={setVariant} />
        <Ctrl label="title" type="text" value={config.title} onChange={v => setConfig('title', v)} />
        <Ctrl label="description" type="text" value={config.description} onChange={v => setConfig('description', v)} />
        <Ctrl label="closable" type="check" value={config.closable} onChange={v => setConfig('closable', v)} />
      </>
    ),

    code: ({ config, variant }) => {
      const lines = ["import { Toast } from '@goliapkg/gds'", '']
      const props: string[] = []
      if (variant !== 'default') props.push(`variant="${variant}"`)
      props.push(`title="${config.title}"`)
      if (config.description !== '') props.push(`description="${config.description}"`)
      if (config.closable === true) props.push('onClose={dismiss}')
      lines.push(`<Toast ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['title', 'Toast heading', 'string', '—'],
          ['description', 'Body text', 'string', '—'],
          ['variant', 'Color variant', "'default' | 'success' | 'warning' | 'danger'", "'default'"],
          ['onClose', 'Show dismiss button', '() => void', '—'],
          ['action', 'Custom action element', 'ReactNode', '—'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Each variant includes matching icon and left border color</p>
            <p>• Use action slot for undo or retry buttons</p>
            <p>• Toast is a static card — position via a toast container/manager</p>
            <p>• Title is required, description is optional for concise messages</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { moleculeItemsB }

