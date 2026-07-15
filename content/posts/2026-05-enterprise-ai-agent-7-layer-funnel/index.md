---
title: "企业 AI Agent 落地指南：跨越从模型到业务的 7 层漏斗"
date: 2026-05-29T00:00:00+08:00
description: "从最强的模型到最终的业务指标，中间隔着至少 7 层漏斗。用 Ad Agent 实战案例，系统讲解 AI 应用交付的漏斗模型、技术选型、实施路径与不同规模企业的最佳实践。"
tags: ["AI Agent", "企业级 AI", "LangGraph", "Claude Code", "Ad Agent", "架构设计", "买量"]
categories: ["AI 工程"]
draft: false
showToc: true
TocOpen: false
hidemeta: false
comments: false
disableHLJS: true
disableShare: false
hideSummary: false
searchHidden: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
cover:
  image: ""
  alt: ""
  caption: ""
  relative: false
  hidden: true
---

> 2026 年 5 月
>
> 作者：展博

---

## 引言：为什么最强的模型，交付效果却不如人意？

2026 年，AI Agent 已经不是新鲜词。

企业 CTO 们纷纷入局：买 GPU、接 GPT-5、搭 LangChain、招 AI 工程师。但半年下来，真正产生业务价值的案例寥寥无几。

**一个真实的对话**：

> **CEO**："我们投了 200 万做 AI，为什么 ROI 没提升？"
> **CTO**："模型效果很好啊，GPT-5 的 benchmark 都是 SOTA..."
> **CEO**："我要的是广告投放 ROI 提升 20%，不是 benchmark 第一。"

这个问题，几乎每个做 AI 转型的企业都会遇到。

**核心矛盾**：**模型能力 ≠ 业务结果**。

从最强的模型到最终的业务指标（ROI、用户体验、商业化变现），中间隔着至少 **7 层漏斗**。任何一层的缺失或薄弱，都会导致"叫好不叫座"。

本文将用 **Ad Agent（广告投放智能体）** 作为实战案例，系统讲解：
1. **AI 应用交付的 7 层漏斗模型**（自顶向下设计方法）
2. **技术选型**：LangGraph vs 自研 vs Claude Code？
3. **实施路径**：从 Skill 验证到生产系统（含代码示例）
4. **不同规模企业的最佳实践**（<10 人 → 500 人）

---

## 一、AI 应用交付的 7 层漏斗

### 1.1 漏斗模型：最强的模型 ≠ 最好的业务结果

```
┌─────────────────────────────────────────────────────────────────┐
│  L1 业务指标层    最顶层：ROI、用户体验、商业化变现             │
│  ↓（很多团队在这里就断了）                                       │
│  L2 业务抽象层    基于指标定义场景和工作流                       │
│  ↓                                                              │
│  L3 应用设计层    基于编排的应用层，监控/审核/存储等              │
│  ↓                                                              │
│  L4 流程编排层    Human-in-the-loop，人/模型/系统协调联动         │
│  ↓                                                              │
│  L5 上下文工程层  高质量输入 → 高质量输出（Harness 工程）         │
│  ↓                                                              │
│  L6 模型调用层    合理调度模型，避免大材小用或力不从心             │
│  ↓                                                              │
│  L7 模型能力层    最底层：模型本身的推理、理解、生成能力           │
└─────────────────────────────────────────────────────────────────┘
```

**关键洞察**：
- 大多数团队的路径是 **L7 → L1**（反过来！）
- 正确路径应该是 **L1 → L7**（自顶向下）

### 1.2 自顶向下设计：从业务目标出发

#### 错误姿势（技术驱动）

```
CTO："我们有 GPT-5，能做什么？"
  ↓
买 API、搭 LangChain、接各种 Tool
  ↓
做了一堆 Demo，好看但没用
  ↓
CEO："200 万花哪了？"
```

#### 正确姿势（业务驱动）

```
CEO："我们的广告 ROI 太低（D1 ROAS < 0.8），哪些环节可以优化？"
  ↓
L1 业务指标层：定义成功标准（ROI +20%、CPA -15%）
  ↓
L2 业务抽象层：拆解场景
  - 低价值重复工作 → 自动化（搭建计划、推送创意）
  - 高价值决策工作 → 人主导（创意策略、渠道探索）
  - 无法替代 → 保留人工（预算审批、品牌决策）
  ↓
L3 应用设计层：定义功能模块
  - Campaign 创建、优化调整、效果监控、归因分析
  ↓
L4 流程编排层：设计 Human-in-the-loop
  - L0 自动执行（暂停广告、调整预算 ±10%）
  - L1 低风险（模型建议 + 自动执行）
  - L2 人工确认（生成方案 → 用户审批）
  - L3 严格审批（新建 Campaign、预算 >$1000/天）
  ↓
L5 上下文工程层：设计 Context Harness
  - 历史对话、业务规则、RAG 检索
  ↓
L6 模型调用层：选择模型、设计 Prompt、成本优化
  ↓
L7 模型能力层：底层 API（GPT-4o / Claude / Gemini）
```

**核心原则**：每一层都要 **对齐上一层的需求**，而不是反过来。

---

## 二、实战案例：Ad Agent 的 7 层设计

以 **app / shopping 广告投放** 场景为例，完整演示漏斗模型的应用。

### 2.1 L1 业务指标层（Starting Point！）

**核心指标**（对齐 UA Monitor / BI 平台）：

| 指标类型 | 具体指标 | 目标 |
|---------|---------|------|
| **ROI 系列** | D1/D7/D30 ROAS、Payback Period、LTV | D7 ROAS > 1.2 |
| **效率指标** | CPI、CTR、CVR、eCPM | CTR +20%、CPA -15% |
| **规模指标** | Spend、Installs、Impressions | 根据预算动态 |
| **质量指标** | Retention D1/D7、付费率 | D7 Retention > 30% |

