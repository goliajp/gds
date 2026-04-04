import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Highlight } from '../highlight'

describe('Highlight', () => {
  it('renders full text', () => {
    const { container } = render(<Highlight text="hello world" query="" />)
    expect(container.textContent).toBe('hello world')
  })

  it('highlights matching substring', () => {
    const { container } = render(<Highlight text="hello world" query="world" />)
    const marks = container.querySelectorAll('mark')
    expect(marks).toHaveLength(1)
    expect(marks[0].textContent).toBe('world')
  })

  it('is case-insensitive by default', () => {
    const { container } = render(<Highlight text="Hello World" query="hello" />)
    const marks = container.querySelectorAll('mark')
    expect(marks).toHaveLength(1)
    expect(marks[0].textContent).toBe('Hello')
  })

  it('renders text as-is when query is empty', () => {
    const { container } = render(<Highlight text="no highlight" query="" />)
    expect(container.querySelectorAll('mark')).toHaveLength(0)
    expect(container.textContent).toBe('no highlight')
  })

  it('highlights multiple matches', () => {
    const { container } = render(
      <Highlight text="foo bar foo baz foo" query="foo" />
    )
    const marks = container.querySelectorAll('mark')
    expect(marks).toHaveLength(3)
  })
})
