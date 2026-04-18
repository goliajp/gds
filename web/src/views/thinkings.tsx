import type { Entry } from './_master-detail'
import { MasterDetailView } from './_master-detail'

const SVG_BREAKPOINTS = `<svg viewBox="0 0 720 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <text x="10" y="20" font-size="12" font-weight="600" fill="currentColor">Material Design 3 · 5 档</text>
  <g>
    <rect x="10" y="35" width="60" height="16" fill="var(--color-accent)" fill-opacity="0.15" stroke="var(--color-accent)" stroke-opacity="0.5"/>
    <text x="40" y="47" font-size="9" text-anchor="middle" fill="currentColor">&lt;600 compact</text>
    <rect x="70" y="35" width="50" height="16" fill="var(--color-accent)" fill-opacity="0.25" stroke="var(--color-accent)" stroke-opacity="0.5"/>
    <text x="95" y="47" font-size="9" text-anchor="middle" fill="currentColor">≥600 medium</text>
    <rect x="120" y="35" width="80" height="16" fill="var(--color-accent)" fill-opacity="0.35" stroke="var(--color-accent)" stroke-opacity="0.5"/>
    <text x="160" y="47" font-size="9" text-anchor="middle" fill="currentColor">≥840 expanded</text>
    <rect x="200" y="35" width="70" height="16" fill="var(--color-accent)" fill-opacity="0.45" stroke="var(--color-accent)" stroke-opacity="0.5"/>
    <text x="235" y="47" font-size="9" text-anchor="middle" fill="currentColor">≥1200 large</text>
    <rect x="270" y="35" width="80" height="16" fill="var(--color-accent)" fill-opacity="0.55" stroke="var(--color-accent)" stroke-opacity="0.5"/>
    <text x="310" y="47" font-size="9" text-anchor="middle" fill="currentColor">≥1600 x-large</text>
  </g>
  <text x="10" y="100" font-size="12" font-weight="600" fill="currentColor">v4 · 2 档</text>
  <g>
    <rect x="10" y="115" width="140" height="24" fill="var(--color-accent)" fill-opacity="0.2" stroke="var(--color-accent)" stroke-opacity="0.7"/>
    <text x="80" y="131" font-size="11" text-anchor="middle" fill="currentColor">mobile (&lt; 768)</text>
    <rect x="150" y="115" width="200" height="24" fill="var(--color-accent)" fill-opacity="0.4" stroke="var(--color-accent)" stroke-opacity="0.7"/>
    <text x="250" y="131" font-size="11" text-anchor="middle" fill="currentColor">tablet-and-up (≥ 768)</text>
  </g>
  <text x="10" y="165" font-size="10" font-style="italic" fill="currentColor" opacity="0.7">断点越少 → AI 的选择空间越小 → 输出越可预测。</text>
</svg>`

const SVG_HIT_AREA = `<svg viewBox="0 0 360 170" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <text x="60" y="20" font-size="11" font-weight="600" text-anchor="middle" fill="currentColor">❌ 视觉 = hit = 20×20</text>
  <rect x="50" y="45" width="20" height="20" fill="#ef4444" fill-opacity="0.2" stroke="#ef4444" stroke-opacity="0.8"/>
  <circle cx="60" cy="55" r="4" fill="currentColor"/>
  <text x="60" y="85" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.6">hit 20, 误触高</text>
  <text x="180" y="20" font-size="11" font-weight="600" text-anchor="middle" fill="currentColor">✓ 视觉 20，hit 44</text>
  <rect x="158" y="33" width="44" height="44" fill="var(--color-accent)" fill-opacity="0.12" stroke="var(--color-accent)" stroke-opacity="0.5" stroke-dasharray="3 2"/>
  <circle cx="180" cy="55" r="4" fill="currentColor"/>
  <text x="180" y="95" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.6">padding 扩展 hit 区</text>
  <text x="300" y="20" font-size="11" font-weight="600" text-anchor="middle" fill="currentColor">✓ 视觉 = hit = 44×44</text>
  <rect x="278" y="33" width="44" height="44" fill="var(--color-accent)" fill-opacity="0.3" stroke="var(--color-accent)" stroke-opacity="0.8"/>
  <text x="300" y="60" font-size="10" text-anchor="middle" fill="currentColor">Btn</text>
  <text x="300" y="95" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.6">标准尺寸</text>
  <text x="180" y="140" font-size="10" font-style="italic" text-anchor="middle" fill="currentColor" opacity="0.7">v4 强制最小 44×44 hit area，视觉尺寸可以更小 —— 两者解耦。</text>
</svg>`

