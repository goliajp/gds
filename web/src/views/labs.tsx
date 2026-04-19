import {
  cx,
  Text,
  type TextAlign,
  type TextAs,
  type TextColor,
  type TextDecoration,
  type TextFamily,
  type TextHighlightVariant,
  type TextSelect,
  type TextSize,
  type TextTransform,
  type TextWeight,
} from '@goliapkg/gds'
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
  playground?: () => React.ReactNode
}

// ============================================================================
// Lab #1 — Text
// ============================================================================

const TEXT_LAB: Lab = {
  id: 'text',
  title: 'Text — 最基础的文本渲染原语',
  status: 'prototype',
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
      | 'strong' | 'em' | 'small' | 'code' | 'label'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'inherit'
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
  family?: 'sans' | 'serif' | 'mono'
  color?: 'fg' | 'fg-secondary' | 'fg-muted' | 'accent'
         | 'danger' | 'warning' | 'success' | 'inherit'
  align?: 'start' | 'center' | 'end' | 'justify'
  select?: 'auto' | 'none' | 'text' | 'all'
  transform?: 'none' | 'uppercase' | 'lowercase'
  decoration?: 'none' | 'underline' | 'strike'
  truncate?: boolean | number   // true=1 line, n=n-line clamp
  tabular?: boolean
  lang?: string
  highlight?: {
    match: string | string[] | RegExp
    variant?: 'accent' | 'warning' | 'success'  // 默认 accent
    caseSensitive?: boolean                      // 默认 false
  }
  children?: React.ReactNode
  className?: string
}

// 14 个 prop。audit 后的最终形态。
// 从 audit 前 16 个减下来：砍 dim / italic / numeric (oldstyle)；
// 加 lang / size="inherit"；transform 换成 CSS 同词 uppercase/lowercase；
// as 列表从 18 砍到 12（kbd/caption/time/cite/abbr/mark 暂不做）。`,
      caption:
        '15 个 prop。其余一切都是内部决策。v4 约定：sub-feature（比如 highlight）统一用对象配置，不平铺 sibling props。',
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
        '`as="small"` —— 旁注 / disclaimer',
        '`as="label"` —— form label，需要 htmlFor（透传）',
        '砍掉但可能后续补：kbd / caption / time / cite / abbr / mark —— 真实用例出现再加',
        'highlight 命中会在内部渲染 `<mark>`，消费者一般不直接写 `as="mark"`',
      ],
    },
    {
      kind: 'note',
      variant: 'warn',
      text: 'Anti-pattern：不要用 Text 做可点击区域（用 Button / Link）；**可以**嵌套 Text 来调整内部片段的 weight/color/decoration/as（常见场景，见 Text Usecase lab），但不要嵌套同 `as` 的 Text（例如 `<Text as="p"><Text as="p">...</Text></Text>` 生成非法 HTML）。',
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
      text: 'search result、autocomplete、inline diff 等 UI 经常需要"原文一段，匹配部分高亮"。v4 把这个能力**直接挂到 Text 的 `highlight` prop 上**——不另起 Highlight 组件（遵循"tag 尽可能少、能力强"），且配置走嵌套对象形式（遵循"sub-feature 走对象配置"）。HTML 原生 <mark> 的默认黄 v4 token 化。',
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
<Text highlight={{ match: 'world' }}>hello world</Text>
// 渲染：hello <mark>world</mark>

// 多关键词
<Text highlight={{ match: ['foo', 'bar'] }}>foo and bar</Text>

// 正则
<Text highlight={{ match: /\\b\\d+\\b/g }}>id 123 and 456</Text>

// 换颜色
<Text highlight={{ match: '保存', variant: 'warning' }}>未保存的改动</Text>

// 大小写敏感
<Text highlight={{ match: 'World', caseSensitive: true }}>hello World, world</Text>`,
    },
    {
      kind: 'bullets',
      items: [
        '**自动包 `<mark>`**：命中的片段内部渲染成 `<mark>`，screen reader 自动 announce "highlighted"',
        '**token 化颜色**：`variant` 取 accent | warning | success（默认 accent），底层走 `var(--color-<variant>-soft)` + `<variant>-strong`，不走浏览器默认黄',
        '**默认 case-insensitive**：`match: "World"` 匹配 "world" / "WORLD"。需要大小写敏感时设 `caseSensitive: true`，或传 RegExp 自控 flag',
        '**正则特殊字符**：match 是 string 时内部自动 escape，消费者不用处理 `.` `*` `?`',
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
      text: 'Anti-pattern：`<span style={{ background: "yellow" }}>` 手搓高亮。视觉对但：(1) screen reader 不读"highlighted"；(2) 颜色不走 token，dark mode 出洋相；(3) 不可审计。v4 强制走 `<Text highlight={{...}}>` 或 `<Text as="mark">`。',
    },
    {
      kind: 'heading',
      level: 3,
      text: '未定的小细节',
    },
    {
      kind: 'bullets',
      items: [
        '多关键词时要能各自不同颜色？—— 当前 `highlight.variant` 统一应用到所有匹配。真出现"红高亮 + 蓝高亮并存"的 UI 场景时可以扩成 `match: [{ text, variant }, ...]` 的丰富形式',
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
// Lab #2 — Text Usecase
// ============================================================================

const TEXT_USECASE_LAB: Lab = {
  id: 'text-usecase',
  title: 'Text Usecase — 所有典型场景的 API 查找表',
  status: 'design',
  summary:
    '列出 Text 覆盖的所有常见 UI 场景与对应的 API 用法。写 UI 时从这里找：要渲染 X，用什么 props。下列例子**使用 audit 后的 14-prop API**（transform=uppercase/lowercase、tabular boolean、加 lang、砍 dim/italic/oldstyle 等）——如果 audit 未被接受会 rollback。',
  blocks: [
    {
      kind: 'note',
      variant: 'info',
      text: '本 lab 的所有例子里，nested Text（`<Text>... <Text as="strong">强调</Text> ...</Text>`）是合法的——这说明 Text lab §3 / §17 里"不要嵌套 Text"的 anti-pattern 需要放宽为"不要嵌套同 `as` 的 Text"。已标为需要补的问题。',
    },

    { kind: 'heading', text: '1 · 层级信息' },
    {
      kind: 'prose',
      text: '页面 / 区块的标题和辅助文案。语义走 `as`，视觉独立用 size/weight。',
    },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// 页面 H1
<Text as="h1" size="3xl" weight="bold">订单详情</Text>

// 副标题 / lead
<Text size="lg" color="fg-secondary">订单 #1042 · 2026-04-19</Text>

// 区块 H2
<Text as="h2" size="xl" weight="semibold">收货信息</Text>

// 子区块 H3
<Text as="h3" size="md" weight="semibold">联系方式</Text>

// 面包屑（里面的点击项是 Link 包 Text）
<Text size="sm" color="fg-muted">订单 / 待发货 / 详情</Text>`,
    },

    { kind: 'heading', text: '2 · 段落内容' },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// 普通段落
