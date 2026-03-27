import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CodeBlock } from '../code-block'

const sampleCode = `const x = 1
const y = 2
const z = x + y`

describe('CodeBlock', () => {
  it('renders code content', () => {
    render(<CodeBlock code={sampleCode} />)
    expect(screen.getByText('const x = 1')).toBeDefined()
    expect(screen.getByText('const y = 2')).toBeDefined()
  })

  it('shows line numbers by default', () => {
    const { container } = render(<CodeBlock code={sampleCode} />)
    const lineNumbers = container.querySelectorAll('.select-none.border-r')
    expect(lineNumbers.length).toBe(3)
    expect(lineNumbers[0].textContent).toBe('1')
    expect(lineNumbers[2].textContent).toBe('3')
  })

  it('shows language label', () => {
    render(<CodeBlock code={sampleCode} language="typescript" />)
    expect(screen.getByTestId('code-language').textContent).toBe('typescript')
  })

  it('copies code to clipboard', () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', {
      ...navigator,
      clipboard: { writeText },
    })

    render(<CodeBlock code={sampleCode} />)
    const copyBtn = screen.getByLabelText('Copy code')
    fireEvent.click(copyBtn)
    expect(writeText).toHaveBeenCalledWith(sampleCode)

    vi.unstubAllGlobals()
  })

  it('applies glass variant', () => {
    const { container } = render(<CodeBlock code={sampleCode} glass />)
    const el = container.querySelector('[data-component="code-block"]')
    expect(el?.getAttribute('data-variant')).toBe('glass')
  })
})
