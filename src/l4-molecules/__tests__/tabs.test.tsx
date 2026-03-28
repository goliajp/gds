import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Tabs } from '../tabs'

describe('Tabs', () => {
  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'security', label: 'Security', count: 3 },
    { id: 'billing', label: 'Billing' },
  ]

  it('renders without crash', () => {
    const { container } = render(
      <Tabs tabs={tabs} active="general" onChange={vi.fn()} />,
    )
    expect(container.querySelector('[data-component="tabs"]')).not.toBeNull()
  })

  it('has role="tablist"', () => {
    render(<Tabs tabs={tabs} active="general" onChange={vi.fn()} />)
    expect(screen.getByRole('tablist')).toBeDefined()
  })

  it('renders all tab labels', () => {
    render(<Tabs tabs={tabs} active="general" onChange={vi.fn()} />)
    expect(screen.getByText('General')).toBeDefined()
    expect(screen.getByText('Security')).toBeDefined()
    expect(screen.getByText('Billing')).toBeDefined()
  })

  it('marks active tab with aria-selected', () => {
    render(<Tabs tabs={tabs} active="security" onChange={vi.fn()} />)
    const allTabs = screen.getAllByRole('tab')
    const secTab = allTabs.find((t) => t.textContent?.includes('Security'))
    expect(secTab?.getAttribute('aria-selected')).toBe('true')
  })

  it('renders count badge', () => {
    render(<Tabs tabs={tabs} active="general" onChange={vi.fn()} />)
    expect(screen.getByText('3')).toBeDefined()
  })

  it('calls onChange when tab clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Tabs tabs={tabs} active="general" onChange={onChange} />)
    await user.click(screen.getByText('Billing'))
    expect(onChange).toHaveBeenCalledWith('billing')
  })

  it('applies glass styling when glass is true', () => {
    const { container } = render(
      <Tabs tabs={tabs} active="general" onChange={vi.fn()} glass />,
    )
    const el = container.querySelector('[data-component="tabs"]')
    expect(el?.className).toContain('bg-bg/60')
    expect(el?.className).toContain('gds-glass')
  })

  it('does not apply glass styling when glass is not set', () => {
    const { container } = render(
      <Tabs tabs={tabs} active="general" onChange={vi.fn()} />,
    )
    const el = container.querySelector('[data-component="tabs"]')
    expect(el?.className).not.toContain('bg-bg/60')
  })

  it('uses sm size variant', () => {
    const { container } = render(
      <Tabs tabs={tabs} active="general" onChange={vi.fn()} size="sm" />,
    )
    const tabButtons = container.querySelectorAll('[role="tab"]')
    expect(tabButtons[0]?.className).toContain('gds-pad-x-sm')
  })
})
