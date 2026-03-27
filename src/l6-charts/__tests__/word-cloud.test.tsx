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
    const { container } = render(<WordCloud maxFontSize={48} minFontSize={12} words={words} />)
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
    expect(container.querySelector('[data-component="word-cloud"]')).not.toBeNull()
  })
})
