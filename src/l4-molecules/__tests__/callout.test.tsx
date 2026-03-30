import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Callout } from '../callout'

describe('Callout', () => {
  it('renders children', () => {
    render(<Callout>Important message</Callout>)
    expect(screen.getByText('Important message')).toBeDefined()
  })

  it('renders title when provided', () => {
    render(<Callout title="Heads up">Details here</Callout>)
    expect(screen.getByText('Heads up')).toBeDefined()
    expect(screen.getByText('Details here')).toBeDefined()
  })

  it('applies variant data attribute', () => {
    const { container } = render(
      <Callout variant="danger">Error occurred</Callout>
    )
    const el = container.querySelector('[data-component="callout"]')
    expect(el?.getAttribute('data-variant')).toBe('danger')
  })

  it('has data-component attribute', () => {
    const { container } = render(<Callout>Test</Callout>)
    expect(container.querySelector('[data-component="callout"]')).not.toBeNull()
  })
})
