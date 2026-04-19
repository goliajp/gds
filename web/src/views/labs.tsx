import { cx } from '@goliapkg/gds'
import { useState } from 'react'

type LabStatus = 'design' | 'prototype' | 'ready'

type LabBlock =
  | { kind: 'heading'; text: string; level?: 2 | 3 }
  | { kind: 'prose'; text: string }
  | { kind: 'bullets'; items: string[] }
  | { kind: 'code'; lang?: string; content: string; caption?: string }
  | { kind: 'note'; variant?: 'info' | 'warn'; text: string }
  | { kind: 'preview'; render: () => React.ReactNode; caption?: string }

type Lab = {
  id: string
  title: string
  status: LabStatus
  summary: string
  blocks: LabBlock[]
}

// ============================================================================
// Lab #1 — Text
// ============================================================================

const TEXT_LAB: Lab = {
  id: 'text',
  title: 'Text — 最基础的文本渲染原语',
  status: 'design',
  summary:
    '外部 API 尽量少（< 12 个 prop 覆盖 95% 场景），内部吃掉浏览器兼容、selection 控制、行高度量、i18n、iOS/Android 怪癖、OpenType features 等大量细节。',
  blocks: [
    { kind: 'heading', text: '1 · 为什么要独立封装 Text' },
    {
      kind: 'prose',
      text: 'HTML 原生已经有十几个文本标签（p / span / h1-h6 / strong / em / code / small / mark / abbr / time 等），为什么还要再封一层？三个硬理由：',
    },
    {
      kind: 'bullets',
      items: [
        '**兼容性控制**：iOS / Android / Safari / Firefox / Chrome 在 font-smoothing、tap-highlight、selection 颜色、自动字号缩放、emoji 渲染等方面有大量细节不一致。每一次让消费者自己处理，就是 AI 又一次可能漏的地方。',
        '**UI 正确性——selection 控制**：button label、nav item、chrome 文字不该被用户选中（拖动该 drag 整个元素，不是选文字）；content 文字必须可选；code block 点一下要全选。这个决策不能依赖消费者记得写 `user-select: none`。',
        '**设计一致性**：字号、行高、字重、字色必须走 token，不允许消费者写 `style={{ fontSize: 14 }}`。类型层强制，runtime 兜底。',
      ],
    },
    {
      kind: 'note',
      variant: 'info',
      text: '核心哲学：外部 API 是冰山一角，内部是海量兼容性和正确性补丁。消费者（含 AI）只需学 10 个 prop，不需要知道 `-webkit-font-smoothing` 存在。',
    },

    { kind: 'heading', text: '2 · 外部 API 表面（最小集）' },
    {
      kind: 'prose',
      text: '先锁定 API 形状——所有后续决策都是在解释"每个 prop 内部做了什么"。类型严格（string literal union），不给消费者写错的机会。',
    },
    {
      kind: 'code',
      lang: 'tsx',
      content: `type TextProps = {
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      | 'strong' | 'em' | 'small' | 'code' | 'kbd' | 'label'
      | 'caption' | 'time' | 'mark' | 'cite' | 'abbr'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
  family?: 'sans' | 'serif' | 'mono'
  color?: 'fg' | 'fg-secondary' | 'fg-muted' | 'accent'
         | 'danger' | 'warning' | 'success' | 'inherit'
  align?: 'start' | 'center' | 'end' | 'justify'
  select?: 'auto' | 'none' | 'text' | 'all'
  transform?: 'none' | 'upper' | 'lower' | 'capitalize'
  decoration?: 'none' | 'underline' | 'strike'
  truncate?: boolean | number   // true=1 line, n=n-line clamp
  numeric?: 'tabular' | 'oldstyle'
  italic?: boolean
  dim?: boolean
  highlight?: string | string[] | RegExp   // match 高亮，自动包 <mark>
  highlightVariant?: 'accent' | 'warning' | 'success'   // 默认 accent
  children: React.ReactNode
  className?: string
}`,
      caption:
        '16 个 prop。其余一切都是内部决策。v4 偏好把能力挂到现有组件 prop 上——不为 match 高亮另开 `<Highlight>` 组件。',
    },

    { kind: 'heading', text: '3 · 语义层：as prop（唯一"需要思考"的决策）' },
    {
      kind: 'prose',
      text: 'Text 的视觉不决定 DOM 元素——as 决定。这样做解耦了"我要渲染什么 HTML 标签"和"我要什么视觉"。screen reader 跟着 as 走，视觉工具类可以自由搭配。',
    },
    {
      kind: 'bullets',
      items: [
        '`as="span"` （默认）—— 行内，不干扰布局',
        '`as="p"` —— 段落，默认 margin（v4 会 reset）',
        '`as="h1" ... "h6"` —— 保留 screen reader landmark，视觉 size/weight 独立控制',
        '`as="strong"` —— 语义强调 + 默认 bold（weight 可 override 但语义仍强调）',
        '`as="em"` —— 语义斜体',
        '`as="code"` —— 行内代码 + 默认 mono family + 默认 select=all',
        '`as="kbd"` —— 键盘输入提示',
        '`as="time"` —— 可配 `dateTime` attr（需要透传）',
        '`as="abbr"` —— 带 title tooltip（title 需要透传）',
        '`as="mark"` —— 高亮文字，默认 accent 背景',
        '`as="label"` —— form label，需要 htmlFor（透传）',
      ],
    },
    {
      kind: 'note',
      variant: 'warn',
      text: 'Anti-pattern：不要用 Text 做可点击区域（用 Button / Link）；不要嵌套 Text（`<Text><Text/></Text>` 语义会出错，类型层禁止）。',
    },

    { kind: 'heading', text: '4 · Typography Scale — size / weight / family' },
    { kind: 'heading', text: 'Size', level: 3 },
    {
      kind: 'code',
      lang: 'css',
      content: `xs   → 11px  (mobile 10px)    caption / meta
sm   → 13px                   secondary body
md   → 14px                   default body  ★
lg   → 16px                   subtitle
xl   → 20px                   h3
2xl  → 24px                   h2
3xl  → 32px                   h1`,
    },
    {
      kind: 'bullets',
      items: [
        '为什么 md=14 而非 16？桌面 productivity app 的常用密度。研究 #1 显示 iOS Dynamic Type 会动态调整，v4 先定 baseline。',
        '下限 10px（只 mobile 的 xs）。下限硬边界——不允许写更小。',
        '上限 3xl (32px)。要更大用 Heading 组件（后续做），避免 Text 承担"大标题"语义',
        '**mobile 专属 xs=10px 是唯一断点相关的 size 差异**，其他 size 全断点一致（Principle #1 要求 mobile 原初形态）',
        '实现走 CSS var：`--text-size-xs` 等，便于主题覆盖',
      ],
    },

    { kind: 'heading', text: 'Weight', level: 3 },
    {
      kind: 'bullets',
      items: [
        'regular=400 / medium=500 / semibold=600 / bold=700 —— 只四档',
        '不给 100/300/800/900——多一个选项多一份 AI 犯错空间',
        '类型层 union 严格，`weight={550}` 编译不过',
        '`as="strong"` 默认 bold，但 weight 可 override：`<Text as="strong" weight="medium">` 合法，语义仍是 strong',
        '字体必须支持全部四档 weight——选字体时是硬指标',
      ],
    },

    { kind: 'heading', text: 'Family', level: 3 },
    {
      kind: 'bullets',
      items: [
        'sans / serif / mono 三档',
        '具体字体不 AI 决定——这是人的美学立场（研究 #3 证明 AI 默认 Inter/Roboto/Arial 是"AI slop"）',
        'mono 的 fallback 栈必须包含 system mono（`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`）保证无 web font 时不崩',
        '字体加载：`font-display: swap` 避免 FOIT（font invisible）；加载失败时 fallback 必须视觉相近（x-height 匹配）',
        'Emoji fallback 放最后：`"MyFont", "Apple Color Emoji", "Segoe UI Emoji", sans-serif`',
      ],
    },

    { kind: 'heading', text: '5 · Color（走 token，不暴露 hex）' },
    {
      kind: 'bullets',
      items: [
        'fg / fg-secondary / fg-muted —— 主/次/静音三档前景',
        'accent / danger / warning / success —— 状态色',
        'inherit —— 不 override，跟父级（适合 link 等嵌套语境）',
        '所有 color 在 `@theme` 里定义，light/dark 自动切换',
        '**`dim` prop 不是 opacity**——opacity 会影响子元素、也会让 accent 色褪色。v4 用 `color-mix(currentColor, transparent, 40%)` 或 fg-muted 映射实现',
        '消费者想要自定义颜色？走 `color="inherit"` + 外层设 CSS var，不暴露 `style`',
      ],
    },

    { kind: 'heading', text: '6 · 垂直度量：line-height / leading / baseline / 视觉居中' },
    {
      kind: 'prose',
      text: '最容易出 bug 的维度。文字的"元素居中"不是 baseline 居中——不同字号的 cap-height / x-height / 下行 (descender) 不同，同一个 line-height 下小字号看起来"头重脚轻"。这是 Text primitive 要吃掉的一个大坑。',
    },
    {
      kind: 'bullets',
      items: [
        '默认策略：各 size 有对应的 line-height 表（xs=1.4 / md=1.5 / 3xl=1.2 —— 大号更紧）',
        '`tight` 效果（保留给后续）：`line-height: 1em` + optional leading-trim。button label / chip / tag 需要元素居中时用',
        '**leading-trim / text-box-trim**：新 CSS（Safari 17+），把 font 自带的 half-leading 吃掉，让 cap-height 精确贴住容器。浏览器支持普及后默认启用',
        'Capsize-style calculation：预计算每个字体的 cap / descender 比例，用 negative margin 抵消——backup 方案，兼容老浏览器',
        'sub / sup 不影响 line-height（通过 `vertical-align` + `font-size: 0.75em` 实现，line-height 保持段落一致）',
        '下划线偏移：默认 browser 的 `text-decoration-underline-offset` 位置难看（贴字），v4 设 `0.15em` + `text-decoration-thickness: 1px`',
      ],
    },
    {
      kind: 'note',
      variant: 'info',
      text: 'mobile 性能：`text-rendering: optimizeLegibility` 在 Android 低端机影响性能，小字号 (<11px) 自动关闭。',
    },

    { kind: 'heading', text: '7 · 水平布局：align / direction / RTL' },
    {
      kind: 'bullets',
      items: [
        '`align` 用 logical properties：`text-align: start | end | center | justify`——自动适配 RTL / LTR',
        '不暴露 `direction` prop——通过根 `<html dir="rtl">` 或 `<AppShell dir>` 统一，Text 继承',
        'bidi 混排（阿拉伯 + 英文）默认依赖浏览器 UBA（Unicode Bidi Algorithm），不干预',
        '特殊情况（强制覆写 bidi）用 `<bdo>` + Text `as="bdo"`——暂不加到 as 列表，有需求再加',
        'justify 慎用：短文字会有巨大字间距，默认不推荐（文档标注）',
      ],
    },

    { kind: 'heading', text: '8 · Transform & Decoration' },
    {
      kind: 'bullets',
      items: [
        '`transform="upper"` → `text-transform: uppercase` **+ 自动加 `letter-spacing: 0.05em`**（全大写需要略松散才好看）',
        '`transform="lower"` → 简单 lowercase',
        '`transform="capitalize"` 默认**不推荐**——按单词首字母的机械规则会把 McDonald\'s 变成 Mcdonald\'s。文档明确标注',
        '`decoration="underline"` → 默认配 `text-underline-offset: 0.15em` + `text-decoration-thickness: 1px`（比默认好看）',
        '`decoration="strike"` → `line-through` + 默认 color 同 currentColor（避免删除线色差）',
        '不支持 overline / wavy / dotted——特化需求，当前不做',
        'italic 通过 `italic` boolean 控制——不混到 `decoration` 里（正交维度）',
      ],
    },

    { kind: 'heading', text: '9 · Match 高亮 / <mark>（搜索命中、autocomplete、inline diff）' },
    {
      kind: 'prose',
      text: 'search result、autocomplete、inline diff 等 UI 经常需要"原文一段，匹配部分高亮"。v4 把这个能力**直接挂到 Text 的 `highlight` prop 上**，不另起 Highlight 组件——遵循"tag 尽可能少、能力强"的原则。HTML 原生 <mark> 的默认黄 v4 会 token 化。',
    },
    {
      kind: 'heading',
      level: 3,
      text: '基本用法',
    },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// 单关键词
<Text highlight="world">hello world</Text>
// 渲染：hello <mark>world</mark>

// 多关键词
<Text highlight={['foo', 'bar']}>foo and bar</Text>

// 正则（大小写敏感走 RegExp 不带 i flag）
<Text highlight={/\\b\\d+\\b/g}>id 123 and 456</Text>

// 换 variant 颜色
<Text highlight="保存" highlightVariant="warning">未保存的改动</Text>`,
    },
    {
      kind: 'bullets',
      items: [
        '**自动包 `<mark>`**：命中的片段内部渲染成 `<mark>`，screen reader 自动 announce "highlighted"',
        '**token 化颜色**：`highlightVariant` = accent | warning | success（默认 accent），底层走 `var(--color-<variant>-soft)` + `<variant>-strong`，不走浏览器默认黄',
        '**默认 case-insensitive**：`highlight="World"` 匹配 "world" / "WORLD"。要大小写敏感传 RegExp 不带 `i` flag',
        '**正则特殊字符**：string 形式内部自动 escape，消费者不用处理 `.` `*` `?`',
        '**多关键词重叠**：按更长的优先（避免 "car" / "cart" 嵌套）',
        '**空值容错**：空字符串 / 空数组 / 不存在的匹配 → 直接返回原文',
        '**Unicode / emoji**：用 `[...string]` 迭代码点切片，不用 `String.length`',
        '**RTL / bidi**：原文 dir 决定高亮方向，不强制 LTR',
        '**性能**：内部单次 split 或 regex 扫描，不多次 replace',
        '**children 约束**：`highlight` 只作用于 string 类型的 children。JSX children 时 skip + dev warn',
      ],
    },
    {
      kind: 'heading',
      level: 3,
      text: '手动语义（不走 highlight prop）',
    },
    {
      kind: 'code',
      lang: 'tsx',
      content: `<Text>
  hello <Text as="mark">world</Text>
</Text>`,
      caption:
        '手动知道哪段要高亮、不需要搜索逻辑时用。Text 嵌套 Text 在 as="mark" 上是豁免的例外。',
    },
    {
      kind: 'note',
      variant: 'warn',
      text: 'Anti-pattern：`<span style={{ background: "yellow" }}>` 手搓高亮。视觉对但：(1) screen reader 不读"highlighted"；(2) 颜色不走 token，dark mode 出洋相；(3) 不可审计。v4 强制走 `<Text highlight>` 或 `<Text as="mark">`。',
    },
    {
      kind: 'heading',
      level: 3,
      text: '未定的小细节',
    },
    {
      kind: 'bullets',
      items: [
        '多关键词时要能各自不同颜色？—— 当前单一 `highlightVariant` 统一应用。真出现"红高亮 + 蓝高亮并存"的 UI 场景再加丰富形式',
        '正则模式下要不要限制 backreferences / lookahead 防 ReDoS？—— MVP 不限，观察后加',
      ],
    },

    { kind: 'heading', text: '10 · Selection 控制（独立封装的核心理由）' },
    {
      kind: 'prose',
      text: 'HTML 默认所有文字可选中。但 UI chrome（按钮文字、nav 项、tab label、status chip）不该被选中——拖动应该 drag 整个元素，不是选文字。Content 文字必须可选。code block 点一下最好全选。这些必须在 primitive 层强制，不能依赖消费者记得写 CSS。',
    },
    {
      kind: 'bullets',
      items: [
        '`select="auto"` = 默认 = 继承父级。content 文字场景用这个',
        '`select="none"` = `user-select: none` + `-webkit-user-select: none` + **`-webkit-touch-callout: none`**（关键：避免 iOS 长按弹系统菜单）',
        '`select="text"` = 强制可选（即便父级 select=none）',
        '`select="all"` = 点击即全选，code / inline snippet 常用',
        '**`-webkit-tap-highlight-color: transparent`** 默认全局——iOS 点击的灰色 overlay 丑，永远不要',
        '**`::selection`** 自定义样式走 token：背景 `accent/20`，文字 `fg`——所有 Text 组件内统一',
        'Android 的 long-press selection handle 不能完全控制，只能通过 `select="none"` 禁用整段——这是平台限制，非 v4 问题',
        '默认根据 `as` 自动选：button / nav 场景的 Text 默认 select=none（由 Button 组件的外层设置），content 场景默认 auto',
      ],
    },

    { kind: 'heading', text: '11 · 截断 & 溢出（单行 ellipsis / 多行 clamp / word-break）' },
    {
      kind: 'prose',
      text: '文字溢出是 UI 的另一个大坑。v4 用一个 `truncate` prop 统一单行和多行。',
    },
    {
      kind: 'code',
      lang: 'tsx',
      content: `<Text truncate>一行省略，任意长度在容器边缘 …</Text>
<Text truncate={3}>三行 clamp，超出显示 …</Text>`,
    },
    {
      kind: 'bullets',
      items: [
        '`truncate={true}` → `overflow:hidden` + `text-overflow:ellipsis` + `white-space:nowrap`',
        '`truncate={n}` → `display:-webkit-box` + `-webkit-line-clamp:n` + `-webkit-box-orient:vertical` + `overflow:hidden`（现代浏览器也接受 `line-clamp: n` 标准属性，v4 两个都写）',
        '**flex 父容器陷阱**：truncate 的子在 flex 里需要 `min-width: 0`，否则不会收缩——v4 内部自动在 Text 上加 `min-w-0`（安全冗余）',
        '`word-break: normal`（默认）对中英混排通常对；`break-word` 用在长 URL / 长英文单词；`break-all` 几乎永不需要',
        '`overflow-wrap: anywhere`（现代）+ `word-break: break-word`（老 Safari fallback）—— v4 内部都加',
        '`hyphens: auto` 需要 `<html lang="...">` 才生效——v4 不强制，由 AppShell 层处理 lang attr',
        '渐变淡出（fade mask）而非 ellipsis？——MVP 不做，v2 Phase 再考虑',
      ],
    },

    { kind: 'heading', text: '12 · White-space 模式' },
    {
      kind: 'bullets',
      items: [
        '默认 `normal`：collapse 空白与换行',
        '`<Text as="code">` 默认 `pre`：保留所有空白 + 不换行',
        '多行代码要换行：单独 CodeBlock 组件（后续），不是 Text 的职责',
        '非 as=code 的情况不暴露 whiteSpace prop——实际需要时再加',
      ],
    },

    { kind: 'heading', text: '13 · i18n & CJK 特殊处理' },
    {
      kind: 'prose',
      text: '中文不空格分词、Thai 没空格、阿拉伯从右到左、日本可以竖排——v4 至少要让这些场景不崩。',
    },
    {
      kind: 'bullets',
      items: [
        'CJK 行尾换行：`word-break: normal` 已正确处理（会在字符间换行），**不要**手动设 `break-all`',
        'CJK 文字 font-smoothing 默认 `antialiased` 会发虚——v4 检测 root `lang` attr，非 latin 切 `subpixel-antialiased`',
        '混排 CJK + Latin：line-height 取 CJK 的（更高），否则英文 ascender 会被剪',
        'Emoji 渲染：Apple / Google emoji 不同；Windows 不渲染 flag emoji（显示两字母 code）——平台行为，v4 不干预',
        '数字对齐：`font-variant-numeric: tabular-nums` 对数据表至关重要（`numeric="tabular"`）',
        '标点挤压：CJK 有半/全宽标点，不强制处理，复杂场景消费者自己加 `lang`',
        'Thai / Khmer 的断词：依赖 `word-break` + 浏览器 ICU，老浏览器可能异常——文档声明',
        'Vertical writing（`writing-mode: vertical-rl`）：特殊需求，Text 层不默认支持',
      ],
    },

    { kind: 'heading', text: '14 · 移动端特定坑' },
    {
      kind: 'bullets',
      items: [
        '**iOS 自动字号缩放**：`<meta viewport>` 没配 `user-scalable=no` + 字号 <16 时 input focus 会触发放大。v4 不是 input，但 `<html>` 层设 `-webkit-text-size-adjust: 100%` 可防止整页放大',
        '**`-webkit-font-smoothing: antialiased` + `-moz-osx-font-smoothing: grayscale`**：默认开，对 latin 深色字舒服；但 macOS dark mode 下浅色字可能偏细——需要主题层适配',
        '**`text-rendering: optimizeLegibility`**：默认开启全局；但 Android 低端机性能退化明显——v4 检测小字号 (<11px) 自动回退 `auto`',
        '**`-webkit-tap-highlight-color: transparent`**：全局去掉点击灰色 overlay',
        'iOS Dynamic Type（系统字号设置）：理论走 rem 体系可以跟随，实践中 Safari 对 app 的支持不完整——MVP 不保证，文档标注 TBD',
        '长按选择 handle 的颜色：在 iOS Safari 和 Android Chrome 都不能通过 CSS 控制——平台默认',
      ],
    },

    { kind: 'heading', text: '15 · OpenType Features（ligatures / tabular / kerning）' },
    {
      kind: 'bullets',
      items: [
        '默认开：`kern` (kerning) / `liga` (standard ligatures) / `calt` (contextual alternates)',
        '`numeric="tabular"` → `font-variant-numeric: tabular-nums` —— 数据表格对齐刚需',
        '`numeric="oldstyle"` → `onum` —— 排版感字体、书刊风格',
        '分数 `frac` / 小型大写 `smcp` —— MVP 不做',
        'Variable font：如果字体支持，`font-variation-settings` 可以细调 weight / width —— v4 不暴露，通过 weight prop 映射（保留未来空间）',
      ],
    },

    { kind: 'heading', text: '16 · Accessibility' },
    {
      kind: 'bullets',
      items:
        '`as` prop 决定 screen reader 看到的语义 landmark。保证 as="h1" 真的被 announce 为 heading level 1。'
          .split('\n')
          .concat([
            '对比度：fg vs bg ≥ 4.5:1（WCAG AA body）。fg-muted 在某些背景可能 < 4.5，需要主题 audit',
            'ARIA 透传：所有 `aria-*` attributes 走 `{...rest}` 透传到 DOM',
            '`prefers-contrast: more` → theme 层切高对比 palette，Text 不自处理',
            '`prefers-reduced-motion`：Text 本身无动画，安全；未来的打字机 / 渐显动画需要尊重',
            'VisuallyHidden（sr-only）：独立组件，Text 不混',
            '`lang` attr：由 AppShell 层在 `<html>` 上设，Text 继承；非默认语言段落可以 `<Text lang="ja">` 手动标',
          ]),
    },

    { kind: 'heading', text: '17 · 浏览器 quirks 吸收清单' },
    {
      kind: 'bullets',
      items: [
        'Safari 在 `max-width` flex 子 + `truncate` 时的 sub-pixel glitch —— 加 `min-width: 0` + `max-width: 100%` 双重保险',
        'Firefox 的 `-moz-osx-font-smoothing: grayscale` —— 别忘了 moz 前缀',
        'Chrome 与 Safari 的默认 kerning 开关不同 —— 显式设 `font-kerning: normal`',
        'iOS Safari dark mode 下 antialiased 的副作用 —— 浅色字偏细',
        'Windows ClearType vs macOS antialiased —— 平台渲染差异大，视觉 QA 必须双平台',
        'emoji + 自定义字体 fallback 顺序：系统 emoji 必须在 latin 字体之后',
        'Android Chrome 的自动加粗（boosting）—— 要关：`text-size-adjust: none`',
      ],
    },

    { kind: 'heading', text: '18 · Anti-patterns（AI 容易犯的错）' },
    {
      kind: 'bullets',
      items: [
        '❌ `<span style={{ fontSize: 14 }}>` → ✓ `<Text size="md">`',
        '❌ 用 `<Text onClick={}>` 做可点击区域 → ✓ `<Button>` 或 `<Link>`',
        '❌ `<Text as="strong" weight="medium">` 如果想"不 bold 的 strong"——这是反直觉的，文档明确反模式',
        '❌ 嵌套 Text（`<Text><Text /></Text>`）——类型层禁止，或 runtime warn',
        '❌ 直接覆盖 className 改颜色/字号 → ✓ 用 prop',
        '❌ 用 `dangerouslySetInnerHTML` 塞 HTML → ✓ 结构化 children',
      ],
    },

    { kind: 'heading', text: '19 · MVP 实现计划' },
    {
      kind: 'prose',
      text: '上面列的是理想态。第一版 MVP 不用全实现——但 API 类型要 final（避免后期 breaking）。分三阶段：',
    },
    {
      kind: 'bullets',
      items: [
        '**Phase 1 (MVP)**：as / size / weight / family / color / align / select / truncate / className / children',
        'Phase 1 不做：leading-trim / tabular-nums / transform / decoration / dim / italic / numeric',
        'Phase 1 默认 `as="span"`；内部用 CVA + Tailwind 实现',
        'Phase 1 必须验证：单测全绿 + 视觉 snapshot + **iPhone Safari / iPad Safari / macOS Chrome 真机过一遍**',
        '**Phase 2**：numeric / transform / decoration / italic / dim',
        'Phase 2 加 i18n 基础测试（中日韩文本不崩）',
        '**Phase 3**：leading-trim（等 Safari / Chrome 支持普及）+ 复杂截断（fade 变体）',
      ],
    },

    { kind: 'heading', text: '20 · 开放问题（等人定，AI 不预设）' },
    {
      kind: 'bullets',
      items: [
        '**具体字体选择**：sans 不用 Inter，用什么？serif 用什么？mono 是否允许 fallback 到系统 mono stack？',
        'size scale 要不要 mobile 专属档位（比如 mobile md=15）？还是全局统一',
        '`dim` 实现用 `color-mix` 还是直接 fg-muted 映射？前者更灵活，后者更可预测',
        '`as="blockquote"` 支持？还是另起 Quote 组件？',
        'button label 专用 size / line-height 要不要另起 token（`--text-label-size` / `--text-label-leading`）？',
        'Phase 1 就要上 `data-gds-component` / `data-gds-variant` 属性用于 AI 审计 / 反推吗？',
      ],
    },
  ],
}

// ============================================================================
// Labs list
// ============================================================================

const LABS: Lab[] = [TEXT_LAB]

// ============================================================================
// View
// ============================================================================

export function LabsView() {
  const [selectedId, setSelectedId] = useState<string | null>(LABS[0]?.id ?? null)
  const selected = selectedId ? LABS.find((l) => l.id === selectedId) : null

  return (
    <div className="flex h-full flex-col gap-6 md:flex-row">
      <aside className="md:border-border md:w-72 md:shrink-0 md:overflow-y-auto md:border-r md:pr-4">
        <div className="text-accent mb-3 font-mono text-xs tracking-wider uppercase">Labs</div>
        {LABS.length === 0 ? (
          <p className="text-fg-muted text-xs italic">暂无 lab —— 等人定义第一个控件。</p>
        ) : (
          <ol className="space-y-1">
            {LABS.map((l, i) => (
              <li key={l.id}>
                <button
                  className={cx(
                    'flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm transition-colors',
                    selectedId === l.id
                      ? 'bg-accent/10 text-accent'
                      : 'text-fg-secondary hover:bg-bg-tertiary hover:text-fg'
                  )}
                  onClick={() => setSelectedId(l.id)}
                  title={l.title}
                  type="button"
                >
                  <span className="text-fg-muted shrink-0 font-mono text-xs">#{i + 1}</span>
                  <span className="truncate">{l.title}</span>
                  <StatusDot status={l.status} />
                </button>
              </li>
            ))}
          </ol>
        )}
      </aside>

      <article className="min-w-0 flex-1 space-y-4 md:overflow-y-auto md:pr-2">
        {selected ? (
          <LabDetail lab={selected} />
        ) : (
          <p className="text-fg-muted text-sm italic">选择左侧一个 lab 查看。</p>
        )}
      </article>
    </div>
  )
}

function StatusDot({ status }: { status: LabStatus }) {
  const color =
    status === 'design' ? 'bg-fg-muted' : status === 'prototype' ? 'bg-accent' : 'bg-emerald-500'
  return (
    <span
      className={cx('ml-auto inline-block h-2 w-2 shrink-0 rounded-full', color)}
      title={status}
    />
  )
}

function StatusBadge({ status }: { status: LabStatus }) {
  const label = status === 'design' ? 'DESIGN' : status === 'prototype' ? 'PROTOTYPE' : 'READY'
  const cls =
    status === 'design'
      ? 'bg-bg-tertiary text-fg-muted'
      : status === 'prototype'
        ? 'bg-accent/10 text-accent'
        : 'bg-emerald-500/10 text-emerald-500'
  return (
    <span
      className={cx(
        'rounded px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase',
        cls
      )}
    >
      {label}
    </span>
  )
}

function LabDetail({ lab }: { lab: Lab }) {
  return (
    <>
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="text-fg text-xl font-bold">{lab.title}</h2>
          <StatusBadge status={lab.status} />
        </div>
        <p className="text-fg-muted max-w-3xl text-sm leading-relaxed">{lab.summary}</p>
      </header>
      <div className="space-y-4">
        {lab.blocks.map((b, i) => (
          <Block block={b} key={i} />
        ))}
      </div>
    </>
  )
}

function Block({ block }: { block: LabBlock }) {
  if (block.kind === 'heading') {
    if (block.level === 3) {
      return <h4 className="text-fg mt-4 text-sm font-semibold">{block.text}</h4>
    }
    return <h3 className="text-fg mt-6 text-base font-semibold">{block.text}</h3>
  }
  if (block.kind === 'prose') {
    return <p className="text-fg-secondary max-w-3xl text-sm leading-relaxed">{block.text}</p>
  }
  if (block.kind === 'bullets') {
    return (
      <ul className="text-fg-secondary max-w-3xl list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    )
  }
  if (block.kind === 'code') {
    return (
      <figure className="max-w-3xl">
        <pre className="border-border bg-bg-tertiary overflow-x-auto rounded-md border p-3 text-xs leading-relaxed">
          <code className="font-mono">{block.content}</code>
        </pre>
        {block.caption ? (
          <figcaption className="text-fg-muted mt-1.5 text-xs italic">{block.caption}</figcaption>
        ) : null}
      </figure>
    )
  }
  if (block.kind === 'note') {
    const cls =
      block.variant === 'warn'
        ? 'border-orange-500/40 bg-orange-500/5'
        : 'border-accent/40 bg-accent/5'
    return (
      <div className={cx('max-w-3xl rounded-md border p-3 text-sm leading-relaxed', cls)}>
        <p className="text-fg">{block.text}</p>
      </div>
    )
  }
  if (block.kind === 'preview') {
    return (
      <figure className="max-w-3xl">
        <div className="border-border bg-bg-secondary rounded-lg border p-4">{block.render()}</div>
        {block.caption ? (
          <figcaption className="text-fg-muted mt-1.5 text-xs italic">{block.caption}</figcaption>
        ) : null}
      </figure>
    )
  }
  return null
}
