import { forwardRef } from 'react'

import { Progress } from '../l2-primitives/progress'
import { cx } from '../utils/cx'

type ServerInfo = {
  location: string
  metrics?: { cpu: number; disk: number; mem: number }
  name: string
  status: 'offline' | 'online'
}

type ServerOverviewProps = React.HTMLAttributes<HTMLDivElement> & {
  servers: ServerInfo[]
}

function bv(v: number): 'danger' | 'success' | 'warning' {
  if (v >= 90) return 'danger'
  if (v >= 70) return 'warning'
  return 'success'
}

const rowCls = 'flex items-center gap-2'
const labelCls = 'w-8 text-[10px] text-fg-muted'
const valueCls = 'w-8 text-right text-[10px] font-mono text-fg-muted'

function MetricRow({ label, value }: { label: string; value: number }) {
  return (
    <div className={rowCls}>
      <span className={labelCls}>{label}</span>
      <Progress value={value} variant={bv(value)} size="sm" />
      <span className={valueCls}>{value}%</span>
    </div>
  )
}

export const ServerOverview = forwardRef<HTMLDivElement, ServerOverviewProps>(
  function ServerOverview({ className, servers, ...props }, ref) {
    return (
      <div
        className={cx('grid gap-3 sm:grid-cols-2 lg:grid-cols-3', className)}
        data-component="server-overview"
        ref={ref}
        {...props}
      >
        {servers.map((s) => (
          <div
            key={s.name}
            className="border-border bg-surface gds-ctx rounded-lg border p-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="gds-text-label text-fg font-medium">
                {s.name}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className={cx(
                    'h-2 w-2 rounded-full',
                    s.status === 'online' ? 'bg-success' : 'bg-danger'
                  )}
                />
                <span className="text-fg-muted text-xs">{s.status}</span>
              </span>
            </div>
            <div className="text-fg-muted mb-2 text-xs">{s.location}</div>
            {s.metrics !== undefined && (
              <div className="flex flex-col gap-1.5">
                <MetricRow label="CPU" value={s.metrics.cpu} />
                <MetricRow label="MEM" value={s.metrics.mem} />
                <MetricRow label="DISK" value={s.metrics.disk} />
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
)

export type { ServerInfo, ServerOverviewProps }
