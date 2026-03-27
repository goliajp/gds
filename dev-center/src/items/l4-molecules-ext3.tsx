import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { CodeBlock, MentionInput, RadioCard } from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

const moleculeItemsD: DevCenterItem[] = []

// radio-card

const radioOptions = [
  { value: 'starter', label: 'Starter', description: 'For personal projects' },
  { value: 'pro', label: 'Pro', description: 'For teams and businesses' },
  { value: 'enterprise', label: 'Enterprise', description: 'Custom solutions' },
]

const radioIconOptions = [
  {
    value: 'light',
    label: 'Light',
    description: 'Bright and clean',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="3" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2" />
      </svg>
    ),
  },
  {
    value: 'dark',
    label: 'Dark',
    description: 'Easy on the eyes',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13.5 8a5.5 5.5 0 01-8.3 4.7A5.5 5.5 0 018 2.5a4 4 0 005.5 5.5z" />
      </svg>
    ),
  },
]

function RadioCardStateless({ columns, disabled, glass }: { columns?: 1 | 2 | 3, disabled?: boolean, glass?: boolean }) {
  const [val, setVal] = useState<string | null>(null)
  return <RadioCard options={radioOptions} value={val} onChange={setVal} columns={columns} disabled={disabled} glass={glass} />
}

