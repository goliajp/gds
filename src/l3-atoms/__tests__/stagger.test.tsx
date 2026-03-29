import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Stagger } from '../stagger'

describe('Stagger', () => {
  it('renders without crash', () => {
    const { container } = render(<Stagger>{[<span key="a">A</span>, <span key="b">B</span>]}</Stagger>)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Stagger>{[<span key="a">A</span>]}</Stagger>)
    expect(container.querySelector('[data-component="stagger"]')).not.toBeNull()
  })

  it('wraps each child in an animated div', () => {
    const { container } = render(
      <Stagger>{[<span key="a">A</span>, <span key="b">B</span>]}</Stagger>,
    )
    const stagger = container.querySelector('[data-component="stagger"]')
    expect(stagger?.children.length).toBe(2)
  })

  it('renders children content', () => {
    render(<Stagger>{[<span key="a">Hello</span>, <span key="b">World</span>]}</Stagger>)
    expect(screen.getByText('Hello')).toBeDefined()
    expect(screen.getByText('World')).toBeDefined()
  })
})
