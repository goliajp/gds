import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { QuickAction, TextEffect } from '@gds/l3-atoms'

import type { DevCenterItem } from '../types'

const atomItemsD: DevCenterItem[] = []

// quick-action
const quickActionItem: DevCenterItem = {
  id: 'quick-action',
  label: 'QuickAction',
  layer: 'l3',
  type: 'interactive',
  tags: ['fab', 'button', 'action', 'floating', 'shortcut'],
  defaultConfig: { variant: 'primary', size: 'default', disabled: false, showLabel: true },

  stage: ({ config }) => {
    const plusIcon = (
      <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeWidth={2} viewBox="0 0 24 24" width="20">
        <path d="M12 5v14M5 12h14" />
      </svg>
    )
    const editIcon = (
      <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeWidth={2} viewBox="0 0 24 24" width="20">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    )

    return (
      <div>
        <ImportLine text="import { QuickAction } from '@golia/gds'" />

        <LivePreview>
          <div className="flex items-end gap-6">
            <QuickAction
              icon={plusIcon}
              label={config.showLabel ? 'Create' : undefined}
              variant={config.variant}
              size={config.size}
              disabled={config.disabled}
              onClick={() => {}}
            />
            <QuickAction
              icon={editIcon}
              label={config.showLabel ? 'Edit' : undefined}
              variant={config.variant}
              size={config.size}
              disabled={config.disabled}
              onClick={() => {}}
            />
          </div>
        </LivePreview>

        <DocSection title="Variants" columns={2}>
          <DemoCard title="Primary" description="Accent background with shadow" code={`<QuickAction icon={icon} variant="primary" onClick={fn} />`}>
            <QuickAction icon={plusIcon} variant="primary" onClick={() => {}} />
          </DemoCard>
          <DemoCard title="Secondary" description="Surface background with border" code={`<QuickAction icon={icon} variant="secondary" onClick={fn} />`}>
            <QuickAction icon={plusIcon} variant="secondary" onClick={() => {}} />
          </DemoCard>
        </DocSection>

        <DocSection title="Sizes" columns={3}>
          <DemoCard title="Small" description="36px" code={`<QuickAction icon={icon} size="sm" />`}>
            <QuickAction icon={plusIcon} size="sm" label="sm" onClick={() => {}} />
          </DemoCard>
          <DemoCard title="Default" description="44px" code={`<QuickAction icon={icon} size="default" />`}>
            <QuickAction icon={plusIcon} size="default" label="default" onClick={() => {}} />
          </DemoCard>
          <DemoCard title="Large" description="56px" code={`<QuickAction icon={icon} size="lg" />`}>
            <QuickAction icon={plusIcon} size="lg" label="lg" onClick={() => {}} />
          </DemoCard>
        </DocSection>

        <DocSection title="API">
          <DocTable
            rows={[
              ['icon', 'ReactNode', '—', 'Icon element'],
              ['label', 'string', '—', 'Text below button'],
              ['onClick', '() => void', '—', 'Click handler'],
              ['variant', "'primary' | 'secondary'", "'primary'", 'Visual variant'],
              ['size', "'sm' | 'default' | 'lg'", "'default'", 'Button size'],
              ['disabled', 'boolean', 'false', 'Disabled state'],
              ['className', 'string', '—', 'Additional CSS classes'],
            ]}
          />
        </DocSection>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="variant" value={config.variant} options={['primary', 'secondary']} onChange={(v) => setConfig('variant', v)} />
      <Ctrl type="pills" label="size" value={config.size} options={['sm', 'default', 'lg']} onChange={(v) => setConfig('size', v)} />
      <Ctrl type="check" label="showLabel" value={config.showLabel} onChange={(v) => setConfig('showLabel', v)} />
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
    </>
  ),
}
atomItemsD.push(quickActionItem)

// text-effect
const textEffectItem: DevCenterItem = {
  id: 'text-effect',
  label: 'TextEffect',
  layer: 'l3',
  type: 'interactive',
  tags: ['text', 'gradient', 'glow', 'highlight', 'typography', 'effect'],
  defaultConfig: { effect: 'gradient', text: 'GOLIA Design System' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { TextEffect } from '@golia/gds'" />

      <LivePreview>
        <div className="flex flex-col items-center gap-6">
          <TextEffect effect={config.effect} className="text-2xl font-bold">
            {config.text}
          </TextEffect>
        </div>
      </LivePreview>

      <DocSection title="Effects" columns={3}>
        <DemoCard title="Gradient" description="Colorful text gradient" code={`<TextEffect effect="gradient">Text</TextEffect>`}>
          <TextEffect effect="gradient" className="text-lg font-semibold">Gradient Text</TextEffect>
        </DemoCard>
        <DemoCard title="Highlight" description="Accent background highlight" code={`<TextEffect effect="highlight">Text</TextEffect>`}>
          <TextEffect effect="highlight" className="text-lg font-semibold">Highlighted</TextEffect>
        </DemoCard>
        <DemoCard title="Glow" description="Neon glow text-shadow" code={`<TextEffect effect="glow">Text</TextEffect>`}>
          <TextEffect effect="glow" className="text-lg font-semibold">Glowing</TextEffect>
        </DemoCard>
      </DocSection>

      <DocSection title="API">
        <DocTable
          rows={[
            ['children', 'string', '—', 'Text content'],
            ['effect', "'gradient' | 'highlight' | 'glow'", '—', 'Visual effect type'],
            ['gradientFrom', 'string', 'accent', 'Gradient start color (CSS value)'],
            ['gradientTo', 'string', 'success', 'Gradient end color (CSS value)'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="effect" value={config.effect} options={['gradient', 'highlight', 'glow']} onChange={(v) => setConfig('effect', v)} />
      <Ctrl type="text" label="text" value={config.text} onChange={(v) => setConfig('text', v)} />
    </>
  ),
}
atomItemsD.push(textEffectItem)

export { atomItemsD }
