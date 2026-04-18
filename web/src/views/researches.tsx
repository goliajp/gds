import { cx } from '@goliapkg/gds'
import { useState } from 'react'

type Section = { heading: string; points: string[] }

type Research = {
  id: string
  title: string
  question: string
  sections: Section[]
  sources?: string[]
}

const RESEARCHES: Research[] = [
  {
    id: 'mobile-friendly-ui-conventions',
    title: '成熟 UI 框架的 mobile 设计规范',
    question: '成熟的 UI 框架如果是 mobile 友好的，一般会做一些什么设计规范？',
    sections: [
      {
        heading: '触摸目标最小尺寸',
        points: [
          'Apple HIG：最小 44×44 pt',
          'Material Design：最小 48×48 dp',
          'WCAG 2.5.5：AAA 级 44×44 CSS px，AA 级 24×24',
          '相邻目标间 ≥ 8 pt/dp 空隙，避免误触',
        ],
      },
      {
        heading: 'Safe area 处理（notch / home indicator）',
        points: [
          'CSS：env(safe-area-inset-top/right/bottom/left) 读取系统预留',
          'HTML meta：viewport-fit=cover 让页面能延伸到 safe area',
          'iOS 底部 home indicator 区域不放可交互元素',
          '顶部刘海区不放关键信息',
        ],
      },
      {
        heading: 'Viewport 单位选择',
        points: [
          'vh 在移动浏览器不可靠——地址栏伸缩会改 100vh 值',
          'svh (small viewport)：最小视口高度，地址栏展开时的可视区',
          'dvh (dynamic)：跟随浏览器 chrome 动态变化',
          'lvh (large)：最大视口高度',
          '现代做法：100dvh > 100svh > 100vh',
        ],
      },
      {
        heading: '输入模式 hint',
        points: [
          'inputmode="numeric|tel|email|url|search|decimal"：控制虚拟键盘布局',
          'autocomplete tokens：name / email / tel / address-line1 / cc-number 等触发系统填充',
          'enterkeyhint="done|go|next|search|send"：改软键盘 enter 键文案',
          '密码字段配合 autocomplete="current-password" 走系统 keychain',
        ],
      },
      {
        heading: '手势约定',
        points: [
          'iOS 左边缘滑动 → 返回上一屏（UINavigationController 默认）',
          'Pull-to-refresh → 列表顶部下拉刷新',
          'List item 左右滑 → 次要操作（归档、删除），主操作点击整行',
          '底部 sheet：向下滑关闭；居中 modal：通常要明确关闭按钮',
          '长按 → 上下文菜单 / 拖拽开始',
        ],
      },
      {
        heading: 'Responsive 断点',
        points: [
          'Tailwind：sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536',
          'Material Design 3：compact <600 · medium 600–839 · expanded 840–1199 · large 1200–1599 · extra-large ≥1600',
          'Bootstrap 5：xs <576 · sm ≥576 · md ≥768 · lg ≥992 · xl ≥1200 · xxl ≥1400',
          'Apple Size Classes：Regular / Compact 两档，按"能容纳多少"而非 px',
        ],
      },
      {
        heading: 'Motion 偏好',
        points: [
          'prefers-reduced-motion: reduce → 禁用或简化动画（尊重系统辅助）',
          'Material Design 3：emphasized / standard / decelerated 三种 easing',
          'iOS：系统默认 spring 动画，速度和阻尼有规范',
          '移动 CPU 有限：复杂 spring + 多元素同时动画必须测真机',
        ],
      },
      {
        heading: '布局自适应（非 CSS 响应式）',
        points: [
          'Mobile：底部 tab bar（3–5 项），避免顶部 hamburger + 深层导航',
          'Tablet：Material NavigationRail / Apple Split View（主列表 + 详情）',
          'Desktop：持久侧栏 + 多列',
          'Dialog：mobile 常变全屏 / bottom sheet，desktop 才是居中 modal',
          'Drawer：mobile 从底部弹出更自然，desktop 从侧边',
        ],
      },
      {
        heading: '字号与密度',
        points: [
          'iOS Dynamic Type：用户在系统里调整字号，app 要跟随',
          'Material Type Scale：displayLarge → labelSmall 共 15 档',
          'Fluid typography：clamp(min, preferred, max) 实现平滑缩放',
          '密度档位：Material density -1/0/+1、Ant compact/default/large',
        ],
      },
      {
        heading: 'Hover 与指针类型',
        points: [
          '移动端没有 hover 态——所有 hover 触发必须有 tap / long-press 等价',
          '@media (hover: hover)：只在支持 hover 的设备上应用 hover 样式',
          '@media (pointer: coarse)：针对触摸设备放大 hit area',
          '@media (pointer: fine)：精确指针（鼠标 / 触控笔）时恢复小尺寸',
        ],
      },
      {
        heading: '可访问性（mobile 特有）',
        points: [
          'VoiceOver / TalkBack 支持：语义化 HTML + ARIA labels',
          '高对比度模式：prefers-contrast: more',
          '颜色反转 / Smart Invert (iOS)：避免用仅颜色传达信息',
          'Focus visible on touch：键盘用户存在，focus ring 不能因为 mobile 就删掉',
        ],
      },
    ],
    sources: [
      'Apple Human Interface Guidelines',
      'Material Design 3 (m3.material.io)',
      'WCAG 2.1 / 2.5.5 Target Size',
      'Tailwind CSS v4 docs',
      'MDN Web Docs：inputmode, autocomplete, safe-area-inset, viewport units',
      'iOS Safari 博文 2022 dvh/svh/lvh',
    ],
  },
]

