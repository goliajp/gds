import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { QuickLinks } from '../quick-links'

describe('QuickLinks', () => {
  it('renders all link labels', () => {
    render(<QuickLinks links={[
      { label: 'Dashboard' },
      { label: 'Settings' },
    ]} />)
    expect(screen.getByText('Dashboard')).toBeDefined()
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('renders anchor when href is provided', () => {
    const { container } = render(<QuickLinks links={[
      { label: 'Home', href: '/home' },
    ]} />)
    const anchor = container.querySelector('a')
    expect(anchor?.getAttribute('href')).toBe('/home')
  })

  it('calls onClick handler', async () => {
    const user = userEvent.setup()
    const handler = vi.fn()
    render(<QuickLinks links={[
      { label: 'Action', onClick: handler },
    ]} />)
    await user.click(screen.getByText('Action'))
    expect(handler).toHaveBeenCalledOnce()
  })
})
