import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SkeletonPattern } from '../skeleton-pattern'

describe('SkeletonPattern', () => {
  it('renders card variant', () => {
    const { container } = render(<SkeletonPattern variant="card" />)
    const el = container.querySelector('[data-component="skeleton-pattern"]')
    expect(el).not.toBeNull()
    expect(el?.getAttribute('data-variant')).toBe('card')
  })

  it('renders list with count', () => {
    const { container } = render(<SkeletonPattern variant="list" count={3} />)
    const el = container.querySelector('[data-component="skeleton-pattern"]')
    expect(el?.getAttribute('data-variant')).toBe('list')
    // 3 list rows, each with a circle skeleton
    const circles = el?.querySelectorAll('[data-variant="circle"]')
    expect(circles?.length).toBe(3)
  })

  it('renders profile variant', () => {
    const { container } = render(<SkeletonPattern variant="profile" />)
    const el = container.querySelector('[data-component="skeleton-pattern"]')
    expect(el?.getAttribute('data-variant')).toBe('profile')
  })

  it('renders table variant', () => {
    const { container } = render(<SkeletonPattern variant="table" count={2} />)
    const el = container.querySelector('[data-component="skeleton-pattern"]')
    expect(el?.getAttribute('data-variant')).toBe('table')
  })
})
