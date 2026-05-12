---
title: "Simulating Organized Group Behavior: New Framework, Benchmark, and Analysis"
date: 2026-04-14
description: "A task definition, benchmark (GROVE), and structured analytical framework for simulating organized group decision-making."
ShowToc: true
TocOpen: true
---

<div style="text-align: center; margin-bottom: 2em;">

<p style="font-size: 1.1em; line-height: 1.8;">
<strong>Xinkai Zou</strong><sup>*</sup>, 
Yiming Huang<sup>*</sup>, 
Zhuohang Wu, 
Jian Sha, 
Nan Huang, 
Longfei Yun, 
<a href="https://shangjingbo1226.github.io/">Jingbo Shang</a>, 
<a href="https://letian-peng.github.io/">Letian Peng</a>
</p>
<p style="color: gray; font-size: 0.9em;"><sup>*</sup> Equal contribution</p>

<p>

[Paper](https://arxiv.org/abs/2604.09874) |
[Code](https://github.com/jayzou3773/Organized-Group-Behavior-Simulation) |
[Dataset (GROVE)](https://huggingface.co/datasets/jayzou3773/GROVE)

</p>
</div>

## TL;DR

We formalize **Organized Group Behavior Simulation** — predicting decisions that organized groups (e.g., corporations) would make when facing specific situations (e.g., AI Boom). We provide a benchmark (**GROVE**: 44 entities, 8,052 real-world context-decision pairs across 9 domains), a structured analytical framework that outperforms retrieval and summarization baselines, and analysis revealing temporal behavioral drift and cross-group knowledge transfer.

## Abstract

Simulating how organized groups (e.g., corporations) make decisions (e.g., responding to a competitor's move) is essential for understanding real-world dynamics and could benefit relevant applications (e.g., market prediction). In this paper, we formalize this problem as a concrete research platform for group behavior understanding, providing: (1) a task definition with benchmark and evaluation criteria, (2) a structured analytical framework with a corresponding algorithm, and (3) detailed temporal and cross-group analysis.

Specifically, we propose **Organized Group Behavior Simulation**, a task that models organized groups as collective entities from a practical perspective: given a group facing a particular situation (e.g., AI Boom), predict the decision it would take. To support this task, we present **GROVE** (GRoup Organizational BehaVior Evaluation), a benchmark covering 44 entities with 8,052 real-world context-decision pairs collected from Wikipedia and TechCrunch across 9 domains, with an end-to-end evaluation protocol assessing consistency, initiative, scope, magnitude, and horizon.

Beyond straightforward prompting pipelines, we propose a structured analytical framework that converts collective decision-making events into an interpretable, adaptive, and traceable behavioral model, achieving stronger performance than summarization- and retrieval-based baselines. It further introduces an adapter mechanism for time-aware evolution and group-aware transfer, and traceable evidence nodes grounding each decision rule in originating historical events.

Our analysis reveals temporal behavioral drift within individual groups, which the time-aware adapter effectively captures for stronger prediction, and structured cross-group similarity that enables knowledge transfer for data-scarce organizations.

## Key Contributions

- **Task Definition**: Organized Group Behavior Simulation — predicting group decisions given situational context
- **GROVE Benchmark**: 44 entities, 8,052 context-decision pairs across 9 domains (Technology, Finance, Automotive, etc.), sourced from Wikipedia and TechCrunch
- **Evaluation Protocol**: End-to-end assessment on 5 dimensions — consistency, initiative, scope, magnitude, and horizon
- **Structured Analytical Framework**: Interpretable behavioral model with time-aware and group-aware adapters, outperforming retrieval/summarization baselines
- **Temporal & Cross-group Analysis**: Evidence of behavioral drift over time and structured similarity enabling knowledge transfer

## Citation

```bibtex
@article{zou2026simulating,
  title={Simulating Organized Group Behavior: New Framework, Benchmark, and Analysis},
  author={Zou, Xinkai and Huang, Yiming and Wu, Zhuohang and Sha, Jian and Huang, Nan and Yun, Longfei and Shang, Jingbo and Peng, Letian},
  journal={arXiv preprint arXiv:2604.09874},
  year={2026}
}
```
