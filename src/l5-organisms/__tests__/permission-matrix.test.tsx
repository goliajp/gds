import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { PermissionMatrix } from '../permission-matrix'

const roles = ['Admin', 'Editor', 'Viewer']
const permissions = ['Read', 'Write', 'Delete']
const values = [
  [true, true, true],
  [true, true, false],
  [true, false, false],
]

describe('PermissionMatrix', () => {
  it('renders role headers and permission rows', () => {
    render(
      <PermissionMatrix
        roles={roles}
        permissions={permissions}
        values={values}
      />
    )
    expect(screen.getByText('Admin')).toBeDefined()
    expect(screen.getByText('Editor')).toBeDefined()
    expect(screen.getByText('Read')).toBeDefined()
    expect(screen.getByText('Delete')).toBeDefined()
  })

  it('renders checkboxes in editable mode', () => {
    render(
      <PermissionMatrix
        roles={roles}
        permissions={permissions}
        values={values}
      />
    )
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBe(9)
  })

  it('calls onChange when checkbox is toggled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <PermissionMatrix
        roles={roles}
        permissions={permissions}
        values={values}
        onChange={onChange}
      />
    )
    const checkbox = screen.getByLabelText('Delete - Viewer')
    await user.click(checkbox)
    expect(onChange).toHaveBeenCalledWith(2, 2, true)
  })

  it('shows check/dash in readonly mode', () => {
    render(
      <PermissionMatrix
        roles={roles}
        permissions={permissions}
        values={values}
        readonly
      />
    )
    expect(screen.queryAllByRole('checkbox').length).toBe(0)
    expect(screen.getAllByText('✓').length).toBe(6)
    expect(screen.getAllByText('—').length).toBe(3)
  })
})
