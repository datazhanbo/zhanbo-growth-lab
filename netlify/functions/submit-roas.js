// /api/submit-roas — 接收客户真实对账数据，进入 benchmark 审核队列
// MVP：通过 Netlify Forms 收集（零运维），审核后手动合入 benchmark seed
// 后续：迁移到 Fauna/Supabase 做自动聚合

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.CHECKUP_ALLOW_ORIGIN || 'https://abtest.chat',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8',
};

const PLATFORMS = new Set(['meta','google','tiktok','meta_google','multi']);
const BUSINESSES = new Set(['dtc_shopify','dtc_amazon','subscription_app','ai_tool','game_hypercasual','game_hybridcasual']);
const BUDGETS = new Set(['<5k','5k-30k','30k-100k','100k+']);

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({error:'method'}) };

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch(e) { return { statusCode:400, headers:CORS_HEADERS, body:JSON.stringify({error:'bad_json'}) }; }

  const platform = body.platform;
  const business = body.business;
  const budgetTier = body.budgetTier;
  const reportedRoas = Number(body.reportedRoas);
  const verifiedRoas = Number(body.verifiedRoas);

  if (!PLATFORMS.has(platform) || !BUSINESSES.has(business) || !BUDGETS.has(budgetTier)) {
    return { statusCode:400, headers:CORS_HEADERS, body:JSON.stringify({error:'bad_enum'}) };
  }
  if (!Number.isFinite(reportedRoas) || reportedRoas <= 0 || reportedRoas > 100) {
    return { statusCode:400, headers:CORS_HEADERS, body:JSON.stringify({error:'bad_reported'}) };
  }
  if (!Number.isFinite(verifiedRoas) || verifiedRoas <= 0 || verifiedRoas > 100) {
    return { statusCode:400, headers:CORS_HEADERS, body:JSON.stringify({error:'bad_verified'}) };
  }

  const inflation = reportedRoas / verifiedRoas;
  const email = typeof body.email === 'string' ? body.email.slice(0, 200) : '';
  const note = typeof body.note === 'string' ? body.note.slice(0, 1000) : '';

  // 转发到 Netlify Forms（form name: benchmark-submission）
  // Netlify Forms accepts form-encoded at /
  const formBody = new URLSearchParams({
    'form-name': 'benchmark-submission',
    'platform': platform,
    'business': business,
    'budget_tier': budgetTier,
    'reported_roas': String(reportedRoas),
    'verified_roas': String(verifiedRoas),
    'inflation_ratio': inflation.toFixed(3),
    'email': email,
    'note': note,
    'submitted_at': new Date().toISOString(),
  }).toString();

  try {
    const resp = await fetch('https://abtest.chat/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody,
    });
    if (!resp.ok) {
      return { statusCode: 502, headers: CORS_HEADERS, body: JSON.stringify({error:'forward_failed', status: resp.status}) };
    }
  } catch (e) {
    return { statusCode: 502, headers: CORS_HEADERS, body: JSON.stringify({error:'forward_error'}) };
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      ok: true,
      your_inflation_ratio: Number(inflation.toFixed(2)),
      message: '已收到。审核通过后会进入 benchmark，区间会按平台/业务/预算档细分收紧。完整报告 ¥99 首发周半价 ¥49。',
    }),
  };
};
