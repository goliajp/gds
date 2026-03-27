import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { CurrencyInput, OtpInput, PhoneInput } from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

const moleculeItemsH: DevCenterItem[] = []

// otp input demo
function OtpDemo({ length, error }: { length: number, error: boolean }) {
  const [value, setValue] = useState('')
  return (
    <div className="flex flex-col items-center gap-3">
      <OtpInput value={value} onChange={setValue} length={length} error={error} />
      {value !== '' && (
        <p className="text-xs text-fg-muted">Value: {value}</p>
      )}
    </div>
  )
}

const otpInputItem: DevCenterItem = {
  id: 'otp-input',
  label: 'OtpInput',
  layer: 'l4',
  type: 'interactive',
  tags: ['otp', 'pin', 'code', 'verification', 'input', 'digit'],
  defaultConfig: { length: 6, error: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { OtpInput } from '@golia/gds'" />
      <LivePreview>
        <OtpDemo length={config.length} error={config.error} />
      </LivePreview>
      <DocSection title="Variants" columns={2}>
        <DemoCard title="4 Digits" description="Short OTP code" code={`<OtpInput value={value} onChange={setValue} length={4} />`}>
          <OtpDemo length={4} error={false} />
        </DemoCard>
        <DemoCard title="Error" description="Invalid code state" code={`<OtpInput value={value} onChange={setValue} error />`}>
          <OtpDemo length={6} error={true} />
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="length" value={config.length} min={4} max={8} onChange={(v) => setConfig('length', v)} />
      <Ctrl type="check" label="error" value={config.error} onChange={(v) => setConfig('error', v)} />
    </>
  ),

  code: ({ config }) => {
    const props = ['value={value}', 'onChange={setValue}']
    if (config.length !== 6) props.push(`length={${config.length}}`)
    if (config.error === true) props.push('error')
    return `import { OtpInput } from '@golia/gds'\n\n<OtpInput\n  ${props.join('\n  ')}\n/>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Current OTP string', 'string', '""'],
        ['onChange', 'Called when value changes', '(value: string) => void', '—'],
        ['onComplete', 'Called when all digits filled', '(value: string) => void', '—'],
        ['length', 'Number of digit boxes', 'number', '6'],
        ['error', 'Error state styling', 'boolean', 'false'],
        ['disabled', 'Disable all inputs', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsH.push(otpInputItem)

// phone input demo
function PhoneDemo({ error, disabled }: { error: boolean, disabled: boolean }) {
  const [value, setValue] = useState('')
  return (
    <div className="flex flex-col items-center gap-3">
      <PhoneInput value={value} onChange={setValue} error={error} disabled={disabled} />
      {value !== '' && (
        <p className="text-xs text-fg-muted">Value: {value}</p>
      )}
    </div>
  )
}

const phoneInputItem: DevCenterItem = {
  id: 'phone-input',
  label: 'PhoneInput',
  layer: 'l4',
  type: 'interactive',
  tags: ['phone', 'telephone', 'country', 'input', 'international'],
  defaultConfig: { error: false, disabled: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { PhoneInput } from '@golia/gds'" />
      <LivePreview>
        <PhoneDemo error={config.error} disabled={config.disabled} />
      </LivePreview>
      <DocSection title="Variants" columns={2}>
        <DemoCard title="Default" description="Japan country code" code={`<PhoneInput value={value} onChange={setValue} />`}>
          <PhoneDemo error={false} disabled={false} />
        </DemoCard>
        <DemoCard title="Error" description="Invalid phone number" code={`<PhoneInput value={value} onChange={setValue} error />`}>
          <PhoneDemo error={true} disabled={false} />
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
    const props = ['value={value}', 'onChange={setValue}']
    if (config.error === true) props.push('error')
    if (config.disabled === true) props.push('disabled')
    return `import { PhoneInput } from '@golia/gds'\n\n<PhoneInput\n  ${props.join('\n  ')}\n/>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Phone number string', 'string', '""'],
        ['onChange', 'Called when value changes', '(value: string) => void', '—'],
        ['defaultCountry', 'Default country code', 'string', "'+81'"],
        ['countries', 'Available countries', 'PhoneCountry[]', 'built-in 5 countries'],
        ['disabled', 'Disable input', 'boolean', 'false'],
        ['error', 'Error state', 'boolean', 'false'],
        ['placeholder', 'Input placeholder', 'string', "'Phone number'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsH.push(phoneInputItem)

// currency input demo
function CurrencyDemo({ currency, error, min, max }: { currency: string, error: boolean, min?: number, max?: number }) {
  const [value, setValue] = useState<number | null>(null)
  return (
    <div className="flex flex-col items-center gap-3">
      <CurrencyInput value={value} onChange={setValue} currency={currency} error={error} min={min} max={max} />
      {value !== null && (
        <p className="text-xs text-fg-muted">Value: {value}</p>
      )}
    </div>
  )
}

const currencyInputItem: DevCenterItem = {
  id: 'currency-input',
  label: 'CurrencyInput',
  layer: 'l4',
  type: 'interactive',
  tags: ['currency', 'money', 'number', 'format', 'input', 'yen', 'dollar'],
  defaultConfig: { currency: '\u00a5', error: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CurrencyInput } from '@golia/gds'" />
      <LivePreview>
        <CurrencyDemo currency={config.currency} error={config.error} />
      </LivePreview>
      <DocSection title="Variants" columns={2}>
        <DemoCard title="Yen" description="Japanese yen input" code={`<CurrencyInput value={value} onChange={setValue} />`}>
          <CurrencyDemo currency="\u00a5" error={false} />
        </DemoCard>
        <DemoCard title="Dollar" description="US dollar with clamp" code={`<CurrencyInput value={value} onChange={setValue} currency="$" min={0} max={10000} />`}>
          <CurrencyDemo currency="$" error={false} min={0} max={10000} />
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="currency" value={config.currency} options={['\u00a5', '$', '\u20ac', '\u00a3']} onChange={(v) => setConfig('currency', v)} />
      <Ctrl type="check" label="error" value={config.error} onChange={(v) => setConfig('error', v)} />
    </>
  ),

  code: ({ config }) => {
    const props = ['value={value}', 'onChange={setValue}']
    if (config.currency !== '\u00a5') props.push(`currency="${config.currency}"`)
    if (config.error === true) props.push('error')
    return `import { CurrencyInput } from '@golia/gds'\n\n<CurrencyInput\n  ${props.join('\n  ')}\n/>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Numeric value or null', 'number | null', 'null'],
        ['onChange', 'Called when value changes', '(value: number | null) => void', '—'],
        ['currency', 'Currency symbol', 'string', "'\u00a5'"],
        ['locale', 'Number format locale', 'string', "'ja-JP'"],
        ['min', 'Minimum value', 'number', '—'],
        ['max', 'Maximum value', 'number', '—'],
        ['disabled', 'Disable input', 'boolean', 'false'],
        ['error', 'Error state', 'boolean', 'false'],
        ['placeholder', 'Input placeholder', 'string', "'0'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsH.push(currencyInputItem)

export { moleculeItemsH }
