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
}
atomItemsF.push(progressCircleItem)

export { atomItemsF }
