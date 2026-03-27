import { useRef, useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button } from '@gds/l2-primitives'
import { Spotlight } from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

const organismItemsExt8: DevCenterItem[] = []

function SpotlightDemo({ placement }: { placement: 'top' | 'bottom' | 'left' | 'right' }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [active, setActive] = useState(false)

  return (
    <>
      <Button ref={ref} size="sm" onClick={() => setActive(true)}>
        Highlight me
      </Button>
      <Spotlight
        active={active}
        targetRef={ref}
        title="Feature Tour"
        description="Click this button to perform an action."
        placement={placement}
        onClose={() => setActive(false)}
      />
    </>
  )
}

const spotlightItem: DevCenterItem = {
  id: 'spotlight',
  label: 'Spotlight',
  layer: 'l5',
  type: 'interactive',
  tags: ['spotlight', 'highlight', 'onboarding', 'tutorial', 'overlay'],
  defaultConfig: { placement: 'bottom' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Spotlight } from '@goliapkg/gds'" />
      <LivePreview>
        <SpotlightDemo placement={config.placement} />
      </LivePreview>
      <DocSection title="Placements" columns={2}>
        <DemoCard title="Bottom" description="Tooltip below target" code={`<Spotlight placement="bottom" />`}>
          <SpotlightDemo placement="bottom" />
        </DemoCard>
        <DemoCard title="Right" description="Tooltip right of target" code={`<Spotlight placement="right" />`}>
          <SpotlightDemo placement="right" />
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="placement" value={config.placement} options={['top', 'bottom', 'left', 'right']} onChange={(v) => setConfig('placement', v)} />
    </>
  ),

  code: ({ config }) => {
    const props = [
      'active={active}',
      'targetRef={buttonRef}',
      'title="Feature Tour"',
      'description="Click here to continue."',
    ]
    if (config.placement !== 'bottom') props.push(`placement="${config.placement}"`)
    props.push('onClose={() => setActive(false)}')
    return `import { Spotlight } from '@goliapkg/gds'\n\nconst buttonRef = useRef<HTMLButtonElement>(null)\nconst [active, setActive] = useState(false)\n\n<Spotlight\n  ${props.join('\n  ')}\n/>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['active', 'Show/hide spotlight', 'boolean', 'false'],
        ['targetRef', 'Ref to highlighted element', 'RefObject<HTMLElement>', '—'],
        ['title', 'Tooltip title', 'string', '—'],
        ['description', 'Tooltip description', 'string', '—'],
        ['placement', 'Tooltip position relative to target', "'top' | 'bottom' | 'left' | 'right'", "'bottom'"],
        ['onClose', 'Called when spotlight is dismissed', '() => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt8.push(spotlightItem)

export { organismItemsExt8 }
