// L1 — Theme System
// manages color preset + 5 dimensional axes + dark/light mode
// applies CSS variable overrides to document root
// persists to localStorage, syncs across tabs

import { atom } from 'jotai'

import { deriveDarkPalette, deriveLightPalette, paletteToVars } from '../l0-tokens/color-derive'
import { fontToCssVars } from '../l0-tokens/font-system'
import { DEFAULT_PRIMARY } from '../l0-tokens/generate-defaults'
import type {
  ThemeDensity,
  ThemeElevation,
  ThemeGlass,
  ThemeMotion,
  ThemeShape,
} from '../l0-tokens/scales'
import { resolveAxesToCssVars } from '../l0-tokens/scales'

// color overrides — per-token overrides for advanced users
export type ThemeColorOverrides = {
  '--gds-accent': string
  '--gds-accent-fg': string
  '--gds-accent-hover': string
  '--gds-danger': string
  '--gds-success': string
  '--gds-warning': string
}

export type ThemeMode = 'dark' | 'light' | 'system'

// full theme state — what the user has configured
export type ThemeState = {
  mode: ThemeMode
  primaryColor: string  // single source — everything derived from this
  presetId: string      // for UI display only ("default", "teal", "amber"...)
  // dimensional axes — each constrained to L0 scale options
  shape: ThemeShape
  density: ThemeDensity
  elevation: ThemeElevation
  glass: ThemeGlass
  motion: ThemeMotion
  // optional per-token color overrides (advanced — overrides derivation)
  colorOverrides: Partial<ThemeColorOverrides> | null
}

// default theme — beautiful out of the box
export const DEFAULT_THEME: ThemeState = {
  mode: 'system',
  primaryColor: DEFAULT_PRIMARY,
  presetId: 'default',
  shape: 'default',
  density: 'default',
  elevation: 'raised',
  glass: 'full',
  motion: 'full',
  colorOverrides: null,
}

// jotai atoms — reactive theme state
export const themeAtom = atom<ThemeState>(DEFAULT_THEME)

export const resolvedModeAtom = atom<'dark' | 'light'>((get) => {
  const { mode } = get(themeAtom)
  if (mode !== 'system') return mode
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
})

// resolve theme state → flat CSS variable overrides
// all colors derived from primaryColor via L0 functions — no manual color presets
export function resolveThemeCssVars(
  state: ThemeState,
  resolvedMode: 'dark' | 'light',
): Record<string, string> {
  // 1. derive colors from primaryColor
  const palette = resolvedMode === 'dark'
    ? deriveDarkPalette(state.primaryColor)
    : deriveLightPalette(state.primaryColor)
  const vars: Record<string, string> = { ...paletteToVars(palette, resolvedMode) }

  // 2. font stacks + weights
  Object.assign(vars, fontToCssVars())

  // 3. dimensional axes — computed by L0 system functions
  Object.assign(vars, resolveAxesToCssVars(
    state.shape, state.density, state.elevation,
    state.glass, state.motion, resolvedMode,
  ))

  // 4. per-token color overrides (highest priority — advanced users)
  if (state.colorOverrides !== null) {
    for (const [key, val] of Object.entries(state.colorOverrides)) {
      if (val !== undefined) {
        vars[key] = val
      }
    }
  }

  return vars
}

// apply resolved vars to document
export function applyThemeToDocument(
  vars: Record<string, string>,
  resolvedMode: 'dark' | 'light',
  previousKeys?: string[],
): string[] {
  const root = document.documentElement

  // clear previous overrides
  if (previousKeys !== undefined) {
    for (const key of previousKeys) {
      root.style.removeProperty(key)
    }
  }

  // set mode attribute
  const mode = root.getAttribute('data-theme-mode')
  if (mode !== resolvedMode) {
    root.setAttribute('data-theme-mode', resolvedMode)
  }

  // apply new overrides
  const keys = Object.keys(vars)
  for (const [key, val] of Object.entries(vars)) {
    root.style.setProperty(key, val)
  }

  return keys
}

// named theme presets — optimized axis combinations for specific application types
export type ThemePreset = Omit<ThemeState, 'mode' | 'presetId' | 'colorOverrides'>

export const themePresets = {
  // default: balanced for general-purpose dashboards
  default: {
    primaryColor: DEFAULT_PRIMARY,
    shape: 'default' as const,
    density: 'default' as const,
    elevation: 'raised' as const,
    glass: 'full' as const,
    motion: 'full' as const,
  },
  // email: optimized for email/productivity apps (mailrs-proven)
  // comfortable density for readable 14px base, subtle elevation for clean modern look
  email: {
    primaryColor: '#3b7ddd',  // slightly desaturated blue, validated in production
    shape: 'default' as const,
    density: 'comfortable' as const,
    elevation: 'subtle' as const,
    glass: 'subtle' as const,
    motion: 'full' as const,
  },
  // dashboard: data-dense monitoring/analytics
  dashboard: {
    primaryColor: DEFAULT_PRIMARY,
    shape: 'default' as const,
    density: 'compact' as const,
    elevation: 'subtle' as const,
    glass: 'off' as const,
    motion: 'full' as const,
  },
} as const satisfies Record<string, ThemePreset>

export type ThemePresetId = keyof typeof themePresets

// persistence keys
const STORAGE_KEY = 'gds-theme'

export function persistTheme(state: ThemeState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage full or unavailable
  }
}

export function loadPersistedTheme(): ThemeState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return null
    const parsed = JSON.parse(raw) as Partial<ThemeState>
    // validate and merge with defaults to handle schema evolution
    return {
      ...DEFAULT_THEME,
      ...parsed,
      // validate primaryColor is a hex string
      primaryColor: typeof parsed.primaryColor === 'string' && /^#[0-9a-fA-F]{6}$/.test(parsed.primaryColor)
        ? parsed.primaryColor : DEFAULT_THEME.primaryColor,
      // ensure constrained values are valid
      shape: validateOption(parsed.shape, ['sharp', 'default', 'rounded'], DEFAULT_THEME.shape),
      density: validateOption(parsed.density, ['compact', 'default', 'comfortable'], DEFAULT_THEME.density),
      elevation: validateOption(parsed.elevation, ['flat', 'subtle', 'raised'], DEFAULT_THEME.elevation),
      glass: validateOption(parsed.glass, ['off', 'subtle', 'full'], DEFAULT_THEME.glass),
      motion: validateOption(parsed.motion, ['off', 'reduced', 'full'], DEFAULT_THEME.motion),
      mode: validateOption(parsed.mode, ['light', 'dark', 'system'], DEFAULT_THEME.mode),
    }
  } catch {
    return null
  }
}

function validateOption<T extends string>(
  value: unknown,
  options: T[],
  fallback: T,
): T {
  if (typeof value === 'string' && options.includes(value as T)) {
    return value as T
  }
  return fallback
}
