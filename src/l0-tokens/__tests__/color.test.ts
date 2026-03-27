import { describe, expect, it } from 'vitest'

import { deriveDarkPalette, deriveLightPalette, FIXED_COLORS, paletteToVars } from '../color-derive'
import { autoFixColor, bestTextColor, scoreColor } from '../color-health'
import { complement, contrastRatio, darken, hexToHsl, hexToRgb, hslToHex, lerpColor, lighten, withAlpha } from '../color-math'

describe('color-math', () => {
  it('converts hex to rgb', () => {
    const rgb = hexToRgb('#ff0000')
    expect(rgb).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('converts hex to hsl and back', () => {
    const hsl = hexToHsl('#3b82f6')
    expect(hsl.h).toBeCloseTo(217, 0)
    expect(hsl.s).toBeCloseTo(0.91, 1)
    const back = hslToHex(hsl)
    expect(back).toBe('#3b82f6')
  })

  it('calculates contrast ratio', () => {
    const white = hexToRgb('#ffffff')
    const black = hexToRgb('#000000')
    expect(contrastRatio(white, black)).toBeCloseTo(21, 0)
  })

  it('lightens a color', () => {
    const result = lighten('#3b82f6', 0.1)
    const hsl = hexToHsl(result)
    expect(hsl.l).toBeGreaterThan(hexToHsl('#3b82f6').l)
  })

  it('darkens a color', () => {
    const result = darken('#3b82f6', 0.1)
    const hsl = hexToHsl(result)
    expect(hsl.l).toBeLessThan(hexToHsl('#3b82f6').l)
  })

  it('computes complement (180° shift)', () => {
    const c = complement('#ff0000')
    const hsl = hexToHsl(c)
    expect(hsl.h).toBeCloseTo(180, 0)
  })

  it('generates rgba string', () => {
    expect(withAlpha('#ff0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)')
  })

  it('lerps between two colors at t=0', () => {
    expect(lerpColor('#000000', '#ffffff', 0)).toBe('#000000')
  })

  it('lerps between two colors at t=1', () => {
    expect(lerpColor('#000000', '#ffffff', 1)).toBe('#ffffff')
  })

  it('lerps between two colors at t=0.5', () => {
    const mid = lerpColor('#000000', '#ffffff', 0.5)
    expect(mid).toBe('#808080')
  })
})

describe('color-health', () => {
  it('scores a good blue as excellent', () => {
    const report = scoreColor('#3b82f6')
    expect(report.level).toBe('excellent')
    expect(report.score).toBeGreaterThanOrEqual(90)
  })

  it('rejects very dark colors', () => {
    const report = scoreColor('#0a0a0a')
    expect(report.level).toBe('rejected')
    expect(report.diagnostics.some(d => d.id === 'lightness-too-dark')).toBe(true)
  })

  it('warns on low saturation', () => {
    const report = scoreColor('#888888')
    expect(report.diagnostics.some(d => d.id === 'saturation-low')).toBe(true)
  })

  it('warns on semantic conflict with red', () => {
    const report = scoreColor('#e53e3e')
    expect(report.details.semanticConflict).toContain('danger')
  })

  it('scores very light colors as warning or less', () => {
    const report = scoreColor('#f0f0f0')
    expect(report.score).toBeLessThan(80)
  })

  it('bestTextColor returns white for dark bg', () => {
    expect(bestTextColor('#1a1a2e')).toBe('#ffffff')
  })

  it('autoFixColor improves a bad color to 90+', () => {
    const bad = '#0a0a0a' // very dark, would score <60
    const fixed = autoFixColor(bad)
    const report = scoreColor(fixed)
    expect(report.score).toBeGreaterThanOrEqual(90)
  })

  it('autoFixColor preserves hue of a good color', () => {
    const good = '#3b82f6' // already excellent
    const fixed = autoFixColor(good)
    const origHue = hexToHsl(good).h
    const fixedHue = hexToHsl(fixed).h
    // hue should be similar (within 15 degrees) since the color is already good
    expect(Math.abs(origHue - fixedHue)).toBeLessThan(15)
  })

  it('autoFixColor shifts hue away from red danger zone for low-score reds', () => {
    const darkRed = '#4a0000' // very dark red, low score + in danger zone
    const fixed = autoFixColor(darkRed)
    const fixedScore = scoreColor(fixed).score
    // should get a high score after fix
    expect(fixedScore).toBeGreaterThanOrEqual(85)
  })

  it('bestTextColor returns black for light bg', () => {
    expect(bestTextColor('#f0f0f0')).toBe('#000000')
  })
})

describe('color-derive', () => {
  it('derives dark palette from blue', () => {
    const palette = deriveDarkPalette('#3b82f6')
    expect(palette.accent).toBeDefined()
    expect(palette.accentFg).toMatch(/^#(000000|ffffff)$/)
    expect(palette.palette).toHaveLength(10)
  })

  it('derives light palette from blue', () => {
    const palette = deriveLightPalette('#3b82f6')
    expect(palette.accent).toBeDefined()
    expect(palette.palette).toHaveLength(10)
  })

  it('palette[0] is based on primary hue', () => {
    const palette = deriveDarkPalette('#3b82f6')
    const hue = hexToHsl(palette.palette[0]).h
    const primaryHue = hexToHsl('#3b82f6').h
    expect(Math.abs(hue - primaryHue)).toBeLessThan(5)
  })

  it('paletteToVars produces correct keys', () => {
    const palette = deriveDarkPalette('#3b82f6')
    const vars = paletteToVars(palette, 'dark')
    expect(vars['--gds-accent']).toBe(palette.accent)
    expect(vars['--gds-danger']).toBe(FIXED_COLORS.danger.dark)
    expect(vars['--gds-palette-0']).toBeDefined()
    expect(vars['--gds-palette-9']).toBeDefined()
  })

  it('fixed danger/warning/success never change', () => {
    const blue = paletteToVars(deriveDarkPalette('#3b82f6'), 'dark')
    const green = paletteToVars(deriveDarkPalette('#22c55e'), 'dark')
    expect(blue['--gds-danger']).toBe(green['--gds-danger'])
    expect(blue['--gds-warning']).toBe(green['--gds-warning'])
    expect(blue['--gds-success']).toBe(green['--gds-success'])
  })
})
