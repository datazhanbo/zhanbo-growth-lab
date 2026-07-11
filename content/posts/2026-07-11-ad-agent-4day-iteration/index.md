---
title: "AD Agent 开发实录和版本迭代——4 天从两个 Skill 到一个能自治的投放大脑"
date: 2026-07-11T00:00:00+08:00
description: "4 天、10 个版本、5 个 Phase：从 Cursor 里的两个 Skill，到能自治的 SmartUA ad-agent。附 5 道就绪度自测和 90 天路线图诊断。"
keywords: ["Ad Agent", "Agentic UA", "SmartUA", "vibe coding", "出海买量", "投放自动化", "ReAct", "Human in the loop", "Ark 推理"]
tags: ["ad-agent", "agentic", "vibe-coding", "smartua", "ua", "出海买量"]
categories: ["实战笔记"]
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
  alt: "AD Agent 4 天迭代实录"
  caption: "SmartUA v0.1 → v1.7 —— 展博增长实验室"
  relative: true
  hidden: false
---

> 优化师效率和买量 ROI，这两条曲线，能不能被一个 agent 同时拉起来？

作者：zhanbo · 2026-07-11

---

## tl;dr

- 4 天从 0 到能自治的 ad-agent，我在 changelog 里写了 7 个版本、5 个 Phase——**顺序对了才是工具，顺序错了都是 demo**。
- 大多数团队卡在"要不要接大模型"，其实真正卡的地方根本不在模型——关键是你的问题，你给模型准备了哪些数据以及策略迭代的领域知识。
- 本文附 5 道 ad-agent 就绪度自测 + 一份 90 天路线图诊断（限 2 家）。

---

## 一、问题先行：优化师的一天，值不值得被 agent 接管

先说业务，再说 agent，不然一切都是空的。

出海买量团队里，优化师的日常长这样：

- 早上打开 Meta / Google / TikTok 三个后台，各抄一遍昨日 spend / installs / ROAS
- 打开归因平台（AppsFlyer / Adjust）再抄一遍 D1 / D7 ROI
- 打开 BI 或飞书表格核对，发现三份数据对不上——花半小时找 last-touch 和 incremental 的口径
- 中午看到某个 campaign CPI 飙了 30%，猜是素材疲劳还是竞价对手加价，打开素材库比对创意
- 下午调预算、换素材、跑 A/B——每一步都要在三个平台重复操作一次

一个团队 20 个 campaign 就够把一个优化师钉死在屏幕前。所以 ad-agent 不是一个"AI 概念题"，它要解决的是**四件很土的事**：

1. **媒体投放自动化**——出价 / 预算 / 上下线，这些机械动作能不能少点手动
2. **数据聚合**——三个后台 + MMP + BI，能不能一次拉齐、口径统一
3. **自动盯盘**——凌晨 CPI 飙升、ROI 跌破阈值，能不能不用人半夜爬起来
4. **策略迭代**——出价、点位、素材、人群这四类杠杆，能不能被系统性地跑 A/B，而不是靠优化师的手感

前两件是"效率"，后两件是"ROI"。ad-agent 要做的，就是这两条曲线一起拉。

---

## 接下来这四天的迭代，我拆成 6 段讲给你

- **Day 1–2**：为什么先在 Cursor 里做两个 Skill，再决定要不要建平台
- **Day 3**：SmartUA 从 0 到 v1.0 只做一件事——**先建身体，不接 AI**
- **Day 4**：接入模型，把Agent loop起来，同时确保human in/on the loop
- **进化三层**：Episodic Memory + Reflection + StrategyStore，让 agent 越用越准而不是越用越贵
- **持续推进**：Ark 推理 + SSE 流式思考 + 可打断——"能打断"的 agent 才敢"真自治"
- **五步顺序清单**：想自建 ad-agent 的团队，别抄架构，抄这个顺序

以及一份 5 道题的自测，和一个限 2 家的免费诊断名额。

---

## 二、Day 1–2 · 从本地 Skill 打样：ad-agent 和 ua-monitor 两把梯子

真要从 0 建一个平台产品，第一天不该写平台，应该先在本地打一层"能跑通的最小闭环"。我用 Cursor 起了两个 Skill：

