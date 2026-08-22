// /api/checkup — 数据可信度快检 · serverless 判决函数
// 输入：{ platform, business, budgetTier, roas, os? }
// 输出：verdict + 该切片的 benchmark 范围 + 一个建议动作
// 完整 benchmark 字典不暴露给前端。

const benchmarks = require('./data/benchmarks.json');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.CHECKUP_ALLOW_ORIGIN || 'https://abtest.chat',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

function round1(n) { return Math.round(n * 10) / 10; }
function round2(n) { return Math.round(n * 100) / 100; }

function inferInflation(platform) {
  const map = {
    meta: benchmarks.platform_inflation.meta_only,
    google: benchmarks.platform_inflation.google_only,
    tiktok: benchmarks.platform_inflation.tiktok_only,
    meta_google: benchmarks.platform_inflation.meta_google,
    multi: benchmarks.platform_inflation.multi,
  };
  return map[platform] || benchmarks.platform_inflation.meta_google;
}

function applyAttUplift(infl, os) {
  if (os !== 'ios') return { ...infl, att_uplift_applied: false };
  const u = benchmarks.att_uplift;
  return {
    min: round2(infl.min * u.min),
    max: round2(infl.max * u.max),
    median: round2(infl.median * u.median),
    note: (infl.note || '') + `（iOS 已含 ATT uplift ×${u.median}）`,
    att_uplift_applied: true,
    att_uplift_factor: { min: u.min, median: u.median, max: u.max },
  };
}

function inferIndustry(business) {
  return benchmarks.industry_breakeven_roas[business] || benchmarks.industry_breakeven_roas.dtc_shopify;
}

function inferStability(budgetTier) {
  return benchmarks.signal_stability[budgetTier] || benchmarks.signal_stability['5k-30k'];
}

function defaultOsFor(business) {
  if (business && business.startsWith('dtc_')) return 'web';
  return 'ios';
}

function verdict(roas, infl, ind) {
  // 真实贡献区间
  const realLow = round1(roas / infl.max);
  const realHigh = round1(roas / infl.min);
  const realMedian = round1(roas / infl.median);

  // 判决
  let level, label, color;
  if (roas < ind.min) {
    level = 'red_below';
    label = '平台 ROAS 已低于该业务典型保本线——先别加预算，查转化和单位经济。';
    color = 'red';
  } else if (roas > infl.median * ind.median * 1.5) {
    level = 'red_above';
    label = '平台 ROAS 高得可疑——大概率是归因虚高，不要按这个数加预算。';
    color = 'red';
  } else if (roas >= ind.max) {
    level = 'green';
    label = '平台 ROAS 高于保本线，且未到明显虚高区间——可做方向性决策，但仍需对账。';
    color = 'green';
  } else {
    level = 'yellow';
    label = '信号模糊——平台 ROAS 在保本线附近，看不出明显盈亏，不能用来加预算。';
    color = 'amber';
  }

  return { level, label, color, realLow, realHigh, realMedian };
}

function oneAction(level, platform, business, os) {
  const iosHint = os === 'ios'
    ? ' iOS 上务必拉 SKAdNetwork / Aggregated Event Measurement 的 modeled conversion 占比。'
    : '';
  const actions = {
    red_below: '拉 GA4 / 后端真实收入和广告后台报的转化对一下，差多少；同时用客单价×毛利率倒推你的真实保本 ROAS，不要用行业平均值。' + iosHint,
    red_above: '用 14 天窗口拉「广告点击后自然转化」占比——平台把这部分算作了广告功劳；如果有条件，启动一个 1 周的 geo holdout 或 PSA ghost ad 增量测试。' + iosHint,
    yellow: '先不要动预算。用 14 天数据拉平台 ROAS vs GA4 ROAS 的差异区间，同时算清单位经济；等数据跨过保本或跨过虚高阈值再决策。' + iosHint,
    green: '把这个数按周维度对账一次，确认平台 ROAS 和真实收入差异稳定；如果差异持续 <20%，可以在同一受众/素材上小步加预算（每次 +20%）。' + iosHint,
  };
  return actions[level] || actions.yellow;
}

function anonymizedSlice(infl, ind, stab, os) {
  return {
    inflation: { min: infl.min, max: infl.max, median: infl.median, note: infl.note, att_uplift_applied: infl.att_uplift_applied || false },
    industry: { min: ind.min, max: ind.max, median: ind.median, note: ind.note },
    stability: stab,
    os: { key: os, label: benchmarks.os_platforms[os]?.label || os, note: benchmarks.os_platforms[os]?.note || '' },
    benchmark_meta: {
      version: benchmarks.meta.version,
      updated: benchmarks.meta.updated,
      sample_size: benchmarks.meta.sample_size,
      note: '种子区间来自公开行业研究，正通过真实用户提交持续校准；提交越多，区间越准。',
    },
  };
}

const OS_VALID = new Set(['ios', 'android', 'web']);

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ error: 'method_not_allowed' }) };
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch (e) { return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'bad_json' }) }; }

  const platform = ['meta','google','tiktok','meta_google','multi'].includes(body.platform) ? body.platform : 'meta_google';
  const business = ['dtc_shopify','dtc_amazon','subscription_app','ai_tool','game_hypercasual','game_hybridcasual'].includes(body.business) ? body.business : 'dtc_shopify';
  const budgetTier = ['<5k','5k-30k','30k-100k','100k+'].includes(body.budgetTier) ? body.budgetTier : '5k-30k';
  const os = OS_VALID.has(body.os) ? body.os : defaultOsFor(business);
  const roas = Number(body.roas);

  if (!Number.isFinite(roas) || roas <= 0 || roas > 100) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'bad_roas' }) };
  }

  const baseInfl = inferInflation(platform);
  const infl = applyAttUplift(baseInfl, os);
  const ind = inferIndustry(business);
  const stab = inferStability(budgetTier);
  const v = verdict(roas, infl, ind);
  const action = oneAction(v.level, platform, business, os);
  const slice = anonymizedSlice(infl, ind, stab, os);

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      input: { platform, business, budgetTier, os, roas: round1(roas) },
      verdict: { level: v.level, label: v.label, color: v.color },
      estimated_real_roas: { low: v.realLow, median: v.realMedian, high: v.realHigh },
      slice,
      action,
      upgrade: {
        report_price_cny: 99,
        walkthrough_price_cny: 999,
      },
    }),
  };
};
