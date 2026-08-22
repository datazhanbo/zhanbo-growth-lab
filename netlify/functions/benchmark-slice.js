// /api/benchmark-slice — 只返回所选 direction / category / channel 的那个切片
// 输入：{ direction, category, channel? }
// 输出：labels + 该 category 下全部 channel 的指标当前值与季度序列
// 完整字典不下发；前端只能通过具体切片拼装浏览。

const benchmarks = require('./data/benchmarks.json');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.CHECKUP_ALLOW_ORIGIN || 'https://abtest.chat',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

const DIRECTIONS = new Set(['dtc', 'app', 'game']);

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ error: 'method' }) };

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch (e) { return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'bad_json' }) }; }

  const direction = body.direction;
  const category = body.category;
  if (!DIRECTIONS.has(direction)) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'bad_direction' }) };
  }
  const dir = benchmarks.baselines[direction];
  if (!dir || !dir.categories || !dir.categories[category]) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'bad_category' }) };
  }
  const cat = dir.categories[category];

  // 只暴露该 category 下所有 channel 的切片；不下发其他 category / 其他 direction
  const channels = {};
  for (const [chKey, ch] of Object.entries(cat.channels)) {
    channels[chKey] = {
      label: benchmarks.channel_labels[chKey] || chKey,
      metrics: ch.metrics,
    };
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      direction: { key: direction, label: dir.label },
      category: { key: category, label: cat.label },
      disclaimer: dir.disclaimer || '',
      channels,
      metric_labels: benchmarks.metric_labels,
      benchmark_meta: {
        version: benchmarks.meta.version,
        updated: benchmarks.meta.updated,
        sample_size: benchmarks.meta.sample_size,
        history_quarters: benchmarks.meta.history_quarters,
        currency: benchmarks.meta.currency,
        note: '种子区间来自公开行业研究，正通过真实用户提交持续校准；提交越多，区间越准。',
      },
    }),
  };
};
