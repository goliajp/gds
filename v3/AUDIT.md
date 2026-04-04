# GDS v3 深度审计报告

> 基于 11 个 playground 页面的全量 GDS 组件使用 + 库源码分析
> 日期: 2026-04-04

---

## 一、核心结论

用户判断完全正确：**"默认配置下基础组件组合的水平欠佳"**。

GDS 提供了优秀的底层原语（Button、Badge、Input），但缺少**有观点的组合层**。开发者被迫反复手工组合相同的模式（指标卡、带标签进度条、表格行、区块标题），导致：
- 视觉不一致（同一页面 8+ 种字号，间距随意）
- light mode 支持差（landing 页面多处不可读）
- 开发效率低（30% 代码在写布局，不是业务逻辑）
- 维护困难（Card 内边距改一次，5+ 页面要跟着改）

---

## 二、Token 系统 (L0)

### 2.1 上下文深度系统
- **现状:** 使用 `.gds-ctx` + CSS 变量递减，设计合理
- **问题:** 变量是扁平的 `--gds-ctx-gap`，嵌套时没有真正的 CSS 级联
- **建议:** 用 `@container` 查询或 CSS 嵌套实现真正的深度感知，无需 prop 传递

### 2.2 语义色彩不完整
- **现状:** 有 `--gds-success`、`--gds-danger` 等基础状态色
- **缺失:**
  - `--gds-accent-secondary` — 次要强调色（浅/淡化版）
  - `--gds-accent-inverted` — 反色场景用
  - `--gds-status-*-hover` — 状态色缺少 hover 变体
- **建议:** 扩展 `paletteToVars()` 自动生成伴随变体

### 2.3 Motion 系统不尊重系统偏好
- **问题:** 无 `prefers-reduced-motion` 检测
- **影响:** 无障碍合规风险
- **建议:** 在 CSS 变量层面响应 `prefers-reduced-motion`，motion=full 时自动降级

---

## 三、主题系统 (L1)

### 3.1 预设不足
- **现状:** 4 个预设（default、email、dashboard、zinc-neutral）
- **缺失:**
  - `saas-light` — 高对比度亮色主题（生产力应用需要）
  - `docs` — 最小阴影、紧凑密度，文档站用
  - `marketing` — 鲜艳、动效优先、品牌友好
- **建议:** 基于真实应用增加 3-5 个经过验证的预设

### 3.2 主题不可组合
- **问题:** 预设是静态对象，不能继承/合并
- **建议:** 实现主题工厂模式
  ```ts
  const emailTheme = createTheme(baseTheme, { density: 'comfortable' })
  ```

### 3.3 跨标签页主题不同步
- **问题:** 用 localStorage 但无广播，两个标签页可能主题不同
- **建议:** 加 `BroadcastChannel` API

---

## 四、组件 API 一致性 (L2-L5) — 最严重

### 4.1 尺寸变体命名混乱

| 组件 | size 值 | 问题 |
|------|---------|------|
| Button | `sm \| default \| lg` | 标准 |
| Input | `inputSize: sm \| default` | 缺 `lg`，属性名不同！ |
| Avatar | `xs \| sm \| default \| lg` | 多了 `xs` |
| Checkbox | 无 size | 完全缺失 |
| Switch | `sm \| default` | 缺 `lg` |
| Spinner | `sm \| default \| lg` | 标准 |
| Badge | 无 size | 完全缺失 |

**建议:** 统一规范
- L2: `sm | default | lg`
- L3: `xs | sm | default | lg`（视觉组件可以有 xs）
- 属性名统一为 `size`，不要 `inputSize`

### 4.2 交互 prop 覆盖不一致

| prop | Button | Input | Checkbox | Switch | Badge | Avatar | Card |
|------|--------|-------|----------|--------|-------|--------|------|
| glass | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| motion | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| loading | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| disabled | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |

- **motion** 只有 Button 支持！其他组件全部缺失
- **glass** 覆盖率约 30%
- **建议:** 每层建立 prop 合约，系统性补全

