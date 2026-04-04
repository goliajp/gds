// gantt-chart — interactive timeline chart with task bars, milestones, dependencies
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { focusCls } from '../../utils/a11y'
import { cx } from '../../utils/cx'
import type {
  DragState,
  GanttChartProps,
  GanttTask,
  GroupedRow,
  TooltipState,
} from './gantt-chart-types'
import {
  colLabel,
  colWidth,
  computeCriticalPath,
  DAY_MS,
  fmtDate,
  generateColumns,
  PALETTE,
  RESIZE_HANDLE_WIDTH,
  toTs,
} from './gantt-chart-utils'

export function GanttChart({
  className,
  editable = false,
  headerHeight = 40,
  height: customHeight,
  labelWidth = 180,
  onTaskClick,
  onTaskMove,
  onTaskResize,
  rowHeight = 36,
  showCriticalPath = false,
  showDependencies = true,
  showProgress = true,
  showToday = true,
  tasks,
  viewMode = 'week',
}: GanttChartProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    () => new Set()
  )
  const [tooltip, setTooltip] = useState<TooltipState>(null)
  const [drag, setDrag] = useState<DragState>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleGroup = useCallback((group: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(group)) {
        next.delete(group)
      } else {
        next.add(group)
      }
      return next
    })
  }, [])

  const criticalPathIds = useMemo(() => {
    if (!showCriticalPath) return new Set<string>()
    return computeCriticalPath(tasks)
  }, [tasks, showCriticalPath])

  // build grouped rows
  const rows = useMemo((): GroupedRow[] => {
    const result: GroupedRow[] = []
    const grouped = new Map<string, GanttTask[]>()
    const ungrouped: GanttTask[] = []

    tasks.forEach((task) => {
      if (task.group !== undefined) {
        const list = grouped.get(task.group)
        if (list !== undefined) {
          list.push(task)
        } else {
          grouped.set(task.group, [task])
        }
      } else {
        ungrouped.push(task)
      }
    })

    let idx = 0
    grouped.forEach((groupTasks, groupName) => {
      const collapsed = collapsedGroups.has(groupName)
      result.push({ collapsed, kind: 'group', label: groupName })
      if (!collapsed) {
        groupTasks.forEach((task) => {
          result.push({ index: idx++, kind: 'task', task })
        })
      }
    })
    ungrouped.forEach((task) => {
      result.push({ index: idx++, kind: 'task', task })
    })
    return result
  }, [tasks, collapsedGroups])

  // compute date range and columns
  const { columns, timelineStart, timelineWidth, totalWidth } = useMemo(() => {
    if (tasks.length === 0) {
      return {
        columns: [] as Date[],
        timelineStart: 0,
        timelineWidth: 0,
        totalWidth: labelWidth,
      }
    }
    let minTs = Infinity
    let maxTs = -Infinity
    tasks.forEach((t) => {
      const s = toTs(t.start)
      const e = toTs(t.end)
      if (s < minTs) minTs = s
      if (e > maxTs) maxTs = e
    })
    const padMs =
      viewMode === 'day'
        ? DAY_MS * 2
        : viewMode === 'week'
          ? DAY_MS * 7
          : DAY_MS * 30
    const minDate = new Date(minTs - padMs)
    const maxDate = new Date(maxTs + padMs)
    const cols = generateColumns(minDate, maxDate, viewMode)
    const cw = colWidth(viewMode)
    const tw = cols.length * cw
    return {
      columns: cols,
      timelineStart: cols.length > 0 ? cols[0].getTime() : 0,
      timelineWidth: tw,
      totalWidth: labelWidth + tw,
    }
  }, [tasks, viewMode, labelWidth])

  const timelineEnd = useMemo(() => {
    if (columns.length === 0) return 0
    const lastCol = columns[columns.length - 1]
    if (viewMode === 'day') return lastCol.getTime() + DAY_MS
    if (viewMode === 'week') return lastCol.getTime() + DAY_MS * 7
    const next = new Date(lastCol)
    next.setMonth(next.getMonth() + 1)
    return next.getTime()
  }, [columns, viewMode])

  const totalDuration = timelineEnd - timelineStart

  const pxToMs = useMemo(() => {
    if (timelineWidth <= 0) return 0
    return totalDuration / timelineWidth
  }, [totalDuration, timelineWidth])

  const taskX = useCallback(
    (date: Date | string): number => {
      if (totalDuration <= 0) return 0
      const ts = toTs(date)
      return ((ts - timelineStart) / totalDuration) * timelineWidth
    },
    [timelineStart, totalDuration, timelineWidth]
  )

  const taskPositions = useMemo(() => {
    const map = new Map<string, { w: number; x: number; y: number }>()
    let rowIdx = 0
    rows.forEach((row) => {
      if (row.kind === 'group') {
        rowIdx++
        return
      }
      const t = row.task
      const x = taskX(t.start)
      const endX = t.milestone ? x : taskX(t.end)
      const w = Math.max(endX - x, 2)
      const y = headerHeight + rowIdx * rowHeight + rowHeight / 2
      map.set(t.id, { w, x, y })
      rowIdx++
    })
    return map
  }, [rows, taskX, headerHeight, rowHeight])

  const todayX = useMemo(() => {
    if (!showToday) return null
    const now = new Date()
    now.setHours(12, 0, 0, 0)
    const ts = now.getTime()
    if (ts < timelineStart || ts > timelineEnd) return null
    return ((ts - timelineStart) / totalDuration) * timelineWidth
  }, [showToday, timelineStart, timelineEnd, totalDuration, timelineWidth])

  const chartHeight = customHeight ?? headerHeight + rows.length * rowHeight + 8
  const barHeight = Math.round(rowHeight * 0.56)
  const barOffset = Math.round((rowHeight - barHeight) / 2)

  // drag handlers
  const handleDragStart = useCallback(
    (taskId: string, type: 'move' | 'resize', e: React.MouseEvent) => {
      if (!editable) return
      e.preventDefault()
      e.stopPropagation()
      const task = tasks.find((t) => t.id === taskId)
      if (task === undefined) return
      setDrag({
        origEnd: new Date(task.end),
        origStart: new Date(task.start),
        startX: e.clientX,
        taskId,
        type,
      })
      setTooltip(null)
    },
    [editable, tasks]
  )

  const dragDelta = useRef(0)

  useEffect(() => {
    if (drag === null) return
    const handleMouseMove = (e: MouseEvent) => {
      dragDelta.current = e.clientX - drag.startX
      setDrag((prev) => (prev !== null ? { ...prev } : null))
    }
    const handleMouseUp = (e: MouseEvent) => {
      const deltaMs = Math.round((e.clientX - drag.startX) * pxToMs)
      if (drag.type === 'move') {
        const newStart = new Date(drag.origStart.getTime() + deltaMs)
        const newEnd = new Date(drag.origEnd.getTime() + deltaMs)
        onTaskMove?.(drag.taskId, newStart, newEnd)
      } else {
        const newEndMs = Math.max(
          drag.origStart.getTime() + DAY_MS,
          drag.origEnd.getTime() + deltaMs
        )
        onTaskResize?.(drag.taskId, new Date(newEndMs))
      }
      dragDelta.current = 0
      setDrag(null)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [drag, pxToMs, onTaskMove, onTaskResize])

  const ghostBar = useMemo(() => {
    if (drag === null) return null
    const deltaMs = Math.round(dragDelta.current * pxToMs)
    if (drag.type === 'move') {
      return {
        end: new Date(drag.origEnd.getTime() + deltaMs),
        start: new Date(drag.origStart.getTime() + deltaMs),
        taskId: drag.taskId,
      }
    }
    const newEndMs = Math.max(
      drag.origStart.getTime() + DAY_MS,
      drag.origEnd.getTime() + deltaMs
    )
    return {
      end: new Date(newEndMs),
      start: drag.origStart,
      taskId: drag.taskId,
    }
  }, [drag, pxToMs])

  const handleMouseEnter = useCallback(
    (task: GanttTask, e: React.MouseEvent) => {
      if (drag !== null) return
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect === undefined) return
      setTooltip({
        task,
        x: e.clientX - rect.left + 12,
        y: e.clientY - rect.top - 8,
      })
    },
    [drag]
  )

  const handleMouseLeave = useCallback(() => {
    setTooltip(null)
  }, [])

  const cWidth = colWidth(viewMode)

  return (
    <div
      className={cx(
        'border-border bg-bg relative overflow-hidden rounded border select-none',
        className
      )}
      data-component="gantt-chart"
      ref={containerRef}
      style={{ height: chartHeight }}
    >
      {/* label column header */}
      <div
        className="border-border bg-surface sticky left-0 z-20 border-r border-b"
        style={{
          height: headerHeight,
          position: 'absolute',
          top: 0,
          width: labelWidth,
        }}
      >
        <div className="text-fg-muted flex h-full items-center px-3 text-xs font-semibold">
          Task
        </div>
      </div>

      {/* scrollable area */}
      <div className="overflow-x-auto" style={{ height: chartHeight }}>
        <div
          style={{
            minHeight: chartHeight,
            position: 'relative',
            width: totalWidth,
          }}
        >
          {/* timeline header */}
          <div
            className="border-border bg-surface border-b"
            style={{
              height: headerHeight,
              marginLeft: labelWidth,
              position: 'sticky',
              top: 0,
              width: timelineWidth,
              zIndex: 15,
            }}
          >
            <div className="relative flex h-full">
              {columns.map((col, i) => (
                <div
                  className={cx(
                    'border-border text-fg-muted flex shrink-0 items-center justify-center border-r text-[10px]',
                    i % 2 === 0 ? 'bg-surface' : 'bg-bg'
                  )}
                  key={col.getTime()}
                  style={{ height: headerHeight, width: cWidth }}
                >
                  {colLabel(col, viewMode)}
                </div>
              ))}
            </div>
          </div>

          {/* label column */}
          <div
            className="border-border bg-bg sticky left-0 z-10 border-r"
            style={{
              position: 'absolute',
              top: headerHeight,
              width: labelWidth,
            }}
          >
            {rows.map((row, i) => {
              if (row.kind === 'group') {
                return (
                  <button
                    className={cx(
                      'border-border bg-surface/60 text-fg flex w-full items-center gap-1.5 border-b px-3 text-xs font-semibold',
                      focusCls
                    )}
                    key={`group-${row.label}`}
                    onClick={() => toggleGroup(row.label)}
                    style={{ height: rowHeight }}
                    type="button"
                  >
                    <span
                      className="text-fg-muted text-[10px] transition-transform"
                      style={{
                        transform: row.collapsed
                          ? 'rotate(-90deg)'
                          : 'rotate(0deg)',
                      }}
                    >
                      &#9660;
                    </span>
                    {row.label}
                  </button>
                )
              }
              return (
                <div
                  className={cx(
                    'border-border text-fg flex items-center border-b px-3 text-xs',
                    i % 2 === 0 ? 'bg-bg' : 'bg-surface/30'
                  )}
                  key={row.task.id}
                  style={{ height: rowHeight }}
                >
                  <span className="truncate">{row.task.label}</span>
                </div>
              )
            })}
          </div>

          {/* timeline body */}
          <div
            style={{
              left: labelWidth,
              position: 'absolute',
              top: headerHeight,
              width: timelineWidth,
            }}
          >
            {/* grid background */}
            {rows.map((_row, i) => (
              <div
                className={cx(
                  'border-border flex border-b',
                  i % 2 === 0 ? 'bg-bg' : 'bg-surface/30'
                )}
                key={`row-bg-${i}`}
                style={{ height: rowHeight }}
              >
                {columns.map((col, ci) => (
                  <div
                    className="border-border/30 shrink-0 border-r"
                    key={col.getTime()}
                    style={{
                      backgroundColor:
                        ci % 2 === 0 ? 'transparent' : 'var(--gds-surface)',
                      height: rowHeight,
                      opacity: ci % 2 === 0 ? 1 : 0.15,
                      width: cWidth,
                    }}
                  />
                ))}
              </div>
            ))}

            {/* svg overlay */}
            <svg
              className="pointer-events-none absolute top-0 left-0"
              data-testid="gantt-svg"
              height={rows.length * rowHeight}
              width={timelineWidth}
            >
              {/* dependency arrows */}
              {showDependencies &&
                rows.map((row) => {
                  if (row.kind !== 'task') return null
                  const t = row.task
                  if (
                    t.dependencies === undefined ||
                    t.dependencies.length === 0
                  )
                    return null
                  const target = taskPositions.get(t.id)
                  if (target === undefined) return null
                  return t.dependencies.map((depId) => {
                    const source = taskPositions.get(depId)
                    if (source === undefined) return null
                    const sx = source.x + source.w
                    const sy = source.y - headerHeight
                    const tx = target.x
                    const ty = target.y - headerHeight
                    const midX = sx + (tx - sx) / 2
                    return (
                      <g
                        data-dependency={`${depId}->${t.id}`}
                        key={`dep-${depId}-${t.id}`}
                      >
                        <path
                          d={`M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ty}, ${tx} ${ty}`}
                          fill="none"
                          stroke="var(--gds-fg-muted)"
                          strokeOpacity={0.4}
                          strokeWidth={1.5}
                        />
                        <polygon
                          fill="var(--gds-fg-muted)"
                          fillOpacity={0.4}
                          points={`${tx},${ty} ${tx - 5},${ty - 3} ${tx - 5},${ty + 3}`}
                        />
                      </g>
                    )
                  })
                })}

              {/* task bars and milestones */}
              {rows.map((row, i) => {
                if (row.kind !== 'task') return null
                const t = row.task
                const isGhost = ghostBar !== null && ghostBar.taskId === t.id
                const effectiveStart = isGhost ? ghostBar.start : t.start
                const effectiveEnd = isGhost ? ghostBar.end : t.end
                const x = taskX(effectiveStart)
                const endX = taskX(effectiveEnd)
                const y = i * rowHeight + barOffset
                const color = t.color ?? PALETTE[row.index % PALETTE.length]
                const isCritical = criticalPathIds.has(t.id)

                if (t.milestone) {
                  const size = barHeight * 0.5
                  const cy = y + barHeight / 2
                  return (
                    <g
                      className="pointer-events-auto cursor-pointer"
                      data-critical-path={isCritical ? 'true' : undefined}
                      data-milestone={t.id}
                      key={t.id}
                      onClick={() => onTaskClick?.(t)}
                      onMouseEnter={(e) => handleMouseEnter(t, e)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {isCritical && (
                        <rect
                          fill="var(--gds-danger)"
                          fillOpacity={0.25}
                          height={size * 2 + 4}
                          rx={2}
                          width={size * 2 + 4}
                          x={x - size - 2}
                          y={cy - size - 2}
                        />
                      )}
                      <rect
                        fill={color}
                        height={size * 2}
                        rx={2}
                        transform={`rotate(45 ${x} ${cy})`}
                        width={size * 2}
                        x={x - size}
                        y={cy - size}
                      />
                    </g>
                  )
                }

                const w = Math.max(endX - x, 2)
                const progressW =
                  showProgress && t.progress !== undefined
                    ? (t.progress / 100) * w
                    : 0
                const isDragging = drag !== null && drag.taskId === t.id

                return (
                  <g
                    className={cx(
                      'pointer-events-auto',
                      editable ? 'cursor-grab' : 'cursor-pointer',
                      isDragging && 'cursor-grabbing'
                    )}
                    data-critical-path={isCritical ? 'true' : undefined}
                    data-task={t.id}
                    key={t.id}
                    onClick={() => {
                      if (drag === null) onTaskClick?.(t)
                    }}
                    onMouseDown={(e) => handleDragStart(t.id, 'move', e)}
                    onMouseEnter={(e) => handleMouseEnter(t, e)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {isCritical && (
                      <rect
                        data-testid={`critical-border-${t.id}`}
                        fill="var(--gds-danger)"
                        height={barHeight}
                        rx={3}
                        width={3}
                        x={x}
                        y={y}
                      />
                    )}
                    <rect
                      fill={color}
                      fillOpacity={isDragging ? 0.5 : 0.3}
                      height={barHeight}
                      rx={3}
                      width={w}
                      x={x}
                      y={y}
                    />
                    {progressW > 0 && (
                      <rect
                        data-progress={t.progress}
                        fill={color}
                        fillOpacity={0.85}
                        height={barHeight}
                        rx={3}
                        width={Math.min(progressW, w)}
                        x={x}
                        y={y}
                      />
                    )}
                    {editable && !t.milestone && (
                      <rect
                        className="cursor-ew-resize"
                        data-resize-handle={t.id}
                        fill="transparent"
                        height={barHeight}
                        onMouseDown={(e) => {
                          e.stopPropagation()
                          handleDragStart(t.id, 'resize', e)
                        }}
                        width={RESIZE_HANDLE_WIDTH}
                        x={x + w - RESIZE_HANDLE_WIDTH}
                        y={y}
                      />
                    )}
                    {t.assignee !== undefined && (
                      <text
                        dominantBaseline="middle"
                        fill="var(--gds-fg-muted)"
                        fontSize={9}
                        x={x + w + 6}
                        y={y + barHeight / 2}
                      >
                        {t.assignee}
                      </text>
                    )}
                  </g>
                )
              })}

              {/* today line */}
              {todayX !== null && (
                <line
                  data-testid="today-line"
                  stroke="var(--gds-danger)"
                  strokeDasharray="4,3"
                  strokeWidth={1.5}
                  x1={todayX}
                  x2={todayX}
                  y1={0}
                  y2={rows.length * rowHeight}
                />
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* tooltip */}
      {tooltip !== null && (
        <div
          className="border-border bg-surface pointer-events-none absolute z-30 rounded border px-3 py-2 shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="text-fg text-xs font-semibold">
            {tooltip.task.label}
          </div>
          <div className="text-fg-muted mt-0.5 text-[10px]">
            {fmtDate(new Date(tooltip.task.start))} &mdash;{' '}
            {fmtDate(new Date(tooltip.task.end))}
          </div>
          {tooltip.task.progress !== undefined && (
            <div className="text-fg-muted mt-0.5 text-[10px]">
              Progress: {tooltip.task.progress}%
            </div>
          )}
          {tooltip.task.assignee !== undefined && (
            <div className="text-fg-muted mt-0.5 text-[10px]">
              Assignee: {tooltip.task.assignee}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
