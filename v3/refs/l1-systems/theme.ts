// L1 — Theme System
// manages color preset + 5 dimensional axes + dark/light mode
// applies CSS variable overrides to document root
// persists to localStorage, syncs across tabs

import { atom } from 'jotai'

import {
  deriveDarkPalette,
  deriveLightPalette,
  paletteToVars,
} from '../l0-tokens/color-derive'
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
// consumers can override ANY --gds-* color variable to fully customize the palette
export type ThemeColorOverrides = {
  // accent family
  '--gds-accent': string
  '--gds-accent-fg': string
  '--gds-accent-hover': string

  // base surfaces
  '--gds-bg': string
  '--gds-bg-secondary': string
  '--gds-bg-tertiary': string
  '--gds-surface': string
  '--gds-surface-raised': string

  // foreground
  '--gds-fg': string
  '--gds-fg-secondary': string
  '--gds-fg-muted': string

  // borders
  '--gds-border': string
  '--gds-border-strong': string

  // overlay
  '--gds-overlay': string

  // semantic
  '--gds-danger': string
  '--gds-info': string
  '--gds-success': string
  '--gds-warning': string
}

export type ThemeMode = 'dark' | 'light' | 'system'

// full theme state — what the user has configured
export type ThemeState = {
  mode: ThemeMode
  primaryColor: string // single source — everything derived from this
  presetId: string // for UI display only ("default", "teal", "amber"...)
  // dimensional axes — each constrained to L0 scale options
  shape: ThemeShape
  density: ThemeDensity
  elevation: ThemeElevation
  glass: ThemeGlass
  motion: ThemeMotion
  // optional per-token color overrides (advanced — overrides derivation)
  colorOverrides: Partial<ThemeColorOverrides> | null
  // mode-aware overrides — applied on top of colorOverrides for the matching mode
  colorOverridesLight: Partial<ThemeColorOverrides> | null
  colorOverridesDark: Partial<ThemeColorOverrides> | null
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
  colorOverridesLight: null,
  colorOverridesDark: null,
}

// persistence — must be defined before themeAtom so atom init can load from localStorage
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
    if (typeof window === 'undefined') return null
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return null
    const parsed = JSON.parse(raw) as Partial<ThemeState>
    // validate and merge with defaults to handle schema evolution
    return {
      ...DEFAULT_THEME,
      ...parsed,
      // validate primaryColor is a hex string
      primaryColor:
        typeof parsed.primaryColor === 'string' &&
        /^#[0-9a-fA-F]{6}$/.test(parsed.primaryColor)
          ? parsed.primaryColor
          : DEFAULT_THEME.primaryColor,
      // ensure constrained values are valid
      shape: validateOption(
        parsed.shape,
        ['sharp', 'default', 'rounded'],
        DEFAULT_THEME.shape
      ),
      density: validateOption(
        parsed.density,
        ['compact', 'default', 'comfortable'],
        DEFAULT_THEME.density
      ),
      elevation: validateOption(
        parsed.elevation,
        ['flat', 'subtle', 'raised'],
        DEFAULT_THEME.elevation
      ),
      glass: validateOption(
        parsed.glass,
        ['off', 'subtle', 'full'],
        DEFAULT_THEME.glass
      ),
      motion: validateOption(
        parsed.motion,
        ['off', 'reduced', 'full'],
        DEFAULT_THEME.motion
      ),
      mode: validateOption(
        parsed.mode,
        ['light', 'dark', 'system'],
        DEFAULT_THEME.mode
      ),
    }
  } catch {
    return null
  }
}

function validateOption<T extends string>(
  value: unknown,
  options: T[],
  fallback: T
): T {
  if (typeof value === 'string' && options.includes(value as T)) {
    return value as T
  }
  return fallback
}

