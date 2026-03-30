import type { AggregateFunction, DataColumn, Density } from './data-table-types'

// resolve column label (backward compat: label ?? header)
export function getLabel<T>(col: DataColumn<T>): string {
  return col.label ?? col.header ?? col.key
}

// resolve row key
export function resolveRowKey<T>(
  row: T,
  rowKey: string | ((row: T, index: number) => string) | undefined,
  index: number
): string {
  if (rowKey === undefined) {
    const r = row as Record<string, unknown>
    return String(r['id'] ?? index)
  }
  if (typeof rowKey === 'function') return rowKey(row, index)
  return String((row as Record<string, unknown>)[rowKey] ?? index)
}

// density padding classes
type DensityClasses = { td: string; th: string }

const densityMap: Record<Density, DensityClasses> = {
  compact: { td: 'px-1.5 py-0.5 text-[11px]', th: 'px-1.5 py-1 text-[11px]' },
  default: { td: 'px-2.5 py-1.5 text-xs', th: 'px-2.5 py-1.5 text-xs' },
  comfortable: { td: 'px-3 py-2.5 text-sm', th: 'px-3 py-2 text-xs' },
}

export function getDensity(density: Density = 'default'): DensityClasses {
  return densityMap[density]
}

// compute aggregate
export function computeAggregate<T>(
  rows: T[],
  key: string,
  fn: AggregateFunction
): number | null {
  const values = rows
    .map((r) => {
      const v = (r as Record<string, unknown>)[key]
      return typeof v === 'number' ? v : null
    })
    .filter((v): v is number => v !== null)

  if (values.length === 0) return null

  if (fn === 'count') return values.length
  if (fn === 'sum') return values.reduce((a, b) => a + b, 0)
  if (fn === 'avg') return values.reduce((a, b) => a + b, 0) / values.length
  if (fn === 'min') return Math.min(...values)
  if (fn === 'max') return Math.max(...values)
  return null
}

// csv export
export function downloadCsv<T>(
  columns: DataColumn<T>[],
  rows: T[],
  filename: string
): void {
  const visibleCols = columns.filter((c) => c.hidden !== true)
  const header = visibleCols.map((c) => getLabel(c))
  const csvRows = rows.map((row) =>
    visibleCols.map((col) => {
      const v = (row as Record<string, unknown>)[col.key]
      const str = String(v ?? '')
      // escape quotes in csv
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    })
  )
  const csv = [header.join(','), ...csvRows.map((r) => r.join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// cell value extraction
export function getCellValue<T>(row: T, key: string): unknown {
  return (row as Record<string, unknown>)[key]
}
