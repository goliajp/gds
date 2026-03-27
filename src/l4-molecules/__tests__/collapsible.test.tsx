import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Collapsible } from '../collapsible'

describe('Collapsible', () => {
  it('renders trigger text', () => {
    render(<Collapsible trigger="Toggle me">Content</Collapsible>)
    expect(screen.getByText('Toggle me')).toBeDefined()
  })

  it('shows content when defaultOpen is true', () => {
    render(<Collapsible defaultOpen trigger="Toggle">Visible content</Collapsible>)
    expect(screen.getByText('Visible content')).toBeDefined()
  })

  it('hides content when closed', () => {
    render(<Collapsible trigger="Toggle">Hidden content</Collapsible>)
    expect(screen.queryByText('Hidden content')).toBeNull()
  })

  it('toggles content on click', async () => {
    const user = userEvent.setup()
    render(<Collapsible trigger="Toggle">Toggle content</Collapsible>)
    expect(screen.queryByText('Toggle content')).toBeNull()
    await user.click(screen.getByText('Toggle'))
    expect(screen.getByText('Toggle content')).toBeDefined()
    await user.click(screen.getByText('Toggle'))
    expect(screen.queryByText('Toggle content')).toBeNull()
  })

  it('supports controlled mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { rerender } = render(
      <Collapsible open={false} onOpenChange={onChange} trigger="Toggle">
        Controlled
      </Collapsible>,
    )
    expect(screen.queryByText('Controlled')).toBeNull()
    await user.click(screen.getByText('Toggle'))
    expect(onChange).toHaveBeenCalledWith(true)
    rerender(
      <Collapsible open={true} onOpenChange={onChange} trigger="Toggle">
        Controlled
      </Collapsible>,
    )
    expect(screen.getByText('Controlled')).toBeDefined()
  })
})
