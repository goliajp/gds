import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { clamp, isActivationKey, mergeRefs, uid } from '../dom'

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

describe('mergeRefs', () => {
  it('calls function refs with the value', () => {
    const fn = vi.fn()
    const merged = mergeRefs(fn)
    const el = document.createElement('div')
    merged(el)
    expect(fn).toHaveBeenCalledWith(el)
  })

  it('sets object ref current', () => {
    const ref = createRef<HTMLDivElement>()
    const merged = mergeRefs(ref)
    const el = document.createElement('div')
    merged(el)
    expect(ref.current).toBe(el)
  })

  it('handles mixed function and object refs', () => {
    const fn = vi.fn()
    const ref = createRef<HTMLDivElement>()
    const merged = mergeRefs(fn, ref)
    const el = document.createElement('div')
    merged(el)
    expect(fn).toHaveBeenCalledWith(el)
    expect(ref.current).toBe(el)
  })

  it('skips undefined and null refs', () => {
    const fn = vi.fn()
    const merged = mergeRefs(undefined, null as unknown as undefined, fn)
    const el = document.createElement('div')
    merged(el)
    expect(fn).toHaveBeenCalledWith(el)
  })

  it('handles no refs', () => {
    const merged = mergeRefs<HTMLDivElement>()
    expect(() => merged(document.createElement('div'))).not.toThrow()
  })
})
