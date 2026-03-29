import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { GanttChart } from '../gantt-chart'
import type { GanttTask } from '../gantt-chart-types'

const tasks: GanttTask[] = [
  {
    assignee: 'Alice',
    end: '2026-03-10',
    group: 'Planning',
    id: '1',
    label: 'Design',
    progress: 100,
    start: '2026-03-01',
  },
  {
    assignee: 'Bob',
    dependencies: ['1'],
    end: '2026-03-20',
    group: 'Planning',
    id: '2',
    label: 'Develop',
    progress: 50,
    start: '2026-03-08',
  },
  {
    end: '2026-03-25',
    group: 'Execution',
    id: '3',
    label: 'Test',
    start: '2026-03-18',
  },
  {
    dependencies: ['3'],
    end: '2026-03-25',
    group: 'Execution',
    id: '4',
    label: 'Launch',
    milestone: true,
    start: '2026-03-25',
  },
]

describe('GanttChart', () => {
  it('renders task labels', () => {
    render(<GanttChart tasks={tasks} />)
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Develop')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Launch')).toBeInTheDocument()
  })

  it('renders task bars for each non-milestone task', () => {
    const { container } = render(<GanttChart tasks={tasks} />)
    const bars = container.querySelectorAll('[data-task]')
    expect(bars.length).toBe(3)
  })

  it('renders milestone diamonds', () => {
    const { container } = render(<GanttChart tasks={tasks} />)
    const milestones = container.querySelectorAll('[data-milestone]')
    expect(milestones.length).toBe(1)
    expect(milestones[0].getAttribute('data-milestone')).toBe('4')
  })

  it('renders dependency arrows when enabled', () => {
    const { container } = render(<GanttChart showDependencies={true} tasks={tasks} />)
    const deps = container.querySelectorAll('[data-dependency]')
    expect(deps.length).toBe(2)
  })

  it('hides dependency arrows when disabled', () => {
    const { container } = render(<GanttChart showDependencies={false} tasks={tasks} />)
    const deps = container.querySelectorAll('[data-dependency]')
    expect(deps.length).toBe(0)
  })

  it('renders today line when enabled', () => {
    const today = new Date()
    const start = new Date(today)
    start.setDate(start.getDate() - 5)
    const end = new Date(today)
    end.setDate(end.getDate() + 5)
    const todayTasks: GanttTask[] = [
      { end: end.toISOString(), id: 't1', label: 'Current', start: start.toISOString() },
    ]
    const { container } = render(<GanttChart showToday={true} tasks={todayTasks} />)
    expect(container.querySelector('[data-testid="today-line"]')).toBeInTheDocument()
  })

  it('renders group headers', () => {
    render(<GanttChart tasks={tasks} />)
    expect(screen.getByText('Planning')).toBeInTheDocument()
    expect(screen.getByText('Execution')).toBeInTheDocument()
  })

  it('collapses group when header is clicked', () => {
    render(<GanttChart tasks={tasks} />)
    expect(screen.getByText('Design')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Planning'))
    expect(screen.queryByText('Design')).not.toBeInTheDocument()
    expect(screen.queryByText('Develop')).not.toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('applies className', () => {
    const { container } = render(<GanttChart className="custom-class" tasks={tasks} />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders progress fill when showProgress is true', () => {
    const { container } = render(<GanttChart showProgress={true} tasks={tasks} />)
    const fills = container.querySelectorAll('[data-progress]')
    expect(fills.length).toBe(2)
  })

  it('hides progress fill when showProgress is false', () => {
    const { container } = render(<GanttChart showProgress={false} tasks={tasks} />)
    expect(container.querySelectorAll('[data-progress]').length).toBe(0)
  })

  it('calls onTaskClick when task bar is clicked', () => {
    const onClick = vi.fn()
    const { container } = render(<GanttChart onTaskClick={onClick} tasks={tasks} />)
    const bar = container.querySelector('[data-task="1"]')
    if (bar !== null) fireEvent.click(bar)
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ id: '1', label: 'Design' }))
  })

  it('renders with empty tasks', () => {
    const { container } = render(<GanttChart tasks={[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders resize handles when editable', () => {
    const { container } = render(<GanttChart editable={true} tasks={tasks} />)
    expect(container.querySelectorAll('[data-resize-handle]').length).toBe(3)
  })

  it('does not render resize handles when not editable', () => {
    const { container } = render(<GanttChart editable={false} tasks={tasks} />)
    expect(container.querySelectorAll('[data-resize-handle]').length).toBe(0)
  })

  it('highlights critical path tasks', () => {
    const { container } = render(<GanttChart showCriticalPath={true} tasks={tasks} />)
    expect(container.querySelectorAll('[data-critical-path="true"]').length).toBeGreaterThan(0)
  })

  it('does not highlight critical path when disabled', () => {
    const { container } = render(<GanttChart showCriticalPath={false} tasks={tasks} />)
    expect(container.querySelectorAll('[data-critical-path="true"]').length).toBe(0)
  })

  it('calls onTaskClick when milestone is clicked', () => {
    const onClick = vi.fn()
    const { container } = render(<GanttChart onTaskClick={onClick} tasks={tasks} />)
    const milestone = container.querySelector('[data-milestone="4"]')
    if (milestone !== null) fireEvent.click(milestone)
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ id: '4', label: 'Launch', milestone: true }))
  })

  it('has data-component attribute', () => {
    const { container } = render(<GanttChart tasks={tasks} />)
    expect(container.querySelector('[data-component="gantt-chart"]')).toBeInTheDocument()
  })
})
