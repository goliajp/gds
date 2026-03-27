import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button } from '@gds/l2-primitives'
import { StatusPage } from '@gds/l7-patterns'

import type { DevCenterItem } from '../types'

const patternItemsExt10: DevCenterItem[] = []

const statusPageItem: DevCenterItem = {
  id: 'status-page',
  label: 'StatusPage',
  layer: 'l7',
  type: 'interactive',
  tags: ['status', 'error', '404', '500', 'maintenance', 'page', 'pattern'],
  defaultConfig: { code: '404', title: 'Page Not Found', description: 'The page you are looking for does not exist.' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { StatusPage } from '@goliapkg/gds'" />
      <LivePreview className="block">
        <div className="rounded-lg border border-white/[0.04]">
          <StatusPage
            code={config.code}
            title={config.title}
            description={config.description}
            action={<Button variant="primary" size="sm">Go Home</Button>}
            secondaryAction={<Button variant="secondary" size="sm">Go Back</Button>}
          />
        </div>
      </LivePreview>

      <DocSection title="Examples" columns={2}>
        <div className="rounded-lg border border-white/[0.04] p-4">
          <StatusPage code={500} title="Server Error" description="An unexpected error occurred." action={<Button size="sm">Retry</Button>} />
        </div>
        <div className="rounded-lg border border-white/[0.04] p-4">
          <StatusPage title="Under Maintenance" description="We'll be back shortly." />
        </div>
      </DocSection>

      <DocSection title="API">
        <DocTable rows={[
          ['code', 'string | number', '—', 'Error code displayed large (e.g. 404, 500)'],
          ['title', 'string', '—', 'Main heading'],
          ['description', 'string', '—', 'Explanatory text below title'],
          ['action', 'ReactNode', '—', 'Primary action button'],
          ['secondaryAction', 'ReactNode', '—', 'Secondary action button'],
          ['illustration', 'ReactNode', '—', 'Custom illustration above code'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="code" value={config.code} onChange={(v) => setConfig('code', v)} />
      <Ctrl type="text" label="title" value={config.title} onChange={(v) => setConfig('title', v)} />
      <Ctrl type="text" label="description" value={config.description} onChange={(v) => setConfig('description', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { StatusPage } from '@goliapkg/gds'\n\n<StatusPage\n  code="${config.code}"\n  title="${config.title}"\n  description="${config.description}"\n  action={<Button>Go Home</Button>}\n/>`,
}
patternItemsExt10.push(statusPageItem)

export { patternItemsExt10 }
