/* ──────────────────────────────────────────────
   SR-Agents project page — interactions
   Leaderboard data is verbatim from Table 2 of
   the paper (arXiv:2604.24594). Update both data
   blocks together if numbers change.
   ────────────────────────────────────────────── */

// ─────────  Table 2: end-task performance (%)  ─────────
// One row per (model, method). Stars and bold/underline
// annotations from the paper are NOT encoded as numbers —
// best/second cells are computed dynamically per column.
const MODELS = [
  'Llama-3.1-8B',
  'Llama-3.3-70B',
  'Mistral-3.1-24B',
  'Qwen3-235B',
  'Qwen3-32B',
  'Qwen3-4B',
  'GLM-5.1',
  'GPT-5.4',
];

// Models for which only LLM Direct + Progressive Disclosure were run
// (frontier proprietary models used in RQ5 / RQ6 behavioral analyses).
const PARTIAL_MODELS = new Set(['GLM-5.1', 'GPT-5.4']);

const METHODS = [
  { id: 'direct',       label: 'LLM Direct',           kind: 'practical' },
  { id: 'oracle',       label: 'Oracle Skill',         kind: 'oracle'    },
  { id: 'injection',    label: 'Full-Skill Injection', kind: 'practical' },
  { id: 'select',       label: 'LLM Selection',        kind: 'practical' },
  { id: 'progressive',  label: 'Progressive Disclosure', kind: 'practical' },
];

// columns: theoremqa, logicbench, toolqa, champ, medcalc, bigcodebench
const RESULTS = {
  'Llama-3.1-8B': {
    direct:      [32.4, 54.6, 16.7, 22.4, 26.9, 32.3],
    oracle:      [49.4, 69.5, 23.3, 40.8, 62.0, 35.2],
    injection:   [36.5, 58.3, 13.6, 27.8, 36.7, 34.2],
    select:      [35.1, 53.8, 19.4, 24.7, 57.0, 32.1],
    progressive: [36.9, 50.0, 16.4, 25.1, 59.6, 31.4],
  },
  'Llama-3.3-70B': {
    direct:      [59.6, 60.5, 30.9, 56.5, 53.9, 45.0],
    oracle:      [68.5, 81.1, 48.7, 68.6, 79.7, 54.7],
    injection:   [60.1, 66.1, 35.0, 61.9, 59.5, 52.9],
    select:      [62.7, 69.7, 43.3, 58.7, 79.4, 50.4],
    progressive: [53.3, 65.3, 29.9, 54.3, 59.5, 45.7],
  },
  'Mistral-3.1-24B': {
    direct:      [49.3, 56.1, 29.2, 52.5, 49.6, 41.1],
    oracle:      [66.3, 78.6, 48.2, 66.8, 78.6, 54.0],
    injection:   [58.8, 57.2, 34.4, 59.6, 54.6, 45.6],
    select:      [59.0, 66.7, 42.6, 55.6, 76.3, 46.8],
    progressive: [54.8, 55.8, 27.1, 54.7, 62.6, 42.8],
  },
  'Qwen3-235B': {
    direct:      [61.6, 76.1, 36.4, 66.4, 58.2, 46.7],
    oracle:      [65.9, 86.6, 52.3, 75.8, 84.5, 57.0],
    injection:   [64.4, 72.8, 38.0, 68.6, 66.2, 50.4],
    select:      [66.8, 79.5, 45.4, 73.5, 82.5, 49.7],
    progressive: [68.1, 81.1, 36.9, 72.2, 77.1, 50.3],
  },
  'Qwen3-32B': {
    direct:      [57.4, 75.9, 35.0, 65.5, 53.9, 43.9],
    oracle:      [71.6, 86.6, 51.2, 70.9, 83.5, 55.2],
    injection:   [68.1, 70.5, 36.2, 70.4, 59.5, 49.0],
    select:      [69.3, 81.1, 44.1, 65.9, 82.5, 48.1],
    progressive: [64.9, 74.7, 35.5, 58.7, 71.1, 44.7],
  },
  'Qwen3-4B': {
    direct:      [50.7, 75.0, 25.6, 56.1, 22.0, 36.4],
    oracle:      [69.7, 85.1, 47.1, 70.9, 73.5, 45.5],
    injection:   [64.0, 69.1, 30.2, 68.6, 36.1, 41.5],
    select:      [63.1, 70.0, 39.0, 62.3, 65.7, 39.7],
    progressive: [52.7, 65.7, 26.7, 60.1, 45.0, 37.7],
  },
  // Frontier proprietary models. Only LLM Direct and Progressive
  // Disclosure are reported (used for RQ5 / RQ6 behavioral analyses
  // in the paper). Other rows are intentionally missing.
  'GLM-5.1': {
    direct:      [71.5, 68.9, 42.9, 74.4, 69.1, 50.4],
    progressive: [76.7, 78.3, 44.0, 70.9, 87.3, 54.6],
  },
  'GPT-5.4': {
    direct:      [75.6, 77.8, 41.3, 77.6, 79.6, 52.0],
    progressive: [79.1, 80.5, 46.9, 80.7, 87.8, 56.8],
  },
};

// ─────────  Table 3 (R@1, R@10 only)  ─────────
const RETRIEVERS = [
  { id: 'bm25',       label: 'BM25',       group: 'first' },
  { id: 'tfidf',      label: 'TF-IDF',     group: 'first' },
  { id: 'bge',        label: 'BGE',        group: 'first' },
  { id: 'contriever', label: 'Contriever', group: 'first' },
  { id: 'hybrid',     label: 'Hybrid',     group: 'first' },
  { id: 'r_8b',       label: 'Rerank · Llama-3.1-8B',  group: 'rerank' },
  { id: 'r_70b',      label: 'Rerank · Llama-3.3-70B', group: 'rerank' },
  { id: 'r_24b',      label: 'Rerank · Mistral3.1-24B',group: 'rerank' },
  { id: 'r_235b',     label: 'Rerank · Qwen3-235B',    group: 'rerank' },
  { id: 'r_32b',      label: 'Rerank · Qwen3-32B',     group: 'rerank' },
  { id: 'r_4b',       label: 'Rerank · Qwen3-4B',      group: 'rerank' },
];

