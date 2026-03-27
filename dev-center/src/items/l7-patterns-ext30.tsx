import { SplitView } from '@gds/l7-patterns'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt30: DevCenterItem[] = []

const splitViewItem: DevCenterItem = {
  id: 'split-view',
  label: 'SplitView',
  layer: 'l7',
  type: 'interactive',
  tags: ['split', 'pane', 'resize', 'layout', 'divider', 'pattern'],
  defaultConfig: { defaultSplit: 50, minLeft: 20, minRight: 20 },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { SplitView } from '@goliapkg/gds'" />
      <LivePreview className="!p-0">
        <div className="h-64 w-full">
          <SplitView
            defaultSplit={config.defaultSplit}
            minLeft={config.minLeft}
            minRight={config.minRight}
            left={
              <div className="flex h-full items-center justify-center bg-accent/5 p-4 text-sm text-fg-muted">
                Left Pane
              </div>
            }
            right={
              <div className="flex h-full items-center justify-center bg-success/5 p-4 text-sm text-fg-muted">
                Right Pane
              </div>
            }
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="defaultSplit" value={config.defaultSplit} min={10} max={90} onChange={(v) => setConfig('defaultSplit', v)} />
      <Ctrl type="number" label="minLeft" value={config.minLeft} min={5} max={50} onChange={(v) => setConfig('minLeft', v)} />
      <Ctrl type="number" label="minRight" value={config.minRight} min={5} max={50} onChange={(v) => setConfig('minRight', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { SplitView } from '@goliapkg/gds'\n\n<SplitView\n  defaultSplit={${config.defaultSplit}}\n  minLeft={${config.minLeft}}\n  minRight={${config.minRight}}\n  left={<LeftPane />}\n  right={<RightPane />}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['left', 'Left pane content', 'ReactNode', '—'],
        ['right', 'Right pane content', 'ReactNode', '—'],
        ['defaultSplit', 'Initial split percentage', 'number', '50'],
        ['minLeft', 'Minimum left pane %', 'number', '20'],
        ['minRight', 'Minimum right pane %', 'number', '20'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt30.push(splitViewItem)

export { patternItemsExt30 }
