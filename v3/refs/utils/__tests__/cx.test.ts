import { describe, expect, it } from 'vitest'

import { cx } from '../cx'

describe('cx', () => {
  it('merges class names', () => {
    expect(cx('a', 'b')).toBe('a b')
  })

  it('handles conditional classes', () => {
    const show = false
    expect(cx('base', show && 'hidden', 'end')).toBe('base end')
  })

  it('deduplicates tailwind conflicts', () => {
    expect(cx('p-2', 'p-4')).toBe('p-4')
  })

  it('handles undefined and null', () => {
    expect(cx('a', undefined, null, 'b')).toBe('a b')
  })
})