// columns: theoremqa-R@1, theoremqa-R@10, logicbench-R@1, logicbench-R@10, ...
const RETRIEVAL = {
  bm25:       [57.2,80.7, 12.0,36.1,  7.0,55.1, 13.2,36.1, 29.3,69.2, 23.6,61.1],
  tfidf:      [41.4,68.8,  1.8,18.2,  7.0,35.0,  7.2,25.7, 37.5,71.4, 20.9,60.2],
  bge:        [66.8,86.1,  4.1,20.5, 32.2,83.4,  9.8,34.0, 41.4,70.1, 20.7,62.1],
  contriever: [52.1,75.6,  5.5,18.4, 21.2,42.7,  3.7,29.3, 34.9,66.9, 19.0,54.1],
  hybrid:     [57.2,90.0, 12.0,33.6,  7.0,83.5, 13.2,41.4, 29.3,67.8, 23.6,68.4],
  r_8b:       [58.8,83.7, 15.9,42.0, 25.7,66.4, 15.8,41.6, 86.0,91.5, 22.9,68.7],
  r_70b:      [76.0,88.6, 27.4,55.4, 51.0,76.9, 22.5,47.8, 89.5,92.5, 27.4,78.6],
  r_24b:      [74.2,89.0, 26.7,53.2, 53.9,76.6, 18.0,49.3, 91.1,92.5, 27.7,79.4],
  r_235b:     [75.4,88.8, 30.9,56.4, 56.4,76.2, 22.1,50.2, 92.3,92.5, 27.2,80.0],
  r_32b:      [77.4,88.8, 31.4,55.3, 43.7,74.8, 22.3,49.1, 91.2,92.4, 28.2,79.7],
  r_4b:       [69.5,87.1, 21.8,43.3, 39.9,70.8, 18.5,44.0, 85.9,91.2, 26.3,72.5],
};

// ─────────────────────────────────────────────────────────
// LEADERBOARD render — flat sortable table
// ─────────────────────────────────────────────────────────

const COLS = ['TheoremQA', 'LogicBench', 'ToolQA', 'CHAMP', 'MedCalc', 'BigCode'];
// dataset instance counts — used for case-weighted averaging across datasets
const DATASET_N = [747, 760, 1430, 223, 1100, 1140];
const TOTAL_N = DATASET_N.reduce((a, b) => a + b, 0);

function weightedAvg(arr) {
  let s = 0;
  for (let i = 0; i < arr.length; i++) s += arr[i] * DATASET_N[i];
  return s / TOTAL_N;
}

const LB_STATE = { sort: 'avg', dir: 'desc' };

function renderLeaderboard() {
  const metric = document.getElementById('lb-metric').value;
  const modelFilter = document.getElementById('lb-model').value;
  const tbody = document.querySelector('#lb-table tbody');
  tbody.innerHTML = '';

  // build flat row list
  const rows = [];
  for (const model of MODELS) {
    if (modelFilter !== 'all' && model !== modelFilter) continue;
    for (const meth of METHODS) {
      if (metric === 'practical' && meth.kind !== 'practical') continue;
      const vals = RESULTS[model][meth.id];
      if (!vals) continue;  // partial models skip missing methods
      rows.push({
        model,
        method: meth,
        vals,
        avg: weightedAvg(vals),
        frontier: PARTIAL_MODELS.has(model),
      });
    }
  }

  // sort
  const dir = LB_STATE.dir === 'desc' ? -1 : 1;
  const key = LB_STATE.sort;
  rows.sort((a, b) => {
    if (key === 'model') return dir * a.model.localeCompare(b.model);
    if (key === 'method') return dir * a.method.label.localeCompare(b.method.label);
    if (key === 'avg') return dir * (a.avg - b.avg);
    const ci = parseInt(key, 10);
    return dir * (a.vals[ci] - b.vals[ci]);
  });

  // Compute best and second-best PRACTICAL methods independently for each
  // model, matching the table description and avoiding cross-model highlights.
  const bestsByModel = new Map();
  for (const model of new Set(rows.map(r => r.model))) {
    const practicalRows = rows.filter(r =>
      r.model === model && r.method.kind === 'practical'
    );
    const rank = vals => {
      const sorted = [...new Set(vals)].sort((a, b) => b - a);
      return { best: sorted[0], second: sorted[1] };
    };
    bestsByModel.set(model, {
      cols: COLS.map((_, ci) => rank(practicalRows.map(r => r.vals[ci]))),
      avg: rank(practicalRows.map(r => r.avg)),
    });
  }

  // render
  rows.forEach((r, i) => {
    const tr = document.createElement('tr');
    if (r.method.kind === 'oracle') tr.classList.add('is-oracle');

    const tdModel = document.createElement('td');
    tdModel.className = 'lb-model';
    tdModel.textContent = r.model;
    tr.appendChild(tdModel);

    const tdMeth = document.createElement('td');
    tdMeth.className = 'lb-method';
    tdMeth.textContent = r.method.label;
    tr.appendChild(tdMeth);

    r.vals.forEach((v, ci) => {
      const td = document.createElement('td');
      td.className = 'num';
      td.textContent = v.toFixed(1);
      if (r.method.kind === 'practical') {
        const thresholds = bestsByModel.get(r.model).cols[ci];
        if (v === thresholds.best) td.classList.add('cell-best');
        else if (v === thresholds.second) td.classList.add('cell-second');
      }
      tr.appendChild(td);
    });

    const tdAvg = document.createElement('td');
    tdAvg.className = 'num lb-avg';
    tdAvg.textContent = r.avg.toFixed(1);
    if (r.method.kind === 'practical') {
      const thresholds = bestsByModel.get(r.model).avg;
      if (r.avg === thresholds.best) tdAvg.classList.add('cell-best');
      else if (r.avg === thresholds.second) tdAvg.classList.add('cell-second');
    }
    tr.appendChild(tdAvg);

    tbody.appendChild(tr);
  });
}

