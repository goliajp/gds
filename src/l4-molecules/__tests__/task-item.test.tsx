import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TaskItem } from '../task-item'

describe('TaskItem', () => {
  it('renders with data-component and title', () => {
    const { container } = render(<TaskItem title="Buy milk" />)
    expect(
      container.querySelector('[data-component="task-item"]')
    ).not.toBeNull()
    expect(screen.getByText('Buy milk')).toBeDefined()
  })

  it('applies strikethrough when completed', () => {
    const { container } = render(<TaskItem completed title="Done task" />)
    expect(container.querySelector('[data-completed="true"]')).not.toBeNull()
    expect(container.querySelector('.line-through')).not.toBeNull()
  })

  it('calls onToggle when checkbox is clicked', () => {
    const fn = vi.fn()
    render(<TaskItem onToggle={fn} title="Toggle me" />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(fn).toHaveBeenCalledOnce()
  })

  it('renders priority badge and due date', () => {
    render(<TaskItem dueDate="Mar 30" priority="high" title="Urgent" />)
    expect(screen.getByText('high')).toBeDefined()
    expect(screen.getByText('Mar 30')).toBeDefined()
  })
})
