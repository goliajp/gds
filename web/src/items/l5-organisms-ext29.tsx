import { TaskBoard } from '@gds/l5-organisms'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt29: DevCenterItem[] = []

const sampleSections = [
  { id: 'todo', title: 'To Do', items: [
    { id: '1', title: 'Design review', priority: 'high' as const },
    { id: '2', title: 'Write documentation' },
  ] },
  { id: 'progress', title: 'In Progress', items: [
    { id: '3', title: 'Implement TaskBoard', priority: 'medium' as const },
  ] },
  { id: 'done', title: 'Done', items: [
    { id: '4', title: 'Set up project', completed: true },
    { id: '5', title: 'Install dependencies', completed: true },
  ] },
]

const taskBoardItem: DevCenterItem = {
  id: 'task-board',
  label: 'TaskBoard',
  layer: 'l5',
  type: 'interactive',
  tags: ['task', 'board', 'kanban', 'todo', 'sections', 'organism'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { TaskBoard } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-80">
          <TaskBoard sections={sampleSections} />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { TaskBoard } from '@goliapkg/gds'\n\n<TaskBoard\n  sections={[\n    { id: 'todo', title: 'To Do', items: [\n      { id: '1', title: 'Design review', priority: 'high' },\n    ] },\n    { id: 'done', title: 'Done', items: [\n      { id: '2', title: 'Set up project', completed: true },\n    ] },\n  ]}\n  onToggle={(sectionId, itemId) => {}}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['sections', 'Array of task sections', '{ id, title, items: { id, title, completed?, priority? }[] }[]', '—'],
        ['onToggle', 'Callback when item checkbox toggled', '(sectionId: string, itemId: string) => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt29.push(taskBoardItem)

export { organismItemsExt29 }
