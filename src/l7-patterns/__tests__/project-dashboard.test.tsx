import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProjectDashboard } from '../project-dashboard'

describe('ProjectDashboard', () => {
  it('renders with data-component', () => {
    const { container } = render(<ProjectDashboard />)
    expect(container.querySelector('[data-component="project-dashboard"]')).not.toBeNull()
  })

  it('renders all four slots', () => {
    const { container } = render(
      <ProjectDashboard
        activity={<div>Activity Feed</div>}
        progress={<div>Progress Bar</div>}
        tasks={<div>Task List</div>}
        team={<div>Team Members</div>}
      />,
    )
    expect(screen.getByText('Progress Bar')).toBeDefined()
    expect(screen.getByText('Team Members')).toBeDefined()
    expect(screen.getByText('Activity Feed')).toBeDefined()
    expect(screen.getByText('Task List')).toBeDefined()
    expect(container.querySelector('[data-slot="progress"]')).not.toBeNull()
    expect(container.querySelector('[data-slot="tasks"]')).not.toBeNull()
  })

  it('omits empty slots', () => {
    const { container } = render(<ProjectDashboard progress={<div>Only Progress</div>} />)
    expect(container.querySelector('[data-slot="progress"]')).not.toBeNull()
    expect(container.querySelector('[data-slot="team"]')).toBeNull()
    expect(container.querySelector('[data-slot="activity"]')).toBeNull()
    expect(container.querySelector('[data-slot="tasks"]')).toBeNull()
  })
})
