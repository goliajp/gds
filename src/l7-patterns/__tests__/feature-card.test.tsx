import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FeatureCard } from '../feature-card'

describe('FeatureCard', () => {
  it('renders title', () => {
    render(<FeatureCard title="Fast Build" />)
    expect(screen.getByText('Fast Build')).toBeDefined()
  })

  it('renders description when provided', () => {
    render(<FeatureCard title="Title" description="Some description text" />)
    expect(screen.getByText('Some description text')).toBeDefined()
  })

  it('renders icon when provided', () => {
    render(<FeatureCard title="Title" icon={<span data-testid="icon">IC</span>} />)
    expect(screen.getByTestId('icon')).toBeDefined()
  })

  it('renders action when provided', () => {
    render(<FeatureCard title="Title" action={<button>Learn More</button>} />)
    expect(screen.getByText('Learn More')).toBeDefined()
  })
})
