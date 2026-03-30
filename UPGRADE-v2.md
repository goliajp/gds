# GDS v2.0.0 升级指南

> 从 v1.x 升级到 v2.0.0 的完整指南，包含破坏性变更、迁移步骤、新特性介绍。

---

## 快速升级（3 步）

```bash
# 1. 升级版本
bun add @goliapkg/gds@^2.0.0

# 2. 如果使用邮件组件（RichTextEditor/EmailThread），安装可选依赖
bun add @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-table @tiptap/extension-task-list @tiptap/extension-task-item @tiptap/extension-underline @tiptap/extension-placeholder @tiptap/extension-code-block-lowlight lowlight dompurify

# 3. 跑测试确认无回归
bun test
```

---

## 破坏性变更

v2 有 3 个破坏性变更，影响范围很小。

### 1. InboxLayout API 重写

v1 的 InboxLayout 是一个简单的 2 窗格分割：

```tsx
// v1 — 旧 API（已废弃）
<InboxLayout
  list={<ConversationList />}
  detail={<ThreadView />}
  listWidth={360}
/>
```

v2 重写为功能完整的 3 窗格布局：

```tsx
// v2 — 新 API
<InboxLayout
  sidebar={<AppSidebar />}           // 新：可选侧边栏
  list={<ConversationList />}
  detail={<ThreadView />}
  listWidth={360}                     // 保留
  listMinWidth={280}                  // 新：最小宽度约束
  listMaxWidth={500}                  // 新：最大宽度约束
  resizable                           // 新：拖拽调整分割线
  mobileView="list"                   // 新：移动端单窗格
  onMobileViewChange={setView}        // 新：移动端视图切换回调
  emptyState={<EmptyInbox />}         // 新：无选中时的占位
  batchActions={<BulkBar />}          // 新：批量操作栏
/>
```

**迁移方式：** `list` 和 `detail` prop 保持不变，`listWidth` 保持不变。旧代码只需确认不依赖 `detail` 必传（v2 中 detail 变为可选）。

### 2. MarkdownPreview 默认开启 sanitize

```tsx
// v1 — 无 sanitize（XSS 风险）
<MarkdownPreview content={html} />

// v2 — 默认 sanitize=true（安全）
<MarkdownPreview content={html} />                    // 自动 DOMPurify
<MarkdownPreview content={html} sanitize={false} />   // 恢复旧行为
```

**迁移方式：** 如果你的 Markdown 内容中包含自定义 HTML（如嵌入表单、iframe），需要显式传 `sanitize={false}`。大多数场景无需改动。

### 3. 暗模式阴影加深

暗模式 shadow 透明度倍率从 3.0x 调整到 4.0x，阴影会略微加深。这是为了匹配生产环境验证过的视觉效果。

**迁移方式：** 纯视觉变化，无代码改动。如需恢复旧值，使用 `elevation: 'subtle'`。

---

## 新增依赖（可选）

v2 新增了 12 个 **可选** peer dependencies，仅在使用对应组件时需要安装：

| 组件 | 需要安装 |
|------|---------|
| `RichTextEditor` / `EmailComposer` | `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-*` (8个), `lowlight` |
| `EmailThread` / `MarkdownPreview` (sanitize) | `dompurify` |
| 其他所有组件 | 无需额外依赖 |

不使用邮件组件的项目升级 v2 **零额外依赖**。

---

## 新特性一览

### 1. Toast 命令式 API

替代 Sonner、react-hot-toast 等外部 toast 库。全局调用，零配置。

```tsx
// App.tsx — 放一次 Provider
import { ToastProvider } from '@goliapkg/gds'

function App() {
  return (
    <>
      <Router />
      <ToastProvider position="bottom-right" maxVisible={5} />
    </>
  )
}

// 任意位置 — 直接调用
import { toast } from '@goliapkg/gds'

toast.success('邮件已发送')
toast.error('发送失败', { description: '请检查网络连接' })
toast.warning('磁盘空间不足')

// 带操作按钮（如 8 秒撤销窗口）
toast.show('正在发送...', {
  duration: 8000,
  action: { label: '撤销', onClick: () => cancelSend() },
})

// 手动关闭
const id = toast.success('已保存')
toast.dismiss(id)
toast.dismissAll()
```

**从 Sonner 迁移：**
```diff
- import { toast } from 'sonner'
+ import { toast } from '@goliapkg/gds'

- <Toaster />
+ <ToastProvider />

// API 几乎相同，大多数调用点零改动
```

### 2. RichTextEditor（富文本编辑器）

基于 Tiptap 3.x 的 WYSIWYG 编辑器，支持完整格式化和精简模式。

