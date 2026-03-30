export type {
  AggregateFunction,
  BatchAction,
  ColumnAlign,
  DataColumn,
  DataTableProps,
  Density,
  SortDir,
} from './data-table-types'
// backward compat: re-export DataColumn as Column
export { DataTable } from './data-table'
export type { DataColumn as Column } from './data-table-types'
