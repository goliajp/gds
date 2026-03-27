import { useState } from 'react'

import { DocTable, DemoCard, DocSection } from '../components/demo'

import { duration, easing, keyframePresets, springPresets } from '@gds/l0-tokens/motion-system'
import { glassParams } from '@gds/l0-tokens/glass-system'

import type { DevCenterItem } from '../types'
import type { KeyframePresetId, MotionLevel } from '@gds/l0-tokens/motion-system'

// animation demo card — replays animation on click
function AnimCard({ name, keyframes, speed }: {
  name: string
  keyframes: { from: Record<string, string | number>, to: Record<string, string | number> }
  speed: MotionLevel
}) {
  const [playing, setPlaying] = useState(false)
  const ms = duration(speed === 'full' ? 'normal' : speed === 'reduced' ? 'fast' : 'fast', speed)

  function replay() {
    setPlaying(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPlaying(true))
    })
  }

  const fromStyle = keyframes.from as React.CSSProperties
  const toStyle = keyframes.to as React.CSSProperties

  return (
    <button
      className="flex flex-col items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]"
      onClick={replay}
    >
      <div
        className="h-12 w-12 rounded-md bg-accent/30 border border-accent/20"
        style={{
          transition: `all ${ms}ms ${easing.default}`,
          ...(playing ? toStyle : fromStyle),
        }}
      />
      <div className="text-[10px] font-mono text-fg-muted/50">{name}</div>
      <div className="text-[8px] text-fg-muted/20">{ms}ms</div>
    </button>
  )
}

// spring comparison card
function SpringCard({ name, tension, friction }: {
  name: string
  tension: number
  friction: number
}) {
  const [active, setActive] = useState(false)

  return (
    <button
      className="flex flex-col items-center gap-1.5 rounded-lg border border-white/[0.04] bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]"
      onClick={() => setActive(prev => !prev)}
    >
      <div
        className="h-8 w-8 rounded-md bg-accent/40"
        style={{
          transform: active ? 'scale(1.3)' : 'scale(1)',
          transition: `transform 500ms ${easing.spring}`,
        }}
      />
      <div className="text-[10px] font-medium text-fg">{name}</div>
      <div className="text-[8px] font-mono text-fg-muted/20">T:{tension} F:{friction}</div>
    </button>
  )
}

