import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card, CardContent, CardFooter, CardHeader } from '../card'

describe('Card', () => {
  it('renders without crash', () => {
    const { container } = render(<Card>Content</Card>)
    expect(container.querySelector('[data-component="card"]')).not.toBeNull()
  })

  it('renders children', () => {
    render(<Card>Card body</Card>)
    expect(screen.getByText('Card body')).toBeDefined()
  })

  it('renders loading state', () => {
    const { container } = render(<Card loading>Content</Card>)
    const el = container.querySelector('[data-component="card"]')
    expect(el?.getAttribute('data-state')).toBe('loading')
  })

  it('applies padding variant', () => {
    const { container } = render(<Card padding="lg">Content</Card>)
    const el = container.querySelector('[data-component="card"]')
    expect(el?.className).toContain('gds-pad-x-lg')
  })
})

describe('CardHeader', () => {
  it('renders title', () => {
    render(<CardHeader title="My Title" />)
    expect(screen.getByText('My Title')).toBeDefined()
  })

  it('renders description', () => {
    render(<CardHeader title="Title" description="Some desc" />)
    expect(screen.getByText('Some desc')).toBeDefined()
  })
})

describe('CardContent', () => {
  it('renders children', () => {
    render(<CardContent>Inner content</CardContent>)
    expect(screen.getByText('Inner content')).toBeDefined()
  })
})

describe('CardFooter', () => {
  it('renders children', () => {
    render(<CardFooter>Footer content</CardFooter>)
    expect(screen.getByText('Footer content')).toBeDefined()
  })
})
