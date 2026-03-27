import { TaskItem, VersionBadge } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsAD: DevCenterItem[] = []

const versionBadgeItem: DevCenterItem = {
  id: 'version-badge',
  label: 'VersionBadge',
  layer: 'l4',
  type: 'interactive',
  tags: ['version', 'badge', 'semver', 'update', 'molecule'],
  defaultConfig: { version: '1.2.3', latest: '2.0.0' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { VersionBadge } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center gap-3">
          <VersionBadge latest={config.latest} version={config.version} />
          <VersionBadge version="2.0.0" />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="version" value={config.version} options={['1.0.0', '1.2.3', '2.0.0']} onChange={(v) => setConfig('version', v)} />
      <Ctrl type="pills" label="latest" value={config.latest} options={['1.2.3', '2.0.0', '3.0.0']} onChange={(v) => setConfig('latest', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { VersionBadge } from '@goliapkg/gds'\n\n<VersionBadge version="${config.version}" latest="${config.latest}" />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['version', 'Current version string', 'string', '—'],
        ['latest', 'Latest available version (shows update icon if different)', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsAD.push(versionBadgeItem)

const taskItemItem: DevCenterItem = {
  id: 'task-item',
  label: 'TaskItem',
  layer: 'l4',
  type: 'interactive',
  tags: ['task', 'todo', 'checkbox', 'item', 'molecule'],
  defaultConfig: { completed: 'false', priority: 'medium' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { TaskItem } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex w-72 flex-col gap-1">
          <TaskItem completed={config.completed === 'true'} dueDate="Mar 30" priority={config.priority} title="Design system review" />
          <TaskItem completed title="Write unit tests" />
          <TaskItem dueDate="Apr 1" priority="critical" title="Deploy to production" />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="completed" value={config.completed} options={['false', 'true']} onChange={(v) => setConfig('completed', v)} />
      <Ctrl type="pills" label="priority" value={config.priority} options={['low', 'medium', 'high', 'critical']} onChange={(v) => setConfig('priority', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { TaskItem } from '@goliapkg/gds'\n\n<TaskItem\n  title="Design system review"\n  priority="${config.priority}"\n  dueDate="Mar 30"\n  ${config.completed === 'true' ? 'completed\n  ' : ''}onToggle={() => {}}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['title', 'Task title text', 'string', '—'],
        ['completed', 'Whether the task is checked off', 'boolean', 'false'],
        ['onToggle', 'Checkbox toggle handler', '() => void', '—'],
        ['priority', 'Priority level badge', "'low' | 'medium' | 'high' | 'critical'", '—'],
        ['dueDate', 'Due date text', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsAD.push(taskItemItem)

export { moleculeItemsAD }
