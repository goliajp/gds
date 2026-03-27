import { useCallback, useRef, useState } from 'react'

import { DemoCard, DocSection, DocTable } from '../components/demo'
import type { DevCenterItem } from '../types'

// ---------- shared helpers ----------

// colorful gradient background for glass demos
function GlassDemo({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={['relative overflow-hidden rounded-xl', className].filter(Boolean).join(' ')}>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        }}
      />
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full"
          style={{ background: 'radial-gradient(circle, #ff6b6b, transparent)' }}
        />
        <div
          className="absolute right-1/4 bottom-1/3 h-24 w-24 rounded-full"
          style={{ background: 'radial-gradient(circle, #ffd93d, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 h-28 w-28 rounded-full"
          style={{ background: 'radial-gradient(circle, #6bcb77, transparent)' }}
        />
      </div>
      <div className="relative p-6">{children}</div>
    </div>
  )
}

// inline glass card (GDS doesn't ship GlassCard/Panel/Button as exports yet)
function InlineGlassCard({ children, className, blur = 20 }: {
  children: React.ReactNode
  className?: string
  blur?: number
}) {
  return (
    <div
      className={['rounded-xl border border-white/15', className].filter(Boolean).join(' ')}
      style={{
        backdropFilter: `blur(${blur}px) saturate(180%)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
        background: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      {children}
    </div>
  )
}

function InlineGlassPanel({ children, className, padding = 'default', blur = 20 }: {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'default'
  blur?: number
}) {
  const pad = padding === 'sm' ? 'px-3 py-1.5' : 'px-4 py-2.5'
  return (
    <div
      className={['border border-white/15', pad, className].filter(Boolean).join(' ')}
      style={{
        backdropFilter: `blur(${blur}px) saturate(180%)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
        background: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      {children}
    </div>
  )
}

function InlineGlassButton({ children, variant, size }: {
  children: React.ReactNode
  variant?: 'accent'
  size?: 'sm' | 'lg'
}) {
  const sizeClass = size === 'sm' ? 'px-3 py-1 text-xs' : size === 'lg' ? 'px-5 py-2.5 text-sm' : 'px-4 py-2 text-sm'
  const bg = variant === 'accent'
    ? 'bg-white/25 hover:bg-white/35'
    : 'bg-white/15 hover:bg-white/25'
  return (
    <button className={`${sizeClass} ${bg} rounded-lg font-medium text-white transition-colors select-none`}>
      {children}
    </button>
  )
}

// result label for edge-case tests
function Result({ status, text }: { status: 'works' | 'partial' | 'broken', text: string }) {
  const icons = { broken: '\u2717', partial: '\u26A0\uFE0F', works: '\u2713' }
  const colors = {
    broken: 'text-red-400',
    partial: 'text-yellow-400',
    works: 'text-green-400',
  }
  return (
    <span className={`text-[10px] font-bold ${colors[status]}`}>
      {icons[status]} {text}
    </span>
  )
}

// ========== 1. liquid-glass ==========

function LiquidGlassStage() {
  return (
    <div>
      <div className="text-lg font-bold text-fg">Liquid Glass</div>
      <p className="mt-1 text-sm text-fg-muted">
        iOS 26-inspired translucent glass surfaces using backdrop-filter.
      </p>

      <DocSection title="GlassCard">
        <GlassDemo>
          <div className="flex flex-wrap gap-4">
            <InlineGlassCard className="w-48 p-4">
              <div className="text-sm font-medium text-white">Default blur</div>
              <div className="mt-1 text-xs text-white/70">Standard frosted glass card</div>
            </InlineGlassCard>
            <InlineGlassCard blur={8} className="w-48 p-4">
              <div className="text-sm font-medium text-white">Small blur</div>
              <div className="mt-1 text-xs text-white/70">Lighter frosted effect</div>
            </InlineGlassCard>
            <InlineGlassCard blur={40} className="w-48 p-4">
              <div className="text-sm font-medium text-white">Large blur</div>
              <div className="mt-1 text-xs text-white/70">Heavy frosted glass</div>
            </InlineGlassCard>
          </div>
        </GlassDemo>
      </DocSection>

      <DocSection title="GlassPanel">
        <GlassDemo>
          <div className="space-y-3">
            <InlineGlassPanel>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Toolbar panel</span>
                <span className="text-xs text-white/60">glass effect</span>
              </div>
            </InlineGlassPanel>
            <InlineGlassPanel padding="sm" blur={8}>
              <span className="text-xs text-white/80">Compact panel with small blur</span>
            </InlineGlassPanel>
          </div>
        </GlassDemo>
      </DocSection>

      <DocSection title="GlassButton">
        <GlassDemo>
          <div className="flex flex-wrap items-center gap-3">
            <InlineGlassButton>Default</InlineGlassButton>
            <InlineGlassButton variant="accent">Accent</InlineGlassButton>
            <InlineGlassButton size="sm">Small</InlineGlassButton>
            <InlineGlassButton size="lg">Large</InlineGlassButton>
          </div>
        </GlassDemo>
      </DocSection>

      <DocSection title="Blur intensity comparison">
        <GlassDemo>
          <div className="flex gap-4">
            {([
              { label: 'sm', blur: 8, desc: '8px blur' },
              { label: 'default', blur: 20, desc: '20px blur' },
              { label: 'lg', blur: 40, desc: '40px blur' },
            ] as const).map((item) => (
              <InlineGlassCard blur={item.blur} className="w-36 p-4 text-center" key={item.label}>
                <div className="text-[10px] font-bold text-white uppercase">{item.label}</div>
                <div className="mt-1 text-xs text-white/60">{item.desc}</div>
              </InlineGlassCard>
            ))}
          </div>
        </GlassDemo>
      </DocSection>

      <DocSection title="Composition example">
        <GlassDemo>
          <div className="space-y-3">
            <InlineGlassPanel>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-white/20" />
                <span className="text-sm font-medium text-white">App Header</span>
                <div className="flex-1" />
                <InlineGlassButton size="sm">Action</InlineGlassButton>
                <InlineGlassButton size="sm" variant="accent">Save</InlineGlassButton>
              </div>
            </InlineGlassPanel>
            <div className="flex gap-3">
              <InlineGlassCard className="flex-1 p-4">
                <div className="text-sm font-medium text-white">Card A</div>
                <div className="mt-2 text-xs text-white/60">
                  Glass surfaces create depth through transparency
                </div>
              </InlineGlassCard>
              <InlineGlassCard className="flex-1 p-4">
                <div className="text-sm font-medium text-white">Card B</div>
                <div className="mt-2 text-xs text-white/60">
                  Dynamic blur adapts to background content
                </div>
              </InlineGlassCard>
            </div>
          </div>
        </GlassDemo>
      </DocSection>
    </div>
  )
}

// ========== 2. glass-refraction ==========

function DemoBackground({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={['relative overflow-hidden rounded-xl', className].filter(Boolean).join(' ')}>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        }}
      />
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute top-1/4 left-1/4 h-24 w-24 rounded-full"
          style={{ background: 'radial-gradient(circle, #ff6b6b, transparent)' }}
        />
        <div
          className="absolute right-1/3 bottom-1/4 h-20 w-20 rounded-full"
          style={{ background: 'radial-gradient(circle, #ffd93d, transparent)' }}
        />
        <div
          className="absolute bottom-1/3 left-1/2 h-16 w-16 rounded-full"
          style={{ background: 'radial-gradient(circle, #6bcb77, transparent)' }}
        />
      </div>
      <div className="relative p-6">{children}</div>
    </div>
  )
}

function RadialGradientCard() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-xs font-medium text-white/80">Radial gradient</div>
      <div
        className="h-28 w-44 rounded-xl border border-white/10"
        style={{
          background:
            'radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0) 70%)',
        }}
      />
      <div className="max-w-44 text-center text-[10px] text-white/50">
        Elliptical highlight at top-left simulates light refraction through a curved surface
      </div>
    </div>
  )
}

function InnerShadowCard() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-xs font-medium text-white/80">Inner shadow</div>
      <div
        className="h-28 w-44 rounded-xl border border-white/5 bg-white/5"
        style={{
          boxShadow:
            'inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 2px rgba(0,0,0,0.05)',
        }}
      />
      <div className="max-w-44 text-center text-[10px] text-white/50">
        Top inner glow + bottom inner shadow creates liquid depth illusion
      </div>
    </div>
  )
}

function GradientBorderCard() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-xs font-medium text-white/80">Gradient border</div>
      <div className="rounded-xl bg-gradient-to-br from-white/30 to-white/5 p-px">
        <div className="h-28 w-44 rounded-[11px] bg-white/5" />
      </div>
      <div className="max-w-44 text-center text-[10px] text-white/50">
        Border fades from bright at top-left to subtle at bottom-right, simulating directional light
      </div>
    </div>
  )
}

function SvgDistortionCard() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-xs font-medium text-white/80">SVG distortion</div>
      <div className="relative h-28 w-44 overflow-hidden rounded-xl">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="refract-demo">
              <feTurbulence baseFrequency="0.015" numOctaves="3" result="noise" seed="42" type="fractalNoise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <rect fill="rgba(255,255,255,0.08)" filter="url(#refract-demo)" height="100%" rx="12" width="100%" />
        </svg>
        <div className="absolute inset-0 rounded-xl border border-white/10" />
      </div>
      <div className="max-w-44 text-center text-[10px] text-white/50">
        feTurbulence + feDisplacementMap creates actual visual distortion like water surface
      </div>
    </div>
  )
}

