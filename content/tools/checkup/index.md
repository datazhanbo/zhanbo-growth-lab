---
title: "广告数据可信度快检 · Benchmark + ROAS 判决"
date: 2026-08-22T00:00:00+08:00
description: "按 DTC / App / Game 三个方向，选品类与渠道，立即看到 ROAS / CPI / CPM / CTR / CVR / D1 / D7 / LTV 的当前基线和近 4 个季度趋势；再输入你后台的 ROAS，30 秒拿到数据可信度判决。"
keywords: ["ROAS benchmark", "CPI benchmark", "广告行业基准", "Meta CPM", "TikTok ROAS", "App CPI", "DTC ROAS", "增长数据诊断", "展博增长实验室"]
draft: false
comments: false
layout: false
show_breadcrumbs: false
---

<!-- Netlify Forms: hidden form to register benchmark-submission at build time -->
<form name="benchmark-submission" netlify netlify-honeypot="bot-field" hidden>
  <input name="platform" />
  <input name="business" />
  <input name="budget_tier" />
  <input name="os" />
  <input name="geo_tier" />
  <input name="reported_roas" />
  <input name="verified_roas" />
  <input name="inflation_ratio" />
  <input name="email" />
  <textarea name="note"></textarea>
</form>

<!-- Netlify Forms: hidden form to register report-order at build time -->
<form name="report-order" netlify netlify-honeypot="bot-field" hidden>
  <input name="product" />
  <input name="platform" />
  <input name="business" />
  <input name="budget_tier" />
  <input name="os" />
  <input name="geo_tier" />
  <input name="reported_roas" />
  <input name="email" />
  <input name="wechat_id" />
  <textarea name="note"></textarea>
</form>

<!-- Netlify Forms: hidden form for walkthrough inquiry -->
<form name="walkthrough-inquiry" netlify netlify-honeypot="bot-field" hidden>
  <input name="product" />
  <input name="platform" />
  <input name="business" />
  <input name="budget_tier" />
  <input name="os" />
  <input name="geo_tier" />
  <input name="reported_roas" />
  <input name="email" />
  <input name="wechat_id" />
  <input name="preferred_time" />
  <textarea name="pain_note"></textarea>
</form>

