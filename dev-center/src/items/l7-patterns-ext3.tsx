import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { ResponsiveContainer, SkeletonPattern } from '@gds/l7-patterns'

import type { DevCenterItem } from '../types'

const patternItemsExt3: DevCenterItem[] = []

// skeleton-pattern
const skeletonPatternItem: DevCenterItem = {
  id: 'skeleton-pattern',
  label: 'SkeletonPattern',
  layer: 'l7',
  type: 'interactive',
  tags: ['skeleton', 'loading', 'placeholder', 'shimmer', 'pattern'],
  defaultConfig: { variant: 'card', count: 3, glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { SkeletonPattern } from '@goliapkg/gds'" />
      <LivePreview className="block">
        <SkeletonPattern variant={config.variant} count={config.count} glass={config.glass} />
      </LivePreview>
      <DocSection title="API">
        <DocTable
          rows={[
            ['variant', "'card' | 'list' | 'profile' | 'table'", '—', 'Loading pattern layout'],
            ['count', 'number', '1', 'Repeat count for list/table rows'],
            ['glass', 'boolean', 'false', 'Glass material background'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl
        type="select"
        label="variant"
        value={config.variant}
        options={['card', 'list', 'profile', 'table']}
        onChange={(v) => setConfig('variant', v)}
      />
      <Ctrl type="number" label="count" value={config.count} min={1} max={10} onChange={(v) => setConfig('count', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { SkeletonPattern } from '@goliapkg/gds'"]
    lines.push('')
    lines.push(`<SkeletonPattern variant="${config.variant}" count={${config.count}}${config.glass ? ' glass' : ''} />`)
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['variant', 'Loading pattern layout', "'card' | 'list' | 'profile' | 'table'", '—'],
        ['count', 'Repeat count for list/table rows', 'number', '1'],
        ['glass', 'Glass material background', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt3.push(skeletonPatternItem)

// responsive-container
const responsiveContainerItem: DevCenterItem = {
  id: 'responsive-container',
  label: 'ResponsiveContainer',
  layer: 'l7',
  type: 'interactive',
  tags: ['responsive', 'container', 'mobile', 'tablet', 'desktop', 'breakpoint'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { ResponsiveContainer } from '@goliapkg/gds'" />
      <LivePreview className="block">
        <ResponsiveContainer
          mobile={
            <div className="rounded-lg border border-border bg-white/5 p-4 text-center text-sm text-fg-muted">
              Mobile view — resize window below 640px
            </div>
          }
          tablet={
            <div className="rounded-lg border border-border bg-white/5 p-4 text-center text-sm text-fg-muted">
              Tablet view — window between 640px and 1024px
            </div>
          }
          desktop={
            <div className="rounded-lg border border-border bg-white/5 p-4 text-center text-sm text-fg-muted">
              Desktop view — window above 1024px
            </div>
          }
        />
      </LivePreview>
      <DocSection title="API">
        <DocTable
          rows={[
            ['mobile', 'ReactNode', '—', 'Content shown below sm breakpoint'],
            ['tablet', 'ReactNode', '—', 'Content shown between sm and lg (falls back to mobile)'],
            ['desktop', 'ReactNode', '—', 'Content shown above lg breakpoint'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),
  code: () => {
    const lines = ["import { ResponsiveContainer } from '@goliapkg/gds'"]
    lines.push('')
    lines.push('<ResponsiveContainer')
    lines.push('  mobile={<MobileView />}')
    lines.push('  tablet={<TabletView />}')
    lines.push('  desktop={<DesktopView />}')
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['mobile', 'Content shown below sm breakpoint', 'ReactNode', '—'],
        ['tablet', 'Content shown between sm and lg', 'ReactNode', 'falls back to mobile'],
        ['desktop', 'Content shown above lg breakpoint', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt3.push(responsiveContainerItem)

export { patternItemsExt3 }
