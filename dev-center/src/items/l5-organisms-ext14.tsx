import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { DescriptionList, ErrorBoundary } from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

const organismItemsExt14: DevCenterItem[] = []

const sampleItems = [
  { term: 'Full Name', description: 'Alice Johnson' },
  { term: 'Email', description: 'alice@example.com' },
  { term: 'Role', description: 'Senior Engineer' },
  { term: 'Department', description: 'Platform' },
]

const descriptionListItem: DevCenterItem = {
  id: 'description-list',
  label: 'DescriptionList',
  layer: 'l5',
  type: 'interactive',
  tags: ['description', 'list', 'definition', 'key-value', 'detail', 'organism'],
  variants: ['stacked', 'horizontal'],
  defaultConfig: { dividers: true },

  stage: ({ config, variant }) => (
    <div>
      <ImportLine text="import { DescriptionList } from '@golia/gds'" />
      <LivePreview>
        <div className="w-96">
          <DescriptionList
            items={sampleItems}
            layout={variant as 'stacked' | 'horizontal'}
            dividers={config.dividers}
          />
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['items', '{ term: string, description: ReactNode }[]', '—', 'Term-description pairs'],
          ['layout', "'stacked' | 'horizontal'", "'stacked'", 'Layout direction'],
          ['dividers', 'boolean', 'true', 'Show divider lines between items'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig, variant, setVariant }) => (
    <>
      <Ctrl type="select" label="layout" value={variant} options={['stacked', 'horizontal']} onChange={setVariant} />
      <Ctrl type="check" label="dividers" value={config.dividers} onChange={(v) => setConfig('dividers', v)} />
    </>
  ),

  code: ({ config, variant }) =>
    `import { DescriptionList } from '@golia/gds'\n\n<DescriptionList\n  items={[\n    { term: 'Name', description: 'Alice' },\n    { term: 'Role', description: 'Engineer' },\n  ]}${variant !== 'stacked' ? `\n  layout="${variant}"` : ''}${config.dividers === false ? '\n  dividers={false}' : ''}\n/>`,
}
organismItemsExt14.push(descriptionListItem)

function BrokenChild() {
  throw new Error('Something broke!')
}

const errorBoundaryItem: DevCenterItem = {
  id: 'error-boundary',
  label: 'ErrorBoundary',
  layer: 'l5',
  type: 'interactive',
  tags: ['error', 'boundary', 'fallback', 'catch', 'organism'],
  defaultConfig: { triggerError: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ErrorBoundary } from '@golia/gds'" />
      <LivePreview>
        <div className="w-80">
          <ErrorBoundary>
            {config.triggerError ? <BrokenChild /> : <p className="gds-text-body text-fg gds-pad">Content renders normally</p>}
          </ErrorBoundary>
        </div>
      </LivePreview>

      <DocSection title="Usage">
        <p className="gds-text-body text-fg-muted">
          Wrap any component tree to catch render errors. Provides a default styled fallback or accepts a custom fallback element/function.
        </p>
      </DocSection>

      <DocSection title="API">
        <DocTable rows={[
          ['children', 'ReactNode', '—', 'Content to render'],
          ['fallback', 'ReactNode | (error: Error) => ReactNode', '—', 'Custom error UI'],
          ['onError', '(error: Error, info: ErrorInfo) => void', '—', 'Error callback for logging'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="triggerError" value={config.triggerError} onChange={(v) => setConfig('triggerError', v)} />
    </>
  ),

  code: () =>
    `import { ErrorBoundary } from '@golia/gds'\n\n<ErrorBoundary\n  fallback={<p>Something went wrong</p>}\n  onError={(error) => console.error(error)}\n>\n  <MyComponent />\n</ErrorBoundary>`,
}
organismItemsExt14.push(errorBoundaryItem)

export { organismItemsExt14 }
