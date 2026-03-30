import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NumberFlow } from '../number-flow'

describe('NumberFlow', () => {
  it('renders without crash', () => {
    const { container } = render(<NumberFlow value={42} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<NumberFlow value={0} />)
    expect(
      container.querySelector('[data-component="number-flow"]')
    ).not.toBeNull()
  })

  it('displays the formatted value', () => {
    render(<NumberFlow value={123} />)
    expect(screen.getByText('1')).toBeDefined()
    expect(screen.getByText('2')).toBeDefined()
    expect(screen.getByText('3')).toBeDefined()
  })

  it('uses custom format function', () => {
    render(<NumberFlow format={(n) => `$${n}`} value={5} />)
    expect(screen.getByText('$')).toBeDefined()
    expect(screen.getByText('5')).toBeDefined()
  })
})
