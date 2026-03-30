import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { WeatherWidget } from '../weather-widget'

describe('WeatherWidget', () => {
  it('renders temperature with unit', () => {
    const { container } = render(
      <WeatherWidget temp={25} condition="Sunny" location="Tokyo" />
    )
    expect(container.textContent).toContain('25')
    expect(container.textContent).toContain('C')
  })

  it('renders condition and location', () => {
    render(<WeatherWidget temp={18} condition="Cloudy" location="Osaka" />)
    expect(screen.getByText('Cloudy')).toBeDefined()
    expect(screen.getByText('Osaka')).toBeDefined()
  })

  it('supports Fahrenheit unit', () => {
    const { container } = render(
      <WeatherWidget temp={72} condition="Clear" location="NYC" unit="F" />
    )
    expect(container.textContent).toContain('F')
  })
})
