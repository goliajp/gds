import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FieldSet } from '../field-set'

describe('FieldSet', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<FieldSet legend="Group"><input /></FieldSet>)
    expect(container.querySelector('[data-component="field-set"]')).not.toBeNull()
  })

  it('renders legend text', () => {
    render(<FieldSet legend="Contact Info"><input /></FieldSet>)
    expect(screen.getByText('Contact Info')).toBeDefined()
  })

  it('renders children', () => {
    render(<FieldSet legend="G"><span>Child content</span></FieldSet>)
    expect(screen.getByText('Child content')).toBeDefined()
  })

  it('is not disabled by default', () => {
    const { container } = render(<FieldSet legend="G"><input /></FieldSet>)
    const fieldset = container.querySelector('fieldset')
    expect(fieldset?.hasAttribute('disabled')).toBe(false)
  })

  it('is disabled when disabled prop is true', () => {
    const { container } = render(<FieldSet legend="G" disabled><input /></FieldSet>)
    const fieldset = container.querySelector('fieldset')
    expect(fieldset?.hasAttribute('disabled')).toBe(true)
  })

  it('applies opacity class when disabled', () => {
    const { container } = render(<FieldSet legend="G" disabled><input /></FieldSet>)
    const el = container.querySelector('[data-component="field-set"]')
    expect(el?.className).toContain('opacity-50')
  })

  it('does not apply opacity class when not disabled', () => {
    const { container } = render(<FieldSet legend="G"><input /></FieldSet>)
    const el = container.querySelector('[data-component="field-set"]')
    expect(el?.className).not.toContain('opacity-50')
  })

  it('applies custom className', () => {
    const { container } = render(<FieldSet legend="G" className="my-cls"><input /></FieldSet>)
    const el = container.querySelector('[data-component="field-set"]')
    expect(el?.className).toContain('my-cls')
  })
})
