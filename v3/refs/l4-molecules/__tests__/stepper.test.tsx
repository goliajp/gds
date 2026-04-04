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

  it('renders vertical orientation', () => {
    const { container } = render(
      <Stepper steps={steps} current={1} orientation="vertical" />
    )
    const root = container.querySelector('[data-component="stepper"]')
    expect(root?.className).toContain('flex-col')
  })

  it('renders horizontal orientation by default', () => {
    const { container } = render(<Stepper steps={steps} current={1} />)
    const root = container.querySelector('[data-component="stepper"]')
    expect(root?.className).toContain('items-start')
    expect(root?.className).not.toContain('flex-col')
  })

  it('renders connecting lines between steps', () => {
    const { container } = render(<Stepper steps={steps} current={1} />)
    // 3 steps = 2 connecting lines
    const lines = container.querySelectorAll('.h-px.flex-1')
    expect(lines.length).toBe(2)
  })

  it('renders vertical connecting lines', () => {
    const { container } = render(
      <Stepper steps={steps} current={1} orientation="vertical" />
    )
    const lines = container.querySelectorAll('.w-px')
    expect(lines.length).toBe(2)
  })

  it('colors completed connecting lines with accent', () => {
    const { container } = render(<Stepper steps={steps} current={2} />)
    const lines = container.querySelectorAll('.h-px.flex-1')
    expect(lines[0]?.className).toContain('bg-accent')
    expect(lines[1]?.className).toContain('bg-accent')
  })

  it('colors incomplete connecting lines with border', () => {
    const { container } = render(<Stepper steps={steps} current={0} />)
    const lines = container.querySelectorAll('.h-px.flex-1')
    expect(lines[0]?.className).toContain('bg-border')
  })

  it('applies active styling to current step circle', () => {
    const { container } = render(<Stepper steps={steps} current={1} />)
    const activeCircle = container.querySelector('.border-accent.ring-2')
    expect(activeCircle).not.toBeNull()
  })

  it('renders description only for steps that have one', () => {
    render(<Stepper steps={steps} current={0} />)
    expect(screen.getByText('First')).toBeDefined()
    // Step 2 and Step 3 have no description
  })
})
