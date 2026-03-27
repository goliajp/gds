import { Button } from '@gds/l2-primitives'
import { PageHeader } from '@gds/l7-patterns'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt17: DevCenterItem[] = []

const pageHeaderItem: DevCenterItem = {
  id: 'page-header',
  label: 'PageHeader',
  layer: 'l7',
  type: 'interactive',
  tags: ['page', 'header', 'breadcrumb', 'title', 'pattern'],
  defaultConfig: { showBreadcrumb: 'true', showSubtitle: 'true' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { PageHeader } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-full max-w-lg">
          <PageHeader
            actions={<Button size="sm" variant="primary">Add user</Button>}
            breadcrumb={config.showBreadcrumb === 'true' ? [{ label: 'Home', href: '/' }, { label: 'Settings', href: '/settings' }, { label: 'Users' }] : undefined}
            subtitle={config.showSubtitle === 'true' ? 'Manage team members and permissions' : undefined}
            title="Users"
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="showBreadcrumb" value={config.showBreadcrumb} options={['true', 'false']} onChange={(v) => setConfig('showBreadcrumb', v)} />
      <Ctrl type="pills" label="showSubtitle" value={config.showSubtitle} options={['true', 'false']} onChange={(v) => setConfig('showSubtitle', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { PageHeader } from '@goliapkg/gds'\n\n<PageHeader\n  title="Users"\n  ${config.showSubtitle === 'true' ? 'subtitle="Manage team members"\n  ' : ''}${config.showBreadcrumb === 'true' ? 'breadcrumb={[{ label: "Home", href: "/" }, { label: "Users" }]}\n  ' : ''}actions={<Button>Add user</Button>}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['title', 'Page title', 'string', '—'],
        ['subtitle', 'Optional subtitle text', 'string', '—'],
        ['breadcrumb', 'Breadcrumb trail items', '{ label: string, href?: string }[]', '—'],
        ['actions', 'Action buttons slot', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt17.push(pageHeaderItem)

export { patternItemsExt17 }
