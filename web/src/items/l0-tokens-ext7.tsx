// motion items — micro-interactions, animation gallery, scroll animations, transition playground

import { useCallback, useEffect, useRef, useState } from 'react'

import { DemoCard, DocSection } from '../components/demo'

import type { DevCenterItem } from '../types'

// ─── motion-micro ───

function ButtonPress() {
  const [pressed, setPressed] = useState(false)

  return (
    <DemoCard
      code={`<button\n  className="transition-transform duration-100 active:scale-95"\n  onMouseDown={() => setPressed(true)}\n  onMouseUp={() => setPressed(false)}\n/>`}
      description="Scale down on press, snap back on release"
      title="Button Press"
    >
      <button
        className={[
          'rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-transform duration-100',
          pressed ? 'scale-95' : '',
        ].filter(Boolean).join(' ')}
        onMouseDown={() => setPressed(true)}
        onMouseLeave={() => setPressed(false)}
        onMouseUp={() => setPressed(false)}
      >
        Hold me
      </button>
    </DemoCard>
  )
}

function ToggleSwitch() {
  const [on, setOn] = useState(false)

  return (
    <DemoCard
      code={`<div className="w-12 h-6 rounded-full transition-colors duration-200\n  bg-accent/20 data-[on]:bg-accent">\n  <div className="h-5 w-5 rounded-full bg-white\n    transition-transform duration-200\n    translate-x-0.5 data-[on]:translate-x-6" />\n</div>`}
      description="Smooth slide with color transition"
      title="Toggle Switch"
    >
      <button
        className={[
          'relative h-7 w-14 rounded-full transition-colors duration-200',
          on ? 'bg-accent' : 'bg-fg-muted/20',
        ].join(' ')}
        onClick={() => setOn((v) => !v)}
      >
        <div
          className={[
            'absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200',
            on ? 'translate-x-7' : 'translate-x-1',
          ].join(' ')}
        />
      </button>
    </DemoCard>
  )
}

