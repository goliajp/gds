import type { ReactNode } from 'react'

// column types

type SortDir = 'asc' | 'desc'
type Density = 'comfortable' | 'compact' | 'default'
type ColumnAlign = 'center' | 'left' | 'right'
type AggregateFunction = 'avg' | 'count' | 'max' | 'min' | 'sum'

type DataColumn<T = unknown> = {
  key: string
  label?: string
  /** @deprecated use `label` */
  header?: string
  render?: ((value: unknown, row: T, index: number) => ReactNode) | ((row: T) => ReactNode)
  format?: (value: unknown, row: T) => ReactNode
  sortable?: boolean
  filterable?: boolean
  filterOptions?: { label: string; value: string }[]
  searchable?: boolean
  width?: string
  minWidth?: string
  align?: ColumnAlign
  hidden?: boolean
  muted?: boolean
  aggregate?: AggregateFunction
}

// batch action

type BatchAction = {
  label: string
  onClick: (keys: Set<string>) => void
  variant?: 'danger' | 'default'
}

// main props

type DataTableProps<T = unknown> = {
  columns: DataColumn<T>[]
  rows?: T[]
  /** @deprecated use `rows` */
  data?: T[]
  className?: string
  glass?: boolean

  // row identification
  rowKey?: string | ((row: T, index: number) => string)

  // sort
  sortKey?: string | null
  sortDir?: SortDir | null
  onSort?: (key: string) => void

  // pagination
  page?: number
  pageSize?: number
  pageSizeOptions?: number[]
  totalRows?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void

  // selection
  selectable?: boolean
  selectedKeys?: Set<string>
  onToggleSelect?: (key: string, row: T) => void
  onToggleSelectAll?: (allSelected: boolean) => void

  // global filter
  globalFilter?: boolean
  globalFilterValue?: string
  globalFilterPlaceholder?: string
  onGlobalFilterChange?: (value: string) => void
  highlightMatches?: boolean

  // column filters
  columnFilters?: Record<string, string>
  onColumnFilterChange?: (key: string, value: string) => void

  // expandable rows
  expandedKeys?: Set<string>
  onToggleExpand?: (key: string) => void
  renderExpanded?: (row: T) => ReactNode

  // batch actions
  batchActions?: BatchAction[]

  // column toggle
  columnToggle?: boolean

  // csv export
  exportCsv?: boolean
  exportFilename?: string

  // density
  density?: Density

  // visual
  striped?: boolean
  bordered?: boolean
  stickyHeader?: boolean
  rowNumbers?: boolean
  highlightOnHover?: boolean

  // row customization
  getRowClassName?: (row: T, index: number) => string | undefined
  getRowHidden?: (row: T) => boolean
  onRowClick?: (row: T) => void

  // states
  loading?: boolean
  loadingRows?: number
  error?: ReactNode
  emptyMessage?: string
  /** @deprecated use `emptyMessage` */
  emptyText?: string
  emptyIcon?: ReactNode

  // structural
  caption?: ReactNode
  footer?: ReactNode

  // actions column
  actions?: (row: T) => ReactNode
}

export type { AggregateFunction, BatchAction, ColumnAlign, DataColumn, DataTableProps, Density, SortDir }
