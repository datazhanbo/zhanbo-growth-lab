---
short: 25
title: "四个广告平台一起投了 AppsFlyer，但名单里没有 AppLovin"
date: 2026-09-18T00:00:00+08:00
description: "Google/Meta/Unity/Moloco 集体出资供养中立测量，名单里没有 AppLovin（收购了 Adjust 又跑 AXON，裁判兼球员）。AppsFlyer 从归因爬到 Modern Marketing Cloud，吃掉的是决策层而非 trade desk。"
keywords: ["AppsFlyer", "中立测量", "Modern Marketing Cloud", "Adjust", "AppLovin", "AXON", "Agentic AI Suite", "增量测量", "trade desk", "以色列"]
tags: ["AppsFlyer", "中立测量", "归因", "Modern Marketing Cloud", "trade desk", "以色列"]
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
  alt: "四个广告平台一起投了 AppsFlyer"
  caption: "展博增长实验室"
  relative: true
  hidden: false
---

> 平台们宁愿共同供养一个中立的裁判，也不投一个又当裁判又下场的玩家。

作者：zhanbo · 2026-09-18

> **声明**：本文为独立行业观察 / 独立技术实践，基于公开资料整理，不代表任何雇主或客户观点；本工作室不承接游戏（含手游 / 休闲 / 中重度）行业相关咨询。

---

## tl;dr

- 2026-06，AppsFlyer 官宣拿到 **Google / Meta / Unity / Moloco 四家超 $1B 联合投资**（少数、非控制、非排他），投后估值约 **$2.7B**（以色列媒体称实际 $1.3B、近半是老股转让），ARR 约 **$500M**、盈利。四家都是它日常测量的广告平台——被测量对象集体出资，保它"中立"。
- 名单里**没有 AppLovin**。不是漏了：AppLovin 2021 年收购了 Adjust（行业第二大归因平台），自己又跑 AXON 买量引擎——既当裁判又下场踢球。平台不会投一个会跟自己抢媒体生意的玩家。这条分界线，是这笔交易最该被读出来的信号。
- 它的产品线已从归因工具长成 **"Modern Marketing Cloud"**：成本收入聚合 → 增量测量（Incrementality for UA）→ 跨端 LTV → Signal Hub clean room → **Agentic AI Suite**（官方自称 "a marketing execution layer"，带 MCP，可接 Claude / ChatGPT / Cursor）。它正沿"归因 → 决策 / 编排层"往上爬。
- **那它会不会吃掉 The Trade Desk？** 我的判断：不会变成 trade desk，移动 app 预算大头在自归因平台手里、不在 TTD；它会吃掉的是**预算往哪分这层决策，以及代投 / 手动优化的工位**。前提是守住"不下场买媒体"——这正是它和 AppLovin（Adjust）的根本分叉。

---

## 一、被测量对象集体出资，保一个中立裁判

表面看这是一笔大额融资，读起来要倒过来看：**出资的四家，全都是 AppsFlyer 每天在测量的广告平台。**

这不是慈善。3 月 Apollo 领衔的 $1.9B 私有化谈崩之后，四家凑钱进场——Eric Seufert 的判断是 AppsFlyer 已经 "too big to let fail"：全行业共用的测量基础设施，不能落到 PE 或某个单一利益方手里。再深一层是 AI 的逻辑：agent 替你做买量优化时，测量层的输入直接决定输出，对 A 网络少报、对 B 网络多报，偏差会在每天数百万次决策里复利放大。独立测量因此从"网络之间公不公平"，变成 **AI 能不能对着现实、而非被污染的模型做优化的前提**。

它也把中立焊在自己身上：官方立场是不参与广告资源买卖、不与媒体渠道竞争，法律上只是客户的数据处理者（data processor）。但条款封死的是"媒体买卖"，不是"决策自动化"——这个缝后面讲。

---

## 二、为什么没有 AppLovin——裁判和球员不能是同一个人

名单里没有 AppLovin，是这笔交易最值得咂摸的细节。

AppLovin 2021 年用约 $1B 收购了 Adjust（行业第二大归因平台），自己又运营 AXON 买量引擎。也就是说，它**既做归因（裁判），又自己买媒体（球员）**。一家既握有归因、又跑买方引擎的公司，测量中立性和商业利益天然冲突——这正是四家本轮用股东结构要避免的东西。

平台的算盘很清楚：**我投你，是希望你继续当裁判，不是希望你变成竞争对手。** 一句话总结这条分界线：

> **平台会供养裁判，永远不会供养一个又当裁判又下场的球员。**

这也解释了估值溢价从哪来——中立本身就是产品。一旦它下场做媒体，四家的投资逻辑崩塌，它测量的那 15000 个品牌也会重新评估这裁判是不是替自己抬轿。

---

## 三、从归因到 Modern Marketing Cloud，它正在爬"归因 → 决策层"的楼梯

光看融资会误以为它只是一门老业务拿了新钱。看产品线才知道钱往哪去了。

AppsFlyer 的演进是一条清晰的价值阶梯：

1. **安装归因**——起家业务，决定"这个安装算谁的"。
2. **隐私时代的单一事实源**——ATT 之后把聚合归因、自有数据兜底做扎实。
3. **Incrementality for UA（增量测量）**——2025 年 11 月与八款新品一起发布，geo holdout 自助化，让广告主直接测渠道真实增量而不是只看后台 ROAS。
4. **Cross-Platform Journeys & LTV**——把 mobile / web / desktop / console / CTV 的旅程缝成一条，做跨端 ROI 和长周期 LTV。
5. **Signal Hub（数据协作 clean room）**——身份解析 + clean room，帮品牌和伙伴建人群、跨渠道测真实销售。
6. **Agentic AI Suite**——带 MCP 协议，可接 Claude / ChatGPT / Cursor / VS Code；预置 agent 找素材机会、出每日洞察、监控配置、抓趋势。官方发布稿给它的定位原话是 "a marketing execution layer"。

