// heatmap-utils — pure date computation for calendar heatmap

export type HeatmapDatum = { date: string; value: number }

export type HeatmapCell = {
  x: number
  y: number
  date: string
  value: number
  level: number
}

export type MonthLabel = { label: string; x: number }

export type HeatmapGrid = {
  cells: HeatmapCell[]
  monthLabels: MonthLabel[]
  weeks: number
}

export const DAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', '']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function getWeekday(d: Date): number {
  // 0=Mon ... 6=Sun
  return (d.getDay() + 6) % 7
}

function computeThresholds(data: HeatmapDatum[]): number[] {
  const values = data.map((d) => d.value).filter((v) => v > 0).sort((a, b) => a - b)
  const thresholds: number[] = []
  if (values.length > 0) {
    for (let i = 1; i <= 4; i++) {
      const idx = Math.min(Math.floor((i / 4) * values.length), values.length - 1)
      thresholds.push(values[idx])
    }
  }
  return thresholds
}

function getLevel(value: number, thresholds: number[]): number {
  if (value <= 0) return 0
  for (let i = 0; i < thresholds.length; i++) {
    if (value <= thresholds[i]) return i + 1
  }
  return 4
}

export function computeHeatmapGrid(
  data: HeatmapDatum[],
  startDate: string | undefined,
  endDate: string | undefined,
  step: number,
): HeatmapGrid {
  const end = endDate !== undefined ? new Date(endDate) : new Date()
  const start = startDate !== undefined
    ? new Date(startDate)
    : new Date(end.getFullYear() - 1, end.getMonth(), end.getDate() + 1)

  const lookup = new Map<string, number>()
  for (const d of data) {
    lookup.set(d.date, d.value)
  }

  const thresholds = computeThresholds(data)

  const cells: HeatmapCell[] = []
  const months: MonthLabel[] = []
  let weekIdx = 0
  let lastMonth = -1
  const cur = new Date(start)

  // align to start of week (Monday)
  const startWeekday = getWeekday(cur)
  if (startWeekday > 0) {
    cur.setDate(cur.getDate() - startWeekday)
  }

  while (cur <= end) {
    const day = getWeekday(cur)
    const dateStr = cur.toISOString().slice(0, 10)
    const value = lookup.get(dateStr) ?? 0

    if (cur.getMonth() !== lastMonth && day <= 3) {
      months.push({ label: MONTH_NAMES[cur.getMonth()], x: weekIdx * step })
      lastMonth = cur.getMonth()
    }

    cells.push({
      x: weekIdx * step,
      y: day * step,
      date: dateStr,
      value,
      level: getLevel(value, thresholds),
    })

    if (day === 6) {
      weekIdx++
    }
    cur.setDate(cur.getDate() + 1)
  }

  return { cells, monthLabels: months, weeks: weekIdx + 1 }
}
