import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { RadioCard } from '../radio-card'

const options = [
  { value: 'a', label: 'Option A', description: 'First option' },
  { value: 'b', label: 'Option B', description: 'Second option' },
  { value: 'c', label: 'Option C' },
]

describe('RadioCard', () => {
  it('renders all options', () => {
    render(<RadioCard options={options} value={null} onChange={() => {}} />)
    expect(screen.getByText('Option A')).toBeDefined()
    expect(screen.getByText('Option B')).toBeDefined()
    expect(screen.getByText('Option C')).toBeDefined()
  })

  it('calls onChange on click', () => {
    const onChange = vi.fn()
    render(<RadioCard options={options} value={null} onChange={onChange} />)
    fireEvent.click(screen.getByText('Option B'))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('shows selected state', () => {
    const { container } = render(<RadioCard options={options} value="a" onChange={() => {}} />)
    const selected = container.querySelector('[data-state="selected"]')
    expect(selected).not.toBeNull()
    expect(selected?.textContent).toContain('Option A')
  })

  it('disables interaction when disabled', () => {
    const onChange = vi.fn()
    render(<RadioCard options={options} value={null} onChange={onChange} disabled />)
    fireEvent.click(screen.getByText('Option A'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies column layout', () => {
    const { container } = render(<RadioCard options={options} value={null} onChange={() => {}} columns={3} />)
    const grid = container.querySelector('[data-component="radio-card"]')
    expect(grid?.className).toContain('grid-cols-3')
  })
})
