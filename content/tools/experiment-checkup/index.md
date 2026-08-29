---
title: "实验能力自检 · 5 分钟定位你的 AB 实验段位"
date: 2026-08-29T00:00:00+08:00
description: "15 道单选题，5 分钟自测两件事：你现在真的需要实验体系吗（需求与变革就绪度），以及你的实验能力在 L1–L4 哪一段（分流 / 统计 / 指标 / 文化）。答完即时出段位与切入建议。"
keywords: ["AB实验", "实验平台", "实验自检", "实验成熟度", "多层正交", "CUPED", "实验诊断", "展博增长实验室"]
draft: false
comments: false
layout: false
show_breadcrumbs: false
---

<!-- Netlify Forms: hidden form to register experiment-checkup-inquiry at build time -->
<form name="experiment-checkup-inquiry" netlify netlify-honeypot="bot-field" hidden>
  <input name="demand_score" />
  <input name="capability_score" />
  <input name="level" />
  <input name="quadrant" />
  <input name="role" />
  <input name="company" />
  <input name="email" />
  <input name="wechat_id" />
  <textarea name="note"></textarea>
</form>

<style>
:root {
  --ec-bg: #0a1628;
  --ec-panel: #0f2240;
  --ec-card: #142a52;
  --ec-border: #1e3a6e;
  --ec-text: #e6edf7;
  --ec-muted: #8aa0c0;
  --ec-cyan: #22d3ee;
  --ec-amber: #f59e0b;
  --ec-red: #f87171;
  --ec-green: #34d399;
}
.ec-wrap { max-width: 860px; margin: 0 auto; padding: 28px 18px 60px; color: var(--ec-text); font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans GB", "PingFang SC", "Microsoft YaHei", sans-serif; line-height: 1.7; }
.ec-wrap h1 { color: #fff; font-size: 26px; margin: 0 0 6px; border: none; padding: 0; line-height: 1.35; }
.ec-wrap h3 { color: #fff; border: none; padding: 0; }
.ec-sub { color: var(--ec-muted); font-size: 14px; margin-bottom: 22px; }
.ec-card { background: var(--ec-card); border: 1px solid var(--ec-border); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
.ec-label { font-size: 13px; color: var(--ec-cyan); font-weight: 600; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
.ec-section-title { font-size: 17px; font-weight: 700; color: #fff; margin: 26px 0 4px; }
.ec-section-desc { font-size: 13px; color: var(--ec-muted); margin-bottom: 14px; }
.ec-q { margin-bottom: 18px; }
.ec-q-text { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 10px; }
.ec-q-text .ec-q-num { color: var(--ec-cyan); margin-right: 8px; }
.ec-opt { display: block; padding: 11px 14px; background: var(--ec-panel); border: 1px solid var(--ec-border); border-radius: 8px; font-size: 14px; cursor: pointer; margin-bottom: 8px; transition: all .15s; color: var(--ec-text); }
.ec-opt:hover { border-color: var(--ec-cyan); }
.ec-opt.on { background: rgba(34,211,238,0.12); border-color: var(--ec-cyan); }
.ec-opt input { margin-right: 10px; accent-color: var(--ec-cyan); }
.ec-progress { height: 6px; background: var(--ec-panel); border-radius: 999px; overflow: hidden; margin: 18px 0; }
.ec-progress-bar { height: 100%; width: 0; background: var(--ec-cyan); transition: width .2s; }
.ec-progress-text { font-size: 12px; color: var(--ec-muted); text-align: right; }
.ec-btn { display: inline-block; padding: 13px 28px; background: var(--ec-cyan); color: #07233a; border-radius: 8px; font-weight: 700; cursor: pointer; border: none; font-size: 15px; }
.ec-btn:hover { background: #4adef0; }
.ec-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.ec-btn-outline { background: transparent; color: var(--ec-cyan); border: 1px solid var(--ec-cyan); }
.ec-btn-outline:hover { background: rgba(34,211,238,0.1); }
.ec-hidden { display: none !important; }
.ec-bignum { font-size: 38px; font-weight: 700; color: var(--ec-cyan); margin: 4px 0 0; letter-spacing: -1px; }
.ec-bignum small { font-size: 14px; color: var(--ec-muted); font-weight: 400; margin-left: 6px; }
.ec-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 14px 0; }
.ec-row-item { background: var(--ec-panel); padding: 16px; border-radius: 8px; border: 1px solid var(--ec-border); }
.ec-row-item .k { font-size: 11px; color: var(--ec-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.ec-row-item .v { font-size: 18px; font-weight: 700; color: #fff; }
.ec-row-item .n { font-size: 12px; color: var(--ec-muted); margin-top: 4px; line-height: 1.5; }
.ec-verdict { padding: 20px; border-radius: 12px; margin: 18px 0; border: 1px solid; }
.ec-verdict.green { background: linear-gradient(135deg, rgba(52,211,153,0.15), rgba(52,211,153,0.04)); border-color: rgba(52,211,153,0.45); }
.ec-verdict.amber { background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.04)); border-color: rgba(245,158,11,0.45); }
.ec-verdict.red { background: linear-gradient(135deg, rgba(248,113,113,0.15), rgba(248,113,113,0.04)); border-color: rgba(248,113,113,0.45); }
.ec-verdict-tag { display: inline-block; padding: 3px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; margin-bottom: 8px; }
.ec-verdict.green .ec-verdict-tag { background: rgba(52,211,153,0.25); color: var(--ec-green); }
.ec-verdict.amber .ec-verdict-tag { background: rgba(245,158,11,0.25); color: var(--ec-amber); }
.ec-verdict.red .ec-verdict-tag { background: rgba(248,113,113,0.25); color: var(--ec-red); }
.ec-verdict-text { font-size: 16px; font-weight: 600; color: #fff; line-height: 1.5; }
.ec-advice { background: var(--ec-panel); border-left: 3px solid var(--ec-cyan); padding: 14px 16px; border-radius: 4px; margin: 12px 0; font-size: 14.5px; }
.ec-advice ol { margin: 0; padding-left: 20px; }
.ec-advice li { margin-bottom: 8px; }
.ec-advice li:last-child { margin-bottom: 0; }
.ec-steps { margin: 16px 0 0; padding: 0; list-style: none; counter-reset: step; }
.ec-steps li { counter-increment: step; padding: 12px 0 12px 42px; position: relative; border-bottom: 1px solid rgba(30,58,110,0.5); font-size: 14px; }
.ec-steps li:last-child { border-bottom: none; }
.ec-steps li::before { content: counter(step); position: absolute; left: 0; top: 12px; width: 28px; height: 28px; border-radius: 50%; background: rgba(34,211,238,0.15); color: var(--ec-cyan); font-weight: 700; font-size: 14px; display: flex; align-items: center; justify-content: center; }
.ec-steps strong { color: #fff; }
.ec-steps .ec-muted { color: var(--ec-muted); font-size: 13px; }
.ec-case { background: var(--ec-panel); border: 1px dashed var(--ec-border); border-radius: 10px; padding: 16px 18px; margin: 18px 0; }
.ec-case summary { cursor: pointer; font-size: 14px; font-weight: 700; color: var(--ec-cyan); }
.ec-case p, .ec-case li { font-size: 13.5px; color: var(--ec-text); }
.ec-case .ec-muted { color: var(--ec-muted); font-size: 13px; }
.ec-input { width: 100%; padding: 12px 14px; background: var(--ec-panel); border: 1px solid var(--ec-border); border-radius: 8px; color: var(--ec-text); font-size: 15px; margin-bottom: 8px; box-sizing: border-box; }
.ec-input:focus { outline: none; border-color: var(--ec-cyan); }
.ec-modal-mask { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
.ec-modal { background: var(--ec-card); border: 1px solid var(--ec-border); border-radius: 14px; max-width: 480px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 24px; position: relative; }
.ec-modal-close { position: absolute; top: 12px; right: 14px; background: none; border: none; color: var(--ec-muted); font-size: 22px; cursor: pointer; line-height: 1; }
.ec-modal-close:hover { color: #fff; }
.ec-modal h3 { color: #fff; margin: 0 0 4px; font-size: 18px; }
.ec-footer-note { font-size: 12px; color: var(--ec-muted); margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--ec-border); }
@media (max-width: 720px) {
  .ec-row2 { grid-template-columns: 1fr; }
  .ec-wrap h1 { font-size: 22px; }
}
</style>

<div class="ec-wrap">

<h1>你的 AB 实验能力在什么段位？</h1>
<div class="ec-sub">15 道单选 · 约 5 分钟。<br/>回答两件事：<strong>你现在真的需要实验体系吗</strong>（需求与变革就绪度），以及<strong>你的实验能力在哪一段</strong>（分流 / 统计 / 指标 / 文化）。能力低但没有痛点的团队，建平台是浪费——这份自检会直接告诉你。</div>

<div class="ec-card" id="ec-quiz-card">
  <div class="ec-progress"><div class="ec-progress-bar" id="ec-progress-bar"></div></div>
  <div class="ec-progress-text" id="ec-progress-text">已完成 0 / 15</div>
  <div id="ec-quiz"></div>
  <button class="ec-btn" id="ec-go" disabled onclick="showResult()">查看我的实验段位 →</button>
</div>

<div class="ec-card ec-hidden" id="ec-result-card">
  <div class="ec-label">你的自检结果</div>
  <div id="ec-result"></div>
</div>

<div class="ec-footer-note">
本自检由展博增长实验室提供，是实验体系合作的第一道门：<strong>免费自检 → 1v1 诊断 / 团队工作坊 → 两周实验平台诊断冲刺与平台共建</strong>。自检用于 5 分钟快速定位，不替代正式诊断——顾问进场后会启用六维 420 分的完整诊断框架（流量分流 / 实验管理 / 统计引擎 / 指标体系 / 工程架构 / 实验文化）。营销买量侧的数据可信度快检见 <a href="/tools/checkup/" style="color:var(--ec-cyan);">广告数据可信度快检</a>。问题反馈：zanhe@139.com。
</div>

</div>

<div class="ec-modal-mask ec-hidden" id="ec-modal" onclick="if(event.target===this)closeModal()">
<div class="ec-modal">
  <button class="ec-modal-close" onclick="closeModal()" aria-label="关闭">×</button>
  <h3>获取完整解读 · 预约 1v1 诊断</h3>
  <div class="ec-sub" style="margin-bottom:16px; color:var(--ec-muted); font-size:13.5px;">留下联系方式，我会在 24 小时内回复：发送你这份自检的逐项解读（每题对标行业标准），并沟通 1v1 诊断或团队工作坊的时间与形式。微信或邮件均可。</div>
  <input type="text" class="ec-input" id="ec-role" placeholder="你的角色（如 增长负责人 / 数据负责人 / 产品）" />
  <input type="text" class="ec-input" id="ec-company" placeholder="公司 / 团队（选填）" />
  <input type="email" class="ec-input" id="ec-email" placeholder="邮箱（用于接收完整解读）" />
  <input type="text" class="ec-input" id="ec-wechat" placeholder="微信号（选填，沟通更方便）" />
  <textarea class="ec-input" id="ec-note" placeholder="一句话描述你现在最想解决的实验问题（选填）" style="min-height:70px; font-weight:400;"></textarea>
  <button class="ec-btn" style="width:100%;" onclick="submitInquiry()">提交</button>
  <div id="ec-modal-result" style="margin-top:10px; font-size:13px;"></div>
</div>
</div>

<script>
const QUESTIONS = [
  { section: 'A', text: '团队为什么现在想做实验 / 建实验平台？', opts: [
    '没特别原因，觉得别人家有',
    '老板提了一句 / 看到别家在做',
    '有具体争议，但最后靠经验拍板',
    '有反复发生的具体痛点：结论互相矛盾、数值调整不敢上线、活动效果说不清' ] },
  { section: 'A', text: '上一次「数据结论和业务直觉冲突」是什么时候？', opts: [
    '从没发生 / 基本不看数据',
    '半年以前有过',
    '每月都有，最后听职级高的',
    '每周都有，而且已经造成过错误决策或资源浪费' ] },
  { section: 'A', text: '数据基础能不能支撑实验？（埋点、分流日志、指标看板）', opts: [
    '基本没有埋点',
    '有埋点，但口径经常对不上',
    '有数数 / GA / 自建 BI，看板基本可信',
    '埋点 + 分流日志 + 核心指标 T+1 自动化，口径有专人维护' ] },
  { section: 'A', text: '谁为实验结果负责、谁来推动落地？', opts: [
    '没人，研发兼职看看',
    '数据团队单方面在推',
    '有产品 / 运营愿意用，但推不动研发',
    '有业务负责人级 owner，研发 / 产品 / 数据三方都有人对接' ] },
  { section: 'A', text: '业务方愿意为实验体系投入什么？', opts: [
    '只想买个工具立刻见效',
    '希望一周就能出成果',
    '认可要 1–2 个季度，能出 1–2 个人',
    '认可长期建设，接受「先诊断后建设」的节奏' ] },
  { section: 'B', text: '你们同时在跑多少个实验、流量怎么分？', opts: [
    '几乎不做实验',
    '单实验，手工切流量',
    '多实验但单层互斥，流量经常不够用',
    '多层正交，流量可复用，并发 10+ 个实验不冲突' ] },
  { section: 'B', text: '怎么保证同一用户每次请求命中同一分组？', opts: [
    '随机分 / 不太清楚',
    '按用户 ID hash，但分流维度单一',
    'hash + 白名单 + 流量比例可调',
    '多维分流（用户 / 设备 / 请求 ID）+ 流量冲突检测' ] },
  { section: 'B', text: '实验从创建到上线的流程是？', opts: [
    '改代码硬编码',
    '配置中心手改，没有审核',
    '有管理后台，创建 / 审核 / 灰度基本齐全',
    '模板化创建 + 灰度发布 + 一键关停 + 推全审批' ] },
  { section: 'B', text: '实验权限和操作审计做到什么程度？', opts: [
    '谁都能改',
    '靠口头约定',
    '有权限分级',
    '权限分级 + 操作审计日志 + 配置可回滚，合规可追溯' ] },
  { section: 'B', text: '实验报告用什么统计方法？', opts: [
    '只看两组均值差',
    't 检验 + p 值',
    'p 值 + 置信区间 + 效应量',
    'Welch / Delta Method（比率型指标）+ CUPED 方差缩减' ] },
  { section: 'B', text: '怎么防止「读错实验结果」？', opts: [
    '不防，显著就推全',
    '知道要看样本量',
    '做 AA 测试 / SRM 样本比校验',
    'AA + SRM + 多重比较校正 + 序贯检验（实时监控不膨胀 α）' ] },
  { section: 'B', text: '指标口径谁说了算？', opts: [
    '各写各的 SQL',
    '有文档但没人维护',
    '核心指标统一定义、T+1 自动产出',
    '指标分级（北极星 / 护栏 / 过程）+ 评审 + 变更可追溯' ] },
  { section: 'B', text: '实验配置和分流日志怎么接入？', opts: [
    '业务方自己埋点',
    '有 SDK，但接入要研发排期',
    '多端 SDK + 分流日志自动上报',
    'SDK 增量更新 + 降级兜底 + 实时链路（Kafka/Flink）监控告警' ] },
  { section: 'B', text: '产品 / 运营能自助做实验吗？', opts: [
    '不能，全靠研发',
    '能提需求，但周期以周计',
    '能自助创建，看报告还得问数据',
    '自助创建 + 自助看报告，实验是产品迭代的默认动作' ] },
  { section: 'B', text: '实验结果不显著的时候，你们怎么决策？', opts: [
    '等于失败，不推全',
    '换个角度反复看，直到显著',
    '看效应量和业务判断',
    '看功效 / MDE / 效应量综合判断，且有复盘与季度盘点' ] },
];

const answers = new Array(QUESTIONS.length).fill(null);

const VERDICTS = {
  'high-L1': { color: 'green', tag: '最佳启动期', title: '痛点真实、能力待建——这是启动实验体系性价比最高的窗口。',
    advice: ['你的痛点已经被业务反复感知，但平台几乎是空白。不要一上来搭大平台：先在现有 BI / 数数类工具上做实验看板，选 1 个高频、争议大的场景（活动运营 / 数值调整 / 新手流程）打一个样板实验。',
             '样板验证后，按「分流正交 → 指标口径统一 → 统计引擎 → 权限治理」的顺序建，每一步都用业务结果换组织支持。',
             '建议带着这份自检做一次 1v1 诊断：重点判断痛点真伪、数据基础够不够、第一个样板场景选哪个。'] },
  'high-L2': { color: 'green', tag: '升级窗口', title: '已经尝到实验的甜头，瓶颈在分流架构和统计深度。',
    advice: ['单层互斥正在限制并发实验数——上多层正交（overlapping layers + 正交 hash）是第一优先级，流量可复用后并发量可以 ×3–5。',
             '统计侧补两块：比率型指标（CVR / ROI）用 Delta Method 做方差估计，否则假阳性风险很高；上 CUPED 利用实验前数据缩减方差，等效样本量 ×1.5–2。',
             '建议 1v1 诊断聚焦：域-层-桶切分方案、护栏指标体系、实验治理 SOP（评审 / 灰度 / 推全审批）。'] },
  'high-L34': { color: 'amber', tag: '局部深挖', title: '平台已经成熟，增量在高级方法和组织 ROI，而不是再建平台。',
    advice: ['你的短板不在基建，在前沿：因果推断工具（DID / 合成控制，覆盖无法随机的场景）、序贯检验（实时监控不膨胀 α）、Holdout 长期效应评估。',
             '如果在引入 AI 做决策，优先验证 Agent-ready Measurement：增量信号 vs 二元转化、置信度门禁、反馈延迟与决策窗口匹配。',
             '做一次实验体系 ROI 盘点（季度推全效果汇总），用数据决定下一步投在哪。'] },
  'mid-L1': { color: 'amber', tag: '先统一认知', title: '有想法但痛点还没坐实——先别建平台，先让团队对「实验解决什么」达成共识。',
    advice: ['当前最大的风险是：平台建了但业务不用。建议先做一次团队工作坊，把实验能解决 / 不能解决的业务问题讲透。',
             '从一个业务侧已经在吵的决策入手做最小实验，让结果说话——痛点是推动基建的基石，不是架构图。',
             '同时摸底数据基础：埋点和指标口径不齐的话，先补这一课，否则实验结论不可信。'] },
  'mid-L2': { color: 'amber', tag: '打样板换支持', title: '流程基本有了，但实验还没成为业务的默认动作。',
    advice: ['选 1 个高频场景（如活动运营、付费策略）做端到端样板：假设 → 分流 → 看板 → 复盘，让业务方完整尝到一次甜头。',
             '把样板沉淀成实验模板（预设指标组 + 分流方案），降低下一个团队的复用成本。',
             '用样板的业务收益去申请资源和并发空间，再推多层正交和统计升级。'] },
  'mid-L34': { color: 'green', tag: '维持与防错', title: '能力跑在需求前面——重点是少做错实验、少读错结果。',
    advice: ['不需要再加平台投入。把精力放在实验质量：实验前评审假设和功效，实验后强制复盘（无论成败）。',
             '警惕「显著但无实际收益」的推全：决策必须同时看效应量和业务量级，不只看 p 值。',
             '工作坊形式把方法论扩散到还没用起来的团队即可。'] },
  'low-L1': { color: 'red', tag: '先别建平台', title: '没有痛点的基建是摆设——你现在最该做的不是建实验平台。',
    advice: ['诚实地说：当前既没有高频的业务争议，也没有数据基础，这时候上平台大概率变成没人用的摆设。',
             '先做两件事：把埋点和核心指标看板补齐（数据可信是一切的前提）；在业务复盘里开始记录「哪些决策是拍脑袋的」。',
             '等出现反复发生、靠经验解决不了的争议时（通常伴随团队和投放规模增长），半年后再回来做这份自检。'] },
  'low-L2': { color: 'red', tag: '工具已超需求', title: '工具投入已经跑在业务需求前面。',
    advice: ['别再加功能、别再采购。把现有实验流程真正用起来：让核心业务迭代默认走实验。',
             '盘点一下：过去一个季度有多少实验、多少推全、多少带来了可量化收益？没有盘点就没有下一轮投入的依据。',
             '如果长期维持低实验量，说明瓶颈在业务节奏或组织，不在平台。'] },
  'low-L34': { color: 'amber', tag: '能力溢出', title: '平台能力领先于组织需求——沉淀方法论比加功能更有价值。',
    advice: ['你的基础设施已经足够，边际投入回报很低。重点转向实验文化：季度盘点、复盘分享、实验培训。',
             '考虑把成熟能力输出给兄弟团队 / 业务线，或作为 Agent 决策的测量底座。',
             '不需要外部平台建设支持；如需外部视角，做一次实验 ROI 盘点即可。'] },
};

function renderQuiz() {
  const host = document.getElementById('ec-quiz');
  let html = '';
  let qIndex = 0;
  ['A', 'B'].forEach(sec => {
    const qs = QUESTIONS.map((q, i) => ({ q, i })).filter(x => x.q.section === sec);
    html += '<div class="ec-section-title">' + (sec === 'A' ? 'A 段 · 你现在需要实验体系吗？（需求与变革就绪度）' : 'B 段 · 你的实验能力在什么段位？') + '</div>';
    html += '<div class="ec-section-desc">' + (sec === 'A' ? '测的是有没有推动实验体系的真实张力。理想汽车式的明确痛点，才是推动基建的基石。' : '六个维度（流量分流 / 实验管理 / 统计引擎 / 指标体系 / 工程架构 / 实验文化）压缩成 10 道最有区分度的题。') + '</div>';
    qs.forEach(({ q, i }) => {
      html += '<div class="ec-q" id="ec-q-' + i + '">';
      html += '<div class="ec-q-text"><span class="ec-q-num">' + (sec === 'A' ? 'A' + (qIndex + 1) : 'B' + (qIndex - 4)) + '</span>' + q.text + '</div>';
      q.opts.forEach((opt, oi) => {
        html += '<label class="ec-opt" id="ec-opt-' + i + '-' + oi + '" onclick="pick(' + i + ',' + oi + ')"><input type="radio" name="ec-q' + i + '" />' + opt + '</label>';
      });
      html += '</div>';
      qIndex++;
    });
  });
  host.innerHTML = html;
}

function pick(qi, oi) {
  answers[qi] = oi;
  for (let k = 0; k < 4; k++) {
    document.getElementById('ec-opt-' + qi + '-' + k).classList.toggle('on', k === oi);
  }
  const done = answers.filter(a => a !== null).length;
  document.getElementById('ec-progress-bar').style.width = (done / QUESTIONS.length * 100) + '%';
  document.getElementById('ec-progress-text').textContent = '已完成 ' + done + ' / ' + QUESTIONS.length;
  document.getElementById('ec-go').disabled = done < QUESTIONS.length;
}

function bandDemand(s) { return s <= 5 ? 'low' : s <= 10 ? 'mid' : 'high'; }
function levelCap(s) { return s <= 9 ? 'L1' : s <= 17 ? 'L2' : 'L34'; }
function levelLabel(s) { return s <= 9 ? 'L1 初始' : s <= 17 ? 'L2 规范' : s <= 24 ? 'L3 成熟' : 'L4 领先'; }
function demandLabel(b) { return b === 'low' ? '低' : b === 'mid' ? '中' : '高'; }

function showResult() {
  let demand = 0, cap = 0;
  answers.forEach((a, i) => { if (QUESTIONS[i].section === 'A') demand += a; else cap += a; });
  const db = bandDemand(demand), lc = levelCap(cap);
  const v = VERDICTS[db + '-' + lc];

  let html = '';
  html += '<div class="ec-row2">';
  html += '<div class="ec-row-item"><div class="k">需求与变革就绪度</div><div class="ec-bignum">' + demand + '<small>/ 15 · ' + demandLabel(db) + '</small></div><div class="n">痛点强度 × 数据基础 × owner × 资源预期</div></div>';
  html += '<div class="ec-row-item"><div class="k">实验能力段位</div><div class="ec-bignum">' + cap + '<small>/ 30 · ' + levelLabel(cap) + '</small></div><div class="n">分流 / 实验管理 / 统计 / 指标 / 工程 / 文化</div></div>';
  html += '</div>';

  html += '<div class="ec-verdict ' + v.color + '">';
  html += '<div class="ec-verdict-tag">' + v.tag + '</div>';
  html += '<div class="ec-verdict-text">' + v.title + '</div>';
  html += '</div>';

  html += '<div class="ec-advice"><div class="ec-label" style="margin-bottom:8px;">给你的三条建议</div><ol>';
  v.advice.forEach(a => { html += '<li>' + a + '</li>'; });
  html += '</ol></div>';

  html += '<div class="ec-label" style="margin-top:20px;">接下来可以怎么走</div>';
  html += '<ol class="ec-steps">';
  html += '<li><strong>拿完整解读</strong><div class="ec-muted">留邮箱 / 微信，获取这份自检的逐项对标（每道题你选了什么、行业标准是什么），24 小时内回复。</div></li>';
  html += '<li><strong>1v1 诊断 / 团队工作坊</strong><div class="ec-muted">带着自检结果过一遍你的真实场景，判断痛点真伪、数据基础和切入顺序；团队工作坊适合先统一「实验解决什么」的认知。</div></li>';
  html += '<li><strong>两周实验平台诊断冲刺 / 平台共建</strong><div class="ec-muted">需要正式进场时启用：流量域-层切分、统计引擎与护栏指标、实验治理 SOP。详见 <a href="/services/experiment-platform/" style="color:var(--ec-cyan);">实验平台搭建与诊断冲刺</a>。</div></li>';
  html += '</ol>';

  html += '<div style="margin-top:18px; display:flex; gap:10px; flex-wrap:wrap;">';
  html += '<button class="ec-btn" onclick="openModal(' + demand + ',' + cap + ',\'' + levelLabel(cap) + '\',\'' + v.tag + '\')">获取完整解读 · 预约 1v1 →</button>';
  html += '<button class="ec-btn ec-btn-outline" onclick="window.scrollTo({top:0,behavior:\'smooth\'})">重新测一次</button>';
  html += '</div>';

  html += '<details class="ec-case"><summary>📎 看一个真实案例：某棋牌 + 卡牌游戏大厂的自检画像（脱敏）</summary>';
  html += '<p class="ec-muted" style="margin-top:10px;">一次真实的 1v1 需求诊断沟通（2026-08），已隐去公司名与场景。</p>';
  html += '<p><strong>客户画像：</strong>国企背景游戏集团，核心业务为棋牌平台 + 长线卡牌 IP（300+ 角色、持续数值平衡性调优）+ 电竞 + 海外；高频活动运营、强合规披露（概率公示 / 权限审计）。</p>';
  html += '<p><strong>自检结果：</strong>需求强度 <strong>中偏上（约 10/15）</strong>，能力段位 <strong>L1 偏上（约 8/30）</strong>——典型的「最佳启动期但痛点未激活」。</p>';
  html += '<ul>';
  html += '<li>数据基础：采集与看板依托第三方分析平台（数数 / ThinkingData），规划路径是「先在数数上做看板和分析，再做独立分流」——路径务实。</li>';
  html += '<li>组织推力：中台负责人牵头，蓝图覆盖买量、BI、数据产品；但业务侧（产品 / 运营 / 数值策划）的实验诉求尚未被激活。</li>';
  html += '<li>认知短板：团队对实验的理解停留在「看看数据」，需要先回答「实验在业务收益层面解决什么」，而不是先谈架构。</li>';
  html += '</ul>';
  html += '<p><strong>给出的切入顺序：</strong>① 先在棋牌活动运营 / 卡牌数值调整中找 1 个高频争议场景做样板实验，让业务先尝到甜头；② 数数阶段先用其分析能力做实验看板与 AA 验证，不急于自建分流；③ 能力建设按「分流正交 → 指标口径 → 权限审计（国企合规刚需）→ 统计引擎 → 复盘体系」推进；④ AI 增强（假设生成 / 配置分发 / 分析 / 模拟）待平台有数据后再叠加。</p>';
  html += '<p style="color:var(--ec-cyan);"><strong>启示：</strong>能力 L1、需求中偏上的团队，平台不是不能建，而是要先用一个样板实验把业务痛点变成组织共识，再按「看板 → 分流 → 统计 → 治理」的顺序建——避免一上来就搭大平台。</p>';
  html += '</details>';

  document.getElementById('ec-result').innerHTML = html;
  document.getElementById('ec-result-card').classList.remove('ec-hidden');
  document.getElementById('ec-result-card').scrollIntoView({ behavior: 'smooth' });
}

let inquiryCtx = null;
function openModal(demand, cap, level, quadrant) {
  inquiryCtx = { demand, cap, level, quadrant };
  document.getElementById('ec-modal-result').innerHTML = '';
  document.getElementById('ec-modal').classList.remove('ec-hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('ec-modal').classList.add('ec-hidden');
  document.body.style.overflow = '';
}

async function submitInquiry() {
  const out = document.getElementById('ec-modal-result');
  const email = document.getElementById('ec-email').value.trim();
  const wechat = document.getElementById('ec-wechat').value.trim();
  if ((!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) && !wechat) {
    out.innerHTML = '<span style="color: var(--ec-red);">请留下有效邮箱或微信号，方便我回复你。</span>';
    return;
  }
  out.innerHTML = '<span style="color: var(--ec-muted);">提交中...</span>';
  const body = new URLSearchParams({
    'form-name': 'experiment-checkup-inquiry',
    'demand_score': inquiryCtx ? String(inquiryCtx.demand) : '',
    'capability_score': inquiryCtx ? String(inquiryCtx.cap) : '',
    'level': inquiryCtx ? inquiryCtx.level : '',
    'quadrant': inquiryCtx ? inquiryCtx.quadrant : '',
    'role': document.getElementById('ec-role').value.trim(),
    'company': document.getElementById('ec-company').value.trim(),
    'email': email,
    'wechat_id': wechat,
    'note': document.getElementById('ec-note').value.trim(),
  }).toString();
  try {
    const resp = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (!resp.ok) throw new Error('http_' + resp.status);
    out.innerHTML = '<span style="color: var(--ec-green);">已收到。我会在 24 小时内联系你，发送完整解读并沟通诊断 / 工作坊时间。</span>';
    setTimeout(closeModal, 2500);
  } catch (e) {
    out.innerHTML = '<span style="color: var(--ec-red);">提交失败，请直接邮件 zanhe@139.com。</span>';
  }
}

renderQuiz();
</script>
