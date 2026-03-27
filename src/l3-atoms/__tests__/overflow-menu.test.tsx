import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { OverflowMenu } from '../overflow-menu'

const items = [
  { id: 'edit', label: 'Edit' },
  { id: 'delete', label: 'Delete' },
]

describe('OverflowMenu', () => {
  it('renders the trigger button', () => {
    render(<OverflowMenu items={items} onSelect={() => {}} />)
    expect(screen.getByLabelText('More options')).toBeDefined()
  })

  it('opens dropdown and calls onSelect', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<OverflowMenu items={items} onSelect={onSelect} />)
    await user.click(screen.getByLabelText('More options'))
    expect(screen.getByText('Edit')).toBeDefined()
    await user.click(screen.getByText('Edit'))
    expect(onSelect).toHaveBeenCalledWith('edit')
  })

  it('closes on escape', async () => {
    const user = userEvent.setup()
    render(<OverflowMenu items={items} onSelect={() => {}} />)
    await user.click(screen.getByLabelText('More options'))
    expect(screen.getByText('Delete')).toBeDefined()
    await user.keyboard('{Escape}')
    expect(screen.queryByText('Delete')).toBeNull()
  })
})
