---
short: 20
title: "MMM 不是归因器：为什么你花几十万建的模型最后都进了抽屉"
date: 2026-08-07T00:00:00+08:00
description: "需求是看清每笔预算，验收却是这条 campaign 的 ROAS——错配是 MMM 项目死亡的第一推手。MMM 是预算组合优化器，不是归因器。"
keywords: ["MMM", "营销组合建模", "归因", "geo holdout", "增量实验", "Robyn", "Meridian", "iROAS", "预算组合优化", "增长测量"]
tags: ["measurement", "mmm", "归因", "增量测量", "增长诊断"]
categories: ["方法论"]
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
  alt: "MMM 不是归因器"
  caption: "展博增长实验室"
  relative: true
  hidden: false
---

> 需求是"看清每笔预算"，验收却是"这条 campaign 的 ROAS"——错配，是 MMM 项目死亡的第一推手。

作者：zhanbo · 2026-08-07

> **声明**：本文为独立行业观察与通用测量方法论，基于公开资料整理，不代表任何雇主或客户观点；本工作室不承接游戏（含手游 / 休闲 / 中重度）行业相关咨询。

---

## 开篇：那笔进了抽屉的预算

"帮我看清每笔预算到底带来多少回报。"

这是几乎每个 CMO 找我时说的第一句话。同行（包括早年的我）下意识的反应都是：上 MMM（Marketing Mix Modeling，营销组合建模）。

三个月后，一份几十页的报告交付：边际 ROI 曲线、渠道贡献分解、最优预算分配建议。客户点头说"很有启发"。然后——报告进抽屉，预算照旧，明年再花几十万重做一遍。

这不是段子。这是过去十年营销分析行业最普遍的真实图景。**MMM 项目交付率不低，采用率极低。** 模型跑出来了，决策没发生。

问题不在模型，在**我们用错了问题框**。

---

## 一、五个典型死法：都死于同一类错配

把失败现象倒推，根因只有一类——**期望与能力的错配**。具体有五种姿势。

**1. 期望错配（最大死因）**

老板要的是"这条 campaign 的 ROAS 多少"，MMM 给的是"品牌和效果整体怎么组合最优"。MMM 在周级聚合层跑回归，根本看不到单条 campaign。拿聚合模型去答用户级问题，等于拿望远镜看细胞——看不清，于是判"模型没用"。

**2. 数据地基没打**

- 建的是 **spend（花费）** 而非 **impression（触达）**：MMM 的自变量应该是媒体权重，不是美元。CPM 一变，spend 和效果就错位，系数算反。
- **序列太短**：稳健 MMM 要 104 周（两年）周级数据。很多团队跑 6 个月就建模，噪声吃掉信号。
- **共线性 / 无变异**：所有渠道常年 always-on、同涨同跌、从不关停——模型在数学上无法识别各自系数，出来的数字纯靠先验，等于编。

**3. 无校准（相关性当因果）**

MMM 系数是相关性。没有 geo holdout 实验当 ground truth，它就是"看起来科学的相关性幻觉"。Stella MMM 的基准很直白：未校准 MMM 前向预测精度 87%，用增量实验结果当贝叶斯先验回灌后到 95%——这 8 个点就是 CFO 信不信你的差别。

**4. 组织不接**

模型算出"该把品牌预算砍 15% 挪到 prospecting"，但代理合同锁死、品牌团队政治阻力，预算动不了。模型再对，落不了地也是废的。

**5. 人才 / 时效错配**

派 SQL 分析师用 Robyn 跑一遍当"建了 MMM"。MMM 要的是计量经济学家，不是取数分析师。再加上 adstock 系数会漂移，不按季度刷新，6 个月后模型已失效——而多数人 set-and-forget。

一句话：**需求是"整合归因 + 跨渠道策略分配"，验收却用"用户级 ROAS"。** 错配，是项目死亡的第一推手。

---

## 二、MMM 真正是什么：三句纠偏

剥掉神话，MMM 的本质很简单——**聚合层的计量经济回归模型**：用历史周级销售/收入对渠道投入 + 控制变量（季节/价格/促销/竞品）做回归，估计每个渠道的边际贡献。

三句纠偏：

- **自变量是媒体权重（触达/频次），不是美元。** 建模 spend 是新手最常见的错误。
- **输出是边际产出曲线 + 最优组合，不是 per-user 归因。** 它回答"把 X 的预算挪到 Y，总量怎么变"，不回答"这条广告灵不灵"。
- **它是相关性，不是因果。** 必须靠 geo holdout 校准，才接近因果真相。

