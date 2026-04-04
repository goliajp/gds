// L1 — theme hooks
// components use these to read/write theme state
// all changes go through constrained API — no raw CSS manipulation

import { useAtom, useAtomValue } from 'jotai'
import { useCallback, useEffect, useRef } from 'react'

import type {
  ThemeDensity,
  ThemeElevation,
  ThemeGlass,
  ThemeMotion,
  ThemeShape,
} from '../l0-tokens/scales'
import type { ThemeColorOverrides, ThemeMode, ThemeState } from './theme'
import {
  applyThemeToDocument,
  DEFAULT_THEME,
  persistTheme,
  resolvedModeAtom,
  resolveThemeCssVars,
  themeAtom,
  themePresets,
} from './theme'

// color presets — app registers named presets, each is just a primaryColor
type ThemeConfig = {
  colorPresets: Record<string, { primaryColor: string }>
}

let themeConfig: ThemeConfig = { colorPresets: {} }

// called once at app init — register named color presets
export function configureTheme(config: ThemeConfig): void {
  themeConfig = config
}

// read current theme state (reactive)
export function useTheme(): ThemeState {
  return useAtomValue(themeAtom)
}

// read resolved dark/light mode (reactive)
export function useResolvedMode(): 'dark' | 'light' {
  return useAtomValue(resolvedModeAtom)
}

// theme mutation hooks — each returns a setter for one axis
export function useSetThemeMode(): (mode: ThemeMode) => void {
  const [, setTheme] = useAtom(themeAtom)
  return useCallback(
    (mode: ThemeMode) => {
      setTheme((prev) => ({ ...prev, mode }))
    },
    [setTheme]
  )
}

export function useSetThemePreset(): (presetId: string) => void {
  const [, setTheme] = useAtom(themeAtom)
  return useCallback(
    (presetId: string) => {
      // check built-in presets first, then registered color presets
      const builtIn = themePresets[presetId as keyof typeof themePresets]
      if (builtIn !== undefined) {
        setTheme((prev) => ({
          ...prev,
          presetId,
          // reset all overrides first, then apply preset (which may set mode-aware ones)
          colorOverrides: null,
          colorOverridesLight: null,
          colorOverridesDark: null,
          ...builtIn,
        }))
        return
      }
      const preset = themeConfig.colorPresets[presetId]
      const primaryColor = preset?.primaryColor ?? DEFAULT_THEME.primaryColor
      setTheme((prev) => ({
        ...prev,
        presetId,
        primaryColor,
        colorOverrides: null,
        colorOverridesLight: null,
        colorOverridesDark: null,
      }))
    },
    [setTheme]
  )
}

export function useSetThemePrimaryColor(): (color: string) => void {
  const [, setTheme] = useAtom(themeAtom)
  return useCallback(
    (primaryColor: string) => {
      setTheme((prev) => ({
        ...prev,
        primaryColor,
        colorOverrides: null,
        colorOverridesLight: null,
        colorOverridesDark: null,
      }))
    },
    [setTheme]
  )
}

export function useSetThemeShape(): (shape: ThemeShape) => void {
  const [, setTheme] = useAtom(themeAtom)
  return useCallback(
    (shape: ThemeShape) => {
      setTheme((prev) => ({ ...prev, shape }))
    },
    [setTheme]
  )
}

export function useSetThemeDensity(): (density: ThemeDensity) => void {
  const [, setTheme] = useAtom(themeAtom)
  return useCallback(
    (density: ThemeDensity) => {
      setTheme((prev) => ({ ...prev, density }))
    },
    [setTheme]
  )
}

export function useSetThemeElevation(): (elevation: ThemeElevation) => void {
  const [, setTheme] = useAtom(themeAtom)
  return useCallback(
    (elevation: ThemeElevation) => {
      setTheme((prev) => ({ ...prev, elevation }))
    },
    [setTheme]
  )
}

export function useSetThemeGlass(): (glass: ThemeGlass) => void {
  const [, setTheme] = useAtom(themeAtom)
  return useCallback(
    (glass: ThemeGlass) => {
      setTheme((prev) => ({ ...prev, glass }))
    },
    [setTheme]
  )
}

export function useSetThemeMotion(): (motion: ThemeMotion) => void {
  const [, setTheme] = useAtom(themeAtom)
  return useCallback(
    (motion: ThemeMotion) => {
      setTheme((prev) => ({ ...prev, motion }))
    },
    [setTheme]
  )
}

export function useSetThemeColors(): (
  overrides: Partial<ThemeColorOverrides> | null
) => void {
  const [, setTheme] = useAtom(themeAtom)
  return useCallback(
    (colorOverrides: Partial<ThemeColorOverrides> | null) => {
      setTheme((prev) => ({
        ...prev,
        colorOverrides,
        // clear mode-aware overrides — user's explicit override should not be
        // shadowed by leftover mode-specific values from a preset
        colorOverridesLight: null,
        colorOverridesDark: null,
      }))
    },
    [setTheme]
  )
}

export function useResetTheme(): () => void {
  const [, setTheme] = useAtom(themeAtom)
  return useCallback(() => {
    setTheme(DEFAULT_THEME)
  }, [setTheme])
}

// side-effect hook: apply theme to DOM + persist + listen to system changes
// call this ONCE in the app root
export function useThemeEffect(): void {
  const theme = useAtomValue(themeAtom)
  const resolvedMode = useAtomValue(resolvedModeAtom)
  const prevKeysRef = useRef<string[]>([])

  // apply to DOM whenever theme changes
  useEffect(() => {
    const vars = resolveThemeCssVars(theme, resolvedMode)
    prevKeysRef.current = applyThemeToDocument(
      vars,
      resolvedMode,
      prevKeysRef.current
    )
    persistTheme(theme)
  }, [theme, resolvedMode])

  // listen for system theme preference changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      // trigger re-render via resolvedModeAtom re-evaluation
      // jotai derived atoms auto-recompute, but we need to force it
      // by touching the base atom (no-op write)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
}
