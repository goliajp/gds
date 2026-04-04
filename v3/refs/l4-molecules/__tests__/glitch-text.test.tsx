import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GlitchText } from '../glitch-text'

describe('GlitchText', () => {
  it('renders without crash', () => {
    const { container } = render(<GlitchText text="Hello" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<GlitchText text="Hello" />)
    expect(
      container.querySelector('[data-component="glitch-text"]')
    ).not.toBeNull()
  })

  it('renders the text content', () => {
    render(<GlitchText text="Glitch" />)
    expect(screen.getByText('Glitch')).toBeDefined()
  })

  it('sets data-text attribute', () => {
    const { container } = render(<GlitchText text="Test" />)
    expect(container.querySelector('[data-text="Test"]')).not.toBeNull()
  })
})
