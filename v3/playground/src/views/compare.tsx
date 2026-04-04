import type { ReactNode } from 'react'
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

// --- types ---

type ComponentId =
  | 'button'
  | 'badge'
  | 'input'
  | 'card'
  | 'avatar'
  | 'checkbox'
  | 'progress'
  | 'new'
type SizeOption = 'sm' | 'default' | 'lg'

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

const NA = <span className="text-fg-muted/50 gds-text-caption">—</span>

// --- layout ---

function Row({ label, v2, v3 }: { label: string; v2: ReactNode; v3: ReactNode }) {
  return (
    <div className="border-border/20 flex items-center border-b py-3">
      <div className="gds-text-label text-fg-muted w-24 shrink-0 font-medium">{label}</div>
      <div className="flex flex-1 items-center justify-center px-3">{v2}</div>
      <div className="border-border/20 border-l" />
      <div className="flex flex-1 items-center justify-center px-3">{v3}</div>
    </div>
  )
}

function Header() {
  return (
    <div className="border-border/40 flex items-center border-b py-2">
      <div className="w-24 shrink-0" />
      <div className="text-fg-muted gds-text-caption flex-1 text-center font-semibold tracking-wider uppercase">
        v2
      </div>
      <div className="border-border/20 border-l" />
      <div className="text-accent gds-text-caption flex-1 text-center font-semibold tracking-wider uppercase">
        v3
      </div>
    </div>
  )
}

// --- comparisons ---

function ButtonCompare({
  size,
  glass,
  glow,
  loading,
}: {
  size: SizeOption
  glass: boolean
  glow: boolean
  loading: boolean
}) {
  return (
    <>
      <Row
        label="Primary"
        v2={
          <ButtonV2 glass={glass} loading={loading} size={size} variant="primary">
            Button
          </ButtonV2>
        }
        v3={
          <ButtonV3 glass={glass} glow={glow} loading={loading} size={size} variant="primary">
            Button
          </ButtonV3>
        }
      />
      <Row
        label="Secondary"
        v2={
          <ButtonV2 glass={glass} size={size} variant="secondary">
            Button
          </ButtonV2>
        }
        v3={
          <ButtonV3 glass={glass} glow={glow} size={size} variant="secondary">
            Button
          </ButtonV3>
        }
      />
      <Row
        label="Ghost"
        v2={
          <ButtonV2 size={size} variant="ghost">
            Button
          </ButtonV2>
        }
        v3={
          <ButtonV3 glow={glow} size={size} variant="ghost">
            Button
          </ButtonV3>
        }
      />
      <Row
        label="Danger"
        v2={
          <ButtonV2 size={size} variant="danger">
            Button
          </ButtonV2>
        }
        v3={
          <ButtonV3 glow={glow ? 'danger' : false} size={size} variant="danger">
            Button
          </ButtonV3>
        }
      />
      <Row
        label="Link ★"
        v2={NA}
        v3={
          <ButtonV3 size={size} variant="link">
            Link Button
          </ButtonV3>
        }
      />
      <Row
        label="Tab ★"
        v2={NA}
        v3={
          <ButtonV3 data-active="true" size={size} variant="tab">
            Active Tab
          </ButtonV3>
        }
      />
    </>
  )
}

function BadgeCompare({ glass, glow }: { glass: boolean; glow: boolean }) {
  const variants = ['default', 'success', 'warning', 'danger', 'info'] as const
  return (
    <>
      {variants.map((v) => (
        <Row
          key={v}
          label={v}
          v2={
            <BadgeV2 glass={glass} variant={v}>
              {v}
            </BadgeV2>
          }
          v3={
            <BadgeV3 glass={glass} glow={glow} variant={v}>
              {v}
            </BadgeV3>
          }
        />
      ))}
    </>
  )
}

function InputCompare({ glass, glow }: { glass: boolean; glow: boolean }) {
  return (
    <>
      <Row
        label="Default"
        v2={<InputV2 className="w-48" glass={glass} placeholder="v2 input" />}
        v3={<InputV3 className="w-48" glass={glass} glow={glow} placeholder="v3 input" />}
      />
      <Row
        label="Small"
        v2={<InputV2 className="w-48" glass={glass} inputSize="sm" placeholder="v2 small" />}
        v3={
          <InputV3
            className="w-48"
            glass={glass}
            glow={glow}
            inputSize="sm"
            placeholder="v3 small"
          />
        }
      />
    </>
  )
}

function CardCompare({ glass, glow }: { glass: boolean; glow: boolean }) {
  return (
    <>
      <Row
        label="With Header"
        v2={
          <CardV2 className="w-56" glass={glass} padding="sm">
            <CardHeaderV2 description="Description text" title="v2 Card" />
            <CardContentV2>Card content</CardContentV2>
          </CardV2>
        }
        v3={
          <CardV3 className="w-56" glass={glass} glow={glow} padding="sm">
            <CardHeaderV3 description="With glow support" title="v3 Card" />
            <CardContentV3>Card content</CardContentV3>
          </CardV3>
        }
      />
      <Row
        label="DataCard ★"
        v2={NA}
        v3={
          <DataCard
            className="w-56"
            glass={glass}
            glow={glow}
            title="Revenue"
            trend="up"
            change="+12%"
            value="¥1.2M"
          />
        }
      />
    </>
  )
}