function CombinedCard() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-xs font-medium text-white/80">All combined</div>
      <div className="relative h-28 w-44 overflow-hidden rounded-xl">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="refract-combined">
              <feTurbulence baseFrequency="0.02" numOctaves="2" result="noise" seed="7" type="fractalNoise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <rect fill="rgba(255,255,255,0.04)" filter="url(#refract-combined)" height="100%" rx="12" width="100%" />
        </svg>
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              'radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0) 70%)',
          }}
        />
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            border: '1px solid transparent',
            borderImage: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.03) 100%) 1',
            borderRadius: '12px',
          }}
        />
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.12), inset 0 -2px 2px rgba(0,0,0,0.04)',
          }}
        />
      </div>
      <div className="max-w-44 text-center text-[10px] text-white/50">
        All four techniques layered together for maximum water-like appearance
      </div>
    </div>
  )
}

function ComparisonDemo() {
  return (
    <div className="flex gap-6">
      <div className="flex flex-1 flex-col items-center gap-3">
        <div className="text-xs font-medium text-white/80">Blur-based glass</div>
        <div
          className="h-32 w-full rounded-xl border border-white/15"
          style={{
            backdropFilter: 'blur(12px)',
            background: 'rgba(255,255,255,0.08)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <div className="p-4 text-xs text-white/70">
            Uses backdrop-filter: blur() to frost the background. Expensive GPU operation, can cause performance issues.
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-3">
        <div className="text-xs font-medium text-white/80">Refraction-based water</div>
        <div className="relative h-32 w-full overflow-hidden rounded-xl">
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background:
                'radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0) 70%)',
            }}
          />
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow:
                'inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 2px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.08)',
            }}
          />
          <div className="relative p-4 text-xs text-white/70">
            No backdrop-filter. Uses layered gradients and shadows for a water-drop look. Much cheaper, works everywhere.
          </div>
        </div>
      </div>
    </div>
  )
}

function OpacityExplorer() {
  const [highlightOpacity, setHighlightOpacity] = useState(0.25)
  const [borderOpacity, setBorderOpacity] = useState(0.12)
  const [innerShadow, setInnerShadow] = useState(0.15)

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <label className="flex flex-1 items-center gap-2 text-xs text-fg-muted select-none">
          Highlight: {highlightOpacity.toFixed(2)}
          <input className="flex-1" max={0.5} min={0} onChange={(e) => setHighlightOpacity(Number(e.target.value))} step={0.01} type="range" value={highlightOpacity} />
        </label>
        <label className="flex flex-1 items-center gap-2 text-xs text-fg-muted select-none">
          Border: {borderOpacity.toFixed(2)}
          <input className="flex-1" max={0.4} min={0} onChange={(e) => setBorderOpacity(Number(e.target.value))} step={0.01} type="range" value={borderOpacity} />
        </label>
        <label className="flex flex-1 items-center gap-2 text-xs text-fg-muted select-none">
          Inner glow: {innerShadow.toFixed(2)}
          <input className="flex-1" max={0.4} min={0} onChange={(e) => setInnerShadow(Number(e.target.value))} step={0.01} type="range" value={innerShadow} />
        </label>
      </div>
      <DemoBackground>
        <div className="flex justify-center">
          <div
            className="h-32 w-56 rounded-xl"
            style={{
              background: `radial-gradient(ellipse at 25% 15%, rgba(255,255,255,${highlightOpacity}) 0%, rgba(255,255,255,${highlightOpacity * 0.4}) 30%, rgba(255,255,255,0) 70%)`,
              border: `1px solid rgba(255,255,255,${borderOpacity})`,
              boxShadow: `inset 0 2px 4px rgba(255,255,255,${innerShadow}), inset 0 -2px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.08)`,
            }}
          >
            <div className="p-4 text-xs text-white/70">
              Adjust sliders to tune the water drop appearance
            </div>
          </div>
        </div>
      </DemoBackground>
    </div>
  )
}

function GlassRefractionStage() {
  return (
    <div>
      <div className="text-lg font-bold text-fg">Refraction Without Blur</div>
      <p className="mt-1 text-sm text-fg-muted">
        Study of water/glass-like visual effects that do NOT use backdrop-filter blur. Four
        techniques: radial gradient highlights, inner shadows for depth, gradient borders for
        light edges, and SVG displacement for actual distortion.
      </p>

      <DocSection columns={1} title="Individual techniques">
        <DemoBackground>
          <div className="flex flex-wrap justify-center gap-6">
            <RadialGradientCard />
            <InnerShadowCard />
            <GradientBorderCard />
            <SvgDistortionCard />
          </div>
        </DemoBackground>
      </DocSection>

      <DocSection columns={1} title="All combined">
        <DemoBackground>
          <div className="flex justify-center">
            <CombinedCard />
          </div>
        </DemoBackground>
      </DocSection>

      <DocSection columns={1} title="Blur vs refraction comparison">
        <DemoBackground>
          <ComparisonDemo />
        </DemoBackground>
      </DocSection>

      <DocSection columns={1} title="Interactive opacity tuning">
        <OpacityExplorer />
      </DocSection>
    </div>
  )
}

// ========== 3. glass-content-vs-backdrop ==========

function RichBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        }}
      />
      <div className="absolute inset-0">
        <div className="absolute top-4 left-6 font-bold text-white/80" style={{ fontSize: 28 }}>
          Background Text
        </div>
        <div className="absolute right-6 bottom-6 font-mono text-sm text-white/60">
          More text behind glass
        </div>
        <div
          className="absolute top-1/4 left-1/3 h-20 w-20 rounded-full"
          style={{ background: 'radial-gradient(circle, #ff6b6b, transparent)' }}
        />
        <div className="absolute right-1/4 bottom-1/4 h-16 w-16 rounded-lg bg-yellow-400/50" />
        <div className="absolute bottom-1/3 left-1/2 h-12 w-24 rounded-full bg-green-400/40" />
        <div className="absolute top-1/2 left-1/4 text-4xl">{'\u2605'}</div>
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

function DemoEmpty() {
  return (
    <DocSection title="A: Empty Glass -- No Internal Content">
      <p className="mb-3 text-xs text-fg-muted">
        An empty glass div sits on top of a colorful background. The glass only has
        backdrop-filter: blur + a semi-transparent background. Result: pure frosted glass
        showing a blurred version of what is underneath.
      </p>
      <RichBackground>
        <div className="flex items-center justify-center p-12">
          <div
            className="h-40 w-64 rounded-2xl border border-white/20"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              background: 'rgba(255,255,255,0.15)',
            }}
          />
        </div>
      </RichBackground>
      <p className="mt-2 text-[10px] text-fg-muted">
        Observation: the gradient, shapes, and text behind the glass are all blurred uniformly.
        The glass div has no children so nothing is sharp.
      </p>
    </DocSection>
  )
}

function DemoWithContent() {
  return (
    <DocSection title="B: Glass WITH Internal Content">
      <p className="mb-3 text-xs text-fg-muted">
        Same glass div, same background, but now the glass contains text and a button. KEY
        INSIGHT: backdrop-filter only affects what is BEHIND the element -- the element's own
        children remain perfectly sharp.
      </p>
      <RichBackground>
        <div className="flex items-center justify-center p-12">
          <div
            className="flex h-40 w-64 flex-col items-center justify-center gap-3 rounded-2xl border border-white/20"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              background: 'rgba(255,255,255,0.15)',
            }}
          >
            <div className="text-sm font-bold text-white">Sharp Title</div>
            <div className="text-xs text-white/70">This text is crisp, not blurred</div>
            <button className="rounded-lg bg-white/20 px-3 py-1 text-xs text-white">
              Sharp Button
            </button>
          </div>
        </div>
      </RichBackground>
      <p className="mt-2 text-[10px] text-fg-muted">
        Observation: the background behind the glass is blurred, but "Sharp Title",
        description text, and button are all rendered at full clarity. backdrop-filter never
        touches the element's own descendants.
      </p>
    </DocSection>
  )
}

function DemoLayers() {
  return (
    <DocSection title="C: Multiple Glass Layers Stacked">
      <p className="mb-3 text-xs text-fg-muted">
        Three layers stacked: bottom has text content, middle is a glass layer, top is glass
        with text. Each layer's backdrop-filter only sees through to what is directly below it.
      </p>
      <div className="relative h-64 overflow-hidden rounded-xl">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)',
          }}
        >
          <div className="p-4 text-lg font-bold text-white">Layer 0: Base Content</div>
          <div className="p-4 pt-0 text-sm text-white/80">Colorful gradient with text</div>
        </div>
        <div
          className="absolute inset-x-6 top-16 bottom-16 rounded-xl border border-white/20"
          style={{
            backdropFilter: 'blur(12px) saturate(150%)',
            background: 'rgba(255,255,255,0.1)',
          }}
        >
          <div className="p-2 text-[10px] text-white/40">Layer 1: Glass (blurs Layer 0)</div>
        </div>
        <div
          className="absolute inset-x-12 top-24 bottom-24 rounded-xl border border-white/30"
          style={{
            backdropFilter: 'blur(16px) saturate(180%)',
            background: 'rgba(255,255,255,0.15)',
          }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="text-sm font-bold text-white">Layer 2: Glass + Content</div>
              <div className="text-xs text-white/60">Blurs Layer 1 (already blurred Layer 0)</div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-fg-muted">
        Observation: Layer 2 blurs Layer 1, which already blurred Layer 0. The result is a
        "double blur" -- the background becomes progressively more diffused through each glass
        layer.
      </p>
    </DocSection>
  )
}