记住这句话能救你大半笔咨询费：**MMM 是预算组合优化器，不是归因器。**

把市面上含糊的"归因"拆成三层，MMM 的边界立刻清晰：

- **① 整合营销归因（跨渠道统一度量）**：TV、OOH、播客、户外、品牌内容，这些渠道天然没有用户级信号，MMP 永远够不着。只有聚合回归能把它们塞进同一把尺子。这是 MMM 不可替代的存在理由。
- **② 品牌↔效果归因（品效合一的量化）**：这是 MMM 唯一能做的事——量化品牌 upper-funnel 给效果广告的 halo/spillover。回答"砍 10% 品牌预算，效果广告边际 ROAS 掉几点"。CFO 最该看这个数。
- **③ 跨渠道策略分配（预算组合优化器）**：当预算要在效果 / 品牌 / 内容 / 私域 / 不可追踪渠道之间做策略性分配时，只有 MMM 能给出"再投 1 元到 X 还是 Y"的边际曲线。

它**不解决**什么也要说清：用户级归因（MMP + 增量实验的地盘）、单 campaign / 单创意 ROAS、实时 in-flight 优化。

---

## 三、什么时候该上，什么时候别碰

2026 年的外部环境其实对 MMM 更友好了。Google Meridian 和 Meta Robyn 相继开源，中腰部团队也用得起；Measured、Balistro、LiftLab 这批服务商把 geo holdout 产品化了。IAB 2026 的数据是：67–76% 的买方在用至少一种高级测量法，但**只有 39% 把 MMM、增量实验、平台归因三层同时跑起来**——大部分人还在"碎片化真相"里挑一个数字信。

但门槛降低不等于该上。MMM 有三个硬约束：

- **数据约束**：≥104 周周级数据、渠道间有预算波动或关停（有变异才能识别）、能拿到 impression 级输入。
- **校准约束**：必须有 geo holdout 当 ground truth，否则只是高级相关性。
- **组织约束**：有重分配预算的权力 + 计量人才 + 季度刷新机制。

**给小团队的路径**：先别碰 MMM。第一步，平台方向性数（MMP + SAN）+ 单渠道 geo holdout 校准，拿到第一个 iROAS，知道平台数虚多少；跑到月烧 3–5 万美金、历史够长、且真的在跑"品效合一"混合作战时，再上轻量 MMM（Robyn / Meridian 开源都可），但必须配至少一个 geo 实验校准系数。

把增量实验的 iROAS 当贝叶斯先验回灌 MMM——这一步是"CFO 信的 MMM"和"CFO 质疑的 MMM"的分水岭。

---

## 3 分钟自测：要不要启动 MMM 项目

- 你想让 MMM 回答的是"整条组合怎么挪预算"，还是"这条 campaign ROAS 多少"？（后者从一开始就别上）
- 你的自变量是 impression / GRP，还是只有 spend？
- 你有 ≥2 年周级数据、且渠道间真的有过预算关停 / 大幅波动吗？
- 你的 MMM 系数有没有用至少一次 geo holdout 校准过？
- 模型出来之后，组织上有没有真的挪动预算的权力和季度刷新机制？

五个问题里有两个答 No，这个项目大概率会进抽屉。

---

## 免费 · MMM 就绪度诊断（限 2 家 · 8 月底截止）

展博增长实验室开放 **2 个免费 MMM 就绪度诊断名额**：基于你现有数据栈、渠道结构和历史长度，判断现在该不该上 MMM、该上自建 / 开源（Robyn / Meridian）/ 厂商方案，以及第一个 geo holdout 该怎么设计。14 天交付，只读授权，不动你的账户。

**适合谁**：有跨渠道预算分配诉求、品牌 + 效果混跑、月度媒体预算在 5 万美金以上的增长团队（游戏行业暂不承接）。

公众号后台回复 **「MMM就绪度」**，附一句你们当前的渠道结构和最大困惑，先到先得。

---

## 延伸阅读

- **归因框架：业务方可自证的科学决策体系** — 本文是其中"第四部分 MMM 专题"的公开版延伸，完整三层三角测量（MMP + 增量 + MMM）和业务方自查清单详见该长文。
- [Marketing Attribution in 2026: MMM, Incrementality & the End of Last-Click — Balistro](https://www.balistro.com/blog/marketing-attribution-in-2026) — 开源 MMM 回归的实操路径。
- [Media Experiments: How to Measure Channel ROI Accurately — Measured](https://www.measured.com/faq/media-experiments-how-to-measure-channel-roi-accurately/) — 增量实验作为 MMM 贝叶斯先验的方法学。
