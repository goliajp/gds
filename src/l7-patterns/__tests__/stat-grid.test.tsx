import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StatGrid } from '../stat-grid'

describe('StatGrid', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(
      <StatGrid>
        <div>A</div>
      </StatGrid>
    )
    expect(
      container.querySelector('[data-component="stat-grid"]')
    ).not.toBeNull()
  })

  it('renders children', () => {
    render(
      <StatGrid>
        <span>Child 1</span>
        <span>Child 2</span>
      </StatGrid>
    )
    expect(screen.getByText('Child 1')).toBeDefined()
    expect(screen.getByText('Child 2')).toBeDefined()
  })

  it('applies correct grid columns', () => {
    const { container } = render(
      <StatGrid columns={4}>
        <div>A</div>
      </StatGrid>
    )
    const el = container.querySelector('[data-component="stat-grid"]')
    expect(el?.className).toContain('grid-cols-4')
  })

  it('defaults to 3 columns', () => {
    const { container } = render(
      <StatGrid>
        <div>A</div>
      </StatGrid>
    )
    const el = container.querySelector('[data-component="stat-grid"]')
    expect(el?.className).toContain('grid-cols-3')
  })
})
