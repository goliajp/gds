import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { QuickAction } from '../quick-action'

describe('QuickAction', () => {
  it('renders icon', () => {
    render(<QuickAction icon={<span data-testid="icon">+</span>} onClick={() => {}} />)
    expect(screen.getByTestId('icon')).toBeDefined()
  })

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<QuickAction icon={<span>+</span>} onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('shows label when provided', () => {
    render(<QuickAction icon={<span>+</span>} label="Add" onClick={() => {}} />)
    expect(screen.getByText('Add')).toBeDefined()
  })

  it('is disabled when disabled prop is true', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<QuickAction disabled icon={<span>+</span>} onClick={onClick} />)
    const btn = screen.getByRole('button')
    expect(btn.hasAttribute('disabled')).toBe(true)
    await user.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })
})