<Text as="p">用户可以在这里查看订单的完整信息……</Text>

// 静音段落（提示说明）
<Text as="p" size="sm" color="fg-muted">
  退款将在 3-5 个工作日内原路返回。
</Text>

// 段落内强调
<Text as="p">
  请确认 <Text as="strong">订单金额</Text> 和 <Text as="strong">收货地址</Text>。
</Text>

// figure caption
<Text as="small" size="xs" color="fg-muted">
  图 1：用户操作流程示意图
</Text>

// 引用（语义 + 视觉）—— italic 是 Phase 2 所以走 as="em" 拿斜体
<Text as="p">
  <Text as="em">「这是引用的句子。」</Text> —— 某人
</Text>`,
    },

    { kind: 'heading', text: '3 · UI Chrome（按钮、Tab、Badge、Tooltip）' },
    {
      kind: 'prose',
      text: 'UI 装饰文字的共同特征：**不应被选中**（select="none"）、**视觉级不大**（sm / xs）、**中等字重**（medium）。',
    },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// 按钮内部文字（Button 会在内部封装）
<Text size="sm" weight="medium" select="none">确认提交</Text>

// Tab label
<Text size="sm" weight="medium" select="none">概览</Text>

// 状态 chip
<Text size="xs" weight="medium" color="accent" select="none">进行中</Text>

// Badge（小标）
<Text size="xs" weight="semibold" color="danger" select="none">新</Text>

// Tooltip 内容
<Text size="xs" color="fg-secondary">
  <Text family="mono">⌘K</Text> 打开命令面板
</Text>

// 导航项
<Text size="sm" weight="medium" select="none">订单管理</Text>`,
    },

    { kind: 'heading', text: '4 · 表单元素（label / helper / error）' },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// Field label（htmlFor 走 rest spread）
<Text as="label" size="sm" weight="medium" htmlFor="email">邮箱地址</Text>

// 带必填星号
<Text as="label" size="sm" weight="medium">
  邮箱地址 <Text color="danger">*</Text>
</Text>

// Helper text（字段下方说明）
<Text size="xs" color="fg-muted">
  用于接收订单更新通知
</Text>

// Error message
<Text size="xs" color="danger">
  请输入有效的邮箱地址
</Text>

// 字数统计（tabular 让数字对齐不跳）
<Text size="xs" color="fg-muted" tabular>127 / 500</Text>`,
    },

    { kind: 'heading', text: '5 · 数据 / 数字 / 时间' },
    {
      kind: 'prose',
      text: '数字和时间有两个共同约束：(1) 需要 `tabular` 保证多行垂直对齐；(2) 颜色用 color prop（涨绿跌红）而不是手写颜色。',
    },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// KPI 大数字 + 辅助说明
<Text size="3xl" weight="bold" tabular>¥12,480.00</Text>
<Text size="sm" color="fg-muted">本月收入</Text>

// 涨跌 delta
<Text size="sm" weight="medium" color="success">+12.5%</Text>
<Text size="sm" weight="medium" color="danger">-4.3%</Text>

// Table cell 数字
<Text size="sm" tabular>1,024.50</Text>

// 绝对时间
<Text size="xs" color="fg-muted" tabular>2026-04-19 14:32</Text>

// 相对时间
<Text size="xs" color="fg-muted">3 分钟前</Text>

// Duration（00:02:45）
<Text size="sm" tabular>00:02:45</Text>

// 百分比
<Text weight="semibold" tabular>85%</Text>

// Currency / unit 符号
<Text size="sm" color="fg-muted">USD</Text>`,
    },

    { kind: 'heading', text: '6 · 链接内文字（Link 包 Text）' },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// Inline link
<Link>
  <Text color="accent" decoration="underline">了解更多</Text>
</Link>

// "查看全部"
<Link>
  <Text size="sm" color="accent" weight="medium">查看全部 →</Text>
</Link>

// 段落内链接
<Text as="p">
  详情见 <Link><Text color="accent" decoration="underline">帮助文档</Text></Link>