const radioCardItem: DevCenterItem = {
  id: 'radio-card',
  label: 'RadioCard',
  layer: 'l4',
  type: 'interactive',
  tags: ['form', 'radio', 'card', 'selection', 'option'],
  defaultConfig: { columns: 1, disabled: false, glass: false },

  stage: ({ config }) => {
    function RadioCardDemo() {
      const [val, setVal] = useState<string | null>(null)
      return (
        <RadioCard
          options={radioOptions}
          value={val}
          onChange={setVal}
          columns={config.columns}
          disabled={config.disabled}
          glass={config.glass}
        />
      )
    }
    return (
      <div>
        <ImportLine text="import { RadioCard } from '@golia/gds'" />

        <LivePreview>
          <div className="w-80">
            <RadioCardDemo />
          </div>
        </LivePreview>

        <DocSection title="Variants" columns={2}>
          <DemoCard title="Single Column" description="Default vertical layout" code={`<RadioCard\n  options={options}\n  value={val}\n  onChange={setVal}\n/>`}>
            <div className="w-60">
              <RadioCardStateless />
            </div>
          </DemoCard>
          <DemoCard title="Two Columns" description="Grid layout for compact display" code={`<RadioCard columns={2}\n  options={options}\n  value={val}\n  onChange={setVal}\n/>`}>
            <div className="w-80">
              <RadioCardStateless columns={2} />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="States" columns={2}>
          <DemoCard title="With Icons" description="Icon + label + description" code={`<RadioCard options={iconOptions} value={val} onChange={setVal} />`}>
            <div className="w-60">
              {(() => {
                function IconDemo() {
                  const [v, setV] = useState<string | null>(null)
                  return <RadioCard options={radioIconOptions} value={v} onChange={setV} />
                }
                return <IconDemo />
              })()}
            </div>
          </DemoCard>
          <DemoCard title="Disabled" description="Non-interactive state" code={`<RadioCard disabled options={options} value="pro" onChange={setVal} />`}>
            <div className="w-60">
              <RadioCard options={radioOptions} value="pro" onChange={() => {}} disabled />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl label="columns" type="pills" value={String(config.columns)} options={['1', '2', '3']} onChange={v => setConfig('columns', Number(v))} />
      <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
      <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { RadioCard } from '@golia/gds'", '']
    const props: string[] = ['options={options}', 'value={val}', 'onChange={setVal}']
    if (config.columns !== 1) props.push(`columns={${config.columns}}`)
    if (config.disabled === true) props.push('disabled')
    if (config.glass === true) props.push('glass')
    lines.push('<RadioCard')
    for (const p of props) lines.push(`  ${p}`)
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['options', 'Radio options array', '{ value, label, description?, icon? }[]', '—'],
        ['value', 'Selected value', 'string | null', '—'],
        ['onChange', 'Selection callback', '(value: string) => void', '—'],
        ['columns', 'Grid columns', '1 | 2 | 3', '1'],
        ['disabled', 'Disable interaction', 'boolean', 'false'],
        ['glass', 'Glass morphism', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}

moleculeItemsD.push(radioCardItem)

// mention-input

const mentionSuggestions = [
  { id: '1', label: 'Alice' },
  { id: '2', label: 'Bob' },
  { id: '3', label: 'Charlie' },
  { id: '4', label: 'Diana' },
]

function MentionInputStateless({ placeholder, disabled }: { placeholder?: string, disabled?: boolean }) {
  const [val, setVal] = useState('')
  return <MentionInput value={val} onChange={setVal} suggestions={mentionSuggestions} placeholder={placeholder} disabled={disabled} />
}

const mentionInputItem: DevCenterItem = {
  id: 'mention-input',
  label: 'MentionInput',
  layer: 'l4',
  type: 'interactive',
  tags: ['form', 'input', 'mention', 'autocomplete', 'user'],
  defaultConfig: { placeholder: 'Type @ to mention...', disabled: false, trigger: '@' },

  stage: ({ config }) => {
    function MentionDemo() {
      const [val, setVal] = useState('')
      return (
        <MentionInput
          value={val}
          onChange={setVal}
          suggestions={mentionSuggestions}
          placeholder={config.placeholder}
          disabled={config.disabled}
          trigger={config.trigger}
        />
      )
    }
    return (
      <div>
        <ImportLine text="import { MentionInput } from '@golia/gds'" />

        <LivePreview>
          <div className="w-80">
            <MentionDemo />
          </div>
        </LivePreview>

        <DocSection title="Examples" columns={2}>
          <DemoCard title="Default" description="Type @ to see suggestions" code={`<MentionInput\n  value={val}\n  onChange={setVal}\n  suggestions={users}\n  placeholder="Type @ to mention..."\n/>`}>
            <div className="w-60">
              <MentionInputStateless placeholder="Type @ to mention..." />
            </div>
          </DemoCard>
          <DemoCard title="Disabled" description="Non-interactive state" code={`<MentionInput disabled value="" onChange={setVal} suggestions={users} />`}>
            <div className="w-60">
              <MentionInputStateless disabled placeholder="Disabled" />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl label="placeholder" type="text" value={config.placeholder} onChange={v => setConfig('placeholder', v)} />
      <Ctrl label="trigger" type="text" value={config.trigger} onChange={v => setConfig('trigger', v)} />
      <Ctrl label="disabled" type="check" value={config.disabled} onChange={v => setConfig('disabled', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { MentionInput } from '@golia/gds'", '']
    const props: string[] = ['value={val}', 'onChange={setVal}', 'suggestions={users}']
    if (config.placeholder !== '') props.push(`placeholder="${config.placeholder}"`)
    if (config.trigger !== '@') props.push(`trigger="${config.trigger}"`)
    if (config.disabled === true) props.push('disabled')
    lines.push('<MentionInput')
    for (const p of props) lines.push(`  ${p}`)
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Input value', 'string', '—'],
        ['onChange', 'Value change callback', '(value: string) => void', '—'],
        ['suggestions', 'Available mentions', '{ id: string, label: string }[]', '—'],
        ['trigger', 'Trigger character', 'string', "'@'"],
        ['placeholder', 'Input placeholder', 'string', '—'],
        ['disabled', 'Disable interaction', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}

moleculeItemsD.push(mentionInputItem)

// code-block

const sampleCode = `import { Button } from '@golia/gds'

function App() {
  return (
    <Button variant="primary" size="default">
      Click me
    </Button>
  )
}`

const codeBlockItem: DevCenterItem = {
  id: 'code-block',
  label: 'CodeBlock',
  layer: 'l4',
  type: 'interactive',
  tags: ['display', 'code', 'syntax', 'copy', 'pre'],
  defaultConfig: { language: 'tsx', showLineNumbers: true, glass: false, maxHeight: '' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CodeBlock } from '@golia/gds'" />

      <LivePreview>
        <div className="w-96">
          <CodeBlock
            code={sampleCode}
            language={config.language}
            showLineNumbers={config.showLineNumbers}
            glass={config.glass}
            maxHeight={config.maxHeight !== '' ? Number(config.maxHeight) : undefined}
          />
        </div>
      </LivePreview>

      <DocSection title="Variants" columns={2}>
        <DemoCard title="With Line Numbers" description="Default display with numbered lines" code={`<CodeBlock code={code} language="tsx" />`}>
          <div className="w-72">
            <CodeBlock code={`const x = 1\nconst y = 2`} language="tsx" />
          </div>
        </DemoCard>
        <DemoCard title="No Line Numbers" description="Clean code display" code={`<CodeBlock code={code} showLineNumbers={false} />`}>
          <div className="w-72">
            <CodeBlock code={`const x = 1\nconst y = 2`} showLineNumbers={false} />
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Features" columns={2}>
        <DemoCard title="Glass" description="Glass morphism variant" code={`<CodeBlock code={code} glass />`}>
          <div className="w-72">
            <CodeBlock code={`const x = 1\nconst y = 2`} language="ts" glass />
          </div>
        </DemoCard>
        <DemoCard title="Max Height" description="Scrollable with height limit" code={`<CodeBlock code={longCode} maxHeight={80} />`}>
          <div className="w-72">
            <CodeBlock code={`line 1\nline 2\nline 3\nline 4\nline 5\nline 6\nline 7\nline 8`} maxHeight={80} />
          </div>
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl label="language" type="text" value={config.language} onChange={v => setConfig('language', v)} />
      <Ctrl label="showLineNumbers" type="check" value={config.showLineNumbers} onChange={v => setConfig('showLineNumbers', v)} />
      <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      <Ctrl label="maxHeight" type="text" value={config.maxHeight} onChange={v => setConfig('maxHeight', v)} placeholder="e.g. 200" />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { CodeBlock } from '@golia/gds'", '']
    const props: string[] = ['code={code}']
    if (config.language !== '') props.push(`language="${config.language}"`)
    if (config.showLineNumbers === false) props.push('showLineNumbers={false}')
    if (config.glass === true) props.push('glass')
    if (config.maxHeight !== '') props.push(`maxHeight={${config.maxHeight}}`)
    lines.push('<CodeBlock')
    for (const p of props) lines.push(`  ${p}`)
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['code', 'Code string to display', 'string', '—'],
        ['language', 'Language label', 'string', "'code'"],
        ['showLineNumbers', 'Show line number gutter', 'boolean', 'true'],
        ['maxHeight', 'Max height with scroll', 'number | string', '—'],
        ['glass', 'Glass morphism', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}

moleculeItemsD.push(codeBlockItem)

export { moleculeItemsD }
