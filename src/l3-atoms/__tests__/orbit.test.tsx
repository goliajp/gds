import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Orbit } from '../orbit'

describe('Orbit', () => {
  it('renders without crash', () => {
    const { container } = render(
      <Orbit>{[<span key="a">A</span>, <span key="b">B</span>]}</Orbit>
    )
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Orbit>{[<span key="a">A</span>]}</Orbit>)
    expect(container.querySelector('[data-component="orbit"]')).not.toBeNull()
  })

  it('renders correct number of children', () => {
    const { container } = render(
      <Orbit>
        {[
          <span key="a">A</span>,
          <span key="b">B</span>,
          <span key="c">C</span>,
        ]}
      </Orbit>
    )
    const orbitEl = container.querySelector('[data-component="orbit"]')
    expect(orbitEl?.children.length).toBe(3)
  })

  it('applies custom className', () => {
    const { container } = render(
      <Orbit className="custom">{[<span key="a">A</span>]}</Orbit>
    )
    expect(
      container.querySelector('[data-component="orbit"]')?.className
    ).toContain('custom')
  })
})
