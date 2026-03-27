import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LoadingDots } from '../loading-dots'

describe('LoadingDots', () => {
  it('has data-component="loading-dots"', () => {
    const { container } = render(<LoadingDots />)
    expect(container.querySelector('[data-component="loading-dots"]')).not.toBeNull()
  })

  it('has role="status"', () => {
    render(<LoadingDots />)
    expect(screen.getByRole('status')).toBeDefined()
  })

  it('renders 3 dots by default', () => {
    const { container } = render(<LoadingDots />)
    const root = container.querySelector('[data-component="loading-dots"]')
    const dots = root?.querySelectorAll(':scope > span')
    expect(dots?.length).toBe(3)
  })

  it('renders custom count of dots', () => {
    const { container } = render(<LoadingDots count={5} />)
    const root = container.querySelector('[data-component="loading-dots"]')
    const dots = root?.querySelectorAll(':scope > span')
    expect(dots?.length).toBe(5)
  })

  it('applies sm size variant', () => {
    const { container } = render(<LoadingDots size="sm" />)
    const root = container.querySelector('[data-component="loading-dots"]')
    const dot = root?.querySelector(':scope > span')
    expect(dot?.className).toContain('h-1')
  })

  it('applies default size variant', () => {
    const { container } = render(<LoadingDots />)
    const root = container.querySelector('[data-component="loading-dots"]')
    const dot = root?.querySelector(':scope > span')
    expect(dot?.className).toContain('h-1.5')
  })
})