</Text>`,
    },

    { kind: 'heading', text: '7 · 代码 / 技术 / 标识符' },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// Inline code
<Text as="code">npm install @goliapkg/gds</Text>

// 变量名
<Text family="mono" size="sm">userId</Text>

// URL / 文件路径（超长时 truncate）
<Text family="mono" size="xs" color="fg-muted" truncate>
  https://example.com/very/long/path/to/file.pdf
</Text>

// 版本号
<Text family="mono" size="xs" color="fg-muted">v4.0.0-alpha.1</Text>

// Commit hash / ID（tabular 对齐）
<Text family="mono" size="xs" color="fg-muted" tabular>a3b4c5d6</Text>

// 键盘快捷键（将来有 Kbd 组件；过渡期走 Text）
<Text family="mono" size="xs" select="none">⌘K</Text>`,
    },

    { kind: 'heading', text: '8 · 状态 / 系统反馈' },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// Empty state
<Text as="p" size="sm" color="fg-muted" align="center">
  这里还没有订单。创建第一个开始。
</Text>

// Loading 文字
<Text size="sm" color="fg-muted">加载中…</Text>

// Error banner body
<Text size="sm" color="danger">
  连接服务器失败，请检查网络后重试。
</Text>

// Success toast
<Text size="sm" color="success">订单已提交，感谢购买。</Text>

// Warning 提示
<Text size="sm" color="warning">
  库存仅剩 3 件，建议尽快购买。
</Text>

// "为什么失败"说明
<Text as="p" size="xs" color="fg-muted">
  错误码 <Text family="mono">E_NETWORK_TIMEOUT</Text>，可能是网络不稳定
</Text>`,
    },

    { kind: 'heading', text: '9 · 搜索 / 过滤 / 高亮' },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// 命中关键词（最常见场景）
<Text highlight={{ match: 'v4' }}>
  GDS v4 是给 AI 写 webapp 的设计系统
</Text>

// 多关键词
<Text highlight={{ match: ['AI', 'webapp'] }}>
  GDS v4 是给 AI 写 webapp 的设计系统
</Text>

// 警告颜色高亮
<Text highlight={{ match: '未保存', variant: 'warning' }}>
  有未保存的改动
</Text>

// 正则命中（大小写敏感不带 i flag）
<Text highlight={{ match: /\\b\\d+\\b/g }}>
  请输入验证码 123456
</Text>

// 结果数量（数字用 tabular，嵌套 Text 改颜色/字重）
<Text size="sm" color="fg-muted">
  找到 <Text color="fg" weight="medium" tabular>42</Text> 个结果
</Text>

// 无结果
<Text size="sm" color="fg-muted" align="center">
  未找到与「React」相关的内容
</Text>`,
    },

    { kind: 'heading', text: '10 · 身份 / metadata' },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// User name
<Text size="sm" weight="medium">张三</Text>

// Email（mono 字体更清晰）
<Text size="xs" color="fg-muted" family="mono">
  zhangsan@example.com
</Text>

// Role / title
<Text size="xs" color="fg-muted">设计师</Text>

// Avatar fallback initials（Avatar 内部；select=none 避免拖动误选）
<Text size="sm" weight="semibold" select="none">ZS</Text>

// 绝对时间（tabular 对齐列表）
<Text size="xs" color="fg-muted" tabular>2026-04-19 14:32:05</Text>

// 相对时间
<Text size="xs" color="fg-muted">3 分钟前</Text>

// @mention（accent 色提示可点击）
<Text color="accent">@zhangsan</Text>

// Hashtag
<Text color="accent">#v4</Text>`,
    },

    { kind: 'heading', text: '11 · Dialog / Modal / Confirmation' },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// Dialog title（小于 h1 但不失醒目）
<Text as="h2" size="lg" weight="semibold">确认删除</Text>

// Dialog description
<Text as="p" size="sm" color="fg-secondary">
  此操作不可撤销，将永久删除该订单。
</Text>

// Confirmation body with emphasis
<Text as="p" size="sm">
  确定要删除订单 <Text weight="medium">#1042</Text> 吗？
</Text>

// 破坏性操作警告
<Text as="p" size="sm" color="danger">
  ⚠ 删除后无法恢复
</Text>`,
    },

    { kind: 'heading', text: '12 · 长内容 / UGC' },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// 用户评论正文
<Text as="p" size="sm">
  （用户发的评论……）
</Text>

// 用户 Post body
<Text as="p" size="md">
  （长段内容……）
</Text>

// 段落内嵌 emphasis
<Text as="p">
  这段包含 <Text as="strong">重要内容</Text>，请 <Text as="em">务必</Text> 阅读。
</Text>

// 带颜色强调（不带语义）
<Text as="p">
  当前价格: <Text color="danger" weight="semibold">¥899</Text>（原价 <Text decoration="strike" color="fg-muted">¥1299</Text>）
</Text>`,
    },

    { kind: 'heading', text: '13 · Marketing / Hero' },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// Hero H1（wrap balance 是 Phase 2 才有）
<Text as="h1" size="3xl" weight="bold" align="center">
  给 AI 写 webapp 的设计系统
</Text>

// Hero subtitle
<Text as="p" size="lg" color="fg-secondary" align="center">
  克制 API 表面，吃掉海量兼容性细节
</Text>

// Feature title
<Text as="h3" size="xl" weight="semibold">AI 友好的类型系统</Text>

// Feature description
<Text as="p" size="md" color="fg-secondary">
  所有 prop 走严格 string literal union，不允许任意字符串
</Text>

