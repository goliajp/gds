import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner } from '../spinner'

describe('Spinner', () => {
  it('renders without crash', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('forwards ref to svg element', () => {
    let el: SVGSVGElement | null = null
    render(
      <Spinner
        ref={(node) => {
          el = node
        }}
      />
    )
    expect(el).toBeTruthy()
    expect(el!.tagName.toLowerCase()).toBe('svg')
  })

  it('has data-component attribute', () => {
    render(<Spinner />)
    expect(screen.getByRole('status').getAttribute('data-component')).toBe(
      'spinner'
    )
  })

  it('has role="status"', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('merges className', () => {
    render(<Spinner className="custom-class" />)
    expect(screen.getByRole('status').getAttribute('class')).toContain(
      'custom-class'
    )
  })

  it('applies sm size variant', () => {
    render(<Spinner size="sm" />)
    expect(screen.getByRole('status').getAttribute('class')).toContain(
      'gds-icon-sm'
    )
  })

  it('applies lg size variant', () => {
    render(<Spinner size="lg" />)
    expect(screen.getByRole('status').getAttribute('class')).toContain(
      'gds-icon-lg'
    )
  })

  it('applies default size variant', () => {
    render(<Spinner />)
    expect(screen.getByRole('status').getAttribute('class')).toContain(
      'gds-icon'
    )
  })
})
