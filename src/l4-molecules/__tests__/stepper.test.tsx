import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Stepper } from '../stepper'

describe('Stepper', () => {
  const steps = [
    { label: 'Step 1', description: 'First' },
    { label: 'Step 2' },
    { label: 'Step 3' },
  ]

  it('renders without crash', () => {
    const { container } = render(<Stepper steps={steps} current={0} />)
    expect(container.querySelector('[data-component="stepper"]')).not.toBeNull()
  })

  it('has role="list"', () => {
    render(<Stepper steps={steps} current={0} />)
    expect(screen.getByRole('list')).toBeDefined()
  })

  it('renders all step labels', () => {
    render(<Stepper steps={steps} current={1} />)
    expect(screen.getByText('Step 1')).toBeDefined()
    expect(screen.getByText('Step 2')).toBeDefined()
    expect(screen.getByText('Step 3')).toBeDefined()
  })

  it('renders step description', () => {
    render(<Stepper steps={steps} current={0} />)
    expect(screen.getByText('First')).toBeDefined()
  })

  it('shows step numbers for non-completed steps', () => {
    render(<Stepper steps={steps} current={1} />)
    // step 2 is current (index 1), step 3 is upcoming (index 2)
    expect(screen.getByText('2')).toBeDefined()
    expect(screen.getByText('3')).toBeDefined()
  })

  it('renders completed steps with check icon instead of number', () => {
    const { container } = render(<Stepper steps={steps} current={2} />)
    // steps 0 and 1 are completed, should have svg check marks
    const svgs = container.querySelectorAll('svg')
    // at least 2 check svgs for completed steps
    expect(svgs.length).toBeGreaterThanOrEqual(2)
  })
})
