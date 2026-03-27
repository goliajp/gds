import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Sparkle } from '../sparkle'

describe('Sparkle', () => {
  it('renders children', () => {
    const { getByText } = render(<Sparkle>Star</Sparkle>)
    expect(getByText('Star')).toBeInTheDocument()
  })

  it('shows sparkle SVGs when active', () => {
    const { container } = render(<Sparkle count={4}>Hi</Sparkle>)
    const svgs = container.querySelectorAll('svg')
    expect(svgs).toHaveLength(4)
  })

  it('hides sparkles when inactive', () => {
    const { container } = render(<Sparkle active={false}>Hi</Sparkle>)
    const svgs = container.querySelectorAll('svg')
    expect(svgs).toHaveLength(0)
  })

  it('has data-component attribute', () => {
    const { container } = render(<Sparkle>Hi</Sparkle>)
    expect(container.querySelector('[data-component="sparkle"]')).toBeInTheDocument()
  })
})
