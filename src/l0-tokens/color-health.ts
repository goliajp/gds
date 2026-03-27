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
    contrastOnDark: number     // ratio vs dark bg (#0f172a)
    contrastOnLight: number    // ratio vs light bg (#ffffff)
    contrastWhiteOnColor: number // white text on this color
    contrastBlackOnColor: number // black text on this color
    saturation: number         // 0-1
    lightness: number          // 0-1
    hue: number                // 0-360
    semanticConflict: string | null // 'danger' | 'warning' | 'success' | null
  }
}

// fixed reference colors
const DARK_BG: Rgb = { r: 15, g: 23, b: 42 }   // #0f172a
const LIGHT_BG: Rgb = { r: 255, g: 255, b: 255 } // #ffffff
const WHITE: Rgb = { r: 255, g: 255, b: 255 }
const BLACK: Rgb = { r: 0, g: 0, b: 0 }

// semantic color hue ranges to check conflicts
const SEMANTIC_RANGES: { name: string, hueMin: number, hueMax: number }[] = [
  { name: 'danger (red)', hueMin: 340, hueMax: 360 },
  { name: 'danger (red)', hueMin: 0, hueMax: 20 },
  { name: 'warning (amber)', hueMin: 30, hueMax: 55 },
  { name: 'success (green)', hueMin: 100, hueMax: 150 },
]

export function scoreColor(hex: string): HealthReport {
  const rgb = hexToRgb(hex)
  const hsl = hexToHsl(hex)
  const diagnostics: HealthDiagnostic[] = []
  let score = 100

  // contrast checks
  const contrastOnDark = contrastRatio(rgb, DARK_BG)
  const contrastOnLight = contrastRatio(rgb, LIGHT_BG)
  const contrastWhiteOnColor = contrastRatio(WHITE, rgb)
  const contrastBlackOnColor = contrastRatio(BLACK, rgb)

  // 1. contrast on dark bg (most important — dark-native design)
  if (contrastOnDark < 2.5) {
    score -= 30
    diagnostics.push({
      id: 'contrast-dark-fail',
      severity: 'error',
      message: `contrast on dark background too low (${contrastOnDark.toFixed(1)}:1)`,
      suggestion: 'lighten the color or increase saturation',
    })
  } else if (contrastOnDark < 3.5) {
    score -= 15
    diagnostics.push({
      id: 'contrast-dark-low',
      severity: 'warning',
      message: `contrast on dark background is marginal (${contrastOnDark.toFixed(1)}:1)`,
      suggestion: 'consider a slightly lighter variant for better readability',
    })
  }

  // 2. contrast on light bg
  if (contrastOnLight < 2.5) {
    score -= 15
    diagnostics.push({
      id: 'contrast-light-fail',
      severity: 'warning',
      message: `contrast on light background too low (${contrastOnLight.toFixed(1)}:1)`,
      suggestion: 'darken the color for light mode usage',
    })
  }

  // 3. text readability on the color itself (for accent-fg)
  const bestTextContrast = Math.max(contrastWhiteOnColor, contrastBlackOnColor)
  if (bestTextContrast < 3) {
    score -= 20
    diagnostics.push({
      id: 'text-on-color-fail',
      severity: 'error',
      message: `neither white nor black text is readable on this color (best: ${bestTextContrast.toFixed(1)}:1)`,
      suggestion: 'adjust lightness — avoid the 40-60% lightness midrange',
    })
  } else if (bestTextContrast < 4.5) {
    score -= 8
    diagnostics.push({
      id: 'text-on-color-low',
      severity: 'warning',
      message: `text on this color has limited contrast (${bestTextContrast.toFixed(1)}:1)`,
      suggestion: 'push lightness below 40% or above 60% for clearer text',
    })
  }

  // 4. saturation check
  if (hsl.s < 0.2) {
    score -= 15
    diagnostics.push({
      id: 'saturation-low',
      severity: 'warning',
      message: `saturation too low (${(hsl.s * 100).toFixed(0)}%) — color appears grayish`,
      suggestion: 'increase saturation above 30% for a vibrant primary',
    })
  } else if (hsl.s > 0.95) {
    score -= 5
    diagnostics.push({
      id: 'saturation-high',
      severity: 'info',
      message: `very high saturation (${(hsl.s * 100).toFixed(0)}%) — may cause eye strain`,
      suggestion: 'reduce to 70-90% for comfortable prolonged viewing',
    })
  }

  // 5. lightness range
  if (hsl.l < 0.15) {
    score -= 20
    diagnostics.push({
      id: 'lightness-too-dark',
      severity: 'error',
      message: `color is too dark (L=${(hsl.l * 100).toFixed(0)}%) — invisible on dark mode`,
      suggestion: 'increase lightness above 30%',
    })
  } else if (hsl.l > 0.85) {
    score -= 15
    diagnostics.push({
      id: 'lightness-too-light',
      severity: 'warning',
      message: `color is too light (L=${(hsl.l * 100).toFixed(0)}%) — weak on light mode`,
      suggestion: 'decrease lightness below 70%',
    })
  }

  // 6. semantic conflict check
  let semanticConflict: string | null = null
  for (const range of SEMANTIC_RANGES) {
    if (hsl.h >= range.hueMin && hsl.h <= range.hueMax && hsl.s > 0.4) {
      semanticConflict = range.name
      score -= 10
      diagnostics.push({
        id: 'semantic-conflict',
        severity: 'warning',
        message: `hue (${hsl.h.toFixed(0)}°) overlaps with ${range.name} semantic color`,
        suggestion: 'users may confuse accent with status colors — shift hue away from red/amber/green zones',
      })
      break
    }
  }

  // clamp score
  score = Math.max(0, Math.min(100, score))

  // determine level
  let level: HealthLevel = 'excellent'
  if (score < 60) level = 'rejected'
  else if (score < 80) level = 'warning'
  else if (score < 90) level = 'good'

  return {
    score,
    level,
    diagnostics,
    details: {
      contrastOnDark,
      contrastOnLight,
      contrastWhiteOnColor,
      contrastBlackOnColor,
      saturation: hsl.s,
      lightness: hsl.l,
      hue: hsl.h,
      semanticConflict,
    },
  }
}

