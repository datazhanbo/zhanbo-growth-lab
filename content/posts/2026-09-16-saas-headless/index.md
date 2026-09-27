---
title: "SaaS 进入无头时代，界面要建，数据也要拿"
date: 2026-09-16T00:00:00+08:00
description: "Statsig、Optimizely、PostHog 在三个月里把实验审批、flag 变更和 SDK 接入搬出后台，交给 API/MCP/OpenFeature。控制面移到客户手里，但数据重力没移——唯一事实源要攥在自己库里。"
keywords: ["headless SaaS", "无头SaaS", "实验即代码", "experiment-as-code", "MCP", "OpenFeature", "Statsig", "Optimizely", "PostHog", "数据主权", "CI gate"]
tags: ["saas", "headless", "mcp", "实验即代码", "数据主权", "行业观察"]
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
  image: "cover.png"
  alt: "SaaS 进入无头时代，界面要建，数据也要拿"
  caption: "展博增长实验室"
  relative: true
  hidden: false
---

> 控制面正在移到客户手里，数据重力没有。

作者：zhanbo · 2026-09-16

> **声明**：本文为独立行业观察 / 独立技术实践，基于公开资料整理，不代表任何雇主或客户观点；本工作室不承接游戏（含手游 / 休闲 / 中重度）行业相关咨询。

---

## tl;dr

- 2026 年春夏，Statsig、Optimizely、PostHog 在三个月里做了同一件事：把实验审批、flag 变更、SDK 接入全部搬出后台界面，交给 API、MCP 和开放标准。SaaS 的「头」——那个你每天登录点按钮的界面——正在变成可选项。
- 按钮到了你手里，数据还锁在它库里。**界面可以搬走，数据重力搬不走**，无头化没解决数据主权，反而把接入口子开得更多。
- 大客户能把控制面收进自己的 CI 和 agent；中小企业的「自建界面」大概率是换了个房东。文末三问，测你属于哪一边。

---

## 一、三家在三个月里做了同一件事

先看三组公开的产品动作，都发生在 2026 年。

4 月 28 日，Optimizely 上线 Change approvals：flag 的规则变更、人群调整、流量分配，可以强制走指定审批人，没审过的变更进不了生产。第二天，它发布 Experimentation MCP server，agent 可以直接查实验、建 flag、生成 SDK 代码，支持 Claude、Cursor、Copilot 一批客户端。

7 月 7 日，Statsig 把完整的实验评审生命周期搬进 Console API 和自家 MCP：八个新 API 端点、九个新 MCP 工具，覆盖发起评审、批准、驳回、提交全流程；同一条更新列表里还有 Audit Overrides，一个 API 调用就能审计全项目的 override。

PostHog 走的是另一条路：官方发布 OpenFeature 的 web provider 和 Python provider，应用代码只认 OpenFeature 标准接口，底下接 PostHog 还是别的 flag 引擎，可以换。

三件事看起来各干各的，指向同一个结构变化。过去的 SaaS 是四件套捆在一起卖的黑盒：**能力、存储、界面、工作流**。你登录它的 app，点它的按钮，顺着它设计的流程走。现在这四层被拆开了：

| 层 | 现在在哪 | 谁拥有 |
|----|---------|--------|
| 能力原语（建实验、评 flag、过审批） | API / MCP 暴露 | SaaS |
| 存储（实验配置、事件数据） | SaaS 后端 | SaaS |
| 界面和审批入口 | 你的 CI、你的 agent、你的内部页 | **你** |
| 治理规则（谁审、什么能上线） | 你的工作流 | **你** |

这就是 headless——无头 CMS、无头电商十年前演过一遍，Contentful 只管内容、Shopify Hydrogen 只管商品和交易，前端是谁的都行。现在轮到实验和分析：**Headless Experimentation**。

一个容易被忽略的细节：Statsig 和 Optimizely 第一批搬进 MCP 的，不是「查数」，是「审批」。这不是顺手做的功能，是把 gate 本身做成了可被程序调用的标准件。谁能批准一次实验上线，从此由你的 pipeline 决定，不由它的后台决定。

## 二、按钮归你，数据没归你

到这里，故事听着像客户的全面胜利。先别急。

