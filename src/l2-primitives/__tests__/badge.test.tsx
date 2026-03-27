import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge } from '../badge'

describe('Badge', () => {
  it('renders without crash', () => {
    render(<Badge>active</Badge>)
    expect(screen.getByText('active')).toBeTruthy()
  })

  it('forwards ref to span element', () => {
    let el: HTMLSpanElement | null = null
    render(<Badge ref={(node) => { el = node }}>tag</Badge>)
    expect(el).toBeInstanceOf(HTMLSpanElement)
  })

  it('has data-component="badge"', () => {
    render(<Badge>tag</Badge>)
    expect(screen.getByText('tag').getAttribute('data-component')).toBe('badge')
  })

  it('has data-variant defaulting to "default"', () => {
    render(<Badge>tag</Badge>)
    expect(screen.getByText('tag').getAttribute('data-variant')).toBe('default')
  })

  it('sets data-variant to specified variant', () => {
    render(<Badge variant="success">ok</Badge>)
    expect(screen.getByText('ok').getAttribute('data-variant')).toBe('success')
  })

  it('merges className', () => {
    render(<Badge className="custom-cls">tag</Badge>)
    expect(screen.getByText('tag').className).toContain('custom-cls')
  })

  it('renders count when count > 0', () => {
    render(<Badge count={5} />)
    expect(screen.getByText('5')).toBeTruthy()
    expect(screen.getByText('5').getAttribute('data-variant')).toBe('count')
  })

  it('renders capped count with max', () => {
    render(<Badge count={150} countMax={99} />)
    expect(screen.getByText('99+')).toBeTruthy()
  })

  it('returns null when count <= 0', () => {
    const { container } = render(<Badge count={0} />)
    expect(container.innerHTML).toBe('')
  })

  it('returns null when count is negative', () => {
    const { container } = render(<Badge count={-1} />)
    expect(container.innerHTML).toBe('')
  })

  it('shows dot indicator when dot prop is true', () => {
    const { container } = render(<Badge dot>status</Badge>)
    const dot = container.querySelector('.gds-radius-badge.h-1\\.5')
    expect(dot).toBeTruthy()
  })

  it('does not show dot when dot is not set', () => {
    const { container } = render(<Badge>status</Badge>)
    const dot = container.querySelector('.h-1\\.5.w-1\\.5')
    expect(dot).toBeNull()
  })

  it('applies glass styles', () => {
    render(<Badge glass>tag</Badge>)
    expect(screen.getByText('tag').className).toContain('gds-glass')
  })

  it('applies danger variant classes', () => {
    render(<Badge variant="danger">err</Badge>)
    expect(screen.getByText('err').className).toContain('text-danger')
  })

  it('applies warning variant classes', () => {
    render(<Badge variant="warning">warn</Badge>)
    expect(screen.getByText('warn').className).toContain('text-warning')
  })

  it('applies palette variant', () => {
    render(<Badge variant="palette-3">p3</Badge>)
    expect(screen.getByText('p3').getAttribute('data-variant')).toBe('palette-3')
  })
})