function DemoChildOpacity() {
  return (
    <DocSection title="D: Transparent vs Opaque Children">
      <p className="mb-3 text-xs text-fg-muted">
        Same glass div, but children have different opacity values. Does child opacity let the
        glass blur show through the text?
      </p>
      <RichBackground>
        <div className="flex gap-6 p-8">
          {[
            { label: 'opacity: 1.0', opacity: 1, desc: 'Clear and sharp, blocks glass blur completely' },
            { label: 'opacity: 0.5', opacity: 0.5, desc: 'Partially see-through -- blur shows through the text' },
            { label: 'opacity: 0.2', opacity: 0.2, desc: 'Almost invisible -- glass dominates' },
          ].map((item) => (
            <div
              className="flex-1 rounded-xl border border-white/20 p-4"
              key={item.label}
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                background: 'rgba(255,255,255,0.15)',
              }}
            >
              <div className="text-xs text-white/40">{item.label}</div>
              <div className="mt-2 text-lg font-bold text-white" style={{ opacity: item.opacity }}>
                {item.opacity === 1 ? 'Fully Opaque Text' : item.opacity === 0.5 ? 'Half Transparent Text' : 'Barely Visible Text'}
              </div>
              <div className="mt-1 text-xs text-white" style={{ opacity: item.opacity }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </RichBackground>
      <p className="mt-2 text-[10px] text-fg-muted">
        Observation: lowering child opacity makes the frosted glass blur visible through the text
        itself. At opacity 0.2 the text nearly disappears into the glass. This is how glass and
        content coexist.
      </p>
    </DocSection>
  )
}

function DemoDraggable() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 60, y: 40 })
  const dragRef = useRef<{ offsetX: number, offsetY: number } | null>(null)

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect === undefined) return
      dragRef.current = {
        offsetX: e.clientX - rect.left - pos.x,
        offsetY: e.clientY - rect.top - pos.y,
      }

      const onMove = (ev: MouseEvent) => {
        if (dragRef.current === null || containerRef.current === null) return
        const r = containerRef.current.getBoundingClientRect()
        setPos({
          x: Math.max(0, Math.min(r.width - 180, ev.clientX - r.left - dragRef.current.offsetX)),
          y: Math.max(0, Math.min(r.height - 100, ev.clientY - r.top - dragRef.current.offsetY)),
        })
      }

      const onUp = () => {
        dragRef.current = null
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    },
    [pos.x, pos.y],
  )

  return (
    <DocSection title="E: Draggable Glass Over Split Background">
      <p className="mb-3 text-xs text-fg-muted">
        Drag the glass card between the colorful left half and the plain right half. Watch how
        backdrop-filter dynamically updates -- the blur content changes in real-time based on
        what is behind the element at that moment.
      </p>
      <div className="relative h-72 cursor-default overflow-hidden rounded-xl" ref={containerRef}>
        <div
          className="absolute top-0 left-0 h-full w-1/2"
          style={{
            background: 'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)',
          }}
        >
          <div className="p-4 text-sm font-bold text-white">Colorful Side</div>
          <div className="p-4 pt-0 text-xs text-white/70">Rich gradient with shapes</div>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/2 bg-neutral-800">
          <div className="p-4 text-sm font-bold text-white/60">Plain Side</div>
          <div className="p-4 pt-0 text-xs text-white/30">Solid dark background</div>
        </div>
        <div
          className="absolute cursor-grab rounded-xl border border-white/25 active:cursor-grabbing"
          onMouseDown={onMouseDown}
          style={{
            backdropFilter: 'blur(20px) saturate(180%)',
            background: 'rgba(255,255,255,0.12)',
            height: 100,
            left: pos.x,
            top: pos.y,
            width: 180,
          }}
        >
          <div className="flex h-full flex-col items-center justify-center gap-1">
            <div className="text-xs font-bold text-white">Drag Me</div>
            <div className="text-[10px] text-white/50">Watch blur change live</div>
          </div>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-fg-muted">
        Observation: backdrop-filter is LIVE -- computed per frame from whatever is currently
        behind the element. Moving the card over the colorful side shows blurred colors; over the
        dark side it shows blurred darkness.
      </p>
    </DocSection>
  )
}

function DemoScrolling() {
  return (
    <DocSection title="F: Glass Over Scrolling Content">
      <p className="mb-3 text-xs text-fg-muted">
        A fixed glass header sits at the top while content scrolls underneath. The
        backdrop-filter dynamically updates as different content passes behind the glass.
      </p>
      <div className="relative h-72 overflow-hidden rounded-xl border border-border">
        <div
          className="absolute inset-x-0 top-0 z-10 flex items-center px-4"
          style={{
            backdropFilter: 'blur(20px) saturate(180%)',
            background: 'rgba(255,255,255,0.12)',
            borderBottom: '1px solid rgba(255,255,255,0.15)',
            height: 48,
          }}
        >
          <div className="text-sm font-bold text-white">Fixed Glass Header</div>
        </div>
        <div className="h-full overflow-y-auto">
          <div className="pt-12">
            {[
              { color: '#ff6b6b', label: 'Red Section' },
              { color: '#feca57', label: 'Yellow Section' },
              { color: '#48dbfb', label: 'Blue Section' },
              { color: '#ff9ff3', label: 'Pink Section' },
              { color: '#54a0ff', label: 'Indigo Section' },
              { color: '#5f27cd', label: 'Purple Section' },
              { color: '#01a3a4', label: 'Teal Section' },
              { color: '#f368e0', label: 'Magenta Section' },
            ].map((s) => (
              <div
                className="flex h-24 items-center px-6 text-lg font-bold text-white"
                key={s.label}
                style={{ background: s.color }}
              >
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-fg-muted">
        Observation: scroll the container -- as different colored sections pass behind the glass
        header, the blurred tint changes accordingly. This proves backdrop-filter is re-evaluated
        every frame.
      </p>
    </DocSection>
  )
}

function ContentVsBackdropStage() {
  return (
    <div>
      <div className="text-lg font-bold text-fg">Content vs Backdrop Behavior</div>
      <p className="mt-1 text-sm text-fg-muted">
        The key experiment: when a glass div has content INSIDE it AND covers content BELOW it,
        what are the visual differences?
      </p>
      <DemoEmpty />
      <DemoWithContent />
      <DemoLayers />
      <DemoChildOpacity />
      <DemoDraggable />
      <DemoScrolling />
    </div>
  )
}

// ========== 4. glass-edge-cases ==========

function ColorBg({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff)',
        }}
      />
      <div className="absolute inset-0">
        <div className="absolute top-2 left-3 text-sm font-bold text-white/80">Test Background</div>
        <div className="absolute top-1/3 left-1/4 h-12 w-12 rounded-full bg-white/30" />
        <div className="absolute right-1/3 bottom-1/4 h-8 w-16 rounded bg-black/20" />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

function BorderRadiusTest() {
  return (
    <DocSection title="border-radius + backdrop-filter">
      <p className="mb-3 text-xs text-fg-muted">
        Does the blur respect border-radius? Test with circle, pill, triangle (clip-path), and
        custom clip-path shapes.
      </p>
      <ColorBg>
        <div className="flex flex-wrap items-center gap-4 p-6">
          <div className="text-center">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20"
              style={{ backdropFilter: 'blur(20px) saturate(180%)', background: 'rgba(255,255,255,0.12)' }}
            >
              <span className="text-[9px] font-bold text-white">Circle</span>
            </div>
            <Result status="works" text="Perfect" />
          </div>
          <div className="text-center">
            <div
              className="flex h-10 w-32 items-center justify-center rounded-full border border-white/20"
              style={{ backdropFilter: 'blur(20px) saturate(180%)', background: 'rgba(255,255,255,0.12)' }}
            >
              <span className="text-[9px] font-bold text-white">Pill</span>
            </div>
            <Result status="works" text="Perfect" />
          </div>
          <div className="text-center">
            <div
              className="flex h-20 w-20 items-center justify-center"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                background: 'rgba(255,255,255,0.15)',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              }}
            >
              <span className="mt-6 text-[9px] font-bold text-white">Tri</span>
            </div>
            <Result status="works" text="Clip-path works" />
          </div>
          <div className="text-center">
            <div
              className="flex h-20 w-20 items-center justify-center"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                background: 'rgba(255,255,255,0.15)',
                clipPath:
                  'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              }}
            >
              <span className="text-[9px] font-bold text-white">Star</span>
            </div>
            <Result status="works" text="Complex clip" />
          </div>
        </div>
      </ColorBg>
      <p className="mt-2 text-[10px] text-fg-muted">
        All shapes work correctly. backdrop-filter respects both border-radius and clip-path --
        the blur is only rendered within the clipped/rounded area.
      </p>
    </DocSection>
  )
}

function OverflowTest() {
  return (
    <DocSection title="overflow: hidden + backdrop-filter">
      <p className="mb-3 text-xs text-fg-muted">
        A glass div with overflow:hidden that has content extending beyond its bounds. Does the
        blur get clipped along with the content?
      </p>
      <ColorBg>
        <div className="flex gap-6 p-6">
          <div className="text-center">
            <div className="text-[10px] text-white/50">overflow: hidden</div>
            <div
              className="mt-1 h-24 w-32 overflow-hidden rounded-xl border border-white/20"
              style={{ backdropFilter: 'blur(20px) saturate(180%)', background: 'rgba(255,255,255,0.12)' }}
            >
              <div className="p-2 text-[9px] text-white">
                This text is very long and will overflow. The glass blur respects overflow:hidden
                -- content and blur both clip at the boundary. No leak of blurred pixels beyond
                the rounded corners.
              </div>
            </div>
            <Result status="works" text="Clips correctly" />
          </div>
          <div className="text-center">
            <div className="text-[10px] text-white/50">overflow: visible</div>
            <div
              className="mt-1 h-24 w-32 overflow-visible rounded-xl border border-white/20"
              style={{ backdropFilter: 'blur(20px) saturate(180%)', background: 'rgba(255,255,255,0.12)' }}
            >
              <div className="p-2 text-[9px] text-white">
                This text overflows visibly. Notice the blur does NOT extend beyond the element
                bounds -- it only covers the element's box even with visible overflow.
              </div>
            </div>
            <Result status="works" text="Blur stays in bounds" />
          </div>
        </div>
      </ColorBg>
    </DocSection>
  )
}