**指标来源**（已对接系统）：
- **UA Monitor API** → 实时 ROI 计算
- **BI 平台** → 历史基准、趋势分析
- **MMP (AppsFlyer)** → 归因数据
- **媒体平台 API** → 消耗 / 展示 / 点击

**关键**：L1 层必须 **可量化、可追踪、可归因**。

### 2.2 L2 业务抽象层（场景拆解）

**UA 场景拆解**：

```
┌─────────────────────────────────────────┐
│  低价值重复工作 → 模型自动执行            │
│  ✓ 搭建广告计划（参数化、模板化）        │
│  ✓ 推送创意（批量上传、A/B 测试）        │
│  ✓ 日常数据拉取（定时任务、报表生成）    │
├─────────────────────────────────────────┤
│  高价值决策工作 → 人主导，模型辅助        │
│  ✓ 创意制作（模型生成文案，人筛选）      │
│  ✓ 策略调整（模型建议，人决策）          │
│  ✓ 渠道探索（模型推荐，人评估）          │
├─────────────────────────────────────────┤
│  模型无法替代 → 保留人工                  │
│  ✓ 渠道权限申请（需要人类 judgment）      │
│  ✓ 预算审批（战略决策）                   │
│  ✓ 品牌决策（价值观判断）                 │
└─────────────────────────────────────────┘
```

**策略层（Strategies）**：
- `_default.json` → 通用规则（8 条基础规则）
- `awareness.json` → 内容推广专属策略
- `[可扩展]` 不同业务线独立策略

**输出**：明确的 **自动化边界** 和 **人机协作界面**。

### 2.3 L3 应用设计层（功能模块）

**核心应用场景**：

| 功能模块 | 输入 | 处理 | 输出 |
|---------|------|------|------|
| **① 创建 Campaign** | 自然语言描述 | Intent 解析 → 配置生成 → 审批 → API 执行 | Campaign ID、预览链接 |
| **② 优化调整** | 效果数据 | 策略匹配 → 执行建议 | 优化方案（Adjust Bid、换创意） |
| **③ 效果监控** | 多时间窗数据 | 异常检测 → 诊断 → 干预 | 告警、自动调整、人工通知 |
| **④ 归因分析** | MMP 数据 | 多触点归因计算 | ROI 报告、渠道贡献度 |
| **⑤ 竞品情报** | 素材库 | 相似度检索 → 创意灵感 | 竞品分析报告、创意建议 |

**关键设计决策**：
- **自然语言优先**（降低使用门槛）
- **审批流内置**（防止模型犯错）
- **可解释性**（每次决策都要有 reasoning）

### 2.4 L4 流程编排层（Human-in-the-loop）

**Action Engine（分级执行）**：

```
Risk Level 0（L0）- 自动执行
  - 暂停 CTR<0.5% 的广告
  - 调整预算 ±10%
  - 切换 A/B 测试胜出创意
  → 无需审批，但记录日志

Risk Level 1（L1）- 低风险，模型主导
  - 调整出价（±20% 以内）
  - 更换相似创意
  - 扩展相似受众（Lookalike 1-3%）
  → 模型决策 → 自动执行 → 通知用户

Risk Level 2（L2）- 中风险，人工确认
  - 新建 Campaign
  - 调整预算（>20%）
  - 更换受众定向
  → 模型生成方案 → 用户 Approve/Reject

Risk Level 3（L3）- 高风险，严格审批
  - 预算 >$1000/天
  - 新渠道接入
  - 品牌相关决策
  → 多级审批（执行者 → 经理 → VP）
```

**Monitor（监控告警）**：

| 时间窗 | 检查内容 | 触发条件 | 自动干预 |
|--------|---------|---------|---------|
| **T+2h** | 异常诊断 | CTR 下降 >30%、消耗异常 | 暂停广告、通知用户 |
| **T+24h** | 趋势分析 | ROI 低于预期、CPA 超预算 | 调整出价、切换创意 |
| **T+7d** | 策略复盘 | 周度 ROI、LTV 预测 | 生成周报、策略建议 |

**Learner（学习迭代）**：
- `action_log`：记录所有操作（模型 / 人工）
- `effect_track`：追踪操作效果（ROI 变化）
- `Schema 迭代`：根据效果优化决策规则

**技术实现**：用 **LangGraph** 实现状态管理和条件跳转。

### 2.5 L5 上下文工程层（Context Harness）

**为什么 Context 重要？**

> LLM 是"预测机器"，不是"知识库"。
> 高质量的输入 → 高质量的输出。

**Context Harness 设计**：

```
┌─────────────────────────────────────────┐
│  Context Harness（上下文工程）            │
├─────────────────────────────────────────┤
│  1. 历史对话上下文（最近 10 轮）           │
│     → 保持对话连贯性                      │
├─────────────────────────────────────────┤
│  2. 业务上下文（UA Monitor 指标）         │
│     → 实时 ROI 基线、历史基准             │
├─────────────────────────────────────────┤
│  3. 平台上下文（Meta/Google API 规范）    │
│     → API 参数约束、配额限制              │
├─────────────────────────────────────────┤
│  4. Schema 上下文（结构化输出契约）        │
│     → JSON Schema、类型约束               │
├─────────────────────────────────────────┤
│  5. RAG 检索（历史成功案例）              │
│     → 相似 Campaign 配置、最佳实践         │
└─────────────────────────────────────────┘
```

**RAG 实现要点**：
- **向量数据库**：Pinecone / Milvus（存储历史 Campaign）
- **检索策略**：语义相似度 + 时间衰减 + 效果加权
- **上下文窗口管理**：优先级排序、截断策略

