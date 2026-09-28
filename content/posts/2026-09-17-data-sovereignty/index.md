---
short: 24
title: "平台离不开，数据和裁量权要拿回自己手里"
date: 2026-09-17T00:00:00+08:00
description: "AdX 案划的是拍卖规则，不是你的数据产权。平台继续用，但 impression 级收入、成本对账与增量裁决这三类产权要回流到自己的数仓——能力可以租，裁判不能租。"
keywords: ["数据主权", "AdX 案", "Google 广告技术案", "AppLovin", "MAX mediation", "geo holdout", "增量实验", "数据回流", "mediation A/B", "底价"]
tags: ["数据主权", "measurement", "增量测量", "in-app", "行业观察"]
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
  alt: "平台离不开，数据和裁量权要拿回自己手里"
  caption: "展博增长实验室"
  relative: true
  hidden: false
---

> AdX 案划的是拍卖规则，不是你的数据产权。

作者：zhanbo · 2026-09-17

> **声明**：本文为独立行业观察 / 独立技术实践，基于公开资料整理，不代表任何雇主或客户观点；本工作室不承接游戏（含手游 / 休闲 / 中重度）行业相关咨询。

---

## tl;dr

- 9 月 16 日 Google AdX 案的 106 页意见全文解封：法院拒绝拆分，只划拍卖规则——first look、last look 禁止，出价要对竞品服务器同条款开放，外加 6 年技术监督。但 Google 的数据、模型、买侧需求，一条都没要求拿出来平分。
- in-app 市场更黑：拍卖发生在 mediation SDK 的二进制内部，没有 Prebid 这样的中立观测点；AppLovin 官方文档直接写明 IAA / Blended ROAS campaign 必须接 MAX 才能跑，变现侧的用户价值信号官方自认回流给 Axon。
- 法院能做的到此为止。广告主和流量主真正能做的不是换平台，是**平台离不开，但产权属于自己的数据和预算裁量权要拿回自己手里**——能力可以租，裁判不能租。

## 一、法院管得了拍卖规则，管不了你的数据

9 月 2 日弗吉尼亚联邦法院对 Google 广告技术案作出救济裁决，9 月 16 日密封意见全文解封。结论很多人误读成「Google 被平权了」。没有。被禁止的是三个具体动作：first look（对手出价前先看库存）、last look（看了对手最高价再反超一美分）、统一底价。被要求的是互操作：AdX 给竞品广告服务器的出价要 same terms、functionally equivalent，还要接入 Prebid。

注意没被碰的部分：Google 的买侧数据、出价模型、独家需求，一个字都没要求开放。防火墙只管住 Google Ads，DV360 整体豁免。**规则平权不等于数据平权。**

把镜头转到 in-app，情况还要再黑一层。open-web 的拍卖发生在页面里，发布商自己留得下每家的出价记录，所以法院有办法强制 Google 接进 Prebid 这个中立点。in-app 的统一拍卖发生在 mediation SDK 的二进制内部：流量主拿到的是 SDK 选择吐出的收入摘要，不是原始拍卖日志；经 exchange 接入的 DSP 只看得到自己的赢输。没有任何第三方站在拍卖现场，「所有 bidder 拿到相同信号」是一句无法从外部验证的声明。

AppLovin 自己的文档比任何分析都直白。Scale your campaign 页面写着：跑 IAA ROAS 或 Blended ROAS campaign，应用**必须**接 MAX mediation；变现页写着：把 MAX 的收入再投进 AppLovin Ads，「signals from MAX help you acquire higher value users」——变现侧的用户价值信号回流买侧引擎，这件事官方当卖点讲。它没有违反任何拍卖规则，落槌那一价仍然是最高价得。倾斜发生在入口（产品绑定）、信号（谁看得到什么）和报表（自归因网络自己报转化）三处，不在落槌那一刻。

这就是黑箱的真正位置：你证明不了它偏，它也证明不了自己没偏。

