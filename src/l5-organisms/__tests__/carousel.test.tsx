import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Carousel } from '../carousel'

describe('Carousel', () => {
  it('renders children as slides', () => {
    const { container } = render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>
    )
    expect(screen.getByText('Slide 1')).toBeDefined()
    expect(screen.getByText('Slide 2')).toBeDefined()
    expect(container.querySelectorAll('[data-slide]').length).toBe(3)
  })

  it('shows dot indicators', () => {
    render(
      <Carousel>
        <div>A</div>
        <div>B</div>
      </Carousel>
    )
    const dots = screen.getAllByRole('tab')
    expect(dots.length).toBe(2)
  })

  it('shows arrow buttons', () => {
    render(
      <Carousel>
        <div>A</div>
        <div>B</div>
      </Carousel>
    )
    expect(screen.getByLabelText('Previous slide')).toBeDefined()
    expect(screen.getByLabelText('Next slide')).toBeDefined()
  })

  it('advances to next slide on arrow click', async () => {
    const user = userEvent.setup()
    render(
      <Carousel>
        <div>A</div>
        <div>B</div>
      </Carousel>
    )
    const nextBtn = screen.getByLabelText('Next slide')
    await user.click(nextBtn)
    // second dot should now be active
    const dots = screen.getAllByRole('tab')
    expect(dots[1].getAttribute('aria-selected')).toBe('true')
  })

  it('goes to previous slide on prev arrow click', async () => {
    const user = userEvent.setup()
    render(
      <Carousel>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </Carousel>
    )
    // go to slide 2, then back to slide 1
    await user.click(screen.getByLabelText('Next slide'))
    await user.click(screen.getByLabelText('Previous slide'))
    const dots = screen.getAllByRole('tab')
    expect(dots[0].getAttribute('aria-selected')).toBe('true')
  })

  it('wraps around from last to first slide', async () => {
    const user = userEvent.setup()
    render(
      <Carousel>
        <div>A</div>
        <div>B</div>
      </Carousel>
    )
    await user.click(screen.getByLabelText('Next slide'))
    await user.click(screen.getByLabelText('Next slide'))
    const dots = screen.getAllByRole('tab')
    expect(dots[0].getAttribute('aria-selected')).toBe('true')
  })

  it('wraps around from first to last on prev', async () => {
    const user = userEvent.setup()
    render(
      <Carousel>
        <div>A</div>
        <div>B</div>
      </Carousel>
    )
    await user.click(screen.getByLabelText('Previous slide'))
    const dots = screen.getAllByRole('tab')
    expect(dots[1].getAttribute('aria-selected')).toBe('true')
  })

  it('navigates to specific slide via dot click', async () => {
    const user = userEvent.setup()
    render(
      <Carousel>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </Carousel>
    )
    const dots = screen.getAllByRole('tab')
    await user.click(dots[2])
    expect(dots[2].getAttribute('aria-selected')).toBe('true')
  })

  it('hides dots when showDots is false', () => {
    render(
      <Carousel showDots={false}>
        <div>A</div>
        <div>B</div>
      </Carousel>
    )
    expect(screen.queryAllByRole('tab').length).toBe(0)
  })

  it('hides arrows when showArrows is false', () => {
    render(
      <Carousel showArrows={false}>
        <div>A</div>
        <div>B</div>
      </Carousel>
    )
    expect(screen.queryByLabelText('Previous slide')).toBeNull()
    expect(screen.queryByLabelText('Next slide')).toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <Carousel>
        <div>A</div>
        <div>B</div>
      </Carousel>
    )
    expect(
      container.querySelector('[data-component="carousel"]')
    ).not.toBeNull()
  })

  it('applies glass class when glass is true', () => {
    const { container } = render(
      <Carousel glass>
        <div>A</div>
        <div>B</div>
      </Carousel>
    )
    const root = container.querySelector('[data-component="carousel"]')
    expect(root?.className).toContain('gds-glass')
  })

  it('handles touch swipe to advance', () => {
    render(
      <Carousel>
        <div>A</div>
        <div>B</div>
      </Carousel>
    )
    const carousel = screen
      .getByText('A')
      .closest('[data-component="carousel"]')!

    // swipe left (negative diff)
    fireEvent.touchStart(carousel, { touches: [{ clientX: 200 }] })
    fireEvent.touchEnd(carousel, { changedTouches: [{ clientX: 100 }] })

    const dots = screen.getAllByRole('tab')
    expect(dots[1].getAttribute('aria-selected')).toBe('true')
  })

  it('handles touch swipe right to go back', () => {
    render(
      <Carousel>
        <div>A</div>
        <div>B</div>
      </Carousel>
    )
    const carousel = screen
      .getByText('A')
      .closest('[data-component="carousel"]')!

    // first go to slide 2
    fireEvent.touchStart(carousel, { touches: [{ clientX: 200 }] })
    fireEvent.touchEnd(carousel, { changedTouches: [{ clientX: 100 }] })

    // swipe right (positive diff)
    fireEvent.touchStart(carousel, { touches: [{ clientX: 100 }] })
    fireEvent.touchEnd(carousel, { changedTouches: [{ clientX: 200 }] })

    const dots = screen.getAllByRole('tab')
    expect(dots[0].getAttribute('aria-selected')).toBe('true')
  })

  it('ignores small touch movements', () => {
    render(
      <Carousel>
        <div>A</div>
        <div>B</div>
      </Carousel>
    )
    const carousel = screen
      .getByText('A')
      .closest('[data-component="carousel"]')!

    // swipe less than 50px — should not change slide
    fireEvent.touchStart(carousel, { touches: [{ clientX: 200 }] })
    fireEvent.touchEnd(carousel, { changedTouches: [{ clientX: 170 }] })

    const dots = screen.getAllByRole('tab')
    expect(dots[0].getAttribute('aria-selected')).toBe('true')
  })

  describe('autoPlay', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('auto-advances slides', () => {
      render(
        <Carousel autoPlay interval={1000}>
          <div>A</div>
          <div>B</div>
          <div>C</div>
        </Carousel>
      )

      act(() => vi.advanceTimersByTime(1100))

      const dots = screen.getAllByRole('tab')
      expect(dots[1].getAttribute('aria-selected')).toBe('true')
    })

    it('pauses on hover', () => {
      render(
        <Carousel autoPlay interval={1000}>
          <div>A</div>
          <div>B</div>
        </Carousel>
      )
      const carousel = screen
        .getByText('A')
        .closest('[data-component="carousel"]')!

      fireEvent.mouseEnter(carousel)
      act(() => vi.advanceTimersByTime(2000))

      // should still be on first slide due to hover pause
      const dots = screen.getAllByRole('tab')
      expect(dots[0].getAttribute('aria-selected')).toBe('true')

      // resume on mouse leave
      fireEvent.mouseLeave(carousel)
      act(() => vi.advanceTimersByTime(1100))

      const dotsAfter = screen.getAllByRole('tab')
      expect(dotsAfter[1].getAttribute('aria-selected')).toBe('true')
    })
  })

  it('does not show arrows/dots for single slide', () => {
    render(
      <Carousel>
        <div>Only one</div>
      </Carousel>
    )
    expect(screen.queryByLabelText('Previous slide')).toBeNull()
    expect(screen.queryAllByRole('tab').length).toBe(0)
  })
})
