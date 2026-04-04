// permission-matrix — role/permission grid with checkbox intersections
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type PermissionMatrixProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  roles: string[]
  permissions: string[]
  values: boolean[][]
  onChange?: (perm: number, role: number, value: boolean) => void
  readonly?: boolean
}

const PermissionMatrix = forwardRef<HTMLDivElement, PermissionMatrixProps>(
  function PermissionMatrix(
    { roles, permissions, values, onChange, readonly, className, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx('overflow-auto', className)}
        data-component="permission-matrix"
        {...props}
      >
        <table className="gds-text-body w-full border-collapse">
          <thead>
            <tr>
              <th className="border-border bg-bg-secondary text-fg-muted border px-3 py-2 text-left font-medium select-none">
                Permission
              </th>
              {roles.map((role) => (
                <th
                  key={role}
                  className="border-border bg-bg-secondary text-fg-muted border px-3 py-2 text-center font-medium select-none"
                >
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, pi) => (
              <tr key={perm}>
                <td className="border-border text-fg border px-3 py-2 select-none">
                  {perm}
                </td>
                {roles.map((_, ri) => {
                  const checked = values[pi]?.[ri] ?? false
                  return (
                    <td
                      key={ri}
                      className="border-border border px-3 py-2 text-center"
                    >
                      {readonly === true ? (
                        <span
                          className={checked ? 'text-success' : 'text-fg-muted'}
                        >
                          {checked ? '✓' : '—'}
                        </span>
                      ) : (
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => onChange?.(pi, ri, e.target.checked)}
                          className="accent-accent cursor-pointer"
                          aria-label={`${perm} - ${roles[ri]}`}
                        />
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
)

export { PermissionMatrix }
export type { PermissionMatrixProps }
