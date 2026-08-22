# Benchmark Provenance · v0.3-seed

> 本文件是 `netlify/functions/data/benchmarks.json` 的内部溯源，不部署、不暴露给前端。
> 站点上每个切片数值都应能在下面找到"来自哪份公开报告 / 经过什么加工"。

更新时间：2026-08-22 · 版本：v0.3-seed

---

## 1. 总原则

- **只使用公开来源**：MMP 年度/半年度报告、平台 earnings call CPC/CPM 披露、上市广告主财报口径、Apple Search Ads 官方案例。
- **数值为方向性区间，不是单一均值**：每个 metric 给出 `{min, median, max}`，反映公开报告中可观察到的典型范围，不做"行业均值"声称。
- **锚定 + 分段派生，而非逐格子硬编码**：
  - v0.2 跨平台 cross-OS 锚点保留在 `anchors-v02.json`（git 快照，不再修改）
  - v0.3 各 segment 通过 `scripts/build-benchmarks-v03.mjs` 用 `SEG_MULT` 乘出来
  - 调整区间时改 multiplier，不直接改 benchmarks.json，保证可重现
- **季度历史是趋势近似，不是逐季原始数据**：用 `qHist()` 对锚点 Q3 / Q2 派生四个季度（Q1 = Q3 × 0.95 × 1.02，Q4 = Q3 × 1.08，Q2 取当前）。报告里只读到半年/年度的，按此线性延展并在来源里标 `derived`。

---

## 2. Segment 覆盖

| direction | segments 已铺 | 未铺（等飞轮） |
|---|---|---|
| dtc | `web_cross` | mobile web vs desktop web 细分 |
| app | `t1_ios`, `t1_android` | T2 全部、T3 全部、T1 web |
| game | `t1_ios`, `t1_android`, `t3_android` | T2 全部、T3 iOS、T1/T3 web |

T1/T2/T3 定义见 `benchmarks.json.geo_tiers`：

- **T1**: US / CA / UK / AU / JP / 西欧（DE/FR/北欧/荷比卢等）
- **T2**: KR / TW / 香港 / 以色列 / 海湾国家
- **T3**: SEA / 印度 / 拉美 / 东欧 / 中东非海湾
- **cross**: 未按地理分级，DTC Web 流量默认跨区混合

---

## 3. 平台 × OS 归因通胀（顶层 `platform_inflation`）

来源综合：

- AppsFlyer **SKAN & Attribution Adoption Index**（2024H2 / 2025H1）：SAN 在 iOS 上报的 SKAN postback 与 MMP 观测到的真实 install 的比例区间
- Singular **ROI Index** 关于 SAN self-attributing lift 的章节
- Meta 10-K、Google/Alphabet 10-Q 关于 traffic acquisition cost 与广告收入披露
- 各上市公司（Oddity Tech, Honest Company, Figs, ThredUp 等）财报中 platform-reported ROAS vs GAAP revenue 的差异口径
- 内部方向性判断仅作为"iOS CPI 高于 Android"等顺序校准，不引入具体数值

ATT 后 iOS SAN 自报相对 Android 额外膨胀 **10–30%（中位数 20%）**，在 `checkup.js` 判决时按 `att_uplift` 乘到通胀区间上；这条不写死在 `platform_inflation` 表里，保持平台主表口径与 OS 无关。

---

## 4. 业务保本 ROAS（顶层 `industry_breakeven_roas`）

按业务模型由毛利率 + 客单价 + 退货率/退款率倒推，公开来源交叉验证：

- DTC Shopify：Shopify **DTC Benchmarks Report**、Common Thread Collective **Ecommerce Stats**、DQYDJ 电商毛利率数据集
- DTC Amazon：Jungle Scout **State of the Amazon Seller**、Marketplace Pulse 月度报告
- Subscription App：Subscription Trade Association、Sensor Tower **Subscription App Report**、公开上市公司（Bumble, Duolingo, Calm）毛利率
- AI Tool：a16z **Generative AI Consumer Revenue**、公开 AI 工具 ARR 口径
- Game (hyper/hybridcasual)：Liftoff **Casual Gaming App Report**、AppsFlyer **Gaming Marketing Analytics**

注意：这些是"保本区间"而非"健康区间"，判决时只用于红/黄/绿下限。具体业务真实保本线必须用客单价 × 毛利率倒推，不能照抄。

---

## 5. 信号稳定性（顶层 `signal_stability`）

预算档与最小可决策天数，依据：

- Meta 官方 learning phase 文档（每 ad set 每周 50 转化）
- Google Ads 官方 optimization score 文档
- TikTok Ads 文档冷启动门槛
- v0.2 起的内部经验值，未做大改

---

## 6. 各 Segment × Channel × Metric 来源

下面只列每类数据的**主要公开来源 + 派生方式**；具体每个数值请直接看 `benchmarks.json` + 运行 `node scripts/build-benchmarks-v03.mjs` 可重现。

### 6.1 DTC · web_cross

锚点来自 v0.2，v0.3 不做 OS/geo 拆分。

- Meta / Google / TikTok CPM, CPC, CTR, CVR：
  - Meta Q1/Q4 earnings call CPM 披露
  - Google Ads industry benchmarks（WordStream, LocaliQ 年度汇总，交叉核对）
  - TikTok for Business 官方案例库 + JungleTopp 公开 DTC 数据集
  - Shopify **DTC Benchmarks Report** 关于转化漏斗
- DTC D1/D7 不输出（web 没有 D1 retention 口径）；ROAS 见 `industry_breakeven_roas`

