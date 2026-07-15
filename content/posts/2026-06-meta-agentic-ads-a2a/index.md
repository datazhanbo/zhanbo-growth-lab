---
title: "Meta 商业化大变革：从 Marketing API 到 Agentic Ads——未来的广告买量是 A2A 架构"
date: 2026-06-01T00:00:00+08:00
description: "从 Meta 广告平台的 20 年演进，看 Marketing API 为什么从 v1 一路走到 v25，以及广告主侧的 Ad Agent 为什么会越来越重要。"
tags: ["Meta", "Marketing API", "Agentic Ads", "Advantage+", "Ad Agent", "AI Agent", "A2A"]
categories: ["行业观察"]
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

> 从 Meta 广告平台的 20 年演进，看 Marketing API 为什么从 v1 一路走到 v25，以及广告主侧的 Ad Agent 为什么会越来越重要。

> **声明**：本文为独立行业观察，基于公开资料整理，不代表任何雇主或客户观点；本工作室不承接游戏（含手游 / 休闲 / 中重度）行业相关咨询。

---

## tl;dr

Meta 广告系统的演进，不是一条简单的"广告后台功能越来越多"的产品线，而是一条更清晰的主线：**从人工投放，到算法托管，再到 Agentic execution**，工具->平台->操作系统的迁移路线很清晰。

Marketing API 的版本迭代也不是纯技术问题。v1 到 v25 的变化，本质是 Meta 把广告系统的控制权，从广告主和第三方工具手里，逐步迁移到自己的算法和自动化系统里。

这件事对广告主很关键：未来不是工具层的"谁更会点后台"，也不是平台层的"做聚合投放"，而是谁能搭建一个本地的、跨平台的、可审计的 Ad Agent，把 Meta / Google / TikTok 的自动化能力策略性地聚合到自己的增长操作系统里。

---

## 一、Meta 商业化的 20 年：广告平台如何从工具变成操作系统

先说结论：**Meta 商业化的历史，就是广告主控制权不断让渡给平台算法的历史。**

早期 Facebook Ads 是一个广告工具。你选人群、选版位、写素材、设预算，平台负责把广告投出去。

今天的 Meta Ads 更像一个黑盒增长系统。广告主提供目标、素材、预算、转化信号，剩下的受众匹配、版位组合、预算分配、创意组合，越来越多由系统自动完成。

可以粗略分成五个阶段。

### 阶段 1：社交广告的诞生——把"人"变成广告库存

Facebook 广告的第一阶段，是把社交关系和用户画像商业化。

传统展示广告卖的是页面位置。Facebook 卖的是人：年龄、性别、兴趣、关系、行为。

这带来一个根本变化：广告投放从"买媒体位置"变成"买用户匹配"。

```
传统 display ads：
广告主 → 买网站/频道/版位 → 触达用户

Facebook Ads：
广告主 → 定义人群/目标 → 系统匹配用户
```

这个阶段的核心能力是 targeting。

广告主相信自己知道谁是目标用户，所以平台提供越来越细的定向工具。兴趣、lookalike、自定义受众、再营销，都是围绕这个逻辑展开的。

这也是为什么早期 Facebook 会成为后来的 TikTok、字节商业化团队重点学习对象。它证明了一个模型：

> 大规模内容/社交平台，不只是卖流量，而是卖"基于用户理解的效果确定性"。

### 阶段 2：移动效果广告——从品牌曝光走向转化优化

第二阶段，Meta 把广告系统从品牌展示，推向移动效果广告。

移动 App 生态起来后，广告主最关心的不是曝光，而是 install、purchase、ROAS、LTV。

这时 Meta 的商业化能力从"把广告展示给对的人"，变成"帮广告主找到更可能转化的人"。

于是三件事变得重要：

1. **事件回传**：Pixel、SDK、App Events、Conversions API
2. **转化优化**：oCPM、value optimization、app event optimization
3. **账户结构**：Campaign / Ad Set / Ad 三层结构，分别承载目标、定向/预算、素材

这一阶段塑造了后来大部分广告平台的标准形态。

```
Campaign：我要达成什么商业目标
Ad Set：我要找什么人、花多少钱、怎么出价
Ad：我要给用户看什么素材
```

对广告主来说，这套结构非常熟悉。对平台来说，这套结构也有问题：它把太多控制权留给了广告主。

