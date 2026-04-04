import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SkeletonGroup } from '../skeleton-group'

describe('SkeletonGroup', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<SkeletonGroup />)
    expect(
      container.querySelector('[data-component="skeleton-group"]')
    ).not.toBeNull()
  })

  it('renders correct variant attribute', () => {
    const { container } = render(<SkeletonGroup variant="card" />)
    expect(container.querySelector('[data-variant="card"]')).not.toBeNull()
  })

  it('renders multiple items when count is set', () => {
    const { container } = render(
      <SkeletonGroup variant="form-field" count={3} />
    )
    const group = container.querySelector('[data-component="skeleton-group"]')
    expect(group?.children.length).toBe(3)
  })
})
