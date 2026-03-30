import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TextScramble } from '../text-scramble'

describe('TextScramble', () => {
  it('renders without crash', () => {
    const { container } = render(<TextScramble text="Hello" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<TextScramble text="Hello" />)
    expect(
      container.querySelector('[data-component="text-scramble"]')
    ).not.toBeNull()
  })

  it('renders text content', () => {
    const { container } = render(<TextScramble text="Test" />)
    const el = container.querySelector('[data-component="text-scramble"]')
    expect(el?.textContent).toBeDefined()
    expect(el?.textContent?.length).toBeGreaterThan(0)
  })

  it('applies custom className', () => {
    const { container } = render(<TextScramble className="custom" text="Hi" />)
    expect(
      container.querySelector('[data-component="text-scramble"]')?.className
    ).toContain('custom')
  })
})