广告主可以切很细的人群，建很多 ad set，手动调预算，手动换素材。短期看这给了广告主自由度，长期看却限制了算法的全局优化空间。

### 阶段 3：API 化和生态化——第三方工具开始接管投放工作流

第三阶段，Meta 把广告能力开放给开发者和代理商，Marketing API 成为商业化生态的基础设施。

这一步非常关键。

广告主不可能永远只在 Ads Manager 里操作。大客户、代理商、应用发行团队、电商团队，都需要批量创建 campaign、同步素材、拉取报表、做归因分析、做预算管理。

Marketing API 让这些能力从 UI 后台走向系统集成。

```
Ads Manager：人操作广告后台
Marketing API：系统操作广告平台
```

于是生态开始出现：

- 代理商投放平台
- 批量创编工具
- BI 报表系统
- 归因和 MMP 工具
- 素材管理平台
- 预算和 ROI 监控平台

这一阶段，Meta 是开放的。它希望更多工具接入，帮助广告主把预算花到 Facebook / Instagram 上。

但开放 API 也带来一个副作用：第三方工具会固化旧的投放方式。

只要旧 API 还能用，工具就没有动力升级；只要手动定向和旧 campaign 结构还能用，广告主就不会完全迁移到自动化体系。

这为后面的强制迁移埋下了伏笔。

### 阶段 4：隐私冲击后的算法托管——Advantage+ 成为新默认

第四阶段的背景，是隐私变化和归因精度下降。

Apple ATT 之后，平台拿不到过去那么完整的用户级数据。越是依赖细粒度定向和外部归因，效果越不稳定。

Meta 的应对方式不是把控制权还给广告主，而是反过来：**让广告主更少控制，把更多信号交给平台算法。**

这就是 Advantage+ 的大方向。

广告主不再需要精细定义每一个 ad set 的人群和规则，而是提供：

- 商业目标
- 素材资产
- 转化事件
- 预算边界
- 价值信号

平台负责：

- 自动找人
- 自动分配预算
- 自动组合素材
- 自动探索版位
- 自动优化转化

```
旧模式：广告主定义策略，平台执行
新模式：广告主提供信号，平台生成策略并执行
```

这也是 v19 到 v25 一系列 API 变化背后的主线。

- v19：简化目标，旧 objective 逐步退出
- v21：旧 objective campaign 无法继续扩量
- v24：ASC/AAC 旧创建流程开始被阻断
- v25：ASC/AAC 全面迁移到统一的 Advantage+ Campaign Experience

表面看是 API 字段和端点变化，本质是投放范式变化。

### 阶段 5：Agentic Ads——广告后台开始变成 AI 工作界面

第五阶段正在发生：Meta 不只是让算法自动投放，还在尝试让 AI Agent 成为广告主的操作界面。

如果说 Advantage+ 是"平台替你优化投放"，那 Agentic Ads 是"平台替你理解问题、分析数据、生成方案、甚至执行操作"。

广告主未来可能不再是这样工作：

```
打开 Ads Manager → 看报表 → 筛 campaign → 调预算 → 新建 ad set
```

而是这样：

```
问 Agent：上周美国 iOS 为什么 ROAS 下滑？
Agent：拉取数据 → 分析 campaign / 素材 / 人群 / 归因变化 → 给出调整建议
广告主：批准
Agent：执行预算调整、暂停低效素材、生成新测试方案
```

这对 Meta 来说非常合理。

因为它要做的不是"给广告主一个聊天机器人"，而是把 Ads Manager 从操作后台升级成 AI-native 的商业化工作台。

这也是为什么最近几个版本的 MAPI 越来越强调统一结构、减少旧字段、合并创建路径、强化 Advantage+。接口越统一，Agent 越容易理解；对象越少，Agent 越容易执行；旧逻辑越少，平台越容易把 AI 嵌进去。

---

## 二、Marketing API 从 v1 到 v25：版本迭代背后的控制权迁移

Marketing API 的版本变化，可以用一句话概括：**从暴露操作能力，到封装平台策略。**

早期 API 的重点是"把 Ads Manager 能做的事开放出来"。今天 API 的重点是"让外部系统按 Meta 新的自动化范式做事"。

这两者差别很大。

### 1. 早期：API 是 Ads Manager 的遥控器

