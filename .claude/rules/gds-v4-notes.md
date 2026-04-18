# GDS v4 Notes

> Raw accumulation, not organized yet. Append new entries to the bottom. How to express / structure this is a later concern.

---

## Positioning

GDS v4 是给 **AI 做 webapp 用**的设计系统框架。

- 直接消费者 = AI agent（拿 GDS 产 webapp 代码）
- 人类的角色 = 写约束、审产出，**不亲自写应用代码**
- 最终 webapp 服务于人类用户，但**写代码的不是人**

这是 "ai-native" 在 v4 的真正含义——不是"组件 AI 读得懂"那种表层特性，是**整个框架存在的理由就是 AI 会用它产 webapp**。

## 核心方法：克制

通过**限制 AI 可选项**来限制 AI 犯错的空间。

- 一个功能只有一种写法；没有"灵活自由"；没有"想怎么组合都行"
- 任何"给 consumer 更多灵活性"的诱惑都得用"会让 AI 产出发散"驳回
- 约束越多，AI 产出越可预测、越可审计、越不会出 v2 那种 390 组件的 sprawl
- 对比：Radix / Base UI 追求"柔性容纳各种需求" —— v4 是反的，**追求禁掉错误可能性**
- 类比：Apple HIG 那种"不给你做坏的自由"

## Principles（克制要达成的具体目标）

> 顺序按收集时间，未分级。

1. 天生支持 mobile web 和 pad
2. 做 GDS 要充分考虑让 AI 当成 skills 来用

---

## 工作方式（人类 + AI 的分工约定）

- 哲学 / API / scope 由人决定，AI 不主动给候选清单（会把决策悄悄让渡给 AI）
- AI 的本职是**审计** + **按已定规范补样板** + **找 orphan / 列不一致**
- 拒绝 bulk 生成。一次一个组件，人确认一个
- principle 是 audit 用的**要求**，不是用来反向推论"因此必须 X / 禁 Y"的前提
- 现阶段是**积累内容**，不是组织、不是表达 —— 怎么呈现是以后的事

---

## 项目管理与业务并行（v1-v3 的痛点）

GDS v1 / v2 / v3 都遇到一个反复出现的根本困难：**Claude Code 协同效率随代码量增加大幅下降**。这是前三代都没解决的结构性问题，也是 v4 必须区别于前三代的核心点。

**因此 v4 的工作方式约定**：项目管理基础设施和业务代码**同步进行**，不是"先写完业务再补管理"。每写一段业务，PM 那一侧也得跟着动。

待用户后续定义（AI 不预设候选清单）：
- 哪些 artifacts 算 v4 的"PM 基础设施"
- "同步"具体指业务变更前/后必须更新的什么内容
- 如何衡量 PM 是否跟得上业务