**示例 Prompt（含 Context）**：

```
You are an Ad Campaign Optimization Agent.

## Business Context
- Current D7 ROAS: 0.95 (Target: 1.2)
- Current CTR: 1.1% (Historical avg: 1.3%)
- Budget remaining: $3200 / $5000

## Historical Success Cases (RAG retrieved)
1. Campaign "US_AppInstall_Q1" - CTR 1.8%, ROAS 1.4
   Config: {age: 18-35, interest: gaming, creative: video}

2. Campaign "EU_AppInstall_Q1" - CTR 1.5%, ROAS 1.3
   Config: {age: 25-40, interest: casual_games, creative: image}

## Platform Constraints (Meta Ads API)
- Daily budget min: $5
- Max audiences per adset: 50
- Creative aspect ratio: 9:16 (vertical), 1:1 (square)

## Task
Generate optimization 建议 for Campaign ID: 1234567890

Output JSON Schema:
{
  "actions": [
    {"type": "ADJUST_BID", "value": 0.85, "reason": "..."},
    {"type": "CHANGE_CREATIVE", "creative_id": "..."}
  ],
  "expected_roas_lift": 0.15
}
```

### 2.6 L6 模型调用层（合理调度）

**常见错误**：
- 所有任务都用 GPT-4o（成本高、延迟大）
- 简单任务用 Claude Opus（大材小用）
- 不缓存相似请求（重复调用浪费 Token）

**正确策略**：

| 任务类型 | 模型选择 | 成本 | 延迟 | 示例 |
|---------|---------|------|------|------|
| **Intent 解析** | GPT-3.5 Turbo | $0.5/M tokens | ~1s | "创建 Campaign" → JSON |
| **配置生成** | GPT-4o | $5/M tokens | ~3s | Intent → Meta Ads API Config |
| **复杂推理** | Claude Opus 4.7 | $15/M tokens | ~5s | 跨平台预算分配策略 |
| **创意生成** | GPT-4o（多模态） | $5/M tokens | ~3s | 文案生成、图片描述 |
| **代码生成** | Claude Sonnet | $3/M tokens | ~2s | Meta Ads API 脚本生成 |

**成本优化技巧**：
1. **缓存相似请求**（广告文案生成，相似需求返回缓存）
2. **混合模型策略**（简单 → GPT-3.5，复杂 → GPT-4o）
3. **自部署开源模型**（Llama 3 部署在自有 GPU，成本降低 90%）
4. **批量调用**（多个 Campaign 同时优化，一次 API 调用）

**防幻觉检查（H1-H7）**：
- **H1**：输出格式校验（JSON Schema 验证）
- **H2**：业务规则校验（预算范围、受众合理性）
- **H3**：历史数据对比（与相似 Campaign 对比）
- **H4**：API 约束检查（Meta Ads API 参数校验）
- **H5**：人工审核（L2/L3 风险操作）
- **H6**：A/B 测试验证（新策略小流量测试）
- **H7**：实时监控（执行后效果追踪）

### 2.7 L7 模型能力层（底层 API）

**模型选型**（2026 年 5 月）：

| 模型 | 优势 | 劣势 | 适用场景 |
|------|------|------|---------|
| **GPT-4o** | 多模态、成本低 | 推理能力中等 | 配置生成、创意生成 |
| **Claude Opus 4.7** | 推理最强、1M 上下文 | 成本高 | 复杂策略、跨文件分析 |
| **Gemini 3.5** | 多模态、1M 上下文 | 代码能力弱 | 图像创意分析 |
| **领域微调模型** | 广告语义理解、行业术语 | 需要训练数据 | 意图解析、创意推荐 |

**自部署 vs API 调用**：

| 维度 | API 调用（OpenAI/Anthropic） | 自部署（Llama 3 / Qwen） |
|------|---------------------------|----------------------|
| **成本** | 按 Token 计费（$5-15/M tokens） | 前期 GPU 投入，后期边际成本为 0 |
| **延迟** | 依赖网络（100-500ms） | 本地推理（<50ms） |
| **定制化** | 有限（Prompt Engineering） | 完全可控（Fine-tuning、LoRA） |
| **适用场景** | MVP、低频调用 | 规模化、高频调用（>1M tokens / 天） |

**建议**：
- **MVP 阶段**：API 调用（快速验证）
- **规模化后**：自部署开源模型（降低成本）

---

## 三、技术选型：LangGraph vs 自研 vs Claude Code？

### 3.1 核心问题：企业如何搭建 Agentic 应用？

**三种技术路线**：

| 方案 | 描述 | 适用场景 | 代表案例 |
|------|------|---------|---------|
| **基于 LangChain/LangGraph** | 使用成熟的 Agent 框架 | 需要复杂决策流、多步骤协作 | CodeBuddy（腾讯） |
| **基于 Claude Code 类工具** | 在 AI 编程助手上构建 Skill | 快速验证、个人效率工具 | 本文的 Skill 验证阶段 |
| **完全自研 Agent Loop** | 从底层实现 ReAct Loop | 极致性能、完全可控 | OpenAI Codex、Antigravity |

**核心结论**：
- **LangChain/LangGraph** 适合作为 **编排层**（状态管理、多 Agent 协作）
- **Claude Code 类工具** 是 **开发辅助工具**，不是 **业务应用运行时**
- **生产级应用** 需要：**业务层（自研）+ 编排层（LangGraph 或自研）+ 工具层（自研）**

### 3.2 为什么不能直接用 Claude Code 搭建业务应用？

