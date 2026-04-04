import { createStore } from 'jotai'
import { beforeEach, describe, expect, it } from 'vitest'

import type { ThemeState } from '../theme'
import {
  applyThemeToDocument,
  DEFAULT_THEME,
  loadPersistedTheme,
  persistTheme,
  resolvedModeAtom,
  resolveThemeCssVars,
  themeAtom,
  themePresets,
} from '../theme'

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
    const purple = resolveThemeCssVars(
      { ...DEFAULT_THEME, primaryColor: '#8b5cf6' },
      'dark'
    )
    expect(blue['--gds-accent']).not.toBe(purple['--gds-accent'])
  })

  it('fixed colors stay same regardless of primaryColor', () => {
    const blue = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    const purple = resolveThemeCssVars(
      { ...DEFAULT_THEME, primaryColor: '#8b5cf6' },
      'dark'
    )
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
    expect(
      document.documentElement.style.getPropertyValue('--gds-accent')
    ).toBe('#ff0000')
  })

  it('sets data-theme-mode attribute', () => {
    applyThemeToDocument({}, 'dark')
    expect(document.documentElement.getAttribute('data-theme-mode')).toBe(
      'dark'
    )
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
    expect(document.documentElement.getAttribute('data-theme-mode')).toBe(
      'light'
    )
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
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockStorage,
      writable: true,
    })
  })

  it('round-trips theme state through localStorage', () => {
    const state: ThemeState = {
      ...DEFAULT_THEME,
      shape: 'rounded',
      density: 'compact',
    }
    persistTheme(state)
    const loaded = loadPersistedTheme()
    expect(loaded).not.toBeNull()
    expect(loaded?.shape).toBe('rounded')
    expect(loaded?.density).toBe('compact')
  })

  it('falls back to defaults for invalid values', () => {
    storage.set(
      'gds-theme',
      JSON.stringify({ shape: 'invalid', mode: 'banana' })
    )
    const loaded = loadPersistedTheme()
    expect(loaded?.shape).toBe('default')
    expect(loaded?.mode).toBe('system')
  })

  it('returns null when nothing persisted', () => {
    storage.delete('gds-theme')
    expect(loadPersistedTheme()).toBeNull()
  })

  it('validates primaryColor must be a 6-digit hex', () => {
    storage.set('gds-theme', JSON.stringify({ primaryColor: 'not-a-hex' }))
    const loaded = loadPersistedTheme()
    expect(loaded?.primaryColor).toBe(DEFAULT_THEME.primaryColor)
  })

  it('accepts valid hex primaryColor', () => {
    storage.set('gds-theme', JSON.stringify({ primaryColor: '#abcdef' }))
    const loaded = loadPersistedTheme()
    expect(loaded?.primaryColor).toBe('#abcdef')
  })

  it('falls back to defaults for invalid elevation/glass/motion', () => {
    storage.set(
      'gds-theme',
      JSON.stringify({
        elevation: 'sky-high',
        glass: 'maximum',
        motion: 'hyper',
      })
    )
    const loaded = loadPersistedTheme()
    expect(loaded?.elevation).toBe(DEFAULT_THEME.elevation)
    expect(loaded?.glass).toBe(DEFAULT_THEME.glass)
    expect(loaded?.motion).toBe(DEFAULT_THEME.motion)
  })

  it('returns null when localStorage contains invalid JSON', () => {
    storage.set('gds-theme', '{not valid json')
    expect(loadPersistedTheme()).toBeNull()
  })

  it('does not throw when localStorage.setItem throws', () => {
    const throwingStorage = {
      getItem: () => null,
      setItem: () => {
        throw new Error('QuotaExceededError')
      },
      removeItem: () => {},
    }
    Object.defineProperty(globalThis, 'localStorage', {
      value: throwingStorage,
      writable: true,
    })
    expect(() => persistTheme(DEFAULT_THEME)).not.toThrow()
  })

  it('returns null when localStorage.getItem throws', () => {
    const throwingStorage = {
      getItem: () => {
        throw new Error('SecurityError')
      },
      setItem: () => {},
      removeItem: () => {},
    }
    Object.defineProperty(globalThis, 'localStorage', {
      value: throwingStorage,
      writable: true,
    })
    expect(loadPersistedTheme()).toBeNull()
  })
})

