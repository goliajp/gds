// data-table — feature-rich data table with sorting, pagination, selection, filtering
import type { ReactNode } from 'react'
import { forwardRef, useMemo, useState } from 'react'

import { cx } from '../../utils/cx'
import { glassSurface } from '../../utils/glass'
import { DataTableBody } from './data-table-body'
import { DataTableHead } from './data-table-head'
import { DataTablePagination } from './data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'
import type { DataTableProps } from './data-table-types'
import { downloadCsv, resolveRowKey } from './data-table-utils'

function DataTableInner<T>(
  props: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    columns: allColumns,
    className,
    glass,
    // backward compat
    rows: rowsProp,
    data: dataProp,
    emptyMessage: emptyMessageProp,
    emptyText: emptyTextProp,
    // sort
    sortKey,
    sortDir,
    onSort,
    // pagination
    page: pageProp,
    pageSize: pageSizeProp,
    pageSizeOptions,
    totalRows: totalRowsProp,
    onPageChange,
    onPageSizeChange,
    // selection
    selectable,
    selectedKeys,
    onToggleSelect,
    onToggleSelectAll,
    // global filter
    globalFilter,
    globalFilterValue,
    globalFilterPlaceholder,
    onGlobalFilterChange,
    highlightMatches,
    // column filters
    columnFilters,
    onColumnFilterChange,
    // expand
    expandedKeys,
    onToggleExpand,
    renderExpanded,
    // batch actions
    batchActions,
    // column toggle
    columnToggle,
    // csv export
    exportCsv,
    exportFilename = 'export',
    // density
    density,
    // visual
    striped,
    bordered,
    stickyHeader,
    rowNumbers,
    highlightOnHover,
    // row customization
    rowKey,
    getRowClassName,
    getRowHidden,
    onRowClick,
    // states
    loading,
    loadingRows,
    error,
    emptyIcon,
    // structural
    caption,
    title,
    subtitle,
    toolbarActions,
    footer,
    // actions
    actions,
  } = props

  // backward compat
  const resolvedRows = rowsProp ?? dataProp
  const allRows = useMemo(() => (resolvedRows ?? []) as T[], [resolvedRows])
  const emptyMessage = emptyMessageProp ?? emptyTextProp ?? 'No data'

  // column toggle state (local)
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set())

  function handleToggleColumn(key: string) {
    setHiddenColumns((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  // visible columns
  const visibleColumns = useMemo(
    () => allColumns.filter((c) => c.hidden !== true && !hiddenColumns.has(c.key)),
    [allColumns, hiddenColumns],
  )

  // filter hidden rows
  const filteredRows = useMemo(() => {
    if (getRowHidden === undefined) return allRows
    return allRows.filter((r) => !getRowHidden(r))
  }, [allRows, getRowHidden])

  // pagination
  const hasPagination = pageSizeProp !== undefined && onPageChange !== undefined
  const currentPage = pageProp ?? 1
  const pageSize = pageSizeProp ?? filteredRows.length
  const totalRows = totalRowsProp ?? filteredRows.length
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize))

  const displayRows = useMemo(() => {
    if (!hasPagination) return filteredRows
    // only slice if not server-side (totalRowsProp means server handles slicing)
    if (totalRowsProp !== undefined) return filteredRows
    const start = (currentPage - 1) * pageSize
    return filteredRows.slice(start, start + pageSize)
  }, [filteredRows, hasPagination, currentPage, pageSize, totalRowsProp])

  const pageOffset = hasPagination && totalRowsProp === undefined ? (currentPage - 1) * pageSize : 0

  // selection
  const hasSelection = selectable === true && onToggleSelect !== undefined
  const allRowKeys = useMemo(
    () => displayRows.map((r, i) => resolveRowKey(r, rowKey, pageOffset + i)),
    [displayRows, rowKey, pageOffset],
  )
  const allSelected = hasSelection && selectedKeys !== undefined && selectedKeys.size > 0 && allRowKeys.every((k) => selectedKeys.has(k))
  const someSelected = hasSelection && selectedKeys !== undefined && selectedKeys.size > 0

  function handleToggleSelectAll() {
    if (onToggleSelectAll !== undefined) {
      onToggleSelectAll(allSelected)
    }
  }

  // highlight
  const highlightQuery = highlightMatches !== false && globalFilter === true ? globalFilterValue : undefined

  // export
  function handleExport() {
    downloadCsv(visibleColumns, filteredRows, exportFilename)
  }

  return (
    <div
      ref={ref}
      className={cx(
        'overflow-hidden gds-radius-popover border',
        glass === true
          ? cx(glassSurface(glass), 'bg-bg/60')
          : 'border-border bg-surface',
        className,
      )}
      data-component="data-table"
      data-state={loading === true ? 'loading' : undefined}
    >
      <DataTableToolbar
        globalFilter={globalFilter}
        globalFilterValue={globalFilterValue}
        globalFilterPlaceholder={globalFilterPlaceholder}
        onGlobalFilterChange={onGlobalFilterChange}
        columnToggle={columnToggle}
        columns={allColumns}
        hiddenColumns={hiddenColumns}
        onToggleColumn={handleToggleColumn}
        exportCsv={exportCsv}
        onExport={handleExport}
        batchActions={batchActions}
        selectedKeys={selectedKeys}
        caption={caption}
        title={title}
        subtitle={subtitle}
        toolbarActions={toolbarActions}
      />

      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <DataTableHead
            columns={visibleColumns}
            density={density}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={onSort}
            stickyHeader={stickyHeader}
            rowNumbers={rowNumbers}
            hasSelection={hasSelection}
            allSelected={allSelected}
            someSelected={someSelected}
            onToggleSelectAll={handleToggleSelectAll}
            hasActions={actions !== undefined}
            hasExpand={renderExpanded !== undefined && onToggleExpand !== undefined}
            bordered={bordered}
            columnFilters={columnFilters}
            onColumnFilterChange={onColumnFilterChange}
          />
          <DataTableBody
            columns={visibleColumns}
            rows={displayRows}
            density={density}
            loading={loading}
            loadingRows={loadingRows}
            error={error}
            emptyMessage={emptyMessage}
            emptyIcon={emptyIcon}
            striped={striped}
            bordered={bordered}
            highlightOnHover={highlightOnHover}
            rowNumbers={rowNumbers}
            rowKey={rowKey}
            getRowClassName={getRowClassName}
            onRowClick={onRowClick}
            hasSelection={hasSelection}
            selectedKeys={selectedKeys}
            onToggleSelect={onToggleSelect}
            expandedKeys={expandedKeys}
            onToggleExpand={onToggleExpand}
            renderExpanded={renderExpanded}
            actions={actions}
            highlightQuery={highlightQuery}
            pageOffset={pageOffset}
          />
        </table>
      </div>

      {footer !== undefined && (
        <div className="border-t border-border px-3 py-2 text-xs text-fg-muted">{footer}</div>
      )}

      {hasPagination && (
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRows={totalRows}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          visibleRowCount={displayRows.length}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  )
}

export const DataTable = forwardRef(DataTableInner) as <T = Record<string, unknown>>(
  props: DataTableProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => ReactNode