function setupLeaderboardSort() {
  const headers = [...document.querySelectorAll('#lb-table th.sortable')];

  const sortBy = th => {
      const key = th.dataset.sort;
      if (LB_STATE.sort === key) {
        LB_STATE.dir = LB_STATE.dir === 'desc' ? 'asc' : 'desc';
      } else {
        LB_STATE.sort = key;
        // sensible default direction per column
        LB_STATE.dir = (key === 'model' || key === 'method') ? 'asc' : 'desc';
      }
      headers.forEach(h => {
        h.classList.remove('active', 'desc', 'asc');
        h.removeAttribute('aria-sort');
      });
      th.classList.add('active', LB_STATE.dir);
      th.setAttribute('aria-sort', LB_STATE.dir === 'asc' ? 'ascending' : 'descending');
      renderLeaderboard();
  };

  headers.forEach(th => {
    th.addEventListener('click', () => sortBy(th));
    th.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      sortBy(th);
    });
  });
}

// ─────────────────────────────────────────────────────────
// RQ3 — Recall@10 heatmap (retrievers × datasets)
// ─────────────────────────────────────────────────────────

function renderRetrievalHeatmap() {
  const root = document.getElementById('chart-retrieval');
  if (!root) return;
  root.innerHTML = '';

  // Build a compact retriever roster: 5 first-stage + 1 best-rerank row.
  // We show Recall@1 (not @10) because R@1 spans the full 2-92 % range
  // and exposes how far retrieval still is from being "solved": even
  // the strongest reranker is below 32 % on LogicBench / CHAMP / BigCode.
  // For "Rerank ★" we take per-column max across all 6 LLM rerankers
  // (paper Table 3 lower block).
  const datasets = ['TheoremQA', 'LogicBench', 'ToolQA', 'CHAMP', 'MedCalc', 'BigCode'];
  const r1 = (id) => {
    // pull even indices (R@1) from RETRIEVAL data
    return [0, 2, 4, 6, 8, 10].map(i => RETRIEVAL[id][i]);
  };
  const rerankIds = ['r_8b', 'r_70b', 'r_24b', 'r_235b', 'r_32b', 'r_4b'];
  const rerankBest = datasets.map((_, ci) =>
    Math.max(...rerankIds.map(id => RETRIEVAL[id][ci * 2]))
  );

  const rows = [
    { label: 'BM25',         vals: r1('bm25') },
    { label: 'TF-IDF',       vals: r1('tfidf') },
    { label: 'BGE',          vals: r1('bge') },
    { label: 'Contriever',   vals: r1('contriever') },
    { label: 'Hybrid',       vals: r1('hybrid') },
    { label: 'Rerank ★',     vals: rerankBest, isRerank: true },
  ];

  const W = 560, H = 320;
  const padL = 96, padR = 14, padT = 38, padB = 36;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const cellW = plotW / datasets.length;
  const cellH = plotH / rows.length;

  // colour scale: light → dark accent. Lo/Hi based on min/max across visible data
  const allVals = rows.flatMap(r => r.vals);
  const lo = Math.min(...allVals);
  const hi = Math.max(...allVals);
  const colorFor = (v) => {
    const t = (v - lo) / (hi - lo); // 0..1
    // interpolate from very light bg to deep accent
    const r = Math.round(238 - t * (238 - 67));
    const g = Math.round(242 - t * (242 - 56));
    const b = Math.round(255 - t * (255 - 202));
    return `rgb(${r}, ${g}, ${b})`;
  };

  // per-dataset (column) best for framing
  const colMax = datasets.map((_, ci) => Math.max(...rows.map(r => r.vals[ci])));

  // x-axis: dataset labels (top)
  datasets.forEach((ds, ci) => {
    const cx = padL + ci * cellW + cellW / 2;
    svg('text', { x: cx, y: padT - 12, 'text-anchor': 'middle',
      'font-size': 11.5, 'font-weight': 600, fill: '#3d4159' }, root)
      .textContent = ds;
  });

  // y-axis: retriever labels
  rows.forEach((r, ri) => {
    const cy = padT + ri * cellH + cellH / 2;
    svg('text', { x: padL - 10, y: cy + 4, 'text-anchor': 'end',
      'font-size': 12, 'font-weight': r.isRerank ? 700 : 500,
      fill: r.isRerank ? '#b45309' : '#181a2c' }, root)
      .textContent = r.label;
  });

  // cells
  rows.forEach((r, ri) => {
    r.vals.forEach((v, ci) => {
      const x = padL + ci * cellW;
      const y = padT + ri * cellH;
      const isMax = (v === colMax[ci]);

      svg('rect', {
        x: x + 2, y: y + 2, width: cellW - 4, height: cellH - 4,
        fill: colorFor(v), rx: 4,
        stroke: isMax ? '#f59e0b' : 'rgba(0,0,0,0.05)',
        'stroke-width': isMax ? 2 : 1,
      }, root);

      // value
      const t = (v - lo) / (hi - lo);
      const textColor = t > 0.55 ? '#fff' : '#181a2c';
      svg('text', {
        x: x + cellW / 2, y: y + cellH / 2 + 4.5,
        'text-anchor': 'middle', 'font-size': 12,
        'font-weight': isMax ? 700 : 500,
        fill: textColor,
      }, root).textContent = v.toFixed(1);
    });
  });

  // colour-scale legend at bottom
  const legY = H - 14;
  const legW = 140, legH = 8;
  const legX = padL + plotW - legW;
  const gradId = 'heat-gradient';
  const defs = svg('defs', {}, root);
  const grad = svg('linearGradient', { id: gradId, x1: '0%', y1: '0%', x2: '100%', y2: '0%' }, defs);
  svg('stop', { offset: '0%', 'stop-color': colorFor(lo) }, grad);
  svg('stop', { offset: '100%', 'stop-color': colorFor(hi) }, grad);
  svg('rect', { x: legX, y: legY - legH + 2, width: legW, height: legH,
    fill: `url(#${gradId})`, rx: 2 }, root);
  svg('text', { x: legX - 6, y: legY + 3, 'text-anchor': 'end',
    'font-size': 11, fill: '#6c7088' }, root).textContent = `${lo.toFixed(0)}`;
  svg('text', { x: legX + legW + 6, y: legY + 3, 'text-anchor': 'start',
    'font-size': 11, fill: '#6c7088' }, root).textContent = `${hi.toFixed(0)}`;
  svg('text', { x: padL, y: legY + 3, 'text-anchor': 'start',
    'font-size': 11, fill: '#6c7088' }, root).textContent = 'Recall@1 (%)';
}

