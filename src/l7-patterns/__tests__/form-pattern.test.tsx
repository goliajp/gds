import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FormPattern } from '../form-pattern'

describe('FormPattern', () => {
  it('renders title', () => {
    const { container } = render(
      <FormPattern
        title="Settings"
        sections={[{ title: 'General', fields: <div>Fields</div> }]}
      />
    )
    expect(container.textContent).toContain('Settings')
  })

  it('renders sections', () => {
    const { container } = render(
      <FormPattern
        sections={[
          { title: 'Section A', fields: <div>Fields A</div> },
          { title: 'Section B', fields: <div>Fields B</div> },
        ]}
      />
    )
    expect(container.textContent).toContain('Section A')
    expect(container.textContent).toContain('Section B')
  })

  it('renders actions', () => {
    const { container } = render(
      <FormPattern
        sections={[{ title: 'General', fields: <div>Fields</div> }]}
        actions={<button>Save</button>}
      />
    )
    expect(container.textContent).toContain('Save')
  })

  it('sets data-component attribute', () => {
    const { container } = render(
      <FormPattern
        sections={[{ title: 'General', fields: <div>Fields</div> }]}
      />
    )
    const el = container.querySelector('[data-component="form-pattern"]')
    expect(el).not.toBeNull()
  })
})