### 4.3 冗余组件
- `SearchInput` (L4) vs `Input icon={<Search/>}` — 可以用组合代替
- `PasswordInput` (L4) vs `Input type="password"` — 同上
- **建议:** 减少特化 Input 变体，用 Input 组合替代

### 4.4 缺失组件
- `DateInput` — 只有 `DatePicker`（完整日历），缺简单日期输入
- `TimeInput` — 只有 `TimePicker`（弹窗），缺简单时间输入
- **建议:** L2 层增加简单的日期/时间输入原语

---

## 五、CVA 使用问题

### 5.1 defaultVariants 未强制
- L2: 13/31 组件定义了 defaultVariants
- L3+: 很多组件不用 CVA（如 Card、Collapsible、Dialog）
- **建议:** v3 强制所有可样式化组件使用 CVA + defaultVariants

### 5.2 变体命名风格不统一
- 混用 `errorState`、`isActive`、`danger-state`
- **建议:** 变体名一律小写单词（`active`、`error`、`disabled`），不用 camelCase

---

## 六、Playground 暴露的组合问题 — 最关键

### 6.1 反复手写的模式（应该是 GDS 组件）

| 模式 | 出现次数 | 现状 | 建议 |
|------|---------|------|------|
| 指标卡（标题+数值+脚注） | 20+ | `Card` + 手写布局 | 新建 `DataCard` 组件 |
| 带标签进度条 | 15+ | `Progress` + 手写 span | 新建 `ProgressBar` (label+value+bar) |
| 数据表格行 | 30+ | 原生 `<table>` + 手写样式 | 强化 `DataTable` |
| 区块标题 | 15+ | 手写 `<h2>` + 图标 | 新建 `SectionHeader` |
| 侧栏导航项 | 20+ | `Button variant="ghost"` 手写 | 强化 `NavItem` / `SidebarItem` |
| 邮件/文件列表行 | 10+ | 手写 flex 布局 | 新建 `ListItem` 组合组件 |
| 代码块 | 5+ | 手写 `<pre>` + 行号 | 新建 `CodeBlock` 组件 |
| 垂直时间线 | 3+ | 手写 div + 定位 | 新建 `TimelineItem` |

### 6.2 排版混乱 — 没有语义字号

同一页面出现 8+ 种字号，无语义含义：
```
text-xl, text-lg, text-sm, text-xs, text-[11px], text-[10px], text-[9px]
```

**建议:** 定义语义排版等级
```
Heading:  text-lg (16px)
Title:    text-sm font-semibold (14px bold)
Body:     text-sm (14px)
Caption:  text-xs (12px)
Label:    text-[11px] font-medium (11px medium)
Meta:     text-[10px] (10px) — 最小允许值
```

### 6.3 间距混乱 — 没有语义间距

手写 `gap-3`、`gap-2`、`gap-1.5`、`px-4 py-3`、`px-3 py-2`、`px-2 py-1.5` 反复出现 50+ 次。

**建议:** 定义语义间距或使用 `gds-gap`/`gds-pad` 统一

### 6.4 Card 内部缺少槽位结构

当前：
```tsx
<Card padding="sm">
  <CardContent>
    <div className="space-y-2"> {/* 手写间距 */}
      <div className="flex items-center gap-2"> {/* 手写布局 */}
```

建议：
```tsx
<Card padding="sm">
  <Card.Header title="Revenue" action={<Badge>+12%</Badge>} />
  <Card.Content>{/* 自动管理间距 */}</Card.Content>
  <Card.Footer><Progress value={70} /></Card.Footer>
</Card>
```

### 6.5 Button 变体不够

playground 中反复用 className 覆盖 Button 样式：
- `Button variant="ghost" className="text-accent"` — 应该有 `variant="ghost-accent"`
- `Button` + `border-b-2` — 应该有 `variant="tab"`
- `Button` + `hover:underline` — 应该有 `variant="link"`
- `Button` + `bg-transparent text-white` — 应该支持 `color` 属性

---

## 七、Light Mode 问题