// ─────────────────────────────────────────────────────────
// SVG CHART HELPERS
// ─────────────────────────────────────────────────────────

const NS = 'http://www.w3.org/2000/svg';
function svg(tag, attrs = {}, parent = null) {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  if (parent) parent.appendChild(el);
  return el;
}

// Center a completed legend over its plot area. Re-run after web fonts settle
// so the alignment remains correct when the fallback font is swapped out.
function centerSvgGroup(group, left, right, y) {
  const center = () => {
    group.setAttribute('transform', `translate(0, ${y})`);
    const box = group.getBBox();
    group.setAttribute('transform', `translate(${(left + right - box.width) / 2 - box.x}, ${y})`);
  };
  center();
  document.fonts?.ready.then(center);
}

// ─────────────  Figure 2 — Distractor robustness (RQ2)
// 2×3 grid of mini line charts, one per model.
// Values from `scripts/plots/exp3_injection_curves.py` (case-weighted).

const DISTRACTOR = {
  'Qwen3-4B':       { inj: [61.6, 56.9, 53.6, 50.0], prog: [49.1, 46.9, 44.5, 44.1] },
  'Llama-3.1-8B':   { inj: [44.5, 40.2, 38.5, 34.9], prog: [42.1, 40.3, 38.8, 38.3] },
  'Mistral-3.1-24B':{ inj: [63.2, 58.7, 56.2, 52.4], prog: [52.2, 51.7, 50.6, 49.3] },
  'Qwen3-32B':      { inj: [67.2, 63.9, 62.2, 58.5], prog: [59.2, 58.1, 57.2, 56.0] },
  'Llama-3.3-70B':  { inj: [64.4, 57.9, 52.9, 50.8], prog: [54.9, 53.5, 52.0, 52.1] },
  'Qwen3-235B':     { inj: [67.5, 64.0, 62.7, 58.8], prog: [63.4, 63.0, 61.4, 60.4] },
};
const DISTRACTOR_ORDER = [
  'Qwen3-4B', 'Llama-3.1-8B', 'Mistral-3.1-24B',
  'Qwen3-32B', 'Llama-3.3-70B', 'Qwen3-235B',
];
const K_VALUES = [0, 2, 4, 8];

function renderDistractorChart() {
  const root = document.getElementById('chart-distractor');
  if (!root) return;
  root.innerHTML = '';

  const W = 720, H = 460;
  const cols = 3, rows = 2;
  const gapX = 26, gapY = 64;
  const padL = 38, padR = 14, padT = 28, padB = 64;
  const cellW = (W - padL - padR - (cols - 1) * gapX) / cols;
  const cellH = (H - padT - padB - (rows - 1) * gapY) / rows;

  const COLOR_INJ = '#4338ca';
  const COLOR_PROG = '#dc2626';

  DISTRACTOR_ORDER.forEach((model, idx) => {
    const r = Math.floor(idx / cols), c = idx % cols;
    const x0 = padL + c * (cellW + gapX);
    const y0 = padT + r * (cellH + gapY);

    const d = DISTRACTOR[model];
    const all = [...d.inj, ...d.prog];
    const lo = Math.floor((Math.min(...all) - 2) / 5) * 5;
    const hi = Math.ceil((Math.max(...all) + 2) / 5) * 5;

    const xScale = i => x0 + (i / (K_VALUES.length - 1)) * cellW;
    const yScale = v => y0 + cellH - ((v - lo) / (hi - lo)) * cellH;

    // grid + axes
    const ticks = 4;
    for (let t = 0; t <= ticks; t++) {
      const yv = lo + (hi - lo) * t / ticks;
      const yp = yScale(yv);
      svg('line', { x1: x0, y1: yp, x2: x0 + cellW, y2: yp,
        stroke: '#e6e3da', 'stroke-width': 1,
        'stroke-dasharray': t === 0 || t === ticks ? '0' : '3 4' }, root);
      svg('text', { x: x0 - 6, y: yp + 4, 'text-anchor': 'end',
        'font-size': 10, fill: '#6c7088' }, root).textContent = yv.toFixed(0);
    }

    // x ticks
    K_VALUES.forEach((k, i) => {
      const xp = xScale(i);
      svg('line', { x1: xp, y1: y0 + cellH, x2: xp, y2: y0 + cellH + 4,
        stroke: '#6c7088', 'stroke-width': 1 }, root);
      svg('text', { x: xp, y: y0 + cellH + 16, 'text-anchor': 'middle',
        'font-size': 10.5, fill: '#6c7088' }, root).textContent = k;
    });

    // title — set a bit further above the plot so it isn't clipped
    svg('text', { x: x0 + cellW / 2, y: y0 - 10, 'text-anchor': 'middle',
      'font-size': 12.5, 'font-weight': 600, fill: '#181a2c' }, root)
      .textContent = model;

    // injection line (solid)
    const injPath = d.inj.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(v)}`).join(' ');
    svg('path', { d: injPath, fill: 'none', stroke: COLOR_INJ,
      'stroke-width': 2.2, 'stroke-linejoin': 'round' }, root);

    // progressive line (dashed)
    const progPath = d.prog.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(v)}`).join(' ');
    svg('path', { d: progPath, fill: 'none', stroke: COLOR_PROG,
      'stroke-width': 2.0, 'stroke-linejoin': 'round',
      'stroke-dasharray': '5 4' }, root);

    // markers
    d.inj.forEach((v, i) => {
      svg('circle', { cx: xScale(i), cy: yScale(v), r: 3.2,
        fill: COLOR_INJ, stroke: '#fff', 'stroke-width': 1.2 }, root);
    });
    d.prog.forEach((v, i) => {
      svg('rect', { x: xScale(i) - 3, y: yScale(v) - 3, width: 6, height: 6,
        fill: COLOR_PROG, stroke: '#fff', 'stroke-width': 1.2 }, root);
    });
  });

  // shared x-axis label
  svg('text', { x: W / 2, y: H - 26, 'text-anchor': 'middle',
    'font-size': 12, fill: '#3d4159' }, root)
    .textContent = 'Number of distractor skills (k)';

  // legend
  const lg = svg('g', { transform: `translate(${W / 2 - 165}, ${H - 14})` }, root);
  svg('line', { x1: 0, y1: 0, x2: 22, y2: 0, stroke: COLOR_INJ,
    'stroke-width': 2.2 }, lg);
  svg('circle', { cx: 11, cy: 0, r: 3.2, fill: COLOR_INJ, stroke: '#fff', 'stroke-width': 1.2 }, lg);
  svg('text', { x: 28, y: 4, 'font-size': 12, fill: '#181a2c' }, lg)
    .textContent = 'Full Skill Injection';
  svg('line', { x1: 170, y1: 0, x2: 192, y2: 0, stroke: COLOR_PROG,
    'stroke-width': 2.0, 'stroke-dasharray': '5 4' }, lg);
  svg('rect', { x: 178, y: -3, width: 6, height: 6, fill: COLOR_PROG, stroke: '#fff', 'stroke-width': 1.2 }, lg);
  svg('text', { x: 198, y: 4, 'font-size': 12, fill: '#181a2c' }, lg)
    .textContent = 'Progressive Disclosure';
}