// 标语 / Tagline
<Text size="sm" color="accent" weight="medium" transform="uppercase">
  Coming Soon
</Text>`,
    },

    { kind: 'heading', text: '14 · i18n / CJK 混排' },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// 指定中文段落（影响 font-smoothing / hyphens）
<Text lang="zh-CN" as="p">中文段落内容……</Text>

// 指定日文段落
<Text lang="ja" as="p">日本語の段落……</Text>

// 中英混排
<Text as="p">
  使用 <Text as="code">TypeScript</Text> 是最佳选择
</Text>

// Screen reader 需要的语言提示
<Text lang="en" aria-label="Version 4">v4</Text>`,
    },

    { kind: 'heading', text: '15 · Selection 行为（select prop）' },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// Content 段落（默认允许选中）
<Text as="p">这段可以自由选中</Text>

// UI chrome（禁止选中）
<Text select="none" size="sm" weight="medium">保存</Text>

// 代码片段（点击即全选，方便复制）
<Text as="code" select="all">npm install @goliapkg/gds</Text>

// 父级禁选但里面某段强制可选（如 API key 展示）
<Text select="none">
  你的 API key:
  <Text select="text" family="mono">sk_live_abc123xyz789</Text>
</Text>`,
    },

    { kind: 'heading', text: '16 · 截断（truncate 单行 / 多行）' },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// 单行省略
<Text truncate>这是一段非常非常非常长需要省略的文字……</Text>

// 3 行 clamp
<Text truncate={3}>
  （多行内容……超出 3 行后省略，带 ...）
</Text>

// 表格单元格（通常 truncate，tabular 保证列对齐）
<Text size="sm" truncate>用户名称可能很长</Text>`,
    },

    { kind: 'heading', text: '17 · 何时不该用 Text（→ 其他组件）' },
    {
      kind: 'bullets',
      items: [
        '**需要点击 → Button / Link**（内部会包 Text，但你写 `<Button>文字</Button>`）',
        '**屏幕阅读器专用隐藏文字 → VisuallyHidden**（未来组件）',
        '**键盘快捷键语义 → Kbd**（未来组件；过渡期 `<Text family="mono">⌘K</Text>`）',
        '**表情 / 图标 → Icon**（Lucide 或 v4 Icon 组件）',
        '**多行代码块（带高亮）→ CodeBlock**（未来组件）',
        '**Markdown 渲染 → Markdown**（未来组件）',
        '**时间语义 + 机器可读 → `<time dateTime="...">`**（Text 不包含 dateTime attr 透传，需要单独 Time 组件）',
      ],
    },

    { kind: 'heading', text: '18 · 反模式对照表（AI 容易写错的写法）' },
    {
      kind: 'code',
      lang: 'tsx',
      content: `// ❌ 手写 fontSize
<span style={{ fontSize: 14 }}>Hello</span>
// ✓ 用 size prop
<Text size="md">Hello</Text>

// ❌ 手写颜色
<span style={{ color: 'red' }}>Error</span>
// ✓ 用 color token
<Text color="danger">Error</Text>

// ❌ 手写高亮
<span style={{ background: 'yellow' }}>match</span>
// ✓ 用 highlight
<Text highlight={{ match: 'match' }}>some match here</Text>

// ❌ Button 模拟（Text + onClick）
<Text onClick={...}>Save</Text>
// ✓ 用 Button
<Button onClick={...}>Save</Button>

// ❌ 视觉想要粗体，错用 semantic
<Text as="strong">¥12.00</Text>  // 把"价格"标成语义强调
// ✓ 只要视觉粗 → weight
<Text weight="bold">¥12.00</Text>

// ❌ 静态已知要 mark 的文字用了 highlight
<Text highlight={{ match: '新' }}>新订单</Text>  // 搜索语义但其实是固定 label
// ✓ 固定字面量直接用 as="mark"
<Text as="mark">新</Text>订单`,
    },

    { kind: 'heading', text: '19 · Audit 发现需回头补的' },
    {
      kind: 'bullets',
      items: [
        '**§3 / §17 anti-pattern "不要嵌套 Text" 要放宽**——本 lab 里大量合理嵌套（段落内强调 / 改颜色 / 改字重）证明原规则过严。正确规则应该是"不要嵌套同 `as` 的 Text"或"不要通过嵌套绕开类型约束"',
        '**表单 label 的 htmlFor 要明确走 rest spread**——§3 说 label 需要 htmlFor，API 层面没明示；usecase 里用了，要补进 prop 签名说明或 TS 示例',
        '**数据 metadata 的"相对时间"经常自动更新**——每 60s 刷新 "3 分钟前"。不是 Text 的职责（上层 RelativeTime 组件处理），但使用 Text 的组合需要在 Text Usecase §10 或未来 RelativeTime lab 中说清',
        'Hero 标题 wrap balance 是个明显的未覆盖缺口 —— Phase 2 加的优先级应该往前',
      ],
    },
  ],
}

// ============================================================================
// Text Playground
// ============================================================================

const AS_OPTIONS = [
  'span',
  'p',
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'strong',
  'em',
  'small',
  'code',
  'label',
] as const satisfies readonly TextAs[]

