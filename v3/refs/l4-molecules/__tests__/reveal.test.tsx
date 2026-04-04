import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Reveal } from '../reveal'

describe('Reveal', () => {
  it('renders without crash', () => {
    const { container } = render(
      <Reveal active>
        <span>Content</span>
      </Reveal>
    )
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <Reveal active>
        <span>Content</span>
      </Reveal>
    )
    expect(container.querySelector('[data-component="reveal"]')).not.toBeNull()
  })

  it('shows visible state when active', () => {
    const { container } = render(
      <Reveal active>
        <span>Content</span>
      </Reveal>
    )
    expect(container.querySelector('[data-state="visible"]')).not.toBeNull()
    expect(screen.getByText('Content')).toBeDefined()
  })

  it('shows hidden state when inactive', () => {
    const { container } = render(
      <Reveal active={false}>
        <span>Content</span>
      </Reveal>
    )
    expect(container.querySelector('[data-state="hidden"]')).not.toBeNull()
  })
})