```tsx
import { RichTextEditor } from '@goliapkg/gds'
import type { RichTextEditorHandle } from '@goliapkg/gds'

const editorRef = useRef<RichTextEditorHandle>(null)

// 完整模式 — 15 种工具栏按钮
<RichTextEditor
  mode="full"
  defaultValue="<p>Hello world</p>"
  onChange={(html, text) => console.log(html)}
  onImageUpload={async (file) => {
    const url = await uploadImage(file)
    return url
  }}
  onSubmit={() => handleSend()}     // Ctrl+Enter
  placeholder="写点什么..."
  ref={editorRef}
/>

// 精简模式 — 签名编辑等场景
<RichTextEditor mode="minimal" />

// 命令式 API
editorRef.current?.focus()
editorRef.current?.getHTML()
editorRef.current?.isEmpty()
editorRef.current?.clearContent()
```

**工具栏按钮：** bold, italic, underline, strikethrough, code, codeBlock, heading, blockquote, bulletList, orderedList, taskList, link, image, table, divider

### 3. 邮件组件套件

三个组件协同工作，覆盖完整的邮件阅读和撰写场景。

#### EmailThread — 邮件会话视图

```tsx
import { EmailThread } from '@goliapkg/gds'
import type { EmailMessage } from '@goliapkg/gds'

const messages: EmailMessage[] = [
  {
    id: '1',
    from: 'alice@example.com',
    fromName: 'Alice',
    to: ['bob@example.com'],
    date: '2026-03-30T12:00:00Z',
    subject: 'Hello',
    htmlBody: '<p>Hi Bob!</p>',
    textBody: null,
    isOwn: false,
    attachments: [
      { index: 0, filename: 'photo.jpg', mimeType: 'image/jpeg', size: 1024000 },
    ],
  },
  {
    id: '2',
    from: 'bob@example.com',
    fromName: 'Bob',
    to: ['alice@example.com'],
    date: '2026-03-30T12:05:00Z',
    htmlBody: null,
    textBody: 'Thanks!',
    isOwn: true,
  },
]

<EmailThread
  messages={messages}
  expandAll={false}
  onReply={(msg) => openReply(msg)}
  onForward={(msg) => openForward(msg)}
  onAttachmentDownload={(msg, att) => download(att)}
  showAiAnalysis
/>
```

**特点：**
- 自己发送/收到的消息自动区分颜色和布局
- HTML 邮件通过 DOMPurify 安全渲染（非 iframe）
- 附件预览（图片缩略图、PDF 提取文本、通用文件下载）
- AI 分析面板（摘要、人物、日期、金额、行动项）
- 展开/折叠单条消息

#### EmailComposer — 邮件撰写器

```tsx
import { EmailComposer } from '@goliapkg/gds'

<EmailComposer
  mode="new"                               // 'new' | 'reply' | 'reply-all' | 'forward'
  to={recipients}
  onToChange={setRecipients}
  subject={subject}
  onSubjectChange={setSubject}
  onContactSearch={async (q) => searchContacts(q)}
  onSend={(email) => {
    // email.html — 完整 HTML（含引用和签名）
    // email.text — 纯文本版本
    // email.attachments — File[]
    sendEmail(email)
  }}
  onDiscard={() => closeComposer()}
  quotedHtml={originalEmail.htmlBody}      // 回复/转发时的引用内容
  quotedHeader="On Mar 30, Alice wrote:"
  signature="<p>Best,<br/>Bob</p>"
  footerActions={                          // AI 按钮等额外操作
    <>
      <button onClick={suggestReply}>Suggest</button>
      <button onClick={polishText}>Polish</button>
    </>
  }
/>
```

**特点：**
- To/Cc/Bcc 收件人芯片输入 + 异步联系人搜索
- 富文本编辑（基于 RichTextEditor）
- 文件拖拽附件
- 引用内容折叠/展开
- Ctrl+Enter 发送
- 邮件组装引擎（HTML + 纯文本双输出）

#### EmailComposerField — 收件人输入

```tsx
import { EmailComposerField } from '@goliapkg/gds'

<EmailComposerField
  label="To"
  value={recipients}
  onChange={setRecipients}
  onSearch={async (query) => {
    const contacts = await api.searchContacts(query)
    return contacts // { email, name?, avatar? }[]
  }}
  placeholder="recipient@example.com"
/>
```

**特点：**
- 联系人芯片（头像 + 名称/邮箱）
- 异步搜索 + 200ms 防抖
- Enter/Tab/逗号确认输入
- 粘贴逗号分隔邮箱批量添加
- Backspace 删除末尾联系人
- RFC 5322 基础邮箱格式验证

### 4. AppShell — 应用壳布局

