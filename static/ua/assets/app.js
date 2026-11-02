(function () {
  'use strict';

  /* ---------------- 模块切换（hash 路由） ---------------- */
  const RAIL_ITEMS = document.querySelectorAll('.su-rail-item');
  const PANELS = document.querySelectorAll('.su-panel');

  function activate(name) {
    let found = false;
    PANELS.forEach((p) => {
      const on = p.dataset.suPanel === name;
      p.classList.toggle('is-active', on);
      if (on) found = true;
    });
    RAIL_ITEMS.forEach((b) => b.classList.toggle('is-active', b.dataset.suTarget === name));
    return found;
  }

  function syncFromHash() {
    const name = (location.hash || '#roi').slice(1);
    if (!activate(name)) activate('roi');
  }
  window.addEventListener('hashchange', syncFromHash);

  RAIL_ITEMS.forEach((btn) => {
    btn.addEventListener('click', () => { location.hash = btn.dataset.suTarget; });
  });
  document.querySelectorAll('[data-su-goto]').forEach((btn) => {
    btn.addEventListener('click', () => {
      location.hash = btn.dataset.suGoto;
      document.getElementById(btn.dataset.suGoto)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  syncFromHash();

  /* ---------------- 右侧 Tabs ---------------- */
  document.querySelectorAll('.su-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const root = tab.closest('.su-demo-right');
      const key = tab.dataset.suTab;
      root.querySelectorAll('.su-tab').forEach((t) => t.classList.toggle('is-active', t === tab));
      root.querySelectorAll('.su-tabpanel').forEach((p) =>
        p.classList.toggle('is-active', p.dataset.suTabpanel === key));
    });
  });

  /* ---------------- 热点讲解 modal ---------------- */
  const modal = document.getElementById('suModal');
  const modalTitle = document.getElementById('suModalTitle');
  const modalBody = document.getElementById('suModalBody');

  document.querySelectorAll('.su-hotspot').forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      modalTitle.textContent = dot.dataset.suTitle;
      modalBody.textContent = dot.dataset.suBody;
      modal.hidden = false;
    });
  });
  function closeModal() { modal.hidden = true; }
  document.getElementById('suModalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  /* ---------------- 截图灯箱 ---------------- */
  const lightbox = document.getElementById('suLightbox');
  const lightboxImg = document.getElementById('suLightboxImg');
  document.querySelectorAll('[data-su-lightbox] img').forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      if (typeof lightbox.showModal === 'function') lightbox.showModal();
      else lightbox.setAttribute('open', '');
    });
  });
  document.querySelector('.su-lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!modal.hidden) closeModal();
  });

  /* ---------------- Agent 对话回放（脚本化演示） ---------------- */
  const goalInput = document.getElementById('suGoal');
  const runBtn = document.getElementById('suRun');
  const resetBtn = document.getElementById('suReset');
  const stream = document.getElementById('suStream');

  document.querySelectorAll('.su-chip').forEach((chip) => {
    chip.addEventListener('click', () => { goalInput.value = chip.dataset.suGoal; });
  });

  const ICONS = { goal: '💭', reason: '🧠', observe: '👁', action: '✅', final: '🏁' };
  const NAMES = { goal: '目标', reason: '思考过程', observe: '观察 / 工具', action: '已执行', final: '结论' };

  function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }

  function el(tag, cls, html) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function addMsg(kind, text) {
    const empty = stream.querySelector('.su-stream-empty');
    if (empty) empty.remove();
    const row = el('div', 'su-msg su-msg-' + kind);
    row.appendChild(el('span', 'su-msg-ico su-msg-ico-' + kind, ICONS[kind]));
    const body = el('div', 'su-msg-body');
    body.appendChild(el('div', 'su-msg-name', NAMES[kind]));
    body.appendChild(el('div', 'su-msg-bubble', text.replace(/</g, '&lt;')));
    row.appendChild(body);
    stream.appendChild(row);
    stream.scrollTop = stream.scrollHeight;
    return row;
  }

  function addTyping() {
    const t = el('div', 'su-typing', '<i></i><i></i><i></i>');
    stream.appendChild(t);
    stream.scrollTop = stream.scrollHeight;
    return t;
  }

  function sleepAlive(ms, alive) {
    return new Promise((resolve, reject) => {
      setTimeout(() => (alive() ? resolve() : reject(new Error('cancelled'))), ms);
    });
  }

  // 两张审批卡：resolve(true) 批准 / false 驳回；重置时直接作废
  function askApproval({ level, title, code, impact }, alive) {
    return new Promise((resolve, reject) => {
      let decided = false;
      const timer = setInterval(() => {
        if (!alive()) { cleanup(); reject(new Error('cancelled')); }
      }, 300);
      function cleanup() { clearInterval(timer); decided = true; }
      const card = el('div', 'su-approval');
      card.innerHTML =
        '<div class="su-approval-title">⏳ 待审批 · ' + level + ' · ' + title + '</div>' +
        '<pre>' + code.replace(/</g, '&lt;') + '</pre>' +
        '<div class="su-hint">' + impact + '</div>' +
        '<div class="su-approval-actions">' +
        '<button class="su-btn su-btn-primary su-approve">批准执行</button>' +
        '<button class="su-btn su-btn-danger su-reject">驳回</button></div>';
      stream.appendChild(card);
      stream.scrollTop = stream.scrollHeight;
      card.querySelector('.su-approve').addEventListener('click', () => {
        if (decided) return;
        cleanup();
        card.querySelector('.su-approval-actions').remove();
        card.appendChild(el('div', 'su-approved-note', '✅ 已批准，动作进入执行队列（MOCK 账户，不产生真实花费）'));
        resolve(true);
      });
      card.querySelector('.su-reject').addEventListener('click', () => {
        if (decided) return;
        cleanup();
        card.querySelector('.su-approval-actions').remove();
        card.appendChild(el('div', 'su-approved-note', '已驳回，Agent 将放弃该动作并说明原因'));
        resolve(false);
      });
    });
  }

  // 完整目标脚本：止损（无对象）→ 加预算 → 换素材
  async function runFull(goal, alive) {
    const pause = (ms) => sleepAlive(ms, alive);
    addMsg('goal', '🎯 ' + goal);
    await pause(900);

    let t = addTyping();
    await pause(900); t.remove();
    addMsg('observe',
      '当前账户概览（最新一天）：\ncamp_uk_001 GB  ACTIVE  spend=531  roi=2.93\ncamp_us_002 US  ACTIVE  spend=779  roi=1.70\ncamp_ca_003 CA  ACTIVE  spend=592  roi=0.78\ncamp_jp_004 JP  ACTIVE  spend=455  roi=0.98');
    await pause(700);

    t = addTyping();
    await pause(1300); t.remove();
    addMsg('reason', '先按严格条件筛一遍：活跃 且 ROI < 0.5，避免凭概览印象误杀。');
    await pause(600);

    t = addTyping();
    await pause(1000); t.remove();
    addMsg('observe', 'filter_campaigns(status=ACTIVE, roi_d7<0.5)\n→ 无匹配 campaign：当前没有需要暂停止损的对象。');
    await pause(700);

    t = addTyping();
    await pause(1300); t.remove();
    addMsg('reason', '止损分支结束。ROI 最高的是 camp_uk_001（2.93），对它模拟加预算 20% 的 7 天影响，再决定是否提交审批。');
    await pause(600);

    t = addTyping();
    await pause(1200); t.remove();
    addMsg('observe',
      'simulate_impact(adjust_budget, camp_uk_001, +20%)\n预测·7天均值 ΔROI ≈ -0.03，ΔInstalls ≈ +18%\n预算增量在该 campaign 的回收弹性内，预计 ROI 仍 > 2.5。');
    await pause(700);

    const ok1 = await askApproval({
      level: 'L1',
      title: '给 camp_uk_001 加预算 20%',
      code: 'adjust_budget(\n  campaign_id = "camp_uk_001",   // GB · ROI 2.93\n  delta_pct    = +20,\n  mode         = "MOCK"\n)',
      impact: '预测影响仅用于展示，不进入策略学习；LIVE 账户默认同样需要此审批。'
    }, alive);
    if (ok1) {
      addMsg('action', 'adjust_budget 已执行（MOCK）。回采任务已登记：2h / 24h / 7d 后回填实测与归因 envelope。');
    } else {
      addMsg('reason', '已驳回加预算。保持预算不变，继续处理素材轮换。');
    }
    await pause(800);

    t = addTyping();
    await pause(1200); t.remove();
    addMsg('observe',
      'observe_adsets(camp_uk_001) → 3 个 AdSet：\nas1 roi=1.32  as2 roi=1.28  as3 roi=1.18\nas3 下素材 creative_017 近 3 日 CTR 下滑 31%，为轮换对象。');
    await pause(700);

    const ok2 = await askApproval({
      level: 'L0',
      title: '轮换表现最差素材（L0 可设为自动执行）',
      code: 'rotate_creative(\n  adset_id   = "camp_uk_001_as3",\n  from       = "creative_017",   // CTR 3d -31%\n  to         = "creative_022",   // 备选池最高分\n  mode       = "MOCK"\n)',
      impact: 'L0 动作在策略成熟后可免审批自动执行；当前导览统一先问一次。'
    }, alive);
    if (ok2) {
      addMsg('action', 'rotate_creative 已执行（MOCK）。新素材进入 24h 观察窗，若 CTR 未回升会自动回滚。');
    } else {
      addMsg('reason', '已驳回素材轮换，保留 creative_017 并转入「主动自治」观察名单。');
    }
    await pause(900);

    addMsg('final',
      (ok1 ? '① 止损：无 ROI<0.5 的活跃 campaign，未暂停任何对象；\n'
          : '① 加预算被驳回，预算维持不变；\n') +
      (ok1 ? '② 提量：camp_uk_001 预算 +20% 已执行，等待 2h/24h/7d 回采；\n' : '') +
      (ok2 ? '③ 素材：creative_017 → creative_022 已轮换；\n' : '③ 素材轮换被驳回，转观察名单；\n') +
      '所有动作均在 MOCK 环境完成，LIVE 需逐个人审。');
  }

  // 仅分析脚本
  async function runAnalysis(goal, alive) {
    const pause = (ms) => sleepAlive(ms, alive);
    addMsg('goal', '🎯 ' + goal);
    await pause(900);
    let t = addTyping();
    await pause(1100); t.remove();
    addMsg('observe', '已读取 4 个活跃 campaign 的 spend / roi / cpi 与素材表现（MOCK 账户）。');
    await pause(700);
    t = addTyping();
    await pause(1400); t.remove();
    addMsg('reason', '账户结构健康但分化明显：头部 ROI 2.93、尾部 0.78，预算仍平均分布，存在明显的再分配空间。');
    await pause(700);
    addMsg('final',
      '建议（仅诊断，未执行任何动作）：\n1. camp_uk_001 回收弹性最好，可小步加预算 10–20% 并观察 D3；\n2. camp_ca_003 ROI 0.78，先查素材 CTR 与 CPI，别急着暂停；\n3. 全账户 D30 高于 D3 较多，评估止损口径是否过度依赖 D3。\n需要我执行其中哪一条，直接说，L1/L2 动作会先给你审批卡。');
  }

  // 取消令牌：重置会作废旧回放，旧协程的所有追加/审批回调全部失效
  let runId = 0;
  let running = false;
  async function run() {
    if (running) return;
    running = true;
    runBtn.disabled = true;
    stream.innerHTML = '';
    const myId = ++runId;
    const alive = () => myId === runId;
    try {
      const goal = goalInput.value.trim();
      if (goal.includes('分析') || goal.includes('建议')) {
        await runAnalysis(goal, alive);
      } else {
        await runFull(goal, alive);
      }
    } catch (e) {
      if (e?.message !== 'cancelled') throw e;
    } finally {
      if (alive()) {
        running = false;
        runBtn.disabled = false;
      }
    }
  }

  runBtn.addEventListener('click', run);
  resetBtn.addEventListener('click', () => {
    runId++;
    running = false;
    runBtn.disabled = false;
    stream.innerHTML = '<div class="su-stream-empty">点击「启动 Agent」，观察它如何拆目标、调工具、请求审批。</div>';
  });
})();
