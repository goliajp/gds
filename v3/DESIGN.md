# GDS v3 设计文档

## Context
基于 v2 深度审计 + 11 个 playground 实战暴露的问题 + 国际顶尖 UI 库研究（shadcn/ui、Radix Themes、Ant Design 5、Linear、Apple HIG），制定 v3 的改进方向和实施路径。

v3 定位：**国际顶尖工业级 UI 库**。

---

## 一、字号体系重建 — "别那么小的字了"

### 问题
v2 有 14 个 font preset（font-system.ts），但组件实际使用时大量手写 `text-[10px]`、`text-[11px]`，导致页面字号混乱。playground 中同一页面出现 8+ 种字号。

### v3 方案：强制语义字号

v2 的 `gds-text-body`/`gds-text-label`/`gds-text-caption` 是对的方向，但最小值太小（caption 仅 10px）。

**v3 最小字号提升到 11px**（Apple HIG 最低 11pt），默认密度下：

| 语义名 | v2 默认 | v3 默认 | 用途 |
|--------|--------|--------|------|
| `gds-text-heading` | 16px | 16px | 区块标题 |
| `gds-text-title` | 14px bold | 14px semibold | 卡片标题、列表标题 |
| `gds-text-body` | 13px | 14px | **主要正文、按钮文字** |
| `gds-text-label` | 11px | 12px | 表单标签、导航项 |
| `gds-text-caption` | 10px | 11px | 辅助信息、时间戳 |
| `gds-text-badge` | 10px | 11px | 徽章、标签 |

**铁律：v3 组件代码中禁止出现 `text-[Npx]` 硬编码，必须用语义 class。**

compact 密度下允许整体缩小 1px，但 caption 不低于 10px。

---

## 二、Glass / Glow / Motion 融入一切

### 问题
v2 的 glass 只有 ~30% 组件支持，motion 只有 Button 支持，glow 是独立组件（GlowEffect/GlowDot）而非系统性功能。这些是 GDS 的差异化特色，但用户"要非常精通才能用好"。

### v3 方案：三个系统融入每个组件

#### 2.1 Glass — 所有容器组件必须支持

**v2 已有基础（glass-system.ts 成熟）**，但 prop 覆盖不足。

v3 规则：
- L2 所有容器/面板类原语 → 支持 `glass` prop
- L3 所有卡片/弹出类原子 → 支持 `glass` prop
- L4 所有组合组件 → 透传 `glass` prop 到内部容器
- glass 效果随深度自动递减（depth 越深，blur 越轻）

**从 refs 审查时：逐个组件检查是否有 `glass` prop，没有就加上。**

#### 2.2 Glow — 从独立组件变成系统特性

v2 的 GlowEffect 是独立包装组件，用户需要手动套用。v3 要让 glow 成为可配置的默认视觉层。

**新增 `glow` prop：**
```ts
type GlowProps = {
  glow?: boolean | 'accent' | 'success' | 'warning' | 'danger'
}
```

适用组件：
- Button: hover 时 glow 散射
- Card: 边缘微光
- Badge: 状态 glow（danger badge 自带红色微光）
- Input: focus 时 accent glow
- Progress: 填充端 glow

**CSS 实现：**
```css
.gds-glow { box-shadow: 0 0 20px var(--gds-glow-color, var(--gds-accent)) / 0.15; }
.gds-glow-sm { box-shadow: 0 0 8px var(--gds-glow-color) / 0.12; }
.gds-glow-lg { box-shadow: 0 0 32px var(--gds-glow-color) / 0.2; }
```

**主题配置：**
- `themePresets.default`: glow off（默认克制）
- `themePresets.cyber`: glow on（赛博风格）
- 用户 `configureTheme({ glow: 'on' })` 全局开启

#### 2.3 Motion — 从 Button 扩展到所有交互组件

v2 只有 Button 支持 `motion` prop。v3 的每个交互组件都应该有。

**统一 motion prop 类型：**
```ts
type MotionProp = {
  motion?: 'fadeIn' | 'scaleIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'pop' | 'none'
}
```

适用组件：
- Button: 点击反馈（默认 scaleIn）
- Card: 进入动画（默认 fadeIn）
- Badge: 出现动画（默认 pop）
- Dialog/Sheet: 进入/退出动画
- Toast: 滑入/滑出
- Tooltip: fadeIn

**prefers-reduced-motion 自动响应：**
v2 已有 `@media (prefers-reduced-motion)` 将动画时长设为 0.01ms，v3 保持。

**从 refs 审查时：逐个组件加上 `motion` prop 支持。**

#### 2.4 统一 Prop 合约

每个交互组件必须支持的标准 prop：

```ts
type GDSInteractiveProps = {
  glass?: boolean
  glow?: boolean | GlowColor
  motion?: MotionPreset
  disabled?: boolean
  loading?: boolean
  className?: string
}
```

**从 refs 挪入时的检查清单：**
- [ ] 有 `glass` prop 吗？没有 → 加上
- [ ] 有 `glow` prop 吗？没有 → 加上
- [ ] 有 `motion` prop 吗？没有 → 加上
- [ ] size 属性名统一为 `size`？(`inputSize` → `size`)
- [ ] size 取值统一？至少 `sm | default | lg`
- [ ] 用了语义字号 class？没有硬编码 `text-[Npx]`？