早期 Ads API / Marketing API 的价值很直接：让开发者通过程序批量操作广告账户。

典型能力包括：

- 创建 campaign / ad set / ad
- 上传素材
- 设置 targeting
- 设置 bid / budget
- 拉取 insights
- 管理受众

这个阶段 API 的设计哲学是"可编程的广告后台"。

广告主和第三方工具拥有很高的控制权。你可以用 API 精确创建一个 ad set，指定兴趣、年龄、地区、版位、预算、出价方式，再把素材挂上去。

这对代理商和应用发行团队非常友好，因为它把人工后台操作自动化了。

### 2. 中期：API 变成增长平台的基础设施

随着移动效果广告成熟，Marketing API 不再只是"创编工具"，而是增长平台的底座。

它连接了四类系统：

| 系统 | 依赖 MAPI 的方式 |
|------|------------------|
| 创编系统 | 批量建 campaign、推素材、复制广告 |
| 报表系统 | 拉取 spend、impression、click、install、purchase 等指标 |
| 优化系统 | 根据 ROI / CPI / ROAS 调预算、暂停广告 |
| 归因系统 | 结合 Pixel、SDK、CAPI 和 MMP 数据做闭环 |

这时广告主侧开始形成自己的"发行平台"。

尤其是应用和电商行业，团队会把 Meta、Google、TikTok、AppLovin、Unity 的投放数据汇总起来，在内部系统里统一看 ROI、素材表现、预算消耗和回收周期。

这也是 Ad Agent 的土壤：广告主真正需要的不是某一个媒体后台，而是一个跨媒体的本地增长操作系统。

### 3. 近期：v19 到 v25 的密集变化，是 Meta 在回收策略控制权

过去 16 个月里，MAPI 从 v21 走到 v25，节奏明显加快。

更重要的不是版本号，而是每一版背后的方向都很一致：减少人工控制，强化平台自动化。

| 版本 | 时间 | 代表变化 | 深层含义 |
|------|------|----------|----------|
| v19 | 2024-01 | 简化目标强制化 | objective 从广告主语言收敛到平台优化语言 |
| v20 | 2024-05 | Advantage+ Creative / AI 功能 API 化 | 创意优化开始进入 API 自动化链路 |
| v21 | 2024-10 | 旧目标 campaign 无法继续扩量 | 旧投放范式进入存量状态 |
| v22 | 2025-03 | views 指标和 IG 对象调整 | 报表口径向新内容消费模型迁移 |
| v23 | 2025-05 | 预算弹性从 25% 扩大到 75% | 平台获得更大预算调度空间 |
| v24 | 2025-11 | ASC/AAC 旧创建流程阻断 | Advantage+ 迁移从建议变成强制 |
| v25 | 2026-02 | ASC/AAC 全面阻断，统一 Campaign Experience | 自动化结构成为新默认 |

这里最关键的是 v24 → v25。

ASC / AAC 旧流程被阻断，意味着广告主不能再按照过去"手动搭结构"的方式创建和管理关键 campaign。你必须进入新的 Advantage+ Campaign Experience。

这不是一个普通 API breaking change，而是投放权力结构变化。

```
过去：
第三方工具可以复刻 Ads Manager 的旧流程

现在：
第三方工具必须接入 Meta 定义的新自动化结构
```

所以我更愿意把 v25 看成一个分水岭：从这一版开始，Marketing API 不再主要服务于"让外部系统复制后台操作"，而是服务于"让外部系统接入 Meta 的自动化增长引擎"。

### 4. 为什么 Meta 敢这么激进？

原因有三个。

**第一，Advantage+ 对 Meta 的商业价值足够大。**

只要自动化 campaign 的整体效果更好，Meta 就有动力把更多广告主推过去。对平台来说，这意味着更高预算效率、更稳定收入、更少人工误操作。

**第二，旧 API 会拖慢新系统迁移。**

如果旧 objective、旧 ASC/AAC 创建路径、旧指标口径一直保留，第三方工具和广告主就会继续用。平台要完成范式迁移，必须制造迁移压力。

**第三，Agentic Ads 需要更简单的对象结构。**

AI Agent 不适合面对一堆历史包袱：旧 objective、旧字段、旧 campaign 结构、旧指标口径、旧归因默认值。

