import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ThemeToggle } from '../theme-toggle'

describe('ThemeToggle', () => {
  it('shows sun icon in dark mode (to switch to light)', () => {
    const { container } = render(<ThemeToggle mode="dark" onChange={vi.fn()} />)
    const btn = container.querySelector('[data-component="theme-toggle"]')!
    expect(btn.getAttribute('data-state')).toBe('dark')
    // sun icon has a circle element
    expect(btn.querySelector('circle')).not.toBeNull()
  })

  it('shows moon icon in light mode (to switch to dark)', () => {
    const { container } = render(
      <ThemeToggle mode="light" onChange={vi.fn()} />
    )
    const btn = container.querySelector('[data-component="theme-toggle"]')!
    expect(btn.getAttribute('data-state')).toBe('light')
    // moon icon has no circle element
    expect(btn.querySelector('circle')).toBeNull()
  })

  it('toggles mode on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ThemeToggle mode="dark" onChange={onChange} />)
    await user.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith('light')
  })

  it('has data-component attribute', () => {
    const { container } = render(<ThemeToggle mode="dark" onChange={vi.fn()} />)
    expect(
      container.querySelector('[data-component="theme-toggle"]')
    ).not.toBeNull()
  })

  it('toggles from light to dark on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ThemeToggle mode="light" onChange={onChange} />)
    await user.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith('dark')
  })

  it('renders with sm size', () => {
    const { container } = render(
      <ThemeToggle mode="dark" onChange={vi.fn()} size="sm" />
    )
    const btn = container.querySelector('[data-component="theme-toggle"]')
    expect(btn?.className).toContain('h-6')
  })
})
