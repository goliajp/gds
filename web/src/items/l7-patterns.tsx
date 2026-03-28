import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button, Input, Label } from '@gds/l2-primitives'
import { EmptyState, FormLayout, GlassPanel, MetricCard, MiniDashboard, StatGrid } from '@gds/l7-patterns'

import type { DevCenterItem } from '../types'

const patternItems: DevCenterItem[] = [
  {
    id: 'metric-card',
    label: 'MetricCard',
    layer: 'l7',
    type: 'interactive',
    tags: ['kpi', 'metric', 'stat'],
    defaultConfig: { title: 'Revenue', value: '$12.4k', change: 12.5, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { MetricCard } from '@goliapkg/gds'" />
        <LivePreview>
          <MetricCard title={config.title} value={config.value} change={config.change} glass={config.glass} />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Positive trend" description="Green change indicator" code={`<MetricCard title="Revenue" value="$12.4k" change={12.5} />`}>
            <MetricCard title="Revenue" value="$12.4k" change={12.5} />
          </DemoCard>
          <DemoCard title="Negative trend" description="Red change indicator" code={`<MetricCard title="Users" value="1,240" change={-3.2} />`}>
            <MetricCard title="Users" value="1,240" change={-3.2} />
          </DemoCard>
          <DemoCard title="Glass variant" description="Frosted glass surface" code={`<MetricCard title="Orders" value="384" glass />`}>
            <div className="rounded-lg bg-gradient-to-br from-accent/20 to-success/10 p-3">
              <MetricCard title="Orders" value="384" glass />
            </div>
          </DemoCard>
          <DemoCard title="Grid of metrics" description="3-column dashboard layout" code={`<div className="grid grid-cols-3 gap-4">\n  <MetricCard title="CPU" value="42%" />\n</div>`}>
            <div className="grid grid-cols-3 gap-3">
              <MetricCard title="CPU" value="42%" />
              <MetricCard title="Memory" value="68%" />
              <MetricCard title="Disk" value="23%" />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="title" type="text" value={config.title} onChange={v => setConfig('title', v)} />
        <Ctrl label="value" type="text" value={config.value} onChange={v => setConfig('value', v)} />
        <Ctrl label="change" type="number" value={config.change} min={-100} max={100} onChange={v => setConfig('change', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const props = [`title="${config.title}"`, `value="${config.value}"`]
      if (config.change !== 0) props.push(`change={${config.change}}`)
      if (config.glass === true) props.push('glass')
      return `import { MetricCard } from '@goliapkg/gds'\n\n<MetricCard\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['title', 'Metric label', 'string', '—'],
          ['value', 'Display value', 'string | number', '—'],
          ['change', 'Percentage change', 'number', '—'],
          ['changeLabel', 'Change suffix text', 'string', '—'],
          ['icon', 'Top-right icon element', 'ReactNode', '—'],
          ['glass', 'Glass morphism style', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use in grids of 2-4 for dashboard KPI sections</p>
            <p>• Positive change shows green, negative shows red</p>
            <p>• Pair with StatGrid for responsive column layout</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'stat-grid',
    label: 'StatGrid',
    layer: 'l7',
    type: 'interactive',
    tags: ['grid', 'dashboard', 'layout'],
    defaultConfig: { columns: 3, glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { StatGrid, MetricCard } from '@goliapkg/gds'" />
        <LivePreview className="block">
          <StatGrid columns={config.columns}>
            <MetricCard title="CPU" value="42%" glass={config.glass} />
            <MetricCard title="Memory" value="68%" glass={config.glass} />
            <MetricCard title="Disk" value="23%" glass={config.glass} />
            {config.columns >= 4 && <MetricCard title="Network" value="1.2Gbps" glass={config.glass} />}
          </StatGrid>
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="2-column" description="Compact side-by-side" code={`<StatGrid columns={2}>\n  <MetricCard title="Users" value="1.2k" />\n  <MetricCard title="Revenue" value="$45k" />\n</StatGrid>`}>
            <StatGrid columns={2}>
              <MetricCard title="Users" value="1.2k" />
              <MetricCard title="Revenue" value="$45k" />
            </StatGrid>
          </DemoCard>
          <DemoCard title="Glass cards" description="Glass variant in grid" code={`<StatGrid columns={3}>\n  <MetricCard title="CPU" value="42%" glass />\n</StatGrid>`}>
            <div className="rounded-lg bg-gradient-to-br from-accent/20 to-success/10 p-3">
              <StatGrid columns={3}>
                <MetricCard title="CPU" value="42%" glass />
                <MetricCard title="Memory" value="68%" glass />
                <MetricCard title="Disk" value="23%" glass />
              </StatGrid>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="columns" type="pills" value={String(config.columns)} options={['2', '3', '4']} onChange={v => setConfig('columns', Number(v))} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const cols = config.columns !== 3 ? ` columns={${config.columns}}` : ''
      const glass = config.glass === true ? ' glass' : ''
      return `import { StatGrid, MetricCard } from '@goliapkg/gds'\n\n<StatGrid${cols}>\n  <MetricCard title="CPU" value="42%"${glass} />\n  <MetricCard title="Memory" value="68%"${glass} />\n  <MetricCard title="Disk" value="23%"${glass} />\n</StatGrid>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['children', 'Metric cards or stat widgets', 'ReactNode', '—'],
          ['columns', 'Grid column count', '2 | 3 | 4', '3'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Wrapper for MetricCard grids with depth-aware gap</p>
            <p>• Uses CSS grid — children auto-fill columns</p>
            <p>• Prefer 3 columns for dashboard sections</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'empty-state',
    label: 'EmptyState',
    layer: 'l7',
    type: 'interactive',
    tags: ['placeholder', 'empty', 'no-data'],
    defaultConfig: { title: 'No results found', description: 'Try adjusting your search or filters', showAction: true },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { EmptyState } from '@goliapkg/gds'" />
        <LivePreview>
          <EmptyState
            title={config.title}
            description={config.description}
            action={config.showAction === true ? <Button variant="secondary" size="sm">Clear Filters</Button> : undefined}
          />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="With action" description="Call-to-action button" code={`<EmptyState\n  title="No results"\n  description="Try a different search"\n  action={<Button>Clear</Button>}\n/>`}>
            <EmptyState title="No results" description="Try a different search" action={<Button variant="secondary" size="sm">Clear</Button>} />
          </DemoCard>
          <DemoCard title="Minimal" description="Title only, no description" code={`<EmptyState title="Nothing here yet" />`}>
            <EmptyState title="Nothing here yet" />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="title" type="text" value={config.title} onChange={v => setConfig('title', v)} />
        <Ctrl label="description" type="text" value={config.description} onChange={v => setConfig('description', v)} />
        <Ctrl label="showAction" type="check" value={config.showAction} onChange={v => setConfig('showAction', v)} />
      </>
    ),

    code: ({ config }) => {
      const props = [`title="${config.title}"`]
      if (config.description !== '') props.push(`description="${config.description}"`)
      if (config.showAction === true) props.push(`action={<Button>Clear Filters</Button>}`)
      return `import { EmptyState } from '@goliapkg/gds'\n\n<EmptyState\n  ${props.join('\n  ')}\n/>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['title', 'Main message', 'string', '—'],
          ['description', 'Supporting text', 'string', '—'],
          ['icon', 'Illustration or icon', 'ReactNode', '—'],
          ['action', 'CTA button element', 'ReactNode', '—'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use when a list, table, or section has zero items</p>
            <p>• Always provide a title — description and action are optional</p>
            <p>• Centered layout with vertical padding for visual breathing room</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'form-layout',
    label: 'FormLayout',
    layer: 'l7',
    type: 'interactive',
    tags: ['form', 'layout', 'container', 'actions'],
    defaultConfig: { title: 'Account Settings', description: 'Update your profile information', showActions: true },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { FormLayout } from '@goliapkg/gds'" />
        <LivePreview className="block">
          <FormLayout
            title={config.title}
            description={config.description}
            actions={config.showActions === true ? (
              <>
                <Button variant="secondary" size="sm">Cancel</Button>
                <Button size="sm">Save</Button>
              </>
            ) : undefined}
          >
            <div className="flex flex-col gap-3 max-w-sm">
              <div>
                <Label>Name</Label>
                <Input placeholder="Enter name" className="mt-1" />
              </div>
              <div>
                <Label>Email</Label>
                <Input placeholder="you@example.com" className="mt-1" />
              </div>
            </div>
          </FormLayout>
        </LivePreview>
        <DocSection title="Examples" columns={1}>
          <DemoCard title="Full form" description="Header, body, and action footer" code={`<FormLayout\n  title="Settings"\n  description="Update your profile"\n  actions={<><Button variant="secondary">Cancel</Button><Button>Save</Button></>}\n>\n  {children}\n</FormLayout>`}>
            <FormLayout
              title="Notification Preferences"
              description="Choose how you receive updates"
              actions={<><Button variant="secondary" size="sm">Reset</Button><Button size="sm">Apply</Button></>}
            >
              <div className="flex flex-col gap-2 max-w-xs">
                <Label>Email frequency</Label>
                <Input placeholder="Daily" className="mt-0.5" />
              </div>
            </FormLayout>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="title" type="text" value={config.title} onChange={v => setConfig('title', v)} />
        <Ctrl label="description" type="text" value={config.description} onChange={v => setConfig('description', v)} />
        <Ctrl label="showActions" type="check" value={config.showActions} onChange={v => setConfig('showActions', v)} />
      </>
    ),

    code: ({ config }) => {
      const props: string[] = []
      if (config.title !== '') props.push(`title="${config.title}"`)
      if (config.description !== '') props.push(`description="${config.description}"`)
      if (config.showActions === true) props.push(`actions={<><Button variant="secondary">Cancel</Button><Button>Save</Button></>}`)
      return `import { FormLayout } from '@goliapkg/gds'\n\n<FormLayout\n  ${props.join('\n  ')}\n>\n  {children}\n</FormLayout>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['title', 'Form header title', 'string', '—'],
          ['description', 'Header subtitle text', 'string', '—'],
          ['children', 'Form body content', 'ReactNode', '—'],
          ['actions', 'Footer action buttons', 'ReactNode', '—'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Standard form structure: header + body + footer actions</p>
            <p>• Actions right-aligned with depth-aware gap</p>
            <p>• Use with Input, Label, Select for consistent forms</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'glass-panel',
    label: 'GlassPanel',
    layer: 'l7',
    type: 'interactive',
    tags: ['glass', 'frosted', 'panel', 'translucent'],
    defaultConfig: { blur: 'default', padding: 'default' },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { GlassPanel } from '@goliapkg/gds'" />
        <LivePreview>
          <div className="relative h-48 w-full rounded-xl bg-gradient-to-br from-accent/30 via-success/20 to-warning/10 p-4">
            <GlassPanel blur={config.blur} padding={config.padding}>
              <div className="text-sm font-medium text-fg">Glass Panel</div>
              <p className="mt-1 text-xs text-fg-muted">Translucent container with configurable blur intensity.</p>
            </GlassPanel>
          </div>
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Blur levels" description="sm / default / lg intensity" code={`<GlassPanel blur="sm">...</GlassPanel>\n<GlassPanel blur="lg">...</GlassPanel>`}>
            <div className="flex gap-3 rounded-lg bg-gradient-to-br from-accent/20 to-success/10 p-3">
              <GlassPanel blur="sm" padding="sm"><span className="text-[10px] text-fg">sm</span></GlassPanel>
              <GlassPanel blur="default" padding="sm"><span className="text-[10px] text-fg">default</span></GlassPanel>
              <GlassPanel blur="lg" padding="sm"><span className="text-[10px] text-fg">lg</span></GlassPanel>
            </div>
          </DemoCard>
          <DemoCard title="Padding options" description="none / sm / default / lg" code={`<GlassPanel padding="none">...</GlassPanel>\n<GlassPanel padding="lg">...</GlassPanel>`}>
            <div className="flex flex-col gap-2 rounded-lg bg-gradient-to-br from-warning/20 to-danger/10 p-3">
              <GlassPanel padding="none"><span className="text-[10px] text-fg">none</span></GlassPanel>
              <GlassPanel padding="sm"><span className="text-[10px] text-fg">sm</span></GlassPanel>
              <GlassPanel padding="lg"><span className="text-[10px] text-fg">lg</span></GlassPanel>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="blur" type="pills" value={config.blur} options={['sm', 'default', 'lg']} onChange={v => setConfig('blur', v)} />
        <Ctrl label="padding" type="pills" value={config.padding} options={['none', 'sm', 'default', 'lg']} onChange={v => setConfig('padding', v)} />
      </>
    ),

    code: ({ config }) => {
      const props: string[] = []
      if (config.blur !== 'default') props.push(`blur="${config.blur}"`)
      if (config.padding !== 'default') props.push(`padding="${config.padding}"`)
      const propsStr = props.length > 0 ? ` ${props.join(' ')}` : ''
      return `import { GlassPanel } from '@goliapkg/gds'\n\n<GlassPanel${propsStr}>\n  <h3>Title</h3>\n  <p>Content with frosted glass background</p>\n</GlassPanel>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['children', 'Panel content', 'ReactNode', '—'],
          ['blur', 'Glass blur intensity', "'sm' | 'default' | 'lg'", "'default'"],
          ['padding', 'Inner padding size', "'none' | 'sm' | 'default' | 'lg'", "'default'"],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Place over colorful/busy backgrounds for frosted effect</p>
            <p>• Uses backdrop-filter — falls back to solid bg on unsupported browsers</p>
            <p>• Adds gds-ctx for depth-aware nesting</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'mini-dashboard',
    label: 'MiniDashboard',
    layer: 'l7',
    type: 'interactive',
    tags: ['dashboard', 'section', 'container', 'metrics'],
    defaultConfig: { title: 'System Overview', glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { MiniDashboard, MetricCard } from '@goliapkg/gds'" />
        <LivePreview className="block">
          <MiniDashboard title={config.title} glass={config.glass}>
            <div className="grid grid-cols-3 gap-3">
              <MetricCard title="CPU" value="42%" />
              <MetricCard title="Memory" value="68%" />
              <MetricCard title="Disk" value="23%" />
            </div>
          </MiniDashboard>
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Standard" description="Bordered section container" code={`<MiniDashboard title="Overview">\n  {children}\n</MiniDashboard>`}>
            <MiniDashboard title="Network">
              <div className="grid grid-cols-2 gap-2">
                <MetricCard title="In" value="1.2GB/s" />
                <MetricCard title="Out" value="800MB/s" />
              </div>
            </MiniDashboard>
          </DemoCard>
          <DemoCard title="Glass variant" description="Translucent container" code={`<MiniDashboard title="Overview" glass>\n  {children}\n</MiniDashboard>`}>
            <div className="rounded-lg bg-gradient-to-br from-accent/20 to-success/10 p-2">
              <MiniDashboard title="Metrics" glass>
                <div className="grid grid-cols-2 gap-2">
                  <MetricCard title="Requests" value="1.2k/s" change={8.3} />
                  <MetricCard title="Latency" value="42ms" change={-2.1} />
                </div>
              </MiniDashboard>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="title" type="text" value={config.title} onChange={v => setConfig('title', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const props: string[] = []
      if (config.title !== '') props.push(`title="${config.title}"`)
      if (config.glass === true) props.push('glass')
      const propsStr = props.length > 0 ? ` ${props.join(' ')}` : ''
      return `import { MiniDashboard } from '@goliapkg/gds'\n\n<MiniDashboard${propsStr}>\n  {children}\n</MiniDashboard>`
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['title', 'Section header text', 'string', '—'],
          ['children', 'Dashboard content', 'ReactNode', '—'],
          ['glass', 'Glass morphism style', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Section-level container for dashboard widgets</p>
            <p>• Adds gds-ctx for depth-aware child scaling</p>
            <p>• Combine with StatGrid and MetricCard for complete dashboards</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { patternItems }
