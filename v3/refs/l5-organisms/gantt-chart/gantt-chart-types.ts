export type GanttViewMode = 'day' | 'month' | 'week'

export type GanttTask = {
  /** Person or resource assigned to the task */
  assignee?: string
  /** Custom bar color (CSS color value) */
  color?: string
  /** IDs of tasks this task depends on */
  dependencies?: string[]
  /** Task end date */
  end: Date | string
  /** Group name for row grouping */
  group?: string
  /** Unique task identifier */
  id: string
  /** Display name shown on the task bar */
  label: string
  /** Render as diamond milestone instead of bar */
  milestone?: boolean
  /** Completion percentage (0–100) */
  progress?: number
  /** Task start date */
  start: Date | string
}

export type GanttChartProps = {
  className?: string
  /** Allow drag-to-move and drag-to-resize on task bars */
  editable?: boolean
  /** Height of the timeline header in px */
  headerHeight?: number
  height?: number
  /** Width of the task label column in px */
  labelWidth?: number
  /** Called when a task bar is clicked */
  onTaskClick?: (task: GanttTask) => void
  /** Called after dragging a task to new dates */
  onTaskMove?: (taskId: string, newStart: Date, newEnd: Date) => void
  /** Called after resizing a task's end date */
  onTaskResize?: (taskId: string, newEnd: Date) => void
  /** Height of each task row in px */
  rowHeight?: number
  /** Highlight the longest dependency chain */
  showCriticalPath?: boolean
  /** Draw arrow lines between dependent tasks */
  showDependencies?: boolean
  /** Show progress fill inside task bars */
  showProgress?: boolean
  /** Draw a vertical line at today's date */
  showToday?: boolean
  /** Task data array */
  tasks: GanttTask[]
  /** Timeline zoom level */
  viewMode?: GanttViewMode
}

export type DragState = null | {
  origEnd: Date
  origStart: Date
  startX: number
  taskId: string
  type: 'move' | 'resize'
}

export type GroupedRow =
  | { collapsed: boolean; kind: 'group'; label: string }
  | { index: number; kind: 'task'; task: GanttTask }

export type TooltipState = null | {
  task: GanttTask
  x: number
  y: number
}