| 维度 | Claude Code 类工具 | 企业级 Ad Agent 应用 |
|------|-------------------|---------------------|
| **核心能力** | 代码生成、文件操作 | 广告投放、ROI 优化、归因分析 |
| **运行方式** | 终端交互、按需触发 | 7×24 小时运行、事件驱动 |
| **多租户支持** | 不支持 | 必须支持（SaaS 模式） |
| **权限管理** | 简单（文件读写） | 必须支持（RBAC、审批流） |
| **数据隐私** | 代码文件（低风险） | 客户数据（高风险，需私有部署） |
| **执行频率** | 按需（开发者触发） | 高频（每秒数百次 API 调用） |

**类比**：
- **Claude Code** = "高级程序员"（帮你写代码）
- **Ad Agent 生产系统** = "自动化投放专家"（7×24 小时工作）

**正确用法**：
```
用 Claude Code 加速开发（生成 LangGraph 代码、FastAPI 接口、React 组件）
    ↓
部署为独立的生产系统（FastAPI + React + PostgreSQL）
    ↓
客户通过 Web Dashboard 或 API 使用（不是通过 Claude Code 终端）
```

### 3.3 LangGraph vs 自研：什么时候该用哪个？

**LangGraph 的优势**：
- **开发速度快**（现成的 State、Checkpoint、Human-in-the-loop）
- **可视化调试**（LangGraph Studio）
- **社区支持好**（大量教程、案例）
- **性能中等**（抽象层开销）
- **成本控制难**（无法精细控制 Token 消耗）

**自研 Agent Loop 的优势**：
- **性能极致**（无抽象层开销）
- **完全可控**（定制化调度策略、资源隔离）
- **成本低**（无框架冗余代码）
- **开发周期长**（需要自己实现状态机、持久化）
- **调试复杂**（无现成可视化工具）

**决策矩阵**：

| 企业规模 | 阶段 | 推荐方案 | 原因 |
|---------|------|---------|------|
| **<10 人** | MVP | LangGraph | 快速验证、人力有限 |
| **10-50 人** | V1.0 | LangGraph（决策）+ 自研（执行） | 平衡开发效率与性能 |
| **50-150 人** | V2.0 | 自研 Agent Loop + LangGraph（可选） | 性能优化、成本控制 |
| **300-500 人** | V3.0 | 完全自研 | 平台化、生态建设 |

**架构演进路径**：
```
阶段 1（<10 人）：LangGraph All-in
    ↓
阶段 2（10-50 人）：LangGraph（决策） + 自研（执行）
    ↓
阶段 3（50-150 人）：自研 Agent Loop + LangGraph（可选）
    ↓
阶段 4（300-500 人）：完全自研 + 开源贡献（反哺社区）
```

---

## 四、实施路径：从 Skill 验证到生产系统

### 4.1 为什么要用 Skill 形态验证？

**Skill** = 在 Claude Code / CodeBuddy 中自定义的 slash command（如 `/create-ad-campaign`）。

| 维度 | Skill 形态（MVP 验证） | 直接写生产代码 |
|------|---------------------|--------------|
| **反馈周期** | 分钟级（改 SKILL.md，立即测试） | 天级（改代码 → 测试 → 部署） |
| **成本** | 低（只在 Claude Code 里运行） | 高（需要搭建前后端、数据库） |
| **失败成本** | 低（只是 skill 报错，不影响生产） | 高（bug 影响客户数据） |
| **适用场景** | 验证 workflow、Prompt 设计 | 生产部署、多租户、权限管理 |

**最佳实践**：
```
Skill 验证通过（workflow 可行、Prompt 稳定、成功率 >80%）
    ↓
用 Claude Code 生成生产代码（LangGraph + FastAPI + React）
    ↓
部署到生产环境
    ↓
收集用户反馈 → 更新 Skill（快速迭代 Prompt） → 同步到生产代码
```

### 4.2 Phase 1：用 Skill 快速验证（1-2 周）

#### Step 1：创建 Skill 目录结构

```bash
mkdir -p skills/create-ad-campaign
cd skills/create-ad-campaign

touch SKILL.md
touch prompt-template.md
touch examples.md
```

#### Step 2：编写 SKILL.md（核心逻辑）

`skills/create-ad-campaign/SKILL.md`：

    # Create Ad Campaign Skill

    ## 触发方式
    `/create-ad-campaign <自然语言描述>`

    ## 功能描述
    根据用户自然语言描述，自动创建广告 Campaign。

    ## Workflow（LangGraph 风格）

    ### Node 1: parse_intent
    输入：用户自然语言描述
    输出：结构化意图 JSON
    Prompt：
    ```
    解析以下广告需求，输出 JSON：
    用户描述: {user_input}

    输出格式：
    {
      "platform": "meta|google|tiktok",
      "objective": "APP_INSTALLS|TRAFFIC|AWARENESS",
      "budget_daily": 500,
      "geo_targeting": ["US", "CA"],
      "age_range": [18, 35],
      "interests": ["gaming", "mobile apps"]
    }
    只输出 JSON，不要有其他文字。
    ```

    ### Node 2: generate_config
    输入：intent JSON
    输出：Campaign 配置（符合 Meta Ads API 规范）
    逻辑：
    1. 查询历史相似 Campaign（RAG 检索 `memory/campaign-history.json`）
    2. 生成 Campaign 配置
    3. 预估性能（ROI、CTR）

    ### Node 3: human_approval
    输入：Campaign 配置
    输出：approved/rejected + 修改建议
    逻辑：
    - 展示配置给用户
    - 等待用户确认（Approve/Reject/Modify）
    - 如果 Reject，回到 Node 2 并附加修改建议

    ### Node 4: create_campaign
    输入：审批通过的配置
    输出：Campaign ID + 预览链接
    逻辑：
    1. 调用 Meta Ads API（`meta_ads_api` tool）
    2. 记录日志到 `logs/campaigns.log`
    3. 返回结果

    ## Tools 调用
    - `meta_ads_api`: 调用 Meta Ads API
    - `read_file`: 读取历史 Campaign 数据
    - `write_file`: 记录日志

    ## 安全规则
    - 预算 > $1000/天 需要二次确认
    - 记录所有操作到 `logs/audit.log`
    - 不自动创建，必须人工审批