function TransformTest() {
  return (
    <DocSection title="CSS Transforms + backdrop-filter">
      <p className="mb-3 text-xs text-fg-muted">
        Testing different CSS transforms: translateX, scale, rotate, skew, perspective. Which
        ones work correctly with backdrop-filter?
      </p>
      <ColorBg>
        <div className="grid grid-cols-5 gap-4 p-6">
          {[
            { label: 'translateX(20px)', transform: 'translateX(20px)' },
            { label: 'scale(0.8)', transform: 'scale(0.8)' },
            { label: 'rotate(15deg)', transform: 'rotate(15deg)' },
            { label: 'skewX(10deg)', transform: 'skewX(10deg)' },
            { label: 'perspective + rotateY', transform: 'perspective(200px) rotateY(15deg)' },
          ].map((t) => (
            <div className="text-center" key={t.label}>
              <div
                className="mx-auto flex h-16 w-20 items-center justify-center rounded-lg border border-white/20"
                style={{
                  backdropFilter: 'blur(16px) saturate(180%)',
                  background: 'rgba(255,255,255,0.12)',
                  transform: t.transform,
                }}
              >
                <span className="text-[8px] font-bold text-white">Glass</span>
              </div>
              <div className="mt-2 text-[8px] text-white/50">{t.label}</div>
              <Result status="works" text="OK" />
            </div>
          ))}
        </div>
      </ColorBg>
      <p className="mt-2 text-[10px] text-fg-muted">
        All transforms work with backdrop-filter in modern browsers. The blur region follows the
        transformed bounding box.
      </p>
    </DocSection>
  )
}

function ZIndexTest() {
  return (
    <DocSection title="z-index Stacking">
      <p className="mb-3 text-xs text-fg-muted">
        Glass elements with different z-index values. Does z-index affect which elements get
        blurred? Answer: yes -- a glass element only blurs what is BEHIND it in the stacking
        context.
      </p>
      <ColorBg>
        <div className="relative h-40 p-6">
          <div
            className="absolute top-4 left-4 flex h-28 w-36 items-end rounded-xl border border-white/20 p-2"
            style={{
              backdropFilter: 'blur(16px) saturate(180%)',
              background: 'rgba(255,255,255,0.12)',
              zIndex: 10,
            }}
          >
            <span className="text-[9px] font-bold text-white">z-index: 10</span>
          </div>
          <div
            className="absolute top-10 left-20 flex h-28 w-36 items-end rounded-xl border border-blue-300/30 p-2"
            style={{
              backdropFilter: 'blur(16px) saturate(180%)',
              background: 'rgba(100,150,255,0.12)',
              zIndex: 20,
            }}
          >
            <span className="text-[9px] font-bold text-white">z-index: 20</span>
          </div>
          <div
            className="absolute top-16 left-36 flex h-28 w-36 items-end rounded-xl border border-green-300/30 p-2"
            style={{
              backdropFilter: 'blur(16px) saturate(180%)',
              background: 'rgba(100,255,150,0.12)',
              zIndex: 30,
            }}
          >
            <span className="text-[9px] font-bold text-white">z-index: 30</span>
          </div>
        </div>
      </ColorBg>
      <p className="mt-2 text-[10px] text-fg-muted">
        Observation: z-index:30 blurs z-index:20 (which already blurs z-index:10, which blurs
        the background). Each layer only sees what is below it in the stacking order.
      </p>
    </DocSection>
  )
}

function WillChangeTest() {
  return (
    <DocSection title="will-change and GPU Promotion">
      <p className="mb-3 text-xs text-fg-muted">
        Comparing glass with and without will-change: transform. The will-change property
        promotes the element to its own GPU layer, which can improve animation performance but
        increases memory usage.
      </p>
      <ColorBg>
        <div className="flex gap-6 p-6">
          <div className="text-center">
            <div
              className="flex h-20 w-32 items-center justify-center rounded-xl border border-white/20"
              style={{ backdropFilter: 'blur(20px) saturate(180%)', background: 'rgba(255,255,255,0.12)' }}
            >
              <span className="text-[9px] font-bold text-white">Normal</span>
            </div>
            <div className="mt-1 text-[9px] text-white/40">no will-change</div>
          </div>
          <div className="text-center">
            <div
              className="flex h-20 w-32 items-center justify-center rounded-xl border border-white/20"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                background: 'rgba(255,255,255,0.12)',
                willChange: 'transform',
              }}
            >
              <span className="text-[9px] font-bold text-white">GPU Layer</span>
            </div>
            <div className="mt-1 text-[9px] text-white/40">will-change: transform</div>
          </div>
        </div>
      </ColorBg>
      <p className="mt-2 text-[10px] text-fg-muted">
        Visual result is identical. will-change does not affect the blur appearance -- it only
        hints the browser to pre-allocate a compositing layer. Use it sparingly on elements that
        will be animated.
      </p>
    </DocSection>
  )
}

function AnimatedBlurTest() {
  const [animating, setAnimating] = useState(false)

  return (
    <DocSection title="Animated backdrop-filter">
      <p className="mb-3 text-xs text-fg-muted">
        Can you smoothly animate the blur value from 0px to 40px? Click the button to toggle.
        CSS transitions on backdrop-filter work in modern browsers but may not be
        GPU-accelerated.
      </p>
      <ColorBg>
        <div className="flex items-center gap-6 p-6">
          <div
            className="flex h-24 w-40 items-center justify-center rounded-xl border border-white/20"
            style={{
              backdropFilter: animating ? 'blur(40px) saturate(200%)' : 'blur(0px) saturate(100%)',
              background: animating ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
              transition: 'backdrop-filter 0.8s ease, background 0.8s ease',
            }}
          >
            <span className="text-[9px] font-bold text-white">
              {animating ? 'blur(40px)' : 'blur(0px)'}
            </span>
          </div>
          <button
            className="rounded-lg bg-white/20 px-4 py-2 text-xs font-medium text-white hover:bg-white/30"
            onClick={() => setAnimating((prev) => !prev)}
          >
            {animating ? 'Remove Blur' : 'Apply Blur'}
          </button>
        </div>
      </ColorBg>
      <p className="mt-2 text-[10px] text-fg-muted">
        Note: CSS transition on backdrop-filter may not animate smoothly in all browsers.
        Chrome/Safari handle it well. Firefox may snap rather than interpolate.
      </p>
      <div className="mt-1">
        <Result status="partial" text="Browser-dependent smoothness" />
      </div>
    </DocSection>
  )
}

function GlassEdgeCasesStage() {
  return (
    <div>
      <div className="text-lg font-bold text-fg">Edge Cases & Gotchas</div>
      <p className="mt-1 text-sm text-fg-muted">
        Testing scenarios that might break or behave unexpectedly with backdrop-filter and glass
        effects.
      </p>
      <BorderRadiusTest />
      <OverflowTest />
      <TransformTest />
      <ZIndexTest />
      <WillChangeTest />
      <AnimatedBlurTest />
    </div>
  )
}

// ========== 5. glass-dark-light ==========

function LightGlassBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 25%, #ddd6fe 50%, #e0e7ff 75%, #bfdbfe 100%)',
        }}
      />
      <div className="absolute inset-0 opacity-50">
        <div
          className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }}
        />
        <div
          className="absolute right-1/4 bottom-1/3 h-24 w-24 rounded-full"
          style={{ background: 'radial-gradient(circle, #f472b6, transparent)' }}
        />
      </div>
      <div className="relative p-6">{children}</div>
    </div>
  )
}

function DarkGlassBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #312e81 50%, #1e293b 75%, #0f172a 100%)',
        }}
      />
      <div className="absolute inset-0 opacity-50">
        <div
          className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
        />
        <div
          className="absolute right-1/4 bottom-1/3 h-24 w-24 rounded-full"
          style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }}
        />
      </div>
      <div className="relative p-6">{children}</div>
    </div>
  )
}

const rgbaValues = [
  { label: 'Background', light: 'rgba(255, 255, 255, 0.6)', dark: 'rgba(15, 23, 42, 0.6)' },
  { label: 'Border', light: 'rgba(0, 0, 0, 0.08)', dark: 'rgba(255, 255, 255, 0.08)' },
  { label: 'Text primary', light: 'rgba(15, 23, 42, 1)', dark: 'rgba(248, 250, 252, 1)' },
  { label: 'Text secondary', light: 'rgba(15, 23, 42, 0.6)', dark: 'rgba(248, 250, 252, 0.6)' },
  { label: 'Hover state', light: 'rgba(255, 255, 255, 0.8)', dark: 'rgba(30, 41, 59, 0.7)' },
]

const readabilityTips = [
  { title: 'Use high-contrast text', detail: 'White text on dark glass, dark text on light glass. Avoid medium-gray text on any glass.' },
  { title: 'Increase font weight', detail: 'Use font-medium (500) or font-semibold (600) on glass surfaces. Regular weight (400) can be hard to read.' },
  { title: 'Add text shadow for dark themes', detail: 'Subtle text-shadow: 0 1px 2px rgba(0,0,0,0.3) improves readability on noisy backgrounds.' },
  { title: 'Maintain sufficient blur', detail: 'At least 12-16px blur for text readability. Small blur (8px) shows too much background detail.' },
  { title: 'Avoid glass over user-generated content', detail: 'Unpredictable images/colors behind glass can create contrast issues. Use glass over controlled backgrounds.' },
]

