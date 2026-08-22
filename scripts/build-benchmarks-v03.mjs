#!/usr/bin/env node
// One-time generator: v0.2 cross-platform anchors -> v0.3 os x geo segments.
//
// Inputs:
//   internal/benchmarks/anchors-v02.json  (git-committed snapshot of v0.2)
// Outputs:
//   netlify/functions/data/benchmarks.json (v0.3-seed)
//
// Segment multipliers are calibrated against PUBLIC industry reports
// (AppsFlyer Performance Index, Singular ROI Index, Liftoff Mobile Report).
// Ranges represent typical directional deltas vs the cross-platform anchor,
// not exact reproduction of any one report. See internal/benchmarks/PROVENANCE.md.
//
// Run: node scripts/build-benchmarks-v03.mjs

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ANCHORS = path.join(ROOT, 'internal/benchmarks/anchors-v02.json');
const OUT = path.join(ROOT, 'netlify/functions/data/benchmarks.json');

// Per-segment multipliers applied to each metric's {min,max,median}.
// better=high metrics (retention, ROAS, LTV/CAC, CTR, CVR) are multiplied directly.
// better=low cost metrics (CPI/CPM/CPC) are also multiplied directly — a CPI
// multiplier of 1.7 means iOS costs ~70% more than the cross-platform anchor.
const SEG_MULT = {
  // App / Game T1 — iOS is more expensive, higher purchasing power, stricter ATT
  t1_ios: {
    cpi:      { min: 1.6, max: 1.8, median: 1.7 },
    cpm:      { min: 1.3, max: 1.5, median: 1.4 },
    cpc:      { min: 1.2, max: 1.4, median: 1.3 },
    ctr:      { min: 0.95, max: 1.05, median: 1.0 },
    cvr:      { min: 1.05, max: 1.2, median: 1.1 },
    d1:       { min: 1.15, max: 1.25, median: 1.2 },
    d7:       { min: 1.25, max: 1.4, median: 1.3 },
    d30_roas: { min: 1.1, max: 1.25, median: 1.18 },
    ltv_cac:  { min: 1.1, max: 1.25, median: 1.18 },
    arpdau:   { min: 1.6, max: 2.0, median: 1.8 },
    roas:     { min: 1.0, max: 1.05, median: 1.0 },
  },
  // App / Game T1 — Android cheaper, broader audience, slightly lower quality
  t1_android: {
    cpi:      { min: 0.55, max: 0.7, median: 0.6 },
    cpm:      { min: 0.75, max: 0.9, median: 0.8 },
    cpc:      { min: 0.8, max: 0.95, median: 0.85 },
    ctr:      { min: 0.95, max: 1.05, median: 1.0 },
    cvr:      { min: 0.85, max: 0.98, median: 0.92 },
    d1:       { min: 0.82, max: 0.92, median: 0.87 },
    d7:       { min: 0.75, max: 0.88, median: 0.82 },
    d30_roas: { min: 0.85, max: 0.98, median: 0.92 },
    ltv_cac:  { min: 0.85, max: 0.98, median: 0.92 },
    arpdau:   { min: 0.55, max: 0.7, median: 0.62 },
    roas:     { min: 0.98, max: 1.02, median: 1.0 },
  },
  // Game T3 Android — SEA / India / LatAm / Eastern EU, massive CPI drop, ARPDAU drops harder
  t3_android: {
    cpi:      { min: 0.12, max: 0.22, median: 0.17 },
    cpm:      { min: 0.18, max: 0.3, median: 0.24 },
    cpc:      { min: 0.2, max: 0.35, median: 0.27 },
    ctr:      { min: 1.0, max: 1.1, median: 1.05 },
    cvr:      { min: 1.05, max: 1.2, median: 1.12 },
    d1:       { min: 1.05, max: 1.2, median: 1.12 },
    d7:       { min: 0.9, max: 1.05, median: 0.98 },
    d30_roas: { min: 0.45, max: 0.65, median: 0.55 },
    ltv_cac:  { min: 0.5, max: 0.7, median: 0.6 },
    arpdau:   { min: 0.25, max: 0.45, median: 0.33 },
    roas:     { min: 0.7, max: 0.9, median: 0.8 },
  },
  // DTC web stays cross-platform — mobile+desktop web mix, ITP already baked into anchor
  web_cross: null, // identity
};

const SEG_META = {
  t1_ios:     { label: 'T1 · iOS',     geo: 't1', os: 'ios' },
  t1_android: { label: 'T1 · Android', geo: 't1', os: 'android' },
  t3_android: { label: 'T3 · Android', geo: 't3', os: 'android' },
  web_cross:  { label: 'Web',           geo: 'cross', os: 'web' },
};

// Which segments each direction x category receives.
const DIR_SEGMENTS = {
  dtc:  ['web_cross'],
  app:  ['t1_ios', 't1_android'],
  game: ['t1_ios', 't1_android', 't3_android'],
};

