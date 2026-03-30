import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MiniDashboard } from '../mini-dashboard'

describe('MiniDashboard', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<MiniDashboard>Content</MiniDashboard>)
    expect(
      container.querySelector('[data-component="mini-dashboard"]')
    ).not.toBeNull()
  })

  it('renders title when provided', () => {
    render(<MiniDashboard title="Overview">Content</MiniDashboard>)
    expect(screen.getByText('Overview')).toBeDefined()
  })

  it('renders children', () => {
    render(<MiniDashboard>Dashboard body</MiniDashboard>)
    expect(screen.getByText('Dashboard body')).toBeDefined()
  })

  it('applies gds-ctx class for depth system', () => {
    const { container } = render(<MiniDashboard>Content</MiniDashboard>)
    const el = container.querySelector('[data-component="mini-dashboard"]')
    expect(el?.className).toContain('gds-ctx')
  })

  it('applies glass classes when glass is true', () => {
    const { container } = render(<MiniDashboard glass>Content</MiniDashboard>)
    const el = container.querySelector('[data-component="mini-dashboard"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('applies surface background when glass is false', () => {
    const { container } = render(<MiniDashboard>Content</MiniDashboard>)
    const el = container.querySelector('[data-component="mini-dashboard"]')
    expect(el?.className).toContain('bg-surface')
  })

  it('does not render title when not provided', () => {
    const { container } = render(<MiniDashboard>Content</MiniDashboard>)
    expect(container.querySelector('h2')).toBeNull()
  })
})
