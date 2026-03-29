import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RealtimeChart } from '../realtime-chart'

describe('RealtimeChart', () => {
  it('renders canvas element', () => {
    const { container } = render(<RealtimeChart data={[1, 2, 3]} />)
    expect(container.querySelector('[data-component="realtime-chart"]')).not.toBeNull()
    expect(container.querySelector('canvas')).not.toBeNull()
  })

  it('applies custom height', () => {
    const { container } = render(<RealtimeChart data={[1, 2, 3]} height={300} />)
    const canvas = container.querySelector('canvas') as HTMLCanvasElement
    expect(canvas.style.height).toBe('300px')
  })

  it('applies custom className', () => {
    const { container } = render(<RealtimeChart className="my-chart" data={[1, 2, 3]} />)
    const canvas = container.querySelector('canvas') as HTMLCanvasElement
    expect(canvas.className).toContain('my-chart')
  })
})