// ─────────────  Table 7 — Need-aware loading gap (RQ5)
// Δ Load Rate (gold-in-top50 minus gold-not), one bar per model.

const LOADING_DATA = [
  { model: 'Qwen3-4B',       delta:  4.9, frontier: false },
  { model: 'Llama-3.1-8B',   delta:  9.6, frontier: false },
  { model: 'Mistral-3.1-24B',delta: 13.1, frontier: false },
  { model: 'Qwen3-32B',      delta:  6.9, frontier: false },
  { model: 'Llama-3.3-70B',  delta: -4.2, frontier: false },
  { model: 'Qwen3-235B',     delta: 22.4, frontier: false },
  { model: 'GLM-5.1',        delta: 35.4, frontier: true  },
  { model: 'GPT-5.4',        delta: 33.0, frontier: true  },
];

function renderLoadingChart() {
  const root = document.getElementById('chart-loading');
  if (!root) return;
  root.innerHTML = '';

  // sort by delta (ascending so largest is at top after we flip y axis)
  const data = [...LOADING_DATA].sort((a, b) => b.delta - a.delta);

  const W = 560, H = 360;
  const padL = 112, padR = 24, padT = 16, padB = 44;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const xMin = -10, xMax = 40;
  const xScale = v => padL + ((v - xMin) / (xMax - xMin)) * plotW;
  const x0 = xScale(0);

  const barH = plotH / data.length - 6;

  // x grid lines
  const ticks = [-10, 0, 10, 20, 30, 40];
  ticks.forEach(t => {
    const xp = xScale(t);
    svg('line', { x1: xp, y1: padT, x2: xp, y2: padT + plotH,
      stroke: t === 0 ? '#3d4159' : '#e6e3da',
      'stroke-width': t === 0 ? 1.2 : 1,
      'stroke-dasharray': t === 0 ? '0' : '3 4' }, root);
    svg('text', { x: xp, y: padT + plotH + 16, 'text-anchor': 'middle',
      'font-size': 11, fill: '#6c7088' }, root)
      .textContent = (t > 0 ? '+' : '') + t;
  });

  // bars
  data.forEach((d, i) => {
    const yp = padT + i * (plotH / data.length) + 3;
    const color = d.frontier ? '#f59e0b' : (d.delta < 0 ? '#94a3b8' : '#4338ca');
    const barX = d.delta >= 0 ? x0 : xScale(d.delta);
    const barW = Math.abs(xScale(d.delta) - x0);

    svg('rect', { x: barX, y: yp, width: barW, height: barH,
      fill: color, rx: 3 }, root);

    // model label
    svg('text', { x: padL - 10, y: yp + barH / 2 + 4,
      'text-anchor': 'end', 'font-size': 12.5,
      'font-weight': d.frontier ? 600 : 500,
      fill: d.frontier ? '#b45309' : '#181a2c' }, root)
      .textContent = d.model;

    // value label
    const labelX = d.delta >= 0 ? xScale(d.delta) + 6 : xScale(d.delta) - 6;
    svg('text', { x: labelX, y: yp + barH / 2 + 4,
      'text-anchor': d.delta >= 0 ? 'start' : 'end',
      'font-size': 11.5, 'font-weight': 600,
      fill: d.frontier ? '#b45309' : '#3d4159' }, root)
      .textContent = (d.delta > 0 ? '+' : '') + d.delta.toFixed(1) + ' pp';
  });

  // x-axis label
  svg('text', { x: padL + plotW / 2, y: H - 8, 'text-anchor': 'middle',
    'font-size': 12, fill: '#3d4159' }, root)
    .textContent = 'Δ Load Rate (gold-covered − gold-absent), pp';

  // frontier annotation
  svg('text', { x: W - padR - 4, y: padT - 2, 'text-anchor': 'end',
    'font-size': 11, fill: '#b45309', 'font-weight': 600 }, root)
    .textContent = '★ Frontier models';
}

// ─────────────  RQ1 — Direct vs Best Practical vs Oracle uplift
// Dumbbell chart: each model gets a row with three dots connected.

function bestPractical(model) {
  const practicalIds = METHODS.filter(m => m.kind === 'practical').map(m => m.id);
  let best = -1;
  for (const id of practicalIds) {
    const vals = RESULTS[model][id];
    if (!vals) continue;  // partial models skip missing methods
    const a = weightedAvg(vals);
    if (a > best) best = a;
  }
  return best;
}

