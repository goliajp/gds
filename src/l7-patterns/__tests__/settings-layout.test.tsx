import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { SettingsLayout } from '../settings-layout'

const sections = [
  { id: 'general', label: 'General', content: <div>General settings</div> },
  { id: 'security', label: 'Security', content: <div>Security settings</div> },
  { id: 'billing', label: 'Billing', content: <div>Billing settings</div> },
]

describe('SettingsLayout', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<SettingsLayout sections={sections} />)
    expect(container.querySelector('[data-component="settings-layout"]')).not.toBeNull()
  })

  it('renders all section labels in nav', () => {
    render(<SettingsLayout sections={sections} />)
    expect(screen.getByText('General')).toBeDefined()
    expect(screen.getByText('Security')).toBeDefined()
    expect(screen.getByText('Billing')).toBeDefined()
  })

  it('shows first section content by default', () => {
    render(<SettingsLayout sections={sections} />)
    expect(screen.getByText('General settings')).toBeDefined()
  })

  it('switches content when nav item is clicked', async () => {
    const user = userEvent.setup()
    render(<SettingsLayout sections={sections} />)
    await user.click(screen.getByText('Security'))
    expect(screen.getByText('Security settings')).toBeDefined()
  })

  it('uses defaultSection when provided', () => {
    render(<SettingsLayout sections={sections} defaultSection="billing" />)
    expect(screen.getByText('Billing settings')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<SettingsLayout sections={sections} className="my-settings" />)
    const el = container.querySelector('[data-component="settings-layout"]')
    expect(el?.className).toContain('my-settings')
  })

  it('renders nothing when active section not found', () => {
    const { container } = render(<SettingsLayout sections={[]} />)
    const content = container.querySelector('[data-component="settings-layout"] > div:last-child')
    expect(content?.children.length).toBe(0)
  })
})
