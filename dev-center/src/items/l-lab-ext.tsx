import { useCallback, useRef, useState } from 'react'

import { DemoCard, DocSection } from '../components/demo'
import type { DevCenterItem } from '../types'

// ---------- item 1: motion ----------

function MotionStage() {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <div>
      <div className="text-lg font-bold text-fg">Motion</div>
      <p className="mt-1 text-sm text-fg-muted">
        Animation timing, easing, and interaction feedback patterns.
      </p>

      <DocSection title="Timing Scale">
        <div className="space-y-3">
          {[
            { css: 'transition-colors', name: '100ms', use: 'Hover states, micro-interactions' },
            { css: 'transition-all duration-150', name: '150ms', use: 'Button press, toggle switch' },
            { css: 'transition-all duration-200', name: '200ms', use: 'Panel expand/collapse, tab switch' },
            { css: 'transition-all duration-300', name: '300ms', use: 'Modal open/close, page transitions' },
          ].map((t) => (
            <div className="flex items-center gap-4" key={t.name}>
              <span className="w-16 shrink-0 text-sm font-bold text-accent">
                {t.name}
              </span>
              <div
                className="h-2 rounded-full bg-accent/20"
                style={{
                  transition: `width ${t.name} ease-out`,
                  width: `${parseInt(t.name) / 2}px`,
                }}
              />
              <span className="flex-1 text-xs text-fg-muted">{t.use}</span>
              <code className="text-[10px] text-fg-muted/40">{t.css}</code>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Popup Animation">
        <DemoCard
          code={'animation: popup-in 0.15s ease-out\n// scale 0.95\u21921, opacity 0\u21921'}
          description="0.15s scale + fade entrance"
          title="popup-in"
        >
          <div className="flex items-center gap-4">
            <button
              className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg hover:bg-accent-hover"
              onClick={() => {
                setShowPopup(false)
                requestAnimationFrame(() => setShowPopup(true))
              }}
            >
              Play popup-in
            </button>
            {showPopup && (
              <div
                className="rounded-lg border border-border bg-surface px-4 py-2 shadow-lg"
                style={{ animation: 'popup-in 0.15s ease-out' }}
              >
                <span className="text-xs text-fg">0.15s scale + fade</span>
              </div>
            )}
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Rules">
        <div className="grid grid-cols-2 gap-3">
          {[
            ['Purpose over decoration', 'Animation signals state change. Never animate purely for visual interest.'],
            ['Respect reduced-motion', 'prefers-reduced-motion disables all animations. Content must be accessible without them.'],
            ['Never block interaction', 'Users must be able to interact during animation. No "wait for animation to finish".'],
            ['Consistent easing', 'ease-out for entrances, ease-in for exits. Never linear for UI elements.'],
          ].map(([title, desc]) => (
            <div
              className="rounded-lg border border-border/20 bg-bg-tertiary/20 px-4 py-3"
              key={title}
            >
              <div className="text-xs font-medium text-fg">{title}</div>
              <p className="mt-1 text-[11px] text-fg-muted">{desc}</p>
            </div>
          ))}
        </div>
      </DocSection>
    </div>
  )
}

// ---------- item 2: motion-easing ----------

const easings = [
  { label: 'ease-out (entry)', name: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)', cx1: 0, cy1: 0, cx2: 0.2, cy2: 1 },
  { label: 'ease-in (exit)', name: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)', cx1: 0.4, cy1: 0, cx2: 1, cy2: 1 },
  { label: 'ease-default (general)', name: 'ease-default', value: 'cubic-bezier(0.4, 0, 0.2, 1)', cx1: 0.4, cy1: 0, cx2: 0.2, cy2: 1 },
]

const durations = [100, 200, 300, 500, 800, 1000]

function CurvePreview({
  cx1, cy1, cx2, cy2, active,
}: {
  cx1: number
  cy1: number
  cx2: number
  cy2: number
  active: boolean
}) {
  const w = 120
  const h = 120
  const pad = 12

  const x = (v: number) => pad + v * (w - pad * 2)
  const y = (v: number) => h - pad - v * (h - pad * 2)

  const d = `M ${x(0)} ${y(0)} C ${x(cx1)} ${y(cy1)}, ${x(cx2)} ${y(cy2)}, ${x(1)} ${y(1)}`

  return (
    <svg
      className="rounded-lg border border-border/30 bg-bg-tertiary/30"
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      width={w}
    >
      <line className="stroke-border/20" strokeDasharray="2 4" x1={pad} x2={w - pad} y1={h - pad} y2={h - pad} />
      <line className="stroke-border/20" strokeDasharray="2 4" x1={pad} x2={pad} y1={pad} y2={h - pad} />
      <path
        className={[
          'fill-none stroke-2 transition-colors',
          active ? 'stroke-accent' : 'stroke-fg-muted/30',
        ].join(' ')}
        d={d}
        strokeLinecap="round"
      />
      <circle className="fill-accent/40" cx={x(cx1)} cy={y(cy1)} r={3} />
      <line className="stroke-accent/20" x1={x(0)} x2={x(cx1)} y1={y(0)} y2={y(cy1)} />
      <circle className="fill-accent/40" cx={x(cx2)} cy={y(cy2)} r={3} />
      <line className="stroke-accent/20" x1={x(1)} x2={x(cx2)} y1={y(1)} y2={y(cy2)} />
    </svg>
  )
}

function EasingDemo({ easing, duration }: { easing: (typeof easings)[number], duration: number }) {
  const [playing, setPlaying] = useState(false)
  const [moved, setMoved] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const play = useCallback(() => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
    setPlaying(true)
    setMoved((v) => !v)
    timeoutRef.current = setTimeout(() => setPlaying(false), duration + 50)
  }, [duration])

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <CurvePreview active={playing} cx1={easing.cx1} cy1={easing.cy1} cx2={easing.cx2} cy2={easing.cy2} />
        <div className="flex-1 space-y-2">
          <div className="text-xs font-bold text-fg">{easing.label}</div>
          <code className="block text-[10px] text-fg-muted/50">{easing.value}</code>
          <button
            className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            onClick={play}
          >
            Play
          </button>
        </div>
      </div>
      <div className="relative h-10 overflow-hidden rounded-lg bg-bg-tertiary/40">
        <div
          className="absolute top-1 h-8 w-8 rounded-md bg-accent/80"
          style={{
            left: moved ? 'calc(100% - 2.5rem)' : '0.25rem',
            transition: `left ${duration}ms`,
            transitionTimingFunction: easing.value,
          }}
        />
      </div>
    </div>
  )
}

