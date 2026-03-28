import { useState } from 'react'

import { DocSection, DocTable } from '../components/demo'
import type { DevCenterItem } from '../types'

// ---------- shared ----------

// reusable glass card (inline, since GDS doesn't have GlassCard yet)
function GlassCard({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div
      className={[
        'rounded-xl border border-white/15',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        background: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      {children}
    </div>
  )
}

// rich background for blur studies
function BlurStudyBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #ff6b6b 0%, #feca57 20%, #48dbfb 40%, #ff9ff3 60%, #54a0ff 80%, #5f27cd 100%)',
        }}
      />
      <div className="absolute inset-0">
        <div className="absolute top-3 left-4 text-lg font-bold text-white/80">
          Sample Text
        </div>
        <div className="absolute right-4 bottom-3 font-mono text-xs text-white/60">
          0123456789
        </div>
        <div className="absolute top-1/4 left-1/3 h-12 w-12 rounded-full bg-white/30" />
        <div className="absolute right-1/4 bottom-1/4 h-10 w-10 rounded-lg bg-black/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="text-2xl font-bold text-white/50">GOLIA</div>
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            className="absolute h-px bg-white/30"
            key={i}
            style={{ left: 0, right: 0, top: `${12 + i * 12}%` }}
          />
        ))}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

// comparison layout
function Comparison({ children, label }: { children: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-[10px] font-medium tracking-wider text-fg-muted uppercase">
        {label}
      </div>
      {children}
    </div>
  )
}

// ---------- item 1: glass-research ----------

function GlassResearchStage() {
  return (
    <div>
      <div className="text-lg font-bold text-fg">
        Liquid Glass — iOS 26 Design Research
      </div>
      <p className="mt-1 text-sm text-fg-muted">
        Technical analysis of Apple's Liquid Glass and its Web CSS equivalent.
      </p>

      <DocSection title="What is Liquid Glass?">
        <div className="space-y-2 text-xs text-fg-muted" data-selectable>
          <p>
            iOS 26 (announced WWDC 2025) introduced{' '}
            <span className="font-medium text-fg">Liquid Glass</span> — a new
            design language replacing the flat/frosted aesthetic from iOS 7-18.
            Key characteristics:
          </p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>Translucent glass-like surfaces that reveal background content</li>
            <li>Dynamic blur that adapts to what's behind the element</li>
            <li>Subtle refraction and distortion for depth perception</li>
            <li>Enhanced color vibrancy (saturation boost) through the glass</li>
            <li>Layered depth — multiple glass surfaces at different z-levels</li>
          </ul>
        </div>
      </DocSection>

      <DocSection title="Web CSS equivalent">
        <DocTable
          headers={['iOS effect', 'CSS property', 'Value']}
          rows={[
            ['Background blur', 'backdrop-filter: blur()', '8-40px'],
            ['Color vibrancy', 'backdrop-filter: saturate()', '150-200%'],
            ['Translucent fill', 'background: rgba/hsla', '10-60% opacity'],
            ['Glass edge', 'border + border-opacity', '8-25% white'],
            ['Depth shadow', 'box-shadow', 'shadow-md/lg'],
            ['Light refraction', 'mix-blend-mode', 'overlay/soft-light'],
          ]}
        />
      </DocSection>

      <DocSection title="Browser support">
        <DocTable
          headers={['Browser', 'Version', 'Year', 'Notes']}
          rows={[
            ['Chrome', '76+', '2019', 'full support'],
            ['Safari', '9+', '2015', '-webkit- prefix required'],
            ['Firefox', '103+', '2022', 'was behind a flag until 103'],
            ['Edge', '79+', '2020', 'Chromium-based'],
          ]}
        />
      </DocSection>

      <DocSection title="Performance considerations">
        <div className="space-y-2 text-xs text-fg-muted" data-selectable>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>
              <span className="font-medium text-fg">GPU-accelerated</span> —
              backdrop-filter runs on the GPU compositor, not the CPU paint thread
            </li>
            <li>
              <span className="font-medium text-fg">Compositing cost</span> —
              each glass layer creates a new compositing surface; avoid stacking 5+ layers
            </li>
            <li>
              <span className="font-medium text-fg">Blur radius</span> — larger
              blur values (40px+) sample more pixels; 20px is a good default
            </li>
            <li>
              <span className="font-medium text-fg">Animations</span> —
              animating backdrop-filter values can be expensive; prefer opacity transitions
            </li>
            <li>
              <span className="font-medium text-fg">Mobile</span> — modern
              mobile GPUs handle glass well; test on 3-year-old devices for baseline
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection title="When to use glass vs solid">
        <DocTable
          headers={['Use glass', 'Use solid']}
          rows={[
            ['Overlays over rich content', 'Primary content areas'],
            ['Floating toolbars/headers', 'Dense data tables'],
            ['Navigation bars', 'Form containers'],
            ['Hero sections', 'Sidebar navigation'],
            ['Modal backdrops', 'Text-heavy pages'],
          ]}
        />
      </DocSection>

      <DocSection title="Accessibility checklist">
        <div className="space-y-2 text-xs text-fg-muted" data-selectable>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>Maintain WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text) against the worst-case background</li>
            <li>Provide a solid fallback for users with prefers-reduced-transparency</li>
            <li>Avoid placing critical information on glass over unpredictable user content</li>
            <li>Test with high contrast mode — glass borders may disappear</li>
            <li>Add sufficient padding so text doesn't touch the glass edge</li>
          </ul>
        </div>
      </DocSection>
    </div>
  )
}

