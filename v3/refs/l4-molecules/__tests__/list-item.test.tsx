import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ListItem } from '../list-item'

describe('ListItem', () => {
  it('renders title', () => {
    render(<ListItem title="Settings" />)
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('shows icon when provided', () => {
    render(
      <ListItem title="Profile" icon={<span data-testid="icon">★</span>} />
    )
    expect(screen.getByTestId('icon')).toBeDefined()
  })

  it('renders trailing element', () => {
    render(
      <ListItem
        title="Notifications"
        trailing={<span data-testid="trail">ON</span>}
      />
    )
    expect(screen.getByTestId('trail')).toBeDefined()
  })

  it('applies active state', () => {
    const { container } = render(<ListItem title="Active item" active />)
    const el = container.querySelector('[data-component="list-item"]')
    expect(el?.getAttribute('data-state')).toBe('active')
  })

  it('renders description when provided', () => {
    render(<ListItem title="Settings" description="Manage your preferences" />)
    expect(screen.getByText('Manage your preferences')).toBeDefined()
  })

  it('has role="button" and tabIndex=0 when onClick is provided', () => {
    const { container } = render(
      <ListItem title="Clickable" onClick={() => {}} />
    )
    const el = container.querySelector('[data-component="list-item"]')
    expect(el?.getAttribute('role')).toBe('button')
    expect(el?.getAttribute('tabindex')).toBe('0')
  })

  it('does not have role="button" without onClick', () => {
    const { container } = render(<ListItem title="Static" />)
    const el = container.querySelector('[data-component="list-item"]')
    expect(el?.getAttribute('role')).toBeNull()
    expect(el?.getAttribute('tabindex')).toBeNull()
  })

  it('calls onClick on click', () => {
    const fn = vi.fn()
    render(<ListItem title="Click me" onClick={fn} />)
    fireEvent.click(screen.getByText('Click me'))
    expect(fn).toHaveBeenCalledOnce()
  })

  it('calls onClick on Enter key', () => {
    const fn = vi.fn()
    const { container } = render(<ListItem title="Enter" onClick={fn} />)
    const el = container.querySelector('[data-component="list-item"]')!
    fireEvent.keyDown(el, { key: 'Enter' })
    expect(fn).toHaveBeenCalledOnce()
  })

  it('calls onClick on Space key', () => {
    const fn = vi.fn()
    const { container } = render(<ListItem title="Space" onClick={fn} />)
    const el = container.querySelector('[data-component="list-item"]')!
    fireEvent.keyDown(el, { key: ' ' })
    expect(fn).toHaveBeenCalledOnce()
  })

  it('does not respond to click when disabled', () => {
    const fn = vi.fn()
    const { container } = render(
      <ListItem title="Disabled" onClick={fn} disabled />
    )
    const el = container.querySelector('[data-component="list-item"]')
    expect(el?.className).toContain('pointer-events-none')
    expect(el?.getAttribute('role')).toBeNull()
  })

  it('does not render icon/trailing when undefined', () => {
    const { container } = render(<ListItem title="Simple" />)
    const el = container.querySelector('[data-component="list-item"]')
    // should only have the title div, no icon or trailing spans
    const spans = el?.querySelectorAll(':scope > span')
    expect(spans?.length).toBe(0)
  })
})
