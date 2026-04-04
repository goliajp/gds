import { useState } from 'react'

import { Badge, Button } from '@goliapkg/gds/primitives'
import { ScrollArea } from '@goliapkg/gds/primitives'

// ---------------------------------------------------------------------------
// mock data
// ---------------------------------------------------------------------------

const CHAPTERS = [
  {
    id: 1,
    title: '地基',
    lessons: [
      '项目结构与启动哲学',
      'CLI 参数解析',
      '配置文件加载',
      '日志系统初始化',
      '错误处理策略',
      '异步运行时选择',
      '依赖注入模式',
      '测试基础设施',
      '构建与发布流程',
      '跨平台兼容',
      '性能基线测量',
      '安全边界设计',
      '版本管理策略',
      '文档即代码',
      'CI/CD 管道搭建',
    ],
  },
  {
    id: 2,
    title: '模拟 LLM',
    lessons: ['Token 流解析', 'Prompt 模板引擎', '上下文窗口管理', '流式响应处理'],
  },
  {
    id: 3,
    title: '工具框架',
    lessons: ['工具注册机制', '沙箱执行环境', '权限控制模型', '工具链编排'],
  },
  {
    id: 4,
    title: '会话管理',
    lessons: ['会话状态机', '多轮对话追踪', '上下文压缩'],
  },
  {
    id: 5,
    title: '终端交互',
    lessons: ['TUI 渲染引擎', '输入处理管道', '主题系统'],
  },
]

type Step = {
  name: string
  icon: string
  tsFile: string
  tsLang: string
  tsLineRange: string
  tsCode: string
  annotations: { line: number; text: string }[]
  rsFile: string
  rsSubtitle: string
  rsCode: string
  analysis: string
}

