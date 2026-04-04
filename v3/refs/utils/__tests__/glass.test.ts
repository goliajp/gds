import { describe, expect, it } from 'vitest'

import { glassClass, glassSurface } from '../glass'

describe('glassClass', () => {
  it('returns empty for false', () => {
    expect(glassClass(false)).toBe('')
  })

  it('returns empty for undefined', () => {
    expect(glassClass()).toBe('')
  })

  it('returns gds-glass for true', () => {
    expect(glassClass(true)).toBe('gds-glass')
  })

  it('returns gds-glass-sm for sm', () => {
    expect(glassClass('sm')).toBe('gds-glass-sm')
  })

  it('returns gds-glass-lg for lg', () => {
    expect(glassClass('lg')).toBe('gds-glass-lg')
  })
})

describe('glassSurface', () => {
  it('returns empty for false', () => {
    expect(glassSurface(false)).toBe('')
  })

  it('includes glass class + border treatment', () => {
    const result = glassSurface(true)
    expect(result).toContain('gds-glass')
    expect(result).toContain('border-white/10')
  })

  it('sm variant', () => {
    expect(glassSurface('sm')).toContain('gds-glass-sm')
  })
})
