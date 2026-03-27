import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Label } from '../label'

describe('Label', () => {
  it('renders without crash', () => {
    render(<Label>Name</Label>)
    expect(screen.getByText('Name')).toBeTruthy()
  })

  it('forwards ref', () => {
    let el: HTMLLabelElement | null = null
    render(<Label ref={(node) => { el = node }}>Name</Label>)
    expect(el).toBeTruthy()
    expect(el!.tagName).toBe('LABEL')
  })

  it('has data-component attribute', () => {
    render(<Label>Name</Label>)
    expect(screen.getByText('Name').closest('label')!.getAttribute('data-component')).toBe('label')
  })

  it('renders a label element', () => {
    render(<Label>Name</Label>)
    expect(screen.getByText('Name').closest('label')).toBeTruthy()
  })

  it('merges className', () => {
    render(<Label className="custom-class">Name</Label>)
    expect(screen.getByText('Name').closest('label')!.className).toContain('custom-class')
  })

  it('shows asterisk when required', () => {
    render(<Label required>Name</Label>)
    expect(screen.getByText('*')).toBeTruthy()
  })

  it('does not show asterisk by default', () => {
    render(<Label>Name</Label>)
    expect(screen.queryByText('*')).toBeNull()
  })

  it('passes htmlFor to label', () => {
    render(<Label htmlFor="email-input">Email</Label>)
    const label = screen.getByText('Email').closest('label')
    expect(label!.getAttribute('for')).toBe('email-input')
  })
})
