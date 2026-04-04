import { describe, expect, it } from 'vitest'

import { motionClass, motionClassWithSpeed } from '../motion'

describe('motionClass', () => {
  it('returns empty string for undefined', () => {
    expect(motionClass()).toBe('')
  })

  it('maps fadeIn to animate-fade-in', () => {
    expect(motionClass('fadeIn')).toBe('animate-fade-in')
  })

  it('maps scaleIn to animate-scale-in', () => {
    expect(motionClass('scaleIn')).toBe('animate-scale-in')
  })

  it('maps all 8 presets', () => {
    const presets = [
      'fadeIn',
      'fadeOut',
      'scaleIn',
      'scaleOut',
      'slideUp',
      'slideDown',
      'slideLeft',
      'slideRight',
    ]
    for (const p of presets) {
      expect(motionClass(p)).toMatch(/^animate-/)
    }
  })

  it('returns empty for unknown preset', () => {
    expect(motionClass('unknown')).toBe('')
  })
})

describe('motionClassWithSpeed', () => {
  it('adds animate-fast', () => {
    expect(motionClassWithSpeed('fadeIn', 'fast')).toBe(
      'animate-fade-in animate-fast'
    )
  })

  it('adds animate-slow', () => {
    expect(motionClassWithSpeed('scaleIn', 'slow')).toBe(
      'animate-scale-in animate-slow'
    )
  })

  it('no speed = default', () => {
    expect(motionClassWithSpeed('fadeIn')).toBe('animate-fade-in')
  })

  it('undefined motion returns empty', () => {
    expect(motionClassWithSpeed(undefined, 'fast')).toBe('')
  })
})
