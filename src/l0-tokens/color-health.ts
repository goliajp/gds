// L0 — primary color health scoring
// validates a candidate primary color against dark/light backgrounds
// scores 0-100, with diagnostic feedback

import type { Rgb } from './color-math'
import { contrastRatio, hexToHsl, hexToRgb, hslToHex } from './color-math'

export type HealthLevel = 'rejected' | 'warning' | 'good' | 'excellent'

export type HealthDiagnostic = {
  id: string
  severity: 'error' | 'info' | 'warning'
  message: string
  suggestion: string
}

export type HealthReport = {
  score: number           // 0-100
  level: HealthLevel      // rejected(<60) / warning(60-80) / good(80-90) / excellent(90+)
  diagnostics: HealthDiagnostic[]
  details: {
    contrastOnDark: number
    contrastOnLight: number
    contrastWhiteOnColor: number
    contrastBlackOnColor: number
    saturation: number
    lightness: number
    hue: number
    semanticConflict: string | null
  }
}

// fixed reference colors
const DARK_BG: Rgb = { r: 15, g: 23, b: 42 }
const LIGHT_BG: Rgb = { r: 255, g: 255, b: 255 }
const WHITE: Rgb = { r: 255, g: 255, b: 255 }
const BLACK: Rgb = { r: 0, g: 0, b: 0 }

// semantic color hue ranges to check conflicts
const SEMANTIC_RANGES: { name: string; hueMin: number; hueMax: number }[] = [
  { name: 'danger (red)', hueMin: 340, hueMax: 360 },
  { name: 'danger (red)', hueMin: 0, hueMax: 20 },
  { name: 'warning (amber)', hueMin: 30, hueMax: 55 },
  { name: 'success (green)', hueMin: 100, hueMax: 150 },
]

// individual scoring checks — each returns penalty points
function checkContrastOnDark(rgb: Rgb, d: HealthDiagnostic[]): number {
  const ratio = contrastRatio(rgb, DARK_BG)
  if (ratio < 2.5) {
    d.push({ id: 'contrast-dark-fail', severity: 'error', message: `contrast on dark background too low (${ratio.toFixed(1)}:1)`, suggestion: 'lighten the color or increase saturation' })
    return 30
  }
  if (ratio < 3.5) {
    d.push({ id: 'contrast-dark-low', severity: 'warning', message: `contrast on dark background is marginal (${ratio.toFixed(1)}:1)`, suggestion: 'consider a slightly lighter variant for better readability' })
    return 15
  }
  return 0
}

function checkContrastOnLight(rgb: Rgb, d: HealthDiagnostic[]): number {
  const ratio = contrastRatio(rgb, LIGHT_BG)
  if (ratio < 2.5) {
    d.push({ id: 'contrast-light-fail', severity: 'warning', message: `contrast on light background too low (${ratio.toFixed(1)}:1)`, suggestion: 'darken the color for light mode usage' })
    return 15
  }
  return 0
}

function checkTextOnColor(rgb: Rgb, d: HealthDiagnostic[]): number {
  const whiteC = contrastRatio(WHITE, rgb)
  const blackC = contrastRatio(BLACK, rgb)
  const best = Math.max(whiteC, blackC)
  if (best < 3) {
    d.push({ id: 'text-on-color-fail', severity: 'error', message: `neither white nor black text is readable on this color (best: ${best.toFixed(1)}:1)`, suggestion: 'adjust lightness — avoid the 40-60% lightness midrange' })
    return 20
  }
  if (best < 4.5) {
    d.push({ id: 'text-on-color-low', severity: 'warning', message: `text on this color has limited contrast (${best.toFixed(1)}:1)`, suggestion: 'push lightness below 40% or above 60% for clearer text' })
    return 8
  }
  return 0
}

function checkSaturation(s: number, d: HealthDiagnostic[]): number {
  if (s < 0.2) {
    d.push({ id: 'saturation-low', severity: 'warning', message: `saturation too low (${(s * 100).toFixed(0)}%) — color appears grayish`, suggestion: 'increase saturation above 30% for a vibrant primary' })
    return 15
  }
  if (s > 0.95) {
    d.push({ id: 'saturation-high', severity: 'info', message: `very high saturation (${(s * 100).toFixed(0)}%) — may cause eye strain`, suggestion: 'reduce to 70-90% for comfortable prolonged viewing' })
    return 5
  }
  return 0
}

