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

  it('renders overlay variant', () => {
    const { container } = render(<LoadingStates variant="overlay" />)
    const el = container.querySelector('[data-component="loading-states"]')
    expect(el?.getAttribute('data-variant')).toBe('overlay')
  })

  it('applies glass class on overlay variant', () => {
    const { container } = render(<LoadingStates variant="overlay" glass />)
    expect(container.innerHTML).toContain('gds-glass')
  })

  it('applies fallback bg on overlay without glass', () => {
    const { container } = render(<LoadingStates variant="overlay" />)
    expect(container.innerHTML).toContain('bg-bg/80')
  })

  it('applies glass class on page variant', () => {
    const { container } = render(<LoadingStates variant="page" glass />)
    expect(container.innerHTML).toContain('gds-glass')
  })

  it('shows default button text when no message', () => {
    const { container } = render(<LoadingStates variant="button" />)
    expect(container.textContent).toContain('Loading...')
  })

  it('shows custom message for button variant', () => {
    const { container } = render(<LoadingStates variant="button" message="Saving..." />)
    expect(container.textContent).toContain('Saving...')
  })

  it('shows inline message', () => {
    const { container } = render(<LoadingStates variant="inline" message="Loading items..." />)
    expect(container.textContent).toContain('Loading items...')
  })

  it('renders overlay message', () => {
    const { container } = render(<LoadingStates variant="overlay" message="Processing..." />)
    expect(container.textContent).toContain('Processing...')
  })
})