<style>
:root {
  --cu-bg: #0a1628;
  --cu-panel: #0f2240;
  --cu-card: #142a52;
  --cu-border: #1e3a6e;
  --cu-text: #e6edf7;
  --cu-muted: #8aa0c0;
  --cu-cyan: #22d3ee;
  --cu-amber: #f59e0b;
  --cu-red: #f87171;
  --cu-green: #34d399;
}
.cu-wrap { max-width: 960px; margin: 0 auto; padding: 28px 18px 60px; color: var(--cu-text); font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans GB", "PingFang SC", "Microsoft YaHei", sans-serif; line-height: 1.7; }
.cu-wrap h1 { color: #fff; font-size: 26px; margin: 0 0 6px; border: none; padding: 0; line-height: 1.35; }
.cu-wrap h3 { color: #fff; border: none; padding: 0; }
.cu-sub { color: var(--cu-muted); font-size: 14px; margin-bottom: 22px; }
.cu-card { background: var(--cu-card); border: 1px solid var(--cu-border); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
.cu-label { font-size: 13px; color: var(--cu-cyan); font-weight: 600; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
.cu-step { font-size: 12px; color: var(--cu-muted); margin-bottom: 6px; letter-spacing: 1px; }
.cu-dir-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.cu-dir { padding: 18px 16px; background: var(--cu-panel); border: 1px solid var(--cu-border); border-radius: 12px; cursor: pointer; transition: all .15s; }
.cu-dir:hover { border-color: var(--cu-cyan); transform: translateY(-1px); }
.cu-dir.on { background: rgba(34,211,238,0.12); border-color: var(--cu-cyan); }
.cu-dir-icon { font-size: 22px; margin-bottom: 6px; }
.cu-dir-name { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 4px; }
.cu-dir-desc { font-size: 12px; color: var(--cu-muted); line-height: 1.5; }
.cu-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.cu-chip { padding: 8px 14px; background: var(--cu-panel); border: 1px solid var(--cu-border); border-radius: 999px; font-size: 13.5px; cursor: pointer; color: var(--cu-text); transition: all .15s; }
.cu-chip:hover { border-color: var(--cu-cyan); }
.cu-chip.on { background: rgba(34,211,238,0.15); border-color: var(--cu-cyan); color: #fff; }
.cu-tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--cu-border); margin-bottom: 16px; flex-wrap: wrap; }
.cu-tab { padding: 10px 16px; cursor: pointer; font-size: 14px; color: var(--cu-muted); border-bottom: 2px solid transparent; transition: all .15s; }
.cu-tab:hover { color: var(--cu-text); }
.cu-tab.on { color: var(--cu-cyan); border-bottom-color: var(--cu-cyan); font-weight: 600; }
.cu-table { width: 100%; border-collapse: collapse; }
.cu-table th { text-align: left; font-size: 11px; color: var(--cu-muted); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; padding: 8px 10px; border-bottom: 1px solid var(--cu-border); }
.cu-table th.num, .cu-table td.num { text-align: right; font-variant-numeric: tabular-nums; }
.cu-table td { padding: 12px 10px; border-bottom: 1px solid rgba(30,58,110,0.5); font-size: 14px; vertical-align: middle; }
.cu-table tr:last-child td { border-bottom: none; }
.cu-metric-name { font-weight: 600; color: #fff; }
.cu-metric-unit { color: var(--cu-muted); font-size: 11px; font-weight: 400; margin-left: 4px; }
.cu-range { color: var(--cu-text); }
.cu-range-mid { color: var(--cu-cyan); font-weight: 700; }
.cu-qoq { font-size: 12px; padding: 2px 8px; border-radius: 999px; display: inline-block; min-width: 52px; text-align: center; }
.cu-qoq.up { color: var(--cu-green); background: rgba(52,211,153,0.12); }
.cu-qoq.down { color: var(--cu-red); background: rgba(248,113,113,0.12); }
.cu-qoq.flat { color: var(--cu-muted); background: rgba(138,160,192,0.1); }
.cu-spark { width: 110px; height: 32px; display: block; }
.cu-disclaimer-line { font-size: 12px; color: var(--cu-muted); margin-top: 12px; padding: 10px 12px; background: rgba(245,158,11,0.06); border-left: 3px solid var(--cu-amber); border-radius: 4px; }
.cu-loading { color: var(--cu-muted); font-size: 14px; padding: 24px; text-align: center; }
.cu-input-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.cu-input { flex: 1; min-width: 160px; padding: 12px 14px; background: var(--cu-panel); border: 1px solid var(--cu-border); border-radius: 8px; color: var(--cu-text); font-size: 16px; font-weight: 600; }
.cu-input:focus { outline: none; border-color: var(--cu-cyan); }
.cu-unit { color: var(--cu-muted); font-size: 13px; }
.cu-btn { display: inline-block; padding: 13px 28px; background: var(--cu-cyan); color: #07233a; border-radius: 8px; font-weight: 700; cursor: pointer; border: none; font-size: 15px; }
.cu-btn:hover { background: #4adef0; }
.cu-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.cu-btn-outline { background: transparent; color: var(--cu-cyan); border: 1px solid var(--cu-cyan); }
.cu-btn-outline:hover { background: rgba(34,211,238,0.1); }
.cu-verdict { padding: 20px; border-radius: 12px; margin: 18px 0; border: 1px solid; }
.cu-verdict.green { background: linear-gradient(135deg, rgba(52,211,153,0.15), rgba(52,211,153,0.04)); border-color: rgba(52,211,153,0.45); }
.cu-verdict.amber { background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.04)); border-color: rgba(245,158,11,0.45); }
.cu-verdict.red { background: linear-gradient(135deg, rgba(248,113,113,0.15), rgba(248,113,113,0.04)); border-color: rgba(248,113,113,0.45); }
.cu-verdict-tag { display: inline-block; padding: 3px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; margin-bottom: 8px; }
.cu-verdict.green .cu-verdict-tag { background: rgba(52,211,153,0.25); color: var(--cu-green); }
.cu-verdict.amber .cu-verdict-tag { background: rgba(245,158,11,0.25); color: var(--cu-amber); }
.cu-verdict.red .cu-verdict-tag { background: rgba(248,113,113,0.25); color: var(--cu-red); }
.cu-verdict-text { font-size: 16px; font-weight: 600; color: #fff; line-height: 1.5; }
.cu-bignum { font-size: 38px; font-weight: 700; color: var(--cu-cyan); margin: 10px 0 0; letter-spacing: -1px; }
.cu-bignum small { font-size: 14px; color: var(--cu-muted); font-weight: 400; margin-left: 6px; }
.cu-row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 14px 0; }
.cu-row-item { background: var(--cu-panel); padding: 14px; border-radius: 8px; border: 1px solid var(--cu-border); }
.cu-row-item .k { font-size: 11px; color: var(--cu-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.cu-row-item .v { font-size: 18px; font-weight: 700; color: #fff; }
.cu-row-item .n { font-size: 12px; color: var(--cu-muted); margin-top: 4px; line-height: 1.5; }
.cu-action { background: rgba(34,211,238,0.08); border-left: 3px solid var(--cu-cyan); padding: 14px 16px; border-radius: 4px; margin: 14px 0; font-size: 14.5px; }
.cu-action strong { color: var(--cu-cyan); }
.cu-flywheel { background: var(--cu-panel); border-radius: 10px; padding: 16px; margin: 14px 0; border: 1px dashed var(--cu-border); }
.cu-flywheel h4 { margin: 0 0 8px; font-size: 14px; color: #fff; }
.cu-flywheel p { margin: 0 0 10px; font-size: 13px; color: var(--cu-muted); }
.cu-pricing { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 18px; }
.cu-price-card { padding: 18px; border: 1px solid var(--cu-border); border-radius: 10px; background: var(--cu-panel); }
.cu-price { font-size: 28px; font-weight: 700; color: #fff; margin: 6px 0; }
.cu-price small { font-size: 13px; color: var(--cu-muted); font-weight: 400; }
.cu-footer-note { font-size: 12px; color: var(--cu-muted); margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--cu-border); }
.cu-hidden { display: none !important; }
.cu-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
.cu-field-label { font-size: 12px; color: var(--cu-muted); margin-bottom: 6px; }
.cu-modal-mask { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
.cu-modal { background: var(--cu-card); border: 1px solid var(--cu-border); border-radius: 14px; max-width: 480px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 24px; position: relative; }
.cu-modal-close { position: absolute; top: 12px; right: 14px; background: none; border: none; color: var(--cu-muted); font-size: 22px; cursor: pointer; line-height: 1; }
.cu-modal-close:hover { color: #fff; }
.cu-modal h3 { color: #fff; margin: 0 0 4px; font-size: 18px; }
.cu-modal .cu-sub { margin-bottom: 16px; }
.cu-qr-wrap { background: #fff; padding: 16px; border-radius: 10px; text-align: center; margin: 14px 0; }
.cu-qr-wrap img { width: 100%; max-width: 260px; height: auto; display: block; margin: 0 auto; }
.cu-qr-amount { color: var(--cu-amber); font-size: 22px; font-weight: 700; text-align: center; margin: 8px 0 0; }
.cu-qr-hint { font-size: 12px; color: var(--cu-muted); text-align: center; margin-top: 6px; }
.cu-pay-step { font-size: 13px; color: var(--cu-muted); margin: 14px 0 6px; }
.cu-pay-step strong { color: var(--cu-text); }
@media (max-width: 720px) {
  .cu-dir-grid { grid-template-columns: 1fr; }
  .cu-row3, .cu-pricing, .cu-grid2 { grid-template-columns: 1fr; }
  .cu-wrap h1 { font-size: 22px; }
  .cu-table th:nth-child(4), .cu-table td:nth-child(4) { display: none; }
}
</style>

<div class="cu-wrap">

<h1>你的广告数到底在行业哪个位置？</h1>
<div class="cu-sub">第一步：按方向 → 品类 → 平台（iOS / Android / Web）与地理分级（T1/T2/T3）→ 渠道，查看 ROAS / CPI / CPM / CTR / CVR / 留存 / LTV 的当前基线与近 4 个季度趋势。第二步：输入你后台的 ROAS，30 秒拿到数据可信度判决。</div>

<div class="cu-card">
<div class="cu-step">STEP 1 / 3</div>
<div class="cu-label">你的业务方向</div>
<div class="cu-dir-grid" id="cu-directions"></div>
</div>

<div class="cu-card cu-hidden" id="cu-cat-card">
<div class="cu-step">STEP 2 / 3</div>
<div class="cu-label">品类 / 类型</div>
<div class="cu-chips" id="cu-categories"></div>
</div>

<div class="cu-card cu-hidden" id="cu-slice-card">
<div class="cu-step">STEP 3 / 3</div>
<div class="cu-label" id="cu-slice-title">营销指标基线</div>
<div class="cu-field-label" id="cu-segment-label" style="margin-bottom:6px;">平台 × 地域切片</div>
<div class="cu-chips" id="cu-segments" style="margin-bottom:14px;"></div>
<div class="cu-tabs" id="cu-channels"></div>
<div id="cu-slice-body"><div class="cu-loading">正在拉取该品类的 benchmark 切片...</div></div>
<div class="cu-disclaimer-line" id="cu-slice-disclaimer"></div>
</div>

<div class="cu-card" id="cu-verdict-card" style="margin-top: 28px;">
<div class="cu-label">你后台报的 ROAS 是真的吗？</div>
<p style="margin:0 0 14px; color: var(--cu-muted); font-size:13px;">30 秒 · 不登录 · 不给账户权限。基于平台归因膨胀、业务保本 ROAS 与预算信号稳定性三个维度做判决。</p>

<div class="cu-grid2">
<div>
<div class="cu-field-label">投放平台</div>
<div class="cu-chips" id="cu-platform">
<div class="cu-chip" data-val="meta">Meta</div>
<div class="cu-chip" data-val="google">Google</div>
<div class="cu-chip" data-val="tiktok">TikTok</div>
<div class="cu-chip" data-val="meta_google">Meta+Google</div>
<div class="cu-chip" data-val="multi">3+ 平台</div>
</div>
</div>
<div>
<div class="cu-field-label">月广告预算</div>
<div class="cu-chips" id="cu-budget">
<div class="cu-chip" data-val="<5k">&lt; $5k</div>
<div class="cu-chip" data-val="5k-30k">$5k–30k</div>
<div class="cu-chip" data-val="30k-100k">$30k–100k</div>
<div class="cu-chip" data-val="100k+">$100k+</div>
</div>
</div>
</div>

<div class="cu-grid2">
<div>
<div class="cu-field-label">业务类型</div>
<div class="cu-chips" id="cu-business">
<div class="cu-chip" data-val="dtc_shopify">DTC 独立站</div>
<div class="cu-chip" data-val="dtc_amazon">亚马逊</div>
<div class="cu-chip" data-val="subscription_app">订阅 App</div>
<div class="cu-chip" data-val="ai_tool">AI 工具</div>
<div class="cu-chip" data-val="game_hybridcasual">混合休闲</div>
<div class="cu-chip" data-val="game_hypercasual">超休闲</div>
</div>
</div>
<div>
<div class="cu-field-label">操作系统 / 端</div>
<div class="cu-chips" id="cu-os">
<div class="cu-chip" data-val="ios">iOS</div>
<div class="cu-chip" data-val="android">Android</div>
<div class="cu-chip" data-val="web">Web</div>
</div>
<div class="cu-field-label" style="margin-top:14px;">平台后台 ROAS</div>
<input type="number" step="0.1" min="0.1" max="50" class="cu-input" id="cu-roas" placeholder="例如 3.2" style="width:100%;" />
</div>
</div>

<button class="cu-btn" id="cu-go" onclick="runCheckup()" disabled>查我的数据可信度 →</button>
<div id="cu-result"></div>
</div>

<div class="cu-footer-note">
想查的是「实验 / AB 测试能力」而不是广告投放数据？试试 <a href="/tools/experiment-checkup/" style="color: var(--cu-cyan);">实验能力自检（15 题 · 5 分钟定位段位）→</a><br/><br/>本工具由展博增长实验室提供。Benchmark 种子区间来自公开行业研究（MMP 年度报告、平台 earnings call、上市广告主财报口径）与展博 12 年广告技术经验，按 iOS/Android/Web 与 T1/T2/T3 地理分级切片；不代表统计验证的行业均值，正通过真实用户提交持续校准。T2、T3 iOS 等公开数据稀疏的格子暂未铺种子，等待用户提交飞轮收紧。所有数据按 $5k–$100k 月预算档位归一化。本工作室聚焦内容、电商、SaaS 与平台型业务；不承接游戏（含手游/休闲/中重度）行业相关咨询——游戏类型仅作为基准标签，不销售对应服务。问题反馈：zanhe@139.com。
</div>

</div>

<div class="cu-modal-mask cu-hidden" id="cu-modal" onclick="if(event.target===this)closeReportModal()">
<div class="cu-modal">
<button class="cu-modal-close" onclick="closeReportModal()" aria-label="关闭">×</button>
<h3>获取完整对账报告</h3>
<div class="cu-sub" style="margin-bottom:16px;">留下邮箱和最方便的联系方式，我会在 24 小时内回复你——确认需求、沟通形式与数据上传说明。</div>
<input type="email" class="cu-input" id="cu-order-email" placeholder="你的邮箱（用于接收报告）" style="margin-bottom:8px; width:100%;" />
<input type="text" class="cu-input" id="cu-order-wechat" placeholder="微信号（选填，沟通更方便）" style="margin-bottom:8px; width:100%;" />
<textarea class="cu-input" id="cu-order-note" placeholder="补充说明：你的业务/站点、最想先对哪个平台的账（选填）" style="margin-bottom:14px; width:100%; min-height:80px; font-weight:400;"></textarea>
<button class="cu-btn" style="width:100%;" onclick="submitReportOrder()">提交</button>
<div id="cu-order-result" style="margin-top:10px; font-size:13px;"></div>
</div>
</div>

<div class="cu-modal-mask cu-hidden" id="cu-wt-modal" onclick="if(event.target===this)closeWalkthroughModal()">
<div class="cu-modal">
<button class="cu-modal-close" onclick="closeWalkthroughModal()" aria-label="关闭">×</button>
<h3>1v1 对账 walkthrough · 预约</h3>
<div class="cu-sub" style="margin-bottom:16px;">留下联系方式和你最想解决的问题，我会在 24 小时内回复约时间——微信或邮件均可，会议链接再单独确认。</div>
<input type="email" class="cu-input" id="cu-wt-email" placeholder="你的邮箱" style="margin-bottom:8px; width:100%;" />
<input type="text" class="cu-input" id="cu-wt-wechat" placeholder="微信号（选填，沟通更方便）" style="margin-bottom:8px; width:100%;" />
<input type="text" class="cu-input" id="cu-wt-time" placeholder="方便的时间段（如 工作日晚 8 点后 / 周末上午）" style="margin-bottom:8px; width:100%;" />
<textarea class="cu-input" id="cu-wt-pain" placeholder="一句话描述你现在最痛的数据/对账问题（选填）" style="margin-bottom:14px; width:100%; min-height:80px; font-weight:400;"></textarea>
<button class="cu-btn" style="width:100%; background: var(--cu-amber); color:#2a1a00;" onclick="submitWalkthrough()">提交预约</button>
<div id="cu-wt-result" style="margin-top:10px; font-size:13px;"></div>
</div>
</div>

<script>
const DIR_META = {
  dtc:  { icon: '🛒', desc: 'Shopify 独立站，ROAS / CPM / CTR / CVR 基线' },
  app:  { icon: '📱', desc: '订阅 / 工具 / 社交 / AI，CPI / D1 / D7 / D30 ROAS / LTV·CAC' },
  game: { icon: '🎮', desc: '仅作基准标签，本工作室不承接游戏咨询' },
};

const state = {
  catalog: null,
  direction: null,
  category: null,
  segment: null,
  channel: null,
  slice: null,
  platform: null,
  business: null,
  budgetTier: null,
  os: null,
  roas: null,
};

async function loadCatalog() {
  try {
    const resp = await fetch('/api/benchmark-catalog', { method: 'POST' });
    if (!resp.ok) throw new Error('http_' + resp.status);
    state.catalog = await resp.json();
    renderDirections();
  } catch (e) {
    document.getElementById('cu-directions').innerHTML =
      '<div style="color: var(--cu-red); grid-column: 1/-1;">Benchmark 目录暂时拉取失败，请稍后再试或邮件 zanhe@139.com。</div>';
  }
}

function renderDirections() {
  const html = Object.entries(state.catalog.directions).map(([key, d]) => {
    const meta = DIR_META[key] || {};
    return '<div class="cu-dir" data-key="' + key + '">' +
      '<div class="cu-dir-icon">' + (meta.icon || '•') + '</div>' +
      '<div class="cu-dir-name">' + d.label + '</div>' +
      '<div class="cu-dir-desc">' + (meta.desc || '') + '</div>' +
      '</div>';
  }).join('');
  const root = document.getElementById('cu-directions');
  root.innerHTML = html;
  root.querySelectorAll('.cu-dir').forEach(el => {
    el.addEventListener('click', () => selectDirection(el.dataset.key));
  });
}

function selectDirection(key) {
  state.direction = key;
  state.category = null;
  state.segment = null;
  state.channel = null;
  state.slice = null;
  document.querySelectorAll('#cu-directions .cu-dir').forEach(el => {
    el.classList.toggle('on', el.dataset.key === key);
  });
  document.getElementById('cu-cat-card').classList.remove('cu-hidden');
  document.getElementById('cu-slice-card').classList.add('cu-hidden');
  renderCategories();
  document.getElementById('cu-cat-card').scrollIntoView({behavior:'smooth', block:'center'});
}

function renderCategories() {
  const cats = state.catalog.directions[state.direction].categories;
  const root = document.getElementById('cu-categories');
  root.innerHTML = Object.entries(cats).map(([key, c]) =>
    '<div class="cu-chip" data-key="' + key + '">' + c.label + '</div>'
  ).join('');
  root.querySelectorAll('.cu-chip').forEach(el => {
    el.addEventListener('click', () => selectCategory(el.dataset.key));
  });
}

function selectCategory(key) {
  state.category = key;
  state.segment = null;
  state.channel = null;
  state.slice = null;
  document.querySelectorAll('#cu-categories .cu-chip').forEach(el => {
    el.classList.toggle('on', el.dataset.key === key);
  });
  const card = document.getElementById('cu-slice-card');
  card.classList.remove('cu-hidden');
  document.getElementById('cu-slice-body').innerHTML = '<div class="cu-loading">选择切片后加载指标...</div>';
  document.getElementById('cu-channels').innerHTML = '';
  document.getElementById('cu-slice-disclaimer').textContent = '';
  document.getElementById('cu-slice-title').textContent = '营销指标基线';
  renderSegments();
  document.getElementById('cu-slice-card').scrollIntoView({behavior:'smooth', block:'center'});
}

function renderSegments() {
  const cat = state.catalog.directions[state.direction].categories[state.category];
  const segs = cat.segments || {};
  const root = document.getElementById('cu-segments');
  root.innerHTML = Object.entries(segs).map(([k, s]) =>
    '<div class="cu-chip" data-key="' + k + '">' + s.label + '</div>'
  ).join('');
  root.querySelectorAll('.cu-chip').forEach(el => {
    el.addEventListener('click', () => selectSegment(el.dataset.key));
  });
  const firstKey = Object.keys(segs)[0];
  if (firstKey) selectSegment(firstKey);
}

async function selectSegment(segKey) {
  state.segment = segKey;
  state.channel = null;
  state.slice = null;
  document.querySelectorAll('#cu-segments .cu-chip').forEach(el => {
    el.classList.toggle('on', el.dataset.key === segKey);
  });
  document.getElementById('cu-channels').innerHTML = '';
  document.getElementById('cu-slice-body').innerHTML = '<div class="cu-loading">正在拉取该切片的 benchmark...</div>';
  document.getElementById('cu-slice-disclaimer').textContent = '';

  const segMeta = state.catalog.directions[state.direction].categories[state.category].segments[segKey];
  syncOsFromSegment(segMeta);

  try {
    const resp = await fetch('/api/benchmark-slice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction: state.direction, category: state.category, segment: segKey }),
    });
    if (!resp.ok) throw new Error('http_' + resp.status);
    state.slice = await resp.json();
    state.channel = Object.keys(state.slice.channels)[0];
    renderSlice();
  } catch (e) {
    document.getElementById('cu-slice-body').innerHTML =
      '<div style="color: var(--cu-red); padding: 16px;">切片拉取失败，请稍后再试。</div>';
  }
}

function syncOsFromSegment(segMeta) {
  if (!segMeta) return;
  const osKey = segMeta.os;
  if (!osKey) return;
  state.os = osKey;
  document.querySelectorAll('#cu-os .cu-chip').forEach(c => {
    c.classList.toggle('on', c.dataset.val === osKey);
  });
  maybeEnable();
}

function renderSlice() {
  const s = state.slice;
  document.getElementById('cu-slice-title').textContent =
    s.direction.label + ' · ' + s.category.label + ' · ' + s.segment.label + ' · 营销指标基线（近 4 个季度）';
  document.getElementById('cu-slice-disclaimer').textContent = s.disclaimer || '';

  const tabs = document.getElementById('cu-channels');
  tabs.innerHTML = Object.entries(s.channels).map(([k, c]) =>
    '<div class="cu-tab" data-key="' + k + '">' + c.label + '</div>'
  ).join('');
  tabs.querySelectorAll('.cu-tab').forEach(el => {
    el.addEventListener('click', () => {
      state.channel = el.dataset.key;
      tabs.querySelectorAll('.cu-tab').forEach(t => t.classList.remove('on'));
      el.classList.add('on');
      renderMetricTable();
    });
  });
  const active = tabs.querySelector('[data-key="' + state.channel + '"]');
  if (active) active.classList.add('on');
  renderMetricTable();
}

function renderMetricTable() {
  const ch = state.slice.channels[state.channel];
  const labels = state.slice.metric_labels;
  const rows = Object.entries(ch.metrics).map(([mKey, m]) => {
    const meta = labels[mKey] || { label: mKey, unit: m.unit, decimals: 2, better: 'high' };
    const range = formatMetric(m.current.min, meta) + ' – ' + formatMetric(m.current.max, meta);
    const median = formatMetric(m.current.median, meta);
    const spark = sparkline(m.history.map(h => h.median), meta);
    const qoq = qoqTag(m.history, meta);
    const unitDisplay = (meta.unit === 'x') ? '×' : meta.unit;
    return '<tr>' +
      '<td><span class="cu-metric-name">' + meta.label + '</span><span class="cu-metric-unit">' + unitDisplay + '</span></td>' +
      '<td class="num cu-range">' + range + '</td>' +
      '<td class="num"><span class="cu-range-mid">' + median + '</span></td>' +
      '<td class="num">' + spark + '</td>' +
      '<td class="num">' + qoq + '</td>' +
      '</tr>';
  }).join('');

  document.getElementById('cu-slice-body').innerHTML =
    '<table class="cu-table"><thead><tr>' +
    '<th>指标</th><th class="num">行业区间</th><th class="num">中位数</th>' +
    '<th class="num">4 季度趋势</th><th class="num">QoQ</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table>';
}

function formatMetric(v, meta) {
  if (v == null || !Number.isFinite(v)) return '—';
  const dec = (meta.decimals != null) ? meta.decimals : 2;
  if (meta.unit === '%') return v.toFixed(dec) + '%';
  if (meta.unit === 'USD') return '$' + v.toFixed(dec);
  if (meta.unit === 'x') return v.toFixed(dec);
  return v.toFixed(dec);
}

function sparkline(values, meta) {
  if (!values || values.length < 2) return '';
  const w = 110, h = 32, pad = 3;
  const min = Math.min.apply(null, values);
  const max = Math.max.apply(null, values);
  const span = max - min || 1;
  const step = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = pad + i * step;
    const y = h - pad - ((v - min) / span) * (h - pad * 2);
    return x.toFixed(1) + ',' + y.toFixed(1);
  });
  const last = pts[pts.length - 1].split(',');
  const color = meta.better === 'low' ? '#f59e0b' : '#22d3ee';
  return '<svg class="cu-spark" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">' +
    '<polyline fill="none" stroke="' + color + '" stroke-width="1.8" points="' + pts.join(' ') + '" />' +
    '<circle cx="' + last[0] + '" cy="' + last[1] + '" r="2.5" fill="' + color + '" />' +
    '</svg>';
}

function qoqTag(history, meta) {
  if (!history || history.length < 2) return '<span class="cu-qoq flat">—</span>';
  const prev = history[history.length - 2].median;
  const curr = history[history.length - 1].median;
  if (!Number.isFinite(prev) || !Number.isFinite(curr) || prev === 0) return '<span class="cu-qoq flat">—</span>';
  const delta = (curr - prev) / prev * 100;
  if (Math.abs(delta) < 1.5) return '<span class="cu-qoq flat">持平</span>';
  const upIsGood = meta.better !== 'low';
  const isGood = upIsGood ? delta > 0 : delta < 0;
  const arrow = delta > 0 ? '▲' : '▼';
  const cls = isGood ? 'up' : 'down';
  return '<span class="cu-qoq ' + cls + '">' + arrow + ' ' + Math.abs(delta).toFixed(1) + '%</span>';
}

function bindChips(containerId, key) {
  document.querySelectorAll('#' + containerId + ' .cu-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#' + containerId + ' .cu-chip').forEach(c => c.classList.remove('on'));
      chip.classList.add('on');
      state[key] = chip.dataset.val;
      maybeEnable();
    });
  });
}
bindChips('cu-platform', 'platform');
bindChips('cu-business', 'business');
bindChips('cu-budget', 'budgetTier');
bindChips('cu-os', 'os');
document.getElementById('cu-roas').addEventListener('input', (e) => {
  const v = parseFloat(e.target.value);
  state.roas = Number.isFinite(v) && v > 0 ? v : null;
  maybeEnable();
});
function maybeEnable() {
  document.getElementById('cu-go').disabled = !(state.platform && state.business && state.budgetTier && state.os && state.roas);
}

function defaultOsForBusiness(b) {
  if (b && b.indexOf('dtc_') === 0) return 'web';
  return 'ios';
}

document.querySelectorAll('#cu-business .cu-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const b = chip.dataset.val;
    const want = defaultOsForBusiness(b);
    const isDtc = b.indexOf('dtc_') === 0;
    // 自动切换：未选过时；或从 DTC 切到非 DTC（web→ios）；或从非 DTC 切到 DTC（→web）
    if (!state.os || (isDtc && state.os !== 'web') || (!isDtc && state.os === 'web')) {
      state.os = want;
      document.querySelectorAll('#cu-os .cu-chip').forEach(c => {
        c.classList.toggle('on', c.dataset.val === want);
      });
      maybeEnable();
    }
  });
});

async function runCheckup() {
  const result = document.getElementById('cu-result');
  result.innerHTML = '<div class="cu-loading">正在比对 benchmark...</div>';
  try {
    const resp = await fetch('/api/checkup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        platform: state.platform, business: state.business,
        budgetTier: state.budgetTier, os: state.os, roas: state.roas,
      }),
    });
    if (!resp.ok) throw new Error('http_' + resp.status);
    const data = await resp.json();
    renderVerdict(data);
  } catch (e) {
    result.innerHTML = '<div class="cu-card" style="border-color: var(--cu-red);">判决服务暂时不可用，请稍后再试或邮件 zanhe@139.com。</div>';
  }
}

