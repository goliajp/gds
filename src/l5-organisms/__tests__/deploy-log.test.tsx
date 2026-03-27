import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DeployLog } from '../deploy-log'

const entries = [
  { project: 'admin', device: 't01', version: 'v1.2.3', status: 'success' as const, timestamp: '2m ago' },
  { project: 'server', device: 't01', version: 'v0.9.1', status: 'failure' as const, timestamp: '1h ago' },
]

describe('DeployLog', () => {
  it('renders data-component attribute', () => {
    const { container } = render(<DeployLog entries={entries} />)
    expect(container.querySelector('[data-component="deploy-log"]')).not.toBeNull()
  })

  it('renders project names and versions', () => {
    render(<DeployLog entries={entries} />)
    expect(screen.getByText('admin')).toBeDefined()
    expect(screen.getByText('v1.2.3')).toBeDefined()
    expect(screen.getByText('server')).toBeDefined()
  })

  it('renders status badges', () => {
    render(<DeployLog entries={entries} />)
    expect(screen.getByText('success')).toBeDefined()
    expect(screen.getByText('failure')).toBeDefined()
  })

  it('renders table headers', () => {
    render(<DeployLog entries={entries} />)
    expect(screen.getByText('Project')).toBeDefined()
    expect(screen.getByText('Device')).toBeDefined()
    expect(screen.getByText('Version')).toBeDefined()
    expect(screen.getByText('Status')).toBeDefined()
    expect(screen.getByText('Time')).toBeDefined()
  })
})
