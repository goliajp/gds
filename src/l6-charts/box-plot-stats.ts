// box-plot-stats — quartile and whisker computation

function quantile(sorted: number[], q: number): number {
  const pos = (sorted.length - 1) * q
  const lo = Math.floor(pos)
  const hi = Math.ceil(pos)
  if (lo === hi) return sorted[lo]
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo)
}

export type BoxStats = {
  q1: number
  median: number
  q3: number
  whiskerMin: number
  whiskerMax: number
}

export function computeStats(values: number[]): BoxStats {
  const sorted = [...values].sort((a, b) => a - b)
  const q1 = quantile(sorted, 0.25)
  const median = quantile(sorted, 0.5)
  const q3 = quantile(sorted, 0.75)
  const iqr = q3 - q1
  const whiskerMin = Math.max(sorted[0], q1 - 1.5 * iqr)
  const whiskerMax = Math.min(sorted[sorted.length - 1], q3 + 1.5 * iqr)
  return { q1, median, q3, whiskerMin, whiskerMax }
}
