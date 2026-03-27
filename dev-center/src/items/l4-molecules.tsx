import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Badge, Button, Input, Label } from '@gds/l2-primitives'
import {
  Accordion,
  AccordionItem,
  Alert,
  Breadcrumb,
  Card,
  ContextMenu,
  Dialog,
  Tabs,
} from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

function DialogDemo({ width, glass, title, description }: { width?: string, glass?: boolean, title?: string, description?: string } = {}) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title={title ?? 'Confirm Action'} description={description} width={width as any} glass={glass}>
        <p className="text-sm text-fg-muted">{description ?? 'Are you sure you want to proceed?'}</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </div>
      </Dialog>
    </div>
  )
}

function TabsDemo({ size, glass }: { size?: string, glass?: boolean } = {}) {
  const [active, setActive] = useState('overview')
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'settings', label: 'Settings', count: 3 },
    { id: 'logs', label: 'Logs' },
  ]
  return (
    <div>
      <Tabs tabs={tabs} active={active} onChange={setActive} size={size as any} glass={glass} />
      <div className="mt-3 text-sm text-fg-muted">Active tab: {active}</div>
    </div>
  )
}

const moleculeItems: DevCenterItem[] = [
  {
    id: 'dialog',
    label: 'Dialog',
    layer: 'l4',
    type: 'interactive',
    tags: ['modal', 'overlay', 'popup'],
    defaultConfig: { width: 'default', glass: false, title: 'Confirm Action', description: 'Are you sure you want to proceed?' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Dialog } from '@goliapkg/gds'" />

        <LivePreview>
          <DialogDemo width={config.width} glass={config.glass} title={config.title} description={config.description} />
        </LivePreview>

        <DocSection title="Widths" columns={2}>
          <DemoCard title="Width Options" description="sm, default, lg, xl" code={`<Dialog width="sm" open={open} onClose={close} title="Small">\n  <p>Content</p>\n</Dialog>`}>
            <div className="flex flex-wrap gap-2">
              {(['sm', 'default', 'lg', 'xl'] as const).map(w => (
                <Badge key={w} variant="default">{w}</Badge>
              ))}
            </div>
          </DemoCard>
          <DemoCard title="Glass Mode" description="Frosted glass surface" code={`<Dialog glass open={open} onClose={close} title="Glass">\n  <p>Content</p>\n</Dialog>`}>
            <DialogDemo glass title="Glass Dialog" description="Frosted surface" />
          </DemoCard>
        </DocSection>

        <DocSection title="Patterns">
          <DemoCard title="Confirmation Dialog" description="Standard confirm/cancel pattern" full code={`<Dialog open={open} onClose={close} title="Delete item?">\n  <p>This action cannot be undone.</p>\n  <div className="mt-4 flex justify-end gap-2">\n    <Button variant="secondary" onClick={close}>Cancel</Button>\n    <Button variant="danger" onClick={confirm}>Delete</Button>\n  </div>\n</Dialog>`}>
            <DialogDemo title="Delete item?" description="This action cannot be undone." />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="width" type="pills" value={config.width} options={['sm', 'default', 'lg', 'xl']} onChange={v => setConfig('width', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
        <Ctrl label="title" type="text" value={config.title} onChange={v => setConfig('title', v)} />
        <Ctrl label="description" type="text" value={config.description} onChange={v => setConfig('description', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Dialog } from '@goliapkg/gds'", '']
      const props: string[] = ['open={open}', 'onClose={close}']
      if (config.width !== 'default') props.push(`width="${config.width}"`)
      if (config.glass === true) props.push('glass')
      if (config.title !== '') props.push(`title="${config.title}"`)
      if (config.description !== '') props.push(`description="${config.description}"`)
      lines.push(`<Dialog`)
      for (const p of props) lines.push(`  ${p}`)
      lines.push(`>`)
      lines.push(`  <p>Dialog content here</p>`)
      lines.push(`</Dialog>`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['open', 'Visibility state', 'boolean', 'false'],
          ['onClose', 'Close callback', '() => void', '—'],
          ['title', 'Header title', 'string', '—'],
          ['description', 'Header subtitle', 'string', '—'],
          ['width', 'Max width', "'sm' | 'default' | 'lg' | 'xl'", "'default'"],
          ['glass', 'Glass morphism surface', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Built-in focus trap, scroll lock, and Escape key handling</p>
            <p>• Click backdrop to close — standard modal behavior</p>
            <p>• Renders via portal to document.body</p>
            <p>• Dialog is a gds-ctx container — nested components auto-scale</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'card',
    label: 'Card',
    layer: 'l4',
    type: 'interactive',
    tags: ['container', 'panel', 'surface'],
    defaultConfig: { padding: 'default', glass: false, loading: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Card, CardHeader, CardContent, CardFooter } from '@goliapkg/gds'" />

        <LivePreview>
          <div className="w-72">
            <Card padding={config.padding} glass={config.glass} loading={config.loading}>
              <div className="text-sm font-medium text-fg">Card Title</div>
              <div className="mt-1 text-xs text-fg-muted">Card content goes here with details.</div>
            </Card>
          </div>
        </LivePreview>

        <DocSection title="Padding" columns={2}>
          <DemoCard title="Padding Variants" description="none, sm, default, lg" code={`<Card padding="none">...</Card>\n<Card padding="sm">...</Card>\n<Card>...</Card>\n<Card padding="lg">...</Card>`}>
            <div className="flex flex-col gap-3">
              {(['none', 'sm', 'default', 'lg'] as const).map(p => (
                <Card key={p} padding={p}>
                  <div className="text-xs text-fg-muted">padding="{p}"</div>
                </Card>
              ))}
            </div>
          </DemoCard>
          <DemoCard title="Glass & Loading" description="Special surface modes" code={`<Card glass>Glass</Card>\n<Card loading />`}>
            <div className="flex flex-col gap-3">
              <Card glass padding="default">
                <div className="text-xs text-fg">Glass surface</div>
              </Card>
              <Card loading padding="default" />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Composition">
          <DemoCard title="Full Card" description="Header + Content + Footer" full code={`<Card>\n  <CardHeader title="Title" description="Subtitle" />\n  <CardContent>Body</CardContent>\n  <CardFooter><Button>Action</Button></CardFooter>\n</Card>`}>
            <div className="max-w-sm">
              <Card padding="default">
                <div className="text-sm font-semibold text-fg">Project Details</div>
                <div className="mt-0.5 text-xs text-fg-muted">Last updated 2 hours ago</div>
                <div className="mt-3 text-xs text-fg-muted">Card content with full composition pattern using CardHeader, CardContent, and CardFooter sub-components.</div>
                <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                  <Button size="sm">Save</Button>
                  <Button size="sm" variant="secondary">Cancel</Button>
                </div>
              </Card>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="padding" type="pills" value={config.padding} options={['none', 'sm', 'default', 'lg']} onChange={v => setConfig('padding', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
        <Ctrl label="loading" type="check" value={config.loading} onChange={v => setConfig('loading', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Card } from '@goliapkg/gds'", '']
      const props: string[] = []
      if (config.padding !== 'default') props.push(`padding="${config.padding}"`)
      if (config.glass === true) props.push('glass')
      if (config.loading === true) props.push('loading')
      const pStr = props.length > 0 ? ' ' + props.join(' ') : ''
      lines.push(`<Card${pStr}>`)
      lines.push(`  <h3>Title</h3>`)
      lines.push(`  <p>Content</p>`)
      lines.push(`</Card>`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['padding', 'Internal padding', "'none' | 'sm' | 'default' | 'lg'", "'default'"],
          ['glass', 'Glass morphism surface', 'boolean', 'false'],
          ['loading', 'Skeleton loading state', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Card is a gds-ctx container — nested components auto-scale</p>
            <p>• Compose with CardHeader, CardContent, CardFooter for structured layout</p>
            <p>• Loading state shows a pulse-animated skeleton placeholder</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'accordion',
    label: 'Accordion',
    layer: 'l4',
    type: 'interactive',
    tags: ['expand', 'collapse', 'faq'],
    defaultConfig: { type: 'single', disabled: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Accordion, AccordionItem } from '@goliapkg/gds'" />

        <LivePreview>
          <Accordion type={config.type} defaultExpanded={['a1']}>
            <AccordionItem id="a1" title="What is GDS?" disabled={config.disabled}>GOLIA Design System — a component library.</AccordionItem>
            <AccordionItem id="a2" title="How to install?">Import from @goliapkg/gds package.</AccordionItem>
            <AccordionItem id="a3" title="Dark mode?">Dark-native — designed for dark first.</AccordionItem>
          </Accordion>
        </LivePreview>

        <DocSection title="Type" columns={2}>
          <DemoCard title="Single" description="Only one item open at a time" code={`<Accordion type="single">\n  <AccordionItem id="q1" title="Q1">A1</AccordionItem>\n  <AccordionItem id="q2" title="Q2">A2</AccordionItem>\n</Accordion>`}>
            <Accordion type="single" defaultExpanded={['s1']}>
              <AccordionItem id="s1" title="First item">Content for the first item.</AccordionItem>
              <AccordionItem id="s2" title="Second item">Content for the second item.</AccordionItem>
            </Accordion>
          </DemoCard>
          <DemoCard title="Multiple" description="Multiple items open simultaneously" code={`<Accordion type="multiple">\n  <AccordionItem id="q1" title="Q1">A1</AccordionItem>\n  <AccordionItem id="q2" title="Q2">A2</AccordionItem>\n</Accordion>`}>
            <Accordion type="multiple" defaultExpanded={['m1', 'm2']}>
              <AccordionItem id="m1" title="First item">Content for the first item.</AccordionItem>
              <AccordionItem id="m2" title="Second item">Content for the second item.</AccordionItem>
            </Accordion>
          </DemoCard>
        </DocSection>

        <DocSection title="States">
          <DemoCard title="Disabled Item" description="Individual items can be disabled" code={`<AccordionItem id="q1" title="Disabled" disabled>Cannot expand</AccordionItem>`}>
            <Accordion>
              <AccordionItem id="d1" title="Enabled">This item works normally.</AccordionItem>
              <AccordionItem id="d2" title="Disabled item" disabled>Cannot be expanded.</AccordionItem>
            </Accordion>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="type" type="pills" value={config.type} options={['single', 'multiple']} onChange={v => setConfig('type', v)} />
        <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Accordion, AccordionItem } from '@goliapkg/gds'", '']
      const props: string[] = []
      if (config.type !== 'single') props.push(`type="${config.type}"`)
      props.push(`defaultExpanded={['q1']}`)
      lines.push(`<Accordion ${props.join(' ')}>`)
      const itemProps = config.disabled === true ? ' disabled' : ''
      lines.push(`  <AccordionItem id="q1" title="Question 1"${itemProps}>Answer 1</AccordionItem>`)
      lines.push(`  <AccordionItem id="q2" title="Question 2">Answer 2</AccordionItem>`)
      lines.push(`</Accordion>`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['type', 'Expansion mode', "'single' | 'multiple'", "'single'"],
          ['defaultExpanded', 'Initially expanded item ids', 'string[]', '[]'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div className="mt-3">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">AccordionItem Props</div>
          <DocTable rows={[
            ['id', 'Unique item identifier', 'string', '—'],
            ['title', 'Clickable header text', 'string', '—'],
            ['disabled', 'Prevent expand/collapse', 'boolean', 'false'],
            ['className', 'Additional CSS classes', 'string', '—'],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use single mode for FAQs where only one answer should be visible</p>
            <p>• Use multiple mode for settings panels where users compare sections</p>
            <p>• Items render with divide-y border — no extra spacing needed</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'alert',
    label: 'Alert',
    layer: 'l4',
    type: 'interactive',
    tags: ['notification', 'message', 'banner'],
    variants: ['default', 'info', 'success', 'warning', 'danger'],
    defaultConfig: { title: 'Alert Title', message: 'This is an alert message.', closable: false, glass: false },

    stage: ({ config, variant }) => (
      <div>
        <ImportLine text="import { Alert } from '@goliapkg/gds'" />

        <LivePreview>
          <div className="max-w-md">
            <Alert
              variant={variant as any}
              title={config.title}
              onClose={config.closable ? () => {} : undefined}
              glass={config.glass}
            >
              {config.message}
            </Alert>
          </div>
        </LivePreview>

        <DocSection title="Variants" columns={2}>
          <DemoCard title="Semantic Variants" description="5 color variants for context" code={`<Alert variant="info" title="Info">Message</Alert>\n<Alert variant="success" title="Success">Message</Alert>\n<Alert variant="warning" title="Warning">Message</Alert>\n<Alert variant="danger" title="Error">Message</Alert>`}>
            <div className="flex flex-col gap-2">
              <Alert variant="info" title="Info">Informational message.</Alert>
              <Alert variant="success" title="Success">Operation completed.</Alert>
              <Alert variant="warning" title="Warning">Please review.</Alert>
              <Alert variant="danger" title="Error">Something went wrong.</Alert>
            </div>
          </DemoCard>
          <DemoCard title="Closable" description="Dismiss button via onClose" code={`<Alert variant="info" title="Dismissable" onClose={dismiss}>\n  Click X to close.\n</Alert>`}>
            <div className="flex flex-col gap-2">
              <Alert variant="info" title="Dismissable" onClose={() => {}}>Click the X to close.</Alert>
              <Alert variant="default" title="Default" onClose={() => {}}>With close button.</Alert>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Features">
          <DemoCard title="Without Title" description="Body-only alert" code={`<Alert variant="warning">Simple one-line alert message.</Alert>`}>
            <div className="flex flex-col gap-2 max-w-md">
              <Alert variant="warning">Simple one-line alert without a title.</Alert>
              <Alert variant="success">Another body-only alert.</Alert>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig, variant, setVariant }) => (
      <>
        <Ctrl label="variant" type="pills" value={variant} options={['default', 'info', 'success', 'warning', 'danger']} onChange={setVariant} />
        <Ctrl label="title" type="text" value={config.title} onChange={v => setConfig('title', v)} />
        <Ctrl label="message" type="text" value={config.message} onChange={v => setConfig('message', v)} />
        <Ctrl label="closable" type="check" value={config.closable} onChange={v => setConfig('closable', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config, variant }) => {
      const lines = ["import { Alert } from '@goliapkg/gds'", '']
      const props: string[] = []
      if (variant !== 'default') props.push(`variant="${variant}"`)
      if (config.title !== '') props.push(`title="${config.title}"`)
      if (config.closable === true) props.push('onClose={handleClose}')
      if (config.glass === true) props.push('glass')
      const pStr = props.length > 0 ? ' ' + props.join(' ') : ''
      lines.push(`<Alert${pStr}>`)
      lines.push(`  ${config.message}`)
      lines.push(`</Alert>`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['variant', 'Color variant', "'default' | 'info' | 'success' | 'warning' | 'danger'", "'default'"],
          ['title', 'Bold title text', 'string', '—'],
          ['onClose', 'Show dismiss button', '() => void', '—'],
          ['glass', 'Glass morphism effect', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use info for neutral information, success for positive outcomes</p>
            <p>• Warning for caution states, danger for errors or destructive results</p>
            <p>• Each variant includes a matching icon automatically</p>
            <p>• Title is optional — omit for simple one-line messages</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'tabs',
    label: 'Tabs',
    layer: 'l4',
    type: 'interactive',
    tags: ['navigation', 'switch', 'pane'],
    defaultConfig: { size: 'default', glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { Tabs } from '@goliapkg/gds'" />

        <LivePreview>
          <TabsDemo size={config.size} glass={config.glass} />
        </LivePreview>

        <DocSection title="Variants" columns={2}>
          <DemoCard title="Default Size" description="Standard tab bar" code={`<Tabs tabs={tabs} active={active} onChange={setActive} />`}>
            <TabsDemo />
          </DemoCard>
          <DemoCard title="Small Size" description="Compact tab bar" code={`<Tabs tabs={tabs} active={active} onChange={setActive} size="sm" />`}>
            <TabsDemo size="sm" />
          </DemoCard>
        </DocSection>

        <DocSection title="Features">
          <DemoCard title="With Counts" description="Badge count on tabs" code={`<Tabs tabs={[\n  { id: 'all', label: 'All' },\n  { id: 'unread', label: 'Unread', count: 5 },\n]} active={active} onChange={setActive} />`}>
            <TabsDemo />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="size" type="pills" value={config.size} options={['default', 'sm']} onChange={v => setConfig('size', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Tabs } from '@goliapkg/gds'", '']
      const props: string[] = ['tabs={tabs}', 'active={active}', 'onChange={setActive}']
      if (config.size !== 'default') props.push(`size="${config.size}"`)
      if (config.glass === true) props.push('glass')
      lines.push(`<Tabs ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['tabs', 'Tab definitions', 'TabItem[]', '—'],
          ['active', 'Active tab id', 'string', '—'],
          ['onChange', 'Tab change callback', '(id: string) => void', '—'],
          ['size', 'Tab size', "'default' | 'sm'", "'default'"],
          ['glass', 'Glass morphism effect', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• TabItem has id, label, and optional count for badge numbers</p>
            <p>• Active tab shows accent border-bottom indicator</p>
            <p>• Controlled component — manage active state externally</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'breadcrumb',
    label: 'Breadcrumb',
    layer: 'l4',
    type: 'interactive',
    tags: ['navigation', 'trail', 'path'],
    defaultConfig: { itemCount: 3, maxItems: 0 },

    stage: ({ config }) => {
      const allItems = [
        { label: 'Home', href: '#' },
        { label: 'Products', href: '#' },
        { label: 'Category', href: '#' },
        { label: 'Subcategory', href: '#' },
        { label: 'Current' },
      ]
      const items = allItems.slice(0, Math.max(2, Math.min(config.itemCount, 5)))
      const last = items[items.length - 1]
      if (last.href !== undefined) {
        items[items.length - 1] = { label: last.label }
      }
      return (
        <div>
          <ImportLine text="import { Breadcrumb } from '@goliapkg/gds'" />

          <LivePreview>
            <Breadcrumb items={items} maxItems={config.maxItems > 0 ? config.maxItems : undefined} />
          </LivePreview>

          <DocSection title="Examples" columns={2}>
            <DemoCard title="Simple" description="Basic navigation trail" code={`<Breadcrumb items={[\n  { label: 'Home', href: '/' },\n  { label: 'Products', href: '/products' },\n  { label: 'Detail' },\n]} />`}>
              <Breadcrumb items={[
                { label: 'Home', href: '#' },
                { label: 'Products', href: '#' },
                { label: 'Detail' },
              ]} />
            </DemoCard>
            <DemoCard title="Collapsed" description="Long paths with maxItems" code={`<Breadcrumb\n  items={longPath}\n  maxItems={3}\n/>`}>
              <Breadcrumb items={[
                { label: 'Root', href: '#' },
                { label: 'A', href: '#' },
                { label: 'B', href: '#' },
                { label: 'C', href: '#' },
                { label: 'Current' },
              ]} maxItems={3} />
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="itemCount" type="number" value={config.itemCount} min={2} max={5} onChange={v => setConfig('itemCount', v)} />
        <Ctrl label="maxItems" type="number" value={config.maxItems} min={0} max={5} onChange={v => setConfig('maxItems', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { Breadcrumb } from '@goliapkg/gds'", '']
      const props: string[] = []
      if (config.maxItems > 0) props.push(`maxItems={${config.maxItems}}`)
      const pStr = props.length > 0 ? ' ' + props.join(' ') : ''
      lines.push(`<Breadcrumb${pStr} items={[`)
      lines.push(`  { label: 'Home', href: '/' },`)
      lines.push(`  { label: 'Products', href: '/products' },`)
      lines.push(`  { label: 'Detail' },`)
      lines.push(`]} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['items', 'Breadcrumb trail items', 'BreadcrumbItem[]', '—'],
          ['separator', 'Custom separator element', 'ReactNode', 'chevron'],
          ['maxItems', 'Collapse to first...last when exceeded', 'number', '—'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Last item should omit href — it represents the current page</p>
            <p>• Use maxItems to collapse long paths (keeps first and last visible)</p>
            <p>• Items with href render as links, without href render as text</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'context-menu',
    label: 'ContextMenu',
    layer: 'l4',
    type: 'interactive',
    tags: ['right-click', 'menu', 'actions'],
    defaultConfig: { showShortcuts: true, showDanger: true },

    stage: ({ config }) => {
      const items = [
        { id: 'copy', label: 'Copy', shortcut: config.showShortcuts ? '\u2318C' : undefined },
        { id: 'paste', label: 'Paste', shortcut: config.showShortcuts ? '\u2318V' : undefined },
        { id: 'sep', label: '', separator: true },
        ...(config.showDanger ? [{ id: 'delete', label: 'Delete', danger: true, shortcut: config.showShortcuts ? '\u232B' : undefined }] : []),
      ]
      return (
        <div>
          <ImportLine text="import { ContextMenu } from '@goliapkg/gds'" />

          <LivePreview>
            <ContextMenu
              trigger={
                <div className="flex h-24 w-64 items-center justify-center rounded-lg border border-dashed border-border text-sm text-fg-muted">
                  Right-click here
                </div>
              }
              items={items as any}
              onSelect={() => {}}
            />
          </LivePreview>

          <DocSection title="Examples" columns={2}>
            <DemoCard title="With Shortcuts" description="Keyboard hints in menu items" code={`<ContextMenu\n  trigger={<div>Target</div>}\n  items={[\n    { id: 'copy', label: 'Copy', shortcut: '\u2318C' },\n    { id: 'paste', label: 'Paste', shortcut: '\u2318V' },\n  ]}\n  onSelect={handler}\n/>`}>
              <ContextMenu
                trigger={<div className="flex h-16 w-48 items-center justify-center rounded border border-dashed border-border text-xs text-fg-muted">Right-click</div>}
                items={[
                  { id: 'copy', label: 'Copy', shortcut: '\u2318C' },
                  { id: 'paste', label: 'Paste', shortcut: '\u2318V' },
                ]}
                onSelect={() => {}}
              />
            </DemoCard>
            <DemoCard title="Danger & Separator" description="Destructive actions with divider" code={`<ContextMenu items={[\n  { id: 'edit', label: 'Edit' },\n  { id: 'sep', label: '', separator: true },\n  { id: 'delete', label: 'Delete', danger: true },\n]} />`}>
              <ContextMenu
                trigger={<div className="flex h-16 w-48 items-center justify-center rounded border border-dashed border-border text-xs text-fg-muted">Right-click</div>}
                items={[
                  { id: 'edit', label: 'Edit' },
                  { id: 'sep', label: '', separator: true },
                  { id: 'delete', label: 'Delete', danger: true },
                ]}
                onSelect={() => {}}
              />
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="showShortcuts" type="check" value={config.showShortcuts} onChange={v => setConfig('showShortcuts', v)} />
        <Ctrl label="showDanger" type="check" value={config.showDanger} onChange={v => setConfig('showDanger', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { ContextMenu } from '@goliapkg/gds'", '']
      lines.push(`<ContextMenu`)
      lines.push(`  trigger={<div>Right-click target</div>}`)
      lines.push(`  items={[`)
      if (config.showShortcuts) {
        lines.push(`    { id: 'copy', label: 'Copy', shortcut: '\u2318C' },`)
        lines.push(`    { id: 'paste', label: 'Paste', shortcut: '\u2318V' },`)
      } else {
        lines.push(`    { id: 'copy', label: 'Copy' },`)
        lines.push(`    { id: 'paste', label: 'Paste' },`)
      }
      if (config.showDanger) {
        lines.push(`    { id: 'sep', label: '', separator: true },`)
        lines.push(`    { id: 'delete', label: 'Delete', danger: true },`)
      }
      lines.push(`  ]}`)
      lines.push(`  onSelect={(id) => handleAction(id)}`)
      lines.push(`/>`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['trigger', 'Element that receives right-click', 'ReactNode', '—'],
          ['items', 'Menu item definitions', 'ContextMenuItem[]', '—'],
          ['onSelect', 'Item click callback', '(id: string) => void', '—'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">ContextMenuItem</div>
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
            <p>• Menu appears at cursor position on right-click</p>
            <p>• Closes on click outside, Escape key, or item selection</p>
            <p>• Use separator items to group related actions</p>
            <p>• Danger items appear in red for destructive actions</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { moleculeItems }
