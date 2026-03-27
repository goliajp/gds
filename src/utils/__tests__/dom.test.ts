import { describe, expect, it } from 'vitest'

import { clamp, isActivationKey, uid } from '../dom'

describe('clamp', () => {
  it('clamps below min', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  it('clamps above max', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('returns value within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })
})

describe('isActivationKey', () => {
  it('returns true for Enter', () => {
    expect(isActivationKey({ key: 'Enter' } as any)).toBe(true)
  })

  it('returns true for Space', () => {
    expect(isActivationKey({ key: ' ' } as any)).toBe(true)
  })

  it('returns false for other keys', () => {
    expect(isActivationKey({ key: 'Escape' } as any)).toBe(false)
  })
})

describe('uid', () => {
  it('generates unique ids', () => {
    const a = uid()
    const b = uid()
    expect(a).not.toBe(b)
  })

  it('supports custom prefix', () => {
    expect(uid('test')).toMatch(/^test-/)
  })
})
