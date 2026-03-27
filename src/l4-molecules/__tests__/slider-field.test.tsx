import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SliderField } from '../slider-field'

describe('SliderField', () => {
  it('renders label and value', () => {
    render(<SliderField label="Volume" value={50} onChange={() => {}} />)
    expect(screen.getByText('Volume')).toBeDefined()
    expect(screen.getByText('50')).toBeDefined()
  })

  it('displays unit when provided', () => {
    render(<SliderField label="Width" value={80} onChange={() => {}} unit="px" />)
    expect(screen.getByText('80 px')).toBeDefined()
  })

  it('renders a range input', () => {
    const onChange = vi.fn()
    render(<SliderField label="Opacity" value={75} onChange={onChange} min={0} max={100} />)
    const input = screen.getByRole('slider')
    expect(input).toBeDefined()
    expect(input.getAttribute('min')).toBe('0')
    expect(input.getAttribute('max')).toBe('100')
  })
})
