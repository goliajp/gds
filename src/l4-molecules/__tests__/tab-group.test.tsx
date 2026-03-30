import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { TabGroup } from '../tab-group'

describe('TabGroup', () => {
  const tabs = [
    { id: 'general', label: 'General', content: <div>General content</div> },
    { id: 'security', label: 'Security', content: <div>Security content</div> },
    { id: 'billing', label: 'Billing', content: <div>Billing content</div>, disabled: true },
  ]

  it('renders tab labels', () => {
    render(<TabGroup tabs={tabs} />)
    expect(screen.getByText('General')).toBeDefined()
    expect(screen.getByText('Security')).toBeDefined()
    expect(screen.getByText('Billing')).toBeDefined()
  })

  it('shows first tab content by default', () => {
    render(<TabGroup tabs={tabs} />)
    expect(screen.getByText('General content')).toBeDefined()
    expect(screen.queryByText('Security content')).toBeNull()
  })

  it('switches content on tab click', async () => {
    const user = userEvent.setup()
    render(<TabGroup tabs={tabs} />)
    await user.click(screen.getByText('Security'))
    expect(screen.getByText('Security content')).toBeDefined()
    expect(screen.queryByText('General content')).toBeNull()
  })

  it('does not switch to disabled tab', async () => {
    const user = userEvent.setup()
    render(<TabGroup tabs={tabs} />)
    await user.click(screen.getByText('Billing'))
    // should still show general content
    expect(screen.getByText('General content')).toBeDefined()
    expect(screen.queryByText('Billing content')).toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<TabGroup tabs={tabs} />)
    expect(container.querySelector('[data-component="tab-group"]')).not.toBeNull()
  })

  it('uses defaultTab when specified', () => {
    render(<TabGroup tabs={tabs} defaultTab="security" />)
    expect(screen.getByText('Security content')).toBeDefined()
    expect(screen.queryByText('General content')).toBeNull()
  })

  it('applies glass styling when glass is true', () => {
    const { container } = render(<TabGroup tabs={tabs} glass />)
    const el = container.querySelector('[data-component="tab-group"]')
    expect(el?.className).toContain('bg-bg/60')
  })

  it('does not apply glass styling when glass is false', () => {
    const { container } = render(<TabGroup tabs={tabs} glass={false} />)
    const el = container.querySelector('[data-component="tab-group"]')
    expect(el?.className).not.toContain('bg-bg/60')
  })

  it('handles empty tabs array', () => {
    const { container } = render(<TabGroup tabs={[]} />)
    expect(container.querySelector('[data-component="tab-group"]')).not.toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(<TabGroup tabs={tabs} className="extra" />)
    const el = container.querySelector('[data-component="tab-group"]')
    expect(el?.className).toContain('extra')
  })

  // --- v2 feature tests ---

  it('supports controlled mode with activeTab and onTabChange', async () => {
    const user = userEvent.setup()
    const onTabChange = vi.fn()
    const { rerender } = render(
      <TabGroup tabs={tabs} activeTab="general" onTabChange={onTabChange} />,
    )
    expect(screen.getByText('General content')).toBeDefined()
    await user.click(screen.getByText('Security'))
    expect(onTabChange).toHaveBeenCalledWith('security')
    // content should not switch until parent updates activeTab
    expect(screen.getByText('General content')).toBeDefined()
    // simulate parent updating
    rerender(<TabGroup tabs={tabs} activeTab="security" onTabChange={onTabChange} />)
    expect(screen.getByText('Security content')).toBeDefined()
  })

  it('lazy renders only active tab content', () => {
    render(<TabGroup tabs={tabs} lazy keepMounted={false} />)
    // only the first tab content should be in the DOM
    expect(screen.getByText('General content')).toBeDefined()
    expect(screen.queryByText('Security content')).toBeNull()
  })

  it('lazy with keepMounted preserves previously rendered tabs', async () => {
    const user = userEvent.setup()
    const { container } = render(<TabGroup tabs={tabs} lazy keepMounted />)
    expect(screen.getByText('General content')).toBeDefined()
    await user.click(screen.getByText('Security'))
    // both should be in DOM (general hidden, security visible)
    const panels = container.querySelectorAll<HTMLDivElement>('[role="tabpanel"]')
    expect(panels.length).toBe(2)
    // general panel should be hidden
    const generalPanel = Array.from(panels).find(p => p.textContent === 'General content')
    expect(generalPanel?.hidden).toBe(true)
    // security panel should be visible
    const securityPanel = Array.from(panels).find(p => p.textContent === 'Security content')
    expect(securityPanel?.hidden).toBe(false)
  })

  it('does not switch to disabled tab in controlled mode', async () => {
    const user = userEvent.setup()
    const onTabChange = vi.fn()
    render(<TabGroup tabs={tabs} activeTab="general" onTabChange={onTabChange} />)
    await user.click(screen.getByText('Billing'))
    expect(onTabChange).not.toHaveBeenCalled()
  })

  it('lazy keepMounted=false unmounts previous tab content when switching', async () => {
    const user = userEvent.setup()
    render(<TabGroup tabs={tabs} lazy keepMounted={false} />)
    expect(screen.getByText('General content')).toBeDefined()
    expect(screen.queryByText('Security content')).toBeNull()
    await user.click(screen.getByText('Security'))
    expect(screen.getByText('Security content')).toBeDefined()
    // general content should be gone (not kept mounted)
    expect(screen.queryByText('General content')).toBeNull()
  })

  it('lazy keepMounted accumulates rendered tabs over time', async () => {
    const user = userEvent.setup()
    const { container } = render(<TabGroup tabs={tabs} lazy keepMounted />)
    expect(container.querySelectorAll('[role="tabpanel"]').length).toBe(1)
    await user.click(screen.getByText('Security'))
    expect(container.querySelectorAll('[role="tabpanel"]').length).toBe(2)
    // switch back to general — still 2 panels
    await user.click(screen.getByText('General'))
    expect(container.querySelectorAll('[role="tabpanel"]').length).toBe(2)
  })
})
