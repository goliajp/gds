import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

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
})