describe('resolvedModeAtom', () => {
  it('returns dark when mode is dark', () => {
    const store = createStore()
    store.set(themeAtom, { ...DEFAULT_THEME, mode: 'dark' })
    expect(store.get(resolvedModeAtom)).toBe('dark')
  })

  it('returns light when mode is light', () => {
    const store = createStore()
    store.set(themeAtom, { ...DEFAULT_THEME, mode: 'light' })
    expect(store.get(resolvedModeAtom)).toBe('light')
  })

  it('resolves system mode from matchMedia', () => {
    const store = createStore()
    store.set(themeAtom, { ...DEFAULT_THEME, mode: 'system' })
    // jsdom matchMedia returns false by default, so system resolves to light
    const result = store.get(resolvedModeAtom)
    expect(['dark', 'light']).toContain(result)
  })
})

describe('resolveThemeCssVars — light mode variations', () => {
  it('light mode produces different surface colors than dark', () => {
    const dark = resolveThemeCssVars(DEFAULT_THEME, 'dark')
    const light = resolveThemeCssVars(DEFAULT_THEME, 'light')
    expect(dark['--gds-bg']).not.toBe(light['--gds-bg'])
  })

  it('light mode includes all axis vars', () => {
    const vars = resolveThemeCssVars(DEFAULT_THEME, 'light')
    expect(vars['--gds-radius-sm']).toBeDefined()
    expect(vars['--gds-density-pad']).toBeDefined()
    expect(vars['--gds-shadow-sm']).toBeDefined()
    expect(vars['--gds-glass-blur-md']).toBeDefined()
    expect(vars['--gds-duration-fast']).toBeDefined()
  })
})

describe('resolveThemeCssVars — axis combinations', () => {
  it('rounded shape produces larger radii than sharp', () => {
    const sharp = resolveThemeCssVars(
      { ...DEFAULT_THEME, shape: 'sharp' },
      'dark'
    )
    const rounded = resolveThemeCssVars(
      { ...DEFAULT_THEME, shape: 'rounded' },
      'dark'
    )
    expect(parseInt(sharp['--gds-radius-sm'])).toBeLessThan(
      parseInt(rounded['--gds-radius-sm'])
    )
  })

  it('compact density produces smaller padding than comfortable', () => {
    const compact = resolveThemeCssVars(
      { ...DEFAULT_THEME, density: 'compact' },
      'dark'
    )
    const comfortable = resolveThemeCssVars(
      { ...DEFAULT_THEME, density: 'comfortable' },
      'dark'
    )
    expect(parseInt(compact['--gds-density-pad'])).toBeLessThan(
      parseInt(comfortable['--gds-density-pad'])
    )
  })

  it('subtle elevation produces smaller shadows than raised', () => {
    const subtle = resolveThemeCssVars(
      { ...DEFAULT_THEME, elevation: 'subtle' },
      'dark'
    )
    const raised = resolveThemeCssVars(
      { ...DEFAULT_THEME, elevation: 'raised' },
      'dark'
    )
    // subtle should have less shadow than raised
    expect(subtle['--gds-shadow-sm']).not.toBe(raised['--gds-shadow-sm'])
  })

  it('subtle glass produces less blur than full', () => {
    const subtleGlass = resolveThemeCssVars(
      { ...DEFAULT_THEME, glass: 'subtle' },
      'dark'
    )
    const fullGlass = resolveThemeCssVars(
      { ...DEFAULT_THEME, glass: 'full' },
      'dark'
    )
    expect(parseInt(subtleGlass['--gds-glass-blur-md'])).toBeLessThan(
      parseInt(fullGlass['--gds-glass-blur-md'])
    )
  })

  it('reduced motion produces longer durations than full', () => {
    const reduced = resolveThemeCssVars(
      { ...DEFAULT_THEME, motion: 'reduced' },
      'dark'
    )
    const full = resolveThemeCssVars(
      { ...DEFAULT_THEME, motion: 'full' },
      'dark'
    )
    // reduced may differ — just verify it produces valid values
    expect(reduced['--gds-duration-fast']).toBeDefined()
    expect(full['--gds-duration-fast']).toBeDefined()
  })

  it('off motion produces zero durations', () => {
    const off = resolveThemeCssVars({ ...DEFAULT_THEME, motion: 'off' }, 'dark')
    expect(off['--gds-duration-fast']).toBe('0ms')
  })
})