function checkLightness(l: number, d: HealthDiagnostic[]): number {
  if (l < 0.15) {
    d.push({ id: 'lightness-too-dark', severity: 'error', message: `color is too dark (L=${(l * 100).toFixed(0)}%) — invisible on dark mode`, suggestion: 'increase lightness above 30%' })
    return 20
  }
  if (l > 0.85) {
    d.push({ id: 'lightness-too-light', severity: 'warning', message: `color is too light (L=${(l * 100).toFixed(0)}%) — weak on light mode`, suggestion: 'decrease lightness below 70%' })
    return 15
  }
  return 0
}

function checkSemanticConflict(h: number, s: number, d: HealthDiagnostic[]): string | null {
  if (s <= 0.4) return null
  for (const range of SEMANTIC_RANGES) {
    if (h >= range.hueMin && h <= range.hueMax) {
      d.push({ id: 'semantic-conflict', severity: 'warning', message: `hue (${h.toFixed(0)}°) overlaps with ${range.name} semantic color`, suggestion: 'users may confuse accent with status colors — shift hue away from red/amber/green zones' })
      return range.name
    }
  }
  return null
}

function levelFromScore(score: number): HealthLevel {
  if (score < 60) return 'rejected'
  if (score < 80) return 'warning'
  if (score < 90) return 'good'
  return 'excellent'
}

export function scoreColor(hex: string): HealthReport {
  const rgb = hexToRgb(hex)
  const hsl = hexToHsl(hex)
  const diagnostics: HealthDiagnostic[] = []

  const penalty =
    checkContrastOnDark(rgb, diagnostics) +
    checkContrastOnLight(rgb, diagnostics) +
    checkTextOnColor(rgb, diagnostics) +
    checkSaturation(hsl.s, diagnostics) +
    checkLightness(hsl.l, diagnostics)

  const semanticConflict = checkSemanticConflict(hsl.h, hsl.s, diagnostics)
  const semanticPenalty = semanticConflict !== null ? 10 : 0

  const score = Math.max(0, Math.min(100, 100 - penalty - semanticPenalty))

  return {
    score,
    level: levelFromScore(score),
    diagnostics,
    details: {
      contrastOnDark: contrastRatio(rgb, DARK_BG),
      contrastOnLight: contrastRatio(rgb, LIGHT_BG),
      contrastWhiteOnColor: contrastRatio(WHITE, rgb),
      contrastBlackOnColor: contrastRatio(BLACK, rgb),
      saturation: hsl.s,
      lightness: hsl.l,
      hue: hsl.h,
      semanticConflict,
    },
  }
}

// determine best text color (white or black) for a given background
export function bestTextColor(bgHex: string): '#000000' | '#ffffff' {
  const rgb = hexToRgb(bgHex)
  const whiteContrast = contrastRatio(WHITE, rgb)
  const blackContrast = contrastRatio(BLACK, rgb)
  // prefer white if it passes minimum readability (3:1)
  if (whiteContrast >= 3) return '#ffffff'
  if (blackContrast >= 3) return '#000000'
  return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}

// auto-fix: take any color → return the highest-scoring version
export function autoFixColor(hex: string): string {
  const hsl = hexToHsl(hex)
  let bestHex = hex
  let bestScore = scoreColor(hex).score

  const fixedS = Math.max(0.45, Math.min(0.85, hsl.s))

  for (let l = 0.40; l <= 0.70; l += 0.02) {
    let h = hsl.h

    // shift hue away from semantic conflict zones
    for (const range of SEMANTIC_RANGES) {
      if (h >= range.hueMin && h <= range.hueMax) {
        const distToMin = Math.abs(h - range.hueMin)
        const distToMax = Math.abs(h - range.hueMax)
        if (distToMin < distToMax) {
          h = range.hueMin - 10
        } else {
          h = range.hueMax + 10
        }
        h = (h + 360) % 360
        break
      }
    }

    const candidate = hslToHex({ h, s: fixedS, l })
    const candidateScore = scoreColor(candidate).score
    if (candidateScore > bestScore) {
      bestScore = candidateScore
      bestHex = candidate
    }
  }

  return bestHex
}
