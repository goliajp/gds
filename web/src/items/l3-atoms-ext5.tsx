import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { ProgressCircle } from '@gds/l3-atoms'

import type { DevCenterItem } from '../types'

const atomItemsF: DevCenterItem[] = []

// progress-circle
const progressCircleItem: DevCenterItem = {
  id: 'progress-circle',
  label: 'ProgressCircle',
  layer: 'l3',
  type: 'interactive',
  tags: ['progress', 'circle', 'percentage', 'svg', 'indicator'],
  defaultConfig: { value: 65, size: 64, strokeWidth: 4, showValue: true, variant: 'accent' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ProgressCircle } from '@goliapkg/gds'" />

      <LivePreview>
        <div className="flex items-center gap-6">
          <ProgressCircle
            showValue={config.showValue}
            size={config.size}
            strokeWidth={config.strokeWidth}
            value={config.value}
            variant={config.variant}
          />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-fg">{config.value}% complete</span>
            <span className="text-xs text-fg-muted">variant: {config.variant}</span>
          </div>
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable
          rows={[
            ['value', 'number', '—', 'Progress percentage (0-100)'],
            ['size', 'number', '64', 'Diameter in pixels'],
            ['strokeWidth', 'number', '4', 'Stroke width in pixels'],
            ['showValue', 'boolean', 'true', 'Show percentage text in center'],
            ['variant', "'accent' | 'success' | 'warning' | 'danger'", "'accent'", 'Color variant'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="value" value={config.value} onChange={(v) => setConfig('value', v)} min={0} max={100} />
      <Ctrl type="number" label="size" value={config.size} onChange={(v) => setConfig('size', v)} min={24} max={200} />
      <Ctrl type="number" label="strokeWidth" value={config.strokeWidth} onChange={(v) => setConfig('strokeWidth', v)} min={1} max={12} />
      <Ctrl type="check" label="showValue" value={config.showValue} onChange={(v) => setConfig('showValue', v)} />
      <Ctrl type="pills" label="variant" value={config.variant} options={['accent', 'success', 'warning', 'danger']} onChange={(v) => setConfig('variant', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { ProgressCircle } from '@goliapkg/gds'", '']
    const props: string[] = [`value={${config.value}}`]
    if (config.size !== 64) props.push(`size={${config.size}}`)
    if (config.strokeWidth !== 4) props.push(`strokeWidth={${config.strokeWidth}}`)
    if (config.showValue === false) props.push('showValue={false}')
    if (config.variant !== 'accent') props.push(`variant="${config.variant}"`)
    lines.push(`<ProgressCircle ${props.join(' ')} />`)
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Progress percentage (0-100)', 'number', '—'],
        ['size', 'Diameter in pixels', 'number', '64'],
        ['strokeWidth', 'Stroke width in pixels', 'number', '4'],
        ['showValue', 'Show percentage text in center', 'boolean', 'true'],
        ['variant', 'Color variant', "'accent' | 'success' | 'warning' | 'danger'", "'accent'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Uses SVG with strokeDasharray for smooth arc rendering</p>
          <p>• Value is clamped between 0 and 100 automatically</p>
          <p>• Use semantic variants to indicate status (success, warning, danger)</p>
        </div>
      </div>
    </div>
  ),
}
atomItemsF.push(progressCircleItem)

export { atomItemsF }
