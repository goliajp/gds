import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

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
  useSetThemePrimaryColor,
  useSetThemePreset,
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

describe('useSetThemeMode', () => {
  it('returns a function', () => {
    const { result } = renderHook(() => useSetThemeMode())
    expect(typeof result.current).toBe('function')
  })
})

describe('useSetThemePreset', () => {
  it('returns a function', () => {
    const { result } = renderHook(() => useSetThemePreset())
    expect(typeof result.current).toBe('function')
  })
})

describe('useSetThemePrimaryColor', () => {
  it('returns a function', () => {
    const { result } = renderHook(() => useSetThemePrimaryColor())
    expect(typeof result.current).toBe('function')
  })
})

describe('useSetThemeShape', () => {
  it('returns a function', () => {
    const { result } = renderHook(() => useSetThemeShape())
    expect(typeof result.current).toBe('function')
  })
})

describe('useSetThemeDensity', () => {
  it('returns a function', () => {
    const { result } = renderHook(() => useSetThemeDensity())
    expect(typeof result.current).toBe('function')
  })
})

describe('useSetThemeElevation', () => {
  it('returns a function', () => {
    const { result } = renderHook(() => useSetThemeElevation())
    expect(typeof result.current).toBe('function')
  })
})

describe('useSetThemeGlass', () => {
  it('returns a function', () => {
    const { result } = renderHook(() => useSetThemeGlass())
    expect(typeof result.current).toBe('function')
  })
})

describe('useSetThemeMotion', () => {
  it('returns a function', () => {
    const { result } = renderHook(() => useSetThemeMotion())
    expect(typeof result.current).toBe('function')
  })
})

describe('useSetThemeColors', () => {
  it('returns a function', () => {
    const { result } = renderHook(() => useSetThemeColors())
    expect(typeof result.current).toBe('function')
  })
})

describe('useResetTheme', () => {
  it('returns a function', () => {
    const { result } = renderHook(() => useResetTheme())
    expect(typeof result.current).toBe('function')
  })
})

describe('useThemeEffect', () => {
  it('runs without error', () => {
    expect(() => {
      renderHook(() => useThemeEffect())
    }).not.toThrow()
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