#### Step 3：在 Claude Code 中测试 Skill

```bash
/create-ad-campaign "帮我创建一个美国市场的 App Install Campaign，日预算 $500，目标年龄 18-35 岁"
```

**Claude Code 会执行 SKILL.md 定义的 Workflow**：
1. 解析意图（调用 LLM）
2. 生成配置（读取历史数据 + LLM 生成）
3. 等待你确认
4. 调用 Meta Ads API
5. 返回 Campaign ID

#### Step 4：迭代优化（关键！）

| 问题 | 优化方法 |
|------|---------|
| 意图解析不准确 | 调整 Node 1 的 Prompt，增加 Few-shot 示例 |
| 生成的配置不符合 API 规范 | 在 Node 2 增加 API Schema 校验（用 Pydantic） |
| 用户审批体验差 | 优化展示格式（用表格代替 JSON） |
| 历史数据检索不准确 | 优化 RAG 检索（用向量搜索代替关键词） |

**迭代周期**：每天测试 5-10 个案例，调整 Prompt，直到 Workflow 稳定。

### 4.3 Phase 2：用 Claude Code 生成生产系统（2-4 周）

**核心思路**：让 Claude Code 帮你写代码（FastAPI + LangGraph + React）。

#### 示例 1：让 Claude Code 生成 LangGraph State 和 Nodes

**对话示例**：

```
你：@Claude Code 帮我写 backend/app/agents/campaign_agent.py

LangGraph State：
- user_input: str
- intent: dict
- campaign_config: dict
- approval_status: str  # "pending" | "approved" | "rejected"
- campaign_id: str
- error: str

Nodes：
1. parse_intent: 解析用户自然语言 → intent JSON
2. generate_config: 生成 Campaign 配置
3. human_approval: 等待用户审批（中断点）
4. create_campaign: 调用 Meta Ads API

Edges：
- parse_intent → generate_config
- generate_config → human_approval
- human_approval → create_campaign (如果 approved)
- human_approval → generate_config (如果 rejected，带修改建议)

用最新的 LangGraph 语法（@langchain/langgraph 0.2+）
```

**Claude Code 生成的代码**（`backend/app/agents/campaign_agent.py`）：

```python
from typing import TypedDict, Annotated, Literal
from langchain_core.messages import HumanMessage, AIMessage
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.redis import RedisSaver
from app.tools.meta_ads_api import MetaAdsAPI
from app.tools.rag_retrieval import RAGRetriever
import json

# ========== State 定义 ==========
class CampaignState(TypedDict):
    """LangGraph State for Campaign Creation"""

    user_input: str
    intent: dict
    campaign_config: dict
    approval_status: Literal["pending", "approved", "rejected"]
    approval_comment: str
    campaign_id: str
    error: str
    messages: Annotated[list, "add_messages"]

# ========== Nodes 定义 ==========
def parse_intent(state: CampaignState) -> CampaignState:
    """Node 1: 解析用户自然语言 → intent JSON"""
    prompt = f"""
    Parse the following ad campaign request into JSON:
    User input: {state['user_input']}

    Output JSON format:
    {{
        "platform": "meta|google|tiktok",
        "objective": "APP_INSTALLS|TRAFFIC|AWARENESS",
        "budget_daily": 500,
        "geo_targeting": ["US", "CA"],
        "age_range": [18, 35],
        "interests": ["gaming", "mobile apps"]
    }}

    Output only JSON, no other text.
    """
    llm_response = call_llm(prompt)
    intent = json.loads(llm_response)

    return {
        **state,
        "intent": intent,
        "messages": state["messages"] + [AIMessage(content=f"Intent parsed: {intent}")]
    }

def generate_config(state: CampaignState) -> CampaignState:
    """Node 2: 生成 Campaign 配置"""
    rag = RAGRetriever()
    similar_campaigns = rag.search(state['user_input'], top_k=3)

    prompt = f"""
    Generate Meta Ads Campaign config based on intent:
    Intent: {state['intent']}

    Historical similar campaigns:
    {similar_campaigns}

    Output config in Meta Ads API format.
    """
    llm_response = call_llm(prompt)
    campaign_config = json.loads(llm_response)

    return {
        **state,
        "campaign_config": campaign_config,
        "approval_status": "pending",
        "messages": state["messages"] + [AIMessage(content=f"Config generated: {campaign_config}")]
    }

def human_approval(state: CampaignState) -> CampaignState:
    """Node 3: 等待用户审批（LangGraph 中断点）"""
    approval_status = state['approval_status']

    if approval_status == "approved":
        return {**state, "messages": state["messages"] + [AIMessage(content="Approved, creating campaign...")]}
    elif approval_status == "rejected":
        return {**state, "messages": state["messages"] + [AIMessage(content=f"Rejected: {state['approval_comment']}, regenerating...")]}
    else:
        return state

def create_campaign(state: CampaignState) -> CampaignState:
    """Node 4: 调用 Meta Ads API 创建 Campaign"""
    try:
        api = MetaAdsAPI()
        result = api.create_campaign(state['campaign_config'])
        return {
            **state,
            "campaign_id": result['id'],
            "messages": state["messages"] + [AIMessage(content=f"Campaign created! ID: {result['id']}")]
        }
    except Exception as e:
        return {
            **state,
            "error": str(e),
            "messages": state["messages"] + [AIMessage(content=f"Error: {str(e)}")]
        }

def route_after_approval(state: CampaignState) -> Literal["create_campaign", "generate_config"]:
    if state['approval_status'] == "approved":
        return "create_campaign"
    elif state['approval_status'] == "rejected":
        return "generate_config"
    else:
        return "human_approval"

def build_campaign_agent():
    graph = StateGraph(CampaignState)
    graph.add_node("parse_intent", parse_intent)
    graph.add_node("generate_config", generate_config)
    graph.add_node("human_approval", human_approval)
    graph.add_node("create_campaign", create_campaign)

    graph.add_edge("parse_intent", "generate_config")
    graph.add_edge("generate_config", "human_approval")
    graph.add_conditional_edges(
        "human_approval",
        route_after_approval,
        {
            "create_campaign": "create_campaign",
            "generate_config": "generate_config"
        }
    )
    graph.add_edge("create_campaign", END)
    graph.set_entry_point("parse_intent")

    redis_saver = RedisSaver(redis_url="redis://localhost:6379")
    app = graph.compile(checkpointer=redis_saver, interrupt_before=["human_approval"])
    return app
```