### 7.1 landing.tsx 多处不可读
| 位置 | 问题 | 严重度 |
|------|------|--------|
| 语言切换激活态 | `bg-fg text-bg` = 深色背景+深色文字 | **致命** |
| 产品区 | `bg-blue-600` 硬编码，不走主题 | 高 |
| 联系区 | `bg-gray-900` 硬编码，亮色模式突然变黑 | 高 |
| 团队卡 emoji | `bg-bg-secondary` 背景太浅，看不清 | 中 |

### 7.2 系统性问题
- GDS 语义色彩主要为 dark mode 设计
- light mode 下 `bg-bg-secondary`、`border-border` 的对比度未经系统验证
- **建议:** v3 必须在 light mode 下全量测试所有组件

---

## 八、测试覆盖不均

| 层 | 组件数 | 测试文件数 | 覆盖率 |
|----|--------|-----------|--------|
| L0 tokens | - | 6 | 好 |
| L1 systems | - | 3 | 好 |
| L2 primitives | 31 | ~5 | **差** |
| L3 atoms | 77 | ~5 | **很差** |
| L4 molecules | 137 | ~5 | **很差** |
| L5 organisms | 77 | ~0 | **缺失** |
| L6 charts | 37 | 多 | 好 |
| L7 patterns | 59 | ~0 | **缺失** |

**关键缺失:** Checkbox、Switch、Avatar、Chip、Tooltip（基础原子）无测试
**关键缺失:** Card、Dialog、Tabs、Select（核心分子）无测试
**建议:** v3 优先补全 L2-L4 核心组件测试

---

## 九、构建与导出

### 9.1 现状良好
- 分层子路径导出（`./atoms`、`./molecules` 等）
- CSS 导出完整
- 类型声明包含

### 9.2 待改进
- 无 bundle 分析 CI — 不知道 tree-shaking 是否生效
- 无 `size-limit` — 不知道每层体积变化
- **建议:** 加入 bundle 分析和体积限制

---

## 十、反腐层 (utils/)

### 10.1 现状良好
- `cx()` 包装 clsx + tailwind-merge
- `VariantProps` 包装 CVA 类型
- `renderPortal()` 包装 react-dom
- ESLint 强制层级依赖规则

### 10.2 待改进
- **Lucide-react 直接使用未包装** — 如果换图标库需改所有组件
- **localStorage 在 L1 直接使用** — 应包装为 SSR 安全的 `useStorage()`
- **建议:** 考虑图标抽象层 + 存储抽象层

---

## 十一、v3 建议新增组件（优先级排序）

### Tier 1: 高优先（3+ 页面需要）
1. **`DataCard`** — 标题 + 数值 + 可选进度/脚注
2. **`ProgressBar`** — 标签 + 进度条 + 值，一体化
3. **`SectionHeader`** — 标题 + 可选副标题 + 操作按钮
4. **`HStack` / `VStack`** — 语义化 flex 布局原语
5. Button 新增 `variant="link"` 和 `variant="tab"`

### Tier 2: 中优先（1-2 页面需要）
6. **`Toolbar`** — 紧凑图标按钮行
7. **`FilterTabs`** — 带颜色的过滤标签组
8. **`CodeBlock`** — 代码展示 + 语法高亮 + 注解
9. **`TimelineItem`** — 垂直时间线节点
10. **`FileIcon`** — 文件类型徽章

### Tier 3: 待定（可能需要，先记录）
11. **`Article`** — Markdown 风格内容渲染
12. **`IconNav`** — 图标导航栏（邮件客户端侧栏）
13. **`ConversationItem`** — 会话/评论卡片
14. **`NavSection`** — 带折叠的导航分组

---

## 十二、开发方式：v2/v3 同屏对比

所有改动建立在 `/v3/` 目录下，与 v2 (`/src/`) 并存。通过 playground 同屏对比：
- 左边 v2 组件渲染
- 右边 v3 组件渲染
- 实时看到差异

这样可以：
1. 确保 v3 不退步
2. 直观验证改进效果
3. 逐步迁移，不一次性破坏