function AvatarCompare({ glass, glow }: { glass: boolean; glow: boolean }) {
  return (
    <>
      {(['xs', 'sm', 'default', 'lg'] as const).map((s) => (
        <Row
          key={s}
          label={s}
          v2={<AvatarV2 glass={glass} name="Li Hao" size={s} />}
          v3={<AvatarV3 glass={glass} glow={glow} name="Li Hao" size={s} />}
        />
      ))}
    </>
  )
}

function CheckboxCompare({ glow }: { glow: boolean }) {
  const [v2, setV2] = useState(false)
  const [v3, setV3] = useState(false)
  return (
    <>
      <Row
        label="Interactive"
        v2={<CheckboxV2 checked={v2} label="v2 checkbox" onChange={setV2} />}
        v3={<CheckboxV3 checked={v3} glow={glow} label="v3 checkbox" onChange={setV3} />}
      />
      <Row
        label="Checked"
        v2={<CheckboxV2 checked label="Checked" onChange={() => {}} />}
        v3={<CheckboxV3 checked glow={glow} label="Checked" onChange={() => {}} />}
      />
    </>
  )
}

function ProgressCompare({ glow }: { glow: boolean }) {
  return (
    <>
      <Row
        label="Bar"
        v2={
          <div className="w-44">
            <ProgressV2 value={65} />
          </div>
        }
        v3={
          <div className="w-44">
            <ProgressV3 glow={glow} value={65} />
          </div>
        }
      />
      <Row
        label="ProgressBar ★"
        v2={NA}
        v3={
          <div className="w-52">
            <ProgressBar color="success" glow={glow} label="CPU" showPercent value={72} />
          </div>
        }
      />
    </>
  )
}

function NewV3Only({ glass, glow }: { glass: boolean; glow: boolean }) {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="text-fg gds-text-body mb-3 font-semibold">SectionHeader</h3>
        <SectionHeader
          action={
            <ButtonV3 size="sm" variant="ghost">
              Export
            </ButtonV3>
          }
          title="财务指标"
          description="2026 Q1"
        />
      </div>

      <div>
        <h3 className="text-fg gds-text-body mb-3 font-semibold">DataCard</h3>
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
      </div>

      <div>
        <h3 className="text-fg gds-text-body mb-3 font-semibold">HStack / VStack</h3>
        <HStack gap="md">
          <ButtonV3 glow={glow} variant="primary">
            Primary
          </ButtonV3>
          <ButtonV3 variant="secondary">Secondary</ButtonV3>
          <ButtonV3 variant="ghost">Ghost</ButtonV3>
          <BadgeV3 variant="success">NEW</BadgeV3>
        </HStack>
      </div>

      <div>
        <h3 className="text-fg gds-text-body mb-3 font-semibold">ProgressBar</h3>
        <VStack gap="sm" className="max-w-md">
          <ProgressBar color="accent" glow={glow} label="Design" value={90} />
          <ProgressBar color="success" label="Dev" value={65} />
          <ProgressBar color="warning" label="Test" value={30} />
          <ProgressBar color="danger" label="Bugs" value={12} />
        </VStack>
      </div>
    </div>
  )
}

// --- main ---

export function CompareView() {
  const [active, setActive] = useState<ComponentId>('button')
  const [size, setSize] = useState<SizeOption>('default')
  const [glass, setGlass] = useState(false)
  const [glow, setGlow] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div className="bg-bg flex h-full flex-col">
      {/* header */}
      <header className="border-border flex shrink-0 items-center justify-between border-b px-6 py-3">
        <h1 className="text-fg gds-text-heading font-bold">v2 / v3 Component Compare</h1>
        <a className="text-accent gds-text-label hover:underline" href="/">
          ← Home
        </a>
      </header>

      {/* component tabs */}
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
      <div className="border-border flex shrink-0 items-center gap-5 border-b px-6 py-2">
        <div className="flex items-center gap-1">
          <span className="text-fg-muted gds-text-caption mr-1">Size:</span>
          {(['sm', 'default', 'lg'] as const).map((s) => (
            <ButtonV3
              className={size === s ? 'bg-accent/15 text-accent' : ''}
              key={s}
              onClick={() => setSize(s)}
              size="sm"
              variant="ghost"
            >
              {s}
            </ButtonV3>
          ))}
        </div>
        <div className="bg-border/30 h-4 w-px" />
        <CheckboxV3 checked={glass} label="glass" onChange={setGlass} />
        <CheckboxV3 checked={glow} label="glow" onChange={setGlow} />
        <CheckboxV3 checked={loading} label="loading" onChange={setLoading} />
      </div>

      {/* comparison area */}
      <div className="flex-1 overflow-y-auto px-6 py-2">
        <div className="mx-auto max-w-3xl">
          {active !== 'new' && <Header />}

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