#### 示例 2：让 Claude Code 生成 FastAPI 接口

```
你：@Claude Code 帮我写 FastAPI 接口：
   1. POST /api/campaigns/create - 创建 Campaign（触发 LangGraph）
   2. GET /api/campaigns/{thread_id}/status - 查询状态
   3. POST /api/campaigns/{thread_id}/approve - 审批通过
   4. POST /api/campaigns/{thread_id}/reject - 审批拒绝
   5. GET /api/campaigns - 查询 Campaign 列表（分页、筛选）

   要求：
   - 用 SQLAlchemy 操作 PostgreSQL
   - 用 Redis 存储 LangGraph 状态
   - 返回格式符合 Pydantic Schema
```

#### 示例 3：让 Claude Code 生成 React 前端

```
你：@Claude Code 帮我写 React 组件：
   1. CampaignCreate.tsx - 自然语言输入 + 配置预览 + Approve/Reject 按钮
   2. CampaignList.tsx - Campaign 列表（表格） + 筛选 + 分页
   3. Dashboard.tsx - ROI、消耗、CTR 可视化（用 Recharts）

   要求：
   - TypeScript + Ant Design 组件库
   - 状态管理用 Zustand
   - API 调用用 Axios
```

### 4.4 Phase 3：Docker 部署和测试（1 周）

`docker-compose.dev.yml`：

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/adagent
      - REDIS_URL=redis://redis:6379
      - META_ACCESS_TOKEN=${META_ACCESS_TOKEN}
    depends_on:
      - db
      - redis
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
    environment:
      - VITE_API_URL=http://localhost:8000
    command: npm run dev

  db:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=adagent
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

**启动开发环境**：

```bash
docker-compose -f docker-compose.dev.yml up -d
# 前端：http://localhost:3000
# 后端 API 文档：http://localhost:8000/docs
```

---

## 五、按企业规模的结构化建议

### 5.1 <10 人 Studio（初创期）

**核心目标**：快速验证、最低成本、聚焦核心差异化

| 维度 | 建议 |
|------|------|
| **需求优先级** | 1. 单平台广告投放自动化（如 Meta Ads）<br>2. ROI 基础分析<br>3. 简单 A/B 测试 |
| **技术选型** | • 后端：**Python + LangGraph**（快速开发）<br>• 前端：**React + Vite**（轻量）<br>• 数据库：**PostgreSQL + Redis**（All-in-One）<br>• 部署：**Vercel + Railway/Render**（无运维） |
| **架构设计** | • 单体应用，按功能模块拆分<br>• 无微服务，但保留 API 边界<br>• LangGraph 管理 Agent 状态（广告计划生成 → 投放 → 监控 → 优化） |
| **团队配置** | • 1-2 名全栈 + 1 名 AI 工程师 |
| **成本预估** | • 人力：$5-10K/月（3 个月 MVP）<br>• 基础设施：<$500/月<br>• LLM API：$200-500/月 |
| **关键指标** | • Time-to-Market < 3 个月<br>• 支持 10-50 个广告账户<br>• ROI 提升 > 20%（相比手动） |

**MVP 功能清单**：
```
✅ Meta Ads API 集成（广告创建、预算调整）
✅ 基础 ROI 分析（ROAS、CPA、Conversion Rate）
✅ LangGraph Agent（规划 → 执行 → 监控 → 优化）
✅ 简单 Dashboard（投放数据可视化）
❌ 暂不做什么：多平台、复杂 A/B 测试、多租户
```

### 5.2 10-50 人（成长期）

**核心目标**：多平台支持、初步规模化、数据驱动决策

| 维度 | 建议 |
|------|------|
| **需求优先级** | 1. 多平台广告管理（Meta + Google + TikTok）<br>2. 智能预算分配<br>3. 自动化 A/B 测试<br>4. 多租户支持（如果是 SaaS） |
| **技术选型** | • 后端：**Python（FastAPI）+ Go（高性能服务）**<br>• 编排层：**LangGraph + 自研状态机**（混合）<br>• 数据库：**PostgreSQL（主） + ClickHouse（分析） + Redis（缓存）**<br>• 消息队列：**RabbitMQ/Kafka**（异步任务）<br>• 部署：**Kubernetes（GKE/EKS）** |
| **架构设计** | • 微服务拆分：Ad Platform Service、Agent Orchestrator、Analytics Service、User Management<br>• LangGraph 负责复杂决策流（跨平台预算分配、A/B 测试策略）<br>• 自研执行引擎（高性能广告操作，避免 LangGraph 开销） |
| **团队配置** | • 后端 3-4 人（Python + Go）<br>• 前端 2 人（React + Dashboard）<br>• AI 工程师 2 人（LangGraph + Prompt Engineering）<br>• DevOps 1 人（K8s + CI/CD） |
| **成本预估** | • 人力：$50-80K/月（团队成本）<br>• 基础设施：$2-5K/月<br>• LLM API：$1-3K/月 |

