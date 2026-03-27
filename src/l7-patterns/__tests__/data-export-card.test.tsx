import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DataExportCard } from '../data-export-card'

describe('DataExportCard', () => {
  it('renders title and format options', () => {
    render(<DataExportCard formats={['CSV', 'JSON', 'Excel']} onExport={() => {}} />)
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
    render(<DataExportCard formats={['CSV']} onExport={() => {}} title="Download Report" />)
    expect(screen.getByText('Download Report')).toBeDefined()
  })
})
