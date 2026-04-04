import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TaskBoard } from '../task-board'

const sections = [
  {
    id: 'todo',
    title: 'To Do',
    items: [
      { id: '1', title: 'Task A' },
      { id: '2', title: 'Task B', completed: true },
    ],
  },
  { id: 'done', title: 'Done', items: [] },
]

describe('TaskBoard', () => {
  it('renders with data-component', () => {
    const { container } = render(<TaskBoard sections={sections} />)
    expect(
      container.querySelector('[data-component="task-board"]')
    ).not.toBeNull()
  })

  it('renders section titles', () => {
    render(<TaskBoard sections={sections} />)
    expect(screen.getByText('To Do')).toBeDefined()
    expect(screen.getByText('Done')).toBeDefined()
  })

  it('renders items within sections', () => {
    render(<TaskBoard sections={sections} />)
    expect(screen.getByText('Task A')).toBeDefined()
    expect(screen.getByText('Task B')).toBeDefined()
  })

  it('calls onToggle with section and item id', () => {
    const fn = vi.fn()
    render(<TaskBoard onToggle={fn} sections={sections} />)
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    expect(fn).toHaveBeenCalledWith('todo', '1')
  })
})