const SVG_NAV_3_FORMS = `<svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <text x="60" y="20" font-size="11" font-weight="600" text-anchor="middle" fill="currentColor">Mobile · 底部 tab</text>
  <rect x="20" y="30" width="80" height="130" fill="none" stroke="currentColor" stroke-opacity="0.3" stroke-dasharray="2 2"/>
  <rect x="20" y="140" width="80" height="20" fill="var(--color-accent)" fill-opacity="0.25" stroke="var(--color-accent)" stroke-opacity="0.7"/>
  <g fill="currentColor" opacity="0.6">
    <circle cx="35" cy="150" r="3"/>
    <circle cx="50" cy="150" r="3"/>
    <circle cx="65" cy="150" r="3"/>
    <circle cx="80" cy="150" r="3"/>
  </g>
  <text x="240" y="20" font-size="11" font-weight="600" text-anchor="middle" fill="currentColor">Tablet · NavigationRail</text>
  <rect x="160" y="30" width="160" height="130" fill="none" stroke="currentColor" stroke-opacity="0.3" stroke-dasharray="2 2"/>
  <rect x="160" y="30" width="30" height="130" fill="var(--color-accent)" fill-opacity="0.25" stroke="var(--color-accent)" stroke-opacity="0.7"/>
  <g fill="currentColor" opacity="0.6">
    <circle cx="175" cy="50" r="3"/>
    <circle cx="175" cy="75" r="3"/>
    <circle cx="175" cy="100" r="3"/>
    <circle cx="175" cy="125" r="3"/>
  </g>
  <text x="460" y="20" font-size="11" font-weight="600" text-anchor="middle" fill="currentColor">Desktop · 持久侧栏</text>
  <rect x="360" y="30" width="200" height="130" fill="none" stroke="currentColor" stroke-opacity="0.3" stroke-dasharray="2 2"/>
  <rect x="360" y="30" width="70" height="130" fill="var(--color-accent)" fill-opacity="0.25" stroke="var(--color-accent)" stroke-opacity="0.7"/>
  <g fill="currentColor" opacity="0.6">
    <rect x="370" y="45" width="50" height="4"/>
    <rect x="370" y="60" width="50" height="4"/>
    <rect x="370" y="75" width="50" height="4"/>
    <rect x="370" y="90" width="50" height="4"/>
    <rect x="370" y="105" width="50" height="4"/>
  </g>
  <text x="300" y="195" font-size="11" text-anchor="middle" fill="currentColor">
    <tspan font-family="monospace" fill="var(--color-accent)">&lt;Nav items={...} /&gt;</tspan>
    <tspan fill="currentColor">  一个 API，三种布局</tspan>
  </text>
  <text x="300" y="215" font-size="10" font-style="italic" text-anchor="middle" fill="currentColor" opacity="0.7">"怎么布"从消费者脑子里移到 v4 里，消费者不需要思考"mobile 该怎么办"。</text>
</svg>`

const SVG_DISTRIBUTION = `<svg viewBox="0 0 500 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <defs>
    <marker id="arr-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" fill="var(--color-accent)"/>
    </marker>
  </defs>
  <path d="M 30 170 Q 250 30 470 170" fill="none" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.6"/>
  <line x1="250" y1="40" x2="250" y2="180" stroke="currentColor" stroke-opacity="0.3" stroke-dasharray="2 2"/>
  <circle cx="250" cy="40" r="5" fill="currentColor" fill-opacity="0.7"/>
  <text x="250" y="28" font-size="10" text-anchor="middle" fill="currentColor">AI 默认采样中心</text>
  <text x="250" y="195" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.7">Inter + 紫渐变 + 白底</text>
  <rect x="60" y="135" width="80" height="30" fill="var(--color-accent)" fill-opacity="0.2" stroke="var(--color-accent)" stroke-opacity="0.6"/>
  <text x="100" y="153" font-size="10" text-anchor="middle" fill="currentColor" font-weight="600">v4 target</text>
  <rect x="360" y="135" width="80" height="30" fill="var(--color-accent)" fill-opacity="0.2" stroke="var(--color-accent)" stroke-opacity="0.6"/>
  <text x="400" y="153" font-size="10" text-anchor="middle" fill="currentColor" font-weight="600">v4 target</text>
  <path d="M 240 50 L 130 130" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#arr-blue)"/>
  <path d="M 260 50 L 370 130" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#arr-blue)"/>
</svg>`

