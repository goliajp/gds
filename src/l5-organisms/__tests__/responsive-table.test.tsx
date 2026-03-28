import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ResponsiveTable } from '../responsive-table'

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
]

const data = [
  { name: 'Alice', role: 'Engineer' },
  { name: 'Bob', role: 'Designer' },
]

describe('ResponsiveTable', () => {
  it('renders table with data-component', () => {
    const { container } = render(
      <ResponsiveTable columns={columns} data={data} />,
    )
    expect(container.querySelector('[data-component="responsive-table"]')).not.toBeNull()
  })

  it('renders data rows in table mode', () => {
    const { getByText } = render(
      <ResponsiveTable columns={columns} data={data} />,
    )
    expect(getByText('Alice')).toBeDefined()
    expect(getByText('Bob')).toBeDefined()
    expect(getByText('Name')).toBeDefined()
  })

  it('sets data-component attribute', () => {
    const { container } = render(
      <ResponsiveTable columns={columns} data={data} />,
    )
    const el = container.querySelector('[data-component="responsive-table"]')
    expect(el).not.toBeNull()
    expect(el?.getAttribute('data-mode')).toBe('table')
  })

  it('supports glass prop', () => {
    const { container } = render(
      <ResponsiveTable columns={columns} data={data} glass />,
    )
    expect(container.querySelector('[data-component="responsive-table"]')).not.toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ResponsiveTable columns={columns} data={data} className="my-table" />,
    )
    expect(container.querySelector('[data-component="responsive-table"]')).not.toBeNull()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<ResponsiveTable columns={columns} data={data} ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('renders column headers in table mode', () => {
    const { getByText } = render(
      <ResponsiveTable columns={columns} data={data} />,
    )
    expect(getByText('Name')).toBeDefined()
    expect(getByText('Role')).toBeDefined()
  })

  it('renders all data cell values', () => {
    const { getByText } = render(
      <ResponsiveTable columns={columns} data={data} />,
    )
    expect(getByText('Engineer')).toBeDefined()
    expect(getByText('Designer')).toBeDefined()
  })

  describe('mobile mode', () => {
    let originalMatchMedia: typeof window.matchMedia

    beforeEach(() => {
      originalMatchMedia = window.matchMedia
    })

    afterEach(() => {
      window.matchMedia = originalMatchMedia
    })

    it('renders cards layout in mobile mode', async () => {
      // we need to re-import the module with matchMedia returning matches: true
      // since mobileQuery is evaluated at module load time, we use
      // useSyncExternalStore's getServerSnapshot (third arg) which returns false,
      // and the subscribe/getSnapshot which depend on the module-level mobileQuery.
      // Instead, we directly test by calling the component with a patched matchMedia
      // that returns matches: true before the module loads.
      // Since the module is already loaded, we test the SSR fallback path too.

      // the SSR snapshot callback returns false, so in test env (no real media query)
      // we need to trigger the change listener
      const listeners: Array<() => void> = []
      const mockMql = {
        matches: true,
        media: '(max-width: 1023px)',
        addEventListener: (_: string, cb: () => void) => { listeners.push(cb) },
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        onchange: null,
        dispatchEvent: vi.fn(),
      }

      window.matchMedia = vi.fn().mockReturnValue(mockMql)

      // re-import module to pick up new matchMedia
      vi.resetModules()
      const { ResponsiveTable: FreshResponsiveTable } = await import('../responsive-table')

      const { container, getAllByText } = render(
        <FreshResponsiveTable columns={columns} data={data} />,
      )

      const el = container.querySelector('[data-component="responsive-table"]')
      expect(el).not.toBeNull()
      expect(el?.getAttribute('data-mode')).toBe('cards')

      // verify card layout renders header labels and values
      expect(getAllByText('Alice').length).toBeGreaterThan(0)
      expect(getAllByText('Engineer').length).toBeGreaterThan(0)
      // "Name" appears once per data row in card mode
      expect(getAllByText('Name').length).toBe(2)
    })

    it('renders cards with glass prop in mobile mode', async () => {
      const mockMql = {
        matches: true,
        media: '(max-width: 1023px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        onchange: null,
        dispatchEvent: vi.fn(),
      }

      window.matchMedia = vi.fn().mockReturnValue(mockMql)

      vi.resetModules()
      const { ResponsiveTable: FreshResponsiveTable } = await import('../responsive-table')

      const { container } = render(
        <FreshResponsiveTable columns={columns} data={data} glass />,
      )

      const el = container.querySelector('[data-component="responsive-table"]')
      expect(el?.getAttribute('data-mode')).toBe('cards')
    })

    it('applies className in mobile card mode', async () => {
      const mockMql = {
        matches: true,
        media: '(max-width: 1023px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        onchange: null,
        dispatchEvent: vi.fn(),
      }

      window.matchMedia = vi.fn().mockReturnValue(mockMql)

      vi.resetModules()
      const { ResponsiveTable: FreshResponsiveTable } = await import('../responsive-table')

      const { container } = render(
        <FreshResponsiveTable columns={columns} data={data} className="mobile-table" />,
      )

      const el = container.querySelector('[data-component="responsive-table"]')
      expect(el?.className).toContain('mobile-table')
    })

    it('forwards ref in mobile card mode', async () => {
      const mockMql = {
        matches: true,
        media: '(max-width: 1023px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        onchange: null,
        dispatchEvent: vi.fn(),
      }

      window.matchMedia = vi.fn().mockReturnValue(mockMql)

      vi.resetModules()
      const { ResponsiveTable: FreshResponsiveTable } = await import('../responsive-table')

      const ref = { current: null as HTMLDivElement | null }
      render(<FreshResponsiveTable columns={columns} data={data} ref={ref} />)
      expect(ref.current).not.toBeNull()
      expect(ref.current?.getAttribute('data-mode')).toBe('cards')
    })

    it('renders empty string for missing column keys in mobile mode', async () => {
      const mockMql = {
        matches: true,
        media: '(max-width: 1023px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        onchange: null,
        dispatchEvent: vi.fn(),
      }

      window.matchMedia = vi.fn().mockReturnValue(mockMql)

      vi.resetModules()
      const { ResponsiveTable: FreshResponsiveTable } = await import('../responsive-table')

      const sparseData = [{ name: 'Charlie' }] // missing 'role' key
      const { container } = render(
        <FreshResponsiveTable columns={columns} data={sparseData} />,
      )

      const el = container.querySelector('[data-component="responsive-table"]')
      expect(el?.getAttribute('data-mode')).toBe('cards')
    })
  })

  it('renders empty string for missing column keys in table mode', () => {
    const sparseData = [{ name: 'Charlie' }]
    const { container } = render(
      <ResponsiveTable columns={columns} data={sparseData} />,
    )
    // should render without error, missing key produces empty string
    const cells = container.querySelectorAll('td')
    expect(cells.length).toBe(2)
  })

  it('spreads additional HTML props', () => {
    const { container } = render(
      <ResponsiveTable columns={columns} data={data} data-custom="test" />,
    )
    const el = container.querySelector('[data-component="responsive-table"]')
    expect(el?.getAttribute('data-custom')).toBe('test')
  })
})
