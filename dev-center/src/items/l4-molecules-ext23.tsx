import { CategoryTag, TimelineEntry } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsX: DevCenterItem[] = []

const timelineEntryItem: DevCenterItem = {
  id: 'timeline-entry',
  label: 'TimelineEntry',
  layer: 'l4',
  type: 'interactive',
  tags: ['timeline', 'event', 'history', 'molecule'],
  defaultConfig: { variant: 'default', last: 'false' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { TimelineEntry } from '@golia/gds'" />
      <LivePreview>
        <div>
          <TimelineEntry variant={config.variant as 'danger' | 'default' | 'success' | 'warning'}>
            <div className="text-xs font-medium text-fg">Deployed v2.0</div>
            <div className="text-xs text-fg-muted">Production release</div>
          </TimelineEntry>
          <TimelineEntry variant="success">
            <div className="text-xs font-medium text-fg">Tests passed</div>
            <div className="text-xs text-fg-muted">All 142 tests green</div>
          </TimelineEntry>
          <TimelineEntry variant="default" last={config.last === 'true'}>
            <div className="text-xs font-medium text-fg">Branch created</div>
          </TimelineEntry>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="variant" value={config.variant} options={['default', 'success', 'warning', 'danger']} onChange={(v) => setConfig('variant', v)} />
      <Ctrl type="pills" label="last" value={config.last} options={['false', 'true']} onChange={(v) => setConfig('last', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { TimelineEntry } from '@golia/gds'\n\n<TimelineEntry variant="${config.variant}"${config.last === 'true' ? ' last' : ''}>\n  <div>Event content</div>\n</TimelineEntry>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Content to display', 'ReactNode', '—'],
        ['variant', 'Dot color variant', "'default' | 'success' | 'warning' | 'danger'", 'default'],
        ['icon', 'Custom icon instead of dot', 'ReactNode', '—'],
        ['last', 'Hides connector line when true', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsX.push(timelineEntryItem)

const categoryTagItem: DevCenterItem = {
  id: 'category-tag',
  label: 'CategoryTag',
  layer: 'l4',
  type: 'interactive',
  tags: ['category', 'tag', 'label', 'color', 'molecule'],
  defaultConfig: { label: 'Newsletter', color: '#3b82f6', count: '12' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CategoryTag } from '@golia/gds'" />
      <LivePreview>
        <div className="flex flex-wrap gap-2">
          <CategoryTag label={config.label} color={config.color} count={config.count !== '' ? Number(config.count) : undefined} />
          <CategoryTag label="Spam" color="#ef4444" count={3} />
          <CategoryTag label="Promotion" color="#10b981" count={28} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="label" value={config.label} options={['Newsletter', 'Spam', 'Promotion', 'Social']} onChange={(v) => setConfig('label', v)} />
      <Ctrl type="pills" label="color" value={config.color} options={['#3b82f6', '#ef4444', '#10b981', '#f59e0b']} onChange={(v) => setConfig('color', v)} />
      <Ctrl type="pills" label="count" value={config.count} options={['', '3', '12', '99']} onChange={(v) => setConfig('count', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { CategoryTag } from '@golia/gds'\n\n<CategoryTag label="${config.label}" color="${config.color}"${config.count !== '' ? ` count={${config.count}}` : ''} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['label', 'Category name', 'string', '—'],
        ['color', 'Color for the left bar', 'string', '—'],
        ['count', 'Optional count badge', 'number', '—'],
        ['onClick', 'Click handler', '() => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsX.push(categoryTagItem)

export { moleculeItemsX }