const SIZE_OPTIONS = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  'inherit',
] as const satisfies readonly TextSize[]
const WEIGHT_OPTIONS = [
  'regular',
  'medium',
  'semibold',
  'bold',
] as const satisfies readonly TextWeight[]
const FAMILY_OPTIONS = ['sans', 'serif', 'mono'] as const satisfies readonly TextFamily[]
const COLOR_OPTIONS = [
  'fg',
  'fg-secondary',
  'fg-muted',
  'accent',
  'danger',
  'warning',
  'success',
  'inherit',
] as const satisfies readonly TextColor[]
const ALIGN_OPTIONS = ['start', 'center', 'end', 'justify'] as const satisfies readonly TextAlign[]
const SELECT_OPTIONS = ['auto', 'none', 'text', 'all'] as const satisfies readonly TextSelect[]
const TRANSFORM_OPTIONS = [
  'none',
  'uppercase',
  'lowercase',
] as const satisfies readonly TextTransform[]
const DECORATION_OPTIONS = [
  'none',
  'underline',
  'strike',
] as const satisfies readonly TextDecoration[]
const HL_VARIANT_OPTIONS = [
  'accent',
  'warning',
  'success',
] as const satisfies readonly TextHighlightVariant[]

type PlaygroundState = {
  content: string
  as: TextAs
  size: TextSize
  weight: TextWeight
  family: TextFamily | ''
  color: TextColor
  align: TextAlign | ''
  select: TextSelect | ''
  transform: TextTransform
  decoration: TextDecoration
  truncate: '' | 'true' | string // '' = off, 'true' = single, digits = N-line
  tabular: boolean
  lang: string
  hlMatch: string
  hlVariant: TextHighlightVariant
}

const INITIAL_STATE: PlaygroundState = {
  content: 'GDS v4 Text primitive — 找到 world 就高亮',
  as: 'span',
  size: 'md',
  weight: 'regular',
  family: '',
  color: 'fg',
  align: '',
  select: '',
  transform: 'none',
  decoration: 'none',
  truncate: '',
  tabular: false,
  lang: '',
  hlMatch: '',
  hlVariant: 'accent',
}

function buildTextProps(s: PlaygroundState) {
  return {
    as: s.as,
    size: s.size,
    weight: s.weight,
    family: s.family || undefined,
    color: s.color,
    align: s.align || undefined,
    select: s.select || undefined,
    transform: s.transform,
    decoration: s.decoration,
    truncate:
      s.truncate === ''
        ? undefined
        : s.truncate === 'true'
          ? true
          : /^\d+$/.test(s.truncate)
            ? Number(s.truncate)
            : undefined,
    tabular: s.tabular || undefined,
    lang: s.lang || undefined,
    highlight: s.hlMatch
      ? {
          match: s.hlMatch,
          variant: s.hlVariant === 'accent' ? undefined : s.hlVariant,
        }
      : undefined,
  }
}

function buildCodeSnippet(s: PlaygroundState): string {
  const props: string[] = []
  if (s.as !== 'span') props.push(`as="${s.as}"`)
  if (s.size !== 'md') props.push(`size="${s.size}"`)
  if (s.weight !== 'regular') props.push(`weight="${s.weight}"`)
  if (s.family) props.push(`family="${s.family}"`)
  if (s.color !== 'fg') props.push(`color="${s.color}"`)
  if (s.align) props.push(`align="${s.align}"`)
  if (s.select) props.push(`select="${s.select}"`)
  if (s.transform !== 'none') props.push(`transform="${s.transform}"`)
  if (s.decoration !== 'none') props.push(`decoration="${s.decoration}"`)
  if (s.truncate === 'true') props.push('truncate')
  else if (s.truncate !== '' && /^\d+$/.test(s.truncate)) props.push(`truncate={${s.truncate}}`)
  if (s.tabular) props.push('tabular')
  if (s.lang) props.push(`lang="${s.lang}"`)
  if (s.hlMatch) {
    const hl: string[] = [`match: '${s.hlMatch.replace(/'/g, "\\'")}'`]
    if (s.hlVariant !== 'accent') hl.push(`variant: '${s.hlVariant}'`)
    props.push(`highlight={{ ${hl.join(', ')} }}`)
  }

  const body = s.content || '...'
  if (props.length === 0) return `<Text>${body}</Text>`
  if (props.length <= 2) return `<Text ${props.join(' ')}>${body}</Text>`
  return `<Text\n  ${props.join('\n  ')}\n>\n  ${body}\n</Text>`
}

function PgRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[72px_1fr] items-center gap-2">
      <label className="text-fg-muted font-mono text-[10px] tracking-wider uppercase">
        {label}
      </label>
      <div>{children}</div>
    </div>
  )
}

