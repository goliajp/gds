import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { VerifiedBadge } from '../verified-badge'

describe('VerifiedBadge', () => {
  it('has data-component="verified-badge"', () => {
    const { container } = render(<VerifiedBadge />)
    expect(
      container.querySelector('[data-component="verified-badge"]')
    ).not.toBeNull()
  })

  it('renders correct variant data attribute', () => {
    const { container } = render(<VerifiedBadge variant="gold" />)
    expect(container.querySelector('[data-variant="gold"]')).not.toBeNull()
  })

  it('defaults to "default" variant', () => {
    const { container } = render(<VerifiedBadge />)
    expect(container.querySelector('[data-variant="default"]')).not.toBeNull()
  })
})
