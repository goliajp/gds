import { describe, expect, it } from 'vitest'

import { between, breakpoints, breakpointToCssVars, detectOverlap, deviceCategory, maxWidth, minWidth } from '../breakpoint-system'
import { glassParams, glassToCssVars, supportsBackdropFilter } from '../glass-system'
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

  it('sizeToCssVars falls back to default for unknown density', () => {
    const unknown = sizeToCssVars('nonexistent')
    const defaultVars = sizeToCssVars('default')
    expect(unknown['--gds-component-height']).toBe(defaultVars['--gds-component-height'])
    expect(unknown['--gds-h']).toBe(defaultVars['--gds-h'])
  })

  it('sizeToCssVars produces correct values for compact', () => {
    const vars = sizeToCssVars('compact')
    expect(vars['--gds-h-xs']).toBe('20px')
    expect(vars['--gds-h']).toBe('28px')
  })

  it('sizeToCssVars produces correct values for comfortable', () => {
    const vars = sizeToCssVars('comfortable')
    expect(vars['--gds-h-xs']).toBe('28px')
    expect(vars['--gds-h']).toBe('36px')
  })

  it('sizeToCssVars includes all density-relative scales', () => {
    const vars = sizeToCssVars('default')
    // height scale
    expect(vars['--gds-h-xs']).toBeDefined()
    expect(vars['--gds-h-xl']).toBeDefined()
    // icon scale
    expect(vars['--gds-icon-xs']).toBeDefined()
    expect(vars['--gds-icon-lg']).toBeDefined()
    // text scale
    expect(vars['--gds-text-caption']).toBeDefined()
    expect(vars['--gds-text-body']).toBeDefined()
    // gap scale
    expect(vars['--gds-gap-xs']).toBeDefined()
    expect(vars['--gds-gap-lg']).toBeDefined()
    // padding scale
    expect(vars['--gds-pad-x-sm']).toBeDefined()
    expect(vars['--gds-pad-y-lg']).toBeDefined()
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

  it('unknown shape falls back to factor 1 (same as default)', () => {
    const unknown = radiusScale('nonexistent')
    const defaultScale = radiusScale('default')
    expect(unknown.sm).toBe(defaultScale.sm)
    expect(unknown.md).toBe(defaultScale.md)
  })

  it('radiusToCssVars includes semantic aliases', () => {
    const vars = radiusToCssVars('default')
    expect(vars['--gds-radius-button']).toBe('6px')
    expect(vars['--gds-radius-input']).toBe('6px')
    expect(vars['--gds-radius-badge']).toBe('9999px')
    expect(vars['--gds-radius-card']).toBe('12px')
    expect(vars['--gds-radius-modal']).toBe('12px')
    expect(vars['--gds-radius-popover']).toBe('8px')
    expect(vars['--gds-radius-tooltip']).toBe('6px')
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

  it('unknown shadow level returns none', () => {
    expect(shadowValue('nonexistent', 'raised', 'dark')).toBe('none')
  })

  it('subtle elevation has lower opacity than raised', () => {
    const subtle = shadowValue('sm', 'subtle', 'light')
    const raised = shadowValue('sm', 'raised', 'light')
    const subtleOpacity = parseFloat(subtle.match(/\/ ([\d.]+)/)?.[1] ?? '0')
    const raisedOpacity = parseFloat(raised.match(/\/ ([\d.]+)/)?.[1] ?? '0')
    expect(subtleOpacity).toBeLessThan(raisedOpacity)
  })

  it('unknown elevation falls back to factor 1', () => {
    const unknown = shadowValue('sm', 'nonexistent', 'light')
    const raised = shadowValue('sm', 'raised', 'light')
    // both use factor 1
    expect(unknown).toBe(raised)
  })

  it('unknown mode falls back to factor 1 (same as light)', () => {
    const unknown = shadowValue('sm', 'raised', 'nonexistent')
    const light = shadowValue('sm', 'raised', 'light')
    expect(unknown).toBe(light)
  })

  it('md level produces multi-layer shadow', () => {
    const md = shadowValue('md', 'raised', 'light')
    // md has 2 shadow layers separated by comma
    expect(md.split(',').length).toBe(2)
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

  it('unknown mode falls back to 0 adjustment (same as base)', () => {
    const params = glassParams('full', 'nonexistent')
    // no adjust applied, bgOpacity is base value (0.15)
    expect(params.bgOpacity).toBe(0.15)
  })

  it('bg opacity is clamped to [0.05, 0.95]', () => {
    // off level has bgOpacity 0.95 + light adjust +0.1 = 1.05, should clamp to 0.95
    const offLight = glassParams('off', 'light')
    expect(offLight.bgOpacity).toBeLessThanOrEqual(0.95)

    // full level has bgOpacity 0.15 + dark adjust -0.05 = 0.10, should be >= 0.05
    const fullDark = glassParams('full', 'dark')
    expect(fullDark.bgOpacity).toBeGreaterThanOrEqual(0.05)
  })

  it('glassToCssVars includes all 7 variables', () => {
    const vars = glassToCssVars('subtle', 'light')
    expect(Object.keys(vars)).toHaveLength(7)
    expect(vars['--gds-glass-blur-sm']).toBeDefined()
    expect(vars['--gds-glass-blur-md']).toBeDefined()
    expect(vars['--gds-glass-blur-lg']).toBeDefined()
    expect(vars['--gds-glass-saturate-sm']).toBeDefined()
    expect(vars['--gds-glass-saturate-md']).toBeDefined()
    expect(vars['--gds-glass-saturate-lg']).toBeDefined()
    expect(vars['--gds-glass-bg-opacity']).toBeDefined()
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

  it('maxWidth generates correct media query', () => {
    expect(maxWidth('lg')).toBe('(max-width: 1023px)')
    expect(maxWidth('sm')).toBe('(max-width: 639px)')
  })

  it('breakpointToCssVars returns all breakpoints', () => {
    const vars = breakpointToCssVars()
    expect(vars['--gds-breakpoint-sm']).toBe('640px')
    expect(vars['--gds-breakpoint-md']).toBe('768px')
    expect(vars['--gds-breakpoint-lg']).toBe('1024px')
    expect(vars['--gds-breakpoint-xl']).toBe('1280px')
    expect(vars['--gds-breakpoint-2xl']).toBe('1536px')
  })

  it('deviceCategory boundary: 767 is mobile, 768 is tablet', () => {
    expect(deviceCategory(767)).toBe('mobile')
    expect(deviceCategory(768)).toBe('tablet')
  })

  it('deviceCategory boundary: 1023 is tablet, 1024 is desktop', () => {
    expect(deviceCategory(1023)).toBe('tablet')
    expect(deviceCategory(1024)).toBe('desktop')
  })

  it('detectOverlap handles single entry', () => {
    expect(detectOverlap({ a: 640 })).toHaveLength(0)
  })

  it('detectOverlap handles empty input', () => {
    expect(detectOverlap({})).toHaveLength(0)
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
