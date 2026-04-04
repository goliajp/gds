import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BadgeDot } from '../badge-dot'

describe('BadgeDot', () => {
  it('renders children and dot', () => {
    const { container } = render(
      <BadgeDot>
        <span>icon</span>
      </BadgeDot>
    )
    expect(screen.getByText('icon')).toBeTruthy()
    expect(
      container.querySelector('[data-component="badge-dot"]')
    ).not.toBeNull()
    expect(container.querySelector('.bg-danger')).not.toBeNull()
  })

  it('hides dot when show is false', () => {
    const { container } = render(
      <BadgeDot show={false}>
        <span>icon</span>
      </BadgeDot>
    )
    expect(container.querySelector('.bg-danger')).toBeNull()
  })

  it('applies color variant', () => {
    const { container } = render(
      <BadgeDot color="success">
        <span>icon</span>
      </BadgeDot>
    )
    expect(container.querySelector('.bg-success')).not.toBeNull()
  })
})
