import type { GanttTask, GanttViewMode } from './gantt-chart-types'

export const PALETTE = [
  'var(--gds-palette-0)',
  'var(--gds-palette-1)',
  'var(--gds-palette-2)',
  'var(--gds-palette-3)',
  'var(--gds-palette-4)',
  'var(--gds-palette-5)',
  'var(--gds-palette-6)',
  'var(--gds-palette-7)',
]

export const DAY_MS = 86400000
export const RESIZE_HANDLE_WIDTH = 6

export const toTs = (d: Date | string): number => new Date(d).getTime()

export const fmtDate = (d: Date): string => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const shortMonth = (d: Date): string =>
  d.toLocaleDateString('en-US', { month: 'short' })

const startOfWeek = (d: Date): Date => {
  const result = new Date(d)
  const day = result.getDay()
  const diff = day === 0 ? -6 : 1 - day
  result.setDate(result.getDate() + diff)
  result.setHours(0, 0, 0, 0)
  return result
}

const startOfMonth = (d: Date): Date => {
  const result = new Date(d)
  result.setDate(1)
  result.setHours(0, 0, 0, 0)
  return result
}

export const generateColumns = (
  minDate: Date,
  maxDate: Date,
  viewMode: GanttViewMode
): Date[] => {
  const cols: Date[] = []
  const end = maxDate.getTime() + DAY_MS

  if (viewMode === 'day') {
    const d = new Date(minDate)
    d.setHours(0, 0, 0, 0)
    while (d.getTime() <= end) {
      cols.push(new Date(d))
      d.setDate(d.getDate() + 1)
    }
  } else if (viewMode === 'week') {
    const d = startOfWeek(minDate)
    while (d.getTime() <= end) {
      cols.push(new Date(d))
      d.setDate(d.getDate() + 7)
    }
  } else {
    const d = startOfMonth(minDate)
    while (d.getTime() <= end) {
      cols.push(new Date(d))
      d.setMonth(d.getMonth() + 1)
    }
  }
  return cols
}

export const colWidth = (mode: GanttViewMode): number => {
  if (mode === 'day') return 36
  if (mode === 'week') return 80
  return 120
}

export const colLabel = (d: Date, mode: GanttViewMode): string => {
  if (mode === 'day') return String(d.getDate())
  if (mode === 'week') return `${shortMonth(d)} ${d.getDate()}`
  return `${shortMonth(d)} ${d.getFullYear()}`
}

export const computeCriticalPath = (tasks: GanttTask[]): Set<string> => {
  const taskMap = new Map<string, GanttTask>()
  tasks.forEach((t) => taskMap.set(t.id, t))

  const hasDependents = new Set<string>()
  tasks.forEach((t) => {
    if (t.dependencies !== undefined) {
      t.dependencies.forEach((depId) => hasDependents.add(depId))
    }
  })

  const endTasks = tasks.filter((t) => !hasDependents.has(t.id))
  const cache = new Map<string, { chain: string[]; duration: number }>()

  const longestChain = (
    taskId: string
  ): { chain: string[]; duration: number } => {
    const cached = cache.get(taskId)
    if (cached !== undefined) return cached

    const task = taskMap.get(taskId)
    if (task === undefined) {
      const empty = { chain: [], duration: 0 }
      cache.set(taskId, empty)
      return empty
    }

    const taskDuration = toTs(task.end) - toTs(task.start)

    if (task.dependencies === undefined || task.dependencies.length === 0) {
      const result = { chain: [taskId], duration: taskDuration }
      cache.set(taskId, result)
      return result
    }

    let bestDep = { chain: [] as string[], duration: 0 }
    task.dependencies.forEach((depId) => {
      const dep = longestChain(depId)
      if (dep.duration > bestDep.duration) {
        bestDep = dep
      }
    })

    const result = {
      chain: [...bestDep.chain, taskId],
      duration: taskDuration + bestDep.duration,
    }
    cache.set(taskId, result)
    return result
  }

  let longestPath = { chain: [] as string[], duration: 0 }
  endTasks.forEach((t) => {
    const result = longestChain(t.id)
    if (result.duration > longestPath.duration) {
      longestPath = result
    }
  })

  return new Set(longestPath.chain)
}
