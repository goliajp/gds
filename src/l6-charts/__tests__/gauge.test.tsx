import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Gauge } from '../gauge'

describe('Gauge', () => {
  it('renders without crash', () => {
    const { container } = render(<Gauge value={75} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Gauge value={50} />)
    expect(container.querySelector('[data-component="gauge"]')).not.toBeNull()
  })

  it('displays the value', () => {
    render(<Gauge value={42} />)
    expect(screen.getByText('42')).toBeDefined()
  })

  it('clamps value to max', () => {
    render(<Gauge max={100} value={150} />)
    expect(screen.getByText('100')).toBeDefined()
  })

  it('displays label when provided', () => {
    render(<Gauge label="Score" value={80} />)
    expect(screen.getByText('Score')).toBeDefined()
  })

  it('merges className', () => {
    const { container } = render(<Gauge className="custom-class" value={50} />)
    const el = container.querySelector('[data-component="gauge"]')
    expect(el?.className).toContain('custom-class')
  })
})