function renderVerdict(d) {
  const color = d.verdict.color;
  const labelMap = {green:'数据可用于方向性决策', amber:'信号模糊，不能拿来加预算', red:'这个 ROAS 有问题，先别加预算'};
  const platformName = {meta:'Meta',google:'Google',tiktok:'TikTok',meta_google:'Meta+Google',multi:'多平台'}[d.input.platform];
  const businessName = {dtc_shopify:'DTC 独立站',dtc_amazon:'亚马逊/平台电商',subscription_app:'订阅 App',ai_tool:'AI 工具',game_hybridcasual:'混合休闲游戏',game_hypercasual:'超休闲游戏'}[d.input.business];

  let html = '';
  html += '<div class="cu-verdict ' + color + '">';
  html += '<div class="cu-verdict-tag">' + (labelMap[color] || '判决') + '</div>';
  html += '<div class="cu-verdict-text">' + d.verdict.label + '</div>';
  html += '</div>';

  html += '<div class="cu-card" style="margin-top: 14px;">';
  html += '<div class="cu-label">真实 ROAS 估算</div>';
  html += '<p style="margin:0 0 6px; color: var(--cu-muted); font-size:13px;">把平台归因膨胀折算回来后，这个预算大概率落在这个区间：</p>';
  html += '<p class="cu-bignum">' + d.estimated_real_roas.low + ' – ' + d.estimated_real_roas.high + '<small>平台自报 ' + d.input.roas + '</small></p>';
  html += '<p style="margin:6px 0 0; color: var(--cu-muted); font-size:12px;">中位数估计 ' + d.estimated_real_roas.median + '。真实值还受受众、素材、转化回传配置影响——这只是「不要按平台数加预算」的第一道防线。</p>';
  html += '</div>';

  const osLabel = d.slice.os && d.slice.os.label ? d.slice.os.label : d.input.os;
  const attTag = d.slice.inflation.att_uplift_applied
    ? ' <span style="display:inline-block; margin-left:6px; padding:1px 8px; border-radius:999px; font-size:11px; background:rgba(245,158,11,0.18); color: var(--cu-amber);">iOS ATT uplift 已计入</span>'
    : '';
  html += '<div class="cu-row3">';
  html += '<div class="cu-row-item"><div class="k">' + platformName + ' · ' + osLabel + ' 归因膨胀' + attTag + '</div><div class="v">' + d.slice.inflation.min.toFixed(2) + '× – ' + d.slice.inflation.max.toFixed(2) + '×</div><div class="n">' + (d.slice.inflation.note || '') + '</div></div>';
  html += '<div class="cu-row-item"><div class="k">' + businessName + ' 保本 ROAS</div><div class="v">' + d.slice.industry.min + ' – ' + d.slice.industry.max + '</div><div class="n">' + d.slice.industry.note + '</div></div>';
  html += '<div class="cu-row-item"><div class="k">$' + d.input.budgetTier + ' 信号稳定</div><div class="v">' + d.slice.stability.days_to_stable + '</div><div class="n">' + d.slice.stability.note + '</div></div>';
  html += '</div>';

  html += '<div class="cu-action"><strong>今天就做：</strong>' + d.action + '</div>';

  html += '<div class="cu-flywheel" id="cu-flywheel">';
  html += '<h4>🔁 帮 benchmark 更准 · 也帮你自己下次判得更准</h4>';
  html += '<p>如果你已经做过一次对账（平台 ROAS vs GA4 / 后端 / MMP 真实收入），把两个数提交一下。每条真实数据都会让 ' + businessName + ' × ' + platformName + ' 这个切片的区间收紧。</p>';
  html += '<div class="cu-grid2" style="margin-bottom:10px;">';
  html += '<input type="number" step="0.1" class="cu-input" id="cu-reported" placeholder="平台自报 ROAS" value="' + d.input.roas + '" style="width:100%;" />';
  html += '<input type="number" step="0.1" class="cu-input" id="cu-verified" placeholder="对账后真实 ROAS" style="width:100%;" />';
  html += '</div>';
  html += '<input type="email" class="cu-input" id="cu-email" placeholder="邮箱（选填，区间更新后通知你）" style="margin-bottom:10px; width:100%;" />';
  html += '<button class="cu-btn cu-btn-outline" onclick="submitRoas()" style="width:100%;">提交我的对账数据</button>';
  html += '<div id="cu-submit-result" style="margin-top:10px; font-size:13px;"></div>';
  html += '</div>';

  html += '<h3 style="color:#fff; font-size:17px; margin-top:24px;">想更进一步</h3>';
  html += '<div class="cu-pricing">';
  html += '<div class="cu-price-card">';
  html += '<div style="font-size:13px; color: var(--cu-muted);">完整对账报告</div>';
  html += '<div style="font-size:18px; font-weight:700; color:#fff; margin:6px 0;">三源对账 · 48 小时返回</div>';
  html += '<div style="font-size:13px; color: var(--cu-muted); margin-bottom:14px;">你提交 7-14 天平台数 + GA4/后端数，返回：三源对账模板、差异区间归因、保本 ROAS 倒推、未来 30 天加/砍预算决策树。</div>';
  const geoTier = currentGeoTier();
  html += '<button class="cu-btn" style="width:100%;" onclick="openReportModal(' + "'" + d.input.platform + "','" + d.input.business + "','" + d.input.budgetTier + "','" + d.input.os + "','" + geoTier + "'," + d.input.roas + ')">留言获取</button>';
  html += '</div>';
  html += '<div class="cu-price-card" style="border-color: var(--cu-amber);">';
  html += '<div style="font-size:13px; color: var(--cu-amber);">1v1 对账 walkthrough</div>';
  html += '<div style="font-size:18px; font-weight:700; color:#fff; margin:6px 0;">拉真实数据 · 当场对账</div>';
  html += '<div style="font-size:13px; color: var(--cu-muted); margin-bottom:14px;">带你拉一次真实数据、当场对账、给 go/kill 判断。适合今晚就要决定加不加预算的团队。</div>';
  html += '<button class="cu-btn" style="width:100%; background: var(--cu-amber); color:#2a1a00;" onclick="openWalkthroughModal(\'' + d.input.platform + "','" + d.input.business + "','" + d.input.budgetTier + "','" + d.input.os + "','" + geoTier + "'," + d.input.roas + ')">留言预约沟通</button>';
  html += '</div>';
  html += '</div>';

  document.getElementById('cu-result').innerHTML = html;
}