- **`ad-agent` Skill**：把 Meta / Google / TikTok 的常用动作（暂停、加预算、换素材、拉报表）封装成 Skill 内的工具调用；用户在 Cursor 里用一句自然语言下目标——"把 CPI > $5 的 campaign 暂停"，Skill 拆解成 `filter → propose → execute`。
- **`ua-monitor` Skill**：定时（cron）拉三家平台的实时数据，把异常（CPI 飙升 / ROI 跌破 / spend 异常）压成一份日报。

**为什么先做 Skill、不直接做平台？**

因为 Skill 是**最小可交付单元**：不用登录、不用建库、不用管权限，一个 markdown + 一段 python 就能跑。跑通之后有两个作用：

- 验证工具边界——哪些动作是 L0（低风险自动执行）、哪些是 L1/L2（需要人确认）、哪些是 L3（绝不自动）
- 沉淀数据结构——campaign / adgroup / ad / creative 四层，每层的字段和状态标签，在 Skill 里就已经跑成型了

这两周的 Skill 打样，等价于给后面的平台版做了一套**接口设计的手稿**。后来 SmartUA 的 Connector 抽象、Tool Registry 分级、四层数据模型，都是在 Skill 阶段就已经被摸清楚了的东西。

一句话：**先在 Cursor 里跑通，再决定值不值得做平台**——省下的是几万行没用的代码。

---

## 三、Day 3 · SmartUA 平台化：把数据、看板、工作台捏成一个身体

Skill 跑了两周之后，问题也很明显：

- Skill 是**单人工具**，团队协作要靠平台
- Skill 里的动作没有审计、没有回滚、没有多租户
- Skill 拉的数据存在本地，没法沉淀成"能被模型复盘的经历"

于是有了 SmartUA。第三天从 0 到 v1.0.0 一天跑完，交付的**不是 agent，是身体**：

- **数据层**：Campaign → AdGroup → Ad → Creative 四层实体，完整 CRUD，Decimal 精算，多租户 RBAC（admin / optimizer / analyst / finance 四个角色）
- **看板层**：Dashboard 投放大盘（今日花费 / 整体 ROI / 活跃 Campaign / 告警）+ Campaign 详情页四 Tab + 素材管理页
- **工作台层**：告警列表、意图弹窗、素材优化操作入口——**先把优化师原来在三块屏做的事，收拢到一块屏**

到这一步 SmartUA 还没有任何"AI"——**它是一个精算的、多租户的、有告警的投放控制台**。但这一步是所有后续 agentic 能力的底座：

- 有了四层实体，Agent 才有"世界模型"
- 有了 Connector（Meta / Google / TikTok / Mock），Agent 才有"手"
- 有了 RBAC 和审计，L1/L2 的高风险动作才能走人在环
- 有了告警系统，主动自治才有"眼睛"

我把这一步的定位写死在 `docs/AGENTIC_AD_PLATFORM_UPGRADE.md` 里：**"平台做身体和护栏，Agent Loop 做大脑，Tool Registry 做桥接"**。这句话决定了后面所有版本的边界——凡是碰"身体"和"护栏"的功能，都留给平台；凡是碰"决策"和"学习"的功能，才交给 Agent。

---

## 四、Day 3 晚 – Day 4 · 放开模型思考：Agent Loop 和 human in the loop

有了身体，才谈得上大脑。第四天的核心工作是把 Agent Loop 缝进平台。这里有几个关键判断：

### 1. Mock 因果引擎——先造土壤，再种大脑

Day 3 晚上撞上一件很现实的事：**Meta 账户被封，appeal 中**。这时候如果继续等真实数据来训练 Agent，项目就死了。

我做的判断是——**agent 缺的从来不是模型，是数据**。于是先花半天写了 `SimulationEngine`：一个**有状态的因果模拟引擎**，能真实反映"加预算 → 边际 ROI 递减"、"换素材 → 短期提振 + 长期衰减"、"提价 → 伤 ROI"这些因果关系。写动作真实改状态，拉历史反映动作效果——形成因果闭环。

这一步在很多 AI 项目里都被跳过了：直接拿随机 mock 数据训模型、跑评估。**得到的 agent 只会讨好数据，不会讨好业务**。

### 2. Agent Loop——ReAct + 规则兜底 + 人在环

`backend/app/services/agent_runtime/` 里三个文件构成大脑：