**架构图（简化）**：

```
┌─────────────────────────────────────────┐
│  Web Dashboard (React)                  │
└──────────────────────────┬──────────────┘
                           │
┌──────────────────────────▼──────────────┐
│  API Gateway (FastAPI)                  │
├─────────────────────────────────────────┤
│  LangGraph Orchestrator                 │  ← 复杂决策（预算分配、A/B 测试）
│    - State Management                   │
│    - Multi-Agent Coordination           │
└──────────────────────────┬──────────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
    ┌─────────▼──┐  ┌─────▼───┐  ┌────▼────┐
    │   Meta     │  │  Google  │  │  TikTok │  ← 自研执行引擎（高性能）
    │   Service  │  │  Service │  │  Service│
    └────────────┘  └──────────┘  └─────────┘
```

### 5.3 50-150 人（扩张期）

**核心目标**：企业级功能、高度定制化、合规与安全

| 维度 | 建议 |
|------|------|
| **需求优先级** | 1. 高级归因模型（Multi-touch Attribution）<br>2. 预测性投放（LTV 预测、Churn 预测）<br>3. 企业级权限管理（RBAC + ABAC）<br>4. 审计日志与合规（SOC 2、GDPR） |
| **技术选型** | • 后端：**Go 为主（性能敏感） + Python（AI 任务）**<br>• 编排层：**自研状态机 + LangGraph（可选）**<br>• 数据库：**PostgreSQL（分库分表） + ClickHouse（实时分析） + Cassandra（日志）**<br>• 向量数据库：**Pinecone / Milvus**（广告创意相似度搜索）<br>• 监控：**Prometheus + Grafana + Jaeger（链路追踪）** |
| **架构演进** | • LangGraph 降级为"可选组件"（仅用于复杂策略生成）<br>• 自研 Agent Loop 替代 LangGraph（性能优化、成本控制）<br>• 引入 **RAG 层**（历史投放数据、最佳实践库）<br>• **Model Fallback**（主模型故障自动切换） |
| **团队配置** | • 后端 8-10 人（Go + Python）<br>• 前端 4-5 人（React + 数据可视化）<br>• AI/ML 团队 4-5 人（自研模型、Prompt 优化）<br>• 数据工程师 2-3 人（ETL、数据仓库）<br>• DevOps/SRE 3-4 人（K8s、监控、安全） |
| **成本预估** | • 人力：$150-250K/月<br>• 基础设施：$10-20K/月<br>• LLM API：$5-15K/月 |

**关键技术决策**：

1. **为什么开始自研 Agent Loop？**
   - LangGraph 的抽象层在高频场景下有性能开销（每次状态转换都有序列化 / 反序列化）
   - 自研可以更精细地控制 Token 消耗（广告文案生成可以缓存相似请求）
   - 需要自定义调度策略（Priority Queue、资源隔离）

2. **RAG 层的价值**：
   - 存储历史投放数据（哪些创意在哪些受众上表现好）
   - 快速检索相似案例（新客户问"如何投放健身 App"，检索历史成功案例）
   - 降低 LLM 调用成本（检索结果作为上下文，减少推理次数）

### 5.4 300-500 人（成熟期）

**核心目标**：平台化、生态建设、AI 原生架构

| 维度 | 建议 |
|------|------|
| **需求优先级** | 1. **Multi-Agent 市场**（用户可自定义 Agent 工作流）<br>2. **私有模型微调**（基于客户数据的 LoRA 微调）<br>3. **实时决策引擎**（<100ms 延迟的 Bid 优化）<br>4. **跨平台统一归因** |
| **技术选型** | • 后端：**Rust（性能极致） + Go（业务逻辑） + Python（AI 研究）**<br>• 编排层：**完全自研**（参考 LangGraph 设计但去除冗余）<br>• 数据库：**分布式 NewSQL（CockroachDB/TiDB）**<br>• 向量数据库：**自研**（基于 HNSW + 业务优化）<br>• AI 基础设施：**vLLM + TGI**（自部署开源模型） |
| **架构特点** | • **Event-Driven Architecture**（Kafka + Flink）<br>• **Agent 运行时隔离**（每个客户一个沙箱，防止数据泄露）<br>• **Model Serving 平台**（支持多模型、A/B 测试、灰度发布）<br>• **Fine-tuning Pipeline**（自动化数据标注、训练、评估、部署） |
| **团队配置** | • 后端 20-30 人（Rust + Go + Python）<br>• 前端 10-15 人（React + 可视化引擎）<br>• AI/ML 团队 15-20 人（自研模型、强化学习）<br>• 数据团队 10-15 人（数据仓库、Feature Store）<br>• 平台团队 10-15 人（K8s、MLOps、安全） |
| **成本预估** | • 人力：$500K-1M/月<br>• 基础设施：$50-100K/月（分布式 + GPU 集群）<br>• 模型训练/推理：$50-200K/月（自部署模型降低 API 成本） |

---

## 六、成本估算与 ROI 分析

### 6.1 不同规模企业的成本估算（3 个月 MVP）

