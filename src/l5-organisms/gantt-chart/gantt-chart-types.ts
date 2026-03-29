export type GanttViewMode = 'day' | 'month' | 'week'

export type GanttTask = {
  assignee?: string
  color?: string
  dependencies?: string[]
  end: Date | string
  group?: string
  id: string
  label: string
  milestone?: boolean
  progress?: number
  start: Date | string
}

export type GanttChartProps = {
  className?: string
  editable?: boolean
  headerHeight?: number
  height?: number
  labelWidth?: number
  onTaskClick?: (task: GanttTask) => void
  onTaskMove?: (taskId: string, newStart: Date, newEnd: Date) => void
  onTaskResize?: (taskId: string, newEnd: Date) => void
  rowHeight?: number
  showCriticalPath?: boolean
  showDependencies?: boolean
  showProgress?: boolean
  showToday?: boolean
  tasks: GanttTask[]
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
