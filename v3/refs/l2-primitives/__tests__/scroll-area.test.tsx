import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ScrollArea } from '../scroll-area'

describe('ScrollArea', () => {
  it('renders without crash', () => {
    render(
      <ScrollArea>
        <div>content</div>
      </ScrollArea>
    )
    expect(screen.getByText('content')).toBeTruthy()
  })

  it('forwards ref', () => {
    let el: HTMLDivElement | null = null
    render(
      <ScrollArea
        ref={(node) => {
          el = node
        }}
      >
        <div>content</div>
      </ScrollArea>
    )
    expect(el).toBeTruthy()
    expect(el!.tagName).toBe('DIV')
  })

  it('has data-component attribute', () => {
    render(
      <ScrollArea data-testid="scroll">
        <div>content</div>
      </ScrollArea>
    )
    expect(screen.getByTestId('scroll').getAttribute('data-component')).toBe(
      'scroll-area'
    )
  })

  it('merges className', () => {
    render(
      <ScrollArea className="custom-class" data-testid="scroll">
        <div>content</div>
      </ScrollArea>
    )
    expect(screen.getByTestId('scroll').className).toContain('custom-class')
  })

  it('applies vertical overflow by default', () => {
    render(
      <ScrollArea data-testid="scroll">
        <div>content</div>
      </ScrollArea>
    )
    const el = screen.getByTestId('scroll')
    expect(el.className).toContain('overflow-y-auto')
    expect(el.className).toContain('overflow-x-hidden')
  })

  it('applies horizontal overflow', () => {
    render(
      <ScrollArea data-testid="scroll" orientation="horizontal">
        <div>content</div>
      </ScrollArea>
    )
    const el = screen.getByTestId('scroll')
    expect(el.className).toContain('overflow-x-auto')
    expect(el.className).toContain('overflow-y-hidden')
  })

  it('applies both overflow', () => {
    render(
      <ScrollArea data-testid="scroll" orientation="both">
        <div>content</div>
      </ScrollArea>
    )
    expect(screen.getByTestId('scroll').className).toContain('overflow-auto')
  })

  it('applies numeric maxHeight as px', () => {
    render(
      <ScrollArea data-testid="scroll" maxHeight={300}>
        <div>content</div>
      </ScrollArea>
    )
    expect(screen.getByTestId('scroll').style.maxHeight).toBe('300px')
  })

  it('applies string maxHeight directly', () => {
    render(
      <ScrollArea data-testid="scroll" maxHeight="50vh">
        <div>content</div>
      </ScrollArea>
    )
    expect(screen.getByTestId('scroll').style.maxHeight).toBe('50vh')
  })
})
