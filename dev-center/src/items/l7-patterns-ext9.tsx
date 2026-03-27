import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { StickyHeader } from '@gds/l7-patterns'

import type { DevCenterItem } from '../types'

const patternItemsExt9: DevCenterItem[] = []

const stickyHeaderItem: DevCenterItem = {
  id: 'sticky-header',
  label: 'StickyHeader',
  layer: 'l7',
  type: 'interactive',
  tags: ['sticky', 'header', 'scroll', 'navigation', 'glass', 'pattern'],
  defaultConfig: { glass: true, threshold: 0 },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { StickyHeader } from '@golia/gds'" />
      <LivePreview className="block">
        <div className="relative h-48 overflow-y-auto rounded-lg border border-white/[0.04]">
          <StickyHeader glass={config.glass} threshold={config.threshold}>
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-xs font-medium text-fg">Page Header</span>
              <span className="text-[10px] text-fg-muted">scroll down</span>
            </div>
          </StickyHeader>
          <div className="space-y-4 p-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="rounded bg-white/[0.03] p-3 text-xs text-fg-muted">
                Content block {i + 1}
              </div>
            ))}
          </div>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
      <Ctrl type="number" label="threshold" value={config.threshold} min={0} max={200} onChange={(v) => setConfig('threshold', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { StickyHeader } from '@golia/gds'\n\n<StickyHeader glass={${config.glass}} threshold={${config.threshold}}>\n  <nav>Header content</nav>\n</StickyHeader>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Header content', 'ReactNode', '—'],
        ['threshold', 'Scroll distance before sticky effect', 'number', '0'],
        ['glass', 'Glass material when sticky', 'boolean', 'true'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt9.push(stickyHeaderItem)

export { patternItemsExt9 }