- `session.py`：多轮会话状态（目标 / 步骤 / 待审批 / 上下文）
- `tools.py`：Tool Registry——每个工具带 **L0/L1/L2/L3 风险分级**元数据
- `loop.py`：ReAct 循环 `think → select tool → (execute | propose) → observe → think again`

有 LLM 就走 LLM 规划，没 LLM 就走规则引擎兜底。**优雅降级不是可选项，是保命线**——大模型总有抽风的时候，规则引擎让你在抽风的时候也能出稳定动作。

L0（如换素材）自动执行；L1/L2（暂停 / 调预算 / 调出价）**必须人在环审批**。我在 API 里写了 `/agent/sessions/{id}/approve` 和 `/reject`——前端把这些做成内联按钮，优化师看到 agent 的提案，一键批准或驳回，驳回后 agent 会重新规划。

**这就是 human in the loop 的具体形态**：不是"最后确认一下"的形式主义，而是**每一个高风险动作都必须被人按一下**，而每一次驳回都会反过来喂给 agent 学习。

### 3. 记忆 + 反思 + 策略学习——让模型"越做越准"

到 Phase 2 之前，我发现一个陷阱：**agent 每次都是"新员工"**。每一次会话结束，它就把学到的东西全忘了。下一个账户来了，它还是从头猜"加多少预算合适"。

于是有了三层进化：

- **Episodic Memory**（Phase 2）：每次写动作沉淀成一条 Episode（目标 / 动作 / 动作前快照 / 动作后 2h/24h/7d 影响）。**同一个 agent 在 A 账户踩的坑，下周在 B 账户能调用**。
- **Reflection**（Phase 2）：Reflector 把 Episode 复盘成"启发式规则"——比如"历史加预算 7d 平均 ΔROI 转负时，把加预算幅度收敛到 ≤10%"。
- **StrategyStore**（Phase 3）：把上面这些启发式规则**编译成可持久化的策略参数**（`budget_increase_cap` / `pause_roi_threshold` / `rotate_when_roi_below`），落盘 JSON，跨进程、跨账户复用。

三层加起来的效果是：**这个 agent 越用越准，而不是越用越贵**——不像很多"AI 应用"，用得越多只是把 token 账单堆高。

### 4. 主动自治——APScheduler 定时巡检

Phase 4 收口成"主动式自治"：APScheduler 起一个后台 scheduler，每 120 秒（生产建议 ≥300s）扫一次所有账户，检测 5 类异常：

- CPI 飙升
- ROI 跌破阈值（**阈值直接来自 Phase 3 学到的策略**，不是硬编码）
- 素材疲劳
- 花费异常
- 账户被封

低风险的（换素材）**自动执行**；暂停 / 调预算 / 调出价这类 L1/L2 **进人在环审批队列**；账户被封这类只通知不改动。同一类异常 + 同一 campaign 有冷却窗口，避免"每 2 分钟提一次同样的建议"这种打扰。

到 Phase 4，SmartUA 就不再是"人召唤才动"的工具，而是"你上班之前它已经把 3 个异常处置好、5 个待审批放在你桌上"的搭档。

### 5. Ark 推理 + SSE 流式 + 可打断

最后一天补的三件事，都是**从"能跑"升级到"能用"的临门一脚**：

- **Ark 推理服务**：`ArkProvider` 接火山方舟，Bearer 鉴权、120s+ 超时（推理模型长思考），把默认 provider 切成 ark，规则引擎沉到最终兜底。`campaign.optimize_batch` 这类复杂意图直接路由到 ark。
- **SSE 流式思考**：加了 `GET /agent/sessions/{id}/stream` 走 `text/event-stream`，前端 `StepView` 增加紫色的 `REASONING` 卡片，agent 思考过程逐 token 流出来。**这个改动的意义不是"炫技"，而是让优化师看到 agent 在想什么**——只有看到思考，人才敢真去审批。
- **可打断 & 中途改向**：`abort_requested` + `pending_redirect` 两个字段，前端跑得中途按"停止"或者发新消息说"换个思路"，agent 会即时 `aclose()` 退出旧循环、注入"用户中途改向"步骤、以新目标续跑。**"能打断"的 agent 才是"真敢让它自治"的 agent**。

---

## 五、这四天教会我什么

回头看这份 changelog，v0.1 到 v1.7 走了 10 个版本、4 个开发日，我总结的经验只有三条：

