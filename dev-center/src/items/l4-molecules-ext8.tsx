import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { DateRangeInput, PasswordInput, SearchInput } from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

const moleculeItemsI: DevCenterItem[] = []

// password input demo
function PasswordDemo({ showStrength, error }: { showStrength: boolean, error: boolean }) {
  const [value, setValue] = useState('')
  return (
    <div className="flex flex-col items-center gap-3 w-72">
      <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} showStrength={showStrength} error={error} />
      {value !== '' && (
        <p className="text-xs text-fg-muted">Length: {value.length}</p>
      )}
    </div>
  )
}

const passwordInputItem: DevCenterItem = {
  id: 'password-input',
  label: 'PasswordInput',
  layer: 'l4',
  type: 'interactive',
  tags: ['password', 'secret', 'toggle', 'visibility', 'strength', 'input'],
  defaultConfig: { showStrength: true, error: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { PasswordInput } from '@golia/gds'" />
      <LivePreview>
        <PasswordDemo showStrength={config.showStrength} error={config.error} />
      </LivePreview>
      <DocSection title="Variants" columns={2}>
        <DemoCard title="Basic" description="Simple password field" code={`<PasswordInput value={value} onChange={handler} />`}>
          <PasswordDemo showStrength={false} error={false} />
        </DemoCard>
        <DemoCard title="With Strength" description="Password strength indicator" code={`<PasswordInput value={value} onChange={handler} showStrength />`}>
          <PasswordDemo showStrength={true} error={false} />
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="showStrength" value={config.showStrength} onChange={(v) => setConfig('showStrength', v)} />
      <Ctrl type="check" label="error" value={config.error} onChange={(v) => setConfig('error', v)} />
    </>
  ),

  code: ({ config }) => {
    const props = ['value={value}', 'onChange={handler}']
    if (config.showStrength === true) props.push('showStrength')
    if (config.error === true) props.push('error')
    return `import { PasswordInput } from '@golia/gds'\n\n<PasswordInput\n  ${props.join('\n  ')}\n/>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Input value', 'string', '—'],
        ['onChange', 'Native input change handler', 'ChangeEventHandler', '—'],
        ['showStrength', 'Show strength indicator bar', 'boolean', 'false'],
        ['error', 'Error state styling', 'boolean', 'false'],
        ['glass', 'Glass material variant', 'boolean', 'false'],
        ['inputSize', 'Input size variant', "'default' | 'sm'", "'default'"],
        ['disabled', 'Disable input', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsI.push(passwordInputItem)

// search input demo
function SearchDemo({ loading, clearable, disabled }: { loading: boolean, clearable: boolean, disabled: boolean }) {
  const [value, setValue] = useState('')
  return (
    <div className="flex flex-col items-center gap-3 w-72">
      <SearchInput value={value} onChange={setValue} loading={loading} clearable={clearable} disabled={disabled} />
      {value !== '' && (
        <p className="text-xs text-fg-muted">Query: {value}</p>
      )}
    </div>
  )
}

const searchInputItem: DevCenterItem = {
  id: 'search-input',
  label: 'SearchInput',
  layer: 'l4',
  type: 'interactive',
  tags: ['search', 'find', 'filter', 'query', 'input', 'clear', 'loading'],
  defaultConfig: { loading: false, clearable: true, disabled: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { SearchInput } from '@golia/gds'" />
      <LivePreview>
        <SearchDemo loading={config.loading} clearable={config.clearable} disabled={config.disabled} />
      </LivePreview>
      <DocSection title="Variants" columns={2}>
        <DemoCard title="Default" description="Standard search input" code={`<SearchInput value={value} onChange={setValue} />`}>
          <SearchDemo loading={false} clearable={true} disabled={false} />
        </DemoCard>
        <DemoCard title="Loading" description="Shows spinner while searching" code={`<SearchInput value={value} onChange={setValue} loading />`}>
          <SearchDemo loading={true} clearable={true} disabled={false} />
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="loading" value={config.loading} onChange={(v) => setConfig('loading', v)} />
      <Ctrl type="check" label="clearable" value={config.clearable} onChange={(v) => setConfig('clearable', v)} />
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
    </>
  ),

  code: ({ config }) => {
    const props = ['value={value}', 'onChange={setValue}']
    if (config.loading === true) props.push('loading')
    if (config.clearable === false) props.push('clearable={false}')
    if (config.disabled === true) props.push('disabled')
    return `import { SearchInput } from '@golia/gds'\n\n<SearchInput\n  ${props.join('\n  ')}\n/>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Current search string', 'string', '—'],
        ['onChange', 'Called when value changes', '(value: string) => void', '—'],
        ['onSearch', 'Called on Enter key', '(value: string) => void', '—'],
        ['placeholder', 'Input placeholder', 'string', "'Search...'"],
        ['loading', 'Show spinner instead of search icon', 'boolean', 'false'],
        ['clearable', 'Show clear button when has value', 'boolean', 'true'],
        ['inputSize', 'Input size variant', "'default' | 'sm'", "'default'"],
        ['disabled', 'Disable input', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsI.push(searchInputItem)

// date range input demo
function DateRangeDemo({ error, disabled }: { error: boolean, disabled: boolean }) {
  const [start, setStart] = useState<string | null>(null)
  const [end, setEnd] = useState<string | null>(null)
  return (
    <div className="flex flex-col items-center gap-3 w-80">
      <DateRangeInput startDate={start} endDate={end} onChange={(s, e) => { setStart(s); setEnd(e) }} error={error} disabled={disabled} />
      {(start !== null || end !== null) && (
        <p className="text-xs text-fg-muted">{start ?? '?'} ~ {end ?? '?'}</p>
      )}
    </div>
  )
}

const dateRangeInputItem: DevCenterItem = {
  id: 'date-range-input',
  label: 'DateRangeInput',
  layer: 'l4',
  type: 'interactive',
  tags: ['date', 'range', 'period', 'start', 'end', 'calendar', 'input'],
  defaultConfig: { error: false, disabled: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { DateRangeInput } from '@golia/gds'" />
      <LivePreview>
        <DateRangeDemo error={config.error} disabled={config.disabled} />
      </LivePreview>
      <DocSection title="Variants" columns={2}>
        <DemoCard title="Default" description="Two-field date range" code={`<DateRangeInput startDate={start} endDate={end} onChange={handler} />`}>
          <DateRangeDemo error={false} disabled={false} />
        </DemoCard>
        <DemoCard title="Error" description="Validation error state" code={`<DateRangeInput startDate={start} endDate={end} onChange={handler} error />`}>
          <DateRangeDemo error={true} disabled={false} />
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="error" value={config.error} onChange={(v) => setConfig('error', v)} />
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
    </>
  ),

  code: ({ config }) => {
    const props = ['startDate={start}', 'endDate={end}', 'onChange={handler}']
    if (config.error === true) props.push('error')
    if (config.disabled === true) props.push('disabled')
    return `import { DateRangeInput } from '@golia/gds'\n\n<DateRangeInput\n  ${props.join('\n  ')}\n/>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['startDate', 'Start date (YYYY-MM-DD)', 'string | null', 'null'],
        ['endDate', 'End date (YYYY-MM-DD)', 'string | null', 'null'],
        ['onChange', 'Called when either date changes', '(start: string | null, end: string | null) => void', '—'],
        ['placeholder', 'Placeholder labels', '{ start?: string, end?: string }', '—'],
        ['error', 'Error state styling', 'boolean', 'false'],
        ['disabled', 'Disable both inputs', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsI.push(dateRangeInputItem)

export { moleculeItemsI }
