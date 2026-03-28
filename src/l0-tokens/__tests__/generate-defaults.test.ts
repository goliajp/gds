import { describe, expect, it } from 'vitest'

import { DEFAULT_PRIMARY, generateDefaultCssVars } from '../generate-defaults'

describe('generate-defaults', () => {
  it('DEFAULT_PRIMARY is a valid hex color', () => {
    expect(DEFAULT_PRIMARY).toMatch(/^#[0-9a-f]{6}$/)
  })

  it('generates dark mode CSS vars with all token families', () => {
    const vars = generateDefaultCssVars('dark')

    // color tokens
    expect(vars['--gds-accent']).toBeDefined()
    expect(vars['--gds-bg']).toBeDefined()
    expect(vars['--gds-fg']).toBeDefined()
    expect(vars['--gds-danger']).toBeDefined()

    // font tokens
    expect(vars['--gds-font-sans']).toBeDefined()
    expect(vars['--gds-font-mono']).toBeDefined()

    // radius tokens
    expect(vars['--gds-radius-sm']).toBeDefined()

    // size tokens
    expect(vars['--gds-component-height']).toBeDefined()

    // shadow tokens
    expect(vars['--gds-shadow-sm']).toBeDefined()
    expect(vars['--gds-shadow-sm']).not.toBe('none')

    // glass tokens
    expect(vars['--gds-glass-blur-md']).toBeDefined()

    // motion tokens
    expect(vars['--gds-duration-fast']).toBeDefined()
  })

  it('generates light mode CSS vars', () => {
    const vars = generateDefaultCssVars('light')

    // light mode specific: danger uses light variant
    expect(vars['--gds-danger']).toBeDefined()
    expect(vars['--gds-bg']).toBeDefined()

    // glass tokens present
    expect(vars['--gds-glass-bg-opacity']).toBeDefined()
  })

  it('dark and light modes produce different bg colors', () => {
    const dark = generateDefaultCssVars('dark')
    const light = generateDefaultCssVars('light')
    expect(dark['--gds-bg']).not.toBe(light['--gds-bg'])
  })

  it('dark and light modes produce different danger colors', () => {
    const dark = generateDefaultCssVars('dark')
    const light = generateDefaultCssVars('light')
    expect(dark['--gds-danger']).not.toBe(light['--gds-danger'])
  })
})
