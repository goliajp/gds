import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { NavItem } from '../nav-item'

describe('NavItem', () => {
  it('renders with data-component', () => {
    const { container } = render(<NavItem label="Dashboard" />)
    expect(
      container.querySelector('[data-component="nav-item"]')
    ).not.toBeNull()
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

  it('shows icon when provided', () => {
    render(<NavItem label="Home" icon={<span data-testid="icon">🏠</span>} />)
    expect(screen.getByTestId('icon')).toBeDefined()
  })

  it('does not render icon when not provided', () => {
    const { container } = render(<NavItem label="Home" />)
    const button = container.querySelector('[data-component="nav-item"]')!
    const iconSpans = button.querySelectorAll(':scope > span.shrink-0')
    expect(iconSpans.length).toBe(0)
  })

  it('applies active state styling', () => {
    const { container } = render(<NavItem label="Active" active />)
    const el = container.querySelector('[data-component="nav-item"]')
    expect(el?.getAttribute('data-state')).toBe('active')
    expect(el?.className).toContain('bg-accent/10')
  })

  it('applies inactive state styling', () => {
    const { container } = render(<NavItem label="Inactive" />)
    const el = container.querySelector('[data-component="nav-item"]')
    expect(el?.className).toContain('text-fg-muted')
    expect(el?.getAttribute('data-state')).toBeNull()
  })

  it('hides label text when collapsed', () => {
    render(<NavItem label="Dashboard" collapsed />)
    // label should not be rendered in collapsed mode
    expect(screen.queryByText('Dashboard')).toBeNull()
  })

  it('shows title attribute when collapsed', () => {
    const { container } = render(<NavItem label="Dashboard" collapsed />)
    const el = container.querySelector('[data-component="nav-item"]')
    expect(el?.getAttribute('title')).toBe('Dashboard')
  })

  it('does not show title when not collapsed', () => {
    const { container } = render(<NavItem label="Dashboard" />)
    const el = container.querySelector('[data-component="nav-item"]')
    expect(el?.getAttribute('title')).toBeNull()
  })

  it('shows "99+" for badge > 99', () => {
    render(<NavItem label="Inbox" badge={150} />)
    expect(screen.getByText('99+')).toBeDefined()
  })

  it('does not show badge when count is 0', () => {
    render(<NavItem label="Inbox" badge={0} />)
    expect(screen.queryByText('0')).toBeNull()
  })

  it('does not show badge when undefined', () => {
    const { container } = render(<NavItem label="Inbox" />)
    const badges = container.querySelectorAll('.rounded-full')
    expect(badges.length).toBe(0)
  })
})
