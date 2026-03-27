import { beforeEach, describe, expect, it } from 'vitest'

import type { ThemeState } from '../theme'
import { applyThemeToDocument, DEFAULT_THEME, loadPersistedTheme, persistTheme, resolveThemeCssVars } from '../theme'

describe('resolveThemeCssVars', () => {
  it('derives accent from primaryColor', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    expect(vars['--gds-accent']).toBeDefined()
    expect(vars['--gds-accent']).toMatch(/^#/)
  })

  it('includes fixed danger/success/warning', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    expect(vars['--gds-danger']).toBeDefined()
    expect(vars['--gds-success']).toBeDefined()
    expect(vars['--gds-warning']).toBeDefined()
  })

  it('includes font stack vars', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    expect(vars['--gds-font-sans']).toContain('Inter')
    expect(vars['--gds-font-mono']).toContain('JetBrains')
  })

  it('includes shape scale values', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    expect(vars['--gds-radius-sm']).toBe('4px')
  })

  it('includes density scale values', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    expect(vars['--gds-density-pad']).toBe('16px')
  })

  it('includes elevation scale values', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    expect(vars['--gds-shadow-sm']).toBeDefined()
    expect(vars['--gds-shadow-sm']).not.toBe('none')
  })

  it('includes glass scale values', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    expect(vars['--gds-glass-blur-md']).toBe('20px')
  })

  it('includes motion scale values', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    expect(vars['--gds-duration-fast']).toBe('100ms')
  })

  it('applies color overrides on top of derived', () => {
    const state: ThemeState = {
      ...DEFAULT_THEME,
      colorOverrides: { '--gds-accent': '#ff0000' },
    }
    const vars = resolveThemeCssVars(state, 'dark')
    expect(vars['--gds-accent']).toBe('#ff0000')
  })

  it('different primaryColor produces different accent', () => {
    const blue = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    const purple = resolveThemeCssVars({ ...DEFAULT_THEME, primaryColor: '#8b5cf6' }, 'dark')
    expect(blue['--gds-accent']).not.toBe(purple['--gds-accent'])
  })

  it('fixed colors stay same regardless of primaryColor', () => {
    const blue = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    const purple = resolveThemeCssVars({ ...DEFAULT_THEME, primaryColor: '#8b5cf6' }, 'dark')
    expect(blue['--gds-danger']).toBe(purple['--gds-danger'])
  })

  it('uses sharp shape scale when configured', () => {
    const state: ThemeState = { ...DEFAULT_THEME, shape: 'sharp' }
    const vars = resolveThemeCssVars(state, 'dark')
    expect(vars['--gds-radius-sm']).toBe('2px')
  })

  it('uses flat elevation when configured', () => {
    const state: ThemeState = { ...DEFAULT_THEME, elevation: 'flat' }
    const vars = resolveThemeCssVars(state, 'dark')
    expect(vars['--gds-shadow-sm']).toBe('none')
  })

  it('uses off glass when configured', () => {
    const state: ThemeState = { ...DEFAULT_THEME, glass: 'off' }
    const vars = resolveThemeCssVars(state, 'dark')
    expect(vars['--gds-glass-blur-md']).toBe('0px')
  })

  it('produces enough CSS vars for a complete theme', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    expect(Object.keys(vars).length).toBeGreaterThanOrEqual(40)
  })
})

describe('resolveThemeCssVars — light mode', () => {
  it('produces light palette when resolvedMode is light', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'light')
    expect(vars['--gds-accent']).toBeDefined()
    // light mode should produce different bg/surface values
    expect(vars['--gds-bg']).toBeDefined()
  })
})

describe('applyThemeToDocument', () => {
  it('sets CSS variables on document root', () => {
    const vars = { '--gds-accent': '#ff0000', '--gds-bg': '#000000' }
    const keys = applyThemeToDocument(vars, 'dark')
    expect(keys).toEqual(['--gds-accent', '--gds-bg'])
    expect(document.documentElement.style.getPropertyValue('--gds-accent')).toBe('#ff0000')
  })

  it('sets data-theme-mode attribute', () => {
    applyThemeToDocument({}, 'dark')
    expect(document.documentElement.getAttribute('data-theme-mode')).toBe('dark')
  })

  it('clears previous keys when provided', () => {
    const root = document.documentElement
    root.style.setProperty('--old-var', 'value')
    applyThemeToDocument({}, 'dark', ['--old-var'])
    expect(root.style.getPropertyValue('--old-var')).toBe('')
  })

  it('does not re-set data-theme-mode if already correct', () => {
    document.documentElement.setAttribute('data-theme-mode', 'light')
    applyThemeToDocument({}, 'light')
    expect(document.documentElement.getAttribute('data-theme-mode')).toBe('light')
  })
})

describe('persistTheme / loadPersistedTheme', () => {
  const storage = new Map<string, string>()
  const mockStorage = {
    getItem: (k: string) => storage.get(k) ?? null,
    setItem: (k: string, v: string) => storage.set(k, v),
    removeItem: (k: string) => storage.delete(k),
  }

  beforeEach(() => {
    storage.clear()
    Object.defineProperty(globalThis, 'localStorage', { value: mockStorage, writable: true })
  })

  it('round-trips theme state through localStorage', () => {
    const state: ThemeState = { ...DEFAULT_THEME, shape: 'rounded', density: 'compact' }
    persistTheme(state)
    const loaded = loadPersistedTheme()
    expect(loaded).not.toBeNull()
    expect(loaded?.shape).toBe('rounded')
    expect(loaded?.density).toBe('compact')
  })

  it('falls back to defaults for invalid values', () => {
    storage.set('gds-theme', JSON.stringify({ shape: 'invalid', mode: 'banana' }))
    const loaded = loadPersistedTheme()
    expect(loaded?.shape).toBe('default')
    expect(loaded?.mode).toBe('system')
  })

  it('returns null when nothing persisted', () => {
    storage.delete('gds-theme')
    expect(loadPersistedTheme()).toBeNull()
  })
})
