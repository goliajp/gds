import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Sidebar, SidebarItem } from '../sidebar'

describe('Sidebar', () => {
  it('renders children', () => {
    render(
      <Sidebar>
        <span>Nav Item</span>
      </Sidebar>
    )
    expect(screen.getByText('Nav Item')).toBeDefined()
  })

  it('uses collapsed width when collapsed', () => {
    const { container } = render(
      <Sidebar collapsed collapsedWidth={48}>
        <span>x</span>
      </Sidebar>
    )
    const el = container.querySelector(
      '[data-component="sidebar"]'
    ) as HTMLElement
    expect(el.style.width).toBe('48px')
  })

  it('uses expanded width when not collapsed', () => {
    const { container } = render(
      <Sidebar width={280}>
        <span>x</span>
      </Sidebar>
    )
    const el = container.querySelector(
      '[data-component="sidebar"]'
    ) as HTMLElement
    expect(el.style.width).toBe('280px')
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <Sidebar>
        <span>x</span>
      </Sidebar>
    )
    expect(container.querySelector('[data-component="sidebar"]')).not.toBeNull()
  })

  it('renders collapse button when onCollapse is provided', () => {
    const { container } = render(
      <Sidebar onCollapse={() => {}}>
        <span>x</span>
      </Sidebar>
    )
    expect(container.querySelector('button')).not.toBeNull()
  })

  it('does not render collapse button without onCollapse', () => {
    const { container } = render(
      <Sidebar>
        <span>x</span>
      </Sidebar>
    )
    expect(container.querySelector('button')).toBeNull()
  })

  it('calls onCollapse with toggled value on click', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    const onCollapse = vi.fn()
    const { container } = render(
      <Sidebar collapsed={false} onCollapse={onCollapse}>
        <span>x</span>
      </Sidebar>
    )
    await user.click(container.querySelector('button')!)
    expect(onCollapse).toHaveBeenCalledWith(true)
  })

  it('applies right position border', () => {
    const { container } = render(
      <Sidebar position="right">
        <span>x</span>
      </Sidebar>
    )
    const el = container.querySelector('[data-component="sidebar"]')
    expect(el?.className).toContain('border-l')
  })

  it('applies left position border by default', () => {
    const { container } = render(
      <Sidebar>
        <span>x</span>
      </Sidebar>
    )
    const el = container.querySelector('[data-component="sidebar"]')
    expect(el?.className).toContain('border-r')
  })

  it('applies glass classes when glass is true', () => {
    const { container } = render(
      <Sidebar glass>
        <span>x</span>
      </Sidebar>
    )
    const el = container.querySelector('[data-component="sidebar"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('applies surface background when glass is false', () => {
    const { container } = render(
      <Sidebar>
        <span>x</span>
      </Sidebar>
    )
    const el = container.querySelector('[data-component="sidebar"]')
    expect(el?.className).toContain('bg-surface')
  })

  it('sets data-collapsed attribute', () => {
    const { container } = render(
      <Sidebar collapsed>
        <span>x</span>
      </Sidebar>
    )
    const el = container.querySelector('[data-component="sidebar"]')
    expect(el?.getAttribute('data-collapsed')).toBe('true')
  })

  it('rotates chevron for right position', () => {
    const { container } = render(
      <Sidebar position="right" onCollapse={() => {}}>
        <span>x</span>
      </Sidebar>
    )
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('class')).toContain('rotate-180')
  })

  it('rotates chevron when collapsed', () => {
    const { container } = render(
      <Sidebar collapsed onCollapse={() => {}}>
        <span>x</span>
      </Sidebar>
    )
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('class')).toContain('rotate-180')
  })

  it('resets rotation for collapsed + right position', () => {
    const { container } = render(
      <Sidebar collapsed position="right" onCollapse={() => {}}>
        <span>x</span>
      </Sidebar>
    )
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('class')).toContain('rotate-0')
  })

  // --- v2 feature tests ---

  it('renders items from items prop', () => {
    const sidebarItems = [
      { icon: <span>I1</span>, label: 'Dashboard' },
      { icon: <span>I2</span>, label: 'Settings' },
    ]
    render(
      <Sidebar items={sidebarItems}>
        <span />
      </Sidebar>
    )
    expect(screen.getByText('Dashboard')).toBeDefined()
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('renders SidebarItem with badge when expanded', () => {
    render(
      <Sidebar>
        <SidebarItem icon={<span>IC</span>} label="Inbox" badge={42} />
      </Sidebar>
    )
    expect(screen.getByText('42')).toBeDefined()
    expect(screen.getByText('Inbox')).toBeDefined()
  })

  it('renders SidebarItem with active state', () => {
    const { container } = render(
      <Sidebar>
        <SidebarItem icon={<span>IC</span>} label="Active Item" active />
      </Sidebar>
    )
    const item = container.querySelector('[data-component="sidebar-item"]')
    expect(item?.getAttribute('data-state')).toBe('active')
    expect(item?.className).toContain('bg-accent/15')
  })

  it('renders SidebarItem as link when href is provided', () => {
    const { container } = render(
      <Sidebar>
        <SidebarItem icon={<span>IC</span>} label="Link" href="/dashboard" />
      </Sidebar>
    )
    const link = container.querySelector('a[href="/dashboard"]')
    expect(link).not.toBeNull()
  })

  it('calls onClick on SidebarItem click', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Sidebar>
        <SidebarItem
          icon={<span>IC</span>}
          label="Clickable"
          onClick={onClick}
        />
      </Sidebar>
    )
    await user.click(screen.getByText('Clickable'))
    expect(onClick).toHaveBeenCalled()
  })

  it('shows tooltip on hover when collapsed', async () => {
    const user = userEvent.setup()
    render(
      <Sidebar collapsed>
        <SidebarItem icon={<span>IC</span>} label="Tooltip Label" />
      </Sidebar>
    )
    // label should not be visible when collapsed (no truncated text span)
    expect(screen.queryByText('Tooltip Label')).toBeNull()
    // hover to show tooltip
    const item = screen.getByRole('button')
    await user.hover(item.closest('.relative')!)
    expect(screen.getByText('Tooltip Label')).toBeDefined()
  })

  it('hides label text when collapsed', () => {
    render(
      <Sidebar collapsed>
        <SidebarItem icon={<span>IC</span>} label="Hidden Label" />
      </Sidebar>
    )
    // the label span should not be rendered
    expect(screen.queryByText('Hidden Label')).toBeNull()
  })

  it('shows badge dot indicator when collapsed with badge', () => {
    const { container } = render(
      <Sidebar collapsed>
        <SidebarItem icon={<span>IC</span>} label="Badged" badge={5} />
      </Sidebar>
    )
    // should render small dot instead of full badge
    const dot = container.querySelector('.bg-danger')
    expect(dot).not.toBeNull()
  })

  it('renders zero items without crash', () => {
    render(
      <Sidebar items={[]}>
        <span />
      </Sidebar>
    )
    // should have no sidebar-item elements
    const { container } = render(
      <Sidebar>
        <span />
      </Sidebar>
    )
    expect(container.querySelector('[data-component="sidebar"]')).not.toBeNull()
  })
})
