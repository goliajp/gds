import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Kanban } from '../kanban'

const columns = [
  {
    id: 'todo',
    title: 'To Do',
    items: [
      { id: '1', title: 'Task A', description: 'First task', tags: ['bug'] },
      { id: '2', title: 'Task B' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    items: [],
  },
]

describe('Kanban', () => {
  it('renders without crash', () => {
    const { container } = render(<Kanban columns={columns} />)
    expect(container.querySelector('[data-component="kanban"]')).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Kanban columns={columns} />)
    expect(container.querySelector('[data-component="kanban"]')).not.toBeNull()
  })

  it('renders column titles', () => {
    render(<Kanban columns={columns} />)
    expect(screen.getByText('To Do')).toBeDefined()
    expect(screen.getByText('Done')).toBeDefined()
  })

  it('renders item titles and descriptions', () => {
    render(<Kanban columns={columns} />)
    expect(screen.getByText('Task A')).toBeDefined()
    expect(screen.getByText('First task')).toBeDefined()
    expect(screen.getByText('Task B')).toBeDefined()
  })

  it('shows empty state for columns with no items', () => {
    render(<Kanban columns={columns} />)
    expect(screen.getByText('No items')).toBeDefined()
  })
})
