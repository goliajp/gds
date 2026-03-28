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

  it('renders custom title', () => {
    render(<OnboardingCard steps={steps} title="Setup Guide" />)
    expect(screen.getByText('Setup Guide')).toBeDefined()
  })

  it('renders step action for incomplete steps', () => {
    const stepsWithAction = [
      { label: 'Verify email', completed: false, action: <button>Verify</button> },
    ]
    render(<OnboardingCard steps={stepsWithAction} />)
    expect(screen.getByText('Verify')).toBeDefined()
  })

  it('does not render action for completed steps', () => {
    const stepsWithAction = [
      { label: 'Create account', completed: true, action: <button>Redo</button> },
    ]
    const { container } = render(<OnboardingCard steps={stepsWithAction} />)
    expect(container.textContent).not.toContain('Redo')
  })

  it('shows checkmark for completed steps', () => {
    const { container } = render(<OnboardingCard steps={steps} />)
    expect(container.textContent).toContain('\u2713')
  })

  it('shows step number for incomplete steps', () => {
    const { container } = render(<OnboardingCard steps={[{ label: 'Step one', completed: false }]} />)
    expect(container.textContent).toContain('1')
  })

  it('handles empty steps array', () => {
    render(<OnboardingCard steps={[]} />)
    expect(screen.getByText('0/0')).toBeDefined()
  })
})