const SVG_MCP_FLOW = `<svg viewBox="0 0 600 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <defs>
    <marker id="arr-fg" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" fill="currentColor"/>
    </marker>
  </defs>
  <rect x="20" y="60" width="110" height="70" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.6"/>
  <text x="75" y="80" font-size="11" text-anchor="middle" fill="currentColor" font-weight="600">项目代码</text>
  <text x="75" y="96" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.7">components / tokens</text>
  <text x="75" y="109" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.7">已装版本 / 配置</text>
  <line x1="135" y1="95" x2="225" y2="95" stroke="currentColor" stroke-opacity="0.5" marker-end="url(#arr-fg)"/>
  <text x="180" y="87" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.6">read</text>
  <rect x="230" y="50" width="140" height="90" rx="6" fill="var(--color-accent)" fill-opacity="0.1" stroke="var(--color-accent)" stroke-opacity="0.7"/>
  <text x="300" y="72" font-size="11" text-anchor="middle" fill="currentColor" font-weight="600">@goliapkg/gds-mcp</text>
  <text x="300" y="90" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.8">list_components()</text>
  <text x="300" y="103" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.8">get_api(name)</text>
  <text x="300" y="116" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.8">get_tokens()</text>
  <text x="300" y="129" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.8">search_by_intent(q)</text>
  <line x1="375" y1="95" x2="465" y2="95" stroke="currentColor" stroke-opacity="0.5" marker-end="url(#arr-fg)"/>
  <text x="420" y="87" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.6">inject context</text>
  <rect x="470" y="60" width="110" height="70" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.6"/>
  <text x="525" y="80" font-size="11" text-anchor="middle" fill="currentColor" font-weight="600">AI</text>
  <text x="525" y="96" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.7">Claude / Codex / Cursor</text>
  <text x="525" y="109" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.7">拿真实状态写代码</text>
  <text x="300" y="175" font-size="10" font-style="italic" text-anchor="middle" fill="currentColor" opacity="0.7">AI 不再"猜" v4 的 API 和 tokens，查一遍就知道。</text>
  <text x="300" y="193" font-size="10" font-style="italic" text-anchor="middle" fill="currentColor" opacity="0.7">研究 #2 显示这能把 100k-500k tokens 的 UI 生成成本降一个量级。</text>
</svg>`

