import { AdminLayout } from '@gds/l7-patterns'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt23: DevCenterItem[] = []

const adminLayoutItem: DevCenterItem = {
  id: 'admin-layout',
  label: 'AdminLayout',
  layer: 'l7',
  type: 'interactive',
  tags: ['admin', 'layout', 'sidebar', 'topbar', 'pattern'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { AdminLayout } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="h-64 border border-border rounded-lg overflow-hidden">
          <AdminLayout
            sidebar={
              <div className="p-3">
                <div className="text-xs font-bold text-fg mb-2">Menu</div>
                <div className="text-xs text-fg-muted">Dashboard</div>
                <div className="text-xs text-fg-muted">Settings</div>
              </div>
            }
            topbar={<div className="px-4 py-2 text-xs font-medium text-fg">Top Bar</div>}
            sidebarWidth={120}
          >
            <div className="p-4 text-xs text-fg-muted">Main content area</div>
          </AdminLayout>
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { AdminLayout } from '@goliapkg/gds'\n\n<AdminLayout\n  sidebar={<SideNav />}\n  topbar={<TopBar />}\n>\n  {children}\n</AdminLayout>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['sidebar', 'Sidebar content (navigation)', 'ReactNode', '—'],
        ['topbar', 'Top bar content', 'ReactNode', '—'],
        ['children', 'Main content area', 'ReactNode', '—'],
        ['sidebarWidth', 'Sidebar width in pixels', 'number', '240'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt23.push(adminLayoutItem)

export { patternItemsExt23 }
