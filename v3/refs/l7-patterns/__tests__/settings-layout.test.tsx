import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SettingsLayout } from '../settings-layout'

const sections = [
  { id: 'general', label: 'General', content: <div>General settings</div> },
  { id: 'security', label: 'Security', content: <div>Security settings</div> },
  { id: 'billing', label: 'Billing', content: <div>Billing settings</div> },
]

describe('SettingsLayout', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<SettingsLayout sections={sections} />)
    expect(
      container.querySelector('[data-component="settings-layout"]')
    ).not.toBeNull()
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
    const { container } = render(
      <SettingsLayout sections={sections} className="my-settings" />
    )
    const el = container.querySelector('[data-component="settings-layout"]')
    expect(el?.className).toContain('my-settings')
  })

  it('renders nothing when active section not found', () => {
    const { container } = render(<SettingsLayout sections={[]} />)
    const content = container.querySelector(
      '[data-component="settings-layout"] > div:last-child'
    )
    expect(content?.children.length).toBe(0)
  })

  // --- v2 feature tests ---

  it('supports controlled mode with activeSection and onSectionChange', async () => {
    const user = userEvent.setup()
    const onSectionChange = vi.fn()
    const { rerender } = render(
      <SettingsLayout
        sections={sections}
        activeSection="general"
        onSectionChange={onSectionChange}
      />
    )
    expect(screen.getByText('General settings')).toBeDefined()
    await user.click(screen.getByText('Security'))
    expect(onSectionChange).toHaveBeenCalledWith('security')
    // should not change content until parent updates
    expect(screen.getByText('General settings')).toBeDefined()
    // simulate parent update
    rerender(
      <SettingsLayout
        sections={sections}
        activeSection="security"
        onSectionChange={onSectionChange}
      />
    )
    expect(screen.getByText('Security settings')).toBeDefined()
  })

  it('applies animation class when animated is true (default)', () => {
    const { container } = render(<SettingsLayout sections={sections} />)
    const content = container.querySelector(
      '[data-component="settings-layout"] > div:last-child'
    )
    expect(content?.className).toContain('animate-fade-in')
  })

  it('does not apply animation class when animated is false', () => {
    const { container } = render(
      <SettingsLayout sections={sections} animated={false} />
    )
    const content = container.querySelector(
      '[data-component="settings-layout"] > div:last-child'
    )
    expect(content?.className).not.toContain('animate-fade-in')
  })

  it('navigates with ArrowDown key', async () => {
    const user = userEvent.setup()
    render(<SettingsLayout sections={sections} />)
    const generalBtn = screen.getByText('General')
    generalBtn.focus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByText('Security settings')).toBeDefined()
  })

  it('navigates with ArrowUp key and wraps', async () => {
    const user = userEvent.setup()
    render(<SettingsLayout sections={sections} />)
    const generalBtn = screen.getByText('General')
    generalBtn.focus()
    await user.keyboard('{ArrowUp}')
    expect(screen.getByText('Billing settings')).toBeDefined()
  })

  it('applies custom navWidth', () => {
    const { container } = render(
      <SettingsLayout sections={sections} navWidth={256} />
    )
    const nav = container.querySelector('nav')
    expect(nav?.style.width).toBe('256px')
  })

  it('makes nav sticky by default', () => {
    const { container } = render(<SettingsLayout sections={sections} />)
    const nav = container.querySelector('nav')
    expect(nav?.style.position).toBe('sticky')
  })

  it('does not make nav sticky when stickyNav is false', () => {
    const { container } = render(
      <SettingsLayout sections={sections} stickyNav={false} />
    )
    const nav = container.querySelector('nav')
    expect(nav?.style.position).not.toBe('sticky')
  })

  it('calls onSectionChange in uncontrolled mode too', async () => {
    const user = userEvent.setup()
    const onSectionChange = vi.fn()
    render(
      <SettingsLayout sections={sections} onSectionChange={onSectionChange} />
    )
    await user.click(screen.getByText('Security'))
    expect(onSectionChange).toHaveBeenCalledWith('security')
    // should also switch content in uncontrolled mode
    expect(screen.getByText('Security settings')).toBeDefined()
  })
})