function DeleteFadeOut() {
  const [items, setItems] = useState(['File A', 'File B', 'File C', 'File D'])
  const [removing, setRemoving] = useState<null | string>(null)

  const handleDelete = (item: string) => {
    setRemoving(item)
    setTimeout(() => {
      setItems((prev) => prev.filter((i) => i !== item))
      setRemoving(null)
    }, 300)
  }

  const handleReset = () => {
    setItems(['File A', 'File B', 'File C', 'File D'])
    setRemoving(null)
  }

  return (
    <DemoCard
      code={`<div style={{\n  opacity: removing ? 0 : 1,\n  transform: removing ? 'translateX(1rem)' : 'none',\n  transition: 'all 300ms ease-in'\n}} />`}
      description="Fade + slide out, then remove from DOM"
      title="Delete with Fade-Out"
    >
      <div className="space-y-2">
        {items.map((item) => (
          <div
            className="flex items-center gap-3 rounded-lg border border-border/30 bg-surface px-3 py-2"
            key={item}
            style={{
              opacity: removing === item ? 0 : 1,
              transform: removing === item ? 'translateX(1rem)' : 'none',
              transition: 'all 300ms cubic-bezier(0.4, 0, 1, 1)',
            }}
          >
            <span className="flex-1 text-xs text-fg">{item}</span>
            <button
              className="text-fg-muted/30 transition-colors hover:text-danger"
              onClick={() => handleDelete(item)}
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <button
            className="text-xs text-accent hover:underline"
            onClick={handleReset}
          >
            Reset items
          </button>
        )}
      </div>
    </DemoCard>
  )
}

function LikeHeart() {
  const [liked, setLiked] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  const handleLike = () => {
    setLiked((v) => !v)
    setAnimKey((k) => k + 1)
  }

  return (
    <DemoCard
      code={`<Heart\n  className={cx(\n    'transition-all duration-200',\n    liked ? 'scale-125 fill-danger text-danger' : 'scale-100 text-fg-muted'\n  )}\n  style={{ animation: liked ? 'popup-in 0.2s ease-out' : 'none' }}\n/>`}
      description="Scale + color change with bounce"
      title="Like Button"
    >
      <button
        className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-bg-tertiary"
        onClick={handleLike}
      >
        <svg
          className={[
            'h-6 w-6 transition-all duration-200',
            liked
              ? 'scale-125 fill-danger text-danger'
              : 'scale-100 text-fg-muted/40',
          ].join(' ')}
          fill={liked ? 'currentColor' : 'none'}
          key={animKey}
          stroke="currentColor"
          strokeWidth={2}
          style={liked ? { animation: 'popup-in 0.2s ease-out' } : undefined}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
        <span className="text-xs text-fg-muted">
          {liked ? 'Liked' : 'Like'}
        </span>
      </button>
    </DemoCard>
  )
}

function CheckboxDraw() {
  const [checked, setChecked] = useState(false)

  return (
    <DemoCard
      code={`<div className={cx(\n  'h-5 w-5 rounded border-2 transition-colors duration-150',\n  checked ? 'border-accent bg-accent' : 'border-fg-muted/30'\n)}>\n  <Check className="transition-transform duration-150\n    scale-0 data-[checked]:scale-100" />\n</div>`}
      description="Scale-in check mark with color fill"
      title="Checkbox Check"
    >
      <button
        className="flex items-center gap-3"
        onClick={() => setChecked((v) => !v)}
      >
        <div
          className={[
            'flex h-5 w-5 items-center justify-center rounded border-2 transition-all duration-150',
            checked
              ? 'border-accent bg-accent'
              : 'border-fg-muted/30 bg-transparent',
          ].join(' ')}
        >
          <svg
            className={[
              'h-3.5 w-3.5 text-white transition-transform duration-150',
              checked ? 'scale-100' : 'scale-0',
            ].join(' ')}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-xs text-fg">
          {checked ? 'Checked' : 'Unchecked'}
        </span>
      </button>
    </DemoCard>
  )
}

function HoverLift() {
  return (
    <DemoCard
      code={`<div className="transition-all duration-200\n  hover:-translate-y-1 hover:shadow-lg" />`}
      description="Lift + shadow on hover"
      title="Hover Lift"
    >
      <div className="flex gap-4">
        {['Card A', 'Card B', 'Card C'].map((label) => (
          <div
            className="flex h-20 w-24 cursor-pointer items-center justify-center rounded-lg border border-border/30 bg-surface text-xs text-fg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            key={label}
          >
            {label}
          </div>
        ))}
      </div>
    </DemoCard>
  )
}

// ─── motion-gallery ───

const keyframeAnimations = [
  {
    category: 'Entrance',
    items: [
      { name: 'popup-in', css: 'animation: popup-in 0.15s ease-out', description: 'Scale 0.95 to 1 + fade in. Dropdowns, tooltips, context menus.' },
      { name: 'toast-in', css: 'animation: toast-in 0.2s ease-out', description: 'Slide up + fade in from bottom. Toast notifications.' },
      { name: 'context-menu-in', css: 'animation: context-menu-in 0.12s ease-out', description: 'Fast scale + fade. Context menus, right-click menus.' },
    ],
  },
  {
    category: 'Feedback',
    items: [
      { name: 'shake', css: 'animation: shake 0.4s ease-out', description: 'Horizontal shake. Error state, invalid input.' },
    ],
  },
  {
    category: 'Loading',
    items: [
      { name: 'loading-dots', css: 'animation: loading-dots 1.4s ease-in-out infinite', description: 'Three dots pulsing. Inline loading indicator.' },
      { name: 'loading-bars', css: 'animation: loading-bars 1.2s ease-in-out infinite', description: 'Bars scaling up and down. Loading state.' },
      { name: 'loading-pulse', css: 'animation: loading-pulse 2s ease-in-out infinite', description: 'Gentle pulse scale. Skeleton placeholder.' },
      { name: 'loading-wave', css: 'animation: loading-wave 1.2s ease-in-out infinite', description: 'Wave pattern. Sequential delayed bars.' },
    ],
  },
  {
    category: 'Continuous',
    items: [
      { name: 'marquee-scroll', css: 'animation: marquee-scroll 20s linear infinite', description: 'Horizontal scroll loop. Marquee text, ticker.' },
    ],
  },
]

function AnimationPlayer({ name, css, description }: { name: string, css: string, description: string }) {
  const [key, setKey] = useState(0)
  const [playing, setPlaying] = useState(false)

  const isLooping = name.startsWith('loading-') || name === 'marquee-scroll'

  const handlePlay = () => {
    if (isLooping) {
      setPlaying((v) => !v)
      return
    }
    setKey((k) => k + 1)
    setPlaying(true)
    setTimeout(() => setPlaying(false), 600)
  }

  const renderPreview = () => {
    if (name === 'loading-dots' && playing) {
      return (
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              className="h-2 w-2 rounded-full bg-accent"
              key={i}
              style={{ animation: 'loading-dots 1.4s ease-in-out infinite', animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </div>
      )
    }

    if (name === 'loading-bars' && playing) {
      return (
        <div className="flex items-end gap-0.5" style={{ height: 24 }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              className="w-1 rounded-sm bg-accent"
              key={i}
              style={{ animation: 'loading-bars 1.2s ease-in-out infinite', animationDelay: `${i * 0.1}s`, height: 16 }}
            />
          ))}
        </div>
      )
    }

    if (name === 'loading-wave' && playing) {
      return (
        <div className="flex items-end gap-0.5" style={{ height: 24 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              className="w-1.5 rounded-sm bg-accent"
              key={i}
              style={{ animation: 'loading-wave 1.2s ease-in-out infinite', animationDelay: `${i * 0.08}s`, height: 12 }}
            />
          ))}
        </div>
      )
    }

    if (name === 'loading-pulse' && playing) {
      return (
        <div
          className="h-10 w-24 rounded-md bg-accent/30"
          style={{ animation: 'loading-pulse 2s ease-in-out infinite' }}
        />
      )
    }

    if (name === 'marquee-scroll' && playing) {
      return (
        <div className="w-48 overflow-hidden rounded bg-bg-tertiary/40">
          <div style={{ animation: 'marquee-scroll 6s linear infinite', whiteSpace: 'nowrap' }}>
            <span className="inline-block px-4 text-xs text-fg-muted">
              GOLIA Design System — Motion Gallery — Marquee Animation Demo
            </span>
          </div>
        </div>
      )
    }

    // standard box animation
    return (
      <div
        className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 text-[10px] font-medium text-accent"
        key={key}
        style={playing ? { animation: css.replace('animation: ', '') } : undefined}
      >
        {name.split('-').pop()}
      </div>
    )
  }

  return (
    <DemoCard code={css} description={description} title={name}>
      <div className="flex items-center gap-4">
        <button
          className="shrink-0 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          onClick={handlePlay}
        >
          {isLooping ? (playing ? 'Stop' : 'Play') : 'Play'}
        </button>
        <div className="flex min-h-[3rem] items-center justify-center">
          {renderPreview()}
        </div>
      </div>
    </DemoCard>
  )
}