| 企业规模 | 人力成本 | 基础设施 | LLM API | 总计（3 个月） |
|---------|---------|---------|---------|--------------|
| **<10 人** | $15-30K | <$1.5K | $0.6-1.5K | $17-33K |
| **10-50 人** | $150-240K | $6-15K | $3-9K | $159-264K |
| **50-150 人** | $450-750K | $30-60K | $15-45K | $495-855K |
| **300-500 人** | $1.5-3M | $150-300K | $150-600K | $1.8-3.9M |

### 6.2 ROI 测算（以 10-50 人团队为例）

**投入**：
- 开发成本：$200K（3 个月 MVP）
- 运营成本：$5K/月（基础设施 + API）

**产出**（假设服务 10 个客户，每个客户月费 $3000）：
- 年收入：$3000 × 10 客户 × 12 月 = $360K
- 年成本：$200K（开发） + $60K（运营） = $260K
- **第一年 ROI**：($360K - $260K) / $260K = **38%**

**第二年**（扩展至 50 个客户）：
- 年收入：$3000 × 50 客户 × 12 月 = $1.8M
- 年成本：$200K（运营） + $300K（团队扩展） = $500K
- **第二年 ROI**：($1.8M - $500K) / $500K = **260%**

**关键**：AI Agent 的边际成本极低（每个新增客户的运营成本 <$100/月）。

---

## 七、关键结论与行动建议

### 7.1 核心结论

1. **模型能力 ≠ 业务结果**
   - 必须跨越 7 层漏斗（L1 业务指标 → L7 模型能力）
   - 自顶向下设计，每一层对齐上一层需求

2. **LangChain/LangGraph 没有死，但角色在变化**
   - 从"唯一选择"变成"编排层可选组件"
   - MVP 阶段用 LangGraph（快速开发）
   - 规模化后自研 Agent Loop（性能优化、成本控制）

3. **Claude Code 类工具是开发辅助，不是应用运行时**
   - 它们本质是"AI 辅助编程"，不是"AI 驱动业务"
   - 正确用法：用 Claude Code 加速开发（生成代码），部署为独立生产系统

4. **Skill → 生产系统是最务实的实施路径**
   - Skill 验证（分钟级反馈、低成本试错）
   - Claude Code 生成生产代码（LangGraph + FastAPI + React）
   - 持续迭代（回到 L1-L2，确保对齐业务目标）

### 7.2 行动建议（按优先级）

**立即行动（Week 1-2）**：
- [ ] 组建小团队（1-2 全栈 + 1 AI 工程师）
- [ ] 定义 L1 业务指标（ROI、CPA、ROAS）
- [ ] 拆解 L2 业务场景（自动化边界、人机协作界面）

**短期目标（Month 1-3）**：
- [ ] 用 Skill 验证核心 Workflow（/create-ad-campaign）
- [ ] 迭代 Prompt 直到成功率 >80%
- [ ] 用 Claude Code 生成生产系统（LangGraph + FastAPI + React）
- [ ] 部署 MVP，小范围试点（1-2 个客户）

**中期目标（Month 3-12）**：
- [ ] 多平台支持（Meta + Google + TikTok）
- [ ] RAG 层（历史投放数据检索）
- [ ] 预测性分析（LTV 预测、Churn 预测）
- [ ] 企业级功能（RBAC、审计日志、SOC 2 合规）

**长期目标（Year 1-2）**：
- [ ] 自研 Agent Loop（替代 LangGraph）
- [ ] 私有模型微调（基于客户数据）
- [ ] 平台化（Multi-Agent 市场、用户自定义 Workflow）
- [ ] 开源贡献（反哺社区、建立生态）

### 7.3 避坑指南

**常见错误**：
1. **技术驱动而非业务驱动**（先买 GPU，再想应用场景）
2. **盲目追求"全自动化"**（忽略 Human-in-the-loop）
3. **直接用 Claude Code 搭建生产系统**（它是开发工具，不是运行时）
4. **跳过 Skill 验证，直接写生产代码**（反馈周期长、试错成本高）
5. **MVP 阶段就追求完美架构**（过度工程化）

**正确做法**：
1. **业务驱动**（从 L1 业务指标出发，自顶向下设计）
2. **分级自动化**（L0 自动、L1 低风险、L2 人工确认、L3 严格审批）
3. **用 Claude Code 加速开发**（生成代码），但部署为独立系统
4. **Skill 快速验证**（分钟级反馈），再写生产代码
5. **MVP 追求"刚好能用"**（快速验证，而非完美架构）

---

## 结语：AI Agent 的终局是"业务专家"，而非"技术炫耀"

2026 年，AI Agent 已经从"能不能做"进化到"怎么用好"。

**技术只是手段，业务价值才是目的**。

希望本文的 7 层漏斗模型、Ad Agent 实战案例、以及按企业规模的结构化建议，能帮你在 AI 转型的道路上少走弯路。

**记住**：
- 最强的模型 ≠ 最好的业务结果
- 技术驱动 ≠ 业务成功
- 全自动化 ≠ 最优解

**真正的智能，是知道哪些该自动化，哪些该保留人工**。

---

## 延伸阅读

- [企业级 AI 应用落地：从 FOMO 到真正的业务增长]({{< ref "posts/2026-05-14-how-to-implement-ai-native" >}})——本文 7 层漏斗对应的商业战略层。
- [Meta 商业化大变革：从 Marketing API 到 Agentic Ads]({{< ref "posts/2026-06-meta-agentic-ads-a2a" >}})——Ad Agent 需要一层稳定的 Adapter，理由在这里。
- [从钛动招股书看 Agentic UA 时代的三种终局——代投、SaaS、inhouse]({{< ref "posts/2026-07-04-agentic-ua-inhouse-ad-platform" >}})——把 7 层漏斗方法论用到国内出海买量的具体行业判断。

---

*文档版本：v1.0 · 最后更新：2026-05-29*
