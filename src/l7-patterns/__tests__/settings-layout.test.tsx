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
})
