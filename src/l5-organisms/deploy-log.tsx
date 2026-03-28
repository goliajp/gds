// deploy-log — CI/deploy log table with status badges
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type DeployLogEntry = { project: string; device: string; version: string; status: 'failure' | 'pending' | 'success'; timestamp: string }
export type DeployLogProps = { entries: DeployLogEntry[]; className?: string }

const statusCls: Record<DeployLogEntry['status'], string> = { success: 'bg-success/15 text-success', failure: 'bg-danger/15 text-danger', pending: 'bg-warning/15 text-warning' }

export const DeployLog = forwardRef<HTMLDivElement, DeployLogProps>(
  function DeployLog({ entries, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx('gds-radius-popover overflow-hidden border border-border', className)}
        data-component="deploy-log"
      >
        <table className="w-full">
          <thead>
            <tr className="bg-bg-tertiary/50 text-left gds-text-body text-fg-muted">
              <th className="px-3 py-1.5 font-medium">Project</th>
              <th className="px-3 py-1.5 font-medium">Device</th>
              <th className="px-3 py-1.5 font-medium">Version</th>
              <th className="px-3 py-1.5 font-medium">Status</th>
              <th className="px-3 py-1.5 font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={`${e.project}-${e.timestamp}-${i}`} className="border-t border-border gds-text-body hover:bg-bg-tertiary/30 transition-colors">
                <td className="px-3 py-1.5 font-medium text-fg">{e.project}</td>
                <td className="px-3 py-1.5 text-fg-muted">{e.device}</td>
                <td className="px-3 py-1.5 font-mono text-fg-muted">{e.version}</td>
                <td className="px-3 py-1.5">
                  <span className={cx('rounded-full px-2 py-0.5 text-[10px] font-medium', statusCls[e.status])}>
                    {e.status}
                  </span>
                </td>
                <td className="px-3 py-1.5 text-fg-muted">{e.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },
)
