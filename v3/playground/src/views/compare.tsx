import { useState } from 'react'

// v2 components
import {
  Badge as BadgeV2,
  Button as ButtonV2,
  Input as InputV2,
  Progress as ProgressV2,
} from '@goliapkg/gds/primitives'
import { Avatar as AvatarV2, Checkbox as CheckboxV2 } from '@goliapkg/gds/atoms'
import {
  Card as CardV2,
  CardContent as CardContentV2,
  CardHeader as CardHeaderV2,
} from '@goliapkg/gds/molecules'

// v3 components
import {
  Badge as BadgeV3,
  Button as ButtonV3,
  HStack,
  Input as InputV3,
  Progress as ProgressV3,
  VStack,
} from '@gds-v3/primitives'
import { Avatar as AvatarV3, Checkbox as CheckboxV3, ProgressBar } from '@gds-v3/atoms'
import {
  Card as CardV3,
  CardContent as CardContentV3,
  CardHeader as CardHeaderV3,
  DataCard,
  SectionHeader,
} from '@gds-v3/molecules'

type ComponentId =
  | 'button'
  | 'badge'
  | 'input'
  | 'card'
  | 'avatar'
  | 'checkbox'
  | 'progress'
  | 'new'

const COMPONENTS: { id: ComponentId; label: string }[] = [
  { id: 'button', label: 'Button' },
  { id: 'badge', label: 'Badge' },
  { id: 'input', label: 'Input' },
  { id: 'card', label: 'Card' },
  { id: 'avatar', label: 'Avatar' },
  { id: 'checkbox', label: 'Checkbox' },
  { id: 'progress', label: 'Progress' },
  { id: 'new', label: 'v3 New' },
]

function ButtonCompare({
  size,
  glass,
  glow,
  loading,
}: {
  size: 'sm' | 'default' | 'lg'
  glass: boolean
  glow: boolean
  loading: boolean
}) {
  return (
    <>
      <Row label="Primary">
        <ButtonV2 glass={glass} loading={loading} size={size} variant="primary">
          Button
        </ButtonV2>
        <ButtonV3 glass={glass} glow={glow} loading={loading} size={size} variant="primary">
          Button
        </ButtonV3>
      </Row>
      <Row label="Secondary">
        <ButtonV2 glass={glass} size={size} variant="secondary">
          Button
        </ButtonV2>
        <ButtonV3 glass={glass} glow={glow} size={size} variant="secondary">
          Button
        </ButtonV3>
      </Row>
      <Row label="Ghost">
        <ButtonV2 size={size} variant="ghost">
          Button
        </ButtonV2>
        <ButtonV3 glow={glow} size={size} variant="ghost">
          Button
        </ButtonV3>
      </Row>
      <Row label="Danger">
        <ButtonV2 size={size} variant="danger">
          Button
        </ButtonV2>
        <ButtonV3 glow={glow ? 'danger' : false} size={size} variant="danger">
          Button
        </ButtonV3>
      </Row>
      <Row label="Link (v3 only)">
        <span className="text-fg-muted gds-text-caption">N/A</span>
        <ButtonV3 size={size} variant="link">
          Link Button
        </ButtonV3>
      </Row>
      <Row label="Tab (v3 only)">
        <span className="text-fg-muted gds-text-caption">N/A</span>
        <ButtonV3 data-active="true" size={size} variant="tab">
          Active Tab
        </ButtonV3>
      </Row>
    </>
  )
}

function BadgeCompare({ glass, glow }: { glass: boolean; glow: boolean }) {
  const variants = ['default', 'success', 'warning', 'danger', 'info'] as const
  return (
    <>
      {variants.map((v) => (
        <Row key={v} label={v}>
          <BadgeV2 glass={glass} variant={v}>
            {v}
          </BadgeV2>
          <BadgeV3 glass={glass} glow={glow} variant={v}>
            {v}
          </BadgeV3>
        </Row>
      ))}
    </>
  )
}

function InputCompare({ glass, glow }: { glass: boolean; glow: boolean }) {
  return (
    <>
      <Row label="Default">
        <InputV2 glass={glass} placeholder="v2 input" />
        <InputV3 glass={glass} glow={glow} placeholder="v3 input" />
      </Row>
      <Row label="Small">
        <InputV2 glass={glass} inputSize="sm" placeholder="v2 small" />
        <InputV3 glass={glass} glow={glow} inputSize="sm" placeholder="v3 small" />
      </Row>
    </>
  )
}

function CardCompare({ glass, glow }: { glass: boolean; glow: boolean }) {
  return (
    <>
      <Row label="Card + Header">
        <CardV2 glass={glass} padding="sm">
          <CardHeaderV2 title="v2 Card" description="With header" />
          <CardContentV2>Content here</CardContentV2>
        </CardV2>
        <CardV3 glass={glass} glow={glow} padding="sm">
          <CardHeaderV3 title="v3 Card" description="With header + glow" />
          <CardContentV3>Content here</CardContentV3>
        </CardV3>
      </Row>
    </>
  )
}

function AvatarCompare({ glass, glow }: { glass: boolean; glow: boolean }) {
  return (
    <>
      {(['xs', 'sm', 'default', 'lg'] as const).map((s) => (
        <Row key={s} label={`size=${s}`}>
          <AvatarV2 glass={glass} name="Li Hao" size={s} />
          <AvatarV3 glass={glass} glow={glow} name="Li Hao" size={s} />
        </Row>
      ))}
    </>
  )
}

