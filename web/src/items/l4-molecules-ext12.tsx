import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Callout, InlineEdit } from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

const moleculeItemsM: DevCenterItem[] = []

const calloutItem: DevCenterItem = {
  id: 'callout',
  label: 'Callout',
  layer: 'l4',
  type: 'interactive',
  tags: ['callout', 'message', 'info', 'warning', 'tip', 'danger', 'molecule'],
  variants: ['info', 'tip', 'warning', 'danger'],
  defaultConfig: { glass: false, title: 'Did you know?' },

  stage: ({ config, variant }) => (
    <div>
      <ImportLine text="import { Callout } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-80 space-y-3">
          <Callout variant={variant as any} title={config.title} glass={config.glass}>
            This is a callout message with important information for the user.
          </Callout>
        </div>
      </LivePreview>

      <DocSection title="Variants" columns={2}>
        {(['info', 'tip', 'warning', 'danger'] as const).map((v) => (
          <div key={v} className="space-y-1">
            <Callout variant={v} title={v.charAt(0).toUpperCase() + v.slice(1)}>
              {v} callout example
            </Callout>
          </div>
        ))}
      </DocSection>

      <DocSection title="API">
        <DocTable rows={[
          ['variant', "'info' | 'tip' | 'warning' | 'danger'", "'info'", 'Visual variant'],
          ['title', 'string', '—', 'Optional title above content'],
          ['children', 'ReactNode', '—', 'Callout body content'],
          ['icon', 'ReactNode', 'auto', 'Custom icon (default per variant)'],
          ['glass', 'boolean', 'false', 'Glass surface style'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig, variant, setVariant }) => (
    <>
      <Ctrl type="select" label="variant" value={variant} options={['info', 'tip', 'warning', 'danger']} onChange={setVariant} />
      <Ctrl type="text" label="title" value={config.title} onChange={(v) => setConfig('title', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config, variant }) =>
    `import { Callout } from '@goliapkg/gds'\n\n<Callout variant="${variant}"${config.title ? ` title="${config.title}"` : ''}${config.glass ? ' glass' : ''}>\n  Important information here.\n</Callout>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['variant', 'Visual variant', "'info' | 'tip' | 'warning' | 'danger'", "'info'"],
        ['title', 'Optional title above content', 'string', '—'],
        ['children', 'Callout body content', 'ReactNode', '—'],
        ['icon', 'Custom icon (default per variant)', 'ReactNode', 'auto'],
        ['glass', 'Glass surface style', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Use info for general notes, tip for helpful hints, warning for caution, danger for critical</p>
          <p>• Each variant has a default icon that can be overridden via the icon prop</p>
          <p>• Title is optional — use for longer callouts that need a heading</p>
        </div>
      </div>
    </div>
  ),
}
moleculeItemsM.push(calloutItem)

function InlineEditDemo({ placeholder, disabled }: { placeholder?: string, disabled?: boolean }) {
  const [val, setVal] = useState('Click me to edit')
  return <InlineEdit value={val} onSave={setVal} placeholder={placeholder} disabled={disabled} />
}

function InlineEditValidateDemo() {
  const [val, setVal] = useState('Hello')
  return (
    <InlineEdit
      value={val}
      onSave={setVal}
      validate={(v) => (v.length < 3 ? 'At least 3 characters' : null)}
    />
  )
}

const inlineEditItem: DevCenterItem = {
  id: 'inline-edit',
  label: 'InlineEdit',
  layer: 'l4',
  type: 'interactive',
  tags: ['inline', 'edit', 'editable', 'input', 'text', 'molecule'],
  defaultConfig: { disabled: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { InlineEdit } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="space-y-4">
          <InlineEditDemo disabled={config.disabled} />
        </div>
      </LivePreview>

      <DocSection title="With Validation">
        <LivePreview>
          <InlineEditValidateDemo />
        </LivePreview>
      </DocSection>

      <DocSection title="API">
        <DocTable rows={[
          ['value', 'string', '—', 'Current display value'],
          ['onSave', '(value: string) => void', '—', 'Called when edit is confirmed'],
          ['onCancel', '() => void', '—', 'Called when edit is cancelled'],
          ['validate', '(value: string) => string | null', '—', 'Validation function, returns error or null'],
          ['placeholder', 'string', '"Click to edit"', 'Placeholder when value is empty'],
          ['disabled', 'boolean', 'false', 'Disable editing'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
    </>
  ),

  code: () =>
    `import { InlineEdit } from '@goliapkg/gds'\n\nconst [name, setName] = useState('John')\n\n<InlineEdit\n  value={name}\n  onSave={setName}\n  validate={(v) => v.length < 2 ? 'Too short' : null}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Current display value', 'string', '—'],
        ['onSave', 'Called when edit is confirmed', '(value: string) => void', '—'],
        ['onCancel', 'Called when edit is cancelled', '() => void', '—'],
        ['validate', 'Validation function, returns error or null', '(value: string) => string | null', '—'],
        ['placeholder', 'Placeholder when value is empty', 'string', "'Click to edit'"],
        ['disabled', 'Disable editing', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Click the text to enter edit mode, press Enter to save, Escape to cancel</p>
          <p>• Validate function runs on save — if it returns a string, the error is shown</p>
          <p>• Use for inline editing of labels, titles, and short text values</p>
        </div>
      </div>
    </div>
  ),
}
moleculeItemsM.push(inlineEditItem)

export { moleculeItemsM }
