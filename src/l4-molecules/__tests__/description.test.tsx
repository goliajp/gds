import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Description } from '../description'

describe('Description', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<Description>Body text</Description>)
    expect(container.querySelector('[data-component="description"]')).not.toBeNull()
  })

  it('renders children as body text', () => {
    render(<Description>Some description</Description>)
    expect(screen.getByText('Some description')).toBeDefined()
  })

  it('does not render title when title is undefined', () => {
    const { container } = render(<Description>Body</Description>)
    const titleEl = container.querySelector('.font-medium')
    expect(titleEl).toBeNull()
  })

  it('renders title when provided', () => {
    render(<Description title="My Title">Body</Description>)
    expect(screen.getByText('My Title')).toBeDefined()
  })

  it('renders both title and body together', () => {
    render(<Description title="Title">Body content</Description>)
    expect(screen.getByText('Title')).toBeDefined()
    expect(screen.getByText('Body content')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<Description className="my-cls">Body</Description>)
    const el = container.querySelector('[data-component="description"]')
    expect(el?.className).toContain('my-cls')
  })
})
