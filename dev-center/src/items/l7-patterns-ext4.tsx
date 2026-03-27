import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button, Input, Label } from '@gds/l2-primitives'
import { CompositionPattern, FormPattern, LoadingStates } from '@gds/l7-patterns'

import type { DevCenterItem } from '../types'

const patternItemsExt4: DevCenterItem[] = []

// loading-states
const loadingStatesItem: DevCenterItem = {
  id: 'loading-states',
  label: 'LoadingStates',
  layer: 'l7',
  type: 'interactive',
  tags: ['loading', 'spinner', 'overlay', 'button', 'pattern'],
  defaultConfig: { variant: 'page', message: 'Loading...', glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { LoadingStates } from '@golia/gds'" />
      <LivePreview className="block">
        <div className="relative min-h-[160px] w-full">
          <LoadingStates variant={config.variant} message={config.message} glass={config.glass} />
        </div>
      </LivePreview>
      <DocSection title="Variants" columns={2}>
        <DemoCard title="Page" description="Full-height centered spinner" code={`<LoadingStates variant="page" message="Loading..." />`}>
          <div className="min-h-[120px]">
            <LoadingStates variant="page" message="Loading..." />
          </div>
        </DemoCard>
        <DemoCard title="Inline" description="Horizontal spinner + text" code={`<LoadingStates variant="inline" message="Fetching data" />`}>
          <LoadingStates variant="inline" message="Fetching data" />
        </DemoCard>
        <DemoCard title="Button" description="Disabled button with spinner" code={`<LoadingStates variant="button" message="Saving..." />`}>
          <LoadingStates variant="button" message="Saving..." />
        </DemoCard>
        <DemoCard title="Overlay" description="Semi-transparent overlay" code={`<LoadingStates variant="overlay" message="Processing" />`}>
          <div className="relative h-[120px] rounded-lg border border-border p-4">
            <p className="text-xs text-fg-muted">Background content</p>
            <LoadingStates variant="overlay" message="Processing" />
          </div>
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="select" label="variant" value={config.variant} options={['page', 'inline', 'button', 'overlay']} onChange={(v) => setConfig('variant', v)} />
      <Ctrl type="text" label="message" value={config.message} onChange={(v) => setConfig('message', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const props = [`variant="${config.variant}"`]
    if (config.message !== '') props.push(`message="${config.message}"`)
    if (config.glass === true) props.push('glass')
    return `import { LoadingStates } from '@golia/gds'\n\n<LoadingStates\n  ${props.join('\n  ')}\n/>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['variant', 'Loading pattern type', "'page' | 'inline' | 'button' | 'overlay'", '—'],
        ['message', 'Optional text label', 'string', '—'],
        ['glass', 'Glass material for page/overlay', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt4.push(loadingStatesItem)

// composition-pattern
const compositionPatternItem: DevCenterItem = {
  id: 'composition-pattern',
  label: 'CompositionPattern',
  layer: 'l7',
  type: 'interactive',
  tags: ['layout', 'sidebar', 'header', 'footer', 'composition', 'pattern'],
  defaultConfig: { sidebarPosition: 'left', sidebarWidth: 200, showHeader: true, showFooter: true },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CompositionPattern } from '@golia/gds'" />
      <LivePreview className="block">
        <div className="h-[300px] w-full overflow-hidden rounded-lg border border-border">
          <CompositionPattern
            header={config.showHeader === true ? <div className="px-4 py-2 text-xs font-medium text-fg">Header</div> : undefined}
            sidebar={<div className="p-3 text-xs text-fg-muted">Sidebar nav</div>}
            content={<div className="p-4 text-xs text-fg-muted">Main content area</div>}
            footer={config.showFooter === true ? <div className="px-4 py-2 text-xs text-fg-muted">Footer</div> : undefined}
            sidebarPosition={config.sidebarPosition}
            sidebarWidth={config.sidebarWidth}
          />
        </div>
      </LivePreview>
      <DocSection title="Variations" columns={2}>
        <DemoCard title="Left sidebar" description="Default layout" code={`<CompositionPattern\n  sidebar={<Nav />}\n  content={<Main />}\n/>`}>
          <div className="h-[160px] overflow-hidden rounded-lg border border-border">
            <CompositionPattern
              sidebar={<div className="p-2 text-[10px] text-fg-muted">Nav</div>}
              content={<div className="p-2 text-[10px] text-fg-muted">Content</div>}
              sidebarWidth={100}
            />
          </div>
        </DemoCard>
        <DemoCard title="Right sidebar" description="Inspector pattern" code={`<CompositionPattern\n  sidebar={<Inspector />}\n  content={<Canvas />}\n  sidebarPosition="right"\n/>`}>
          <div className="h-[160px] overflow-hidden rounded-lg border border-border">
            <CompositionPattern
              sidebar={<div className="p-2 text-[10px] text-fg-muted">Inspector</div>}
              content={<div className="p-2 text-[10px] text-fg-muted">Canvas</div>}
              sidebarPosition="right"
              sidebarWidth={100}
            />
          </div>
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="sidebarPosition" value={config.sidebarPosition} options={['left', 'right']} onChange={(v) => setConfig('sidebarPosition', v)} />
      <Ctrl type="number" label="sidebarWidth" value={config.sidebarWidth} min={100} max={400} onChange={(v) => setConfig('sidebarWidth', v)} />
      <Ctrl type="check" label="showHeader" value={config.showHeader} onChange={(v) => setConfig('showHeader', v)} />
      <Ctrl type="check" label="showFooter" value={config.showFooter} onChange={(v) => setConfig('showFooter', v)} />
    </>
  ),

  code: ({ config }) => {
    const props: string[] = []
    if (config.showHeader === true) props.push('header={<Header />}')
    props.push('sidebar={<Sidebar />}')
    props.push('content={<Main />}')
    if (config.showFooter === true) props.push('footer={<Footer />}')
    if (config.sidebarPosition !== 'left') props.push(`sidebarPosition="${config.sidebarPosition}"`)
    if (config.sidebarWidth !== 240) props.push(`sidebarWidth={${config.sidebarWidth}}`)
    return `import { CompositionPattern } from '@golia/gds'\n\n<CompositionPattern\n  ${props.join('\n  ')}\n/>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['header', 'Top bar content', 'ReactNode', '—'],
        ['sidebar', 'Side panel content', 'ReactNode', '—'],
        ['content', 'Main content area', 'ReactNode', '—'],
        ['footer', 'Bottom bar content', 'ReactNode', '—'],
        ['sidebarPosition', 'Sidebar placement', "'left' | 'right'", "'left'"],
        ['sidebarWidth', 'Sidebar width (px or string)', 'number | string', '240'],
        ['glass', 'Glass material', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt4.push(compositionPatternItem)

// form-pattern
const formPatternItem: DevCenterItem = {
  id: 'form-pattern',
  label: 'FormPattern',
  layer: 'l7',
  type: 'interactive',
  tags: ['form', 'sections', 'validation', 'pattern', 'actions'],
  defaultConfig: { title: 'Account Settings', description: 'Manage your profile', showActions: true },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { FormPattern } from '@golia/gds'" />
      <LivePreview className="block">
        <FormPattern
          title={config.title}
          description={config.description}
          sections={[
            {
              title: 'Personal Info',
              fields: (
                <div className="flex flex-col gap-2 max-w-sm">
                  <div><Label>Name</Label><Input placeholder="John Doe" className="mt-1" /></div>
                  <div><Label>Email</Label><Input placeholder="john@example.com" className="mt-1" /></div>
                </div>
              ),
            },
            {
              title: 'Preferences',
              fields: (
                <div className="flex flex-col gap-2 max-w-sm">
                  <div><Label>Language</Label><Input placeholder="English" className="mt-1" /></div>
                </div>
              ),
            },
          ]}
          actions={config.showActions === true ? (
            <>
              <Button variant="secondary" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </>
          ) : undefined}
        />
      </LivePreview>
      <DocSection title="Examples" columns={1}>
        <DemoCard title="Multi-section form" description="Sections separated by dividers" code={`<FormPattern\n  title="Settings"\n  sections={[\n    { title: 'Profile', fields: <Fields /> },\n    { title: 'Security', fields: <Fields /> },\n  ]}\n  actions={<Button>Save</Button>}\n/>`}>
          <FormPattern
            title="Notification Settings"
            sections={[
              { title: 'Email', fields: <div className="max-w-xs"><Label>Frequency</Label><Input placeholder="Daily" className="mt-1" /></div> },
              { title: 'Push', fields: <div className="max-w-xs"><Label>Enabled</Label><Input placeholder="Yes" className="mt-1" /></div> },
            ]}
            actions={<Button size="sm">Apply</Button>}
          />
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="title" value={config.title} onChange={(v) => setConfig('title', v)} />
      <Ctrl type="text" label="description" value={config.description} onChange={(v) => setConfig('description', v)} />
      <Ctrl type="check" label="showActions" value={config.showActions} onChange={(v) => setConfig('showActions', v)} />
    </>
  ),

  code: ({ config }) => {
    const props: string[] = []
    if (config.title !== '') props.push(`title="${config.title}"`)
    if (config.description !== '') props.push(`description="${config.description}"`)
    props.push('sections={[\n    { title: \'Section 1\', fields: <Fields /> },\n  ]}')
    if (config.showActions === true) props.push('actions={<><Button variant="secondary">Cancel</Button><Button>Save</Button></>}')
    return `import { FormPattern } from '@golia/gds'\n\n<FormPattern\n  ${props.join('\n  ')}\n/>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['title', 'Form title heading', 'string', '—'],
        ['description', 'Subtitle text', 'string', '—'],
        ['sections', 'Array of form sections', '{ title: string, fields: ReactNode }[]', '—'],
        ['actions', 'Action bar (submit/cancel)', 'ReactNode', '—'],
        ['glass', 'Glass material', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt4.push(formPatternItem)

export { patternItemsExt4 }
