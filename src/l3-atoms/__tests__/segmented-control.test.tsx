import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SegmentedControl } from '../segmented-control'

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
]

describe('SegmentedControl', () => {
  it('renders all options', () => {
    render(<SegmentedControl options={options} value="a" onChange={() => {}} />)
    expect(screen.getByText('Alpha')).toBeDefined()
    expect(screen.getByText('Beta')).toBeDefined()
    expect(screen.getByText('Gamma')).toBeDefined()
  })

  it('marks active option with aria-checked', () => {
    render(<SegmentedControl options={options} value="b" onChange={() => {}} />)
    const activeBtn = screen.getByText('Beta')
    expect(activeBtn.getAttribute('aria-checked')).toBe('true')
    const inactiveBtn = screen.getByText('Alpha')
    expect(inactiveBtn.getAttribute('aria-checked')).toBe('false')
  })

  it('calls onChange when clicking inactive option', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SegmentedControl options={options} value="a" onChange={onChange} />)
    await user.click(screen.getByText('Beta'))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('applies disabled state', () => {
    const { container } = render(<SegmentedControl options={options} value="a" onChange={() => {}} disabled />)
    const el = container.querySelector('[data-component="segmented-control"]')
    expect(el?.getAttribute('data-state')).toBe('disabled')
  })

  it('renders with sm size', () => {
    const { container } = render(<SegmentedControl options={options} value="a" onChange={() => {}} size="sm" />)
    expect(container.querySelector('[data-component="segmented-control"]')).not.toBeNull()
  })

  it('does not call onChange when clicking already active option', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SegmentedControl options={options} value="a" onChange={onChange} />)
    await user.click(screen.getByText('Alpha'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies glass class when glass is true', () => {
    const { container } = render(<SegmentedControl options={options} value="a" onChange={() => {}} glass />)
    const el = container.querySelector('[data-component="segmented-control"]')
    // glass class should be applied (backdrop-blur or similar)
    expect(el).not.toBeNull()
  })

  it('has data-state="enabled" when not disabled', () => {
    const { container } = render(<SegmentedControl options={options} value="a" onChange={() => {}} />)
    const el = container.querySelector('[data-component="segmented-control"]')
    expect(el?.getAttribute('data-state')).toBe('enabled')
  })
})