function GlassDarkLightStage() {
  const cardContent = (
    <>
      <div className="text-sm font-medium">Glass Card</div>
      <div className="mt-1 text-xs opacity-60">
        Background content visible through frosted surface
      </div>
      <div className="mt-3 flex gap-2">
        <InlineGlassButton size="sm">Action</InlineGlassButton>
        <InlineGlassButton size="sm" variant="accent">Primary</InlineGlassButton>
      </div>
    </>
  )

  return (
    <div>
      <div className="text-lg font-bold text-fg">Dark vs Light Glass</div>
      <p className="mt-1 text-sm text-fg-muted">
        Compare glass effect in both color modes. Shows rgba value differences, contrast
        considerations, and text readability best practices.
      </p>

      <DocSection title="Side-by-side comparison" columns={2}>
        <DemoCard title="Light glass" description="light background palette">
          <LightGlassBg>
            <div className="space-y-3">
              <InlineGlassPanel className="rounded-lg text-slate-800" padding="sm">
                <div className="text-xs font-medium">Glass Navbar</div>
              </InlineGlassPanel>
              <InlineGlassCard className="p-4 text-slate-800">{cardContent}</InlineGlassCard>
            </div>
          </LightGlassBg>
        </DemoCard>
        <DemoCard title="Dark glass" description="dark background palette">
          <DarkGlassBg>
            <div className="space-y-3">
              <InlineGlassPanel className="rounded-lg text-white" padding="sm">
                <div className="text-xs font-medium">Glass Navbar</div>
              </InlineGlassPanel>
              <InlineGlassCard className="p-4 text-white">{cardContent}</InlineGlassCard>
            </div>
          </DarkGlassBg>
        </DemoCard>
      </DocSection>

      <DocSection title="RGBA value differences" columns={1}>
        <DocTable
          headers={['Property', 'Light', 'Dark']}
          rows={rgbaValues.map((r) => [r.label, r.light, r.dark])}
        />
      </DocSection>

      <DocSection title="Text readability best practices" columns={1}>
        <DemoCard title="Readability guidelines" description="ensuring text is legible on glass surfaces">
          <div className="space-y-2">
            {readabilityTips.map((tip) => (
              <div className="rounded-lg border border-border/50 p-3" key={tip.title}>
                <div className="text-xs font-medium text-fg">{tip.title}</div>
                <div className="mt-1 text-[11px] text-fg-muted">{tip.detail}</div>
              </div>
            ))}
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Blur on light vs dark" columns={2}>
        {([8, 20, 40] as const).map((blur) => (
          <DemoCard key={`light-${blur}`} title={`Light -- ${blur}px blur`}>
            <LightGlassBg>
              <InlineGlassCard blur={blur} className="p-4 text-slate-800">
                <div className="text-xs font-medium">Blur: {blur}px</div>
                <div className="mt-1 text-[11px] opacity-60">Text on light glass background</div>
              </InlineGlassCard>
            </LightGlassBg>
          </DemoCard>
        ))}
        {([8, 20, 40] as const).map((blur) => (
          <DemoCard key={`dark-${blur}`} title={`Dark -- ${blur}px blur`}>
            <DarkGlassBg>
              <InlineGlassCard blur={blur} className="p-4 text-white">
                <div className="text-xs font-medium">Blur: {blur}px</div>
                <div className="mt-1 text-[11px] opacity-60">Text on dark glass background</div>
              </InlineGlassCard>
            </DarkGlassBg>
          </DemoCard>
        ))}
      </DocSection>
    </div>
  )
}

// ========== 6. glass-fallback ==========

function GradientBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        }}
      />
      <div className="relative p-6">{children}</div>
    </div>
  )
}

function SideBySideDemo() {
  const [forceNoBlur, setForceNoBlur] = useState(false)

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-xs text-fg-muted">
        <input
          checked={forceNoBlur}
          className="accent-accent"
          onChange={(e) => setForceNoBlur(e.target.checked)}
          type="checkbox"
        />
        Simulate no backdrop-filter support
      </label>
      <div className="grid grid-cols-2 gap-4">
        <DemoCard title="Glass effect (supported)">
          <GradientBg>
            <InlineGlassCard className="p-4">
              <div className="text-sm font-medium text-white">Glass Card</div>
              <div className="mt-1 text-xs text-white/60">
                backdrop-filter: blur(20px) saturate(180%)
              </div>
            </InlineGlassCard>
          </GradientBg>
        </DemoCard>
        <DemoCard title="Fallback (unsupported)">
          <GradientBg>
            <div
              className={`rounded-xl border border-border/20 p-4 ${
                forceNoBlur ? 'bg-slate-900/90' : 'bg-bg/60 glass dark:bg-bg/40'
              }`}
            >
              <div className="text-sm font-medium text-white">Fallback Card</div>
              <div className="mt-1 text-xs text-white/60">
                {forceNoBlur
                  ? 'background: solid color at 90% opacity'
                  : 'same as glass -- toggle checkbox to see fallback'}
              </div>
            </div>
          </GradientBg>
        </DemoCard>
      </div>
    </div>
  )
}

function FeatureDetectionDemo() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-bg-secondary/30 p-4">
        <div className="text-xs font-semibold text-fg">CSS @supports detection</div>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-bg-tertiary/60 p-4 text-xs leading-relaxed text-fg-muted">
          {`@supports (backdrop-filter: blur(1px)) or
         (-webkit-backdrop-filter: blur(1px)) {
  .glass {
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    background: rgba(255, 255, 255, 0.1);
  }
}

@supports not ((backdrop-filter: blur(1px)) or
               (-webkit-backdrop-filter: blur(1px))) {
  .glass {
    /* fallback: solid semi-transparent background */
    background: rgba(15, 23, 42, 0.9);
  }
}`}
        </pre>
      </div>
      <div className="rounded-lg border border-border bg-bg-secondary/30 p-4">
        <div className="text-xs font-semibold text-fg">JavaScript runtime check</div>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-bg-tertiary/60 p-4 text-xs leading-relaxed text-fg-muted">
          {`const supportsBackdropFilter =
  CSS.supports('backdrop-filter', 'blur(1px)') ||
  CSS.supports('-webkit-backdrop-filter', 'blur(1px)')

// use in React
const glassClass = supportsBackdropFilter
  ? 'glass bg-bg/60'
  : 'bg-surface/90'`}
        </pre>
      </div>
    </div>
  )
}

function GracefulDegradationDemo() {
  return (
    <GradientBg>
      <div className="space-y-3">
        {[
          { strategy: 'strategy 1: opacity fallback', desc: 'Use high-opacity solid background (90%+) when blur is unavailable. Content remains readable.' },
          { strategy: 'strategy 2: prefers-reduced-transparency', desc: 'Respect user accessibility preference. Some users prefer solid backgrounds for readability.' },
          { strategy: 'strategy 3: progressive enhancement', desc: 'Start with solid background. Layer glass effect on top via @supports. Works everywhere, enhanced where possible.' },
        ].map((item) => (
          <div className="rounded-lg border border-white/10 p-3" key={item.strategy}>
            <div className="text-[10px] font-medium text-white/40 uppercase">{item.strategy}</div>
            <div className="mt-2 text-xs text-white/70">{item.desc}</div>
          </div>
        ))}
      </div>
    </GradientBg>
  )
}

function GlassFallbackStage() {
  return (
    <div>
      <div className="text-lg font-bold text-fg">Fallback Behavior</div>
      <p className="mt-1 text-sm text-fg-muted">
        What happens when backdrop-filter is not supported. Feature detection, graceful
        degradation, and accessibility considerations.
      </p>

      <DocSection title="Side-by-side comparison" columns={1}>
        <SideBySideDemo />
      </DocSection>

      <DocSection title="CSS @supports feature detection" columns={1}>
        <DemoCard title="Feature detection patterns" description="CSS and JS approaches">
          <FeatureDetectionDemo />
        </DemoCard>
      </DocSection>

      <DocSection title="Graceful degradation strategies" columns={1}>
        <DemoCard title="Degradation strategies" description="three approaches for unsupported browsers">
          <GracefulDegradationDemo />
        </DemoCard>
      </DocSection>

      <DocSection title="Reduced transparency" columns={1}>
        <DemoCard title="prefers-reduced-transparency media query" description="respect user accessibility preferences">
          <div className="rounded-lg border border-border bg-bg-secondary/30 p-4">
            <pre className="overflow-x-auto text-xs leading-relaxed text-fg-muted">
              {`@media (prefers-reduced-transparency: reduce) {
  .glass,
  .glass-sm,
  .glass-lg {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: var(--golia-surface);
    opacity: 0.95;
  }
}`}
            </pre>
          </div>
        </DemoCard>
      </DocSection>
    </div>
  )
}

// ========== 7. glass-materials ==========

function GlassMaterialsBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #667eea 0%, #f97316 25%, #22c55e 50%, #db2777 75%, #2563eb 100%)',
        }}
      />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-14 w-14 rounded-full bg-white/25" />
        <div className="absolute right-1/4 bottom-1/4 h-10 w-10 rounded-lg bg-black/15" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            className="absolute h-px bg-white/15"
            key={i}
            style={{ left: 0, right: 0, top: `${20 + i * 20}%` }}
          />
        ))}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

const noiseSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E`

function AcrylicDemo() {
  return (
    <GlassMaterialsBg>
      <div className="grid grid-cols-2 gap-4 p-6">
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-full rounded-xl border border-white/20 p-4"
            style={{ backdropFilter: 'blur(30px) saturate(125%)', background: 'rgba(255, 255, 255, 0.08)' }}
          >
            <div className="text-sm font-semibold text-white">Plain Blur</div>
            <div className="mt-1 text-xs text-white/60">blur(30px) only</div>
          </div>
          <span className="text-xs text-fg-muted">without noise</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div
            className="relative w-full overflow-hidden rounded-xl border border-white/20 p-4"
            style={{ backdropFilter: 'blur(30px) saturate(125%)', background: 'rgba(255, 255, 255, 0.08)' }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `url("${noiseSvg}")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '200px 200px',
                opacity: 0.4,
              }}
            />
            <div className="relative text-sm font-semibold text-white">Acrylic</div>
            <div className="relative mt-1 text-xs text-white/60">blur + noise texture</div>
          </div>
          <span className="text-xs text-fg-muted">with feTurbulence noise</span>
        </div>
      </div>
    </GlassMaterialsBg>
  )
}

const wallpaperStyle: React.CSSProperties = {
  background:
    'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #e94560 100%)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
}

