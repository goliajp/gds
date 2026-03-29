import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Scoreboard } from '../scoreboard'

describe('Scoreboard', () => {
  it('renders without crash', () => {
    const { container } = render(<Scoreboard label="Score" score={75} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Scoreboard label="Score" score={75} />)
    expect(container.querySelector('[data-component="scoreboard"]')).not.toBeNull()
  })

  it('displays label and score', () => {
    render(<Scoreboard label="Progress" score={42} max={100} />)
    expect(screen.getByText('Progress')).toBeDefined()
    expect(screen.getByText('42')).toBeDefined()
  })

  it('renders progress bar', () => {
    const { container } = render(<Scoreboard label="Score" score={50} max={100} />)
    const bar = container.querySelector('.bg-accent')
    expect(bar).not.toBeNull()
    expect((bar as HTMLElement).style.width).toBe('50%')
  })
})