function renderUpliftChart() {
  const root = document.getElementById('chart-uplift');
  if (!root) return;
  root.innerHTML = '';

  // sort by oracle desc; partial models (GLM, GPT) lack Oracle so are skipped
  const data = MODELS
    .filter(m => RESULTS[m].oracle)
    .map(m => ({
      model: m,
      direct: weightedAvg(RESULTS[m].direct),
      practical: bestPractical(m),
      oracle: weightedAvg(RESULTS[m].oracle),
    }))
    .sort((a, b) => b.oracle - a.oracle);

  const W = 560, H = 340;
  const padL = 104, padR = 60, padT = 30, padB = 36;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const xMin = 29, xMax = 74;
  const xScale = v => padL + ((v - xMin) / (xMax - xMin)) * plotW;

  // x grid
  const ticks = [30, 40, 50, 60, 70];
  ticks.forEach(t => {
    const xp = xScale(t);
    svg('line', { x1: xp, y1: padT, x2: xp, y2: padT + plotH,
      stroke: '#e6e3da', 'stroke-width': 1, 'stroke-dasharray': '3 4' }, root);
    svg('text', { x: xp, y: padT + plotH + 16, 'text-anchor': 'middle',
      'font-size': 11, fill: '#6c7088' }, root).textContent = t;
  });

  const rowH = plotH / data.length;
  const COLOR_DIRECT = '#94a3b8';
  const COLOR_PRACTICAL = '#4338ca';
  const COLOR_ORACLE = '#f59e0b';

  data.forEach((d, i) => {
    const yp = padT + i * rowH + rowH / 2;

    // model label
    svg('text', { x: padL - 10, y: yp + 4, 'text-anchor': 'end',
      'font-size': 12.5, 'font-weight': 500, fill: '#181a2c' }, root)
      .textContent = d.model;

    // connecting line direct → practical (solid gray-blue gradient look)
    svg('line', { x1: xScale(d.direct), y1: yp, x2: xScale(d.practical), y2: yp,
      stroke: COLOR_PRACTICAL, 'stroke-width': 2.4, opacity: 0.55 }, root);
    // gap line practical → oracle (dashed orange - "remaining potential")
    svg('line', { x1: xScale(d.practical), y1: yp, x2: xScale(d.oracle), y2: yp,
      stroke: COLOR_ORACLE, 'stroke-width': 2.4, opacity: 0.55,
      'stroke-dasharray': '4 4' }, root);

    // dots
    svg('circle', { cx: xScale(d.direct), cy: yp, r: 5,
      fill: COLOR_DIRECT, stroke: '#fff', 'stroke-width': 1.5 }, root);
    svg('circle', { cx: xScale(d.practical), cy: yp, r: 5.5,
      fill: COLOR_PRACTICAL, stroke: '#fff', 'stroke-width': 1.5 }, root);
    svg('circle', { cx: xScale(d.oracle), cy: yp, r: 5.5,
      fill: COLOR_ORACLE, stroke: '#fff', 'stroke-width': 1.5 }, root);

    // oracle value at the end
    svg('text', { x: xScale(d.oracle) + 9, y: yp + 4,
      'text-anchor': 'start', 'font-size': 11, fill: '#b45309',
      'font-weight': 600 }, root)
      .textContent = d.oracle.toFixed(1);
  });

  // x label
  svg('text', { x: padL + plotW / 2, y: H - 4, 'text-anchor': 'middle',
    'font-size': 12, fill: '#3d4159' }, root)
    .textContent = 'Accuracy on SRA-Bench (%)';

  // legend
  const lg = svg('g', { transform: `translate(${padL - 4}, ${padT - 18})` }, root);
  const legendEntry = (x, color, label, shape='circle') => {
    svg('circle', { cx: x, cy: 0, r: 5, fill: color, stroke: '#fff', 'stroke-width': 1.2 }, lg);
    svg('text', { x: x + 8, y: 4, 'font-size': 11.5, fill: '#181a2c' }, lg).textContent = label;
  };
  legendEntry(0, COLOR_DIRECT, 'LLM Direct');
  legendEntry(90, COLOR_PRACTICAL, 'Best Practical');
  legendEntry(208, COLOR_ORACLE, 'Oracle Skill');
  centerSvgGroup(lg, padL, W - padR, padT - 18);
}

// ─────────────────────────────────────────────────────────
// RQ4 — Retrieval gain vs end-task gain (scatter)
// Data sourced from results/exp_summary.md (per-(model,dataset)).
// ─────────────────────────────────────────────────────────

// BM25 R@1 is identical across models (no model dependence).
const BM25_R1 = [57.2, 12.0, 7.0, 13.2, 29.3, 23.6];

// Per-model rerank R@1 on BM25 top-50 (Table 3 lower block).
const RERANK_R1 = {
  'Llama-3.1-8B':   [58.8, 15.9, 25.7, 15.8, 86.0, 22.9],
  'Llama-3.3-70B':  [76.0, 27.4, 51.0, 22.5, 89.5, 27.4],
  'Mistral-3.1-24B':[74.2, 26.7, 53.9, 18.0, 91.1, 27.7],
  'Qwen3-235B':     [75.4, 30.9, 56.4, 22.1, 92.3, 27.2],
  'Qwen3-32B':      [77.4, 31.4, 43.7, 22.3, 91.2, 28.2],
  'Qwen3-4B':       [69.5, 21.8, 39.9, 18.5, 85.9, 26.3],
};

// Per-model BM25-top1 end-task accuracy (Table 5 / RESULTS.injection).
const BM25_END = {
  'Llama-3.1-8B':   [36.5, 58.3, 13.6, 27.8, 36.7, 34.2],
  'Llama-3.3-70B':  [60.1, 66.1, 35.0, 61.9, 59.5, 52.9],
  'Mistral-3.1-24B':[58.8, 57.2, 34.4, 59.6, 54.6, 45.6],
  'Qwen3-235B':     [64.4, 72.8, 38.0, 68.6, 66.2, 50.4],
  'Qwen3-32B':      [68.1, 70.5, 36.2, 70.4, 59.5, 49.0],
  'Qwen3-4B':       [64.0, 69.1, 30.2, 68.6, 36.1, 41.5],
};

// Per-model BM25→Rerank end-task accuracy (Table 5 lower block).
const RERANK_END = {
  'Llama-3.1-8B':   [40.8, 60.4, 18.3, 28.3, 56.8, 36.1],
  'Llama-3.3-70B':  [64.3, 69.2, 40.3, 58.3, 77.2, 51.4],
  'Mistral-3.1-24B':[62.0, 64.1, 38.7, 52.0, 74.6, 48.4],
  'Qwen3-235B':     [66.3, 80.1, 45.2, 74.0, 82.2, 49.4],
  'Qwen3-32B':      [69.3, 78.3, 43.0, 65.9, 82.2, 49.0],
  'Qwen3-4B':       [65.5, 72.9, 36.7, 65.0, 66.2, 40.9],
};

