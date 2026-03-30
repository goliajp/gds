import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { useIsMobile } from '../../utils/hooks'

vi.mock('../../utils/hooks', async () => {
  const actual = await vi.importActual('../../utils/hooks')
  return { ...actual, useIsMobile: vi.fn(() => false) }
})

import { AdminLayout } from '../admin-layout'

describe('AdminLayout', () => {
  it('renders with data-component', () => {
    const { container } = render(
      <AdminLayout sidebar={<nav>Menu</nav>}>Content</AdminLayout>
    )
    expect(
      container.querySelector('[data-component="admin-layout"]')
    ).not.toBeNull()
  })

  it('renders sidebar and content', () => {
    render(<AdminLayout sidebar={<nav>Side</nav>}>Main</AdminLayout>)
    expect(screen.getByText('Side')).toBeDefined()
    expect(screen.getByText('Main')).toBeDefined()
  })

  it('renders topbar when provided', () => {
    render(
      <AdminLayout sidebar={<nav>Side</nav>} topbar={<div>Top Bar</div>}>
        Main
      </AdminLayout>
    )
    expect(screen.getByText('Top Bar')).toBeDefined()
  })

  // --- v2 feature tests ---

  it('renders logo in sidebar when provided', () => {
    render(
      <AdminLayout sidebar={<nav>Side</nav>} logo={<div>My Logo</div>}>
        Main
      </AdminLayout>
    )
    expect(screen.getByText('My Logo')).toBeDefined()
  })

  it('applies custom sidebarWidth', () => {
    const { container } = render(
      <AdminLayout sidebar={<nav>Side</nav>} sidebarWidth={300}>
        Main
      </AdminLayout>
    )
    const aside = container.querySelector('aside')
    expect(aside?.style.width).toBe('300px')
  })

  it('renders collapse button when sidebarCollapsible is true', () => {
    const { container } = render(
      <AdminLayout sidebar={<nav>Side</nav>} sidebarCollapsible>
        Main
      </AdminLayout>
    )
    const collapseBtn = container.querySelector('aside button')
    expect(collapseBtn).not.toBeNull()
    expect(collapseBtn?.getAttribute('aria-label')).toBe('Collapse sidebar')
  })

  it('uses sticky topbar by default', () => {
    const { container } = render(
      <AdminLayout sidebar={<nav>Side</nav>} topbar={<div>Top</div>}>
        Main
      </AdminLayout>
    )
    const header = container.querySelector('header')
    expect(header?.className).toContain('sticky')
  })

  it('does not make topbar sticky when topbarSticky is false', () => {
    const { container } = render(
      <AdminLayout
        sidebar={<nav>Side</nav>}
        topbar={<div>Top</div>}
        topbarSticky={false}
      >
        Main
      </AdminLayout>
    )
    const header = container.querySelector('header')
    expect(header?.className).not.toContain('sticky')
  })

  it('applies custom topbarHeight', () => {
    const { container } = render(
      <AdminLayout
        sidebar={<nav>Side</nav>}
        topbar={<div>Top</div>}
        topbarHeight={64}
      >
        Main
      </AdminLayout>
    )
    const header = container.querySelector('header')
    expect(header?.style.height).toBe('64px')
  })

  it('renders with sidebarDefaultCollapsed', () => {
    const { container } = render(
      <AdminLayout sidebar={<nav>Side</nav>} sidebarDefaultCollapsed>
        Main
      </AdminLayout>
    )
    const aside = container.querySelector('aside')
    // collapsed width is default 56px
    expect(aside?.style.width).toBe('56px')
  })

  it('applies custom className', () => {
    const { container } = render(
      <AdminLayout sidebar={<nav>Side</nav>} className="my-admin">
        Main
      </AdminLayout>
    )
    const el = container.querySelector('[data-component="admin-layout"]')
    expect(el?.className).toContain('my-admin')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(
      <AdminLayout sidebar={<nav>Side</nav>} ref={ref}>
        Main
      </AdminLayout>
    )
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('admin-layout')
  })

  // --- mobile drawer tests ---

  it('renders hamburger button on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue(true)
    render(<AdminLayout sidebar={<nav>Mobile Nav</nav>}>Content</AdminLayout>)
    expect(screen.getByLabelText('Open sidebar menu')).toBeDefined()
    vi.mocked(useIsMobile).mockReturnValue(false)
  })

  it('does not render aside on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue(true)
    const { container } = render(
      <AdminLayout sidebar={<nav>Side</nav>}>Content</AdminLayout>
    )
    expect(container.querySelector('aside')).toBeNull()
    vi.mocked(useIsMobile).mockReturnValue(false)
  })

  it('opens mobile drawer when hamburger is clicked', async () => {
    vi.mocked(useIsMobile).mockReturnValue(true)
    const user = userEvent.setup()
    render(<AdminLayout sidebar={<nav>Drawer Nav</nav>}>Content</AdminLayout>)
    await user.click(screen.getByLabelText('Open sidebar menu'))
    // Sheet should now be open and sidebar content visible inside it
    expect(screen.getByText('Drawer Nav')).toBeDefined()
    vi.mocked(useIsMobile).mockReturnValue(false)
  })

  it('does not render hamburger on desktop', () => {
    vi.mocked(useIsMobile).mockReturnValue(false)
    render(<AdminLayout sidebar={<nav>Side</nav>}>Content</AdminLayout>)
    expect(screen.queryByLabelText('Open sidebar menu')).toBeNull()
  })

  it('disables mobile drawer when mobileDrawer is false', () => {
    vi.mocked(useIsMobile).mockReturnValue(true)
    const { container } = render(
      <AdminLayout sidebar={<nav>Side</nav>} mobileDrawer={false}>
        Content
      </AdminLayout>
    )
    // should render aside even on mobile when mobileDrawer is disabled
    expect(container.querySelector('aside')).not.toBeNull()
    expect(screen.queryByLabelText('Open sidebar menu')).toBeNull()
    vi.mocked(useIsMobile).mockReturnValue(false)
  })
})
