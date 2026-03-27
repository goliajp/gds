import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CountBadge } from '../count-badge'

describe('CountBadge', () => {
  it('renders the count value', () => {
    render(<CountBadge count={5} />)
    expect(screen.getByText('5')).toBeDefined()
  })

  it('shows max+ when count exceeds max', () => {
    render(<CountBadge count={150} max={99} />)
    expect(screen.getByText('99+')).toBeDefined()
  })

  it('applies variant data attribute', () => {
    const { container } = render(<CountBadge count={3} variant="success" />)
    const el = container.querySelector('[data-component="count-badge"]')
    expect(el?.getAttribute('data-variant')).toBe('success')
  })
})