let orderContext = null;

function openReportModal(platform, business, budgetTier, os, geoTier, roas) {
  orderContext = { platform, business, budgetTier, os, geoTier, roas };
  document.getElementById('cu-order-email').value = '';
  document.getElementById('cu-order-wechat').value = '';
  document.getElementById('cu-order-note').value = '';
  document.getElementById('cu-order-result').innerHTML = '';
  document.getElementById('cu-modal').classList.remove('cu-hidden');
  document.body.style.overflow = 'hidden';
}

function closeReportModal() {
  document.getElementById('cu-modal').classList.add('cu-hidden');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeReportModal();
});

async function submitReportOrder() {
  const out = document.getElementById('cu-order-result');
  const email = document.getElementById('cu-order-email').value.trim();
  const wechat = document.getElementById('cu-order-wechat').value.trim();
  const note = document.getElementById('cu-order-note').value.trim();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    out.innerHTML = '<span style="color: var(--cu-red);">请填有效邮箱。</span>';
    return;
  }
  out.innerHTML = '<span style="color: var(--cu-muted);">提交中...</span>';

  const body = new URLSearchParams({
    'form-name': 'report-order',
    'product': '完整对账报告',
    'platform': orderContext?.platform || '',
    'business': orderContext?.business || '',
    'budget_tier': orderContext?.budgetTier || '',
    'os': orderContext?.os || '',
    'geo_tier': orderContext?.geoTier || '',
    'reported_roas': orderContext?.roas != null ? String(orderContext.roas) : '',
    'email': email,
    'wechat_id': wechat,
    'note': note,
  }).toString();

  try {
    const resp = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (!resp.ok) throw new Error('http_' + resp.status);
    out.innerHTML = '<span style="color: var(--cu-green);">已收到。我会在 24 小时内通过邮件联系你，确认需求和下一步。</span>';
    setTimeout(closeReportModal, 2500);
  } catch (e) {
    out.innerHTML = '<span style="color: var(--cu-red);">提交失败，请直接邮件 zanhe@139.com。</span>';
  }
}

