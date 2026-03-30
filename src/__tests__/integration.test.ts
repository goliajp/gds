import { describe, expect, it } from 'vitest'

import {
  deriveDarkPalette,
  deriveLightPalette,
  paletteToVars,
} from '../l0-tokens/color-derive'
import { contrastRatio, hexToRgb } from '../l0-tokens/color-math'
import { generateDefaultCssVars } from '../l0-tokens/generate-defaults'
import { DEFAULT_THEME, resolveThemeCssVars } from '../l1-systems/theme'

describe('L0→L1 integration', () => {
  it('generateDefaultCssVars produces ≥50 variables', () => {
    const dark = generateDefaultCssVars('dark')
    const light = generateDefaultCssVars('light')
    expect(Object.keys(dark).length).toBeGreaterThanOrEqual(50)
    expect(Object.keys(light).length).toBeGreaterThanOrEqual(50)
  })

  it('resolveThemeCssVars produces all required color vars', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    const required = [
      '--gds-accent',
      '--gds-accent-hover',
      '--gds-accent-fg',
      '--gds-danger',
      '--gds-warning',
      '--gds-success',
    ]
    for (const key of required) {
      expect(vars[key]).toBeDefined()
    }
  })

  it('resolveThemeCssVars produces all required axis vars', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    expect(vars['--gds-radius-sm']).toBeDefined()
    expect(vars['--gds-shadow-sm']).toBeDefined()
    expect(vars['--gds-glass-blur-md']).toBeDefined()
    expect(vars['--gds-duration-fast']).toBeDefined()
    expect(vars['--gds-component-height']).toBeDefined()
  })

  it('resolveThemeCssVars produces font vars', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    expect(vars['--gds-font-sans']).toContain('Inter')
    expect(vars['--gds-font-mono']).toContain('JetBrains')
    expect(vars['--gds-font-flex']).toContain('Roboto')
  })

  it('resolveThemeCssVars includes 10-color palette', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    for (let i = 0; i < 10; i++) {
      expect(vars[`--gds-palette-${i}`]).toBeDefined()
    }
  })
})

describe('color derivation round-trip', () => {
  const testColors = ['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899']

  it('derived accent always has readable text (≥3:1 contrast)', () => {
    for (const color of testColors) {
      const dark = deriveDarkPalette(color)
      const light = deriveLightPalette(color)
      const darkContrast = contrastRatio(
        hexToRgb(dark.accentFg),
        hexToRgb(dark.accent)
      )
      const lightContrast = contrastRatio(
        hexToRgb(light.accentFg),
        hexToRgb(light.accent)
      )
      expect(darkContrast).toBeGreaterThanOrEqual(3)
      expect(lightContrast).toBeGreaterThanOrEqual(3)
    }
  })

  it('fixed colors stay constant across all primaryColors', () => {
    const results = testColors.map((c) =>
      paletteToVars(deriveDarkPalette(c), 'dark')
    )
    const danger = results[0]['--gds-danger']
    for (const r of results) {
      expect(r['--gds-danger']).toBe(danger)
      expect(r['--gds-success']).toBeDefined()
      expect(r['--gds-warning']).toBeDefined()
    }
  })

  it('different primaryColors produce different accents', () => {
    const accents = testColors.map(
      (c) => paletteToVars(deriveDarkPalette(c), 'dark')['--gds-accent']
    )
    const unique = new Set(accents)
    expect(unique.size).toBe(testColors.length)
  })
})

describe('generateDefaultCssVars vs resolveThemeCssVars consistency', () => {
  it('produce the same set of keys', () => {
    const generated = generateDefaultCssVars('dark')
    const resolved = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    const genKeys = new Set(Object.keys(generated))
    const resKeys = new Set(Object.keys(resolved))
    // resolved should have at least all the keys generated has
    for (const key of genKeys) {
      expect(resKeys.has(key)).toBe(true)
    }
  })
})
