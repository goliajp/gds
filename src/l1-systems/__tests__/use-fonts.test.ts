import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { useFonts } from '../use-fonts'

describe('useFonts', () => {
  afterEach(() => {
    // cleanup injected elements
    document.querySelectorAll('[data-gds]').forEach((el) => el.remove())
    const marker = document.getElementById('gds-cjk-fonts')
    if (marker !== null) marker.remove()
  })

  it('injects CJK font stylesheet link', () => {
    renderHook(() => useFonts())
    const link = document.getElementById('gds-cjk-fonts')
    expect(link).not.toBeNull()
    expect(link?.getAttribute('rel')).toBe('stylesheet')
    expect(link?.getAttribute('href')).toContain('fonts.googleapis.com')
  })

  it('injects preconnect links', () => {
    renderHook(() => useFonts())
    const preconnects = document.querySelectorAll('[data-gds="font-preconnect"]')
    expect(preconnects.length).toBe(2)
  })

  it('does not inject twice on re-render', () => {
    const { rerender } = renderHook(() => useFonts())
    rerender()
    const links = document.querySelectorAll('#gds-cjk-fonts')
    expect(links.length).toBe(1)
  })
})