let wtContext = null;

function openWalkthroughModal(platform, business, budgetTier, os, geoTier, roas) {
  wtContext = { platform, business, budgetTier, os, geoTier, roas };
  document.getElementById('cu-wt-email').value = '';
  document.getElementById('cu-wt-wechat').value = '';
  document.getElementById('cu-wt-time').value = '';
  document.getElementById('cu-wt-pain').value = '';
  document.getElementById('cu-wt-result').innerHTML = '';
  document.getElementById('cu-wt-modal').classList.remove('cu-hidden');
  document.body.style.overflow = 'hidden';
}

function closeWalkthroughModal() {
  document.getElementById('cu-wt-modal').classList.add('cu-hidden');
  document.body.style.overflow = '';
}

async function submitWalkthrough() {
  const out = document.getElementById('cu-wt-result');
  const email = document.getElementById('cu-wt-email').value.trim();
  const wechat = document.getElementById('cu-wt-wechat').value.trim();
  const preferredTime = document.getElementById('cu-wt-time').value.trim();
  const pain = document.getElementById('cu-wt-pain').value.trim();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    out.innerHTML = '<span style="color: var(--cu-red);">请填有效邮箱，方便我回复你。</span>';
    return;
  }
  out.innerHTML = '<span style="color: var(--cu-muted);">提交中...</span>';
  const body = new URLSearchParams({
    'form-name': 'walkthrough-inquiry',
    'product': '1v1 对账 walkthrough',
    'platform': wtContext?.platform || '',
    'business': wtContext?.business || '',
    'budget_tier': wtContext?.budgetTier || '',
    'os': wtContext?.os || '',
    'geo_tier': wtContext?.geoTier || '',
    'reported_roas': wtContext?.roas != null ? String(wtContext.roas) : '',
    'email': email,
    'wechat_id': wechat,
    'preferred_time': preferredTime,
    'pain_note': pain,
  }).toString();
  try {
    const resp = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (!resp.ok) throw new Error('http_' + resp.status);
    out.innerHTML = '<span style="color: var(--cu-green);">已收到。我会在 24 小时内通过邮件/微信联系你约时间。</span>';
    setTimeout(closeWalkthroughModal, 2500);
  } catch (e) {
    out.innerHTML = '<span style="color: var(--cu-red);">提交失败，请直接邮件 zanhe@139.com。</span>';
  }
}