这条楼梯和 09-09 那篇《从聚合投放到智能投放 Agent》给广告主画的 L0→L3 阶梯一样——聚合 → 独立归因 → 策略管理 → 智能 agent。区别只是：那篇说广告主自己搭，AppsFlyer 把它预制成了中立的云。每往上一步，迁移成本更高、SaaS margin 更好，这是它从"卖归因"爬到"卖决策基础设施"的打法。

---

## 四、它会吃掉 trade desk 吗？——中立性悖论

**如果它做 agent 投放，会不会把 The Trade Desk 的市场吃掉？** 判断分两层。

**第一层，它不会变成 The Trade Desk。** 它现在做的"激活（activation）"——把 clean room 里圈好的人群推到 Meta / Google / TikTok / DSP 上去投——是**激活，不是购买**，不替你花那笔媒体预算。而且 TTD 的主场是 open internet 和 CTV；移动 app install 的预算大头在 Google/Meta/AppLovin/TikTok 这些自归因平台手里，TTD 只是作为一个 ad network 接归因 postback。靶子本来就不在一块。

**第二层，它会吃掉的是"脑子"和代投的工位。** trade desk 的价值 = 执行 + 策略；AppsFlyer 把策略层（预算往哪分、哪些渠道真有增量、agent 看趋势提建议）架在所有平台之上，把执行留给平台。预算编排、跨平台配置、异常巡检这些本来由代投和投手做的动作，会先被测量基座上长出的 agent 收走。

但这里有个必须盯住的缝：它的自我限定目前是"不碰媒体买卖"，**没有一句书面的"永不做执行"**——而 Agentic AI Suite 已经自称 execution layer。编排和执行之间没有天然边界，今天帮你巡检配置，明天就能帮你调价调预算。它一旦真替你花媒体预算，中立立刻破功，还顺手得罪四家股东。这不是"它已经越界"，而是边界要靠客户和股东一起盯。

接回数据主权的原则：**AppsFlyer 提供的"中立版脑子"可以租，但预算的最终裁决你要自己留一份。** 大广告主自建裁决层，中小团队租它的，前提是分得清哪些是记账、哪些是裁决。

---

## 五、这个策略对不对？——以及它为什么是以色列公司

三步棋拆开看：**资本运作**，拿平台的钱但不让平台控制（非控制、非排他），被测量对象集体出资保裁判，这种结构找不出第二家；**功能增强**，每步往上爬价值梯、提 SaaS margin，从卖归因升级到卖决策基础设施；**上游渗透**，进决策层却死守"不碰媒体"——这是它和 AppLovin 的分叉点，也是估值的根。

隐患也在中立：按 SaaS 收费吃不到媒体 take-rate，TAM 有上限。但约 $500M ARR 且盈利，证明这条 lane 足够肥。媒体抽成更诱人，碰了就毁掉中立——它选了更稳的那条。

基因只点一句，下一篇单拆。AppsFlyer 2011 年创于 Herzliya；一个反直觉的细节：CEO Oren Kaniel 当年申请精英计算机部队被拒，在军队里当炊事兵——不是每个以色列故事都从 8200 开始。但生态底色没变：本土市场太小，逼出 global-first，小国建不起围墙花园，只能做所有人都接的水管。

> 能把"中立"做成一门生意的，往往不是加州的花园主，而是被迫 global-first 的水管工。

## 六、三问自测

1. 你上次调渠道预算，依据的是归因平台 / 渠道后台的 ROAS，还是一次自己设计、有对照组的增量实验？
2. 如果测量供应商明天上线"自动投放"，你的合同和数据流程里，有没有一条把它的测量结论和执行动作隔开的线？
3. 不登任何第三方后台，你自己库里能不能独立算出每个渠道的成本、收入和增量贡献？

三个都答"是"，谁持股、谁做 agent 都动不了你的预算；两个以上答"否"，你的裁决权现在借放在别人家里。

你们团队的预算裁决，多大程度还挂在单一后台的 ROAS 上？评论区聊；私信回复**「裁决清单」**，我发你一份《预算裁决权自查清单》：记账层、增量裁决层、agent 执行护栏层各该留哪些数据、跑什么实验、合同里写哪几条，照着勾。

---

## 延伸阅读

- [从聚合投放到智能投放 Agent](/posts/2026-09-09-aggregation-to-agent/) — 上一篇从广告主视角讲"为什么必须有自己的那一层"；本篇是测量层供应商把同一层预制成云的镜像。
- [平台离不开，数据和裁量权要拿回自己手里](/posts/2026-09-17-data-sovereignty/) — 裁量权要拿回自己手里，本篇补了"AppsFlyer 替你拿了中立那一版"的供给侧视角。
- 外部锚点：AppsFlyer 官方 newsroom 2026-06-22 投资公告与 CEO《Neutrality Isn't a Feature. It's the Foundation.》博客、Axios 同日报道、Mobile Dev Memo《AppsFlyer Is Too Big to Let Fail》、AppsFlyer《Modern Marketing Cloud》八款新品发布稿（2025-11-18）。