function PgSelect<T extends string>({
  value,
  onChange,
  options,
  allowEmpty,
}: {
  value: T | ''
  onChange: (v: T | '') => void
  options: readonly T[]
  allowEmpty?: boolean
}) {
  return (
    <select
      className="bg-bg-tertiary border-border text-fg w-full rounded border px-2 py-1 text-xs"
      onChange={(e) => onChange(e.target.value as T | '')}
      value={value}
    >
      {allowEmpty ? <option value="">—</option> : null}
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

function TextPlayground() {
  const [state, setState] = useState<PlaygroundState>(INITIAL_STATE)
  const set = <K extends keyof PlaygroundState>(key: K, v: PlaygroundState[K]) =>
    setState((s) => ({ ...s, [key]: v }))

  const props = buildTextProps(state)
  const code = buildCodeSnippet(state)

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-fg text-base font-semibold">Playground</h3>
        <button
          className="text-fg-muted hover:text-fg text-xs underline underline-offset-2"
          onClick={() => setState(INITIAL_STATE)}
          type="button"
        >
          reset
        </button>
      </div>

      {/* Preview area */}
      <div className="border-border bg-bg-secondary relative flex min-h-[140px] max-w-full items-center justify-center overflow-hidden rounded-lg border p-6">
        <div className="max-w-full">
          <Text {...props}>{state.content || ' '}</Text>
        </div>
      </div>

      {/* Code snippet */}
      <pre className="border-border bg-bg-tertiary max-w-full overflow-x-auto rounded-md border p-3 text-[11px] leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>

      {/* Controls */}
      <div className="flex flex-col gap-2 text-xs">
        <PgRow label="content">
          <input
            className="bg-bg-tertiary border-border text-fg w-full rounded border px-2 py-1 font-mono text-xs"
            onChange={(e) => set('content', e.target.value)}
            type="text"
            value={state.content}
          />
        </PgRow>
        <PgRow label="as">
          <PgSelect
            onChange={(v) => set('as', v as TextAs)}
            options={AS_OPTIONS}
            value={state.as}
          />
        </PgRow>
        <PgRow label="size">
          <PgSelect
            onChange={(v) => set('size', v as TextSize)}
            options={SIZE_OPTIONS}
            value={state.size}
          />
        </PgRow>
        <PgRow label="weight">
          <PgSelect
            onChange={(v) => set('weight', v as TextWeight)}
            options={WEIGHT_OPTIONS}
            value={state.weight}
          />
        </PgRow>
        <PgRow label="family">
          <PgSelect
            allowEmpty
            onChange={(v) => set('family', (v || '') as TextFamily | '')}
            options={FAMILY_OPTIONS}
            value={state.family}
          />
        </PgRow>
        <PgRow label="color">
          <PgSelect
            onChange={(v) => set('color', v as TextColor)}
            options={COLOR_OPTIONS}
            value={state.color}
          />
        </PgRow>
        <PgRow label="align">
          <PgSelect
            allowEmpty
            onChange={(v) => set('align', (v || '') as TextAlign | '')}
            options={ALIGN_OPTIONS}
            value={state.align}
          />
        </PgRow>
        <PgRow label="select">
          <PgSelect
            allowEmpty
            onChange={(v) => set('select', (v || '') as TextSelect | '')}
            options={SELECT_OPTIONS}
            value={state.select}
          />
        </PgRow>
        <PgRow label="transform">
          <PgSelect
            onChange={(v) => set('transform', v as TextTransform)}
            options={TRANSFORM_OPTIONS}
            value={state.transform}
          />
        </PgRow>
        <PgRow label="decoration">
          <PgSelect
            onChange={(v) => set('decoration', v as TextDecoration)}
            options={DECORATION_OPTIONS}
            value={state.decoration}
          />
        </PgRow>
        <PgRow label="truncate">
          <select
            className="bg-bg-tertiary border-border text-fg w-full rounded border px-2 py-1 text-xs"
            onChange={(e) => set('truncate', e.target.value)}
            value={state.truncate}
          >
            <option value="">off</option>
            <option value="true">single line</option>
            <option value="2">2 lines</option>
            <option value="3">3 lines</option>
            <option value="4">4 lines</option>
          </select>
        </PgRow>
        <PgRow label="tabular">
          <input
            checked={state.tabular}
            className="accent-accent"
            onChange={(e) => set('tabular', e.target.checked)}
            type="checkbox"
          />
        </PgRow>
        <PgRow label="lang">
          <input
            className="bg-bg-tertiary border-border text-fg w-full rounded border px-2 py-1 font-mono text-xs"
            onChange={(e) => set('lang', e.target.value)}
            placeholder="e.g. ja, zh-CN"
            type="text"
            value={state.lang}
          />
        </PgRow>
        <PgRow label="highlight">
          <input
            className="bg-bg-tertiary border-border text-fg w-full rounded border px-2 py-1 font-mono text-xs"
            onChange={(e) => set('hlMatch', e.target.value)}
            placeholder="match string (empty = off)"
            type="text"
            value={state.hlMatch}
          />
        </PgRow>
        <PgRow label="hl.variant">
          <PgSelect
            onChange={(v) => set('hlVariant', v as TextHighlightVariant)}
            options={HL_VARIANT_OPTIONS}
            value={state.hlVariant}
          />
        </PgRow>
      </div>
    </div>
  )
}

// ============================================================================
// Text Usecase Playground — live render every usecase from the design doc
// ============================================================================

function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-border bg-bg-secondary space-y-3 rounded-lg border p-4">
      <h4 className="text-fg-muted font-mono text-[10px] tracking-wider uppercase">{title}</h4>
      <div className="space-y-2">{children}</div>
    </section>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">{children}</div>
}