// ─── motion-scroll ───

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (el === null) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function ScrollRevealBox({ label, effect, delay, code }: {
  label: string
  effect: 'fade' | 'slide-up' | 'slide-left' | 'scale' | 'blur'
  delay: number
  code: string
}) {
  const { ref, inView } = useInView(0.2)

  const baseStyle: React.CSSProperties = {
    transition: `all 600ms cubic-bezier(0, 0, 0.2, 1) ${delay}ms`,
  }

  const hiddenStyle: Record<string, React.CSSProperties> = {
    fade: { opacity: 0 },
    'slide-up': { opacity: 0, transform: 'translateY(2rem)' },
    'slide-left': { opacity: 0, transform: 'translateX(2rem)' },
    scale: { opacity: 0, transform: 'scale(0.8)' },
    blur: { opacity: 0, filter: 'blur(8px)' },
  }

  const visibleStyle: React.CSSProperties = {
    opacity: 1,
    transform: 'translateY(0) translateX(0) scale(1)',
    filter: 'blur(0)',
  }

  return (
    <DemoCard code={code} description={`delay: ${delay}ms`} title={label}>
      <div
        className="flex h-20 items-center justify-center rounded-lg bg-accent/10 text-sm font-medium text-accent"
        ref={ref}
        style={{ ...baseStyle, ...(inView ? visibleStyle : hiddenStyle[effect]) }}
      >
        {inView ? 'Visible!' : '...'}
      </div>
    </DemoCard>
  )
}

