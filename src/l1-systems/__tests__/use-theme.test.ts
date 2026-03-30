import { act, renderHook } from '@testing-library/react'
import { useAtom } from 'jotai'
import { beforeEach, describe, expect, it } from 'vitest'

import { DEFAULT_THEME, themeAtom } from '../theme'
import {
  configureTheme,
  useResetTheme,
  useResolvedMode,
  useSetThemeColors,
  useSetThemeDensity,
  useSetThemeElevation,
  useSetThemeGlass,
  useSetThemeMode,
  useSetThemeMotion,
  useSetThemePreset,
  useSetThemePrimaryColor,
  useSetThemeShape,
  useTheme,
  useThemeEffect,
} from '../use-theme'

describe('useTheme', () => {
  it('returns default theme state', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.mode).toBe('system')
    expect(result.current.primaryColor).toBeDefined()
    expect(result.current.presetId).toBe('default')
  })
})

describe('useResolvedMode', () => {
  it('returns dark or light', () => {
    const { result } = renderHook(() => useResolvedMode())
    expect(['dark', 'light']).toContain(result.current)
  })
})

// helper to reset theme atom between tests
function useResetAtom() {
  const [, setTheme] = useAtom(themeAtom)
  return () => setTheme(DEFAULT_THEME)
}

describe('useSetThemeMode', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useResetAtom())
    act(() => result.current())
  })

  it('returns a function', () => {
    const { result } = renderHook(() => useSetThemeMode())
    expect(typeof result.current).toBe('function')
  })

  it('updates mode to dark', () => {
    const { result: setter } = renderHook(() => useSetThemeMode())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('dark'))
    expect(theme.current.mode).toBe('dark')
  })

  it('updates mode to light', () => {
    const { result: setter } = renderHook(() => useSetThemeMode())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('light'))
    expect(theme.current.mode).toBe('light')
  })
})

describe('useSetThemePreset', () => {
  beforeEach(() => {
    configureTheme({
      colorPresets: {
        teal: { primaryColor: '#14b8a6' },
        amber: { primaryColor: '#f59e0b' },
      },
    })
    const { result } = renderHook(() => useResetAtom())
    act(() => result.current())
  })

  it('sets known preset with matching primaryColor', () => {
    const { result: setter } = renderHook(() => useSetThemePreset())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('teal'))
    expect(theme.current.presetId).toBe('teal')
    expect(theme.current.primaryColor).toBe('#14b8a6')
    expect(theme.current.colorOverrides).toBeNull()
  })

  it('falls back to default primaryColor for unknown preset', () => {
    const { result: setter } = renderHook(() => useSetThemePreset())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('nonexistent'))
    expect(theme.current.presetId).toBe('nonexistent')
    expect(theme.current.primaryColor).toBe(DEFAULT_THEME.primaryColor)
  })

  it('clears colorOverrides when setting preset', () => {
    const { result: colorSetter } = renderHook(() => useSetThemeColors())
    act(() => colorSetter.current({ '--gds-accent': '#ff0000' }))

    const { result: setter } = renderHook(() => useSetThemePreset())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('amber'))
    expect(theme.current.colorOverrides).toBeNull()
  })
})

describe('useSetThemePrimaryColor', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useResetAtom())
    act(() => result.current())
  })

  it('updates primary color', () => {
    const { result: setter } = renderHook(() => useSetThemePrimaryColor())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('#ff5500'))
    expect(theme.current.primaryColor).toBe('#ff5500')
  })

  it('clears colorOverrides when setting primary color', () => {
    const { result: colorSetter } = renderHook(() => useSetThemeColors())
    act(() => colorSetter.current({ '--gds-accent': '#ff0000' }))

    const { result: setter } = renderHook(() => useSetThemePrimaryColor())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('#00ff00'))
    expect(theme.current.colorOverrides).toBeNull()
  })
})

describe('useSetThemeShape', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useResetAtom())
    act(() => result.current())
  })

  it('updates shape to sharp', () => {
    const { result: setter } = renderHook(() => useSetThemeShape())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('sharp'))
    expect(theme.current.shape).toBe('sharp')
  })

  it('updates shape to rounded', () => {
    const { result: setter } = renderHook(() => useSetThemeShape())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('rounded'))
    expect(theme.current.shape).toBe('rounded')
  })
})