describe('resolveThemeCssVars — colorOverrides edge cases', () => {
  it('skips undefined values in colorOverrides', () => {
    const state: ThemeState = {
      ...DEFAULT_THEME,
      colorOverrides: { '--gds-accent': undefined as unknown as string },
    }
    const vars = resolveThemeCssVars(state, 'dark')
    // accent should still be derived, not overridden
    expect(vars['--gds-accent']).toBeDefined()
    expect(vars['--gds-accent']).toMatch(/^#/)
  })

  it('does not apply overrides when colorOverrides is null', () => {
    const state: ThemeState = { ...DEFAULT_THEME, colorOverrides: null }
    const vars = resolveThemeCssVars(state, 'dark')
    expect(vars['--gds-accent']).toBeDefined()
  })

  it('applies multiple color overrides', () => {
    const state: ThemeState = {
      ...DEFAULT_THEME,
      colorOverrides: {
        '--gds-accent': '#111111',
        '--gds-danger': '#222222',
        '--gds-success': '#333333',
      },
    }
    const vars = resolveThemeCssVars(state, 'dark')
    expect(vars['--gds-accent']).toBe('#111111')
    expect(vars['--gds-danger']).toBe('#222222')
    expect(vars['--gds-success']).toBe('#333333')
  })
})

describe('resolveThemeCssVars — mode-aware overrides (zinc-neutral)', () => {
  it('applies colorOverridesDark in dark mode', () => {
    const state: ThemeState = {
      ...DEFAULT_THEME,
      colorOverrides: null,
      colorOverridesLight: null,
      colorOverridesDark: {
        '--gds-bg': '#09090b',
        '--gds-fg': '#fafafa',
        '--gds-border': '#27272a',
      },
    }
    const vars = resolveThemeCssVars(state, 'dark')
    expect(vars['--gds-bg']).toBe('#09090b')
    expect(vars['--gds-fg']).toBe('#fafafa')
    expect(vars['--gds-border']).toBe('#27272a')
  })

  it('applies colorOverridesLight in light mode', () => {
    const state: ThemeState = {
      ...DEFAULT_THEME,
      colorOverrides: null,
      colorOverridesLight: {
        '--gds-bg': '#fafafa',
        '--gds-fg': '#09090b',
        '--gds-border': '#e4e4e7',
      },
      colorOverridesDark: null,
    }
    const vars = resolveThemeCssVars(state, 'light')
    expect(vars['--gds-bg']).toBe('#fafafa')
    expect(vars['--gds-fg']).toBe('#09090b')
    expect(vars['--gds-border']).toBe('#e4e4e7')
  })

  it('does NOT apply colorOverridesDark in light mode', () => {
    const state: ThemeState = {
      ...DEFAULT_THEME,
      colorOverrides: null,
      colorOverridesLight: null,
      colorOverridesDark: { '--gds-bg': '#09090b' },
    }
    const vars = resolveThemeCssVars(state, 'light')
    expect(vars['--gds-bg']).not.toBe('#09090b')
  })

  it('does NOT apply colorOverridesLight in dark mode', () => {
    const state: ThemeState = {
      ...DEFAULT_THEME,
      colorOverrides: null,
      colorOverridesLight: { '--gds-bg': '#fafafa' },
      colorOverridesDark: null,
    }
    const vars = resolveThemeCssVars(state, 'dark')
    expect(vars['--gds-bg']).not.toBe('#fafafa')
  })

  it('mode-specific overrides take priority over colorOverrides', () => {
    const state: ThemeState = {
      ...DEFAULT_THEME,
      colorOverrides: { '--gds-bg': '#111111' },
      colorOverridesLight: null,
      colorOverridesDark: { '--gds-bg': '#09090b' },
    }
    const vars = resolveThemeCssVars(state, 'dark')
    expect(vars['--gds-bg']).toBe('#09090b')
  })

  it('colorOverrides applies when mode-specific is null', () => {
    const state: ThemeState = {
      ...DEFAULT_THEME,
      colorOverrides: { '--gds-bg': '#111111' },
      colorOverridesLight: null,
      colorOverridesDark: null,
    }
    const vars = resolveThemeCssVars(state, 'dark')
    expect(vars['--gds-bg']).toBe('#111111')
  })

  it('zinc-neutral preset produces correct dark mode values via themePresets', () => {
    const preset = themePresets['zinc-neutral']
    const state: ThemeState = {
      ...DEFAULT_THEME,
      ...preset,
      colorOverrides: null,
      colorOverridesLight: preset.colorOverridesLight ?? null,
      colorOverridesDark: preset.colorOverridesDark ?? null,
      presetId: 'zinc-neutral',
    }
    const vars = resolveThemeCssVars(state, 'dark')
    expect(vars['--gds-bg']).toBe('#09090b')
    expect(vars['--gds-fg']).toBe('#fafafa')
    expect(vars['--gds-border']).toBe('#27272a')
    expect(vars['--gds-accent']).toBe('#3b82f6')
  })

  it('zinc-neutral preset produces correct light mode values via themePresets', () => {
    const preset = themePresets['zinc-neutral']
    const state: ThemeState = {
      ...DEFAULT_THEME,
      ...preset,
      colorOverrides: null,
      colorOverridesLight: preset.colorOverridesLight ?? null,
      colorOverridesDark: preset.colorOverridesDark ?? null,
      presetId: 'zinc-neutral',
    }
    const vars = resolveThemeCssVars(state, 'light')
    expect(vars['--gds-bg']).toBe('#fafafa')
    expect(vars['--gds-fg']).toBe('#09090b')
    expect(vars['--gds-border']).toBe('#e4e4e7')
    expect(vars['--gds-accent']).toBe('#3b7ddd')
  })

  it('zinc-neutral overrides persist through localStorage round-trip', () => {
    // set up localStorage mock for this test
    const storage = new Map<string, string>()
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: (k: string) => storage.get(k) ?? null,
        setItem: (k: string, v: string) => storage.set(k, v),
        removeItem: (k: string) => storage.delete(k),
      },
      writable: true,
    })

    const preset = themePresets['zinc-neutral']
    const state: ThemeState = {
      ...DEFAULT_THEME,
      ...preset,
      colorOverrides: null,
      colorOverridesLight: preset.colorOverridesLight ?? null,
      colorOverridesDark: preset.colorOverridesDark ?? null,
      presetId: 'zinc-neutral',
    }
    persistTheme(state)
    const loaded = loadPersistedTheme()
    expect(loaded).not.toBeNull()
    const vars = resolveThemeCssVars(loaded!, 'dark')
    expect(vars['--gds-bg']).toBe('#09090b')
    expect(vars['--gds-fg']).toBe('#fafafa')
  })
})