export function ResearchesView() {
  const [selectedId, setSelectedId] = useState<string>(RESEARCHES[0]!.id)
  const selected = RESEARCHES.find((r) => r.id === selectedId)

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <aside className="md:border-border md:w-56 md:shrink-0 md:border-r md:pr-4">
        <div className="text-accent mb-3 font-mono text-xs tracking-wider uppercase">
          Researches
        </div>
        <ol className="space-y-1">
          {RESEARCHES.map((r, i) => (
            <li key={r.id}>
              <button
                className={cx(
                  'w-full rounded px-3 py-2 text-left text-sm transition-colors',
                  selectedId === r.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-fg-secondary hover:bg-bg-tertiary hover:text-fg'
                )}
                onClick={() => setSelectedId(r.id)}
                type="button"
              >
                <span className="text-fg-muted mr-2 font-mono text-xs">#{i + 1}</span>
                {r.title}
              </button>
            </li>
          ))}
        </ol>
      </aside>

      <article className="min-w-0 flex-1 space-y-6">
        {selected ? <ResearchContent research={selected} /> : null}
      </article>
    </div>
  )
}

function ResearchContent({ research }: { research: Research }) {
  return (
    <>
      <header className="space-y-2">
        <h2 className="text-fg text-xl font-bold">{research.title}</h2>
        <p className="text-fg-muted text-sm italic">Q：{research.question}</p>
      </header>

      {research.sections.map((s) => (
        <section className="space-y-2" key={s.heading}>
          <h3 className="text-fg text-base font-semibold">{s.heading}</h3>
          <ul className="text-fg-secondary list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
            {s.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      ))}

      {research.sources && research.sources.length > 0 ? (
        <aside className="border-border border-t pt-4">
          <h4 className="text-fg-muted mb-2 font-mono text-xs tracking-wider uppercase">
            Sources（AI 整理，审计请人工确认）
          </h4>
          <ul className="text-fg-muted space-y-1 text-xs">
            {research.sources.map((s) => (
              <li key={s}>· {s}</li>
            ))}
          </ul>
        </aside>
      ) : null}
    </>
  )
}
