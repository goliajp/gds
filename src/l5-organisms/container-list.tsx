import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type ContainerStatus = 'paused' | 'running' | 'stopped'

type ContainerInfo = {
  image: string
  name: string
  ports?: string
  status: ContainerStatus
}

type ContainerListProps = React.HTMLAttributes<HTMLDivElement> & {
  containers: ContainerInfo[]
}

const dotCls: Record<ContainerStatus, string> = {
  running: 'bg-success',
  stopped: 'bg-danger',
  paused: 'bg-warning',
}

export const ContainerList = forwardRef<HTMLDivElement, ContainerListProps>(
  function ContainerList({ className, containers, ...props }, ref) {
    return (
      <div
        className={cx(
          'gds-radius-popover border-border overflow-hidden border',
          className
        )}
        data-component="container-list"
        ref={ref}
        {...props}
      >
        <table className="w-full">
          <thead>
            <tr className="bg-bg-tertiary/50 gds-text-body text-fg-muted text-left">
              <th className="px-3 py-1.5 font-medium">Name</th>
              <th className="px-3 py-1.5 font-medium">Image</th>
              <th className="px-3 py-1.5 font-medium">Status</th>
              <th className="px-3 py-1.5 font-medium">Ports</th>
            </tr>
          </thead>
          <tbody>
            {containers.map((c) => (
              <tr
                key={c.name}
                className="border-border gds-text-body hover:bg-bg-tertiary/30 border-t transition-colors"
              >
                <td className="text-fg px-3 py-1.5 font-medium">{c.name}</td>
                <td className="text-fg-muted px-3 py-1.5 font-mono text-xs">
                  {c.image}
                </td>
                <td className="px-3 py-1.5">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={cx('h-2 w-2 rounded-full', dotCls[c.status])}
                    />
                    <span className="text-fg-muted">{c.status}</span>
                  </span>
                </td>
                <td className="text-fg-muted px-3 py-1.5 font-mono text-xs">
                  {c.ports ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
)

export type { ContainerInfo, ContainerListProps, ContainerStatus }