function currentGeoTier() {
  if (state.direction && state.category && state.segment) {
    const seg = state.catalog
      && state.catalog.directions[state.direction]
      && state.catalog.directions[state.direction].categories[state.category]
      && state.catalog.directions[state.direction].categories[state.category].segments[state.segment];
    if (seg && seg.geo) return seg.geo;
  }
  if (state.os === 'web') return 'cross';
  return 't1';
}

async function submitRoas() {
  const reported = parseFloat(document.getElementById('cu-reported').value);
  const verified = parseFloat(document.getElementById('cu-verified').value);
  const email = document.getElementById('cu-email').value || '';
  const out = document.getElementById('cu-submit-result');
  if (!Number.isFinite(reported) || !Number.isFinite(verified) || reported <= 0 || verified <= 0) {
    out.innerHTML = '<span style="color: var(--cu-red);">两个 ROAS 都需要填。</span>';
    return;
  }
  out.innerHTML = '<span style="color: var(--cu-muted);">提交中...</span>';
  try {
    const resp = await fetch('/api/submit-roas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        platform: state.platform, business: state.business, budgetTier: state.budgetTier,
        os: state.os || 'ios', geoTier: currentGeoTier(),
        reportedRoas: reported, verifiedRoas: verified, email,
      }),
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'fail');
    out.innerHTML = '<span style="color: var(--cu-green);">已收到。你的平台自报 / 真实 ≈ <strong>' + data.your_inflation_ratio + '×</strong>。审核通过后进入 benchmark。</span>';
  } catch (e) {
    out.innerHTML = '<span style="color: var(--cu-red);">提交失败，请邮件 zanhe@139.com。</span>';
  }
}

loadCatalog();
</script>