const STEPS: Step[] = [
  {
    name: 'package.json',
    icon: '📦',
    tsFile: 'package.json',
    tsLang: 'json',
    tsLineRange: ':1-17',
    tsCode: `{
  "name": "@anthropic-ai/claude-code",
  "version": "1.0.0",
  "description": "Claude Code — AI coding assistant",
  "main": "dist/index.js",
  "type": "module",
  "bin": {
    "claude": "./dist/cli.js"
  },
  "scripts": {
    "dev": "tsx watch src/cli.ts",
    "build": "tsup src/cli.ts",
    "test": "vitest",
    "lint": "eslint src/",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {`,
    annotations: [
      { line: 2, text: '@anthropic-ai 作用域——npm 组织前缀，防止名称冲突' },
      { line: 5, text: 'ESM 入口——编译后从 dist/ 加载' },
      { line: 6, text: '"type": "module" 全局启用 ESM，所有 .js 默认 import/export' },
      { line: 8, text: 'bin 映射——安装后 claude 命令指向 dist/cli.js' },
      { line: 11, text: 'tsx watch 热重载——开发时文件变化自动重启' },
      { line: 12, text: 'tsup 打包——零配置 TS 编译器，输出单文件' },
      { line: 13, text: 'vitest 测试——与 Vite 同生态，ESM 原生支持' },
      { line: 15, text: 'tsc --noEmit 只做类型检查，不产出 JS 文件' },
    ],
    rsFile: 'Cargo.toml',
    rsSubtitle: '对等设计',
    rsCode: `[package]
name = "claude-code"           # 等价 npm @scope/name
version = "1.0.0"
edition = "2021"               # Rust edition ≈ TS target
description = "Claude Code — AI coding assistant"

[[bin]]
name = "claude"                # 等价 package.json bin
path = "src/cli.rs"            # 入口文件

[dependencies]
clap = { version = "4", features = ["derive"] }  # CLI 参数解析
tokio = { version = "1", features = ["full"] }   # 异步运行时
serde = { version = "1", features = ["derive"] } # 序列化
serde_json = "1"                                  # JSON 处理

[dev-dependencies]
assert_cmd = "2"               # 集成测试 CLI
predicates = "3"               # 断言工具`,
    analysis:
      'package.json 是 Node.js 项目的「身份证」，定义了项目元信息、入口、脚本和依赖。Rust 的等价物是 Cargo.toml，由 Cargo 包管理器解析。两者都采用声明式配置，但 Cargo.toml 用 TOML 格式（更适合配置文件），而 package.json 用 JSON 格式。关键区别：Rust 的 edition 字段控制语言版本（类似 TS 的 target），且 Cargo 同时负责构建和包管理（npm + webpack 的合体）。bin 字段在两边都用于声明可执行文件的名称与路径映射。',
  },
  {
    name: 'tsconfig.json',
    icon: '⚙️',
    tsFile: 'tsconfig.json',
    tsLang: 'json',
    tsLineRange: ':1-20',
    tsCode: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}`,
    annotations: [
      { line: 3, text: 'ES2022——支持 top-level await、class fields' },
      { line: 5, text: 'bundler 模式——让 TS 理解打包器的模块解析规则' },
      { line: 6, text: 'strict: true——启用所有严格类型检查' },
      { line: 7, text: 'noEmit——只检查类型，不输出文件（交给 tsup）' },
      { line: 13, text: '路径别名——@ 映射到 src/，简化深层导入' },
    ],
    rsFile: 'rust-toolchain.toml',
    rsSubtitle: '工具链配置',
    rsCode: `# Rust 没有 tsconfig 等价物
# 编译器配置分散在多处：

# rust-toolchain.toml — 锁定工具链版本
[toolchain]
channel = "stable"
components = ["rustfmt", "clippy"]

# .cargo/config.toml — 构建配置
[build]
target-dir = "target"          # 等价 outDir

# Cargo.toml [profile] — 优化级别
[profile.release]
opt-level = 3                  # 最大优化
lto = true                     # 链接时优化`,
    analysis:
      'TypeScript 将所有编译器配置集中在 tsconfig.json 中，Rust 则将配置分散到多个文件：rust-toolchain.toml（工具链版本）、.cargo/config.toml（构建选项）、Cargo.toml 的 [profile] 段（优化级别）。这种分散设计反映了 Rust 工具链的模块化哲学——每个工具独立配置。strict 模式在 Rust 中是默认行为，你需要主动用 #[allow(...)] 来放宽检查。',
  },
  {
    name: 'src/cli.ts',
    icon: '🔧',
    tsFile: 'src/cli.ts',
    tsLang: 'typescript',
    tsLineRange: ':1-22',
    tsCode: `#!/usr/bin/env node
import { parseArgs } from "node:util";
import { loadConfig } from "./config.js";
import { createLogger } from "./logger.js";
import { startRepl } from "./repl.js";

const { values, positionals } = parseArgs({
  options: {
    config: { type: "string", short: "c" },
    verbose: { type: "boolean", short: "v" },
    model: { type: "string", short: "m" },
  },
  allowPositionals: true,
  strict: true,
});

async function main() {
  const config = await loadConfig(values.config);
  const logger = createLogger(values.verbose);
  logger.info("Claude Code starting...");
  await startRepl({ config, logger, model: values.model });
}

main().catch(console.error);`,
    annotations: [
      { line: 1, text: 'shebang——让系统知道用 node 执行此脚本' },
      { line: 2, text: 'node:util 内置解析——无需第三方库' },
      { line: 7, text: 'parseArgs 声明式定义——类型安全的参数解析' },
      { line: 14, text: 'strict: true——禁止未声明的参数' },
      { line: 17, text: '异步 main——顶层 await 的替代写法' },
    ],
    rsFile: 'src/cli.rs',
    rsSubtitle: '入口对比',
    rsCode: `use clap::Parser;
use crate::config::load_config;
use crate::logger::create_logger;
use crate::repl::start_repl;

/// Claude Code — AI coding assistant
#[derive(Parser)]
#[command(version, about)]
struct Cli {
    /// Config file path
    #[arg(short, long)]
    config: Option<String>,

    /// Enable verbose logging
    #[arg(short, long)]
    verbose: bool,

    /// Model to use
    #[arg(short, long)]
    model: Option<String>,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();
    let config = load_config(cli.config.as_deref()).await?;
    let logger = create_logger(cli.verbose);
    logger.info("Claude Code starting...");
    start_repl(&config, &logger, cli.model.as_deref()).await
}`,
    analysis:
      'CLI 入口是应用的「前门」。TypeScript 使用 Node.js 内置的 parseArgs（v18.3+），Rust 使用 clap 的 derive 宏。clap 的最大优势是编译时验证——参数定义即类型定义，拼写错误在编译期就会被捕获。注意错误处理的差异：TS 用 .catch() 兜底，Rust 用 Result + ? 操作符逐层传播，anyhow::Result 提供统一的错误类型。',
  },
  {
    name: 'src/config.ts',
    icon: '📋',
    tsFile: 'src/config.ts',
    tsLang: 'typescript',
    tsLineRange: ':1-18',
    tsCode: `import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

type Config = {
  apiKey: string;
  model: string;
  maxTokens: number;
  theme: "dark" | "light";
};

const DEFAULTS: Config = {
  apiKey: "",
  model: "claude-sonnet-4-20250514",
  maxTokens: 4096,
  theme: "dark",
};

export async function loadConfig(path?: string) {`,
    annotations: [
      { line: 1, text: 'node:fs/promises——异步文件读取，不阻塞事件循环' },
      { line: 5, text: 'type 定义——配置结构的类型契约' },
      { line: 12, text: '默认值对象——未配置字段的兜底值' },
      { line: 14, text: '使用最新模型——保持默认值与时俱进' },
    ],
    rsFile: 'src/config.rs',
    rsSubtitle: '配置加载',
    rsCode: `use serde::Deserialize;
use std::path::PathBuf;
use tokio::fs;

#[derive(Deserialize)]
pub struct Config {
    pub api_key: String,
    #[serde(default = "default_model")]
    pub model: String,
    #[serde(default = "default_max_tokens")]
    pub max_tokens: u32,
    #[serde(default)]
    pub theme: Theme,
}

#[derive(Deserialize, Default)]
pub enum Theme { #[default] Dark, Light }

fn default_model() -> String { "claude-sonnet-4-20250514".into() }
fn default_max_tokens() -> u32 { 4096 }`,
    analysis:
      '配置加载是每个 CLI 应用的核心模块。TS 使用 type 定义结构 + 手动合并默认值，Rust 使用 serde 的 #[serde(default)] 属性宏自动处理缺失字段。Rust 的 enum Theme 比 TS 的联合类型 "dark" | "light" 更安全——模式匹配保证穷尽所有分支。注意命名约定：TS 用 camelCase，Rust 用 snake_case，serde 可以自动转换。',
  },
  {
    name: 'src/logger.ts',
    icon: '📝',
    tsFile: 'src/logger.ts',
    tsLang: 'typescript',
    tsLineRange: ':1-16',
    tsCode: `type LogLevel = "debug" | "info" | "warn" | "error";

type Logger = {
  debug: (msg: string) => void;
  info: (msg: string) => void;
  warn: (msg: string) => void;
  error: (msg: string) => void;
};

export function createLogger(verbose?: boolean): Logger {
  const level: LogLevel = verbose ? "debug" : "info";
  return {
    debug: (msg) => level === "debug" && console.debug(msg),
    info: (msg) => console.info(msg),
    warn: (msg) => console.warn(msg),
    error: (msg) => console.error(msg),`,
    annotations: [
      { line: 1, text: 'LogLevel 联合类型——限定合法的日志级别' },
      { line: 3, text: 'Logger 类型——方法签名的契约定义' },
      { line: 10, text: '工厂函数——根据 verbose 创建不同行为的 logger' },
      { line: 13, text: '短路求值——debug 级别关闭时不执行输出' },
    ],
    rsFile: 'src/logger.rs',
    rsSubtitle: '日志模块',
    rsCode: `use tracing::{debug, info, warn, error};
use tracing_subscriber::EnvFilter;

pub fn create_logger(verbose: bool) {
    let filter = if verbose {
        EnvFilter::new("debug")
    } else {
        EnvFilter::new("info")
    };
    tracing_subscriber::fmt()
        .with_env_filter(filter)
        .init();
}

// 使用时：
// info!("Claude Code starting...");
// debug!("Config loaded: {:?}", config);`,
    analysis:
      '日志系统看似简单，实则是可观测性的基石。TS 版本手工封装 console 方法，Rust 生态统一使用 tracing 框架。tracing 的优势在于结构化日志——除了文本消息，还能记录 span（调用链追踪）和 fields（键值对），这在生产环境排查问题时至关重要。EnvFilter 支持运行时通过环境变量动态调整日志级别。',
  },
  {
    name: 'src/repl.ts',
    icon: '💬',
    tsFile: 'src/repl.ts',
    tsLang: 'typescript',
    tsLineRange: ':1-20',
    tsCode: `import * as readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

type ReplOptions = {
  config: Config;
  logger: Logger;
  model?: string;
};

export async function startRepl(options: ReplOptions) {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  const prompt = "> ";

  while (true) {
    const input = await rl.question(prompt);
    if (input === "/exit") break;
    const response = await sendMessage(input, options);
    process.stdout.write(response);
  }
  rl.close();
}`,
    annotations: [
      { line: 1, text: 'readline/promises——异步 readline，支持 await' },
      { line: 10, text: 'REPL 主循环——读取-执行-打印 循环' },
      { line: 14, text: 'while(true)——无限循环，/exit 命令退出' },
      { line: 16, text: '/exit 哨兵值——约定的退出命令' },
    ],
    rsFile: 'src/repl.rs',
    rsSubtitle: 'REPL 循环',
    rsCode: `use rustyline::DefaultEditor;
use anyhow::Result;

pub async fn start_repl(
    config: &Config,
    logger: &Logger,
    model: Option<&str>,
) -> Result<()> {
    let mut rl = DefaultEditor::new()?;
    let prompt = "> ";

    loop {
        match rl.readline(prompt) {
            Ok(input) if input == "/exit" => break,
            Ok(input) => {
                rl.add_history_entry(&input)?;
                let response = send_message(&input, config, model).await?;
                print!("{response}");
            }
            Err(_) => break,
        }
    }
    Ok(())
}`,
    analysis:
      'REPL（Read-Eval-Print Loop）是 CLI 交互的核心。TS 使用内置的 readline 模块，Rust 使用 rustyline 库（提供历史记录、自动补全等高级功能）。注意错误处理的差异：TS 的 while(true) + break 比较粗糙，Rust 的 match 模式匹配优雅地处理了正常输入、退出命令和错误三种情况。rustyline 还自动支持上下箭头历史浏览，这在 TS 版本中需要额外代码。',
  },
]