### 6.2 App · T1 iOS / T1 Android

- CPI / CPM / CPC：
  - AppsFlyer **Performance Index**（Edition XVI 起每半年）：按 region × platform 的 CPI 排名区间
  - Singular **ROI Index**：CPI by geo × OS
  - Liftoff **Mobile App Ad Spend Report**（年度）：CPI / CTR / CVR by category × geo × OS
- D1 / D7 retention：
  - AppsFlyer **Retention Benchmark Report**（年度）：按 category × geo × OS 的 D1/D7/D30
  - Singular **Retention Index** 交叉核对
- D30 ROAS / LTV/CAC：
  - Singular **ROI Index** 按 category × OS
  - AppsFlyer **Aggregate Advanced Privacy** 报告里 SKAN postback 与 D30 modeled conversion 的偏差区间
- ASA（仅 T1 iOS）：
  - Apple Search Ads 官方案例研究
  - AppsFlyer Performance Index 中 ASA 章节
  - SearchAdsHQ 公开 benchmark 博客

**OS 派生 multiplier 来源**：T1 iOS / T1 Android 的 `SEG_MULT` 数值（iOS CPI 1.6–1.8×、ARPDAU 1.6–2.0×、D1 1.15–1.25×）取自上述报告里 US/UK 切片 iOS vs Android 的中位比值，不是逐份报告的精确复制。

### 6.3 Game · T1 iOS / T1 Android / T3 Android

T1 同 6.2，额外来源：

- Liftoff **Casual Gaming App Report**（年度）：CPI / D1 / D7 / ARPDAU / ROAS by subgenre（hypercasual / hybridcasual）
- AppsFlyer **Gaming Marketing Analytics** & **Gaming App Report**
- Singular **Retention Index for Gaming**
- data.ai（Sensor Tower 收购前）公开 **Mobile Gaming Report**

**T3 Android multiplier 来源**：

- AppsFlyer Performance Index region 切片：India / SEA / LatAm / Eastern Europe 的 Android CPI 通常为 US 的 10–25%，ARPDAU 为 US 的 25–45%
- Singular ROI Index India / SEA 章节
- Mintegral、AppLovin 公开 India/SEA hypercasual 案例

### 6.4 Game 专属网络（Moloco / AppLovin / Unity / ironSource）

`GAME_NETWORK_ANCHOR` 在脚本中直接给 seed 锚点（CPI/D1/D7/ARPDAU 四件套），不经过 v0.2 cross-platform anchor。来源：

- AppsFlyer **Performance Index (Gaming edition)**：各 ad network retention / IAP SKAN index
- Singular **ROI Index**：各 ad network ROAS / retention ranking
- AppLovin / ironSource / Unity / Moloco 官方案例研究与 investor deck
- 这些网络对 T1 iOS 主要出 SKAN postback；T3 Android 出 GAID 归因

ASA 在 game direction 不出现（脚本 `allowedChannels` 明确 delete）——Apple Search Ads 不是主流 game UA 渠道。

---

## 7. 货币、归因窗口、样本期

- **货币**：所有成本 / ARPDAU / LTV 以 USD 计。各报告用本币的，按报告期均值汇率折算。
- **CPI 归因窗口**：click-through 7d + view-through 1d（与 Meta/Google/TikTok 默认一致）；ASA 为 click 30d。
- **ROAS 归因窗口**：D30（订阅 App 与游戏主流）；DTC 用 7d click + 1d view。
- **样本期**：v0.3-seed 主要基于 2024H2–2026H1 的公开报告，季度历史覆盖 2025Q3–2026Q2 四期。新报告发布后在 CHANGELOG.md 记一条，重新跑脚本，bump meta.updated。

---

## 8. IP 红线（自我检查）

**禁止写入本文件或 benchmarks.json 的内容**：

- 来自 `/Users/hezan/Documents/hezan/data/ua.db` 的任何具体 CPI/ROAS/ARPDAU 数值
- 前雇主 / 任何非公开客户的 bundle id（com.block.juggle / com.blockpuzzle.us.ios / com.hungrystudio.* / com.nebula.* 等）、应用名、日花费、optimizer 名、素材名
- 内部工具代号、未公开模型名、未公开 AB 实验结论
- 以"我在某某公司做过""我们内部数据显示"开头的陈述

允许的用法：

- 用 ua.db 做**方向性校准**（确认"iOS CPI 比 Android 高""T3 Android CPI 是 T1 的 1/5–1/10"这种顺序关系）
- 用公开报告 + 公开行业经验来定量区间
- 提交审核前跑：
  ```
  grep -rE "ua\.db|block\.juggle|blockpuzzle|hungrystudio|nebula" netlify/functions/data internal/benchmarks
  ```
  应无命中。

---

## 9. 更新流程

1. 收集新公开报告，先在本文件第 6 节对应位置加来源（URL + 报告期 + 页码/章节）。
2. 若新报告改变了某个 segment 的典型区间，调整 `scripts/build-benchmarks-v03.mjs` 中对应 `SEG_MULT` 或 anchor。
3. 跑 `node scripts/build-benchmarks-v03.mjs` 重新生成 `netlify/functions/data/benchmarks.json`。
4. 在 `CHANGELOG.md` 记一条：日期、版本、改了哪些 cell、原因、来源。
5. 提交前 `grep -rE "ua\.db|..." internal/ netlify/functions/data` 自检 IP 红线。
6. 飞轮数据积累到 5–10 条/格子后，单独写聚合脚本用真实提交收紧区间（v0.4 目标，本次不做）。