function MicaDemo() {
  return (
    <div className="rounded-xl p-6" style={wallpaperStyle}>
      <div className="grid grid-cols-2 gap-4">
        {[
          { blur: 80, label: 'Standard Mica', saturation: 80 },
          { blur: 120, label: 'Mica Alt', saturation: 60 },
        ].map((m) => (
          <div className="relative overflow-hidden rounded-xl border border-white/10" key={m.label}>
            <div className="absolute inset-0" style={{ ...wallpaperStyle, filter: `blur(${m.blur}px) saturate(${m.saturation}%)` }} />
            <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <div className="relative p-4">
              <div className="text-sm font-semibold text-white">{m.label}</div>
              <div className="mt-1 text-xs text-white/50">blur({m.blur}px) saturate({m.saturation}%)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VibrancyDemo() {
  return (
    <GlassMaterialsBg>
      <div className="grid grid-cols-2 gap-4 p-6">
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-full rounded-xl border border-white/15 p-4"
            style={{ backdropFilter: 'blur(40px) saturate(60%) brightness(80%)', background: 'rgba(0, 0, 0, 0.2)' }}
          >
            <div className="text-sm font-semibold text-white/80">Behind Window</div>
            <div className="mt-1 text-xs text-white/40">heavy blur, desaturated</div>
          </div>
          <span className="text-xs text-fg-muted">saturate(60%)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-full rounded-xl border border-white/20 p-4"
            style={{ backdropFilter: 'blur(20px) saturate(180%) brightness(110%)', background: 'rgba(255, 255, 255, 0.06)' }}
          >
            <div className="text-sm font-semibold text-white">Within Window</div>
            <div className="mt-1 text-xs text-white/60">light blur, saturated</div>
          </div>
          <span className="text-xs text-fg-muted">saturate(180%)</span>
        </div>
      </div>
    </GlassMaterialsBg>
  )
}

function GelButton({ children, color = '#8b5cf6' }: { children: React.ReactNode, color?: string }) {
  const [pressed, setPressed] = useState(false)

  return (
    <button
      className="relative overflow-hidden px-6 py-3 font-medium text-white select-none"
      onMouseDown={() => setPressed(true)}
      onMouseLeave={() => setPressed(false)}
      onMouseUp={() => setPressed(false)}
      style={{
        background: `radial-gradient(ellipse at 30% 20%, ${color}cc, ${color})`,
        borderRadius: pressed ? '16px 16px 20px 20px' : '16px',
        boxShadow: pressed
          ? `0 2px 8px ${color}40, inset 0 -1px 2px rgba(0,0,0,0.15)`
          : `0 6px 20px ${color}30, inset 0 -2px 4px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.3)`,
        transform: pressed ? 'scale(0.95) translateY(2px)' : 'scale(1)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <div
        className="pointer-events-none absolute top-0 right-0 left-0"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 60%)',
          borderRadius: 'inherit',
          height: '60%',
          opacity: pressed ? 0.2 : 1,
          transition: 'opacity 0.2s',
        }}
      />
      <span className="relative">{children}</span>
    </button>
  )
}

function GelDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 rounded-xl bg-black/5 p-8 dark:bg-white/5">
      <GelButton color="#8b5cf6">Violet</GelButton>
      <GelButton color="#06b6d4">Cyan</GelButton>
      <GelButton color="#f43f5e">Rose</GelButton>
      <GelButton color="#f59e0b">Amber</GelButton>
      <p className="w-full text-center text-xs text-fg-muted">
        press and hold -- spring easing cubic-bezier(0.34, 1.56, 0.64, 1)
      </p>
    </div>
  )
}

function CrystalDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [angle, setAngle] = useState(135)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect === undefined) return
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setAngle(Math.atan2(y, x) * (180 / Math.PI) + 180)
  }, [])

  return (
    <div className="flex items-center justify-center rounded-xl bg-black/90 p-8">
      <div
        className="rounded-2xl p-px"
        onMouseMove={handleMouseMove}
        ref={ref}
        style={{
          background: `conic-gradient(from ${angle}deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff, #ff0088, #ff0000)`,
        }}
      >
        <div className="relative overflow-hidden rounded-[15px] bg-black/90 px-8 py-6">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background: `conic-gradient(from ${angle}deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff, #ff0088, #ff0000)`,
              filter: 'blur(20px)',
              mixBlendMode: 'screen',
            }}
          />
          <div className="relative text-center">
            <div className="text-lg font-bold text-white">Crystal</div>
            <div className="mt-1 text-xs text-white/50">move mouse over the card</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FrostedPatternsDemo() {
  const variations = [
    {
      group: 'Tint',
      items: [
        { label: 'White 5%', style: { background: 'rgba(255,255,255,0.05)' } },
        { label: 'White 15%', style: { background: 'rgba(255,255,255,0.15)' } },
        { label: 'Blue 10%', style: { background: 'rgba(59,130,246,0.1)' } },
        { label: 'Rose 10%', style: { background: 'rgba(244,63,94,0.1)' } },
      ],
    },
    {
      group: 'Border',
      items: [
        { label: 'None', style: { border: 'none' } },
        { label: 'Subtle', style: { border: '1px solid rgba(255,255,255,0.1)' } },
        { label: 'Medium', style: { border: '1px solid rgba(255,255,255,0.25)' } },
        { label: 'Glow', style: { border: '1px solid rgba(255,255,255,0.4)' } },
      ],
    },
    {
      group: 'Shadow',
      items: [
        { label: 'None', style: { boxShadow: 'none' } },
        { label: 'Soft', style: { boxShadow: '0 4px 16px rgba(0,0,0,0.1)' } },
        { label: 'Medium', style: { boxShadow: '0 8px 32px rgba(0,0,0,0.2)' } },
        { label: 'Inset', style: { boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)' } },
      ],
    },
    {
      group: 'Corner',
      items: [
        { label: '4px', style: { borderRadius: '4px' } },
        { label: '8px', style: { borderRadius: '8px' } },
        { label: '16px', style: { borderRadius: '16px' } },
        { label: 'Full', style: { borderRadius: '9999px' } },
      ],
    },
  ]

  return (
    <GlassMaterialsBg>
      <div className="grid grid-cols-4 gap-4 p-6">
        {variations.map((group) => (
          <div className="flex flex-col gap-2" key={group.group}>
            <div className="text-center text-xs font-semibold text-white/70">{group.group}</div>
            {group.items.map((item) => (
              <div
                className="flex items-center justify-center p-3"
                key={item.label}
                style={{
                  backdropFilter: 'blur(16px)',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  ...item.style,
                }}
              >
                <span className="text-xs text-white/80">{item.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </GlassMaterialsBg>
  )
}

function CompositeDemo() {
  const modes: Array<{ mode: string, note: string }> = [
    { mode: 'normal', note: 'default' },
    { mode: 'multiply', note: 'darkens' },
    { mode: 'screen', note: 'lightens' },
    { mode: 'overlay', note: 'contrast' },
    { mode: 'soft-light', note: 'subtle' },
    { mode: 'difference', note: 'inverts' },
  ]

  return (
    <GlassMaterialsBg>
      <div className="grid grid-cols-3 gap-3 p-6">
        {modes.map((m) => (
          <div
            className="overflow-hidden rounded-xl border border-white/15"
            key={m.mode}
            style={{ backdropFilter: 'blur(16px) saturate(120%)', background: 'rgba(255,255,255,0.08)' }}
          >
            <div className="p-3">
              <div className="text-sm font-semibold text-white" style={{ mixBlendMode: m.mode as React.CSSProperties['mixBlendMode'] }}>
                {m.mode}
              </div>
              <div className="mt-0.5 text-xs text-white/60" style={{ mixBlendMode: m.mode as React.CSSProperties['mixBlendMode'] }}>
                {m.note}
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassMaterialsBg>
  )
}

function GlassMaterialsStage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="text-lg font-bold text-fg">Glass Materials</div>
        <p className="mt-1 text-sm text-fg-muted">
          7 material studies -- from platform-native glass to creative effects
        </p>
      </div>

      <DocSection title="Acrylic">
        <p className="mb-3 text-xs text-fg-muted">
          Windows Acrylic -- frosted glass with SVG feTurbulence noise texture overlay for
          organic grain.
        </p>
        <AcrylicDemo />
      </DocSection>

      <DocSection title="Mica">
        <p className="mb-3 text-xs text-fg-muted">
          Windows Mica -- wallpaper shows through via background-attachment: fixed, creating a
          shared environmental tint.
        </p>
        <MicaDemo />
      </DocSection>

      <DocSection title="Vibrancy">
        <p className="mb-3 text-xs text-fg-muted">
          macOS Vibrancy -- color enhancement via saturation and brightness adjustments on
          backdrop-filter.
        </p>
        <VibrancyDemo />
      </DocSection>

      <DocSection title="Gel">
        <p className="mb-3 text-xs text-fg-muted">
          Soft elastic surfaces with no blur -- pure CSS radial gradients, spring easing, and
          scale transforms on press.
        </p>
        <GelDemo />
      </DocSection>

      <DocSection title="Crystal">
        <p className="mb-3 text-xs text-fg-muted">
          Prismatic holographic refraction -- conic-gradient border that follows the mouse with
          screen blend mode RGB glow.
        </p>
        <CrystalDemo />
      </DocSection>

      <DocSection title="Frosted Patterns">
        <p className="mb-3 text-xs text-fg-muted">
          Systematic frosted glass variations -- tint opacity, border strength, shadow depth, and
          corner radius compared side by side.
        </p>
        <FrostedPatternsDemo />
      </DocSection>

      <DocSection title="Composite">
        <p className="mb-3 text-xs text-fg-muted">
          Blend mode studies on glass -- how multiply, screen, overlay, and other modes composite
          child content over blurred backgrounds.
        </p>
        <CompositeDemo />
      </DocSection>
    </div>
  )
}

// ========== 8. glass-physics ==========

function PhysicsBg({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative min-h-[200px] overflow-hidden rounded-lg border border-border"
      style={{
        background:
          'linear-gradient(135deg, #6366f1 0%, #8b5cf6 25%, #d946ef 50%, #f43f5e 75%, #fb923c 100%)',
      }}
    >
      {children}
    </div>
  )
}

const glassStyle = (blur: number): React.CSSProperties => ({
  backdropFilter: `blur(${blur}px)`,
  background: 'rgba(255, 255, 255, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  borderRadius: 12,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  color: '#fff',
  fontSize: 13,
  fontWeight: 600,
  padding: '16px 24px',
  userSelect: 'none' as const,
})

function DragCard({ blur, label, startX, startY }: {
  blur: number
  label: string
  startX: number
  startY: number
}) {
  const [pos, setPos] = useState({ x: startX, y: startY })
  const dragRef = useRef({ active: false, offsetX: 0, offsetY: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      dragRef.current = {
        active: true,
        offsetX: e.clientX - pos.x,
        offsetY: e.clientY - pos.y,
      }

      const onMove = (ev: MouseEvent) => {
        if (!dragRef.current.active) return
        setPos({
          x: ev.clientX - dragRef.current.offsetX,
          y: ev.clientY - dragRef.current.offsetY,
        })
      }

      const onUp = () => {
        dragRef.current.active = false
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    },
    [pos.x, pos.y],
  )

  return (
    <PhysicsBg>
      <div
        className="absolute cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        ref={containerRef}
        style={{ ...glassStyle(blur), left: pos.x, top: pos.y }}
      >
        {label}
      </div>
    </PhysicsBg>
  )
}

function DragDemo() {
  const cards = [
    { blur: 4, label: 'blur 4px', startX: 30, startY: 30 },
    { blur: 12, label: 'blur 12px', startX: 160, startY: 60 },
    { blur: 24, label: 'blur 24px', startX: 80, startY: 120 },
  ]

  return (
    <div className="flex flex-col gap-2">
      {cards.map((card) => (
        <DragCard blur={card.blur} key={card.label} label={card.label} startX={card.startX} startY={card.startY} />
      ))}
    </div>
  )
}

function InertiaDemo() {
  const [pos, setPos] = useState({ x: 120, y: 80 })
  const velRef = useRef({ x: 0, y: 0 })
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0, offsetX: 0, offsetY: 0 })
  const rafRef = useRef(0)

  const animate = useCallback(() => {
    if (dragRef.current.active) return
    const friction = 0.95
    velRef.current = {
      x: velRef.current.x * friction,
      y: velRef.current.y * friction,
    }

    if (Math.abs(velRef.current.x) < 0.1 && Math.abs(velRef.current.y) < 0.1) return

    setPos((p) => ({
      x: p.x + velRef.current.x,
      y: p.y + velRef.current.y,
    }))

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      cancelAnimationFrame(rafRef.current)
      dragRef.current = {
        active: true,
        lastX: e.clientX,
        lastY: e.clientY,
        offsetX: e.clientX - pos.x,
        offsetY: e.clientY - pos.y,
      }

      const onMove = (ev: MouseEvent) => {
        if (!dragRef.current.active) return
        velRef.current = {
          x: ev.clientX - dragRef.current.lastX,
          y: ev.clientY - dragRef.current.lastY,
        }
        dragRef.current.lastX = ev.clientX
        dragRef.current.lastY = ev.clientY
        setPos({
          x: ev.clientX - dragRef.current.offsetX,
          y: ev.clientY - dragRef.current.offsetY,
        })
      }

      const onUp = () => {
        dragRef.current.active = false
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
        rafRef.current = requestAnimationFrame(animate)
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    },
    [pos.x, pos.y, animate],
  )

  return (
    <PhysicsBg>
      <div
        className="absolute cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        style={{ ...glassStyle(12), left: pos.x, top: pos.y }}
      >
        drag & release
      </div>
    </PhysicsBg>
  )
}

function SpringCard({ label, tension }: { label: string, tension: number }) {
  const [pos, setPos] = useState({ x: 120, y: 70 })
  const velRef = useRef({ x: 0, y: 0 })
  const dragRef = useRef({ active: false, offsetX: 0, offsetY: 0 })
  const rafRef = useRef(0)
  const originRef = useRef({ x: 120, y: 70 })

  const animate = useCallback(() => {
    const friction = 12
    const target = originRef.current

    setPos((p) => {
      const fx = ((target.x - p.x) * tension) / 1000 - (velRef.current.x * friction) / 1000
      const fy = ((target.y - p.y) * tension) / 1000 - (velRef.current.y * friction) / 1000

      velRef.current = {
        x: velRef.current.x + fx * 16,
        y: velRef.current.y + fy * 16,
      }

      const nx = p.x + velRef.current.x * 0.016
      const ny = p.y + velRef.current.y * 0.016

      const dist = Math.abs(nx - target.x) + Math.abs(ny - target.y)
      const speed = Math.abs(velRef.current.x) + Math.abs(velRef.current.y)

      if (dist < 0.5 && speed < 0.5) return target

      return { x: nx, y: ny }
    })

    rafRef.current = requestAnimationFrame(animate)
  }, [tension])

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      cancelAnimationFrame(rafRef.current)
      velRef.current = { x: 0, y: 0 }
      dragRef.current = {
        active: true,
        offsetX: e.clientX - pos.x,
        offsetY: e.clientY - pos.y,
      }

      const onMove = (ev: MouseEvent) => {
        if (!dragRef.current.active) return
        setPos({
          x: ev.clientX - dragRef.current.offsetX,
          y: ev.clientY - dragRef.current.offsetY,
        })
      }

      const onUp = () => {
        dragRef.current.active = false
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
        rafRef.current = requestAnimationFrame(animate)
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    },
    [pos.x, pos.y, animate],
  )

  return (
    <PhysicsBg>
      <div className="absolute top-1 left-1 rounded bg-black/30 px-2 py-0.5 text-[10px] text-white/70 select-none">
        {label}
      </div>
      <div
        className="absolute cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        style={{ ...glassStyle(12), left: pos.x, top: pos.y }}
      >
        spring back
      </div>
    </PhysicsBg>
  )
}

function SpringDemo() {
  return (
    <div className="flex flex-col gap-2">
      <SpringCard label="tension: 180 (soft)" tension={180} />
      <SpringCard label="tension: 400 (stiff)" tension={400} />
      <SpringCard label="tension: 60 (gentle)" tension={60} />
    </div>
  )
}

function WaterDropDemo() {
  const drops = [
    { left: '10%', size: 40, top: '15%' },
    { left: '30%', size: 24, top: '45%' },
    { left: '55%', size: 60, top: '20%' },
    { left: '75%', size: 32, top: '55%' },
    { left: '20%', size: 80, top: '70%' },
    { left: '45%', size: 28, top: '75%' },
    { left: '85%', size: 48, top: '35%' },
    { left: '65%', size: 20, top: '85%' },
  ]

  return (
    <div className="relative h-[200px] overflow-hidden rounded-lg border border-border bg-gradient-to-br from-sky-900/80 to-indigo-900/80">
      <style>{`
        @keyframes glass-drop-fall {
          0% { transform: translateY(-10px) scale(0.8); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(6px) scale(1); opacity: 0.9; }
        }
      `}</style>
      {drops.map((d, i) => (
        <div
          key={i}
          style={{
            animation: `glass-drop-fall ${1.5 + i * 0.3}s ease-in-out infinite alternate`,
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), rgba(255,255,255,0.1) 60%, transparent 70%)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.3)',
            height: d.size,
            left: d.left,
            position: 'absolute',
            top: d.top,
            width: d.size,
          }}
        />
      ))}
    </div>
  )
}

function WaterTabDemo() {
  const tabs = ['Home', 'Search', 'Library', 'Settings']
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative flex gap-1 overflow-hidden rounded-xl p-1"
        style={{
          backdropFilter: 'blur(16px)',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <div
          className="absolute top-1 bottom-1 rounded-lg"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            left: 4 + active * 88,
            transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            width: 84,
          }}
        />
        {tabs.map((tab, i) => (
          <button
            className="relative z-10 w-[84px] rounded-lg px-4 py-2 text-xs font-medium text-white/80 transition-colors select-none hover:text-white"
            key={tab}
            onClick={() => setActive(i)}
            style={{ color: active === i ? '#fff' : undefined }}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>
      <div
        className="w-64 rounded-xl p-4 text-center text-sm text-white/70"
        style={{
          backdropFilter: 'blur(12px)',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        Active: {tabs[active]}
      </div>
    </div>
  )
}

function AnimationDemo() {
  const [shape, setShape] = useState<'circle' | 'pill' | 'square'>('circle')
  const [key, setKey] = useState(0)

  const shapeRadius = shape === 'circle' ? '50%' : shape === 'pill' ? '999px' : '12px'

  return (
    <div className="flex flex-col gap-4">
      <style>{`
        @keyframes glass-enter {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes glass-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <div className="flex items-center gap-4">
        <div key={key} style={{ ...glassStyle(16), animation: 'glass-enter 0.5s ease-out' }}>
          glass enter
        </div>
        <button
          className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20"
          onClick={() => setKey((k) => k + 1)}
          type="button"
        >
          replay
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div
          style={{
            ...glassStyle(12),
            borderRadius: shapeRadius,
            height: 80,
            transition: 'border-radius 500ms ease, width 500ms ease',
            width: shape === 'pill' ? 160 : 80,
          }}
        />
        <div className="flex gap-1">
          {(['circle', 'square', 'pill'] as const).map((s) => (
            <button
              className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-medium text-white/70 hover:bg-white/20"
              key={s}
              onClick={() => setShape(s)}
              style={{ color: shape === s ? '#fff' : undefined }}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          ...glassStyle(8),
          animation: 'glass-shimmer 2s linear infinite',
          backgroundImage:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          display: 'inline-block',
        }}
      >
        shimmer sweep
      </div>
    </div>
  )
}

function GlassPhysicsStage() {
  return (
    <div>
      <div className="text-lg font-bold text-fg">Glass Physics</div>
      <p className="mt-1 text-sm text-fg-muted">
        Interactive physics simulations and animations for glass surfaces.
      </p>

      <DocSection title="Drag">
        <p className="mb-3 text-xs text-fg-muted">
          Draggable glass cards with different blur levels over colorful gradient.
        </p>
        <DragDemo />
      </DocSection>

      <DocSection title="Inertia">
        <p className="mb-3 text-xs text-fg-muted">
          Cards continue moving after release with friction decay.
        </p>
        <InertiaDemo />
      </DocSection>

      <DocSection title="Spring">
        <p className="mb-3 text-xs text-fg-muted">
          Cards spring back to origin with configurable tension. Drag and release to see the
          effect.
        </p>
        <SpringDemo />
      </DocSection>

      <DocSection title="Water Drop">
        <p className="mb-3 text-xs text-fg-muted">
          CSS keyframe water drop animations with radial gradient glass drops.
        </p>
        <WaterDropDemo />
      </DocSection>

      <DocSection title="Water Tab">
        <p className="mb-3 text-xs text-fg-muted">
          iOS-style tab bar with spring-eased sliding indicator.
        </p>
        <div
          className="relative min-h-[160px] overflow-hidden rounded-lg border border-border"
          style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
          }}
        >
          <div className="flex h-full min-h-[160px] items-center justify-center">
            <WaterTabDemo />
          </div>
        </div>
      </DocSection>

      <DocSection title="Animation">
        <p className="mb-3 text-xs text-fg-muted">
          Glass enter/exit animations, shape morphing, and shimmer effects.
        </p>
        <PhysicsBg>
          <div className="p-4">
            <AnimationDemo />
          </div>
        </PhysicsBg>
      </DocSection>

      <DocSection title="Combined">
        <p className="text-sm text-fg-muted">
          This section serves as an overview. Each physics type above is self-contained and can
          be used independently or combined. The spring formula{' '}
          <code className="rounded bg-bg-secondary px-1 py-0.5 text-xs text-fg">
            force = (target - current) * tension - velocity * friction
          </code>{' '}
          underlies most glass motion patterns.
        </p>
      </DocSection>
    </div>
  )
}

// ---------- exported items ----------

const labItemsExt3: DevCenterItem[] = [
  // liquid glass
  {
    id: 'liquid-glass',
    label: 'Liquid Glass',
    layer: 'l-lab' as any,
    type: 'reference',
    tags: ['glass', 'blur', 'backdrop', 'frosted', 'translucent', 'ios', 'liquid'],

    stage: () => <LiquidGlassStage />,

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          overview
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p>
            iOS 26 introduced "Liquid Glass" -- translucent surfaces with dynamic blur that
            adapts to background content. These components bring that effect to the web using CSS
            backdrop-filter.
          </p>
        </div>

        <div className="text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          components
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p><span className="font-medium text-fg">GlassCard</span> -- rounded card with frosted glass effect.</p>
          <p><span className="font-medium text-fg">GlassPanel</span> -- flat panel without border radius for toolbars.</p>
          <p><span className="font-medium text-fg">GlassButton</span> -- interactive button with translucent glass background.</p>
        </div>

        <div className="text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          blur variants
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p><span className="text-accent">sm</span> -- 8px blur, 150% saturate. Subtle frosting.</p>
          <p><span className="text-accent">default</span> -- 20px blur, 180% saturate. Standard glass look.</p>
          <p><span className="text-accent">lg</span> -- 40px blur, 200% saturate. Heavy frosting.</p>
        </div>
      </div>
    ),

    code: () => `// glass card with blur variants
<GlassCard>default blur card</GlassCard>
<GlassCard blur="sm">subtle blur</GlassCard>
<GlassCard blur="lg">heavy blur</GlassCard>

// glass panel for toolbars
<GlassPanel>
  <span>Toolbar content</span>
</GlassPanel>

// glass buttons
<GlassButton>Default</GlassButton>
<GlassButton variant="accent">Accent</GlassButton>
<GlassButton size="sm">Small</GlassButton>

// CSS utilities
@utility glass {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}`,
  },

  // glass refraction
  {
    id: 'glass-refraction',
    label: 'Refraction Without Blur',
    layer: 'l-lab' as any,
    type: 'reference',
    tags: ['glass', 'refraction', 'no-blur', 'gradient', 'shadow', 'svg', 'distortion', 'water', 'technique'],

    stage: () => <GlassRefractionStage />,
  },

  // glass content vs backdrop
  {
    id: 'glass-content-vs-backdrop',
    label: 'Content vs Backdrop',
    layer: 'l-lab' as any,
    type: 'reference',
    tags: ['glass', 'backdrop-filter', 'content', 'blur', 'children', 'layers', 'behavior'],

    stage: () => <ContentVsBackdropStage />,
  },

  // glass edge cases
  {
    id: 'glass-edge-cases',
    label: 'Edge Cases',
    layer: 'l-lab' as any,
    type: 'reference',
    tags: ['glass', 'edge-case', 'border-radius', 'clip-path', 'overflow', 'transform', 'z-index', 'animation', 'behavior'],

    stage: () => <GlassEdgeCasesStage />,
  },

  // glass dark vs light
  {
    id: 'glass-dark-light',
    label: 'Dark vs Light Glass',
    layer: 'l-lab' as any,
    type: 'reference',
    tags: ['glass', 'dark', 'light', 'theme', 'contrast', 'readability', 'rgba'],

    stage: () => <GlassDarkLightStage />,

    code: () => `/* light theme glass */
.glass-light {
  backdrop-filter: blur(20px) saturate(180%);
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: rgba(15, 23, 42, 1);
}

/* dark theme glass */
.glass-dark {
  backdrop-filter: blur(20px) saturate(180%);
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(248, 250, 252, 1);
}

/* readability tips */
// use font-medium minimum on glass
<span className="font-medium text-white">readable on dark glass</span>
<span className="font-medium text-slate-800">readable on light glass</span>`,
  },

  // glass fallback
  {
    id: 'glass-fallback',
    label: 'Fallback Behavior',
    layer: 'l-lab' as any,
    type: 'reference',
    tags: ['glass', 'fallback', 'supports', 'degradation', 'accessibility', 'reduced-transparency'],

    stage: () => <GlassFallbackStage />,

    code: () => `/* CSS @supports for backdrop-filter */
@supports (backdrop-filter: blur(1px)) or
         (-webkit-backdrop-filter: blur(1px)) {
  .glass {
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    background: rgba(255, 255, 255, 0.1);
  }
}

/* fallback when not supported */
@supports not ((backdrop-filter: blur(1px)) or
               (-webkit-backdrop-filter: blur(1px))) {
  .glass {
    background: rgba(15, 23, 42, 0.9);
  }
}

/* respect reduced transparency preference */
@media (prefers-reduced-transparency: reduce) {
  .glass {
    backdrop-filter: none;
    background: var(--golia-surface);
    opacity: 0.95;
  }
}`,
  },

  // glass materials
  {
    id: 'glass-materials',
    label: 'Glass Materials',
    layer: 'l-lab' as any,
    type: 'reference',
    tags: ['glass', 'acrylic', 'mica', 'vibrancy', 'gel', 'crystal', 'frosted', 'composite', 'material'],

    stage: () => <GlassMaterialsStage />,
  },

  // glass physics
  {
    id: 'glass-physics',
    label: 'Glass Physics',
    layer: 'l-lab' as any,
    type: 'reference',
    tags: ['glass', 'drag', 'inertia', 'spring', 'physics', 'water', 'animation', 'interaction'],

    stage: () => <GlassPhysicsStage />,
  },
]

export { labItemsExt3 }
