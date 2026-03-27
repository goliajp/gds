// chord-math — pure math functions for chord diagram arc/chord geometry

export const CHORD_PALETTE = [
  'var(--gds-palette-0, #6366f1)',
  'var(--gds-palette-1, #8b5cf6)',
  'var(--gds-palette-2, #06b6d4)',
  'var(--gds-palette-3, #10b981)',
  'var(--gds-palette-4, #f59e0b)',
  'var(--gds-palette-5, #ef4444)',
  'var(--gds-palette-6, #ec4899)',
  'var(--gds-palette-7, #14b8a6)',
  'var(--gds-palette-8, #f97316)',
  'var(--gds-palette-9, #a855f7)',
]

export type ArcSpan = { start: number; end: number }

export type ChordSpan = {
  source: number
  target: number
  sourceStart: number
  sourceEnd: number
  targetStart: number
  targetEnd: number
}

export function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  }
}

export function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}

export function computeArcs(totals: number[], grandTotal: number, n: number, gap: number): ArcSpan[] {
  const totalAngle = 2 * Math.PI - n * gap
  const arcs: ArcSpan[] = []
  let currentAngle = -Math.PI / 2

  for (let i = 0; i < n; i++) {
    const sweep = (totals[i] / grandTotal) * totalAngle
    arcs.push({ start: currentAngle, end: currentAngle + sweep })
    currentAngle += sweep + gap
  }

  return arcs
}

export function computeChords(
  matrix: number[][],
  arcs: ArcSpan[],
  grandTotal: number,
  n: number,
  gap: number,
): ChordSpan[] {
  const totalAngle = 2 * Math.PI - n * gap
  const chords: ChordSpan[] = []
  const arcOffsets = arcs.map((a) => a.start)

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const val = matrix[i][j] + matrix[j][i]
      if (val <= 0) continue

      const iSweep = (matrix[i][j] / grandTotal) * totalAngle
      const jSweep = (matrix[j][i] / grandTotal) * totalAngle

      chords.push({
        source: i,
        target: j,
        sourceStart: arcOffsets[i],
        sourceEnd: arcOffsets[i] + iSweep,
        targetStart: arcOffsets[j],
        targetEnd: arcOffsets[j] + jSweep,
      })
      arcOffsets[i] += iSweep
      arcOffsets[j] += jSweep
    }
  }

  return chords
}

export function chordPath(
  chord: ChordSpan,
  centerX: number,
  centerY: number,
  innerR: number,
): string {
  const s0 = polarToCartesian(centerX, centerY, innerR, chord.sourceStart)
  const s1 = polarToCartesian(centerX, centerY, innerR, chord.sourceEnd)
  const t0 = polarToCartesian(centerX, centerY, innerR, chord.targetStart)
  const t1 = polarToCartesian(centerX, centerY, innerR, chord.targetEnd)

  return [
    `M ${s0.x} ${s0.y}`,
    `A ${innerR} ${innerR} 0 0 1 ${s1.x} ${s1.y}`,
    `Q ${centerX} ${centerY} ${t0.x} ${t0.y}`,
    `A ${innerR} ${innerR} 0 0 1 ${t1.x} ${t1.y}`,
    `Q ${centerX} ${centerY} ${s0.x} ${s0.y}`,
    'Z',
  ].join(' ')
}