// jotai atoms — reactive theme state
// initialize from localStorage to avoid race condition with useThemeEffect
export const themeAtom = atom<ThemeState>(loadPersistedTheme() ?? DEFAULT_THEME)

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
  resolvedMode: 'dark' | 'light'
): Record<string, string> {
  // 1. derive colors from primaryColor
  const palette =
    resolvedMode === 'dark'
      ? deriveDarkPalette(state.primaryColor)
      : deriveLightPalette(state.primaryColor)
  const vars: Record<string, string> = {
    ...paletteToVars(palette, resolvedMode),
  }

  // 2. font stacks + weights
  Object.assign(vars, fontToCssVars())

  // 3. dimensional axes — computed by L0 system functions
  Object.assign(
    vars,
    resolveAxesToCssVars(
      state.shape,
      state.density,
      state.elevation,
      state.glass,
      state.motion,
      resolvedMode
    )
  )

  // 4. per-token color overrides (highest priority — advanced users)
  // apply order: colorOverrides (both modes) → colorOverrides{Light|Dark} (mode-specific)
  const overrideLayers = [
    state.colorOverrides,
    resolvedMode === 'dark'
      ? state.colorOverridesDark
      : state.colorOverridesLight,
  ]
  for (const layer of overrideLayers) {
    if (layer !== null && layer !== undefined) {
      for (const [key, val] of Object.entries(layer)) {
        if (val !== undefined) {
          vars[key] = val
        }
      }
    }
  }

  return vars
}

// apply resolved vars to document
export function applyThemeToDocument(
  vars: Record<string, string>,
  resolvedMode: 'dark' | 'light',
  previousKeys?: string[]
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
// override fields are optional — simple presets only need axes + primaryColor
export type ThemePreset = Omit<
  ThemeState,
  | 'mode'
  | 'presetId'
  | 'colorOverrides'
  | 'colorOverridesLight'
  | 'colorOverridesDark'
> & {
  colorOverrides?: Partial<ThemeColorOverrides> | null
  colorOverridesLight?: Partial<ThemeColorOverrides> | null
  colorOverridesDark?: Partial<ThemeColorOverrides> | null
}

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
    primaryColor: '#3b7ddd', // slightly desaturated blue, validated in production
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
  // zinc-neutral: pure neutral surfaces for productivity apps (email, editors, docs)
  // zero hue tint — uses Tailwind zinc scale for content-neutral backgrounds
  // mailrs-proven palette, optimized for long-session comfort
  'zinc-neutral': {
    primaryColor: '#3b7ddd',
    shape: 'default' as const,
    density: 'default' as const,
    elevation: 'subtle' as const,
    glass: 'subtle' as const,
    motion: 'full' as const,
    colorOverridesLight: {
      '--gds-bg': '#fafafa', // zinc-50
      '--gds-bg-secondary': '#f4f4f5', // zinc-100
      '--gds-bg-tertiary': '#e4e4e7', // zinc-200
      '--gds-surface': '#ffffff',
      '--gds-surface-raised': '#ffffff',
      '--gds-fg': '#09090b', // zinc-950
      '--gds-fg-secondary': '#3f3f46', // zinc-700
      '--gds-fg-muted': '#71717a', // zinc-500
      '--gds-border': '#e4e4e7', // zinc-200
      '--gds-border-strong': '#d4d4d8', // zinc-300
      '--gds-overlay': 'rgba(0,0,0,0.5)',
      '--gds-accent': '#3b7ddd',
      '--gds-accent-hover': '#2b6bc5',
      '--gds-accent-fg': '#ffffff',
      '--gds-success': '#0ca678', // mantine green
      '--gds-warning': '#e67700', // mantine orange
      '--gds-danger': '#e03131', // mantine red
      '--gds-info': '#3b7ddd',
    },
    colorOverridesDark: {
      '--gds-bg': '#09090b', // zinc-950
      '--gds-bg-secondary': '#0a0a0a', // near-black
      '--gds-bg-tertiary': '#18181b', // zinc-900
      '--gds-surface': '#18181b', // zinc-900
      '--gds-surface-raised': '#27272a', // zinc-800
      '--gds-fg': '#fafafa', // zinc-50
      '--gds-fg-secondary': '#a1a1aa', // zinc-400
      '--gds-fg-muted': '#71717a', // zinc-500
      '--gds-border': '#27272a', // zinc-800
      '--gds-border-strong': '#3f3f46', // zinc-700
      '--gds-overlay': 'rgba(0,0,0,0.7)',
      '--gds-accent': '#3b82f6', // blue-500
      '--gds-accent-hover': '#60a5fa', // blue-400
      '--gds-accent-fg': '#ffffff',
      '--gds-success': '#22c55e', // green-500
      '--gds-warning': '#f59e0b', // amber-500
      '--gds-danger': '#ef4444', // red-500
      '--gds-info': '#3b82f6',
    },
  },
} as const satisfies Record<string, ThemePreset>

export type ThemePresetId = keyof typeof themePresets
