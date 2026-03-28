import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { CopyButton, Countdown } from '@gds/l3-atoms'

import type { DevCenterItem } from '../types'

const atomItemsE: DevCenterItem[] = []

// copy-button
const copyButtonItem: DevCenterItem = {
  id: 'copy-button',
  label: 'CopyButton',
  layer: 'l3',
  type: 'interactive',
  tags: ['copy', 'clipboard', 'button', 'feedback'],
  defaultConfig: { variant: 'default', size: 'default', label: 'Copy', copiedLabel: 'Copied!' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CopyButton } from '@goliapkg/gds'" />

      <LivePreview>
        <div className="flex items-center gap-3">
          <CopyButton
            text="npm install @goliapkg/gds"
            label={config.label}
            copiedLabel={config.copiedLabel}
            variant={config.variant}
            size={config.size}
          />
          <span className="text-xs text-fg-muted">npm install @goliapkg/gds</span>
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable
          rows={[
            ['text', 'string', '—', 'Text to copy to clipboard'],
            ['label', 'string', "'Copy'", 'Button label'],
            ['copiedLabel', 'string', "'Copied!'", 'Label shown after copying'],
            ['variant', "'default' | 'ghost'", "'default'", 'Visual variant'],
            ['size', "'default' | 'sm'", "'default'", 'Button size'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="variant" value={config.variant} options={['default', 'ghost']} onChange={(v) => setConfig('variant', v)} />
      <Ctrl type="pills" label="size" value={config.size} options={['default', 'sm']} onChange={(v) => setConfig('size', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { CopyButton } from '@goliapkg/gds'", '']
    const props: string[] = ['text="npm install @goliapkg/gds"']
    if (config.label !== 'Copy') props.push(`label="${config.label}"`)
    if (config.copiedLabel !== 'Copied!') props.push(`copiedLabel="${config.copiedLabel}"`)
    if (config.variant !== 'default') props.push(`variant="${config.variant}"`)
    if (config.size !== 'default') props.push(`size="${config.size}"`)
    lines.push(`<CopyButton ${props.join(' ')} />`)
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['text', 'Text to copy to clipboard', 'string', '—'],
        ['label', 'Button label', 'string', "'Copy'"],
        ['copiedLabel', 'Label shown after copying', 'string', "'Copied!'"],
        ['variant', 'Visual variant', "'default' | 'ghost'", "'default'"],
        ['size', 'Button size', "'default' | 'sm'", "'default'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Shows a check icon and copiedLabel for 1.5s after copying</p>
          <p>• Uses navigator.clipboard API for secure clipboard access</p>
          <p>• Pair with code blocks or command lines for copy-to-clipboard UX</p>
        </div>
      </div>
    </div>
  ),
}
atomItemsE.push(copyButtonItem)

// countdown
const countdownItem: DevCenterItem = {
  id: 'countdown',
  label: 'Countdown',
  layer: 'l3',
  type: 'interactive',
  tags: ['countdown', 'timer', 'time', 'date', 'clock'],
  defaultConfig: { showDays: true, showSeconds: true, minutesFromNow: 90 },

  stage: ({ config }) => {
    const target = new Date(Date.now() + config.minutesFromNow * 60 * 1000)

    return (
      <div>
        <ImportLine text="import { Countdown } from '@goliapkg/gds'" />

        <LivePreview>
          <Countdown
            targetDate={target}
            showDays={config.showDays}
            showSeconds={config.showSeconds}
          />
        </LivePreview>

        <DocSection title="API">
          <DocTable
            rows={[
              ['targetDate', 'Date | string | number', '—', 'Countdown target time'],
              ['onComplete', '() => void', '—', 'Fires when countdown reaches zero'],
              ['showDays', 'boolean', 'true', 'Show days segment'],
              ['showSeconds', 'boolean', 'true', 'Show seconds segment'],
              ['className', 'string', '—', 'Additional CSS classes'],
            ]}
          />
        </DocSection>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="showDays" value={config.showDays} onChange={(v) => setConfig('showDays', v)} />
      <Ctrl type="check" label="showSeconds" value={config.showSeconds} onChange={(v) => setConfig('showSeconds', v)} />
      <Ctrl type="number" label="minutesFromNow" value={config.minutesFromNow} onChange={(v) => setConfig('minutesFromNow', v)} min={1} max={10080} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { Countdown } from '@goliapkg/gds'", '']
    const props: string[] = ['targetDate={targetDate}']
    if (config.showDays === false) props.push('showDays={false}')
    if (config.showSeconds === false) props.push('showSeconds={false}')
    lines.push(`<Countdown ${props.join(' ')} />`)
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['targetDate', 'Countdown target time', 'Date | string | number', '—'],
        ['onComplete', 'Fires when countdown reaches zero', '() => void', '—'],
        ['showDays', 'Show days segment', 'boolean', 'true'],
        ['showSeconds', 'Show seconds segment', 'boolean', 'true'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Updates every second with tabular-nums for stable layout</p>
          <p>• Accepts Date, ISO string, or Unix timestamp as targetDate</p>
          <p>• Use onComplete callback for post-countdown actions</p>
        </div>
      </div>
    </div>
  ),
}
atomItemsE.push(countdownItem)

export { atomItemsE }
