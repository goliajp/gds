import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FormLayout } from '../form-layout'

describe('FormLayout', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(
      <FormLayout>
        <input />
      </FormLayout>
    )
    expect(
      container.querySelector('[data-component="form-layout"]')
    ).not.toBeNull()
  })

  it('renders title and description', () => {
    render(
      <FormLayout title="Settings" description="Configure your preferences">
        <input />
      </FormLayout>
    )
    expect(screen.getByText('Settings')).toBeDefined()
    expect(screen.getByText('Configure your preferences')).toBeDefined()
  })

  it('renders actions slot', () => {
    render(
      <FormLayout actions={<button>Save</button>}>
        <input />
      </FormLayout>
    )
    expect(screen.getByText('Save')).toBeDefined()
  })

  it('renders children in body area', () => {
    render(
      <FormLayout>
        <span>Field 1</span>
      </FormLayout>
    )
    expect(screen.getByText('Field 1')).toBeDefined()
  })
})
