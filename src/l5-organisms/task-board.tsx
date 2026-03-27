import { forwardRef } from 'react'

import { TaskItem } from '../l4-molecules/task-item'
import { cx } from '../utils/cx'

type TaskBoardItem = {
  completed?: boolean
  id: string
  priority?: 'low' | 'medium' | 'high' | 'critical'
  title: string
}

type TaskBoardSection = {
  id: string
  items: TaskBoardItem[]
  title: string
}

type TaskBoardProps = React.HTMLAttributes<HTMLDivElement> & {
  onToggle?: (sectionId: string, itemId: string) => void
  sections: TaskBoardSection[]
}

const TaskBoard = forwardRef<HTMLDivElement, TaskBoardProps>(
  function TaskBoard({ className, onToggle, sections, ...props }, ref) {
    return (
      <div className={cx('flex flex-col gds-gap', className)} data-component="task-board" ref={ref} {...props}>
        {sections.map((section) => (
          <div className="rounded-lg border border-border bg-surface gds-pad" key={section.id}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-fg-muted">{section.title}</h3>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <TaskItem
                  completed={item.completed}
                  key={item.id}
                  onToggle={onToggle !== undefined ? () => onToggle(section.id, item.id) : undefined}
                  priority={item.priority}
                  title={item.title}
                />
              ))}
              {section.items.length === 0 && (
                <p className="py-2 text-center text-xs text-fg-muted">No items</p>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  },
)

export { TaskBoard }
export type { TaskBoardItem, TaskBoardProps, TaskBoardSection }
