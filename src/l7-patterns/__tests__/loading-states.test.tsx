import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LoadingStates } from '../loading-states'

describe('LoadingStates', () => {
  it('renders page variant', () => {
    const { container } = render(<LoadingStates variant="page" />)
    const el = container.querySelector('[data-component="loading-states"]')
    expect(el).not.toBeNull()
    expect(el?.getAttribute('data-variant')).toBe('page')
  })

  it('renders inline variant', () => {
    const { container } = render(<LoadingStates variant="inline" />)
    const el = container.querySelector('[data-component="loading-states"]')
    expect(el?.getAttribute('data-variant')).toBe('inline')
  })

  it('renders button variant', () => {
    const { container } = render(<LoadingStates variant="button" />)
    const el = container.querySelector('[data-component="loading-states"]')
    expect(el?.getAttribute('data-variant')).toBe('button')
  })

  it('shows message text', () => {
    const { container } = render(<LoadingStates variant="page" message="Please wait..." />)
    expect(container.textContent).toContain('Please wait...')
  })
})
