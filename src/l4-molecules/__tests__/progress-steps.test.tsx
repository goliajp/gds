import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProgressSteps } from '../progress-steps'

const steps = ['Upload', 'Review', 'Confirm', 'Done']

describe('ProgressSteps', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<ProgressSteps steps={steps} current={0} />)
    expect(
      container.querySelector('[data-component="progress-steps"]')
    ).not.toBeNull()
  })

  it('has role="list"', () => {
    render(<ProgressSteps steps={steps} current={1} />)
    expect(screen.getByRole('list')).toBeDefined()
  })

  it('renders all step labels', () => {
    render(<ProgressSteps steps={steps} current={0} />)
    expect(screen.getByText('Upload')).toBeDefined()
    expect(screen.getByText('Review')).toBeDefined()
    expect(screen.getByText('Confirm')).toBeDefined()
    expect(screen.getByText('Done')).toBeDefined()
  })

  it('renders check icon for completed steps', () => {
    const { container } = render(<ProgressSteps steps={steps} current={2} />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBe(2)
  })
})
