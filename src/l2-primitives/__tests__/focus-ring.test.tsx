import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FocusRing } from '../focus-ring'

describe('FocusRing', () => {
  it('renders children', () => {
    render(
      <FocusRing>
        <button>Click me</button>
      </FocusRing>,
    )
    expect(screen.getByText('Click me')).toBeTruthy()
  })

  it('has focus-within ring class', () => {
    const { container } = render(
      <FocusRing>
        <button>Click me</button>
      </FocusRing>,
    )
    const wrapper = container.querySelector('[data-component="focus-ring"]')
    expect(wrapper).not.toBeNull()
    expect(wrapper?.className).toContain('focus-within')
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <FocusRing>
        <span>content</span>
      </FocusRing>,
    )
    expect(container.querySelector('[data-component="focus-ring"]')).not.toBeNull()
  })
})
