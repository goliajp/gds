import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { OnboardingCard } from '../onboarding-card'

const steps = [
  { label: 'Create account', completed: true },
  { label: 'Verify email', completed: false },
  { label: 'Set up profile', completed: false },
]

describe('OnboardingCard', () => {
  it('renders with data-component', () => {
    const { container } = render(<OnboardingCard steps={steps} />)
    expect(container.querySelector('[data-component="onboarding-card"]')).not.toBeNull()
  })

  it('renders default title', () => {
    render(<OnboardingCard steps={steps} />)
    expect(screen.getByText('Getting Started')).toBeDefined()
  })

  it('renders step count', () => {
    render(<OnboardingCard steps={steps} />)
    expect(screen.getByText('1/3')).toBeDefined()
  })
})
