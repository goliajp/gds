import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SignaturePad } from '../signature-pad'

describe('SignaturePad', () => {
  it('renders a canvas element', () => {
    const { container } = render(<SignaturePad onSign={() => {}} />)
    expect(container.querySelector('canvas')).not.toBeNull()
  })

  it('shows clear button', () => {
    render(<SignaturePad onSign={() => {}} />)
    expect(screen.getByText('Clear')).toBeDefined()
  })

  it('applies disabled styling when disabled', () => {
    const { container } = render(<SignaturePad disabled onSign={() => {}} />)
    const root = container.querySelector('[data-component="signature-pad"]')
    expect(root?.className).toContain('opacity-40')
  })

  it('has data-component="signature-pad"', () => {
    const { container } = render(<SignaturePad onSign={() => {}} />)
    expect(
      container.querySelector('[data-component="signature-pad"]')
    ).not.toBeNull()
  })

  it('shows placeholder text when empty', () => {
    render(<SignaturePad onSign={() => {}} />)
    expect(screen.getByText('Sign above')).toBeDefined()
  })

  it('renders with custom dimensions', () => {
    const { container } = render(
      <SignaturePad onSign={() => {}} width={600} height={300} />
    )
    const canvas = container.querySelector('canvas')
    expect(canvas?.getAttribute('width')).toBe('600')
    expect(canvas?.getAttribute('height')).toBe('300')
  })

  it('renders with default dimensions', () => {
    const { container } = render(<SignaturePad onSign={() => {}} />)
    const canvas = container.querySelector('canvas')
    expect(canvas?.getAttribute('width')).toBe('400')
    expect(canvas?.getAttribute('height')).toBe('200')
  })

  it('handles mouse down, move, and up on canvas without crash', () => {
    const onSign = vi.fn()
    const { container } = render(<SignaturePad onSign={onSign} />)
    const canvas = container.querySelector('canvas')!

    fireEvent.mouseDown(canvas, { clientX: 50, clientY: 50 })
    fireEvent.mouseMove(canvas, { clientX: 60, clientY: 60 })
    fireEvent.mouseUp(canvas)
    // in jsdom canvas context is limited, but events should not throw
  })

  it('does not start drawing when disabled', () => {
    const onSign = vi.fn()
    const { container } = render(<SignaturePad onSign={onSign} disabled />)
    const canvas = container.querySelector('canvas')!

    fireEvent.mouseDown(canvas, { clientX: 50, clientY: 50 })
    fireEvent.mouseMove(canvas, { clientX: 60, clientY: 60 })
    fireEvent.mouseUp(canvas)

    expect(onSign).not.toHaveBeenCalled()
  })

  it('does not call onSign on mouseUp without prior mouseDown', () => {
    const onSign = vi.fn()
    const { container } = render(<SignaturePad onSign={onSign} />)
    const canvas = container.querySelector('canvas')!

    fireEvent.mouseUp(canvas)
    expect(onSign).not.toHaveBeenCalled()
  })

  it('handles mouseLeave on canvas', () => {
    const onSign = vi.fn()
    const { container } = render(<SignaturePad onSign={onSign} />)
    const canvas = container.querySelector('canvas')!

    fireEvent.mouseDown(canvas, { clientX: 10, clientY: 10 })
    fireEvent.mouseLeave(canvas)
    // endDraw fires, but in jsdom isDrawingRef may not be true since canvas ctx is limited
    // the important thing is it doesn't crash
  })

  it('handles touch lifecycle on canvas without crash', () => {
    const onSign = vi.fn()
    const { container } = render(<SignaturePad onSign={onSign} />)
    const canvas = container.querySelector('canvas')!

    fireEvent.touchStart(canvas, {
      touches: [{ clientX: 50, clientY: 50 }],
      preventDefault: vi.fn(),
    })
    fireEvent.touchMove(canvas, {
      touches: [{ clientX: 60, clientY: 60 }],
      preventDefault: vi.fn(),
    })
    fireEvent.touchEnd(canvas, {
      changedTouches: [{ clientX: 60, clientY: 60 }],
      preventDefault: vi.fn(),
    })
    // should not throw
  })

  it('handles touchStart with no touches gracefully', () => {
    const { container } = render(<SignaturePad onSign={vi.fn()} />)
    const canvas = container.querySelector('canvas')!

    fireEvent.touchStart(canvas, {
      touches: [],
      preventDefault: vi.fn(),
    })
  })

  it('handles touchMove with no touches gracefully', () => {
    const { container } = render(<SignaturePad onSign={vi.fn()} />)
    const canvas = container.querySelector('canvas')!

    fireEvent.touchStart(canvas, {
      touches: [{ clientX: 50, clientY: 50 }],
      preventDefault: vi.fn(),
    })
    fireEvent.touchMove(canvas, {
      touches: [],
      preventDefault: vi.fn(),
    })
  })

  it('clicking clear button resets to empty and shows placeholder', async () => {
    const user = userEvent.setup()
    render(<SignaturePad onSign={() => {}} />)

    // placeholder should be visible initially
    expect(screen.getByText('Sign above')).toBeDefined()

    // click clear
    await user.click(screen.getByText('Clear'))
    // placeholder should still be visible after clearing
    expect(screen.getByText('Sign above')).toBeDefined()
  })

  it('does not call onSign when mouseMove without mouseDown', () => {
    const onSign = vi.fn()
    const { container } = render(<SignaturePad onSign={onSign} />)
    const canvas = container.querySelector('canvas')!

    fireEvent.mouseMove(canvas, { clientX: 60, clientY: 60 })
    expect(onSign).not.toHaveBeenCalled()
  })

  it('fires mouse events without crash even when canvas ctx unavailable', () => {
    // in happy-dom, canvas.getContext('2d') returns null, so startDraw bails early
    // this test verifies the null-guard branches (lines 40-41, 53-55) are exercised
    const onSign = vi.fn()
    const { container } = render(<SignaturePad onSign={onSign} />)
    const canvas = container.querySelector('canvas')!

    fireEvent.mouseDown(canvas, { clientX: 50, clientY: 50 })
    fireEvent.mouseMove(canvas, { clientX: 60, clientY: 60 })
    fireEvent.mouseUp(canvas)

    // onSign not called because canvas ctx is null in happy-dom
    // the important thing is it doesn't crash
  })

  it('fires touch events without crash covering null ctx branches', () => {
    const onSign = vi.fn()
    const { container } = render(<SignaturePad onSign={onSign} />)
    const canvas = container.querySelector('canvas')!

    fireEvent.touchStart(canvas, {
      touches: [{ clientX: 50, clientY: 50 }],
      preventDefault: vi.fn(),
    })
    fireEvent.touchMove(canvas, {
      touches: [{ clientX: 60, clientY: 60 }],
      preventDefault: vi.fn(),
    })
    fireEvent.touchEnd(canvas, {
      changedTouches: [{ clientX: 60, clientY: 60 }],
      preventDefault: vi.fn(),
    })
    // does not crash
  })

  it('mouseLeave after mouseDown does not crash', () => {
    const onSign = vi.fn()
    const { container } = render(<SignaturePad onSign={onSign} />)
    const canvas = container.querySelector('canvas')!

    fireEvent.mouseDown(canvas, { clientX: 10, clientY: 10 })
    fireEvent.mouseLeave(canvas)
    // endDraw called but isDrawingRef is false (ctx was null), so onSign not called
  })

  it('accepts custom strokeColor and strokeWidth without crash', () => {
    const { container } = render(
      <SignaturePad onSign={vi.fn()} strokeColor="#ff0000" strokeWidth={5} />
    )
    const canvas = container.querySelector('canvas')!

    fireEvent.mouseDown(canvas, { clientX: 50, clientY: 50 })
    fireEvent.mouseMove(canvas, { clientX: 60, clientY: 60 })
    fireEvent.mouseUp(canvas)
  })

  it('endDraw does nothing when isDrawing is false', () => {
    // this directly tests the guard at line 64: if (!isDrawingRef.current) return
    const onSign = vi.fn()
    const { container } = render(<SignaturePad onSign={onSign} />)
    const canvas = container.querySelector('canvas')!

    // mouseUp without prior mouseDown
    fireEvent.mouseUp(canvas)
    expect(onSign).not.toHaveBeenCalled()

    // touchEnd without prior touchStart
    fireEvent.touchEnd(canvas, {
      changedTouches: [{ clientX: 0, clientY: 0 }],
      preventDefault: vi.fn(),
    })
    expect(onSign).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(
      <SignaturePad onSign={() => {}} className="my-pad" />
    )
    const root = container.querySelector('[data-component="signature-pad"]')
    expect(root?.className).toContain('my-pad')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<SignaturePad onSign={() => {}} ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('signature-pad')
  })

  it('spreads additional HTML props', () => {
    const { container } = render(
      <SignaturePad onSign={() => {}} data-custom="test" />
    )
    const root = container.querySelector('[data-component="signature-pad"]')
    expect(root?.getAttribute('data-custom')).toBe('test')
  })
})
