import { describe, expect, it } from 'vitest'

import {
  fontFeature,
  fontPreset,
  fontStack,
  fontToCssVars,
  fontWeight,
  presetToStyle,
  symbols,
} from '../font-system'

describe('font-system', () => {
  it('has exactly 3 stacks: sans, mono, flex', () => {
    expect(Object.keys(fontStack)).toEqual(['sans', 'mono', 'flex'])
  })

  it('flex stack includes Roboto Flex', () => {
    expect(fontStack.flex).toContain('Roboto Flex')
  })

  it('sans stack includes Inter and CJK fallbacks', () => {
    expect(fontStack.sans).toContain('Inter')
    expect(fontStack.sans).toContain('Noto Sans SC')
    expect(fontStack.sans).toContain('Noto Sans JP')
    expect(fontStack.sans).toContain('Noto Sans KR')
  })

  it('mono stack includes JetBrains Mono', () => {
    expect(fontStack.mono).toContain('JetBrains Mono')
  })

  it('weights are ascending 300-700', () => {
    expect(fontWeight.light).toBe(300)
    expect(fontWeight.regular).toBe(400)
    expect(fontWeight.medium).toBe(500)
    expect(fontWeight.semibold).toBe(600)
    expect(fontWeight.bold).toBe(700)
  })

  it('tabular feature enables tnum', () => {
    expect(fontFeature.tabular).toContain('tnum')
  })

  it('symbols are short strings', () => {
    for (const val of Object.values(symbols)) {
      expect(val.length).toBeLessThanOrEqual(2)
    }
  })

  it('keyboard symbols include common modifiers', () => {
    expect(symbols.command).toBe('\u2318')
    expect(symbols.shift).toBe('\u21E7')
    expect(symbols.option).toBe('\u2325')
    expect(symbols.enter).toBe('\u23CE')
  })

  it('fontToCssVars includes all 3 stacks', () => {
    const vars = fontToCssVars()
    expect(vars['--gds-font-sans']).toContain('Inter')
    expect(vars['--gds-font-mono']).toContain('JetBrains')
    expect(vars['--gds-font-flex']).toContain('Roboto Flex')
  })
})

describe('font presets', () => {
  it('covers all use cases: heading, body, ui, code, finance, jp', () => {
    expect(fontPreset.h1).toBeDefined()
    expect(fontPreset.body).toBeDefined()
    expect(fontPreset.label).toBeDefined()
    expect(fontPreset.button).toBeDefined()
    expect(fontPreset.code).toBeDefined()
    expect(fontPreset.finance).toBeDefined()
    expect(fontPreset.price).toBeDefined()
    expect(fontPreset.jpFull).toBeDefined()
  })

  it('headings use sans stack and decreasing size', () => {
    const h1Size = parseFloat(fontPreset.h1.size)
    const h6Size = parseFloat(fontPreset.h6.size)
    expect(h1Size).toBeGreaterThan(h6Size)
    expect(fontPreset.h1.family).toBe('sans')
  })

  it('code uses mono stack', () => {
    expect(fontPreset.code.family).toBe('mono')
    expect(fontPreset.codeSmall.family).toBe('mono')
  })

  it('finance preset uses flex stack with MONO variation', () => {
    expect(fontPreset.finance.family).toBe('flex')
    expect(fontPreset.finance.variation).toContain('MONO')
  })

  it('label preset uses flex stack for equal-width UI', () => {
    expect(fontPreset.label.family).toBe('flex')
    expect(fontPreset.label.variation).toContain('MONO')
  })

  it('tableHead preset exists for table headers', () => {
    expect(fontPreset.tableHead).toBeDefined()
    expect(fontPreset.tableHead.family).toBe('flex')
  })

  it('jpFull has CJK punctuation feature', () => {
    expect(fontPreset.jpFull.features).toContain('halt')
  })

  it('jpFull has wider leading for CJK readability', () => {
    expect(fontPreset.jpFull.leading).toBeGreaterThan(fontPreset.body.leading)
  })

  it('presetToStyle returns valid CSS properties with variation', () => {
    const style = presetToStyle('finance')
    expect(style.fontFamily).toContain('--gds-font-flex')
    expect(style.fontWeight).toBe(400)
    expect(style.fontVariationSettings).toContain('MONO')
  })

  it('presetToStyle omits variation for sans presets', () => {
    const style = presetToStyle('body')
    expect(style.fontVariationSettings).toBeUndefined()
  })
})