// ---------- item 2: glass-blur-study ----------

function BlurRadiusGrid() {
  const blurs = [0, 2, 4, 8, 12, 16, 20, 30, 40, 60, 80, 100]

  return (
    <DocSection title="Blur Radius: 0px to 100px">
      <p className="mb-3 text-xs text-fg-muted">
        12 glass cards with identical backgrounds, each with a different blur
        radius. Observe the sweet spot (12-20px) and diminishing returns beyond 40px.
      </p>
      <BlurStudyBg>
        <div className="grid grid-cols-4 gap-3 p-4">
          {blurs.map((b) => (
            <div
              className="flex h-20 flex-col items-center justify-center rounded-lg border border-white/20"
              key={b}
              style={{
                backdropFilter: `blur(${b}px) saturate(180%)`,
                background: 'rgba(255,255,255,0.12)',
              }}
            >
              <div className="font-mono text-sm font-bold text-white">{b}px</div>
              <div className="text-[9px] text-white/40">
                {b === 0 && 'no blur'}
                {b > 0 && b <= 4 && 'subtle'}
                {b > 4 && b <= 12 && 'light'}
                {b > 12 && b <= 20 && 'sweet spot'}
                {b > 20 && b <= 40 && 'heavy'}
                {b > 40 && 'extreme'}
              </div>
            </div>
          ))}
        </div>
      </BlurStudyBg>
      <p className="mt-2 text-[10px] text-fg-muted">
        Observation: at 0px you see the raw background. At 2-4px, a slight
        softening. At 12-20px, the classic frosted glass effect. Beyond 40px,
        everything becomes a uniform color wash with diminishing visual
        difference between values.
      </p>
    </DocSection>
  )
}

