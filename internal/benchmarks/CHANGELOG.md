# Benchmark Changelog

本文件记录 `netlify/functions/data/benchmarks.json` 每次 seed 数值变更。格式：日期 / 版本 / 改动 / 原因 / 来源。

---

## 2026-08-22 · v0.3-seed

### Schema

- 新增 segment 维度：`baselines[d][c].segments[<geo>_<os>].channels[ch].metrics[m]`，替换原 `channels` 直接挂在 category 下的结构
- 新增顶层字典：`geo_tiers`、`os_platforms`、`att_uplift`（iOS SAN 额外膨胀 1.10–1.30，median 1.20）
- `channel_labels` 新增：moloco / applovin / unity / ironsource
- meta 升级到 v0.3-seed，新增 `provenance_doc` 指向本目录

### 覆盖

| direction | segments |
|---|---|
| dtc | web_cross |
| app | t1_ios, t1_android |
| game | t1_ios, t1_android, t3_android |

- ASA 仅出现在 app × t1_ios
- Moloco / AppLovin / Unity / ironSource 仅出现在 game direction

### 生成方式

- v0.2 锚点固化到 `internal/benchmarks/anchors-v02.json`
- 新脚本 `scripts/build-benchmarks-v03.mjs` 按 `SEG_MULT` 把 cross-platform anchor 乘出各 segment
- T3 Android multiplier（CPI 0.12–0.22、ARPDAU 0.25–0.45 等）校准自 AppsFlyer Performance Index 与 Singular ROI Index 的 region 切片
- Game 网络 anchor（CPI/D1/D7/ARPDAU）参考 AppsFlyer Performance Index Gaming edition + Singular ROI Index

### 后端联动

- `benchmark-catalog.js` 返回 segments 列表（含 geo / os / channels）
- `benchmark-slice.js` 请求强制带 `{direction, category, segment}`，非法 segment 返回 400 `bad_segment`
- `checkup.js` 请求新增 `os`；os=ios 时把 platform_inflation 乘 att_uplift（round2），并在 inflation note 末尾标注；附带修掉一个历史 bug：`multi` 平台原映射到不存在的 `platform_inflation.multi_3plus`，被默认 meta_google 吞掉
- `submit-roas.js` 请求新增 `os` / `geoTier`，枚举校验，作为 Netlify Forms 字段透传，让飞轮提交天然带 segment 标签

### 未做（等飞轮）

- T2 任何 OS 的 seed
- T3 iOS（公开数据稀疏）
- DTC mobile web vs desktop web 细分
- 新增 metric（SKAN conversion rate / payback period）—— v0.4 再议
- 基于用户提交自动回灌 seed 的聚合脚本

### 来源

见同目录 `PROVENANCE.md`。

---

## 2026-08-23 · Reconcile round 1（v0.4 输入，未改 seed）

首次通过 `~/.cursor/skills/ua-monitor/benchmark_db.py reconcile-load` 加载外部锚点，对 v0.3 seed 做对账。锚点文件归档：`internal/benchmarks/anchors-2026-08-23-liftoff-promodo-polar.csv`（10 条）。

### Verdict 摘要

| Verdict | 条数 | 说明 |
|---|---|---|
| in_range | 6 | DTC fashion × Google/Meta/TikTok、beauty × Google/TikTok 与 seed 区间一致 |
| below_seed | 2 | 见下 |
| above_seed | 0 | — |
| no_seed | 3 | Game d30_roas 在 v0.3 seed 中未铺（只铺到 d7/arpdau） |

### below_seed 明细（v0.4 候选，**本次不改**）

1. **game · hypercasual · t1_ios · d1（Top 25 casual）**
   - 锚点：Sensor Tower State of Mobile 2025-12 → D1 14.0–16.0%，median 14.9%
   - Seed（7 channels 聚合）：min 30.0 / median 44.0 / max 63.0
   - 偏离 -66%
   - **判读**：口径不同。锚点是 "Top 25 casual" 头部池，seed 是全品类 hypercasual 安装池（包含大量长尾）。这不是 seed 偏高，而是 top-quartile vs pooled 的差别。**结论**：不调 seed；在 provenance 里加一句"hypercasual d1 是 pooled 安装口径，top-quartile 参照 14.9%"，并考虑 v0.5 加 app_size / top_quartile 维度（Promodo 数据也支持）。

2. **dtc · beauty · web_cross · meta · roas**
   - 锚点：Polar Analytics Ecommerce Benchmarks 2026 → 1.5–1.7×，median 1.57×
   - Seed：1.9–3.6×，median 2.6×
   - 偏离 -39.6%
   - **判读**：seed 偏乐观。Polar 是 2026 年分行业 ROAS，口径与 seed 接近（web cross，含归因窗口差异）。需要第 2、3 个独立来源印证后再收紧；候选来源：Promodo beauty（同期 1.57×，已在锚点表）、Shopify 官方 benchmarks、某上市 DTC 财报口径。
   - **动作**：v0.4 前再收 1 条 beauty × Meta 独立来源；若三条一致，把 seed min/median 从 1.9/2.6 下移到约 1.5/2.0。

### no_seed 明细

- Game `d30_roas` 在 v0.3 未铺（schema 支持但 seed 只到 d7/arpdau）。Liftoff 2025 给出了 Casual iOS 45-49%、Casual Android 14-16%、Mid-core iOS 40%+ 三条锚点，可直接作为 v0.4 game 方向补 d30_roas 的 seed 起点。等再拿到 1-2 条独立来源（Singular ROI Index 2026、AppsFlyer Performance Index 游戏版）后落 seed。

### 过程数据

- 本次同步后 benchmark.db：383 cells，1532 history rows
- 对账命令：
  ```bash
  python3 ~/.cursor/skills/ua-monitor/benchmark_db.py reconcile-load \
    --csv internal/benchmarks/anchors-2026-08-23-liftoff-promodo-polar.csv
  python3 ~/.cursor/skills/ua-monitor/benchmark_db.py reconcile-report
  ```
- 红线自检：`grep -rE "ua\.db|block\.juggle|blockpuzzle|hungrystudio|nebula" benchmark_db.py` 无命中；锚点全部来自公开报告，无前雇主数据。
