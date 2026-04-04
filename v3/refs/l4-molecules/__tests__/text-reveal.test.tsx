import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TextReveal } from '../text-reveal'

describe('TextReveal', () => {
  it('renders without crash', () => {
    const { container } = render(<TextReveal text="Hello World" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<TextReveal text="Hello World" />)
    expect(
      container.querySelector('[data-component="text-reveal"]')
    ).not.toBeNull()
  })

  it('sets aria-label with full text', () => {
    const { container } = render(<TextReveal text="Hello World" />)
    expect(container.querySelector('[aria-label="Hello World"]')).not.toBeNull()
  })

  it('splits text by word by default', () => {
    const { container } = render(<TextReveal text="Hello World" />)
    const spans = container.querySelectorAll(
      '[data-component="text-reveal"] > span'
    )
    expect(spans.length).toBe(2)
  })
})
