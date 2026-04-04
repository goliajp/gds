import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { WordCloud } from '../word-cloud'

const words = [
  { text: 'React', weight: 10 },
  { text: 'TypeScript', weight: 8 },
  { text: 'Design', weight: 5 },
  { text: 'System', weight: 3 },
]

describe('WordCloud', () => {
  it('renders all words', () => {
    const { container } = render(<WordCloud words={words} />)
    const spans = container.querySelectorAll('span')
    expect(spans.length).toBe(4)
    expect(spans[0].textContent).toBe('React')
  })

  it('applies font sizes based on weight', () => {
    const { container } = render(
      <WordCloud maxFontSize={48} minFontSize={12} words={words} />
    )
    const spans = container.querySelectorAll('span')
    // highest weight = max font size
    expect(spans[0].style.fontSize).toBe('48px')
    // lowest weight = min font size
    expect(spans[3].style.fontSize).toBe('12px')
  })

  it('uses palette colors', () => {
    const { container } = render(<WordCloud words={words} />)
    const spans = container.querySelectorAll('span')
    expect(spans[0].style.color).toBe('var(--gds-palette-0)')
    expect(spans[1].style.color).toBe('var(--gds-palette-1)')
  })

  it('has data-component attribute', () => {
    const { container } = render(<WordCloud words={words} />)
    expect(
      container.querySelector('[data-component="word-cloud"]')
    ).not.toBeNull()
  })

  it('applies glass mode', () => {
    const { container } = render(<WordCloud words={words} glass />)
    const el = container.querySelector('[data-component="word-cloud"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })

  it('does not apply glass mode when glass is falsy', () => {
    const { container } = render(<WordCloud words={words} />)
    const el = container.querySelector('[data-component="word-cloud"]')
    expect(el?.className).not.toContain('backdrop-blur-md')
  })

  it('merges custom className', () => {
    const { container } = render(
      <WordCloud words={words} className="my-cloud" />
    )
    const el = container.querySelector('[data-component="word-cloud"]')
    expect(el?.className).toContain('my-cloud')
  })

  it('applies custom height', () => {
    const { container } = render(<WordCloud words={words} height={500} />)
    const el = container.querySelector('[data-component="word-cloud"]')
    expect((el as HTMLElement)?.style.height).toBe('500px')
  })

  it('handles words with equal weights (range === 0)', () => {
    const sameWeight = [
      { text: 'A', weight: 5 },
      { text: 'B', weight: 5 },
      { text: 'C', weight: 5 },
    ]
    const { container } = render(<WordCloud words={sameWeight} />)
    const spans = container.querySelectorAll('span')
    // when range === 0, t = 0.5 for all
    expect(spans.length).toBe(3)
    const fontSize = spans[0].style.fontSize
    expect(spans[1].style.fontSize).toBe(fontSize)
    expect(spans[2].style.fontSize).toBe(fontSize)
  })

  it('handles empty words array', () => {
    const { container } = render(<WordCloud words={[]} />)
    const spans = container.querySelectorAll('span')
    expect(spans.length).toBe(0)
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<WordCloud words={words} ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('word-cloud')
  })

  it('spreads additional props', () => {
    const { container } = render(<WordCloud words={words} data-custom="test" />)
    const el = container.querySelector('[data-component="word-cloud"]')
    expect(el?.getAttribute('data-custom')).toBe('test')
  })
})