// transition demo — shows a css transition in action
function TransitionDemo({ label, property, fromStyle, toStyle, durationMs, easingFn }: {
  label: string
  property: string
  fromStyle: React.CSSProperties
  toStyle: React.CSSProperties
  durationMs: number
  easingFn: string
}) {
  const [active, setActive] = useState(false)

  return (
    <button
      className="flex flex-col items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]"
      onClick={() => setActive(prev => !prev)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div
        className="h-10 w-10 rounded-md bg-accent/30 border border-accent/20"
        style={{
          transition: `${property} ${durationMs}ms ${easingFn}`,
          ...(active ? toStyle : fromStyle),
        }}
      />
      <div className="text-[10px] font-mono text-fg-muted/50">{label}</div>
      <div className="text-[8px] text-fg-muted/20">{durationMs}ms</div>
    </button>
  )
}

const tokenItemsExt2: DevCenterItem[] = [
  {
    id: 'motion',
    label: 'Motion',
    layer: 'l0',
    type: 'reference',
    tags: ['animation', 'motion', 'duration', 'easing', 'spring', 'keyframe'],
    stage: () => {
      const presetEntries = Object.entries(keyframePresets) as [KeyframePresetId, typeof keyframePresets[KeyframePresetId]][]

      return (
        <div>
          <DocSection title="Animation presets">
            <DemoCard title="8 Keyframe Presets" description="Click each card to replay the animation" full>
              <div className="grid grid-cols-4 gap-3">
                {presetEntries.map(([name, kf]) => (
                  <AnimCard key={name} name={name} keyframes={kf} speed="full" />
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Speed variants">
            <DemoCard title="Duration Scale by Motion Level" description="off (0ms), reduced (0.5x), full (1.0x)" full>
              <DocTable
                headers={['Tier', 'Off', 'Reduced', 'Full']}
                rows={(['fast', 'normal', 'slow', 'slower'] as const).map(tier => [
                  tier,
                  `${duration(tier, 'off')}ms`,
                  `${duration(tier, 'reduced')}ms`,
                  `${duration(tier, 'full')}ms`,
                ])}
              />
            </DemoCard>
          </DocSection>

          <DocSection title="Spring physics">
            <DemoCard title="5 Spring Presets" description="Click to toggle scale — each has unique tension/friction" full>
              <div className="grid grid-cols-5 gap-3">
                {Object.entries(springPresets).map(([name, { tension, friction }]) => (
                  <SpringCard key={name} name={name} tension={tension} friction={friction} />
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Easing functions">
            <DemoCard title="6 Easing Presets" description="CSS cubic-bezier curves for different motion characters" full>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(easing).map(([name, curve]) => (
                  <div key={name} className="flex items-center gap-3 rounded-md border border-white/[0.04] bg-white/[0.02] p-3">
                    <div className="min-w-[60px] text-[10px] font-medium text-accent">{name}</div>
                    <div className="flex-1 font-mono text-[9px] text-fg-muted/40 truncate">{curve}</div>
                  </div>
                ))}
              </div>
            </DemoCard>
          </DocSection>
        </div>
      )
    },
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Motion System</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• 4-tier duration scale: fast (100ms), normal (200ms), slow (300ms), slower (500ms)</p>
            <p>• 3 motion levels: off (0ms), reduced (0.5x), full (1.0x)</p>
            <p>• 6 easing presets: default, in, out, inOut, spring, bounce</p>
            <p>• 5 spring presets: default, gentle, bouncy, stiff, slow (tension/friction pairs)</p>
            <p>• 8 keyframe presets: fadeIn/Out, scaleIn/Out, slideUp/Down/Left/Right</p>
            <p>• prefers-reduced-motion: maps to "reduced" level automatically</p>
          </div>
        </div>
        <DocTable rows={[
          ['--gds-duration-fast', 'Micro-feedback, hover', '0/50/100 ms', 'CSS var'],
          ['--gds-duration-normal', 'Panel, tab switch', '0/100/200 ms', 'CSS var'],
          ['--gds-duration-slow', 'Modal, page transition', '0/150/300 ms', 'CSS var'],
          ['--gds-duration-slower', 'Complex orchestration', '0/250/500 ms', 'CSS var'],
          ['--gds-ease-default', 'Standard easing', 'cubic-bezier(0.4,0,0.2,1)', 'CSS var'],
          ['--gds-ease-in', 'Accelerate', 'cubic-bezier(0.4,0,1,1)', 'CSS var'],
          ['--gds-ease-out', 'Decelerate', 'cubic-bezier(0,0,0.2,1)', 'CSS var'],
          ['--gds-ease-spring', 'Overshoot bounce', 'cubic-bezier(0.34,1.56,0.64,1)', 'CSS var'],
        ]} />
      </div>
    ),
    code: () => `// duration with motion level
import { duration, easing } from '@gds/l0-tokens'

duration('fast', 'full')     // 100ms
duration('normal', 'reduced') // 100ms (halved)
duration('slow', 'off')       // 0ms (instant)

// CSS variables (set by theme provider)
transition: all var(--gds-duration-normal) var(--gds-ease-default);
transition: transform var(--gds-duration-fast) var(--gds-ease-spring);

// spring presets
import { springPresets } from '@gds/l0-tokens'

springPresets.default  // { tension: 170, friction: 26 }
springPresets.bouncy   // { tension: 300, friction: 10 }
springPresets.stiff    // { tension: 400, friction: 28 }

// keyframe presets
import { keyframePresets } from '@gds/l0-tokens'

keyframePresets.fadeIn   // { from: { opacity: 0 }, to: { opacity: 1 } }
keyframePresets.scaleIn  // { from: { opacity: 0, transform: 'scale(0.95)' }, ... }
keyframePresets.slideUp  // { from: { opacity: 0, transform: 'translateY(8px)' }, ... }`,
  },
  {
    id: 'glass-lab',
    label: 'Glass Lab',
    layer: 'l0',
    type: 'reference',
    tags: ['glass', 'blur', 'frosted', 'backdrop', 'material', 'translucent'],
    stage: () => {
      const levels = ['sm', 'md', 'lg'] as const
      const levelCls = { sm: 'gds-glass-sm', md: 'gds-glass', lg: 'gds-glass-lg' }
      const darkParams = levels.map(l => {
        const label = l === 'md' ? 'glass' : `glass-${l}`
        const p = glassParams(l === 'sm' ? 'subtle' : 'full', 'dark')
        const blur = l === 'sm' ? p.blurSm : l === 'md' ? p.blurMd : p.blurLg
        const sat = l === 'sm' ? p.saturateSm : l === 'md' ? p.saturateMd : p.saturateLg
        return { label, blur, sat, bgOpacity: p.bgOpacity }
      })

      const backgrounds = [
        { name: 'Solid', cls: 'bg-accent/30' },
        { name: 'Gradient', cls: 'bg-gradient-to-br from-accent/40 via-warning/30 to-danger/40' },
        { name: 'Mixed', cls: 'bg-gradient-to-r from-success/40 via-accent/20 to-warning/40' },
      ]

      return (
        <div>
          <DocSection title="Glass on colorful backgrounds">
            <DemoCard title="Side-by-Side Comparison" description="sm, md, lg intensities over gradient" full>
              <div className="relative rounded-xl overflow-hidden" style={{ height: 200 }}>
                <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-danger/30 to-success/40" />
                <div className="absolute inset-0 flex items-center justify-center gap-4 p-4">
                  {levels.map(l => (
                    <div
                      key={l}
                      className={`flex-1 flex flex-col items-center justify-center rounded-lg border border-white/10 p-4 ${levelCls[l]}`}
                      style={{ height: 140 }}
                    >
                      <div className="text-sm font-medium text-fg">glass-{l}</div>
                      <div className="mt-1 text-[9px] text-fg-muted/60 text-center">
                        {l === 'sm' ? 'Inline elements' : l === 'md' ? 'Cards, panels' : 'Overlays, modals'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Glass parameters">
            <DemoCard title="Dark Mode Values" description="Blur, saturation, background opacity for each level" full>
              <DocTable
                headers={['Level', 'Blur', 'Saturate', 'BG Opacity']}
                rows={darkParams.map(p => [
                  p.label,
                  `${p.blur}px`,
                  `${p.sat}%`,
                  p.bgOpacity.toFixed(2),
                ])}
              />
            </DemoCard>
          </DocSection>

          <DocSection title="Dark vs light mode">
            <DemoCard title="Mode Adaptation" description="Dark: -5% opacity (more translucent). Light: +10% (more readable)" full>
              <div className="grid grid-cols-2 gap-4">
                {(['dark', 'light'] as const).map(mode => {
                  const p = glassParams('full', mode)
                  return (
                    <div key={mode} className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-4">
                      <div className="text-[11px] font-medium text-fg mb-2">{mode} mode</div>
                      <div className="space-y-1 text-[9px] font-mono text-fg-muted/40">
                        <p>blur-md: {p.blurMd}px</p>
                        <p>saturate-md: {p.saturateMd}%</p>
                        <p>bg-opacity: {p.bgOpacity.toFixed(2)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Background types">
            <DemoCard title="Glass on Different Backgrounds" description="Solid color, gradient, mixed patterns" full>
              <div className="grid grid-cols-3 gap-3">
                {backgrounds.map(bg => (
                  <div key={bg.name} className="relative rounded-lg overflow-hidden" style={{ height: 120 }}>
                    <div className={`absolute inset-0 ${bg.cls}`} />
                    <div className="absolute inset-0 flex items-center justify-center p-3">
                      <div className="gds-glass rounded-lg border border-white/10 px-4 py-3 text-center">
                        <div className="text-[10px] font-medium text-fg">{bg.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Depth stacking">
            <DemoCard title="Nested Glass Panels" description="Glass layers stack — each adds blur to what's behind" full>
              <div className="relative rounded-lg overflow-hidden" style={{ height: 180 }}>
                <div className="absolute inset-0 bg-gradient-to-br from-accent/50 via-warning/30 to-success/50" />
                <div className="absolute inset-4 gds-glass-sm rounded-lg border border-white/10 p-4">
                  <div className="text-[9px] text-fg-muted/50 mb-2">Layer 1 — glass-sm</div>
                  <div className="gds-glass rounded-lg border border-white/10 p-4">
                    <div className="text-[9px] text-fg-muted/50 mb-2">Layer 2 — glass-md</div>
                    <div className="gds-glass-lg rounded-lg border border-white/10 p-3">
                      <div className="text-[9px] text-fg-muted/50">Layer 3 — glass-lg</div>
                    </div>
                  </div>
                </div>
              </div>
            </DemoCard>
          </DocSection>
        </div>
      )
    },
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Glass Material System</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• 3 intensities: sm (inline), md (cards, default), lg (modals, overlays)</p>
            <p>• Glass axis: off (solid 95%), subtle (light blur), full (heavy blur)</p>
            <p>• Dark mode: -5% bg opacity for more translucency</p>
            <p>• Light mode: +10% bg opacity for better readability</p>
            <p>• Automatic fallback: unsupported browsers get 85% solid bg</p>
            <p>• Depth stacking: nested glass layers compound the blur effect</p>
            <p>• Saturation boost: 130-200% to maintain color vibrancy through blur</p>
          </div>
        </div>
        <DocTable rows={[
          ['gds-glass-sm', 'Light glass (badges, inline)', 'blur-sm + saturate', 'utility'],
          ['gds-glass', 'Default glass (cards, panels)', 'blur-md + saturate', 'utility'],
          ['gds-glass-lg', 'Heavy glass (modals, overlays)', 'blur-lg + saturate', 'utility'],
          ['--gds-glass-blur-sm', 'Small blur', '0/4/8 px', 'CSS var'],
          ['--gds-glass-blur-md', 'Medium blur', '0/12/20 px', 'CSS var'],
          ['--gds-glass-blur-lg', 'Large blur', '0/24/40 px', 'CSS var'],
          ['--gds-glass-saturate-sm', 'Small saturate', '100/130/150 %', 'CSS var'],
          ['--gds-glass-saturate-md', 'Medium saturate', '100/150/180 %', 'CSS var'],
          ['--gds-glass-saturate-lg', 'Large saturate', '100/160/200 %', 'CSS var'],
          ['--gds-glass-bg-opacity', 'Background opacity', '0.15-0.95', 'CSS var'],
        ]} />
      </div>
    ),
    code: () => `// glass utilities — add to any element
<div className="gds-glass-sm">Light glass (badges, tooltips)</div>
<div className="gds-glass">Default glass (cards, panels)</div>
<div className="gds-glass-lg">Heavy glass (modals, overlays)</div>

// programmatic access
import { glassParams, glassToCssVars } from '@gds/l0-tokens'

const params = glassParams('full', 'dark')
// { blurSm: 8, blurMd: 20, blurLg: 40, saturateSm: 150, ... }

const cssVars = glassToCssVars('full', 'dark')
// { '--gds-glass-blur-sm': '8px', '--gds-glass-blur-md': '20px', ... }

// capability detection
import { supportsBackdropFilter } from '@gds/l0-tokens'

if (!supportsBackdropFilter()) {
  // fallback to solid semi-transparent background
}

// nested glass — layers compound
<div className="gds-glass-sm">
  <div className="gds-glass">
    <div className="gds-glass-lg">Deepest</div>
  </div>
</div>`,
  },
  {
    id: 'transitions',
    label: 'Transitions',
    layer: 'l0',
    type: 'reference',
    tags: ['transition', 'hover', 'transform', 'opacity', 'scale', 'duration'],
    stage: () => {
      const colorTransitions = [
        { label: 'fast (100ms)', ms: 100, fromStyle: { backgroundColor: 'rgba(var(--accent-rgb, 99,102,241), 0.2)' }, toStyle: { backgroundColor: 'rgba(var(--accent-rgb, 99,102,241), 0.5)' } },
        { label: 'normal (200ms)', ms: 200, fromStyle: { backgroundColor: 'rgba(var(--accent-rgb, 99,102,241), 0.2)' }, toStyle: { backgroundColor: 'rgba(var(--accent-rgb, 99,102,241), 0.5)' } },
        { label: 'slow (300ms)', ms: 300, fromStyle: { backgroundColor: 'rgba(var(--accent-rgb, 99,102,241), 0.2)' }, toStyle: { backgroundColor: 'rgba(var(--accent-rgb, 99,102,241), 0.5)' } },
      ]

      return (
        <div>
          <DocSection title="Color transitions">
            <DemoCard title="Background Color" description="Hover to see transition — fast, normal, slow durations" full>
              <div className="grid grid-cols-3 gap-3">
                {colorTransitions.map(t => (
                  <TransitionDemo
                    key={t.label}
                    label={t.label}
                    property="background-color"
                    fromStyle={t.fromStyle}
                    toStyle={t.toStyle}
                    durationMs={t.ms}
                    easingFn={easing.default}
                  />
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Size transitions">
            <DemoCard title="Expand / Collapse" description="Hover to expand — different easing curves" full>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'ease-out', fn: easing.out },
                  { label: 'spring', fn: easing.spring },
                  { label: 'bounce', fn: easing.bounce },
                ].map(e => (
                  <TransitionDemo
                    key={e.label}
                    label={e.label}
                    property="transform"
                    fromStyle={{ transform: 'scale(0.8)' }}
                    toStyle={{ transform: 'scale(1.2)' }}
                    durationMs={300}
                    easingFn={e.fn}
                  />
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Opacity transitions">
            <DemoCard title="Fade Effects" description="Hover to fade in — useful for reveal patterns" full>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'fast fade', ms: 100 },
                  { label: 'normal fade', ms: 200 },
                  { label: 'slow fade', ms: 500 },
                ].map(t => (
                  <TransitionDemo
                    key={t.label}
                    label={t.label}
                    property="opacity"
                    fromStyle={{ opacity: 0.2 }}
                    toStyle={{ opacity: 1 }}
                    durationMs={t.ms}
                    easingFn={easing.out}
                  />
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Transform transitions">
            <DemoCard title="Scale, Rotate, Translate" description="Hover to trigger — all using GDS easing tokens" full>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'scale', from: { transform: 'scale(1)' }, to: { transform: 'scale(1.3)' } },
                  { label: 'rotate', from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(45deg)' } },
                  { label: 'translateY', from: { transform: 'translateY(0)' }, to: { transform: 'translateY(-8px)' } },
                  { label: 'translateX', from: { transform: 'translateX(0)' }, to: { transform: 'translateX(8px)' } },
                ].map(t => (
                  <TransitionDemo
                    key={t.label}
                    label={t.label}
                    property="transform"
                    fromStyle={t.from}
                    toStyle={t.to}
                    durationMs={200}
                    easingFn={easing.spring}
                  />
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Duration + easing matrix">
            <DemoCard title="All Combinations" description="Duration tiers x easing presets" full>
              <DocTable
                headers={['Duration', 'Value', 'Use Case']}
                rows={[
                  ['fast', '100ms', 'hover state, micro-feedback, icon swap'],
                  ['normal', '200ms', 'panel expand, tab switch, dropdown open'],
                  ['slow', '300ms', 'modal enter, page transition, drawer slide'],
                  ['slower', '500ms', 'complex orchestration, staggered lists'],
                ]}
              />
            </DemoCard>
          </DocSection>
        </div>
      )
    },
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Transition Tokens</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use CSS variables for all transitions — never hardcode durations</p>
            <p>• Duration tokens: --gds-duration-fast/normal/slow/slower</p>
            <p>• Easing tokens: --gds-ease-default/in/out/spring</p>
            <p>• Always transition specific properties, never use "all" in production</p>
            <p>• Respect prefers-reduced-motion: duration tokens auto-scale to 0ms when off</p>
            <p>• Spring easing adds overshoot — use for playful, physical interactions</p>
          </div>
        </div>
        <DocTable rows={[
          ['--gds-duration-fast', 'Hover, micro-feedback', '100ms', 'CSS var'],
          ['--gds-duration-normal', 'Panel, tab switch', '200ms', 'CSS var'],
          ['--gds-duration-slow', 'Modal, page transition', '300ms', 'CSS var'],
          ['--gds-duration-slower', 'Complex orchestration', '500ms', 'CSS var'],
          ['--gds-ease-default', 'Standard (material)', 'cubic-bezier(0.4,0,0.2,1)', 'CSS var'],
          ['--gds-ease-in', 'Accelerate (exit)', 'cubic-bezier(0.4,0,1,1)', 'CSS var'],
          ['--gds-ease-out', 'Decelerate (enter)', 'cubic-bezier(0,0,0.2,1)', 'CSS var'],
          ['--gds-ease-spring', 'Overshoot bounce', 'cubic-bezier(0.34,1.56,0.64,1)', 'CSS var'],
        ]} />
      </div>
    ),
    code: () => `// transition using GDS tokens (CSS)
.my-button {
  transition: background-color var(--gds-duration-fast) var(--gds-ease-default);
}
.my-button:hover {
  background-color: var(--accent);
}

// transition using GDS tokens (Tailwind + inline)
<div style={{
  transition: \`transform var(--gds-duration-normal) var(--gds-ease-spring)\`,
}}>
  Bouncy scale on hover
</div>

// common patterns
// fade in: opacity 0→1, duration-normal, ease-out
// slide up: translateY(8px→0), duration-normal, ease-out
// scale pop: scale(0.95→1), duration-fast, ease-spring
// color shift: bg-color change, duration-fast, ease-default

// programmatic
import { duration, easing } from '@gds/l0-tokens'

const style = {
  transition: \`opacity \${duration('normal', 'full')}ms \${easing.out}\`,
}`,
  },
]

export { tokenItemsExt2 }