function CheckboxCompare({ glow }: { glow: boolean }) {
  const [v2, setV2] = useState(false)
  const [v3, setV3] = useState(false)
  return (
    <>
      <Row label="Unchecked">
        <CheckboxV2 checked={v2} label="v2 checkbox" onChange={setV2} />
        <CheckboxV3 checked={v3} glow={glow} label="v3 checkbox" onChange={setV3} />
      </Row>
      <Row label="Checked">
        <CheckboxV2 checked label="v2 checked" onChange={() => {}} />
        <CheckboxV3 checked glow={glow} label="v3 checked" onChange={() => {}} />
      </Row>
    </>
  )
}

function ProgressCompare({ glow }: { glow: boolean }) {
  return (
    <>
      <Row label="Default">
        <div className="w-40">
          <ProgressV2 value={65} />
        </div>
        <div className="w-40">
          <ProgressV3 glow={glow} value={65} />
        </div>
      </Row>
      <Row label="ProgressBar (v3 only)">
        <span className="text-fg-muted gds-text-caption">N/A</span>
        <div className="w-52">
          <ProgressBar color="success" glow={glow} label="CPU" showPercent value={72} />
        </div>
      </Row>
    </>
  )
}

function NewV3Only({ glass, glow }: { glass: boolean; glow: boolean }) {
  return (
    <>
      <div className="col-span-2 mb-4">
        <p className="text-fg-muted gds-text-body">v3 独有组件，v2 中不存在</p>
      </div>
      <div className="col-span-2 space-y-4">
        <SectionHeader
          action={
            <ButtonV3 size="sm" variant="ghost">
              Export
            </ButtonV3>
          }
          title="SectionHeader"
        />
        <div className="grid grid-cols-3 gap-3">
          <DataCard
            change="+12%"
            glass={glass}
            glow={glow}
            title="月收入"
            trend="up"
            value="¥1,200,000"
          />
          <DataCard change="-3%" glass={glass} title="月支出" trend="down" value="¥980,000" />
          <DataCard
            footer={<ProgressBar color="success" label="" showPercent={false} value={86} />}
            glass={glass}
            title="完成率"
            value="86%"
          />
        </div>
        <HStack gap="md">
          <ButtonV3 glow={glow} variant="primary">
            HStack
          </ButtonV3>
          <ButtonV3 variant="secondary">Layout</ButtonV3>
          <ButtonV3 variant="ghost">Primitive</ButtonV3>
          <BadgeV3 variant="success">NEW</BadgeV3>
        </HStack>
        <VStack gap="sm">
          <ProgressBar color="accent" glow={glow} label="Design" value={90} />
          <ProgressBar color="success" label="Dev" value={65} />
          <ProgressBar color="warning" label="Test" value={30} />
        </VStack>
      </div>
    </>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <div className="text-fg-muted gds-text-caption col-span-2 font-medium">{label}</div>
      <div className="border-border/50 flex items-center justify-center rounded-lg border border-dashed p-3">
        {Array.isArray(children) ? children[0] : children}
      </div>
      <div className="border-border/50 flex items-center justify-center rounded-lg border border-dashed p-3">
        {Array.isArray(children) ? children[1] : null}
      </div>
    </>
  )
}

export function CompareView() {
  const [active, setActive] = useState<ComponentId>('button')
  const [size, setSize] = useState<'sm' | 'default' | 'lg'>('default')
  const [glass, setGlass] = useState(false)
  const [glow, setGlow] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div className="bg-bg flex h-full flex-col">
      {/* header */}
      <header className="border-border flex shrink-0 items-center justify-between border-b px-6 py-3">
        <h1 className="text-fg gds-text-heading font-bold">v2 / v3 Component Compare</h1>
        <a className="text-accent gds-text-caption hover:underline" href="/">
          ← Home
        </a>
      </header>

      {/* component selector */}
      <div className="border-border flex shrink-0 gap-1 border-b px-6 py-2">
        {COMPONENTS.map((c) => (
          <ButtonV3
            className={active === c.id ? 'bg-accent/15 text-accent' : ''}
            key={c.id}
            onClick={() => setActive(c.id)}
            size="sm"
            variant="ghost"
          >
            {c.label}
          </ButtonV3>
        ))}
      </div>

      {/* controls */}
      <div className="border-border flex shrink-0 items-center gap-4 border-b px-6 py-2">
        <label className="text-fg-muted gds-text-caption flex items-center gap-2">
          Size:
          <select
            className="bg-bg-secondary border-border gds-text-caption rounded border px-2 py-0.5"
            onChange={(e) => setSize(e.target.value as 'sm' | 'default' | 'lg')}
            value={size}
          >
            <option value="sm">sm</option>
            <option value="default">default</option>
            <option value="lg">lg</option>
          </select>
        </label>
        <CheckboxV3 checked={glass} label="glass" onChange={setGlass} />
        <CheckboxV3 checked={glow} label="glow" onChange={setGlow} />
        <CheckboxV3 checked={loading} label="loading" onChange={setLoading} />
      </div>

      {/* comparison grid */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-3">
          {/* column headers */}
          <div />
          <div className="text-fg-muted gds-text-caption text-center font-semibold">v2</div>
          <div className="text-accent gds-text-caption text-center font-semibold">v3</div>

          {active === 'button' && (
            <ButtonCompare glass={glass} glow={glow} loading={loading} size={size} />
          )}
          {active === 'badge' && <BadgeCompare glass={glass} glow={glow} />}
          {active === 'input' && <InputCompare glass={glass} glow={glow} />}
          {active === 'card' && <CardCompare glass={glass} glow={glow} />}
          {active === 'avatar' && <AvatarCompare glass={glass} glow={glow} />}
          {active === 'checkbox' && <CheckboxCompare glow={glow} />}
          {active === 'progress' && <ProgressCompare glow={glow} />}
          {active === 'new' && <NewV3Only glass={glass} glow={glow} />}
        </div>
      </div>
    </div>
  )
}
