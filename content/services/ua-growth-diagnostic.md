---
title: "UA 买量增长数据诊断"
date: 2026-06-05T00:00:00+08:00
draft: false
comments: false
---

# UA 买量增长数据诊断

**UA Growth Data Diagnostic** 帮助出海游戏 Studio 建立一套可验证、可复跑、可落地的买量增长诊断体系，把「去后台看数」升级为「数据可信度 + 买量效率 + 归因链路 + 决策系统」的系统诊断。

## 适合团队

- 成长期出海游戏 Studio：数据散、ROI 不稳、扩量困难
- 中小型休闲游戏发行团队：优化师依赖后台和经验，缺统一看板
- 已有自研 BI 的成熟团队：老板、UA、BI 对 ROI 口径争议大
- 准备规模化买量的新项目：需要确认 SDK、事件、归因和看板基础是否可靠

## 要回答的四个问题

1. **数据准不准**：媒体后台、MMP、SDK、BI 之间的 spend、install、revenue、ROI 是否一致？
2. **钱花得好不好**：预算是否流向高质量 campaign、GEO、素材和媒体？
3. **归因链路有没有坑**：AppsFlyer / SKAN / SDK / S2S / ad revenue 回传是否导致 ROI 失真？
4. **团队能否持续决策**：是否有日常盯盘、异常告警、action tracking 和复盘机制？

## 诊断范围

- 广告平台与媒体后台：账户、Campaign、Ad Set、Creative、Spend、Action History
- 归因平台 / MMP：Attribution、Cost、Cohort、SKAN、Raw Data、Data API
- 游戏 SDK 与事件：SDK 初始化、Event Taxonomy、Revenue、S2S、Ad Mediation
- 自有数据聚合与 BI：数据源、ETL、维度、指标合同、看板和治理

## 标准流程

1. **Discovery / 业务访谈**：确认业务目标、投放规模、数据现状、组织结构和痛点排序。
2. **Read-only 数据授权与诊断快照**：建立一次可复跑的数据快照，避免截图和人工导出造成偏差。
3. **UA Diagnostic Data Room**：用本地 SQLite / DuckDB 建立诊断数据房间。
4. **四大诊断分析**：Data Trust、UA Efficiency、Attribution & Event Chain、Decision System。
5. **报告与路线图**：输出评分、问题清单、Quick Win 和 30/60/90 天路线图。

## 典型交付物

- 《诊断范围确认表》
- 《数据授权与安全边界清单》
- 《数据可信度评分》
- 《买量效率评分与浪费 / 机会清单》
- 《归因缺口表与事件链路图》
- 《决策系统改进建议》
- 《30/60/90 天增长系统路线图》
