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
