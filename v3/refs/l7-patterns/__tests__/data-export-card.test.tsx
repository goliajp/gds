import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DataExportCard } from '../data-export-card'

describe('DataExportCard', () => {
  it('renders title and format options', () => {
    render(
      <DataExportCard formats={['CSV', 'JSON', 'Excel']} onExport={() => {}} />
    )
    expect(screen.getByText('Export Data')).toBeDefined()
    expect(screen.getByText('CSV')).toBeDefined()
  })

  it('calls onExport with selected format', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    render(<DataExportCard formats={['CSV', 'JSON']} onExport={onExport} />)
    await user.click(screen.getByText('Export'))
    expect(onExport).toHaveBeenCalledWith('CSV', undefined)
  })

  it('renders custom title', () => {
    render(
      <DataExportCard
        formats={['CSV']}
        onExport={() => {}}
        title="Download Report"
      />
    )
    expect(screen.getByText('Download Report')).toBeDefined()
  })

  it('calls onExport with date range when both dates set', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    render(<DataExportCard formats={['CSV']} onExport={onExport} />)
    const inputs = screen.getAllByDisplayValue('')
    // first empty input after select is the "from" date, second is "to" date
    const fromInput = inputs.find((el) => el.getAttribute('type') === 'date')!
    const toInput = inputs.filter(
      (el) => el.getAttribute('type') === 'date'
    )[1]!
    await user.clear(fromInput)
    await user.type(fromInput, '2026-01-01')
    await user.clear(toInput)
    await user.type(toInput, '2026-12-31')
    await user.click(screen.getByText('Export'))
    expect(onExport).toHaveBeenCalledWith('CSV', {
      from: '2026-01-01',
      to: '2026-12-31',
    })
  })

  it('applies custom className', () => {
    const { container } = render(
      <DataExportCard
        formats={['CSV']}
        onExport={() => {}}
        className="my-card"
      />
    )
    const el = container.querySelector('[data-component="data-export-card"]')
    expect(el?.className).toContain('my-card')
  })

  it('handles empty formats array', () => {
    render(<DataExportCard formats={[]} onExport={() => {}} />)
    expect(screen.getByText('Export Data')).toBeDefined()
  })
})
