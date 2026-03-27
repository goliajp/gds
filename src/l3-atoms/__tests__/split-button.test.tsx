import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SplitButton } from '../split-button'

const items = [
  { id: 'save-draft', label: 'Save as Draft' },
  { id: 'delete', label: 'Delete', danger: true },
]

describe('SplitButton', () => {
  it('renders the main button label', () => {
    render(<SplitButton items={items} onSelect={() => {}}>Save</SplitButton>)
    expect(screen.getByText('Save')).toBeDefined()
  })

  it('calls onClick when main button is clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<SplitButton items={items} onSelect={() => {}} onClick={onClick}>Save</SplitButton>)
    await user.click(screen.getByText('Save'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('opens dropdown on arrow click', async () => {
    const user = userEvent.setup()
    render(<SplitButton items={items} onSelect={() => {}}>Save</SplitButton>)
    await user.click(screen.getByLabelText('More actions'))
    expect(screen.getByText('Save as Draft')).toBeDefined()
    expect(screen.getByText('Delete')).toBeDefined()
  })

  it('calls onSelect when a dropdown item is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<SplitButton items={items} onSelect={onSelect}>Save</SplitButton>)
    await user.click(screen.getByLabelText('More actions'))
    await user.click(screen.getByText('Save as Draft'))
    expect(onSelect).toHaveBeenCalledWith('save-draft')
  })

  it('closes dropdown on escape', async () => {
    const user = userEvent.setup()
    render(<SplitButton items={items} onSelect={() => {}}>Save</SplitButton>)
    await user.click(screen.getByLabelText('More actions'))
    expect(screen.getByText('Save as Draft')).toBeDefined()
    await user.keyboard('{Escape}')
    expect(screen.queryByText('Save as Draft')).toBeNull()
  })
})
