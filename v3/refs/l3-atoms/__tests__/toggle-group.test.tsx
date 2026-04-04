import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ToggleGroup } from '../toggle-group'

const items = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
]

describe('ToggleGroup', () => {
  it('renders all items', () => {
    render(<ToggleGroup items={items} value={[]} onChange={() => {}} />)
    expect(screen.getByText('Alpha')).toBeDefined()
    expect(screen.getByText('Beta')).toBeDefined()
    expect(screen.getByText('Gamma')).toBeDefined()
  })

  it('toggles item on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ToggleGroup items={items} value={['a']} onChange={onChange} />)
    await user.click(screen.getByText('Beta'))
    expect(onChange).toHaveBeenCalledWith(['a', 'b'])
  })

  it('exclusive mode selects only one', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ToggleGroup items={items} value={['a']} onChange={onChange} exclusive />
    )
    await user.click(screen.getByText('Beta'))
    expect(onChange).toHaveBeenCalledWith(['b'])
  })

  it('fires onChange on deselect', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ToggleGroup items={items} value={['a', 'b']} onChange={onChange} />)
    await user.click(screen.getByText('Alpha'))
    expect(onChange).toHaveBeenCalledWith(['b'])
  })

  it('does not respond when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ToggleGroup items={items} value={[]} onChange={onChange} disabled />
    )
    await user.click(screen.getByText('Alpha'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not deselect in exclusive mode when clicking active item', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ToggleGroup items={items} value={['a']} onChange={onChange} exclusive />
    )
    await user.click(screen.getByText('Alpha'))
    // clicking already-selected item in exclusive mode should not call onChange
    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies sm size classes', () => {
    const { container } = render(
      <ToggleGroup items={items} value={[]} onChange={() => {}} size="sm" />
    )
    const buttons = container.querySelectorAll('button')
    expect(buttons[0]?.className).toContain('text-[11px]')
  })

  it('renders border between items except last', () => {
    const { container } = render(
      <ToggleGroup items={items} value={[]} onChange={() => {}} />
    )
    const buttons = container.querySelectorAll('button')
    expect(buttons[0]?.className).toContain('border-r')
    expect(buttons[1]?.className).toContain('border-r')
    // last button should NOT have border-r
    expect(buttons[2]?.className).not.toContain('border-r')
  })
})