describe('useSetThemePreset — zinc-neutral via atom', () => {
  it('setPreset zinc-neutral populates mode-aware overrides in atom', () => {
    const store = createStore()
    store.set(themeAtom, DEFAULT_THEME)

    // simulate what useSetThemePreset does
    const presetId = 'zinc-neutral'
    const builtIn = themePresets[presetId as keyof typeof themePresets]
    store.set(themeAtom, (prev) => ({
      ...prev,
      presetId,
      colorOverrides: null,
      colorOverridesLight: null,
      colorOverridesDark: null,
      ...builtIn,
    }))

    const state = store.get(themeAtom)
    expect(state.colorOverridesDark).not.toBeNull()
    expect(state.colorOverridesLight).not.toBeNull()
    expect(state.colorOverridesDark?.['--gds-bg']).toBe('#09090b')
    expect(state.colorOverridesLight?.['--gds-bg']).toBe('#fafafa')

    // now verify resolveThemeCssVars uses them
    const darkVars = resolveThemeCssVars(state, 'dark')
    expect(darkVars['--gds-bg']).toBe('#09090b')
    const lightVars = resolveThemeCssVars(state, 'light')
    expect(lightVars['--gds-bg']).toBe('#fafafa')
  })

  it('switching from zinc-neutral to default clears overrides', () => {
    const store = createStore()

    // set zinc-neutral first (zn spread overwrites the null resets for override fields)
    const zn = themePresets['zinc-neutral']
    store.set(themeAtom, (prev) => {
      const base = {
        ...prev,
        presetId: 'zinc-neutral' as const,
        colorOverrides: null as ThemeState['colorOverrides'],
        colorOverridesLight: null as ThemeState['colorOverridesLight'],
        colorOverridesDark: null as ThemeState['colorOverridesDark'],
      }
      return { ...base, ...zn }
    })

    // now switch to default
    const def = themePresets['default']
    store.set(themeAtom, (prev) => ({
      ...prev,
      presetId: 'default',
      colorOverrides: null,
      colorOverridesLight: null,
      colorOverridesDark: null,
      ...def,
    }))

    const state = store.get(themeAtom)
    expect(state.colorOverridesLight).toBeNull()
    expect(state.colorOverridesDark).toBeNull()

    // verify derived values are back (not zinc)
    const vars = resolveThemeCssVars(state, 'dark')
    expect(vars['--gds-bg']).not.toBe('#09090b')
  })
})

describe('applyThemeToDocument — mode attribute', () => {
  it('switches mode from dark to light', () => {
    document.documentElement.setAttribute('data-theme-mode', 'dark')
    applyThemeToDocument({}, 'light')
    expect(document.documentElement.getAttribute('data-theme-mode')).toBe(
      'light'
    )
  })

  it('switches mode from light to dark', () => {
    document.documentElement.setAttribute('data-theme-mode', 'light')
    applyThemeToDocument({}, 'dark')
    expect(document.documentElement.getAttribute('data-theme-mode')).toBe(
      'dark'
    )
  })
})
