import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { TourStep } from '../tour'
import { Tour } from '../tour'

const steps: TourStep[] = [
  { title: 'Welcome', description: 'This is step one' },
  { title: 'Feature A', description: 'Learn about feature A', image: '/a.png' },
  { title: 'Done', description: 'All done!' },
]

describe('Tour', () => {
  it('renders nothing when active is false', () => {
    const { container } = render(
      <Tour active={false} onComplete={vi.fn()} steps={steps} />,
    )
    expect(container.querySelector('[data-component="tour"]')).toBeNull()
  })

  it('renders with data-component attribute when active', () => {
    const { container } = render(
      <Tour active onComplete={vi.fn()} steps={steps} />,
    )
    expect(container.querySelector('[data-component="tour"]')).not.toBeNull()
  })

  it('shows first step title and description', () => {
    render(<Tour active onComplete={vi.fn()} steps={steps} />)
    expect(screen.getByText('Welcome')).toBeDefined()
    expect(screen.getByText('This is step one')).toBeDefined()
  })

  it('shows step counter', () => {
    render(<Tour active onComplete={vi.fn()} steps={steps} />)
    expect(screen.getByText(/Step 1 of 3/)).toBeDefined()
  })

  it('shows Next button on non-last step', () => {
    render(<Tour active onComplete={vi.fn()} steps={steps} />)
    expect(screen.getByText('Next')).toBeDefined()
  })

  it('does not show Back button on first step', () => {
    render(<Tour active onComplete={vi.fn()} steps={steps} />)
    expect(screen.queryByText('Back')).toBeNull()
  })

  it('advances to next step when Next is clicked', () => {
    render(<Tour active onComplete={vi.fn()} steps={steps} />)
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Feature A')).toBeDefined()
    expect(screen.getByText(/Step 2 of 3/)).toBeDefined()
  })

  it('shows Back button on non-first step', () => {
    render(<Tour active onComplete={vi.fn()} steps={steps} />)
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Back')).toBeDefined()
  })

  it('goes back to previous step when Back is clicked', () => {
    render(<Tour active onComplete={vi.fn()} steps={steps} />)
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Back'))
    expect(screen.getByText('Welcome')).toBeDefined()
  })

  it('shows Done button on last step', () => {
    render(<Tour active onComplete={vi.fn()} steps={steps} />)
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Next'))
    // "Done" appears as both step title and button text
    const doneElements = screen.getAllByText('Done')
    const button = doneElements.find((el: Element) => el.tagName === 'BUTTON')
    expect(button).toBeDefined()
  })

  it('calls onComplete when Done is clicked', () => {
    const onComplete = vi.fn()
    render(<Tour active onComplete={onComplete} steps={steps} />)
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Next'))
    // "Done" is both a step title and the button text; get the button
    const doneButtons = screen.getAllByText('Done')
    const button = doneButtons.find((el: Element) => el.tagName === 'BUTTON')
    if (button !== undefined) {
      fireEvent.click(button)
    }
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('renders step image when provided', () => {
    render(<Tour active onComplete={vi.fn()} steps={steps} />)
    fireEvent.click(screen.getByText('Next'))
    const img = screen.getByRole('img')
    expect(img.getAttribute('src')).toBe('/a.png')
    expect(img.getAttribute('alt')).toBe('Feature A')
  })

  it('does not render image when not provided', () => {
    render(<Tour active onComplete={vi.fn()} steps={steps} />)
    expect(screen.queryByRole('img')).toBeNull()
  })

  it('shows skip button when onSkip is provided', () => {
    render(
      <Tour active onComplete={vi.fn()} onSkip={vi.fn()} steps={steps} />,
    )
    expect(screen.getByLabelText('Close tour')).toBeDefined()
  })

  it('does not show skip button when onSkip is not provided', () => {
    render(<Tour active onComplete={vi.fn()} steps={steps} />)
    expect(screen.queryByLabelText('Close tour')).toBeNull()
  })

  it('calls onSkip when skip button is clicked', () => {
    const onSkip = vi.fn()
    render(<Tour active onComplete={vi.fn()} onSkip={onSkip} steps={steps} />)
    fireEvent.click(screen.getByLabelText('Close tour'))
    expect(onSkip).toHaveBeenCalledTimes(1)
  })

  it('navigates via keyboard ArrowRight', () => {
    render(<Tour active onComplete={vi.fn()} steps={steps} />)
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(screen.getByText('Feature A')).toBeDefined()
  })

  it('navigates via keyboard ArrowLeft', () => {
    render(<Tour active onComplete={vi.fn()} steps={steps} />)
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    expect(screen.getByText('Welcome')).toBeDefined()
  })

  it('does not go below step 0 on ArrowLeft', () => {
    render(<Tour active onComplete={vi.fn()} steps={steps} />)
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    expect(screen.getByText('Welcome')).toBeDefined()
  })

  it('calls onSkip on Escape key', () => {
    const onSkip = vi.fn()
    render(<Tour active onComplete={vi.fn()} onSkip={onSkip} steps={steps} />)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onSkip).toHaveBeenCalledTimes(1)
  })

  it('renders dot indicators for each step', () => {
    const { container } = render(
      <Tour active onComplete={vi.fn()} steps={steps} />,
    )
    const dots = container.querySelectorAll('.rounded-full.h-2')
    expect(dots.length).toBe(3)
  })

  it('navigates to step when dot is clicked', () => {
    const { container } = render(
      <Tour active onComplete={vi.fn()} steps={steps} />,
    )
    const dots = container.querySelectorAll('.rounded-full.h-2')
    fireEvent.click(dots[2])
    // should show step 3 content
    expect(screen.getByText('All done!')).toBeDefined()
  })

  it('centers card when no target is provided', () => {
    const { container } = render(
      <Tour active onComplete={vi.fn()} steps={steps} />,
    )
    const card = container.querySelector('[role="dialog"]')
    expect(card?.className).toContain('-translate-x-1/2')
    expect(card?.className).toContain('-translate-y-1/2')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Tour active className="my-tour" onComplete={vi.fn()} steps={steps} />,
    )
    const root = container.querySelector('[data-component="tour"]')
    expect(root?.className).toContain('my-tour')
  })

  it('forwards ref', () => {
    let divRef: HTMLDivElement | null = null
    render(
      <Tour
        active
        onComplete={vi.fn()}
        ref={(el) => { divRef = el }}
        steps={steps}
      />,
    )
    expect(divRef).not.toBeNull()
    expect((divRef as unknown as HTMLElement)?.tagName).toBe('DIV')
  })

  it('renders with target step that has placement', () => {
    const stepsWithTarget: TourStep[] = [
      { title: 'Step', description: 'Desc', target: '#nonexistent', placement: 'right' },
    ]
    const { container } = render(
      <Tour active onComplete={vi.fn()} steps={stepsWithTarget} />,
    )
    // target not found, so card should be centered
    const card = container.querySelector('[role="dialog"]')
    expect(card?.className).toContain('-translate-x-1/2')
  })

  it('returns null when steps array leads to undefined current step', () => {
    const { container } = render(
      <Tour active onComplete={vi.fn()} steps={[]} />,
    )
    expect(container.querySelector('[data-component="tour"]')).toBeNull()
  })

  it('renders with target step with placement=top', () => {
    const el = document.createElement('div')
    el.id = 'tour-target-top'
    el.getBoundingClientRect = () => ({
      top: 200, left: 100, width: 80, height: 30, bottom: 230, right: 180, x: 100, y: 200, toJSON: () => '',
    })
    el.scrollIntoView = vi.fn()
    document.body.appendChild(el)

    const stepsWithTarget: TourStep[] = [
      { title: 'Top', description: 'Desc', target: '#tour-target-top', placement: 'top' },
    ]
    const { container } = render(<Tour active onComplete={vi.fn()} steps={stepsWithTarget} />)
    const card = container.querySelector('[role="dialog"]')
    expect(card).not.toBeNull()
    expect(card?.className).not.toContain('-translate-x-1/2')
    document.body.removeChild(el)
  })

  it('renders with target step with placement=left', () => {
    const el = document.createElement('div')
    el.id = 'tour-target-left'
    el.getBoundingClientRect = () => ({
      top: 200, left: 300, width: 80, height: 30, bottom: 230, right: 380, x: 300, y: 200, toJSON: () => '',
    })
    el.scrollIntoView = vi.fn()
    document.body.appendChild(el)

    const stepsWithTarget: TourStep[] = [
      { title: 'Left', description: 'Desc', target: '#tour-target-left', placement: 'left' },
    ]
    const { container } = render(<Tour active onComplete={vi.fn()} steps={stepsWithTarget} />)
    const card = container.querySelector('[role="dialog"]')
    expect(card).not.toBeNull()
    document.body.removeChild(el)
  })

  it('renders with target step with placement=right', () => {
    const el = document.createElement('div')
    el.id = 'tour-target-right'
    el.getBoundingClientRect = () => ({
      top: 200, left: 100, width: 80, height: 30, bottom: 230, right: 180, x: 100, y: 200, toJSON: () => '',
    })
    el.scrollIntoView = vi.fn()
    document.body.appendChild(el)

    const stepsWithTarget: TourStep[] = [
      { title: 'Right', description: 'Desc', target: '#tour-target-right', placement: 'right' },
    ]
    const { container } = render(<Tour active onComplete={vi.fn()} steps={stepsWithTarget} />)
    const card = container.querySelector('[role="dialog"]')
    expect(card).not.toBeNull()
    document.body.removeChild(el)
  })

  it('renders with target step with default placement=bottom', () => {
    const el = document.createElement('div')
    el.id = 'tour-target-bottom'
    el.getBoundingClientRect = () => ({
      top: 100, left: 100, width: 80, height: 30, bottom: 130, right: 180, x: 100, y: 100, toJSON: () => '',
    })
    el.scrollIntoView = vi.fn()
    document.body.appendChild(el)

    const stepsWithTarget: TourStep[] = [
      { title: 'Bottom', description: 'Desc', target: '#tour-target-bottom' },
    ]
    const { container } = render(<Tour active onComplete={vi.fn()} steps={stepsWithTarget} />)
    const card = container.querySelector('[role="dialog"]')
    expect(card).not.toBeNull()
    document.body.removeChild(el)
  })

  it('renders spotlight ring when target element is found', () => {
    const el = document.createElement('div')
    el.id = 'tour-ring'
    el.getBoundingClientRect = () => ({
      top: 100, left: 100, width: 80, height: 30, bottom: 130, right: 180, x: 100, y: 100, toJSON: () => '',
    })
    el.scrollIntoView = vi.fn()
    document.body.appendChild(el)

    const stepsWithTarget: TourStep[] = [
      { title: 'Ring', description: 'Desc', target: '#tour-ring' },
    ]
    const { container } = render(<Tour active onComplete={vi.fn()} steps={stepsWithTarget} />)
    // spotlight ring has ring-2 ring-accent
    const ring = container.querySelector('.ring-2.ring-accent')
    expect(ring).not.toBeNull()
    document.body.removeChild(el)
  })

  it('handles target with invalid selector gracefully', () => {
    const stepsWithBadTarget: TourStep[] = [
      { title: 'Bad', description: 'Desc', target: '[[[invalid' },
    ]
    const { container } = render(<Tour active onComplete={vi.fn()} steps={stepsWithBadTarget} />)
    const card = container.querySelector('[role="dialog"]')
    expect(card?.className).toContain('-translate-x-1/2')
  })

  it('handles step without target (target undefined)', () => {
    const stepsNoTarget: TourStep[] = [
      { title: 'No target', description: 'Desc' },
    ]
    const { container } = render(<Tour active onComplete={vi.fn()} steps={stepsNoTarget} />)
    const card = container.querySelector('[role="dialog"]')
    expect(card?.className).toContain('-translate-x-1/2')
  })
})
