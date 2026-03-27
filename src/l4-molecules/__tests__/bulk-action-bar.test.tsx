import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { BulkActionBar } from '../bulk-action-bar'

describe('BulkActionBar', () => {
  it('renders nothing when count is 0', () => {
    const { container } = render(<BulkActionBar count={0} actions={<button>Delete</button>} />)
    expect(container.querySelector('[data-component="bulk-action-bar"]')).toBeNull()
  })

  it('renders count and actions when count > 0', () => {
    render(<BulkActionBar count={5} actions={<button>Delete</button>} />)
    expect(screen.getByText('5 selected')).toBeDefined()
    expect(screen.getByText('Delete')).toBeDefined()
  })

  it('calls onClear when clear button clicked', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    render(<BulkActionBar count={3} actions={<button>Act</button>} onClear={onClear} />)
    await user.click(screen.getByLabelText('Clear selection'))
    expect(onClear).toHaveBeenCalledOnce()
  })
})