// determine best text color (white or black) for a given background
// prefers white text when both pass minimum readability — white on saturated color
// looks better than black even when black has slightly higher contrast ratio
export function bestTextColor(bgHex: string): '#000000' | '#ffffff' {
  const rgb = hexToRgb(bgHex)
  const white: Rgb = { r: 255, g: 255, b: 255 }
  const black: Rgb = { r: 0, g: 0, b: 0 }
  const whiteContrast = contrastRatio(white, rgb)
  const blackContrast = contrastRatio(black, rgb)
  // prefer white if it passes minimum readability (3:1)
  // only use black when white is clearly too low contrast
  if (whiteContrast >= 3) return '#ffffff'
  if (blackContrast >= 3) return '#000000'
  // fallback: pick the higher one
  return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}

// auto-fix: take any color → return the highest-scoring version
// preserves hue intent, adjusts saturation + lightness to maximize health
export function autoFixColor(hex: string): string {
  const hsl = hexToHsl(hex)
  let bestHex = hex
  let bestScore = scoreColor(hex).score

  // fix saturation: clamp to 0.45-0.85 sweet spot
  const fixedS = Math.max(0.45, Math.min(0.85, hsl.s))

  // fix lightness: try a range of lightness values to find best score
  // dark mode needs L=0.50-0.65, light mode needs L=0.35-0.50
  // we optimize for overall (both modes) by targeting L=0.50-0.60
  for (let l = 0.40; l <= 0.70; l += 0.02) {
    let h = hsl.h

    // shift hue away from semantic conflict zones
    for (const range of SEMANTIC_RANGES) {
      if (h >= range.hueMin && h <= range.hueMax) {
        // push hue to nearest safe edge
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
