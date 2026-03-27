import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FormActions } from '../form-actions'

describe('FormActions', () => {
  it('renders with data-component', () => {
    const { container } = render(<FormActions onSave={() => {}} />)
    expect(container.querySelector('[data-component="form-actions"]')).not.toBeNull()
  })

  it('renders save button with custom label', () => {
    render(<FormActions onSave={() => {}} saveLabel="Submit" />)
    expect(screen.getByText('Submit')).toBeDefined()
  })

  it('shows "Saving..." when loading', () => {
    render(<FormActions loading onSave={() => {}} />)
    expect(screen.getByText('Saving...')).toBeDefined()
  })
})