mailrs 风格的应用根布局：icon 侧边栏 + 内容区 + 状态栏。

```tsx
import { AppShell } from '@goliapkg/gds'

<AppShell
  sidebar={<AppSidebar />}             // 左侧 icon 导航
  sidebarWidth={56}                    // icon-only 宽度
  statusBar={                          // 底部状态栏（桌面端）
    <div className="flex items-center gap-3 px-3 py-1 text-xs text-fg-muted">
      <StatusDot status="online" /> PG
      <StatusDot status="online" /> Valkey
      <StatusDot status="online" /> Mail
    </div>
  }
  mobileNav={<MobileTabBar />}         // 移动端底部导航
>
  {/* 主内容区 */}
  <PaneGroup>
    <Pane width={360}>{/* 列表 */}</Pane>
    <Pane>{/* 详情 */}</Pane>
  </PaneGroup>
</AppShell>
```

### 5. Pane + PaneGroup — 布局原语

灵活的多窗格布局，桌面端横排、移动端自动堆叠。

```tsx
import { Pane, PaneGroup } from '@goliapkg/gds'

// 水平分割
<PaneGroup direction="horizontal">
  <Pane width={360}>列表面板</Pane>
  <Pane>详情面板（flex-1）</Pane>
</PaneGroup>

// 垂直分割
<PaneGroup direction="vertical">
  <Pane>上半部分</Pane>
  <Pane>下半部分</Pane>
</PaneGroup>
```

### 6. 主题预设

针对不同应用类型的预配置主题轴组合。

```tsx
import { configureTheme, themePresets } from '@goliapkg/gds'

// 邮件/生产力应用 — comfortable 密度、subtle 阴影、subtle 毛玻璃
configureTheme({ ...themePresets.email, mode: 'system' })

// 数据密集型仪表盘 — compact 密度、无毛玻璃
configureTheme({ ...themePresets.dashboard, mode: 'dark' })

// 默认（通用）
configureTheme({ ...themePresets.default, mode: 'system' })
```

| 预设 | 密度 | 基础字号 | 阴影 | 毛玻璃 | 主色 |
|------|------|---------|------|--------|------|
| `default` | default | 13px | raised | full | #5b5bff |
| `email` | comfortable | 14px | subtle | subtle | #3b7ddd |
| `dashboard` | compact | 11px | subtle | off | #5b5bff |

### 7. CommandPalette 模糊搜索

```tsx
<CommandPalette
  open={open}
  items={commands}
  onSelect={handleSelect}
  fuzzy                              // 默认开启，字符级模糊匹配
  maxResults={50}
  recentItems={recentCommands}       // 查询为空时显示最近使用
  maxRecent={5}
  onExecute={(id) => trackUsage(id)} // 追踪使用历史
/>
```

搜索结果按匹配质量排序，匹配的字符高亮显示。连续匹配得分更高。

### 8. 组件增强速览

| 组件 | 新功能 | 用法 |
|------|--------|------|
| **Input** | 前后缀 + 复制按钮 | `<Input prefix="https://" suffix=".com" copyable />` |
| **Tabs** | pills/underline 变体 | `<Tabs variant="pills" scrollable />` |
| **TabGroup** | 懒加载 + URL 同步 | `<TabGroup lazy activeTab={tab} onTabChange={setTab} />` |
| **Combobox** | 异步搜索 + 可创建 | `<Combobox onSearch={fetchOptions} creatable />` |
| **Sidebar** | 结构化导航 + badge | `<Sidebar items={navItems} />` + `SidebarItem` |
| **AdminLayout** | 移动端抽屉 | `<AdminLayout mobileDrawer logo={<Logo />} />` |
| **SettingsLayout** | URL 路由 + 动画 | `<SettingsLayout activeSection={section} animated />` |

### 9. CSS 新工具类

```css
/* 深度重置 — 在深层嵌套中重置回 depth-0 */
<div className="gds-ctx-reset">
  {/* 内容渲染为 depth-0 的间距/圆角/阴影 */}
</div>

/* 中速动画 — 150ms，适合 hover/颜色过渡 */
<div className="animate-fade-in animate-medium">
  {/* 150ms 淡入 */}
</div>
```

---

## 完整迁移检查清单

- [ ] 升级 `@goliapkg/gds` 到 `^2.0.0`
- [ ] 如使用 `InboxLayout`：按新 API 更新 props
- [ ] 如使用 `MarkdownPreview` 且依赖未过滤 HTML：加 `sanitize={false}`
- [ ] 如需邮件组件：安装 Tiptap + DOMPurify
- [ ] 检查暗模式阴影是否符合预期（视觉变化）
- [ ] 运行 `bun test` 确认无回归
- [ ] 探索新组件和增强功能