function StaggerDemo() {
  const { ref, inView } = useInView(0.1)
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']

  return (
    <DemoCard
      code={`// stagger with incremental delay\n{items.map((item, i) => (\n  <div style={{ transitionDelay: \`\${i * 80}ms\` }} />\n))}`}
      description="Each item enters with incremental delay"
      title="Stagger Pattern"
      full
    >
      <div className="grid grid-cols-3 gap-3" ref={ref}>
        {items.map((item, i) => (
          <div
            className={[
              'flex h-16 items-center justify-center rounded-lg text-xs font-medium',
              inView ? 'bg-accent/15 text-accent' : 'bg-bg-tertiary/40 text-fg-muted/30',
            ].join(' ')}
            key={item}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(1rem)',
              transition: `all 400ms cubic-bezier(0, 0, 0.2, 1) ${i * 80}ms`,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </DemoCard>
  )
}

function ResetDemo() {
  const [resetKey, setResetKey] = useState(0)

  return (
    <DocSection title="Reset & Replay">
      <DemoCard
        code="// increment key to remount and re-trigger animations"
        description="Reset all scroll animations"
        title="Reset"
      >
        <button
          className="rounded-md bg-accent px-4 py-2 text-xs font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          onClick={() => setResetKey((k) => k + 1)}
        >
          Reset All
        </button>
        <p className="mt-2 text-[11px] text-fg-muted">
          Key: {resetKey} — scroll down to see animations replay
        </p>
      </DemoCard>
    </DocSection>
  )
}

// ─── motion-transitions ───

const transitionProperties = [
  { label: 'All', value: 'all' },
  { label: 'Colors', value: 'colors' },
  { label: 'Transform', value: 'transform' },
  { label: 'Opacity', value: 'opacity' },
  { label: 'Background', value: 'background-color' },
]

const easingOptions = [
  { label: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)' },
  { label: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)' },
  { label: 'ease-default', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  { label: 'linear', value: 'linear' },
]

function TransitionPlayground() {
  const [duration, setDuration] = useState(300)
  const [easingIdx, setEasingIdx] = useState(0)
  const [propIdx, setPropIdx] = useState(0)
  const [active, setActive] = useState(false)

  const easing = easingOptions[easingIdx]
  const prop = transitionProperties[propIdx]

  const tailwindClass = (() => {
    const durationMap: Record<number, string> = {
      100: 'duration-100',
      150: 'duration-150',
      200: 'duration-200',
      300: 'duration-300',
      500: 'duration-500',
    }
    const durationCls = durationMap[duration] ?? `duration-[${duration}ms]`

    const propMap: Record<string, string> = {
      all: 'transition-all',
      colors: 'transition-colors',
      transform: 'transition-transform',
      opacity: 'transition-opacity',
    }
    const propCls = propMap[prop.value] ?? 'transition-all'

    return `${propCls} ${durationCls}`
  })()

  const getActiveStyle = useCallback(() => {
    if (!active) return {}
    if (prop.value === 'transform') return { transform: 'scale(1.2) rotate(12deg)' }
    if (prop.value === 'opacity') return { opacity: 0.2 }
    if (prop.value === 'background-color' || prop.value === 'colors') return {}
    return { transform: 'scale(1.15)', borderRadius: '50%' }
  }, [active, prop.value])

  return (
    <div>
      <div className="text-lg font-bold text-fg">Transition Playground</div>
      <p className="mt-1 text-sm text-fg-muted">
        Live-adjust transition duration, easing, and property to see real-time results.
      </p>

      <DocSection title="Controls">
        <DemoCard title="Configuration" description="Adjust transition parameters">
          <div className="space-y-4">
            {/* duration slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-fg">Duration</span>
                <span className="font-mono text-xs text-accent">{duration}ms</span>
              </div>
              <input
                className="w-full accent-[var(--color-accent)]"
                max={1000}
                min={100}
                onChange={(e) => setDuration(Number(e.target.value))}
                step={50}
                type="range"
                value={duration}
              />
            </div>

            {/* easing selection */}
            <div className="space-y-1">
              <span className="text-xs font-medium text-fg">Easing</span>
              <div className="flex flex-wrap gap-2">
                {easingOptions.map((e, i) => (
                  <button
                    className={[
                      'rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors',
                      easingIdx === i
                        ? 'bg-accent text-accent-fg'
                        : 'bg-bg-tertiary text-fg-muted hover:text-fg',
                    ].join(' ')}
                    key={e.label}
                    onClick={() => setEasingIdx(i)}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>

            {/* property selection */}
            <div className="space-y-1">
              <span className="text-xs font-medium text-fg">Property</span>
              <div className="flex flex-wrap gap-2">
                {transitionProperties.map((p, i) => (
                  <button
                    className={[
                      'rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors',
                      propIdx === i
                        ? 'bg-accent text-accent-fg'
                        : 'bg-bg-tertiary text-fg-muted hover:text-fg',
                    ].join(' ')}
                    key={p.value}
                    onClick={() => setPropIdx(i)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Preview">
        <DemoCard
          code={`<div className="${tailwindClass}"\n  style={{ transitionTimingFunction: '${easing.value}' }}>\n  ...\n</div>`}
          description="Click the button or hover the box"
          title="Live Preview"
        >
          <div className="flex flex-col items-center gap-6 py-4">
            <button
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
              onClick={() => setActive((v) => !v)}
            >
              {active ? 'Reset' : 'Trigger'}
            </button>

            <div
              className={[
                'flex h-24 w-24 items-center justify-center rounded-xl text-xs font-medium select-none',
                active && (prop.value === 'colors' || prop.value === 'background-color')
                  ? 'text-success-fg bg-success'
                  : 'bg-accent/20 text-accent',
              ].join(' ')}
              style={{
                transition: `${prop.value} ${duration}ms`,
                transitionTimingFunction: easing.value,
                ...getActiveStyle(),
              }}
            >
              {active ? 'Active' : 'Idle'}
            </div>
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Tailwind Classes">
        <div className="rounded-lg border border-border/30 bg-bg-tertiary/20 p-4 font-mono text-xs text-fg-muted">
          <div className="space-y-1.5">
            <div>
              <span className="text-fg-muted/40">property: </span>
              <span className="text-accent">{tailwindClass.split(' ')[0]}</span>
            </div>
            <div>
              <span className="text-fg-muted/40">duration: </span>
              <span className="text-accent">{tailwindClass.split(' ')[1]}</span>
            </div>
            <div>
              <span className="text-fg-muted/40">easing: </span>
              <span className="text-accent">{easing.label}</span>
              <span className="ml-2 text-fg-muted/30">{easing.value}</span>
            </div>
          </div>
        </div>
      </DocSection>
    </div>
  )
}

// ─── exports ───

const tokenItemsExt7: DevCenterItem[] = [
  {
    id: 'motion-micro',
    label: 'Micro-interactions',
    layer: 'l0-motion',
    type: 'reference',
    tags: ['micro', 'interaction', 'press', 'toggle', 'delete', 'like', 'hover'],

    stage: () => (
      <div>
        <div className="text-lg font-bold text-fg">Micro-interactions</div>
        <p className="mt-1 text-sm text-fg-muted">
          Small, purposeful animations that provide feedback for user actions. Each
          pattern is reusable and follows the design system timing tokens.
        </p>

        <DocSection columns={2} title="Press & Click">
          <ButtonPress />
          <LikeHeart />
        </DocSection>

        <DocSection columns={2} title="Toggle & Check">
          <ToggleSwitch />
          <CheckboxDraw />
        </DocSection>

        <DocSection columns={2} title="List & Layout">
          <DeleteFadeOut />
          <HoverLift />
        </DocSection>
      </div>
    ),
  },

  {
    id: 'motion-gallery',
    label: 'Animation Gallery',
    layer: 'l0-motion',
    type: 'reference',
    tags: ['keyframes', 'popup', 'shake', 'toast', 'loading', 'marquee', 'animation'],

    stage: () => (
      <div>
        <div className="text-lg font-bold text-fg">Animation Gallery</div>
        <p className="mt-1 text-sm text-fg-muted">
          All built-in @keyframes animations. Click Play to trigger each one.
        </p>

        {keyframeAnimations.map((cat) => (
          <DocSection key={cat.category} title={cat.category}>
            <div className="space-y-4">
              {cat.items.map((item) => (
                <AnimationPlayer
                  css={item.css}
                  description={item.description}
                  key={item.name}
                  name={item.name}
                />
              ))}
            </div>
          </DocSection>
        ))}
      </div>
    ),
  },

  {
    id: 'motion-scroll',
    label: 'Scroll Animations',
    layer: 'l0-motion',
    type: 'reference',
    tags: ['scroll', 'intersection', 'observer', 'reveal', 'fade', 'slide', 'stagger'],

    stage: () => (
      <div>
        <div className="text-lg font-bold text-fg">Scroll Animations</div>
        <p className="mt-1 text-sm text-fg-muted">
          Elements animate when scrolling into view using IntersectionObserver.
          Scroll down to trigger each effect.
        </p>

        <ResetDemo />

        <DocSection columns={2} title="Basic Effects">
          <ScrollRevealBox code={`style={{\n  opacity: inView ? 1 : 0,\n  transition: 'opacity 600ms ease-out'\n}}`} delay={0} effect="fade" label="Fade In" />
          <ScrollRevealBox code={`style={{\n  opacity: inView ? 1 : 0,\n  transform: inView ? 'none' : 'translateY(2rem)',\n  transition: 'all 600ms ease-out'\n}}`} delay={0} effect="slide-up" label="Slide Up" />
          <ScrollRevealBox code={`style={{\n  opacity: inView ? 1 : 0,\n  transform: inView ? 'none' : 'translateX(2rem)',\n  transition: 'all 600ms ease-out'\n}}`} delay={0} effect="slide-left" label="Slide Left" />
          <ScrollRevealBox code={`style={{\n  opacity: inView ? 1 : 0,\n  transform: inView ? 'none' : 'scale(0.8)',\n  transition: 'all 600ms ease-out'\n}}`} delay={0} effect="scale" label="Scale In" />
          <ScrollRevealBox code={`style={{\n  opacity: inView ? 1 : 0,\n  filter: inView ? 'none' : 'blur(8px)',\n  transition: 'all 600ms ease-out'\n}}`} delay={0} effect="blur" label="Blur In" />
          <ScrollRevealBox code={`style={{\n  opacity: inView ? 1 : 0,\n  transform: inView ? 'none' : 'translateY(2rem)',\n  transition: 'all 600ms ease-out 200ms'\n}}`} delay={200} effect="slide-up" label="Delayed Slide" />
        </DocSection>

        <DocSection title="Staggered Entry">
          <StaggerDemo />
        </DocSection>

        <DocSection title="Implementation">
          <DemoCard
            code={`const useInView = (threshold = 0.3) => {\n  const ref = useRef<HTMLDivElement>(null)\n  const [inView, setInView] = useState(false)\n\n  useEffect(() => {\n    const el = ref.current\n    if (el === null) return\n    const observer = new IntersectionObserver(\n      ([entry]) => {\n        if (entry.isIntersecting) setInView(true)\n      },\n      { threshold }\n    )\n    observer.observe(el)\n    return () => observer.disconnect()\n  }, [threshold])\n\n  return { ref, inView }\n}`}
            description="Reusable hook for scroll-triggered visibility"
            title="useInView Hook"
          >
            <p className="text-xs text-fg-muted">
              One-shot observer: once the element enters the viewport, it stays
              visible. The threshold controls how much of the element must be
              visible before triggering (0.3 = 30%).
            </p>
          </DemoCard>
        </DocSection>
      </div>
    ),
  },

  {
    id: 'motion-transitions',
    label: 'Transition Playground',
    layer: 'l0-motion',
    type: 'reference',
    tags: ['transition', 'duration', 'easing', 'property', 'interactive'],

    stage: () => <TransitionPlayground />,
  },
]

export { tokenItemsExt7 }
