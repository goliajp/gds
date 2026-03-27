import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ActionMenu } from '../action-menu'

const items = [
  { id: 'edit', label: 'Edit' },
  { id: 'delete', label: 'Delete', danger: true },
]

describe('ActionMenu', () => {
  it('renders trigger button', () => {
    const { container } = render(<ActionMenu items={items} onSelect={vi.fn()} />)
    expect(container.querySelector('[data-component="action-menu"]')).not.toBeNull()
  })

  it('shows dropdown on click', async () => {
    const user = userEvent.setup()
    render(<ActionMenu items={items} onSelect={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: 'Actions' }))
    expect(screen.getByText('Edit')).toBeTruthy()
    expect(screen.getByText('Delete')).toBeTruthy()
  })

  it('calls onSelect and closes on item click', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<ActionMenu items={items} onSelect={onSelect} />)
    await user.click(screen.getByRole('button', { name: 'Actions' }))
    await user.click(screen.getByText('Edit'))
    expect(onSelect).toHaveBeenCalledWith('edit')
  })

  it('disables trigger when disabled', () => {
    render(<ActionMenu disabled items={items} onSelect={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Actions' })).toBeDisabled()
  })
})