function TextUsecasePlayground() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-fg text-base font-semibold">Live Usecases</h3>
        <span className="text-fg-muted text-xs italic">每个场景都用真 &lt;Text&gt; 渲染</span>
      </div>

      <Demo title="1 · 层级信息">
        <Text as="h1" size="3xl" weight="bold">
          订单详情
        </Text>
        <Text size="lg" color="fg-secondary">
          订单 #1042 · 2026-04-19
        </Text>
        <Text as="h2" size="xl" weight="semibold">
          收货信息
        </Text>
        <Text as="h3" size="md" weight="semibold">
          联系方式
        </Text>
        <Text size="sm" color="fg-muted">
          订单 / 待发货 / 详情
        </Text>
      </Demo>

      <Demo title="2 · 段落内容">
        <Text as="p">用户可以在这里查看订单的完整信息……</Text>
        <Text as="p" size="sm" color="fg-muted">
          退款将在 3-5 个工作日内原路返回。
        </Text>
        <Text as="p">
          请确认 <Text as="strong">订单金额</Text> 和 <Text as="strong">收货地址</Text>。
        </Text>
        <Text as="small" size="xs" color="fg-muted">
          图 1：用户操作流程示意图
        </Text>
        <Text as="p">
          <Text as="em">「这是引用的句子。」</Text> —— 某人
        </Text>
      </Demo>

      <Demo title="3 · UI Chrome（按钮 / Tab / Badge / Tooltip）">
        <Row>
          <Text size="sm" weight="medium" select="none">
            确认提交
          </Text>
          <Text size="sm" weight="medium" select="none">
            概览
          </Text>
          <Text size="xs" weight="medium" color="accent" select="none">
            进行中
          </Text>
          <Text size="xs" weight="semibold" color="danger" select="none">
            新
          </Text>
        </Row>
        <Text size="xs" color="fg-secondary">
          <Text family="mono">⌘K</Text> 打开命令面板
        </Text>
        <Text size="sm" weight="medium" select="none">
          订单管理
        </Text>
      </Demo>

      <Demo title="4 · 表单元素（label / required / helper / error）">
        <Text as="label" size="sm" weight="medium">
          邮箱地址
        </Text>
        <Text as="label" size="sm" weight="medium">
          邮箱地址 <Text color="danger">*</Text>
        </Text>
        <Text size="xs" color="fg-muted">
          用于接收订单更新通知
        </Text>
        <Text size="xs" color="danger">
          请输入有效的邮箱地址
        </Text>
        <Text size="xs" color="fg-muted" tabular>
          127 / 500
        </Text>
      </Demo>

      <Demo title="5 · 数据 / 数字 / 时间">
        <Text size="3xl" weight="bold" tabular>
          ¥12,480.00
        </Text>
        <Text size="sm" color="fg-muted">
          本月收入
        </Text>
        <Row>
          <Text size="sm" weight="medium" color="success">
            +12.5%
          </Text>
          <Text size="sm" weight="medium" color="danger">
            -4.3%
          </Text>
        </Row>
        <Row>
          <Text size="sm" tabular>
            1,024.50
          </Text>
          <Text size="xs" color="fg-muted" tabular>
            2026-04-19 14:32
          </Text>
          <Text size="xs" color="fg-muted">
            3 分钟前
          </Text>
          <Text size="sm" tabular>
            00:02:45
          </Text>
          <Text weight="semibold" tabular>
            85%
          </Text>
          <Text size="sm" color="fg-muted">
            USD
          </Text>
        </Row>
      </Demo>

      <Demo title="6 · 链接内文字（Link 包 Text）">
        <Text>
          详情见{' '}
          <Text as="span" color="accent" decoration="underline">
            帮助文档
          </Text>
        </Text>
        <Text size="sm" color="accent" weight="medium">
          查看全部 →
        </Text>
        <Text>
          联系{' '}
          <Text as="span" color="accent" decoration="underline">
            客服
          </Text>{' '}
          获取帮助
        </Text>
      </Demo>

      <Demo title="7 · 代码 / 技术 / 标识符">
        <Text as="code">npm install @goliapkg/gds</Text>
        <Text family="mono" size="sm">
          userId
        </Text>
        <div className="w-full max-w-xs">
          <Text family="mono" size="xs" color="fg-muted" truncate>
            https://example.com/very/long/path/to/file.pdf
          </Text>
        </div>
        <Row>
          <Text family="mono" size="xs" color="fg-muted">
            v4.0.0-alpha.1
          </Text>
          <Text family="mono" size="xs" color="fg-muted" tabular>
            a3b4c5d6
          </Text>
          <Text family="mono" size="xs" select="none">
            ⌘K
          </Text>
        </Row>
      </Demo>

      <Demo title="8 · 状态 / 反馈">
        <Text as="p" size="sm" color="fg-muted" align="center">
          这里还没有订单。创建第一个开始。
        </Text>
        <Text size="sm" color="fg-muted">
          加载中…
        </Text>
        <Text size="sm" color="danger">
          连接服务器失败，请检查网络后重试。
        </Text>
        <Text size="sm" color="success">
          订单已提交，感谢购买。
        </Text>
        <Text size="sm" color="warning">
          库存仅剩 3 件，建议尽快购买。
        </Text>
        <Text as="p" size="xs" color="fg-muted">
          错误码 <Text family="mono">E_NETWORK_TIMEOUT</Text>，可能是网络不稳定
        </Text>
      </Demo>

      <Demo title="9 · 搜索 / 过滤 / 高亮">
        <Text highlight={{ match: 'v4' }}>GDS v4 是给 AI 写 webapp 的设计系统</Text>
        <Text highlight={{ match: ['AI', 'webapp'] }}>GDS v4 是给 AI 写 webapp 的设计系统</Text>
        <Text highlight={{ match: '未保存', variant: 'warning' }}>有未保存的改动</Text>
        <Text highlight={{ match: /\d+/g }}>请输入验证码 123456</Text>
        <Text size="sm" color="fg-muted">
          找到{' '}
          <Text color="fg" weight="medium" tabular>
            42
          </Text>{' '}
          个结果
        </Text>
        <Text size="sm" color="fg-muted" align="center">
          未找到与「React」相关的内容
        </Text>
      </Demo>

      <Demo title="10 · 身份 / metadata">
        <Row>
          <Text size="sm" weight="medium">
            张三
          </Text>
          <Text size="xs" color="fg-muted" family="mono">
            zhangsan@example.com
          </Text>
          <Text size="xs" color="fg-muted">
            设计师
          </Text>
        </Row>
        <Row>
          <Text size="sm" weight="semibold" select="none">
            ZS
          </Text>
          <Text size="xs" color="fg-muted" tabular>
            2026-04-19 14:32:05
          </Text>
          <Text size="xs" color="fg-muted">
            3 分钟前
          </Text>
        </Row>
        <Row>
          <Text color="accent">@zhangsan</Text>
          <Text color="accent">#v4</Text>
        </Row>
      </Demo>

      <Demo title="11 · Dialog / Modal">
        <Text as="h2" size="lg" weight="semibold">
          确认删除
        </Text>
        <Text as="p" size="sm" color="fg-secondary">
          此操作不可撤销，将永久删除该订单。
        </Text>
        <Text as="p" size="sm">
          确定要删除订单 <Text weight="medium">#1042</Text> 吗？
        </Text>
        <Text as="p" size="sm" color="danger">
          ⚠ 删除后无法恢复
        </Text>
      </Demo>

      <Demo title="12 · 长内容 / UGC">
        <Text as="p" size="sm">
          这是用户发的一段评论内容，可能比较长，也可能包含表情符号和提到{' '}
          <Text color="accent">@张三</Text>。
        </Text>
        <Text as="p">
          这段包含 <Text as="strong">重要内容</Text>，请 <Text as="em">务必</Text> 阅读。
        </Text>
        <Text as="p">
          当前价格：
          <Text color="danger" weight="semibold">
            ¥899
          </Text>
          （原价{' '}
          <Text decoration="strike" color="fg-muted">
            ¥1299
          </Text>
          ）
        </Text>
      </Demo>

      <Demo title="13 · Marketing / Hero">
        <Text as="h1" size="3xl" weight="bold" align="center">
          给 AI 写 webapp 的设计系统
        </Text>
        <Text as="p" size="lg" color="fg-secondary" align="center">
          克制 API 表面，吃掉海量兼容性细节
        </Text>
        <Text as="h3" size="xl" weight="semibold">
          AI 友好的类型系统
        </Text>
        <Text as="p" size="md" color="fg-secondary">
          所有 prop 走严格 string literal union，不允许任意字符串
        </Text>
        <Text size="sm" color="accent" weight="medium" transform="uppercase">
          coming soon
        </Text>
      </Demo>

      <Demo title="14 · i18n / CJK 混排">
        <Text lang="zh-CN" as="p">
          中文段落内容……渲染时检测 lang 应用对应 font-smoothing 策略。
        </Text>
        <Text lang="ja" as="p">
          日本語の段落内容……
        </Text>
        <Text as="p">
          使用 <Text as="code">TypeScript</Text> 是最佳选择
        </Text>
      </Demo>

      <Demo title="15 · Selection 行为（试着选/复制）">
        <Text as="p">这段是默认 select=auto，可以自由选中。</Text>
        <Text select="none" size="sm" weight="medium">
          这段 select=none，无法选中
        </Text>
        <Text as="code" select="all">
          npm install @goliapkg/gds
        </Text>
        <Text select="none">
          外层禁选，但内部
          <Text select="text" family="mono">
            sk_live_abc123
          </Text>{' '}
          强制可选
        </Text>
      </Demo>

      <Demo title="16 · 截断（truncate 单行 / 多行）">
        <div className="w-full max-w-[280px] space-y-2">
          <Text truncate>这是一段非常非常非常长需要在容器边缘省略的文字</Text>
          <Text truncate={2}>
            这是多行 clamp 的示例，超过 2 行会显示省略号。这里写更多内容来触发换行，证明 clamp
            真的工作。继续填充内容确保超出。
          </Text>
        </div>
      </Demo>

      <Demo title="18 · 反模式对照（红 ❌ / 绿 ✓）">
        <div className="space-y-1">
          <Text size="xs" color="fg-muted">
            ❌ 手写 fontSize / color：
          </Text>
          <span style={{ fontSize: 14, color: 'red' }}>Hello (raw span)</span>
          <Text size="xs" color="fg-muted">
            ✓ Text size + color：
          </Text>
          <Text size="md" color="danger">
            Hello (Text)
          </Text>
        </div>
        <div className="space-y-1">
          <Text size="xs" color="fg-muted">
            ❌ raw span 高亮：
          </Text>
          <span>
            搜索<span style={{ background: 'yellow', color: 'black' }}>命中</span>关键词
          </span>
          <Text size="xs" color="fg-muted">
            ✓ Text highlight：
          </Text>
          <Text highlight={{ match: '命中' }}>搜索命中关键词</Text>
        </div>
      </Demo>

      <div className="border-border text-fg-muted rounded border border-dashed p-3 text-xs italic">
        §17（何时不该用 Text）和 §19（audit follow-ups）是文档性质的清单，无需 live demo。
      </div>
    </div>
  )
}

// ============================================================================
// Labs list
// ============================================================================

// Wire playgrounds onto labs (mutation before LABS array — keeps data co-located)
TEXT_LAB.playground = () => <TextPlayground />
TEXT_USECASE_LAB.playground = () => <TextUsecasePlayground />

const LABS: Lab[] = [TEXT_LAB, TEXT_USECASE_LAB]

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

      <aside className="md:border-border hidden md:block md:min-w-0 md:flex-1 md:overflow-y-auto md:border-l">
        {selected?.playground ? (
          selected.playground()
        ) : (
          <div className="flex h-full items-center justify-center p-8">
            <p className="text-fg-muted text-sm italic">此 lab 暂无 playground</p>
          </div>
        )}
      </aside>
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