function SaturationStudy() {
  const saturations = [100, 120, 150, 180, 200, 300]

  return (
    <DocSection title="Saturation: 100% to 300%">
      <p className="mb-3 text-xs text-fg-muted">
        All cards use the same blur (20px) but different backdrop saturation
        values. Higher saturation makes the blurred colors more vibrant — a key
        part of the Apple glass aesthetic.
      </p>
      <BlurStudyBg>
        <div className="grid grid-cols-3 gap-3 p-4">
          {saturations.map((s) => (
            <div
              className="flex h-24 flex-col items-center justify-center rounded-lg border border-white/20"
              key={s}
              style={{
                backdropFilter: `blur(20px) saturate(${s}%)`,
                background: 'rgba(255,255,255,0.12)',
              }}
            >
              <div className="font-mono text-sm font-bold text-white">{s}%</div>
              <div className="text-[9px] text-white/40">
                {s === 100 && 'natural'}
                {s === 120 && 'slight boost'}
                {s === 150 && 'noticeable'}
                {s === 180 && 'Apple default'}
                {s === 200 && 'vivid'}
                {s === 300 && 'extreme'}
              </div>
            </div>
          ))}
        </div>
      </BlurStudyBg>
      <p className="mt-2 text-[10px] text-fg-muted">
        Observation: 100% is neutral. 150-180% gives the characteristic iOS
        vibrancy. Beyond 200%, colors begin to look artificially intense. Apple
        typically uses 180%.
      </p>
    </DocSection>
  )
}

