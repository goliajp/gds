import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StatusBadge } from '../status-badge'

describe('StatusBadge', () => {
  it('has data-component="status-badge"', () => {
    const { container } = render(<StatusBadge status="active" />)
    expect(
      container.querySelector('[data-component="status-badge"]')
    ).not.toBeNull()
  })

  it('has data-state matching status', () => {
    const { container } = render(<StatusBadge status="pending" />)
    expect(container.querySelector('[data-state="pending"]')).not.toBeNull()
  })

  it('renders label when provided', () => {
    render(<StatusBadge label="Active" status="active" />)
    expect(screen.getByText('Active')).toBeDefined()
  })

  it('falls back to status as display text when no label', () => {
    render(<StatusBadge status="draft" />)
    expect(screen.getByText('draft')).toBeDefined()
  })

  it('renders icon when provided', () => {
    render(
      <StatusBadge
        icon={<span data-testid="status-icon">!</span>}
        status="error"
      />
    )
    expect(screen.getByTestId('status-icon')).toBeDefined()
  })

  it('applies glass styles when glass is true', () => {
    const { container } = render(<StatusBadge glass status="active" />)
    const el = container.querySelector('[data-component="status-badge"]')
    expect(el?.className).toContain('border')
  })

  it('renders all status types', () => {
    const statuses = [
      'active',
      'inactive',
      'pending',
      'draft',
      'error',
      'warning',
    ] as const
    for (const status of statuses) {
      const { container } = render(<StatusBadge status={status} />)
      expect(container.querySelector(`[data-state="${status}"]`)).not.toBeNull()
    }
  })

  it('renders with sm size', () => {
    const { container } = render(<StatusBadge status="active" size="sm" />)
    const el = container.querySelector('[data-component="status-badge"]')
    expect(el?.className).toContain('py-px')
  })

  it('does not render icon span when icon is not provided', () => {
    const { container } = render(<StatusBadge status="active" />)
    expect(container.querySelector('.gds-icon-child-sm')).toBeNull()
  })
})
