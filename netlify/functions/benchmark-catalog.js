// /api/benchmark-catalog — 只下发方向 / category / channel 的键与标签
// 不含任何指标数据；指标数据走 /api/benchmark-slice 逐切片取。

const benchmarks = require('./data/benchmarks.json');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.CHECKUP_ALLOW_ORIGIN || 'https://abtest.chat',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS_HEADERS, body: '' };

  const directions = {};
  for (const [dKey, d] of Object.entries(benchmarks.baselines)) {
    const categories = {};
    for (const [cKey, c] of Object.entries(d.categories)) {
      categories[cKey] = {
        label: c.label,
        channels: Object.keys(c.channels).map(k => ({ key: k, label: benchmarks.channel_labels[k] || k })),
      };
    }
    directions[dKey] = { label: d.label, disclaimer: d.disclaimer || '', categories };
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      directions,
      benchmark_meta: {
        version: benchmarks.meta.version,
        updated: benchmarks.meta.updated,
        sample_size: benchmarks.meta.sample_size,
      },
    }),
  };
};
