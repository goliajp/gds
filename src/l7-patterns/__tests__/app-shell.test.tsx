import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useIsMobile } from '../../utils/hooks'

vi.mock('../../utils/hooks', async () => {
  const actual = await vi.importActual('../../utils/hooks')
  return { ...actual, useIsMobile: vi.fn(() => false) }
})

import { AppShell } from '../app-shell'

describe('AppShell', () => {
  it('renders with data-component="app-shell"', () => {
    const { container } = render(<AppShell>content</AppShell>)
    expect(
      container.querySelector('[data-component="app-shell"]')
    ).not.toBeNull()
  })

  it('renders children in content area', () => {
    render(
      <AppShell>
        <p>Main content</p>
      </AppShell>
    )
    expect(screen.getByText('Main content')).toBeDefined()
  })

  it('renders sidebar when provided', () => {
    render(<AppShell sidebar={<nav>Sidebar</nav>}>content</AppShell>)
    expect(screen.getByText('Sidebar')).toBeDefined()
  })

  it('hides sidebar on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue(true)
    render(<AppShell sidebar={<nav>Sidebar</nav>}>content</AppShell>)
    expect(screen.queryByText('Sidebar')).toBeNull()
    vi.mocked(useIsMobile).mockReturnValue(false)
  })

  it('renders statusBar on desktop, hides on mobile', () => {
    const { unmount } = render(
      <AppShell statusBar={<div>Status</div>}>content</AppShell>
    )
    expect(screen.getByText('Status')).toBeDefined()
    unmount()

    vi.mocked(useIsMobile).mockReturnValue(true)
    render(<AppShell statusBar={<div>Status</div>}>content</AppShell>)
    expect(screen.queryByText('Status')).toBeNull()
    vi.mocked(useIsMobile).mockReturnValue(false)
  })

  it('renders mobileNav on mobile, hides on desktop', () => {
    render(<AppShell mobileNav={<div>MobileNav</div>}>content</AppShell>)
    expect(screen.queryByText('MobileNav')).toBeNull()

    vi.mocked(useIsMobile).mockReturnValue(true)
    const { container } = render(
      <AppShell mobileNav={<div>MobileNav</div>}>content</AppShell>
    )
    expect(screen.getByText('MobileNav')).toBeDefined()
    expect(
      container.querySelector('[data-component="app-shell-mobile-nav"]')
    ).not.toBeNull()
    vi.mocked(useIsMobile).mockReturnValue(false)
  })

  it('applies className', () => {
    const { container } = render(
      <AppShell className="custom-class">content</AppShell>
    )
    const el = container.querySelector('[data-component="app-shell"]')
    expect(el?.className).toContain('custom-class')
  })
})
