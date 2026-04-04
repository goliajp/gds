import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FieldGroup } from '../field-group'

describe('FieldGroup', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(
      <FieldGroup>
        <input />
      </FieldGroup>
    )
    expect(
      container.querySelector('[data-component="field-group"]')
    ).not.toBeNull()
  })

  it('renders children', () => {
    render(
      <FieldGroup>
        <span>Field content</span>
      </FieldGroup>
    )
    expect(screen.getByText('Field content')).toBeDefined()
  })

  it('does not render title when title is undefined', () => {
    const { container } = render(
      <FieldGroup>
        <input />
      </FieldGroup>
    )
    const legend = container.querySelector('legend')
    expect(legend).toBeNull()
  })

  it('renders title as legend when provided', () => {
    render(
      <FieldGroup title="Personal Info">
        <input />
      </FieldGroup>
    )
    expect(screen.getByText('Personal Info')).toBeDefined()
  })

  it('does not render description when title is undefined even if description is set', () => {
    render(
      <FieldGroup description="desc">
        <input />
      </FieldGroup>
    )
    expect(screen.queryByText('desc')).toBeNull()
  })

  it('renders description when both title and description are provided', () => {
    render(
      <FieldGroup title="Info" description="Fill in details">
        <input />
      </FieldGroup>
    )
    expect(screen.getByText('Fill in details')).toBeDefined()
  })

  it('does not render description when title is set but description is undefined', () => {
    const { container } = render(
      <FieldGroup title="Info">
        <input />
      </FieldGroup>
    )
    const descEl = container.querySelector('p')
    expect(descEl).toBeNull()
  })

  it('uses 1-column grid by default', () => {
    const { container } = render(
      <FieldGroup>
        <input />
      </FieldGroup>
    )
    const grid = container.querySelector('.grid')
    expect(grid?.className).toContain('grid-cols-1')
    expect(grid?.className).not.toContain('md:grid-cols-2')
  })

  it('uses 2-column grid when columns=2', () => {
    const { container } = render(
      <FieldGroup columns={2}>
        <input />
      </FieldGroup>
    )
    const grid = container.querySelector('.grid')
    expect(grid?.className).toContain('md:grid-cols-2')
  })

  it('uses 3-column grid when columns=3', () => {
    const { container } = render(
      <FieldGroup columns={3}>
        <input />
      </FieldGroup>
    )
    const grid = container.querySelector('.grid')
    expect(grid?.className).toContain('lg:grid-cols-3')
  })

  it('applies custom className', () => {
    const { container } = render(
      <FieldGroup className="my-cls">
        <input />
      </FieldGroup>
    )
    const el = container.querySelector('[data-component="field-group"]')
    expect(el?.className).toContain('my-cls')
  })
})
