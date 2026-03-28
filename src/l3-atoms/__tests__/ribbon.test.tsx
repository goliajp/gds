import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Ribbon } from '../ribbon'

describe('Ribbon', () => {
  it('has data-component="ribbon"', () => {
    const { container } = render(<Ribbon label="NEW"><div>content</div></Ribbon>)
    expect(container.querySelector('[data-component="ribbon"]')).not.toBeNull()
  })

  it('renders the label text', () => {
    render(<Ribbon label="SALE"><div>content</div></Ribbon>)
    expect(screen.getByText('SALE')).toBeDefined()
  })

  it('renders children', () => {
    render(<Ribbon label="BETA"><div>child content</div></Ribbon>)
    expect(screen.getByText('child content')).toBeDefined()
  })

  it('positions ribbon on top-right by default (rotate-45)', () => {
    const { container } = render(<Ribbon label="NEW"><div>c</div></Ribbon>)
    const ribbon = container.querySelector('[data-component="ribbon"] > div')
    expect(ribbon?.className).toContain('rotate-45')
    expect(ribbon?.className).toContain('-right-6')
  })

  it('positions ribbon on top-left when position is set', () => {
    const { container } = render(<Ribbon label="NEW" position="top-left"><div>c</div></Ribbon>)
    const ribbon = container.querySelector('[data-component="ribbon"] > div')
    expect(ribbon?.className).toContain('-rotate-45')
    expect(ribbon?.className).toContain('-left-6')
  })

  it('applies variant colors', () => {
    const { container: c1 } = render(<Ribbon label="X" variant="danger"><div>c</div></Ribbon>)
    const r1 = c1.querySelector('[data-component="ribbon"] > div')
    expect(r1?.className).toContain('bg-danger')

    const { container: c2 } = render(<Ribbon label="X" variant="success"><div>c</div></Ribbon>)
    const r2 = c2.querySelector('[data-component="ribbon"] > div')
    expect(r2?.className).toContain('bg-success')

    const { container: c3 } = render(<Ribbon label="X" variant="warning"><div>c</div></Ribbon>)
    const r3 = c3.querySelector('[data-component="ribbon"] > div')
    expect(r3?.className).toContain('bg-warning')
  })
})
