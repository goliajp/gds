// data-export-card — format selector + date range + export button
import { forwardRef, useState } from 'react'

import { cx } from '../utils/cx'

type DateRange = {
  from: string
  to: string
}

type DataExportCardProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  formats: string[]
  onExport: (format: string, dateRange?: DateRange) => void
  title?: string
}

const DataExportCard = forwardRef<HTMLDivElement, DataExportCardProps>(
  function DataExportCard({ formats, onExport, title = 'Export Data', className, ...props }, ref) {
    const [format, setFormat] = useState(formats[0] ?? '')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')

    function handleExport() {
      const dateRange = from !== '' && to !== '' ? { from, to } : undefined
      onExport(format, dateRange)
    }

    return (
      <div ref={ref} className={cx('gds-ctx rounded-lg border border-border bg-surface gds-pad gds-shadow', className)} data-component="data-export-card" {...props}>
        <h3 className="select-none font-medium gds-heading text-fg mb-3">{title}</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="select-none text-xs text-fg-muted">Format</label>
            <select value={format} onChange={(e) => setFormat(e.target.value)} className="rounded border border-border bg-bg px-2 py-1.5 gds-text-body text-fg">
              {formats.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-1 flex-col gap-1">
              <label className="select-none text-xs text-fg-muted">From</label>
              <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="rounded border border-border bg-bg px-2 py-1.5 gds-text-body text-fg" />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label className="select-none text-xs text-fg-muted">To</label>
              <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="rounded border border-border bg-bg px-2 py-1.5 gds-text-body text-fg" />
            </div>
          </div>
          <button type="button" onClick={handleExport} className="mt-1 rounded bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors select-none">
            Export
          </button>
        </div>
      </div>
    )
  },
)

export { DataExportCard }
export type { DataExportCardProps, DateRange }
