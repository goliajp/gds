import { CalendarView } from '@gds/l7-patterns'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt26: DevCenterItem[] = []

const sampleEvents = [
  { date: 3, label: 'Sprint Planning', color: 'var(--color-accent)' },
  { date: 7, label: 'Payday', color: 'var(--color-success)' },
  { date: 10, label: 'Review', color: 'var(--color-warning)' },
  { date: 15, label: 'Deadline', color: 'var(--color-danger)' },
  { date: 15, label: 'Demo Day', color: 'var(--color-accent)' },
  { date: 22, label: 'Team Lunch', color: 'var(--color-success)' },
  { date: 28, label: 'Release', color: 'var(--color-accent)' },
]

const calendarViewItem: DevCenterItem = {
  id: 'calendar-view',
  label: 'CalendarView',
  layer: 'l7',
  type: 'interactive',
  tags: ['calendar', 'month', 'date', 'schedule', 'events', 'pattern'],
  defaultConfig: { month: '3' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CalendarView } from '@golia/gds'" />
      <LivePreview>
        <div className="w-72">
          <CalendarView events={sampleEvents} month={Number(config.month)} year={2026} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="month" value={config.month} options={['1', '2', '3', '6', '12']} onChange={(v) => setConfig('month', v)} />
  ),

  code: ({ config }) =>
    `import { CalendarView } from '@golia/gds'\n\n<CalendarView\n  year={2026}\n  month={${config.month}}\n  events={[\n    { date: 7, label: 'Payday', color: 'var(--color-success)' },\n    { date: 15, label: 'Deadline', color: 'var(--color-danger)' },\n  ]}\n  onDateClick={(day) => console.log(day)}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['year', 'Calendar year', 'number', '—'],
        ['month', 'Calendar month (1-12)', 'number', '—'],
        ['events', 'Events to display as colored dots', '{ date: number; label: string; color?: string }[]', '[]'],
        ['onDateClick', 'Callback when a day is clicked', '(date: number) => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt26.push(calendarViewItem)

export { patternItemsExt26 }