Agent 要稳定执行，接口必须更统一，Schema 必须更清晰，错误状态必须更可预期。

所以 v25 不是终点，而是铺路。

---

## 三、Meta 是 TikTok 商业化的老师，但 TikTok 没有完全照抄

"Meta Ads 是 TikTok 商业化的老师"，这个判断我同意。

字节早期商业化确实大量学习 Facebook：账户结构、广告目标、转化优化、像素/事件回传、lookalike、自动出价、素材测试、代理商生态。这不是丢人的事。广告平台的很多基础设施，Facebook 已经验证过一遍。

但 TikTok 后来没有完全照抄，因为它的内容分发基因不同。

### 1. Meta 的广告基因：社交图谱 + 用户画像

Meta 的早期优势来自 identity 和 social graph。

它知道你是谁、你和谁连接、你喜欢什么、你加入了什么群组、你互动过什么内容。

所以 Meta 广告系统早期更强调"人群定义"。广告主相信：只要找对人，广告效果就会好。

### 2. TikTok 的广告基因：内容推荐 + 创意驱动

TikTok 的基本盘不是社交关系，而是内容推荐。

它更擅长判断"这个内容会不会被这个用户消费"，而不是让广告主精细定义"这个用户属于哪个兴趣包"。

所以 TikTok 商业化虽然学习了 Meta 的效果广告基础设施，但更早把创意和内容反馈放在核心位置。

对 TikTok 来说，素材不是广告链路的最后一环，而是算法理解用户意图的重要信号。

```
Meta 早期强项：谁是目标用户
TikTok 早期强项：什么内容会被消费
```

这也解释了为什么 TikTok Ads API 的产品节奏和 Meta 不一样。TikTok 更需要扩大生态接入、降低使用门槛，所以 API 变更相对没有 Meta 这么强压；Meta 已经有成熟广告主生态和预算基本盘，所以敢用更激进的方式推动迁移。

### 3. Google 的路径：计划迁移，而不是强制摩擦

Google Ads API 是另一种典型。

Google 也在自动化，比如 Performance Max、AI Max、智能出价。但 Google 的 API 治理更偏"计划迁移"：版本周期、sunset date、major / minor 边界都更清晰。

Meta 的方式是 force migration，Google 的方式是 planned transition。

| 维度 | Meta | Google |
|------|------|--------|
| 自动化代表 | Advantage+ | Performance Max / AI Max |
| API 迁移风格 | 强制、窗口短、摩擦大 | 计划性强、窗口更长 |
| 生态态度 | 让生态跟上平台节奏 | 给生态明确迁移路线 |
| 核心原因 | 社交广告黑盒优化更强，平台控制意愿更强 | 搜索广告生态历史更长，开发者治理更成熟 |

### 4. AppLovin / Unity：另一种稳定性

AppLovin、Unity Ads 这类平台的版本压力，对广告主来说相对小很多。

原因是它们更像 DSP / SDK / network 型平台。广告主主要通过 dashboard 或平台接口买量，应用开发者主要集成 SDK。核心能力在算法出价和流量网络，而不在开放给广告主操作的复杂 API 对象结构。

所以它们更强调稳定和兼容。

这和 Meta / Google / TikTok 这种广告位供应方不一样。后者的 API 是产品能力的直接输出通道，产品范式一变，API 就必须变。

---

## 四、行业广告平台的共同方向：从手动买量到 AI 托管

把 Meta、Google、TikTok、AppLovin、Unity 放在一起看，会发现一个共同方向：**广告平台都在把投放从"人工配置"推向"AI 托管"。**

只是每个平台的切入点不同。

| 平台 | 过去的核心控制点 | 正在迁移到 | 对广告主的影响 |
|------|------------------|------------|----------------|
| Meta | 受众定向、campaign 结构 | Advantage+ / Andromeda / Agentic Ads | 手动定向空间收缩，信号质量更重要 |
| Google | keyword、出价、广告组 | Performance Max / AI Max | 搜索意图仍重要，但跨版位自动化增强 |
| TikTok | 素材、人群、出价 | Creative automation / Smart+ | 创意反馈成为优化核心 |
| AppLovin | network bid / placement | 算法托管投放 | 广告主更关注目标和预算边界 |
| Unity | 应用内广告网络和变现 | 自动出价与聚合优化 | SDK 和 network 稳定性更重要 |

