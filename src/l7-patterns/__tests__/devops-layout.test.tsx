import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { DevOpsLayout } from '../devops-layout'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'containers', label: 'Containers' },
]

describe('DevOpsLayout', () => {
  it('renders data-component attribute', () => {
    const { container } = render(
      <DevOpsLayout tabs={tabs} activeTab="overview" onTabChange={() => {}}>
        content
      </DevOpsLayout>
    )
    expect(
      container.querySelector('[data-component="devops-layout"]')
    ).not.toBeNull()
  })

  it('renders tab labels and children', () => {
    render(
      <DevOpsLayout tabs={tabs} activeTab="overview" onTabChange={() => {}}>
        <div>Main Content</div>
      </DevOpsLayout>
    )
    expect(screen.getByText('Overview')).toBeDefined()
    expect(screen.getByText('Containers')).toBeDefined()
    expect(screen.getByText('Main Content')).toBeDefined()
  })

  it('calls onTabChange when tab is clicked', () => {
    const handler = vi.fn()
    render(
      <DevOpsLayout tabs={tabs} activeTab="overview" onTabChange={handler}>
        content
      </DevOpsLayout>
    )
    screen.getByText('Containers').click()
    expect(handler).toHaveBeenCalledWith('containers')
  })
})