你把手从 SaaS 的界面上拿开之后，数据和状态仍然躺在它的库里——实验历史、flag 配置、每一条事件。无头化改变的是你怎么操作它，没改变数据放在哪。

更麻烦的是，风险口子反而变大了。以前只有人登录后台这一个入口，审计边界清楚：谁的账号、什么权限、点了什么。MCP 一开，能碰到这批数据的变成一串 agent、内部脚本、第三方控制面，每一个都是新的攻击面和合规面。入口多了，数据没动，**数据驻留的负债还是 SaaS 的，但事故的入口可能是你的 agent**。

锁定也没有消失，只是换了形态。过去的锁定是 UI 锁定——你的团队熟它的按钮，迁移成本是培训。现在变成数据重力锁定：十年实验数据、指标口径、人群定义都在它库里，MCP 让你调得很爽，但你不会因为讨厌房东就把十年数据搬走。OpenFeature 这类标准把应用代码和厂商解耦了，解掉的是「评估 flag」这一层；数据、历史、审计日志的迁移成本，一个标准协议解决不了。

一句话：**控制面自由了，数据主权没自由。** 在谈无头之前，先回答两个问题——审批和审计日志归谁，数据驻留和出口策略是什么。这两个答不上，headless 只是把风险换了个位置。

所以条件允许的企业，界面要自己建，数据也要尽量往回拿：原始事件通过 stream / export 同步到自己的数仓，实验配置和审批日志留一份镜像，选型时把「能否完整导出」当成和功能同等重要的门槛。SaaS 可以继续当计算引擎和记录后端，但**唯一事实源要攥在自己库里**——这不是为了省钱，是为了将来换房东的时候，十年数据不用重新投胎。

## 三、大客户收走控制面，小客户换个房东

「按钮在客户手里」这句话，对不同规模的公司不是一回事。

大客户有平台工程团队，真能在 SaaS 的 API 上自建一层薄薄的内部控制面：实验即代码，配置走 git，上线过 CI gate，agent 在流水线里调 Statsig 或 Optimizely 的审批接口。SaaS 退化成「能力 + 记录后端」，议价权跟着控制面一起到了客户这边——因为界面是自己的，换掉底下的能力供应商就少了一层皮肉之苦。

中小企业别照着这个剧本激动。五个 SaaS 各暴露一套 MCP，可组合原语铺天盖地，你缺的不是接口，是设计组合和治理的人。现实的结局很可能是：你的「聚合界面」也不是自建的，而是另一个 meta-SaaS——一个控制面产品替你把五家管起来。这不是客户主权，这是**换了个房东**，从实验 SaaS 搬到控制面 SaaS。真正的主权前提是平台工程能力，这不是中小企业天生有的。

所以这个趋势里真正稀缺的，不是接 MCP 的手艺，是三层判断：哪些能力该自己攥着、审批 gate 怎么设、数据风险怎么兜。能帮企业把这三件事想清楚并落成最小控制面的人，位置在 AI 和 SaaS 之间。

## 四、三问自测 + 互动

花一分钟回答：

1. 你的实验 / flag 变更，今天是在后台点按钮，还是走代码评审和 CI？
2. 不登录 SaaS 后台，你的 agent 或脚本能不能完成「发起变更 → 审批 → 上线」的完整闭环？
3. 假如明天要换掉实验平台，你的历史数据、指标口径和审计日志迁得走吗？

三个都答「能」，你的控制面已经在自己手里；两个以上答「不能」，你现在拥有的只是几个账号，不是控制面。

你们团队现在用哪家实验或 flag 平台，卡在「不敢接 MCP」还是「接了没人治理」？评论区聊，也可以私信告诉我你用的工具 + 一个具体卡点，我回你我的判断。

---

## 延伸阅读

- **从 Dashboard 到 Endpoint：Meta 上线 MCP 之后，广告后台正在被 AI 替换掉** — 媒体平台先把后台端点化，实验平台跟上，是同一趋势的两侧。
- **互联网已经分层，自动化流量的区分和归因的升级** — 人类的审批 gate 在收回来，转化入口的 gate 要先挡住机器，即 gate 重建的两端。
- Statsig Product Updates（2026-07-07，Experiment Reviews via Console API and MCP）、Optimizely 2026 Feature Experimentation Release Notes（2026-04-28/29）、PostHog OpenFeature 官方文档。
