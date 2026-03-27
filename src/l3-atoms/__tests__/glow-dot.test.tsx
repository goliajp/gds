import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GlowDot } from '../glow-dot'

describe('GlowDot', () => {
  it('renders with data-component', () => {
    const { container } = render(<GlowDot />)
    expect(container.querySelector('[data-component="glow-dot"]')).not.toBeNull()
  })

  it('applies color variant as data-variant', () => {
    const { container } = render(<GlowDot color="danger" />)
    expect(container.querySelector('[data-variant="danger"]')).not.toBeNull()
  })

  it('defaults to accent color', () => {
    const { container } = render(<GlowDot />)
    expect(container.querySelector('[data-variant="accent"]')).not.toBeNull()
  })
})
