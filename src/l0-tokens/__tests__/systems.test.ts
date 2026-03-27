import { describe, expect, it } from 'vitest'

import { between, breakpoints, detectOverlap, deviceCategory, minWidth } from '../breakpoint-system'
import { glassToCssVars, supportsBackdropFilter } from '../glass-system'
import { duration, easing, keyframePresets, motionToCssVars, springPresets } from '../motion-system'
import { radiusScale, radiusToCssVars } from '../radius-system'
import { resolveAxesToCssVars } from '../scales'
import { shadowToCssVars, shadowValue } from '../shadow-system'
import { componentHeight, densitySizeMap, iconSize, sizeToCssVars } from '../size-system'

describe('size-system', () => {
  it('component heights are multiples of 4', () => {
    for (const h of Object.values(componentHeight)) {
      expect(h % 4).toBe(0)
    }
  })

  it('icon sizes increase monotonically', () => {
    const sizes = Object.values(iconSize)
    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i]).toBeGreaterThan(sizes[i - 1])
    }
  })

  it('density tiers cover compact/default/comfortable', () => {
    expect(densitySizeMap.compact).toBeDefined()
    expect(densitySizeMap.default).toBeDefined()
    expect(densitySizeMap.comfortable).toBeDefined()
  })

  it('compact has smaller values than comfortable', () => {
    expect(densitySizeMap.compact.gap).toBeLessThan(densitySizeMap.comfortable.gap)
    expect(densitySizeMap.compact.pad).toBeLessThan(densitySizeMap.comfortable.pad)
    expect(densitySizeMap.compact.text).toBeLessThan(densitySizeMap.comfortable.text)
  })

  it('sizeToCssVars returns expected keys', () => {
    const vars = sizeToCssVars('default')
    expect(vars['--gds-component-height']).toBe('32px')
    expect(vars['--gds-icon-size']).toBe('16px')
  })
})

describe('radius-system', () => {
  it('default scale matches base values', () => {
    const scale = radiusScale('default')
    expect(scale.sm).toBe(4)
    expect(scale.md).toBe(6)
    expect(scale.lg).toBe(8)
    expect(scale.xl).toBe(12)
  })

  it('sharp scale is half of default', () => {
    const scale = radiusScale('sharp')
    expect(scale.sm).toBe(2)
    expect(scale.md).toBe(3)
    expect(scale.lg).toBe(4)
    expect(scale.xl).toBe(6)
  })

  it('rounded scale is double of default', () => {
    const scale = radiusScale('rounded')
    expect(scale.sm).toBe(8)
    expect(scale.md).toBe(12)
    expect(scale.lg).toBe(16)
    expect(scale.xl).toBe(24)
  })

  it('full is always 9999', () => {
    expect(radiusScale('sharp').full).toBe(9999)
    expect(radiusScale('default').full).toBe(9999)
    expect(radiusScale('rounded').full).toBe(9999)
  })

  it('radiusToCssVars returns px strings', () => {
    const vars = radiusToCssVars('default')
    expect(vars['--gds-radius-sm']).toBe('4px')
    expect(vars['--gds-radius-full']).toBe('9999px')
  })
})

describe('shadow-system', () => {
  it('flat elevation returns none for all levels', () => {
    expect(shadowValue('sm', 'flat', 'light')).toBe('none')
    expect(shadowValue('lg', 'flat', 'dark')).toBe('none')
  })

  it('raised has actual shadow values', () => {
    const sm = shadowValue('sm', 'raised', 'light')
    expect(sm).toContain('rgb')
    expect(sm).not.toBe('none')
  })

  it('dark mode shadows are stronger than light', () => {
    const darkSm = shadowValue('sm', 'raised', 'dark')
    const lightSm = shadowValue('sm', 'raised', 'light')
    // dark has higher opacity multiplier
    const darkOpacity = parseFloat(darkSm.match(/\/ ([\d.]+)/)?.[1] ?? '0')
    const lightOpacity = parseFloat(lightSm.match(/\/ ([\d.]+)/)?.[1] ?? '0')
    expect(darkOpacity).toBeGreaterThan(lightOpacity)
  })

  it('shadowToCssVars returns all 5 levels', () => {
    const vars = shadowToCssVars('raised', 'dark')
    expect(vars['--gds-shadow-xs']).toBeDefined()
    expect(vars['--gds-shadow-sm']).toBeDefined()
    expect(vars['--gds-shadow-md']).toBeDefined()
    expect(vars['--gds-shadow-lg']).toBeDefined()
    expect(vars['--gds-shadow-xl']).toBeDefined()
  })
})

