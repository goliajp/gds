// L0 — pure color math
// hex ↔ rgb ↔ hsl conversion, manipulation, contrast

export type Rgb = { r: number, g: number, b: number }
export type Hsl = { h: number, s: number, l: number }

// hex → rgb
export function hexToRgb(hex: string): Rgb {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

// rgb → hex
export function rgbToHex(rgb: Rgb): string {
  const c = (v: number) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')
  return `#${c(rgb.r)}${c(rgb.g)}${c(rgb.b)}`
}

// rgb → hsl
export function rgbToHsl(rgb: Rgb): Hsl {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  const h = max === r
    ? ((g - b) / d + (g < b ? 6 : 0)) / 6
    : max === g
      ? ((b - r) / d + 2) / 6
      : ((r - g) / d + 4) / 6
  return { h: h * 360, s, l }
}

// hsl → rgb
export function hslToRgb(hsl: Hsl): Rgb {
  const { h, s, l } = hsl
  if (s === 0) {
    const v = Math.round(l * 255)
    return { r: v, g: v, b: v }
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    const tt = t < 0 ? t + 1 : t > 1 ? t - 1 : t
    if (tt < 1 / 6) return p + (q - p) * 6 * tt
    if (tt < 1 / 2) return q
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6
    return p
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const hNorm = h / 360
  return {
    r: Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, hNorm) * 255),
    b: Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255),
  }
}

// hex → hsl shortcut
export function hexToHsl(hex: string): Hsl {
  return rgbToHsl(hexToRgb(hex))
}

// hsl → hex shortcut
export function hslToHex(hsl: Hsl): string {
  return rgbToHex(hslToRgb(hsl))
}

// relative luminance (WCAG 2.1)
export function luminance(rgb: Rgb): number {
  const srgb = [rgb.r, rgb.g, rgb.b].map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2]
}

// WCAG contrast ratio between two colors
export function contrastRatio(a: Rgb, b: Rgb): number {
  const la = luminance(a)
  const lb = luminance(b)
  const lighter = Math.max(la, lb)
  const darker = Math.min(la, lb)
  return (lighter + 0.05) / (darker + 0.05)
}

// interpolate between two hex colors (0=a, 1=b)
export function lerpColor(a: string, b: string, t: number): string {
  const ca = hexToRgb(a)
  const cb = hexToRgb(b)
  return rgbToHex({
    r: Math.round(ca.r + (cb.r - ca.r) * t),
    g: Math.round(ca.g + (cb.g - ca.g) * t),
    b: Math.round(ca.b + (cb.b - ca.b) * t),
  })
}

// manipulation: lighten
export function lighten(hex: string, amount: number): string {
  const hsl = hexToHsl(hex)
  return hslToHex({ ...hsl, l: Math.min(1, hsl.l + amount) })
}

// manipulation: darken
export function darken(hex: string, amount: number): string {
  const hsl = hexToHsl(hex)
  return hslToHex({ ...hsl, l: Math.max(0, hsl.l - amount) })
}

// manipulation: adjust saturation
export function saturate(hex: string, amount: number): string {
  const hsl = hexToHsl(hex)
  return hslToHex({ ...hsl, s: Math.min(1, Math.max(0, hsl.s + amount)) })
}

// manipulation: shift hue
export function hueShift(hex: string, degrees: number): string {
  const hsl = hexToHsl(hex)
  return hslToHex({ ...hsl, h: (hsl.h + degrees + 360) % 360 })
}

// manipulation: with alpha → rgba string
export function withAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// complementary color (180° hue shift)
export function complement(hex: string): string {
  return hueShift(hex, 180)
}

// analogous colors (±30° hue shift)
export function analogous(hex: string): [string, string] {
  return [hueShift(hex, -30), hueShift(hex, 30)]
}

// triadic colors (120° apart)
export function triadic(hex: string): [string, string] {
  return [hueShift(hex, 120), hueShift(hex, 240)]
}
