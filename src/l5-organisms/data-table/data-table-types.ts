import type { ReactNode } from 'react'

// column types

type SortDir = 'asc' | 'desc'
type Density = 'comfortable' | 'compact' | 'default'
type ColumnAlign = 'center' | 'left' | 'right'
type AggregateFunction = 'avg' | 'count' | 'max' | 'min' | 'sum'

type DataColumn<T = unknown> = {
  key: string
  /** Column header text */
  label?: string
  /** @deprecated Use label instead */
  header?: string
  /** Custom cell renderer — overrides format. Receives (value, row, index) */
  render?: ((value: unknown, row: T, index: number) => ReactNode) | ((row: T) => ReactNode)
  /** Value formatter — receives (value, row), returns ReactNode */
  format?: (value: unknown, row: T) => ReactNode
  /** Enable sort toggle on column header click */
  sortable?: boolean
  /** Show filter input below column header */
  filterable?: boolean
  /** Dropdown options for column filter; omit for text input */
  filterOptions?: { label: string; value: string }[]
  /** Include in global filter matching (default: true) */
  searchable?: boolean
  /** CSS width value (e.g. '200px', '20%') */
  width?: string
  /** CSS min-width value */
  minWidth?: string
  /** Cell text alignment */
  align?: ColumnAlign
  /** Hide column from display (data still accessible) */
  hidden?: boolean
  /** Dim text color for secondary data columns */
  muted?: boolean
  /** Footer aggregate function for numeric columns */
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
  /** Row data array */
  rows?: T[]
  /** @deprecated Use rows instead */
  data?: T[]
  className?: string
  glass?: boolean

  // row identification
  /** Unique key for each row — field name or (row, index) => string */
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
  /** Show row selection checkboxes */
  selectable?: boolean
  /** Set of selected row keys (controlled) */
  selectedKeys?: Set<string>
  onToggleSelect?: (key: string, row: T) => void
  onToggleSelectAll?: (allSelected: boolean) => void

  // global filter
  /** Show global search input in toolbar */
  globalFilter?: boolean
  globalFilterValue?: string
  globalFilterPlaceholder?: string
  onGlobalFilterChange?: (value: string) => void
  /** Highlight matching text in cells during search */
  highlightMatches?: boolean

  // column filters
  columnFilters?: Record<string, string>
  onColumnFilterChange?: (key: string, value: string) => void

  // expandable rows
  /** Set of expanded row keys (controlled) */
  expandedKeys?: Set<string>
  onToggleExpand?: (key: string) => void
  /** Render expanded detail below row */
  renderExpanded?: (row: T) => ReactNode

  // batch actions
  /** Actions shown when rows are selected */
  batchActions?: BatchAction[]

  // column toggle
  /** Show column visibility toggle in toolbar */
  columnToggle?: boolean

  // csv export
  /** Show CSV export button in toolbar */
  exportCsv?: boolean
  /** Filename for CSV export (without .csv extension) */
  exportFilename?: string

  // density
  /** Row padding density — compact for data-heavy views */
  density?: Density

  // visual
  /** Alternate row background for readability */
  striped?: boolean
  /** Show cell borders */
  bordered?: boolean
  /** Pin header row when scrolling */
  stickyHeader?: boolean
  /** Show row number column */
  rowNumbers?: boolean
  highlightOnHover?: boolean

  // row customization
  getRowClassName?: (row: T, index: number) => string | undefined
  getRowHidden?: (row: T) => boolean
  onRowClick?: (row: T) => void

  // states
  loading?: boolean
  /** Number of skeleton rows shown during loading (default: 5) */
  loadingRows?: number
  error?: ReactNode
  /** Text shown when no rows match */
  emptyMessage?: string
  /** @deprecated Use emptyMessage instead */
  emptyText?: string
  emptyIcon?: ReactNode

  // structural
  /** Title shown in toolbar */
  caption?: ReactNode
  /** Content below the table */
  footer?: ReactNode

  // actions column
  /** Render action buttons in last column — receives row data */
  actions?: (row: T) => ReactNode
}

export type { AggregateFunction, BatchAction, ColumnAlign, DataColumn, DataTableProps, Density, SortDir }