---

## 三、风格统一 — 组件间的视觉协调

### 问题
v2 组件各自为政——Button 的 sm 和 Input 的 sm 视觉上不协调，Badge 放在 Button 旁边大小不搭。

### v3 方案：统一尺寸基准

**所有组件共享同一高度/间距基准：**

| size | 高度 | 内边距 x | 字号 | 图标 | 圆角 |
|------|------|---------|------|------|------|
| xs | 24px | 6px | caption (11px) | 14px | radius-sm |
| sm | 28px | 8px | label (12px) | 16px | radius |
| default | 32px | 12px | body (14px) | 18px | radius |
| lg | 40px | 16px | body (14px) | 20px | radius-lg |
| xl | 48px | 20px | title (14px bold) | 24px | radius-lg |

**这个表适用于：Button、Input、Select、Checkbox、Switch、Badge、Chip、Avatar。**

当 Button size="sm" 和 Input size="sm" 放在一起时，它们高度一致（28px），字号一致（12px），圆角一致。

**从 refs 审查时：逐个组件校准高度/间距/字号是否与基准表一致。**

---

## 四、组合层 — v3 新增的核心竞争力

### 问题
v2 的原语好但组合差。playground 暴露了 8+ 种反复手写的模式。

### v3 新增组件（来自 playground 需求）

#### 4.1 DataCard（L4 新增）
```tsx
<DataCard
  title="月收入"
  value="¥1,200,000"
  change="+12%"
  trend="up"
  footer={<Progress value={70} />}
  glass
/>
```

#### 4.2 ProgressBar（L3 新增）
```tsx
<ProgressBar label="CPU" value={45} max={100} showPercent color="success" glow />
```

#### 4.3 SectionHeader（L4 新增）
```tsx
<SectionHeader
  icon={<DollarSign />}
  title="财务指标"
  action={<Button variant="ghost" size="sm">Export</Button>}
/>
```

#### 4.4 HStack / VStack（L2 新增）
```tsx
<HStack gap="md" align="center">
  <Avatar size="sm" /> <span>Username</span> <Badge>Admin</Badge>
</HStack>
```

#### 4.5 Button variant 扩展
- 新增 `variant="link"` — 文本链接样式
- 新增 `variant="tab"` — 标签页按钮

---

## 五、从 refs 到 src 的审查流程

每个组件从 `v3/refs/` 移入 `v3/src/` 时，必须通过以下检查：

### 审查清单

```markdown
## [ComponentName] 审查

### API 一致性
- [ ] size: sm | default | lg（不是 inputSize，不是缺 lg）
- [ ] glass: boolean
- [ ] glow: boolean | GlowColor
- [ ] motion: MotionPreset
- [ ] disabled: boolean（交互组件）
- [ ] loading: boolean（交互组件）
- [ ] className: string（所有组件）
- [ ] data-component 属性

### 字号
- [ ] 无 text-[Npx] 硬编码
- [ ] 使用 gds-text-body / gds-text-label / gds-text-caption 语义 class

### 尺寸基准
- [ ] sm = 28px 高、label 字号
- [ ] default = 32px 高、body 字号
- [ ] lg = 40px 高、body 字号

### 视觉
- [ ] 使用语义色彩 token（无硬编码 Tailwind 颜色）
- [ ] glass 效果正确
- [ ] glow 效果正确
- [ ] focus ring 使用 focusCls
- [ ] hover 状态清晰

### 代码质量
- [ ] type only（无 interface/enum）
- [ ] forwardRef
- [ ] CVA + defaultVariants
- [ ] 无 any
- [ ] 导出 Props 类型和 Variants
```

---

## 六、实施路径

### Phase 1: 基础设施确认
- [x] v3/refs/ 建立（v2 全量参考）
- [x] v3/src/l0-tokens/ 挪入（token 系统）
- [x] v3/src/l1-systems/ 挪入（主题系统）
- [x] v3/src/utils/ 挪入（工具层）
- [ ] 更新 token 系统：最小字号提升、glow CSS class、motion CSS 补全

### Phase 2: L2 Primitives 逐个过审
按 playground 使用频率排序：
1. Button（最高频，参考组件）
2. Input
3. Badge
4. IconButton
5. Progress
6. Divider / Separator
7. Checkbox
8. Slider
9. Spinner / Loading
10. 其余 21 个

### Phase 3: L3 Atoms 逐个过审
优先 playground 用到的：
1. Avatar
2. Chip
3. Tooltip
4. Switch
5. Checkbox（确认与 L2 层级归属）
6. 其余

### Phase 4: L4 Molecules + 新增组合组件
1. Card + CardHeader + CardContent + CardFooter
2. Tabs
3. **DataCard**（新增）
4. **SectionHeader**（新增）
5. **ProgressBar**（新增，或 L3）
6. SearchInput
7. Accordion
8. Dialog / Sheet
9. 其余

### Phase 5: L5-L7 + Charts
按 playground 需求逐步推进。

---

## 七、验证方式

每挪入一批组件后：
1. playground 中对应页面切换到 v3 组件
2. v2/v3 同屏对比，确认不退步
3. 检查 glass/glow/motion 三个特性在实际场景中的表现
4. 检查 light mode 表现
5. 检查密度切换（compact/default/comfortable）下的一致性
