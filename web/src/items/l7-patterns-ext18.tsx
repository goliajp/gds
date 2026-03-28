import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt18: DevCenterItem[] = []

const dashboardLayoutItem: DevCenterItem = {
  id: 'dashboard-layout',
  label: 'DashboardLayout',
  layer: 'l7',
  type: 'interactive',
  tags: ['dashboard', 'layout', 'sidebar', 'header', 'pattern'],
  defaultConfig: { showHeader: 'true', sidebarWidth: '200' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { DashboardLayout } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="h-64 w-full max-w-2xl overflow-hidden rounded-lg border border-border">
          <div className="flex h-full bg-bg">
            <aside className="shrink-0 border-r border-border bg-surface p-3" style={{ width: Number(config.sidebarWidth) }}>
              <div className="text-xs font-medium text-fg-muted mb-2">Menu</div>
              <div className="space-y-1">
                <div className="rounded px-2 py-1 text-xs bg-accent/10 text-accent">Dashboard</div>
                <div className="rounded px-2 py-1 text-xs text-fg-muted">Settings</div>
                <div className="rounded px-2 py-1 text-xs text-fg-muted">Users</div>
              </div>
            </aside>
            <div className="flex flex-1 flex-col min-w-0">
              {config.showHeader === 'true' && (
                <header className="shrink-0 border-b border-border bg-surface/80 px-4 py-2 text-xs text-fg-muted">Header Bar</header>
              )}
              <main className="flex-1 p-4 text-sm text-fg">Main content area</main>
            </div>
          </div>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="showHeader" value={config.showHeader} options={['true', 'false']} onChange={(v) => setConfig('showHeader', v)} />
      <Ctrl type="pills" label="sidebarWidth" value={config.sidebarWidth} options={['160', '200', '280']} onChange={(v) => setConfig('sidebarWidth', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { DashboardLayout } from '@goliapkg/gds'\n\n<DashboardLayout\n  sidebar={<Nav />}\n  ${config.showHeader === 'true' ? 'header={<Header />}\n  ' : ''}sidebarWidth={${config.sidebarWidth}}\n>\n  {children}\n</DashboardLayout>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['sidebar', 'Sidebar content', 'ReactNode', '—'],
        ['header', 'Optional sticky header', 'ReactNode', '—'],
        ['children', 'Main content area', 'ReactNode', '—'],
        ['sidebarWidth', 'Sidebar width in px', 'number', '240'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt18.push(dashboardLayoutItem)

export { patternItemsExt18 }