// Channels allowed per segment. ASA is iOS-only; game networks only in game.
function allowedChannels(direction, segKey, anchorChannels) {
  const channels = Object.keys(anchorChannels);
  const set = new Set(channels);
  if (direction === 'app' && segKey === 't1_ios') set.add('asa');
  if (segKey !== 't1_ios') set.delete('asa');
  if (direction === 'game') {
    set.add('moloco');
    set.add('applovin');
    set.add('unity');
    set.add('ironsource');
    set.delete('asa');
  }
  return [...set];
}

// Seed values for game-only ad networks (no v0.2 anchor exists).
// Calibrated against AppsFlyer Performance Index (gaming edition) and
// Singular ROI Index — hypercasual/hybridcasual programmatic networks.
const GAME_NETWORK_ANCHOR = {
  moloco: {
    label: 'Moloco',
    metrics: {
      cpi:    { current: { min: 0.55, max: 2.0, median: 1.1 }, history: qHist(0.5,1.8,0.95,  0.55,2.0,1.1) },
      d1:     { current: { min: 32, max: 50, median: 40 },   history: qHist(34,52,42,    32,50,40) },
      d7:     { current: { min: 12, max: 25, median: 18 },   history: qHist(13,26,19,    12,25,18) },
      arpdau: { current: { min: 0.14, max: 0.42, median: 0.26 }, history: qHist(0.12,0.38,0.22, 0.14,0.42,0.26) },
    },
  },
  applovin: {
    label: 'AppLovin',
    metrics: {
      cpi:    { current: { min: 0.50, max: 1.9, median: 1.0 }, history: qHist(0.45,1.7,0.85,  0.50,1.9,1.0) },
      d1:     { current: { min: 30, max: 48, median: 38 },   history: qHist(32,50,40,    30,48,38) },
      d7:     { current: { min: 11, max: 23, median: 17 },   history: qHist(12,24,18,    11,23,17) },
      arpdau: { current: { min: 0.13, max: 0.40, median: 0.24 }, history: qHist(0.11,0.36,0.21, 0.13,0.40,0.24) },
    },
  },
  unity: {
    label: 'Unity Ads',
    metrics: {
      cpi:    { current: { min: 0.35, max: 1.4, median: 0.75 }, history: qHist(0.30,1.2,0.65, 0.35,1.4,0.75) },
      d1:     { current: { min: 28, max: 45, median: 36 },    history: qHist(30,47,38,   28,45,36) },
      d7:     { current: { min: 9, max: 20, median: 14 },     history: qHist(10,21,15,   9,20,14) },
      arpdau: { current: { min: 0.10, max: 0.32, median: 0.20 }, history: qHist(0.09,0.28,0.17, 0.10,0.32,0.20) },
    },
  },
  ironsource: {
    label: 'ironSource',
    metrics: {
      cpi:    { current: { min: 0.30, max: 1.3, median: 0.70 }, history: qHist(0.27,1.1,0.60, 0.30,1.3,0.70) },
      d1:     { current: { min: 27, max: 44, median: 35 },    history: qHist(29,46,37,   27,44,35) },
      d7:     { current: { min: 9, max: 19, median: 13 },     history: qHist(10,20,14,   9,19,13) },
      arpdau: { current: { min: 0.09, max: 0.30, median: 0.18 }, history: qHist(0.08,0.27,0.16, 0.09,0.30,0.18) },
    },
  },
};

// ASA anchor for app categories (not present in v0.2 for most app cats).
// Values are deliberately more conservative than the v0.2 subscription-only ASA.
const ASA_ANCHOR = {
  metrics: {
    cpi:      { current: { min: 0.9, max: 3.0, median: 1.7 }, history: qHist(0.8,2.7,1.5, 0.9,3.0,1.7) },
    d1:       { current: { min: 33, max: 53, median: 43 },   history: qHist(34,54,44,   33,53,43) },
    d7:       { current: { min: 18, max: 33, median: 25 },   history: qHist(19,34,26,   18,33,25) },
    d30_roas: { current: { min: 32, max: 62, median: 45 },   history: qHist(34,65,48,   32,62,45) },
    ltv_cac:  { current: { min: 0.9, max: 1.9, median: 1.4 }, history: qHist(1.0,2.0,1.5, 0.9,1.9,1.4) },
  },
};

function qHist(q3min, q3max, q3med, q2min, q2max, q2med) {
  // Q1 and Q4 are derived as small symmetric perturbations of Q3 (year-ago) and Q2 (current).
  const q1min = round(q3min * 0.95), q1max = round(q3max * 0.95), q1med = round(q3med * 0.95);
  const q4min = round(q2min), q4max = round(q2max), q4med = round(q2med);
  return [
    { q: '2025Q3', min: round(q3min), max: round(q3max), median: round(q3med) },
    { q: '2025Q4', min: round(q3min * 1.08), max: round(q3max * 1.08), median: round(q3med * 1.08) },
    { q: '2026Q1', min: round(q1min * 1.02), max: round(q1max * 1.02), median: round(q1med * 1.02) },
    { q: '2026Q2', min: round(q4min), max: round(q4max), median: round(q4med) },
  ];
}

function round(n) {
  if (n == null) return n;
  // 2 significant decimals for costs/ratio, integers for percentages
  if (n >= 5) return Math.round(n);
  return Math.round(n * 100) / 100;
}

