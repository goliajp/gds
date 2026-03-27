import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ScreenOverlay } from '../screen-overlay'

describe('ScreenOverlay', () => {
  it('renders nothing when not visible', () => {
    render(<ScreenOverlay visible={false} />)
    expect(document.querySelector('[data-component="screen-overlay"]')).toBeNull()
  })

  it('renders portal when visible', () => {
    render(<ScreenOverlay visible />)
    expect(document.querySelector('[data-component="screen-overlay"]')).not.toBeNull()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<ScreenOverlay visible onClick={onClick} />)
    const el = document.querySelector('[data-component="screen-overlay"]') as HTMLElement
    el.click()
    expect(onClick).toHaveBeenCalledOnce()
  })
})
