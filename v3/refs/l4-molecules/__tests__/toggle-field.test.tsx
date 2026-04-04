import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ToggleField } from '../toggle-field'

describe('ToggleField', () => {
  it('renders label', () => {
    render(
      <ToggleField label="Dark mode" checked={false} onChange={() => {}} />
    )
    expect(screen.getByText('Dark mode')).toBeDefined()
  })

  it('renders description when provided', () => {
    render(
      <ToggleField
        label="Notifications"
        description="Receive email alerts"
        checked={true}
        onChange={() => {}}
      />
    )
    expect(screen.getByText('Receive email alerts')).toBeDefined()
  })

  it('calls onChange when switch is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ToggleField label="Auto-save" checked={false} onChange={onChange} />
    )
    await user.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
