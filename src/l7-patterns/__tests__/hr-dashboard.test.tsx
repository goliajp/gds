import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HRDashboard } from '../hr-dashboard'

describe('HRDashboard', () => {
  it('renders with data-component', () => {
    const { container } = render(<HRDashboard />)
    expect(container.querySelector('[data-component="hr-dashboard"]')).not.toBeNull()
  })

  it('renders stats slot', () => {
    render(<HRDashboard stats={<div>42 Employees</div>} />)
    expect(screen.getByText('42 Employees')).toBeDefined()
  })

  it('renders onboarding and departments slots', () => {
    render(
      <HRDashboard
        onboarding={<div>New Hires</div>}
        departments={<div>Engineering: 15</div>}
      />,
    )
    expect(screen.getByText('New Hires')).toBeDefined()
    expect(screen.getByText('Engineering: 15')).toBeDefined()
  })
})
