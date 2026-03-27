import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SwitchGroup } from '../switch-group'

const items = [
  { id: 'dark', label: 'Dark mode', description: 'Use dark theme', checked: true },
  { id: 'notify', label: 'Notifications', checked: false },
]

describe('SwitchGroup', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<SwitchGroup items={items} onChange={() => {}} />)
    expect(container.querySelector('[data-component="switch-group"]')).not.toBeNull()
  })

  it('renders all item labels', () => {
    render(<SwitchGroup items={items} onChange={() => {}} />)
    expect(screen.getByText('Dark mode')).toBeDefined()
    expect(screen.getByText('Notifications')).toBeDefined()
  })

  it('renders description when provided', () => {
    render(<SwitchGroup items={items} onChange={() => {}} />)
    expect(screen.getByText('Use dark theme')).toBeDefined()
  })

  it('calls onChange with id and toggled value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SwitchGroup items={items} onChange={onChange} />)
    const switches = screen.getAllByRole('switch')
    await user.click(switches[1])
    expect(onChange).toHaveBeenCalledWith('notify', true)
  })
})
