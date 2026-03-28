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

  it('applies glass styling when glass is true', () => {
    const { container } = render(<Card glass>Content</Card>)
    const el = container.querySelector('[data-component="card"]')
    expect(el?.className).toContain('bg-bg/60')
    expect(el?.className).toContain('gds-glass')
  })

  it('applies normal border when glass is false', () => {
    const { container } = render(<Card>Content</Card>)
    const el = container.querySelector('[data-component="card"]')
    expect(el?.className).toContain('border-border')
    expect(el?.className).toContain('bg-surface')
  })

  it('applies none padding variant', () => {
    const { container } = render(<Card padding="none">Content</Card>)
    const el = container.querySelector('[data-component="card"]')
    expect(el?.className).not.toContain('gds-pad')
  })

  it('applies sm padding variant', () => {
    const { container } = render(<Card padding="sm">Content</Card>)
    const el = container.querySelector('[data-component="card"]')
    expect(el?.className).toContain('gds-pad-x')
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

  it('does not render description when not provided', () => {
    render(<CardHeader title="Title Only" />)
    const el = screen.getByText('Title Only')
    expect(el.parentElement?.querySelector('p')).toBeNull()
  })

  it('renders action when provided', () => {
    render(<CardHeader title="Title" action={<button>Action</button>} />)
    expect(screen.getByText('Action')).toBeDefined()
  })

  it('does not render action when not provided', () => {
    const { container } = render(<CardHeader title="Title" />)
    const actionDiv = container.querySelector('.shrink-0')
    expect(actionDiv).toBeNull()
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