function ComparisonRace({ duration }: { duration: number }) {
  const [moved, setMoved] = useState(false)

  return (
    <div className="space-y-3">
      <button
        className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg transition-colors hover:bg-accent-hover"
        onClick={() => setMoved((v) => !v)}
      >
        Race!
      </button>
      {easings.map((e) => (
        <div className="flex items-center gap-3" key={e.name}>
          <span className="w-24 shrink-0 text-[10px] text-fg-muted">{e.name}</span>
          <div className="relative h-6 flex-1 overflow-hidden rounded bg-bg-tertiary/40">
            <div
              className="absolute top-0.5 h-5 w-5 rounded bg-accent/70"
              style={{
                left: moved ? 'calc(100% - 1.5rem)' : '0.25rem',
                transition: `left ${duration}ms`,
                transitionTimingFunction: e.value,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function MotionEasingStage() {
  const [selectedDuration, setSelectedDuration] = useState(300)

  return (
    <div>
      <div className="text-lg font-bold text-fg">Easing Visualizer</div>
      <p className="mt-1 text-sm text-fg-muted">
        Interactive easing curves with live previews. Compare how each easing
        function affects motion feel.
      </p>

      <DocSection title="Duration Control">
        <div className="flex flex-wrap gap-2">
          {durations.map((d) => (
            <button
              className={[
                'rounded-md px-3 py-1.5 text-xs transition-colors',
                selectedDuration === d
                  ? 'bg-accent text-accent-fg'
                  : 'bg-bg-tertiary text-fg-muted hover:text-fg',
              ].join(' ')}
              key={d}
              onClick={() => setSelectedDuration(d)}
            >
              {d}ms
            </button>
          ))}
        </div>
      </DocSection>

      <DocSection title="Easing Curves">
        <div className="space-y-6">
          {easings.map((e) => (
            <DemoCard
              code={`transition: all ${selectedDuration}ms;\ntransition-timing-function: ${e.value};`}
              description={e.value}
              key={e.name}
              title={e.name}
            >
              <EasingDemo duration={selectedDuration} easing={e} />
            </DemoCard>
          ))}
        </div>
      </DocSection>

      <DocSection title="Side-by-Side Comparison">
        <DemoCard title="Race" description="All three easings at the same time">
          <ComparisonRace duration={selectedDuration} />
        </DemoCard>
      </DocSection>
    </div>
  )
}

// ---------- item 3: motion-spring ----------

const springPresets = [
  { name: 'bouncy', label: 'Bouncy', description: 'High overshoot, playful feel. Buttons, toggles, notifications.', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', duration: 400 },
  { name: 'gentle', label: 'Gentle', description: 'Soft deceleration, barely any overshoot. Panels, modals.', value: 'cubic-bezier(0.22, 1, 0.36, 1)', duration: 500 },
  { name: 'stiff', label: 'Stiff', description: 'Quick settle, minimal overshoot. Tooltips, small UI elements.', value: 'cubic-bezier(0.5, 1.25, 0.75, 1)', duration: 250 },
  { name: 'elastic', label: 'Elastic', description: 'Strong overshoot with bounce-back. Attention-grabbing elements.', value: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)', duration: 500 },
  { name: 'snappy', label: 'Snappy', description: 'Fast and precise, minimal wobble. Menu items, list reorder.', value: 'cubic-bezier(0.33, 1, 0.68, 1)', duration: 200 },
]

function SpringBox({ preset }: { preset: (typeof springPresets)[number] }) {
  const [moved, setMoved] = useState(false)

  return (
    <DemoCard
      code={`transition: all ${preset.duration}ms;\ntransition-timing-function: ${preset.value};`}
      description={preset.description}
      title={preset.label}
    >
      <div className="space-y-3">
        <button
          className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          onClick={() => setMoved((v) => !v)}
        >
          Trigger
        </button>

        <div className="relative h-12 overflow-hidden rounded-lg bg-bg-tertiary/30">
          <div
            className="absolute top-1.5 h-9 w-9 rounded-lg bg-accent/80 shadow-sm"
            style={{
              left: moved ? 'calc(100% - 2.75rem)' : '0.375rem',
              transition: `all ${preset.duration}ms`,
              transitionTimingFunction: preset.value,
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-[10px] font-medium text-accent"
            style={{
              transform: moved ? 'scale(1.3)' : 'scale(1)',
              transition: `transform ${preset.duration}ms`,
              transitionTimingFunction: preset.value,
            }}
          >
            Scale
          </div>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-[10px] font-medium text-accent"
            style={{
              transform: moved ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: `transform ${preset.duration}ms`,
              transitionTimingFunction: preset.value,
            }}
          >
            Rot
          </div>
        </div>
      </div>
    </DemoCard>
  )
}

function SpringComparisonAll() {
  const [moved, setMoved] = useState(false)

  return (
    <DemoCard
      code="// all spring presets side-by-side"
      description="Compare all presets at once"
      title="Comparison"
      full
    >
      <div className="space-y-3">
        <button
          className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          onClick={() => setMoved((v) => !v)}
        >
          Race!
        </button>
        {springPresets.map((p) => (
          <div className="flex items-center gap-3" key={p.name}>
            <span className="w-16 shrink-0 text-[10px] font-bold text-fg-muted">{p.label}</span>
            <div className="relative h-7 flex-1 overflow-hidden rounded bg-bg-tertiary/30">
              <div
                className="absolute top-0.5 h-6 w-6 rounded bg-accent/70"
                style={{
                  left: moved ? 'calc(100% - 1.75rem)' : '0.25rem',
                  transition: `left ${p.duration}ms`,
                  transitionTimingFunction: p.value,
                }}
              />
            </div>
            <span className="w-14 shrink-0 text-right text-[10px] text-fg-muted/40">{p.duration}ms</span>
          </div>
        ))}
      </div>
    </DemoCard>
  )
}

function CustomSpring() {
  const [tension, setTension] = useState(1.4)
  const [friction, setFriction] = useState(0.6)
  const [moved, setMoved] = useState(false)

  const bezier = `cubic-bezier(0.34, ${tension.toFixed(2)}, ${friction.toFixed(2)}, 1)`

  return (
    <DemoCard
      code={`transition-timing-function: ${bezier};`}
      description="Adjust tension and friction"
      title="Custom Spring"
      full
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-fg">Tension (overshoot)</span>
              <span className="text-xs text-accent">{tension.toFixed(2)}</span>
            </div>
            <input
              className="w-full accent-[var(--color-accent)]"
              max={2.5}
              min={0}
              onChange={(e) => setTension(Number(e.target.value))}
              step={0.05}
              type="range"
              value={tension}
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-fg">Friction (settle)</span>
              <span className="text-xs text-accent">{friction.toFixed(2)}</span>
            </div>
            <input
              className="w-full accent-[var(--color-accent)]"
              max={1}
              min={0.1}
              onChange={(e) => setFriction(Number(e.target.value))}
              step={0.05}
              type="range"
              value={friction}
            />
          </div>
        </div>

        <button
          className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          onClick={() => setMoved((v) => !v)}
        >
          Test
        </button>

        <div className="relative h-10 overflow-hidden rounded-lg bg-bg-tertiary/30">
          <div
            className="absolute top-1 h-8 w-8 rounded-lg bg-accent/80"
            style={{
              left: moved ? 'calc(100% - 2.5rem)' : '0.25rem',
              transition: 'left 400ms',
              transitionTimingFunction: bezier,
            }}
          />
        </div>

        <div className="text-[11px] text-fg-muted/40">{bezier}</div>
      </div>
    </DemoCard>
  )
}

function MotionSpringStage() {
  return (
    <div>
      <div className="text-lg font-bold text-fg">Spring Physics</div>
      <p className="mt-1 text-sm text-fg-muted">
        CSS spring-like animations using cubic-bezier approximations. These curves
        create natural, physics-inspired motion without JavaScript physics engines.
      </p>

      <DocSection columns={2} title="Presets">
        {springPresets.map((p) => (
          <SpringBox key={p.name} preset={p} />
        ))}
      </DocSection>

      <DocSection title="Side-by-Side">
        <SpringComparisonAll />
      </DocSection>

      <DocSection title="Custom">
        <CustomSpring />
      </DocSection>
    </div>
  )
}

// ---------- item 4: motion-enter-exit ----------

type EffectName = 'fade' | 'slide-down' | 'slide-up' | 'scale' | 'flip' | 'slide-right'

const effects: {
  name: EffectName
  label: string
  enterStyle: React.CSSProperties
  exitStyle: React.CSSProperties
  code: string
}[] = [
  { name: 'fade', label: 'Fade', enterStyle: { opacity: 1 }, exitStyle: { opacity: 0 }, code: `opacity: visible ? 1 : 0\ntransition: opacity 200ms ease-out` },
  { name: 'slide-down', label: 'Slide Down', enterStyle: { opacity: 1, transform: 'translateY(0)' }, exitStyle: { opacity: 0, transform: 'translateY(-1rem)' }, code: `transform: visible ? 'none' : 'translateY(-1rem)'\nopacity: visible ? 1 : 0` },
  { name: 'slide-up', label: 'Slide Up', enterStyle: { opacity: 1, transform: 'translateY(0)' }, exitStyle: { opacity: 0, transform: 'translateY(1rem)' }, code: `transform: visible ? 'none' : 'translateY(1rem)'\nopacity: visible ? 1 : 0` },
  { name: 'slide-right', label: 'Slide Right', enterStyle: { opacity: 1, transform: 'translateX(0)' }, exitStyle: { opacity: 0, transform: 'translateX(-1rem)' }, code: `transform: visible ? 'none' : 'translateX(-1rem)'\nopacity: visible ? 1 : 0` },
  { name: 'scale', label: 'Scale', enterStyle: { opacity: 1, transform: 'scale(1)' }, exitStyle: { opacity: 0, transform: 'scale(0.85)' }, code: `transform: visible ? 'scale(1)' : 'scale(0.85)'\nopacity: visible ? 1 : 0` },
  { name: 'flip', label: 'Flip', enterStyle: { opacity: 1, transform: 'rotateX(0)' }, exitStyle: { opacity: 0, transform: 'rotateX(90deg)' }, code: `transform: visible ? 'rotateX(0)' : 'rotateX(90deg)'\nopacity: visible ? 1 : 0` },
]

function EnterExitDemo({ effect }: { effect: (typeof effects)[number] }) {
  const [visible, setVisible] = useState(true)

  return (
    <DemoCard code={effect.code} description={`Enter: ${effect.label} in | Exit: ${effect.label} out`} title={effect.label}>
      <div className="space-y-3">
        <button
          className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? 'Exit' : 'Enter'}
        </button>

        <div className="flex min-h-[4rem] items-center justify-center" style={{ perspective: '600px' }}>
          <div
            className="flex h-14 w-32 items-center justify-center rounded-lg border border-border/30 bg-accent/10 text-xs font-medium text-accent"
            style={{
              ...(visible ? effect.enterStyle : effect.exitStyle),
              transition: visible
                ? 'all 250ms cubic-bezier(0, 0, 0.2, 1)'
                : 'all 200ms cubic-bezier(0.4, 0, 1, 1)',
            }}
          >
            {visible ? 'Visible' : 'Hidden'}
          </div>
        </div>
      </div>
    </DemoCard>
  )
}

function ConditionalMount() {
  const [mounted, setMounted] = useState(true)
  const [animating, setAnimating] = useState(false)

  const handleToggle = () => {
    if (mounted) {
      setAnimating(true)
      setTimeout(() => {
        setMounted(false)
        setAnimating(false)
      }, 250)
    } else {
      setMounted(true)
    }
  }

  return (
    <DemoCard
      code={`// conditional mount with exit animation\nconst handleUnmount = () => {\n  setAnimating(true)\n  setTimeout(() => {\n    setMounted(false)\n    setAnimating(false)\n  }, 250)\n}\n\n{mounted && (\n  <div style={{\n    opacity: animating ? 0 : 1,\n    transform: animating ? 'scale(0.9)' : 'scale(1)',\n    transition: 'all 250ms ease-in'\n  }} />\n)}`}
      description="Animate exit before removing from DOM"
      title="Conditional Mount / Unmount"
      full
    >
      <div className="space-y-4">
        <button
          className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          onClick={handleToggle}
        >
          {mounted ? 'Unmount' : 'Mount'}
        </button>

        <div className="flex min-h-[5rem] items-center justify-center">
          {mounted && (
            <div
              className="flex h-16 w-40 items-center justify-center rounded-xl border border-border bg-surface text-sm text-fg shadow-md"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? 'scale(0.9)' : 'scale(1)',
                transition: animating
                  ? 'all 250ms cubic-bezier(0.4, 0, 1, 1)'
                  : 'all 250ms cubic-bezier(0, 0, 0.2, 1)',
                animation: animating ? undefined : 'popup-in 0.25s ease-out',
              }}
            >
              Component
            </div>
          )}
        </div>
      </div>
    </DemoCard>
  )
}

function PairedTransitions() {
  const [step, setStep] = useState(0)
  const labels = ['Step 1', 'Step 2', 'Step 3']

  return (
    <DemoCard
      code={`// paired enter/exit for step transitions\n// exiting: slide-left + fade out\n// entering: slide-right + fade in`}
      description="Cross-fade between steps"
      title="Page Transitions"
      full
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          {labels.map((l, i) => (
            <button
              className={[
                'rounded-md px-3 py-1 text-xs transition-colors',
                step === i
                  ? 'bg-accent text-accent-fg'
                  : 'bg-bg-tertiary text-fg-muted hover:text-fg',
              ].join(' ')}
              key={l}
              onClick={() => setStep(i)}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="relative min-h-[6rem] overflow-hidden rounded-lg bg-bg-tertiary/20">
          {labels.map((l, i) => (
            <div
              className="absolute inset-0 flex items-center justify-center text-lg font-bold text-accent"
              key={l}
              style={{
                opacity: step === i ? 1 : 0,
                transform:
                  step === i
                    ? 'translateX(0)'
                    : step > i
                      ? 'translateX(-2rem)'
                      : 'translateX(2rem)',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: step === i ? 'auto' : 'none',
              }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </DemoCard>
  )
}

function MotionEnterExitStage() {
  return (
    <div>
      <div className="text-lg font-bold text-fg">Enter / Exit Animations</div>
      <p className="mt-1 text-sm text-fg-muted">
        Patterns for animating component mount and unmount. Each effect shows
        paired enter/exit transitions with appropriate easing.
      </p>

      <DocSection columns={2} title="Basic Effects">
        {effects.map((e) => (
          <EnterExitDemo effect={e} key={e.name} />
        ))}
      </DocSection>

      <DocSection title="Advanced Patterns">
        <ConditionalMount />
        <PairedTransitions />
      </DocSection>

      <DocSection title="Easing Rules">
        <div className="rounded-lg border border-border/30 bg-bg-tertiary/20 p-4">
          <div className="space-y-2 text-xs text-fg-muted">
            <div className="flex items-baseline gap-3">
              <span className="font-bold text-fg">Enter</span>
              <span>ease-out (fast start, slow settle)</span>
              <code className="text-[10px] text-fg-muted/40">cubic-bezier(0, 0, 0.2, 1)</code>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-bold text-fg">Exit</span>
              <span>ease-in (slow start, fast disappear)</span>
              <code className="text-[10px] text-fg-muted/40">cubic-bezier(0.4, 0, 1, 1)</code>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-bold text-fg">Duration</span>
              <span>Exit should be faster than enter (200ms vs 250ms typical)</span>
            </div>
          </div>
        </div>
      </DocSection>
    </div>
  )
}

// ---------- item 5: motion-gesture ----------

function DragDemo() {
  const [dragging, setDragging] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const startRef = useRef({ x: 0, y: 0, mx: 0, my: 0 })

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setDragging(true)
      startRef.current = { x: pos.x, y: pos.y, mx: e.clientX, my: e.clientY }

      const handleMove = (ev: MouseEvent) => {
        setPos({
          x: startRef.current.x + (ev.clientX - startRef.current.mx),
          y: startRef.current.y + (ev.clientY - startRef.current.my),
        })
      }

      const handleUp = () => {
        setDragging(false)
        window.removeEventListener('mousemove', handleMove)
        window.removeEventListener('mouseup', handleUp)
      }

      window.addEventListener('mousemove', handleMove)
      window.addEventListener('mouseup', handleUp)
    },
    [pos.x, pos.y],
  )

  return (
    <DemoCard
      code={`// drag feedback\n<div style={{\n  transform: \`translate(\${x}px, \${y}px)\`,\n  scale: dragging ? 1.05 : 1,\n  boxShadow: dragging ? '0 8px 24px rgba(0,0,0,0.15)' : 'none',\n  transition: dragging ? 'none' : 'all 300ms ease-out'\n}} />`}
      description="Scale up + shadow while dragging, smooth settle on release"
      title="Drag Feedback"
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg bg-bg-tertiary/20">
        <div
          className={[
            'flex h-16 w-16 items-center justify-center rounded-xl text-xs font-medium select-none',
            dragging
              ? 'cursor-grabbing bg-accent text-accent-fg'
              : 'cursor-grab bg-accent/20 text-accent',
          ].join(' ')}
          onMouseDown={handleMouseDown}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${dragging ? 1.08 : 1})`,
            boxShadow: dragging ? '0 8px 24px rgba(0,0,0,0.15)' : 'none',
            transition: dragging ? 'box-shadow 100ms' : 'all 300ms cubic-bezier(0, 0, 0.2, 1)',
            zIndex: dragging ? 10 : 0,
          }}
        >
          Drag me
        </div>
      </div>
    </DemoCard>
  )
}

function SwipeDemo() {
  const [offset, setOffset] = useState(0)
  const [swiping, setSwiping] = useState(false)
  const startXRef = useRef(0)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setSwiping(true)
      startXRef.current = e.clientX - offset

      const handleMove = (ev: MouseEvent) => {
        setOffset(ev.clientX - startXRef.current)
      }

      const handleUp = () => {
        setSwiping(false)
        setOffset((prev) => {
          if (Math.abs(prev) > 100) {
            if (prev > 0) return 200
            return -200
          }
          return 0
        })
        window.removeEventListener('mousemove', handleMove)
        window.removeEventListener('mouseup', handleUp)
      }

      window.addEventListener('mousemove', handleMove)
      window.addEventListener('mouseup', handleUp)
    },
    [offset],
  )

  const reset = () => setOffset(0)
  const dismissed = Math.abs(offset) >= 200
  const progress = Math.min(Math.abs(offset) / 100, 1)

  return (
    <DemoCard
      code={`// swipe feedback\n<div style={{\n  transform: \`translateX(\${offset}px)\`,\n  opacity: 1 - Math.abs(offset) / 300,\n  transition: swiping ? 'none' : 'all 300ms ease-out'\n}} />`}
      description="Drag horizontally to dismiss. Snaps at threshold."
      title="Swipe to Dismiss"
    >
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-lg bg-bg-tertiary/20 py-4">
          <div
            className={[
              'mx-auto flex h-14 w-48 items-center justify-center rounded-lg border border-border/30 bg-surface text-xs text-fg shadow-sm select-none',
              swiping ? 'cursor-grabbing' : 'cursor-grab',
            ].join(' ')}
            onMouseDown={handleMouseDown}
            style={{
              transform: `translateX(${offset}px)`,
              opacity: 1 - progress * 0.5,
              transition: swiping ? 'none' : 'all 300ms cubic-bezier(0, 0, 0.2, 1)',
            }}
          >
            {dismissed ? 'Dismissed!' : 'Swipe left or right'}
          </div>
        </div>
        {dismissed && (
          <button className="text-xs text-accent hover:underline" onClick={reset}>
            Reset
          </button>
        )}
      </div>
    </DemoCard>
  )
}

function LongPressDemo() {
  const [pressing, setPressing] = useState(false)
  const [completed, setCompleted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleStart = () => {
    setPressing(true)
    setCompleted(false)
    timerRef.current = setTimeout(() => {
      setCompleted(true)
      setPressing(false)
    }, 800)
  }

  const handleEnd = () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current)
    setPressing(false)
  }

  const ringCircumference = 2 * Math.PI * 36

  return (
    <DemoCard
      code={`// long-press ring animation\n<div className={cx(\n  'rounded-full border-4 transition-all duration-800',\n  pressing && 'border-accent scale-110',\n  completed && 'border-success scale-100'\n)} />`}
      description="Hold for 800ms. Ring fills to indicate progress."
      title="Long Press"
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className={[
            'relative flex h-20 w-20 items-center justify-center rounded-full text-xs font-medium select-none',
            completed
              ? 'border-4 border-success bg-success/10 text-success'
              : pressing
                ? 'border-4 border-accent bg-accent/10 text-accent'
                : 'cursor-pointer border-2 border-border/40 bg-surface text-fg-muted',
          ].join(' ')}
          onMouseDown={handleStart}
          onMouseLeave={handleEnd}
          onMouseUp={handleEnd}
          style={{ transition: 'all 200ms ease-out' }}
        >
          {pressing && (
            <svg className="absolute inset-0" viewBox="0 0 80 80">
              <circle
                className="fill-none stroke-accent"
                cx={40}
                cy={40}
                r={36}
                strokeDasharray={`${ringCircumference}`}
                strokeDashoffset={0}
                strokeLinecap="round"
                strokeWidth={3}
                style={{
                  animation: 'longPressRing 800ms linear forwards',
                  transformOrigin: 'center',
                  transform: 'rotate(-90deg)',
                }}
              />
            </svg>
          )}
          <span>{completed ? 'Done!' : 'Hold'}</span>
        </div>
        <span className="text-[10px] text-fg-muted/40">
          {completed ? 'Long press completed' : 'Press and hold for 800ms'}
        </span>
        {completed && (
          <button className="text-xs text-accent hover:underline" onClick={() => setCompleted(false)}>
            Reset
          </button>
        )}
      </div>

      <style>{`
        @keyframes longPressRing {
          from { stroke-dashoffset: ${ringCircumference}; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </DemoCard>
  )
}

function PinchZoomDemo() {
  const [scale, setScale] = useState(1)

  return (
    <DemoCard
      code={`// zoom feedback with buttons\n<div style={{\n  transform: \`scale(\${scale})\`,\n  transition: 'transform 200ms ease-out'\n}} />`}
      description="Zoom in/out with smooth scaling"
      title="Zoom Feedback"
    >
      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            className="rounded-md bg-bg-tertiary px-3 py-1 text-xs text-fg-muted transition-colors hover:text-fg"
            onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
          >
            Zoom Out
          </button>
          <button
            className="rounded-md bg-bg-tertiary px-3 py-1 text-xs text-fg-muted transition-colors hover:text-fg"
            onClick={() => setScale((s) => Math.min(2, s + 0.25))}
          >
            Zoom In
          </button>
          <button
            className="rounded-md bg-bg-tertiary px-3 py-1 text-xs text-fg-muted transition-colors hover:text-fg"
            onClick={() => setScale(1)}
          >
            Reset
          </button>
        </div>

        <div className="flex h-32 items-center justify-center overflow-hidden rounded-lg bg-bg-tertiary/20">
          <div
            className="flex h-16 w-24 items-center justify-center rounded-lg bg-accent/20 text-xs font-medium text-accent"
            style={{
              transform: `scale(${scale})`,
              transition: 'transform 200ms cubic-bezier(0, 0, 0.2, 1)',
            }}
          >
            {Math.round(scale * 100)}%
          </div>
        </div>
      </div>
    </DemoCard>
  )
}

function MotionGestureStage() {
  return (
    <div>
      <div className="text-lg font-bold text-fg">Gesture Feedback</div>
      <p className="mt-1 text-sm text-fg-muted">
        Visual feedback patterns for drag, swipe, long-press, and zoom gestures.
        Each demo shows the CSS transition approach for smooth, responsive
        interaction feedback.
      </p>

      <DocSection columns={2} title="Core Gestures">
        <DragDemo />
        <SwipeDemo />
      </DocSection>

      <DocSection columns={2} title="Press & Zoom">
        <LongPressDemo />
        <PinchZoomDemo />
      </DocSection>

      <DocSection title="Guidelines">
        <div className="rounded-lg border border-border/30 bg-bg-tertiary/20 p-4">
          <div className="space-y-2 text-xs text-fg-muted">
            <div>
              <span className="font-medium text-fg">During gesture:</span> No
              transition — follow the pointer directly for responsiveness.
            </div>
            <div>
              <span className="font-medium text-fg">On release:</span> Use
              ease-out (200-300ms) to settle into final position.
            </div>
            <div>
              <span className="font-medium text-fg">Scale feedback:</span> 5-10%
              scale increase during drag to indicate lift.
            </div>
            <div>
              <span className="font-medium text-fg">Shadow feedback:</span>{' '}
              Increase shadow during drag to reinforce depth.
            </div>
            <div>
              <span className="font-medium text-fg">Threshold snapping:</span> If
              user passes a threshold, commit to the action. Otherwise, animate back.
            </div>
          </div>
        </div>
      </DocSection>
    </div>
  )
}

// ---------- exported items ----------

const labItemsExt: DevCenterItem[] = [
  // motion
  {
    id: 'motion',
    label: 'Motion',
    layer: 'l-lab' as any,
    type: 'reference',
    tags: ['animation', 'transition', 'timing', 'easing', 'popup'],

    stage: () => <MotionStage />,

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          animation rules
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p>All animations must serve a functional purpose (state change feedback).</p>
          <p>Maximum duration: 300ms. Anything longer feels sluggish.</p>
          <p>Always respect <span className="text-accent">prefers-reduced-motion</span>.</p>
          <p>Never block user interaction during animation.</p>
        </div>

        <div className="text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          easing
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p><span className="font-medium text-fg">Entrances</span> — ease-out (fast start, slow end)</p>
          <p><span className="font-medium text-fg">Exits</span> — ease-in (slow start, fast end)</p>
          <p><span className="font-medium text-fg">State changes</span> — ease-in-out</p>
          <p>Never use linear easing for UI elements.</p>
        </div>

        <div className="text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          standard animations
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p><span className="text-accent">animate-popup</span> — dropdowns, tooltips, context menus (0.15s ease-out)</p>
          <p><span className="text-accent">transition-colors</span> — hover states (100ms default)</p>
          <p><span className="text-accent">transition-transform</span> — slide-in panels</p>
          <p><span className="text-accent">animate-pulse</span> — skeleton loading placeholders</p>
        </div>
      </div>
    ),

    code: () => `// hover transition (100ms default)
<button className="transition-colors hover:bg-bg-tertiary">
  item
</button>

// popup animation for floating elements
<div className="animate-popup rounded-lg border border-border bg-surface shadow-lg">
  dropdown content
</div>

// slide-in panel
<div className="transition-transform duration-200" style={{
  transform: open ? 'translateX(0)' : 'translateX(100%)'
}}>
  panel content
</div>

// respect reduced motion
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important }
}

// keyframe definition
@keyframes popup-in {
  from { opacity: 0; transform: scale(0.95) }
  to   { opacity: 1; transform: scale(1) }
}`,
  },

  // motion easing
  {
    id: 'motion-easing',
    label: 'Easing Visualizer',
    layer: 'l-lab' as any,
    type: 'reference',
    tags: ['easing', 'cubic-bezier', 'curve', 'timing', 'animation'],

    stage: () => <MotionEasingStage />,
  },

  // motion spring
  {
    id: 'motion-spring',
    label: 'Spring Physics',
    layer: 'l-lab' as any,
    type: 'reference',
    tags: ['spring', 'physics', 'bounce', 'elastic', 'cubic-bezier', 'tension'],

    stage: () => <MotionSpringStage />,
  },

  // motion enter/exit
  {
    id: 'motion-enter-exit',
    label: 'Enter / Exit',
    layer: 'l-lab' as any,
    type: 'reference',
    tags: ['enter', 'exit', 'mount', 'unmount', 'fade', 'slide', 'scale', 'flip', 'transition'],

    stage: () => <MotionEnterExitStage />,
  },

  // motion gesture
  {
    id: 'motion-gesture',
    label: 'Gesture Feedback',
    layer: 'l-lab' as any,
    type: 'reference',
    tags: ['gesture', 'drag', 'swipe', 'long-press', 'zoom', 'pinch', 'feedback'],

    stage: () => <MotionGestureStage />,
  },
]

export { labItemsExt }