function BlurOpacityMatrix() {
  const blurs = [8, 20, 40]
  const opacities = [0.05, 0.15, 0.3, 0.5]

  return (
    <DocSection title="Matrix: Blur x Background Opacity">
      <p className="mb-3 text-xs text-fg-muted">
        3 blur levels x 4 background opacity levels = 12 combinations. The
        background color is white with varying alpha. Higher opacity means more
        white tinting on top of the blur.
      </p>
      <BlurStudyBg>
        <div className="p-4">
          <div className="mb-2 grid grid-cols-5 gap-2">
            <div className="text-[9px] text-white/40" />
            {opacities.map((o) => (
              <div className="text-center text-[9px] font-bold text-white/60" key={o}>
                bg {Math.round(o * 100)}%
              </div>
            ))}
          </div>
          {blurs.map((b) => (
            <div className="mb-2 grid grid-cols-5 gap-2" key={b}>
              <div className="flex items-center text-[9px] font-bold text-white/60">
                blur {b}px
              </div>
              {opacities.map((o) => (
                <div
                  className="flex h-16 items-center justify-center rounded-lg border border-white/15"
                  key={`${b}-${o}`}
                  style={{
                    backdropFilter: `blur(${b}px) saturate(180%)`,
                    background: `rgba(255,255,255,${o})`,
                  }}
                >
                  <div className="text-center">
                    <div className="font-mono text-[9px] font-bold text-white">
                      {b}/{Math.round(o * 100)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </BlurStudyBg>
      <p className="mt-2 text-[10px] text-fg-muted">
        Observation: low opacity (5-15%) lets the blur colors show through —
        more "glassmorphic". High opacity (30-50%) adds a milky white layer that
        mutes the blurred background. The sweet spot for glass UI is typically
        blur 16-20px with 10-20% background opacity.
      </p>
    </DocSection>
  )
}

function GlassBlurStudyStage() {
  return (
    <div>
      <div className="text-lg font-bold text-fg">Blur Radius Study</div>
      <p className="mt-1 text-sm text-fg-muted">
        Systematic study of blur values, saturation levels, and background opacity
        combinations to find the optimal glass parameters.
      </p>
      <BlurRadiusGrid />
      <SaturationStudy />
      <BlurOpacityMatrix />
    </div>
  )
}

// ---------- item 3: glass-depth ----------

function GlassLayers({ count }: { count: number }) {
  const layers = Array.from({ length: count }, (_, i) => i)

  return (
    <div className="relative h-72 overflow-hidden rounded-xl">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #ff6b6b 0%, #feca57 20%, #48dbfb 40%, #ff9ff3 60%, #54a0ff 80%, #1dd1a1 100%)',
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300">
        <circle cx="80" cy="80" fill="#fff3" r="40" />
        <circle cx="300" cy="60" fill="#fff2" r="60" />
        <rect fill="#fff2" height="50" rx="8" width="80" x="160" y="180" />
        <polygon fill="#fff3" points="350,200 380,260 320,260" />
        <circle cx="100" cy="230" fill="#fff2" r="30" />
      </svg>

      {layers.map((i) => {
        const offsetX = i * 12
        const offsetY = i * 10
        const blur = 4 + i * 3
        const opacity = 0.08 + i * 0.02

        return (
          <div
            className="absolute rounded-xl border border-white/10"
            key={i}
            style={{
              backdropFilter: `blur(${blur}px)`,
              background: `rgba(255, 255, 255, ${opacity})`,
              bottom: 20 + offsetY,
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,${0.1 + i * 0.02}),
                0 4px 12px rgba(0,0,0,${0.05 + i * 0.02})
              `,
              left: 20 + offsetX,
              right: 20 + (count - 1 - i) * 12,
              top: 20 + (count - 1 - i) * 10,
              zIndex: i,
            }}
          >
            {i === count - 1 && (
              <div className="flex h-full flex-col items-center justify-center p-4">
                <div className="text-sm font-medium text-white">Layer {count}</div>
                <div className="mt-1 text-[10px] text-white/50">
                  {count} glass panes stacked
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function InteractiveLayers() {
  const [count, setCount] = useState(5)

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <label className="text-xs text-fg-muted">Layers: {count}</label>
        <input
          className="w-48"
          max={8}
          min={1}
          onChange={(e) => setCount(Number(e.target.value))}
          type="range"
          value={count}
        />
        <div className="flex gap-1">
          {Array.from({ length: 8 }, (_, i) => (
            <button
              className={[
                'h-6 w-6 rounded text-[10px] transition-colors',
                i + 1 === count
                  ? 'bg-accent text-white'
                  : 'bg-bg-tertiary text-fg-muted hover:bg-bg-secondary',
              ].join(' ')}
              key={i}
              onClick={() => setCount(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <GlassLayers count={count} />
    </div>
  )
}

function PerspectiveLayers() {
  return (
    <div
      className="relative h-80 overflow-hidden rounded-xl"
      style={{ perspective: '800px' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0c2461 0%, #6c5ce7 50%, #a29bfe 100%)',
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 320">
        <circle cx="100" cy="80" fill="#ff6b6b55" r="50" />
        <circle cx="300" cy="200" fill="#48dbfb55" r="70" />
        <circle cx="200" cy="280" fill="#feca5755" r="40" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(20deg) rotateY(-15deg)',
          }}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <div
              className="absolute rounded-xl border border-white/15"
              key={i}
              style={{
                backdropFilter: `blur(${6 + i * 4}px)`,
                background: `rgba(255, 255, 255, ${0.06 + i * 0.03})`,
                boxShadow: `0 ${2 + i * 2}px ${8 + i * 4}px rgba(0,0,0,${0.08 + i * 0.02})`,
                height: 160,
                transform: `translateZ(${i * 30}px)`,
                width: 240,
              }}
            >
              {i === 4 && (
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="text-sm font-medium text-white">Front pane</div>
                  <div className="text-[10px] text-white/50">5 layers in 3D space</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ConcentricRings() {
  return (
    <div className="relative h-72 overflow-hidden rounded-xl">
      <div
        className="absolute inset-0"
        style={{
          background:
            'conic-gradient(from 0deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #1dd1a1, #ff6b6b)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 6 }, (_, i) => {
          const size = 220 - i * 30
          return (
            <div
              className="absolute rounded-full border border-white/10"
              key={i}
              style={{
                backdropFilter: `blur(${3 + i * 2}px)`,
                background: `rgba(255, 255, 255, ${0.04 + i * 0.02})`,
                height: size,
                width: size,
              }}
            />
          )
        })}
        <div className="relative z-10 text-center">
          <div className="text-sm font-medium text-white">Center</div>
          <div className="text-[10px] text-white/50">6 concentric glass rings</div>
        </div>
      </div>
    </div>
  )
}

function GlassDepthStage() {
  return (
    <div>
      <div className="text-lg font-bold text-fg">Depth & Layering</div>
      <p className="mt-1 text-sm text-fg-muted">
        Multiple glass layers stacked to create depth perception through
        transparency. Each layer adds blur and opacity, like looking through
        multiple panes of frosted glass.
      </p>

      <DocSection title="Interactive layer count">
        <InteractiveLayers />
      </DocSection>

      <DocSection title="3D perspective">
        <PerspectiveLayers />
      </DocSection>

      <DocSection title="Concentric rings">
        <ConcentricRings />
      </DocSection>
    </div>
  )
}

// ---------- item 4: glass-layers ----------

// background components for glass layer experiments

function GradientDiv() {
  return (
    <div
      className="h-48 w-full rounded-xl"
      style={{
        background:
          'linear-gradient(135deg, #ff6b6b 0%, #feca57 25%, #48dbfb 50%, #ff9ff3 75%, #54a0ff 100%)',
      }}
    />
  )
}

function StripesDiv() {
  return (
    <div
      className="h-48 w-full rounded-xl"
      style={{
        background: `repeating-linear-gradient(
          45deg,
          #ff6b6b,
          #ff6b6b 10px,
          #feca57 10px,
          #feca57 20px,
          #48dbfb 20px,
          #48dbfb 30px,
          #ff9ff3 30px,
          #ff9ff3 40px
        )`,
      }}
    />
  )
}

function CheckerboardDiv() {
  return (
    <div
      className="h-48 w-full rounded-xl"
      style={{
        background: `conic-gradient(#ff6b6b 25%, #48dbfb 25% 50%, #feca57 50% 75%, #ff9ff3 75%)`,
        backgroundSize: '40px 40px',
      }}
    />
  )
}

function AnimatedGradientDiv() {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-xl">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(270deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #ff6b6b)',
          backgroundSize: '600% 100%',
          animation: 'glass-layers-gradient 6s ease infinite',
        }}
      />
    </div>
  )
}

function ColorfulSvg() {
  return (
    <svg
      className="h-48 w-full rounded-xl"
      style={{ background: '#1a1a2e' }}
      viewBox="0 0 400 200"
    >
      <circle cx="80" cy="60" fill="#ff6b6b" r="40" />
      <circle cx="200" cy="100" fill="#48dbfb" r="50" />
      <circle cx="320" cy="70" fill="#feca57" r="35" />
      <rect fill="#ff9ff3" height="60" rx="8" width="80" x="140" y="130" />
      <polygon fill="#54a0ff" points="350,150 380,190 320,190" />
      <circle cx="50" cy="170" fill="#1dd1a1" r="25" />
    </svg>
  )
}

function AnimatedSvg() {
  return (
    <svg
      className="h-48 w-full rounded-xl"
      style={{ background: '#0a0a23' }}
      viewBox="0 0 400 200"
    >
      <style>{`
        @keyframes svg-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes svg-pulse { 0%, 100% { r: 30; } 50% { r: 50; } }
        .svg-spin { animation: svg-rotate 4s linear infinite; transform-origin: center; }
        .svg-pulse { animation: svg-pulse 2s ease-in-out infinite; }
      `}</style>
      <g className="svg-spin">
        <rect fill="#ff6b6b" height="40" rx="4" width="40" x="180" y="80" />
      </g>
      <circle className="svg-pulse" cx="100" cy="100" fill="#48dbfb" r="30" />
      <circle
        className="svg-pulse"
        cx="300"
        cy="100"
        fill="#feca57"
        r="30"
        style={{ animationDelay: '0.5s' }}
      />
    </svg>
  )
}

function SvgChartBehindGlass() {
  return (
    <svg
      className="h-48 w-full rounded-xl"
      style={{ background: '#1a1a2e' }}
      viewBox="0 0 400 200"
    >
      <rect fill="#ff6b6b" height="120" rx="4" width="30" x="40" y="60" />
      <rect fill="#48dbfb" height="80" rx="4" width="30" x="90" y="100" />
      <rect fill="#feca57" height="140" rx="4" width="30" x="140" y="40" />
      <rect fill="#ff9ff3" height="60" rx="4" width="30" x="190" y="120" />
      <rect fill="#54a0ff" height="100" rx="4" width="30" x="240" y="80" />
      <rect fill="#1dd1a1" height="130" rx="4" width="30" x="290" y="50" />
      <rect fill="#ff6b6b" height="70" rx="4" width="30" x="340" y="110" />
      <line stroke="#fff3" strokeWidth="1" x1="30" x2="380" y1="185" y2="185" />
    </svg>
  )
}

function FakeVideoContent() {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-xl bg-[#0a0a23]">
      <style>{`
        @keyframes video-move-a { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(100px, 30px) scale(1.3); } }
        @keyframes video-move-b { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-80px, 40px) scale(0.8); } }
        @keyframes video-move-c { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(60px, -30px); } 66% { transform: translate(-40px, 50px); } }
      `}</style>
      <div
        className="absolute h-40 w-40 rounded-full opacity-70"
        style={{
          background: 'radial-gradient(circle, #ff6b6b, transparent)',
          animation: 'video-move-a 5s ease-in-out infinite',
          left: '10%',
          top: '10%',
        }}
      />
      <div
        className="absolute h-48 w-48 rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle, #48dbfb, transparent)',
          animation: 'video-move-b 7s ease-in-out infinite',
          right: '10%',
          top: '5%',
        }}
      />
      <div
        className="absolute h-32 w-32 rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle, #feca57, transparent)',
          animation: 'video-move-c 4s ease-in-out infinite',
          bottom: '10%',
          left: '30%',
        }}
      />
      <div
        className="absolute h-36 w-36 rounded-full opacity-50"
        style={{
          background: 'radial-gradient(circle, #ff9ff3, transparent)',
          animation: 'video-move-a 6s ease-in-out infinite reverse',
          right: '25%',
          bottom: '5%',
        }}
      />
    </div>
  )
}

function GlassLayersStage() {
  return (
    <div>
      <div className="text-lg font-bold text-fg">Glass Layering Experiments</div>
      <p className="mt-1 text-sm text-fg-muted">
        How glass backdrop-filter behaves over different background types: DIV
        gradients, SVG shapes, Canvas animations, and moving content.
      </p>

      <style>{`
        @keyframes glass-layers-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* glass over DIV backgrounds */}
      <DocSection title="Glass over DIV backgrounds">
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-xs font-medium text-fg">Colorful gradient</div>
            <div className="grid grid-cols-2 gap-4">
              <Comparison label="Without glass">
                <GradientDiv />
              </Comparison>
              <Comparison label="With glass overlay">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  <div className="absolute inset-0"><GradientDiv /></div>
                  <div className="absolute inset-4 flex items-center justify-center">
                    <GlassCard className="p-6">
                      <div className="text-sm font-medium text-white">Frosted glass over gradient</div>
                      <div className="mt-1 text-xs text-white/60">backdrop-filter: blur(12px)</div>
                    </GlassCard>
                  </div>
                </div>
              </Comparison>
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs font-medium text-fg">Striped pattern</div>
            <div className="grid grid-cols-2 gap-4">
              <Comparison label="Without glass">
                <StripesDiv />
              </Comparison>
              <Comparison label="With glass overlay">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  <div className="absolute inset-0"><StripesDiv /></div>
                  <div className="absolute inset-4 flex items-center justify-center">
                    <GlassCard className="p-6">
                      <div className="text-sm font-medium text-white">Glass softens harsh patterns</div>
                      <div className="mt-1 text-xs text-white/60">Stripes blend smoothly under blur</div>
                    </GlassCard>
                  </div>
                </div>
              </Comparison>
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs font-medium text-fg">Checkerboard pattern</div>
            <div className="grid grid-cols-2 gap-4">
              <Comparison label="Without glass">
                <CheckerboardDiv />
              </Comparison>
              <Comparison label="With glass overlay">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  <div className="absolute inset-0"><CheckerboardDiv /></div>
                  <div className="absolute inset-4 flex items-center justify-center">
                    <GlassCard className="p-6">
                      <div className="text-sm font-medium text-white">Checkerboard diffused</div>
                      <div className="mt-1 text-xs text-white/60">Geometric patterns become soft color fields</div>
                    </GlassCard>
                  </div>
                </div>
              </Comparison>
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs font-medium text-fg">Animated gradient</div>
            <div className="grid grid-cols-2 gap-4">
              <Comparison label="Without glass">
                <AnimatedGradientDiv />
              </Comparison>
              <Comparison label="With glass overlay">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  <div className="absolute inset-0"><AnimatedGradientDiv /></div>
                  <div className="absolute inset-4 flex items-center justify-center">
                    <GlassCard className="p-6">
                      <div className="text-sm font-medium text-white">Live animation visible through glass</div>
                      <div className="mt-1 text-xs text-white/60">backdrop-filter is computed every frame</div>
                    </GlassCard>
                  </div>
                </div>
              </Comparison>
            </div>
          </div>
        </div>
      </DocSection>

      {/* glass over SVG */}
      <DocSection title="Glass over SVG">
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-xs font-medium text-fg">SVG shapes</div>
            <div className="grid grid-cols-2 gap-4">
              <Comparison label="Without glass">
                <ColorfulSvg />
              </Comparison>
              <Comparison label="With glass overlay">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  <div className="absolute inset-0"><ColorfulSvg /></div>
                  <div className="absolute inset-4 flex items-center justify-center">
                    <GlassCard className="p-6">
                      <div className="text-sm font-medium text-white">SVG shapes blurred through glass</div>
                    </GlassCard>
                  </div>
                </div>
              </Comparison>
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs font-medium text-fg">Animated SVG</div>
            <div className="grid grid-cols-2 gap-4">
              <Comparison label="Without glass">
                <AnimatedSvg />
              </Comparison>
              <Comparison label="With glass overlay">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  <div className="absolute inset-0"><AnimatedSvg /></div>
                  <div className="absolute inset-4 flex items-center justify-center">
                    <GlassCard className="p-6">
                      <div className="text-sm font-medium text-white">Animation continues under glass</div>
                    </GlassCard>
                  </div>
                </div>
              </Comparison>
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs font-medium text-fg">Glass tooltip over SVG chart</div>
            <div className="relative h-48 w-full overflow-hidden rounded-xl">
              <div className="absolute inset-0"><SvgChartBehindGlass /></div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <GlassCard className="px-4 py-2">
                  <div className="text-xs font-medium text-white">Revenue: $2,847</div>
                  <div className="text-[10px] text-white/60">Q3 2024</div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </DocSection>

      {/* glass over moving content */}
      <DocSection title="Glass over moving content">
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-xs font-medium text-fg">Glass HUD over animation</div>
            <div className="grid grid-cols-2 gap-4">
              <Comparison label="Without glass">
                <FakeVideoContent />
              </Comparison>
              <Comparison label="With glass overlay">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  <div className="absolute inset-0"><FakeVideoContent /></div>
                  <div className="absolute inset-0 flex items-end justify-center p-4">
                    <GlassCard className="w-full p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-white">Glass HUD over video</div>
                          <div className="text-xs text-white/60">Overlay controls stay readable</div>
                        </div>
                        <div className="flex gap-2">
                          <div className="h-6 w-6 rounded-full bg-white/20 backdrop-blur-sm" />
                          <div className="h-6 w-6 rounded-full bg-white/20 backdrop-blur-sm" />
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </Comparison>
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs font-medium text-fg">Multiple glass panels</div>
            <div className="relative h-64 w-full overflow-hidden rounded-xl">
              <div className="absolute inset-0"><FakeVideoContent /></div>
              <div className="absolute inset-0 grid grid-cols-3 gap-3 p-4">
                <GlassCard className="flex flex-col items-center justify-center p-4">
                  <div className="text-2xl font-bold text-white">24fps</div>
                  <div className="text-[10px] text-white/50">Frame Rate</div>
                </GlassCard>
                <GlassCard className="flex flex-col items-center justify-center p-4">
                  <div className="text-2xl font-bold text-white">1080p</div>
                  <div className="text-[10px] text-white/50">Resolution</div>
                </GlassCard>
                <GlassCard className="flex flex-col items-center justify-center p-4">
                  <div className="text-2xl font-bold text-white">4.2MB</div>
                  <div className="text-[10px] text-white/50">File Size</div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </DocSection>
    </div>
  )
}

// ---------- exported items ----------

const tokenItemsExt5: DevCenterItem[] = [
  // glass research
  {
    id: 'glass-research',
    label: 'Glass Research',
    layer: 'l0-glass',
    type: 'reference',
    tags: ['ios26', 'liquid-glass', 'research', 'backdrop-filter', 'frosted', 'design-language'],

    stage: () => <GlassResearchStage />,

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          research summary
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p>
            Apple's Liquid Glass (iOS 26) is achieved on the web via{' '}
            <span className="text-accent">backdrop-filter</span> — a CSS
            property that applies graphical effects to the area behind an element.
          </p>
          <p>
            Combined with semi-transparent backgrounds and subtle borders, it
            creates the characteristic frosted glass look with color vibrancy from
            the underlying content.
          </p>
        </div>

        <div className="text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          key css pattern
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p><span className="text-accent">backdrop-filter</span> — blur(20px) saturate(180%)</p>
          <p><span className="text-accent">background</span> — rgba with 10-60% opacity</p>
          <p><span className="text-accent">border</span> — 1px with 8-25% opacity</p>
          <p><span className="text-accent">border-radius</span> — 12-20px for the glass shape</p>
        </div>

        <div className="text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          limitations on web
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p>
            The native iOS effect includes real-time refraction distortion
            (content bends through the glass). CSS cannot replicate this —
            backdrop-filter only blurs and color-shifts.
          </p>
          <p>
            For true refraction, you would need WebGL/Canvas with displacement
            maps, which is heavy and impractical for UI chrome.
          </p>
        </div>
      </div>
    ),

    code: () => `/* core CSS for liquid glass effect */
.glass {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
}

/* dark mode adjustment */
[data-theme='dark'] .glass {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* tailwind utilities */
@utility glass {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

@utility glass-sm {
  backdrop-filter: blur(8px) saturate(150%);
  -webkit-backdrop-filter: blur(8px) saturate(150%);
}

@utility glass-lg {
  backdrop-filter: blur(40px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
}

/* reduced transparency fallback */
@media (prefers-reduced-transparency: reduce) {
  .glass {
    backdrop-filter: none;
    background: var(--golia-surface);
  }
}`,
  },

  // glass blur study
  {
    id: 'glass-blur-study',
    label: 'Blur Study',
    layer: 'l0-glass',
    type: 'reference',
    tags: ['glass', 'blur', 'radius', 'saturation', 'opacity', 'matrix', 'study'],

    stage: () => <GlassBlurStudyStage />,
  },

  // glass depth
  {
    id: 'glass-depth',
    label: 'Glass Depth',
    layer: 'l0-glass',
    type: 'reference',
    tags: ['glass', 'depth', 'layers', 'stacking', 'z-index', 'perspective', '3d', 'concentric'],

    stage: () => <GlassDepthStage />,
  },

  // glass layers
  {
    id: 'glass-layers',
    label: 'Glass Layers',
    layer: 'l0-glass',
    type: 'reference',
    tags: ['glass', 'layers', 'backdrop-filter', 'svg', 'div', 'background', 'animation'],

    stage: () => <GlassLayersStage />,
  },
]

export { tokenItemsExt5 }