## 二、你手里其实有两个它伪造不了的真值

打官司要进拍卖现场，做生意不需要。黑箱外面有两个锚点，平台改不了：

广告主侧的锚点是**用户真值**。一个用户装进来之后留不留、付不付、看了多少广告、产生多少收入，这些发生在你自己的 App 和服务器里。平台后台的 ROAS 是它按自己口径算的估价，你自己库里的 LTV 才是成交价。

流量主侧的锚点是**到账收入**。报表上的 est. revenue 是预估，银行里的打款是事实；每个展示谁赢了、清算价多少，impression 级收入数据你有权导出，只是多数团队从没导过。

围绕这两个锚点，有三类数据产权本来就是你的，现在却躺在别人库里：一是原始事件与 impression 级收入，二是成本与自归因平台的回传明细，三是增量裁决结果——渠道到底带来了多少本来不会发生的转化。前两类是记账，第三类是决策。多数团队把记账和决策都外包给了平台后台。

## 三、先拿回来，再优化：三步，都不碰平台红线

第一步，数据回流。广告主把 impression 级广告收入、IAP、留存事件通过 stream 或导出同步进自己的数仓，成本数据按渠道聚合作对账；流量主把 mediation 的 impression 级收入、赢单价、填充率导成自己的表，每月和实际打款核对。平台继续用，唯一事实源放自己库里。

第二步，把裁判独立出来。预算分配不看任何渠道后台的 ROAS，用 geo holdout 这类增量实验裁决：停掉或屏蔽某渠道一个地区两到四周，测它的真实增量。流量主侧对称地做两件事：mediation A/B（切一块流量对比不同 mediation 的 ARPDAU），以及对自有需求网络单独设 per-bidder 底价、做底价梯度实验——恢复发布商定价权这件事，AdX 案靠法院，你在自己后台里现在就能做。

第三步，用竞争密度约束黑箱。广告主侧保持两到三个买量渠道并行、定期轮换再测增量，给任何单一平台设预算占比上限；流量主侧把竞价 SDK 接齐、开私有交易直连，竞价方越多，谁都越难低价捡漏。这些动作全部发生在公开后台和合同条款里，不需要逆向任何二进制。

顾问能帮的，就是把这三步落成一张可以照着勾的清单和第一轮对账：哪些字段你有权拿但没拿、哪个口径平台在自说自话、第一个增量实验怎么切区怎么读数。黑箱打不开，但它外面的世界可以量。

## 四、三问自测

1. 不登任何平台后台，你自己的数仓里能不能算出每个渠道的 impression 级收入和成本对账单？
2. 上一次预算调整，依据的是平台后台 ROAS，还是一次有对照组的增量实验？
3. 作为流量主，你对 mediation 里的自有需求网络单独设过底价、或者做过关掉它的对照实验吗？

三个都答「是」，数据和裁量权在你自己手里；两个以上答「否」，你现在是租了能力，顺带把数据和裁判也租出去了。

你们现在最拿不回来的是哪类数据——impression 级收入、成本回传，还是增量实验跑不起来？评论区聊；私信回复 **「数据清单」**，我发你一份《自有数据回收清单》：广告主和流量主两侧，哪些字段、走什么接口、什么频率对账、第一个增量实验的最小配置，照着勾就行。

---

## 延伸阅读

- [SaaS 进入无头时代，界面要建，数据也要拿](/posts/2026-09-16-saas-headless/) — 上一篇讲能力可以租、唯一事实源要攥在自己库里，这篇是它在广告交易侧的具体打法。
- **三个后台三套数：出海买量的数据割裂** — 三源割裂的旧问题，在自归因时代只会更严重。
- 外部锚点：AdExchanger《The Court Just Unsealed Judge Brinkema's Remedies Decision》（2026-09-16）、AppLovin 官方 Scale your campaign 与 MAX monetization 文档。