const THINKINGS: Entry[] = [
  {
    id: 'v4-mobile-support',
    title: 'v4 的 mobile support 怎么设计',
    question:
      'v4 作为给 AI 写 webapp 的框架，"天生支持 mobile 和 pad" 这条要求要怎么落到架构、API、token 和工具链里？',
    sections: [
      {
        heading: '根本态度：mobile 不是适配，是原初形态',
        body: 'v1-v3 的 mobile 都是事后 responsive 补的——desktop 设计出来了再用 media query 缩。这直接导致 AUDIT 里看到的 mobile 不可用：touch target 太小、hover-only 交互、vh 100 被地址栏跳动毁掉、窄屏时 layout 挤成一团。v4 要反过来：mobile 是原初形态，desktop 是 mobile 的扩写版本。',
        points: [
          '所有组件在 375px viewport 下必须"生来就好用"——不是"能用"、不是"可接受"，是好用',
          'desktop 版本是 mobile 的扩写，不是本体',
          '写代码心理 default：mobile 先跑通 → 扩 tablet → 最后考虑 desktop',
          'token 层面，primary 值是 mobile 值，desktop 值通过扩写而不是缩写得到',
          '审计时用 mobile viewport 作为 baseline，desktop 当成"如果空间多出来怎么利用"',
        ],
      },
      {
        heading: '断点哲学：只用 2 档',
        body: 'Material Design 3 给 5 档（compact / medium / expanded / large / extra-large），Apple 的 Size Classes 是 2×2 = 4 种组合——这两种对人类设计师可能合理，但对 AI 不友好。AI 在 5 个候选里选一个的正确率，显著低于在 2 个里选一个。断点少是克制在尺寸空间的体现。',
        points: [
          'v4 只有 2 档：**mobile (< 768)** + **tablet-and-up (≥ 768)**',
          '768 这个数字：iPad 竖屏的 CSS 宽度就是 768px，从这开始才会有 split view / persistent sidebar 等 pad 专有 UI',
          '如果一个组件在某 breakpoint 需要"第三种布局"，那是 component 设计本身有问题——大概率它承担了两种职责，应该拆',
          '2 档让 AI 在生成响应式代码时基本不会错——要么 base 要么 md: prefix，没有第三选项',
          '代价：某些精致的渐变布局（比如 1280 和 1440 要不同 padding）做不了——这是有意的克制',
        ],
        images: [
          {
            svg: SVG_BREAKPOINTS,
            caption: '断点数量的取舍：少 = 可预测 > 多 = 精致。AI 友好倾向前者。',
          },
        ],
      },
      {
        heading: '触摸模型的 first-class 化',
        body: 'mobile 的主输入是 touch，不是 hover / click。v4 要把 touch 交互模型直接内建到 primitive 里，不靠每个 consumer 自己 re-implement。Hover 是桌面的 accent，不是"主交互"。',
        points: [
          '所有 interactive primitive（Button / Link / MenuItem / ListItem）**强制**最小 hit area 44×44px，不允许覆写',
          '视觉尺寸和 hit area **解耦**：可以画小一点（紧凑外观），但 padding 扩展到 44px——底层 CSS 用 `::before` 伪元素实现',
          'Hover 态只是 accent 维度，不能是唯一触发：所有 hover-triggered behavior 必须有 tap 等价——类型系统强制配对',
          '长按 (long-press) 和滑动 (swipe) 作为 first-class 事件在 API 层出现：`onLongPress`、`onSwipeLeft` 等直接可用',
          '不暴露原始 `onTouchStart` / `onTouchMove` 给消费者——走预封装的语义事件',
          'Tooltip 这类组件默认 dual-trigger：hover 显示 + 长按显示，消费者不需要额外写',
        ],
        images: [
          {
            svg: SVG_HIT_AREA,
            caption: 'v4 强制最小 44×44 hit area。视觉尺寸解耦，可以画小，但点击区不准小。',
          },
        ],
      },
      {
        heading: 'Viewport 单位：默认强制 dvh',
        body: 'vh 在 mobile 浏览器不可靠——Safari 地址栏伸缩会让 100vh 跳变。v4 在 token 层把这条坑直接封死：消费者看不到 vh，只能通过 v4 暴露的 viewport token 使用，而这些 token 映射到正确的 dvh/svh/lvh。',
        points: [
          'v4 的 Tailwind preset 里关掉 `h-screen` / `min-h-screen` 等基于 vh 的 utility',
          '保留三个语义 utility：`h-viewport`（= 100dvh，动态随浏览器 chrome）、`h-viewport-min`（= 100svh）、`h-viewport-max`（= 100lvh）',
          '`h-viewport` 是默认——99% 场景用这个就对',
          '`svh` / `lvh` 对应"折叠/展开地址栏都不希望内容跳"的特殊场景，需要主动选',
          '实现：在 @layer utilities 加自定义类；ESLint 规则阻止直接写 `h-[100vh]`',
        ],
      },
      {
        heading: 'Safe area 无感接入',
        body: '移动端 notch、home indicator、底部手势区——所有这些 safe area 需要 consumer 处理，对 AI 是很容易漏的点。v4 的 layout primitive 要把这些默认吃掉，consumer 写完就是对的。',
        points: [
          'v4 的根 layout（`<AppShell>` 或 `<Page>`）自动消费 `env(safe-area-inset-*)`——padding 自带',
          'Starter template 的 `index.html` 预置 `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`',
          '底部固定元素（TabBar / BottomSheet）的 `padding-bottom` 自动加上 `env(safe-area-inset-bottom)`，不会被 home indicator 盖住',
          '顶部固定元素（AppBar）的 `padding-top` 自动加上 `env(safe-area-inset-top)`',
          '这些都是 primitive 内部自动做的，消费者的 JSX 里看不到 safe-area 任何字样——克制在这里体现为"消费者不需要知道"',
        ],
      },
      {
        heading: '布局自适应：一个 API 三种形态',
        body: '最深的 mobile 坑不是 CSS 断点，是**布局本身在不同设备上要换种方式**。侧栏在 desktop 上是持久显示的，在 tablet 上可能是 rail，在 mobile 上是底部 tab——这不是 media query 能解决的，是组件的"多形态"。v4 把这个决策从消费者脑子里移到库里。',
        points: [
          '`<Nav items={...} />`：desktop 渲染为持久 sidebar，tablet 为 NavigationRail，mobile 为底部 TabBar——**一个 API，三种布局**',
          '`<Dialog>`：desktop 居中 modal，mobile 变全屏或底部 sheet——同一个 API，自动切',
          '`<Drawer>`：mobile 从底部弹（符合手势习惯），desktop 从侧边——同一个 API',
          '`<Popover>`：desktop 跟锚点，mobile 变 bottom sheet',
          '`<Command>` (命令面板)：desktop ⌘K 居中 modal，mobile 全屏',
          '代价：v4 的 layout 原语比"一个 div + tailwind class"复杂。换回来的是 consumer 不会把 mobile 搞砸——AI 不需要判断"在 mobile 上这里该怎么办"',
        ],
        images: [
          {
            svg: SVG_NAV_3_FORMS,
            caption: '一个 API 三种形态：把形式因素相关的布局决策从消费者移到 v4。',
          },
        ],
      },
      {
        heading: 'Hover 和指针类型：另一种维度，不是 fallback',
        body: 'Hover 在触摸设备不存在——但不意味着"hover 态要砍"。它是桌面独有的 accent 维度，用于增强可发现性。v4 的处理是让 hover 样式只在支持 hover 的设备上生效，其他所有关键信息走 tap / press。',
        points: [
          'v4 的 `hover:` 工具类**只在 `@media (hover: hover) and (pointer: fine)` 下生效**——通过 Tailwind variant 重写实现',
          '这意味着触摸设备自动拿不到 hover 样式，避免 iOS 上 "tap 一次触发 hover，再 tap 才触发 click" 的坑',
          '对 `pointer: coarse`（触摸）自动放大 hit area：组件内部加 `@media (pointer: coarse) { padding: ... }`',
          'Tooltip 在 `pointer: coarse` 下自动切到"长按显示"，不靠 hover',
          'Focus 态和 hover 态严格分离：focus 是键盘 + 辅助设备用的，永远保留；hover 只是桌面鼠标 accent',
        ],
      },
      {
        heading: '键盘：mobile 上同样是一等公民',
        body: '"mobile 没键盘"是个常见误解。iPad 经常外接蓝牙键盘，iPhone 也有物理键盘配件。更常见的是软键盘——它通过 `inputmode` 等属性影响布局。v4 的 form primitive 必须把这些都内建。',
        points: [
          '每个 Input primitive 根据 `type` 自动设置 `inputmode`（type="email" → inputmode="email"）',
          '`autocomplete` 属性语义化：`<Input type="email" autocomplete="email" />` 自动触发系统 keychain / 自动填充',
          '`enterkeyhint` 根据表单上下文自动设置（列表中最后一个 field 是 "done"，中间的是 "next"）',
          '所有表单 primitive 默认可以用 Tab 键切换——focus order 跟 DOM 顺序一致',
          '物理键盘的 Escape / Enter 快捷键在 Dialog / Popover / Command 等组件里默认接好',
          'Focus ring 不能因为 mobile 就删掉——iPad 键盘用户还在',
        ],
      },
      {
        heading: '真机验证是 dev loop 一等公民',
        body: '单测和 DevTools 响应式模式都不能替代真机验证。v2 就是吃了这个亏——jsdom 里测试全绿，iPhone Safari 上全挂。v4 的开发闭环必须把真机访问做成默认，不是"最后再测"。',
        points: [
          '/web 必须能直接在真机上访问——`bun dev --host` 或配合 Tailscale 暴露给手机 Safari，这是默认配置',
          '每个组件必须有"在 iPhone / iPad / Android Chrome 上走过一遍"的记录——记录写在 PM 区（principles 或 audits）',
          '视觉回归：Playwright + WebKit，viewport 至少覆盖 375×667 (iPhone 16 mini) + 820×1180 (iPad Pro)',
          '真实 touch 事件的 E2E 测试：tap / swipe / long-press 用 Playwright touchscreen API 或 BrowserStack',
          'CI 失败门槛：任何组件 mobile viewport 下视觉回归超过阈值 → block PR',
          '"测过真机"作为 merge 前的硬性 checklist，不是可选',
        ],
      },
      {
        heading: '约束的实现层：让"写坏"变不可能',
        body: '克制如果只是文档里的一句话，AI 迟早会违反。必须通过类型系统 + 运行时 + lint 三层把约束硬编码。"不允许"比"推荐不要"有效 10 倍。',
        points: [
          '**Tailwind 配置层**：关掉 `h-screen` / `min-h-screen`；关掉"不 hover-safe"的工具；限制色彩到 v4 token 范围',
          '**TypeScript 层**：所有 interactive primitive 的 `size` prop 类型里不包含 < "sm" 的值；所有 hover-triggered 回调类型强制要求 tap 等价',
          '**运行时 dev-only assertion**：组件 mount 时检查 hit area < 44px → `console.warn`；hover-only onClick 检查到没有 onTouchEnd → warn',
          '**ESLint 自定义规则**：`eslint-plugin-gds-v4` 拦截 `onMouseEnter` 没配 `onTouchStart` 的代码；拦截 `h-[100vh]`；拦截直接写 rem/px 不走 token',
          '**Stylelint 规则**：禁止直接写 `@media (min-width: 1024px)` 这种任意断点，必须用 v4 的 2 档 preset',
          '这些约束越多、越严，AI 越不可能产出"看似对但在 mobile 上挂"的代码',
        ],
      },
    ],
    sources: [
      'AI 起草于 2026-04-18，基于 v4 principles #1 / 研究 #1 / 与用户讨论',
      '实际落地前需要人工审核每一条，尤其是"强制"和"不允许"类的硬约束',
    ],
  },
  {
    id: 'v4-ai-native-support',
    title: 'v4 的 AI-native support 怎么设计',
    question:
      'v4 作为"AI 直接消费者"的框架，"让 AI 当成 skills 来用" 这条要求要怎么落到 API、类型、元数据、skill、MCP、审计这几层？',
    sections: [
      {
        heading: '前提：AI 是直接消费者，不是副位',
        body: 'v4 不是"人类用、AI 也能读懂"的组件库，是"AI 用、人类不直接写代码"的框架。这个前提不承认，后面所有约束都没意义。人类在 v4 里的角色是立规则、审产出、做真实环境验证；AI 在 v4 里的角色是主力写手——写 React 组件树、写 routing、写 state 管理、写表单、写列表、写页面。终端 webapp 服务于人类用户，但中间"写代码"这一步由 AI 完成。',
        points: [
          '这不是"AI copilot"（辅助人写），是"AI author"（AI 主写）',
          '所以 API 的 ergonomic 设计标准是"AI 读完一次就不会犯错"，而不是"人类用起来爽"——两者经常冲突',
          '人类体验由 /web 和审计工具保障，AI 体验由 API / 类型 / metadata / skill 保障',
          '这也是为什么 v4 有 /principles、/researches、/thinkings 这些 PM 区——人类在这里立规则',
          '消费者列表（7+ 应用：devops/dashboard、goliajp 全家、mailrs、sisi、dada、dadaya 等）也都是通过 AI 写代码消费 v4，不是人类手写 import',
        ],
      },
      {
        heading: 'AI 的失败模式清单（先列清楚才能针对性约束）',
        body: '设计 AI-native API 不能靠 "AI 聪明会知道" 这种假设。必须先列 AI 已知的失败模式，然后一条一条针对性防守。下面这 8 种在 Claude / Codex 产 UI 时反复出现。',
        points: [
          '**矩阵补全**：看见 4 个层有 A/B/C 组件，第 5 层自动补出 D——不是真需要，是对称美感',
          '**均匀套规则**：10 个原则要求"所有组件都支持"，AI 就硬给每个组件加 glass prop，哪怕无意义（v2 的 motion 只 Button 有、glass 30% 就是这么来的）',
          '**覆盖率替代判断力**：为了"完整性"写 390 个组件，真正常用就那 30 个',
          '**幻觉 prop**：看见 shadcn 有 `asChild`，写别的库时也脑补这个 prop 存在；看见 Material 有 `elevation`，写 Tailwind 版本时也以为有',
          '**堆选项**：同一个功能给多种 API（`Button.Icon` / `iconButton` / `Button with icon prop`）——都是"万一 user 想这样" 的幻觉需求',
          '**低层分支爆炸**：`variant × size × state × density` = 100 种组合，AI 其中几种没测过就写死，运行时出错',
          '**不会说不**：user 说"加 X"，AI 加 X，不会判断"X 真的需要吗"——这是最大的风险',
          '**Distributional convergence**：默认收敛到训练数据中位——Inter + 紫渐变 + 白底，不给方向就永远平庸',
        ],
        images: [
          {
            svg: SVG_DISTRIBUTION,
            caption:
              'AI 默认产出集中在训练数据分布的中位（安全 + 平庸）。v4 要用明确立场把 AI 推到分布的边缘（有特征 + 可识别）。',
          },
        ],
      },
      {
        heading: 'API 设计的 6 条硬约束',
        body: '针对上面的失败模式，API 层至少要守住这 6 条。这些不是"推荐"，是"不这样就不算 v4 组件"。',
        points: [
          '**唯一性**：一个功能只有一种 API。Button 只一个，不再 `PrimaryButton` / `IconButton` / `GhostButton` 独立组件——全靠 variant。搜索框只一个 `<Input>` + icon，不做 `SearchInput`',
          '**组合 > 配置**：`<Card><Card.Header /></Card>` 胜过 `<Card title=... action=... headerContent=...>`。组合 AI 能看见结构，配置要猜 prop 顺序',
          '**严类型 + 宽 runtime**：TypeScript 层拒绝非法 prop（立刻 tsc 爆）；runtime 把未知 prop 透传 DOM（避免 silent fail，AI 的实验不会默默失败）',
          '**无隐藏依赖**：依赖必须类型可见。不允许"记得 wrap 在 ThemeProvider 里" / "记得加 .gds-ctx class"——要么类型强制，要么 runtime 抛清楚的错',
          '**低层分支封装**：`if / else` 封在 API 内部，AI 只做高层编排。`<List density="compact">` 自动决定要不要虚拟化，consumer 不需要选',
          '**拒绝特化**：`SearchInput` / `PasswordInput` 这种特化组件一律不做——`<Input type="search" icon={...} />` 组合搞定。每个特化都是 AI 可能混淆的入口',
        ],
      },
      {
        heading: '自描述 metadata 层',
        body: 'AI 要能"查"到 v4 有什么组件、每个组件接受什么 prop、组件怎么组合——不能靠人手写的 README。metadata 必须机器可读，并且在 runtime 和 build-time 都能取到。',
        points: [
          '每个组件导出 `__metadata`：`{ name, layer, accepts: Props, emits: Events, composesWith: string[] }`',
          'Runtime DOM 自带 `data-gds-component` / `data-gds-variant` / `data-gds-state`——AI 可以从浏览器 DOM 反推组件树（审计可视化 / debug 用）',
          'TypeScript 类型本身就是"可查文档"——所有 props 用 JSDoc 注释，编辑器 tooltip 直接显示意图',
          '`@goliapkg/gds/registry` 导出一个 JSON manifest，列所有组件 + 类型 + 合法组合 + 反例——AI 一次性读就能建完整心智模型',
          '**Anti-patterns 明示**：每个组件有 `__avoid` 字段列"不要这样用"——例如 Button 的 __avoid 包含 "用 div + onClick 自建按钮"',
          '这让 AI 的心智模型不依赖"我以前见过类似的库"——它是 v4-specific 知识',
        ],
      },
      {
        heading: '类型系统作为硬约束载体',
        body: '"克制"如果只是文档里的一句话，AI 会忘。必须让 TypeScript 直接拒绝写错的代码——编译不过 = AI 立刻看到错，立刻改。',
        points: [
          '所有枚举值是 string literal union，不允许任意字符串：`variant: "primary" | "ghost"`，不是 `variant: string`',
          '`size` prop 类型 `"sm" | "md" | "lg"`——不允许 `"medium"` 或 `"large"`，AI 如果手滑写 "medium" 立刻 tsc 报错',
          '没有 `any`——所有 props 严格类型。runtime 的 `...props` 透传走 `HTMLAttributes` 严格子集',
          '`asChild` 等"强力但危险"的 prop 需要主动 opt-in（单独的 `<SlotButton>` 或类似），不混在默认 API 里',
          'Breaking change 和 TypeScript 版本挂钩：删 prop → tsc 立刻爆；加可选 prop → 向后兼容；改 prop 类型 → major bump + codemod',
          'AI 的 "typing 严格但 runtime 宽松" 哲学：写错代码 IDE 立刻红线，不等运行时',
        ],
      },
      {
        heading: 'Skill 作为分发机制（窄激活 + 高密度指令）',
        body: 'Anthropic 的 frontend-design skill（研究 #3）证明"窄激活 + 高密度指令"比"永久规则塞 CLAUDE.md"经济。v4 应该用同样的机制分发自己的使用指南。',
        points: [
          'v4 发布多个 Claude Code skill：`gds-v4`（base）、`gds-v4-form`（表单）、`gds-v4-data`（数据展示）、`gds-v4-chrome`（layout/nav）',
          '每个 skill ~300-500 tokens，description 精确匹配对应场景的 user intent',
          'Skill 内容结构：禁止清单（NEVER）+ 推荐 pattern + 具体 import 路径 + 必要反例',
          'Skill 里明示"一次一个组件"——拒绝 bulk 生成，和 PM 工作方式一致',
          '**Skill 也要 ship 审计规则的入口**——让 AI 写完代码能主动调用 `gds audit` 自检',
          'Skill 不是 CLAUDE.md——它只在匹配到对应意图时加载，不占永久 context 预算',
        ],
      },
      {
        heading: 'MCP + Registry：注入项目的真实上下文',
        body: '单纯 prompt 工程不够——AI 每次都猜当前项目的 API 和 tokens，研究 #2 显示 UI 生成成本 100k-500k tokens 大半耗在"反复描述项目状态"上。MCP 把真实项目状态注入 AI 的 context，显著降本提质。',
        points: [
          '`@goliapkg/gds-mcp`：v4 ship 的 MCP server，Claude Code / Codex / Cursor 都能查',
          '`list_components()` → 当前项目能用的组件清单（考虑版本）',
          '`get_component_api(name)` → 某组件的 props / variants / slots',
          '`get_tokens()` → 当前 theme 的颜色 / 间距 / 字号',
          '`search_by_intent(query)` → "我需要一个 dashboard 侧栏" → 返回推荐组件组合（多组件编排建议）',
          '`validate(code_snippet)` → 扫一段 JSX，立刻返回违反哪条 v4 规则',
          '遵循 shadcn 的 Registry 规范——和业界约定兼容',
          '零配置：装了 v4 就自动 expose MCP，consumer 不需要另外接',
        ],
        images: [
          {
            svg: SVG_MCP_FLOW,
            caption: 'MCP 让 AI 不再"猜" v4 的 API 和 tokens——查一遍就知道。',
          },
        ],
      },
      {
        heading: '审计闭环：v4 怎么自检',
        body: '约束再多，AI 也会偶尔犯错。需要自动审计闭环：AI 写完代码，audit 跑一遍报违规，AI 看报告自纠，再跑。这比"希望 AI 一次写对"现实得多。',
        points: [
          '`gds audit <path>`：CLI 工具，扫文件夹，报所有违反 v4 规则的点',
          '**审计规则书 = `.claude/rules/gds-v4-*.md` + 代码形式的 `eslint-plugin-gds-v4`**——两者保持同步，一份给人看、一份机器执行',
          '每个违规输出：位置（file:line）+ 违反哪条规则 + 怎么改的示例',
          '审计可以在 CI 里跑（blocker），也可以在 AI 写完代码后立刻跑（self-correct）',
          'MCP 的 `validate()` 调用审计引擎——AI 在写代码过程中就能自检',
          '**积累机制**：发现新的 AI 错误模式 → 加审计规则 → 下次 AI 自动被拦。每个新规则都是未来所有生成受益的存量资产',
        ],
      },
      {
        heading: '反 distributional convergence：v4 自己的美学立场',
        body: '按研究 #3（Anthropic frontend-design）的发现，AI 默认输出会收敛到训练数据中位——Inter、紫渐变、白底、system fonts。v4 必须给一个明确的美学立场，把 AI 的默认产出从中位推开。这个立场不是选配、是默认。',
        points: [
          'v4 **不**用 Inter / Roboto / Arial 作默认字体——选一套有强意图的字体对（具体是什么由人决定）',
          'v4 **不**用紫色渐变白底——选有立场的颜色系统（具体方向由人定义）',
          '默认视觉 = 一个明确的 design direction。消费者不指定的话，产出就是这个特定美学——永远不是 generic safe',
          '想用别的美学需要主动 opt-in（`theme="minimal-light" | "editorial-dark" | ...`）——需要成本',
          '这和研究 #3 里 Justin Wetch 的"禁止清单 > 推荐清单"观察一致：直接砍掉 AI 最想去的高概率区域',
          '注意：美学方向本身由人决定，AI 不做这个决定——这是 v4 "人主导" 原则的体现',
        ],
      },
      {
        heading: '如何防止 AI bulk 产出（v2 翻车的直接原因）',
        body: 'v2 翻车的直接原因是"让 Claude Code 一次生成 10 个组件"这种批量操作。v4 要把这种模式主动防掉——通过 skill 指令 + 工作流 + 审计三层。',
        points: [
          'Skill 文本里直接写"不要在一次回复里生成多个组件"——Claude 读到会按指令分步',
          '审计工具检测"短时间内 N 个新组件 commit"并 flag 给人工审查',
          'CI rule：一个 PR 不能同时动多个组件文件（refactor 例外，需要标记）',
          '文档 / 引导 / skill description 里所有示范语气都是"我们现在做 X 组件，其他的下次"',
          'PR template 强制填：动了哪些组件 / 人工验证过哪些真机 / 是否有审计违规',
          '本质：让 AI 的"一次性产出大量"变得摩擦很高，自然回归到"一次一个"',
        ],
      },
    ],
    sources: [
      'AI 起草于 2026-04-18，基于 v4 positioning / principles #2 / 研究 #2 #3 / 与用户讨论',
      '实际落地前每一条都要人工审——尤其是 metadata 层、MCP 设计、审计规则书的具体内容',
      '与研究 #2 里总结的"跨工具跨论文共通模式"强对应：上下文注入、结构化表示、约束输出、copy-paste ownership、先立美学、API 一事一用',
    ],
  },
]

export function ThinkingsView() {
  return <MasterDetailView entries={THINKINGS} listLabel="Thinkings" topicPrefix="Topic" />
}
