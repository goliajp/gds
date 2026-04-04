import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Blinking } from '../blinking'

describe('Blinking', () => {
  it('renders children', () => {
    render(
      <Blinking>
        <span>alert</span>
      </Blinking>
    )
    expect(screen.getByText('alert')).toBeDefined()
  })

  it('applies animation class when active', () => {
    const { container } = render(<Blinking active>dot</Blinking>)
    const el = container.querySelector('[data-component="blinking"]')
    expect(el?.className).toContain('animate-pulse')
  })

  it('does not animate when active is false', () => {
    const { container } = render(<Blinking active={false}>dot</Blinking>)
    const el = container.querySelector('[data-component="blinking"]')
    expect(el?.className).not.toContain('animate-pulse')
  })
})