这背后有一个大的行业变化：

> 广告平台不再相信广告主能通过手工规则跑赢平台算法。

以前优化师的价值是"会搭结构、会切人群、会调预算"。

未来优化师的价值会变成：

- 提供更好的业务信号
- 判断平台算法给出的结果是否可信
- 设计跨平台预算策略
- 理解素材和人群的真实因果关系
- 约束 Agent 的执行边界

这不是优化师消失，而是优化师从 operator 变成 supervisor / strategist。

---

## 五、Agentic Ads 的未来：平台 Agent 和广告主 Agent 会同时存在

很多人讨论 Agentic Ads 时，容易默认"平台会把所有事情都做掉"。

我不这么看。

未来一定会有两类 Agent：

1. **平台侧 Agent**：Meta / Google / TikTok 内置在广告后台里的 Agent
2. **广告主侧 Agent**：品牌、应用发行、电商团队自己掌握的本地聚合 Agent

两者不是替代关系，而是权力边界不同。

### 1. 平台侧 Agent：更懂平台，但只代表平台

平台 Agent 的优势很明显：

- 能访问平台内部更多信号
- 能直接操作平台原生对象
- 能理解最新 API 和产品能力
- 能把 Advantage+ / PMax / Smart+ 的能力吃满

但它有一个天然限制：它代表平台利益。

Meta 的 Agent 不会帮你判断"这笔预算是不是应该从 Meta 挪到 TikTok"。

Google 的 Agent 不会主动告诉你"这组 search budget 应该让给 Meta Reels"。

TikTok 的 Agent 也不会站在你的 D180 ROI 和 payback period 角度，统一管理整个买量组合。

平台 Agent 的目标函数，永远会和平台商业化目标高度一致。

### 2. 广告主侧 Agent：更懂业务，但必须跨平台

广告主真正需要的是本地聚合 Agent。

它不是另一个 Ads Manager，也不是一个"帮你点按钮"的自动化脚本，而是站在广告主侧的增长操作系统。

它需要回答的问题是：

- 今天预算应该放在哪个平台？
- Meta 的 ROAS 下降，是素材疲劳、归因变化，还是平台指标口径变化？
- TikTok 的 CPI 低，但 D7 留存差，要不要继续放量？
- Google PMax 的转化质量和 Meta ASC 怎么对齐？
- 哪些 campaign 可以自动调，哪些必须人工审批？
- 哪些 API 字段废弃会导致报表静默失真？

这类问题，单个平台 Agent 无法完整回答。

因为它需要跨平台、跨归因、跨素材、跨预算、跨业务指标。

这正是 Ad Agent 的位置。

```
广告主目标：ROI / Payback / LTV / Cashflow
        ↓
本地 Ad Agent：跨平台分析、策略生成、执行编排、审计学习
        ↓
平台 Agent / API：Meta、Google、TikTok、AppLovin、Unity
```

### 3. Ad Agent 的核心不是"替你投广告"，而是"替你管理不确定性"

我之前做 Ad Agent 时有一个判断：企业级 Agent 的价值不是自动化，而是决策密度。

放在广告场景里更准确：**Ad Agent 的价值是提高单位时间内可处理的投放决策数量，同时降低错误决策的不可控风险。**

所以它必须有几层能力：

| 层 | 能力 | 作用 |
|----|------|------|
| Intent | 自然语言理解投放意图 | 让优化师用业务语言工作 |
| Schema | 把意图转成结构化动作 | 防止 LLM 直接乱调 API |
| Adapter | 对接 Meta / Google / TikTok 等 API | 吸收平台版本变化 |
| Policy | 分级信任和审批 | L0 自动，L3 人工批准 |
| Monitor | 多时间窗效果追踪 | 2h / 24h / 7d / 30d 复盘 |
| Learner | action log 和规则迭代 | 让策略越用越准 |

这也是为什么 Marketing API v25 这类变化，对 Ad Agent 不是坏消息。

表面看，API 越来越复杂、版本越来越快、字段越来越不稳定。

但换个角度看，这恰恰说明广告主需要一个稳定的本地适配层。

```
业务层不应该直接感知 MAPI v25
业务层应该说：我要创建一个美国 iOS 付费优化 campaign
Adapter 层再决定：这在 Meta v25 / Google v23 / TikTok API 下分别怎么执行
```