describe('glass-system', () => {
  it('off level has 0 blur', () => {
    const vars = glassToCssVars('off', 'dark')
    expect(vars['--gds-glass-blur-md']).toBe('0px')
  })

  it('full level has maximum blur', () => {
    const vars = glassToCssVars('full', 'dark')
    expect(vars['--gds-glass-blur-lg']).toBe('40px')
  })

  it('dark mode has lower bg opacity than light', () => {
    const darkVars = glassToCssVars('full', 'dark')
    const lightVars = glassToCssVars('full', 'light')
    const darkOp = parseFloat(darkVars['--gds-glass-bg-opacity'])
    const lightOp = parseFloat(lightVars['--gds-glass-bg-opacity'])
    expect(darkOp).toBeLessThan(lightOp)
  })

  it('subtle is between off and full', () => {
    const off = glassToCssVars('off', 'dark')
    const subtle = glassToCssVars('subtle', 'dark')
    const full = glassToCssVars('full', 'dark')
    const offBlur = parseInt(off['--gds-glass-blur-md'])
    const subtleBlur = parseInt(subtle['--gds-glass-blur-md'])
    const fullBlur = parseInt(full['--gds-glass-blur-md'])
    expect(subtleBlur).toBeGreaterThan(offBlur)
    expect(subtleBlur).toBeLessThan(fullBlur)
  })

  it('supportsBackdropFilter returns boolean', () => {
    expect(typeof supportsBackdropFilter()).toBe('boolean')
  })
})

describe('motion-system', () => {
  it('off level returns 0ms for all durations', () => {
    expect(duration('fast', 'off')).toBe(0)
    expect(duration('slower', 'off')).toBe(0)
  })

  it('full level returns base × multiplier', () => {
    expect(duration('fast', 'full')).toBe(100)
    expect(duration('normal', 'full')).toBe(200)
    expect(duration('slow', 'full')).toBe(300)
    expect(duration('slower', 'full')).toBe(500)
  })

  it('reduced is half of full', () => {
    expect(duration('normal', 'reduced')).toBe(100)
    expect(duration('slow', 'reduced')).toBe(150)
  })

  it('easing presets are valid cubic-bezier', () => {
    for (const val of Object.values(easing)) {
      expect(val).toMatch(/^cubic-bezier/)
    }
  })

  it('spring presets have tension and friction', () => {
    for (const preset of Object.values(springPresets)) {
      expect(preset.tension).toBeGreaterThan(0)
      expect(preset.friction).toBeGreaterThan(0)
    }
  })

  it('keyframe presets have from and to', () => {
    for (const preset of Object.values(keyframePresets)) {
      expect(preset.from).toBeDefined()
      expect(preset.to).toBeDefined()
    }
  })

  it('motionToCssVars returns duration and easing vars', () => {
    const vars = motionToCssVars('full')
    expect(vars['--gds-duration-fast']).toBe('100ms')
    expect(vars['--gds-ease-default']).toContain('cubic-bezier')
  })
})

describe('breakpoint-system', () => {
  it('breakpoints are sorted ascending', () => {
    const values = Object.values(breakpoints)
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1])
    }
  })

  it('deviceCategory detects mobile', () => {
    expect(deviceCategory(375)).toBe('mobile')
  })

  it('deviceCategory detects tablet', () => {
    expect(deviceCategory(768)).toBe('tablet')
  })

  it('deviceCategory detects desktop', () => {
    expect(deviceCategory(1440)).toBe('desktop')
  })

  it('minWidth generates media query', () => {
    expect(minWidth('lg')).toBe('(min-width: 1024px)')
  })

  it('between generates range query', () => {
    expect(between('sm', 'lg')).toBe('(min-width: 640px) and (max-width: 1023px)')
  })

  it('detectOverlap finds duplicates', () => {
    const overlaps = detectOverlap({ a: 768, b: 768 })
    expect(overlaps).toHaveLength(1)
  })

  it('detectOverlap returns empty for valid scales', () => {
    expect(detectOverlap({ a: 640, b: 768, c: 1024 })).toHaveLength(0)
  })
})

describe('resolveAxesToCssVars (unified)', () => {
  it('produces radius + size + shadow + glass + motion vars in one call', () => {
    const vars = resolveAxesToCssVars('default', 'default', 'raised', 'full', 'full', 'dark')
    // radius
    expect(vars['--gds-radius-sm']).toBe('4px')
    // size
    expect(vars['--gds-component-height']).toBe('32px')
    // shadow
    expect(vars['--gds-shadow-sm']).toBeDefined()
    expect(vars['--gds-shadow-sm']).not.toBe('none')
    // glass
    expect(vars['--gds-glass-blur-md']).toBe('20px')
    // motion
    expect(vars['--gds-duration-fast']).toBe('100ms')
  })

  it('sharp+compact+flat+off+off produces minimal values', () => {
    const vars = resolveAxesToCssVars('sharp', 'compact', 'flat', 'off', 'off', 'light')
    expect(vars['--gds-radius-sm']).toBe('2px')
    expect(vars['--gds-shadow-md']).toBe('none')
    expect(vars['--gds-glass-blur-md']).toBe('0px')
    expect(vars['--gds-duration-fast']).toBe('0ms')
  })
})