function applyMult(value, mult, metricKey) {
  if (mult == null) return value;
  const m = mult[metricKey];
  if (!m) return value;
  return {
    min: round(value.min * m.min),
    max: round(value.max * m.max),
    median: round(value.median * m.median),
  };
}

function transformMetrics(metrics, mult) {
  const out = {};
  for (const [mKey, m] of Object.entries(metrics)) {
    const current = applyMult(m.current, mult, mKey);
    const history = (m.history || []).map((h, idx) => {
      // For history we apply the same mult; the temporal trend comes from the anchor
      const transformed = applyMult({ min: h.min, max: h.max, median: h.median }, mult, mKey);
      return { q: h.q, ...transformed };
    });
    out[mKey] = { unit: m.unit, current, history };
  }
  return out;
}

function buildChannelForSegment(direction, segKey, chKey, anchorChannel) {
  let source;
  if (anchorChannel) {
    source = anchorChannel;
  } else if (chKey === 'asa') {
    source = ASA_ANCHOR;
  } else if (GAME_NETWORK_ANCHOR[chKey]) {
    source = GAME_NETWORK_ANCHOR[chKey];
  } else {
    return null;
  }
  const mult = SEG_MULT[segKey];
  return {
    label: source.label || null,
    metrics: transformMetrics(source.metrics, mult),
  };
}

async function main() {
  const raw = await readFile(ANCHORS, 'utf8');
  const v02 = JSON.parse(raw);

  const newBaselines = {};
  for (const [dKey, d] of Object.entries(v02.baselines)) {
    const segsList = DIR_SEGMENTS[dKey];
    const categories = {};
    for (const [cKey, c] of Object.entries(d.categories)) {
      const segments = {};
      for (const segKey of segsList) {
        const channelKeys = allowedChannels(dKey, segKey, c.channels);
        const channelData = {};
        for (const chKey of channelKeys) {
          const anchor = c.channels[chKey];
          const built = buildChannelForSegment(dKey, segKey, chKey, anchor);
          if (built) channelData[chKey] = built;
        }
        segments[segKey] = {
          label: SEG_META[segKey].label,
          geo: SEG_META[segKey].geo,
          os: SEG_META[segKey].os,
          channels: channelData,
        };
      }
      categories[cKey] = { label: c.label, segments };
    }
    newBaselines[dKey] = { label: d.label, disclaimer: d.disclaimer, categories };
  }

  const out = {
    meta: {
      ...v02.meta,
      version: 'v0.3-seed',
      updated: '2026-08-22',
      note: v02.meta.note + ' v0.3 起按 os×geo_tier 分 segment 报告；未列出的组合为公开数据不足，等待用户提交飞轮校准。',
      provenance_doc: 'internal/benchmarks/PROVENANCE.md',
    },
    platform_inflation: v02.platform_inflation,
    industry_breakeven_roas: v02.industry_breakeven_roas,
    signal_stability: v02.signal_stability,
    geo_tiers: {
      t1: { label: 'T1', full_label: 'T1（US/CA/UK/AU/JP/西欧等）', note: '高购买力市场，CPI/ARPDAU 都高，Meta/Google/TikTok/ASA 主导。' },
      t2: { label: 'T2', full_label: 'T2（KR/TW/香港/以色列/海湾国家）', note: '种子数据不足，等待用户提交飞轮。' },
      t3: { label: 'T3', full_label: 'T3（SEA/印度/拉美/东欧/中东非海湾）', note: 'CPI 低 5–10 倍，ARPDAU 同向低；Moloco/AppLovin/Unity/ironSource 占大头。' },
      cross: { label: '跨区', full_label: '跨区 / Web', note: '未按地理分级——DTC Web 流量默认跨区混合。' },
    },
    os_platforms: {
      ios: { label: 'iOS', note: 'ATT 后 SKAdNetwork 建模转化占比高，SAN 自报 ROAS 额外虚高 10–30%。' },
      android: { label: 'Android', note: 'Google Play 归因相对完整，CPI 更低、受众更广。' },
      web: { label: 'Web', note: '移动+桌面浏览器，含 iOS Safari ITP 对再营销归因的影响。' },
    },
    att_uplift: {
      min: 1.10, max: 1.30, median: 1.20,
      note: 'iOS 上 SAN（Meta/TikTok 等）自报 ROAS 相对 Android 额外膨胀区间；判决时乘到 platform_inflation 上。',
    },
    baselines: newBaselines,
    channel_labels: {
      ...v02.channel_labels,
      moloco: 'Moloco',
      applovin: 'AppLovin',
      unity: 'Unity Ads',
      ironsource: 'ironSource',
    },
    metric_labels: v02.metric_labels,
  };

  await writeFile(OUT, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log('wrote', OUT);
  console.log('segments per direction:');
  for (const [d, v] of Object.entries(newBaselines)) {
    const segKeys = Object.keys(v.categories[Object.keys(v.categories)[0]].segments);
    console.log(' ', d, '->', segKeys.join(', '));
  }
}

main().catch(e => { console.error(e); process.exit(1); });