const RQ4_MODEL_COLORS = {
  'Llama-3.1-8B':   '#0ea5e9',
  'Llama-3.3-70B':  '#0369a1',
  'Mistral-3.1-24B':'#d97706',
  'Qwen3-235B':     '#7c3aed',
  'Qwen3-32B':      '#4338ca',
  'Qwen3-4B':       '#94a3b8',
};

function renderRq4Chart() {
  const root = document.getElementById('chart-rq4');
  if (!root) return;
  root.innerHTML = '';

  const datasets = ['TheoremQA', 'LogicBench', 'ToolQA', 'CHAMP', 'MedCalc', 'BigCode'];
  const modelList = Object.keys(RERANK_R1);

  // Average ΔR@1 and Δend across 6 models per dataset.
  const data = datasets.map((ds, di) => {
    let sR = 0, sE = 0;
    for (const m of modelList) {
      sR += RERANK_R1[m][di] - BM25_R1[di];
      sE += RERANK_END[m][di] - BM25_END[m][di];
    }
    return { ds, retrieval: sR / modelList.length, endTask: sE / modelList.length };
  });

  const W = 560, H = 322;
  const padL = 58, padR = 16, padT = 30, padB = 46;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  // Y range covers a comfortable margin around min and max.
  const allVals = data.flatMap(d => [d.retrieval, d.endTask]);
  const lo = Math.min(0, ...allVals) - 4;
  const hi = Math.max(...allVals) + 6;
  const yScale = v => padT + plotH - ((v - lo) / (hi - lo)) * plotH;

  // y grid
  const yStep = 10;
  for (let yv = Math.ceil(lo / yStep) * yStep; yv <= hi; yv += yStep) {
    const yp = yScale(yv);
    svg('line', { x1: padL, y1: yp, x2: padL + plotW, y2: yp,
      stroke: yv === 0 ? '#3d4159' : '#e6e3da',
      'stroke-width': yv === 0 ? 1.2 : 1,
      'stroke-dasharray': yv === 0 ? '0' : '3 4' }, root);
    svg('text', { x: padL - 8, y: yp + 4, 'text-anchor': 'end',
      'font-size': 11, fill: '#6c7088' }, root)
      .textContent = (yv > 0 ? '+' : '') + yv;
  }

  // groups
  const groupW = plotW / datasets.length;
  const barW = (groupW - 14) / 2;
  const COLOR_R = '#4338ca';
  const COLOR_E = '#f59e0b';

  data.forEach((d, gi) => {
    const gx = padL + gi * groupW + 7;
    const y0 = yScale(0);

    const drawBar = (x, v, color) => {
      const yv = yScale(v);
      const yTop = v >= 0 ? yv : y0;
      const h = Math.abs(yv - y0);
      svg('rect', { x: x, y: yTop, width: barW, height: h,
        fill: color, rx: 2.5 }, root);
      // value label
      svg('text', {
        x: x + barW / 2,
        y: v >= 0 ? yTop - 4 : yTop + h + 12,
        'text-anchor': 'middle', 'font-size': 11,
        'font-weight': 600,
        fill: v >= 0 ? '#3d4159' : '#dc2626',
      }, root).textContent = (v > 0 ? '+' : '') + v.toFixed(1);
    };

    drawBar(gx, d.retrieval, COLOR_R);
    drawBar(gx + barW + 4, d.endTask, COLOR_E);

    // dataset label below x axis
    svg('text', { x: gx + barW + 2, y: H - 26,
      'text-anchor': 'middle', 'font-size': 11.5,
      'font-weight': 500, fill: '#181a2c' }, root)
      .textContent = d.ds;
  });

  // y label
  svg('text', { x: 14, y: padT + plotH / 2,
    transform: `rotate(-90 14 ${padT + plotH / 2})`,
    'text-anchor': 'middle', 'font-size': 12, fill: '#3d4159' }, root)
    .textContent = 'Mean gain from rerank (pp)';

  // legend at top
  const lg = svg('g', { transform: `translate(${padL}, ${padT - 14})` }, root);
  svg('rect', { x: 0, y: -7, width: 12, height: 8, fill: COLOR_R, rx: 2 }, lg);
  svg('text', { x: 16, y: 1, 'font-size': 12, fill: '#181a2c' }, lg)
    .textContent = 'Retrieval gain (ΔR@1)';
  svg('rect', { x: 170, y: -7, width: 12, height: 8, fill: COLOR_E, rx: 2 }, lg);
  svg('text', { x: 186, y: 1, 'font-size': 12, fill: '#181a2c' }, lg)
    .textContent = 'End-task gain (Δacc)';
  centerSvgGroup(lg, padL, W - padR, padT - 14);
}

// ─────────────────────────────────────────────────────────
// RQ6 — Need-aware loading (Table 8)
// Skill-loading rate on instances the model solves natively
// vs instances it doesn't. A need-aware agent would have wrong > correct.
// ─────────────────────────────────────────────────────────

const NEED_AWARE = [
  // model, load-rate-correct, load-rate-wrong, frontier
  { model: 'Qwen3-4B',        correct: 23.6, wrong: 20.8, frontier: false },
  { model: 'Llama-3.1-8B',    correct: 84.5, wrong: 69.4, frontier: false },
  { model: 'Mistral-3.1-24B', correct: 28.0, wrong: 32.1, frontier: false },
  { model: 'Qwen3-32B',       correct: 21.4, wrong: 21.0, frontier: false },
  { model: 'Llama-3.3-70B',   correct: 10.7, wrong: 10.1, frontier: false },
  { model: 'Qwen3-235B',      correct: 59.5, wrong: 56.0, frontier: false },
  { model: 'GLM-5.1',         correct: 45.0, wrong: 41.5, frontier: true  },
  { model: 'GPT-5.4',         correct: 34.4, wrong: 40.2, frontier: true  },
];

