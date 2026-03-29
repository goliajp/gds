import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FeatureFlag } from '../feature-flag'

describe('FeatureFlag', () => {
  it('renders without crash', () => {
    const { container } = render(<FeatureFlag name="Dark Mode" enabled />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<FeatureFlag name="Dark Mode" enabled />)
    expect(container.querySelector('[data-component="feature-flag"]')).not.toBeNull()
  })

  it('shows ON when enabled', () => {
    const { container } = render(<FeatureFlag name="Feature" enabled />)
    expect(screen.getByText('ON')).toBeDefined()
    expect(container.querySelector('[data-state="enabled"]')).not.toBeNull()
  })

  it('shows OFF when disabled', () => {
    const { container } = render(<FeatureFlag name="Feature" enabled={false} />)
    expect(screen.getByText('OFF')).toBeDefined()
    expect(container.querySelector('[data-state="disabled"]')).not.toBeNull()
  })
})
