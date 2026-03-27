import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FieldWrapper } from '../form-field'

describe('FieldWrapper', () => {
  it('renders label and children', () => {
    render(<FieldWrapper label="Email"><input data-testid="input" /></FieldWrapper>)
    expect(screen.getByText('Email')).toBeTruthy()
    expect(screen.getByTestId('input')).toBeTruthy()
  })

  it('shows error message', () => {
    const { container } = render(
      <FieldWrapper error="Required" label="Name"><input /></FieldWrapper>,
    )
    expect(screen.getByText('Required')).toBeTruthy()
    expect(container.querySelector('[data-state="error"]')).not.toBeNull()
  })

  it('shows helper text when no error', () => {
    render(<FieldWrapper helperText="Enter your name" label="Name"><input /></FieldWrapper>)
    expect(screen.getByText('Enter your name')).toBeTruthy()
  })

  it('hides helper text when error is present', () => {
    render(
      <FieldWrapper error="Bad input" helperText="Enter your name" label="Name"><input /></FieldWrapper>,
    )
    expect(screen.getByText('Bad input')).toBeTruthy()
    expect(screen.queryByText('Enter your name')).toBeNull()
  })
})
