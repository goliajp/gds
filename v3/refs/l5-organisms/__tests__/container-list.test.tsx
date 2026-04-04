import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ContainerList } from '../container-list'

const containers = [
  {
    name: 'api-server',
    image: 'goliajp/server:latest',
    status: 'running' as const,
    ports: '3100:3100',
  },
  { name: 'postgres', image: 'postgres:16', status: 'stopped' as const },
]

describe('ContainerList', () => {
  it('renders data-component attribute', () => {
    const { container } = render(<ContainerList containers={containers} />)
    expect(
      container.querySelector('[data-component="container-list"]')
    ).not.toBeNull()
  })

  it('renders container names and images', () => {
    render(<ContainerList containers={containers} />)
    expect(screen.getByText('api-server')).toBeDefined()
    expect(screen.getByText('goliajp/server:latest')).toBeDefined()
    expect(screen.getByText('postgres')).toBeDefined()
  })

  it('renders table headers', () => {
    render(<ContainerList containers={containers} />)
    expect(screen.getByText('Name')).toBeDefined()
    expect(screen.getByText('Image')).toBeDefined()
    expect(screen.getByText('Status')).toBeDefined()
    expect(screen.getByText('Ports')).toBeDefined()
  })
})