**第一，agent 不是模型问题，是环境问题。** 90% 的开发时间花在给它建身体、护栏、记忆、告警。等身体做好，接哪个大模型只是**一个 provider 类的事**——SmartUA 从 GPT-4 切到 Ark，改动量是一个 `ArkProvider` 类。

**第二，人在环不是"降级方案"，是"数据来源"。** 每一次人的驳回都比一次成功执行更值钱——它告诉你 agent 判断错在哪、下次策略参数往哪调。**把审批做得越顺畅，agent 学得越快**。

**第三，vibe coding 不等于随手写。** 我这 4 天的节奏是：每个 Phase 上线前先写一份 `docs/PHASE_X_UPGRADE.md`，把这个 Phase 的**边界、依赖、风险、验收**写清楚；然后配一个 `scripts/demo_phaseX.py` 做端到端验证。**没有 demo 脚本的 Phase 不算完成**——因为 agent 项目最怕"局部能跑、串起来废"，demo 就是那个不让你偷懒的钉子。

---

## 六、写给正在建自己 ad-agent 的团队

如果你正在给自家买量团队搭一个 ad-agent，别抄架构，抄顺序：

1. **数据土壤先跑通**——没有连续、因果、可回溯的数据，任何 agent 都是幻觉
2. **工具先分级**——L0-L3 的风险元数据比模型能力更重要
3. **Agent Loop 要能降级**——LLM 抽风的时候规则引擎顶上
4. **审批要做成一键**——人在环不是负担，是学习信号
5. **记忆和策略要落盘**——不然你天天在训"新员工"

我在过去两个月做了几家出海游戏 / 工具 App 的 ad-agent 咨询——从 mini 诊断到搭建 MVP。有些团队原本卡在"要不要买某个 SaaS"，聊完发现真正卡的是**数据口径没统一**——买什么工具都没救。

---

## 3 分钟自测：你的团队准备好搭 ad-agent 了吗

| # | 判断题 | 是 / 否 |
|---|--------|--------|
| 1 | 你能在 30 秒内说清上周 ROAS 是 last-touch 还是 incremental 口径？ | |
| 2 | Meta / Google / TikTok 的写动作（暂停、调预算、换素材）有没有统一的 Connector 抽象？ | |
| 3 | 你的告警系统能不能区分 "L0 自动 / L1 待审 / L2 报警 / L3 不动"？ | |
| 4 | 换一个大模型 provider，是改一个类还是改整个后端？ | |
| 5 | Agent 上周做过的动作，这周新账户来了能不能被复用？ | |

**5 道都是 Yes**：你已经在 agentic 的门内——欢迎交流优化 Loop 的细节；
**3 道以下 Yes**：先别急着接大模型，把身体和数据土壤补齐才是正解。

---

## 免费 Ad-Agent 就绪度诊断（限 2 家 · 本月截止）

适合谁：$50k–500k / 月投放的出海休闲游戏 / 工具 App / 中小 studio，有优化师、有 BI、但还没有系统性的 agent 工程

交付什么：

- 一份 **ad-agent 就绪度评估**（数据 / 工具 / 审批 / 记忆四维度）
- 一份 **90 天路线图**（先做什么、后做什么、需要哪些人手）
- 一次 60 分钟的 online workshop（复盘评估 + 定优先级）

方式：只读授权 + 14 天交付。

联系方式：邮件 **zanhe@139.com** 或加微信 **zanhe1984**，主题写 "ad-agent 就绪度 + 团队规模 + 现在的痛点"，本月截止。

---

## 延伸阅读

- [Agentic UA 冲击下的代投代理和投手们](/posts/2026-07-04-agentic-ua-inhouse-ad-platform/) —— 代投团队为什么被 agent 挤压
- [企业 AI Agent 落地指南：跨越从模型到业务的 7 层漏斗](/posts/2026-05-enterprise-ai-agent-7-layer-funnel/) —— agent 落地的通用漏斗
- [Meta 商业化演进与 Agentic Ads —— 未来的广告买量是 A2A 架构](/posts/2026-06-meta-agentic-ads-a2a/) —— 未来广告 A2A 架构下的 ad-agent 定位

*—— 本文对应 SmartUA v0.1 → v1.7 的完整迭代，源自 4 天真实 vibe coding 记录*
