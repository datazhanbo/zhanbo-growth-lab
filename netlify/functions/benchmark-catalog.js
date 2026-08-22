// /api/benchmark-catalog — 只下发方向 / category / segment / channel 的键与标签
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
      const segments = {};
      for (const [sKey, s] of Object.entries(c.segments || {})) {
        segments[sKey] = {
          key: sKey,
          label: s.label,
          geo: s.geo,
          os: s.os,
          channels: Object.keys(s.channels).map(k => ({ key: k, label: benchmarks.channel_labels[k] || k })),
        };
      }
      categories[cKey] = { label: c.label, segments };
    }
    directions[dKey] = { label: d.label, disclaimer: d.disclaimer || '', categories };
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      directions,
      geo_tiers: benchmarks.geo_tiers,
      os_platforms: benchmarks.os_platforms,
      channel_labels: benchmarks.channel_labels,
      benchmark_meta: {
        version: benchmarks.meta.version,
        updated: benchmarks.meta.updated,
        sample_size: benchmarks.meta.sample_size,
      },
    }),
  };
};
