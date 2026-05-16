---
title: "Organized Group Behavior Simulation"
summary: "Simulating how organized groups make decisions — a new task, benchmark (GROVE), and structured analytical framework."
date: 2026-04-14
ShowToc: true
TocOpen: true
---

**Xinkai Zou\***, Yiming Huang\*, Zhuohang Wu, Jian Sha, Nan Huang, Longfei Yun, Jingbo Shang, Letian Peng

\*equal contribution

\[[Paper](https://arxiv.org/abs/2604.09874)\] \[[Code](https://github.com/jayzou3773/Organized-Group-Behavior-Simulation)\] \[[Dataset](https://huggingface.co/datasets/jayzou3773/GROVE)\] 

---
TL;DR: 
1. We propose the task of simulating organized group behaviors: Given a group facing a particular situation, the task predicts the decision it would make.
2. We also present **GROVE**, a benchmark for this task collected from the real-world data (Wikipedia and TechCrunch) containing 44 entities. 
3. We propose a **framework** converting collective decision-making events into interpretable, adaptive, and traceable behavioral models, outperforming summarization and retrieval-based baselines. The approach includes an adapter mechanism for time-aware evolution and group-aware transfer, plus traceable evidence nodes grounding each decision rule in originating historical events.
4. Analysis on **temporal behavior drift** and **cross-group similarity as well as behavior transfer**


### Interactive Demo

Explore how the our framework works on real entities. Select an entity below to load its interactive behavior model visualization.

<div style="margin:16px 0;">
<style>
#demo-buttons button{padding:10px 6px;border-radius:10px;border:2px solid;font-size:10px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;transition:all .15s;}
#demo-buttons button:hover{transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,0.1);}
#demo-buttons button img{width:22px;height:22px;}
</style>
<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:14px;" id="demo-buttons">
<button onclick="switchDemo('/projects/group-behavior-simulation/openai_tc.html',this)" data-color="#412991" data-icon="_openai" style="border-color:#412991;background:#412991;color:#fff;"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z'/%3E%3C/svg%3E" alt="">OpenAI</button>
<button onclick="switchDemo('/projects/group-behavior-simulation/apple_tc.html',this)" data-color="#000000" data-icon="apple" style="border-color:#000;background:#fff;color:#000;"><img src="https://cdn.simpleicons.org/apple/000000" alt="">Apple</button>
<button onclick="switchDemo('/projects/group-behavior-simulation/meta_tc.html',this)" data-color="#0668E1" data-icon="meta" style="border-color:#0668E1;background:#fff;color:#0668E1;"><img src="https://cdn.simpleicons.org/meta/0668E1" alt="">Meta</button>
<button onclick="switchDemo('/projects/group-behavior-simulation/cbs_wiki.html',this)" data-color="#033963" data-icon="cbs" style="border-color:#033963;background:#fff;color:#033963;"><img src="https://cdn.simpleicons.org/cbs/033963" alt="">CBS</button>
<button onclick="switchDemo('/projects/group-behavior-simulation/chrysler_wiki.html',this)" data-color="#000080" data-icon="chrysler" style="border-color:#000080;background:#fff;color:#000080;"><img src="https://cdn.simpleicons.org/chrysler/000080" alt="">Chrysler</button>
<button onclick="switchDemo('/projects/group-behavior-simulation/united_airlines_wiki.html',this)" data-color="#005DAA" data-icon="unitedairlines" style="border-color:#005DAA;background:#fff;color:#005DAA;"><img src="https://cdn.simpleicons.org/unitedairlines/005DAA" alt="">United</button>
</div>
<iframe id="demo-frame" src="/projects/group-behavior-simulation/openai_tc.html" style="width:100%;height:520px;border:1px solid #e6e2d6;border-radius:12px;background:#fafaf7;" loading="lazy"></iframe>
<p style="font-size:11px;color:#5d6470;text-align:right;margin-top:6px;"><a id="demo-fullscreen" href="/projects/group-behavior-simulation/openai_tc.html" target="_blank">Open fullscreen →</a></p>
</div>

<details style="margin:8px 0 16px;font-size:13px;color:#5d6470;cursor:pointer;">
<summary style="font-weight:600;color:var(--ink,#1a1d23);">How to use</summary>
<ul style="margin-top:8px;line-height:1.8;">
<li><b>Navigate:</b> drag to pan, scroll to zoom in/out</li>
<li><b>Switch views:</b> top-left controls toggle between base CDT and adapted trees (<span style="color:#d97706;">orange</span> = modify, <span style="color:#2e8b57;">green</span> = add, <span style="color:#dc2626;">red</span> = delete)</li>
<li><b>Inspect:</b> click a node to see its statements; click a statement to see supporting / opposing events</li>
<li><b>Cases:</b> purple nodes compare base vs adapted predictions on a single event</li>
<li><b>Collapse:</b> double-click a node to collapse / expand its sub-tree</li>
</ul>
</details>

<script>
var openaiSvg = function(color) {
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='" + encodeURIComponent(color) + "'%3E%3Cpath d='M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z'/%3E%3C/svg%3E";
};
function switchDemo(url, btn) {
  document.getElementById('demo-frame').src = url;
  document.getElementById('demo-fullscreen').href = url;
  var btns = document.getElementById('demo-buttons').querySelectorAll('button');
  btns.forEach(function(b) {
    var c = b.getAttribute('data-color');
    var icon = b.getAttribute('data-icon');
    b.style.background = '#fff';
    b.style.color = c;
    if (icon === '_openai') { b.querySelector('img').src = openaiSvg(c); }
    else { b.querySelector('img').src = 'https://cdn.simpleicons.org/' + icon + '/' + c.replace('#',''); }
  });
  var bc = btn.getAttribute('data-color');
  var activeIcon = btn.getAttribute('data-icon');
  btn.style.background = bc;
  btn.style.color = '#fff';
  if (activeIcon === '_openai') { btn.querySelector('img').src = openaiSvg('white'); }
  else { btn.querySelector('img').src = 'https://cdn.simpleicons.org/' + activeIcon + '/white'; }
}
</script>

---

### Motivation

Organized groups — corporations, governments, institutions — make collective decisions that shape markets, policies, and societies. If we can simulate how a group behaves in a given situation, we can forecast and plan without real-world trial-and-error.

Concrete examples:
- **Market forecasting**: how would OpenAI respond to a new TML product launch?
- **Policy analysis**: how would the U.S. Senate vote on a proposed climate bill?
- **Scenario planning**: how would NATO act in response to a territorial incursion?

### GROVE Benchmark

![benchmark-overview](benchmark-overview.png)

**GROVE** (GRoup Organizational BehaVior Evaluation) collects **8,052 real-world context-decision pairs** from Wikipedia and TechCrunch, covering **44 entities across 9 domains** (technology, finance, politics, automotive, etc.). Each instance pairs a real situation a group faced with the actual decision it made. 

### Framework

![framework-overview](framework-overview.png)

Rather than retrieving similar past events or summarizing them, we **convert a group's history into a structured behavioral model**: each rule is grounded in specific historical events (*traceable evidence nodes*), so every prediction is auditable. Two adapters extend the model:

- **Time-aware adapter** — captures how a group's behavior evolves over time
- **Group-aware adapter** — transfers behavioral knowledge from data-rich groups to data-scarce ones


### Analysis

**1. Temporal Behavior Drift**

![Temporal Behavior Drift](adaptation-results.png)

Groups don't behave the same way forever — their priorities, risk tolerance, and strategies shift over years. The time-aware adapter detects these drifts and produces stronger predictions for recent decisions than a static model can.

**2. Group Similarity and Behavior Transfer**

![Group Similarity and Behavior Transfer](similarity-transfer.png)

Groups cluster by structural similarity (e.g., tech giants behave more like each other than like banks). This means behavioral rules learned from a well-documented group can transfer to a similar but data-scarce one — giving us useful predictions even for entities with limited history.

---

### Citation

```bibtex
@article{zou2026simulating,
  title={Simulating Organized Group Behavior: New Framework, Benchmark, and Analysis},
  author={Zou, Xinkai and Huang, Yiming and Wu, Zhuohang and Sha, Jian and Huang, Nan and Yun, Longfei and Shang, Jingbo and Peng, Letian},
  journal={arXiv preprint arXiv:2604.09874},
  year={2026}
}
```