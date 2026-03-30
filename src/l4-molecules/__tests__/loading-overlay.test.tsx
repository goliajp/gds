import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LoadingOverlay } from '../loading-overlay'

describe('LoadingOverlay', () => {
  it('renders when visible', () => {
    const { container } = render(<LoadingOverlay visible />)
    expect(
      container.querySelector('[data-component="loading-overlay"]')
    ).not.toBeNull()
  })

  it('does not render when not visible', () => {
    const { container } = render(<LoadingOverlay visible={false} />)
    expect(
      container.querySelector('[data-component="loading-overlay"]')
    ).toBeNull()
  })

  it('shows message text', () => {
    render(<LoadingOverlay visible message="Loading data..." />)
    expect(screen.getByText('Loading data...')).toBeDefined()
  })

  it('renders a spinner', () => {
    const { container } = render(<LoadingOverlay visible />)
    expect(container.querySelector('[role="status"]')).not.toBeNull()
  })
})
