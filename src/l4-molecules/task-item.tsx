import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type TaskItemPriority = 'low' | 'medium' | 'high' | 'critical'

type TaskItemProps = React.HTMLAttributes<HTMLDivElement> & {
  completed?: boolean
  dueDate?: string
  onToggle?: () => void
  priority?: TaskItemPriority
  title: string
}

const priorityCls: Record<TaskItemPriority, string> = {
  low: 'bg-success/15 text-success',
  medium: 'bg-warning/15 text-warning',
  high: 'bg-danger/15 text-danger',
  critical: 'bg-danger text-white',
}

const TaskItem = forwardRef<HTMLDivElement, TaskItemProps>(
  function TaskItem({ className, completed = false, dueDate, onToggle, priority, title, ...props }, ref) {
    return (
      <div
        className={cx('flex items-center gap-2 rounded px-2 py-1.5 text-sm', className)}
        data-component="task-item"
        data-completed={completed}
        ref={ref}
        {...props}
      >
        <input
          checked={completed}
          className="shrink-0 accent-accent"
          onChange={onToggle}
          type="checkbox"
        />
        <span className={cx('flex-1 truncate', completed && 'line-through text-fg-muted')}>{title}</span>
        {priority !== undefined && (
          <span className={cx('rounded px-1.5 py-0.5 text-[10px] font-medium uppercase', priorityCls[priority])}>{priority}</span>
        )}
        {dueDate !== undefined && (
          <span className="shrink-0 text-xs text-fg-muted">{dueDate}</span>
        )}
      </div>
    )
  },
)

export { TaskItem }
export type { TaskItemPriority, TaskItemProps }