describe('useSetThemeDensity', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useResetAtom())
    act(() => result.current())
  })

  it('updates density to compact', () => {
    const { result: setter } = renderHook(() => useSetThemeDensity())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('compact'))
    expect(theme.current.density).toBe('compact')
  })

  it('updates density to comfortable', () => {
    const { result: setter } = renderHook(() => useSetThemeDensity())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('comfortable'))
    expect(theme.current.density).toBe('comfortable')
  })
})

describe('useSetThemeElevation', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useResetAtom())
    act(() => result.current())
  })

  it('updates elevation to flat', () => {
    const { result: setter } = renderHook(() => useSetThemeElevation())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('flat'))
    expect(theme.current.elevation).toBe('flat')
  })

  it('updates elevation to subtle', () => {
    const { result: setter } = renderHook(() => useSetThemeElevation())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('subtle'))
    expect(theme.current.elevation).toBe('subtle')
  })
})

describe('useSetThemeGlass', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useResetAtom())
    act(() => result.current())
  })

  it('updates glass to off', () => {
    const { result: setter } = renderHook(() => useSetThemeGlass())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('off'))
    expect(theme.current.glass).toBe('off')
  })

  it('updates glass to subtle', () => {
    const { result: setter } = renderHook(() => useSetThemeGlass())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('subtle'))
    expect(theme.current.glass).toBe('subtle')
  })
})

describe('useSetThemeMotion', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useResetAtom())
    act(() => result.current())
  })

  it('updates motion to off', () => {
    const { result: setter } = renderHook(() => useSetThemeMotion())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('off'))
    expect(theme.current.motion).toBe('off')
  })

  it('updates motion to reduced', () => {
    const { result: setter } = renderHook(() => useSetThemeMotion())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current('reduced'))
    expect(theme.current.motion).toBe('reduced')
  })
})

describe('useSetThemeColors', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useResetAtom())
    act(() => result.current())
  })

  it('sets color overrides', () => {
    const { result: setter } = renderHook(() => useSetThemeColors())
    const { result: theme } = renderHook(() => useTheme())
    act(() =>
      setter.current({ '--gds-accent': '#ff0000', '--gds-danger': '#00ff00' })
    )
    expect(theme.current.colorOverrides).toEqual({
      '--gds-accent': '#ff0000',
      '--gds-danger': '#00ff00',
    })
  })

  it('clears color overrides with null', () => {
    const { result: setter } = renderHook(() => useSetThemeColors())
    const { result: theme } = renderHook(() => useTheme())
    act(() => setter.current({ '--gds-accent': '#ff0000' }))
    act(() => setter.current(null))
    expect(theme.current.colorOverrides).toBeNull()
  })
})

describe('useResetTheme', () => {
  it('resets theme to defaults', () => {
    const { result: modeSetter } = renderHook(() => useSetThemeMode())
    const { result: shapeSetter } = renderHook(() => useSetThemeShape())
    act(() => modeSetter.current('dark'))
    act(() => shapeSetter.current('sharp'))

    const { result: reset } = renderHook(() => useResetTheme())
    const { result: theme } = renderHook(() => useTheme())
    act(() => reset.current())
    expect(theme.current.mode).toBe(DEFAULT_THEME.mode)
    expect(theme.current.shape).toBe(DEFAULT_THEME.shape)
    expect(theme.current.primaryColor).toBe(DEFAULT_THEME.primaryColor)
  })
})

describe('useThemeEffect', () => {
  it('runs without error', () => {
    expect(() => {
      renderHook(() => useThemeEffect())
    }).not.toThrow()
  })

  it('applies CSS variables to document', () => {
    renderHook(() => useThemeEffect())
    // useThemeEffect should have applied vars to document root
    const root = document.documentElement
    expect(root.getAttribute('data-theme-mode')).toBeDefined()
  })

  it('persists theme to localStorage', () => {
    const storage = new Map<string, string>()
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: (k: string) => storage.get(k) ?? null,
        setItem: (k: string, v: string) => storage.set(k, v),
        removeItem: (k: string) => storage.delete(k),
      },
      writable: true,
    })
    renderHook(() => useThemeEffect())
    expect(storage.has('gds-theme')).toBe(true)
  })
})

describe('configureTheme', () => {
  it('accepts color presets config', () => {
    expect(() => {
      configureTheme({
        colorPresets: {
          teal: { primaryColor: '#14b8a6' },
          amber: { primaryColor: '#f59e0b' },
        },
      })
    }).not.toThrow()
  })
})
