import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { NavItem } from '../nav-item'

describe('NavItem', () => {
  it('renders with data-component', () => {
    const { container } = render(<NavItem label="Dashboard" />)
    expect(container.querySelector('[data-component="nav-item"]')).not.toBeNull()
  })

  it('renders label text', () => {
    render(<NavItem label="Settings" />)
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('shows badge count', () => {
    render(<NavItem label="Inbox" badge={5} />)
    expect(screen.getByText('5')).toBeDefined()
  })

  it('fires onClick', () => {
    const handler = vi.fn()
    render(<NavItem label="Home" onClick={handler} />)
    fireEvent.click(screen.getByText('Home'))
    expect(handler).toHaveBeenCalledOnce()
  })
})