这就是"Schema 居中"的价值。

---

## 六、对广告主的现实建议：不要再把媒体后台当操作中心

如果你是广告主、发行平台负责人、增长团队负责人，我的建议很直接：**不要再把任何单一媒体后台当成你的操作中心。**

媒体后台会越来越强，但它只优化自己的目标函数。

广告主需要自己的目标函数。

### 1. 建立 API Adapter Layer

Meta v25 的教训很清楚：媒体 API 的变化会越来越快，而且不一定给你足够长的迁移窗口。

所以业务层不要直接依赖媒体字段。

你需要一个 Adapter Layer：

```
业务意图层：创建 campaign、调预算、暂停低效素材
        ↓
统一 Schema：CampaignIntent / BudgetAction / CreativeTest
        ↓
媒体 Adapter：Meta MAPI、Google Ads API、TikTok Ads API
        ↓
平台 API
```

这样，当 Meta 把 `reach` 换成 `media view`，或者 ASC/AAC 创建路径变化时，业务层不用重写，只需要 Adapter 吸收变化。

### 2. 把版本治理变成季度机制

不要等 API 报错再升级。

Meta 的节奏已经说明，核心功能可能 90 天就进入强制迁移。发行平台至少要每季度做一次版本治理：

- 读 changelog
- 做 schema diff
- 核查废弃字段
- 跑新旧版本对比
- 更新告警阈值
- 通知业务口径变化

尤其要防"静默失败"。

最危险的不是 API 返回 400，而是返回 200，但字段变成 null，报表看起来像"投放效果变差了"。

### 3. 把优化师从 operator 升级成 Agent supervisor

未来优化师最重要的能力，不是会不会手动建 100 个 campaign。

而是：

- 能不能定义好策略边界
- 能不能判断 Agent 的建议是否靠谱
- 能不能设计实验验证因果
- 能不能把平台黑盒结果翻译成业务动作
- 能不能维护一套跨平台的增长知识库

这就是广告团队的人才迁移方向。

---

## 七、总结：Meta 的 API 变化，预告了广告行业的新分工

Meta 商业化从 0 到 1 的演进，可以浓缩成一条线：

```
社交广告 → 移动效果广告 → API 生态 → Advantage+ 自动化 → Agentic Ads
```

Marketing API 从 v1 到 v25，也可以浓缩成一条线：

```
开放后台操作 → 支撑第三方平台 → 回收策略控制权 → 服务平台自动化和 Agent
```

这背后的趋势很明确：

- 平台会继续收回细粒度投放控制权
- API 会继续向统一、自动化、Agent-friendly 的方向演进
- 第三方工具如果只是复刻后台，会越来越难
- 广告主如果没有本地聚合层，会越来越被平台目标函数牵着走

所以 Ad Agent 的机会不在"做一个更好用的广告后台"。

机会在于做广告主侧的增长操作系统：

> 平台负责把自己的广告系统做得更自动化；广告主需要一个本地 Agent，把多个平台的自动化能力重新组织到自己的业务目标之下。

这是我理解的 Agentic Ads 的真正未来。

不是 AI 替你点广告后台。

而是广告主终于有机会拥有自己的 AI media buyer。

---

## 延伸阅读

- [从钛动招股书看 Agentic UA 时代的三种终局——代投、SaaS、inhouse]({{< ref "posts/2026-07-04-agentic-ua-inhouse-ad-platform" >}})——同一趋势下代投 / SaaS / inhouse 三种路径的终局判断。
- [企业 AI Agent 落地指南：跨越从模型到业务的 7 层漏斗]({{< ref "posts/2026-05-enterprise-ai-agent-7-layer-funnel" >}})——Ad Agent 的 Intent → Schema → Adapter 分层设计。
- [企业级 AI 应用落地：从 FOMO 到真正的业务增长]({{< ref "posts/2026-05-14-how-to-implement-ai-native" >}})——Agentic 化背后的商业模型演变。

---

*说明：本文对早期 Facebook Ads / Marketing API 的演进采用公开资料与行业常识口径；v18-v25 的具体版本变化主要基于前序 MAPI 调研整理。部分 Agentic Ads / Manus / Andromeda 相关判断属于趋势推演，正式发布前建议继续跟踪 Meta Developer Changelog 与官方博客。*