const TOTAL_STEPS = STEPS.length

// ---------------------------------------------------------------------------
// sub-components
// ---------------------------------------------------------------------------

function Sidebar({
  activeLessonIdx,
  onSelectLesson,
  expandedChapter,
  onToggleChapter,
}: {
  activeLessonIdx: number
  onSelectLesson: (idx: number) => void
  expandedChapter: number
  onToggleChapter: (id: number) => void
}) {
  return (
    <aside className="border-border bg-bg-secondary flex w-[200px] shrink-0 flex-col border-r">
      <div className="border-border flex items-center gap-2 border-b px-4 py-3">
        <span className="text-base">📚</span>
        <span className="text-fg text-xs font-semibold">100 Lessons</span>
      </div>
      <ScrollArea className="flex-1">
        <nav className="py-1">
          {CHAPTERS.map((ch) => {
            const isExpanded = expandedChapter === ch.id
            return (
              <div key={ch.id}>
                <Button
                  className="w-full justify-between"
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleChapter(ch.id)}
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      className="text-[10px] transition-transform"
                      style={{ transform: isExpanded ? 'rotate(90deg)' : 'none' }}
                    >
                      ▶
                    </span>
                    <span>
                      {ch.id}. {ch.title}
                    </span>
                  </span>
                </Button>
                {isExpanded && (
                  <div className="flex flex-col">
                    {ch.lessons.map((lesson, li) => {
                      const globalIdx = li
                      const isActive = ch.id === 1 && globalIdx === activeLessonIdx
                      const num = String(li + 1).padStart(2, '0')
                      return (
                        <Button
                          className={`w-full justify-start truncate py-1 pr-3 pl-7 text-[11px] ${
                            isActive
                              ? 'bg-accent/15 text-accent font-medium'
                              : 'text-fg-muted hover:bg-bg-tertiary hover:text-fg'
                          }`}
                          variant="ghost"
                          size="sm"
                          key={li}
                          onClick={() => {
                            if (ch.id === 1) {
                              onSelectLesson(globalIdx)
                            }
                          }}
                        >
                          {num} {lesson}
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </ScrollArea>
    </aside>
  )
}

function StepBar({
  steps,
  activeStep,
  onSelect,
}: {
  steps: Step[]
  activeStep: number
  onSelect: (i: number) => void
}) {
  return (
    <div className="border-border flex items-center gap-1 overflow-x-auto border-b px-4 py-2">
      <span className="text-fg-muted mr-2 shrink-0 text-[10px] font-semibold tracking-wider uppercase">
        Steps
      </span>
      {steps.map((s, i) => {
        const isActive = i === activeStep
        return (
          <Button
            className={`shrink-0 gap-1.5 text-[11px] ${
              isActive
                ? 'bg-accent/15 text-accent font-medium'
                : 'text-fg-muted hover:bg-bg-tertiary hover:text-fg'
            }`}
            variant="ghost"
            size="sm"
            key={i}
            onClick={() => onSelect(i)}
          >
            <span className="text-xs">{s.icon}</span>
            <span>{s.name}</span>
          </Button>
        )
      })}
    </div>
  )
}

function CodePane({
  title,
  subtitle,
  fileName,
  lineRange,
  code,
  annotations,
}: {
  title: string
  subtitle?: string
  fileName: string
  lineRange?: string
  code: string
  annotations?: { line: number; text: string }[]
}) {
  const lines = code.split('\n')

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      {/* header */}
      <div className="border-border flex items-center gap-2 border-b px-3 py-1.5">
        <span className="text-accent text-[11px] font-semibold">{title}</span>
        {subtitle !== undefined && <span className="text-fg-muted text-[10px]">· {subtitle}</span>}
      </div>
      <div className="border-border bg-bg-tertiary/50 flex items-center gap-1.5 border-b px-3 py-1">
        <span className="text-fg font-mono text-[11px]">{fileName}</span>
        {lineRange !== undefined && (
          <span className="text-fg-muted font-mono text-[10px]">{lineRange}</span>
        )}
      </div>

      {/* code block */}
      <ScrollArea className="flex-1">
        <div className="relative font-mono text-[12px] leading-[20px]">
          {lines.map((line, i) => {
            const lineNum = i + 1
            const annotation = annotations?.find((a) => a.line === lineNum)
            return (
              <div className={`flex ${annotation !== undefined ? 'bg-warning/5' : ''}`} key={i}>
                <span className="text-fg-muted/50 w-8 shrink-0 pr-2 text-right select-none">
                  {lineNum}
                </span>
                <span className="text-fg flex-1 whitespace-pre">{line}</span>
                {annotation !== undefined && (
                  <span className="text-warning shrink-0 pr-3 pl-4 text-[10px] leading-[20px]">
                    {'<-- '}
                    {annotation.text}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

function DotIndicator({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }, (_, i) => (
        <span
          className={`inline-block h-1.5 rounded-full transition-all ${
            i === current ? 'bg-accent w-4' : 'bg-fg-muted/30 w-1.5'
          }`}
          key={i}
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// main view
// ---------------------------------------------------------------------------

export function LessonViewerView() {
  const [activeLessonIdx, setActiveLessonIdx] = useState(0)
  const [expandedChapter, setExpandedChapter] = useState(1)
  const [activeStep, setActiveStep] = useState(0)

  const step = STEPS[activeStep]
  const lessonNum = String(activeLessonIdx + 1).padStart(2, '0')
  const lessonTitle = CHAPTERS[0].lessons[activeLessonIdx]

  function handlePrev() {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  function handleNext() {
    if (activeStep < TOTAL_STEPS - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  function handleToggleChapter(id: number) {
    if (expandedChapter === id) {
      setExpandedChapter(-1)
    } else {
      setExpandedChapter(id)
    }
  }

  return (
    <div className="bg-bg flex h-full flex-col">
      {/* top bar */}
      <header className="border-border bg-bg/80 flex h-11 shrink-0 items-center justify-center border-b backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="text-sm">🦀</span>
          <span className="text-fg text-sm font-semibold tracking-tight">
            Claude Code Rust Study
          </span>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* sidebar */}
        <Sidebar
          activeLessonIdx={activeLessonIdx}
          expandedChapter={expandedChapter}
          onSelectLesson={setActiveLessonIdx}
          onToggleChapter={handleToggleChapter}
        />

        {/* main content */}
        <main className="flex min-w-0 flex-1 flex-col">
          {/* lesson header */}
          <div className="border-border flex items-center gap-3 border-b px-5 py-3">
            <Badge className="bg-success/20 text-success font-mono text-xs" variant="success">
              {lessonNum}
            </Badge>
            <h1 className="text-fg text-sm font-semibold">{lessonTitle}</h1>
            <div className="flex-1" />
            <div className="flex items-center gap-1.5">
              <span className="bg-warning/20 inline-block h-1.5 w-1.5 animate-pulse rounded-full" />
              <span className="text-fg-muted text-[11px]">Waiting...</span>
            </div>
          </div>

          {/* step bar */}
          <StepBar activeStep={activeStep} onSelect={setActiveStep} steps={STEPS} />

          {/* code comparison area */}
          <div className="flex min-h-0 flex-1">
            {/* left pane: TypeScript */}
            <CodePane
              annotations={step.annotations}
              fileName={step.tsFile}
              lineRange={step.tsLineRange}
              title={step.tsLang === 'json' ? 'JSON' : 'TypeScript'}
              code={step.tsCode}
            />

            {/* divider */}
            <div className="bg-border w-px shrink-0" />

            {/* right pane: Rust */}
            <CodePane
              code={step.rsCode}
              fileName={step.rsFile}
              subtitle={step.rsSubtitle}
              title="Rust"
            />
          </div>

          {/* analysis section */}
          <div className="border-border border-t px-5 py-3">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="text-sm">💡</span>
              <span className="text-fg text-xs font-semibold">解析</span>
            </div>
            <p className="text-fg-muted text-[12px] leading-relaxed">{step.analysis}</p>
          </div>

          {/* pagination / footer */}
          <div className="border-border flex items-center justify-between border-t px-5 py-2.5">
            <Button
              className="text-[11px] font-medium"
              variant="ghost"
              size="sm"
              disabled={activeStep === 0}
              onClick={handlePrev}
            >
              &lt; Previous
            </Button>

            <div className="flex items-center gap-3">
              <span className="text-fg-muted text-[11px]">
                L{lessonNum} · Step {activeStep + 1} / {TOTAL_STEPS}
              </span>
              <DotIndicator current={activeStep} total={TOTAL_STEPS} />
            </div>

            <Button
              className="text-[11px] font-medium"
              variant="primary"
              size="sm"
              disabled={activeStep === TOTAL_STEPS - 1}
              onClick={handleNext}
            >
              Next &gt;
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