function renderRq6Chart() {
  const root = document.getElementById('chart-rq6');
  if (!root) return;
  root.innerHTML = '';

  const data = [...NEED_AWARE].sort((a, b) => b.correct - a.correct);

  const W = 560, H = 360;
  const padL = 112, padR = 56, padT = 28, padB = 44;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const xMin = 0, xMax = 100;
  const xScale = v => padL + ((v - xMin) / (xMax - xMin)) * plotW;

  const COLOR_CORRECT = '#f59e0b';  // can solve natively
  const COLOR_WRONG = '#7c3aed';    // cannot solve natively

  // grid
  [0, 25, 50, 75, 100].forEach(v => {
    const xp = xScale(v);
    svg('line', { x1: xp, y1: padT, x2: xp, y2: padT + plotH,
      stroke: '#e6e3da', 'stroke-width': 1, 'stroke-dasharray': '3 4' }, root);
    svg('text', { x: xp, y: padT + plotH + 16, 'text-anchor': 'middle',
      'font-size': 11, fill: '#6c7088' }, root).textContent = v + '%';
  });

  // rows
  const rowH = plotH / data.length;
  data.forEach((d, i) => {
    const yp = padT + i * rowH + rowH / 2;

    // model label
    svg('text', { x: padL - 10, y: yp + 4, 'text-anchor': 'end',
      'font-size': 12.5,
      'font-weight': d.frontier ? 600 : 500,
      fill: d.frontier ? '#b45309' : '#181a2c' }, root)
      .textContent = d.model + (d.frontier ? ' ★' : '');

    // connector
    svg('line', { x1: xScale(d.correct), y1: yp, x2: xScale(d.wrong), y2: yp,
      stroke: '#94a3b8', 'stroke-width': 2 }, root);

    // dots
    svg('circle', { cx: xScale(d.correct), cy: yp, r: 5.8,
      fill: COLOR_CORRECT, stroke: '#fff', 'stroke-width': 1.5 }, root);
    svg('circle', { cx: xScale(d.wrong), cy: yp, r: 5.8,
      fill: COLOR_WRONG, stroke: '#fff', 'stroke-width': 1.5 }, root);

    // delta label at the right end
    const delta = d.wrong - d.correct;
    const rightX = Math.max(xScale(d.correct), xScale(d.wrong)) + 10;
    svg('text', { x: rightX, y: yp + 4, 'text-anchor': 'start',
      'font-size': 11.5, 'font-weight': 600,
      fill: Math.abs(delta) >= 5 ? '#181a2c' : '#94a3b8' }, root)
      .textContent = (delta > 0 ? '+' : '') + delta.toFixed(1);
  });

  // axis label
  svg('text', { x: padL + plotW / 2, y: H - 8, 'text-anchor': 'middle',
    'font-size': 12, fill: '#3d4159' }, root)
    .textContent = 'Skill-loading rate';

  // legend
  const lg = svg('g', { transform: `translate(${padL}, ${padT - 14})` }, root);
  svg('circle', { cx: 0, cy: 0, r: 5, fill: COLOR_CORRECT, stroke: '#fff', 'stroke-width': 1.2 }, lg);
  svg('text', { x: 8, y: 4, 'font-size': 11.5, fill: '#181a2c' }, lg)
    .textContent = 'Skill-free correct (no help needed)';
  svg('circle', { cx: 240, cy: 0, r: 5, fill: COLOR_WRONG, stroke: '#fff', 'stroke-width': 1.2 }, lg);
  svg('text', { x: 248, y: 4, 'font-size': 11.5, fill: '#181a2c' }, lg)
    .textContent = 'Skill-free wrong (help needed)';
  centerSvgGroup(lg, padL, W - padR, padT - 14);
}

// ─────────────────────────────────────────────────────────
// COPY BIBTEX
// ─────────────────────────────────────────────────────────

function setupCopyButton() {
  const btn = document.getElementById('copy-bib');
  const pre = document.getElementById('bibtex');
  if (!btn || !pre) return;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(pre.textContent);
      btn.classList.add('copied');
      const span = btn.querySelector('span');
      const prev = span.textContent;
      span.textContent = 'Copied!';
      setTimeout(() => {
        btn.classList.remove('copied');
        span.textContent = prev;
      }, 1600);
    } catch (e) {
      // fallback: select the text
      const r = document.createRange();
      r.selectNodeContents(pre);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
    }
  });
}

// ─────────────────────────────────────────────────────────
// SMOOTH SCROLL — fixed-duration, ease-in-out, snappier
// than the browser default which scales linearly with distance.
// ─────────────────────────────────────────────────────────

function setupSmoothScroll() {
  const DURATION = 500;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length < 2 || href === '#top') {
        e.preventDefault();
        animateScroll(0, href);
        return;
      }
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight || 60;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      animateScroll(Math.max(0, targetY), href);
    });
  });

  function animateScroll(targetY, href) {
    if (reduceMotion.matches) {
      window.scrollTo(0, targetY);
      if (href) history.replaceState(null, '', href);
      return;
    }
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) return;
    const startTime = performance.now();
    function step(now) {
      const t = Math.min((now - startTime) / DURATION, 1);
      window.scrollTo(0, startY + distance * easeInOut(t));
      if (t < 1) requestAnimationFrame(step);
      else if (href) history.replaceState(null, '', href);
    }
    requestAnimationFrame(step);
  }
}

// ─────────────────────────────────────────────────────────
// NAVBAR — scrolled state, active section, mobile toggle
// ─────────────────────────────────────────────────────────

function setupNavbar() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const linksWrap = nav.querySelector('.nav-links');
  const links = [...linksWrap.querySelectorAll('a')];

  // scrolled background
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    updateActive();
  };

  // active section tracking
  const sectionIds = links.map(a => a.getAttribute('href').slice(1));
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  const updateActive = () => {
    const y = window.scrollY + 100;
    let activeId = null;
    for (const s of sections) {
      if (s.offsetTop <= y) activeId = s.id;
    }
    links.forEach(a => {
      const active = activeId && a.getAttribute('href') === '#' + activeId;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  };

  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };

  // mobile toggle
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  // close menu on link click (mobile)
  links.forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', e => {
    if (nav.classList.contains('open') && !nav.contains(e.target)) closeMenu();
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ─────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
  setupSmoothScroll();
  setupLeaderboardSort();
  renderLeaderboard();
  renderRetrievalHeatmap();
  renderDistractorChart();
  renderLoadingChart();
  renderUpliftChart();
  renderRq4Chart();
  renderRq6Chart();
  setupCopyButton();

  document.getElementById('lb-metric').addEventListener('change', renderLeaderboard);
  document.getElementById('lb-model').addEventListener('change', renderLeaderboard);
});
